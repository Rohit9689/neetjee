import React, { Component } from 'react'
import StudentAssistentExamAsideBar from '../../navbars/StudentAssistentExamAsideBar';
import StudentAssistentExam from './StudentAssistentExamSection';
import { Container, Form, Modal, Button } from 'react-bootstrap';
import '../_preexam.scss';
import Select from 'react-select';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import StudentAssistentExamNavbar from '../../navbars/StudentAssistentExamNavbar';
import PreloaderTwo from '../../preloader/PreloaderTwo';
import { withRouter } from "react-router-dom";
import Instructions from "../AssesmentInstructions";


const SUBMIT_ASSESMENT_TEST = gql`
  mutation(
    $params:FinishStudentAssessmentExam  
    ) {
        finishStudentAssessmentExam(
        params: $params
     )
  }
`;

const PREPARE_QUESTION_PAPER = gql`
  mutation(
    $exam_session_id:Int  
    ) {
        studentAssessmentExam(
        exam_session_id: $exam_session_id
     ){
        id
              subject
                exam
                question
                option1
                option2
                option3
                option4
                qtype
                compquestion
                list1type
                list2type
                mat_question
                explanation
                answer
                inputquestion
                subject_name
     }
  }
`;

let stopExamStatus = "0";
class StudentAssistentExamMiddle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmitted: false,
            index: 0,
            questions: [],
            submitStatus: 1,
            startPractise: "0",
            examLoader: 0,
            examSubjects: [],
            totaltimeup: 0,
            nextsubject: "0",
            reloader:"0"
        }
    }
    totTimeFunction = () => {
        this.setState({ totaltimeup: 1 });
        this.handleFormSubmit()
    }
    handleFormSubmit = e => {
        // e.preventDefault();
        
        let questions = [];
        this.state.questions.map((qmap, index) => {
            let attempted = "";
            if (qmap.attempted != null) {
                attempted = qmap.attempted;
            }
            const newObj = {
                question_id: parseInt(qmap.id),
                question_time: parseInt(qmap.timer),
                attempt_answer: attempted,
                slno: index + 1
            }
            questions.push(newObj);

        });
        
        let studentAssistObj = {
            exam_session_id: parseInt(this.props.exam_session_id),
            questions: questions
        };
        
        this.submitpt(
            studentAssistObj
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
        params) => {
        await this.props.submitpt({
            variables: {
                params
            },
            update: (store, { data }) => {
                
                if (data.finishStudentAssessmentExam) {
                    window.open(`https://rizee.in/assess-your-self/index.php?id=${this.props.exam_session_id}`, "_self");
                    

                }
            }
        });
    };

    timeFunction = () => {
        if(this.state.startPractise== "1"){
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
        
        this.timer = setInterval(() => {
            this.timeFunction();
        }, 1000)

        if (stopExamStatus == "0") {
            
            // window.addEventListener("beforeunload", e => {
            //     e.preventDefault();
            //     e.returnValue = "";
            //     console.log("Before unload");
            //     alert("Window closed");
            // });

            const _isMounted = true;
            window.onpopstate = e => {
                const { hash } = this.props.history.location;

                
                if (!window.confirm("Are you sure to Leave this exam?")) {
                    
                    e.preventDefault();
                }
            };
        }

    }
    componentWillUnmount() {
        clearInterval(this.timer);
        //window.removeEventListener("beforeunload", this.handleWindow);
        window.removeEventListener("popstate", this.handleWindow);
    }
    handleInputChange2 = (option, question) => {
        let findStatus = this.state.questions.find((a) => a.id == question);
        let arr = this.state.questions;
        if(arr[this.state.index].attempted!=null){
            let samplearray=arr[this.state.index].attempted.split(",");
           if(samplearray.includes(option)){
            samplearray=samplearray.filter((a)=>a!=option);
           }
           else{
            samplearray.push(option);
           }
            arr[this.state.index].attempted = samplearray.toString();
            arr[this.state.index].status = "attempt";
        
        }
        else{
           
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
        },()=>this.handleFormSubmit);
        

       }
    SaveFunction = () => {
        let arr = this.state.questions;
        arr[this.state.index].saveandnext = "1";
        let firstindex = "";
        let filterData = this.state.questions.filter((a) => a.sidebutton == "0" && a.status == "" && a.id!=this.state.questions[this.state.index].id);
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
        //let filterlastindex = filterData.length - 1;
        //if (filterData[filterlastindex].id == arr[this.state.index + 1].id) {
        this.setState({
            nextsubject: "0",

            index: firstindex,
            questions: arr
        });
        //}


    }


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
    handleIntegerInputChange = (e) => {
        

        // var pattern = new RegExp("^[-+]?[0-9]*$");
        var pattern = new RegExp(/^\d*\.?\d*$/);
        if (!pattern.test(e.target.value)) {
            
            let arr = this.state.questions;
            
            arr[this.state.index].attempted = null;
            arr[this.state.index].status = "";

            this.setState({ questions: arr });

        }
        else {
            
            let arr = this.state.questions;
            
                arr[this.state.index].attempted = e.target.value;
                arr[this.state.index].status = "attempt";
            
            this.setState({ questions: arr });
        }



    };
    clearoption = (e) => {
        
        let arr = this.state.questions;
        arr[this.state.index].result = "";
        arr[this.state.index].attempted = null;
        arr[this.state.index].status = "";

        this.setState({ questions: arr });
    }


    submitnext = () => {

        let arr = this.state.questions;
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
                    isSubmitted: true
                })
            }
        }
        else {
            if (idata.status == "") {
                if (window.confirm("Do you want to skip this Question?")) {
                    arr[this.state.index].status = "skip";
                    this.setState({
                        questions: arr,
                        index: parseInt(this.state.index + 1),
                    })
                }
            }
            else {
                arr[this.state.index].isSubmitted = true;
                this.setState({
                    isSubmitted: true
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

    startPracticeFun = e => {
        e.preventDefault();
        this.setState({
            examLoader: 1
        });
        this.prepareQuestionPaper(
            parseInt(this.props.exam_session_id)
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message), examLoader: 0
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    prepareQuestionPaper = async (
        exam_session_id) => {
        await this.props.prepareQuestionPaper({
            variables: {
                exam_session_id
            },
            update: (store, { data }) => {
                
                if (data.studentAssessmentExam) {
                    let sectionSubject = 0;
                    let currentExamSubjects = [];

                    data.studentAssessmentExam.map(item => {
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


                    let sampleArray = [];


                    for (let i = 0; i < data.studentAssessmentExam.length; i++) {
                        let newSubject = data.studentAssessmentExam[i];
                        const newarr1 = {
                            ...newSubject,
                            attempted: null,
                            timer: 0,
                            status: "",
                            reason: 0,
                            comments: "",
                            isSubmitted: false,
                            lastindex: "",
                            reasonstatus: "0",
                            saveandnext: "0",
                            sidebutton: "0"
                        }
                        sampleArray.push(newarr1);
                    }


                    this.setState({
                        examSubjects: uniquecurrentExamSubjects,
                        questions: sampleArray,
                        startPractise: "1",
                        examLoader: 0
                    });

                }
            }
        });
    };
    parentSubjectfilter = (subtype) => {
       

        if (subtype != 0) {
            let findData = this.state.questions.filter((a) => a.subject == subtype);
            
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
    parentonScrollgetQuestionById=(questionData)=>{
        
        this.setState({
            reloader:"2"
        });
        const questions=this.state.questions.map((item)=>{
            if(item.id==questionData[0].id){
                return{...item,
                    question:questionData[0].question,
                    option1:questionData[0].option1,
                        option2:questionData[0].option2,
                        option3:questionData[0].option3,
                        option4:questionData[0].option4,
                        compquestion:questionData[0].compquestion,
                        list1type:questionData[0].list1type,
                        list2type:questionData[0].list2type,
                        mat_question:questionData[0].mat_question,
                       
                        inputquestion:questionData[0].inputquestion,
                        
                }

            }
            else{
                return{...item}
            }

        });
        
        this.setState({
            questions:questions,
            reloader:"1"
        });
        setTimeout(() => { this.SetreLoad() }, 1500);

    }
    SetreLoad = () => {
        this.setState({
            reloader:"0"
        });
    }
    render() {
        
        if (this.state.examLoader == 1) {
            return (<PreloaderTwo />);
        }

        else if (this.state.startPractise == "0") {
            return (
                <Instructions
                    type="exam"
                    examInstructions={this.props.getExamInstructions}
                    startPracticeFun={this.startPracticeFun}
                />
            )
        } else {
            if (this.state.totaltimeup == 1) {
                return (<React.Fragment>
                    <div className="main-wrapper-section w-100">
                        <div className="content-wrapper d-flex align-items-center text-center p-0">
                            <Container>
                                <div className="success-content-block py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="159.501" height="37.139" className="logo"
                                        viewBox="0 0 159.501 37.139">
                                        <g transform="translate(-384.741 -406.553)">
                                            <g transform="translate(445.845 406.553)">
                                                <path fill="#2a346c"
                                                    d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z"
                                                    transform="translate(-825.498 -406.553)" />
                                                <path fill="#2a346c"
                                                    d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z"
                                                    transform="translate(-983.902 -406.553)" />
                                                <path fill="#2a346c"
                                                    d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z"
                                                    transform="translate(-1047.488 -442.954)" />
                                                <path fill="#2a346c"
                                                    d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z"
                                                    transform="translate(-1167.251 -441.157)" />
                                                <path fill="#2a346c"
                                                    d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z"
                                                    transform="translate(-1309.031 -441.157)" />
                                            </g>
                                            <g transform="translate(445.797 439.343)">
                                                <path fill="#2a346c"
                                                    d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                                                    transform="translate(-825.153 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z"
                                                    transform="translate(-864.261 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                                    transform="translate(-907.798 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z"
                                                    transform="translate(-969.577 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                                    transform="translate(-1009.586 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z"
                                                    transform="translate(-1047.869 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z"
                                                    transform="translate(-1088.442 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                                    transform="translate(-1125.485 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z"
                                                    transform="translate(-1161.778 -643.074)" />
                                                <path fill="#2a346c" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                                                    transform="translate(-1200.4 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z"
                                                    transform="translate(-1261.126 -643.074)" />
                                                <path fill="#2a346c"
                                                    d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z"
                                                    transform="translate(-1304.889 -643.45)" />
                                                <path fill="#2a346c" d="M1431.991,643.51h.785v4.228h-.785Z"
                                                    transform="translate(-1347.863 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z"
                                                    transform="translate(-1372.971 -643.45)" />
                                                <path fill="#2a346c"
                                                    d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                                    transform="translate(-1417.109 -643.45)" />
                                            </g>
                                            <g transform="translate(384.741 406.948)">
                                                <path fill="#2a346c"
                                                    d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z"
                                                    transform="translate(-384.741 -409.399)" />
                                                <path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z"
                                                    transform="translate(-571.865 -409.399)" />
                                            </g>
                                        </g>
                                    </svg>
                                    <h5 className="mt-4">Your Exam Time Duration is completed.<br /> Auto-submitting your exam...</h5>
                                </div>
                            </Container>
                        </div>
                    </div>
                </React.Fragment>);
            } else {
                return (
                    <React.Fragment>
                        <div className="header-area-section">
                            <StudentAssistentExamNavbar
                                onClick={() => this.props.changeToggle()}
                                getData={this.props.getData}
                                totTimeFunction={this.totTimeFunction}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                                getStudentAssessmentQuestions={this.state.questions}
                                stateData={this.state}
                            />
                        </div>

                        <div className="main-wrapper-section">

                            <StudentAssistentExamAsideBar
                                parentSubjectfilter={this.parentSubjectfilter}
                                stateData={this.state}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                                getStudentAssessmentQuestions={this.state.questions}
                                psideQFun={this.sideQFun}
                            />
                            <div className="content-wrapper p-0" style={{ minHeight: '70vh' }}>
                                <Container>
                                    <StudentAssistentExam
                                    parentonScrollgetQuestionById={this.parentonScrollgetQuestionById}
                                        pCommentsFunction={this.commentsFunction}
                                        ParentSelecthandleChange={this.handleSelectChange}

                                        stateData={this.state}
                                        ParenthandleInputChange={this.handleInputChange}
                                        ParenthandleInputChange2={this.handleInputChange2}
                                        getStudentAssessmentQuestions={this.state.questions}
                                        PnextQuestionfunction={this.nextQuestionfunction}
                                        Psubmitnext={this.submitnext}
                                        Pskip={this.skip}
                                        Review={this.Review}


                                        parentselecthandleInputChange={this.selecthandleInputChange}
                                        parenticonhandleInputChange={this.iconhandleInputChange}
                                        phandleMutipleInputChange={this.handleMutipleInputChange}

                                        handleIntegerInputChange={this.handleIntegerInputChange}
                                        clearoption={this.clearoption}
                                        SaveFunction={this.SaveFunction}
                                        FinalSaveFunction={this.FinalSaveFunction}
                                        ParenthandleFormSubmit={this.handleFormSubmit}
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
    compose(graphql(SUBMIT_ASSESMENT_TEST, {
        name: "submitpt"
    }), graphql(PREPARE_QUESTION_PAPER, {
        name: "prepareQuestionPaper"
    })
    )(StudentAssistentExamMiddle));




