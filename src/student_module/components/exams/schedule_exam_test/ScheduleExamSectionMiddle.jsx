import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import CusExamAsideBar from '../../navbars/CusExamAsideBar'
import CusExamNavbar from '../../navbars/CusExamNavbar'
import ScheduleExamSection from '../schedule_exam_test/ScheduleExamSection';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import CustomExamResultModal from '../../exams/CustomExamResultModal';
//import CustomsubmitBack from "../../../pages/CustomsubmitBack";
import PracticeSubmitback from "../../../pages/PracticeSubmitback";
import Instructions from "../Instructions";

const SUBMIT_SCHEDULE_TEST = gql`
  mutation(
    $params:FinishStudentScheduleExam ,$uid:String 
    ) {
        finishStudentScheduleExam(
        params: $params,
        uid:$uid
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


class ScheduleExamSectionMiddle extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            startPractise: "0",
            reloader: "0",
            nextsubject: "0",
            examSubjects: [],
            //totalExamCount: props.studentGlobals.exam_time
        }
    }
    handleIntegerInputChange = (e) => {


        //allow positive and negative numbers
        //var pattern = new RegExp("^[-+]?[0-9]*$");

        //allow only numbers
        //var pattern = new RegExp(/^\d*\.?\d*$/);

        //allow only numbers, negative and two dotts
        // let pattern = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;

        // if (!pattern.test(e.target.value)) {

        //     let arr = this.state.questions;

        //     arr[this.state.index].attempted = null;
        //     arr[this.state.index].status = "";

        //     this.setState({ questions: arr });

        // }
        // else {

        //     let arr = this.state.questions;

        //     arr[this.state.index].attempted = e.target.value;
        //     arr[this.state.index].status = "attempt";

        //     this.setState({ questions: arr });
        // }

        let arr = this.state.questions;
        if (e.target.value == "") {
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";
        }
        else {
            let integerExp = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;
            if (integerExp.test(e.target.value) != true
                ) {
                let text = "";
                text = e.target.value.substring(0, e.target.value.length - 1);
                

                arr[this.state.index].attempted = text;
                arr[this.state.index].status = "attempt";
            }
            else {
                arr[this.state.index].attempted = e.target.value;
                arr[this.state.index].status = "attempt";
            }
        }



    };
    handleFormSubmit = e => {
        //e.preventDefault();

        let array = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            let fdata = this.state.questions[i];
            let newresult = 0;
            let attempt_answer = "";
            if (fdata.saveandnext == "1") {
                if (fdata.attempted != null) {
                    attempt_answer = fdata.attempted;
                }
            }

            const newsubque = {
                question_id: parseInt(fdata.id),
                status: parseInt(newresult),
                question_time: parseInt(fdata.timer),
                attempt_answer: attempt_answer,

                reason_for_wrong: 0,
                comments: "",
                slno: parseInt(i + 1)

            }
            array.push(newsubque);
        }
        let sessionid = "";
        if (this.props.getData.etype == "schedulehome" || this.props.getData.etype == "schedule") {
            sessionid = this.props.getData.exam_paper_id;
        }
        else {
            sessionid = this.props.getData.sessionid;
        }
        console.log("array", array);
        let practisetestobj = "";
        practisetestobj = {
            mobile: Cookies.get("mobile"),
            source: 0,
            schedule_exam_id: parseInt(sessionid),
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
            practisetestobj, result
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
        // } else {
        //this.setState({ submitError: "Please fill all the values to proceed" });
        //}
    };
    submitpt = async (
        params, uid) => {
        await this.props.submitpt({
            variables: {
                params,
                uid
            },
            update: (store, { data }) => {
                console.log("data.finishTest", data);
                if (data.finishStudentScheduleExam) {
                    this.setState({
                        //resultModalShow: true,
                        submitStatus: 2,
                        sessionid: data.finishStudentScheduleExam
                    });
                    this.props.history.push({
                        pathname: "/student/subject/exam-result",
                        state: {
                            type: "live",
                            sessionid: data.finishStudentScheduleExam,
                            examtype: this.props.getData.etype
                        }
                    })
                    //setTimeout(() => { this.SetpageLoad() }, 1500);
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
            if (findArray != "" && this.state.submitStatus == 1) {
                time = findArray[this.state.index].timer + 1;
                findArray[this.state.index].timer = time;
            }
            this.setState({
                questions: findArray,
            });
        }

    }

    componentDidMount() {

        //for subjects
        let sectionSubject = 0;
        let currentExamSubjects = [];

        this.props.getPracticeQuestions.map(item => {
            if (item.subject != sectionSubject) {
                const subjectItem = { id: item.subject, subject: item.subject_name };
                currentExamSubjects.push(subjectItem);
            }
        });

        let uniquecurrentExamSubjects = [];
        currentExamSubjects.map((citem) => {
            let filterdata = uniquecurrentExamSubjects.find((a) => a.id == citem.id);
            if (filterdata != undefined) {

                if (filterdata.length == 0) {
                    const newObj = { ...citem, active: "" }
                    uniquecurrentExamSubjects.push(newObj);
                }
            }
            else {
                const newObj = { ...citem, active: "" }
                uniquecurrentExamSubjects.push(newObj)
            }

        })
        const allNewObj = {
            id: 0,
            subject: "ALL"
        }
        uniquecurrentExamSubjects.unshift(allNewObj);
        // end subjects
        let sampleArray = [];
        if (this.props.getPracticeQuestions != undefined) {
            for (let i = 0; i < this.props.getPracticeQuestions.length; i++) {
                let newSubject = this.props.getPracticeQuestions[i];
                const newarr1 = {
                    ...newSubject,
                    attempted: null,
                    timer: 0,
                    status: "",
                    reason: 0,
                    comments: "",
                    isSubmitted: false,
                    lastindex: "",
                    saveandnext: "0",
                    sidebutton: "0"
                }
                sampleArray.push(newarr1);
            }
            this.setState({ questions: sampleArray, examSubjects: uniquecurrentExamSubjects });


            //localStorage.setItem('sampleArray', JSON.stringify(sampleArray));
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


            arr[this.state.index].attempted = samplearray.toString();
            arr[this.state.index].status = "attempt";


        }
        else {

            arr[this.state.index].attempted = option;
            arr[this.state.index].status = "attempt";

        }


        this.setState({ questions: arr });
    };
    handleInputChange = (option, question) => {

        let findStatus = this.state.questions.find((a) => a.id == question);
        let arr = this.state.questions;

        arr[this.state.index].attempted = option;
        arr[this.state.index].status = "attempt";


        this.setState({ questions: arr });
    };
    nextQuestionfunction = () => {

        let arr = this.state.questions;
        arr[this.state.index].saveandnext = "1";
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0");
        let filterlastindex = filterData.length - 1;

        if (filterData[filterlastindex].id == arr[this.state.index + 1].id) {
            this.setState({
                nextsubject: "1"
            });
        }

        if (arr[this.state.index].lastindex != "") {

            //newcode
            if (arr[this.state.index].status == "") {
                arr[this.state.index].status = "skip"
            }

            if (arr[arr[this.state.index].lastindex].status == "") {
                this.setState({
                    index: arr[this.state.index].lastindex

                })
            }
            else {

                this.setState({
                    index: this.state.index + 1
                })
            }
            // end new code
        }
        else {
            let arr2 = this.state.questions[this.state.index];
            if (arr2.status != "") {
                let nextstatus = this.state.questions[this.state.index + 1].status;
                if (nextstatus == "") {
                    this.setState({
                        index: parseInt(this.state.index + 1),

                    })
                }
                else {
                    let findData = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "");

                    let fobject = findData[0];
                    if (fobject != undefined) {
                        this.state.questions.map((item, index) => {
                            if (item.id == fobject.id) {
                                this.setState({
                                    index: index,

                                })
                            }

                        });
                    }
                    else {
                        this.setState({
                            index: parseInt(this.state.index + 1)
                        });
                    }
                }


            }
            else {
                //newcode
                if (arr[this.state.index].status == "") {
                    arr[this.state.index].status = "skip"
                }
                //end newcode

                let nextstatus = this.state.questions[this.state.index + 1].status;
                if (nextstatus == "") {
                    this.setState({
                        index: parseInt(this.state.index + 1),

                    })
                }
                else {
                    let findData = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "");

                    let fobject = findData[0];
                    if (fobject != undefined) {
                        this.state.questions.map((item, index) => {
                            if (item.id == fobject.id) {
                                this.setState({
                                    index: index,

                                })
                            }

                        });
                    }
                    else {
                        let findData5 = this.state.questions.filter((a) => a.sidebutton == "0");

                        let fobject5 = findData5[0];
                        if (fobject5 != undefined) {
                            this.state.questions.map((item, index) => {
                                if (item.id == fobject5.id) {
                                    this.setState({
                                        index: index,

                                    })
                                }

                            });
                        }

                    }

                }

            }
        }
        this.setState({
            questions: arr
        });
    }
    FinalSaveFunction = () => {
        let arr = this.state.questions;
        arr[this.state.index].saveandnext = "1";
        let firstindex = this.state.index;
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "");
        if (filterData.length > 0) {
            if (arr[this.state.index].status == "") {
                arr[this.state.index].status = "skip";
            }
            this.state.questions.map((item, index) => {
                if (item.id == filterData[0].id) {
                    firstindex = index;
                }

            });
        }
        else {
            let filterData3 = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "skip");
            if (filterData3.length > 0) {
                if (arr[this.state.index].status == "") {
                    arr[this.state.index].status = "skip";
                }
                this.state.questions.map((item, index) => {
                    if (item.id == filterData3[0].id) {
                        firstindex = index;
                    }

                });
            }
        }
        this.setState({
            nextsubject: "0",

            index: firstindex,
            questions: arr
        });
    }
    SaveFunction = () => {
        let arr = this.state.questions;
        arr[this.state.index].saveandnext = "1";
        let firstindex = "";
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "" && a.id != this.state.questions[this.state.index].id);

        if (filterData.length > 0) {
            this.state.questions.map((item, index) => {
                if (item.id == filterData[0].id) {
                    firstindex = index;
                }

            });
        }
        else {
            let filterData1 = this.state.questions.filter((a) => a.sidebutton == "0");
            this.state.questions.map((item, index) => {
                if (item.id == filterData1[0].id) {
                    firstindex = index;
                }

            });
        }

        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
        }
        this.setState({
            nextsubject: "0",

            index: firstindex,
            questions: arr
        });
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
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0");
        let filterlastindex = filterData.length - 1;
        if (filterData[filterlastindex].id == arr[index].id) {
            this.setState({
                nextsubject: "1"
            });
        }
        else {
            this.setState({
                nextsubject: "0"
            });
        }

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
                let findDat = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "");

                if (findDat.length > 0) {
                    if (idata.status == "skip") {
                        let latestindex = "";
                        for (let i = index + 1; i <= this.state.index; i++) {
                            let idata1 = this.state.questions[i];
                            if (idata1.status == "") {
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
                    if (idata.status == "review") {
                        //arr[index].status = "";
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
                    if (idata.status == "currect") {
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
                    if (idata.status == "wrong") {

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
                else {
                    this.setState({ index: index });

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
    //     let pathname = "";
    //     if (this.props.getData.etype == "custom") {
    //         pathname = "/student/exams";
    //     }
    //     else if (this.props.getData.etype == "error") {
    //         pathname = "/student/exams";
    //     }
    //     else if (this.props.getData.etype == "previous") {
    //         pathname = "/student/exams";
    //     }
    //     else if (this.props.getData.etype == "adaptive") {
    //         pathname = "/student/exams";
    //     }
    //     else if (this.props.getData.etype == "schedule") {
    //         pathname = "/student/exams";
    //     }
    //     else if (this.props.getData.etype == "customchapter") {
    //         pathname = "/student/get-ready-for-exam";
    //     }
    //     else if (this.props.getData.etype == "customcumulative") {
    //         pathname = "/student/get-ready-for-exam";
    //     }
    //     else if (this.props.getData.etype == "customgrand") {
    //         pathname = "/student/get-ready-for-exam";
    //     }
    //     else if (this.props.getData.etype == "customsemi") {
    //         pathname = "/student/get-ready-for-exam";
    //     }
    //     else if (this.props.getData.etype == "customgetready") {
    //         pathname = "/student/get-ready-for-exam";
    //     }

    //     this.props.history.push({
    //         pathname: pathname
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
                        bnewtagValid: false,
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
    parentSubjectfilter = (subtype) => {


        //let idindex = this.state.index;

        if (subtype != 0) {
            let findData = this.state.questions.filter((a) => a.subject == subtype);
            //let singlesubject = findData[0];
            //idindex = this.state.questions.indexOf(findData[0]);
        }
        else {
            //idindex = 0;
        }

        const subjectfilterQuetsions = this.state.questions.map((item) => {
            if (subtype != 0) {
                if (item.subject == subtype) {
                    return { ...item, sidebutton: "0" }
                } else {
                    return { ...item, sidebutton: "1" }
                }
            }
            else {
                return { ...item, sidebutton: "0" }
            }

        });
        let idindex = this.state.index;
        if (subtype != 0) {
            let subjectCountData = subjectfilterQuetsions.filter((a) => a.subject == subtype && a.saveandnext == "0" && a.sidebutton == "0" && a.status == "");

            if (subjectCountData.length > 0) {
                this.setState({
                    nextsubject: "0"
                });
            }


            if (subjectCountData != "") {
                this.state.questions.map((a, index) => {
                    if (a.id == subjectCountData[0].id) {
                        idindex = index;
                    }
                });
            }
            else {


                let filledData1 = subjectfilterQuetsions.filter((a) => a.subject == subtype && a.sidebutton == "0" && a.status == "skip");
                if (filledData1.length > 0) {
                    this.setState({
                        nextsubject: "0"
                    });
                }
                if (filledData1.length > 0) {
                    this.state.questions.map((a, index) => {
                        if (a.id == filledData1[0].id) {
                            idindex = index;
                        }
                    });
                }
                else {
                    let filledData3 = subjectfilterQuetsions.filter((a) => a.subject == subtype && a.sidebutton == "0");
                    if (filledData3.length > 0) {
                        this.setState({
                            nextsubject: "0"
                        });
                        this.state.questions.map((a, index) => {
                            if (a.id == filledData3[0].id) {
                                idindex = index;
                            }
                        });
                    }
                }

            }




        }
        else {
            let subjectCountData1 = subjectfilterQuetsions.filter((a) => a.saveandnext == "0" && a.sidebutton == "0" && a.status == "");

            if (subjectCountData1.length > 0) {
                this.setState({
                    nextsubject: "0"
                });
            }
            if (subjectCountData1 != "") {
                this.state.questions.map((a, index) => {
                    if (a.id == subjectCountData1[0].id) {
                        idindex = index;
                    }
                });
            }
            else {
                let filledData4 = subjectfilterQuetsions.filter((a) => a.sidebutton == "0" && a.status == "skip");

                if (filledData4.length > 0) {
                    this.setState({
                        nextsubject: "0"
                    });
                }
                if (filledData4.length > 0) {
                    this.state.questions.map((a, index) => {
                        if (a.id == filledData4[0].id) {
                            idindex = index;
                        }
                    });
                }
                else {
                    let filledData5 = subjectfilterQuetsions.filter((a) => a.sidebutton == "0");
                    if (filledData5.length > 0) {
                        this.setState({
                            nextsubject: "0"
                        });
                        this.state.questions.map((a, index) => {
                            if (a.id == filledData5[0].id) {
                                idindex = index;
                            }
                        });
                    }
                }

            }



        }





        this.setState({
            // nextsubject: "0",
            index: idindex,
            questions: subjectfilterQuetsions
        });
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
    Completeexam = () => {
        let arr = this.state.questions;
        arr[this.state.index].saveandnext = "1";
        this.setState({
            questions: arr
        }, () => { this.handleFormSubmit() });
    }
    render() {

        if (this.state.submitStatus == 2) {
            return (
                <React.Fragment>
                    <PracticeSubmitback
                        getData={this.props.getData}
                        pcancelFunction={this.cancelFunction}
                    />
                    <CustomExamResultModal
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
                        <CusExamNavbar
                            exam_time={this.props.studentGlobals.exam_time}
                            onClick={() => this.props.changeToggle}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            stateData={this.state}
                            getData={this.props.getData}
                            totTimeFunction={this.totTimeFunction}
                        />
                    </div>

                    <div className="main-wrapper-section">
                        <CusExamAsideBar
                            stateData={this.state}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                            parentSubjectfilter={this.parentSubjectfilter}
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
                        examInstructions={this.props.getExamInstructions}
                        type="exam"

                        startPracticeFun={this.startPracticeFun}
                    />
                )
            }
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <CusExamNavbar
                            exam_time={this.props.studentGlobals.exam_time}
                            onClick={() => this.props.changeToggle}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            stateData={this.state}
                            getData={this.props.getData}
                            totTimeFunction={this.totTimeFunction}


                        />
                    </div>
                    <div className="main-wrapper-section">
                        <CusExamAsideBar
                            stateData={this.state}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                            parentSubjectfilter={this.parentSubjectfilter}
                        />
                        <div className="content-wrapper p-0">
                            <Container>
                                <ScheduleExamSection
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
                                    parenthandleFormSubmit={this.reporthandleFormSubmit}
                                    phandleMutipleInputChange={this.handleMutipleInputChange}
                                    parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                    parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                    parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                    studentGlobals={this.props.studentGlobals}
                                    handleIntegerInputChange={this.handleIntegerInputChange}
                                    SaveFunction={this.SaveFunction}
                                    FinalSaveFunction={this.FinalSaveFunction}
                                    ParenthhandleFormSubmit={this.Completeexam}
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
    compose(graphql(SUBMIT_SCHEDULE_TEST, {
        name: "submitpt"
    }), graphql(ADD_BOOKMARK, {
        name: "addbookmark"
    }), graphql(DELETE_BOOKMARK, {
        name: "deletebookmark"
    }))(ScheduleExamSectionMiddle));
