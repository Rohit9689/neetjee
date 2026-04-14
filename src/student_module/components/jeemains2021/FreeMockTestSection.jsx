import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import "./_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import FreeMockTestSectionSection from './FreeMockTestSectionSection';



const FETCH_GETSERIES = gql` 
query($mobile: String
    ) {
    getPreviousMainsPapers(mobile: $mobile
        ){
            id
            year
            qset
            exam
            pexamtype
            session_id
            speed
            accuracy
            correct_marks
            negative_marks
            total_marks
            enabled
            attempted
            mains_2021
            exam_date
            examgroup
    }
}

`;

class FreeMockTestSection extends Component {
    render() {
        const getPreviousMainsPapers = this.props.getPreviousMainsPapers;
        const loading1 = getPreviousMainsPapers.loading;
        const error1 = getPreviousMainsPapers.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (<Row className="my-3">
                <Col xs={12}>
                    {/* <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">Free: Mock Tests</h1> */}
                </Col>
                <Col>
                    <Card as={Card.Body} className="free-mock justify-content-center flex-row">

                        <div class="spinner-border text-primary text-center"></div>

                    </Card>
                </Col>
            </Row>)
        }
        else {
            
            return (
                <FreeMockTestSectionSection getPreviousMainsPapers={getPreviousMainsPapers.getPreviousMainsPapers} />
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
            }), name: "getPreviousMainsPapers"
        })

)(FreeMockTestSection));