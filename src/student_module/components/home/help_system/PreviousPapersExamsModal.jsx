import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class PreviousPapersExamsModal extends Component {
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
                    <section className="prev_paper_exam_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos_PPE">PREVIOUS PAPER EXAM</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP1.png')} alt="img" />
                                            <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP2.png')} alt="img" />
                                            <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/execute_PP3.png')} alt="img" />
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

export default PreviousPapersExamsModal
