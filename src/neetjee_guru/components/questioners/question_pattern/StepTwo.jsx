import React, { Component } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'

class StepTwo extends Component {
    render() {
        console.log("this.props.stateData", this.props.stateData);
        if (this.props.currentStep !== 2) {
            return null;
        }
        return (
            <Row className="stepTwo mt-5">
                {this.props.stateData.subArray.map((subjectData, index1) => (
                    <Col xl={4} lg={4} md={12} sm={12}>
                        <div className="biology_card my-3">
                            <h6 className="title text-uppercase">{subjectData.subject}</h6>
                            <Form>
                                <Card as={Card.Body} className="border-0 shadow-sm">
                                    <Row className="px-2 mb-2 justify-content-between">
                                        <Form.Label className="text-uppercase">Type of Question</Form.Label>
                                        <Form.Label className="text-uppercase">{subjectData.totnoofquestions}</Form.Label>
                                    </Row>
                                    {subjectData.toq.map((questionTypeData, index2) => (
                                        <Row>
                                            <Form.Group as={Col} xl={8} lg={8} md={7} sm={7} xs={7} controlId="InputAR">
                                                <Form.Control
                                                    type="text"
                                                    placeholder={questionTypeData.questionType}
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={4} lg={4} md={5} sm={5} xs={5} controlId="InputARValue">
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name={questionTypeData.questionType}
                                                    autoComplete="off"
                                                    value={questionTypeData.noofquestion}
                                                    onChange={(e) => this.props.parentTypeOfQuestion(e, index2, subjectData.id, questionTypeData.id, index1)}
                                                />
                                                <Form.Text className="form-text text-danger">
                                                    {questionTypeData.numberError}
                                                </Form.Text>
                                                <Form.Text className="form-text text-danger">
                                                    {questionTypeData.noofqerror}
                                                </Form.Text>


                                            </Form.Group>
                                        </Row>
                                    ))}
                                </Card>
                                <Card as={Card.Body} className="footer_card border-0 shadow-sm">
                                    <Row className="px-2 mb-2 justify-content-between">
                                        <Form.Label className="text-uppercase">Question Theory</Form.Label>
                                        <Form.Label className="text-uppercase">{subjectData.totnoofquestions}</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xl={8} lg={8} md={7} sm={7} xs={7} controlId="InputApplication">
                                            <Form.Control type="text" placeholder="Application" disabled />
                                        </Form.Group>

                                        <Form.Group as={Col} xl={4} lg={4} md={5} sm={5} xs={5} controlId="InputApplicationValue">

                                            <Form.Control
                                                name="application"
                                                type="text"
                                                value={subjectData.application}
                                                autoComplete="off"
                                                onChange={(e) => this.props.parentSubjectFunction(e, index1)}

                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xl={8} lg={8} md={7} sm={7} xs={7} controlId="InputConceptn">
                                            <Form.Control type="text" placeholder="Concept" disabled />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={5} sm={5} xs={5} controlId="InputConceptnVAlue">
                                            <Form.Control
                                                name="concept"
                                                type="text"
                                                value={subjectData.concept}
                                                onChange={(e) => this.props.parentSubjectFunction(e, index1)}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Card>
                            </Form>
                        </div>
                    </Col>
                ))}
            </Row>
        )
    }
}

export default StepTwo
