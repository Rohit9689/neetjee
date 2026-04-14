import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button } from 'react-bootstrap'
import './_subjectvideomodal.scss'

class BuySubjectVideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioChecked: ''
        }
    }
    handleChange(e) {
        this.setState({ radioChecked: e.target.value });
    }

    render() {

        const { radioChecked } = this.state;

        return (
            <Modal {...this.props} className="subjectvideo_modal border-white"
                size="md" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header className="py-4">
                    <div className="buysubjectvideomodal"></div>
                    <Row className="title-content d-flex align-items-center w-100">
                        <Col lg={6} md={6} sm={12}>
                            <div className="d-flex align-items-center">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22.61" height="48.018" viewBox="0 0 28.61 78.018"><path fill="#fff" d="M32.022,128.356v3.889c-1.066,0-2.088-.016-3.107,0-.972.019-2.243-.2-2.227,1.268.016,1.363,1.224,1.148,2.148,1.158.987.009,1.975,0,3.107,0v4.306c-1.792,0-3.605.013-5.419,0-.937-.009-1.968.009-1.927,1.24.038,1.208,1.091,1.2,2.009,1.192,1.763-.006,3.53,0,5.384,0v4.249c-1.268,0-2.5.009-3.741,0-.9-.006-1.719.3-1.524,1.278.095.476.94,1.044,1.508,1.129a26.253,26.253,0,0,0,3.719.054v4.239c-1.855,0-3.669.006-5.482,0-.959-.006-1.937.114-1.88,1.325.05,1.117,1.022,1.129,1.9,1.123,1.817-.013,3.637,0,5.432,0,.53,5.949-5.179,11.394-11.406,11.075A10.989,10.989,0,0,1,9.957,154.919c-.057-8.321,0-16.645-.047-24.967-.006-1.085.416-1.577,1.391-1.58C18.149,128.347,25,128.356,32.022,128.356Z" transform="translate(-6.784 -87.867)"></path><path fill="#fff" d="M13.078,30.392V24.272c-.833-.148-1.643-.268-2.445-.432A13.358,13.358,0,0,1,.069,10.418C.1,9.172.65,8.75,1.807,8.775a14.1,14.1,0,0,1,10.356,4.517c.237.249.464.508.776.852a42.683,42.683,0,0,1,.691-4.3A13.336,13.336,0,0,1,26.355,0c1.918-.009,2.161.246,2.1,2.2A13.192,13.192,0,0,1,16.961,15.112c-.464.066-.921.158-1.442.249v14.8c.558.032,1.107.085,1.653.088,2.514.019,5.031-.069,7.539.057a4.018,4.018,0,0,1,3.9,4.123,3.968,3.968,0,0,1-4.047,3.952q-10.286.085-20.579,0A3.891,3.891,0,0,1,0,34.388,3.967,3.967,0,0,1,4.151,30.4C7.072,30.363,9.993,30.392,13.078,30.392Z" transform="translate(0 0.001)"></path></svg>
                                </div>
                                <h1 className="font-weight-normal text-white ml-3">Botnay</h1>
                            </div>
                        </Col>
                        <Col lg={{ span: 5, offset: 1 }} md={{ span: 5, offset: 1 }} sm={12}>
                            <div className="d-flex align-items-center">
                                <i className="text-white fad fa-video fa-fw fa-3x" />
                                <div className="text-white ml-3">
                                    <div>Buy</div>
                                    <div>396 Videos</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Row className="p-4 align-item-center">
                        <Col lg={6} md={6} sm={12}>
                            <ul as={Form} className="select-class list-unstyled m-0 p-0">
                                <li className={radioChecked === 'all' ? "active" : null} >
                                    <Form.Group className="mb-0" controlId="radioAll">
                                        <Form.Check type="radio" label={
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>All Classes</span>
                                                <div className="d-flex align-items-center">
                                                    <span className="price font-weight-normal ml-3">₹ 3,599 /-</span>
                                                    <i className="fas fa-check-circle ml-3"></i>
                                                </div>
                                            </div>
                                        } name="formHorizontalRadios" custom checked={this.state.radioChecked === 'all'} value='all' onChange={(e) => this.handleChange(e)} />
                                    </Form.Group>
                                </li>
                                <li className={radioChecked === 'xi' ? "active" : null} >
                                    <Form.Group className="mb-0" controlId="radioTwo">
                                        <Form.Check type="radio" label={
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Class XI</span>
                                                <div className="d-flex align-items-center">
                                                    <span className="price font-weight-normal ml-3">₹ 3,599 /-</span>
                                                    <i className="fas fa-check-circle ml-3"></i>
                                                </div>
                                            </div>
                                        } name="formHorizontalRadios" custom checked={this.state.radioChecked === 'xi'} value='xi' onChange={(e) => this.handleChange(e)} />
                                    </Form.Group>
                                </li>
                                <li className={radioChecked === 'xii' ? "active" : null}>
                                    <Form.Group className="mb-0" controlId="radioThree">
                                        <Form.Check type="radio" label={
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Class XI</span>
                                                <div className="d-flex align-items-center">
                                                    <span className="price font-weight-normal ml-3">₹ 3,599 /-</span>
                                                    <i className="fas fa-check-circle ml-3"></i>
                                                </div>
                                            </div>
                                        } name="formHorizontalRadios" custom checked={this.state.radioChecked === 'xii'} value='xii' onChange={(e) => this.handleChange(e)} />
                                    </Form.Group>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <Card as={Card.Body} className="text-center align-items-center justify-content-center">
                                <Button className="btn btn-darkblue mb-3" style={{ fontSize: 10 }}> Class XI Videos: 198</Button>
                                <h3 className="rate mb-0"> @ ₹ 1999 /-</h3>
                            </Card>
                        </Col>
                    </Row>
                    <div className="bg-light">
                        <Row>
                            <Col xl={{ span: 5, offset: 7 }} lg={{ span: 5, offset: 7 }} md={{ span: 5, offset: 7 }}>
                                <ul className="list-unstyled total-count-list p-4">
                                    <li className="d-flex align-items-center">
                                        <div className="price w-25 mr-3">Price:</div>
                                        <div className="price-cost font-weight-bold">₹ 1979.85 /-</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="gst-price w-25 mr-3">GST:</div>
                                        <div className="gst-price-cost font-weight-bold">₹ 199.15 /-</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="total-price w-25 mr-3">Total Price:</div>
                                        <div className="total-price-cost font-weight-bold">₹ 1999.00 /-</div>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="px-4 bg-white border-0 justify-content-center">
                    {/* <Button className="btn btn-darkblue px-5" onClick={() => { this.props.onHide() }}>Proceed With Payment </Button> */}
                    <Button className="btn btn-darkblue px-5" onClick={this.props.onClick}>Proceed With Payment </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default BuySubjectVideoModal
