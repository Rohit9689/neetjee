import React, { Component } from 'react'
import PracticeViewQuestionAnswerSectionMiddle from '../components/exams/practiceviewquestion_answer/PracticeViewQuestionAnswerSectionMiddle';
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
          $mobile: String!, $session_id: ID, $chapter_id: Int) {
            getStudentSessions(mobile: $mobile, session_id: $session_id, chapter_id:$chapter_id){
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
              subject
              chapter
              qtype_report{
                question_type
                question_type_name
                correct
                wrong
                not_answered
                accuracy
                speed
              }
              error_report{
                error
                error_name
                count
              }
              timestamp
              
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
            
          }
      }
`;
class PracticeViewQuestionAnswer extends Component {

    componentDidMount = () => {
        if (this.props.history.location.state.stype == "error") {
            const title = GoogleAnalyticsArray[0].Errror_Practice_QandA_View;
            ReactGA.pageview('/student/practice-view-question-answer', ["ELAPP"], title);
        }
        else {
            const title = GoogleAnalyticsArray[0].Practice_QandA_View;
            ReactGA.pageview('/student/practice-view-question-answer', ["ELAPP"], title);
        }
    }

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
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const getStudentSessions = this.props.getStudentSessions;
        const loading1 = getStudentSessions.loading;
        const error1 = getStudentSessions.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("PracticeViewQuestionAnswer", this.props.history.location.state);

        return (
            <div className={Cookies.get("toggle")}>
                {(loading1 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && (
                        <PracticeViewQuestionAnswerSectionMiddle
                            locdata={this.props.history.location.state}
                            changeToggle={this.menuToggler}
                            getData={getStudentSessions.getStudentSessions[0]}
                            getStudentSessions={getStudentSessions.getStudentSessions[0].result_questions}

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
                        session_id: parseInt(props.history.location.state.sessionid),
                        chapter_id: 0
                    },
                }), name: "getStudentSessions"
            })

        )(PracticeViewQuestionAnswer));
