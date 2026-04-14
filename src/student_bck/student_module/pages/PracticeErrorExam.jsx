import React, { Component } from 'react'
import ErrorExamSectionMiddle from '../components/exams/error_exam_test/ErrorExamSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
const FETCH_PERRORQUESTIONS = gql`
  query(
          $mobile: String!, $topic_id: Int, $chapter_id: Int, $un_answered:Int!,$wrong_answered:Int! ) {
            getErrorQuestions(mobile: $mobile, topic_id: $topic_id, chapter_id:$chapter_id, un_answered:$un_answered, wrong_answered:$wrong_answered){
              id
              subject
              question
              option1
              option2
              option3
              option4
              compquestion
              list1type
              list2type
              mat_question
              explanation
              answer
              chapter
              topic
              qtype
              complexity
              bookmarked
              report{
                report_id
                comments
              }
              notes{
                tags
                comments
              }
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
        examInstructions{
            is_exam
            instructions
        }
              
          }
      }
`;
class PracticeErrorExam extends Component {
    handleWindow = e => {
        //alert("hello: " + e.type);
    };

    componentDidMount() {

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
       // window.removeEventListener("beforeunload", this.handleWindow);
        window.removeEventListener('contextmenu', this.handleWindow);
        // window.removeEventListener("mousedown", this.handleWindow);
        window.removeEventListener("selectstart", this.handleWindow);
        //window.removeEventListener("popstate", this.handleWindow);
    }
    render() {
        console.log("PracticeErrorExam", this.props.history.location.state, Cookies.get("mobile"));
        const getErrorQuestions = this.props.getErrorQuestions;
        const loading1 = getErrorQuestions.loading;
        const error1 = getErrorQuestions.error;
        //if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;
        //if (loading2) return null;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        const localData = {
            chapters: localStorage.getItem('chapters'),
            ocid: localStorage.getItem('ocid'),
            otid: localStorage.getItem('otid'),
            hchaptername: localStorage.getItem('hchaptername'),
            subjectid: localStorage.getItem('subjectid'),
            //stateData: localStorage.getItem('stateData'),
            unanswered: localStorage.getItem('unanswered'),
            erranswered: localStorage.getItem('erranswered'),
            type: localStorage.getItem('type')
        }
        return (
            <React.Fragment>
                {/* <ErrorExamSectionMiddle
                    studentGlobals={studentGlobals.studentGlobals}
                    changeToggle={this.props.changeToggle}
                    getPracticeQuestions={getErrorQuestions.getErrorQuestions}
                    //getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                    getData={localData}
                /> */}
                {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && !loading2 && (
                        <ErrorExamSectionMiddle
                            studentGlobals={studentGlobals.studentGlobals}
                            changeToggle={this.props.changeToggle}
                            getPracticeQuestions={getErrorQuestions.getErrorQuestions}
                            //getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                            getData={localData}
                        />
                    )
                }
            </React.Fragment>
        )
    }
}
export default
    compose(graphql(FETCH_PERRORQUESTIONS,
        {
            options: props => ({
                variables: {
                    // mobile: Cookies.get("mobile"),
                    // topic_id: parseInt(props.history.location.state.otid),
                    // chapter_id: parseInt(props.history.location.state.ocid),
                    // un_answered: parseInt(props.history.location.state.stateData.unanswered),
                    // wrong_answered: parseInt(props.history.location.state.stateData.erranswered),

                    mobile: Cookies.get("mobile"),
                    topic_id: parseInt(localStorage.getItem("otid")),
                    chapter_id: parseInt(localStorage.getItem("ocid")),
                    un_answered: parseInt(localStorage.getItem("unanswered")),
                    wrong_answered: parseInt(localStorage.getItem("erranswered"))
                },
            }), name: "getErrorQuestions"
        }),
        graphql(STUDENT_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                    },
                }), name: "studentGlobals"
            })
    )(PracticeErrorExam);
