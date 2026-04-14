import React, { Component } from 'react'
import ViewQuestionAnswerSectionMiddle from '../components/exams/viewquestion_answer/ViewQuestionAnswerSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'
import { withRouter } from 'react-router-dom';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const FETCH_SESSION_DATA = gql`
  query(
          $mobile: String!, $exam_session_id: ID) {
            getStudentExamSessions(mobile: $mobile, exam_session_id: $exam_session_id){
              id
              correct
              wrong
              not_answered
              total_questions
              correct_marks
              negative_marks
              total_marks
              in_time
              less_time
              over_time
              accuracy
              speed
              type
              sub_type
              exam_type
              qtype_report{
                question_type
                question_type_name
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
              result_questions{
                
                id
                question
                option1
                option2
                option3
                option4
                subject
                explanation
                answer
                status
                slno
                qtype
                compquestion
                list1type
                list2type
                mat_question
                inputquestion
                attempt_answer
                reason_for_wrong
                comments
                
              }
              timestamp
            
          }
      }
`;
class ViewQuestionAnswer extends Component {

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
    componentDidMount() {
        console.log("this.props.history.location.state.examtypeva", this.props.history.location.state.examtype);
        if (this.props.history.location.state.examtype == "series_test") {
            const title = GoogleAnalyticsArray[0].MockTest_QandA_View;
            ReactGA.pageview('/student/view-question-answer', ["ELAPP"], title);
        }
        if (this.props.history.location.state.examtype == "error_exam") {
            const title = GoogleAnalyticsArray[0].MockTest_QandA_View;
            ReactGA.pageview('/student/view-question-answer', ["ELAPP"], title);
        }
        if (this.props.history.location.state.examtype == "schedule_exam") {
            const title = GoogleAnalyticsArray[0].Schedule_Exams_QandA_View;
            ReactGA.pageview('/student/view-question-answer', ["ELAPP"], title);
        }
        if (this.props.history.location.state.examtype == "custom") {
            const title = GoogleAnalyticsArray[0].Custom_Exams_QandA_View;
            ReactGA.pageview('/student/view-question-answer', ["ELAPP"], title);
        }
        if (this.props.history.location.state.examtype == "jeemainsprevious_exam") {
            const title = GoogleAnalyticsArray[0].Jee_Mains_2021_QandA_View;
            ReactGA.pageview('/student/view-question-answer', ["ELAPP"], title);
        }

        const title = GoogleAnalyticsArray[0].Exams_QandA_View;
        ReactGA.pageview('/student/subject/exam-result', ["ELAPP"], title);


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

        window.removeEventListener('contextmenu', () => { });
        //window.removeEventListener("mousedown", () => { });
        window.removeEventListener("selectstart", () => { });

    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        console.log("ViewQuestionAnswer", this.props.history.location.state.examtype);
        const getStudentExamSessions = this.props.getStudentExamSessions;
        const loading1 = getStudentExamSessions.loading;
        const error1 = getStudentExamSessions.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }


        return (
            <div className={Cookies.get("toggle")}>
                {(loading1 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && (
                        <ViewQuestionAnswerSectionMiddle
                            locdata={this.props.history.location.state}
                            changeToggle={this.menuToggler}
                            getData={getStudentExamSessions.getStudentExamSessions[0]}
                            getStudentExamSessions={getStudentExamSessions.getStudentExamSessions[0].result_questions}

                        />
                    )
                }
            </div>
        )
    }
}
export default
    withRouter(
        compose(graphql(FETCH_SESSION_DATA,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                        exam_session_id: parseInt(props.history.location.state.sessionid),

                    },
                }), name: "getStudentExamSessions"
            })

        )(ViewQuestionAnswer));
