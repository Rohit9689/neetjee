import React, { Component } from 'react'
import { Link } from "react-router-dom";
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, Tabs, Tab } from 'react-bootstrap'
import CardGroupComponent from './CardGroupComponent'
import CustomPatternData from './CustomPatternData'

import './_createquestionpaper.scss'

class CreateQuestionPaperSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BreadcrumbData: {
                Title: 'Create Question Papers'
            }
        }

        this.popoverHide = React.createRef();
    }


    render() {
        const popover = (
            <Popover {...this.props} id="filter-popover" style={{ maxWidth: '250px' }}>
                <Popover.Content>
                    <Tabs defaultActiveKey="exam" transition={false} id="main-tab-example">
                        <Tab eventKey="exam" title="Exam">
                            <ul className="list-unstyled custom-list m-0 p-0">
                                <li>
                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxOne">NEET</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxTwo">Jee (Mains)</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxThree" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxThree">Jee (Advance)</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxFour" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxFour">EAMCET</Form.Check.Label>
                                    </Form.Check>
                                </li>
                            </ul>
                        </Tab>
                        <Tab eventKey="class" title="Class">
                            <ul className="list-unstyled custom-list m-0 p-0">
                                <li>
                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxOne">XI-Class</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxTwo">XII-Class</Form.Check.Label>
                                    </Form.Check>
                                </li>
                            </ul>
                        </Tab>
                        <Tab eventKey="section" title="Section">
                            <ul className="list-unstyled custom-list m-0 p-0">
                                <li>
                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxOne">Section - A</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxTwo">Section - B</Form.Check.Label>
                                    </Form.Check>
                                </li>
                                <li>
                                    <Form.Check type="checkbox" id="checkboxThree" custom>
                                        <Form.Check.Input type="checkbox" />
                                        <Form.Check.Label htmlFor="checkboxThree">Section - C</Form.Check.Label>
                                    </Form.Check>
                                </li>
                            </ul>
                        </Tab>
                    </Tabs>
                    <div className="bg-light text-center border-top p-2" block={true}>
                        <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="pt-0 pb-0">
                            Submit
                        </Button>
                    </div>
                </Popover.Content>
            </Popover>
        );
        return (
            <section className="Create_Question_Paper">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Row>

                            {/* <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Link to="/questions/create-question-paper/own-question-paper/main-custom">
                                    <Card className="single_question_card shadow-sm border-0 mb-3">
                                        <Card.Header className="icon_block bg-white">
                                            <div className="icons custom">
                                                <i className="fal fa-file-alt" />
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="content_block pt-5">
                                            <h6 className="title">Create Custom</h6>
                                            <p className="sub_title mb-0">Exams are scheduled from college and from other sources</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col> */}

                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Link to="/questions/create-question-paper/own-question-paper/mock-exam">
                                    <Card className="single_question_card shadow-sm border-0 mb-3">
                                        <Card.Header className="icon_block bg-white">
                                            <div className="icons custom">
                                                <i className="fal fa-file-alt" />
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="content_block pt-5">
                                            <h6 className="title">Mock Tests</h6>
                                            <p className="sub_title mb-0">Mock Tests are scheduled from college.</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>

                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Link
                                    to="/questions/create-question-paper/own-question-paper/old-exam"

                                >
                                    <Card className="single_question_card shadow-sm border-0 mb-3">
                                        <Card.Header className="icon_block bg-white">
                                            <div className="icons public">
                                                <i className="fal fa-signal-stream" />
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="content_block pt-5">
                                            <h6 className="title">Old Public Exam</h6>
                                            <p className="sub_title mb-0">Exams are scheduled from college and from other sources</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Link
                                    to="/questions/create-question-paper/own-question-paper/college-exam"

                                >
                                    <Card className="single_question_card shadow-sm border-0 mb-3">
                                        <Card.Header className="icon_block bg-white">
                                            <div className="icons adaptive">
                                                <i className="fal fa-clipboard-list-check" />
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="content_block pt-5">
                                            <h6 className="title">College Exam</h6>
                                            <p className="sub_title mb-0">Exams are scheduled from college.</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>

                            {/* <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Link
                                    to="/questions/create-question-paper/own-question-paper/ELAPP-exam"

                                >
                                    <Card className="single_question_card shadow-sm border-0 mb-3">
                                        <Card.Header className="icon_block bg-white">
                                            <div className="icons adaptive">
                                                <i className="fal fa-clipboard-list-check" />
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="content_block pt-5">
                                            <h6 className="title">ELAPP Exam</h6>
                                            <p className="sub_title mb-0">Exams are scheduled from ELAPP.</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col> */}
                        </Row>
                    </Col>
                </Row >
                <Row className="mt-4">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                            <h2 className="title h5 mb-0">Create Question Paper From Categories</h2>
                            {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover} ref={r => (this.popoverHide = r)} rootClose>
                                <Button variant="light-link"><i className="fas fa-filter" /></Button>
                            </OverlayTrigger> */}
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Row>
                            <CardGroupComponent
                                CustomPatternQuestionsData={CustomPatternData}
                            />
                        </Row>
                    </Col>
                </Row>
            </section >
        )
    }
}

export default CreateQuestionPaperSection
