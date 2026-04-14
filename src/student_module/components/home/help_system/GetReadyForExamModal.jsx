import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class GetReadyForExamModal extends Component {
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
                                    <h2 className="title_rotate title_rotate_pos_PPE">GET READY FOR EXAM</h2>
                                </Col>
                                <Col sm={11}>
                                    <div className="overflow_scroll_without_header">
                                        <Row>
                                            <Col>
                                                <p>When you have an external exam use Get Ready for Exam to schedule an exam with the same syllabus. This brings all the short notes and revision materials for the scheduled exam in one place making preparation easier and efficient.</p>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/getReadyExam.png')} alt="img" />
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/jeeExam.png')} alt="img" />
                                                <p className="mt-2">Use the Chapter Filter option to select the Chapter from the subject list to revise.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <h5>Schedule Your Own Exam</h5>
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
                                                <h5>View Tour Own Exam History</h5>
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

export default GetReadyForExamModal
