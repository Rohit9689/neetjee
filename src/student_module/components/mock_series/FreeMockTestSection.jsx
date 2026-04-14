import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import "./_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import FreeMockTestSectionSection from './FreeMockTestSectionSection';
import HistoryFreeMockTestSectionSection from './HistoryFreeMockTestSectionSection';



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

class FreeMockTestSection extends Component {
    render() {
        const getStudentTestSeries = this.props.getStudentTestSeries;
        const loading1 = getStudentTestSeries.loading;
        const error1 = getStudentTestSeries.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (<Row className="my-3">
                <Col xs={12}>
                    <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Free: Mock Tests</h1>
                </Col>
                <Col>
                    <Card as={Card.Body} className="free-mock justify-content-center flex-row">

                        <div class="spinner-border text-primary text-center"></div>

                    </Card>
                </Col>
            </Row>)
        }
        else {
            if (this.props.type == "normal") {
                return (
                    <FreeMockTestSectionSection getStudentTestSeries={getStudentTestSeries.getStudentTestSeries} />
                )
            }
            else if (this.props.type == "history") {
                return (
                    <HistoryFreeMockTestSectionSection getStudentTestSeries={getStudentTestSeries.getStudentTestSeries} />
                )
            }
            


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

)(FreeMockTestSection));