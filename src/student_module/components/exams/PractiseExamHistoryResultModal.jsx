import React, { Component } from 'react'
import { Row, Col, Modal, Button, Card, CardGroup, ListGroup, ProgressBar, Table, Nav, Tab } from 'react-bootstrap'
import ReactSpeedometer from "react-d3-speedometer";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import CardLessDataTable from '../../../neetjee_guru/components/datatables/CardLessDataTable';
import parse, { domToReact } from 'html-react-parser';

import './_resultmodel.scss'
const FETCH_SESSION_DATA = gql`
  query(
          $mobile: String!, $session_id: ID, $chapter_id: Int) {
            getStudentSessions(mobile: $mobile, session_id: $session_id, chapter_id:$chapter_id){
              id
              correct
              wrong
              not_answered
              total_questions
              correct_marks
              negative_marks
              total_marks
              total_time
              in_time
              less_time
              over_time
              accuracy
              speed
              type
              subject
              chapter
              qtype_report{
                question_type
                question_type_name
                correct
                wrong
                not_answered
                accuracy
                speed
              }
              theory_report{
                question_theory_name
                correct
                wrong
                not_answered
                accuracy
              }
              error_report{
                error
                error_name
                count
              }
            
              timestamp
              chapter_data{
                attempted_questions
                total_questions
              }
              result_questions{
                
                id
                attempt_answer
                status
                
              }
              correct_vs_complexity{
                complexity
                in_time
                less_time
                over_time
              }
              wrong_vs_complexity{
                complexity
                in_time
                less_time
                over_time
              }
              
              observations{
                theoryObservation
                qtypeObservation
                complexityObservation
            }
            
          }
      }
`;
const style1 = {
    position: 'relative',
    fontSize: 12,
    background: '#ffffff',
    border: '1px solid #D7F4DD',
    color: '#00C596',
    width: 25,
    height: 25,
    padding: 4,
    borderRadius: 4,
    marginRight: 10,
    textAlign: 'center'
}

class PractiseExamHistoryResultModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    totalPer() {
        let progress = "";
        if (this.props.getStudentSessions.getStudentSessions != "") {
            let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
            let some = [];
            for (let i = 0; i < arr.length; i++) {
                let newarr = arr[i];
                if (newarr.attempt_answer != "") {
                    const id = newarr.id
                    some.push(id);
                }

            }
            progress = Math.round(some.length / arr.length * 100);
            console.log("progress", progress);
            let result = "";
            if (!isNaN(progress)) {

                result = progress;
            }
            else {
                result = "0";
            }
            return result;
        }

    }
    currectCount() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "currect") {
                    const id = newarr.id
                    some.push(id);
                }

            }

        }
        return some.length;

    }
    currectIntime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "currect") {
                    let comparesec = 30;
                    if (newarr.timer < comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }

                }

            }

        }
        return some.length;

    }
    currectOvertime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "currect") {
                    let comparesec = 30;
                    if (newarr.timer > comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }

                }

            }

        }
        return some.length;

    }
    wrongCount() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "wrong") {
                    const id = newarr.id
                    some.push(id);
                }

            }

        }
        return some.length;
    }
    wrongIntime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "wrong") {
                    let comparesec = 30;
                    if (newarr.timer < comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }
                }

            }

        }
        return some.length;

    }
    wrongOvertime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "wrong") {
                    let comparesec = 30;
                    if (newarr.timer > comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }
                }

            }

        }
        return some.length;

    }
    skippedCount() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "skip") {
                    const id = newarr.id
                    some.push(id);
                }

            }

        }
        return some.length;
    }
    skippedIntime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "skip") {
                    let comparesec = 30;
                    if (newarr.timer < comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }
                }

            }

        }
        return some.length;

    }
    skippedOvertime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "skip") {
                    let comparesec = 30;
                    if (newarr.timer > comparesec) {
                        const id = newarr.id
                        some.push(id);
                    }
                }

            }

        }
        return some.length;

    }

    totalTime() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                const timertot = newarr.timer
                some.push(timertot);
            }
        }

        let sum = some.reduce(function (a, b) {
            return a + b;
        }, 0);

        var date = new Date(sum * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        var t = hh + ":" + mm + ":" + ss;
        return t;
    }
    speed() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            //if (newarr.attempt_answer != "") {
            const timertot = newarr.timer
            some.push(timertot);
            //}
        }
        console.log("somesome", some);
        let sum = some.reduce(function (a, b) {
            return a + b;
        }, 0);
        let totquestion = this.props.getPracticeQuestions.length
        console.log("sum:", sum, "totquestion:", totquestion);
        let speed = Math.round(totquestion / sum);
        return speed;
    }
    accuracy() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                if (newarr.status == "currect") {
                    const id = newarr.id
                    some.push(id);
                }

            }

        }
        let currect = 0;
        if (some.length != "") {
            currect = some.length
        }
        let arr1 = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let some1 = [];
        for (let i = 0; i < arr1.length; i++) {
            let newarr1 = arr1[i];
            if (newarr1.attempt_answer != null) {
                const id = newarr1.id
                some1.push(id);
            }

        }
        let attempt = 0;
        if (some1.length != "") {
            attempt = some1.length
        }
        console.log("currect:", currect, "attempt:", attempt);
        let accuracy = Math.round(currect / attempt);
        console.log("accuracyaccuracy", accuracy);
        if (isNaN(accuracy) === true) {
            return accuracy;
        }
        return 0;
    }
    answeredFun() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let answeresArray = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer != null) {
                const id = newarr.id
                answeresArray.push(id);
            }

        }
        return answeresArray.length;
    }
    notansweredFun() {
        let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
        let nansweresArray = [];
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i];
            if (newarr.attempt_answer == null) {
                const id = newarr.id
                nansweresArray.push(id);
            }

        }
        return nansweresArray.length;
    }
    totalCurrect(data) {
        let correctA = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const correct = idata.correct;
                correctA.push(parseInt(correct));
            }
        }


        let sum = correctA.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;

    }
    totalWrong(data) {
        let wrongA = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const wrong = idata.wrong;
                wrongA.push(parseInt(wrong));

            }
        }

        let sum = wrongA.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;

    }
    totalNotAns(data) {
        let notA = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const not_answered = idata.not_answered;
                notA.push(parseInt(not_answered));
            }
        }
        let sum = notA.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;

    }
    graphValue() {

        let data = "";
        if (this.props.getStudentSessions.getStudentSessions[0] != undefined) {
            data = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks) - parseInt(this.props.getStudentSessions.getStudentSessions[0].negative_marks);
            // data = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks);
        }
        //console.log("graphValue", data);
        return data;

    }
    totFunction() {
        let data = "";
        if (this.props.getStudentSessions.getStudentSessions[0] != undefined) {
            // data = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks) + parseInt(this.props.getStudentSessions.getStudentSessions[0].negative_marks);
            data = parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks);
        }
        //console.log("graphValue", data);
        return data;
    }
    chapterCorrectTotal(data) {
        let totArray = [];
        data.map((item) => {
            totArray.push(parseInt(item.correct));
        });

        let sum = totArray.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;
    }
    chapterWrongTotal(data) {
        let totArray = [];
        data.map((item) => {
            totArray.push(parseInt(item.wrong));
        });

        let sum = totArray.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;
    }
    chapterTotalNotAnswered(data) {
        let totArray = [];
        data.map((item) => {
            totArray.push(parseInt(item.not_answered));
        });

        let sum = totArray.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;
    }
    correctComplexity(data) {
        let returnArray = [];
        data.map((cmap) => {
            const newObj = {
                complexity: cmap.complexity,
                in_time: cmap.in_time,
                less_time: cmap.less_time,
                over_time: cmap.over_time
            }
            returnArray.push(newObj);
        });
        return returnArray;
    }
    questionType(data,type) {
        console.log("questionType", data);
        let returnArray = [];
        if(type=="first"){
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
    
                let speed = "";
                if (cmap.speed != null) {
                    console.log("yes");
                    speed = parseInt(cmap.speed);
                } else {
                    console.log("not");
                    speed = 0;
                }
                const newObj = {
                    qtype: cmap.question_type_name,
                    correct: parseInt(cmap.correct),
                    wrong: parseInt(cmap.wrong),
                    skipped: parseInt(cmap.not_answered),
                    accuracy: accuracy
                }
                returnArray.push(newObj);
            });

        }
        else if(type=="theory"){
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
    
               
                const newObj = {
                    theory: cmap.question_theory_name,
                    correct: parseInt(cmap.correct),
                    wrong: parseInt(cmap.wrong),
                    skipped: parseInt(cmap.not_answered),
                    accuracy: accuracy
                }
                returnArray.push(newObj);
            });

        }
        else{
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
    
                let speed = "";
                if (cmap.speed != null) {
                    console.log("yes");
                    speed = parseInt(cmap.speed);
                } else {
                    console.log("not");
                    speed = 0;
                }
                const newObj = {
                    qtype: cmap.question_type_name,
                    correct: parseInt(cmap.correct),
                    wrong: parseInt(cmap.wrong),
                    skipped: parseInt(cmap.not_answered),
                    accuracy: accuracy,
                    speed: speed
                }
                returnArray.push(newObj);
            });
        }

        
        return returnArray;
    }
    questionTypecolumns(type){
        let questionTypecolumns=[];

        if(type=="first"){
            questionTypecolumns = [
                {
                    dataField: "qtype",
                    text: "Q Type",
                    sort: true
                }
                
                ,
                {
                    dataField: "accuracy",
                    text: "Accuracy (%)",
                    sort: true
                },
                {
                    dataField: "correct",
                    text: "Correct",
                    sort: true
                },
                {
                    dataField: "wrong",
                    text: "Wrong",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Not Ans",
                    sort: true
                }
                
            ];

        }
        else if(type=="theory"){
            questionTypecolumns = [
                {
                    dataField: "theory",
                    text: "Q Theory",
                    sort: true
                },
               
                {
                    dataField: "accuracy",
                    text: "Accuracy (%)",
                    sort: true
                },
                {
                    dataField: "correct",
                    text: "Correct",
                    sort: true
                },
                {
                    dataField: "wrong",
                    text: "Wrong",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Not Ans",
                    sort: true
                }
                ,
                
            ];

        }
        else{

            questionTypecolumns = [
                {
                    dataField: "qtype",
                    text: "Q Type",
                    sort: true
                },
                {
                    dataField: "correct",
                    text: "Correct",
                    sort: true
                },
                {
                    dataField: "wrong",
                    text: "Wrong",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Skipped",
                    sort: true
                }
                ,
                {
                    dataField: "accuracy",
                    text: "Accuracy(%)",
                    sort: true
                }
                ,
                {
                    dataField: "speed",
                    text: "Speed(sec/Q)",
                    sort: true
                }
            ];
        }
        return questionTypecolumns;
    }
    
    questionTypeSorted = [
        {
            dataField: "qtype",
            order: "asc"
        }
    ];

    wrongcomplexitycolumns = [
        {
            dataField: "complexity",
            text: "Wrong Answered",
            sort: true
        },
        {
            dataField: "in_time",
            text: "In Time",
            sort: true
        },
        {
            dataField: "less_time",
            text: "Less Time",
            sort: true
        },
        {
            dataField: "over_time",
            text: "Over Time",
            sort: true
        }
    ];
    correctcomplexitycolumns = [
        {
            dataField: "complexity",
            text: "Correct Answered",
            sort: true
        },
        {
            dataField: "in_time",
            text: "In Time",
            sort: true,
            // attrs: { className: "EditRow" }
        },
        {
            dataField: "less_time",
            text: "Less Time",
            sort: true
        },
        {
            dataField: "over_time",
            text: "Over Time",
            sort: true
        }
    ];

    correctcomplexitySorted = [
        {
            dataField: "complexity",
            order: "asc"
        }
    ];
    attemptedFun(tot, not) {
        let Data = Math.round((parseInt(tot) - parseInt(not)) * 100 / parseInt(tot));
        if (!isNaN(Data)) {
            return Data;
        }
        else {
            return 0;
        }

    }
    notAttemptedFun(tot, not) {
        let Data = Math.round(parseInt(not) * 100 / parseInt(tot));
        if (!isNaN(Data)) {
            return Data;
        }
        else {
            return 0;
        }
    }
    minutesTimer(time) {
        var hr = ~~(time / 3600);
        var min = ~~((time % 3600) / 60);
        var sec = time % 60;
        var sec_min = "";
        if (hr > 0) {
            sec_min += "" + hr + ":" + (min < 10 ? "0" : "");
        }
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return sec_min + " min";
    }
    parseFun(str) {
        if (str != undefined || str != "") {
            try {
                return parse(str);
            } catch (ex) {
                return false;
            }
        }
        else {
            return null;
        }

    }
    render() {
        const now = 20;
        const getStudentSessions = this.props.getStudentSessions;
        const loading1 = getStudentSessions.loading;
        const error1 = getStudentSessions.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getStudentSessions", getStudentSessions.getStudentSessions);
        let maxHeight = "";
        let overflowY = "";
        if (getStudentSessions.getStudentSessions != "") {
            if (getStudentSessions.getStudentSessions[0].qtype_report.length >= 8) {
                maxHeight = 280;
                overflowY = "auto";
            }
        }


        let scoredata = "";
        if (this.props.getStudentSessions.getStudentSessions[0] != undefined) {
            scoredata = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks) - parseInt(this.props.getStudentSessions.getStudentSessions[0].negative_marks);
        }
        console.log("getStudentSessions.getStudentSessions[0]",getStudentSessions.getStudentSessions[0]);
        return (
            <Modal {...this.props} className="resultModal"
                size="xl"
                aria-labelledby="example-modal-sizes-title-xl" shouldCloseOnOverlayClick={false}>
                <Tab.Container defaultActiveKey="result">
                    <Modal.Header
                        //closeButton 
                        className="px-4">
                        <Nav variant="pills tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="result">Result</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="depthreport">In Depth Report</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Button variant="outline-danger" className="px-4" onClick={this.props.pcancelFunction} style={{ borderRadius: 25 }}><i className="fal fa-times mr-2" /> Close</Button>
                    </Modal.Header>
                    <Modal.Body className="p-4" as={Tab.Content}>
                        <Tab.Pane eventKey="result">
                            <Card as={Card.Body} className="p-3">
                                <Row>
                                    <Col lg={4} md={12} sm={12}>
                                        <h6 className="mb-0">
                                            {/* <span style={style1}>01</span> */}
                                            {this.props.type}
                                        </h6>
                                    </Col>
                                    <Col lg={7} md={12} sm={12}>
                                        <div className="percentage">
                                        <ProgressBar variant="success" 
                                            now={getStudentSessions.getStudentSessions[0].accuracy} label={`${getStudentSessions.getStudentSessions[0].accuracy}%`} />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Row className="my-2">
                                <Col xl={4} lg={6} md={12} sm={12} className="my-2">
                                    <Card as={Card.Body} className="h-100 p-2">
                                        <Card.Title className="h6 border-bottom px-1 py-2">Score</Card.Title>
                                        {getStudentSessions.getStudentSessions[0] != undefined ? (
                                            <React.Fragment>{Math.sign(scoredata) == 1 ? (
                                                <React.Fragment>
                                                    <ReactSpeedometer
                                                        //forceRender
                                                        maxSegmentLabels={0}
                                                        // customSegmentStops={[0, 10, 20, 30, 40]}
                                                        // segmentColors={["#5959ac", "#d08770", "#ebcb8b", "#a3be8c"]}
                                                        needleColor="lightblue"
                                                        //currentValueText={this.graphValue()}
                                                        //currentValuePlaceholderStyle="#{value}"
                                                        needleHeightRatio={0.9}
                                                        minValue={0}
                                                        maxValue={this.totFunction()}
                                                        //value={30}
                                                        value={this.graphValue()}


                                                        ringWidth={6}
                                                        height={200}

                                                    />

                                                    <div className="d-flex justify-content-between align-items-center" style={{ position: 'absolute', bottom: 14, width: '320px' }}>
                                                        <h6>0</h6>
                                                        <h6>{this.totFunction()}</h6>
                                                    </div>

                                                </React.Fragment>) :
                                                Math.sign(scoredata) == -1 ? (
                                                    <div className="d-flex justify-content-center align-items-center h-100">
                                                        <div className="meter-block text-center">
                                                            <i className="fas fa-tachometer-alt-slow text-success fa-3x mb-3" />
                                                            <h5 style={{ fontSize: "30px" }}>{scoredata + "/" + getStudentSessions.getStudentSessions[0].total_marks}</h5>
                                                        </div>
                                                    </div>
                                                )
                                                    : (<div className="d-flex justify-content-center align-items-center h-100">
                                                        <div className="meter-block text-center">
                                                            <i className="fas fa-tachometer-alt-slow text-success fa-3x mb-3" />
                                                            <h5 style={{ fontSize: "30px" }}>{scoredata + "/" + getStudentSessions.getStudentSessions[0].total_marks}</h5>
                                                        </div>
                                                    </div>)}</React.Fragment>

                                        ) : ("")}
                                    </Card>
                                </Col>
                                <Col xl={8} lg={6} md={12} sm={12} className="my-2">
                                    <Card className="h-100">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h6 className="mb-0">Observations</h6>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                               <ul className="m-0 p-0 list-unstyled two-list" style={{ height: 230, overflowY: "auto" }}>
                                              
                                                                
                                                       
                                                                {getStudentSessions.getStudentSessions[0].observations.theoryObservation!=""?(<li>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.theoryObservation)}</li>):("")} 
                                                                {getStudentSessions.getStudentSessions[0].observations.qtypeObservation!=""?(<li>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.qtypeObservation)}</li>):("")}
                                                                {getStudentSessions.getStudentSessions[0].observations.complexityObservation!=""?(<li>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.complexityObservation)}</li>):("")}
                                                           
                                                
                                                </ul>
                                            </ListGroup.Item>
                                         </ListGroup>
                                    </Card>
                                </Col>
                                {/* <Col xl={8} lg={6} md={12} sm={12} className="my-2">
                                    <Card className="h-100">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h6 className="mb-0">Analysis</h6>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h6>Week Points</h6>
                                                <ul className="m-0 p-0 list-unstyled one-list" style={{ height: 90, overflowY: "auto" }}>
                                                    {getStudentSessions.getStudentSessions[0] != undefined ? (
                                                        <React.Fragment>
                                                            {getStudentSessions.getStudentSessions[0].qtype_report.map((item) => (
                                                                <React.Fragment>
                                                                    {item.accuracy < 60 && item.accuracy > 40 ? (<li>You need to work on {item.question_type_name} questions</li>)
                                                                        : item.accuracy <= 40 ? (<li>You are weak in {item.question_type_name} type questions as getting more wrong answers.</li>) : ("")}
                                                                </React.Fragment>

                                                            ))}

                                                            {getStudentSessions.getStudentSessions[0].theory_report.map((item) => (
                                                                <React.Fragment>
                                                                    {item.accuracy < 60 && item.accuracy > 40 ? (<li>You need to work on {item.question_theory_name} questions</li>)
                                                                        : item.accuracy <= 40 ? (<li>You are weak in {item.question_theory_name} type questions as getting more wrong answers.</li>) : ("")}
                                                                </React.Fragment>

                                                            ))}
                                                        </React.Fragment>
                                                    ) : ("")}
                                                 </ul>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <h6>Strength Points</h6>
                                                <ul className="m-0 p-0 list-unstyled two-list">
                                                    {getStudentSessions.getStudentSessions[0] != undefined ? (
                                                        <React.Fragment>
                                                            {getStudentSessions.getStudentSessions[0].qtype_report.map((item) => (
                                                                <React.Fragment>
                                                                    {item.accuracy >= 80 ? (<li>{item.question_type_name} questions are easy to you</li>)
                                                                        : item.accuracy >= 60 && item.accuracy < 80 ? (<li>You are strong in {item.question_type_name} questions</li>) : ("")}
                                                                </React.Fragment>

                                                            ))}

                                                            {getStudentSessions.getStudentSessions[0].theory_report.map((item) => (
                                                                <React.Fragment>
                                                                    {item.accuracy >= 80 ? (<li>{item.question_theory_name} questions are easy to you</li>)
                                                                        : item.accuracy >= 60 && item.accuracy < 80 ? (<li>You are strong in {item.question_theory_name} questions</li>) : ("")}
                                                                </React.Fragment>

                                                            ))}
                                                        </React.Fragment>
                                                    ) : ("")}
                                                    
                                                </ul>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col> */}
                            </Row>
                            <Row className="my-2">
                                <Col xl={4} lg={12} md={12} sm={12} className="my-2">
                                    <Card as={Card.Body} className="h-100">
                                        <div className="total-questions border-bottom mb-4 d-flex justify-content-between align-items-center">
                                            <h6>Total Questions</h6>
                                            <h6>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].total_questions) : ("")}</h6>
                                        </div>
                                        <div className="d-flex">
                                            <Card as={Card.Body} className="p-3 mr-2" style={{ borderBottom: '1px dashed #dee2e6', zIndex: 1 }}>
                                                <h6 className="mb-0">Answered</h6>
                                                <h6 className="mb-0">{getStudentSessions.getStudentSessions[0] != undefined ? (parseInt(getStudentSessions.getStudentSessions[0].total_questions - getStudentSessions.getStudentSessions[0].not_answered)) : ("")}</h6>
                                            </Card>
                                            <Card as={Card.Body} className="p-3 mb-2">
                                                <h6 className="mb-0">Not-Answered</h6>
                                                <h6 className="mb-0">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].not_answered) : ("")}</h6>
                                            </Card>
                                        </div>
                                        <Card as={Card.Body} className="p-3 mb-3 flex-row align-items-center justify-content-between" style={{ marginTop: '-2px', borderBottomLeftRadius: 0 }}>
                                            <ul className="list-unstyled m-0 p-0">
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div><i className="fas fa-check-circle text-success" />  Correct </div>
                                                    <div className="ml-3">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].correct) : ("")}</div>
                                                </li>
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div><i className="fas fa-times-circle text-danger" />  Wrong </div>
                                                    <div className="ml-3">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].wrong) : ("")}</div>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled m-0 p-0">
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div>CMarks: </div>
                                                    <div className="ml-3">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].correct_marks) : ("")}</div>
                                                </li>
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div>Wrong: </div>
                                                    <div className="ml-3">-{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].negative_marks) : ("")}</div>
                                                </li>
                                            </ul>
                                        </Card>
                                    </Card>
                                </Col>
                                <Col xl={8} lg={12} md={12} sm={12} className="my-2">
                                    <CardGroup>
                                        <Card as={Card.Body} style={{ maxHeight: maxHeight, overflowY: overflowY }}>
                                            <h6>Question Type Wise</h6>
                                            <Card as={Card.Body} className="my-3 p-0 resultsortingtable" style={{ maxHeight: maxHeight, overflowY: overflowY }}>
                                            <CardLessDataTable
                                            articledata={this.questionType(getStudentSessions.getStudentSessions[0].qtype_report,"first")}
                                            articlecolumns={this.questionTypecolumns("first")}
                                            defaultSorted={this.questionTypeSorted} />
                                                {/* <Table className="table-borderless examWise">
                                                    <thead style={{ borderBottom: '1px solid #dee2e6' }}>
                                                        <tr>
                                                            <th>Q type</th>
                                                            <th className="text-success">Correct</th>
                                                            <th className="text-danger">Wrong</th>
                                                            <th className="text-danger">Not Ans</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getStudentSessions.getStudentSessions[0] != undefined ? (
                                                            <React.Fragment>
                                                                {getStudentSessions.getStudentSessions[0].qtype_report.map((gdata) => {
                                                                    if (gdata.correct != 0 || gdata.wrong != 0 || gdata.not_answered != 0) {
                                                                        return (
                                                                            <tr>
                                                                                <td>{gdata.question_type_name}</td>
                                                                                <td>{gdata.correct} </td>
                                                                                <td>{gdata.wrong}</td>
                                                                                <td>{gdata.not_answered}</td>
                                                                            </tr>)
                                                                    }
                                                                }
                                                                )}
                                                            </React.Fragment>

                                                        ) : ("")}

                                                    </tbody>
                                                    <tfoot style={{ borderTop: '1px solid #dee2e6' }}>
                                                        <tr>
                                                            <th>Total</th>
                                                            <th><i className="fas fa-plus-circle text-success" /> {getStudentSessions.getStudentSessions[0] != undefined ? (this.totalCurrect(getStudentSessions.getStudentSessions[0].qtype_report)) : ("")}</th>
                                                            <th><i className="fas fa-minus-circle text-danger" /> {getStudentSessions.getStudentSessions[0] != undefined ? (this.totalWrong(getStudentSessions.getStudentSessions[0].qtype_report)) : ("")}</th>
                                                            <th>{getStudentSessions.getStudentSessions[0] != undefined ? (this.totalNotAns(getStudentSessions.getStudentSessions[0].qtype_report)) : ("")}</th>
                                                        </tr>
                                                    </tfoot>
                                                </Table> */}
                                            </Card>
                                        </Card>
                                        <Card as={Card.Body}>
                                            <Card className="p-2 mb-2">
                                                <Table className="table-borderless examWiseTwo">
                                                    <tbody>
                                                        {/* <tr>
                                                            <td>In time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].in_time) : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Less time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].less_time) : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Over time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].over_time) : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Accuracy</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].accuracy) : ("")}% </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Speed</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].speed) : ("")}Sec / Per Q</td>
                                                        </tr> */}
                                                        <tr>
                                                            <td>In time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].in_time) : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Less time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].less_time) : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Over time</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].over_time) : ("")}</td>
                                                        </tr>


                                                        {/* <tr>
                                                            <td>Attempted</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (Math.round((parseInt(getStudentSessions.getStudentSessions[0].total_questions) - parseInt(getStudentSessions.getStudentSessions[0].not_answered)) * 100 / parseInt(getStudentSessions.getStudentSessions[0].total_questions)) + "%") : ("")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Not Attempted</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (Math.round(parseInt(getStudentSessions.getStudentSessions[0].not_answered) * 100 / parseInt(getStudentSessions.getStudentSessions[0].total_questions)) + "%") : ("")}</td>
                                                        </tr> */}
                                                        <tr>
                                                            <td>Attempted</td>
                                                            <td>{this.attemptedFun(getStudentSessions.getStudentSessions[0].total_questions, getStudentSessions.getStudentSessions[0].not_answered)}%</td>

                                                        </tr>
                                                        <tr>
                                                            <td>Not Attempted</td>
                                                            <td>{this.notAttemptedFun(getStudentSessions.getStudentSessions[0].total_questions, getStudentSessions.getStudentSessions[0].not_answered)}%</td>

                                                        </tr>
                                                        <tr>
                                                            <td>Accuracy</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].accuracy) : ("")}% </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total Taken time</td>
                                                            <td>{this.minutesTimer(getStudentSessions.getStudentSessions[0].total_time)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Speed</td>
                                                            <td>{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].speed) : ("")}Sec / Per Q</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Card>
                                            <Card className="flex-row">
                                                <Card.Header className="errorTitle border-0 p-2">
                                                    <h6 className="errorText m-0">Error Report</h6>
                                                </Card.Header>
                                                <Card.Body className="mx-auto p-1">
                                                    <Table className="table-borderless examWiseThree">
                                                        <tbody>
                                                            {getStudentSessions.getStudentSessions[0] != undefined ? (
                                                                <React.Fragment>
                                                                    {getStudentSessions.getStudentSessions[0].error_report.map((edata) => (
                                                                        <tr>
                                                                            <td>{edata.error_name}</td>
                                                                            <td>{edata.count}</td>
                                                                        </tr>
                                                                    ))}</React.Fragment>) : ("")}

                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                            <Row className="my-2">
                            <Col xl={4} lg={12} md={12} sm={12} className="my-2">
                                    <CardGroup>
                                        <Card as={Card.Body} className="p-2 h-100 bg-white status-resport">
                                            <h6>Question Theory Wise</h6>
                                            <Card as={Card.Body} className="p-0 resultsortingtable">
                                            <CardLessDataTable
                                            articledata={this.questionType(getStudentSessions.getStudentSessions[0].theory_report,"theory")}
                                            articlecolumns={this.questionTypecolumns("theory")}
                                            defaultSorted={this.questionTypeSorted} />
                                                
                                            </Card>
                                        </Card>
                                        </CardGroup>
                                </Col>
                           
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane className="depthreport" eventKey="depthreport">
                            <h5>Summary</h5>
                            <Row>
                                <Col xl={12} lg={12} md={12}>
                                    <h6>Answered vs Complexity vs Time</h6>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12}>
                                    <Card as={Card.Body} className="my-3 p-0 correctComplexitytable">
                                        <CardLessDataTable
                                            articledata={this.correctComplexity(getStudentSessions.getStudentSessions[0].correct_vs_complexity)}
                                            articlecolumns={this.correctcomplexitycolumns}
                                            defaultSorted={this.correctcomplexitySorted} />
                                    </Card>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={12}>
                                    <Card as={Card.Body} className="my-3 p-0 correctComplexitytable">
                                        <CardLessDataTable
                                            articledata={this.correctComplexity(getStudentSessions.getStudentSessions[0].wrong_vs_complexity)}
                                            articlecolumns={this.wrongcomplexitycolumns}
                                            defaultSorted={this.correctcomplexitySorted} />
                                    </Card>
                                </Col>
                                <Col xl={12} lg={12} md={12}>
                                    <h6 className="mt-3">Types of Question vs Answered</h6>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <Card as={Card.Body} className="my-3 p-0 questionTypetable">
                                        <CardLessDataTable
                                            articledata={this.questionType(getStudentSessions.getStudentSessions[0].qtype_report,"second")}
                                            articlecolumns={this.questionTypecolumns("second")}
                                            defaultSorted={this.questionTypeSorted} />
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Modal.Body>
                    <Modal.Footer variant="white" className="py-2">
                        <Button variant="outline-danger" className="px-4" onClick={this.props.pcancelFunction} style={{ borderRadius: 25 }}><i className="fal fa-times mr-2" /> Close</Button>
                    </Modal.Footer>
                </Tab.Container>
            </Modal >
        )
    }
}
export default
    compose(graphql(FETCH_SESSION_DATA,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    session_id: parseInt(props.stateData.sessionid),
                    chapter_id: 0
                },
            }), name: "getStudentSessions"
        }))(PractiseExamHistoryResultModal);
