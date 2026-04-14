import React, { Component } from 'react'
import { Row, Col, Modal, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './_startErrorExam.scss'

class ModalSection extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    startExam = (data) => {
        this.props.onHide();
        
        localStorage.setItem("ocid", data.getChapterId.ocid);
        localStorage.setItem("otid", data.getChapterId.otid);
        localStorage.setItem("subjectid", data.getChapterId.subjectid);
        localStorage.setItem("unanswered", data.stateData.unanswered);
        localStorage.setItem("erranswered", data.stateData.erranswered);
        localStorage.setItem("type", "error");
        window.open("/student/subject/practice-errortest", "_blank")
    }
    render() {
        console.log("ModalSection", this.props.getErrorDetails.overall.not_answered);
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg"><i className="fas fa-info-circle" /> Section</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Row>
                            
                            <Col lg={12} md={12} sm={12} className="my-3">
                                <h6>Question Type</h6>
                                <Card as={Card.body} className="p-2 mb-2">
                                    <Row className="px-2 justify-content-between align-items-center">
                                        <Form.Label className="mb-0">Un-Answered - <span className="font-weight-bold">{this.props.getErrorDetails.overall.not_answered}</span></Form.Label>
                                        <Form.Check
                                            custom
                                            type="checkbox"
                                            id="custom-checkboxThree"
                                            label=""
                                            name="unanswered"
                                            value={this.props.getErrorDetails.overall.not_answered}
                                            //value={this.props.getErrorDetails.practice.not_answered}
                                            onChange={this.props.parenthandleInpuchange}
                                            defaultChecked={true}

                                        />
                                    </Row>
                                </Card>
                                <Card as={Card.body} className="p-2 mb-2">
                                    <Row className="px-2 justify-content-between align-items-center">
                                        <Form.Label className="mb-0">Error Questions - <span className="font-weight-bold">{this.props.getErrorDetails.overall.wrong_answered}</span></Form.Label>
                                        <Form.Check
                                            name="erranswered"
                                            custom
                                            type="checkbox"
                                            id="custom-checkboxFour"
                                            label=""
                                            //value={this.props.getErrorDetails.practice.wrong_answered}
                                            value={this.props.getErrorDetails.overall.wrong_answered}
                                            onChange={this.props.parenthandleInpuchange}
                                            defaultChecked={true}
                                        />
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        {this.props.stateData.unanswered > 0 || this.props.stateData.erranswered > 0 ? (<Row className="mt-2 start_error">
                            <Col lg={6} md={12} sm={12}>
                                <a className="btn btn-start-exam px-5"
                                    onClick={() => this.startExam(this.props)}
                                
                                >
                                    Start Error Exam
                                </a>
                            </Col>
                        </Row>) : ("")}

                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4 start_error">
                    <Button className="btn btn-start-exam px-5" onClick={() => { this.props.onHide() }}><i className="fal fa-times" /> Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalSection
