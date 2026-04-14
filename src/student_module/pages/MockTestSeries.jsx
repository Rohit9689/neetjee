import React, { Component } from 'react'
import MockTestSeriesSection from '../components/mock_series/MockTestSeriesSection'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import { withRouter } from 'react-router-dom';
import * as Cookies from "es-cookie";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


class MockTestSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/mocktext-img.png'),
                Title: "Mock Test",
                width: 150,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Test_Series_Home;
        ReactGA.pageview('/student/exams/test-series', ["ELAPP"], title);
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
                    <div className="student header-area mock-tests-eries-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <MockTestSeriesSection />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MockTestSeries);
