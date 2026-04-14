import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading'
import QuestionModal from '../QuestionModal'
import DownloadQuestionPaperModal from '../../../download_question_paper/DownloadQuestionPaperModal'

import './_createcustomsummery.scss'

export class CreateCustomSummerySection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BreadcrumbData: {
                Title: 'Create Question paper'
            },
            modalShow: false,
            modalShowTwo: false
        }
    }

    render() {
        return (
            <section className="create_custom_summery">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h6 className="heading mb-3">Summery</h6>
                    </Col>
                    <Col xl={5} lg={6} md={12} sm={12} xs={12}>
                        <Card className="summery_card border-0 shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">G-1</h6>
                                <i className="fas fa-info-circle" />
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col xl={1} lg={2} md={1} sm={1} xs={1}>
                                        <div className="branch_sections">
                                            <div className="title">Branches &amp; Sections</div>
                                        </div>
                                    </Col>
                                    <Col className="content">
                                        <Row className="g-0 px-3 pt-2 border-bottom">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-1</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-4</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-7</h6>
                                            </Col>
                                        </Row>
                                        <Row className="g-0 px-3 pt-2">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A6 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A4 </li>
                                                    <li>Section-A7 </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <hr className="my-0 line-style" />
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col xl={1} lg={2} md={1} sm={1} xs={1}>
                                        <div className="branch_sections">
                                            <div className="title">Syllabus</div>
                                        </div>
                                    </Col>
                                    <Col className="content">
                                        <Row className="g-0 px-3 pt-2 border-bottom">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Biology</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Physics</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Chemistry</h6>
                                            </Col>
                                        </Row>
                                        <Row className="g-0 px-3 pt-2">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-right">
                                <Link to="/#" className="text-dark font-weight-bold">View More</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col xl={5} lg={6} md={12} sm={12} xs={12}>
                        <Card className="summery_card border-0 shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">G-2</h6>
                                <i className="fas fa-info-circle" />
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col xl={1} lg={2} md={1} sm={1} xs={1}>
                                        <div className="branch_sections">
                                            <div className="title">Branches &amp; Sections</div>
                                        </div>
                                    </Col>
                                    <Col className="content">
                                        <Row className="g-0 px-3 pt-2 border-bottom">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-1</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-4</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Branch-7</h6>
                                            </Col>
                                        </Row>
                                        <Row className="g-0 px-3 pt-2">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A6 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A4 </li>
                                                    <li>Section-A7 </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <hr className="my-0 line-style" />
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col xl={1} lg={2} md={1} sm={1} xs={1}>
                                        <div className="branch_sections">
                                            <div className="title">Syllabus</div>
                                        </div>
                                    </Col>
                                    <Col className="content">
                                        <Row className="g-0 px-3 pt-2 border-bottom">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Biology</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Physics</h6>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                                <h6 className="branchName">Chemistry</h6>
                                            </Col>
                                        </Row>
                                        <Row className="g-0 px-3 pt-2">
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                    <li>Section-A5 </li>
                                                </ul>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sm={4} xs={4} className="branchGroup">
                                                <ul className="list-unstyled">
                                                    <li>Section-A1 </li>
                                                    <li>Section-A2 </li>
                                                    <li>Section-A3 </li>
                                                    <li>Section-A4 </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-right">
                                <Link to="/#" className="text-dark font-weight-bold">View More</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={10} lg={10} md={12} sm={12} xs={12} className="d-flex justify-content-between align-items-center">
                        <Link to="/questions/create-question-paper/create-custom-question-paper" className="py-3 px-5 btn btn-dark text-uppercase">Back</Link>
                        <Button className="btn btn-success text-uppercase" onClick={() => this.setState({ modalShow: true })}>Generate <br />Question Paper</Button>
                    </Col>
                </Row>
                <QuestionModal show={this.state.modalShow} showothermodal={() => this.setState({ modalShowTwo: true })} onHide={() => this.setState({ modalShow: false })} />
                <DownloadQuestionPaperModal show={this.state.modalShowTwo} onHide={() => this.setState({ modalShowTwo: false })} />
            </section>
        )
    }
}

export default CreateCustomSummerySection
