import React, { Component } from 'react'
import { Row, Col, Modal, Card, Image, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './_buysinglevediomodal.scss'

class BuySingleVideoModal extends Component {

    render() {

        return (
            <Modal {...this.props} className="buysinglevideo_modal border-white"
                size="md" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header>
                    <div className="buysinglevideomodal-img"></div>
                    <Row className="title-content d-flex align-items-center w-100">
                        <Col lg={6} md={6} sm={12}>
                            <h6 className="font-weight-normal text-white mb-0">Buy Video</h6>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    <Row className="align-item-center">
                        <Col xs={5}>
                            <div className="img-block">
                                <Image src={require('../../../../../images/zoology.png')} alt="img" rounded fluid />
                            </div>
                        </Col>
                        <Col xs={7}>
                            <Card as={Card.Body} className="p-2 border-0">
                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="content mb-2">
                                        <p className="text-white">Chapter Name</p>
                                        <h5 className="mb-0 text-white">Topic name</h5>
                                    </div>
                                    <Badge variant="dark px-2 py-1 mb-2">15:23 Min</Badge>
                                </div>
                                <h4 className="rate my-2"> @ ₹ 1999 /-</h4>
                            </Card>
                        </Col>
                    </Row>
                    <div className="bg-light">
                        <Row>
                            <Col xl={{ span: 5, offset: 7 }} lg={{ span: 5, offset: 7 }} md={{ span: 5, offset: 7 }}>
                                <ul className="list-unstyled total-count-list p-3">
                                    <li className="d-flex align-items-center">
                                        <div className="price w-25 mr-3">Price:</div>
                                        <div className="price-cost font-weight-bold">₹ 1979.85 /-</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="gst-price w-25 mr-3">GST:</div>
                                        <div className="gst-price-cost font-weight-bold">₹ 199.15 /-</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="total-price w-25 mr-3">Tota:</div>
                                        <div className="total-price-cost font-weight-bold">₹ 1999.00 /-</div>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="px-4 bg-white border-0 justify-content-center">
                    {/* <Button className="btn btn-darkblue px-5" onClick={this.props.onClick}>Proceed With Payment </Button> */}
                    <Link className="btn btn-darkblue px-5" to="/student/subject/start-watching">Proceed With Payment </Link>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default BuySingleVideoModal
