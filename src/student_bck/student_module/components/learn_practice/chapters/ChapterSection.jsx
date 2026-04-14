import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../_subjects.scss';
import { Link } from "react-router-dom";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import { withRouter } from "react-router-dom";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
class ChapterSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            userRestionModalShow: false
        }
    }
    practiseModal = (isuserValid, data) => {
        if (isuserValid.lp_topics_practice_exam == false) {
            this.setState({
                userRestionModalShow: false
            });
            if (data > 0) {
                // this.props.history.push({
                //     pathname: "/student/subject/practice-instructions",
                //     state: {
                //         etype: "topic",
                //         chapters: this.props.getData.chapters,
                //         ocid: this.props.getData.ocid,
                //         otid: this.props.getData.otid,
                //         hchaptername: this.props.getData.topic,
                //         subjectid: this.props.getData.subjectid,

                //     }
                // });

                localStorage.setItem("subjectid", this.props.getData.subjectid);
                localStorage.setItem("type", "practice");
                localStorage.setItem("etype", "topic");
                localStorage.setItem("chapters", this.props.getData.chapters);
                localStorage.setItem("ocid", this.props.getData.ocid);
                localStorage.setItem("otid", this.props.getData.otid);
                localStorage.setItem("hchaptername", this.props.getData.topic);
                window.open("/student/subject/practice-test", "_blank") //to open new page
            }
            else {
                this.setState({
                    modalShow: true
                });
            }
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }


    }
    revision = (isuserValid) => {
        if (isuserValid.lp_topic_custom_content == false) {

            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/start-learning",
                state: {
                    subjectid: this.props.getData.subjectid,
                    hname: "Topic",
                    topicid: this.props.getData.topicid,
                    topic: this.props.getData.topic,
                    chapterid: this.props.getData.chapterid,
                    chapter: this.props.getData.chapter,
                    ocid: this.props.getData.ocid,
                    otid: this.props.getData.otid,

                }
            }

            );
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    wrongQuestion = (isuserValid) => {
        if (isuserValid.lp_topic_error_exam == false) {

            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/start-error-exam",
                state: {
                    etype: "topic",
                    chapterid: this.props.getData.chapterid,
                    hname: "Topic",
                    chapter: this.props.getData.chapter,
                    ocid: this.props.getData.ocid,
                    otid: this.props.getData.otid,

                    chapters: this.props.getData.chapters,
                    subjectid: this.props.getData.subjectid,
                    hchaptername: this.props.getData.topic,
                    topic: this.props.getData.topic

                }
            }

            );
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    dashBoard = (isuserValid) => {
        if (isuserValid.lp_topic_dashboard == false) {

            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/chapter-status",
                state: {
                    subjectid: this.props.getData.subjectid,
                    chapterid: this.props.getData.chapterid,
                    chapter: this.props.getData.chapter,
                    topicid: this.props.getData.topicid,
                    topic: this.props.getData.topic,
                    ocid: "0",
                    otid: this.props.getData.otid,
                    learning: {
                        hname: "Topic",
                        chapterid: this.props.getData.chapterid,
                        chapter: this.props.getData.chapter,
                        ocid: "0",
                        otid: this.props.getData.otid,
                        subjectid: this.props.getData.subjectid,
                    },
                    practice: {
                        etype: "Topic",
                        chapters: this.props.getData.chapters,
                        ocid: "0",
                        otid: this.props.getData.otid,
                        hchaptername: this.props.getData.topic,
                        subjectid: this.props.getData.subjectid,
                    },

                    wrong: {
                        etype: "Topic",
                        chapters: this.props.getData.chapters,
                        subjectid: this.props.getData.subjectid,
                        hchaptername: this.props.getData.topic,
                        hname: "topic",
                        chapterid: this.props.getData.chapterid,
                        chapter: this.props.getData.chapter,
                        ocid: "0",
                        otid: this.props.getData.otid,
                        topic: this.props.getData.topic
                    }
                }
            });
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    render() {
        console.log("ChapterSection", this.props.getData);
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        return (
            <section className="subject_section">
                <div className="title mt-3 mb-4">
                    <h5>{this.props.getData.topic}</h5>
                    {/* <p>Watch Videos, Start Learn, Do Practice &amp; Correct Wrong Questions</p> */}
                    <p>Start Learn, Do Practice &amp; Correct Wrong Questions</p>
                </div>
                <div className="mb-3 chapter-block">
                    <Row>

                        {/* <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                            <Link
                                to={{
                                    pathname: "/student/subject/start-watching",
                                    state: {
                                        hname: "Topic",
                                        topicid: this.props.getData.topicid,
                                        topic: this.props.getData.topic,
                                        chapterid: this.props.getData.chapterid,
                                        chapter: this.props.getData.chapter,
                                        ocid: this.props.getData.ocid,
                                        otid: this.props.getData.otid,
                                        last_attempted_chapter: this.props.getData.last_attempted_chapter,
                                        last_attempted_chaptername: this.props.getData.last_attempted_chaptername,
                                        last_timestamp: this.props.getData.last_timestamp,
                                        accuracy: this.props.getData.accuracy

                                    }
                                }}
                            >
                                <Card as={Card.Body} className="mb-4 flex-row border-primary">
                                    <div className="icon mr-3">
                                        <i className="fad fa-video fa-fw fa-3x text-primary" />
                                    </div>
                                    <div className="content">
                                        <h6>Videos</h6>
                                        <p>3 Videos Availables</p>
                                    </div>
                                </Card>
                            </Link>
                        </Col> */}


                        <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                            <a
                                onClick={() => this.revision(isuserValid)}
                            >

                                <Card as={Card.Body} className="mb-4 flex-row border-success">
                                    <div className="icon mr-3">
                                        <i className="fad fa-clipboard fa-fw fa-3x text-success" />
                                    </div>
                                    <div className="content">
                                        <h6>Revision Material</h6>
                                        {/* <p>20 Formulas and more...</p> */}
                                    </div>
                                </Card>
                            </a>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                            <a
                                onClick={(e) => this.practiseModal(isuserValid, this.props.getData.topictotquestions)}
                            >

                                <Card

                                    as={Card.Body}
                                    className="mb-4 flex-row border-info">
                                   <div className="icon mr-3">
                                        <i className="fad fa-question-circle fa-fw fa-3x text-info" />
                                    </div>
                                    <div className="content">
                                        <h6>Practice Questions</h6>
                                        {/* <p>Completed 58%</p> */}
                                    </div>
                                </Card>
                            </a>
                        </Col>

                        <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                            <a
                                onClick={() => this.wrongQuestion(isuserValid)}

                            >
                                <Card as={Card.Body} className="mb-4 flex-row border-danger">
                                    
                                    <div className="icon mr-3">
                                        <i className="fad fa-question-circle fa-fw fa-3x text-danger" />
                                    </div>
                                    <div className="content">
                                        <h6>Wrong questions</h6>
                                        {/* <p>Pending 15</p> */}
                                    </div>
                                </Card>
                            </a>
                        </Col>
                    </Row>
                </div>
                <div className="step2">
                    <h6>Analysis Dashboard</h6>
                    <Row>
                        <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                            <a
                                onClick={() => this.dashBoard(isuserValid)}

                            >
                                <Card as={Card.Body} className="mb-4 flex-row border-maroon">
                                    <div className="icon mr-3">
                                        <i className="fad fa-chart-line fa-fw fa-3x text-maroon" />
                                    </div>
                                    <div className="content">
                                        <h6>Dashboard</h6>
                                        {/* <p>Topic Analysis</p> */}
                                    </div>
                                </Card>
                            </a>
                        </Col>
                    </Row>
                    <ImportentAlert show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                    <UserRestrictionAlert
                        show={this.state.userRestionModalShow}
                        onHide={() => this.setState({ userRestionModalShow: false })}
                    />
                </div>
            </section >
        )
    }
}

export default withRouter(ChapterSection);
