import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class MeasureModal extends Component {
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
                    <section className="measure_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos">MEASURE</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="image_pos" src={require('../../../../images/helpSystemImages/measure_logo.png')} height="80" alt="img" />
                                        </Col>
                                    </Row>
                                    <div className="overflow_scroll" >
                                        <Row>
                                            <Col sm={6}>
                                                <h6>One can only improve what is measured.</h6>
                                                <p className="mt-2">As a student assessing and analyzing your performance is important. Continuous analysis provides you with a clear understanding of your areas of strengths and weakness.</p>
                                                <p className="mt-1">We provide a comprehensive and in depth analysis of your performance in this section.</p>
                                                <h6 className="mt-4">Results and Analysis</h6>
                                                <p className="mt-2">Your overall, class wise, subject wise, practise questions and exam questions wise accuracy is provided to help you better understand your overall performance.</p>
                                            </Col>
                                            <Col sm={6}>
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/measure_img.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-3">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/measures1.png')} alt="img" />
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <div className="text_left_align">
                                                    <p>
                                                        Further you can find a detailed analysis by time,
                                                        question type, complexity type and topic wise
                                                        analysis of your performance.
                                                        </p>
                                                    <p className="mt-4">In this overview you can use the sort option
                                                        to get a class wise and exam wise analysis.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-3">Results and Analysis.</h6>
                                                <p className="mt-2">Here you get to see how well you have been doing in your Practise and Exams. Your overall accuracy in
                                                the practise sessions, questions that appeared, correctly answered, incorrectly answered and how many
                                                of the incorrectly answered questions were corrected later is shown here. The number of skipped
                                                    questions are not shown here.</p>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/measure2.png')} alt="img" />
                                                <Row>
                                                    <Col sm={6}>
                                                        <div className="mt-4">
                                                            <p>
                                                                The practise accuracy is also shown based
                                                                on the class you have been practising. You
                                                                get to see how many chapters in each
                                                                subject you have not started practising yet,
                                                                the topics in the chapters in each subject t
                                                                hat you have started but not practised yet.
                                                                </p>
                                                            <p className="mt-2">This thorough analysis gives you a distinct
                                                                way to prepare better and improve.</p>
                                                            <p className="mt-2">On the right of the screen your performance
                                                                metrics during exams are shown.</p>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/measure3.png')} alt="img" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="mt-4">
                                                            <p>Your overall accuracy is shown here along with the following:</p>
                                                            <h6 className="mt-2">CUE - Cumulative Exams , CE - Chapter Exams , SGE - Semi Grand Exams , GE - Grand Exams , PP - Practise Papers.</h6>
                                                        </div>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p className="mt-3">Followed by the Questions that Appeared, Correctly Answered, Incorrectly Answered and the Skipped questions.</p>
                                                        <p className="mt-2">Your number of attempted questions and the accuracy per class is shown. Subject wise breakdown is shown below it.</p>
                                                        <p className="mt-2">The Subject vs Exams table shows how many questions in each exam were not under a specific chapter.</p>
                                                        <p className="mt-2">This Practise Exam Analysis should give a broad understanding of your subject wise performance
                                                            and improvement areas.</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-3">Strength Analysis.</h6>
                                                <p className="mt-2">In this section you get an in depth Subject wise and Class wise analysis of your performance in Practise and Exams.</p>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/measure4.png')} alt="img" />

                                                <Row>
                                                    <Col className="mt-4">
                                                        <p>Each subject is broken down into:</p>
                                                        <p className="mt-3"><b>Overall subject accuracy : </b>  Your overall accuracy, Class wise accuracy is shown</p>
                                                        <p className="mt-3"><b>Questions Appeared : </b>  Your performance in the different types of questions is shown
                                                            Your performance is further broken down into the number of questions that answered correctly, incorrectly
                                                            and skipped. Followed by your performance in the various difficulty level questions.</p>
                                                        <p className="mt-3">You are weak in below listed Chapters - These are the chapters that need more learning and practise.
                                                            Use the Accuracy cutoff filter to better understand your strengths and weaknesses chapter wise.</p>
                                                        <p className="mt-3"><b>Syllabus Analysis:</b> Your performance in the different types of questions is shown
                                                            Your performance is further broken down into the number of questions that answered correctly, incorrectly
                                                            and skipped. Followed by your performance in the various difficulty level questions.</p>
                                                        <p className="mt-3"><b>Time Analysis:</b> Ever asked how long it took to answer the question and why? How difficult was that
                                                            question and how did I perform?</p>
                                                        <p className="mt-3">Here is where you get to understand your time and improve your time management skills.</p>
                                                        <p className="mt-4">We have broken this down into 3 sections:</p>
                                                        <p className="mt-3"><b>Time vs Subjects:</b>Here you get to understand your performance in different subjects, the time taken to answer them and the
                                                            number of questions you were incorrect.</p>
                                                        <p className="mt-3"><b>Time vs Question type:</b>Here you get to understand your performance with various question types, the time taken to answer them
                                                            and the number of questions you were incorrect on.</p>
                                                        <p className="mt-3">Performing a regular time analysis provides a better Time Management strategy. A better Time management
                                                            strategy leads to achieving your goals.</p>
                                                        <p className="mt-3"><b>Complexity Analysis:</b>Complexity Analysis provides you with a complete understanding of your performance
                                                            with respect to the complexity of the questions asked.</p>
                                                        <p className="mt-3"><b>Time vs Error:</b>This section shows you how much time was spent answering a question of certain difficulty and
                                                            its result. You get to understand how to manage your time to answer effectively for the best performance.</p>
                                                        <p className="mt-3"><b>Exam Wise:</b>This section shows you your performance in Practise and Exams, how well you have handled
                                                            questions of various difficulties and the accuracy and errors.</p>
                                                        <p className="mt-3"><b>Complexity vs Subjects vs Exams:</b>This section shows your accuracy in different subjects and your
                                                            performance to the various complexities of questions.</p>
                                                        <p className="mt-3"><b>Complexity vs Question type:</b>This section shows your performance and accuracy in the various types of
                                                            questions (e.g Linkage, Statement, Comprehension etc.) vs their difficulty.</p>
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

export default MeasureModal
