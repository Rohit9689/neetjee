import React, { Component } from 'react'
import StudentAssistentExamMiddle from '../components/exams/studentassistent_exam/StudentAssistentExamMiddle';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'
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
          }
      }
`;
class StudentAssistentExam extends Component {
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
        const getExamInstructions = this.props.getExamInstructions;
        const loading3 = getExamInstructions.loading;
        const error3 = getExamInstructions.error;
        
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }

        const exam_session_id = this.props.match.params.exam_session_id.slice(1, 10);
        const exam_type = this.props.match.params.exam_type.slice(1, 10);
        // console.log("getStudentAssessmentQuestions", getStudentAssessmentQuestions.getStudentAssessmentQuestions);
        console.log("props.match.params.exam_session_id", this.props.match.params.exam_session_id.split(":")[1]);
        return (
            <React.Fragment>
                {(loading3 == true) && (<PreloaderTwo />)}
                {
                    !loading3 &&(
                <StudentAssistentExamMiddle
                    exam_type={exam_type}
                    exam_session_id={exam_session_id}
                    changeToggle={this.props.changeToggle}
                    getExamInstructions={getExamInstructions.getExamInstructions}
                />)}
            </React.Fragment>
        )
    }
}

    export default
    compose(
        graphql(FETCH_EXAMINSTRUCTIONS,
            {
                options: props => ({
                    variables: {
                        mobile: "99999999999",
                        exam_session_id: parseInt(props.match.params.exam_session_id.split(":")[1]),
                        type: "assessment",
                        exam_paper_id: 0
                    }
                    ,
                    fetchPolicy: "cache-and-network"
                }), name: "getExamInstructions"
            })
        
    )(StudentAssistentExam);
