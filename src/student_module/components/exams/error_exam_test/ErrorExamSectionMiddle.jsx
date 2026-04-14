import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import PracticeErrorExamAsideBar from '../../navbars/PracticeErrorExamAsideBar'
import ExamNavbar from '../../navbars/ExamNavbar'
import ErrorExamSection from '../error_exam_test/ErrorExamSection';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import ExamResultModal from '../ExamResultModal';
import PracticeSubmitback from "../../../pages/PracticeSubmitback";

import Instructions from "../Instructions";

const SUBMIT_CUSTOM_TEST = gql`
  mutation(
    $params:FinishTest, $uid:String  
    ) {
        finishTest(
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
        contentTypes{
            id
            customcontent
        }
        
    }
}

`;


class ErrorExamSectionMiddle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //modalShow: false,
            // isSubmitted: false,

            isSubmitted: false,
            index: 0,
            submittedquestions: [],
            questions: [],
            resultModalShow: false,
            submitStatus: 1,
            some: "",
            sessionid: "",
            lastqstatus: "1",
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
            totalExamCount: props.studentGlobals.exam_time,
            startPractise: "0",
            reloader: "0"
        }
    }

    handleIntegerInputChange = (e) => {
        let arr = this.state.questions;
        if (e.target.value == "") {
            arr[this.state.index].result = "";
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";
        }
        else {
            let integerExp = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;
            if (integerExp.test(e.target.value) != true
            ) {
                let text = "";
                text = e.target.value.substring(0, e.target.value.length - 1);
                if (arr[this.state.index].answer == text) {
                    arr[this.state.index].result = true;
                    arr[this.state.index].attempted = text;
                    arr[this.state.index].status = "currect";
                }
                else {
                    arr[this.state.index].result = false;
                    arr[this.state.index].attempted = text;
                    arr[this.state.index].status = "wrong";
                }
            }
            else {
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
            }
        }



    };
    prebookMarkhandleFormSubmit = () => {
        let arr = this.state.questions;
        arr[this.state.index].bookmarked = true;
        this.setState({ questions: arr });
        this.bookMarkhandleFormSubmit();
    }
    bookMarkhandleFormSubmit = () => {
        let fdata = this.props.getPracticeQuestions[this.state.index];
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
        let fdata = this.props.getPracticeQuestions[this.state.index];
        let objdelbookmark = "";
        objdelbookmark = {
            mobile: Cookies.get("mobile"),
            content_type: 99,
            custom_content_id: parseInt(fdata.id),
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
                    comments: fdata.comments

                }
                array.push(newsubque);

            }
        }
        console.log("array", array);
        let practisetestobj = "";
        practisetestobj = {
            mobile: Cookies.get("mobile"),
            total_questions: parseInt(totque.length),
            subject: parseInt(this.props.getData.subjectid),
            chapter: parseInt(this.props.getData.ocid),
            exam_type: this.props.getData.type,
            viewed_questions: array
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
            practisetestobj, result
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    submitpt = async (
        params, uid) => {
        await this.props.submitpt({
            variables: {
                params, uid
            },
            update: (store, { data }) => {
                console.log("data.finishTest", data);
                if (data.finishTest) {
                    this.setState({
                        submitStatus: 2,
                        sessionid: data.finishTest
                    });
                    this.props.history.push({
                        pathname: "/student/subject/practice-result",
                        state: {
                            stype: "error",
                            type: "live",
                            sessionid: data.finishTest,
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
            let totalExamCount = parseInt(this.state.totalExamCount) - 1;
            if (findArray != "" && this.state.submitStatus == 1) {
                time = findArray[this.state.index].timer + 1;
                findArray[this.state.index].timer = time;
            }
            this.setState({ questions: findArray, totalExamCount: totalExamCount });
        }

    }
    componentDidMount() {
        console.log("componentDidMount", this.props, this.state);
        let sampleArray = [];
        if (this.props.getPracticeQuestions != undefined) {
            for (let i = 0; i < this.props.getPracticeQuestions.length; i++) {
                let newSubject = this.props.getPracticeQuestions[i];
                const newarr1 = {
                    ...newSubject,
                    attempted: null,
                    result: "",
                    timer: 0,
                    status: "",
                    reason: 0,
                    comments: "",
                    isSubmitted: false,
                    lastindex: ""
                }
                sampleArray.push(newarr1);
            }
            this.setState({ questions: sampleArray });


            this.timer = setInterval(() => {
                this.timeFunction();
            }, 1000)
        }

    }
    componentWillUnmount() {
        clearInterval(this.timer);
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
    nextQuestionfunction = () => {
        let arr = this.state.questions;
        if (arr[this.state.index].lastindex != "") {
            this.setState({
                index: arr[this.state.index].lastindex,
                isSubmitted: false
            })
        }
        else {
            let arr2 = this.state.questions[this.state.index + 1];
            if (arr2.status != "") {
                let array2 = this.state.questions;
                let findex = "";
                for (let i = 0; i < array2.length; i++) {
                    let idata = array2[i];
                    if (idata.status == "") {
                        findex = i;
                        break;
                    }
                }
                this.setState({
                    index: findex
                })
            }
            else {
                this.setState({
                    index: parseInt(this.state.index + 1),
                })
            }
        }
    }
    skip = () => {
        let arr = this.state.questions;
        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
            this.setState({
                index: parseInt(this.state.index + 1),
                questions: arr
            })
        }
        else {
            if (window.confirm("Do you want to skip this Question?")) {
                arr[this.state.index].status = "skip";
                arr[this.state.index].result = "";
                arr[this.state.index].attempted = null;
                this.setState({
                    questions: arr,
                    index: parseInt(this.state.index + 1),
                })
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
    //     console.log("cancelFunction", this.props.getData.chapters);
    //     this.props.history.push({
    //         pathname: "/student/subjects",
    //         state: {
    //             chapters1: this.props.getData.chapters.chapters1,
    //             subject: this.props.getData.chapters.subject,
    //             subjectid: this.props.getData.chapters.subjectid,
    //             getSubjects: this.props.getData.chapters.getSubjects,
    //             subjectindex: this.props.getData.chapters.subjectindex,
    //             practice_percentage: this.props.getData.chapters.practice_percentage,
    //             htitle: this.props.getData.chapters.htitle,
    //             htitlecount: this.props.getData.chapters.htitlecount,
    //             totquestions: this.props.getData.chapters.totquestions
    //         }
    //     });
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
    handleMutipleInputChange = (e, name) => {
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

                this.setState({
                    btags: btags.toString()
                }, () => {
                    this.validateField(name, "1")
                });
            }
        }
        //this.validateField(name, "1");
    };
    bookhandleFormSubmit = (contype, conid) => {

        if (this.state.formValid3) {
            const params = {
                mobile: Cookies.get("mobile"),
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid),
                tags: this.state.btags,
                new_tag: this.state.bnewtag
            }

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
                    submitError3: "",
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

        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        }

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
                        bnewtagValid: false
                    });

                }

            }
        });
    };

    validateField(fieldName, value) {

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
                bnewtagValid: bnewtagValid,
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
    startPracticeFun = () => {

        this.setState({ startPractise: "1" })
    }
    parentonScrollgetQuestionById = (questionData) => {

        this.setState({
            reloader: "2"
        });
        const questions = this.state.questions.map((item) => {
            if (item.id == questionData[0].id) {
                return {
                    ...item,
                    question: questionData[0].question,
                    option1: questionData[0].option1,
                    option2: questionData[0].option2,
                    option3: questionData[0].option3,
                    option4: questionData[0].option4,
                    compquestion: questionData[0].compquestion,
                    list1type: questionData[0].list1type,
                    list2type: questionData[0].list2type,
                    mat_question: questionData[0].mat_question,

                    inputquestion: questionData[0].inputquestion,

                }

            }
            else {
                return { ...item }
            }

        });

        this.setState({
            questions: questions,
            reloader: "1"
        });
        setTimeout(() => { this.SetreLoad() }, 1500);

    }
    SetreLoad = () => {
        this.setState({
            reloader: "0"
        });
    }
    render() {
        if (this.state.submitStatus == 2) {
            return (
                <React.Fragment>
                    <PracticeSubmitback
                        getData={this.props.getData}
                        pcancelFunction={this.cancelFunction}
                    />
                    <ExamResultModal
                        pcancelFunction={this.cancelFunction}
                        stateData={this.state}
                        getPracticeQuestions={this.props.getPracticeQuestions}
                        getData={this.props.getData}
                        show={this.state.resultModalShow}
                        onHide={() => this.setState({ resultModalShow: false })}
                    />
                </React.Fragment>

            )
        }
        else if (this.state.lastqstatus == 2) {
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <ExamNavbar
                            getData={this.props.getData}
                            onClick={() => this.props.changeToggle}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            stateData={this.state}
                        />
                    </div>

                    <div className="main-wrapper-section">
                        <PracticeErrorExamAsideBar
                            stateData={this.state}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                        />
                        <div className="content-wrapper p-0">
                            <Container>
                                <div className="text-center">
                                    <h3>
                                        Please click finish exam
                                    </h3>

                                </div>
                            </Container>
                        </div>
                    </div>
                </React.Fragment>

            )
        }
        else {
            if (this.state.startPractise == "0") {
                return (
                    <Instructions
                        typeofpractice="error"
                        type="practice"
                        examInstructions={this.props.studentGlobals.examInstructions}
                        startPracticeFun={this.startPracticeFun}
                    />
                )
            }
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <ExamNavbar
                            getData={this.props.getData}
                            onClick={() => this.props.changeToggle}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            stateData={this.state}
                        />
                    </div>
                    <div className="main-wrapper-section">
                        <PracticeErrorExamAsideBar
                            sidetype="error"
                            stateData={this.state}
                            ParenthandleFormSubmit={this.handleFormSubmit}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                        />
                        <div className="content-wrapper p-0">
                            <Container>
                                <ErrorExamSection
                                    parentonScrollgetQuestionById={this.parentonScrollgetQuestionById}
                                    pCommentsFunction={this.commentsFunction}
                                    ParentSelecthandleChange={this.handleSelectChange}
                                    stateData={this.state}
                                    ParenthandleInputChange={this.handleInputChange}
                                    ParenthandleInputChange2={this.handleInputChange2}
                                    getPracticeQuestions={this.props.getPracticeQuestions}
                                    PnextQuestionfunction={this.nextQuestionfunction}
                                    Pskip={this.skip}
                                    pbookMarkhandleFormSubmit={this.prebookMarkhandleFormSubmit}
                                    pdelbookMarkhandleFormSubmit={this.predeletebookMarkhandleFormSubmit}

                                    parentselecthandleInputChange={this.selecthandleInputChange}
                                    parenticonhandleInputChange={this.iconhandleInputChange}
                                    phandleMutipleInputChange={this.handleMutipleInputChange}
                                    parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                    parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                    studentGlobals={this.props.studentGlobals}
                                    handleIntegerInputChange={this.handleIntegerInputChange}
                                />
                            </Container>
                        </div>
                    </div>
                </React.Fragment>
            )
        }

    }
}
export default withRouter(
    compose(graphql(SUBMIT_CUSTOM_TEST, {
        name: "submitpt"
    }), graphql(ADD_BOOKMARK, {
        name: "addbookmark"
    }), graphql(DELETE_BOOKMARK, {
        name: "deletebookmark"
    }))(ErrorExamSectionMiddle));
