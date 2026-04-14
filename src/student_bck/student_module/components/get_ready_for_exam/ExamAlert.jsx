import React, { Component } from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
class ExamAlert extends Component {
    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                {this.props.stateData.status == 2 ?(
                    <div className="text-center">
                    <Image src={require('../../../images/deletealert.jpg')} width="40" alt="locked image" />
                    <p className="text-danger mt-3">Exam deleted successfully</p>
                </div>
                ):
                this.props.stateData.status == 3 ?(
                    <div className="text-center">
                    <Image src={require('../../../images/deletealert.jpg')} width="40" alt="locked image" />
                    <p className="text-danger mt-3">Exam not deleted </p>
                </div>
                )
                :(<div className="text-center">
                        <Image src={require('../../../images/deletealert.jpg')} width="40" alt="locked image" />
                        <p className="text-dark mt-3">Dear Student <br />
                        Do you want to delete this exam?</p>
                    </div>)}
                    
                    
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center m-0 p-0">
                    <Button
                        onClick={() => this.props.handleDelete()}
                        variant="link text-decoration-none text-dark font-weight-bold m-0">Delete Now</Button>
                    <div className="border-right" style={{ height: 48 }}>&nbsp;</div>
                    <Button variant="link text-decoration-none text-dark px-5 m-0" onClick={() => this.props.onHide()}>Cancel</Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default ExamAlert
