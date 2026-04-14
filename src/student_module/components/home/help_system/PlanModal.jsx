import React, { Component } from 'react'
import { Row, Container, Col, Image, Card, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class PlanModal extends Component {
    render() {
        return (
            <Modal {...this.props} className="modal_width"

                size="lg" fade="true" aria-labelledby="example-modal-sizes-title-lg" >

                <Modal.Body className="p-0 mb-4">
                    <Container>
                        <Row>
                            <Col className="colse_btn_zindex"><span className="close_btn" onClick={() => { this.props.onHide() }}>X</span></Col>
                        </Row>
                    </Container>
                    <section className="plan_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate">PLAN</h2>
                                </Col>
                                <Col sm={11}>
                                    <Image className="image_pos" src={require('../../../../images/helpSystemImages/plan_logo.png')} height="80" alt="img" />
                                    <div className="overflow_scroll">
                                        <Row>
                                            <Col sm={6}>
                                                <h6>A goal without a plan is just a wish!!</h6>
                                                <p>In this phase as a student, it is important for you to<br /> understand the following</p>
                                                <ul className="list-struture">
                                                    <li>Exam Structure </li>
                                                    <li>Syllabus </li>
                                                    <li>Complexity of the questions </li>
                                                    <li>Type of questions</li>
                                                    <li>Question Theory</li>
                                                </ul>
                                                <p className="mt-3">Some of the above aspects are only understood by Analysing the previous years question papers.</p>
                                                <h6 className="mt-2">ELAPP will help you in all these aspects.</h6>
                                            </Col>
                                            <Col sm={6}>
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/plan_img.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/previous_paper_analysis.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="mt-3">Use the Previous Paper Analysis and select multiple previous papers in IIT JEE advanced and mains,
                                                    perform a deep analysis and gain a better understand on the different types of questions</p>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card className="bg_light_yellow p-3 text-center mt-120 border-0 height310">
                                                    <Card.Body >
                                                        <Image className="image_block_pos w-100" src={require('../../../../images/helpSystemImages/plan_topic_view.png')} alt="img" />
                                                        <Card.Title className="mt-80">Chapter View</Card.Title>
                                                        <Card.Text>
                                                            You will get to know chapter wise and topic wise weightage for each subject.
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col>
                                                <Card className="bg_light_yellow p-3 text-center mt-120 border-0 height310">
                                                    <Card.Body>
                                                        <Image className="image_block_pos w-100" src={require('../../../../images/helpSystemImages/plan_topic_view.png')} alt="img" />
                                                        <Card.Title className="mt-80">Topic View</Card.Title>
                                                        <Card.Text>
                                                            You will get an overview of the weightage of the topics in each subject and the various question types asked.
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col>
                                                <Card className="bg_light_yellow p-3 text-center mt-120 border-0 height310">
                                                    <Card.Body>
                                                        <Image className="image_block_pos w-100" src={require('../../../../images/helpSystemImages/plan_topic_view.png')} alt="img" />
                                                        <Card.Title className="mt-80">Linkage View</Card.Title>
                                                        <Card.Text>
                                                            Our unique "Linkage View" will help you in understand how questions are formed by connecting different concepts in the same chapter or different concepts from different chapters in each subject.
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h5>Complexity of questions</h5>
                                            </Col>
                                            <Row>
                                                <Col sm={6} className="mt-3">
                                                    <p className="text_right_align">
                                                        Here you can understand how many easy,moderate,difficult and extremely difficult questions have appeared in the previous papers.You will also find a subject wise breakdown based on Complexity.
                                                    </p>
                                                </Col>
                                                <Col sm={6} className="mt-3">
                                                    <Image className="w-100" src={require('../../../../images/helpSystemImages/plan_complexity_question.png')} alt="img" />
                                                </Col>
                                            </Row>

                                        </Row>
                                        <Row>

                                            <Col className="mt-4">
                                                <h5>Question Type</h5>
                                            </Col>
                                            <Row>
                                                <Col sm={6} className="mt-3">
                                                    <Image className="w-100" src={require('../../../../images/helpSystemImages/plan_question_type.png')} alt="img" />
                                                </Col>
                                                <Col sm={6} className="mt-3">
                                                    <p className="text_left_align">
                                                        Here you can understand what kind of questions were asked.If they were formulae based,numerical,linkage or any of the other question types.
                                                    </p>

                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h5>Question Theory</h5>
                                            </Col>
                                            <Row>
                                                <Col sm={6} className="mt-3">
                                                    <p className="text_right_align">
                                                        Here you can understand how many questions were application based and concept based.
                                                    </p>
                                                </Col>
                                                <Col sm={6} className="mt-3">
                                                    <Image className="w-80" src={require('../../../../images/helpSystemImages/plan_question_theory.png')} alt="img" />
                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h6>This detailed understand of the previous papers provides you with knowledge and removes any myths concerning these competative exams.</h6>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                        </Container>
                    </section>

                </Modal.Body>
            </Modal>


        )
    }
}

export default PlanModal
