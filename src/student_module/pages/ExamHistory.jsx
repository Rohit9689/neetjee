import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection'
import ExamHistorySection from '../components/learn_practice/goto_dashboard/practice_and_exam_history/ExamHistorySection'
import { Container } from 'react-bootstrap';
import * as Cookies from "es-cookie";


import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from '../pages/GoogleAnalytics';

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        app_version
        user_access_restictions
     }
}

`;
class ExamHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
         }

    }
    componentDidMount=()=>{
        let title="";
        if(this.props.history.location.state.examtype=="schedule_exam"){
            title = GoogleAnalyticsArray[0].Schedule_Exam_History;
            ReactGA.pageview('/student/subject/exam-history', title);
        }
        if(this.props.history.location.state.examtype=="custom"){
            title = GoogleAnalyticsArray[0].Custom_Exam_History;
            ReactGA.pageview('/student/subject/exam-history', title);
        }
        if(this.props.history.location.state.examtype=="error_exam"){
            title = GoogleAnalyticsArray[0].Error_Exam_History;
            ReactGA.pageview('/student/subject/exam-history', title);
        }
        if(this.props.history.location.state.examtype=="previous_exam"){
            title = GoogleAnalyticsArray[0].Previous_Exam_History;
            ReactGA.pageview('/student/subject/exam-history', title);
        }

        title = GoogleAnalyticsArray[0].Exams_History;
        ReactGA.pageview('/student/subject/exam-history', title);
    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
     };
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const getStudentExamSessions = this.props.getStudentExamSessions;
        const loading1 = getStudentExamSessions.loading;
        const error1 = getStudentExamSessions.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        console.log("this.props.history.location.state", this.props.history.location.state);
        if (isStudentUserValid.isStudentUserValid != undefined) {
            if (isStudentUserValid.isStudentUserValid.estatus == 0) {
                Cookies.remove("token");
                Cookies.remove("username");
                Cookies.remove("refreshtoken");
                Cookies.remove("email");
                Cookies.remove("id");
                Cookies.remove("institutionid");
                Cookies.remove("userlevel");
                Cookies.remove("name");
                this.props.history.push("/student/login");
            }
        }
        //console.log("getStudentExamSessions", getStudentExamSessions.getStudentExamSessions);
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()}/>
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        <Container fluid>
                            {
                                !loading1 && !loading5 && (<ExamHistorySection
                                    isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                    getStudentExamSessions={getStudentExamSessions.getStudentExamSessions}
                                    getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                />)
                            }

                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(compose(

    graphql(gql` 
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
                type
                sub_type
                timestamp
                accuracy
                exam_name
                mains_2021
              
              
          }
      }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    exam_session_id: 0
                },
                fetchPolicy: 'no-cache'
            }), name: "getStudentExamSessions"
        }),
    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "isStudentUserValid"
        })
)(ExamHistory));
