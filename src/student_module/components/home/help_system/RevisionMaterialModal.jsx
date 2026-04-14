import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "./_helpsystem.scss";

class RevisionMaterialModal extends Component {
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
                                    <h2 className="title_rotate title_rotate_pos_RM">REVISION MATERIAL</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="w-30 mt-2" src={require('../../../../images/helpSystemImages/warmup_revision.png')} alt="img" />
                                            <Image className="w-80 img_center mt-1" src={require('../../../../images/helpSystemImages/warmup1.png')} alt="img" />
                                            <Image className="w-50 img_center mt-2" src={require('../../../../images/helpSystemImages/warmup2.png')} alt="img" />
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

export default withRouter(RevisionMaterialModal);
