import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import SemiGrandExamSection from '../components/get_ready_for_exam/semi_grand/SemiGrandExamSection'

import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

class GetReadySemiGrandExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
        }

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
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Create_SemigrandExam;
        ReactGA.pageview('/student/get-ready-for-exam/semigrand-exam', ["ELAPP"], title);
    }
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
                            <SemiGrandExamSection studentGlobals={studentGlobals} />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter((GetReadySemiGrandExam));
