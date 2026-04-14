import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class ExecuteModal extends Component {
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
                    <section className="execute_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos">Execute</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="image_pos" src={require('../../../../images/helpSystemImages/exceute_logo.png')} height="80" alt="img" />
                                        </Col>
                                    </Row>
                                    <div className="overflow_scroll" >
                                        <Row>
                                            <Col sm={6}>
                                                <h6>Success comes from what is done consistently and one should never underestimate the power of practise.</h6>
                                                <p>EXECUTION of your PLAN is divided into 4 Steps for effective implementation.</p>

                                                <h6 className="mt-4">Step 1. Practise</h6>
                                                <p className="mt-2">After your classroom learning, use the Learn & Practice Section to select subjects, chapters & topics of your choice from the entire syllabus and attempt practice exams with instant feedback & reviewing features.</p>
                                                <p className="mt-2">From Practice to perfection- the execution part of ELAPP’s student help system is fully integrated with all the tools you need to crack your exam.</p>
                                                <p className="mt-2">In Learn & Practice Section, choose the subject & chapters from which you want to practice on that day and start practicing.</p>
                                            </Col>
                                            <Col sm={6}>
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/excecute_img.png')} alt="img" />
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
                                        <Row>
                                            <Col>
                                                <p>
                                                    <b>Exam Results :</b> The Exam Results page provides you with a general overview of the marks scored and your performance according to the previous question difficulties.
                                                </p>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_examReults.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Clicking on the Detailed Analysis (In Depth Report) button generates a detailed report for the exam.
                                                </p>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_detAna.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <p className="text_left_align">The first tables gives you a subject wise breakdown of the total questions that appeared,answered and not answered,followed by the correct and incorrect answers.This then gives you the marks scored for the correct answers and the make lost for incorrect answers.your overAll accuracy,total time and your average time per question is shown.</p>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-60">
                                                <p className="text_right_align">The next table provides your time analysis. The number of questions per subject that you had answered on time,overtime and undertime along with your accuracy and speed.</p>
                                            </Col>
                                            <Col sm={6} className="mt-2">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_questionTypeAnalysis.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-3">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_examQuestions.png')} alt="img" />
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <div className="text_left_align">
                                                    <p>
                                                        The Question Type Analysis gives you a clear understanding of your performance with respect to the question types asked, your accuracy, correct, incorrect, skipped, total time spent and the average time per question.
                                                    </p>
                                                    <p className="mt-4">The Exam questions type table provides an overview of the number of questions answered correctly, incorrectly and skipped with respect to the question type.This table provides an insight into your performance for different question types.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-60">
                                                <p className="text_right_align">The Observation section provides you with insights into which areas of syllabus, question type you need to spend more time preparing.</p>
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_obser_error.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-3">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_answer_comp_time.png')} alt="img" />
                                            </Col>
                                            <Col sm={6} className="mt-60">
                                                <p className="text_left_align">The question type analysis gives you a clear understanding of your performance with repect to the question types asked, your accuracy, correct, incorrect, skipped, total time spent and the average time per question.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6} className="mt-60">
                                                <p className="text_right_align">The Question Theory section provides you with your Accuracy, Correct, Incorrect, Not Answered, Total Time in minutes and the average time per question with respect to the Question Theory.</p>
                                            </Col>
                                            <Col sm={6} className="mt-2">
                                                <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_QuestionTheory.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>Chapter Wise Analysis section provides helpful information about performance in all the chapters per subject.</p>
                                                <p className="mt-2">Performance a regular detailed analysis on your performance will provide will you with valualbe insighths that make you better at understanding, realizing and applying the various concepts that you have learnt in ypur classroom and revised here on ELAPP.This regular analysis not only pinpoints your strengths ans weaknesses but it also identifies the blind zones which you might have missed earlier.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-4">Step 2. Get Ready for Exam</h6>
                                                <p className="mt-2">When you have an external exam use Get Ready for Exam to schedule an exam with the same syllabus.This brings all the short notes and revision materials for the scheduled exam in one place making preparation easier and efficient.</p>
                                                <Image className="w-80 mt-2" src={require('../../../../images/helpSystemImages/execute_readyforexam.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h6 className="mt-4">Step 3. Exam</h6>
                                                <p className="mt-2">The exam section lets you take a scheduled exam, create custom exams, take an Error Exam and Attempt the previous years exam papers.</p>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_scheduledExam.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <p className="text_left_align">Scheduled Exam lets you take any of the exams scheduled for you.</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
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
                                                <h6 className="mt-4">Step 4. Error Exams</h6>
                                                <Row>
                                                    <Col sm={6} className="mt-3">
                                                        <Image className="w-80" src={require('../../../../images/helpSystemImages/execute_error_exams.png')} alt="img" />
                                                    </Col>
                                                    <Col sm={6} className="mt-60">
                                                        <p className="text_left_align">Error Exams are another unique feature of our platform. This section lets you retake and correct the previous error questions during practise and past exams. Error exam points the type of mistakes made.</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p className="mt-3">
                                                            <b>Previous Exam Papers</b>
                                                        </p>
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP1.png')} alt="img" />
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP2.png')} alt="img" />
                                                        <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP3.png')} alt="img" />
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

export default ExecuteModal
