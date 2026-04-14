import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Card, Table, Form, Image } from 'react-bootstrap'
const FETCH_ANALYTICS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getAnalytics(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        
        weak_analysis{
            question_type
            accuracy
            count
        }
        
        
    }
}
`;
class WeakAnalysis extends Component {
    render() {
        const getAnalytics = this.props.getAnalytics;
        const loading1 = getAnalytics.loading;
        const error1 = getAnalytics.error;
        if (loading1) return (
            <Card
                as={Card.Body} className="p-2 pt-3 border-0 top-weeks shadow h-100">
                <Card as={Card.Body} className="justify-content-center flex-row">
                    <div class="spinner-border text-primary text-center"></div>
                </Card>
            </Card>


        );
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        return (
            <Link className="text-decoration-none text-dark"

                to={{
                    pathname: "/student/questiontype-analysis"
                }}>
                <Card

                    as={Card.Body} className="p-2 pt-3 border-0 top-weeks shadow h-100">
                    <div className="indicator">
                        <i className="fas fa-expand-arrows-alt"></i> Expand to view more
                       </div>
                    <div className="title-block">
                        <div className="title">Question Types</div>
                    </div>
                    <Card className="border-0 ml-4">
                        <Table borderless size="sm" className="mb-0">
                            <thead>
                                <tr>
                                    <th>
                                        <h6 className="mb-0">Top 5 Weak question types</h6>
                                    </th>
                                    <td>Accuracy</td>
                                    <td>Total Questions Attempted</td>
                                </tr>
                            </thead>
                            <tbody>
                                {getAnalytics.getAnalytics.weak_analysis.map((item, index) => {
                                    if (index < 5) {
                                        return (<tr>
                                            <td>{item.question_type}</td>
                                            <td>{item.accuracy}% </td>
                                            <td>{item.count} </td>
                                        </tr>)
                                    }

                                })}


                            </tbody>
                        </Table>
                    </Card>
                </Card>
            </Link>
        )
    }
}


export default withRouter(compose(

    graphql(FETCH_ANALYTICS
        ,
        {
            options: props => ({
                variables: {
                    mobile: props.mobile,
                    exam_type: props.stateData.exam_type,
                    class_id: props.stateData.class_id
                },
                fetchPolicy: 'network-only'
            }), name: "getAnalytics"
        }))(WeakAnalysis));
