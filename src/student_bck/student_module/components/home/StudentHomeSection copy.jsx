import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card, Image, ProgressBar } from 'react-bootstrap'
import { sliderData, learnpracticeData, exploreData, currentExamData, comingExamData } from './StudentHomeData';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import './_studenthome.scss'


class StudentHomeSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subjectName: 'chemistry',
        }
        this.setActiveSubject = this.setActiveSubject.bind(this);
    }

    setActiveSubject(index) {
        // console.log('index',index);

        // console.log('array',sliderData[index]);
        if (index == -1) {
            return;
        }
        const { subjectName } = sliderData[index];
        this.setState({ subjectName })
    }

    render() {
        const { subjectName } = this.state;
        return (
            <section className="student-home px-xl-4 px-lg-4">
                <Row>
                    <Col xl={7} lg={12} md={12} sm={12}>
                        <Row>
                            <Col xl={5} lg={5} md={5} sm={12}>
                                <OwlCarousel className={`owl-theme subject-slides ${subjectName}`}
                                    items={1}
                                    loop
                                    margin={10}
                                    nav
                                    onChanged={(item) => { console.log(item); this.setActiveSubject(item.page.index) }}
                                >
                                    {
                                        sliderData.map((item) => {
                                            const { id, sliderimg, title, percentage, subjectName } = item;
                                            return (
                                                <div key={id} className={`item ${subjectName}`}>
                                                    <Card className="single-card shadow-sm border-0">
                                                        <Card.Img variant="top" src={sliderimg} alt="img" />
                                                        <Card.Body>
                                                            <Card.Subtitle>
                                                                <i className="fad fa-vial" />
                                                            </Card.Subtitle>
                                                            <Card.Title className="my-5 text-dark text-uppercase">{title}</Card.Title>
                                                            <ProgressBar now={percentage} label={`${percentage}%`} min={0} max={100} />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="mb-0 text-muted">0%</p>
                                                                <p className="mb-0 text-muted">100%</p>
                                                            </div>
                                                        </Card.Body>
                                                        <Card.Footer className="border-0 text-center py-2">
                                                            <Card.Link to="#">Continue</Card.Link>
                                                        </Card.Footer>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                    }
                                </OwlCarousel>
                            </Col>
                            <Col xl={7} lg={7} md={7} sm={12}>
                                <Card className="learn_practice border-0">
                                    <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center pt-4">
                                        <div className="title d-flex align-items-center pl-2">
                                            <i className="fa-2x fad fa-book-open icon mr-2" /><h6 className="mb-0">Learn &amp; Practice </h6>
                                        </div>
                                        <p className="text-muted mb-0">Least 3</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="list-unstyled topic-lists m-0">
                                            {
                                                learnpracticeData.map((item) => {
                                                    const { id, topicNo, chapNo, topicName, chapName, percentage } = item;
                                                    return (
                                                        <li key={id} className="singleTopic">
                                                            <Card as={Card.Body} className="topic-card flex-row justify-content-between align-items-center">
                                                                <div className="topicNames">
                                                                    <h6 className="mb-0"><span>{topicNo}</span> - {topicName}</h6>
                                                                    <p className="mb-0 text-muted"><span>{chapNo}</span> - {chapName}</p>
                                                                </div>
                                                                <div className="percentage">
                                                                    <Card className="flex-row align-items-center p-2 border-0">
                                                                        <h6 className="mb-0 mr-3">{percentage}</h6> <i className="fas fa-long-arrow-alt-right" />
                                                                    </Card>
                                                                </div>
                                                            </Card>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={12} lg={12} md={12}>
                                <Card className="exploreTags my-4 border-0">
                                    <Card.Header className="bg-white border-0 d-flex align-items-center px-4 pt-4">
                                        <i className="mr-2 fa-2x fad fa-history icon" /> <h6 className="mb-0">Explore more</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="tags-list list-inline">
                                            {
                                                exploreData.map((item) => {
                                                    const { id, Active, exploreName } = item;
                                                    return (
                                                        <li key={id} className={`list-inline-item ${Active}`}>
                                                            <Link to="#" className="text-muted">
                                                                <i className="mr-2 fad fa-check-circle" /> {exploreName}
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={5} lg={12} md={12} sm={12}>
                        <Card as={Card.Body} className="aside-card px-3 border-0">
                            <Card className="currentExams border-0 mb-4">
                                <Card.Header className="bg-white border-0 d-flex align-items-center px-3">
                                    <i className="mr-2 fa-2x fad fa-file-alt icon" />
                                    <h6 className="mb-0">Current Exams</h6>
                                </Card.Header>
                                <Card.Body>
                                    <ul className="list-unstyled schedule_exams">
                                        {
                                            currentExamData.map((item) => {
                                                const { id, itemType, days, name, totalStudents, dicount } = item;
                                                return (
                                                    <li key={id} className={`currentexam-lists ${itemType}`}>
                                                        <Card className="single-card h-100">
                                                            <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center text-left">
                                                                    <div className="examTypeImage">
                                                                        <Image src={require('../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                    </div>
                                                                    <div className="ml-xl-4 ml-lg-4 text">
                                                                        <Card.Title className="mb-1 h6">{name}</Card.Title>
                                                                        <Card.Text className="text-muted">Attempted Students : <small className="text-dark font-weight-bold">{totalStudents}</small></Card.Text>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="days font-weight-bold">{days}</p>
                                                                    <Image className="my-1" src={require('../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                                    <p className="dicount">{dicount}</p>
                                                                </div>
                                                            </Card.Body>
                                                            <Card.Footer className="py-1 border-0 text-center">
                                                                <Card.Link to="#">Start Exam</Card.Link>
                                                            </Card.Footer>
                                                        </Card>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card className="upcomingExams border-0">
                                <Card.Header className="bg-white border-0 d-flex align-items-center px-3">
                                    <i className="mr-2 fa-2x fad fa-file-alt icon" />
                                    <h6 className="mb-0">Up Coming Exams</h6>
                                </Card.Header>
                                <Card.Body>
                                    <ul className="list-unstyled schedule_exams">
                                        {
                                            comingExamData.map((item) => {
                                                const { id, Active, itemType, name, Examdate, likes } = item;
                                                return (
                                                    <li key={id} className={`upcomingexam-lists ${Active} ${itemType}`}>
                                                        <Card as={Link} to="#" className="single-card h-100">
                                                            <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center text-left">
                                                                    <div className="examTypeImage">
                                                                        <Image src={require('../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                                    </div>
                                                                    <div className="ml-xl-4 ml-lg-4 text">
                                                                        <Card.Title className="mb-1 h6">{name}</Card.Title>
                                                                        <Card.Text className="text-dark">{Examdate}</Card.Text>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span className="like-icon fa-3x fad fa-thumbs-up"></span>
                                                                    <p className="likes">{likes}</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </section>
        )
    }
}

export default StudentHomeSection
