import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import TableSearchwithStudentResult from "../../../neetjee_guru/components/questioners/manage_questin_papers/TableSearchwithStudentResult";



class SingleStudentExamHistorySectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeaderData1: {
        Title: 'Exam History'
      },
      sessionid: "0",
    };
  }


  handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
    //console.log("this.props.stateData.examtypeValue.labelvalue", this.props.stateData.examtypeValue.labelvalue);
    localStorage.removeItem('mobile');
    localStorage.removeItem('examtype');
    localStorage.removeItem('sessionid');
    localStorage.setItem("mobile", this.props.mobile);
    localStorage.setItem("examtype", rowIndex.dbtype);
    localStorage.setItem("sessionid", rowIndex.id);

    window.open("/student/subject/single-exam-result", "_blank") //to open new pag
  }
  articlecolumns() {
    let articlecolumns = [];
    articlecolumns = [
      {
        dataField: "Date",
        text: "Date",
        sort: true
      },
      {
        dataField: "exam",
        text: "Exam",
        sort: true
      },
      {
        dataField: "etype",
        text: "Type",
        sort: true
      },
      {
        dataField: "Time",
        text: "Time"
      },
      {
        dataField: "Score",
        text: "Score",
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          console.log("sortFunc", a.split("/")[0], b, order);


          let aslice = a.split('/');
          let bslice = b.split('/');

          let finala = 0;
          let finalb = 0;

          if (aslice.length > 1)
              finala = parseInt(aslice[0]);

          if (bslice.length > 1)
              finalb = parseInt(bslice[0]);

          if (order === 'asc') {
              return finalb - finala;
          }

          return finala - finalb; // desc
      }
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
        text: "Actions",
        sort: true,
        formatter: this.actionsFormatter1,
        headerAlign: 'left',
        align: 'left'

      }
    ];

    return articlecolumns;
  }
  minutesTimer = (data) => {
    var date = new Date(data * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) { hh = "0" + hh; }
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    var t = hh + ":" + mm + ":" + ss;
    return t;
  }
  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-end align-items-top">
        <Button variant="outline-primary" className="font-weight-bold"><i class="px-3 fas fa-chart-line table_chart_icon" /></Button>
      </div>
    );
  }
  actionsFormatter1 = (cell, row, rowIndex, formatExtraData) => {
    console.log("actionsFormatter1", cell, row, rowIndex, formatExtraData);
    let PATH = `http://admin.mylearningplus.in/student_analytics/generate.php?examtype=exam&id=${row.id}`;
    return (
      <div className="actions-buttons d-flex justify-content-start align-items-top">
        <a variant="outline-primary" target="_blank"
          href={PATH} className="font-weight-bold"><div className="table_viewQA px-3"><i class="fa fa-download" aria-hidden="true"></i> PDF</div></a>

      </div>
    );
  }

  practiceGetTable(data) {
    let data1 = this.props.getStudentExamSessions.getStudentExamSessions;
    if (this.props.stateData.examtypeValue.labelvalue != "") {
      data1 = this.props.getStudentExamSessions.getStudentExamSessions.filter((a) => a.type == this.props.stateData.examtypeValue.labelvalue);
    }

    console.log("data1", data1);
    let tableArray = [];
    if (data1 != undefined) {
      for (let t = 0; t < data1.length; t++) {
        let idata = data1[t];
        const scoreplus = parseInt(idata.total_marks);
        const scoreminus = parseInt(idata.correct_marks) - parseInt(idata.negative_marks);
        const newscore = scoreminus + "/" + scoreplus;
        let etype = "";
        if (idata.sub_type == "cumulative") {
          etype = "cumulative";
        }
        else if (idata.sub_type == "semi-grand") {
          etype = "Semi Grand";
        }
        else if (idata.sub_type == "grand") {
          etype = "Grand";
        }
        else if (idata.sub_type == "chapter") {
          etype = "chapter";
        }
        let cetype = "";
        if (idata.type == "custom") {
          cetype = "Custom";
        }
        else if (idata.type == "error_exam") {
          cetype = "Error";
        }
        else if (idata.type == "previous_exam") {
          cetype = "Previous";
        }
        else if (idata.type == "schedule_exam") {
          cetype = "Schedule";
        }


        const newobj = {
          id: idata.id,
          exam: cetype,
          etype: etype,
          dbtype: idata.type,
          Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
          Time: this.minutesTimer(idata.total_time),
          Score: newscore,
          Accuracy: parseInt(idata.accuracy),
          SkippedQuestions: idata.not_answered,
          WrongQuestions: idata.wrong
        }
        tableArray.push(newobj);

      }
    }

    return tableArray;
  }



  render() {
    const getStudentExamSessions = this.props.getStudentExamSessions;
    const loading1 = getStudentExamSessions.loading;
    const error1 = getStudentExamSessions.error;

    if (loading1) {
      return (
        <div className="d-flex justify-content-center mt-3 pb-3">
          <div className="spinner-border text-primary text-center"></div>
        </div>
      )
    }

    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    console.log("getStudentExamSessions", getStudentExamSessions.getStudentExamSessions);

    return (
      <TableSearchwithStudentResult
        parentData={this.practiceGetTable(getStudentExamSessions.getStudentExamSessions)}
        particlecolumns={this.articlecolumns()}
        defaultSorted={{ dataField: "Accuracy", order: "desc" }}
        tableHeading={this.state.tableHeaderData1}

      />
    )


  }
}


export default withRouter(compose(

  graphql(gql` 
  query(
        $mobile: String!, 
        $exam_session_id: ID,
        $fromDate: String,
        $toDate: String) {
          getStudentExamSessions(
            mobile: $mobile, 
            exam_session_id: $exam_session_id,
            fromDate: $fromDate,
            toDate: $toDate,
            ){
            id
            correct
            wrong
            not_answered
            total_questions
          correct_marks
          negative_marks
          total_marks
          type
          sub_type
          timestamp
          total_time
          accuracy
            
            
        }
    }
  `,
    {
      options: props => ({
        variables: {
          mobile: props.mobile,
          exam_session_id: 0,
          fromDate: props.stateData.stimestamp.toString(),
          toDate: props.stateData.etimestamp.toString()
        },
      }), name: "getStudentExamSessions"
    })
)(SingleStudentExamHistorySectionTable));
