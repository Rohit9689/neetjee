import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class PromoteModalSuccess extends Component {
    render() {

        return (
            <Modal {...this.props}
                size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Status</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-5 text-center">
                    <i className="fal fa-check-circle fa-fw fa-3x text-success mb-3" />
                    <h6>Promoted <br /> Successfully</h6>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button variant="success" className="px-5" onClick={() => { this.props.onHide() }}>close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PromoteModalSuccess
