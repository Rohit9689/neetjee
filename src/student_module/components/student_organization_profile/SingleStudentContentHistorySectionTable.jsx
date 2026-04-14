import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import TableSearchwithStudentResult from "../../../neetjee_guru/components/questioners/manage_questin_papers/TableSearchwithStudentResult";



class SingleStudentContentHistorySectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeaderData1: {
        Title: 'Content History'
      },
      sessionid: "0",
    };
  }

  handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
    localStorage.removeItem('mobile');
    localStorage.removeItem('stype');
    localStorage.removeItem('sessionid');
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
        dataField: "contenttype",
        text: "Content Type",
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
      }
      ,
      {
        dataField: "topic",
        text: "Topic",
        sort: true
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
    console.log("getDatatableData",getData, this.props.stateData);
    if (this.props.stateData.contenttype != "0" || this.props.stateData.subject != "0" || this.props.stateData.chapter != "0" || this.props.stateData.topic != "0"
    ) {
      if (this.props.stateData.contenttype != "0") {
        getData = getData.filter((a) => a.content_type == this.props.stateData.contenttype);
      }
      if (this.props.stateData.subject != "0") {
        getData = getData.filter((a) => a.subject == this.props.stateData.subject);
      }
      if (this.props.stateData.chapter != "0") {
        getData = getData.filter((a) => a.chapter.split(",").includes(this.props.stateData.chapter));
      }
      if (this.props.stateData.topic != "0") {
        //getData = getData.filter((a) => a.topic == this.props.stateData.topic);

        getData = getData.filter((a) => a.topic.split(",").includes(this.props.stateData.topic));
      }
    }
    //console.log("tableData", data);
    let tableArray = [];
    if (getData != undefined) {
      for (let t = 0; t < getData.length; t++) {
        let idata = getData[t];
        let sname = "";
        let cname = "";
        let tname="";
        if (idata.subject != null) {
          const singlesname = this.props.subjects.find((a) => a.id == idata.subject);

          if (singlesname != undefined) {
            console.log("singlesname", singlesname);
            //const singlecname = singlesname.studentChapters.find((a) => a.id == idata.chapter);
            const singlecname = singlesname.studentChapters.find((a) =>idata.chapter.split(",").includes(a.id.toString()));
            sname = singlesname.subject;
            if (singlecname != undefined) {
              if (idata.chapter != null) {
                cname = singlecname.chapter;
              }
              //let singletname=singlecname.topics.find((a) => a.id == idata.topic);
              let singletname=singlecname.topics.find((a) =>idata.topic.split(",").includes(a.id.toString()));
              if(singletname!=undefined){
                tname = singletname.topic;
              }

            }


          }
        }

        let contenttype = this.props.studentGlobals.contentTypes.find((a) => a.id == idata.content_type);
        const newobj = {
          id: idata.id,
          contenttype: contenttype.customcontent,
          subject: sname,
          chapter: cname,
          topic:tname,
          Date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),

        }
        tableArray.push(newobj);



      }
    }

    return tableArray;

  }



  render() {
    const getStudentMaterialLog = this.props.getStudentMaterialLog;
    const loading1 = getStudentMaterialLog.loading;
    const error1 = getStudentMaterialLog.error;

    if (loading1) {
      return (<div className="d-flex justify-content-center mt-3 pb-3">
        <div className="spinner-border text-primary text-center"></div>
      </div>)
    }

    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    console.log("SingleStudentContentHistorySectionTable:", {
      mobile: this.props.mobile,
      content_type: parseInt(this.props.stateData.contenttype),
      subject: parseInt(this.props.stateData.subject),
      chapter: parseInt(this.props.stateData.chapter),
      topic: 0,
      fromDate: this.props.stateData.stimestamp.toString(),
      toDate: this.props.stateData.etimestamp.toString()

    });

    return (
      <TableSearchwithStudentResult
        parentData={this.tableData(getStudentMaterialLog.getStudentMaterialLog)}
        particlecolumns={this.articlecolumns()}
        defaultSorted={{ dataField: "contenttype", order: "desc" }}
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
            $content_type: Int, 
            $subject: Int,
            $chapter: Int,
            $topic: Int,
            $fromDate: String,
            $toDate: String) {
              getStudentMaterialLog(
                mobile:$mobile,
                content_type:$content_type, 
                subject:$subject,
                chapter:$chapter,
                topic:$topic,
                fromDate:$fromDate,
                toDate:$toDate){
                  content_id
                  content_type
                  subject
                  chapter
                  topic
                  username
                  timestamp
              }
        }
  `,
      {
        options: props => ({
          variables: {
            mobile: props.mobile,
            content_type: parseInt(props.stateData.contenttype),
            subject: parseInt(props.stateData.subject),
            chapter: parseInt(props.stateData.chapter),
            topic: parseInt(props.stateData.topic),
            fromDate: props.stateData.stimestamp.toString(),
            toDate: props.stateData.etimestamp.toString()

          }
          ,
          fetchPolicy: "no-cache"
        }), name: "getStudentMaterialLog"
      }))(SingleStudentContentHistorySectionTable));
