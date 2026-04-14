import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import moment from 'moment';
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
const FETCH_LASTTIMESTAMP = gql` 
query($mobile: String!, $subject: Int!, $chapter: Int, $topic: Int) {
    getLastPracticed(mobile: $mobile, subject: $subject, chapter: $chapter, topic: $topic){
        chapter
        topic
        last_timestamp
        
    }
}

`;
class TopHeaderSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRestionModalShow: false
        };
    }
    navBarClassName = () => {
        let classname = "";
        if (this.props.getChapters.subjectid == "1") {
            classname = "shadow-sm subjects-header botany";
        } else if (this.props.getChapters.subjectid == "2") {
            classname = "shadow-sm subjects-header physics";
        } else if (this.props.getChapters.subjectid == "3") {
            classname = "shadow-sm subjects-header chemistry";
        } else if (this.props.getChapters.subjectid == "5") {
            classname = "shadow-sm subjects-header zoology";
        } else if (this.props.getChapters.subjectid == "4") {
            classname = "shadow-sm subjects-header maths";
        }
        return classname;
    };
    getTotalQuestions = (data) => {
        let total = [];
        let oldcount = 0;
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            const sdata = idata.total_questions;
            total.push(parseInt(sdata));
        }
        for (let num of total) {
            oldcount = oldcount + num;
        }
        return oldcount;
    };
    practiceModal = (isuserValid, chapternamefind) => {
        if (chapternamefind != undefined) {
            if (chapternamefind.enabled == true) {
                if (isuserValid == false) {
                    this.setState({
                        userRestionModalShow: false
                    });
                    localStorage.setItem("subjectid", this.props.subjectsData.id);
                    localStorage.setItem("type", "practice");
                    localStorage.setItem("ocid", chapternamefind.id);
                    localStorage.setItem("otid", "0");
                    window.open("/student/subject/practice-test", "_blank") //to open new page
                } else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }


    };
    render() {
        console.log("TopHeaderSection", this.props.getChapters);
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
        let subjetsobj = globalsubjects.find((a) => a.id == this.props.subjectsData.id);

        let chaptername = "";

        let chapternamefind = subjetsobj.studentChapters.find((a) => a.id == this.props.subjectsData.last_attempted_chapter);
        if (chapternamefind != undefined) {
            chaptername = chapternamefind.chapter;
        }

        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);



        return (
            <div className={this.navBarClassName()}>
                <Container fluid={true}>
                    <Row className="align-items-center">
                        <Col xl={7} lg={12} md={12}>
                            <Row className="my-1">
                                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <div className="text-white">
                                        {/* <Link  style={{color:"white", textDecoration: "none;"}} to="/student/learn-practice">Subject: <span> {this.props.getChapters.subject}</span></Link> */}
                                   Subject: <span> {subjetsobj.subject}</span>

                                    </div>

                                </Col>
                                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <div className="text-white">
                                        <i className="fal fa-book-spells mr-2" />Chapters: <span> {subjetsobj.studentChapters.length}</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <div className="text-white">
                                        <i className="fas fa-question-circle mr-2" />Questions: <span> {this.getTotalQuestions(
                                            subjetsobj.studentChapters
                                        )}</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <div className="text-white">
                                        <i className="fas fa-check-circle mr-2" />Accuracy: <span> {this.props.subjectsData.accuracy} %</span>
                                    </div>
                                </Col>
                                {/* <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                                    <div className="text-white">
                                        <i className="fal fa-repeat mr-2" />Revision: <span> 0 Times</span>
                                    </div>
                                </Col> */}
                            </Row>
                        </Col>
                        <Col xl={5} lg={12} md={12}>
                            <Row className="my-1">
                                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="visitDate d-flex align-items-center">
                                        <i className="fas fa-calendar-day fa-2x mr-2" />
                                        <div className="content">Last Practised : <br />{getLastPracticed.getLastPracticed.last_timestamp != 0 ? (moment.unix(getLastPracticed.getLastPracticed.last_timestamp).format("DD-MM-YYYY @ LT")) : ("Practice not yet started")}</div>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="visitChapter d-flex align-items-center" style={{cursor:"pointer"}} onClick={(e) => this.practiceModal(isuserValid.lp_practice_exam, chapternamefind)}>
                                        <i className="fas fa-eye fa-2x mr-2" />
                                        {/* <div className="content">Last Practised: {this.props.subjectsData.last_attempted_chapter}-{chaptername.chapter}</div> */}
                                        <div className="content" >Last Practised Chapter: <br />{chaptername}</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
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
                    subject: parseInt(props.subjectsData.id),
                    chapter: 0,
                    topic: 0
                },
                fetchPolicy: "cache-and-network"
            }), name: "getLastPracticed"
        }),
)(TopHeaderSection));
