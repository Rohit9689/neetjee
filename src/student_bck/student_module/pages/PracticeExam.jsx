import React, { Component } from 'react'
import PracticeExamSectionMiddle from '../components/exams/practice_exam/PracticeExamSectionMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'

const FETCH_PQUESTIONS = gql`
  query(
          $params: PracticeQuestionsInput) {
            getPracticeQuestions(params: $params){
              id
              subject
              question
              question1{
                qlist1
                qlist2
              }
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
              inputquestion
              question_theory
              qtype
              complexity
              bookmarked
              isSubmitted
              estatus
              compquestion
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

class ExamView extends Component {
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
        console.log("this.state", this.state);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const localData = {
            subjectid: localStorage.getItem('subjectid'),
            type: localStorage.getItem('type'),
            ocid: localStorage.getItem('ocid'),
            otid: localStorage.getItem('otid')
            
        }
        console.log("localData","params:", {
            mobile: Cookies.get("mobile"),
            topic_id: parseInt(localStorage.getItem('otid')),

            chapter_id: parseInt(localStorage.getItem('ocid')),
            setting: false,
            question_types: [],
            complexity: [],
            question_theory: [],
            limit: 100
        });

        const getPracticeQuestions = this.props.getPracticeQuestions;
        const loading1 = getPracticeQuestions.loading;
        const error1 = getPracticeQuestions.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;
        if (loading2) return null;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

      // console.log("filterrr", getPracticeQuestions.getPracticeQuestions.filter((a) => a.estatus == true));

        return (
            <React.Fragment>
                {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
                {
                    !loading1 && !loading2 && (
                        <PracticeExamSectionMiddle
                            studentGlobals={studentGlobals.studentGlobals}
                            changeToggle={this.props.changeToggle}
                            getPracticeQuestions={getPracticeQuestions.getPracticeQuestions.filter((a) => a.estatus == true)}
                            getData={localData
                            }

                        />
                    )
                }
            </React.Fragment>
        )
    }
}
export default
    compose(graphql(FETCH_PQUESTIONS,
        {
            options: props => ({
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        topic_id: parseInt(localStorage.getItem('otid')),

                        chapter_id: parseInt(localStorage.getItem('ocid')),
                        setting: false,
                        question_types: [],
                        complexity: [],
                        question_theory: [],
                        limit: 100
                    }

                },
            }), name: "getPracticeQuestions"
        }),
        graphql(STUDENT_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                    },
                }), name: "studentGlobals"
            })
    )(ExamView);
