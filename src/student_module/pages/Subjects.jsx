import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import SubjectSection from '../components/learn_practice/subjects/SubjectSection'
import TopHeaderSection from '../components/learn_practice/top_header/TopHeaderSection';
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


class Subjects extends Component {

    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Learn_Practice_Subject_Home;
        ReactGA.pageview('/student/subjects', ["ELAPP"], title);
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
        const subjects = this.props.subjects;
        const loading1 = subjects.loading;
        const error1 = subjects.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("subjectsch", this.props.history.location.state.subjectid);
        let subjectsData = "";
        if (subjects.getSubjects != undefined) {
            subjectsData = subjects.getSubjects.find((a) => a.id == this.props.history.location.state.subjectid);

        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        {
                            !loading1 && (
                                <React.Fragment>
                                    <TopHeaderSection
                                        subjectsData={subjectsData}
                                        getChapters={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                    <Container fluid={true}>

                                        <SubjectSection
                                            subjectsData={subjectsData}
                                            getChapters={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />

                                    </Container>
                                </React.Fragment>


                            )
                        }
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
            last_attempted_chapter
            accuracy
            }
    }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    exam_id: parseInt(Cookies.get("examid")),
                    class_id: parseInt(Cookies.get("classid")),
                    subject: parseInt(props.history.location.state.subjectid)
                },
                fetchPolicy: 'cache-and-network'
            }),
            name: "subjects"
        }))(Subjects));
