import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import TopHeaderSection from '../components/learn_practice/top_header/TopHeaderSection'
import TopicsSection from '../components/learn_practice/topics/TopicsSection';
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

class SingleSubject extends Component {
    render() {
        console.log("SingleSubject", this.props.history.location.state);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const subjects = this.props.subjects;
        const loading1 = subjects.loading;
        const error1 = subjects.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        // if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        //console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
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
        let subjectsData = "";
        if (subjects.getSubjects != undefined) {
            subjectsData = subjects.getSubjects.find((a) => a.id == this.props.history.location.state.subjectid);

        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper pt-0">
                        {
                            !loading1 && !loading5 && (
                                <React.Fragment>
                                    <TopHeaderSection
                                        subjectsData={subjectsData}
                                        getChapters={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                    <Container fluid={true}>
                                        <TopicsSection
                                            getTopics={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                    </Container>
                                </React.Fragment>


                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default withRouter(compose(
    graphql(gql` 
    query($mobile: String,
        $exam_id: Int,
        $class_id: Int) {
        getSubjects(mobile: $mobile,
        exam_id: $exam_id,
        class_id: $class_id){
            id
            subject
            studentChapters{
                id
                chapter
            }
            practice_percentage
            last_attempted_chapter
            last_timestamp
            accuracy
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
            }), name: "subjects"
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
        }))(SingleSubject));
