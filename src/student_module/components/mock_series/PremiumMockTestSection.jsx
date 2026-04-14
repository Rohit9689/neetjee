import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import moment from 'moment';
const FETCH_GETSERIES = gql` 
query($mobile: String,
    $free: Boolean,
    $premium: Boolean) {
    getStudentTestSeries(mobile: $mobile,
        free: $free,
        premium: $premium){
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
        is_scheduled
        is_registered
        exam_expired

        exam_duration
        syllabus
    }
}

`;
class PremiumMockTestSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complateMackTest: false,
            userRestionModalShow: false,
            exam_name: "",
            regstatus: 1
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
        console.log("this.state.subtype", data.exam_name, data.exam_name);
        let examname = "";
        if (data.short_name != "") {
            examname = data.exam_name + " (" + data.short_name + ")";
        }
        else {
            examname = data.exam_name;
        }

        localStorage.setItem("sessionid", "0");
        localStorage.setItem("type", "Schedule Exam");
        localStorage.setItem("stype", "schedule_exam");
        localStorage.setItem("exam_paper_id", data.id);
        localStorage.setItem("etype", "schedule");
        localStorage.setItem("examname", examname);
        localStorage.setItem("mocktest", true);

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
                mockBtbOne: 'mock-complated',
                mockBtbTwo: 'mock-teststart',
                Fee: 'Complated',
                MackTestdefault: false,
                mackTestSubscribe: false,
                complateMackTest: true,
                availableMackTest: false,
                mockType: '',
                testSeries: 'Mock Test - 01',
                mockComplated: 'mock-complated',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
            },
            {
                id: 2,
                mockBtbOne: '',
                mockBtbTwo: 'mock-teststart',
                Fee: 'Free!',
                MackTestdefault: true,
                mackTestSubscribe: false,
                complateMackTest: false,
                availableMackTest: false,
                mockType: 'active',
                testSeries: 'Mock Test - 02',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
            },
            {
                id: 3,
                mockBtbOne: '',
                mockBtbTwo: 'mock-complated',
                Fee: 'Free!',
                MackTestdefault: false,
                mackTestSubscribe: true,
                complateMackTest: false,
                availableMackTest: false,
                mockType: '',
                testSeries: 'Mock Test - 03',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
            },
            {
                id: 4,
                mockBtbOne: '',
                mockBtbTwo: 'mock-teststart',
                Fee: '299/-',
                MackTestdefault: true,
                mackTestSubscribe: false,
                complateMackTest: false,
                availableMackTest: false,
                mockType: '',
                testSeries: 'Mock Test - 04',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
            },
            {
                id: 5,
                mockBtbOne: '',
                mockBtbTwo: 'mock-complated',
                Fee: '399/-',
                MackTestdefault: false,
                mackTestSubscribe: false,
                complateMackTest: false,
                availableMackTest: true,
                mockType: '',
                testSeries: 'Mock Test - 05',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
            },
            {
                id: 6,
                mockBtbOne: '',
                mockBtbTwo: 'mock-complated',
                Fee: '4999/-',
                MackTestdefault: false,
                mackTestSubscribe: false,
                complateMackTest: false,
                availableMackTest: true,
                mockType: '',
                testSeries: 'Mock Test - 06',
                duration: '180 Min',
                mockImg: require('../../../images/mock-test-pad.png')
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
        // console.log("getStudentTestSeries.getStudentTestSeries", getStudentTestSeries.getStudentTestSeries);
        let premiumData = getStudentTestSeries.getStudentTestSeries;
        if (loading1) {
            return (<Row className="my-3">
                <Col xs={12}>
                    <h1 className="mock-text-color h5 text-uppercase">Premium : Unlimited Mock Tests</h1>
                </Col>
                <Col>
                    <Card as={Card.Body} className="free-mock justify-content-center flex-row">

                        <div class="spinner-border text-primary text-center"></div>

                    </Card>
                </Col>
            </Row>)
        }
        else {
            return (
                <Row className="mockpackage_list my-4">
                    <Col xs={12}>
                        <h1 className="mock-text-color h5 text-uppercase">Premium : Unlimited Mock Tests</h1>
                    </Col>
                    <Col>
                        <Card as={Card.Body} className="mockpackage_list_card">
                            {premiumData.length > 0 ? (
                                <Row>
                                    {
                                        premiumData.map((item, index) => {
                                            //console.log("premiumData", item);
                                            return (
                                                <Col key={index} xl={2} lg={3} md={4} sm={6} xs={6}>
                                                    <Card as={Card.Body} className="signle-mocktest p-3">
                                                        {item.is_completed == true ? (
                                                            <div className="planTitle text-uppercase text-center text-white rounded mock-complated">Completed</div>
                                                        ) : (
                                                                <React.Fragment>
                                                                    {
                                                                        item.amount == "0" ? (
                                                                            <React.Fragment>
                                                                                {item.is_purchased == true ? (
                                                                                    <React.Fragment>
                                                                                        {item.amount == "0" ? (

                                                                                            <div className="planTitle text-uppercase text-center text-white rounded">Free</div>
                                                                                        ) : (

                                                                                                <div className="planTitle text-uppercase text-center text-white rounded">{item.amount} /-</div>
                                                                                            )}
                                                                                    </React.Fragment>

                                                                                ) : (
                                                                                        <div className="planTitle text-uppercase text-center text-white rounded">{item.amount} /-</div>
                                                                                    )}
                                                                            </React.Fragment>
                                                                        ) : (

                                                                                <div className="planTitle text-uppercase text-center text-white rounded">Premium</div>
                                                                            )
                                                                    }
                                                                </React.Fragment>
                                                            )}

                                                        <div className="mocktest-content text-center pt-3">
                                                            {/* <h5 className="mock text-uppercase mock-text-color mb-0">Grand</h5> */}
                                                            <h5 className="test-series text-uppercase mock-text-color mb-0">{item.exam_name}</h5>
                                                            <p className="text-uppercase font-weight-normal mock-text-color">{item.exam_duration}</p>
                                                            {
                                                                item.exam_session_id != 0 ? (
                                                                    <React.Fragment>
                                                                        <Card as={Card.Body} className="my-3 mockavgtime-card border-0 bg-darkblue p-1 text-center">
                                                                            <ul className="list-inline dot-circle pr-1 mb-1">
                                                                                <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                            </ul>
                                                                            <h6 className="status-subtitle mb-0">Score</h6>
                                                                            <h1 className="status-title mb-0">{this.graphValue(item)} <small>/ {item.total_marks}</small></h1>
                                                                        </Card>
                                                                        <Button className={`mt-3 btn-mock mock-teststart`} onClick={() => this.handleResultFunction(item.exam_session_id)}>View Result</Button>
                                                                    </React.Fragment>
                                                                )
                                                                    :
                                                                    item.is_purchased ?
                                                                        (
                                                                            <>
                                                                                {
                                                                                    item.exam_started ? (
                                                                                        <React.Fragment>
                                                                                            <Image src={require('../../../images/mock-test-pad.png')} alt="img" className="my-3" width="100" />
                                                                                            <Button className={`mt-3 btn-mock mock-teststart`} onClick={() => this.startExam(item)}>Start Test</Button>
                                                                                        </React.Fragment>
                                                                                    )
                                                                                        :
                                                                                        (
                                                                                            <React.Fragment>
                                                                                                <Card as={Card.Body} className="my-3 mockavailable-card border-0 bg-darkblue p-x-1 py-2 text-center text-white">
                                                                                                    <h6 className="mockavailable-title">Available</h6>
                                                                                                    <div className="date-block">
                                                                                                        <div className="month">{moment.unix(item.start_time).format("MMM")}</div>
                                                                                                        <div className="divider" />
                                                                                                        <div className="date">{moment.unix(item.start_time).format("DD")}</div>
                                                                                                    </div>
                                                                                                </Card>
                                                                                                <Button className={`mt-3 btn-mock mock-complated`}>Coming Soon</Button>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                }
                                                                            </>

                                                                        )
                                                                        :
                                                                        (
                                                                            <React.Fragment>
                                                                                <div className="mackTestSubscribe my-3">
                                                                                    <Image src={require('../../../images/mock-test-pad.png')} alt="img" width="100" />
                                                                                </div>
                                                                                <Button onClick={() => this.modalaFun(item.exam_name)} className={`mt-3 btn-mock mock-complated`}>Subscribe</Button>
                                                                            </React.Fragment>
                                                                        )
                                                            }


                                                        </div>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            ) : (
                                   
                                        <div className="justify-content-center flex-row text-danger">
                                            No Premium Mock Tests
                                                </div>
                                    
                                )}

                        </Card>
                    </Col>
                    <UserRestrictionAlert
                        show={this.state.userRestionModalShow}
                        onHide={() => this.setState({ userRestionModalShow: false })}
                    />
                </Row>
            )
        }
    }
}
export default withRouter(compose(
    graphql(FETCH_GETSERIES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    free: false,
                    premium: true
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "getStudentTestSeries"
        })
)(PremiumMockTestSection));