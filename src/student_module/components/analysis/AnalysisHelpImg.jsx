import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Modal } from 'react-bootstrap'
// import DateTime from 'react-datetime'
import ResultAndAnalysisModal from "../home/help_system/ResultAndAnalysisModal";
import { Link } from 'react-router-dom'

export class AnalysisHelpImg extends Component {
    constructor(props) {
        super(props)

        this.state = {
            helpShow: false,
            resultAnalysisModalShow: false,
        }
    }

    render() {
        return (
            <Container className="header-bottom">
                <Row className="align-items-end pb-4">
                    <Col xl={3} lg={3} md={4} sm={6} xs={6}>
                        <div className="my-3">
                            <div className="top-img mb-3">
                                <Image src={this.props.headerBottom.titleImg} alt={this.props.headerBottom.title} />
                            </div>
                            <h6 className="title mb-0">{this.props.headerBottom.title}</h6>
                            <p className="subtitle text-white">{this.props.headerBottom.subTitle}</p>
                        </div>
                    </Col>
                    <Col xl={5} lg={6} md={4} sm={6} xs={12} className="d-none d-md-block">
                        <Card as={Card.Body} className="mx-lg-2 my-3">
                            <Image src={require('../../../images/bulb.png')} width="45" alt="img" />
                            <p className="text-white">{this.props.headerBottom.description}</p>
                        </Card>
                    </Col>
                    {
                        !this.state.helpShow && !this.state.resultAnalysisModalShow ?

                            <Col xl={{ span: 3, offset: 1 }} lg={3} md={4} sm={6} xs={6}>
                                {/* <Form.Group as={Row} className="my-3">
                            <Form.Label column sm="3" className="text-white">Date:</Form.Label>
                            <Col sm="9" className="datePicker">
                                <i className="calendar far fa-calendar-day" />
                                <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'Custom Date' }} timeFormat={false} />
                            </Col>
                        </Form.Group> */}
                                {this.props.headerBottom.title != "Performance Analysis" ? (
                                    <Link to="#"
                                        onClick={() => this.setState({ helpShow: true })}
                                        className="text-muted">
                                        <Image src={this.props.headerBottom.helpImg} alt="help-img" fluid />
                                    </Link>
                                ) : ("")}

                            </Col>
                            :
                            null
                    }
                </Row>

                <Modal {...this.props} className="help-modal"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.helpShow} onHide={() => this.setState({ helpShow: false })}>
                    <Modal.Header className="justify-content-end align-items-end p-0 border-0" />
                    <Modal.Body className="p-0 d-flex">
                        <Card as={Card.Body} className="border-0">
                            <Row className="d-flex">
                                <Col xl={8} lg={6} md={12} className="text-center">
                                    <div className="d-lg-flex align-item-center justify-content-center">
                                        <Link onClick={() => this.setState({ resultAnalysisModalShow: true, helpShow: false })} className="text-decoration-none text-dark mr-xl-5 mr-lg-5"><h5>Click here to view <br /> Performance Analysis Help</h5></Link>
                                        <Link to="#" className="text-decoration-none text-dark" onClick={() => this.setState({ resultAnalysisModalShow: true, helpShow: false })}>
                                            {/* <Link to="#" className="text-decoration-none text-dark" onClick={() => this.modalTypeFun()}> */}
                                            <i className="fal fa-hand-pointer" style={{ fontSize: 48 }} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col xl={4} lg={6} md={12} >
                                    <Image src={require('../../../images/Ask_me_for_Help.gif')} alt="help-img" />
                                </Col>
                            </Row>
                        </Card>
                    </Modal.Body>
                </Modal>

                <ResultAndAnalysisModal show={this.state.resultAnalysisModalShow} onHide={() => this.setState({ resultAnalysisModalShow: false })} />
            </Container>
        )
    }
}

export default AnalysisHelpImg
