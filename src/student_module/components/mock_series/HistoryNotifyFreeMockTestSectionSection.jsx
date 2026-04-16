import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import "./_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import moment from 'moment';

const MOCKTEST_REGISTER = gql`
  mutation($mobile: String!,
    $exam_id: Int!) {
    registerForExam(mobile: $mobile,exam_id: $exam_id)
  }
`;



class HistoryNotifyFreeMockTestSectionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complateMackTest: false,
            userRestionModalShow: false,
            exam_name: "",
            getStudentTestSeries: props.getStudentTestSeries,
            currentTime: moment().unix()

        };
    }
    componentDidMount() {
        let Schedule = this.state.getStudentTestSeries.filter((a) => a.is_scheduled == "1" && a.exam_expired == false && a.exam_session_id == 0);
        let islive = Schedule.find((a) => a.exam_started == true && a.is_completed == false);

        if (islive != undefined) {
            const end_time = islive.end_time;
            const currentTime = this.state.currentTime;
            //console.log("comislive", end_time, currentTime);
            this.timer = setInterval(() => {
                this.setState({ currentTime: moment().unix() });

                if (currentTime >= end_time) {
                    console.log("comislive", end_time, currentTime);
                    clearInterval(this.timer);
                }

            }, 60000);
        }



    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    modalaFun = (exam_name) => {
        this.setState({
            userRestionModalShow: true,
            exam_name: exam_name
        });
    }

    startExam = (data) => {
        //console.log("this.state.subtype", id, this.state.subtype);
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
                examtype: "series_test",
                mocktype:"history"
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

    register = async (e, id) => {

        e.preventDefault();
        await this.props.register({
            variables: {
                mobile: Cookies.get("mobile"),
                exam_id: parseInt(id)
            },
            update: (store, { data }) => {
                const getdata = this.state.getStudentTestSeries.map((item) => {
                    if (item.id == id) {
                        console.log("true", item.id, id);
                        return { ...item, is_registered: true }
                    }
                    return { ...item }
                })
                console.log("store", getdata);
                this.state.getStudentTestSeries = getdata;

                if (data.registerForExam) {
                    this.setState({
                        regstatus: 2
                    })
                    setTimeout(() => {
                        this.RegisterSetpageLoad();
                    }, 1000);
                }
            }
        });
    };
    RegisterSetpageLoad = () => {

        this.setState({ regstatus: 1 });
    };

    render() {
        let freeSchedule = this.state.getStudentTestSeries.filter((a) =>a.exam_expired == true || a.is_completed == true);
        // let Schedule = this.state.getStudentTestSeries.filter((a) => a.is_scheduled == "1" && a.exam_expired == false && a.exam_session_id == 0);
        //let islive = Schedule.find((a) => a.exam_started == true && a.is_completed == false);

        return (
            <Row className="my-3">
                <Col xs={12}>
                    <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Mock Tests</h1>
                </Col>
                <Col>
                    {this.state.regstatus == 2 ? (<div className="text-success mb-2">
                        Mock Test Registered Successfully
                    </div>) : ("")}
                    <Card as={Card.Body} className="free-mock p-2">
                        <Row>
                            <Col xl={12} lg={12} md={12} className="card-left mb-3">
                                <ul className="list-unstyled">
                                    {freeSchedule.length > 0 ? (<React.Fragment>
                                        {freeSchedule.map((a) => {
                                            console.log("freeSchedule", a);
                                            return (
                                                <li>
                                                    <Card as={Card.Body} className="p-2 single-card">
                                                        <Row className="g-0">
                                                            <Col xl={9} lg={8} md={12}>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="img-block text-center mr-2">
                                                                        <Image className="mb-2" src={require('../../../images/mock-test-pad.png')} alt="img" width="60" />
                                                                       

                                                                    </div>
                                                                    <div className="card-content">
                                                                        <h6 className="title text-uppercase">{a.exam_name}</h6>
                                                                        <p>Duration: {a.exam_duration}</p>
                                                                        <p>Syllabus: {a.syllabus}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={3} lg={4} md={12}>
                                                                <Row className="align-items-center">

                                                                    {a.is_completed == true ? (
                                                                        <React.Fragment>
                                                                            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(a.exam_session_id)} className="freemock-score-card border-0 bg-darkblue p-1 text-center text-white">
                                                                                    <ul className="list-inline dot-circle pr-2 mb-1">
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                    </ul>
                                                                                    <h6 className="status-subtitle mb-0">Score</h6>
                                                                                    <h1 className="status-title mb-0">{this.graphValue(a)} <small>/ {a.total_marks}</small></h1>
                                                                                </Card>
                                                                            </Col>
                                                                            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(a.exam_session_id)} className="freemock-avgtime-card border-0 bg-warning p-1 text-center">
                                                                                    <ul className="list-inline dot-circle pr-1 mb-1">
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                    </ul>
                                                                                    <h6 className="status-subtitle mb-0">AVG Time / Q</h6>
                                                                                    <h1 className="status-title mb-0">{a.speed} <small> Sec</small></h1>
                                                                                </Card>
                                                                            </Col>
                                                                            <Col xs={12}>
                                                                            {a.is_completed == true ? (<Button onClick={() => this.handleResultFunction(a.exam_session_id)} className="mock-btn mt-2 w-100" > View Result</Button>)
                                                                            : (<Button className="mock-btn  mt-2 w-100" onClick={() => this.startExam(a)}> Start Test</Button>)}
                                                                            </Col>
                                                                        </React.Fragment>) : (

                                                                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                                                <h1 className="live-text text-uppercase d-flex align-items-center"> <i className="fas fa-circle text-danger mb-1 mr-1" /> <span>Test Missed</span></h1>
                                                                            </Col>
                                                                                
                                                                           
                                                                        )}
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </li>
                                    )

                                        })}
                                    </React.Fragment>) : (
                                            <li className="text-danger">
                                    No Live Mock Tests
                                            </li>
                                        )}
                                </ul>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row >
        )


    }
}
export default withRouter(compose(

    graphql(MOCKTEST_REGISTER, {
        name: "register"
    })
)(HistoryNotifyFreeMockTestSectionSection));