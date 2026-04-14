import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import OverAllChapterStrengthSection from '../components/learn_practice/goto_dashboard/OverAllChapterStrengthSection'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection';

import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

const FETCH_DATA = gql` 
query($mobile: String!,
    $chapter_id: Int,$topic_id:Int) {
        getChapterDashboard(mobile: $mobile,
    chapter_id: $chapter_id,topic_id:$topic_id){
        total_exams
        total_questions
        answered
        skipped
        wrong_answered
        wrong_corrected
        correct_answered
        in_time
        less_time
        over_time
        accuracy
        total_time
        type
        error_wrong_corrected
        error_report_web{
            error
            error_name
            count
        }

        
        
        last_practiced_time
    }
}
`;

class OverAllChapterStrength extends Component {
    constructor(props){
        super(props)
        console.log("this.",props.history.location.state);
        this.state={

        }
    }
    render() {
        console.log("cook",Cookies.get("studenttoken"));
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getChapterDashboard = this.props.getChapterDashboard;
        const loading1 = getChapterDashboard.loading;
        const error1 = getChapterDashboard.error;

       if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    {
                        !loading1 &&  (
                            <div className="content-wrapper pt-0">
                                <ChepterHeaderSection
                                    last_practiced_time={getChapterDashboard.getChapterDashboard[0].last_practiced_time}
                                    headertype="chapterdashboard"
                                    getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                <Container fluid={true}>
                                    <OverAllChapterStrengthSection
                                        getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                        getChapterDashboard={getChapterDashboard.getChapterDashboard}
                                    />

                                </Container>
                            </div>)
                    }
                </div>
            </React.Fragment>
        )
    }
}



export default withRouter(compose(
    graphql(FETCH_DATA,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    chapter_id: parseInt(props.history.location.state.ocid),
                    topic_id: parseInt(props.history.location.state.otid)

                },
                fetchPolicy: 'cache-and-network'
            }), name: "getChapterDashboard"
        })
)(OverAllChapterStrength));
