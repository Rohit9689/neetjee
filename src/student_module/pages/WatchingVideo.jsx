import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import { withRouter } from "react-router-dom";
import { Container } from 'react-bootstrap'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection'


import * as Cookies from "es-cookie";
import RevisionMaterialVideos from '../components/learn_practice/revision_materials/RevisionMaterialVideos';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

class WatchingVideo extends Component {

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
        let title="";
        let ComponentParams = "";
        let pagetype = "";
        if (this.props.history.location.state.type != "iv") {
            if (this.props.history.location.state.ocid != "0") {
                ComponentParams = {
                    subject: "0",
                    chapter: this.props.history.location.state.ocid,
                    pagetype: "topiclistpath"

                }
                 title = GoogleAnalyticsArray[0].Chapter_Videos_Tab_from_Learn_and_Practice;
                ReactGA.pageview('/student/subject/start-watching', title);

            }
            else {
                ComponentParams = {
                    subject: this.props.history.location.state.subjectid,
                    chapter: "0",
                    pagetype: "chlistpath"
                }

                 title=GoogleAnalyticsArray[0].Subject_Videos_Tab_from_Learn_and_Practice;
                 ReactGA.pageview('/student/subject/start-watching',title);

            }
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        <ChepterHeaderSection
                            type="video"
                            getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                        />
                        <Container>
                            <RevisionMaterialVideos
                                pagetype={pagetype}
                                getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                defaultActiveKey=""
                                ComponentParams={ComponentParams}

                            />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(WatchingVideo);
