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



class NotifyFreeMockTestSectionSection extends Component {
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

    startExam = (data, islive, type) => {
        console.log("startExam", data, islive, type);
        if (type == "free") {
            if (islive == undefined) {
                localStorage.setItem("mocklivestatus", "live");
            }
            else {
                localStorage.setItem("mocklivestatus", "");
            }
        }
        else if (type == "schedule") {
            if (islive != undefined) {
                localStorage.setItem("mocklivestatus", "live");
            }
            else {
                localStorage.setItem("mocklivestatus", "");
            }
        }

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
        let freeSchedule = this.state.getStudentTestSeries.filter((a) => a.is_scheduled == "0" && a.amount == "0");
        let Schedule = this.state.getStudentTestSeries.filter((a) => a.is_scheduled == "1" && a.exam_expired == false && a.exam_session_id == 0);
        let islive = Schedule.find((a) => a.exam_started == true && a.is_completed == false);
        //console.log("islive", islive);
        let existingTime = '';
        if (islive != undefined) {
            const end_time = islive.end_time;
            const currentTime = this.state.currentTime;
            //console.log("existingTime1", end_time, currentTime);
            let diff = end_time - currentTime;


            if (diff > 0) {
                let hours = parseInt(diff / 3600);
                let min = parseInt((diff % 3600) / 60);

                hours = hours < 10 ? `0${hours}` : hours;
                min = min < 10 ? `0${min}` : min;

                existingTime = `${hours} : ${min}`;
            }

        }
        // console.log("existingTime", existingTime);

        return (
            <Row className="justify-content-center">
                <Col xl={8} lg={8} md={12}>
                    <Row className="my-3">
                        <Col xs={12}>
                            <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Free: Mock Tests</h1>
                        </Col>
                        <Col>
                            {this.state.regstatus == 2 ? (<div className="text-success mb-2">
                                Mock Test Registered Successfully
                            </div>) : ("")}
                            <Card as={Card.Body} className="free-mock p-2">
                                <Row>
                                    <Col xl={12} lg={12} md={12} className="card-left mb-3">
                                        <ul className="list-unstyled">
                                            {Schedule.map((smap, index) => {
                                                if (index == 0) {
                                                    return (<li>
                                                        <Card as={Card.Body}
                                                            className={smap.exam_started == true && smap.is_completed == false ? ("p-2 single-card active") : ("p-2 single-card")}>
                                                            <Row className="align-items-center" >
                                                                <Col xl={7} lg={7} md={12}>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="img-block text-center mr-2">
                                                                            <Image className="mb-2" src={require('../../../images/mock-test-pad.png')} alt="img" width="80" />
                                                                        </div>
                                                                        <div className="card-content">
                                                                            <h6 className="title text-uppercase">{smap.exam_name} {smap.exam_started == true && smap.is_completed == false ? ("") : (<span>Free</span>)}</h6>
                                                                            <p>Duration: {smap.exam_duration}</p>
                                                                            <p>Syllabus: {smap.syllabus}</p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={5} lg={5} md={12} className="d-flex justify-content-between align-items-center">
                                                                    {smap.exam_started == true && smap.is_completed == true ? (
                                                                        <React.Fragment>
                                                                            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(smap.exam_session_id)} className="freemock-score-card border-0 bg-darkblue p-1 text-center text-white">
                                                                                    <ul className="list-inline dot-circle pr-2 mb-1">
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                    </ul>
                                                                                    <h6 className="status-subtitle mb-0">Score</h6>
                                                                                    <h1 className="status-title mb-0">{this.graphValue(smap)} <small>/ {smap.total_marks}</small></h1>
                                                                                </Card>
                                                                            </Col>
                                                                            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(smap.exam_session_id)} className="freemock-avgtime-card border-0 bg-warning p-1 text-center">
                                                                                    <ul className="list-inline dot-circle pr-1 mb-1">
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                        <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                    </ul>
                                                                                    <h6 className="status-subtitle mb-0">AVG Time / Q</h6>
                                                                                    <h1 className="status-title mb-0">{smap.speed} <small> Sec</small></h1>
                                                                                </Card>
                                                                            </Col>
                                                                        </React.Fragment>
                                                                    ) : ("")}
                                                                    {smap.exam_started == true && smap.is_completed == false ? (
                                                                        <React.Fragment>
                                                                            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                                                                <h1 className="live-text text-uppercase d-flex align-items-center"> <i className="fas fa-circle text-danger mb-1 mr-1" /> <span>Live</span></h1>
                                                                            </Col>
                                                                            <h2 className="mx-2 text-uppercase live-time w-100 text-center">TEST ENDS IN (HH:MM)<br /><small style={{ fontWeight: "bold" }}>{existingTime}</small></h2>
                                                                        </React.Fragment>

                                                                    ) : (
                                                                            <React.Fragment>
                                                                                <div className="date-block">
                                                                                    <div className="month text-white px-2">{moment.unix(smap.start_time).format("MMM")}</div>
                                                                                    <div className="divider" />
                                                                                    <div className="date text-white px-2">{moment.unix(smap.start_time).format("DD")}</div>
                                                                                </div>
                                                                                <h2 className="mx-2 text-uppercase live-time w-100 text-center">LIVE FROM <br /><small>{moment.unix(smap.start_time).format("LT")} to {moment.unix(smap.end_time).format("LT")}</small></h2>
                                                                            </React.Fragment>

                                                                        )}

                                                                    {smap.exam_started == false ?
                                                                        (
                                                                            <React.Fragment>
                                                                                {smap.is_registered == true ? (<Button className="mock-registered" >Registered</Button>) : (
                                                                                    <Button className="mock-btn" onClick={(e) => this.register(e, smap.id)} >Register</Button>
                                                                                )}
                                                                            </React.Fragment>

                                                                        )
                                                                        : smap.exam_expired == true ? (<Button className="mock-btn" >Exam Expired</Button>)
                                                                            : smap.amount == "0" || smap.is_purchased == true ?
                                                                                (<Button className="mock-btn"
                                                                                    onClick={() => this.startExam(smap, islive, "schedule")}

                                                                                    >Start Test</Button>)
                                                                                : (<Button className="mock-btn" onClick={() => this.modalaFun(smap.exam_name)} >Buy Now</Button>)}
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </li>)
                                                }

                                            })}

                                        </ul>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12} className="card-right d-none d-xl-block d-lg-block">
                                        <h6 className="mock-text-color text-uppercase">Upcoming</h6>
                                        <ul className="list-unstyled">
                                            {Schedule.length - 1 > 0 ? (
                                                <React.Fragment>
                                                    {Schedule.map((smap1, index) => {
                                                        if (index != 0) {
                                                            return (
                                                                <li>
                                                                    <Card as={Card.Body} className="p-2 py-1 single-card">
                                                                        <Row className="align-items-center">
                                                                            <Col xl={9} lg={9} md={12}>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="img-block text-center mr-2">
                                                                                        <Image className="mb-2" src={require('../../../images/mock-test-pad.png')} alt="img" width="60" />
                                                                                    </div>
                                                                                    <div className="card-content">
                                                                                        <h6 className="title text-uppercase mb-0">{smap1.exam_name} <span>Free</span></h6>
                                                                                        <p>{smap1.exam_duration}</p>
                                                                                        <p>Available from &nbsp;
                                                                                    {moment.unix(smap1.start_time).format("Do")} {moment.unix(smap1.start_time).format("MMM")}
                                                                                            {/* {moment.unix(smap1.start_time).format("DD/MM/YYYY")} */}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xl={3} lg={3} md={12}>
                                                                                {/* <Button className="mock-btn">Register</Button> */}
                                                                                {smap1.exam_started == false ?
                                                                                    (
                                                                                        <React.Fragment>
                                                                                            {smap1.is_registered == true ? (<Button className="mt-3 mock-registered" >Registered</Button>) : (
                                                                                                <Button className="mock-btn" onClick={(e) => this.register(e, smap1.id)} >Register</Button>
                                                                                            )}
                                                                                        </React.Fragment>

                                                                                    )
                                                                                    : smap1.exam_expired == true ? (<Button className="mt-3" >Exam Expired</Button>)
                                                                                        : smap1.amount == "0" || smap1.is_purchased == true ?
                                                                                            (<Button className="mock-btn"
                                                                                                onClick={() => this.startExam(smap1, islive)}

                                                                                                >Start Test</Button>)
                                                                                            : (<Button className="mt-3" onClick={() => this.modalaFun(smap1.exam_name)} >Buy Now</Button>)}
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </li>
                                                            )
                                                        }
                                                    })}
                                                </React.Fragment>
                                            ) : (
                                                    <li className="text-danger">
                                                        Coming Soon
                                                    </li>
                                                )}


                                        </ul>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <UserRestrictionAlert
                            show={this.state.userRestionModalShow}
                            onHide={() => this.setState({ userRestionModalShow: false })}
                        />
                    </Row>
                </Col>
            </Row>
        )


    }
}
export default withRouter(compose(

    graphql(MOCKTEST_REGISTER, {
        name: "register"
    })
)(NotifyFreeMockTestSectionSection));