import React, { Component } from 'react'
import PracticeViewQuestionAnswerSectionMiddle from '../components/exams/practiceviewquestion_answer/PracticeViewQuestionAnswerSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'

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
        console.log("PracticeViewQuestionAnswer", getStudentSessions.getStudentSessions, this.props.history.location.state.sessionid);

        return (
            <React.Fragment>
                {(loading1 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && (
                        <PracticeViewQuestionAnswerSectionMiddle
                        locdata ={this.props.history.location.state}
                            changeToggle={this.props.changeToggle}
                            getData={getStudentSessions.getStudentSessions[0]}
                            getStudentSessions={getStudentSessions.getStudentSessions[0].result_questions}

                        />
                    )
                }
            </React.Fragment>
        )
    }
}
export default
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

    )(PracticeViewQuestionAnswer);
