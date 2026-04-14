import React, { Component } from 'react'
import CustomPractiseExamAsideBar from '../../navbars/CustomPractiseExamAsideBar';
import CustomPracticeExamSection from './CustomPracticeExamSection';
import { Container, Form, Modal, Button } from 'react-bootstrap';
import '../_preexam.scss';
import Select from 'react-select';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import CustomPractiseExamNavbar from '../../navbars/CustomPractiseExamNavbar';
import PreloaderTwo from '../../preloader/PreloaderTwo';
import { withRouter } from "react-router-dom";
import Instructions from "../Instructions";

const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        reports{
            id
            report
        }
        tags{
            id
            tag
            type
        }
        
        
    }
}

`;
const SUBMIT_PRACTICE_TEST = gql`
  mutation(
    $params:FinishStudentCustomPractice, $uid:String  
    ) {
        finishStudentCustomPractice(
        params: $params, uid: $uid
     )
  }
`;

const ADD_BOOKMARK = gql`
  mutation(
    $params:AddBookmark  
    ) {
        addBookmark(
        params: $params
     )
  }
`;

const DELETE_BOOKMARK = gql`
  mutation(
    $params:AddBookmark  
    ) {
        removeBookmark(
        params: $params
     )
  }
`;
let stopExamStatus = "0";
class CustomCustomPracticeExamSectionMiddle extends Component {
    constructor(props) {
        super(props)
        this.CustomPracticeExamSection1 = React.createRef();
        console.log("props.studentGlobals", props.studentGlobals);
        const complexity = props.studentGlobals.complexity.map((item) => {
            return { ...item, checked: false }
        });
        const questionTheory = props.studentGlobals.questionTheory.map((item) => {
            return { ...item, checked: false }
        });
        const questionTypes = props.studentGlobals.questionTypes.map((item) => {
            return { ...item, checked: false }
        });
        const questions = props.getStudentCustomPracticeQuestions.map((item) => {
            return {
                id: item.id,
                answer: item.answer,
                inputquestion: item.inputquestion,
                question_theory: item.question_theory,
                complexity: item.complexity,
                attempted: null,
                result: "",
                timer: 0,
                status: "",
                reason: 0,
                comments: "",
                isSubmitted: false,
                lastindex: "",
                reasonstatus: "0",
                sidebutton: "1"
            }


        });
        //for testing purpose
        // const idexxx=props.getStudentCustomPracticeQuestions.indexOf(props.getStudentCustomPracticeQuestions.find((a)=>a.id=="30207"))
        this.state = {
            //side filter start
            complexity: complexity,
            questionTheory: questionTheory,
            questionTypes: questionTypes,
            //side filter end
            isSubmitted: false,
            //index: idexxx,
            index: 0,
            submittedquestions: [],
            questions: questions,
            resultModalShow: false,
            submitStatus: 1,
            some: "",
            sessionid: "",
            lastqstatus: "1",
            bookmarkModalShow: false,

            //icons state

            submitError3: "",
            bnewtag: "",
            btags: "",
            formErrors: {

                btags: "",
                bnewtag: "",
            },
            currentStep: 1,
            formValid3: false,
            btagsValid: false,
            bnewtagValid: false,
            startPractise: "0",
            nextbutton: "0",
            getStudentCustomPracticeQuestions: props.getStudentCustomPracticeQuestions,
            reloader: "0"
        }
    }
    //start side filter
    handleCheck = (data, type) => {
        console.log("handleCheck", this.state);
        if (type == "complexity") {
            let complexity = this.state.complexity.map((item) => {
                if (item.id == data) {
                    if (item.checked == true) {
                        return { ...item, checked: false }
                    }
                    else {
                        return { ...item, checked: true }
                    }

                }
                else {
                    return { ...item }
                }
            });
            this.setState({
                complexity: complexity
            });


        }
        if (type == "theory") {
            let questionTheory = this.state.questionTheory.map((item) => {
                if (item.id == data) {
                    if (item.checked == true) {
                        return { ...item, checked: false }
                    }
                    else {
                        return { ...item, checked: true }
                    }

                }
                else {
                    return { ...item }
                }
            });

            this.setState({
                questionTheory: questionTheory
            });


        }
        if (type == "question") {
            let questionTypes = this.state.questionTypes.map((item) => {
                if (item.id == data) {
                    if (item.checked == true) {
                        return { ...item, checked: false }
                    }
                    else {
                        return { ...item, checked: true }
                    }

                }
                else {
                    return { ...item }
                }
            });

            this.setState({
                questionTypes: questionTypes
            });

        }

    }
    //end side flter
    bookmarkFun(typ) {
        console.log("bookmarkFun", this.props.studentGlobals.tags);
        let data = this.props.studentGlobals.tags;
        let sarray = [];
        console.log("notesTags", data);
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                if (idata.type == "bookmark") {
                    const obj = {
                        value: idata.id,
                        label: idata.tag,
                    }
                    console.log("obj", obj);
                    sarray.push(obj);
                }

            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        }
        else {
            somvar = sarray;
        }
        console.log("somvar", somvar);
        return somvar;
    }

    prebookMarkhandleFormSubmit = () => {
        console.log("prebookMarkhandleFormSubmit");
        this.setState({ bookmarkModalShow: true })
    }
    bookMarkhandleFormSubmit = () => {
        let fdata = this.state.getStudentCustomPracticeQuestions[this.state.index];
        let objaddbookmark = "";
        objaddbookmark = {
            mobile: Cookies.get("mobile"),
            content_type: 99,
            custom_content_id: parseInt(fdata.id),
        }
        this.addbookmark(
            objaddbookmark
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    addbookmark = async (
        params) => {
        await this.props.addbookmark({
            variables: {
                params
            },
            update: (store, { data }) => {

            }
        });
    };
    predeletebookMarkhandleFormSubmit = () => {
        let arr = this.state.questions;
        arr[this.state.index].bookmarked = false;
        this.setState({ questions: arr });
        this.deletebookMarkhandleFormSubmit();
    }
    deletebookMarkhandleFormSubmit = () => {
        let fdata = this.state.getStudentCustomPracticeQuestions[this.state.index];
        let objdelbookmark = "";
        objdelbookmark = {
            mobile: Cookies.get("mobile"),
            content_type: 99,
            custom_content_id: parseInt(fdata.id)
        }
        this.deletebookmark(
            objdelbookmark
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    deletebookmark = async (
        params) => {
        await this.props.deletebookmark({
            variables: {
                params
            },
            update: (store, { data }) => {
            }
        });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("handleFormSubmit", this.state.questions);

        let valid = this.state.questions.filter((a) => a.status != "");
        console.log("valid", valid.length);

        if (valid.length > 0) {
            let totque = [];
            for (let t = 0; t < this.state.questions.length; t++) {
                let tdata = this.state.questions[t];
                if (tdata.status != "") {
                    const id = tdata.id;
                    totque.push(id);

                }
            }

            let array = [];
            for (let i = 0; i < this.state.questions.length; i++) {
                let fdata = this.state.questions[i];
                console.log("fdata", fdata);
                if (fdata.status != "") {
                    let newresult = "";
                    if (fdata.status == "currect") {
                        newresult = 2;
                    }
                    else if (fdata.status == "wrong") {
                        newresult = 1;
                    }

                    else if (fdata.status == "skip") {
                        newresult = 0;
                    }
                    let attempted = "";
                    if (fdata.attempted != null) {
                        attempted = fdata.attempted;
                    }


                    const newsubque = {
                        question_id: parseInt(fdata.id),
                        status: newresult,
                        question_time: parseInt(fdata.timer),
                        attempt_answer: attempted,
                        reason_for_wrong: parseInt(fdata.reason),
                        comments: fdata.comments,
                        slno: i + 1

                    }
                    array.push(newsubque);

                }

            }
            console.log("array", array);

            let practisetestobj = "";
            practisetestobj = {
                mobile: Cookies.get("mobile"),
                session_id: parseInt(localStorage.getItem('session_id')),
                questions: array
            }

            let length = 8
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            console.log("practisetestobj", practisetestobj, result);
            this.submitpt(
                practisetestobj,
                result
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        }
        else {
            this.cancelFunction();
        }
    };
    submitpt = async (
        params, uid) => {
        await this.props.submitpt({
            variables: {
                params,
                uid
            },
            update: (store, { data }) => {
                console.log("data.finishStudentCustomPractice", data);
                if (data.finishStudentCustomPractice) {
                    stopExamStatus = "1";
                    this.setState({
                        //resultModalShow: true,
                        submitStatus: 2,
                        sessionid: data.finishStudentCustomPractice
                    });

                    this.props.history.push({
                        pathname: "/student/subject/custompractice-result",
                        state: {
                            stype: "practice",
                            type: "live",
                            sessionid: data.finishStudentCustomPractice,
                        }
                    })

                }
            }
        });
    };
    SetpageLoad = () => {
        this.setState({
            resultModalShow: false,
            submitStatus: 1
        });
    }
    timeFunction = () => {
        if (this.state.startPractise == "1") {
            let findArray = this.state.questions;
            let time = "";
            if (findArray != "" && this.state.submitStatus == 1 && findArray[this.state.index].isSubmitted != true) {
                time = findArray[this.state.index].timer + 1;
                findArray[this.state.index].timer = time;
            }
            this.setState({ questions: findArray });
        }

    }
    componentDidMount() {
        console.log("componentDidMount", this.props, this.state);
        if (this.state.getStudentCustomPracticeQuestions != undefined) {
            this.timer = setInterval(() => {
                this.timeFunction();
            }, 1000)
        }
        if (stopExamStatus == "0") {
            // window.addEventListener("beforeunload", e => {
            //     e.preventDefault();
            //     e.returnValue = "";
            //     console.log("Before unload");
            //     alert("Window closed");
            // });

            // const _isMounted = true;
            // window.onpopstate = e => {
            //     const { hash } = this.props.history.location;

            //     console.log("hash:", hash, e);
            //     if (!window.confirm("Are you sure to Leave this exam?")) {
            //         console.log("Popstate confirm denied");
            //         e.preventDefault();
            //     }
            // };
        }

    }
    componentWillUnmount() {
        clearInterval(this.timer);
        // window.removeEventListener("beforeunload", this.handleWindow);
        // window.removeEventListener("popstate", this.handleWindow);
    }
    handleInputChange2 = (option, question) => {
        let findStatus = this.state.questions.find((a) => a.id == question);
        let arr = this.state.questions;
        if (arr[this.state.index].attempted != null) {
            let samplearray = arr[this.state.index].attempted.split(",");
            if (samplearray.includes(option)) {
                samplearray = samplearray.filter((a) => a != option);
            }
            else {
                samplearray.push(option);
            }

            if (findStatus.answer.includes(option)) {
                arr[this.state.index].result = true;
                arr[this.state.index].attempted = samplearray.toString();
                arr[this.state.index].status = "currect";
            }
            else {
                arr[this.state.index].result = false;
                arr[this.state.index].attempted = samplearray.toString();
                arr[this.state.index].status = "wrong";
            }

        }
        else {
            if (findStatus.answer.includes(option)) {
                arr[this.state.index].result = true;
                arr[this.state.index].attempted = option;
                arr[this.state.index].status = "currect";
            }
            else {
                arr[this.state.index].result = false;
                arr[this.state.index].attempted = option;
                arr[this.state.index].status = "wrong";
            }
        }


        this.setState({ questions: arr });
    };
    handleInputChange = (option, question) => {
        let findStatus = this.state.questions.find((a) => a.id == question);
        let arr = this.state.questions;
        if (findStatus.answer.includes(option)) {
            arr[this.state.index].result = true;
            arr[this.state.index].attempted = option;
            arr[this.state.index].status = "currect";
        }
        else {
            arr[this.state.index].result = false;
            arr[this.state.index].attempted = option;
            arr[this.state.index].status = "wrong";
        }
        this.setState({ questions: arr });
    };
    handleIntegerInputChange = (e) => {
        console.log("handleIntegerInputChange", "sree", e.target.value);

        //allow positive and negative numbers
        //var pattern = new RegExp("^[-+]?[0-9]*$");

        //allow only numbers
        //var pattern = new RegExp(/^\d*\.?\d*$/);

        //allow only numbers, negative and two dotts
        let pattern = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;

        if (!pattern.test(e.target.value)) {
            console.log("not match");
            let arr = this.state.questions;
            arr[this.state.index].result = "";
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";

            this.setState({ questions: arr });

        }
        else {
            console.log("match");
            let arr = this.state.questions;
            if (arr[this.state.index].answer == e.target.value) {
                arr[this.state.index].result = true;
                arr[this.state.index].attempted = e.target.value;
                arr[this.state.index].status = "currect";
            }
            else {
                arr[this.state.index].result = false;
                arr[this.state.index].attempted = e.target.value;
                arr[this.state.index].status = "wrong";
            }
            this.setState({ questions: arr });
        }



    };
    clearoption = (e) => {
        console.log("clearoption");
        let arr = this.state.questions;
        arr[this.state.index].result = "";
        arr[this.state.index].attempted = null;
        arr[this.state.index].status = "";

        this.setState({ questions: arr });
    }

    nextQuestionfunction = () => {
        let arr = this.state.questions;
        if (arr[this.state.index].lastindex != "") {
            this.setState({
                index: arr[this.state.index].lastindex,
            })
        }
        else {

            //total filter questions
            let filterData = this.state.questions.filter((a) => a.sidebutton == "1");
            let findCurrentObj = filterData.find((a) => a.id == this.state.questions[this.state.index].id);
            let findCurrentIndex = filterData.indexOf(findCurrentObj);
            let nextIdObj = filterData[findCurrentIndex + 1];
            if (nextIdObj.status != "") {
                let statusfilter = filterData.filter((a) => a.status == "");

                if (statusfilter.length > 0) {
                    let questions = this.state.questions.find((a) => a.id == statusfilter[0].id);
                    this.setState({
                        index: this.state.questions.indexOf(questions),
                    });
                }
                else {
                    let skipstatusfilter = filterData.filter((a) => a.status == "skip");
                    if (skipstatusfilter.length > 0) {
                        let questions = this.state.questions.find((a) => a.id == skipstatusfilter[0].id);
                        this.setState({
                            index: this.state.questions.indexOf(questions)
                        });
                    }
                }

            }
            else {
                let findindex = this.state.questions.find((a) => a.id == nextIdObj.id);

                this.setState({
                    index: parseInt(this.state.questions.indexOf(findindex)),
                })
            }
        }
    }
    submitnext = () => {
        console.log("submitnextsubmitnext");

        let arr = this.state.questions;
        //total filter questions
        let filterData = this.state.questions.filter((a) => a.sidebutton == "1");
        let findCurrentObj = filterData.find((a) => a.id == this.state.questions[this.state.index].id);
        let findCurrentIndex = filterData.indexOf(findCurrentObj);

        console.log("filterData", filterData);
        console.log("findCurrentObj", findCurrentObj);
        console.log("findCurrentIndex", findCurrentIndex);
        console.log("lengthequal", filterData.length, findCurrentIndex);

        if (filterData.length == findCurrentIndex + 1) {
            this.setState({
                nextbutton: "1"
            });
        }
        else {
            this.setState({
                nextbutton: "0"
            });
        }





        let idata = arr[this.state.index];
        if (this.state.index == this.state.questions.length - 1) {
            if (idata.status == "") {
                arr[this.state.index].status = "skip";
                this.setState({
                    questions: arr,
                    lastqstatus: "2"
                })
            }
            else {
                arr[this.state.index].isSubmitted = true;
                this.setState({
                    questions: arr
                })

            }
        }
        else {
            if (idata.status == "") {
                if (window.confirm("Do you want to skip this Question?")) {
                    arr[this.state.index].status = "skip";
                    //let next = filterData[findCurrentIndex + 1].id;
                    // let findindex = this.state.questions.find((a) => a.id == next);

                    let statusfilter = filterData.filter((a) => a.status == "");
                    console.log("statusfilter", statusfilter);

                    if (statusfilter.length > 0) {
                        let questions = this.state.questions.find((a) => a.id == statusfilter[0].id);
                        this.setState({
                            questions: arr,
                            index: this.state.questions.indexOf(questions),
                        });
                    }
                    else {
                        let skipstatusfilter = filterData.filter((a) => a.status == "skip");
                        if (skipstatusfilter.length > 0) {
                            let questions = this.state.questions.find((a) => a.id == skipstatusfilter[0].id);
                            this.setState({
                                questions: arr,
                                index: this.state.questions.indexOf(questions)
                            });
                        }
                    }


                }
            }
            else {
                arr[this.state.index].isSubmitted = true;
                this.setState({
                    questions: arr
                })
            }

        }
    }
    skip = () => {
        let arr = this.state.questions;
        //for skip question
        console.log("arr[this.state.index].status", arr[this.state.index].status);
        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
            //total filter questions
            let filterData = this.state.questions.filter((a) => a.sidebutton == "1");
            console.log("filterData", filterData);

            let findCurrentObj = filterData.find((a) => a.id == this.state.questions[this.state.index].id);
            let findCurrentIndex = filterData.indexOf(findCurrentObj);
            console.log("skipfindCurrentIndex", findCurrentIndex);
            if (filterData.length == findCurrentIndex) {
                this.setState({
                    nextbutton: "1"
                });
            }
            else {
                this.setState({
                    nextbutton: "0"
                });
            }

            //nextId from filterData

            let nextIdObj = filterData[findCurrentIndex + 1];
            console.log("skipnextIdObj", nextIdObj);

            if (nextIdObj != undefined) {
                if (filterData.find((a) => a.id == nextIdObj.id)) {
                    if (nextIdObj.status == "") {
                        let findCurrentObj1 = this.state.questions.find((a) => a.id == nextIdObj.id);
                        console.log("findCurrentObj1", findCurrentObj1);

                        let findCurrentIndex1 = this.state.questions.indexOf(findCurrentObj1);
                        console.log("findCurrentObj1", findCurrentObj1);
                        this.setState({
                            index: findCurrentIndex1,
                            questions: arr
                        });

                    }
                    else {
                        let statusfilter = filterData.filter((a) => a.status == "");

                        if (statusfilter.length > 0) {
                            let questions = this.state.questions.find((a) => a.id == statusfilter[0].id);
                            this.setState({
                                index: this.state.questions.indexOf(questions),
                                questions: arr
                            });
                        }
                        else {
                            let skipstatusfilter = filterData.filter((a) => a.status == "skip");
                            if (skipstatusfilter.length > 0) {
                                let questions = this.state.questions.find((a) => a.id == skipstatusfilter[0].id);
                                this.setState({
                                    index: this.state.questions.indexOf(questions),
                                    questions: arr
                                });
                            }
                        }

                    }

                }
            }




        }
        else {
            //total filter questions
            let filterData = this.state.questions.filter((a) => a.sidebutton == "1");
            let findCurrentObj = filterData.find((a) => a.id == this.state.questions[this.state.index].id);
            let findCurrentIndex = filterData.indexOf(findCurrentObj);

            if (filterData.length == findCurrentIndex) {
                this.setState({
                    nextbutton: "1"
                });
            }
            else {
                this.setState({
                    nextbutton: "0"
                });
            }

            //nextId from filterData
            let nextIdObj = filterData[findCurrentIndex + 1];

            if (nextIdObj != undefined) {
                if (filterData.find((a) => a.id == nextIdObj.id)) {


                    if (window.confirm("Do you want to skip this Question?")) {
                        arr[this.state.index].status = "skip";
                        arr[this.state.index].result = "";
                        arr[this.state.index].attempted = null;



                        if (nextIdObj.status == "") {
                            let findCurrentObj1 = this.state.questions.find((a) => a.id == nextIdObj.id);
                            console.log("findCurrentObj1", findCurrentObj1);

                            let findCurrentIndex1 = this.state.questions.indexOf(findCurrentObj1);
                            console.log("findCurrentObj1", findCurrentObj1);
                            this.setState({
                                index: findCurrentIndex1 + 1,
                                questions: arr,
                            });

                        }
                        else {
                            let statusfilter = filterData.filter((a) => a.status == "");

                            if (statusfilter.length > 0) {
                                let questions = this.state.questions.find((a) => a.id == statusfilter[0].id);
                                this.setState({
                                    index: this.state.questions.indexOf(questions),
                                    questions: arr,
                                });
                            }
                            else {
                                let skipstatusfilter = filterData.filter((a) => a.status == "skip");
                                if (skipstatusfilter.length > 0) {
                                    let questions = this.state.questions.find((a) => a.id == skipstatusfilter[0].id);
                                    this.setState({
                                        index: this.state.questions.indexOf(questions),
                                        questions: arr,
                                    });
                                }
                            }

                        }




                    }
                }
            }


        }
    }
    handleSelectChange = (name, value) => {
        let arr = this.state.questions;
        arr[this.state.index].reason = value;
        this.setState({
            questions: arr
        })
    }
    commentsFunction = (e) => {
        let arr = this.state.questions;
        arr[this.state.index].comments = e.target.value;
        this.setState({
            questions: arr
        })
    }

    sideQFun = (index) => {

        let arr = this.state.questions;


        let idata = arr[index];
        if (index != this.state.index) {
            if (idata.status == "") {
                if (arr[this.state.index].status == "") {
                    if (window.confirm("Do you want to skip this Question?")) {
                        arr[this.state.index].status = "skip";
                        this.setState({
                            questions: arr,
                            index: index,
                        })
                    }
                }
                else {
                    this.setState({
                        index: index
                    })
                }

            }
            else {
                if (idata.status == "skip") {
                    arr[index].status = "";
                    let latestindex = "";
                    for (let i = index + 1; i <= this.state.index; i++) {
                        let idata = this.state.questions[i];
                        if (idata.status == "") {
                            latestindex = i;
                            break;
                        }
                    }
                    if (latestindex != "") {
                        arr[index].lastindex = latestindex;
                    }
                    else {
                        arr[index].lastindex = this.state.index;
                    }
                    this.setState({
                        questions: arr,
                        index: index
                    })
                }
                else if (idata.status == "currect") {
                    arr[index].lastindex = this.state.index;
                    let latestindex = "";
                    for (let i = index + 1; i <= this.state.index; i++) {
                        let idata = this.state.questions[i];
                        if (idata.status == "") {
                            latestindex = i;
                            break;
                        }
                    }
                    if (latestindex != "") {
                        arr[index].lastindex = latestindex;
                    }
                    else {
                        arr[index].lastindex = this.state.index;
                    }
                    this.setState({
                        questions: arr,
                        index: index
                    })
                }
                else if (idata.status == "wrong") {

                    arr[index].reasonstatus = "1";
                    arr[index].lastindex = this.state.index;
                    let latestindex = "";
                    for (let i = index + 1; i <= this.state.index; i++) {
                        let idata = this.state.questions[i];
                        if (idata.status == "") {
                            latestindex = i;
                            break;
                        }
                    }
                    if (latestindex != "") {
                        arr[index].lastindex = latestindex;
                    }
                    else {
                        arr[index].lastindex = this.state.index;
                    }
                    this.setState({
                        questions: arr,
                        index: index
                    })
                }

            }
        }
    }
    cancelFunction = () => {
        //localStorage.clear();
        window.close();
    }
    // cancelFunction = () => {
    //     this.setState({ resultModalShow: false })
    //     //console.log("cancelFunction", this.props.getData.chapters);
    //     if (this.props.getData.canceltype == "examanalysis") {
    //         this.props.history.push({
    //             pathname: "/student/practice-exam-analysis",

    //         });
    //     }
    //     else if (this.props.getData.canceltype == "homedata") {
    //         this.props.history.push({
    //             pathname: "/student/home",

    //         });
    //     }
    //     else if (this.props.getData.canceltype == "strengthanalysis") {
    //         this.props.history.push({
    //             pathname: "/student/strength-analysis",

    //         });
    //     }
    //     else {
    //         this.props.history.push({
    //             pathname: "/student/subjects",
    //             state: {
    //                 chapters1: this.props.getData.chapters.chapters1,
    //                 subject: this.props.getData.chapters.subject,
    //                 subjectid: this.props.getData.chapters.subjectid,
    //                 getSubjects: this.props.getData.chapters.getSubjects,
    //                 subjectindex: this.props.getData.chapters.subjectindex,
    //                 practice_percentage: this.props.getData.chapters.practice_percentage,
    //                 htitle: this.props.getData.chapters.htitle,
    //                 htitlecount: this.props.getData.chapters.htitlecount,
    //                 totquestions: this.props.getData.chapters.totquestions
    //             }
    //         });
    //     }

    // }
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    iconhandleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        console.log("fieldName", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let btagsValid = this.state.btagsValid;
        let bnewtagValid = this.state.bnewtagValid;
        switch (fieldName) {
            case "btags":
                if (value.length == "") {
                    btagsValid = false;
                    fieldValidationErrors.btags = "Bookmark tags Cannot Be Empty";
                } else {
                    btagsValid = true;
                    fieldValidationErrors.btags = "";
                }

                break;

            case "bnewtag":
                if (value.length == "") {
                    bnewtagValid = false;
                    fieldValidationErrors.bnewtag = "Bookmark new tag Cannot Be Empty";
                } else {
                    bnewtagValid = true;
                    fieldValidationErrors.bnewtag = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                btagsValid: btagsValid,
                bnewtagValid: bnewtagValid
            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid3: this.state.btagsValid || this.state.bnewtagValid
        });
        if (this.state.formValid3) {
            this.setState({ submitError3: "" });
        }
    }
    bookhandleFormSubmit = (contype, conid) => {
        console.log("bookhandleFormSubmit", contype, conid);
        if (this.state.formValid3) {
            const params = {
                mobile: Cookies.get("mobile"),
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid),
                tags: this.state.btags,
                new_tag: this.state.bnewtag
            }
            console.log("noteshandleFormSubmit", params);
            this.addbookmark(
                params

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError3: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError3: "Please fill all the values to proceed" });
        }
    };
    addbookmark = async (
        params) => {
        await this.props.addbookmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                //if (data.addBookmark) {
                let arr = this.state.questions.map((item) => {
                    if (item.id == params.custom_content_id) {
                        return { ...item, bookmarked: "true" }
                    }
                    else {
                        return { ...item }
                    }

                })
                let globals1 = store.readQuery({
                    query: FETCH_GLOBALS,
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                });
                console.log("globals1", globals1);
                if (this.state.bnewtag != "") {
                    let tarray = globals1.studentGlobals.tags;
                    let newobj = {
                        id: data.addBookmark.toString(),
                        tag: this.state.bnewtag,
                        type: "bookmark",
                        __typename: "Tags"
                    }
                    tarray.push(newobj);
                    globals1.studentGlobals.tags = tarray;
                    console.log("gbeforewrite", globals1);
                }

                try {
                    store.writeQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile")
                        },
                        data: globals1
                    });

                }
                catch (e) {
                    console.log("Exception", e);
                }
                this.setState({
                    questions: arr,
                    currentStep: 5,
                    submitError2: "",
                    bnewtag: "",
                    btags: "",
                    formErrors: {
                        btags: "",
                        bnewtag: "",
                    },


                    formValid3: false,
                    btagsValid: false,
                    bnewtagValid: false,

                });


                setTimeout(() => { this.SetpageLoad3(params) }, 1500);
            }

            // }
        });
    };
    SetpageLoad3 = (params) => {
        this.setState({ currentStep: 1, bookmarkModalShow: false });

    }


    //remove book mark
    removebookhandleFormSubmit = (contype, conid) => {
        console.log("removebookhandleFormSubmit", contype, conid);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        }
        console.log("noteshandleFormSubmit", params);
        this.deletebookmark(
            params

        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError3: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    deletebookmark = async (
        params) => {
        await this.props.deletebookmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.removeBookmark) {
                    let arr = this.state.questions.map((item) => {
                        if (item.id == params.custom_content_id) {
                            return { ...item, bookmarked: "false" }
                        }
                        else {
                            return { ...item }
                        }

                    })
                    this.setState({
                        questions: arr,

                        submitError3: "",

                        bnewtag: "",
                        btags: "",
                        formErrors: {

                            btags: "",
                            bnewtag: "",

                        },
                        currentStep: 1,

                        formValid3: false,

                        btagsValid: false,
                        bnewtagValid: false,

                    });

                }

            }
        });
    };
    handleMutipleInputChange = (e, name) => {
        console.log("handleMutipleInputChange", e, name)
        if (name == "ntags") {
            let ntags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    ntags.push(tag.value);
                }
                this.setState({
                    ntags: ntags.toString()
                }, () => {
                    this.validateField(name, "1")
                });
            }
        }
        else if (name == "btags") {
            let btags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    btags.push(tag.value);
                }
                console.log("btags", btags);
                this.setState({
                    btags: btags.toString()
                }, () => {
                    this.validateField(name, "1")
                });
            }
        }
        //this.validateField(name, "1");
    };
    onhidefun = () => {
        this.setState({ bookmarkModalShow: false })
    }
    startPracticeFun = () => {
        console.log("startPracticeFun");
        this.setState({ startPractise: "1" })
    }


    render() {
        console.log("CustomCustomPracticeExamSectionMiddle", this.props.getStudentCustomPracticeQuestions);
        if (this.state.lastqstatus == 2) {
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <CustomPractiseExamNavbar
                            onClick={() => this.props.changeToggle()}
                            getData={this.props.getData}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                            stateData={this.state}
                        />
                    </div>

                    <div className="main-wrapper-section">
                        <CustomPractiseExamAsideBar
                            handleCheck={this.handleCheck}
                            studentGlobals={this.props.studentGlobals}
                            stateData={this.state}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                            psideQFun={this.sideQFun}
                        />

                        {this.state.questions[this.state.index].status != "skip" ?
                            (<div className="content-wrapper p-0">
                                <Container>
                                    <CustomPracticeExamSection

                                        ref={this.CustomPracticeExamSection1}
                                        pCommentsFunction={this.commentsFunction}
                                        ParentSelecthandleChange={this.handleSelectChange}
                                        studentGlobals={this.props.studentGlobals}
                                        stateData={this.state}
                                        ParenthandleInputChange={this.handleInputChange}
                                        ParenthandleInputChange2={this.handleInputChange2}
                                        getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                                        PnextQuestionfunction={this.nextQuestionfunction}
                                        Psubmitnext={this.submitnext}
                                        Pskip={this.skip}
                                        pbookMarkhandleFormSubmit={this.prebookMarkhandleFormSubmit}
                                        pdelbookMarkhandleFormSubmit={this.predeletebookMarkhandleFormSubmit}

                                        parentselecthandleInputChange={this.selecthandleInputChange}
                                        parenticonhandleInputChange={this.iconhandleInputChange}
                                        phandleMutipleInputChange={this.handleMutipleInputChange}
                                        parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                        parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                        handleIntegerInputChange={this.handleIntegerInputChange}
                                        clearoption={this.clearoption}

                                    />
                                </Container>
                            </div>) : (<div className="content-wrapper p-0">
                                <Container>
                                    <div className="text-center my-4">
                                        <h6>
                                            Stop Exam and Submit your details in the next page to get your Result Report
                                    </h6>
                                    </div>
                                </Container>
                            </div>)
                        }

                    </div>
                </React.Fragment>

            )
        }
        else {
            if (this.state.startPractise == "0") {
                return (
                    <Instructions
                        type="practice"
                        examInstructions={this.props.studentGlobals.examInstructions}
                        startPracticeFun={this.startPracticeFun}
                    />
                )
            } else {
                return (
                    <React.Fragment>
                        <div className="header-area-section">

                            <CustomPractiseExamNavbar
                                onClick={() => this.props.changeToggle()}
                                getData={this.props.getData}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                                getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                                stateData={this.state}
                            />
                        </div>

                        <div className="main-wrapper-section">

                            <CustomPractiseExamAsideBar
                                handleCheck={this.handleCheck}
                                studentGlobals={this.props.studentGlobals}
                                stateData={this.state}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                                getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                                psideQFun={this.sideQFun}
                            />
                            <div className="content-wrapper p-0">
                                <Container>
                                    <CustomPracticeExamSection

                                        pCommentsFunction={this.commentsFunction}
                                        ParentSelecthandleChange={this.handleSelectChange}
                                        studentGlobals={this.props.studentGlobals}
                                        stateData={this.state}
                                        ParenthandleInputChange={this.handleInputChange}
                                        ParenthandleInputChange2={this.handleInputChange2}
                                        getStudentCustomPracticeQuestions={this.state.getStudentCustomPracticeQuestions}
                                        PnextQuestionfunction={this.nextQuestionfunction}
                                        Psubmitnext={this.submitnext}
                                        Pskip={this.skip}
                                        pbookMarkhandleFormSubmit={this.prebookMarkhandleFormSubmit}
                                        pdelbookMarkhandleFormSubmit={this.predeletebookMarkhandleFormSubmit}

                                        parentselecthandleInputChange={this.selecthandleInputChange}
                                        parenticonhandleInputChange={this.iconhandleInputChange}
                                        phandleMutipleInputChange={this.handleMutipleInputChange}
                                        parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                        parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                        onHide={this.onhidefun}
                                        show={this.showfun}
                                        handleIntegerInputChange={this.handleIntegerInputChange}
                                        clearoption={this.clearoption}
                                    />
                                </Container>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }

        }


    }
}
export default withRouter(
    compose(graphql(SUBMIT_PRACTICE_TEST, {
        name: "submitpt"
    }), graphql(ADD_BOOKMARK, {
        name: "addbookmark"
    }), graphql(DELETE_BOOKMARK, {
        name: "deletebookmark"
    })
    )(CustomCustomPracticeExamSectionMiddle));




