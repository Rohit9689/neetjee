import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ErrorExamSection from '../components/exams/error_exam/ErrorExamSection';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
const title=GoogleAnalyticsArray[0].ErrorExam;
ReactGA.pageview('/student/exams/error-exam',title);

class ErrorExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable",
            
        }

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

        const subjects = this.props.subjects;
        const loading1 = subjects.loading;
        const error1 = subjects.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        
       let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        //console.log("globalsubjects", subjects.getSubjects);
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading1==true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()}/>
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            {
                                !loading1 && (
                                    <ErrorExamSection
                                        getSubjects={subjects.getSubjects}
                                        studentGlobals={studentGlobals}
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
    query($mobile: String,
        $exam_id: Int,
        $class_id: Int,$subject: Int) {
        getSubjects(mobile: $mobile,
        exam_id: $exam_id,
        class_id: $class_id, subject: $subject){
            id
            studentChapters{
                id
                enabled
                error_questions
                exam_unanswered
                exam_wrong_answered
                practice_wrong_answered
                practice_unanswered
                class
            }
            }
    }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    exam_id: parseInt(Cookies.get("examid")),
                    class_id: parseInt(Cookies.get("classid"))
                    
                },
                fetchPolicy: 'cache-and-network'
            }),
            name: "subjects"
        }))(ErrorExam));
