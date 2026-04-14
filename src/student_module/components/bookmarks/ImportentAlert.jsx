import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

class ImportentAlert extends Component {
    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="text-center">
                        <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                        <h5 className="text-danger">No Data Available</h5>
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}

export default ImportentAlert
