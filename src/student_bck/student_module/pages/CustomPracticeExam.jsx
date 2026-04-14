import React, { Component } from 'react'
import CustomPracticeExamSectionMiddle from '../components/exams/custompractice_exam/CustomPracticeExamSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'

const FETCH_CUSTOMPRACTISEQUESTIONS = gql`
  query(
    $mobile: String!,
    $session_id: Int!) {
            getStudentCustomPracticeQuestions(mobile: $mobile,session_id: $session_id){
                id
                subject
                examTime
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
        questionTypes {
        id
        questiontype
      }
      complexity {
        id
        complexity
      }
      questionTheory {
        id
        question_theory
      }
              
          }
      }
`;

class CustomPracticeExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stopExamStatus: "0"
        }
    }

    handleWindow = e => {
        //alert("hello: " + e.type);
    };

    componentDidMount() {
        console.log("sree");
        window.addEventListener('contextmenu',
            event => event.preventDefault());
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {
        console.log("componentWillUnmount", window, this.props);
        window.removeEventListener('contextmenu', this.handleWindow);
        window.removeEventListener("selectstart", this.handleWindow);

    }

    render() {
        console.log("this.state", localStorage.getItem("session_id"));
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getStudentCustomPracticeQuestions = this.props.getStudentCustomPracticeQuestions;
        const loading1 = getStudentCustomPracticeQuestions.loading;
        const error1 = getStudentCustomPracticeQuestions.error;
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

        console.log("filterrr", getStudentCustomPracticeQuestions.getStudentCustomPracticeQuestions);

        return (
            <React.Fragment>
                {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && !loading2 && (
                        <CustomPracticeExamSectionMiddle
                            studentGlobals={studentGlobals.studentGlobals}
                            changeToggle={this.props.changeToggle}
                            getStudentCustomPracticeQuestions={getStudentCustomPracticeQuestions.getStudentCustomPracticeQuestions}
                        />

                    )
                }
            </React.Fragment>
        )
    }
}
export default
    compose(graphql(FETCH_CUSTOMPRACTISEQUESTIONS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    //session_id: 8805
                    session_id:parseInt(localStorage.getItem('session_id'))
                },
            }), name: "getStudentCustomPracticeQuestions"
        }),
        graphql(STUDENT_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                    },
                }), name: "studentGlobals"
            })
    )(CustomPracticeExam);
