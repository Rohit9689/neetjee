import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import CustomExamSectionMiddle from '../components/exams/custom_exam_test/CustomExamSectionMiddle';
import ScheduleExamSectionMiddle from '../components/exams/schedule_exam_test/ScheduleExamSectionMiddle';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'

const FETCH_STUDENTEXAMQUESTION = gql`
  query(
          $mobile: String!, $exam_session_id: Int!,$type: String
$exam_paper_id: Int) {
    
            getStudentExamQuestions(mobile: $mobile, exam_session_id: $exam_session_id,
                type: $type,
                exam_paper_id: $exam_paper_id){
              id
              subject
              examType
              sub_exam_type
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
              bookmarked
              report{
                report_id
                comments
              }
              notes{
                tags
                comments
              }
              subject_name
          }
      }
`;

const FETCH_EXAMINSTRUCTIONS = gql`
  query(
          $mobile: String!, $exam_session_id: Int!,$type: String
$exam_paper_id: Int) {
    
    getExamInstructions(mobile: $mobile, exam_session_id: $exam_session_id,
                type: $type,
                exam_paper_id: $exam_paper_id){
                    is_exam
                    exam_id
                    exam_type
                    instructions
                    exam_status
                    status_text
          }
      }
`;

const STUDENT_GLOBALS = gql`
  query(
          $mobile: String!) {
            studentGlobals(mobile: $mobile){
                errorReasons{
                    id
                    reason
                }
                reports{
            id
            report
        }
        tags{
            id
            tag
            type
        }
        exam_time
       
              
          }
      }
`;

class CustomExamTest extends Component {
    handleWindow = e => {
        //alert("hello: " + e.type);
    };
    componentDidMount() {
        console.log("window.location.href", window.location.href);
        // window.addEventListener("beforeunload", (e) => {
        //     e.preventDefault();
        //     //console.log("Before unload");
        //     //return e.originalEvent.returnValue = "Your message here";
        //     return e.returnValue = 'Are you sure you want to close?';
        //     e.returnValue = "";
            
        //     // alert("Window closed");
        // });

        //const _isMounted = true;
        // console.log("hash:", this.props.history.location.pathname);
        // if (this.props.history.location.pathname == "/student/subject/exam") {
        //     window.onpopstate = e => {
        //         const { hash } = this.props.history.location;

        //         console.log("hash:");

        //         if (!window.confirm("Are you sure to Leave this exam?")) {
        //             console.log("Popstate confirm denied");
        //             e.preventDefault();
        //         }


        //     };
        // }


        // window.addEventListener("keydown", this.handleWindow);
        // window.addEventListener("cancel", this.handleWindow);
        window.addEventListener('contextmenu',
            event => event.preventDefault());


        // window.addEventListener("mousedown", e => {
        //     e.preventDefault();
        //     e.returnValue = "false";

        // });
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {
        console.log("componentWillUnmount", window, this.props);
        // window.removeEventListener("keydown", this.handleWindow);
        // window.removeEventListener("cancel", this.handleWindow);
        //window.removeEventListener("beforeunload", this.handleWindow);
        window.removeEventListener('contextmenu', this.handleWindow);
        // window.removeEventListener("mousedown", this.handleWindow);
        window.removeEventListener("selectstart", this.handleWindow);
        //window.removeEventListener("popstate", this.handleWindow);
    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        console.log("CustomExamTest", "mobile:", Cookies.get("mobile"),
            "exam_session_id:", parseInt(localStorage.getItem('sessionid')),
            "type:", localStorage.getItem('stype'),
            "exam_paper_id:", parseInt(localStorage.getItem('exam_paper_id')));

        const localData = {
            sessionid: localStorage.getItem('sessionid'),
            type: localStorage.getItem('type'),
            stype: localStorage.getItem('stype'),
            exam_paper_id: localStorage.getItem('exam_paper_id'),
            etype: localStorage.getItem('etype'),
            subexamtype: localStorage.getItem('subexamtype')
        }
        const getStudentExamQuestions = this.props.getStudentExamQuestions;
        const loading1 = getStudentExamQuestions.loading;
        const error1 = getStudentExamQuestions.error;
        //if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

        const getExamInstructions = this.props.getExamInstructions;
        const loading3 = getExamInstructions.loading;
        const error3 = getExamInstructions.error;
        
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        console.log("getExamInstructions", getExamInstructions.getExamInstructions);
        return (

            <React.Fragment>
                {(loading1 == true || loading3 == true || loading2==true) && (<PreloaderTwo />)}
                {
                    !loading1 && !loading3 && !loading2 &&(
                        <React.Fragment>{
                            localStorage.getItem('exam_paper_id') != 0 ? (
                                <ScheduleExamSectionMiddle
                                getExamInstructions={getExamInstructions.getExamInstructions}
                                    changeToggle={this.props.changeToggle
                                    }
                                    studentGlobals={studentGlobals.studentGlobals}
                                    getPracticeQuestions={getStudentExamQuestions.getStudentExamQuestions}
                                    //getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} 
                                    getData={localData}
                                />
                            ) : (
                                    <CustomExamSectionMiddle
                                    getExamInstructions={getExamInstructions.getExamInstructions}
                                        changeToggle={this.props.changeToggle
                                        }
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getPracticeQuestions={getStudentExamQuestions.getStudentExamQuestions}
                                        //getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                        getData={localData}
                                    />)}</React.Fragment>


                    )
                }

            </React.Fragment>
        )
    }
}
export default
    compose(graphql(FETCH_STUDENTEXAMQUESTION,
        {
            options: props => ({



                variables: {
                    mobile: Cookies.get("mobile"),
                    // exam_session_id: parseInt(props.history.location.state.sessionid),
                    // type: props.history.location.state.stype,
                    // exam_paper_id: parseInt(props.history.location.state.exam_paper_id)
                    exam_session_id: parseInt(localStorage.getItem('sessionid')),
                    type: localStorage.getItem('stype'),
                    exam_paper_id: parseInt(localStorage.getItem('exam_paper_id'))
                }
                ,
                fetchPolicy: "cache-and-network"
            }), name: "getStudentExamQuestions"
        }),
        graphql(FETCH_EXAMINSTRUCTIONS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                        exam_session_id: parseInt(localStorage.getItem('sessionid')),
                        type: localStorage.getItem('stype'),
                        exam_paper_id: parseInt(localStorage.getItem('exam_paper_id'))
                    }
                    ,
                    fetchPolicy: "cache-and-network"
                }), name: "getExamInstructions"
            }),
        graphql(STUDENT_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                    }
                    ,
                    fetchPolicy: "cache-and-network"
                }), name: "studentGlobals"
            })
    )(CustomExamTest);
