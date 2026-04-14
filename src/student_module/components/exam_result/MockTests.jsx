import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'
import "../mock_series/_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import ResultFreeMockTestSection from './ResultFreeMockTestSection';
const FETCH_GETSERIES = gql` 
query($mobile: String,
    $free: Boolean,
    $premium: Boolean) {
    getStudentTestSeries(mobile: $mobile,
        free: $free,
        premium: $premium){
        id
        exam_name
        exam_type
        exam_session_id
        sub_exam_type
        is_completed
        title
        short_name
        amount
        speed
        accuracy
        correct_marks
        negative_marks
        total_marks
        start_time
        end_time
        is_purchased
        exam_started
        is_scheduled
        is_registered
        exam_expired

        exam_duration
        syllabus
    }
}

`;

class MockTests extends Component {
    render() {

        const getStudentTestSeries = this.props.getStudentTestSeries;
        const loading1 = getStudentTestSeries.loading;
        const error1 = getStudentTestSeries.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (
                // <Row className="my-3">
                //     <Col xs={12}>
                //         <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Register for upcoming All India Live Mock Tests</h1>
                //     </Col>
                //     <Col>
                //         <Card as={Card.Body} className="free-mock justify-content-center flex-row">

                //             <div class="spinner-border text-primary text-center"></div>

                //         </Card>
                //     </Col>
                // </Row>

                <div className="mock-test-series-section pt-3">
                    <Container>
                        <Row className="headertop">
                            <Col xs={12} className="text-center">


                                {Cookies.get("examid") == "1" ? (
                                    <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock Test NEET 2021</h1>

                                )
                                    : Cookies.get("examid") == "2" ? (
                                        <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock Test JEE Mains 2021</h1>

                                    )
                                        : ("")}
                            </Col>

                        </Row>
                        <Row className="my-3">
                            <Col xs={12}>
                                <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Register for upcoming All India Live Mock Tests</h1>
                            </Col>
                            <Col>
                                <Card as={Card.Body} className="free-mock justify-content-center flex-row p-2">
                                    <div class="spinner-border text-primary text-center"></div>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        else {

            return (
                <div className="mock-test-series-section pt-3">
                    <Container>
                        <Row className="headertop">
                            <Col xs={12} className="text-center">


                                {Cookies.get("examid") == "1" ? (
                                    <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock NEET 2021</h1>

                                )
                                    : Cookies.get("examid") == "2" ? (
                                        <h1 className="heading-title h6 mock-text-color text-uppercase">Live Mock JEE Mains 2021</h1>

                                    )
                                        : ("")}
                            </Col>
                            {/* <div className="custom-link">
                                <Link
                                    to={{
                                        pathname: "/student/subject/exam-history",
                                        state: {
                                            examtype: "test_series",
                                        }
                                    }}
                                    className="btn-blue-outline text-capitalize text-decoration-none">Live Mock Test History</Link>
                            </div> */}
                        </Row>
                        <ResultFreeMockTestSection getStudentTestSeries={getStudentTestSeries.getStudentTestSeries} />
                    </Container>
                </div>


            )
        }

    }
}
export default withRouter(compose(
    graphql(FETCH_GETSERIES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    free: true,
                    premium: false
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "getStudentTestSeries"
        })

)(MockTests));