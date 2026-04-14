import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'
import '../../../../react-datetime.css'

class ManageQuestionModal extends Component {

    render() {
        var yesterday = DateTime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Reschedule online question paper</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.props.stateData.currentStep == 2 ? (
                        <Form.Text className="form-text text-danger">
                            Resheduled Successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError}
                            </Form.Text>
                        )}
                    <Row>
                        <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} >
                            <Form>
                                <Row>
                                    <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                        <Form.Label className="text-uppercase">Start Date</Form.Label>
                                        <DateTime

                                            name="startdate"
                                            dateFormat="DD-MM-YYYY"
                                            inputProps={{ placeholder: 'Ex: 02-04-1995' }}
                                            onChange={this.props.datefunction}
                                            isValidDate={valid}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.startdate}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={6} md={12} sm={12} controlId="EndDate">
                                        <Form.Label className="text-uppercase">End Date</Form.Label>
                                        <DateTime


                                            name="enddate"
                                            onChange={this.props.datefunctionend}
                                            dateFormat="DD-MM-YYYY"
                                            inputProps={{ placeholder: 'Ex: 29-05-1995' }}
                                            isValidDate={valid}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.enddate}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={6} md={12} sm={12}>
                                        <Button
                                            onClick={this.props.ParenthandleFormSubmit}
                                            className="btn btn-success text-uppercase px-lg-5 ml-1">Submit</Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ManageQuestionModal
