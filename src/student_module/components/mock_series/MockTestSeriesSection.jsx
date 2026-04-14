import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./_mock-test-series.scss"
import FreeMockTestSection from "./FreeMockTestSection";
import PremiumMockTestSection from "./PremiumMockTestSection";
import * as Cookies from "es-cookie";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from '../../pages/GoogleAnalytics';

class MockTestSeriesSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "normalview"
        }
    }

    liveMockHistory = (type) => {
        if (type == "historyview") {
            const title = GoogleAnalyticsArray[0].MockTest_History;
            ReactGA.pageview('/student/exams/test-series', ["ELAPP"], title);
        }
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
                            <Col lg={9} md={12} className="text-center">
                                {Cookies.get("examid") == "1" ? (
                                    <h1 className="heading-title h6 mock-text-color text-uppercase">NEET 2021</h1>

                                )
                                    : Cookies.get("examid") == "2" ? (
                                        <h1 className="heading-title h6 mock-text-color text-uppercase">JEE Mains 2021</h1>

                                    )
                                        : ("")}
                            </Col>
                            <Col lg={3} md={12} className="custom-link text-center pt-2">
                                <Link
                                    // to={{
                                    //     pathname: "/student/subject/exam-history",
                                    //     state: {
                                    //         examtype: "test_series",
                                    //     }
                                    // }}
                                    onClick={() => this.liveMockHistory("historyview")}
                                    className="btn-blue-outline text-capitalize text-decoration-none">Live Mock Test History</Link>
                            </Col>
                        </Row>
                        <FreeMockTestSection type="normal" />
                        <PremiumMockTestSection />
                    </Container>
                ) : (
                    <Container>
                        <Row className="headertop">
                            <Col lg={9} md={12} className="text-center">
                                <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock Test History</h1>
                            </Col>
                            <Col lg={3} md={12} className="custom-link text-center pt-2">
                                <Link
                                    onClick={() => this.liveMockHistory("normalview")}
                                    className="btn-blue-outline text-capitalize text-decoration-none">Go To Mock Tests</Link>
                            </Col>
                        </Row>
                        <FreeMockTestSection type="history" />
                    </Container>
                )}

            </div>
        )
    }
}

export default MockTestSeriesSection
