import React, { Component } from 'react'
import { Row, Container, Col, Image, Media, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class GetReadyForExamToolModal extends Component {
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
                    <section className="">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col>
                                    <Media>
                                        <img
                                            className="mr-3"
                                            src={require('../../../../images/helpSystemImages/getReadyForExam_logo.png')}
                                            alt="Generic placeholder"
                                        />
                                        <Media.Body>
                                            <h5 className="mt-3">GET READY FOR EXAM</h5>

                                        </Media.Body>
                                    </Media>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <div className="overflow_scroll">
                                        <Row>
                                            <Col sm={6} className="mt-4">
                                                <p >GET READY for your internal & external exams with customized exams under GET READY FOR EXAM SECTION and schedule a mock exam based on the syllabus of the exam you are going to write soon.</p>
                                                <p className="mt-4">Choose from Chapter, Cumulative, Semi-Grand & Grand Tests that imitate the general exam patterns of NEET & JEE Educational Institutions.</p>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/getReadyExam.png')} alt="img" />
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/getReadyForExam_img.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <Image className="w-80 img_center" src={require('../../../../images/helpSystemImages/jeeExam.png')} alt="img" />
                                                <p className="mt-2">Use the Chapter Filter option to select the Chapter from the subject list to revise.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h5 className="text-underline">Schedule Your Own Exam : </h5>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <h6>Chapter Exam : </h6>
                                                        <p className="mt-1">Select Chapter Exam to create and schedule a custom exam in only one chapter per subject from the syllabus.</p>
                                                        <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/chapterExam.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <h6>Cummulative Exam : </h6>
                                                        <p className="mt-1">Select Cummulative Exam to create and schedule a custom exam with multiple chapters from different subjects from the syllabus.</p>
                                                        <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/cummulativeExam.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <h6>Semi Garnd Exam : </h6>
                                                        <p className="mt-1">Select Semi Grand Exam to create and schedule a custom exam with the entire syllabus for the selected Year.</p>
                                                        <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/semiGrandExam.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <h6>Grand Exam : </h6>
                                                        <p className="mt-1">Select Grand Exam to create and schedule an exam with the entire syllabus.</p>
                                                        <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/grandExam.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h5 className="text-underline">View Tour Own Exam History : </h5>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/ownExamHistory.png')} alt="img" />
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

export default GetReadyForExamToolModal
