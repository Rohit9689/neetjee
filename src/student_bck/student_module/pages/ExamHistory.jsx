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
        console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
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
        console.log("getStudentExamSessions", getStudentExamSessions.getStudentExamSessions);
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
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
            </React.Fragment>
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
