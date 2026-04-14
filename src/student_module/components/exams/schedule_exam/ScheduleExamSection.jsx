import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Nav, Card, CardGroup, Tab, Image, Button } from 'react-bootstrap'
import ScheduleData from './ScheduleData';
import moment from 'moment';
import * as Cookies from "es-cookie";
class ScheduleExamSection extends Component {
    constructor(props) {
        super(props)
        let sampleArray = [];
        let ongoing = [];
        let upcomig = [];
        let completed = [];
        //let nowdate = [];
        let upcommingexams = [];
        let currentexams = [];
        let compexams = [];
        // if(props.getScheduledExams!=undefined){
        //     for (let i = 0; i < props.getScheduledExams.length; i++) {
        //         let someData = props.getScheduledExams[i];
        //         if(someData!=undefined){
        //             let now = moment(new Date()); 
        //             let end = moment.unix(someData.start_time); 
        //             console.log("endend", end);
        //             let duration = moment.duration(end.diff(now));
        //             let days = Math.round(duration.asDays());
        //             if(Math.sign(days)==-1){
        //                 completed.push(someData.id);
        //             }
        //             if(days==7)
        //             {
        //                 ongoing.push(someData.id);
        //             }
        //             if(days>7)
        //             {
        //                 upcomig.push(someData.id);
        //             }
        //             const newarr1 = {
        //                 ...someData,
        //                 days:days
        //             }
        //             sampleArray.push(newarr1);
        //         }

        //     }


        // }

        this.state = {
            subtype: "1",
            mainsActive: "active",
            advanceActive: ""
        }
    }
    startExam = (id) => {
        console.log("this.state.subtype", id, this.state.subtype);

        localStorage.setItem("sessionid", "0");
        localStorage.setItem("type", "Schedule Exam");
        localStorage.setItem("stype", "schedule_exam");
        localStorage.setItem("exam_paper_id", id);
        localStorage.setItem("etype", "schedule");
        localStorage.setItem("subexamtype", this.state.subtype);

        window.open("/student/subject/exam", "_blank")

    }
    subtypeClick = (type) => {
        console.log("type", type);
        this.setState({
            subtype: type
        });


        if (type == "1") {
            this.setState({
                mainsActive: "active",
                advanceActive: ""
            });

        } else {
            this.setState({
                advanceActive: "active",
                mainsActive: ""
            });
        }

    }
    render() {
        console.log("currentState", this.state);
        //console.log("this"props.getScheduledExams., this)props.getScheduledExams.;
        const nowdate = moment().unix();
        console.log("props.getScheduledExams", this.props.getScheduledExams);
        const upcommingexams = this.props.getScheduledExams.filter((data) => nowdate < data.start_time && data.is_completed == false);
        console.log("upcommingexams", upcommingexams);
        const currentexams = this.props.getScheduledExams.filter((data) => nowdate > data.start_time && nowdate <= data.end_time && data.is_completed == false);
        console.log("currentexams", currentexams);
        const compexams = this.props.getScheduledExams.filter((data) => data.is_completed == true);

        const expiredexams = this.props.getScheduledExams.filter((data) => nowdate > data.end_time && data.is_completed == false);
        console.log("expiredexams", expiredexams);
        return (
            <div className="schedule_exams pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h5 className="title mb-3">Schedule Exam</h5>
                    </Col>
                </Row>

                <Tab.Container id="schedule-exams-tabs" defaultActiveKey="first">
                    <Card className="border-0">
                        <Card.Header className="border-0 bg-white pb-0">
                            <div className="d-md-flex justify-content-between align-items-center">
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Ongoing -{currentexams.length}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Upcoming -{upcommingexams.length}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Completed -{compexams.length}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth">Expired -{expiredexams.length}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <ul className="list-inline m-0 mb-1 p-0">
                                            {Cookies.get("examid") == "2" ? (
                                                <React.Fragment>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            onClick={() => this.subtypeClick("1")}
                                                            variant={`outline-secondary ${this.state.mainsActive}`}
                                                        // variant={"outline-secondary"+this.state.mainsActive}
                                                        >Mains</Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            variant={`outline-secondary ${this.state.advanceActive}`}
                                                            //variant={"outline-secondary"+this.state.advanceActive}
                                                            onClick={() => this.subtypeClick("2")}
                                                        >Advance</Button>
                                                    </li>
                                                </React.Fragment>

                                            ) : ("")}


                                            <li className="list-inline-item">
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/exam-history",
                                                        state: {
                                                            examtype: "schedule_exam",

                                                        }
                                                    }}
                                                    className="btn btn-outline-primary">Exam History
                                                </Link>
                                            </li>

                                        </ul>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <ul className="list-inline m-0 mb-1 p-0">
                                            {Cookies.get("examid") == "2" ? (
                                                <React.Fragment>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            onClick={() => this.subtypeClick("1")}
                                                            variant={`outline-secondary ${this.state.mainsActive}`}
                                                        // variant={"outline-secondary"+this.state.mainsActive}
                                                        >Mains</Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            variant={`outline-secondary ${this.state.advanceActive}`}
                                                            //variant={"outline-secondary"+this.state.advanceActive}
                                                            onClick={() => this.subtypeClick("2")}
                                                        >Advance</Button>
                                                    </li>
                                                </React.Fragment>

                                            ) : ("")}


                                            <li className="list-inline-item">
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/exam-history",
                                                        state: {
                                                            examtype: "schedule_exam",

                                                        }
                                                    }}
                                                    className="btn btn-outline-primary">Exam History
                                                </Link>
                                            </li>

                                        </ul>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <ul className="list-inline m-0 mb-1 p-0">
                                            {Cookies.get("examid") == "2" ? (
                                                <React.Fragment>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            onClick={() => this.subtypeClick("1")}
                                                            variant={`outline-secondary ${this.state.mainsActive}`}
                                                        // variant={"outline-secondary"+this.state.mainsActive}
                                                        >Mains</Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            variant={`outline-secondary ${this.state.advanceActive}`}
                                                            //variant={"outline-secondary"+this.state.advanceActive}
                                                            onClick={() => this.subtypeClick("2")}
                                                        >Advance</Button>
                                                    </li>
                                                </React.Fragment>

                                            ) : ("")}


                                            <li className="list-inline-item">
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/exam-history",
                                                        state: {
                                                            examtype: "schedule_exam",

                                                        }
                                                    }}
                                                    className="btn btn-outline-primary">Exam History
                                                </Link>
                                            </li>

                                        </ul>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth">
                                        <ul className="list-inline m-0 mb-1 p-0">
                                            {Cookies.get("examid") == "2" ? (
                                                <React.Fragment>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            onClick={() => this.subtypeClick("1")}
                                                            variant={`outline-secondary ${this.state.mainsActive}`}
                                                        // variant={"outline-secondary"+this.state.mainsActive}
                                                        >Mains</Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Button
                                                            variant={`outline-secondary ${this.state.advanceActive}`}
                                                            //variant={"outline-secondary"+this.state.advanceActive}
                                                            onClick={() => this.subtypeClick("2")}
                                                        >Advance</Button>
                                                    </li>
                                                </React.Fragment>

                                            ) : ("")}


                                            <li className="list-inline-item">
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/exam-history",
                                                        state: {
                                                            examtype: "schedule_exam",

                                                        }
                                                    }}
                                                    className="btn btn-outline-primary">Exam History
                                                </Link>
                                            </li>

                                        </ul>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0"><i className="fal fa-school mr-xl-5 mr-lg-4" /> Scheduled Exams</h6>
                                            </Card.Header>
                                            <Card.Body >
                                                <Row>
                                                    {currentexams.map((getData) => {
                                                        const examname = (this.props.studentGlobals?.exams || []).find((data) => data.id == getData.exam_type)
                                                        return (
                                                            <Col key={getData.id} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                                                                <Link
                                                                    onClick={() => this.startExam(getData.id)}
                                                                    // to={{
                                                                    //     pathname: "/student/subject/custom-instructions",
                                                                    //     state: {
                                                                    //         sessionid: getData.id,
                                                                    //         type: "Schedule Exam",
                                                                    //         etype: "schedule"
                                                                    //     }
                                                                    // }}
                                                                    className="NeetExam">
                                                                    <Card className="shadow-sm single-card h-100">
                                                                        <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center text-left">
                                                                                <div className="examTypeImage">
                                                                                    <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                                </div>
                                                                                <div className="ml-xl-5 ml-lg-4 text">
                                                                                    <Card.Title className="h6 mb-0">{examname?.exam || 'N/A'}</Card.Title>
                                                                                    <Card.Text className="text-muted">{getData.exam_name}
                                                                                    </Card.Text>
                                                                                    {/* <Card.Text>Attempted Students : <span className="text-muted">0</span></Card.Text> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <div className="days"><small></small></div>
                                                                                <Image className="my-1" src={require('../../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                                                <div className="dicount"></div>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Link>
                                                            </Col>
                                                        )
                                                    })}
                                                </Row>

                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0"><i className="fal fa-school mr-xl-5 mr-lg-4" /> Scheduled Exams</h6>
                                            </Card.Header>
                                            <Card.Body>

                                                <Row>
                                                    {upcommingexams.map((getData) => {
                                                        console.log("getData.exam_type", getData.exam_type);
                                                        const examname = (this.props.studentGlobals?.exams || []).find((data) => data.id == getData.exam_type)
                                                        return (
                                                            <React.Fragment>

                                                                <Col key={getData.id} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
                                                                    <div className="NeetExam">
                                                                        <Card className="shadow-sm single-card h-100">
                                                                            <Card.Body className="p-0 single-card-body d-flex justify-content-between align-items-center">
                                                                                <div className="text-left p-2 d-flex align-items-center">
                                                                                    <div className="examTypeImage">
                                                                                        <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                                    </div>
                                                                                    <div className="ml-xl-5 ml-lg-3 text">
                                                                                        <Card.Title className="h6 mb-0">{examname?.exam || 'N/A'}</Card.Title>
                                                                                        <Card.Text className="text-muted">{getData.exam_name}
                                                                                        </Card.Text>
                                                                                        <Card.Text>{moment.unix(getData.start_time).format("DD-MM-YYYY")}
                                                                                        </Card.Text>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                    <ul className="list-inline">
                                                                                        <li className="list-inline-item px-xl-3 px-lg-2 py-3">
                                                                                            <Link to="/student/learn-practice">
                                                                                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.002 512.002">
                                                                                                    <path fill="#F4A00B" d="M377.002,488.485c-8.291,0-15-6.709-15-15v-180c0-8.291,6.709-15,15-15s15,6.709,15,15v180
                                                                                        C392.002,481.776,385.293,488.485,377.002,488.485z"/>
                                                                                                    <path fill="#F4A00B" d="M497.002,308.485h-242c-8.291,0-15-6.709-15-15s6.709-15,15-15h242c8.291,0,15,6.709,15,15
                                                                                        S505.293,308.485,497.002,308.485z"/>
                                                                                                    <path fill="#ffcb70" d="M210.002,113.485c-24.814,0-45-20.186-45-45s20.186-45,45-45s45,20.186,45,45
                                                                                        S234.816,113.485,210.002,113.485z"/>
                                                                                                    <path fill="#ffcb70" d="M314.108,451.205l-30-150.015c-3.34-13.374-15.308-22.705-29.106-22.705h-57.876l-15.059-128.54
                                                                                        l-46.172,1.26l-30,150.015c-2.256,9.009-0.264,18.384,5.464,25.723s14.341,11.543,23.643,11.543h96.563l24.331,127.28
                                                                                        c4.072,16.234,20.577,25.91,36.387,21.812C308.313,483.577,318.118,467.303,314.108,451.205z"/>
                                                                                                    <path fill="#ffcb70" d="M195.002,278.485c-11.44,0-21.724-6.357-26.836-16.582l-30-90c-3.589-7.163-4.16-15.308-1.626-22.925
                                                                                        c2.534-7.588,7.881-13.755,15.044-17.329c14.719-7.282,32.788-1.536,40.254,13.418l21.709,73.418h56.455c16.538,0,30,13.462,30,30
                                                                                        s-13.462,30-30,30H195.002z"/>
                                                                                                    <path fill="#F4A00B" d="M11.369,488.031c-8.042-2.007-12.935-10.151-10.913-18.179l30-120
                                                                                        c1.992-8.057,10.063-12.993,18.179-10.913c8.042,2.007,12.935,10.151,10.913,18.179l-30,120
                                                                                        C27.531,485.217,19.328,490.045,11.369,488.031z"/>
                                                                                                    <path fill="#F4A00B" d="M180.456,477.118l-30-120c-2.021-8.027,2.871-16.172,10.913-18.179
                                                                                        c7.954-2.051,16.172,2.871,18.179,10.913l30,120c2.021,8.027-2.871,16.172-10.913,18.179
                                                                                        C190.687,490.042,182.475,485.229,180.456,477.118z"/>
                                                                                                    <g>
                                                                                                        <path fill="#F4A00B" d="M210.002,353.485c0,8.399-6.599,15-15,15h-150c-24.901,0-45-20.101-45-45v-180
                                                                                            c0-8.401,6.599-15,15-15s15,6.599,15,15v180c0,8.399,6.599,15,15,15h150C203.403,338.485,210.002,345.084,210.002,353.485z"/>
                                                                                                        <path fill="#F4A00B" d="M210.002,353.485c0,8.399-6.599,15-15,15h-75v-30h75
                                                                                            C203.403,338.485,210.002,345.084,210.002,353.485z"/>
                                                                                                    </g>
                                                                                                </svg>
                                                                                                <div className="prepare">prepare</div>
                                                                                            </Link>
                                                                                        </li>
                                                                                        <li className="list-inline-item px-xl-3 px-lg-2 py-3">
                                                                                            <i className="fad fa-thumbs-up fa-fw" style={{ fontSize: '1.4em' }} />
                                                                                            <div className="likes">2.5k</div>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </div>
                                                                </Col>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Row>


                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0"><i className="fal fa-school mr-xl-5 mr-lg-4" /> Scheduled Exams</h6>
                                            </Card.Header>
                                            <Card.Body>

                                                <Row>
                                                    {compexams.map((getData) => {
                                                        console.log("getData.exam_typecompexams", getData.exam_type, this.props.studentGlobals.exams);
                                                        const examname = (this.props.studentGlobals?.exams || []).find((data) => data.id == getData.exam_type)
                                                        return (
                                                            <React.Fragment>

                                                                <Col key={getData.id} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                                                                    <Card className="shadow-sm single-card bg-light h-100">
                                                                        <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                            <div className="text-left d-flex align-items-center">
                                                                                <div className="examTypeImage">
                                                                                    <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                                </div>
                                                                                <div className="ml-xl-5 ml-lg-4 text">
                                                                                    <Card.Title className="h6 mb-0">{examname?.exam || 'N/A'}</Card.Title>
                                                                                    <Card.Text className="text-muted">{getData.exam_name}
                                                                                    </Card.Text>
                                                                                    {/* <Card.Text>Attempted Students : <span className="text-muted">0</span></Card.Text> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <div className="days"><small>{moment.unix(getData.start_time).format("DD-MM-YYYY")}</small></div>
                                                                                <Image className="mt-2 mb-1" src={require('../../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>

                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Row>


                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>

                                <Tab.Pane eventKey="fourth">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0"><i className="fal fa-school mr-xl-5 mr-lg-4" /> Scheduled Exams</h6>
                                            </Card.Header>
                                            <Card.Body>

                                                <Row>
                                                    {expiredexams.map((getData) => {
                                                        const examname = (this.props.studentGlobals?.exams || []).find((data) => data.id == getData.exam_type)
                                                        return (
                                                            <React.Fragment>

                                                                <Col key={getData.id} xl={12} lg={12} md={12} sm={12} xs={12} className="mb-4">
                                                                    <Card className="shadow-sm single-card bg-light h-100">
                                                                        <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                            <div className="text-left d-flex align-items-center">
                                                                                <div className="examTypeImage">
                                                                                    <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                                </div>
                                                                                <div className="ml-xl-5 ml-lg-4 text">
                                                                                    <Card.Title className="h6 mb-0">{examname?.exam || 'N/A'}</Card.Title>
                                                                                    <Card.Text className="text-muted">{getData.exam_name}
                                                                                    </Card.Text>
                                                                                    {/* <Card.Text>Attempted Students : <span className="text-muted">0</span></Card.Text> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <div className="days"><small>{moment.unix(getData.start_time).format("DD-MM-YYYY")}</small></div>
                                                                                <Image className="mt-2 mb-1" src={require('../../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>

                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Row>


                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Card>
                </Tab.Container>
            </div>
        )
    }
}

export default ScheduleExamSection;
