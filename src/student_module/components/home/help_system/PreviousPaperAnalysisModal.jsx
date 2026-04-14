import React, { Component } from 'react'
import { Row, Container, Col, Image, Card, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class PreviousPaperAnalysisModal extends Component {
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
                    <section className="prev_paper_analysis_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos_PPA">PREVIOUS PAPERS ANALYSIS</h2>
                                </Col>
                                <Col sm={11}>
                                    <div className="overflow_scroll_without_header" >
                                        <Row>
                                            <Col>
                                                <p>SMART PLANNING always starts with Previous Papers Analysis. We realize the importance of this aspect of planning for JEE Mains & Advanced preparation / NEET and came up with a dedicated section for PREVIOUS PAPER ANALYSIS on our app & web dashboard.</p>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/previous_paper_analysis.png')} alt="img" />
                                                <p className="mt-4">OUR unique tools & data settings allow students to choose the previous year’s JEE MAINS & ADVANCED papers to get a detailed analysis on subjects, chapters & topics weightage, complexity & type of questions asked from each chapter & topic, type of questions falling into different categories like Formula, General, Linkage, Graphs, Reactions, etc.</p>
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

export default PreviousPaperAnalysisModal
