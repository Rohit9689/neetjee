import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { components } from 'react-select'
import { Container, Row, Col, Button, Card, CardGroup, ListGroup, Table, Tab, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import ReactSpeedometer from "react-d3-speedometer";
import '../components/exams/_resultmodel.scss'
import CardLessDataTable from '../../neetjee_guru/components/datatables/CardLessDataTable';

import { correctComplexitydata, correctComplexitycolumns, correctComplexitydefaultSorted, wrongComplexitydata, wrongComplexitycolumns, wrongComplexitydefaultSorted, questionTypetabledata, questionTypetablecolumns, questionTypetabledefaultSorted, } from '../components/exams/ResultModalData';
import ChangePwdModaldModal from '../components/Profile/ChangePwdModal'
import '../components/navbars/_navbars.scss'
import StackeColumnNegative from '../components/exams/StackeColumnNegative';
import SelectDropDown from '../../neetjee_guru/components/selectdropdown/SelectDropDown';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import parse, { domToReact } from 'html-react-parser';

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

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
class PracticeExamResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            tab:0,
            searchSubject:0,
            searchSubjectvalue:{value:"0",label:"ALL Subjects"}
        }
    }
    // totalPer() {
    //     let progress = "";
    //     let arr = this.props.getStudentSessions.getStudentSessions[0].result_questions
    //     let some = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         let newarr = arr[i];
    //         if (newarr.attempt_answer != "") {
    //             some.push(newarr.id);
    //         }

    //     }
    //     progress = Math.round(some.length / arr.length * 100);
    //     console.log("totalPerprogress", progress, "some:", some, "arr:", arr, "resultarray", this.props.getStudentSessions.getStudentSessions[0].result_questions);
    //     return progress;
    // }
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
        console.log("graphValue123", data);
        return data;

    }
    totFunction() {
        let data = "";
        if (this.props.getStudentSessions.getStudentSessions[0] != undefined) {
            // data = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks) + parseInt(this.props.getStudentSessions.getStudentSessions[0].negative_marks);
            data = parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks);
        }
        console.log("graphValue", data);
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

    //subject 


    subectTotalAccuracy(data) {
        let totArray = [];
        data.map((item) => {
            totArray.push(parseInt(item.accuracy));
        });

        let sum = totArray.reduce(function (a, b) {
            return a + b;
        }, 0);

        return sum;
    }
    //subject end
    correctComplexity(data) {
        let returnArray = [];
        data.map((cmap) => {
            const newObj = {
                complexity: cmap.complexity,
                in_time: parseInt(cmap.in_time),
                less_time: parseInt(cmap.less_time),
                over_time: parseInt(cmap.over_time)
            }
            returnArray.push(newObj);
        });
        return returnArray;
    }
    questionType(data) {
        console.log("questionType", data);
        let returnArray = [];
        data.map((cmap) => {
            let accuracy = "";
            if (cmap.accuracy != null) {
                accuracy = parseInt(cmap.accuracy);
            } else {
                accuracy = 0;
            }

            let speed = "";
            if (cmap.speed != null) {
                speed = parseInt(cmap.speed);
            } else {
                speed = 0;
            }
            const newObj = {
                qtype: cmap.question_type_name,
                correct: parseInt(cmap.correct),
                wrong: parseInt(cmap.wrong),
                skipped: parseInt(cmap.not_answered),
                accuracy: parseInt(accuracy),
                speed: parseInt(speed)
            }
            returnArray.push(newObj);
        });
        return returnArray;
    }
    subjectfrontType(data, type) {
        let returnArray = [];
        if (type == "subject") {
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
                const newObj = {
                    subject: cmap.subject,
                    correct: parseInt(cmap.correct),
                    wrong: parseInt(cmap.wrong),
                    skipped: parseInt(cmap.not_answered),
                    accuracy: parseInt(accuracy)
                }
                returnArray.push(newObj);
            });

        }
        else if (type == "theory") {
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
                const newObj = {
                    question_theory_name: cmap.question_theory_name,
                    correct: parseInt(cmap.correct),
                    wrong: parseInt(cmap.wrong),
                    skipped: parseInt(cmap.not_answered),
                    accuracy: accuracy
                }
                returnArray.push(newObj);
            });
        }
        else {
            data.map((cmap) => {
                let accuracy = "";
                if (cmap.accuracy != null) {
                    accuracy = parseInt(cmap.accuracy);
                } else {
                    accuracy = 0;
                }
                if (accuracy != 0 || cmap.correct != 0 || cmap.wrong != 0 || cmap.not_answered != 0) {
                    if(this.state.searchSubject!="0"){
                        if(this.state.searchSubject==cmap.subject){
                            let subjectData = this.props.getStudentSessions.getStudentSessions[0].subject_report.find((a) => a.id == cmap.subject);
                            const newObj = {
                                subject: subjectData.subject,
                                chapter: cmap.chapter_name,
                                correct: parseInt(cmap.correct),
                                wrong: parseInt(cmap.wrong),
                                skipped: parseInt(cmap.not_answered),
                                accuracy: accuracy
                            }
                            returnArray.push(newObj);
                        }
                       
                    }
                    else{
                        let subjectData = this.props.getStudentSessions.getStudentSessions[0].subject_report.find((a) => a.id == cmap.subject);
                    const newObj = {
                        subject: subjectData.subject,
                        chapter: cmap.chapter_name,
                        correct: parseInt(cmap.correct),
                        wrong: parseInt(cmap.wrong),
                        skipped: parseInt(cmap.not_answered),
                        accuracy: accuracy
                    }
                    returnArray.push(newObj);
                    }
                    
                }

            });
        }

        return returnArray;
    }
    subjectfrontTypecolumns(type) {
        let subjectfrontTypecolumns = [];
        if (type == "subject") {
            subjectfrontTypecolumns = [
                {
                    dataField: "subject",
                    text: "Subject",
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
                    text: "Error",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Not Ans",
                    sort: true
                }

            ];

        }
        else if (type == "theory") {
            subjectfrontTypecolumns = [
                {
                    dataField: "question_theory_name",
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
                    text: "Error",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Not Ans",
                    sort: true
                }

            ];
        }
        else {
            subjectfrontTypecolumns = [
                {
                    dataField: "chapter",
                    text: "Chapter",
                    sort: true

                },
                {
                    dataField: "subject",
                    text: "Subject",
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
                    text: "Error",
                    sort: true
                },
                {
                    dataField: "skipped",
                    text: "Not Ans",
                    sort: true
                }

            ];
        }
        return subjectfrontTypecolumns;

    }

    questionTypecolumns(type) {
        let questionTypecolumns = [];
        if (type = "front") {
            questionTypecolumns = [
                {
                    dataField: "qtype",
                    text: "Q Type",
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



            ];


        }
        else {
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
                    text: "Accuracy (%)",
                    sort: true
                }
                ,
                {
                    dataField: "speed",
                    text: "speed(sec/Q)",
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
        console.log("attemptedFun", Data);
        if (!isNaN(Data)) {
            return Data;
        }
        else {
            return "0";
        }

    }
    notAttemptedFun(tot, not) {
        let Data = Math.round(parseInt(not) * 100 / parseInt(tot));
        console.log("notAttemptedFun", Data);
        if (!isNaN(Data)) {
            return Data;
        }
        else {
            return "0";
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
    QuestionsTotal() {
        let total = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct) + parseInt(this.props.getStudentSessions.getStudentSessions[0].wrong) + parseInt(this.props.getStudentSessions.getStudentSessions[0].not_answered);
        return total;

    }
    examNameFun() {
        if (this.props.history.location.state.examtype == "schedule_exam" || this.props.history.location.state.examtype =="schedule") {
            return "Schedule Exam";

        }
        else if (this.props.history.location.state.examtype == "custom") {
            return "Custom Exam";
        }
        else if (this.props.history.location.state.examtype == "error_exam" || this.props.history.location.state.examtype == "error" ) {
            return "Error Exam";
        }
        else if (this.props.history.location.state.examtype == "previous_exam" || this.props.history.location.state.examtype =="previous") {
            return "Previous Exam";
        }
        else{
            return "Custom Exam";
        }
    }
    subjectWiseTab=(tab)=>{
        if(tab==0){
        this.setState({
            tab:0
        });
        }
        else{
            this.setState({
                tab:tab
            });
        }
    }
    handleSelectInputChange = (name, value) => {
        if(name=="searchSubject"){
            let subjectData = this.props.getStudentSessions.getStudentSessions[0].subject_report.find((a) => a.id == value);
            if(value!=0){
                this.setState({
                    searchSubjectvalue:{value:subjectData.id,label:subjectData.subject}
                });
            }
            else{
                this.setState({
                    searchSubjectvalue:{value:"0",label:"ALL Subjects"}
                });
            }
            
        }
        
        this.setState({
            [name]: value
        });
    }
    subjectFunction(data){
        let newArray=[];
        if(this.state.searchSubject!="0"){
            const newObj1={
                label:"ALL Subjects",
                value:"0"
            }
            newArray.push(newObj1);
        }
        data.map((item)=>{
            if(item!=undefined){
                const newObj={
                    label:item.subject,
                    value:item.id
                }
                newArray.push(newObj);


            }

        })
        return newArray;

    }
    windowClose=()=>{
        window.close();
    }
    
    render() {
        console.log("loca",this.props.history.location.state);
        const now = 20;
        const getStudentSessions = this.props.getStudentSessions;
        const loading1 = getStudentSessions.loading;
        const error1 = getStudentSessions.error;
        // if (loading1) return null;
        if (loading1) {
            return (
                <div className="resultModal">
                    <Navbar bg="white" className="header-top">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Navbar.Brand as={Link} to="/student/home" className="mr-auto" inline="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="130.501" height="37.139" viewBox="0 0 159.501 37.139"><g transform="translate(-384.741 -406.553)"><g transform="translate(445.845 406.553)"><path fill="#2a346c" d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z" transform="translate(-825.498 -406.553)"></path><path fill="#2a346c" d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z" transform="translate(-983.902 -406.553)"></path><path fill="#2a346c" d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z" transform="translate(-1047.488 -442.954)"></path><path fill="#2a346c" d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z" transform="translate(-1167.251 -441.157)"></path><path fill="#2a346c" d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z" transform="translate(-1309.031 -441.157)"></path></g><g transform="translate(445.797 439.343)"><path fill="#2a346c" d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-825.153 -643.45)"></path><path fill="#2a346c" d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z" transform="translate(-864.261 -643.45)"></path><path fill="#2a346c" d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-907.798 -643.45)"></path><path fill="#2a346c" d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z" transform="translate(-969.577 -643.45)"></path><path fill="#2a346c" d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1009.586 -643.45)"></path><path fill="#2a346c" d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z" transform="translate(-1047.869 -643.45)"></path><path fill="#2a346c" d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z" transform="translate(-1088.442 -643.45)"></path><path fill="#2a346c" d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1125.485 -643.45)"></path><path fill="#2a346c" d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z" transform="translate(-1161.778 -643.074)"></path><path fill="#2a346c" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-1200.4 -643.45)"></path><path fill="#2a346c" d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z" transform="translate(-1261.126 -643.074)"></path><path fill="#2a346c" d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z" transform="translate(-1304.889 -643.45)"></path><path fill="#2a346c" d="M1431.991,643.51h.785v4.228h-.785Z" transform="translate(-1347.863 -643.45)"></path><path fill="#2a346c" d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z" transform="translate(-1372.971 -643.45)"></path><path fill="#2a346c" d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1417.109 -643.45)"></path></g><g transform="translate(384.741 406.948)"><path fill="#2a346c" d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z" transform="translate(-384.741 -409.399)"></path><path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z" transform="translate(-571.865 -409.399)"></path></g></g></svg>
                                </Navbar.Brand>
                                <Nav className="ml-auto">

                                </Nav>
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>
                    <div className="sub-breadcrumb py-3" style={{ backgroundColor: '#212B65' }}>
                        <Container>
                            <Row className="align-items-center">
                                <Col xl={5} lg={5} md={5} sm={12}>
                                    {/* <Button variant="link text-white text-decoration-none" onClick={this.props.history.goBack}> <i className="fal fa-long-arrow-left"></i> Back to Home</Button> */}
                                </Col>
                                <Col xl={7} lg={7} md={7} sm={12}>
                                    <h5 className="text-white mb-0">Your Practice {this.props.history.location.state.stype=="error"?("Error"):("")} Exam Result</h5>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="result-content">
                        <Container>
                            <Tab.Container defaultActiveKey='overview'>

                                <Card as={Card.Body} className="shadow border-0 mb-4 justify-content-center flex-row">
                                    <div class="spinner-border text-primary text-center"></div>
                                </Card>

                            </Tab.Container>
                        </Container>
                    </div>


                </div>
            )
        }
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getStudentSessions", getStudentSessions.getStudentSessions[0]);
        
       const totmdata = parseInt(this.props.getStudentSessions.getStudentSessions[0].correct_marks) - parseInt(this.props.getStudentSessions.getStudentSessions[0].negative_marks);
        let minVal = 0
        let smeter = "";

        if (Math.sign(totmdata) == 1) {
            smeter = parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks) / 5;
        }
        else if (Math.sign(totmdata) == -1) {
            minVal = totmdata
            smeter = (parseInt(totmdata) + parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks)) / 5;
        }
        else {
            smeter = parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks) / 5;
        }

        console.log("smeter", Math.round(smeter),"min:",minVal);

        let vArray = [minVal,];
        let value = 0;
        for (let i = 0; i < 4; i++) {
            value = value + Math.round(smeter);
            vArray.push(value);
        }
        vArray.push(parseInt(this.props.getStudentSessions.getStudentSessions[0].total_marks));


        console.log("vArray", vArray);

        return (
            <div className="resultModal">
                <Navbar bg="white" className="header-top">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Navbar.Brand as={Link} to="/student/home" className="mr-auto" inline="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="130.501" height="37.139" viewBox="0 0 159.501 37.139"><g transform="translate(-384.741 -406.553)"><g transform="translate(445.845 406.553)"><path fill="#2a346c" d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z" transform="translate(-825.498 -406.553)"></path><path fill="#2a346c" d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z" transform="translate(-983.902 -406.553)"></path><path fill="#2a346c" d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z" transform="translate(-1047.488 -442.954)"></path><path fill="#2a346c" d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z" transform="translate(-1167.251 -441.157)"></path><path fill="#2a346c" d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z" transform="translate(-1309.031 -441.157)"></path></g><g transform="translate(445.797 439.343)"><path fill="#2a346c" d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-825.153 -643.45)"></path><path fill="#2a346c" d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z" transform="translate(-864.261 -643.45)"></path><path fill="#2a346c" d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-907.798 -643.45)"></path><path fill="#2a346c" d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z" transform="translate(-969.577 -643.45)"></path><path fill="#2a346c" d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1009.586 -643.45)"></path><path fill="#2a346c" d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z" transform="translate(-1047.869 -643.45)"></path><path fill="#2a346c" d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z" transform="translate(-1088.442 -643.45)"></path><path fill="#2a346c" d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1125.485 -643.45)"></path><path fill="#2a346c" d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z" transform="translate(-1161.778 -643.074)"></path><path fill="#2a346c" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-1200.4 -643.45)"></path><path fill="#2a346c" d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z" transform="translate(-1261.126 -643.074)"></path><path fill="#2a346c" d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z" transform="translate(-1304.889 -643.45)"></path><path fill="#2a346c" d="M1431.991,643.51h.785v4.228h-.785Z" transform="translate(-1347.863 -643.45)"></path><path fill="#2a346c" d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z" transform="translate(-1372.971 -643.45)"></path><path fill="#2a346c" d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1417.109 -643.45)"></path></g><g transform="translate(384.741 406.948)"><path fill="#2a346c" d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z" transform="translate(-384.741 -409.399)"></path><path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z" transform="translate(-571.865 -409.399)"></path></g></g></svg>
                            </Navbar.Brand>
                            <Nav className="ml-auto">
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="sub-breadcrumb py-3" style={{ backgroundColor: '#212B65' }}>
                    <Container>
                        <Row className="align-items-center">
                            <Col xl={5} lg={5} md={5} sm={12}>
                                {this.props.history.location.state.type=="live"?( <Link className="btn-link text-white text-decoration-none" onClick={()=>this.windowClose()}> <i className="fal fa-long-arrow-left"></i> Back</Link>):
                                this.props.history.location.state.stype=="practice"?
                                ( <Link className="btn-link text-white text-decoration-none" 
                                to={{ pathname: "/student/subject/practice-exam-history",
                                state: {
                                    chapters:this.props.history.location.state.getData.chapters,
                                    chapterid: this.props.history.location.state.getData.chapterid,
                                    chapter: this.props.history.location.state.getData.chapter,
                                    topicid: this.props.history.location.state.getData.topicid,
                                    topic: this.props.history.location.state.getData.topic,
                                    ocid: this.props.history.location.state.getData.ocid,
                                    otid: this.props.history.location.state.getData.otid,
                                    subjectid: this.props.history.location.state.getData.subjectid
                                } }}> <i className="fal fa-long-arrow-left"></i> Back</Link>)
                                :
                                this.props.history.location.state.stype=="error"?
                                ( <Link className="btn-link text-white text-decoration-none" 
                                to={{ pathname: "/student/subject/start-error-exam",
                                state: {
                                    etype: this.props.history.location.state.getData.etype,
            hname: this.props.history.location.state.getData.hname,
            chapterid: this.props.history.location.state.getData.chapterid,
            chapter: this.props.history.location.state.getData.chapter,
            ocid: this.props.history.location.state.getData.ocid,
            otid: this.props.history.location.state.getData.otid,
            topicid: this.props.history.location.state.getData.topicid,
            topic: this.props.history.location.state.getData.topic,
            chapters: this.props.history.location.state.getData.chapters,
            subjectid: this.props.history.location.state.getData.subjectid,
            hchaptername: this.props.history.location.state.getData.hchaptername
                                } }}> <i className="fal fa-long-arrow-left"></i> Back</Link>):("")}
                               
                            </Col>
                            <Col xl={7} lg={7} md={7} sm={12}>
                            <h5 className="text-white mb-0">Your Practice {this.props.history.location.state.stype=="error"?("Error"):("")} Exam Result</h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="result-content">
                    <Container>
                        <Tab.Container defaultActiveKey='overview'>
                            <Card className="shadow border-0 mb-4">
                                <Card.Header className="bg-white shadow border-0">
                                    <Row>
                                        <Col xl={5} lg={5} md={12}>
                                            <div className="d-flex justify-content-between align-items-center my-1">
                                                <h5 className="mb-0"><i className="fas fa-star text-warning" />Practice {this.props.history.location.state.stype=="error"?("Error"):("")} Exam Result</h5>
                                            </div>
                                        </Col>
                                        <Col xl={5} lg={5} md={7} sm={9}>
                                        </Col>
                                        <Col xl={2} lg={2} md={12} sm={3} className="text-right my-1">
                                            <div className="custom-btns float-right d-flex align-items-center">
                                                <Link
                                                    to={{
                                                        pathname: "/student/practice-view-question-answer",
                                                        state: {
                                                            sessionid: this.props.history.location.state.sessionid,
                                                            examtype: this.props.history.location.examtype,
                                                            type:this.props.history.location.state.type,
                                                            getData:this.props.history.location.state.getData,
                                                            stype:this.props.history.location.state.stype,
                                                        }
                                                    }}
                                                    className="d-flex align-items-center rounded-pill btn px-3 py-2" style={{ background: '#212B65', color: '#fff', border: '1px solid #212B65' }}> Q&A Views</Link>
                                               
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body as={Tab.Content}>
                                    {/* <Tab.Pane eventKey="overview"> */}
                                       <Row className="my-2">
                                            <Col xl={4} lg={5} md={6} sm={12} className="my-2">
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white">
                                                        <Card.Title className="h6 mb-0">Over All Score</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">

                                                        <div className="score-chart text-center" style={{ width: '100%', height: '130px' }}>

                                                            <ReactSpeedometer
                                                                needleHeightRatio={0.8}
                                                                maxSegmentLabels={10}
                                                                segments={3}
                                                                minValue={minVal}
                                                                maxValue={this.totFunction()}
                                                                currentValueText={'${value}'}
                                                                customSegmentStops={vArray}
                                                                // segmentColors={["#e53935", "#ffa726", "#ef5350", "#ffa726", "#29b6f6"]}
                                                                startColor="green"
                                                                endColor="blue"
                                                                needleColor="red"
                                                                value={this.graphValue()}
                                                                ringWidth={45}
                                                                textColor={'#6c757d'}
                                                                height={150}
                                                                width={200}
                                                            />

                                                        </div>
                                                        <hr className="my-2" />
                                                        <Card as={Card.Body} className="p-3 border-0 bg-light flex-row justify-content-between align-items-center">
                                                            <h6 className="mb-0 d-flex align-items-center">
                                                                <span className="text">Answered <br /> Correct</span>
                                                                <span className="ml-2">:{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].correct) : ("")}</span></h6>
                                                            <h6 className="mb-0">Total Time: {this.minutesTimer(getStudentSessions.getStudentSessions[0].total_time)}</h6>
                                                        </Card>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xl={8} lg={7} md={6} sm={12} className="my-2">
                                            <Card className="h-100">
                                                    <Card.Header className="bg-white">
                                                        <h6 className="mb-0">Observations</h6>
                                                    </Card.Header>
                                                    <Card.Body style={{ height: 150, overflowY: 'scroll' }}>
                                                        <div className="observation-list">
                                                            <ul as={Row} className="m-0 p-0 list-unstyled one-list">
                                                               
                                                            {getStudentSessions.getStudentSessions[0].observations.theoryObservation!=""?(<li as={Col} xl={6} lg={6} md={12}>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.theoryObservation)}</li>):("")} 
                                                                {getStudentSessions.getStudentSessions[0].observations.qtypeObservation!=""?(<li as={Col} xl={6} lg={6} md={12}>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.qtypeObservation)}</li>):("")}
                                                                {getStudentSessions.getStudentSessions[0].observations.complexityObservation!=""?(<li as={Col} xl={6} lg={6} md={12}>{this.parseFun(getStudentSessions.getStudentSessions[0].observations.complexityObservation)}</li>):("")}
                                                               
                                                            </ul>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="my-2">
                                            <Col xl={4} lg={6} md={12} sm={12} className="my-2">
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white total-questions">
                                                        <h6 className="mb-0">Marks Calculations</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="d-flex">
                                                            <Card as={Card.Body} className="p-3 mr-2" style={{ borderBottom: '1px dashed #dee2e6', zIndex: 1 }}>
                                                                <h6 className="mb-0">Answered</h6>
                                                                <h6 className="mb-0">{getStudentSessions.getStudentSessions[0] != undefined ? (parseInt(getStudentSessions.getStudentSessions[0].correct)+parseInt(getStudentSessions.getStudentSessions[0].wrong)) : ("")}</h6>
                                                            </Card>
                                                            <Card as={Card.Body} className="p-3 mb-2">
                                                                <h6 className="mb-0">Not-Answered</h6>
                                                                <h6 className="mb-0">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].not_answered) : ("")}</h6>
                                                            </Card>
                                                        </div>
                                                        <Card as={Card.Body} className="p-3 flex-row justify-content-between align-items-center" style={{ marginTop: '-2px', borderBottomLeftRadius: 0 }}>
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
                                                                    <div>Correct Marks :</div>
                                                                    <div className="ml-3">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].correct_marks) : ("")}</div>
                                                                </li>
                                                                <li className="d-flex justify-content-between align-items-center">
                                                                    <div>Wrong Marks :</div>
                                                                    <div className="ml-3">-{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].negative_marks) : ("")}</div>
                                                                </li>
                                                            </ul>
                                                        </Card>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xl={4} lg={12} md={12} sm={12} className="my-2">
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white">
                                                        <h6 className="mb-0">Questions Attempts</h6>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">
                                                        <div className="d-flex my-2 px-3">
                                                            <p className="w-75">Correct Answered</p>
                                                            <p className="w-25 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].correct) : ("")}</p>
                                                        </div>
                                                        <div className="d-flex my-2 px-3">
                                                            <p className="w-75">Wrong Answered</p>
                                                            <p className="w-25 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].wrong) : ("")}</p>
                                                        </div>
                                                        <div className="d-flex my-2 px-3">
                                                            <p className="w-75">Skipped</p>
                                                            <p className="w-25 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].not_answered) : ("")}</p>
                                                        </div>
                                                       
                                                        <div className="d-flex bg-light px-3 py-3 rounded">
                                                            <p className="w-75 font-weight-bold">Total Questions</p>
                                                            <p className="w-25 font-weight-bold">{this.QuestionsTotal()}</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xl={4} lg={12} md={12} sm={12} className="my-2">
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white">
                                                        <h6 className="mb-0">Time Analysis</h6>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">
                                                        <Card as={Card.Body} className="mb-2 p-0">
                                                            <div className="d-flex my-1 px-3">
                                                                <p className="w-50">In Time</p>
                                                                <p className="w-50 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].in_time) : ("")}</p>
                                                            </div>
                                                            <div className="d-flex my-1 px-3">
                                                                <p className="w-50">Less time</p>
                                                                <p className="w-50 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].less_time) : ("")}</p>
                                                            </div>
                                                            <div className="d-flex my-1 px-3">
                                                                <p className="w-50">Over time</p>
                                                                <p className="w-50 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].over_time) : ("")} </p>
                                                            </div>
                                                        </Card>
                                                        <Card as={Card.Body} className="mb-2 p-0">
                                                            <div className="d-flex my-1 px-3">
                                                                <p className="w-50">Accurancy</p>
                                                                <p className="w-50 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].accuracy) : ("")}%</p>
                                                            </div>
                                                            <div className="d-flex my-1 px-3">
                                                                <p className="w-50">Speed</p>
                                                                <p className="w-50 font-weight-bold">{getStudentSessions.getStudentSessions[0] != undefined ? (getStudentSessions.getStudentSessions[0].speed) : ("")} Q / Sec.</p>
                                                            </div>
                                                        </Card>
                                                        <div className="d-flex bg-light px-3 py-3 rounded">
                                                            <p className="w-50 font-weight-bold">Total Time Taken</p>
                                                            <p className="w-50 font-weight-bold">{this.minutesTimer(getStudentSessions.getStudentSessions[0].total_time)}</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={6} lg={6} md={12} sm={12}>
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white">
                                                        <h6 className="mb-0">Question Type Analysis</h6>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">
                                                        <Card style={{ height: 200 }}
                                                            className="border-0 resultsortingtable">
                                                            <CardLessDataTable
                                                                articledata={this.questionType(getStudentSessions.getStudentSessions[0].qtype_report)}
                                                                articlecolumns={this.questionTypecolumns("front")}
                                                                defaultSorted={this.questionTypeSorted} />
                                                            
                                                        </Card>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xl={6} lg={6} md={12} sm={12}>
                                                <Card className="h-100">
                                                    <Card.Header className="bg-white"><h6 className="mb-0">Question Theory</h6></Card.Header>
                                                    <Card.Body className="p-2">
                                                    <Card
                                                            className="border-0 resultsortingtable">
                                                           <CardLessDataTable
                                                            articledata={this.subjectfrontType(getStudentSessions.getStudentSessions[0].theory_report, "theory")}
                                                            articlecolumns={this.subjectfrontTypecolumns("theory")}
                                                        />
                                                            
                                                        </Card>
                                                        
                                                       
                                                    </Card.Body>
                                                </Card>

                                            </Col>
                                        </Row>
                                       
                                        <Row>
                                            <Col xl={12} lg={12} md={12}>
                                            <div className="title my-3">
                                                <h5>In depth report</h5>
                                                <h6>Answered vs Complexity vs Time</h6>
                                            </div>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                <Card as={Card.Body} className="border-0 my-3 p-0 correctComplexitytable">
                                                    <CardLessDataTable
                                                        articledata={this.correctComplexity(getStudentSessions.getStudentSessions[0].correct_vs_complexity)}
                                                        articlecolumns={this.correctcomplexitycolumns}
                                                       // defaultSorted={this.correctcomplexitySorted} 
                                                        />
                                                </Card>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                <Card as={Card.Body} className="border-0 my-3 p-0 correctComplexitytable">
                                                    <CardLessDataTable
                                                        articledata={this.correctComplexity(getStudentSessions.getStudentSessions[0].wrong_vs_complexity)}
                                                        articlecolumns={this.wrongcomplexitycolumns}
                                                        //defaultSorted={this.correctcomplexitySorted} 
                                                        />
                                                </Card>
                                            </Col>
                                            
                                        </Row>
                                   

                                    <Tab.Pane eventKey="overall">
                                        <h4>Overall</h4>
                                    </Tab.Pane>
                                    


                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Container>
                </div>
            </div>
        )
    }
}


export default
    compose(graphql(FETCH_SESSION_DATA,
        {
            options: props => ({
                variables: {
                   mobile: Cookies.get("mobile"),
                    session_id: parseInt(props.history.location.state.sessionid),
                    chapter_id: 0

                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getStudentSessions"
        }))(PracticeExamResult);