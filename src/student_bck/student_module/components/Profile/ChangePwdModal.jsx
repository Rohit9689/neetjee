import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

class ChangePwdModal extends Component {
    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group controlId="oldPwd">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="newPwd">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="conformPwd">
                            <Form.Label>Conform Password</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group>
                            <Button className="btn btn-blue" type="submit">Save</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ChangePwdModal
