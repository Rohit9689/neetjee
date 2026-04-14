import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import TableSearchwithStudentResult from "../../../neetjee_guru/components/questioners/manage_questin_papers/TableSearchwithStudentResult";



class SingleStudentPractiseHistorySectionTable extends Component {
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
    localStorage.removeItem('mobile');
    localStorage.removeItem('stype');
    localStorage.removeItem('sessionid');
    localStorage.removeItem('subjects');
    localStorage.setItem(
      "subjects",
      JSON.stringify(this.props.subjects)
    );
    
    localStorage.setItem("mobile", this.props.mobile);
    localStorage.setItem("stype", rowIndex.etype);
    localStorage.setItem("sessionid", rowIndex.id);
    window.open("/student/subject/single-practice-result", "_blank") //to open new pag
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
        dataField: "etype",
        text: "Type",
        sort: true
      },
      {
        dataField: "subject",
        text: "Subject",
        sort: true
      },
      {
        dataField: "chapter",
        text: "Chapter",
        sort: true
      },
      {
        dataField: "Time",
        text: "Time"
      },
      {
        dataField: "score",
        text: "Score",
        sort: true,
        headerAttrs: { width: 50 },
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
        dataField: "accurancy",
        text: "Accuracy(%)",
        sort: true
      },
      {
        dataField: "skiped",
        text: "Skiped Questions",
        sort: true
      },
      {
        dataField: "wrong",
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
      },
      {
        dataField: "Actions",
        text: "Actions",
        sort: true,
        formatter: this.actionsFormatter1,
        headerAlign: 'left',
        align: 'left',
      }
    ];
    //}
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
    let PATH = `http://admin.mylearningplus.in/student_analytics/generate.php?examtype=practice&id=${row.id}`;
    return (
      <div className="actions-buttons d-flex justify-content-start align-items-top">
        <a variant="outline-primary" target="_blank"
          href={PATH} className="font-weight-bold"><div className="table_viewQA px-3"><i class="fa fa-download" aria-hidden="true"></i> PDF</div></a>

      </div>
    );
  }

  tableData(data) {
    let getData = data;
    console.log("getDatatableData", getData);
    if (this.props.stateData.examtype != "0" || this.props.stateData.subject != "0" || this.props.stateData.chapter != "0") {
      if (this.props.stateData.examtype != "0") {

        if (this.props.stateData.examtype == "1") {
          getData = getData.filter((a) => a.type == "practice");
          console.log("getData", getData);
        }
        if (this.props.stateData.examtype == "2") {
          getData = getData.filter((a) => a.type == "error");
        }

      }
      if (this.props.stateData.subject != "0") {
        getData = getData.filter((a) => a.subject == this.props.stateData.subject);
      }
      if (this.props.stateData.chapter != "0") {
        getData = getData.filter((a) => a.chapter == this.props.stateData.chapter);
      }
    }
    //console.log("tableData", data);
    let tableArray = [];
    if (getData != undefined) {
      for (let t = 0; t < getData.length; t++) {
        let idata = getData[t];

        const scoreplus = parseInt(idata.correct_marks) + parseInt(idata.negative_marks);
        const scoreminus = parseInt(idata.correct_marks) - parseInt(idata.negative_marks);
        const newscore = scoreminus + "/" + scoreplus;

        let sname = "";
        let cname = "";
        const singlesname = this.props.subjects.find((a) => a.id == idata.subject);

        if (singlesname != undefined) {
          console.log("singlesname", singlesname);
          const singlecname = singlesname.studentChapters.find((a) => a.id == idata.chapter);
          sname = singlesname.subject;
          if (singlecname != undefined) {
            cname = singlecname.chapter;
          }

        }

        const newobj = {
          id: idata.id,
          etype: idata.type,
          subject: sname,
          chapter: cname,
          Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
          //Time: this.convert(idata.timestamp),
          Time: this.minutesTimer(idata.total_time),
          score: newscore,
          accurancy: idata.accuracy,
          skiped: idata.not_answered,
          wrong: idata.wrong
        }
        tableArray.push(newobj);



      }
    }

    return tableArray;

  }



  render() {
    const getStudentSessions = this.props.getStudentSessions;
    const loading1 = getStudentSessions.loading;
    const error1 = getStudentSessions.error;

    if (loading1) {
      return (<div className="d-flex justify-content-center mt-3 pb-3">
        <div className="spinner-border text-primary text-center"></div>
      </div>)
    }

    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    console.log("TableSearchwithStudentResult", getStudentSessions.getStudentSessions);

    return (
      <TableSearchwithStudentResult
        parentData={this.tableData(getStudentSessions.getStudentSessions)}
        particlecolumns={this.articlecolumns()}
        defaultSorted={{ dataField: "Accuracy", order: "desc" }}
        tableHeading={this.state.tableHeaderData1}

      />
    )


  }
}




export default
  withRouter(
    compose(graphql(gql`
    query(
            $mobile: String!, 
            $session_id: ID, 
            $chapter_id: Int,
            $fromDate: String,
            $toDate: String) {
              getStudentSessions(mobile: $mobile, session_id: $session_id, chapter_id:$chapter_id,
                fromDate:$fromDate
                toDate:$toDate){
                id
              correct
              wrong
              not_answered
              
              correct_marks
              negative_marks
              
              total_time
              accuracy
              speed
              type
              subject
              chapter
              timestamp
              }
        }
  `,
      {
        options: props => ({
          variables: {
            mobile: props.mobile,
            session_id: 0,
            chapter_id: parseInt(props.stateData.chapter),
            fromDate: props.stateData.stimestamp.toString(),
            toDate: props.stateData.etimestamp.toString()

          }
          ,
          fetchPolicy: "no-cache"
        }), name: "getStudentSessions"
      }))(SingleStudentPractiseHistorySectionTable));
