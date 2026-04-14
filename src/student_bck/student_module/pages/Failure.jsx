import React, { Component } from 'react'
import { Row, Col, Card, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavbarTop from '../components/login_register/NavbarTop';
import Footer from '../components/login_register/Footer';
import * as Cookies from "es-cookie";
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar';
class Failure extends Component {
    handleFormSubmit = e => {
        this.props.history.push("/student/package");



    };
    render() {
        if (Cookies.get("studenttoken") == undefined) {
            return (
                <div className="student_register">
                    <section className="student_block">
                        <NavbarTop />
                    </section>
                    <div className="register-form bg-light">
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
                                            <Col xl={3} lg={3} md={6} sm={6} className="">
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Order Summary</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={3} lg={3} md={6} sm={6} className=""
                                            >
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Payment Summary</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="stepFour mt-5">
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <Card as={Card.Body} className="border-0 text-center p-5">
                                                <div className="d-md-flex align-items-center justify-content-center mb-5">
                                                    {/* <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" /> */}
                                                    <div className="content my-2 ml-5">

                                                        <h2 className="text-danger mb-4"> Payment Failed</h2>
                                                        <Link variant="link text-primary" to={{
                                                            pathname: "/student/register",
                                                            state: {
                                                                type: "paymentverify",
                                                                id: this.props.match.params.id,
                                                                planid: this.props.match.params.planid,
                                                                mobile: this.props.match.params.mobile,
                                                                coupnid: this.props.match.params.coupnid,
                                                                fullname: this.props.match.params.name

                                                            }
                                                        }}>Retrieve payment</Link>

                                                        <p className="text-muted">Order Number: {this.props.match.params.id}</p>
                                                        {/* <Link
                                                        to={{
                                                            pathname: "/student/register",
                                                            state: {
                                                                id: this.props.match.params.id
                                                            }
                                                        }}
                                                        //href="/student/register" 
                                                        className="text-muted">Go to Account summary</Link> */}


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
                    </div>
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div >
                    <StudentOrganizationNavbar name={Cookies.get("studentusername")} />
                    <div className="register-form">
                        <section className="register-form-block">
                            <Container>
                                <div className="step-wizard mb-5">
                                    <Row className="stepFour mt-5">
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <Card as={Card.Body} className="border-0 text-center p-5">
                                                <div className="d-md-flex align-items-center justify-content-center mb-5">
                                                    {/* <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" /> */}
                                                    <div className="content my-2 ml-5">
                                                        <h2 className="text-danger mb-4">Payment Failure</h2>

                                                        <Link
                                                            onClick={this.handleFormSubmit}
                                                            variant="link text-primary">&nbsp;Login to ELAPP</Link>
                                                        <p className="text-muted">Order Number: {this.props.match.params.id.split(":")[1]}</p>
                                                    </div>
                                                </div>
                                                <h1>Thank You</h1>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}
export default (Failure);
