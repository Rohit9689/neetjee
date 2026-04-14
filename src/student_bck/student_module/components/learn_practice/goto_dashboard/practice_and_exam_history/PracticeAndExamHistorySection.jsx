import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import DataTableWithSearch from "../../../data_tables/DataTableWithSearch";
import '../_chapterStrength.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";

import moment from 'moment';
import UserRestrictionAlert from "../../../home/UserRestrictionAlert";
class PracticeAndExamHistorySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeaderData1: {
        Title: 'Practice'
      },
      tableHeaderData2: {
        Title: 'Exams'
      },
      resultModalShow: false,
      sessionid: "0"
    };
  }
  handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if (isuserValid.practise_completed_analysis == false) {
      // this.setState({
      //   sessionid: rowIndex.id,
      //   resultModalShow: true,
      //   userRestionModalShow: false
      // });
      this.props.history.push({
        pathname: "/student/subject/practice-result",
        state: {
          stype:"practice",
          sessionid: rowIndex.id,
          getData:this.props.getData
        }
      })
    }
    else {
      this.setState({
        userRestionModalShow: true
      });
    }

  }
  handleViewQuestionanswer = (e, cell, row, rowIndex, formatExtraData) => {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if (isuserValid.practise_completed_analysis == false) {
      this.setState({
        userRestionModalShow: false
      });
      this.props.history.push({
        pathname: "/student/practice-view-question-answer",
        state: {
          stype:"practice",
          htype:"history",
          sessionid: rowIndex.id
        }
      })
    }
    else {
      this.setState({
        userRestionModalShow: true
      });
    }
  }
  pcancelFunction = () => {
    this.setState({
      resultModalShow: false
    });
  }
  articlecolumns = [
    {
      dataField: "Date",
      text: "Date",
      sort: true
    },
    {
      dataField: "Time",
      text: "Time"
    },
    {
      dataField: "Score",
      text: "Score",
      sort: true
    },
    {
      dataField: "Accuracy",
      text: "Accuracy(%)",
      sort: true
    },
    {
      dataField: "SkippedQuestions",
      text: "Skipped Questions",
      sort: true
    },
    {
      dataField: "WrongQuestions",
      text: "Wrong Questions",
      sort: true
    },
    // {
    //   dataField: "Actions",
    //   text: "Actions",
    //   sort: true,
    //   formatter: this.actionsFormatter,
    //   //headerAttrs: { width: 50 },
    //   headerAlign: 'center',
    //   align: 'center',
    //   //attrs: { width: 50, className: "" }
    // }
    {
      dataField: "Actions",
      text: "Actions",
      sort: true,
      formatter: this.actionsFormatter,
      headerAlign: 'right',
      align: 'right',
      events: {
        onClick: this.handleSessionFunction
      }
    }
    ,
    {
      dataField: "Actions",
      //text: "Actions",
      //sort: true,
      formatter: this.actionsFormatter1,
      headerAlign: 'left',
      align: 'left',
      events: {
        onClick: this.handleViewQuestionanswer,
      }
    }
  ];

  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-end align-items-top">
        <Button variant="outline-primary" className="font-weight-bold"><i class="px-3 fas fa-chart-line table_chart_icon" /></Button>
      </div>
    );
  }
  actionsFormatter1(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-start align-items-top">
        <Button variant="outline-primary" className="font-weight-bold"><div className="table_viewQA px-3">Q &amp; A</div></Button>
      </div>
    );
  }

  convertTime = time => {
    if (time.length <= 8) return "Invalid Time";

    var a = new Date(parseInt(time) * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    if (date.length == 1) date = "0" + date;

    var hour = a.getHours();
    if (hour.length == 1) hour = "0" + hour;

    var min = a.getMinutes();

    if (min.length == 1) min = "0" + min;

    var sec = a.getSeconds();
    var time = date + " - " + month + " - " + year;
    return time;
  };
  practiceGetTable(data) {
    let tableArray = [];
    if (data != undefined) {
      for (let t = 0; t < data.length; t++) {

        let idata = data[t];

        if (idata.type == "practice") {
          console.log("practiceGetTable", idata.type);
          const scoreplus = parseInt(idata.total_marks);
          //const scoreplus = parseInt(idata.correct_marks) + parseInt(idata.negative_marks);
          const scoreminus = parseInt(idata.correct_marks) - parseInt(idata.negative_marks);
          const newscore = scoreminus + "/" + scoreplus;

          const newobj = {
            id: idata.id,
            //Date: this.convertTime(idata.timestamp),
            Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
            Time: moment.unix(idata.timestamp).format("LT"),
            Score: newscore,
            Accuracy: idata.accuracy,
            SkippedQuestions: idata.not_answered,
            WrongQuestions: idata.wrong
          }
          tableArray.push(newobj);
        }



      }
    }

    return tableArray;
  }

  examGetTable(data) {
    let tableArray = [];
    if (data != undefined) {
      for (let t = 0; t < data.length; t++) {
        let idata = data[t];
        const scoreplus = parseInt(idata.correct_marks) + parseInt(idata.negative_marks);
        const scoreminus = parseInt(idata.correct_marks) - parseInt(idata.negative_marks);
        const newscore = scoreminus + "/" + scoreplus;
        const newobj = {
          id: idata.id,
          Date: this.convertTime(idata.timestamp),
          Score: newscore,
          Accuracy: idata.accuracy + "%",
          SkippedQuestions: idata.not_answered,
          WrongQuestions: idata.wrong
        }
        tableArray.push(newobj);

      }
    }

    return tableArray;
  }

  render() {
    console.log("practisehistory", this.props.getData);
    const getStudentExamSessions = this.props.getStudentExamSessions;
    const loading1 = getStudentExamSessions.loading;
    const error1 = getStudentExamSessions.error;
    if (loading1) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    return (
      <div className="praciceexamhistory mt-4">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <DataTableWithSearch
              parentData={this.practiceGetTable(this.props.getStudentSessions)}
              particlecolumns={this.articlecolumns}
              defaultSorted={{ dataField: "Accuracy", order: "desc" }}
              tableHeading={this.state.tableHeaderData1}
            />
          </Col>
          {/* <Col xl={12} lg={12} md={12} sm={12}>
            <DataTableWithSearch

              parentData={this.examGetTable(this.props.getStudentSessions)}
              particlecolumns={this.articlecolumns}
              defaultSorted={{ dataField: "Accuracy", order: "desc" }}
              tableHeading={this.state.tableHeaderData2}
            />
          </Col> */}
        </Row>
        <UserRestrictionAlert
          show={this.state.userRestionModalShow}
          onHide={() => this.setState({ userRestionModalShow: false })}
        />
      </div>
    )
  }
}


export default withRouter(compose(

  graphql(gql` 
  query(
        $mobile: String!, $exam_session_id: ID
        # ,$chapter_id: Int
        ) {
          getStudentExamSessions(mobile: $mobile, exam_session_id: $exam_session_id
          # , chapter_id:$chapter_id
          ){
            id
            correct
            wrong
            not_answered
            total_questions
            correct_marks
            negative_marks
            total_marks
            in_time
            less_time
            over_time
            accuracy
            speed
            type
           timestamp
        }
    }
  `,
    {
      options: props => ({
        variables: {
          mobile: Cookies.get("mobile"),
          exam_session_id: 0
          // chapter_id: parseInt(props.getData .ocid)
        },
        fetchPolicy: "cache-and-network"
      }), name: "getStudentExamSessions"
    })
)(PracticeAndExamHistorySection));
