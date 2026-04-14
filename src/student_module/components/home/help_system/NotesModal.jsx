import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class NotesModal extends Component {
    render() {
        return (
            <Modal {...this.props} className="modal_width"

                size="lg" fade="true" aria-labelledby="example-modal-sizes-title-lg" >

                <Modal.Body className="p-0 mb-4">
                    <Container>
                        <Row>
                            <Col className="colse_btn_zindex"><span className="close_btn" onClick={() => { this.props.onHide() }}>X</span></Col>
                        </Row>
                    </Container>
                    <section className="">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col>
                                    <div className="d-flex">
                                        <img
                                            className="mr-3"
                                            src={require('../../../../images/helpSystemImages/notes_logo.png')}
                                            alt="Generic placeholder"
                                        />
                                        <div>
                                            <h5 className="mt-3">Notes</h5>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <div className="overflow_scroll">
                                        <Row>
                                            <Col sm={6} className="mt-4">
                                                <p >Notes lets you to add pictures or additional information to the short notes for easy reference in the future.</p>
                                                <p className="mt-4">Did you find a difficult problem that is different from the others? Add them to Notes.</p>
                                                <p className="mt-4">Did you find an easier way to solve the problem add them to Notes.</p>
                                                <p className="mt-4">Use the various tags available or create your own tag You can find all the notes added in the Notes section.</p>
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/notes_img.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <Image className="w-100 img_center" src={require('../../../../images/helpSystemImages/notes1.png')} alt="img" />
                                                <Image className="w-50 img_center mt-2" src={require('../../../../images/helpSystemImages/notes2.png')} alt="img" />
                                                <Image className="w-50 img_center mt-2" src={require('../../../../images/helpSystemImages/notes3.png')} alt="img" />
                                                <Image className="w-50 img_center mt-2" src={require('../../../../images/helpSystemImages/notes4.png')} alt="img" />
                                            </Col>
                                        </Row>

                                    </div>

                                </Col>
                            </Row>

                        </Container>
                    </section>
                </Modal.Body>
            </Modal>
        )
    }
}

export default NotesModal
