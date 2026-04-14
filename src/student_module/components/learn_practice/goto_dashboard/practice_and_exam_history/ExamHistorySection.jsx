import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import DataTableWithSearch from "../../../data_tables/DataTableWithSearch";
import '../_chapterStrength.scss';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import UserRestrictionAlert from "../../../home/UserRestrictionAlert";
class ExamHistorySection extends Component {
  constructor(props) {
    super(props);
    let tableHeaderData1 = {
      Title: 'Exam History'
    }
    if (props.getData.examtype == "test_series") {
      tableHeaderData1 = {
        Title: 'Mock Test History'
      }
    }
    this.state = {
      tableHeaderData1: tableHeaderData1,
      sessionid: "0",
      resultModalShow: false,
      userRestionModalShow: false

    };
  }
  handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if ((this.props.getData.examtype == "schedule_exam" && isuserValid.schedule_completed_analysis == false) ||
      (this.props.getData.examtype == "custom" && isuserValid.custom_completed_analysis == false) ||
      (this.props.getData.examtype == "error_exam" && isuserValid.error_completed_analysis == false) ||
      (this.props.getData.examtype == "previous_exam" && isuserValid.previous_completed_analysis == false) ||
      (this.props.getData.examtype == "jeemainsprevious_exam" && isuserValid.previous_completed_analysis == false) ||
      (this.props.getData.examtype == "test_series")
    ) {
      this.setState({
        userRestionModalShow: false
      });
      let examtype = "";
      if (this.props.getData.examtype == "test_series") {
        examtype = "series_test"
      }
      else {
        examtype = this.props.getData.examtype;
      }
      this.props.history.push({
        pathname: "/student/subject/exam-result",
        state: {
          sessionid: rowIndex.id,
          examtype: examtype
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
    if ((this.props.getData.examtype == "schedule_exam" && isuserValid.schedule_completed_analysis == false) ||
      (this.props.getData.examtype == "custom" && isuserValid.custom_completed_analysis == false) ||
      (this.props.getData.examtype == "error_exam" && isuserValid.error_completed_analysis == false) ||
      (this.props.getData.examtype == "previous_exam" && isuserValid.previous_completed_analysis == false) ||
      (this.props.getData.examtype == "jeemainsprevious_exam" && isuserValid.previous_completed_analysis == false) ||
      (this.props.getData.examtype == "test_series")
    ) {
      this.setState({
        userRestionModalShow: false
      });
      let examtype = "";
      if (this.props.getData.examtype == "test_series") {
        examtype = "series_test"
      }
      else {
        examtype = this.props.getData.examtype;
      }
      this.props.history.push({
        pathname: "/student/view-question-answer",
        state: {
          htype: "history",
          sessionid: rowIndex.id,
          examtype: examtype
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

  articlecolumns() {
    let articlecolumns = [];
    if (this.props.getData.examtype == "custom") {
      articlecolumns = [
        {
          dataField: "Date",
          text: "Date",
          sort: true
        },
        {
          dataField: "etype",
          text: "Exm Type",
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
          text: "Accuracy",
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

    }
    else if (this.props.getData.examtype == "test_series") {
      articlecolumns = [
        {
          dataField: "ename",
          text: "Exam Name",
          sort: true
        },
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
          text: "Accuracy",
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
    }
    else {

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
          text: "Accuracy",
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
    }
    return articlecolumns;
  }


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
    //console.log("practiceGetTable", this.props.getStudentExamSessions);
    let data1 = "";
    if (this.props.getData.examtype == "test_series") {
      data1 = this.props.getStudentExamSessions.filter((a) => a.sub_type == "test_series");
    }
    else if (this.props.getData.examtype == "jeemainsprevious_exam") {
      data1 = this.props.getStudentExamSessions.filter((a) => a.mains_2021 == true);
    }
    else if (this.props.getData.examtype == "schedule_exam") {
      data1 = this.props.getStudentExamSessions.filter((a) =>a.type == this.props.getData.examtype && a.sub_type != "test_series");
    }
    else {
      data1 = this.props.getStudentExamSessions.filter((a) => a.type == this.props.getData.examtype);
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

        if (this.props.getData.examtype == "custom") {
          const newobj = {
            id: idata.id,
            etype: etype,
            //Date: this.convertTime(idata.timestamp),
            Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
            Time: moment.unix(idata.timestamp).format("LT"),
            Score: newscore,
            Accuracy: idata.accuracy + "%",
            SkippedQuestions: idata.not_answered,
            WrongQuestions: idata.wrong
          }
          tableArray.push(newobj);

        }
        else  if (this.props.getData.examtype == "test_series") {
          const newobj = {
            id: idata.id,
            ename: idata.exam_name,
            //Date: this.convertTime(idata.timestamp),
            Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
            Time: moment.unix(idata.timestamp).format("LT"),
            Score: newscore,
            
            Accuracy: idata.accuracy + "%",
            SkippedQuestions: idata.not_answered,
            WrongQuestions: idata.wrong
          }
          tableArray.push(newobj);
        }
        else {
          const newobj = {
            id: idata.id,
            //Date: this.convertTime(idata.timestamp),
            Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
            Time: moment.unix(idata.timestamp).format("LT"),
            Score: newscore,
            Accuracy: idata.accuracy + "%",
            SkippedQuestions: idata.not_answered,
            WrongQuestions: idata.wrong
          }
          tableArray.push(newobj);

        }


      }
    }

    return tableArray;
  }



  render() {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    console.log("isuserValid", isuserValid);
    if ((this.props.getData.examtype == "schedule_exam" && isuserValid.schedule_exam_completed == true) ||
      (this.props.getData.examtype == "custom" && isuserValid.custom_completed == true) ||
      (this.props.getData.examtype == "error_exam" && isuserValid.error_completed == true) ||
      (this.props.getData.examtype == "previous_exam" && isuserValid.previous_completed == true)
    ) {
      return (
        <div className="praciceexamhistory mt-4">

          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <div className="text-center">
                <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                <h5 className="text-danger">This feature is not available for your package</h5>
              </div>

            </Col>
          </Row>

        </div>
      )
    }
    else {
      return (
        <div className="praciceexamhistory mt-4">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <DataTableWithSearch
                parentData={this.practiceGetTable(this.props.getStudentExamSessions)}
                particlecolumns={this.articlecolumns()}
                defaultSorted={{ dataField: "Accuracy", order: "desc" }}
                tableHeading={this.state.tableHeaderData1}
              />
            </Col>
          </Row>

          <UserRestrictionAlert
            show={this.state.userRestionModalShow}
            onHide={() => this.setState({ userRestionModalShow: false })}
          />
        </div>
      )
    }

  }
}


export default withRouter(ExamHistorySection);
