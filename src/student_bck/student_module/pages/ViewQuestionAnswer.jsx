import React, { Component } from 'react'
import ViewQuestionAnswerSectionMiddle from '../components/exams/viewquestion_answer/ViewQuestionAnswerSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'

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
    componentDidMount() {
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
        console.log("ViewQuestionAnswer", this.props.history.location.state, Cookies.get("mobile"));
        const getStudentExamSessions = this.props.getStudentExamSessions;
        const loading1 = getStudentExamSessions.loading;
        const error1 = getStudentExamSessions.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }


        return (
            <React.Fragment>
                {(loading1 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && (
                        <ViewQuestionAnswerSectionMiddle
                        locdata ={this.props.history.location.state}
                            changeToggle={this.props.changeToggle}
                            getData={getStudentExamSessions.getStudentExamSessions[0]}
                            getStudentExamSessions={getStudentExamSessions.getStudentExamSessions[0].result_questions}

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
                    exam_session_id: parseInt(props.history.location.state.sessionid),

                },
            }), name: "getStudentExamSessions"
        })

    )(ViewQuestionAnswer);
