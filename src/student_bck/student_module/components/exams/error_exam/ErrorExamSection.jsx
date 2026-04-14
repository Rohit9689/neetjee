import React, { Component } from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Form, CardGroup, ListGroup, Tab, Nav, Table, Image } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import { bind } from '@wry/context';
import moment from 'moment';
import UserRestrictionAlert from '../../home/UserRestrictionAlert';

const ERROR_EXAM = gql`
  mutation(
    $params:StudentErrorExam  
    ) {
        studentErrorExam(
        params: $params
     )
  }
`;

// class
const classes = [
    { value: 1, label: 'XI' },
    { value: 2, label: 'XII' }
];

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};



class ErrorExamSection extends Component {
    constructor(props) {
        super(props)
        //console.log("CustomExamSection", props);


        this.state = {
            class: 0,
            exam: "1",
            examvalue: { value: "1", label: "NEET" },
            subjectArray: [],
            subjectArraycu: [],
            formValid: true,
            submitError: "",
            class1: 0,
            eventKey: "first",
            unanswered1: 0,
            errorquestions1: 0,
            unanswered2: 0,
            errorquestions2: 0,
            pquestions1: 0,
            examquestions1: 0,
            pquestions2: 0,
            examquestions2: 0,
            pquestionscheck1: "0",
            examquestionscheck1: "0",
            unansweredcheck1: "0",
            errorquestionscheck1: "0",
            pquestionscheck2: "0",
            examquestionscheck2: "0",
            unansweredcheck2: "0",
            errorquestionscheck2: "0",
            loadbutton: 0
        }


    }
    componentDidMount = () => {
        if (Cookies.get("examid") == "5") {

            //console.log("this.props", this.props.globals.globals.subjects);
            let examsData = this.props.studentGlobals.exams.find((a) => a.id == this.state.exam);
            let examsubjectData = examsData.exam_subjects;
            let sampleArray1 = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let someData = this.props.getSubjects.find((a) => a.id == idata.subject_id);
                    const newarr1 = {
                        ...someData,
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        checkedall: false
                    }
                    sampleArray1.push(newarr1);

                    someData.studentChapters.map((item) => {
                        item.active = ""
                        item.checked = false
                    });

                }

            }
            this.setState({
                subjectArray: sampleArray1,
                subjectArraycu: sampleArray1,

            });

        }
        else {
            let sampleArray = [];
            for (let i = 0; i < this.props.getSubjects.length; i++) {
                let someData = this.props.getSubjects[i];
                const newarr1 = {
                    ...someData,
                    classActive1: "",
                    classActive2: "",
                    classActive3: "",
                    checkedall: false
                }
                sampleArray.push(newarr1);

                someData.studentChapters.map((item) => {
                    item.active = ""
                    item.checked = false
                });
            }
            this.setState({
                subjectArray: sampleArray,
                subjectArraycu: sampleArray,

            });
        }


    }
    checkeOnchange = (e) => {
        console.log("checkeOnchange", e.target.name);
        if (e.target.checked == true) {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({ [name]: value });
        }
        else {
            const name = e.target.name;
            const value = "";
            this.setState({ [name]: value });
        }
        if (e.target.name == "pquestionscheck2") {
            if (this.state.eventKey == "second") {
                if (e.target.checked == true) {
                    let arr = this.state.subjectArraycu;
                    let unansA = [];
                    let erroqA = [];
                    let oldcount2 = 0;
                    let oldcount3 = 0;
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {
                                if (this.state.examquestionscheck2 != "") {
                                    const unans = parseInt(cData.exam_unanswered);
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.exam_wrong_answered) + parseInt(cData.practice_wrong_answered);;
                                    erroqA.push(parseInt(erroq));
                                }
                                else {
                                    const unans = 0;
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.practice_wrong_answered);;
                                    erroqA.push(parseInt(erroq));
                                }

                                // const unans = parseInt(cData.practice_unanswered);
                                // unansA.push(parseInt(unans));

                                // const erroq = parseInt(cData.practice_wrong_answered);
                                // erroqA.push(parseInt(erroq));
                            }
                        }
                    }
                    for (let num of unansA) {
                        oldcount2 = oldcount2 + num
                    }
                    for (let num of erroqA) {
                        oldcount3 = oldcount3 + num
                    }
                    this.setState({
                        unanswered2: oldcount2,
                        errorquestions2: oldcount3,
                    });

                } else {
                    let arr = this.state.subjectArraycu;
                    let unansA = [];
                    let erroqA = [];
                    let oldcount2 = 0;
                    let oldcount3 = 0;
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {

                                // const unans = parseInt(cData.practice_unanswered) + parseInt(cData.exam_unanswered);
                                // unansA.push(parseInt(unans));

                                // const erroq = parseInt(cData.practice_wrong_answered) + parseInt(cData.exam_wrong_answered);
                                // erroqA.push(parseInt(erroq));

                                if (this.state.examquestionscheck2 != "") {


                                    const unans = parseInt(cData.exam_unanswered);
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.exam_wrong_answered);
                                    erroqA.push(parseInt(erroq));
                                }
                                else {
                                    // erroq = 0;
                                    // unans = 0;

                                    const unans = 0;
                                    unansA.push(parseInt(unans));

                                    const erroq = 0;
                                    erroqA.push(parseInt(erroq));
                                }
                            }
                        }
                    }
                    for (let num of unansA) {
                        oldcount2 = oldcount2 + num
                    }
                    for (let num of erroqA) {
                        oldcount3 = oldcount3 + num
                    }
                    this.setState({
                        unanswered2: oldcount2,
                        errorquestions2: oldcount3,
                    });

                }
            }

        }
        if (e.target.name == "pquestionscheck1") {
            if (this.state.eventKey == "first") {
                if (e.target.checked == true) {
                    let arr = this.state.subjectArray;
                    let unans = "";
                    let erroq = "";
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {
                                //unans = parseInt(cData.practice_unanswered);

                                //unans = 0;
                                if (this.state.examquestionscheck1 != "") {
                                    unans = parseInt(cData.exam_unanswered);
                                    erroq = parseInt(cData.exam_wrong_answered) + parseInt(cData.practice_wrong_answered);
                                }
                                else {
                                    erroq = parseInt(cData.practice_wrong_answered);
                                    unans = 0;
                                }
                            }
                        }
                    }
                    this.setState({
                        unanswered1: unans,
                        errorquestions1: erroq,
                    });

                }
                else {
                    let arr = this.state.subjectArray;
                    let unans = "";
                    let erroq = "";
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {
                                // unans = parseInt(cData.practice_unanswered);


                                // erroq = parseInt(cData.practice_wrong_answered);
                                //unans = parseInt(cData.practice_unanswered) + parseInt(cData.exam_unanswered);

                                // erroq = parseInt(cData.practice_wrong_answered) + parseInt(cData.exam_wrong_answered);

                                if (this.state.examquestionscheck1 != "") {
                                    erroq = parseInt(cData.exam_wrong_answered);
                                    unans = parseInt(cData.exam_unanswered);
                                }
                                else {
                                    erroq = 0;
                                    unans = 0;
                                }
                            }
                        }
                    }
                    this.setState({
                        unanswered1: unans,
                        errorquestions1: erroq,
                    });

                }
            }

        }
        if (e.target.name == "examquestionscheck2") {
            if (this.state.eventKey == "second") {
                if (e.target.checked == true) {
                    let arr = this.state.subjectArraycu;
                    let unansA = [];
                    let erroqA = [];
                    let oldcount2 = 0;
                    let oldcount3 = 0;
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {

                                // const unans = parseInt(cData.practice_unanswered) + parseInt(cData.exam_unanswered);
                                // unansA.push(parseInt(unans));

                                // const erroq = parseInt(cData.practice_wrong_answered) + parseInt(cData.exam_wrong_answered);
                                // erroqA.push(parseInt(erroq));

                                if (this.state.pquestionscheck2 != "") {
                                    const unans = parseInt(cData.exam_unanswered);
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.practice_wrong_answered) + parseInt(cData.exam_wrong_answered);
                                    erroqA.push(parseInt(erroq));
                                }
                                else {
                                    const unans = parseInt(cData.exam_unanswered);
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.exam_wrong_answered);
                                    erroqA.push(parseInt(erroq));
                                }
                            }
                        }
                    }
                    for (let num of unansA) {
                        oldcount2 = oldcount2 + num
                    }
                    for (let num of erroqA) {
                        oldcount3 = oldcount3 + num
                    }
                    this.setState({
                        unanswered2: oldcount2,
                        errorquestions2: oldcount3,
                    });
                }
                else {
                    let arr = this.state.subjectArraycu;
                    let unansA = [];
                    let erroqA = [];
                    let oldcount2 = 0;
                    let oldcount3 = 0;
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {
                                // const unans = parseInt(cData.exam_unanswered);
                                // unansA.push(parseInt(unans));

                                // const erroq = parseInt(cData.exam_wrong_answered);
                                // erroqA.push(parseInt(erroq));

                                if (this.state.pquestionscheck2 != "") {

                                    const unans = 0;
                                    unansA.push(parseInt(unans));

                                    const erroq = parseInt(cData.practice_wrong_answered);
                                    erroqA.push(parseInt(erroq));
                                } else {

                                    const unans = 0;
                                    unansA.push(parseInt(unans));

                                    const erroq = 0;
                                    erroqA.push(parseInt(erroq));
                                }
                            }
                        }
                    }
                    for (let num of unansA) {
                        oldcount2 = oldcount2 + num
                    }
                    for (let num of erroqA) {
                        oldcount3 = oldcount3 + num
                    }
                    this.setState({
                        unanswered2: oldcount2,
                        errorquestions2: oldcount3,
                    });
                }

            }

        }
        if (e.target.name == "examquestionscheck1") {
            console.log("examquestionscheck1");
            if (this.state.eventKey == "first") {

                if (e.target.checked == true) {
                    let arr = this.state.subjectArray;
                    let unans = "";
                    let erroq = "";

                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {

                                if (this.state.pquestionscheck1 != "") {
                                    unans = parseInt(cData.exam_unanswered);
                                    erroq = parseInt(cData.practice_wrong_answered) + parseInt(cData.exam_wrong_answered);
                                }
                                else {
                                    unans = parseInt(cData.exam_unanswered);
                                    erroq = parseInt(cData.exam_wrong_answered);
                                }
                            }
                        }
                    }
                    this.setState({
                        unanswered1: unans,
                        errorquestions1: erroq,
                    });

                }
                else {
                    let arr = this.state.subjectArray;
                    let unans = "";
                    let erroq = "";
                    for (let i = 0; i < arr.length; i++) {
                        let idata = arr[i];
                        let chapter = idata.studentChapters;
                        for (let c = 0; c < chapter.length; c++) {
                            let cData = chapter[c];
                            if (cData.checked == true) {
                                // unans = parseInt(cData.exam_unanswered);
                                // erroq = parseInt(cData.exam_wrong_answered);
                                console.log("this.state.pquestionscheck1345", this.state.pquestionscheck1);
                                if (this.state.pquestionscheck1 != "") {
                                    console.log("123");
                                    unans = 0;
                                    erroq = parseInt(cData.practice_wrong_answered);
                                } else {
                                    console.log("345");
                                    unans = 0;
                                    erroq = 0;
                                }

                            }
                        }
                    }
                    this.setState({
                        unanswered1: unans,
                        errorquestions1: erroq,
                    });

                }
            }

        }
    }
    handleFormSubmit = e => {
        console.log("handleFormSubmit");
        e.preventDefault();
        this.setState({
            loadbutton: 1
        });
        if (this.state.formValid) {
            let syllabus = [];
            let sub_type = "";
            let un_answered = "";
            let error_questions = "";
            let practice_questions = "";
            let test_questions = "";
            let exam_type = "";
            if (Cookies.get("examid") != "5") {
                if (Cookies.get("examid") == "2") {
                    exam_type = "1";
                }
                else {
                    exam_type = "0";
                }
            }
            else {
                if (this.state.exam == "2") {
                    exam_type = "1";
                }
                else {
                    exam_type = "0";
                }

            }


            if (this.state.eventKey == "first") {
                sub_type = "chapter";
                //exam_type = this.state.examtype1

                if (this.state.unansweredcheck1 != "") {
                    un_answered = 1;
                }
                else {
                    un_answered = 0;
                }
                if (this.state.errorquestionscheck1 != "") {
                    error_questions = 1;
                }
                else {
                    error_questions = 0;
                }
                if (this.state.pquestionscheck1 != "") {
                    practice_questions = 1;

                }
                else {
                    practice_questions = 0;
                }

                if (this.state.examquestionscheck1 != "") {
                    test_questions = 1;

                }
                else {
                    test_questions = 0;
                }
                let array = this.state.subjectArray;
                for (let i = 0; i <= array.length; i++) {
                    let idata = array[i];
                    let chArray = [];

                    if (idata != undefined) {
                        let chapters = idata.studentChapters;

                        for (let c = 0; c <= chapters.length; c++) {
                            let cdata = chapters[c];
                            if (cdata != undefined) {
                                if (cdata.checked == true) {
                                    const id = cdata.id;
                                    chArray.push(id);
                                }
                            }

                        }
                        const newobj = {
                            subject_id: parseInt(idata.id),
                            chapters: chArray
                        }
                        syllabus.push(newobj);
                    }



                }
            }
            else {
                //exam_type = this.state.examtype2
                sub_type = "cumulative";
                if (this.state.unansweredcheck2 != "") {
                    un_answered = 1;
                }
                else {
                    un_answered = 0;
                }
                if (this.state.errorquestionscheck2 != "") {
                    error_questions = 1;
                }
                else {
                    error_questions = 0;
                }
                if (this.state.pquestionscheck2 != "") {
                    practice_questions = 1;

                }
                else {
                    practice_questions = 0;
                }

                if (this.state.examquestionscheck2 != "") {
                    test_questions = 1;

                }
                else {
                    test_questions = 0;
                }

                let array = this.state.subjectArraycu;
                for (let i = 0; i <= array.length; i++) {
                    let idata = array[i];
                    let chArray = [];

                    if (idata != undefined) {
                        let chapters = idata.studentChapters;

                        for (let c = 0; c <= chapters.length; c++) {
                            let cdata = chapters[c];
                            if (cdata != undefined) {
                                if (cdata.checked == true) {
                                    const id = cdata.id;
                                    chArray.push(id);
                                }
                            }

                        }
                        const newobj = {
                            subject_id: parseInt(idata.id),
                            chapters: chArray
                        }
                        syllabus.push(newobj);
                    }
                }
            }
            console.log("syllabus", syllabus);
            let status = false;
            syllabus.map((data) => {
                if (data.chapters.length > 0) {
                    status = true;
                }

            })
            if (status) {
                const params = {
                    mobile: Cookies.get("mobile"),
                    sub_type: sub_type,
                    source: 0,
                    exam_type: parseInt(exam_type),
                    practice_questions: practice_questions,
                    test_questions: test_questions,
                    un_answered: un_answered,
                    error_questions: error_questions,
                    syllabus: syllabus,
                    question_types: [],
                    complexity: [],
                    question_theory: []
                };
                console.log("errorparams", params);
                this.customfunction(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            }
            else if (!status) {
                this.setState({ submitError: "Please select chapter at least one subject", loadbutton: 0 });
            }

        } else {
            this.setState({ submitError: "Please fill all the values to proceed", loadbutton: 0 });
        }
    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("updatedata", data);
                if (data.studentErrorExam) {
                    console.log("updatedatadataID", data.studentErrorExam)
                    // this.props.history.push({
                    //     pathname: "/student/subject/custom-instructions",
                    //     state: {
                    //         sessionid: data.studentErrorExam,
                    //         type: "Error Exam",
                    //         etype: "error"
                    //     }
                    // }
                    // );
                    this.setState({
                        submitError: "", loadbutton: 0
                    });
                    localStorage.setItem("sessionid", data.studentErrorExam);
                    localStorage.setItem("type", "Error Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "error");

                    window.open("/student/subject/exam", "_blank")
                }
            }
        });
    };
    classGetDataFunction(data) {
        let sarray = [];
        const obj1 = {
            value: 0,
            label: "ALL",
        }
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            const obj = {
                value: idata.id,
                label: idata.class,
            }
            sarray.push(obj);
        }
        sarray.unshift(obj1);
        return sarray;
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            //     () => {
            //     this.validateField(name, value);
            // }
        );
    };
    handleSelectInputChange = (name, value) => {
        if (name == "exam") {
            let examsData = this.props.studentGlobals.exams.find((a) => a.id == value);


            //subjets Data
            //console.log("this.props", this.props.globals.globals.subjects);

            let examsubjectData = examsData.exam_subjects;
            let sampleArray1 = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let someData = this.props.getSubjects.find((a) => a.id == idata.subject_id);
                    const newarr1 = {
                        ...someData,
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        checkedall: false
                    }
                    sampleArray1.push(newarr1);

                    someData.studentChapters.map((item) => {
                        item.active = ""
                        item.checked = false
                    });

                }

            }
            this.setState({
                subjectArray: sampleArray1,
                subjectArraycu: sampleArray1,
                examvalue: {
                    value: value,
                    label: examsData.exam

                }

            });
            //end subects Data


        }
        const ename = name;
        const evalue = value;
        this.setState({ [ename]: evalue }

        );
    }

    subjectFunction = (id, index) => {

        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive = "";
        }
        arr[idindex].classActive = "active";
        this.setState({ subjectArray: arr });
        this.setState({
            submitError: ""
        });

    }

    updateFields = (type) => {
        console.log("updateFields", type);
        if (type == "multiple" || type == "all") {
            console.log("multiple");
            let practiceQuestions = 0;
            let examQuestions = 0;
            let unansweredQuestions = 0;
            let errorQuestions = 0;
            console.log("this.state.subjectArraycu", this.state.subjectArraycu);

            this.state.subjectArraycu.map(item => {
                item.studentChapters.map(qitem => {
                    if (qitem.checked == true) {

                        practiceQuestions += parseInt(qitem.practice_unanswered) + parseInt(qitem.practice_wrong_answered);
                        examQuestions += parseInt(qitem.exam_unanswered) + parseInt(qitem.exam_wrong_answered);
                        unansweredQuestions += parseInt(qitem.practice_unanswered) + parseInt(qitem.exam_unanswered);
                        errorQuestions += parseInt(qitem.practice_wrong_answered) + parseInt(qitem.exam_wrong_answered);
                    }
                })
            })
            console.log("unansweredQuestions", unansweredQuestions);
            this.setState({
                unanswered2: unansweredQuestions,
                errorquestions2: errorQuestions,
                pquestions2: practiceQuestions,
                examquestions2: examQuestions
            })
        }
        else if (type == "single") {
            let practiceQuestions = 0;
            let examQuestions = 0;
            let unansweredQuestions = 0;
            let errorQuestions = 0;

            this.state.subjectArray.map(item => {
                item.studentChapters.map(qitem => {
                    if (qitem.checked == true) {

                        practiceQuestions += parseInt(qitem.practice_unanswered) + parseInt(qitem.practice_wrong_answered);
                        examQuestions += parseInt(qitem.exam_unanswered) + parseInt(qitem.exam_wrong_answered);
                        unansweredQuestions += parseInt(qitem.practice_unanswered) + parseInt(qitem.exam_unanswered);
                        errorQuestions += parseInt(qitem.practice_wrong_answered) + parseInt(qitem.exam_wrong_answered);

                        console.log("llll", qitem);
                    }
                })
            })
            this.setState({
                unanswered1: unansweredQuestions,
                errorquestions1: errorQuestions,
                pquestions1: practiceQuestions,
                examquestions1: examQuestions
            })
        }



    }

    chaptersFunction = (e, subid, qtyid) => {
        let arr = this.state.subjectArray.map(item => {

            if (item.id == subid) {
                const qtype = item.studentChapters.map(qitem => {
                    if (qitem.id == qtyid) {
                        console.log("qitem.checked", qitem.checked);
                        if (qitem.checked == false) {
                            return { ...qitem, checked: true, active: "active" }
                        } else {
                            return { ...qitem, checked: false, active: "active" }
                        }
                    }
                    return { ...qitem, checked: false, active: "active" }

                })
                return { ...item, studentChapters: qtype };
            }
            return item;
        }

        )
        this.setState({ subjectArray: arr }, () => this.updateFields("single"));
    }
    questionFunction = (e, subid, qtyid) => {
        console.log("chaptersFunction", subid, qtyid);
        let foundData = this.state.subjectArraycu.find((a) => a.id == subid);
        let overAllQuestion = foundData.studentChapters;

        let findactive = overAllQuestion.find((a) => a.active == "active");
        if (findactive != undefined) {
            let findex = overAllQuestion.indexOf(findactive);
            overAllQuestion[findex].active = "";
        }

        let arr = this.state.subjectArraycu.map(item => {

            if (item.id == subid) {
                console.log("satisfiedsub", item.id, subid);
                const qtype = item.studentChapters.map(qitem => {
                    console.log("satisfiedchap", qitem.id, qtyid);

                    if (qitem.id == qtyid) {
                        console.log("satisfiedsub", qitem.checked);
                        if (qitem.checked == false) {
                            return { ...qitem, checked: true, active: "active" }
                        } else {
                            return { ...qitem, checked: false, active: "active" }
                        }
                    }
                    return qitem;
                })
                return { ...item, studentChapters: qtype };


            }
            return item;
        }

        )
        this.setState({ subjectArraycu: arr }, () => this.updateFields("multiple"));
        //this.setState({ subjectArraycu: arr });
        //this.pQuestionFun2(arr, e.target.checked, qtyid);
    }
    subjectFunction1 = (id, index) => {

        let arr = this.state.subjectArraycu;
        let foundData = this.state.subjectArraycu.find((a) => a.id == id);
        console.log("subjectFunction1", foundData);
        let idindex = this.state.subjectArraycu.indexOf(foundData);
        let foundData2 = this.state.subjectArraycu.find((a) => a.classActive1 == "active");
        let idindex2 = this.state.subjectArraycu.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive1 = "";
        }
        arr[idindex].classActive1 = "active";
        this.setState({ subjectArraycu: arr });


    }
    CheckAllFun = (e, subjectid, chid) => {
        console.log("CheckAllFun");
        let arr = this.state.subjectArraycu;
        let findsubData = arr.find((a) => a.id == subjectid);
        let idindex = arr.indexOf(findsubData);
        // arr[idindex].checkedall = true;

        console.log("e.target.checked", e.target.checked);
        if (e.target.checked == true) {
            findsubData.studentChapters.map((t) => {
                if (t.enabled == true) {
                    if (t.error_questions > 0) {
                        t.checked = true;
                    }
                }


            });

            arr[idindex].checkedall = true;
        }
        else {
            findsubData.studentChapters.map((t) => {
                if (t.enabled == true) {
                    if (t.error_questions > 0) {
                        t.checked = "";
                    }
                }

            });
            arr[idindex].checkedall = "";
        }
        this.setState({ subjectArraycu: arr }, () => this.updateFields("all"));
        //this.setState({ subjectArraycu: arr });
        //this.pQuestionFun2(arr, e.target.checked);
    }
    eventkeyFun = (data) => {
        console.log("eventkeyFun", data);
        if (Cookies.get("examid") == "5") {
            console.log("this.state.exam", this.state.exam);
            let examsData = this.props.studentGlobals.exams.find((a) => a.id == "1");
            let examsubjectData = examsData.exam_subjects;
            let sampleArray1 = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let someData = this.props.getSubjects.find((a) => a.id == idata.subject_id);
                    const newarr1 = {
                        ...someData,
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        checkedall: false
                    }
                    sampleArray1.push(newarr1);

                    someData.studentChapters.map((item) => {
                        item.active = ""
                        item.checked = false
                    });

                }

            }
            this.setState({
                eventKey: data,
                subjectArray: sampleArray1,
                subjectArraycu: sampleArray1,

                exam: "1",
                examvalue: { value: "1", label: "NEET" },
                class: 0,


                formValid: true,
                submitError: "",
                class1: 0,
                unanswered1: 0,
                errorquestions1: 0,
                unanswered2: 0,
                errorquestions2: 0,
                pquestions1: 0,
                examquestions1: 0,
                pquestions2: 0,
                examquestions2: 0,
                pquestionscheck1: "0",
                examquestionscheck1: "0",
                unansweredcheck1: "0",
                errorquestionscheck1: "0",
                pquestionscheck2: "0",
                examquestionscheck2: "0",
                unansweredcheck2: "0",
                errorquestionscheck2: "0"

            });

        }
        else {
            let msampleArray = [];
            for (let i = 0; i < this.props.getSubjects.length; i++) {
                let someData = this.props.getSubjects[i];
                const newarr1 = {
                    ...someData,
                    classActive1: "",
                    classActive2: "",
                    classActive3: "",
                    checkedall: false
                }
                msampleArray.push(newarr1);

                someData.studentChapters.map((item) => {
                    item.active = ""
                    item.checked = false
                });
            }
            this.setState({
                eventKey: data,
                subjectArray: msampleArray,
                subjectArraycu: msampleArray,

                exam: "1",
                examvalue: { value: "1", label: "NEET" },
                class: 0,


                formValid: true,
                submitError: "",
                class1: 0,
                unanswered1: 0,
                errorquestions1: 0,
                unanswered2: 0,
                errorquestions2: 0,
                pquestions1: 0,
                examquestions1: 0,
                pquestions2: 0,
                examquestions2: 0,
                pquestionscheck1: "0",
                examquestionscheck1: "0",
                unansweredcheck1: "0",
                errorquestionscheck1: "0",
                pquestionscheck2: "0",
                examquestionscheck2: "0",
                unansweredcheck2: "0",
                errorquestionscheck2: "0"

            });
        }
    }
    getexamType() {
        let getArray = [];
        for (let i = 0; i <= this.props.studentGlobals.exams.length; i++) {
            let idata = this.props.studentGlobals.exams[i];
            if (idata != undefined) {

                const newObj = {
                    value: idata.id,
                    label: idata.exam
                }
                getArray.push(newObj);



            }

        }
        return getArray;
    }
    render() {
        let locsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            locsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const classname = this.props.studentGlobals.classes.find((a) => a.id == this.state.class);
        const classname1 = this.props.studentGlobals.classes.find((a) => a.id == this.state.class1);

        let examname = ""
        if (Cookies.get("examid") != "5") {
            examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        }
        else {
            examname = this.props.studentGlobals.exams.find((a) => a.id == this.state.exam);
        }

        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        let currentTime = moment().unix();
        let trailRestriction = this.props.getSubjects.find((a) => a.id == "2");
        console.log("trailRestriction", isuserValid.error_cumulative);
        let clength = trailRestriction.studentChapters.filter((a) => a.enabled == true);
        return (
            <div className="errorExam_paper pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Form.Text className="form-text text-danger">
                    {this.state.submitError}
                </Form.Text>
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-4">Error Exam</h5>
                            <Link
                                to={{
                                    pathname: "/student/subject/exam-history",
                                    state: {
                                        examtype: "error_exam"
                                    }
                                }}
                                className="btn btn-outline-primary">Exam History
                        </Link>
                        </div>


                        <Tab.Container id="adaptiveExam-tabs" defaultActiveKey="first">
                            <Nav as={Row} variant="pills">
                                <Nav.Item as={Col} xl={6} lg={6} md={12} sm={12}>
                                    <Nav.Link
                                        onClick={(e) => this.eventkeyFun("first")}
                                        eventKey="first" className="p-0 mb-3">
                                        <Card as={Card.Body} className="flex-row h-100">
                                            <i className="fal fa-file fafw fa-3x" />
                                            <div className="text-area ml-4">
                                                <h6>Chapter Exam</h6>
                                                <p>Only one chapter selection from any one subject.</p>
                                            </div>
                                        </Card>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as={Col} xl={6} lg={6} md={12} sm={12}>
                                    <Nav.Link
                                        onClick={(e) => this.eventkeyFun("second")}
                                        eventKey="second" className="p-0 mb-3">
                                        <Card as={Card.Body} className="flex-row h-100">
                                            <i className="fal fa-file fafw fa-3x" />
                                            <div className="text-area ml-4">
                                                <h6>Cumulative Exam</h6>
                                                <p>Select multi chapter from <br />Multiple subjects.</p>
                                            </div>
                                        </Card>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                {isuserValid.error_chapter == false ? (
                                    <Tab.Pane eventKey="first">
                                        {(isuserValid.isTrialUser == true && clength.length < 20) || (currentTime > isuserValid.expiry_date && clength.length < 20) ? (
                                            <div style={{ color: "#f81201" }}>
                                                {Cookies.get("student_userlevel") == "1" ? (
                                                    <small>*Note:
                                                Now you have limited Access.</small>
                                                ) : (
                                                        <small>*Note: To access full syllabus <span style={{ color: '#f81201 !important', fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                    )}

                                            </div>
                                        ) : ("")}
                                        <Card>
                                            <Card.Header className="bg-white d-md-flex justify-content-between align-items-center">
                                                <h6 className="mb-0">Chapter Exam - Syllabus</h6>

                                                <div className="d-flex align-items-center px-2">
                                                    <Form.Label className="mb-0">Class</Form.Label>
                                                    <div className="ml-2" style={{ width: 150 }}>
                                                        <SelectDropDown
                                                            handleChange={this.handleSelectInputChange}
                                                            name="class"
                                                            options={this.classGetDataFunction(this.props.studentGlobals.classes)}
                                                            placeholderName={'class'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </div>
                                                </div>
                                            </Card.Header>

                                            <Card.Body>
                                                {Cookies.get("examid") == "5" ? (
                                                    <div className="w-25">

                                                        <Form.Group className="mb-4" controlId="formCategory">
                                                            <Form.Label>Exam</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.state.examvalue}
                                                                handleChange={this.handleSelectInputChange}
                                                                name="exam"
                                                                options={this.getexamType()}
                                                                placeholderName={'Exam'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                    </div>

                                                ) : ("")}

                                                {/* <Row>
                                                    {Cookies.get("examid") == "2" ? (<Col xl={4} lg={4} md={12} sm={12}>
                                                        <div className="d-flex align-items-center mb-2 px-2">
                                                            <div className="w-100 ml-2">
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <input
                                                                        type="radio"
                                                                        id="customRadioType1"
                                                                        value="1"
                                                                        name="examtype1"
                                                                        className="custom-control-input"
                                                                        onChange={this.handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadioType1"
                                                                    >
                                                                        Main
              </label>
                                                                </div>
                                                                <div className="custom-control custom-radio custom-control-inline">
                                                                    <input
                                                                        type="radio"
                                                                        id="customRadioType2"
                                                                        value="2"
                                                                        name="examtype1"
                                                                        className="custom-control-input"
                                                                        onChange={this.handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor="customRadioType2"
                                                                    >
                                                                        Advance
              </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>) : ("")}
                                                </Row> */}
                                                <CardGroup className="border-0">
                                                    <Card>
                                                        <Card.Header className="bg-white">
                                                            <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-2">
                                                            <ul className="list-unstyled subjects-list m-0">
                                                                {this.state.subjectArray.map((getsub, index) => {
                                                                    const getsinglesub = locsubjects.find((a) => a.id == getsub.id);
                                                                    return (
                                                                        <div>
                                                                            <li
                                                                                className={getsub.classActive}
                                                                                onClick={() => this.subjectFunction(getsub.id, index)}
                                                                            >{getsinglesub.subject} </li>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header className="bg-white">
                                                            <Card.Title className="mb-0 h6">Chapters:</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-2">
                                                            <Scrollbars style={{ height: 130 }}
                                                                {...this.props}
                                                                renderThumbVertical={renderThumb}
                                                                autoHide
                                                                autoHideTimeout={500}
                                                                autoHideDuration={200}>
                                                                <ul className="list-unstyled topic-list m-0 pl-1">
                                                                    {this.state.subjectArray.map((chData, index1) => {
                                                                        console.log("chData.studentChapters345", chData.studentChapters);
                                                                        //let filterData = chData.studentChapters.filter((a) => a.enabled == true);
                                                                        let filterData = chData.studentChapters
                                                                        if (this.state.class != '0') {
                                                                            filterData = chData.studentChapters.filter((a) => a.class == this.state.class);

                                                                            //filterData = chData.studentChapters.filter((a) => a.class == this.state.class && a.enabled == true);
                                                                        }
                                                                        //console.log("filterData", filterData.length);
                                                                        let erroquestionscount = filterData.filter((a) => a.error_questions > 0);
                                                                        return (
                                                                            <div>
                                                                                {/* {chData.classActive == "active" ? (
                                                                                    <div> */}
                                                                                {erroquestionscount.length > 0 ? (
                                                                                    <React.Fragment>
                                                                                        {chData.classActive == "active" ? (
                                                                                            <React.Fragment>
                                                                                                {filterData.map((cData, index) => {
                                                                                                    const getsinglesub = locsubjects.find((a) => a.id == chData.id);
                                                                                                    const getsinglechap = getsinglesub.studentChapters.find((b) => b.id == cData.id);
                                                                                                    if (cData.enabled == true) {

                                                                                                        if (cData.error_questions != 0) {
                                                                                                            return (
                                                                                                                <div>
                                                                                                                    <li style={{cursor:"pointer"}} className={cData.active}>
                                                                                                                        <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                                            <Form.Check.Input
                                                                                                                                checked={cData.checked}
                                                                                                                                type="checkbox"
                                                                                                                                onClick={(e) => this.chaptersFunction(e, chData.id, cData.id)}
                                                                                                                            />
                                                                                                                            <Form.Check.Label
                                                                                                                                htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                                            >{getsinglechap.chapter} - {cData.error_questions}</Form.Check.Label>
                                                                                                                        </Form.Check>
                                                                                                                    </li>
                                                                                                                </div>

                                                                                                            )
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        return (
                                                                                                            <div>
                                                                                                                <li style={{cursor:"pointer"}} onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                                    <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                                    {getsinglechap.chapter}
                                                                                                                </li>

                                                                                                            </div>

                                                                                                        )
                                                                                                    }

                                                                                                })}
                                                                                            </React.Fragment>
                                                                                        ) : ("")}

                                                                                    </React.Fragment>
                                                                                ) : (
                                                                                        <div className="text-danger text-center">
                                                                                            {index1 == 0 ? ("No error questions are available") : ("")}

                                                                                        </div>
                                                                                    )}


                                                                                {/* </div>
                                                                                ) : ("")} */}

                                                                            </div>

                                                                        )
                                                                    }
                                                                    )}
                                                                </ul>
                                                            </Scrollbars>
                                                        </Card.Body>
                                                    </Card>
                                                </CardGroup>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col xl={6} lg={6} md={12}>
                                                        <h6 className="mb-4">Source</h6>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Practise Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.pquestions1) ? ("0") : (this.state.pquestions1)}
                                                                </span></Form.Label>
                                                                <Form.Check
                                                                    custom
                                                                    type="checkbox"
                                                                    id="pqchapcheckbox01"
                                                                    label=""
                                                                    name="pquestionscheck1"
                                                                    checked={this.state.pquestionscheck1 != "" ? ('checked') : ("")}
                                                                    onChange={this.checkeOnchange}
                                                                //value={this.state.pquestions1}
                                                                />
                                                            </div>
                                                        </Card>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Test Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.examquestions1) ? ("0") : (this.state.examquestions1)}
                                                                </span></Form.Label>
                                                                <Form.Check
                                                                    custom
                                                                    type="checkbox"
                                                                    id="eqchapcheckbox01"
                                                                    label=""
                                                                    name="examquestionscheck1"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.examquestions1}
                                                                    checked={this.state.examquestionscheck1 != "" ? ('checked') : ("")}
                                                                />
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={12}>
                                                        <h6 className="mb-4">Question Type</h6>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Un-Answered - <span className="font-weight-bold">
                                                                    {isNaN(this.state.unanswered1) ? ("0") : (this.state.unanswered1)}
                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="unchapcheckbox03" label=""
                                                                    name="unansweredcheck1"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.unanswered1} 
                                                                    checked={this.state.unansweredcheck1 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Error Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.errorquestions1) ? ("0") : (this.state.errorquestions1)}
                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="erchapcheckbox04" label=""
                                                                    name="errorquestionscheck1"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.errorquestions1} 
                                                                    checked={this.state.errorquestionscheck1 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Tab.Pane>
                                ) : (<Tab.Pane eventKey="first">
                                    <Card>
                                        <div className="text-center">
                                            <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                                            <h5 className="text-danger">Chapter feature is not available for your package</h5>
                                        </div>
                                    </Card>
                                </Tab.Pane>)}
                                {isuserValid.error_cumulative == false ? (
                                    <Tab.Pane eventKey="second">
                                        {(isuserValid.isTrialUser == true && clength.length < 20) || (currentTime > isuserValid.expiry_date && clength.length < 20) ? (
                                            <div style={{ color: "#f81201" }}>
                                                {Cookies.get("student_userlevel") == "1" ? (
                                                    <small>*Note:
                                                Now you have limited Access.</small>
                                                ) : (
                                                        <small>*Note: To access all Previous Papers <span style={{ color: '#f81201 !important', fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                    )}

                                            </div>) : ("")}
                                        <Card>
                                            <Card.Header className="bg-white d-md-flex justify-content-between align-items-center">
                                                <h6 className="mb-0">Cumulative Exam - Syllabus</h6>

                                                <div className="d-flex align-items-center px-2">
                                                    <Form.Label className="mb-0">Class</Form.Label>
                                                    <div className="ml-2" style={{ width: 150 }}>
                                                        <SelectDropDown
                                                            handleChange={this.handleSelectInputChange}
                                                            name="class1"
                                                            options={this.classGetDataFunction(this.props.studentGlobals.classes)}
                                                            placeholderName={'class'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />

                                                    </div>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>

                                                {Cookies.get("examid") == "5" ? (



                                                    <div className="w-25">

                                                        <Form.Group className="mb-4" controlId="formCategory">
                                                            <Form.Label>Exam</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.state.examvalue}
                                                                handleChange={this.handleSelectInputChange}
                                                                name="exam"
                                                                options={this.getexamType()}
                                                                placeholderName={'Exam'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                    </div>

                                                ) : ("")}






                                                {/* {Cookies.get("examid") == "2" ? (<Col xl={4} lg={4} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2 px-2">
                                                        <div className="w-100 ml-2">
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="customRadioType1"
                                                                    value="1"
                                                                    name="examtype2"
                                                                    className="custom-control-input"
                                                                    onChange={this.handleInputChange}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customRadioType1"
                                                                >
                                                                    Main
              </label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="customRadioType2"
                                                                    value="2"
                                                                    name="examtype2"
                                                                    className="custom-control-input"
                                                                    onChange={this.handleInputChange}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customRadioType2"
                                                                >
                                                                    Advance
              </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>) : ("")} */}
                                                <CardGroup className="border-0">
                                                    <Card>
                                                        <Card.Header className="bg-white">
                                                            <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-2">
                                                            <ul className="list-unstyled subjects-list m-0">
                                                                {this.state.subjectArraycu.map((getsub, index) => {
                                                                    const getsinglesub = locsubjects.find((a) => a.id == getsub.id);
                                                                    return (
                                                                        <li
                                                                            className={getsub.classActive1}
                                                                            onClick={() => this.subjectFunction1(getsub.id, index)}
                                                                        >{getsinglesub.subject} </li>)
                                                                })}
                                                            </ul>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header className="bg-white">
                                                            <Card.Title className="mb-0 h6">Chapters:</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-2">
                                                            <Scrollbars style={{ height: 130 }}
                                                                {...this.props}
                                                                renderThumbVertical={renderThumb}
                                                                autoHide
                                                                autoHideTimeout={500}
                                                                autoHideDuration={200}>
                                                                <ul className="list-unstyled topic-list m-0 pl-1">
                                                                    {this.state.subjectArraycu.map((chData, index1) => {
                                                                        let filterData = chData.studentChapters;
                                                                        //let filterData = chData.studentChapters.filter((a) => a.enabled == true);
                                                                        if (this.state.class1 != '0') {
                                                                            //filterData = chData.studentChapters.filter((a) => a.class == this.state.class1 && a.enabled == true);
                                                                            filterData = chData.studentChapters.filter((a) => a.class == this.state.class1);
                                                                        }

                                                                        let erroquestionscount = filterData.filter((a) => a.error_questions > 0);
                                                                        console.log("erroquestionscount", erroquestionscount.length, chData.classActive1);
                                                                        return (
                                                                            <div>
                                                                                {/* {chData.classActive1 == "active" ? (
                                                                                    <div> */}
                                                                                {erroquestionscount.length > 0 ? (<React.Fragment>

                                                                                    {chData.classActive1 == "active" ? (
                                                                                        <React.Fragment>
                                                                                            {filterData.map((cData, index) => {
                                                                                                const getsinglesub = locsubjects.find((a) => a.id == chData.id);
                                                                                                const getsinglechap = getsinglesub.studentChapters.find((b) => b.id == cData.id);
                                                                                                if (cData.error_questions != 0) {
                                                                                                    return (

                                                                                                        <div>
                                                                                                            {index == 0 ? (<li style={{cursor:"pointer"}}>
                                                                                                                <Form.Check type="checkbox" id="checkboxAll" custom>
                                                                                                                    <Form.Check.Input
                                                                                                                        type="checkbox"
                                                                                                                        onClick={(e) => this.CheckAllFun(e, chData.id, cData.id)}
                                                                                                                        checked={chData.checkedall}
                                                                                                                    />
                                                                                                                    <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                                                                                </Form.Check>
                                                                                                            </li>) : ("")}
                                                                                                            {cData.enabled == true ? (
                                                                                                                <li style={{cursor:"pointer"}} className={cData.active}>
                                                                                                                    <Form.Check type="checkbox" id={"chapcheckboxOneTwo" + "_" + index} custom>
                                                                                                                        <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.questionFunction(e, chData.id, cData.id)} />
                                                                                                                        <Form.Check.Label
                                                                                                                            htmlFor={"chapcheckboxOneTwo" + "_" + index}
                                                                                                                        >{getsinglechap.chapter} - {cData.error_questions}</Form.Check.Label>
                                                                                                                    </Form.Check>
                                                                                                                </li>
                                                                                                            ) : (
                                                                                                                    <li style={{cursor:"pointer"}} onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                                        <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                                        {getsinglechap.chapter}
                                                                                                                    </li>
                                                                                                                )}

                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            })}
                                                                                        </React.Fragment>
                                                                                    ) : ("")
                                                                                    }
                                                                                </React.Fragment>) : (
                                                                                        <div className="text-danger text-center">
                                                                                            {index1 == 0 ? ("No error questions are available") : ("")}

                                                                                        </div>)}


                                                                                {/* </div>
                                                                                ) : ("")} */}

                                                                            </div>

                                                                        )
                                                                    })}
                                                                </ul>
                                                            </Scrollbars>
                                                        </Card.Body>
                                                    </Card>
                                                </CardGroup>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col xl={6} lg={6} md={12}>
                                                        <h6 className="mb-4">Source</h6>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Practise Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.pquestions2) ? ("0") : (this.state.pquestions2)}
                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="pqchapcheckbox02" label=""
                                                                    name="pquestionscheck2"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.pquestions2}
                                                                    checked={this.state.pquestionscheck2 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Test Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.examquestions2) ? ("0") : (this.state.examquestions2)}
                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="eqchapcheckbox02" label="" name="examquestionscheck2"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.examquestions2}
                                                                    checked={this.state.examquestionscheck2 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={12}>
                                                        <h6 className="mb-4">Question Type</h6>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Un-Answered - <span className="font-weight-bold">
                                                                    {isNaN(this.state.unanswered2) ? ("0") : (this.state.unanswered2)}

                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="unchapcheckbox02" label=""
                                                                    name="unansweredcheck2"
                                                                    onChange={this.checkeOnchange}
                                                                    //value={this.state.unanswered2}
                                                                    checked={this.state.unansweredcheck2 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                        <Card as={Card.Body} className="p-2 mb-2">
                                                            <div className="d-flex justify-content-between pl-3">
                                                                <Form.Label>Error Questions - <span className="font-weight-bold">
                                                                    {isNaN(this.state.errorquestions2) ? ("0") : (this.state.errorquestions2)}
                                                                </span></Form.Label>
                                                                <Form.Check custom type="checkbox" id="erchapcheckbox02" label=""
                                                                    name="errorquestionscheck2"
                                                                    onChange={this.checkeOnchange}
                                                                    value={this.state.errorquestions2}
                                                                    checked={this.state.errorquestionscheck2 != "" ? ('checked') : ("")} />
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </Tab.Pane>
                                ) : (
                                        <Tab.Pane eventKey="second">
                                            <Card>
                                                <div className="text-center">
                                                    <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                                                    <h5 className="text-danger">Cumulative feature is not available for your package</h5>
                                                </div>
                                            </Card>
                                        </Tab.Pane>
                                    )}


                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Class </th>
                                            {this.state.eventKey == "first" ? (
                                                <th>: {this.state.class != 0 ? (classname != undefined ? (classname.class) : ("")) : ("ALL")}</th>
                                            ) : (
                                                    <th>: {this.state.class != 0 ? (classname1 != undefined ? (classname1.class) : ("")) : ("ALL")}</th>
                                                )}
                                        </tr>
                                        <tr>
                                            <th>Exam </th>
                                            <th>: {examname.exam} </th>
                                        </tr>
                                        {/* <tr>
                                            <th> Duration </th>
                                            <th>: 180min </th>
                                        </tr>
                                        <tr>
                                            <th>No Of Questions </th>
                                            <th>: 180</th>
                                        </tr> */}
                                    </tbody>
                                </Table>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <Scrollbars style={{ height: "400px" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.state.eventKey == "first" ? (
                                        <React.Fragment>
                                            {this.state.subjectArray.map((data) => {
                                                const getsinglesub = locsubjects.find((a) => a.id == data.id);
                                                return (

                                                    <Card className="border-0 bg-light">
                                                        <Card.Header className="bg-secondary">
                                                            <Card.Title className="mb-0 text-white">{getsinglesub.subject}</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-1">
                                                            <Card>
                                                                <ListGroup variant="flush">
                                                                    {data.studentChapters.map((data1) => {
                                                                        const singlechapter = getsinglesub.studentChapters.find((b) => b.id == data1.id)
                                                                        if (data1.error_questions > 0) {
                                                                            return (
                                                                                <React.Fragment>{data1.checked == true ? (
                                                                                    <ListGroup.Item>{singlechapter.chapter} - {data1.error_questions}</ListGroup.Item>) : ("")}</React.Fragment>

                                                                            )
                                                                        }
                                                                    })}


                                                                </ListGroup>
                                                            </Card>
                                                        </Card.Body>
                                                    </Card>

                                                )
                                            })}
                                        </React.Fragment>
                                    ) : (
                                            <React.Fragment>
                                                {this.state.subjectArraycu.map((data) => {
                                                    const getsinglesub = locsubjects.find((a) => a.id == data.id);
                                                    return (

                                                        <Card className="border-0 bg-light">
                                                            <Card.Header className="bg-secondary">
                                                                <Card.Title className="mb-0 text-white">{getsinglesub.subject}</Card.Title>
                                                            </Card.Header>
                                                            <Card.Body className="p-1">
                                                                <Card>
                                                                    <ListGroup variant="flush">
                                                                        {data.studentChapters.map((data1) => {
                                                                            const singlechapter = getsinglesub.studentChapters.find((b) => b.id == data1.id)
                                                                            if (data1.error_questions > 0) {
                                                                                return (
                                                                                    <React.Fragment>{data1.checked == true ? (
                                                                                        <ListGroup.Item>{singlechapter.chapter} - {data1.error_questions}</ListGroup.Item>) : ("")}</React.Fragment>

                                                                                )
                                                                            }
                                                                        })}


                                                                    </ListGroup>
                                                                </Card>
                                                            </Card.Body>
                                                        </Card>

                                                    )
                                                })}
                                            </React.Fragment>
                                        )}
                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0 text-center">
                                {this.state.eventKey == "first" ? (
                                    <React.Fragment>
                                        {(this.state.unansweredcheck1 == "" && this.state.errorquestionscheck1 == "") || (this.state.pquestionscheck1 == "" && this.state.examquestionscheck1 == "") ? ("") : (
                                            <React.Fragment>
                                                {this.state.loadbutton == 0 ? (<Link onClick={this.handleFormSubmit} className="px-5 btn btn-green text-whites">Start Exam</Link>) : (
                                                    <Link className="px-5 btn btn-green text-whites"><span className="spinner-border spinner-border-sm"></span>loading..</Link>
                                                )}
                                            </React.Fragment>

                                        )}

                                    </React.Fragment>) : (<React.Fragment>
                                        {(this.state.unansweredcheck2 == "" && this.state.errorquestionscheck2 == "") || (this.state.pquestionscheck2 == "" && this.state.examquestionscheck2 == "") ? ("") : (
                                            <React.Fragment>
                                                {this.state.loadbutton == 0 ? (<Link onClick={this.handleFormSubmit} className="px-5 btn btn-green text-whites">Start Exam</Link>) : (<Link className="px-5 btn btn-green text-whites"><span className="spinner-border spinner-border-sm"></span>loading..</Link>)}
                                            </React.Fragment>

                                        )}

                                    </React.Fragment>)}

                            </Card.Footer>
                        </Card>
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

export default withRouter(compose(graphql(ERROR_EXAM, {
    name: "customfunction"
})
)(ErrorExamSection));
