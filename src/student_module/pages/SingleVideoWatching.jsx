import React, { Component } from 'react'
import VideoNavbar from '../components/learn_practice/videos/singlevideo/VideoNavbar'
import '../components/learn_practice/videos/singlevideo/_singlevideo.scss'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import SingleVideoWatchingSection from "../components/learn_practice/videos/SingleVideoWatchingSection";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { withRouter } from 'react-router-dom';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const FETCH_GLOBALS = gql`
  query($mobile: String) {
    studentGlobals(mobile: $mobile) {
      reports {
        id
        report
      }
      tags {
        id
        tag
        type
      }
      contentTypes {
        id
        customcontent
      }
    }
  }
`;

class SingleVideoWatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: ""
        };

    }
    componentDidMount() {
        const title = GoogleAnalyticsArray[0].Videos_Playing;
        ReactGA.pageview('/student/subject/start-video-watching', ["ELAPP"], title);

        window.addEventListener('contextmenu',
            event => event.preventDefault());
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {
        window.removeEventListener('contextmenu', () => { });
        window.removeEventListener("selectstart", () => { });

    }

    render() {
        console.log("this.props.history.location.state.urltype", this.props.history.location.state.urltype);
        // if (Cookies.get("studenttoken") == undefined)
        //     this.props.history.push("/student/login");
        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;
        if (loading3) {
            return (<PreloaderTwo />);
        }
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }

        return (
            <section className="single_video">
                <VideoNavbar
                    mname={this.props.history.location.state.mname}
                    urltype={this.props.history.location.state.urltype}
                    getChapterId={this.props.history.location.state} />
                <SingleVideoWatchingSection

                    urltype={this.props.history.location.state.urltype}
                    stateData={this.state}
                    studentGlobals={studentGlobals.studentGlobals}
                    getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
            </section>
        )
    }
}
export default
    withRouter(
        compose(

            graphql(FETCH_GLOBALS,
                {
                    options: props => ({
                        variables: {
                            mobile: props.history.location.state.mobile
                        }
                    }), name: "studentGlobals"
                })


        )(SingleVideoWatching));
