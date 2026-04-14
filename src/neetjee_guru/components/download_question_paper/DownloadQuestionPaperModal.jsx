import React, { Component } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'

class DownloadQuestionPaperModal extends Component {
    render() {
        console.log("filename", this.props.filename);
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header
                    //onClick={(e) => this.props.pdfhidefunction}
                    closeButton
                >
                    <Modal.Title>Download Question Paper</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="text-center">
                            <iframe title="myPdf" src={this.props.filename} width="100%" height="500px"> </iframe>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <a href={this.props.filename} className="btn btn-success" download>Download Question Paper</a>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DownloadQuestionPaperModal
