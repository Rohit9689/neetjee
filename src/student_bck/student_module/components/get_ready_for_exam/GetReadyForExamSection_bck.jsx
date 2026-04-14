import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { getReadyExamData, createOwnExamData } from './ExamsData';
import './_readyforexam.scss'
import * as Cookies from "es-cookie";
import moment from 'moment';

class GetReadyForExamSection extends Component {
    constructor(props) {
        super(props)
        let sampleArray = [];
        if (props.getScheduledExams != undefined) {
            for (let i = 0; i < props.getScheduledExams.length; i++) {
                let someData = props.getScheduledExams[i];
                if (someData != undefined) {
                    let now = moment(new Date()); //todays date
                    let end = moment.unix(someData.start_time); // another date
                    console.log("endend", end);
                    let duration = moment.duration(end.diff(now));
                    let days = Math.round(duration.asDays());

                    const newarr1 = {
                        ...someData,
                        days: days
                    }
                    sampleArray.push(newarr1);
                }

            }
        }
        this.state = {
            getStudentExams: sampleArray,
        }
    }
    render() {
        const examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        return (
            <div className="get_ready_for_exam px-xl-4 px-lg-4">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h5 className="mb-4 title">Get Ready For Exam</h5>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Upcoming College &amp; External Exams</h6>
                    </Col>
                    {
                        this.state.getStudentExams.map((item) => {
                            return (
                                <React.Fragment>{Math.sign(item.days) == 1 ? (<Col key={item.id} xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                                    <Link to="/student/get-ready-for-exam/get-ready-shortnotes" className="single-card">
                                        <Card className="shadow-sm border-0 h-100">
                                            <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center text-left">
                                                    <div className="iconBlock">
                                                        <Image src={require('../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                    </div>
                                                    <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                                        <Card.Title className="h6">{examname.exam}</Card.Title>
                                                        {/* <Card.Text>{textDescription}</Card.Text> */}
                                                    </div>
                                                </div>
                                                <span className="Date">{moment.unix(item.start_time).format("DD-MM-YYYY")}</span>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>) : ("")}</React.Fragment>


                            )
                        })
                    }
                </Row>
                <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Upcoming Own Exam</h6>
                    </Col>
                    {this.props.getReadyForExamList.map((getDataa) => (
                        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                            <Card className="single-card shadow-sm border-0 h-100">
                                <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center text-left">
                                        <div className="iconBlock">
                                            <i className="fad fa-book fa-4x text-success" />
                                        </div>
                                        <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                            <Card.Title className="h6">Grand Exam</Card.Title>
                                            <Card.Text>Complate two years syllabus includes all subjects and chapters</Card.Text>
                                            <div className="d-flex buttons">
                                                <Link to="#" className="btn btn-success"><i className="fal fa-book-reader" /> Learning</Link>
                                                <Link to="#" className="btn btn-primary"><i className="fal fa-clipboard-list-check" /> Exams</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>))}

                </Row>
                <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Create Own Exam</h6>
                    </Col>
                    {
                        createOwnExamData.map((item) => {
                            const { id, pageLink, icon, Title, textDescription } = item;
                            return (
                                <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                                    <Link to={pageLink} className="single-card">
                                        <Card className="shadow-sm border-0 h-100">
                                            <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center text-left">
                                                    <div className="iconBlock">
                                                        <i className={icon} />
                                                    </div>
                                                    <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                                        <Card.Title className="h6">{Title}</Card.Title>
                                                        <Card.Text>{textDescription}</Card.Text>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Own Exam History</h6>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                        <Link to="/student/get-ready-for-exam/history" className="single-card">
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center text-left">
                                        <div className="iconBlock">
                                            <i className="fad fa-history fa-4x" />
                                        </div>
                                        <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                            <Card.Title className="h6">Exam List</Card.Title>
                                            <Card.Text>Selct The already Created Exams to start Learning.</Card.Text>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GetReadyForExamSection
