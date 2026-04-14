import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";
import { withRouter } from 'react-router-dom'
class ShortNotesModal extends Component {
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
                    <section className="revision_material_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos_SN">SHORT NOTES</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="w-50 img_center mt-2" src={require('../../../../images/helpSystemImages/short_notes.png')} alt="img" />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Container>
                    </section>
                </Modal.Body>
            </Modal>
        )
    }
}

export default withRouter(ShortNotesModal);
