import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection'
import PracticeAndExamHistorySection from '../components/learn_practice/goto_dashboard/practice_and_exam_history/PracticeAndExamHistorySection'
import { Container } from 'react-bootstrap';
import * as Cookies from "es-cookie";


import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

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

class PracticeAndExamHistory extends Component {


    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Practice_Exam_History;
        ReactGA.pageview('/student/subject/practice-exam-history', ["ELAPP"], title);
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
        console.log("getUserExploredthis.props.history.location", this.props.history.location.state);
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

        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    {
                        !loading1 && !loading5 && (
                            <div className="content-wrapper pt-0">
                                <ChepterHeaderSection
                                    getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                />
                                <Container fluid>
                                    <PracticeAndExamHistorySection
                                        isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                        getStudentSessions={getStudentSessions.getStudentSessions}
                                        getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                    />

                                </Container>
                            </div>
                        )}

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
    graphql(gql` 
    query(
          $mobile: String!, $session_id: ID, $chapter_id: Int, $topic_id: Int) {
            getStudentSessions(mobile: $mobile, session_id: $session_id, chapter_id:$chapter_id, topic_id:$topic_id){
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
              }
              error_report{
                error
                error_name
                count
              }
              timestamp
          }
      }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    session_id: 0,
                    chapter_id: parseInt(props.history.location.state.ocid),
                    topic_id: parseInt(props.history.location.state.otid),
                },
            }), name: "getStudentSessions"
        })
)(PracticeAndExamHistory));
