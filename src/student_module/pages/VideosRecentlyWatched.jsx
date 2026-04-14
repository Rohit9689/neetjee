import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import RecentlyWatchedVideoSection from '../components/videos/RecentlyWatchedVideoSection'
import * as Cookies from "es-cookie";
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar'
import Footer from '../../neetjee_guru/components/footer/Footer'

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
const title = GoogleAnalyticsArray[0].Videos;
ReactGA.pageview('/student/videos/recently-watched', title);
class VideosRecentlyWatched extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/Vieos Image.png'),
                Title: props.history.location.state.type,
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
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
    render() {
        if (this.props.history.location.state.urltype == "default") {
            return (
                <div className={Cookies.get("toggle")}>
                    {/* <div className="student header-area videos-topnavbar">
                    <StudentOrganizationNavbar
                        type="default"
                        name="" />
                    </div> */}

                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            <RecentlyWatchedVideoSection
                                mobile={this.props.history.location.state.mobile}
                                type={this.props.history.location.state.urltype}
                                videoData={this.props.history.location.state}
                                mname={this.props.history.location.state.mname}
                            />
                        </Container>
                        {/* <div className="mt-4">
                        <Footer />
                    </div> */}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={this.state.toggled}>
                    <div className="student main-wrapper">
                        <div className="student header-area videos-topnavbar">
                            <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                        </div>
                        <AsideNavbar onClick={() => this.menuToggler()} />
                        <div className="student-overlay" onClick={() => this.menuToggler()} />
                        <div className="content-wrapper">
                            <Container>
                                <RecentlyWatchedVideoSection
                                    mname={this.props.history.location.state.mname}
                                    mobile={this.props.history.location.state.mobile}
                                    type={this.props.history.location.state.urltype}
                                    videoData={this.props.history.location.state} />
                            </Container>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(VideosRecentlyWatched); 
