import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./_mock-test-series.scss"
import NotifyFreeMockTestSection from "./NotifyFreeMockTestSection";
import PremiumMockTestSection from "./PremiumMockTestSection";
import * as Cookies from "es-cookie";
class NotificationMockTestSeriesSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "normalview"
        }
    }
    liveMockHistory = (type) => {
        this.setState({
            status: type
        });
    }

    render() {
        localStorage.setItem("mocklivestatus", "");
        return (
            <div className="mock-test-series-section">
                {this.state.status == "normalview" ? (
                    <Container>
                        <Row className="headertop">
                            <Col xs={12} className="text-center">
                                {Cookies.get("examid") == "1" ? (
                                    <h1 className="heading-title h6 mock-text-color text-uppercase">NEET 2021</h1>

                                )
                                    : Cookies.get("examid") == "2" ? (
                                        <h1 className="heading-title h6 mock-text-color text-uppercase">JEE Mains 2021</h1>

                                    )
                                        : ("")}
                            </Col>
                            {/* <div className="custom-link">
                                <Link
                                    onClick={() => this.liveMockHistory("historyview")}
                                    className="btn-blue-outline text-capitalize text-decoration-none">Live Mock Test History</Link>
                            </div> */}
                        </Row>
                        <NotifyFreeMockTestSection type="notifynormal" />
                        
                    </Container>
                ) : (
                        <Container>
                            <Row className="headertop">
                                <Col xs={12} className="text-center">
                                    <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock Test History</h1>
                                </Col>
                                {/* <div className="custom-link">
                                    <Link
                                        onClick={() => this.liveMockHistory("normalview")}
                                        className="btn-blue-outline text-capitalize text-decoration-none">Go To Mock Tests</Link>
                                </div> */}
                            </Row>
                            <NotifyFreeMockTestSection type="history" />
                        </Container>
                    )}

            </div>
        )
    }
}

export default NotificationMockTestSeriesSection
