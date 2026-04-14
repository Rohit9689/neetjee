import React, { Component } from 'react'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import * as Cookies from "es-cookie";
import FeaturedInnerDefaultVideos from './FeaturedInnerDefaultVideos';

import { withRouter } from "react-router-dom";
import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
import PreloaderTwo from '../components/preloader/PreloaderTwo';


class FeaturedVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/Vieos Image.png'),
                Title: "Help Videos",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Help_Videos_Home_Page;
        ReactGA.pageview('/student/featuredvideos', ["ELAPP"], title);
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


                    <FeaturedInnerDefaultVideos
                        type="video"
                        examtype={Cookies.get("examid")}
                        mobile={Cookies.get("mobile")}
                    />


                </div>
            </div>
        )
    }
}

export default withRouter(FeaturedVideos);