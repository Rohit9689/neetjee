import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { getReadyExamData, createOwnExamData } from './ExamsData';
import './_readyforexam.scss'
import * as Cookies from "es-cookie";
import moment from 'moment';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
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
            userRestionModalShow: false
        }
    }
    upcomingOwnRestrictexam = (subtype, isuserValid, getData) => {
        if (subtype == "chapter") {
            if (isuserValid.custom_chapter == false) {
                // this.props.history.push({
                //     pathname: "/student/subject/custom-instructions",
                //     state: {
                //         sessionid: getData.id,
                //         type: "Custom Exam",
                //         etype: "customgetready"
                //     }
                // });

                localStorage.setItem("sessionid", getData.id);
                localStorage.setItem("type", "Custom Exam");
                localStorage.setItem("stype", "");
                localStorage.setItem("exam_paper_id", "0");
                localStorage.setItem("etype", "customgetready");

                window.open("/student/subject/exam", "_blank")
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        } else if (subtype == "cumulative") {
            if (isuserValid.custom_cumulative == false) {

                localStorage.setItem("sessionid", getData.id);
                localStorage.setItem("type", "Custom Exam");
                localStorage.setItem("stype", "");
                localStorage.setItem("exam_paper_id", "0");
                localStorage.setItem("etype", "customgetready");

                window.open("/student/subject/exam", "_blank")

                // this.props.history.push({
                //     pathname: "/student/subject/custom-instructions",
                //     state: {
                //         sessionid: getData.id,
                //         type: "Custom Exam",
                //         etype: "customgetready"
                //     }
                // });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        } else if (subtype == "semi-grand") {
            if (isuserValid.custom_semi_grand == false) {
                localStorage.setItem("sessionid", getData.id);
                localStorage.setItem("type", "Custom Exam");
                localStorage.setItem("stype", "");
                localStorage.setItem("exam_paper_id", "0");
                localStorage.setItem("etype", "customgetready");

                window.open("/student/subject/exam", "_blank")

                // this.props.history.push({
                //     pathname: "/student/subject/custom-instructions",
                //     state: {
                //         sessionid: getData.id,
                //         type: "Custom Exam",
                //         etype: "customgetready"
                //     }
                // });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
        else if (subtype == "grand") {
            if (isuserValid.custom_grand == false) {

                localStorage.setItem("sessionid", getData.id);
                localStorage.setItem("type", "Custom Exam");
                localStorage.setItem("stype", "");
                localStorage.setItem("exam_paper_id", "0");
                localStorage.setItem("etype", "customgetready");

                window.open("/student/subject/exam", "_blank")

                // this.props.history.push({
                //     pathname: "/student/subject/custom-instructions",
                //     state: {
                //         sessionid: getData.id,
                //         type: "Custom Exam",
                //         etype: "customgetready"
                //     }
                // });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
    }

    upcomingOwnRestrict = (subtype, isuserValid, getData) => {
        console.log("upcomingOwnRestrict", getData.syllabus);
        if (subtype == "chapter" || subtype == "cumulative" || subtype == "semi-grand" || subtype == "grand") {
            // if (Cookies.get("student_userlevel") != 1) {
                if (isuserValid.custom_chapter == false) {
                    this.props.history.push({
                        pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
                        state: {
                            syllabus: getData.syllabus,
                            studentGlobals: this.props.studentGlobals
                        }
                    });
                }
                else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
            // }
            // else {
            //     this.props.history.push({
            //         pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
            //         state: {
            //             syllabus: getData.syllabus,
            //             studentGlobals: this.props.studentGlobals
            //         }
            //     });
            // }


        }
        // else if () {
        //     if (isuserValid.custom_cumulative == false) {
        //         this.props.history.push({
        //             pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
        //             state: {
        //                 syllabus: getData.syllabus,
        //                 studentGlobals: this.props.studentGlobals
        //             }
        //         });
        //     }
        //     else {
        //         this.setState({
        //             userRestionModalShow: true
        //         });
        //     }
        // } else if () {
        //     if (isuserValid.custom_semi_grand == false) {
        //         this.props.history.push({
        //             pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
        //             state: {
        //                 syllabus: getData.syllabus,
        //                 studentGlobals: this.props.studentGlobals
        //             }
        //         });
        //     }
        //     else {
        //         this.setState({
        //             userRestionModalShow: true
        //         });
        //     }
        // }
        // else if () {
        //     if (isuserValid.custom_grand == false) {
        //         this.props.history.push({
        //             pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
        //             state: {
        //                 syllabus: getData.syllabus,
        //                 studentGlobals: this.props.studentGlobals
        //             }
        //         });
        //     }
        //     else {
        //         this.setState({
        //             userRestionModalShow: true
        //         });
        //     }
        // }
    }
    userRestrictionFun = (title, link, isuserValid) => {
        if (title == "Chapter Exam" ||
            title == "Cumulative Exam" ||
            title == "Semi Grand" ||
            title == "Grand Test") {
            // if (Cookies.get("student_userlevel") != 1) {
                if (isuserValid.custom_chapter == false) {
                    this.props.history.push({
                        pathname: link
                    });
                }
                else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
            // }
            // else {
            //     this.props.history.push({
            //         pathname: link
            //     });
            // }
        }
    }
    upcomingIcons(subtype){
        if (subtype == "chapter") {
            return 'fad fa-file-alt fa-4x text-warning';

        }
        else if(subtype == "cumulative"){
            return 'fad fa-file-spreadsheet fa-4x text-success';
        }
        else if(subtype == "semi-grand"){
            return 'fad fa-book fa-4x text-warning';
        }
        else if(subtype == "grand"){
            return 'fad fa-books fa-4x text-success';
        }

    }
    render() {
        const upcomingFilter = this.props.getReadyForExamList.filter((a) => a.is_completed == 0);
        // const leastupcmngData = upcomingFilter.sort((a, b) => {
        //     return b.exam_date - a.exam_date;
        // });
        console.log("upcomingFilter",upcomingFilter);
        const examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        if (isuserValid.ready_exam_tab == true) {
            return (
                <div className="get_ready_for_exam">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <Image src={require('../../../images/locked.png')} width="40" alt="locked image" />
                                <h5 className="text-danger">
                                    Dear Student Now you have limited access. To Get Full Access subscribe now </h5>
                                    <Link style={{color:'#007bff'}} to={"/student/package"}>upgrade to Paid Plan</Link>
                            </div>

                        </Col>
                    </Row>
                </div>)
        }
        return (
            <div className="get_ready_for_exam">
                <Container>
                
                {/* <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Upcoming College &amp; External Exams</h6>
                    </Col>
                    {
                        this.state.getStudentExams.map((item, index) => {
                            return (
                                <React.Fragment>
                                    {Math.sign(item.days) == 1 ? (
                                        <React.Fragment>{index < 3 ? (<Col key={item.id} xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                                            <Card className="single-card shadow-sm border-0 h-100">
                                                <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center text-left">
                                                        <div className="iconBlock">
                                                            <Image src={require('../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                        </div>
                                                        <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                                            <Card.Title className="h6">{examname.exam}</Card.Title>
                                                            <div className="mt-2 d-flex buttons">
                                                                <Link
                                                                    to={{
                                                                        pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
                                                                        state: {
                                                                            syllabus: item.syllabus,
                                                                            studentGlobals: this.props.studentGlobals
                                                                        }
                                                                    }}

                                                                    className="btn btn-success"><i className="fal fa-book-reader" /> Learning</Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="Date">{moment.unix(item.start_time).format("DD-MM-YYYY")}</span>
                                                </Card.Body>
                                            </Card>
                                        </Col>) : ("")}</React.Fragment>


                                    ) : ("")}

                                </React.Fragment>

                            )
                        })
                    }
                    <Col xl={12} lg={12} md={12}>
                        <Link to={{
                            pathname: "/student/get-ready-for-exam/history",
                            state: {
                                getReadyForExamList: this.props.getReadyForExamList
                            }
                        }} className="btn-link text-primary">View More</Link>
                    </Col>
                </Row> */}
                <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Custom Exams Scheduled by You</h6>
                    </Col>
                    {upcomingFilter.map((getData, index) => {
                        // const date=String(new Date());
                        // const nowdate =  moment(date.substr(4,11)+ "00:00:00", "MMM DD YYYY hh:mm:ss").unix();
                        if (index < 3) {
                            return (

                                <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                                    <Card className="single-card shadow-sm border-0 h-100">
                                        <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center text-left">
                                                <div className="iconBlock">
                                                    
                                                    <i 
                                                    //className="fad fa-book fa-4x text-success"
                                                    className= {this.upcomingIcons(getData.sub_type)} 
                                                    />
                                                </div>
                                                <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                                    <Card.Title className="h6">
                                                        {getData.exam_name != "" ? (getData.exam_name) : ("")} ({getData.sub_type})
                                                    </Card.Title>
                                                    {/* <Card.Text>Complete two years syllabus includes all subjects and chapters</Card.Text> */}
                                                    <div className="d-flex buttons">
                                                        
                                                                <React.Fragment>
                                                                    <a
                                                                        onClick={() => this.upcomingOwnRestrict(getData.sub_type, isuserValid, getData)}
                                                                        className="btn btn-success"><i className="fal fa-book-reader" /> Start Learning</a>
                                                                    
                                                                        <React.Fragment>{getData.exam_date >= moment().unix()?(<a
                                                                            onClick={() => this.upcomingOwnRestrictexam(getData.sub_type, isuserValid, getData)}
                                                                            className="btn btn-primary"><i className="fal fa-clipboard-list-check" /> Exam</a>):("")}</React.Fragment>
                                                                        
                                                                    

                                                                </React.Fragment>
                                                        </div>
                                                </div>
                                            </div>
                                            {/* <span className="Date">{moment.unix(getData.exam_date).format("DD-MM-YYYY")}</span> */}
                                                                        <span className="Date">{
                                                                            moment.unix(getData.exam_date).format("DD-MM-YYYY")
                                                                        }</span>
                                        </Card.Body>
                                    </Card>
                                </Col>


                            )
                        }

                    })}
                    <Col xl={12} lg={12} md={12}>
                        <Link to={{
                            pathname: "/student/get-ready-for-exam/upcoming-history"
                        }} className="btn btn-outline-primary rounded-pill px-4" style={{ position: "relative" }}>View More
                        <span style={{
                                position: "absolute",
                                content: "",
                                backgroundColor: "#f81201",
                                top: "-3px",
                                right: "-4px",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%"
                            }}></span>
                        </Link>
                    </Col>

                </Row>
                <Row className="my-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-2 subTitle">Schedule Your Own Exam</h6>
                    </Col>
                    {
                        createOwnExamData.map((item) => {
                            const { id, pageLink, icon, Title, textDescription } = item;
                            return (
                                <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4">
                                    <Link
                                        //to={pageLink} 
                                        onClick={() => this.userRestrictionFun(item.Title, pageLink, isuserValid)}
                                        className="single-card">
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
                        <Link
                            to={{
                                pathname: "/student/get-ready-for-exam/history",
                                state: {
                                    getReadyForExamList: this.props.getReadyForExamList
                                }
                            }}
                            className="single-card"
                        >
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Body className="single-card-body d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center text-left">
                                        <div className="iconBlock">
                                            <i className="fad fa-history fa-4x" />
                                        </div>
                                        <div className="ml-xl-4 ml-lg-3 ml-3 text">
                                            <Card.Title className="h6">Exam List</Card.Title>
                                            <Card.Text>Select the already Created Exams to start Learning.</Card.Text>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
                </Container>
            </div>
        )
    }
}

export default withRouter(GetReadyForExamSection);
