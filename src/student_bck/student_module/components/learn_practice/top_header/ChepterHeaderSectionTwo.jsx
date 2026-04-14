import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './_breadcrumb.scss'
import moment from 'moment';
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
const FETCH_LASTTIMESTAMP = gql` 
query($mobile: String!, $subject: Int!, $chapter: Int, $topic: Int) {
    getLastPracticed(mobile: $mobile, subject: $subject, chapter: $chapter, topic: $topic){
        chapter
        topic
        last_timestamp
        
    }
}

`;
class ChepterHeaderSectionTwo extends Component {
    navBarClassName = () => {
        let classname = "";
        if (this.props.getChapterId.subjectid == "1") {
            classname = "shadow-sm subjects-header botany";
        } else if (this.props.getChapterId.subjectid == "2") {
            classname = "shadow-sm subjects-header physics";
        } else if (this.props.getChapterId.subjectid == "3") {
            classname = "shadow-sm subjects-header chemistry";
        } else if (this.props.getChapterId.subjectid == "5") {
            classname = "shadow-sm subjects-header zoology";
        } else if (this.props.getChapterId.subjectid == "4") {
            classname = "shadow-sm subjects-header maths";
        }
        return classname;
    };
    render() {
        console.log("ggggetChapterId",this.props.getChapterId);
        const getLastPracticed = this.props.getLastPracticed;
        const loading2 = getLastPracticed.loading;
        const error2 = getLastPracticed.error;
        if (loading2) {
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        let subjetsobj = globalsubjects.find((a) => a.id == this.props.getChapterId.subjectid);

        let chaptername = "";
        let topicname = "";
        console.log("navBarClassName", getLastPracticed.getLastPracticed, subjetsobj)
        let chapternamefind = subjetsobj.studentChapters.find((a) => a.id == getLastPracticed.getLastPracticed.chapter);
        if (chapternamefind != undefined) {
            chaptername = chapternamefind.chapter;
            if (this.props.getChapterId.otid != "0") {
                let topicnamefind = chapternamefind.topics.find((a) => a.id == getLastPracticed.getLastPracticed.topic);
                topicname = topicnamefind.topic;
            }
        }
        
        return (
            <div className={this.navBarClassName()}>
                <Container fluid={true}>
                    <Row className="align-items-center">
                        <Col xl={7} lg={6} md={12}>
                            <ul className="custom-breadcrumb">
                                <li className="custom-breadcrumb-item">

                                    <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                        pathname: "/student/subjects",
                                        state: {

                                            subjectid: this.props.getChapterId.subjectid

                                        }
                                    }}>
                                        <div className="chapterTitle text-light">Subject</div>
                                        <div className="chapterName">{subjetsobj.subject}</div>
                                    </Link>
                                </li>
                                <li className="custom-breadcrumb-item">
                                    <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                        pathname: "/student/subject/topics",
                                        state: {
                                            otid: this.props.getChapterId.otid,
                                            ocid: this.props.getChapterId.ocid,
                                            subjectid: this.props.getChapterId.subjectid

                                        }
                                    }}>
                                        <div className="chapterTitle text-light">Chapter</div>
                                        <div className="chapterName">{chaptername}</div>
                                    </Link>
                                </li>{this.props.getChapterId.otid != "0" ? (<li className="custom-breadcrumb-item active">
                                    <div className="topicTitle">Topic</div>
                                    <div className="topicName">{topicname}</div>
                                </li>) : ("")}

                            </ul>
                        </Col>
                        <Col xl={5} lg={6} md={12}>
                            <Row className="my-1">
                                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="visitDate d-flex align-items-center">
                                        <i className="fas fa-calendar-day fa-2x mr-2" />
                                        <div className="content">Last Practised :<br /> {getLastPracticed.getLastPracticed.last_timestamp != 0 ? (moment.unix(getLastPracticed.getLastPracticed.last_timestamp).format("DD-MM-YYYY @ LT")) : ("Practice not yet started")}</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}



export default withRouter(compose(
    graphql(FETCH_LASTTIMESTAMP,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    subject: parseInt(props.getChapterId.subjectid),
                    chapter: parseInt(props.getChapterId.ocid),
                    topic: parseInt(props.getChapterId.otid)
                },
                fetchPolicy: "cache-and-network"
            }), name: "getLastPracticed"
        }),
)(ChepterHeaderSectionTwo));
