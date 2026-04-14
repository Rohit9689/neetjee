import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import BreadcrumbCustomQuestions from '../../../breadcrumbs/BreadcrumbCustomQuestions'
import DownloadQuestionPaperModal from '../../../download_question_paper/DownloadQuestionPaperModal'
import QuestionModal from '../QuestionModal'

import '../_createquestionpaper.scss'

class OwnQuestionPaperSection extends Component {
    constructor(props) {
        super(props)
        let Title = "";
        let ClassSectionTotalStudents = "";
        let complexity = "";
        let subjects = "";
        let img = "";

        if (props.getGroupData != undefined) {
            let section = "";
            if (props.getGroupData.groupsData != undefined) {
                section = props.getGroupData.groupsData.section_name;
            }

            Title = props.getGroupData.examname + " Exam - Question Paper";
            ClassSectionTotalStudents = "Category-" + props.getGroupData.categoryfindData.category_name + ",Section-" + props.getGroupData.groupsData.section_names;
            img = props.getGroupData.img;
        }
        console.log("props.getGroupData.complexityFindData", props.getGroupData.categoryfindData);
        if (props.getGroupData.categoryfindData != undefined) {
            complexity = "High Difficulty" + props.getGroupData.categoryfindData.high_difficult + "%,Difficulty" + props.getGroupData.categoryfindData.difficult + "%,Moderate" + props.getGroupData.categoryfindData.moderate + "%, easy" + props.getGroupData.categoryfindData.easy + "%";
        }
        if (props.getGroupData.subjects != undefined) {
            subjects = props.getGroupData.subjects.toString();
        }



        this.state = {
            BreadcrumbCustomQuestionsSection: {
                img: img,
                Title: Title,
                ClassSectionTotalStudents: ClassSectionTotalStudents,
                complexity: complexity,
                subjects: subjects
            }
        }
    }

    render() {
        console.log("OwnQuestionPaperSection", this.props.getGroupData);
        return (
            <section className="Create_Question_Paper_type px-xl-4 px-lg-4">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbCustomQuestions breadcrumbs={this.state.BreadcrumbCustomQuestionsSection} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h6 className="mb-3 text-uppercase">Select Exam type</h6>
                    </Col>

                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                        <Link
                            to={{
                                pathname: "/questions/create-question-paper/own-question-paper/custom",
                                state: {
                                    stateData: this.state,
                                    getGroupData: this.props.getGroupData
                                }
                            }}

                        >
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fas fa-cog" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Custom</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Complete control to choose the syllabus.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    {/* <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                        <Link to="/questions/create-question-paper/own-question-paper/cumulative">
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="far fa-list-alt" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Cumulative</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Multi Chapter Selection.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col> */}
                    {/* <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                        <Link to="/questions/create-question-paper/own-question-paper/chapter">
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fas fa-book-open" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Chapter</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Single chapter test</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col> */}
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                        <Link
                            //to="/questions/create-question-paper/own-question-paper/semi-grand"
                            to={{
                                pathname: "/questions/create-question-paper/own-question-paper/semi-grand",
                                state: {
                                    stateData: this.state,
                                    getGroupData: this.props.getGroupData
                                }
                            }}
                        >
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fas fa-star-half-alt" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Semi Grand</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Complete syllabus of first year intermediate</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                        <Link
                            to={{
                                pathname: "/questions/create-question-paper/own-question-paper/grand",
                                state: {
                                    stateData: this.state,
                                    getGroupData: this.props.getGroupData
                                }
                            }}
                        >
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fas fa-star" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Grand</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Complete syllabus of first year intermediate and intermediate second yeare</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>

                {/* <QuestionModal show={this.state.modalShow} showothermodal={() => this.setState({ modalShowTwo: true })} onHide={() => this.setState({ modalShow: false })} />
                <DownloadQuestionPaperModal show={this.state.modalShowTwo} onHide={() => this.setState({ modalShowTwo: false })} /> */}
            </section>
        )
    }
}

export default OwnQuestionPaperSection
