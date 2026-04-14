import React, { Component } from 'react'
import { Modal, Form, Button, Badge, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
//import { Row, Card, Col, Modal, Form, Button, ButtonGroup } from 'react-bootstrap';

class PracticeAndExamChapterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chData: []
        }
    }
    render() {
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4" style={{ height: 522, overflowY: 'auto' }}>

                    <ul className="list-unstyled m-0 p-0">
                        <Form.Text className="form-text text-danger">
                            {this.props.submitError}
                        </Form.Text>
                        {this.props.data.map((item, index) => {
                            return (
                                <li className="mb-3">
                                    <div className="d-flex">

                                        <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                            <Form.Check type="checkbox" id={"checkboxOne" + index} custom>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="chaptercheck"
                                                    value=""
                                                    checked={item.checked}
                                                    onClick={(e) => this.props.handleInputChange(e, item.id)}
                                                />
                                                <Form.Check.Label htmlFor={"checkboxOne" + index}>{item.chapter}</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </div>
                                </li>

                            )
                        }
                        )}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success text-uppercase px-lg-5 ml-1"
                        onClick={this.props.startExamhandleFormSubmit}
                    >Start Now</Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default PracticeAndExamChapterModal
