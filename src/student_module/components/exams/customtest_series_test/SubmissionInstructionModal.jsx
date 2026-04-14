import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Image, Modal, Button } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import '../../navbars/_navbars.scss'

class SubmissionInstructionModal extends Component {
    minutesTimer = (data) => {
        var date = new Date(data * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        var t = hh + ":" + mm + ":" + ss;
        return t;
    }
    render() {
        console.log("SubmissionInstructionModal", this.props.questions);
        const tquestions = this.props.questions.length;
        const attempted = this.props.questions.filter((a) => a.status == "attempt").length;
        // const skipped = this.props.questions.filter((a) => a.status == "skip" && a.review == false).length;
        const skipped = this.props.questions.filter((a) => a.status == "skip" && a.review==false  || (a.status == "" && a.saveandnext == "1" && a.review==false)).length;
        const notviewed = this.props.questions.filter((a) => a.status == "").length;
        const reviewlater = this.props.questions.filter((a) => a.review == true).length;
        const anareviewlater = this.props.questions.filter((a) => a.review == true && a.status == "attempt").length;

        return (

            <Modal className="result-modal-custom" {...this.props} centered
                size="lg" aria-labelledby="example-modal-sizes-title-md">
                <Modal.Body className="pt-0">
                    <Button variant="link text-decoration-none text-muted p-0 position-absolute" style={{ right: 10, top: 10 }} onClick={() => this.props.onHide()}>X</Button>
                    <div className="text-center">
                        <Image src={require('../../../../images/human_error.png')} width="150" alt="img" />
                    </div>
                    <div className="font-weight-bold text-danger text-center mb-1">
                        {this.props.finishsubmitError}
                    </div>

                    <h5 className="font-weight-bold text-center h5 mb-1 text-uppercase">Are you sure you want to Submit the Test ?</h5>
                    <h6 className="font-weight-bold text-center h5 mb-3 text-uppercase">(Click Continue To Continue Your Test Before Submission)</h6>

                    {/* <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="text-center my-3">
                            <h5><i className="far fa-clock text-primary mr-3" /> Time left: <span>02:33:45</span></h5>
                        </Col>
                    </Row> */}
                    <div className="content">
                        <Row>
                            <Col xl={4} lg={4} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span className="light">{tquestions}</span> </li>
                                    <li className="list-inline-item">Total Questions</li>
                                </ul>
                            </Col>
                            <Col xl={4} lg={4} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span className="success">{attempted}</span> </li>
                                    <li className="list-inline-item">Answered</li>
                                </ul>
                            </Col>
                            <Col xl={4} lg={4} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span style={{ backgroundColor: "#aeaeae" }} className="text-white">{notviewed}</span> </li>
                                    <li className="list-inline-item">Not Viewed</li>
                                </ul>
                            </Col>
                            <Col xl={4} lg={4} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span style={{ backgroundColor: "#f9c52d" }} className="text-white">{skipped}</span> </li>
                                    <li className="list-inline-item">Skipped</li>
                                </ul>
                            </Col>
                            <Col xl={4} lg={4} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span style={{ backgroundColor: "#36a1f5" }} className="text-white">{reviewlater}</span> </li>
                                    <li className="list-inline-item">Marked For Review</li>
                                </ul>
                            </Col>
                            <Col xl={5} lg={5} md={12} sm={12}>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><span style={{ backgroundColor: "#36a1f5" }} className="text-white">{anareviewlater}<i className="far fa-check-circle" /></span></li>
                                    <li className="list-inline-item ">Answered and Marked for Review
                                    {/* <br/>(will be considered for evalution) */}
                                    </li>
                                </ul>
                            </Col>
                            <Col xl={7} lg={7} md={12} sm={12}>
                                {this.props.finishsubmitError != "" ? (
                                    <div className="d-flex justify-content-start">
                                        <a onClick={() => this.props.cancelFunction()} className="btn-lightblue-outline rounded-pill mx-2 px-4 text-decoration-none font-weight-bold">Close Test</a>
                                    </div>
                                ) : (
                                        <div className="d-flex justify-content-start">
                                            <a onClick={() => this.props.handleFormSubmit()} className="btn-lightblue-outline rounded-pill mx-2 px-4 text-decoration-none">Submit Test</a>
                                            <a onClick={() => this.props.onHide()} className="btn-lightblue rounded-pill mx-2 px-4 text-decoration-none">Continue Test</a>
                                        </div>
                                    )}

                            </Col>
                        </Row>

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default withRouter(SubmissionInstructionModal);
