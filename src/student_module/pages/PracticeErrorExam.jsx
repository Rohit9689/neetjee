import React, { Component } from 'react'
import ErrorExamSectionMiddle from '../components/exams/error_exam_test/ErrorExamSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


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

    menuToggler = () => {
        const toggled = Cookies.get("toggle");
        if (toggled === "wrapper") {
            this.setState({ toggled: "wrapper sidebar-enable" });
            Cookies.set("toggle", "wrapper sidebar-enable");
        } else {
            this.setState({ toggled: "wrapper" });
            Cookies.set("toggle", "wrapper");
        }
    };
    handleWindow = e => {
        //alert("hello: " + e.type);
    };

    componentDidMount() {

        const title = GoogleAnalyticsArray[0].Error_Practice_page;
        ReactGA.pageview('/student/subject/practice-errortest', ["ELAPP"], title);

        window.onpopstate = e => {
            this.props.history.replace("/student/home", "urlhistory");
        };
        window.addEventListener('contextmenu',
            event => event.preventDefault());
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
        window.addEventListener("keypress", e => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }

        });
    }

    componentWillUnmount() {
        window.removeEventListener('contextmenu', this.handleWindow);
        window.removeEventListener("selectstart", this.handleWindow);
        window.removeEventListener("keypress", this.handleWindow);
    }
    render() {

        const getErrorQuestions = this.props.getErrorQuestions;
        const loading1 = getErrorQuestions.loading;
        const error1 = getErrorQuestions.error;
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
        const localData = {
            chapters: localStorage.getItem('chapters'),
            ocid: localStorage.getItem('ocid'),
            otid: localStorage.getItem('otid'),
            hchaptername: localStorage.getItem('hchaptername'),
            subjectid: localStorage.getItem('subjectid'),
            unanswered: localStorage.getItem('unanswered'),
            erranswered: localStorage.getItem('erranswered'),
            type: localStorage.getItem('type')
        }
        return (
            <div className={Cookies.get("toggle")}>
                {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && !loading2 && (
                        <ErrorExamSectionMiddle
                            studentGlobals={studentGlobals.studentGlobals}
                            changeToggle={this.menuToggler}
                            getPracticeQuestions={getErrorQuestions.getErrorQuestions}
                            getData={localData}
                        />
                    )
                }
            </div>
        )
    }
}
export default
    compose(graphql(FETCH_PERRORQUESTIONS,
        {
            options: props => ({
                variables: {
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
