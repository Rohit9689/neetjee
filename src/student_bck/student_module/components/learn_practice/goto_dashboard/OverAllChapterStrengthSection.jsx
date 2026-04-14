import React, { Component, Suspense, lazy } from 'react'
import { Row, Col, Card, Media, Image, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import error_logo from '../../../../images/error.png'

import './_chapterStrength.scss';
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

const TopicAccuracy = React.lazy(() => import('./TopicAccuracy'));
const Complexity = React.lazy(() => import('./Complexity'));
const MostErrorQType = React.lazy(() => import('./MostErrorQType'));
const ErrorExam = React.lazy(() => import('./ErrorExam'));
class OverAllChapterStrengthSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRestionModalShow: false,
            tableOne: true,
            tableTwo: false,
            tableThree: false,
            tableFour: false,
            tableFive: false,
            tableSix: false,
            tableSeven: false
        }
    }


    errorexam(data) {
        let datacount = this.props.getChapterDashboard.find((a) => a.type == "exam");

        if (datacount != undefined) {
            let array = datacount.error_report_web;
            let Data = array.find((b) => b.error == data);

            if (Data != undefined) {
                let returnData = Data.count;
                if (isNaN(returnData)) {
                    return '0';
                }
                else {
                    return Math.round(returnData);
                }
            }

        }

    }
    typewiseAccuracy(data) {
        let totalAttempted = parseInt(data.correct_answered) + parseInt(data.wrong_answered);
        let total = parseInt(data.correct_answered) + parseInt(data.wrong_answered) + parseInt(data.skipped);
        let accuracy = "0";
        if (data.type == "exam") {
            accuracy = (total != 0) ? Math.round((parseInt(data.correct_answered) / total * 100)) : '0';
        }
        else {
            accuracy = (totalAttempted != 0) ? Math.round((parseInt(data.correct_answered) / totalAttempted * 100)) : '0';
        }
        return accuracy;
    }
    SpeedTot() {
        let speed = 0;
        let practice = this.props.getChapterDashboard.find((a) => a.type == "practice");
        let totalAttempted1 = parseInt(practice.answered) + parseInt(practice.wrong_answered);

        let speed1 = (totalAttempted1 != 0) ? Math.round((parseInt(practice.total_time) / totalAttempted1)) : '0';


        let exam = this.props.getChapterDashboard.find((a) => a.type == "exam");
        let totalAttempted = parseInt(exam.answered) + parseInt(exam.wrong_answered) + parseInt(exam.skipped);

        let speed2 = (totalAttempted != 0) ? Math.round((parseInt(exam.total_time) / totalAttempted)) : '0';
        if (speed1 != 0 && speed2 != 0) {
            speed = Math.round((parseFloat(speed1) + parseFloat(speed2)) / 2);
        }
        else {
            speed = Math.round(parseFloat(speed1) + parseFloat(speed2));
        }
        if (isNaN(speed)) {
            return "00:00:00";
        }
        else {
            //return speed;
            var hrs = Math.floor(speed / 3600);
            var min = Math.floor((speed - (hrs * 3600)) / 60);
            var seconds = speed - (hrs * 3600) - (min * 60);
            seconds = Math.round(seconds * 100) / 100
           
            var result = (hrs < 10 ? "0" + hrs : hrs);
            result += ":" + (min < 10 ? "0" + min : min);
            result += ":" + (seconds < 10 ? "0" + seconds : seconds);
            return result;
        }


    }
    TotTimeTaken(tottime) {
        
        if (isNaN(tottime)) {
            return "00:00:00";
        }
        else {
            
            var hrs = Math.floor(tottime / 3600);
            var min = Math.floor((tottime - (hrs * 3600)) / 60);
            var seconds = tottime - (hrs * 3600) - (min * 60);
            seconds = Math.round(seconds * 100) / 100
           
            var result = (hrs < 10 ? "0" + hrs : hrs);
            result += ":" + (min < 10 ? "0" + min : min);
            result += ":" + (seconds < 10 ? "0" + seconds : seconds);
            return result;
        }


    }
    Speed(data, type) {
        let totalAttempted
        if (type == "practice") {
            totalAttempted = parseInt(data.answered) + parseInt(data.wrong_answered);
        }
        else {
            totalAttempted = parseInt(data.answered) + parseInt(data.wrong_answered) + parseInt(data.skipped);
        }

        //let total = parseInt(data.answered) + parseInt(data.wrong_answered) + parseInt(data.skipped);
        // console.log(("SpeedSpeedSpeed",data.total_time,totalAttempted);
        let speed = (totalAttempted != 0) ? Math.ceil((parseInt(data.total_time) / totalAttempted)) : '0';
        return speed;
    }
    totAccuracy() {

        let practice = this.props.getChapterDashboard.find((a) => a.type == "practice");
        let exam = this.props.getChapterDashboard.find((a) => a.type == "exam");
        let Paccuracyval = parseInt(practice.correct_answered) / (parseInt(practice.correct_answered) + parseInt(practice.wrong_answered)) * 100;
        let Eaccuracyval = parseInt(exam.correct_answered) / (parseInt(exam.correct_answered) + parseInt(exam.wrong_answered) + parseInt(exam.skipped)) * 100;
        let Paccuracy = (Paccuracyval != "0" && !isNaN(Paccuracyval)) ? Paccuracyval : "0";
        let Eaccuracy = (Eaccuracyval != "0" && !isNaN(Eaccuracyval)) ? Eaccuracyval : "0";
        let avg = "";
        //// console.log(("ostrengt", Paccuracy, Eaccuracy);
        if (Paccuracy == "0" && Eaccuracy != "0") {
            avg = Math.round(Eaccuracy);
        }
        else if (Paccuracy != "0" && Eaccuracy == "0") {
            avg = Math.round(Paccuracy);
        }
        else {
            avg = Math.round((Paccuracy + Eaccuracy) / 2);
        }
        if (isNaN(avg)) {
            return 0;
        }
        else {
            return avg;
        }



    }
    totwrongpending(edata, pdata) {
        // console.log(("totwrongpending", edata, pdata);
        let data = parseInt(edata) + parseInt(pdata);
        return data;

        // let wrong_answered = [];
        // let wrong_corrected = [];
        // this.props.getChapterDashboard.map((gatData) => {
        //     wrong_answered.push(parseInt(gatData.wrong_answered));
        //     wrong_corrected.push(parseInt(gatData.wrong_corrected));
        // })
        // var sumofwrong_answered = wrong_answered.reduce(function (a, b) {
        //     return a + b;
        // }, 0);

        // var sumofwrong_corrected = wrong_corrected.reduce(function (a, b) {
        //     return a + b;
        // }, 0);

        // let totalpending = Math.round((parseInt(sumofwrong_answered) - parseInt(sumofwrong_corrected)) / parseInt(sumofwrong_answered) * 100);

        // if (isNaN(totalpending)) {
        //     return '0';
        // }
        // else {
        //     return Math.round(totalpending);
        // }
    }
    totOverallChapterStrength() {
        let answered = [];
        let wrong_answered = [];
        // console.log(("totOverallChapterStrength", this.props.getChapterDashboard);
        this.props.getChapterDashboard.map((gatData) => {
            answered.push(parseInt(gatData.answered));
            wrong_answered.push(parseInt(gatData.wrong_answered));
        })
        var sumofanswered = answered.reduce(function (a, b) {
            return a + b;
        }, 0);

        var sumofwrong_answered = wrong_answered.reduce(function (a, b) {
            return a + b;
        }, 0);

        let totalacc = Math.round((parseInt(sumofanswered) / (parseInt(sumofwrong_answered) + parseInt(sumofanswered))) * 100);

        if (isNaN(totalacc)) {
            return '0';
        }
        else {
            return Math.round(totalacc);
        }
    }
    startLearningUser = (isuserValid) => {
        if (this.props.getData.topicid != "") {
            // console.log(("topic1");
            if (isuserValid.lp_topic_custom_content == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-learning",
                    state: {
                        subjectid: this.props.getData.learning.subjectid,
                        hname: this.props.getData.learning.hname,
                        chapterid: this.props.getData.learning.chapterid,
                        chapter: this.props.getData.learning.chapter,
                        ocid: this.props.getData.learning.ocid,
                        otid: this.props.getData.learning.otid,
                        topic: this.props.getData.learning.topic,
                        chapters: this.props.getData.learning.chapters,
                    }
                })
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        }
        else {
            // console.log(("chapter1");
            if (isuserValid.lp_custom_content == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-learning",
                    state: {
                        subjectid: this.props.getData.learning.subjectid,
                        hname: this.props.getData.learning.hname,
                        chapterid: this.props.getData.learning.chapterid,
                        chapter: this.props.getData.learning.chapter,
                        ocid: this.props.getData.learning.ocid,
                        otid: this.props.getData.learning.otid,
                        chapters: this.props.getData.learning.chapters,
                    }
                })
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }

    }
    startPractiseUser = (isuserValid) => {
        if (this.props.getData.topicid != "") {
            // console.log(("topic2");
            if (isuserValid.lp_topics_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                // this.props.history.push({
                //     pathname: "/student/subject/practice-instructions",
                //     state: {
                //         etype: this.props.getData.practice.etype,
                //         chapters: this.props.getData.practice.chapters,
                //         ocid: this.props.getData.practice.ocid,
                //         otid: this.props.getData.practice.otid,
                //         hchaptername: this.props.getData.practice.hchaptername,
                //         subjectid: this.props.getData.practice.subjectid

                //     }
                // })

                localStorage.setItem("subjectid", this.props.getData.practice.subjectid);
                localStorage.setItem("type", "practice");
                localStorage.setItem("etype", this.props.getData.practice.etype);
                localStorage.setItem("chapters", this.props.getData.practice.chapters);
                localStorage.setItem("ocid", this.props.getData.practice.ocid);
                localStorage.setItem("otid", this.props.getData.practice.otid);
                localStorage.setItem("hchaptername", this.props.getData.practice.hchaptername);


                window.open("/student/subject/practice-test", "_blank") //to open new page
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        }
        else {
            // console.log(("chapter2");
            if (isuserValid.lp_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                // this.props.history.push({
                //     pathname: "/student/subject/practice-instructions",
                //     state: {
                //         etype: this.props.getData.practice.etype,
                //         chapters: this.props.getData.practice.chapters,
                //         ocid: this.props.getData.practice.ocid,
                //         otid: this.props.getData.practice.otid,
                //         hchaptername: this.props.getData.practice.hchaptername,
                //         subjectid: this.props.getData.practice.subjectid

                //     }
                // })

                localStorage.setItem("subjectid", this.props.getData.practice.subjectid);
                localStorage.setItem("type", "practice");
                localStorage.setItem("etype", this.props.getData.practice.etype);
                localStorage.setItem("chapters", this.props.getData.practice.chapters);
                localStorage.setItem("ocid", this.props.getData.practice.ocid);
                localStorage.setItem("otid", this.props.getData.practice.otid);
                localStorage.setItem("hchaptername", this.props.getData.practice.hchaptername);


                window.open("/student/subject/practice-test", "_blank") //to open new page
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
    }
    startErrorUser = (isuserValid) => {
        if (this.props.getData.topicid != "") {
            // console.log(("topic3");
            if (isuserValid.lp_topic_error_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-error-exam",
                    state: {
                        etype: this.props.getData.wrong.etype,
                        hname: this.props.getData.wrong.hname,
                        chapterid: this.props.getData.wrong.chapterid,
                        chapter: this.props.getData.wrong.chapter,
                        ocid: this.props.getData.wrong.ocid,
                        otid: this.props.getData.wrong.otid,

                        chapters: this.props.getData.wrong.chapters,
                        subjectid: this.props.getData.wrong.subjectid,
                        hchaptername: this.props.getData.wrong.hchaptername,
                        topic: this.props.getData.wrong.topic

                    }
                })
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        }
        else {
            // console.log(("chapter3");
            if (isuserValid.lp_error_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-error-exam",
                    state: {
                        etype: this.props.getData.wrong.etype,
                        hname: this.props.getData.wrong.hname,
                        chapterid: this.props.getData.wrong.chapterid,
                        chapter: this.props.getData.wrong.chapter,
                        ocid: this.props.getData.wrong.ocid,
                        otid: this.props.getData.wrong.otid,

                        chapters: this.props.getData.wrong.chapters,
                        subjectid: this.props.getData.wrong.subjectid,
                        hchaptername: this.props.getData.wrong.hchaptername

                    }
                })
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
    }
    practiceExamHistory = (isuserValid) => {
        if (isuserValid.practise_completed == false) {
            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/practice-exam-history",
                state: {
                    chapters: this.props.getData.chapters,
                    chapterid: this.props.getData.chapterid,
                    chapter: this.props.getData.chapter,
                    topicid: this.props.getData.topicid,
                    topic: this.props.getData.topic,
                    ocid: this.props.getData.ocid,
                    otid: this.props.getData.otid,
                    subjectid: this.props.getData.subjectid,
                }
            });

        } else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }



    betterFun(eval1, pval2, type) {
        // console.log(("betterFuntype",type);
        if (type == "skipped" || type == "wrong" || type == "error" || type == "over" || type == "intime" || type == "speed" || type == "less") {
            if (parseInt(eval1) == "0" && parseInt(pval2) == "0") {
                return "Both"
            }
            else if (parseInt(eval1) == "0" && parseInt(pval2) != "0") {
                return "Exam"
            }
            else if (parseInt(eval1) != "0" && parseInt(pval2) == "0") {
                return "Practice"
            }
            else {

                if (parseInt(eval1) < parseInt(pval2)) {
                    let diff = parseInt(pval2) - parseInt(eval1);
                    // console.log(("11");
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Exam"
                    }

                }
                else if (parseInt(pval2) < parseInt(eval1)) {
                    // console.log(("12");
                    let diff = parseInt(eval1) - parseInt(pval2);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Practice"
                    }

                }
                else {
                    return "Both"

                }
            }
        }
        else {
            if (parseInt(eval1) == "0" && parseInt(pval2) == "0") {
                return "Not Both"
            }
            else if (parseInt(eval1) == "0" && parseInt(pval2) != "0") {
                return "Practice"
            }
            else if (parseInt(eval1) != "0" && parseInt(pval2) == "0") {
                return "Exam"
            }
            else {

                if (parseInt(eval1) > parseInt(pval2)) {
                    let diff = parseInt(eval1) - parseInt(pval2);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Exam"
                    }

                }
                else if (parseInt(pval2) > parseInt(eval1)) {
                    let diff = parseInt(pval2) - parseInt(eval1);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Practice"
                    }

                } else {
                    return "Both"

                }
            }

        }




    }
    tabfunction = (type) => {
        if (type == "tableThree") {
            this.setState({ tableThree: !this.state.tableThree })
        }
        else if(type=="tableSix"){
            this.setState({ tableSix: !this.state.tableSix })
        }
    }
    render() {
        const { tableOne, tableTwo, tableThree, tableFour, tableFive, tableSix, tableSeven } = this.state;

        let practice = "";
        let exam = "";
        // console.log(("getData", this.props.getData);
        if (this.props.getChapterDashboard != undefined) {
            practice = this.props.getChapterDashboard.find((a) => a.type == "practice");
            exam = this.props.getChapterDashboard.find((a) => a.type == "exam");
        }
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);

        return (
            <div className="goto_dashboard mt-3">
                <Row className="align-items-center">
                    <Col xl={9} lg={9} md={8} sm={8} xs={12}>
                        <div className="title my-3">
                            {this.props.getData.ocid != 0 ? (<h5>{this.props.getData.chapter}</h5>) : (<h5>{this.props.getData.topic}</h5>)}

                            <p>Analysis Dashboard</p>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={4} sm={4} xs={12} className="text-xl-right text-xl-right">
                        <a
                            onClick={() => this.practiceExamHistory(isuserValid)}
                            // to={{
                            //     pathname: "/student/subject/practice-exam-history",
                            //     state: {
                            //         chapterid: this.props.getData.chapterid,
                            //         chapter: this.props.getData.chapter,
                            //         topicid: this.props.getData.topicid,
                            //         topic: this.props.getData.topic,
                            //         ocid: this.props.getData.ocid,
                            //         subjectid: this.props.getData.subjectid,
                            //     }
                            // }}
                            className="btn btn-lightblue">Practice &amp; Exam History
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="Card_border box-shadow">
                            <Card.Header className="header_bg color_333 font-weight-bold font_18">
                                <Media>
                                    <i className="fas fa-fist-raised hand_icon"></i>
                                    <Media.Body className="ml-4 color_333 font_18">
                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                            {this.props.getData.ocid != 0 ? (<div>Overall Chapter Strength</div>) : (<div>Overall Topic Strength</div>)}

                                            <div className="text-right">{this.totAccuracy()}%</div>
                                        </div>
                                    </Media.Body>
                                </Media>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Row>
                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                        <Card className="card_bg h-100">
                                            <Card.Body className="p-2">
                                                <Row>
                                                    <Col className="ml-3">
                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                            <div><i className="fas fa-check-double color_green font_18 font-weight-bold"></i></div>
                                                            <div className="color_green font_18 font-weight-bold">{this.totAccuracy()}%</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Chapter Accuracy</p>
                                                        <p className="color_yash font_12 font-weight-bold">of Exam &amp; Practise</p>
                                                    </Col>
                                                </Row>
                                                <a style={{ textDecoration: 'none' }}
                                                    onClick={() => this.startLearningUser(isuserValid)}
                                                >
                                                    <div className="button_bg_green rounded p-2 m-0 d-flex justify-content-between align-items-center ">


                                                        <p className="color_green font_14 font-weight-bold text-center mb-0">
                                                            Start Learning</p><i className="fas fa-arrow-right color_green font-weight-bold"></i>

                                                    </div>
                                                </a>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                        <Card className="card_bg h-100">
                                            <Card.Body className="p-2">
                                                <Row>
                                                    <Col className="ml-3">
                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                            <div><i className="fas fa-alarm-clock fa-2x text-primary"></i></div>
                                                            <div className="color_blue font_18 font-weight-bold">
                                                                {/* {this.totAccuracy()}% */}
                                                                {this.SpeedTot()} 
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Time Analysis</p>
                                                        <p className="color_yash font_12 font-weight-bold">Your Average Time Per Question</p>
                                                    </Col>
                                                </Row>
                                                <a style={{ textDecoration: 'none' }}
                                                    onClick={() => this.startPractiseUser(isuserValid)}
                                                >
                                                    <div className="button_bg_blue rounded p-2 d-flex justify-content-between align-items-center">
                                                        <p className="color_blue font_14 font-weight-bold text-center mb-0">Start Practise</p>
                                                        <i className="fas fa-arrow-right color_blue font-weight-bold"></i>
                                                    </div>
                                                </a>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    {/* <Col xl={3} lg={3} md={6} sm={6} xs={12} className="mb-2">
                                        <Card className="card_bg h-100">
                                            <Card.Body className="p-2">
                                                <Row>
                                                    <Col className="ml-3">
                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                            <div><i className="fas fa-mind-share fa-2x text-primary"></i></div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                        <p className="color_333 font-weight-bold mb-0 mt-2 font_14">Most Error Question Type</p>
                                                        <p className="color_yash font_12 font-weight-bold">Your Very Week in Integration Questions</p>
                                                    </Col>
                                                </Row>
                                                <a style={{ textDecoration: 'none' }}
                                                    onClick={() => this.startPractiseUser(isuserValid)}
                                                >
                                                    <div className="button_bg_blue rounded p-2 d-flex justify-content-between align-items-center">
                                                        <p className="color_blue font_14 font-weight-bold text-center mb-0">Start Practice</p>
                                                        <i className="fas fa-arrow-right color_blue font-weight-bold"></i>
                                                    </div>
                                                </a>
                                            </Card.Body>
                                        </Card>
                                    </Col> */}
                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                        <Card className="card_bg h-100">
                                            <Card.Body className="p-2">
                                                <Row>
                                                    <Col className="ml-3">
                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                            <div><Image src={error_logo} alt="Image" /></div>
                                                            <div className="color_red font_18 font-weight-bold">{this.totwrongpending((parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)), (parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)))}</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Pending</p>
                                                        <p className="color_333 font_14 font-weight-bold">Error Questions</p>
                                                    </Col>
                                                </Row>
                                                {parseInt((parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)) + parseInt(parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)))!=0?(
                                                    <a style={{ textDecoration: 'none' }}
                                                    onClick={() => this.startErrorUser(isuserValid)}
                                                >
                                                    <div className="button_bg_red rounded p-2 d-flex justify-content-between align-items-center">
                                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">Start Error Exam</p>
                                                        <i className="fas fa-arrow-right color_dark_red font-weight-bold"></i>
                                                    </div>
                                                </a>
                                                ):("")}
                                                
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="border-0 bg-white p-0">
                                <Row>
                                    <Col>
                                        <Table responsive="sm" bordered className="m-0 table_custom_style">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        <Button variant="link text-dark text-decoration-none" onClick={() => this.setState({ tableOne: !tableOne })}>
                                                            {this.state.tableOne == true ? (
                                                                <i className="far fa-minus-square fa-fw" />
                                                            ) : (
                                                                    <i className="far fa-plus-square fa-fw" />
                                                                )}

                                                        </Button>
                                                        Chapter Performance Analysis
                                                    </th>
                                                    <th>Total no. of Exam Sessions: <br /> {exam != undefined ? (exam.total_exams) : ("")}</th>
                                                    <th>Total no. of Practise Sessions: <br />{practice != undefined ? (practice.total_exams) : ("")} </th>
                                                    <th>You performed better in</th>
                                                </tr>
                                            </thead>
                                            {tableOne ?
                                                <tbody>
                                                    <tr >
                                                        <th className="secondTrCls">Questions Appeared</th>
                                                        <th className="secondTrCls">{exam != undefined ? (exam.total_questions) : ("")}</th>

                                                        <th className="secondTrCls">{practice != undefined ? (practice.total_questions) : ("")}</th>

                                                        <th className="secondTrCls">{this.betterFun(exam.total_questions, practice.total_questions)}</th>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-check-circle color_green mr-2 font_16"></i> Correct Answered</td>
                                                        <td> {exam != undefined ? (exam.correct_answered) : ("")}</td>
                                                        <td>{practice != undefined ? (practice.correct_answered) : ("")} </td>
                                                        <td>{this.betterFun(exam.correct_answered, practice.correct_answered)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-step-forward color_yellow mr-2 font_16"></i> Skipped</td>
                                                        <td> {exam != undefined ? (exam.skipped) : ("")}</td>
                                                        <td>{practice != undefined ? (practice.skipped) : ("")}</td>
                                                        <td>{this.betterFun(exam.skipped, practice.skipped, "skipped")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-times-circle color_dark_red mr-2 font_16"></i> Wrong Answered</td>
                                                        <td> {exam != undefined ? (exam.wrong_answered) : ("")}</td>
                                                        <td> {practice != undefined ? (practice.wrong_answered) : ("")}</td>
                                                        <td>{this.betterFun(exam.wrong_answered, practice.wrong_answered, "wrong")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-times-circle color_dark_red font_16 icon_WrongCorrected_up"></i> Wrong Corrected</td>
                                                        <td>{exam != undefined ? (exam.wrong_corrected) : ("")}</td>
                                                        <td> {practice != undefined ? (practice.wrong_corrected) : ("")}</td>
                                                        <td>{this.betterFun(exam.wrong_corrected, practice.wrong_corrected, "wrong")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-times-circle color_dark_red font_16 icon_WrongPending_up"></i> Wrong Pending</td>
                                                        <td>{exam != undefined ? (parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)) : ("")}</td>
                                                        <td>{practice != undefined ? (parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)) : ("")} </td>
                                                        <td>{this.betterFun((parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)), (parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)), "wrong")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-check-double color_green mr-2 font_16"></i> Answer Accuracy</td>
                                                        {/* <td>{exam != undefined ? (exam.accuracy) : ("0")}</td>
                                                        <td>{practice != undefined ? (practice.accuracy) : ("0")}</td>
                                                        <td>Exams</td> */}
                                                        <td>{this.typewiseAccuracy(exam)} %</td>
                                                        <td>{this.typewiseAccuracy(practice)} %</td>
                                                        <td>{this.betterFun(this.typewiseAccuracy(exam), this.typewiseAccuracy(practice))}</td>
                                                    </tr>
                                                </tbody>
                                                : null
                                            }

                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        <Button variant="link text-dark text-decoration-none" onClick={() => this.setState({ tableTwo: !tableTwo })}>
                                                            {/* <i className="far fa-minus-square fa-fw" /> Reasons for Incorrect Answers */}
                                                            {this.state.tableTwo == true ? (
                                                                <React.Fragment>
                                                                    <i className="far fa-minus-square fa-fw" />Reasons for Incorrect Answers
                                                                </React.Fragment>
                                                            ) : (
                                                                    <React.Fragment>
                                                                        <i className="far fa-plus-square fa-fw" />Reasons for Incorrect Answers
                                                                    </React.Fragment>

                                                                )}
                                                        </Button>
                                                    </th>
                                                    <th>{exam != undefined ? (exam.error_report_web.length) : ("")}</th>
                                                    <th>{practice != undefined ? (practice.error_report_web.length) : ("")}</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {tableTwo ?
                                                <tbody>
                                                    {this.props.getChapterDashboard[0].error_report_web.map((a) => (<tr>
                                                        <td><i className="fas fa-lightbulb-exclamation color_dark_red mr-2 font_18"></i>{a.error_name}</td>
                                                        <td>{this.errorexam(a.error)}</td>
                                                        <td>{a.count}</td>
                                                        <td>None</td>
                                                    </tr>))}


                                                </tbody>
                                                : null}

                                            <Suspense fallback={<tbody><tr className="text-center">Loading...</tr></tbody>}>
                                                <MostErrorQType
                                                    tabfunction={this.tabfunction}
                                                    tableThree={this.state.tableThree}
                                                    chapter_id={this.props.getData.ocid}
                                                    topic_id={this.props.getData.otid}

                                                />
                                            </Suspense>

                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        <Button variant="link text-dark text-decoration-none" onClick={() => this.setState({ tableFour: !tableFour })}>
                                                            {/* <i className="far fa-minus-square fa-fw" /> Time Analysis */}
                                                            {this.state.tableFour == true ? (
                                                                <React.Fragment>
                                                                    <i className="far fa-minus-square fa-fw" />Time Analysis
                                                                </React.Fragment>
                                                            ) : (
                                                                    <React.Fragment>
                                                                        <i className="far fa-plus-square fa-fw" />Time Analysis
                                                                    </React.Fragment>

                                                                )}
                                                        </Button>
                                                    </th>
                                                    <th>Total Time Taken {exam != undefined || exam.total_time != null ? (this.TotTimeTaken(exam.total_time)) : ("00:00:00")}</th>
                                                    <th>Total Time Taken {practice != undefined || practice.total_time != null ? (this.TotTimeTaken(practice.total_time)) : ("00:00:00")}</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {tableFour ?
                                                <tbody>
                                                    <tr>
                                                        <td><i className="fas fa-circle text-lightgrey mr-2"></i>In time</td>
                                                        <td>{exam != undefined ? (exam.in_time) : ("")}</td>
                                                        <td>{practice != undefined ? (practice.in_time) : ("")}</td>
                                                        <td>{this.betterFun(exam.in_time, practice.in_time, "intime")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-circle text-lightgrey mr-2"></i> Less time</td>
                                                        <td>{exam != undefined ? (exam.less_time) : ("")} </td>
                                                        <td>{practice != undefined ? (practice.less_time) : ("")} </td>
                                                        <td>{this.betterFun(exam.less_time, practice.less_time, "less")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-circle text-lightgrey mr-2"></i> Over time</td>
                                                        <td>{exam != undefined ? (exam.over_time) : ("")} </td>
                                                        <td>{practice != undefined ? (practice.over_time) : ("")} </td>
                                                        <td>{this.betterFun(exam.over_time, practice.over_time, "over")}</td>
                                                    </tr>

                                                    <tr>
                                                        <td><i className="fas fa-circle text-lightgrey mr-2"></i> Accuracy</td>
                                                        <td>{this.typewiseAccuracy(exam)} %</td>
                                                        <td>{this.typewiseAccuracy(practice)} %</td>
                                                        {/* <td>{exam != undefined ? (exam.accuracy) : ("")}</td>
                                                        <td>{practice != undefined ? (practice.accuracy) : ("")}</td> */}
                                                        <td>{this.betterFun(this.typewiseAccuracy(exam), this.typewiseAccuracy(practice))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="fas fa-circle text-lightgrey mr-2"></i> Speed</td>
                                                        <td>{this.Speed(exam, "exam")} Sec/per Q</td>
                                                        <td>{this.Speed(practice, "practice")} Sec/per Q </td>
                                                        {/* <td>{exam != undefined ? (parseInt(exam.accuracy / exam.total_time)) : ("")}</td> */}
                                                        {/* <td>{practice != undefined ? (parseInt(practice.accuracy / practice.total_time)) : ("")}</td> */}
                                                        <td>{this.betterFun(this.Speed(exam), this.Speed(practice), "speed")}</td>
                                                    </tr>
                                                </tbody>
                                                : null}

                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        <Button variant="link text-dark text-decoration-none" onClick={() => this.setState({ tableFive: !tableFive })}>
                                                            {/* <i className="far fa-minus-square fa-fw" /> Question Complexity Accuracy */}
                                                            {this.state.tableFive == true ? (
                                                                <React.Fragment>
                                                                    <i className="far fa-minus-square fa-fw" />Question Complexity Accuracy
                                                                </React.Fragment>
                                                            ) : (
                                                                    <React.Fragment>
                                                                        <i className="far fa-plus-square fa-fw" />Question Complexity Accuracy
                                                                    </React.Fragment>

                                                                )}
                                                        </Button>
                                                    </th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {tableFive ?

                                                <Suspense fallback={<tbody><tr className="text-center">Loading...</tr></tbody>}>
                                                    <Complexity
                                                        chapter_id={this.props.getData.ocid}
                                                        topic_id={this.props.getData.otid}

                                                    />
                                                </Suspense>
                                                : null}
                                            <Suspense fallback={<tbody><tr className="text-center">Loading...</tr></tbody>}>
                                                <ErrorExam
                                                chapter_id={this.props.getData.ocid}
                                                topic_id={this.props.getData.otid}
                                                tabfunction={this.tabfunction}
                                                    tableSix={this.state.tableSix} />
                                            </Suspense>


                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        <Button variant="link text-dark text-decoration-none" onClick={() => this.setState({ tableSeven: !tableSeven })}>
                                                            {/* <i className="far fa-minus-square fa-fw" /> Topic Accuracy */}

                                                            {this.state.tableSeven == true ? (
                                                                <React.Fragment>
                                                                    <i className="far fa-minus-square fa-fw" />Topic Accuracy
                                                                </React.Fragment>
                                                            ) : (
                                                                    <React.Fragment>
                                                                        <i className="far fa-plus-square fa-fw" />Topic Accuracy
                                                                    </React.Fragment>

                                                                )}
                                                        </Button>
                                                    </th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {tableSeven ?
                                                (
                                                    <Suspense fallback={<tbody><tr className="text-center">Loading...</tr></tbody>}>
                                                        <TopicAccuracy
                                                            chapter_id={this.props.getData.ocid}
                                                            topic_id={this.props.getData.otid}

                                                        />
                                                    </Suspense>)


                                                : null}
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </div >
        )
    }
}

export default withRouter(OverAllChapterStrengthSection);
