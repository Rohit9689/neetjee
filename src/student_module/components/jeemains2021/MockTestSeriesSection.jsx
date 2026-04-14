import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import "./_mock-test-series.scss"
import FreeMockTestSection from "./FreeMockTestSection";
class MockTestSeriesSection extends Component {
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
       
        return (
            <div className="mock-test-series-section">
                
                    <Container>
                        <Row className="headertop">
                            <Col lg={9} md={12} className="text-center">
                                 <h1 className="heading-title h6 mock-text-color text-uppercase">JEE Mains 2021</h1>
                            </Col>
                            {/* <Col lg={3} md={12} className="custom-link text-center pt-2">
                                <Link
                                    to={{
                                        pathname: "/student/subject/exam-history",
                                        state: {
                                            examtype: "jeemainsprevious_exam"
                                        }
                                    }}
                                    className="btn-blue-outline text-capitalize text-decoration-none">JEE Mains 2021 History</Link>
                            </Col> */}
                        </Row>
                        <FreeMockTestSection />
                        
                    </Container>
                

            </div>
        )
    }
}

export default withRouter(MockTestSeriesSection); 
