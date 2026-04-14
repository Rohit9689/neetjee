import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class ExamModal extends Component {
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
                    <section className="prev_paper_exam_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos_PPA">CUSTOM EXAM</h2>
                                </Col>
                                <Col sm={11}>
                                    <div className="overflow_scroll_without_header">
                                        <Row>
                                            <Col>
                                                <h6 className="mt-4">Scheduled Exam : </h6>
                                                <p className="mt-2">The exam section lets you take a scheduled exam, create custom exams, take an Error Exam and Attempt the previous years exam papers.</p>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_scheduledExam.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <p className="text_left_align">Scheduled Exam lets you take any of the exams scheduled for you by the college or ELAPP.</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-4">Custom Exam : </h6>
                                                <p>
                                                    Use the Custom Exam section to create and take a customised exam.You can choose from Chapter Exam, Cummulative Exam, semi Grand Exam and Grand Exam.
                                                </p>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_examTypes.png')} alt="img" />
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_subjectChapters.png')} alt="img" />
                                                <p>
                                                    The Previous Papers section lets you take a customized exam from the previous years questions or attempt any of the previous papers to test your knowledge and prepare better.
                                                </p>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_advancedoptions.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-4">
                                                        <div className="text_left_align">
                                                            <p>
                                                                The above custom exams can be tailored by using the advanced options.
                                                            </p>
                                                            <p className="mt-4">The advanced options give you the ability to choose and customized your exam further to test yourself in different methods. </p>
                                                            <p className="mt-4">Here are the various options in which you can customized further.</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p className="mt-3">
                                                            <b>Types of Questions:</b> Linkage, Statement, Matching, Diagram, Comprehension, Formula
                                                        </p>
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_subject_typeofQuestions.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p className="mt-3">
                                                            <b>Complexity:</b> Easy, Moderate, Difficult, Highly Difficult
                                                        </p>
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_complexity.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p className="mt-3">
                                                            <b>Question Theory:</b> Concept, Application
                                                        </p>
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_concept_application.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-4">Error Exams : </h6>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_error_exams.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <p className="text_left_align">Error Exams are another unique feature of our platform. This section lets you retake and correct the previous error questions during practise and past exams. Error exam points the type of mistakes made.</p>
                                                    </Col>
                                                </Row>

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

export default ExamModal
