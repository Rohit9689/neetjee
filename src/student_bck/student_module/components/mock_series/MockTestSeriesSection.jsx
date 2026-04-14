import React, { Component } from 'react'
import { Container, Row, Col, Nav, Tab, Card, Image, Button } from 'react-bootstrap'

import "./_mock-test-series.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import mockImg from "../../../images/mocktext-img.png";
import PreloaderTwo from '../preloader/PreloaderTwo';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import moment from 'moment';
const FETCH_GETSERIES = gql` 
query($mobile: String) {
    getStudentTestSeries(mobile: $mobile){
        id
        exam_name
        exam_type
        exam_session_id
        sub_exam_type
        is_completed
        title
        short_name
        amount
        speed
        accuracy
        correct_marks
        negative_marks
        total_marks
        start_time
        end_time
        is_purchased
        exam_started
    }
}

`;

class MockTestSeriesSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complateMackTest: false,
            userRestionModalShow: false,
            exam_name: ""
        };
    }
    modalaFun = (exam_name) => {
        this.setState({
            userRestionModalShow: true,
            exam_name: exam_name
        });
    }
    examImage(examid) {

        if (examid == "1") {
            return (require('../../../images/Neet-Exam.png'));
        } else if (examid == "2") {
            return (require('../../../images/Jee(Mains)-Exam.png'));
        }
        else if (examid == "3" || examid == "6") {
            return (require('../../../images/tschelogo.png'));
        }
        else if (examid == "7" || examid == "8") {
            return (require('../../../images/Jntuk-logo.png'));
        }
    }
    startExam = (data) => {
        //console.log("this.state.subtype", id, this.state.subtype);
        let examname="";
        if(data.short_name!=""){
            examname=data.exam_name + " (" + data.short_name + ")";
        }
        else{
            examname=data.exam_name;
        }

        localStorage.setItem("sessionid", "0");
        localStorage.setItem("type", "Schedule Exam");
        localStorage.setItem("stype", "schedule_exam");
        localStorage.setItem("exam_paper_id", data.id);
        localStorage.setItem("etype", "schedule");
        localStorage.setItem("examname", examname);
        //localStorage.setItem("subexamtype", this.state.subtype);

       window.open("/student/subject/series_test", "_blank");

        // this.props.history.push({
        //     pathname: "/student/subject/series_test",

        // })
        this.props.history.push({
            pathname: "/student/home",

        })

    }

    handleResultFunction = (id) => {
        this.props.history.push({
            pathname: "/student/subject/exam-result",
            state: {
                sessionid: id,
                examtype: "series_test"
            }
        })
    }
    handleViewQuestionanswer = (id) => {
        this.props.history.push({
            pathname: "/student/view-question-answer",
            state: {
                htype: "history",
                sessionid: id,
                examtype: "series_test"
            }
        })
    }
    graphValue(getseries) {
        let data = "";
        if (getseries != undefined) {
            data = parseInt(getseries.correct_marks) - parseInt(getseries.negative_marks);
        }
        //console.log("graphValue123", data);
        return data;

    }
    paymentFun = (data) => {
        this.props.history.push({
            pathname: "/student/moock-test-order-summary",
            state: {
                data: data

            }
        })

    }
    render() {
        const mockTest = [
            {
                id: 1,
                Fee: 'Free',
                complateMackTest: true,
                mockType: 'gredientOne',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 2,
                Fee: '299/-',
                complateMackTest: false,
                mockType: 'gredientTwo',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 3,
                Fee: '399/-',
                complateMackTest: false,
                mockType: 'gredientThree',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 4,
                Fee: '499/-',
                complateMackTest: false,
                mockType: 'gredientFour',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 5,
                Fee: '299/-',
                complateMackTest: false,
                mockType: 'gredientFive',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 6,
                Fee: '399/-',
                complateMackTest: false,
                mockType: 'gredientSix',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 7,
                Fee: '499/-',
                complateMackTest: false,
                mockType: 'gredientSeven',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
            {
                id: 8,
                Fee: '599/-',
                complateMackTest: false,
                mockType: 'gredientEight',
                gradName: '3HR Grand',
                testSeries: 'test Series - 02',
                mtsNo: 'MTS - 1',
                mockImg: require('../../../images/mocktext-img.png')
            },
        ];

        const getStudentTestSeries = this.props.getStudentTestSeries;
        const loading1 = getStudentTestSeries.loading;
        const error1 = getStudentTestSeries.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        console.log("getStudentTestSeries.getStudentTestSeries", getStudentTestSeries.getStudentTestSeries);
        if (loading1) {
            return (<PreloaderTwo />)
        }
        else {
            // let colors = ["gredientOne", "gredientTwo", "gredientThree", "gredientFour", "gredientFive", "gredientSix", "gredientSeven", "gredientEight"];

            let allMockExams = [];
            let completedMockExams = [];
            let notcompletedMockExams = [];

            let advallMockExams = [];
            let advcompletedMockExams = [];
            let advnotcompletedMockExams = [];


            if (Cookies.get("examid") == "1") {
                allMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.sub_exam_type == "0");
                completedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == true && a.sub_exam_type == "0");
                notcompletedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == false && a.sub_exam_type == "0");
            }
            else {
                allMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.sub_exam_type == "1");
                completedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == true && a.sub_exam_type == "1");
                notcompletedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == false && a.sub_exam_type == "1");

                advallMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.sub_exam_type == "2");
                advcompletedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == true && a.sub_exam_type == "1");
                advnotcompletedMockExams = getStudentTestSeries.getStudentTestSeries.filter((a) => a.is_completed == false && a.sub_exam_type == "2");
            }

            const nowdate = moment().unix();

            console.log("completedMockExams", allMockExams);
            return (
                <div className="mock-test-series-section">
                    <Container>
                        <Tab.Container id="previous-paper-analysis-tabs" defaultActiveKey="first">
                            <Row className="align-items-center mb-3">
                                <Col xl={6} lg={6} md={12}>
                                    {Cookies.get("examid") == "1" ? (
                                        <React.Fragment>
                                            <h1 className="title h5 my-2 font-weight-bold mock-text-color">NEET Mock Tests</h1>

                                            <div>
                                                Based On NEET Exam pattern by NTA
                                                </div>
                                        </React.Fragment>

                                    )
                                        : Cookies.get("examid") == "2" ? (
                                            <React.Fragment>
                                                <h1 className="title h5 my-2 font-weight-bold mock-text-color">JEE Mains Mock Tests</h1>

                                                <div>
                                                    Based On JEE 2021 exam pattern by NTA
                                                </div>
                                            </React.Fragment>

                                        )
                                            : ("")}


                                </Col>

                                <Col xl={6} lg={12} md={12}>
                                    <Row className="align-items-center my-2">
                                        <Col sm={8}>
                                            <Nav variant="pills" className="my-1 flex-row">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">All Tests</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Not Started</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="three" >Completed</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={4}><Link
                                            to={{
                                                pathname: "/student/subject/exam-history",
                                                state: {
                                                    examtype: "test_series",
                                                }
                                            }}
                                            className="my-1 btn-darkblue-outline text-capitalize text-decoration-none">Mock Test History</Link></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {allMockExams.length > 0 ? (
                                        <Row>

                                            {allMockExams.map((getseries) => {
                                                return (
                                                    <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                        <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                            <div className="mocktest-content text-center">
                                                                <div className="mocktest-fee text-center mb-3">
                                                                    {
                                                                        getseries.amount == "0" ? (
                                                                            <React.Fragment>
                                                                                {getseries.is_purchased == true ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                            <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                        )}
                                                                                    </React.Fragment>

                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                    )}
                                                                            </React.Fragment>
                                                                        ) : (
                                                                                <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                            )
                                                                    }


                                                                </div>
                                                                <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                <Image src={mockImg} alt="img" width="150" />
                                                                {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? 
                                                                (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}
                                                            </div>

                                                            {/* Mock Test Complete After Status Area */}

                                                            {
                                                                getseries.is_completed == true ?
                                                                    <div className="overlay-mocktest">
                                                                        <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                            <Row noGutters={true}>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 score">
                                                                                        <Card.Text className="text-white">Score</Card.Text>
                                                                                        <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 avgtime">
                                                                                        <Card.Text>AVG Time/Q</Card.Text>
                                                                                        <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Card as={Card.Body} className=" p-2 accurancy">
                                                                                        <Card.Text>Accuracy</Card.Text>
                                                                                        <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            }
                                        </Row>
                                    ) : (<div className="d-flex justify-content-center">
                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No {Cookies.get("examid") == "1" ? ("NEET") : ("JEE Mains")} Mock Tests Available</p>

                                    </div>)}

                                    {/* {Cookies.get("examid") != "1" ? (
                                        <React.Fragment>
                                            <Row className="align-items-center mb-3">
                                                <Col xl={6} lg={6} md={12}>
                                                    <h1 className="title h5 my-2 font-weight-bold mock-text-color">JEE Advance Mock Tests</h1>
                                                    <div>
                                                        Based On JEE 2021 exam pattern by NTA
                                                    </div>
                                                </Col>
                                            </Row>
                                            {advallMockExams.length > 0 ? (


                                                <Row>

                                                    {advallMockExams.map((getseries) => {
                                                        return (
                                                            <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                                <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                                    <div className="mocktest-content text-center">
                                                                        <div className="mocktest-fee text-center mb-3">
                                                                            {
                                                                                getseries.amount=="0" ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.is_purchased == true ? (
                                                                                            <React.Fragment>
                                                                                                {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                                    <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                                )}
                                                                                            </React.Fragment>

                                                                                        ) : (
                                                                                                <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                            )}
                                                                                    </React.Fragment>
                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                                    )
                                                                            }

                                                                        </div>
                                                                        <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                        <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                        <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                        <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                        <Image src={mockImg} alt="img" width="150" />
                                                                        {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}

                                                                    </div>

                                                                    

                                                                    {
                                                                        getseries.is_completed == true ?
                                                                            <div className="overlay-mocktest">
                                                                                <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                                    <Row noGutters={true}>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 score">
                                                                                                <Card.Text className="text-white">Score</Card.Text>
                                                                                                <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 avgtime">
                                                                                                <Card.Text>AVG Time/Q</Card.Text>
                                                                                                <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Card as={Card.Body} className=" p-2 accurancy">
                                                                                                <Card.Text>Accuracy</Card.Text>
                                                                                                <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                                    }
                                                </Row>

                                            ) : (<div className="d-flex justify-content-center">
                                                <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No JEE Advance Mock Tests Available</p>

                                            </div>)}
                                        </React.Fragment>
                                    ) : ("")} */}


                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {notcompletedMockExams.length > 0 ? (
                                        <Row>

                                            {notcompletedMockExams.map((getseries) => {
                                                // mockTest.map((item, index) => {
                                                // const { mockType, complateMackTest, Fee, gradName, testSeries, mtsNo, mockImg } = item;
                                                return (
                                                    <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                        <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                            <div className="mocktest-content text-center">
                                                                <div className="mocktest-fee text-center mb-3">
                                                                    {
                                                                        getseries.amount == "0" ? (
                                                                            <React.Fragment>
                                                                                {getseries.is_purchased == true ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                            <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                        )}
                                                                                    </React.Fragment>

                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                    )}
                                                                            </React.Fragment>
                                                                        ) : (
                                                                                <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                            )
                                                                    }
                                                                </div>
                                                                <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                <Image src={mockImg} alt="img" width="150" />
                                                                {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}

                                                            </div>

                                                            {/* Mock Test Complete After Status Area */}

                                                            {
                                                                getseries.is_completed == true ?
                                                                    <div className="overlay-mocktest">
                                                                        <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                            <Row noGutters={true}>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 score">
                                                                                        <Card.Text className="text-white">Score</Card.Text>
                                                                                        <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 avgtime">
                                                                                        <Card.Text>AVG Time/Q</Card.Text>
                                                                                        <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Card as={Card.Body} className=" p-2 accurancy">
                                                                                        <Card.Text>Accuracy</Card.Text>
                                                                                        <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            }
                                        </Row>
                                    ) : (<div className="d-flex justify-content-center">
                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No {Cookies.get("examid") == "1" ? ("NEET") : ("JEE Mains")} Mock Tests Available</p>

                                    </div>)}

                                    {/* {Cookies.get("examid") != "1" ? (
                                        <React.Fragment>
                                            <Row className="align-items-center mb-3">
                                                <Col xl={6} lg={6} md={12}>
                                                    <h1 className="title h5 my-2 font-weight-bold mock-text-color">JEE Advance Mock Tests</h1>
                                                    <div>
                                                        Based On JEE 2021 exam pattern by NTA
                                                    </div>
                                                </Col>
                                            </Row>
                                            {advnotcompletedMockExams.length > 0 ? (
                                                <Row>

                                                    {advnotcompletedMockExams.map((getseries) => {
                                                        
                                                        return (
                                                            <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                                <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                                    <div className="mocktest-content text-center">
                                                                        <div className="mocktest-fee text-center mb-3">
                                                                            {
                                                                                getseries.amount=="0" ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.is_purchased == true ? (
                                                                                            <React.Fragment>
                                                                                                {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                                    <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                                )}
                                                                                            </React.Fragment>

                                                                                        ) : (
                                                                                                <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                            )}
                                                                                    </React.Fragment>
                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                        <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                        <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                        <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                        <Image src={mockImg} alt="img" width="150" />
                                                                        {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}

                                                                    </div>

                                                                    

                                                                    {
                                                                        getseries.is_completed == true ?
                                                                            <div className="overlay-mocktest">
                                                                                <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                                    <Row noGutters={true}>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 score">
                                                                                                <Card.Text className="text-white">Score</Card.Text>
                                                                                                <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 avgtime">
                                                                                                <Card.Text>AVG Time/Q</Card.Text>
                                                                                                <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Card as={Card.Body} className=" p-2 accurancy">
                                                                                                <Card.Text>Accuracy</Card.Text>
                                                                                                <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                                    }
                                                </Row>
                                            ) : (<div className="d-flex justify-content-center">
                                                <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No JEE Advance Mock Tests Available</p>

                                            </div>)}
                                        </React.Fragment>
                                    ) : ("")} */}


                                </Tab.Pane>
                                <Tab.Pane eventKey="three">
                                    {completedMockExams.length > 0 ? (
                                        <Row>

                                            {completedMockExams.map((getseries) => {
                                                // mockTest.map((item, index) => {
                                                // const { mockType, complateMackTest, Fee, gradName, testSeries, mtsNo, mockImg } = item;
                                                return (
                                                    <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                        <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                            <div className="mocktest-content text-center">
                                                                <div className="mocktest-fee text-center mb-3">
                                                                    {
                                                                        getseries.amount == "0" ? (
                                                                            <React.Fragment>
                                                                                {getseries.is_purchased == true ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                            <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                        )}
                                                                                    </React.Fragment>

                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                    )}
                                                                            </React.Fragment>
                                                                        ) : (
                                                                                <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                            )
                                                                    }
                                                                </div>
                                                                <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                <Image src={mockImg} alt="img" width="150" />
                                                                {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}
                                                            </div>

                                                            {/* Mock Test Complete After Status Area */}

                                                            {
                                                                getseries.is_completed == true ?
                                                                    <div className="overlay-mocktest">
                                                                        <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                            <Row noGutters={true}>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 score">
                                                                                        <Card.Text className="text-white">Score</Card.Text>
                                                                                        <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    <Card as={Card.Body} className=" p-2 avgtime">
                                                                                        <Card.Text>AVG Time/Q</Card.Text>
                                                                                        <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Card as={Card.Body} className=" p-2 accurancy">
                                                                                        <Card.Text>Accuracy</Card.Text>
                                                                                        <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                    </Card>
                                                                                </Col>
                                                                                <Col xs={12}>
                                                                                    <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                            }
                                        </Row>
                                    ) : (<div className="d-flex justify-content-center">
                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No {Cookies.get("examid") == "1" ? ("NEET") : ("JEE Mains")} Mock Tests Available</p>

                                    </div>)}
                                    {/* {Cookies.get("examid") != "1" ? (
                                        <React.Fragment>
                                            <Row className="align-items-center mb-3">
                                                <Col xl={6} lg={6} md={12}>
                                                    <h1 className="title h5 my-2 font-weight-bold mock-text-color">JEE Advance Mock Tests</h1>
                                                    <div>
                                                        Based On JEE 2021 exam pattern by NTA
                                                    </div>
                                                </Col>
                                            </Row>

                                            {advcompletedMockExams.length > 0 ? (
                                                <Row>
                                                    {advcompletedMockExams.map((getseries) => {
                                                        return (
                                                            <Col key={getseries.id} xl={3} lg={4} md={6} sm={6}>
                                                                <Card as={Card.Body} className={`signle-mocktest p-0 border-0 shadow-sm gredientFour`}>
                                                                    <div className="mocktest-content text-center">
                                                                        <div className="mocktest-fee text-center mb-3">
                                                                            {
                                                                                getseries.amount=="0" ? (
                                                                                    <React.Fragment>
                                                                                        {getseries.is_purchased == true ? (
                                                                                            <React.Fragment>
                                                                                                {getseries.amount == "0" ? (<h5 className="text-white text-uppercase py-2">Free</h5>) : (
                                                                                                    <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                                )}
                                                                                            </React.Fragment>

                                                                                        ) : (
                                                                                                <h5 className="text-white text-uppercase py-2">{getseries.amount} /-</h5>
                                                                                            )}
                                                                                    </React.Fragment>
                                                                                ) : (
                                                                                        <h5 className="text-white text-uppercase py-2">Premium</h5>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <h5 className="grad text-white text-uppercase mb-0">{getseries.title}</h5>
                                                                        <h1 className="mock text-uppercase mock-text-color mb-0">Mock</h1>
                                                                        <h5 className="test-series text-uppercase mock-text-color mb-0">{getseries.exam_name}</h5>
                                                                        <h6 className="text-uppercase font-weight-normal mock-text-color2">{getseries.short_name}</h6>
                                                                        <Image src={mockImg} alt="img" width="150" />
                                                                        {getseries.exam_started==false ? 
                                                                (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Available From {moment.unix(getseries.start_time).format("DD/MM/YYYY")}</Button>)
                                                                : getseries.amount == "0" || getseries.is_purchased == true ? (<Button className="mt-3" onClick={() => this.startExam(getseries)} block>Start Mock Test</Button>)
                                                                : (<Button className="mt-3" onClick={() => this.modalaFun(getseries.exam_name)} block>Buy Now</Button>)}
                                                                    </div>

                                                                    

                                                                    {
                                                                        getseries.is_completed == true ?
                                                                            <div className="overlay-mocktest">
                                                                                <div className="overlay-mocktest-content m-2" style={{ width: "92%" }}>
                                                                                    <Row noGutters={true}>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 score">
                                                                                                <Card.Text className="text-white">Score</Card.Text>
                                                                                                <Card.Title className="text-white">{this.graphValue(getseries)} <small>/ {getseries.total_marks}</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                            <Card as={Card.Body} className=" p-2 avgtime">
                                                                                                <Card.Text>AVG Time/Q</Card.Text>
                                                                                                <Card.Title>{getseries.speed} <small>Sec</small></Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Card as={Card.Body} className=" p-2 accurancy">
                                                                                                <Card.Text>Accuracy</Card.Text>
                                                                                                <Card.Title>{getseries.accuracy}%</Card.Title>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs={12}>
                                                                                            <Button className="mt-3" onClick={() => this.handleResultFunction(getseries.exam_session_id)} block>View Report</Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                                    }
                                                </Row>
                                            ) : (<div className="d-flex justify-content-center">
                                                <p className="color_dark_red font_14 font-weight-bold text-center mb-0">No JEE Advance Mock Tests Available</p>

                                            </div>)}
                                        </React.Fragment>
                                    ) : ("")} */}


                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Container>
                    <UserRestrictionAlert
                        show={this.state.userRestionModalShow}
                        onHide={() => this.setState({ userRestionModalShow: false })}
                    />
                </div>
            )
        }

    }
}
export default withRouter(compose(
    graphql(FETCH_GETSERIES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "getStudentTestSeries"
        })
)(MockTestSeriesSection));