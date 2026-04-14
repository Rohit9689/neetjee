import React, { Component } from 'react'
import { Row, Col, Nav, Tab, Image, Button, Card, Table } from 'react-bootstrap';
import AnalysisFilter from '../AnalysisFilter'
import './_practiceexamanalysis.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import PracticeAndExamChapterModal from "../PracticeAndExamChapterModal";
import * as Cookies from "es-cookie";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentCustomExam  
    ) {
        studentCustomExam(
        params: $params
     )
  }
`;
const FETCH_PRACTICEANALYSIS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getOverallData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        
        class_id
        practice_data{
            practice_total
            practice_strength
            total_sessions
            total_questions
            answered_questions
            answered_strength
            error_questions
            error_strength
            error_correct_questions
            error_correct_strength
            class_wise_data{
                class1_total
                class1_strength
                class2_total
                class2_strength
            }
            pending_subjects{
                # id
                subject_id
                subject
                chapters{
                    id
                    chapter
                    topics{
                        id
                        topic
                    }
                }
                un_attempted_chapters{
                    id
                    chapter
                }
            }
        }
        exam_data{
            exams_total
            exams_strength
            class_wise_data{
                class1_total
                class1_strength
                class2_total
                class2_strength
            }
            total_questions
            answered_questions
            answered_strength
            skipped_questions
            skipped_strength
            error_questions
            error_strength
            chapter_accuracy
            cumulative_accuracy
            semi_grand_accuracy
            grand_accuracy
            previous_paper_accuracy
            exam_subject_data{
                # id
                subject_id
                subject
                exam_types{
                    type
                    exam_type_name
                    accuracy
                }
            }
            exam_type_conduct{
                type
                exam_type_name
                subjects{
                    # id
                    subject_id
                    subject
                    pending_chapters{
                        id
                        chapter
                    }
                }
            }
        }
        subject_last_data{
            id
            subject
            last_attempted_chapter
            last_attempted_chapter_name
            last_timestamp
            last_accuracy
        }
        
        
    }
}
`;

class PracticeExamAnalysisSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            modaldata: [],
            submitError: "",
            subjectid: "",
            userRestionModalShow: false
        }
    }

    startExamhandleFormSubmit = e => {
        e.preventDefault();

        let syllabus_web2 = [];
        this.state.modaldata.map((chmap) => {
            if (chmap.checked == true) {
                syllabus_web2.push(chmap.id.toString());
            }
        })
        const syllabus_web1 = [{
            subject_id: parseInt(this.state.subjectid),
            chapters: syllabus_web2
        }]


        let exam_type = "";
        if (Cookies.get("examid") == "1") {
            exam_type = 0;
        }
        else {
            exam_type = 1;
        }


        if (syllabus_web2.length > 0) {

            const params = {
                mobile: Cookies.get("mobile"),
                sub_type: "cumulative",
                class_id: 0,
                syllabus: syllabus_web1,
                advance_options: 0,
                question_types: [],
                complexity: [],
                question_theory: [],
                syllabus_web: [],
                question_types_subjectwise: [],
                complexity_subjectwise: [],
                question_theory_subjectwise: [],
                source: 0,
                exam_type: exam_type,
                exam_name: "",
                exam_date: "",
                save_exam_type: 0
            };
            console.log("params1", params);
            this.customfunction(
                params
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        }
        else {
            this.setState({ submitError: "Select at least one chapter" });
        }


    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                //console.log("updatedata", data);
                if (data.studentCustomExam) {
                    this.setState({
                        modalShow: false,
                        modaldata: [],
                        submitError: ""
                    });

                    // this.props.history.push({
                    //     pathname: "/student/subject/custom-instructions",
                    //     state: {
                    //         sessionid: data.studentCustomExam,
                    //         type: "Custom Exam",
                    //         etype: "examanalysis"
                    //     }
                    // }
                    // );

                    localStorage.setItem("sessionid", data.studentCustomExam);
                    localStorage.setItem("type", "Custom Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "examanalysis");

                    window.open("/student/subject/exam", "_blank")

                }
            }
        });
    };
    handleInputChange = (e, id) => {
        console.log("handleInputChange", e, id);

        const modified = this.state.modaldata.map((item) => {
            if (item.id == id) {
                if (e.target.checked == true) {
                    return { ...item, checked: true }
                }
                else {
                    return { ...item, checked: false }
                }

            }
            return { ...item }
        })
        this.setState({ modaldata: modified });
    }
    modalFun = (subid, data) => {
        const chData = data.map((item) => {
            return { ...item, checked: false }
        })
        this.setState({
            subjectid: subid,
            modaldata: chData,
            modalShow: true,

        });

    }

    classNameIcon = (data) => {
        //let classname = "";
        console.log("classNameIcon", data);
        if (data == "Botany") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><circle fill="#00c596" cx="20" cy="20" r="20" /><g transform="translate(13.679 4.56)"><path fill="#ffffff" d="M18.525,128.355v1.515c-.415,0-.814-.006-1.211,0-.379.007-.874-.076-.868.494.006.531.477.447.837.451.385,0,.769,0,1.211,0V132.5c-.7,0-1.4,0-2.112,0-.365,0-.767,0-.751.483s.425.466.783.465c.687,0,1.375,0,2.1,0V135.1c-.494,0-.976,0-1.458,0-.349,0-.67.118-.594.5.037.186.366.407.587.44a10.232,10.232,0,0,0,1.449.021v1.652c-.723,0-1.429,0-2.136,0-.374,0-.755.044-.733.516.02.435.4.44.74.438.708,0,1.417,0,2.116,0a4.238,4.238,0,0,1-4.444,4.315,4.282,4.282,0,0,1-4.114-4.267c-.022-3.242,0-6.486-.018-9.728,0-.423.162-.615.542-.616C13.12,128.351,15.788,128.355,18.525,128.355Z" transform="translate(-8.692 -112.579)" /><path fill="#ffffff" d="M5.1,11.841V9.457c-.324-.058-.64-.1-.953-.168A5.2,5.2,0,0,1,.027,4.059c.012-.485.226-.65.677-.64a5.5,5.5,0,0,1,4.035,1.76c.092.1.181.2.3.332a16.631,16.631,0,0,1,.269-1.676A5.2,5.2,0,0,1,10.269,0c.747,0,.842.1.817.858A5.14,5.14,0,0,1,6.609,5.888c-.181.026-.359.061-.562.1V11.75c.218.012.431.033.644.034.98.007,1.96-.027,2.937.022a1.566,1.566,0,0,1,1.519,1.606,1.546,1.546,0,0,1-1.577,1.54q-4.008.033-8.018,0A1.516,1.516,0,0,1,0,13.4a1.546,1.546,0,0,1,1.617-1.554C2.756,11.83,3.894,11.841,5.1,11.841Z" transform="translate(0 0.001)" /></g></svg>
            );
        } else if (data == "Physics") {
            // classname = "fal fa-atom fa-fw fa-2x";
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><circle fill="#feaf55" cx="20" cy="20" r="20" /><g transform="translate(7.07 5.925)"><path fill="#fff" d="M23.085,6.47c.084-.345.162-.683.249-1.019a11.75,11.75,0,0,1,1.577-3.873A5.187,5.187,0,0,1,26.049.4a1.95,1.95,0,0,1,2.408.017,12.039,12.039,0,0,1,.969.864,2.279,2.279,0,0,1,2.2-.054A2.376,2.376,0,0,1,32.81,2.534a2.446,2.446,0,0,1-1.591,3.193l.175.75c.15-.04.282-.073.412-.11a13.689,13.689,0,0,1,4.345-.676,5.9,5.9,0,0,1,1.729.325,2.149,2.149,0,0,1,1.365,2.72,7.394,7.394,0,0,1-1.82,3.04c-.535.6-1.116,1.151-1.7,1.752.181.168.38.346.571.53a12.005,12.005,0,0,1,2.643,3.365,3.2,3.2,0,0,1,.388,1.738,2.294,2.294,0,0,1-1.867,1.983c-.039.009-.078.015-.128.024-.028.186-.046.374-.085.558a2.366,2.366,0,0,1-4.685-.511c.008-.317-.084-.442-.38-.491-.253-.042-.5-.127-.768-.2-.15.584-.278,1.148-.441,1.7a10.153,10.153,0,0,1-1.694,3.623,2.537,2.537,0,0,1-2.142,1.138,2.623,2.623,0,0,1-1.911-1.121,8.563,8.563,0,0,1-1.461-2.878c-.231-.724-.406-1.465-.606-2.2-.021-.076-.04-.152-.068-.262l-2.043.522a1.492,1.492,0,0,1-.4,1.133,1.464,1.464,0,0,1-2.49-.6c-.058-.215-.154-.276-.375-.324A6.624,6.624,0,0,1,16.24,20.8a2.088,2.088,0,0,1-1-2.524,7.366,7.366,0,0,1,1.819-3.041c.536-.6,1.116-1.151,1.707-1.754-.187-.173-.393-.357-.592-.55A11.834,11.834,0,0,1,15.54,9.556a3.168,3.168,0,0,1-.366-1.8,2.075,2.075,0,0,1,1.316-1.7,5.5,5.5,0,0,1,2.656-.35,17.4,17.4,0,0,1,3.765.736A1.39,1.39,0,0,0,23.085,6.47ZM31.039,13.5h0c0-.682.008-1.364-.008-2.046a.418.418,0,0,0-.186-.3q-1.688-.95-3.394-1.869a.5.5,0,0,0-.41,0q-1.707.917-3.393,1.871a.443.443,0,0,0-.188.323q-.019,2.016,0,4.031a.411.411,0,0,0,.165.307q1.714.965,3.447,1.9a.436.436,0,0,0,.354,0q1.732-.934,3.447-1.9a.384.384,0,0,0,.165-.278C31.046,14.868,31.039,14.186,31.039,13.5Zm-7.017,6.755c.147.573.278,1.168.454,1.75a9.348,9.348,0,0,0,1.576,3.315c.025.031.051.062.077.092A1.308,1.308,0,0,0,28.35,25.4a8.671,8.671,0,0,0,1-1.63,14.65,14.65,0,0,0,1.094-3.523c-1.055-.442-2.085-.876-3.119-1.3a.293.293,0,0,0-.2.019C26.114,19.386,25.1,19.81,24.022,20.259Zm-4.5-7.41c.806-.585,1.557-1.174,2.354-1.693a1.3,1.3,0,0,0,.722-1.144c.029-.847.182-1.689.286-2.566-.346-.1-.7-.2-1.056-.29a11.262,11.262,0,0,0-3.8-.452,4.415,4.415,0,0,0-1.267.325.943.943,0,0,0-.606,1.04,3.383,3.383,0,0,0,.243.981A12.147,12.147,0,0,0,19.524,12.849Zm15.448-.019a13.832,13.832,0,0,0,2.74-3.078,5.61,5.61,0,0,0,.579-1.31A1.146,1.146,0,0,0,37.5,6.915a2.86,2.86,0,0,0-1.021-.209,22.651,22.651,0,0,0-2.63.194c-.765.112-1.512.348-2.238.522.116,1.085.224,2.11.342,3.133a.388.388,0,0,0,.147.238C33.044,11.47,33.994,12.139,34.972,12.83ZM19.46,14.14c-.69.747-1.418,1.492-2.095,2.282a5.166,5.166,0,0,0-1.17,2.11,1.166,1.166,0,0,0,.822,1.563,6.3,6.3,0,0,0,1.144.217.381.381,0,0,0,.276-.117,1.448,1.448,0,0,1,2.049-.188.35.35,0,0,0,.231.093c.728-.165,1.454-.343,2.155-.512-.115-1.084-.22-2.108-.337-3.132a.389.389,0,0,0-.148-.239C21.443,15.539,20.493,14.87,19.46,14.14Zm10.99-7.367c-.059-.254-.133-.5-.172-.759a.331.331,0,0,0-.293-.31,2.4,2.4,0,0,1-1.542-3.35c.21-.444.215-.448-.128-.8a2.85,2.85,0,0,0-.439-.364.99.99,0,0,0-1.209-.025,3.74,3.74,0,0,0-.83.811A11.414,11.414,0,0,0,24.232,5.9c-.077.3-.134.6-.2.879a21.624,21.624,0,0,1,2.235.908,1.9,1.9,0,0,0,1.976-.005A22.483,22.483,0,0,1,30.451,6.773ZM31.6,19.559c.389.107.78.224,1.177.317a.307.307,0,0,0,.242-.1,2.348,2.348,0,0,1,4,.281.313.313,0,0,0,.25.127,1.241,1.241,0,0,0,1.061-1.312,3.149,3.149,0,0,0-.291-1.029,12.593,12.593,0,0,0-3.091-3.694l-.254.188c-.693.512-1.365,1.058-2.089,1.523A1.3,1.3,0,0,0,31.886,17C31.853,17.849,31.7,18.69,31.6,19.559Zm3.335,3.1a1.469,1.469,0,0,0,1.4-1.472,1.453,1.453,0,0,0-1.419-1.42,1.47,1.47,0,0,0-1.4,1.472A1.455,1.455,0,0,0,34.936,22.658ZM32,3.388a1.412,1.412,0,1,0-2.823-.066A1.412,1.412,0,0,0,32,3.388Zm.065,11.682L34.2,13.5,32.065,11.93Zm-9.644.009V11.932L20.286,13.51Zm1.415-7.331c-.1.792-.194,1.518-.294,2.3l2.551-1.407Zm7.108,9.21-2.552,1.41,2.257.884C30.751,18.462,30.844,17.739,30.945,16.958ZM28.391,8.64l2.55,1.4c-.1-.792-.2-1.522-.3-2.292ZM23.838,19.254l2.25-.893-2.545-1.4C23.643,17.743,23.737,18.471,23.838,19.254Zm-4.266,2.437a.536.536,0,0,0,.5-.538.509.509,0,0,0-1.019.02A.539.539,0,0,0,19.572,21.692Z" transform="translate(-14.236 0.009)" /><path fill="#fff" d="M81.748,20.163A1.927,1.927,0,1,1,83.663,18.2,1.913,1.913,0,0,1,81.748,20.163Zm0-.962a.964.964,0,1,0-.974-.946A.988.988,0,0,0,81.747,19.2Z" transform="translate(-74.993 -15.325)" /><path fill="#fff" d="M2.888,201.432A1.43,1.43,0,0,1,1.4,202.868a1.445,1.445,0,0,1,.078-2.889A1.428,1.428,0,0,1,2.888,201.432Zm-.963-.008a.508.508,0,0,0-.48-.482.481.481,0,0,0,0,.961A.5.5,0,0,0,1.925,201.425Z" transform="translate(0 -187.911)" /><path fill="#fff" d="M400.661,202.878a1.444,1.444,0,1,1,1.446-1.472A1.428,1.428,0,0,1,400.661,202.878Zm.483-1.43a.51.51,0,0,0-.466-.5.5.5,0,0,0-.495.466.51.51,0,0,0,.466.5A.5.5,0,0,0,401.145,201.448Z" transform="translate(-375.129 -187.921)" /><path fill="#fff" d="M180.466,186.447a2.408,2.408,0,1,1-2.381-2.427A2.391,2.391,0,0,1,180.466,186.447Zm-.962-.016a1.446,1.446,0,1,0-1.472,1.442A1.472,1.472,0,0,0,179.5,186.431Z" transform="translate(-165.05 -172.915)" /></g></svg>
            );
        } else if (data == "Chemistry") {
            // classname = "fal fa-flask fa-fw fa-2x";
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><circle fill="#077ee6" cx="20" cy="20" r="20" /><g transform="translate(10.37 7.407)"><path fill="#fff" d="M9.5,23.044c-2.245,0-4.491-.009-6.736,0A2.509,2.509,0,0,1,.293,21.8a2.464,2.464,0,0,1,.3-2.74q2.867-4.254,5.678-8.546a1.927,1.927,0,0,0,.3-.978q.036-3.734,0-7.47c0-.262-.229-.515-.322-.783S6,.718,6.078.5A.868.868,0,0,1,6.7.019q2.8-.056,5.6,0a.851.851,0,0,1,.613.491c.074.217-.086.524-.176.782s-.319.514-.322.771q-.038,3.734,0,7.47a1.907,1.907,0,0,0,.3.978q2.853,4.344,5.755,8.656a2.4,2.4,0,0,1,.267,2.571,2.364,2.364,0,0,1-2.3,1.3Q12.97,23.047,9.5,23.044ZM7.366.871c-.034.518-.089,1-.09,1.476-.009,2.423.012,4.846-.02,7.268A2.3,2.3,0,0,1,6.9,10.778q-2.865,4.374-5.788,8.711A1.8,1.8,0,0,0,.868,21.48a1.822,1.822,0,0,0,1.8.891q6.835-.008,13.67,0a1.79,1.79,0,0,0,1.8-.9,1.845,1.845,0,0,0-.258-1.995q-2.92-4.338-5.789-8.71a2.143,2.143,0,0,1-.327-1.1c-.027-2.922-.016-5.846-.016-8.818l.445-.085c0-.024-.007-.048-.011-.072H6.793c0,.024-.007.048-.009.072Z" transform="translate(0 0.009)" /><path fill="#fff" d="M19.6,113.326a1.228,1.228,0,0,1,.947-1.344,1.482,1.482,0,0,1,1.784.667l1.454-.746c.986,1.494,1.984,2.911,2.876,4.39a1.494,1.494,0,0,1-1.3,2.245q-6.638.03-13.274,0a1.5,1.5,0,0,1-1.273-2.271c.99-1.6,2.071-3.151,3.15-4.775a25.862,25.862,0,0,0,2.4,1c1.068.331,2.17.545,3.258.81a1.211,1.211,0,0,0,.786,1.379,1.435,1.435,0,0,0,1.97-1.752C21.413,113.07,20.509,113.2,19.6,113.326ZM17.1,116.291a.958.958,0,0,0,.955-.977.979.979,0,0,0-.96-.982.979.979,0,1,0,.005,1.958Z" transform="translate(-9.174 -96.534)" /><path fill="#fff" d="M61.395,78.895c.306,1.069.008,1.8-.8,2.04a1.355,1.355,0,0,1-1.716-.962c-.227-.8.276-1.461,1.375-1.769-.021-.535.165-1.023.742-1.061a1.188,1.188,0,0,1,.912.472C62.251,78.179,61.882,78.607,61.395,78.895Z" transform="translate(-50.932 -66.793)" /><path fill="#fff" d="M67.54,45.391c-.262.173-.551.511-.779.475a.923.923,0,0,1-.621-.66c0-.224.393-.6.645-.625.231-.027.506.317.761.5C67.544,45.183,67.542,45.287,67.54,45.391Z" transform="translate(-57.268 -38.598)" /><path fill="#fff" d="M67.977,27.36c.236.294.5.495.474.621-.048.193-.3.335-.471.5-.149-.157-.4-.3-.417-.474S67.771,27.662,67.977,27.36Z" transform="translate(-58.499 -23.689)" /></g></svg>
            );
        } else if (data == "Zoology") {
            // classname = "fal fa-microscope fa-fw fa-2x";
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><circle fill="#71a53b" cx="20" cy="20" r="20" /><g transform="translate(8.548 8.698)"><path fill="#fff" d="M39.9,94.917h3.013c.06,0,.121,0,.182,0,.372.009.614.217.615.527,0,.325-.247.53-.639.522q-2.066-.041-4.132-.084-2.729-.058-5.457-.119a3.112,3.112,0,0,1-.441-.029.515.515,0,0,1-.266-.883q.686-.8,1.4-1.577c.483-.532,1-1.037,1.464-1.583a4.783,4.783,0,0,0,1.246-2.636,15.375,15.375,0,0,0-.036-1.577,1.979,1.979,0,0,1,.081-.678c.5-1.382,1.026-2.756,1.541-4.133.012-.032.017-.066.043-.174-.094.108-.147.165-.194.225q-.678.872-1.354,1.745c-.221.284-.438.363-.69.258s-.344-.318-.311-.669c.107-1.121.239-2.24.3-3.363a3.331,3.331,0,0,0-1.286-2.822q-.993-.838-1.993-1.669A1.423,1.423,0,0,0,31,76.193c-.694.575-1.392,1.145-2.072,1.735a3.457,3.457,0,0,0-1.2,3.138c.1,1,.2,2,.286,3,.033.373-.069.564-.323.663s-.468.01-.7-.294c-.488-.629-.975-1.258-1.5-1.871a1.743,1.743,0,0,0,.047.174c.518,1.385,1.045,2.767,1.549,4.158a1.319,1.319,0,0,1,.038.655,5.075,5.075,0,0,0,1.571,4.55c.84.9,1.659,1.816,2.487,2.725a.536.536,0,0,1-.426.928q-3.509.073-7.017.151l-2.832.064c-.367.008-.588-.148-.629-.442a.523.523,0,0,1,.571-.607q1.533-.033,3.067-.061a.264.264,0,0,0,.184-.053c-.468-.1-.936-.211-1.4-.315-.4-.088-.795-.172-1.192-.26a.536.536,0,0,1-.482-.644c.064-.3.339-.456.715-.376.981.209,1.961.427,2.941.64l1.428.309c-.074-.1-.106-.153-.148-.2q-1.739-1.879-3.48-3.756a2.058,2.058,0,0,1-.354-2.49c.1-.2.2-.4.305-.6a2.3,2.3,0,0,1,2.992-1.135l.228.092c-.044-.135-.074-.239-.112-.34-.7-1.871-1.4-3.741-2.1-5.615a.34.34,0,0,0-.369-.271c-.485,0-.971-.012-1.455-.021-.379-.007-.6-.207-.6-.532s.228-.512.615-.513h.755c-.153-.16-.267-.283-.384-.4-.133-.136-.274-.266-.4-.407a.516.516,0,0,1,0-.764.522.522,0,0,1,.745.039c.256.254.5.522.744.784l.09-.046c0-.247,0-.494,0-.741.007-.382.207-.615.52-.614s.521.244.522.615c0,.572,0,1.144.006,1.715a.555.555,0,0,0,.087.31c.785,1.025,1.577,2.043,2.369,3.063a1.4,1.4,0,0,0,.113.1c-.034-.39-.053-.726-.094-1.059a4.51,4.51,0,0,1,1.381-4.089c.767-.713,1.584-1.375,2.409-2.019a2.426,2.426,0,0,1,3.034.032c.785.627,1.568,1.26,2.309,1.938a4.407,4.407,0,0,1,1.451,3.884c-.042.421-.076.843-.113,1.265l.074.065a1,1,0,0,1,.088-.177c.757-.98,1.521-1.956,2.272-2.94a.683.683,0,0,0,.128-.376c.015-.537.007-1.074.008-1.612a1.742,1.742,0,0,1,.009-.233.522.522,0,0,1,1.042.028c.015.281,0,.563,0,.845l.089.051c.251-.27.494-.546.754-.807a.523.523,0,0,1,.645-.083.476.476,0,0,1,.231.557.779.779,0,0,1-.2.323c-.23.242-.475.469-.769.757.328,0,.566,0,.8,0,.381,0,.612.2.611.52s-.236.517-.612.525c-.5.01-1.005.011-1.507.037a.352.352,0,0,0-.263.169c-.744,1.956-1.477,3.917-2.211,5.877a.631.631,0,0,0-.024.091,8.548,8.548,0,0,1,1.128-.181,2.139,2.139,0,0,1,2,1.168c.136.231.248.476.368.715a2.043,2.043,0,0,1-.337,2.491c-1.091,1.186-2.191,2.365-3.286,3.547a1.56,1.56,0,0,0-.295.406c.513-.11,1.026-.218,1.538-.33l2.713-.594c.405-.089.683.033.765.332a.523.523,0,0,1-.437.672c-.793.177-1.589.347-2.383.521-.074.016-.146.04-.22.059C39.9,94.841,39.9,94.879,39.9,94.917Zm-5.571-.255.027.1c.429,0,.859.01,1.287-.007a.529.529,0,0,0,.328-.142c.364-.371.711-.758,1.064-1.14q1.837-1.983,3.673-3.966a.984.984,0,0,0,.19-1.339c-.108-.217-.217-.433-.331-.647a1.2,1.2,0,0,0-1.608-.565c-.293.127-.571.288-.863.419a.269.269,0,0,0-.182.339,4.851,4.851,0,0,1-.059,1.832,7.525,7.525,0,0,1-2.144,3.612C35.231,93.639,34.789,94.159,34.33,94.662Zm-4.727.1.034-.1c-.466-.51-.915-1.037-1.4-1.526a7.55,7.55,0,0,1-2.1-3.492,4.95,4.95,0,0,1-.1-1.8c.017-.148.109-.329-.106-.432-.335-.16-.661-.345-1-.487a1.2,1.2,0,0,0-1.481.518c-.15.263-.281.537-.417.807A.975.975,0,0,0,23.2,89.44q2.411,2.6,4.824,5.2a.317.317,0,0,0,.189.113C28.673,94.763,29.138,94.759,29.6,94.759Z" transform="translate(-20.263 -74.748)" /><path fill="#fff" d="M256.45,128.738a6.738,6.738,0,0,1,.212-.981,2.841,2.841,0,0,0-.558-2.885c-.032-.041-.072-.075-.1-.116-.1-.133-.129-.277.01-.392a.244.244,0,0,1,.384.061,9.438,9.438,0,0,1,.745,1.238,2.758,2.758,0,0,1,.039,2.15,2.746,2.746,0,0,0-.091,1.606c.155.7.285,1.407.423,2.11.035.179.048.365-.186.412-.215.043-.282-.106-.317-.286-.162-.831-.331-1.662-.491-2.494a3.307,3.307,0,0,1-.028-.414Z" transform="translate(-243.639 -121.715)" /><path fill="#fff" d="M202.56,131.81c.114-.589.214-1.107.316-1.624.058-.3.115-.594.18-.89a2.369,2.369,0,0,0-.1-1.353,3.327,3.327,0,0,1,.674-3.368c.027-.034.056-.066.086-.1a.258.258,0,0,1,.389-.052c.143.119.107.254.006.389a6.171,6.171,0,0,0-.422.59,2.634,2.634,0,0,0-.241,2.387,2.73,2.73,0,0,1,.129,1.533q-.238,1.209-.474,2.418c-.031.159-.111.3-.291.257C202.708,131.976,202.628,131.864,202.56,131.81Z" transform="translate(-193.063 -121.773)" /><path fill="#fff" d="M205.769,331.949c-.058.06-.131.2-.214.206a.36.36,0,0,1-.292-.168,5.023,5.023,0,0,1-.2-.724c-.238-.992-.471-1.985-.711-2.976-.043-.177-.055-.342.153-.4s.3.072.342.255q.441,1.841.884,3.681C205.741,331.845,205.748,331.87,205.769,331.949Z" transform="translate(-194.742 -314.683)" /><path fill="#fff" d="M268.032,328.456l-.178.734q-.366,1.525-.732,3.051c-.041.17-.108.34-.318.3s-.241-.207-.192-.4c.241-.982.475-1.965.712-2.949a5.941,5.941,0,0,1,.2-.752.366.366,0,0,1,.289-.175C267.889,328.261,267.967,328.395,268.032,328.456Z" transform="translate(-253.759 -315.053)" /><path fill="#fff" d="M293.186,162.784c-.085.379-.175.808-.28,1.233-.043.172-.148.31-.356.239s-.194-.236-.135-.406a3.225,3.225,0,0,0,.145-1.809c-.02-.088.1-.207.151-.311.109.059.288.1.315.181A6.753,6.753,0,0,1,293.186,162.784Z" transform="translate(-278.201 -157.199)" /><path fill="#fff" d="M181.79,162.533c.055-.333.087-.572.137-.807.034-.159.135-.271.314-.234s.223.179.185.341a3.075,3.075,0,0,0,.131,1.755.719.719,0,0,1,.028.1c.03.148.015.283-.152.338a.245.245,0,0,1-.338-.192C181.978,163.375,181.879,162.913,181.79,162.533Z" transform="translate(-173.375 -156.965)" /></g></svg>
            );
        } else if (data == "Mathematics") {
            // classname = "fal fa-microscope fa-fw fa-2x";
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="30">
                    <path id="Shape 1" fill="#000" d="M10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20Z" />
                    <g id="Folder 1">
                        <path id="Layer" fillRule="evenodd" fill="#fff" d="M13.97 15.13L6.16 15.13C5.52 15.13 5 14.61 5 13.97L5 6.16C5 5.52 5.52 5 6.16 5L13.97 5C14.61 5 15.13 5.52 15.13 6.16L15.13 13.97C15.13 14.61 14.61 15.13 13.97 15.13ZM6.16 5.63C5.87 5.63 5.63 5.87 5.63 6.16L5.63 13.97C5.63 14.26 5.87 14.49 6.16 14.49L13.97 14.49C14.26 14.49 14.49 14.26 14.49 13.97L14.49 6.16C14.49 5.87 14.26 5.63 13.97 5.63L6.16 5.63Z" />
                        <path id="Layer" fill="#fff" d="M10.06 15.13C9.89 15.13 9.75 14.99 9.75 14.81L9.75 5.32C9.75 5.14 9.89 5 10.06 5C10.24 5 10.38 5.14 10.38 5.32L10.38 14.81C10.38 14.99 10.24 15.13 10.06 15.13Z" />
                        <path id="Layer" fill="#fff" d="M14.81 10.38L5.32 10.38C5.14 10.38 5 10.24 5 10.06C5 9.89 5.14 9.75 5.32 9.75L14.81 9.75C14.99 9.75 15.13 9.89 15.13 10.06C15.13 10.24 14.99 10.38 14.81 10.38Z" />
                        <path id="Layer" fill="#fff" d="M7.53 8.8C7.36 8.8 7.22 8.66 7.22 8.48L7.22 7C7.22 6.83 7.36 6.69 7.53 6.69C7.71 6.69 7.85 6.83 7.85 7L7.85 8.48C7.85 8.66 7.71 8.8 7.53 8.8Z" />
                        <path id="Layer" fill="#fff" d="M8.27 8.06L6.79 8.06C6.62 8.06 6.48 7.92 6.48 7.74C6.48 7.57 6.62 7.43 6.79 7.43L8.27 7.43C8.44 7.43 8.59 7.57 8.59 7.74C8.59 7.92 8.44 8.06 8.27 8.06Z" />
                        <path id="Layer" fill="#fff" d="M7 13.44C6.92 13.44 6.84 13.41 6.78 13.35C6.66 13.22 6.66 13.02 6.78 12.9L7.84 11.84C7.96 11.72 8.16 11.72 8.28 11.84C8.41 11.97 8.41 12.17 8.28 12.29L7.23 13.35C7.17 13.41 7.09 13.44 7 13.44Z" />
                        <path id="Layer" fill="#fff" d="M8.06 13.44C7.98 13.44 7.9 13.41 7.84 13.35L6.78 12.29C6.66 12.17 6.66 11.97 6.78 11.84C6.9 11.72 7.1 11.72 7.23 11.84L8.28 12.9C8.41 13.02 8.41 13.22 8.28 13.35C8.22 13.41 8.14 13.44 8.06 13.44Z" />
                        <path id="Layer" fill="#fff" d="M13.54 7.95L11.65 7.95C11.47 7.95 11.33 7.81 11.33 7.64C11.33 7.46 11.47 7.32 11.65 7.32L13.54 7.32C13.72 7.32 13.86 7.46 13.86 7.64C13.86 7.81 13.72 7.95 13.54 7.95Z" />
                        <path id="Layer" fill="#fff" d="M13.54 13.44L11.65 13.44C11.47 13.44 11.33 13.3 11.33 13.12C11.33 12.95 11.47 12.81 11.65 12.81L13.54 12.81C13.72 12.81 13.86 12.95 13.86 13.12C13.86 13.3 13.72 13.44 13.54 13.44Z" />
                        <path id="Layer" fill="#fff" d="M13.54 12.17L11.65 12.17C11.47 12.17 11.33 12.03 11.33 11.86C11.33 11.68 11.47 11.54 11.65 11.54L13.54 11.54C13.72 11.54 13.86 11.68 13.86 11.86C13.86 12.03 13.72 12.17 13.54 12.17Z" />
                    </g>
                </svg>
            );
        }
        //return classname;
    };
    startPractise = (chitemid, itemsubject_id, isuserValid, enabled) => {
        // localStorage.setItem("subjectid", itemsubject_id);
        // localStorage.setItem("type", "practice");
        // localStorage.setItem("etype", "examanalysis");
        // localStorage.setItem("chapters", "");
        // localStorage.setItem("ocid", chitemid);
        // localStorage.setItem("otid", "0");
        // localStorage.setItem("hchaptername", chitemchapter);
        // window.open("/student/subject/practice-test", "_blank")

        if (enabled == true) {
            if (isuserValid.lp_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                localStorage.setItem("subjectid", itemsubject_id);
                localStorage.setItem("type", "practice");
                localStorage.setItem("ocid", chitemid);
                localStorage.setItem("otid", "0");
                window.open("/student/subject/practice-test", "_blank") //to open new page
            } else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }


    }
    render() {
        const getOverallData = this.props.getOverallData;
        const loading1 = getOverallData.loading;
        const error1 = getOverallData.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        let practiceExamAnalysisData = "";
        if (this.props.stateData.class_id == "1,2") {
            practiceExamAnalysisData = getOverallData.getOverallData.find((item) => item.class_id == "0");
        }
        else {
            practiceExamAnalysisData = getOverallData.getOverallData.find((item) => item.class_id == this.props.stateData.class_id);
        }

        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        if (isuserValid.analysis_tab == true || isuserValid.ra_overall_details == true) {
            return (
                <div className="practice-exam-analysis pt-4">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <Image src={require('../../../../images/locked.png')} width="40" alt="locked image" />
                                {Cookies.get("student_userlevel") == "1" ? (<h5 className="text-danger">Dear Student Now you have limited access.</h5>) : (
                                    <React.Fragment>
                                        <h5 className="text-danger">Dear Student Now you have limited access. To Get Full Access subscribe now</h5>
                                        <Link style={{ color: '#007bff' }} to={"/student/package"}>upgrade to Paid Plan</Link></React.Fragment>

                                )}
                            </div>

                        </Col>
                    </Row>

                </div>
            )
        }
        else {
            return (
                <div className="practice-exam-analysis pt-4">
                    <AnalysisFilter
                        defaultActiveKeyFun={this.props.defaultActiveKeyFun}
                        stateData={this.props.stateData}
                        selecthandleInputChange={this.props.selecthandleInputChange}
                    />
                    <Row className="mt-4">
                        {this.props.stateData.exam_type == "0,1" ? (
                            <React.Fragment>
                                <Col xl={6} lg={12} md={12} sm={12} className="my-3">
                                    <h6 className="mb-3 text-center"> Practise Analysis</h6>
                                    <Card className="totalPractice border-0 my-2">
                                        <Card.Header className="bg-white border-0">
                                            <div className="content mb-4">
                                                <ul className="list-inline m-0 p-0">
                                                    <li className="list-inline-item">
                                                        <Image className="student-img" src={require('../../../../images/green-student.png')} width="45" alt="img" />
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="d-flex align-items-center">
                                                            <div className="left mr-3">
                                                                <h6 className="mb-0">{practiceExamAnalysisData.practice_data.practice_total}% Questions Practised</h6>
                                                                <p className="text-gray4 mb-0">{practiceExamAnalysisData.practice_data.total_sessions} Practise Sessions</p>
                                                            </div>
                                                            {/* <div className="right">
                                                                <h6 className="mb-0">{practiceExamAnalysisData.practice_data.practice_total}%</h6>
                                                                <p className="text-gray4 mb-0">{practiceExamAnalysisData.practice_data.total_sessions}</p>
                                                            </div> */}
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="accuracy">
                                                    <p className="text-gray4">Accuracy</p>
                                                    <h5 className="mb-0">{practiceExamAnalysisData.practice_data.practice_strength}%</h5>
                                                </div>
                                            </div>
                                            <Row>
                                                <Col xl={5} lg={5} md={5} sm={5}>
                                                    <Card as={Card.Body} className="appaired p-2">
                                                        <h6 className="mb-3 text-center">Practiced Questions</h6>
                                                        <h6 className="text-center">{practiceExamAnalysisData.practice_data.total_questions}</h6>
                                                    </Card>
                                                </Col>
                                                <Col xl={7} lg={7} md={7} sm={7}>
                                                    <Card as={Card.Body} className="p-2 w-100">
                                                        <ul className="list-inline status-list d-flex justify-content-between m-0 p-0">
                                                            <li className="list-inline-item">
                                                                <p className="title">Correct</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.practice_data.answered_questions}</p>
                                                                    <p>({practiceExamAnalysisData.practice_data.answered_strength})%</p>
                                                                </div>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <p className="title">Error</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.practice_data.error_questions}</p>
                                                                    <p>({practiceExamAnalysisData.practice_data.error_strength})%</p>
                                                                </div>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <p className="title">Error Corrected</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.practice_data.error_correct_questions}</p>
                                                                    <p>({practiceExamAnalysisData.practice_data.error_correct_strength})%</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="p-2">
                                            <Card as={Card.Body} className="p-2 mb-2 mt-1">

                                                <Row className="align-items-end">
                                                    <Col xl={6} lg={6} md={6} sm={12}>
                                                        <h6 className="mb-0">Total Practise</h6>
                                                        <p className="text-gray4 mb-0">Accuracy</p>
                                                    </Col>

                                                    <Col xl={6} lg={6} md={6} sm={12}>
                                                        {this.props.stateData.class_id == "1,2" ? (
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="left">
                                                                    <h6 className="mb-0">Class XI</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class1_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class1_strength}%</p>
                                                                </div>
                                                                <div className="right">
                                                                    <h6 className="mb-0">Class XII</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class2_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class2_strength}%</p>
                                                                </div>
                                                            </div>) : this.props.stateData.class_id == "1" ? (<div className="d-flex justify-content-between align-items-center">
                                                                <div className="left">
                                                                    <h6 className="mb-0">Class XI</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class1_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class1_strength}%</p>
                                                                </div>
                                                            </div>) : (<div className="d-flex justify-content-between align-items-center">
                                                                <div className="right">
                                                                    <h6 className="mb-0">Class XII</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class2_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class2_strength}%</p>
                                                                </div>
                                                            </div>)}
                                                    </Col>
                                                </Row>
                                            </Card>
                                            {/* practice not started chapters */}
                                            <div className="mi-title my-3">
                                                <h6>You have not started practise on the following Chapters</h6>
                                            </div>
                                            <Card as={Card.Body} className="totalPractice-tabs p-2">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                                                    <Row className="border-bottom pb-2">
                                                        <Col xl={9} lg={9} md={9} sm={12}>
                                                            <Nav variant="pills pl-2">
                                                                {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey={index}>{item.subject}</Nav.Link>
                                                                    </Nav.Item>
                                                                ))}
                                                            </Nav>
                                                        </Col>
                                                    </Row>
                                                    <Tab.Content className="pt-2" style={{ height: 300, overflowY: 'scroll' }}>
                                                        {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                            <Tab.Pane eventKey={index}>
                                                                {item.un_attempted_chapters.map((chitem) => {
                                                                    let filterlastData = practiceExamAnalysisData.subject_last_data.filter((a) => a.id == item.id);
                                                                    const filglobalsubjects = globalsubjects.find((a) => a.id == item.subject_id)
                                                                    const chData = filglobalsubjects.studentChapters.find((a) => a.id == chitem.id);
                                                                    return (
                                                                        <Card as={Card.Body} className="single-card p-2 mb-2">
                                                                            <div className="d-flex justify-content-between align-items-center pb-2 mb-2">
                                                                                <div className="w-75">
                                                                                    <h6 className="title mb-0"><span>{chitem.id}</span> - {chitem.chapter}</h6>
                                                                                </div>
                                                                                <Link
                                                                                    onClick={() => this.startPractise(chitem.id, item.subject_id, isuserValid, chData.enabled)}
                                                                                    className="btn btn-lightblue text-capitalize">Practise Now</Link>


                                                                            </div>
                                                                        </Card>
                                                                    );



                                                                })}
                                                            </Tab.Pane>
                                                        )

                                                        )}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </Card>
                                            <div className="mi-title my-3">
                                                <h6>You have not practised the following topics from the chapters that you have started</h6>
                                            </div>
                                            <Card as={Card.Body} className="totalPractice-tabs p-2">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                                                    <Row className="border-bottom pb-2">
                                                        <Col xl={9} lg={9} md={9} sm={12}>
                                                            <Nav variant="pills pl-2">
                                                                {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey={index}>{item.subject}</Nav.Link>
                                                                    </Nav.Item>
                                                                ))}
                                                            </Nav>
                                                        </Col>
                                                        {/* <Col xl={3} lg={3} md={3} sm={12}>
                                                    <Button className="btn btn-lightblue text-capitalize">Practice All</Button>
                                                </Col> */}
                                                    </Row>
                                                    <Tab.Content className="pt-2" style={{ height: 300, overflowY: 'scroll' }}>
                                                        {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                            <Tab.Pane eventKey={index}>
                                                                {item.chapters.map((chitem) => {
                                                                    let filterlastData = practiceExamAnalysisData.subject_last_data.filter((a) => a.id == item.id);
                                                                    const filglobalsubjects = globalsubjects.find((a) => a.id == item.subject_id)
                                                                    const chData = filglobalsubjects.studentChapters.find((a) => a.id == chitem.id);
                                                                    if (chitem.topics.length > 0) {
                                                                        return (<Card as={Card.Body} className="single-card p-2 mb-2">
                                                                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                                                                <div className="w-75">
                                                                                    <h6 className="title mb-0"><span>{chitem.id}</span> - {chitem.chapter}</h6>
                                                                                </div>
                                                                                <Link
                                                                                    onClick={() => this.startPractise(chitem.id, item.subject_id, isuserValid, chData.enabled)}
                                                                                    className="btn btn-lightblue text-capitalize">Practise Now</Link>
                                                                            </div>
                                                                            <Row>
                                                                                {chitem.topics.map((topicitem) => (<Col xl={6} lg={6} md={6}>
                                                                                    <Card>
                                                                                        <p className="mb-0">{topicitem.topic}</p>
                                                                                    </Card>
                                                                                </Col>))}

                                                                            </Row>
                                                                        </Card>);
                                                                    }



                                                                })}
                                                            </Tab.Pane>
                                                        )

                                                        )}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </Card>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xl={6} lg={12} md={12} sm={12} className="my-3">
                                    <h6 className="mb-3 text-center"> Exams Analysis</h6>
                                    <Card className="totalExams border-0  my-2">
                                        <Card.Header className="bg-white border-0">
                                            <div className="content mb-2">
                                                <ul className="list-inline m-0 p-0">
                                                    <li className="list-inline-item">
                                                        <Image className="student-img" src={require('../../../../images/blue-student.png')} width="60" alt="img" />
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="d-flex align-items-center">
                                                            <div className="left mr-3">
                                                                <h6 className="mb-0">{practiceExamAnalysisData.exam_data.exams_total} Exams attended</h6>
                                                            </div>
                                                            {/* <div className="right">
                                                                <h6 className="mb-0">{practiceExamAnalysisData.exam_data.exams_total}</h6>
                                                            </div> */}
                                                        </div>
                                                        <ul className="list-unstyled totalExam-list">
                                                            {/* <li>
                                                    <p className="mb-0">CHE</p>
                                                    <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.chapter_accuracy}%</h6>
                                                </li> */}
                                                            <li>
                                                                <p className="mb-0">Cumulative Exam</p>
                                                                <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.cumulative_accuracy}%</h6>
                                                            </li>
                                                            <li>
                                                                <p className="mb-0">Chapter Exam</p>
                                                                <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.chapter_accuracy}%</h6>
                                                            </li>
                                                            <li>
                                                                <p className="mb-0">Semi Grand Exam</p>
                                                                <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.semi_grand_accuracy}%</h6>
                                                            </li>
                                                            <li>
                                                                <p className="mb-0">Grand Exam</p>
                                                                <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.grand_accuracy}%</h6>
                                                            </li>
                                                            <li>
                                                                <p className="mb-0">Previous Paper Exam</p>
                                                                <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.previous_paper_accuracy}%</h6>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <div className="accuracy">
                                                    <p className="text-gray4">Accuracy</p>
                                                    <h5 className="mb-0">{practiceExamAnalysisData.exam_data.exams_strength}%</h5>
                                                </div>
                                            </div>
                                            <Row>
                                                <Col xl={5} lg={5} md={5} sm={5}>
                                                    <Card as={Card.Body} className="appaired p-2">
                                                        <h6 className="mb-3 text-center">Questions Appeared</h6>
                                                        <h6 className="text-center">{practiceExamAnalysisData.exam_data.total_questions}</h6>
                                                    </Card>
                                                </Col>
                                                <Col xl={7} lg={7} md={7} sm={7}>
                                                    <Card as={Card.Body} className="p-2 w-100">
                                                        <ul className="list-inline status-list d-flex justify-content-between m-0 p-0">
                                                            <li className="list-inline-item">
                                                                <p className="title">Correct</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.exam_data.answered_questions}</p>
                                                                    <p>({practiceExamAnalysisData.exam_data.answered_strength})%</p>
                                                                </div>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <p className="title">Error</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.exam_data.error_questions}</p>
                                                                    <p>({practiceExamAnalysisData.exam_data.error_strength})%</p>
                                                                </div>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <p className="title">Skipped</p>
                                                                <div className="d-flex">
                                                                    <p className="mr-2">{practiceExamAnalysisData.exam_data.skipped_questions}</p>
                                                                    <p>({practiceExamAnalysisData.exam_data.skipped_strength})%</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="p-2">
                                            <Card as={Card.Body} className="p-2 mb-2 mt-1">
                                                <Row className="align-items-end">
                                                    <Col xl={6} lg={6} md={6} sm={12}>
                                                        <h6 className="mb-0">Attempted questions</h6>
                                                        <p className="text-gray4 mb-0">Accuracy</p>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6} sm={12}>
                                                        {this.props.stateData.class_id == "1,2" ? (
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="left">
                                                                    <h6 className="mb-0">Class XI</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class1_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class1_strength}%</p>
                                                                </div>
                                                                <div className="right">
                                                                    <h6 className="mb-0">Class XII</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class2_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class2_strength}%</p>
                                                                </div>
                                                            </div>) : this.props.stateData.class_id == "1" ? (<div className="d-flex justify-content-between align-items-center">
                                                                <div className="left">
                                                                    <h6 className="mb-0">Class XI</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class1_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class1_strength}%</p>
                                                                </div>
                                                            </div>) : (<div className="d-flex justify-content-between align-items-center">
                                                                <div className="right">
                                                                    <h6 className="mb-0">Class XII</h6>
                                                                    <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class2_total}</h6>
                                                                    <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class2_strength}%</p>
                                                                </div>
                                                            </div>)}
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Card as={Card.Body} className="totalExams-tabs p-2">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="botnay_0">
                                                    <Row className="border-bottom pb-2">
                                                        <Col xl={12} lg={12} md={12} sm={12}>
                                                            <Nav variant="pills pl-2">
                                                                {practiceExamAnalysisData.exam_data.exam_subject_data.map((item, index) => (
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey={"botnay_" + index}>{item.subject}</Nav.Link>
                                                                    </Nav.Item>
                                                                ))}
                                                            </Nav>
                                                        </Col>
                                                    </Row>
                                                    <Tab.Content>
                                                        {practiceExamAnalysisData.exam_data.exam_subject_data.map((item, index) => (
                                                            <Tab.Pane eventKey={"botnay_" + index}>
                                                                <Table borderless>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Exam Types</th>
                                                                            <th>Accuracy</th>
                                                                            {/* <th>Action</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {item.exam_types.map((exmap) => (
                                                                            <tr>
                                                                                <td class="text-capitalize">{exmap.exam_type_name}</td>
                                                                                <td>{exmap.accuracy}% </td>
                                                                                {/* <td>
                                                                        <Button className="btn btn-lightblue text-capitalize">View Exams</Button>
                                                                    </td> */}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Tab.Pane>
                                                        ))}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </Card>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>

                        ) : this.props.stateData.exam_type == "0" ? (<Col xl={12} lg={12} md={12} sm={12} className="my-3">
                            <h6 className="mb-3 text-center"> Practise Analysis</h6>
                            <Card className="totalPractice border-0 my-2">
                                <Card.Header className="bg-white border-0">
                                    <div className="content mb-4">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="list-inline-item">
                                                <Image className="student-img" src={require('../../../../images/green-student.png')} width="45" alt="img" />
                                            </li>
                                            <li className="list-inline-item">
                                                <div className="d-flex align-items-center">
                                                    <div className="left mr-3">
                                                        <h6 className="mb-0">{practiceExamAnalysisData.practice_data.practice_total}% Questions Practised</h6>
                                                        <p className="text-gray4 mb-0">{practiceExamAnalysisData.practice_data.total_sessions} Practise Sessions</p>
                                                    </div>
                                                    {/* <div className="right">
                                                        <h6 className="mb-0">{practiceExamAnalysisData.practice_data.practice_total}%</h6>
                                                        <p className="text-gray4 mb-0">{practiceExamAnalysisData.practice_data.total_sessions}</p>
                                                    </div> */}
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="accuracy">
                                            <p className="text-gray4">Accuracy</p>
                                            <h5 className="mb-0">{practiceExamAnalysisData.practice_data.practice_strength}%</h5>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col xl={5} lg={5} md={5} sm={5}>
                                            <Card as={Card.Body} className="appaired p-2">
                                                <h6 className="mb-3 text-center">Practiced Questions</h6>
                                                <h6 className="text-center">{practiceExamAnalysisData.practice_data.total_questions}</h6>
                                            </Card>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7}>
                                            <Card as={Card.Body} className="p-2 w-100">
                                                <ul className="list-inline status-list d-flex justify-content-between m-0 p-0">
                                                    <li className="list-inline-item">
                                                        <p className="title">Correct</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.practice_data.answered_questions}</p>
                                                            <p>({practiceExamAnalysisData.practice_data.answered_strength})%</p>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <p className="title">Error</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.practice_data.error_questions}</p>
                                                            <p>({practiceExamAnalysisData.practice_data.error_strength})%</p>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <p className="title">Error Corrected</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.practice_data.error_correct_questions}</p>
                                                            <p>({practiceExamAnalysisData.practice_data.error_correct_strength})%</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <Card as={Card.Body} className="p-2 mb-2 mt-1">

                                        <Row className="align-items-end">
                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                <h6 className="mb-0">Total Practise</h6>
                                                <p className="text-gray4 mb-0">Accuracy</p>
                                            </Col>

                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                {this.props.stateData.class_id == "1,2" ? (
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="left">
                                                            <h6 className="mb-0">Class XI</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class1_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class1_strength}%</p>
                                                        </div>
                                                        <div className="right">
                                                            <h6 className="mb-0">Class XII</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class2_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class2_strength}%</p>
                                                        </div>
                                                    </div>) : this.props.stateData.class_id == "1" ? (<div className="d-flex justify-content-between align-items-center">
                                                        <div className="left">
                                                            <h6 className="mb-0">Class XI</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class1_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class1_strength}%</p>
                                                        </div>
                                                    </div>) : (<div className="d-flex justify-content-between align-items-center">
                                                        <div className="right">
                                                            <h6 className="mb-0">Class XII</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.practice_data.class_wise_data.class2_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.practice_data.class_wise_data.class2_strength}%</p>
                                                        </div>
                                                    </div>)}
                                            </Col>
                                        </Row>
                                    </Card>
                                    {/* practice not started chapters */}
                                    <div className="mi-title my-3">
                                        <h6>You have not started practise on the following Chapters</h6>
                                    </div>
                                    <Card as={Card.Body} className="totalPractice-tabs p-2">
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                                            <Row className="border-bottom pb-2">
                                                <Col xl={9} lg={9} md={9} sm={12}>
                                                    <Nav variant="pills pl-2">
                                                        {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={index}>{item.subject}</Nav.Link>
                                                            </Nav.Item>
                                                        ))}
                                                    </Nav>
                                                </Col>
                                            </Row>
                                            <Tab.Content className="pt-2" style={{ height: 300, overflowY: 'scroll' }}>
                                                {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                    <Tab.Pane eventKey={index}>
                                                        {item.un_attempted_chapters.map((chitem) => {
                                                            let filterlastData = practiceExamAnalysisData.subject_last_data.filter((a) => a.id == item.id);
                                                            const filglobalsubjects = globalsubjects.find((a) => a.id == item.subject_id)
                                                            const chData = filglobalsubjects.studentChapters.find((a) => a.id == chitem.id);

                                                            return (
                                                                <Card as={Card.Body} className="single-card p-2 mb-2">
                                                                    <div className="d-flex justify-content-between align-items-center  pb-2 mb-2">
                                                                        <div className="w-75">
                                                                            <h6 className="title mb-0"><span>{chitem.id}</span> - {chitem.chapter}</h6>
                                                                        </div>
                                                                        <Link
                                                                            onClick={() => this.startPractise(chitem.id, item.subject_id, isuserValid, chData.enabled)}
                                                                            className="btn btn-lightblue text-capitalize">Practise Now</Link>
                                                                    </div>
                                                                </Card>
                                                            );



                                                        })}
                                                    </Tab.Pane>
                                                )

                                                )}
                                            </Tab.Content>
                                        </Tab.Container>
                                    </Card>
                                    <div className="mi-title my-3">
                                        <h6>You have not practised the following topics from the chapters that you have started</h6>
                                    </div>
                                    <Card as={Card.Body} className="totalPractice-tabs p-2">
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                                            <Row className="border-bottom pb-2">
                                                <Col xl={9} lg={9} md={9} sm={12}>
                                                    <Nav variant="pills pl-2">
                                                        {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={index}>{item.subject}</Nav.Link>
                                                            </Nav.Item>
                                                        ))}
                                                    </Nav>
                                                </Col>
                                                {/* <Col xl={3} lg={3} md={3} sm={12}>
                                            <Button className="btn btn-lightblue text-capitalize">Practice All</Button>
                                        </Col> */}
                                            </Row>
                                            <Tab.Content className="pt-2" style={{ height: 300, overflowY: 'scroll' }}>
                                                {practiceExamAnalysisData.practice_data.pending_subjects.map((item, index) => (
                                                    <Tab.Pane eventKey={index}>
                                                        {item.chapters.map((chitem) => {
                                                            let filterlastData = practiceExamAnalysisData.subject_last_data.filter((a) => a.id == item.id);
                                                            const filglobalsubjects = globalsubjects.find((a) => a.id == item.subject_id)
                                                            const chData = filglobalsubjects.studentChapters.find((a) => a.id == chitem.id);

                                                            if (chitem.topics.length > 0) {
                                                                return (
                                                                    <Card as={Card.Body} className="single-card p-2 mb-2">
                                                                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                                                            <div className="w-75">
                                                                                <h6 className="title mb-0"><span>{chitem.id}</span> - {chitem.chapter}</h6>
                                                                            </div>
                                                                            <Link
                                                                                onClick={() => this.startPractise(chitem.id, item.subject_id, isuserValid, chData.enabled)}
                                                                                className="btn btn-lightblue text-capitalize">Practise Now</Link>
                                                                        </div>
                                                                        <Row>
                                                                            {chitem.topics.map((topicitem) => (<Col xl={6} lg={6} md={6}>
                                                                                <Card>
                                                                                    <p className="mb-0">{topicitem.topic}</p>
                                                                                </Card>
                                                                            </Col>))}

                                                                        </Row>
                                                                    </Card>
                                                                );
                                                            }


                                                        })}
                                                    </Tab.Pane>
                                                )

                                                )}
                                            </Tab.Content>
                                        </Tab.Container>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>) : (<Col xl={12} lg={12} md={12} sm={12} className="my-3">
                            <h6 className="mb-3 text-center"> Exams Analysis</h6>
                            <Card className="totalExams border-0  my-2">
                                <Card.Header className="bg-white border-0">
                                    <div className="content mb-2">
                                        <ul className="list-inline m-0 p-0">
                                            <li className="list-inline-item">
                                                <Image className="student-img" src={require('../../../../images/blue-student.png')} width="60" alt="img" />
                                            </li>
                                            <li className="list-inline-item">
                                                <div className="d-flex align-items-center">
                                                    <div className="left mr-3">
                                                        <h6 className="mb-0">{practiceExamAnalysisData.exam_data.exams_total} Exams attended</h6>
                                                    </div>
                                                    {/* <div className="right">
                                                        <h6 className="mb-0">{practiceExamAnalysisData.exam_data.exams_total}</h6>
                                                    </div> */}
                                                </div>
                                                <ul className="list-unstyled totalExam-list">
                                                    {/* <li>
                                            <p className="mb-0">CHE</p>
                                            <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.chapter_accuracy}%</h6>
                                        </li> */}
                                                    <li>
                                                        <p className="mb-0">Cumulative Exam</p>
                                                        <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.cumulative_accuracy}%</h6>
                                                    </li>
                                                    <li>
                                                        <p className="mb-0">Chapter Exam</p>
                                                        <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.chapter_accuracy}%</h6>
                                                    </li>
                                                    <li>
                                                        <p className="mb-0">Semi Grand Exam</p>
                                                        <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.semi_grand_accuracy}%</h6>
                                                    </li>
                                                    <li>
                                                        <p className="mb-0">Grand Exam</p>
                                                        <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.grand_accuracy}%</h6>
                                                    </li>
                                                    <li>
                                                        <p className="mb-0">Previous Paper Exam</p>
                                                        <h6 className="text-gray4 mb-0">{practiceExamAnalysisData.exam_data.previous_paper_accuracy}%</h6>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className="accuracy">
                                            <p className="text-gray4">Accuracy</p>
                                            <h5 className="mb-0">{practiceExamAnalysisData.exam_data.exams_strength}%</h5>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col xl={5} lg={5} md={5} sm={5}>
                                            <Card as={Card.Body} className="appaired p-2">
                                                <h6 className="mb-3 text-center">Questions Appeared</h6>
                                                <h6 className="text-center">{practiceExamAnalysisData.exam_data.total_questions}</h6>
                                            </Card>
                                        </Col>
                                        <Col xl={7} lg={7} md={7} sm={7}>
                                            <Card as={Card.Body} className="p-2 w-100">
                                                <ul className="list-inline status-list d-flex justify-content-between m-0 p-0">
                                                    <li className="list-inline-item">
                                                        <p className="title">Correct</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.exam_data.answered_questions}</p>
                                                            <p>({practiceExamAnalysisData.exam_data.answered_strength})%</p>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <p className="title">Error</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.exam_data.error_questions}</p>
                                                            <p>({practiceExamAnalysisData.exam_data.error_strength})%</p>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <p className="title">Skipped</p>
                                                        <div className="d-flex">
                                                            <p className="mr-2">{practiceExamAnalysisData.exam_data.skipped_questions}</p>
                                                            <p>({practiceExamAnalysisData.exam_data.skipped_strength})%</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <Card as={Card.Body} className="p-2 mb-2 mt-1">
                                        <Row className="align-items-end">
                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                <h6 className="mb-0">Attempted questions</h6>
                                                <p className="text-gray4 mb-0">Accuracy</p>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={12}>
                                                {this.props.stateData.class_id == "1,2" ? (
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="left">
                                                            <h6 className="mb-0">Class XI</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class1_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class1_strength}%</p>
                                                        </div>
                                                        <div className="right">
                                                            <h6 className="mb-0">Class XII</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class2_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class2_strength}%</p>
                                                        </div>
                                                    </div>) : this.props.stateData.class_id == "1" ? (<div className="d-flex justify-content-between align-items-center">
                                                        <div className="left">
                                                            <h6 className="mb-0">Class XI</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class1_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class1_strength}%</p>
                                                        </div>
                                                    </div>) : (<div className="d-flex justify-content-between align-items-center">
                                                        <div className="right">
                                                            <h6 className="mb-0">Class XII</h6>
                                                            <h6 className="mb-0">{practiceExamAnalysisData.exam_data.class_wise_data.class2_total}</h6>
                                                            <p className="mb-0 text-gray4">{practiceExamAnalysisData.exam_data.class_wise_data.class2_strength}%</p>
                                                        </div>
                                                    </div>)}

                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card as={Card.Body} className="totalExams-tabs p-2">
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="botnay_0">
                                            <Row className="border-bottom pb-2">
                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                    <Nav variant="pills pl-2">
                                                        {practiceExamAnalysisData.exam_data.exam_subject_data.map((item, index) => (
                                                            <Nav.Item>
                                                                <Nav.Link eventKey={"botnay_" + index}>{item.subject}</Nav.Link>
                                                            </Nav.Item>
                                                        ))}
                                                    </Nav>
                                                </Col>
                                            </Row>
                                            <Tab.Content>
                                                {practiceExamAnalysisData.exam_data.exam_subject_data.map((item, index) => (
                                                    <Tab.Pane eventKey={"botnay_" + index}>
                                                        <Table borderless>
                                                            <thead>
                                                                <tr>
                                                                    <th>Exam Types</th>
                                                                    <th>Accuracy</th>
                                                                    {/* <th>Action</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.exam_types.map((exmap) => (
                                                                    <tr>
                                                                        <td class="text-capitalize">{exmap.exam_type_name}</td>
                                                                        <td>{exmap.accuracy}% </td>
                                                                        {/* <td>
                                                                <Button className="btn btn-lightblue text-capitalize">View Exams</Button>
                                                            </td> */}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </Tab.Pane>
                                                ))}
                                            </Tab.Content>
                                        </Tab.Container>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>)}

                    </Row>
                    {this.props.stateData.exam_type == "0,1" || this.props.stateData.exam_type == "0" ? (
                        <React.Fragment>
                            {practiceExamAnalysisData.exam_data.exam_type_conduct.length > 0 ? (
                                <Row>
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        <Card className="my-3 conduct-exams">
                                            <Card.Header className="bg-white border-0 py-3">
                                                <h6 className="mb-0">Exams type vs Chapters not covered</h6>
                                            </Card.Header>
                                            <Card.Body className="p-0">
                                                <Table responsive className="m-0">
                                                    <thead>
                                                        <tr>
                                                            <th width="15%">
                                                                <div className="types">


                                                                    <p>Subjects</p>
                                                                    <hr />
                                                                    <p>Exams</p>
                                                                </div>
                                                            </th>
                                                            {practiceExamAnalysisData.exam_data.exam_type_conduct[0].subjects.map((item) => (
                                                                <th>
                                                                    <div className="icon mb-2">
                                                                        {this.classNameIcon(item.subject)}
                                                                    </div>
                                                                    <p className="font-weight-normal">{item.subject}</p>
                                                                </th>
                                                            ))}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {practiceExamAnalysisData.exam_data.exam_type_conduct.map((item) => (
                                                            <tr>
                                                                <td className="font-weight-bold">{item.exam_type_name}</td>
                                                                {item.subjects.map((item2) => {
                                                                    if (item2.pending_chapters.length > 0) {
                                                                        return (
                                                                            <td>
                                                                                <a className="count"
                                                                                    onClick={(e) => this.modalFun(item2.subject_id, item2.pending_chapters)}
                                                                                >
                                                                                    <span>{item2.pending_chapters.length}</span>
                                                                                </a>
                                                                            </td>
                                                                        );
                                                                    }
                                                                    else {
                                                                        return (<td><i className="fal fa-check-circle" /></td>);
                                                                    }
                                                                })}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ) : ("")}
                        </React.Fragment>
                    ) : ("")}

                    <PracticeAndExamChapterModal
                        submitError={this.state.submitError}
                        startExamhandleFormSubmit={this.startExamhandleFormSubmit}
                        handleInputChange={this.handleInputChange}
                        name="Chapters Data"
                        data={this.state.modaldata}
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                    />
                    <UserRestrictionAlert
                        show={this.state.userRestionModalShow}
                        onHide={() => this.setState({ userRestionModalShow: false })}
                    />
                </div >
            )
        }

    }
}

export default withRouter(compose(

    graphql(FETCH_PRACTICEANALYSIS
        ,
        {
            options: props => ({
                variables: {
                    mobile: props.mobile,
                    exam_type: props.stateData.exam_type,
                    class_id: props.stateData.class_id
                },
                fetchPolicy: 'network-only'
            }), name: "getOverallData"
        }), graphql(COUSTOM_EXAM, {
            name: "customfunction"
        }))(PracticeExamAnalysisSection));

