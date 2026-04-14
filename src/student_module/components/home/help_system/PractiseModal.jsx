import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "./_helpsystem.scss";

class PractiseModal extends Component {
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
                                    <h2 className="title_rotate title_rotate_pos">PRACTISE</h2>
                                </Col>
                                <Col sm={11}>
                                    <div class="overflow_scroll_without_header">
                                        <Row>
                                            <Col>
                                                <p className="mt-4">
                                                    After your classroom learning, use the Learn & Practice Section to select subjects, chapters & topics of your choice from the entire syllabus and attempt practice exams with instant feedback & reviewing features.
                                                </p>
                                                <p className="mt-2">
                                                    From Practice to perfection- the execution part of ELAPP’s student help system is fully integrated with all the tools you need to crack your exam.
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="mt-3">If you are repeating your mistakes, you are not practicing right. Now, you can select reasons for your incorrect attempts and add your personal notes to each question you have attempted.</p>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={5}>
                                                <Image className="" src={require('../../../../images/helpSystemImages/execute_LP.png')} alt="img" />
                                            </Col>
                                            <Col sm={3}>
                                                <p className="mt-80">
                                                    Use the Practise section for each chapter.Read the practise instructions carefully and start practise.
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Image className="float-right execute_phy_align w-80" src={require('../../../../images/helpSystemImages/excetute_phy.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>
                                                    In case of incorrect answer , you can get  add additional comments.This helps in preventing you from making similar mistakes in failure.
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Image className="w-80 img_center" src={require('../../../../images/helpSystemImages/excute_reason_comment.png')} alt="img" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <p>
                                                    Use the settings option to filter questions based on the complexity.Question Theory and Types of Questions.
                                                </p>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_typeofQuestions.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Every practice session is timed so that you can later analyse and better your Time Management.
                                                </p>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_exitPractise.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <div className="text_left_align">
                                                            <p> Use the Exit Practise to leave the current practise session.</p>
                                                            <p className="mt-4">At the End of every practise session you get to see a detailed report of your performance during the session.</p>
                                                        </div>


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

export default withRouter(PractiseModal);
