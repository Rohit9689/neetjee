import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap'
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading';

import './_createcustomquestions.scss'

class CreateCustomQuestionTypeSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbData: {
                Title: 'Custom Question Papers'
            }
        }
    }

    render() {
        return (
            <div className="Create_Question_Paper_type">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                        <h6 className="text-uppercase my-4">Select Exam Type</h6>
                    </Col>
                </Row>
                <Row>
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <Link to="/questions/create-question-paper/create-custom-question-paper/quick-question">
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fal fa-rocket" style={{rotate: '45deg'}} />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Quick Exam</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Single step to create Question Paper. This exam is only downloadable.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <Link to="/questions/create-question-paper/create-custom-question-paper/standard-question">
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fal fa-check-circle" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Standard</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>3 steps to create Question Paper. This exam is downloadable &amp; Online Schedulable for this need organization setup.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                        <Link to="/questions/create-question-paper/create-custom-question-paper/advance-question">
                            <Card className="shadow-sm border-0 single-card h-100">
                                <Card.Header className="py-3 d-flex justify-content-start bg-white shadow-sm border-0">
                                    <div className="icons schedule">
                                        <i className="fal fa-sliders-h" />
                                    </div>
                                    <h6 className="title mb-0 ml-5 pl-5 text-uppercase">Advance</h6>
                                </Card.Header>
                                <Card.Body className="pt-5">
                                    <Card.Text>Few steps to create Question Paper for multi branch, section &amp; Syllabus. This exam is downloadable &amp; Online Schedulable for this need organization setup.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateCustomQuestionTypeSection
