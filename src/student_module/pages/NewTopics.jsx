import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import NewTopicsSection from '../components/learn_practice/subjects/NewTopicsSection'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection';
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';



class NewTopics extends Component {

    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Topics_View;
        ReactGA.pageview('/student/subject/topics', ["ELAPP"], title);
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
        const getTopics = this.props.getTopics;
        const loading2 = getTopics.loading;
        const error2 = getTopics.error;


        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        {
                            !loading2 && (
                                <React.Fragment>
                                    <ChepterHeaderSection
                                        type="topic"
                                        getTopics={getTopics.getTopics}
                                        getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                    />
                                    <Container fluid={true}>

                                        <NewTopicsSection
                                            getTopics={getTopics.getTopics}
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
    query($mobile: String!,
        $chapter: Int!) {
            getTopics(mobile: $mobile,
        chapter: $chapter){
            id
            subject
            subject_name
            topic
            chapter
            chapter_name
            practice_percentage
            last_timestamp
            accuracy
            weightage
            total_questions
            attempted_questions
            error_questions
            enabled
            practice_unanswered
            practice_wrong_answered
            practice_correct
            exam_unanswered
            exam_wrong_answered
            exam_correct
            graph
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    chapter: parseInt(props.history.location.state.ocid)

                },
                fetchPolicy: 'cache-and-network'
            }),
            name: "getTopics"
        }))(NewTopics));
