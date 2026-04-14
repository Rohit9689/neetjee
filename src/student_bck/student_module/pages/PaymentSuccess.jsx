import React, { Component } from 'react'
import { Row, Col, Card, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Footer from '../components/login_register/Footer';
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar';
import * as Cookies from "es-cookie";
class PaymentSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleFormSubmit = e => {
        if (this.props.match.params.ptype.split(":")[1] == "video-payment") {
            this.props.history.push("/student/learn-practice");
        }
        else if (this.props.match.params.ptype.split(":")[1] == "mock-payment") {
            this.props.history.push("/student/exams/test-series");
        }
        else if (this.props.match.params.ptype.split(":")[1] == "package-payment") {
            this.props.history.push("/student/package");
        }

    };

    render() {

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
                                                {this.props.match.params.type.split(":")[1] == "success" ? (
                                                    <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" />
                                                ) : (
                                                    // <h2 className="text-danger mb-4">Payment Failure</h2>
                                                    ""
                                                )}

                                                <div className="content my-2 ml-5">
                                                    {this.props.match.params.type.split(":")[1] == "success" ? (
                                                        <h2 className="text-success mb-4">Successful Payment</h2>
                                                    ) : (
                                                        <h2 className="text-danger mb-4">Payment Failure</h2>
                                                    )}
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
export default withRouter(PaymentSuccess);
