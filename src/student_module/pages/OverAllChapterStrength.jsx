import React, { Component } from 'react'
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import InnerOverAllChapterStrength from "./InnerOverAllChapterStrength";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';



class OverAllChapterStrength extends Component {
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Learn_Practice_Dashboard;
        ReactGA.pageview('/student/subject/chapter-status', ["ELAPP"], title);
    }
    render() {

        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        return (
            <InnerOverAllChapterStrength
                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
        )
    }
}



export default withRouter(OverAllChapterStrength);
