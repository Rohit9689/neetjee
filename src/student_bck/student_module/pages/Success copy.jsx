import React, { Component } from 'react'
import { Row, Col, Card, Image, Container } from 'react-bootstrap';
class Success extends Component {
    render() {
        console.log("this.props.match.params.id.substr(1)", this.props.match.params.id);
        return (
            <section className="register-form-block">
                <Container>
                    <div className="step-wizard">
                        <div className="step-indicator mb-5">
                            <Row>
                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Personal Information</span>

                                        </div>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Select Plan</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Order Summery</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={6} sm={6} className="active"
                                >
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Payment Summery</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row className="stepFour mt-5">
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <Card as={Card.Body} className="border-0 text-center p-5">
                                    <div className="d-md-flex align-items-center justify-content-center mb-5">
                                        <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" />
                                        <div className="content my-2 ml-5">

                                            <h2 className="text-success mb-4">Successful Payment</h2>
                                            <p className="text-muted">Order Number: {this.props.match.params.id}</p>


                                        </div>
                                    </div>
                                    <h1>Thank You</h1>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="bg-white mt-5">
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div className="d-flex align-items-center justify-content-between py-4">
                                    {/* <div className="float-left">{this.previousButton()}</div>
                                    
                                    <div className="float-right">{this.nextButton()}</div> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>




        )
    }
}
export default (Success);
