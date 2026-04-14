import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ScheduleExamSection from '../components/exams/schedule_exam/ScheduleExamSection';

import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
const FETCH_SCHEUDULE = gql` 
query($mobile: String!) {
    getScheduledExams(mobile: $mobile){

        id
        exam_name
        exam_type
        start_time
        end_time
        is_completed
   }
}

`;
class ScheduleExam extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getScheduledExams = this.props.getScheduledExams;
        const loading1 = getScheduledExams.loading;
        const error1 = getScheduledExams.error;
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



        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            {
                                !loading1 && (
                                    <ScheduleExamSection
                                        getScheduledExams={getScheduledExams.getScheduledExams}
                                        studentGlobals={studentGlobals}
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
    graphql(FETCH_SCHEUDULE,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: "cache-and-network"
            }), name: "getScheduledExams"
        }))(ScheduleExam));
