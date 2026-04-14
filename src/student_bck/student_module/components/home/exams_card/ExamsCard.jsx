import React, { Component } from 'react'
import { Col, Card, Image } from 'react-bootstrap';
import { currentExamData } from '../StudentHomeData';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import ContentLoader from 'react-content-loader';
const FETCH_SCHEUDULE = gql` 
query($mobile: String!) {
    getScheduledExams(mobile: $mobile){
        id
        exam_name
    exam_type
    start_time
    end_time
    is_completed
   }
}

`;
class ExamsCard extends Component {
    examImage(examid) {

        if (examid == "1") {
            return (require('../../../../images/Neet-Exam.png'));
        } else if (examid == "2") {
            return (require('../../../../images/Jee(Mains)-Exam.png'));
        }
        else if (examid == "3" || examid == "6") {
            return (require('../../../../images/tschelogo.png'));
        }
        else if (examid == "7" || examid == "8") {
            return (require('../../../../images/Jntuk-logo.png'));
        }
    }
    asideCard(data) {
        let getData = data[this.props.stateData.mainindex];
        let classname = "";
        if (getData.subject == "Botany") {
            classname = "aside-card my-3 botany"
        }
        else if (getData.subject == "Physics") {
            classname = "aside-card my-3 physics"
        }
        else if (getData.subject == "Chemistry") {
            classname = "aside-card my-3"
        }
        else if (getData.subject == "Zoology") {
            classname = "aside-card my-3 zoology"
        }
        else if (getData.subject == "Mathematics") {
            classname = "aside-card my-3 maths"
        }
        return classname;

    }
    render() {
        //console.log("v678", this.props.studentGlobals.exams);
        const getScheduledExams = this.props.getScheduledExams;
        const loading1 = getScheduledExams.loading;
        const error1 = getScheduledExams.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (
                <React.Fragment>
                    <Col xl={6} lg={6} md={6} sm={12} className="my-3">
                        <Card className="border-0 my-3">
                            <div className="showcase-component">
                                <ContentLoader
                                    speed={2}
                                    width={400}
                                    height={560}
                                    viewBox="0 0 420 560"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                                </ContentLoader>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} className="my-3">
                        <Card className="border-0 my-3">
                            <div className="showcase-component">
                                <ContentLoader
                                    speed={2}
                                    width={400}
                                    height={560}
                                    viewBox="0 0 420 560"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                                </ContentLoader>
                            </div>
                        </Card>
                    </Col>
                </React.Fragment>

            )
        }
        else {
            let now = moment().unix();
            const upcommingexams = getScheduledExams.getScheduledExams.filter((data) => now < data.start_time && data.is_completed == false)
            const currentexams = getScheduledExams.getScheduledExams.filter((data) => now > data.start_time && now <= data.end_time && data.is_completed == false)
            console.log("devdev", this.props.studentGlobals.exams, upcommingexams.length, currentexams.length)
            return (
                <React.Fragment>
                    {
                        currentExamData.map((item, index) => {
                            const { ExamName, currentExamImg, currentExamName, currentExamEdgeImg, currentExamText, currentExamSchedule } = item;
                            if (ExamName == "CurrentExam") {
                                return (
                                    <Col xl={6} lg={6} md={6} sm={12} key={index} className="my-3">
                                        <Card className={`exam-name border-0 h-100 ${ExamName}`}>
                                            <Card.Header className="d-flex align-items-center bg-white border-0">
                                                <Image src={currentExamImg} alt="icon-img" width="30" />
                                                <Card.Title className="h6 ml-3 mb-0">{currentExamName}</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="m-3">
                                                {currentexams.length > 0 ? (

                                                    <ul className="list-unstyled schedule_exams m-0 p-0">
                                                        {
                                                            currentexams.map((item) => {
                                                                const examname = this.props.studentGlobals.exams.find((data) => data.id == item.exam_type)
                                                                return (
                                                                    <li key={item.id} className="currentexam-lists NeetExam card">
                                                                        <div className="p-2 d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center text-left">
                                                                                <div className="examTypeImage">
                                                                                    <Image src={this.examImage(examname.id)} width="80" alt="logo" roundedCircle />
                                                                                </div>
                                                                                <div className="ml-xl-4 ml-lg-4 text">
                                                                                    <Card.Title className="mb-1 h6">{examname.exam}</Card.Title>
                                                                                    <Card.Text className="text-muted">{item.exam_name}
                                                                                        {/* <small className="text-dark font-weight-bold">23.5k</small> */}
                                                                                    </Card.Text>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                {/* <p className="days font-weight-bold">10 Days Left</p> */}
                                                                                <Image className="my-1" src={require('../../../../images/green-sticker.svg')} width="30" height="30" alt="logo" roundedCircle />
                                                                                {/* <p className="dicount">95%</p> */}
                                                                            </div>
                                                                        </div>
                                                                        <div className="py-1 border-0 text-center" style={{ background: "#a4ead9" }}>
                                                                            <Card.Link
                                                                                onClick={() => this.props.startexamFun(item, this.props.isuserValid.schedule_exam)}

                                                                            >Start Exam</Card.Link>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>

                                                ) : (
                                                        <React.Fragment>
                                                            <Image src={currentExamEdgeImg} className="examIcon" alt="icon-img" width="60" />
                                                            <p>{currentExamText}</p>
                                                            {/* <p>{currentExamSchedule}</p> */}
                                                        </React.Fragment>
                                                    )}

                                            </Card.Body>

                                        </Card>
                                    </Col>
                                )
                            }
                            else if (ExamName == "UpcommingExam") {
                                return (
                                    <Col xl={6} lg={6} md={6} sm={12} key={index} className="my-3">
                                        <Card className={`exam-name border-0 h-100 ${ExamName}`}>
                                            <Card.Header className="d-flex align-items-center bg-white border-0">
                                                <Image src={currentExamImg} alt="icon-img" width="30" />
                                                <Card.Title className="h6 ml-3 mb-0">{currentExamName}</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="m-3">
                                                {upcommingexams.length > 0 ? (

                                                    <ul className="list-unstyled schedule_exams m-0 p-0">
                                                        {
                                                            upcommingexams.map((item) => {
                                                                console.log("upcommingexams34", this.props.studentGlobals.exams, item.exam_type);
                                                                const examname = this.props.studentGlobals.exams.find((data) => data.id == item.exam_type)
                                                                console.log("upcommingexams34", item.exam_type, examname, this.props.studentGlobals.exams);
                                                                return (
                                                                    <li key={item.id} className="upcomingexam-lists active NeetExam card">
                                                                        <div className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center text-left">
                                                                                <div className="examTypeImage">
                                                                                    <Image src={this.examImage(examname.id)} width="80" alt="logo" roundedCircle />
                                                                                </div>
                                                                                <div className="ml-xl-4 ml-lg-4 text">
                                                                                    <Card.Title className="mb-1 h6">{examname.exam}</Card.Title>
                                                                                    <Card.Text className="text-dark">{item.exam_name}</Card.Text>
                                                                                    <Card.Text className="text-dark">{moment.unix(item.start_time).format("DD-MM-YYYY @ LT")}</Card.Text>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="like-icon fa-3x fad fa-thumbs-up text-primary"></span>
                                                                                {/* <p className="likes">5.5k</p> */}
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>

                                                ) : (
                                                        <React.Fragment>
                                                            <Image src={currentExamEdgeImg} className="examIcon" alt="icon-img" width="60" />
                                                            <p>{currentExamText}</p>
                                                            {/* <p>{currentExamSchedule}</p> */}
                                                        </React.Fragment>
                                                    )}
                                            </Card.Body>


                                        </Card>
                                    </Col>
                                )
                            }

                        })
                    }
                </React.Fragment>
            )
        }
    }
}

export default withRouter(compose(
    graphql(FETCH_SCHEUDULE,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: '"cache-and-network"'
            }), name: "getScheduledExams"
        })
)(ExamsCard));