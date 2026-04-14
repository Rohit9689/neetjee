import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import GrandExamSection from '../components/get_ready_for_exam/grand/GrandExamSection';

import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


class GetReadyGrandExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
        }

    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Create_Grand_Exam;
        ReactGA.pageview('/student/get-ready-for-exam/grand-exam', ["ELAPP"], title);
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

        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {/* {(loading2 == true) && (<PreloaderTwo />)} */}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            <GrandExamSection studentGlobals={studentGlobals} />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter((GetReadyGrandExam));
