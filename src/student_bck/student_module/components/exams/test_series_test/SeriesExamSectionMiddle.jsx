import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import MockExamAsideBar from '../../navbars/MockExamAsideBar'
import MockExamNavbar from '../../navbars/MockExamNavbar'
import SeriesExamSection from '../test_series_test/SeriesExamSection';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PracticeSubmitback from "../../../pages/PracticeSubmitback";
import MockInstructions from "../MockInstructions";
import SubmissionInstructionModal from './SubmissionInstructionModal';

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
const START_EXAM = gql`
  mutation(
    $mobile: String!,
    $uid: String!,
    $exam_session_id: Int!,
    $type: String!,
    $exam_paper_id: Int!
    ) {
        startExam(
            mobile:$mobile,
            uid:$uid,
            exam_session_id:$exam_session_id,
            type:$type,
            exam_paper_id:$exam_paper_id
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
        
        
    }
}

`;


class ScheduleExamSectionMiddle extends Component {
    constructor(props) {
        super(props)

        //const idexxx = props.getPracticeQuestions.indexOf(props.getPracticeQuestions.find((a) => a.id == "45691"))
        // const questions = props.getPracticeQuestions.indexOf(props.getPracticeQuestions.find((a) => a.qtype == "8"))
        this.state = {
            uid: "",
            isSubmitted: false,
            //index: idexxx,
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
            submissionIns: false,
            finishsubmitError: ""
        }
    }
    handleIntegerInputChange = (e) => {
        console.log("handleIntegerInputChange", e.target.value);

        let arr = this.state.questions;
        if (e.target.value == "") {
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";
            arr[this.state.index].saveandnext = "0";
        }
        else {
            let decimalExp = /^\d+\.\d{0,2}$/;
            //let integerExp = /^-?(0|[1-9]\d*)$/;
            let integerExp = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;
            if (integerExp.test(e.target.value) != true
                //&& decimalExp.test(e.target.value) == false
            ) {
                let text = "";
                //if(e.target.value!=""){
                text = e.target.value.substring(0, e.target.value.length - 1);
                //}

                arr[this.state.index].attempted = text;
                arr[this.state.index].status = "attempt";
            }
            else {
                arr[this.state.index].attempted = e.target.value;
                arr[this.state.index].status = "attempt";
            }
            //console.log("handleIntegerInputChange", arr[0].mains_2021);
        }
        if (arr[0].mains_2021 == "1") {
            let sampleArr = [];
            arr.map((item) => {
                sampleArr.push(item.subject);

            });

            const uniqueArr = [... new Set(sampleArr.map(data1 => data1))]
            console.log("sampleArr", sampleArr, uniqueArr);
            let qaar = arr;
            uniqueArr.map((umap) => {
                const sfcount = qaar.filter((a) => a.qtype == "8" && a.attempted != null && umap == a.subject);
                console.log("sfcount", sfcount);
                if (sfcount.length > 4) {

                    qaar = qaar.map((qmap) => {
                        if (qmap.qtype == "8" && qmap.attempted == null && umap == qmap.subject) {
                            return { ...qmap, qdisable: true }

                        }
                        else {
                            return { ...qmap }
                        }

                    });
                }
                else {
                    qaar = qaar.map((qmap) => {
                        if (qmap.qtype == "8" && umap == qmap.subject) {
                            return { ...qmap, qdisable: false }

                        }
                        else {
                            return { ...qmap }
                        }

                    });
                }

            })


            this.setState({ questions: qaar });
        }
        else {
            this.setState({ questions: arr });
        }


    };
    handleFormSubmit = e => {
        // e.preventDefault();

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
        if (this.props.getData.etype == "schedule") {
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

        console.log("practisetestobj", practisetestobj, this.state.uid);
        this.submitpt(
            practisetestobj, this.state.uid
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                finishsubmitError: error.graphQLErrors.map(x => x.message)
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
                        finishsubmitError: "",
                        submitStatus: 2,
                        sessionid: data.finishStudentScheduleExam,

                    });
                    this.props.history.push({
                        pathname: "/student/subject/exam-result",
                        state: {
                            type: "live",
                            sessionid: data.finishStudentScheduleExam,
                            examtype: "series_test"
                        }
                    })
                    setTimeout(() => { this.SetpageLoad() }, 1500);
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
        uniquecurrentExamSubjects = uniquecurrentExamSubjects.map((map, index) => {
            if (index == 0) {
                return { ...map, active: "active" }

            }
            else {
                return { ...map }
            }

        })
        // const allNewObj = {
        //     id: 0,
        //     subject: "ALL"
        // }
        // uniquecurrentExamSubjects.unshift(allNewObj);
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
                    sidebutton: "0",
                    qdisable: false,
                    review: false
                }
                sampleArray.push(newarr1);
            }
            sampleArray = sampleArray.map((smap) => {
                let activesubject = uniquecurrentExamSubjects.find((a) => a.active == "active");
                if (smap.subject == activesubject.id) {
                    return { ...smap, sidebutton: "0" }
                }
                else {
                    return { ...smap, sidebutton: "1" }
                }

            })
            this.setState({ questions: sampleArray, examSubjects: uniquecurrentExamSubjects });


            //localStorage.setItem('sampleArray', JSON.stringify(sampleArray));
            this.timer = setInterval(() => {
                this.timeFunction();
            }, 1000)
        }

    }
    clearoption = (e) => {
        console.log("clearoption");
        let arr = this.state.questions;

        arr[this.state.index].attempted = null;
        arr[this.state.index].status = "";
        arr[this.state.index].saveandnext = "0";

        if (arr[0].mains_2021 == "1") {
            let sampleArr = [];
            arr.map((item) => {
                sampleArr.push(item.subject);

            });

            const uniqueArr = [... new Set(sampleArr.map(data1 => data1))]
            //console.log("sampleArr",sampleArr,uniqueArr);
            let qaar = arr;
            uniqueArr.map((umap) => {
                const sfcount = qaar.filter((a) => a.qtype == "8" && a.attempted != null && umap == a.subject);
                console.log("sfcount", sfcount);
                if (sfcount.length > 4) {

                    qaar = qaar.map((qmap) => {
                        if (qmap.qtype == "8" && qmap.attempted == null && umap == qmap.subject) {
                            return { ...qmap, qdisable: true }

                        }
                        else {
                            return { ...qmap }
                        }

                    });
                }
                else {
                    qaar = qaar.map((qmap) => {
                        if (qmap.qtype == "8" && umap == qmap.subject) {
                            return { ...qmap, qdisable: false }

                        }
                        else {
                            return { ...qmap }
                        }

                    });
                }

            })


            this.setState({ questions: qaar });
        }
        else {
            this.setState({ questions: arr });
        }


    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleInputChange2 = (option, question) => {
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

        let arr = this.state.questions;
        console.log("handleInputChange", option, question, arr[this.state.index].attempted);
        if (arr[this.state.index].attempted == null) {
            arr[this.state.index].attempted = option;
            arr[this.state.index].status = "attempt";
        }
        else {
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";
        }




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

        this.setState({
            index: this.state.index + 1
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


        const examSubjectsObj = this.state.examSubjects.find((a) => a.id == arr[this.state.index].subject);
        let index = this.state.examSubjects.indexOf(examSubjectsObj);

        let getsubId = this.state.examSubjects[index + 1];
        let findex = this.state.index + 1;
        if (getsubId == undefined) {
            getsubId = this.state.examSubjects[0];
            findex = 0;
        }

        const examSubjects = this.state.examSubjects.map((emap) => {
            if (emap.id == getsubId.id) {
                return { ...emap, active: "active" }

            }
            else {
                return { ...emap, active: "" }
            }

        })
        console.log("examSubjects", examSubjects);
        arr = arr.map((amap) => {
            if (getsubId.id == amap.subject) {
                return { ...amap, sidebutton: "0" }

            }
            else {
                return { ...amap, sidebutton: "1" }
            }

        })
        this.setState({
            nextsubject: "0",
            examSubjects: examSubjects,
            index: findex,
            questions: arr
        });
    }
    SaveFunctionbck = () => {
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
    subjectskip = () => {
        console.log("subjectskip");
        let arr = this.state.questions;
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0");
        let filterlastindex = filterData.length - 1;

        if (arr[this.state.index + 1] != undefined) {
            if (filterData[filterlastindex].id == arr[this.state.index + 1].id) {
                this.setState({
                    nextsubject: "1"
                });
            }
            else {
                this.setState({
                    nextsubject: "0"
                });
            }
        }
        else {
            this.setState({
                nextsubject: "0"
            });
        }



        const examSubjectsObj = this.state.examSubjects.find((a) => a.id == arr[this.state.index].subject);
        let index = this.state.examSubjects.indexOf(examSubjectsObj);

        let getsubId = this.state.examSubjects[index + 1];

        if (getsubId == undefined) {
            getsubId = this.state.examSubjects[0];

        }

        const examSubjects = this.state.examSubjects.map((emap) => {
            if (emap.id == getsubId.id) {
                return { ...emap, active: "active" }

            }
            else {
                return { ...emap, active: "" }
            }

        })
        console.log("examSubjects", examSubjects);
        arr = arr.map((amap) => {
            if (getsubId.id == amap.subject) {
                return { ...amap, sidebutton: "0" }

            }
            else {
                return { ...amap, sidebutton: "1" }
            }

        })

        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
            let findex = 0
            if (arr[this.state.index + 1] != undefined) {
                findex = parseInt(this.state.index + 1);
            }
            this.setState({
                index: findex,
                questions: arr,
                examSubjects: examSubjects
            })
        }
        else {
            //if (window.confirm("Do you want to skip this Question?")) {
            arr[this.state.index].status = "skip";
            arr[this.state.index].result = "";
            arr[this.state.index].attempted = null;

            let findex = 0
            if (arr[this.state.index + 1] != undefined) {
                findex = parseInt(this.state.index + 1);
            }
            this.setState({
                questions: arr,
                index: findex,
                examSubjects: examSubjects
            })
            //}

        }
    }
    skip = () => {
        console.log("dsfsskip");
        let arr = this.state.questions;

        let filterData = this.state.questions.filter((a) => a.sidebutton == "0");
        let filterlastindex = filterData.length - 1;

        if (filterData[filterlastindex].id == arr[this.state.index + 1].id) {
            this.setState({
                nextsubject: "1"
            });
        }
        else {
            this.setState({
                nextsubject: "0"
            });
        }
        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
            this.setState({
                index: parseInt(this.state.index + 1),
                questions: arr
            })
        }
        else {
            //if (window.confirm("Do you want to skip this Question?")) {
            arr[this.state.index].status = "skip";
            arr[this.state.index].result = "";
            arr[this.state.index].attempted = null;
            this.setState({
                questions: arr,
                index: parseInt(this.state.index + 1),
            })
            //}

        }
    }
    review = () => {
        let arr = this.state.questions;
        if (arr[this.state.index].review == false) {
            arr[this.state.index].review = true;
            this.setState({
                //index: parseInt(this.state.index + 1),
                questions: arr
            })
        }
        else {
            arr[this.state.index].review = false;
            this.setState({
                //index: parseInt(this.state.index + 1),
                questions: arr
            })
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
        console.log("sideQFun", idata);
        if (index != this.state.index) {
            if (idata.status == "") {
                if (arr[this.state.index].status == "") {
                    // if (window.confirm("Do you want to skip this Question?")) {
                    arr[this.state.index].status = "skip";
                    this.setState({
                        questions: arr,
                        index: index,
                    })
                    //}
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
                    console.log("devi", idata.status);
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
                    if (idata.status == "attempt") {
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
                }
                else {
                    console.log("elsedevi");
                    this.setState({ index: index });

                }



            }
        }
    }
    cancelFunction = () => {
        //localStorage.clear();
        window.close();
    }
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
            console.log("bookhandleFormSubmit", params);

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
                console.log("data.addBookmark", data.addBookmark);
                let arr = this.state.questions.map((item) => {
                    if (item.id == params.custom_content_id) {
                        return { ...item, bookmarked: "true" }
                    }
                    else {
                        return { ...item }
                    }

                })
                console.log("this.state.bnewtag", arr);
                let globals1 = store.readQuery({
                    query: FETCH_GLOBALS,
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                });
                console.log("this.state.bnewtag", globals1, this.state);
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
        let length = 8
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        console.log("startExamparams", Cookies.get("mobile"),
            result,
            parseInt(this.props.getData.sessionid),
            this.props.getData.stype,
            parseInt(this.props.getData.exam_paper_id));
        this.startExam(
            Cookies.get("mobile"),
            result,
            parseInt(this.props.getData.sessionid),
            this.props.getData.stype,
            parseInt(this.props.getData.exam_paper_id)
        ).catch(error => {
            this.setState({
                submitError3: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    }
    startExam = async (
        mobile,
        uid,
        exam_session_id,
        type,
        exam_paper_id) => {
        await this.props.startExam({
            variables: {
                mobile,
                uid,
                exam_session_id,
                type,
                exam_paper_id
            },
            update: (store, { data }) => {
                console.log("data.startExam", data.startExam);
                if (data.startExam) {
                    this.setState({
                        startPractise: "1",
                        uid: uid
                    });
                }
            }
        });
    };


    parentSubjectfilter = (subtype) => {
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
        let filterData = subjectfilterQuetsions.filter((a) => a.sidebutton == "0");

        let findex = "";
        this.state.questions.map((item, index) => {

            if (filterData[0].id == item.id) {
                console.log("sfsf", filterData[0].id, item.id);
                findex = index;
            }

        });

        console.log("filterData", findex);
        this.setState({
            index: findex,
            questions: subjectfilterQuetsions
        });
    }
    bckparentSubjectfilter = (subtype) => {


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
    subjectFilter = (subtype) => {
        //console.log("subtype", subtype);
        const activeSubjects = this.state.examSubjects.map((item) => {
            if (item.id == subtype) {
                return { ...item, active: "active" }

            }
            return { ...item, active: "" }

        });
        this.setState({
            examSubjects: activeSubjects,
        });
        this.parentSubjectfilter(subtype);
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
        if (arr[this.state.index].status == "") {
            arr[this.state.index].status = "skip";
        }
        arr[this.state.index].saveandnext = "1";
        this.setState({
            questions: arr,
            submissionIns: true

        });
    }
    render() {
        console.log("this.state.questions[0].mains_2021", this.props.getPracticeQuestions[0].mains_2021);

        if (this.state.lastqstatus == 2) {
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <MockExamNavbar
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
                        <MockExamAsideBar
                            stateData={this.state}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                            parentSubjectfilter={this.parentSubjectfilter}
                            subjectFilter={this.subjectFilter}
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
                    <SubmissionInstructionModal
                        handleFormSubmit={this.handleFormSubmit}
                        questions={this.state.questions}
                        show={this.state.submissionIns}
                        onHide={() => this.setState({ submissionIns: false })}
                    />
                </React.Fragment>

            )
        }
        else {
            if (this.state.startPractise == "0") {
                return (
                    <MockInstructions
                        mains2021={this.props.getPracticeQuestions[0].mains_2021}
                        examInstructions={this.props.getExamInstructions}
                        type="exam"

                        startPracticeFun={this.startPracticeFun}
                    />
                )
            }
            return (
                <React.Fragment>
                    <div className="header-area-section">
                        <MockExamNavbar
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
                        <MockExamAsideBar
                            stateData={this.state}
                            ParenthandleFormSubmit={this.Completeexam}
                            getPracticeQuestions={this.props.getPracticeQuestions}
                            psideQFun={this.sideQFun}
                            parentSubjectfilter={this.parentSubjectfilter}
                            subjectFilter={this.subjectFilter}
                        />
                        <div className="content-wrapper p-0">
                            <Container>
                                <SeriesExamSection
                                    parentonScrollgetQuestionById={this.parentonScrollgetQuestionById}
                                    pCommentsFunction={this.commentsFunction}
                                    ParentSelecthandleChange={this.handleSelectChange}
                                    stateData={this.state}
                                    ParenthandleInputChange={this.handleInputChange}
                                    ParenthandleInputChange2={this.handleInputChange2}
                                    getPracticeQuestions={this.props.getPracticeQuestions}
                                    PnextQuestionfunction={this.nextQuestionfunction}
                                    Pskip={this.skip}
                                    Psubjectskip={this.subjectskip}
                                    review={this.review}
                                    clearoption={this.clearoption}
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
                    <SubmissionInstructionModal
                        cancelFunction={this.cancelFunction}
                        finishsubmitError={this.state.finishsubmitError}
                        handleFormSubmit={this.handleFormSubmit}
                        questions={this.state.questions}
                        show={this.state.submissionIns}
                        onHide={() => this.setState({ submissionIns: false })}
                    />
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
    })
        , graphql(START_EXAM, {
            name: "startExam"
        }))(ScheduleExamSectionMiddle));
