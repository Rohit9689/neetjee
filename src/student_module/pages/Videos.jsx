import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import VideoSection from '../components/videos/VideoSection'
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
import InnerDefaultVideos from './InnerDefaultVideos';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

class Videos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/Vieos Image.png'),
                Title: "Videos",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Videos_Home;
        ReactGA.pageview('/student/videos', ["ELAPP"], title);
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

        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area videos-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    <InnerDefaultVideos
                        type="video"
                        examtype={Cookies.get("examid")}
                        mobile={Cookies.get("mobile")}
                    />
                </div>
            </div>
        )
    }
}


export default Videos;