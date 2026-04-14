import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import GetReadyForExamSection from '../components/get_ready_for_exam/GetReadyForExamSection'
import Getreadyforexam from "../../images/getreadyforexam.svg"
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        
        user_access_restictions
        module_restrictions
     }
}

`;

const FETCH_SCHEUDULE = gql` 
query($mobile: String!) {
    getScheduledExams(mobile: $mobile){
        id
        exam_type
        start_time
        end_time
        syllabus{
            subject_id
            subject_name
            chapters{
                id
                chapter
            }
        }
   }
}

`;

const FETCH_GETREADYEXAM = gql` 
query($mobile: String!, $page: Int) {
    getReadyForExamList(mobile: $mobile, page: $page){
        id
        sub_type
        exam_type
        class_id
        syllabus{
            subject_id
            subject_name
            chapters{
                id
                chapter
            }
        }
        exam_name
        exam_date
        save_exam_type
        is_completed
        timestamp
   }
}

`;
const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        classes{
            id
            class
        }
        exams{
            id
            exam
        }
        questionTypes{
            id
            questiontype
        }
        complexity{
            id
            complexity
        }
        questionTheory{
            id
            question_theory
        }
        contentTypes{
            id
            customcontent
        }
    }
}

`;

class GetReadyForExam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggled: "wrapper sidebar-enable",
            headerBottomImg: {
                Img: Getreadyforexam,
                Title: "Get Ready For Exam",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].GetReady_Exam;
        ReactGA.pageview('/student/get-ready-for-exam', ["ELAPP"], title);
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
        const getScheduledExams = this.props.getScheduledExams;
        const loading1 = getScheduledExams.loading;
        const error1 = getScheduledExams.error;

        const getReadyForExamList = this.props.getReadyForExamList;
        const loading2 = getReadyForExamList.loading;
        const error2 = getReadyForExamList.error;

        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        console.log("getUserExplored", getReadyForExamList.getReadyForExamList);
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
            localStorage.removeItem('isStudentUserValid');
            localStorage.setItem(
                "isStudentUserValid",
                JSON.stringify(isStudentUserValid.isStudentUserValid)
            );
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area getreadyforexam-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />

                        {/* <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} /> */}
                    </div>
                    {(loading1 == true || loading2 == true || loading3 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        {
                            !loading1 && !loading2 && !loading3 && !loading5 && (
                                <GetReadyForExamSection
                                    getScheduledExams={getScheduledExams.getScheduledExams}
                                    getReadyForExamList={getReadyForExamList.getReadyForExamList}
                                    studentGlobals={studentGlobals.studentGlobals}
                                    isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(compose(
    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'cache-and-network'
            }), name: "isStudentUserValid"
        }),
    graphql(FETCH_SCHEUDULE,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'cache-and-network'
            }), name: "getScheduledExams"
        }),
    graphql(FETCH_GETREADYEXAM,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    page: 1
                },
                fetchPolicy: 'cache-and-network'
            }), name: "getReadyForExamList"
        }),
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: 'cache-and-network'
            }), name: "studentGlobals"
        })
)(GetReadyForExam));
