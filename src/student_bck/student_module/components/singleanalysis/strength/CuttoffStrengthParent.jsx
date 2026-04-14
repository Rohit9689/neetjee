import React, { Component } from 'react'
import './_strength.scss'
import CuttoffStrength from './CuttoffStrength';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import { Col, Card, Form } from 'react-bootstrap';

const FETCH_SUBJECTANALYSIS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getSubjectAnalysisData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
       class_id
        subject_data{
            subject_id
            subject
            weak_chapters{
                id
                chapter_name
                accuracy
                count
            }
        }
    }
}
`;
class CuttoffStrengthParent extends Component {
    render() {
        const getSubjectAnalysisData = this.props.getSubjectAnalysisData;
        const loading1 = getSubjectAnalysisData.loading;
        const error1 = getSubjectAnalysisData.error;
        if (loading1) return (
            <React.Fragment>
                <Col xl={4} lg={6} md={12} sm={12} className="my-3">
                    <Card className="weeklist-card h-100 border-0">
                        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                            <h6 className="week-title mb-0">You are weak in below listed Chapters</h6>
                            <Form.Group controlId="exampleForm.ControlSelect1" className="cutoff mb-0">
                                <Form.Label>Accuracy cutoff</Form.Label>
                                <Form.Control as="select" custom="true"
                                >
                                    <option value="0">All</option>
                                    <option value="1">0% - 15%</option>
                                    <option value="2">15% - 30%</option>
                                    <option value="3">30% - 45%</option>
                                    <option value="4">45% - 60%</option>
                                    <option value="5">60% - 70%</option>
                                    <option value="6">70% - 80%</option>
                                    <option value="7">above 80%</option>
                                </Form.Control>
                            </Form.Group>
                        </Card.Header>
                        <Card as={Card.Body} className="p-2" style={{ height: 215 }} className="justify-content-center flex-row">
                            <div class="spinner-border text-primary text-center"></div>
                        </Card>
                    </Card>
                </Col>
            </React.Fragment>

        );
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        let practiceSubjectAnalysisData = "";
        if (this.props.stateData.class_id == "1,2") {
            practiceSubjectAnalysisData = getSubjectAnalysisData.getSubjectAnalysisData.find((item) => item.class_id == "0");
        }
        else {
            practiceSubjectAnalysisData = getSubjectAnalysisData.getSubjectAnalysisData.find((item) => item.class_id == this.props.stateData.class_id);
        }
        return (
            <CuttoffStrength
                subject={this.props.subject}
                practiceSubjectAnalysisData={practiceSubjectAnalysisData} />
        )
    }
}
export default withRouter(compose(

    graphql(FETCH_SUBJECTANALYSIS
        ,
        {
            options: props => ({
                variables: {
                    mobile: props.mobile,
                    exam_type: props.stateData.exam_type,
                    class_id: props.stateData.class_id
                },
                fetchPolicy: 'network-only'
            }), name: "getSubjectAnalysisData"
        }))(CuttoffStrengthParent));
