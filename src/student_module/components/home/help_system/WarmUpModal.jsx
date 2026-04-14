import React, { Component } from 'react'
import { Row, Container, Col, Image, Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class WarmUpModal extends Component {

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
                    <section className="warmup_modal">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col sm={1}>
                                    <h2 className="title_rotate title_rotate_pos">WARM UP</h2>
                                </Col>
                                <Col sm={11}>
                                    <Row>
                                        <Col>
                                            <Image className="image_pos" src={require('../../../../images/helpSystemImages/warmup_logo.png')} height="80" alt="img" />
                                        </Col>
                                    </Row>
                                    <div className="overflow_scroll" >
                                        <Row>
                                            <Col>
                                                <p>WARM-UP is the final revision aspect of your exam preparation after PLAN, EXECUTE & MESURE. </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6}>
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/warmup_revision.png')} alt="img" />
                                            </Col>
                                            <Col sm={6}>
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/measure_img.png')} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="mt-4">Assuming that you have successfully finished the first three stages of the preparation cycle, your revision is now much easier with our dedicated REVISION Material Section.</p>
                                                <p className="mt-4">Crisp & Concise short notes along with detailed revision notes are made available in an easy to find and use interface under the Revision Material version. With just one click you can choose and navigate to pre-categorized and custom-made revision material.</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/warmup1.png')} alt="img" />
                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/warmup2.png')} alt="img" />
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

export default WarmUpModal
