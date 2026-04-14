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
class ChepterHeaderSection extends Component {
    navBarClassName = () => {
        let classname = "";
        if (this.props.getData.subjectid == "1") {
            classname = "shadow-sm subjects-header botany";
        } else if (this.props.getData.subjectid == "2") {
            classname = "shadow-sm subjects-header physics";
        } else if (this.props.getData.subjectid == "3") {
            classname = "shadow-sm subjects-header chemistry";
        } else if (this.props.getData.subjectid == "5") {
            classname = "shadow-sm subjects-header zoology";
        } else if (this.props.getData.subjectid == "4") {
            classname = "shadow-sm subjects-header maths";
        }
        return classname;
    };
    render() {
        const getLastPracticed = this.props.getLastPracticed;
        const loading2 = getLastPracticed.loading;
        const error2 = getLastPracticed.error;
        if(loading2){
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
        let subjetsobj = globalsubjects.find((a) => a.id == this.props.getData.subjectid);

        let chaptername = "";
        let topicname="";

        let chapternamefind = subjetsobj.studentChapters.find((a) => a.id == this.props.getData.ocid);
        if (chapternamefind != undefined) {
            chaptername = chapternamefind.chapter;
            if(this.props.getData.otid!="0"){
                let topicnamefind = chapternamefind.topics.find((a) => a.id == this.props.getData.otid);
                topicname = topicnamefind.topic;
            }
        }
        console.log("ChepterHeaderSection", this.props.getData,this.props.type);
        return (
            <div className={this.navBarClassName()}>
                <Container fluid={true}>
                    <Row className="align-items-center">
                        <Col xl={7} lg={6} md={12}>
                            <ul className="custom-breadcrumb">

                                {this.props.type == "topic" ? (
                                    <React.Fragment>
                                        <li className="custom-breadcrumb-item">
                                            <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                                pathname: "/student/subjects",
                                                state: {
                                                    subjectid: this.props.getData.subjectid
                                                   
                                                }
                                            }}>
                                                <div className="chapterTitle">Subject</div>
                                                <div className="topicName">{this.props.getTopics[0].subject_name}</div>
                                            </Link>
                                        </li>
                                        <li className="custom-breadcrumb-item active">
                                        <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                                pathname: "/student/subject/topics",
                                                state: {
                                                  otid:  this.props.getData.otid,
                                                  ocid:  this.props.getData.ocid,
                                                  subjectid:  this.props.getData.subjectid
                                                  
                                                }
                                            }}>
                                            <div className="topicTitle">Chapter</div>
                                            <div className="topicName">{this.props.getTopics[0].chapter_name}</div>
                                            </Link>
                                        </li>
                                    </React.Fragment>

                                ) : (
                                        <React.Fragment>

                                            <li className="custom-breadcrumb-item">
                                                <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                                    pathname: "/student/subjects",
                                                    state: {
                                                        
                                                        subjectid: this.props.getData.subjectid
                                                       
                                                    }
                                                }}>
                                                    <div className="topicTitle">Subject</div>
                                                    <div className="topicName">{subjetsobj.subject}</div>
                                                </Link>
                                            </li>
                                            {chaptername!=""?(
                                                <li className="custom-breadcrumb-item active" href="#">
                                                <Link style={{ color: "white", textDecoration: "none;" }} to={{
                                                    pathname: "/student/subject/topics",
                                                    state: {
                                                      otid:  this.props.getData.otid,
                                                      ocid:  this.props.getData.ocid,
                                                      subjectid:  this.props.getData.subjectid
                                                      
                                                    }
                                                }}>
                                                    <div className="chapterTitle">Chapter</div>
                                                    <div className="chapterName">{chaptername}</div>
                                                    </Link>
                                                </li>
                                            ):("")}
                                            
                                            {this.props.getData.otid != "0" ? (<li className="custom-breadcrumb-item active">
                                                <div className="topicTitle">Topic</div>
                                                <div className="topicName">{topicname}</div>
                                            </li>) : ("")}
                                        </React.Fragment>

                                    )}



                            </ul>
                        </Col>
                        <Col xl={5} lg={6} md={12}>
                            <Row className="my-1">
                                {this.props.headertype == "chapterdashboard" ? (<Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="visitDate d-flex align-items-center">
                                        <i className="fas fa-calendar-day fa-2x mr-2" />
                                        <div className="content">Last Practised : <br />{this.props.last_practiced_time != 0 ? (moment.unix(this.props.last_practiced_time).format("DD-MM-YYYY @ LT")) : ("Practice not yet started")}</div>
                                    </div>
                                </Col>)
                                    : this.props.type == "topic" ? (<Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <div className="visitDate d-flex align-items-center">
                                            <i className="fas fa-calendar-day fa-2x mr-2" />
                                            <div className="content">Last Practised : <br />{this.props.getTopics[0].last_timestamp != 0 ? (moment.unix(this.props.getTopics[0].last_timestamp).format("DD-MM-YYYY @ LT")) : ("Practice not yet started")}</div>
                                        </div>
                                    </Col>) 
                                    :this.props.type=="video"?("")
                                    : (<Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                        <div className="visitDate d-flex align-items-center">
                                            <i className="fas fa-calendar-day fa-2x mr-2" />
                                            <div className="content">Last Practised : <br />{getLastPracticed.getLastPracticed.last_timestamp != 0 ? (moment.unix(getLastPracticed.getLastPracticed.last_timestamp).format("DD-MM-YYYY @ LT")) : ("Practice not yet started")}</div>
                                        </div>
                                    </Col>)}
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
                    subject: parseInt(props.getData.subjectid),
                    chapter: parseInt(props.getData.ocid),
                    topic: parseInt(props.getData.otid)
                },
                fetchPolicy: "cache-and-network"
            }), name: "getLastPracticed"
        }),
)(ChepterHeaderSection));
