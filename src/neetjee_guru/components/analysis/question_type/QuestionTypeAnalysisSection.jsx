import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Tab, Table } from 'react-bootstrap'
import AnalysisFilter from '../AnalysisFilter'

import './_questiontype.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import CardLessDataTable from '../../../../neetjee_guru/components/datatables/CardLessDataTable'


const FETCH_TIMEANALYSIS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getQuestionTypesData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        class_id
        complexity{
            subject_id
            subject
            question_type_data{
                qtype
                practice
                exam
            }
        }
        time{
            subject_id
            subject
            question_type_data{
                qtype
                practice
                exam
            }
        }
        accuracy{
            subject_id
            subject
            question_type_data{
                qtype
                practice
                exam
            }
        }
        error{
            subject_id
            subject
            question_type_data{
                qtype
                practice
                exam
            }
        }
        
        
        
    }
}
`;


class QuestionTypeAnalysisSection extends Component {
    articlecolumnsFun() {

        let articlecolumns = [];
        if (this.props.stateData.exam_type == "0,1") {
            articlecolumns = [
                {
                    dataField: "questiontypes",
                    text: "Question Types",
                    sort: true
                },
                {
                    dataField: "practice",
                    text: "Practice(%)",
                    sort: true
                },
                {
                    dataField: "exams",
                    text: "Exams(%)",
                    sort: true
                }
            ];
        }
        else if (this.props.stateData.exam_type == "0") {
            articlecolumns = [
                {
                    dataField: "questiontypes",
                    text: "Question Types",
                    sort: true
                },
                {
                    dataField: "practice",
                    text: "Practice(%)",
                    sort: true
                }
            ];
        }
        else {
            articlecolumns = [
                {
                    dataField: "questiontypes",
                    text: "Question Types",
                    sort: true
                },
                {
                    dataField: "exams",
                    text: "Exams(%)",
                    sort: true
                }
            ];
        }
        return articlecolumns;
    }


    tableData(data) {
        let returnData = [];
        data.map((mapData) => {
            const newObj = {
                questiontypes: mapData.qtype,
                practice: Math.round(mapData.practice),
                exams: Math.round(mapData.exam),
            }
            returnData.push(newObj);

        });
        return returnData;
    }
    render() {
        const getQuestionTypesData = this.props.getQuestionTypesData;
        const loading1 = getQuestionTypesData.loading;
        const error1 = getQuestionTypesData.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getQuestionTypesData.getQuestionTypesData",
            getQuestionTypesData.getQuestionTypesData);
        let QuestionTypesData = "";
        if (this.props.stateData.class_id == "1,2") {
            QuestionTypesData = getQuestionTypesData.getQuestionTypesData.find((item) => item.class_id == "0");
        }
        else {
            QuestionTypesData = getQuestionTypesData.getQuestionTypesData.find((item) => item.class_id == this.props.stateData.class_id);
        }

        let classn = "";
        if (this.props.stateData.class_id == "1,2") {
            classn = "1";
        }
        else if (this.props.stateData.class_id == "1") {
            classn = "1";
        }
        else {
            classn = "2";
        }
        console.log("QuestionTypesData.error.length", QuestionTypesData.error.length);
        return (
            <div className="questiontype-analysis pt-4">
                <AnalysisFilter
                    defaultActiveKeyFun={this.props.defaultActiveKeyFun}
                    stateData={this.props.stateData}
                    selecthandleInputChange={this.props.selecthandleInputChange} />
                <Row>
                    <Col xl={6} lg={6} md={12} sm={12}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey={"botnay_" + (QuestionTypesData.error.length - 1)}>
                            <Card className="question-tab-one my-3">
                                <Card.Header className="bg-white d-md-flex justify-content-md-between align-items-center">
                                    <Nav variant="pills pl-2 my-2">
                                        {QuestionTypesData.error.map((item, index) => (
                                            <Nav.Item>
                                                <Nav.Link eventKey={"botnay_" + index}>{item.subject}</Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                    <Link to="#" className="btn-link text-dark font-weight-bold">Error</Link>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Tab.Content>
                                        {QuestionTypesData.error.map((item, index) => (
                                            <Tab.Pane eventKey={"botnay_" + index}>
                                                {/* <Table borderless className="mb-0">
                                                    <thead className="border-bottom">
                                                        <tr>
                                                            <td className="text-gray4">Question Type</td>
                                                            {this.props.stateData.exam_type == "0,1" ? (<React.Fragment>
                                                                <th>Practice</th>
                                                                <th>Exams</th>
                                                            </React.Fragment>) : this.props.stateData.exam_type == "0" ? (
                                                                <th>Practice</th>
                                                            ) : (<th>Exams</th>)}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.question_type_data.map((item2, index) => (
                                                            <tr>
                                                                <td>{item2.qtype}</td>
                                                                {this.props.stateData.exam_type == "0,1" ? (<React.Fragment>
                                                                    <td>{Math.round(item2.practice)}% </td>
                                                                    <td>{Math.round(item2.exam)}%</td>
                                                                </React.Fragment>) : this.props.stateData.exam_type == "0" ? (
                                                                    <td>{Math.round(item2.practice)}% </td>
                                                                ) : (<td>{Math.round(item2.exam)}%</td>)}

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table> */}
                                                <CardLessDataTable
                                                    articledata={this.tableData(item.question_type_data)}
                                                    articlecolumns={this.articlecolumnsFun()}
                                                //defaultSorted={defaultSorted} 
                                                />

                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Col>
                    <Col xl={6} lg={6} md={12} sm={12}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey={"botnay2_" + (QuestionTypesData.accuracy.length - 1)}>
                            <Card className="question-tab-two my-3">
                                <Card.Header className="bg-white d-md-flex justify-content-md-between align-items-center">
                                    <Nav variant="pills pl-2 my-2">
                                        {QuestionTypesData.accuracy.map((item, index) => (
                                            <Nav.Item>
                                                <Nav.Link eventKey={"botnay2_" + index}>{item.subject}</Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                    <Link to="#" className="btn-link text-dark font-weight-bold">Accuracy</Link>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Tab.Content>
                                        {QuestionTypesData.accuracy.map((item, index) => (
                                            <Tab.Pane eventKey={"botnay2_" + index}>
                                                {/* <Table borderless className="mb-0">
                                                    <thead className="border-bottom">
                                                        <tr>
                                                            <td className="text-gray4">Question Type</td>
                                                            {this.props.stateData.exam_type == "0,1" ? (<React.Fragment>
                                                                <th>Practice</th>
                                                                <th>Exams</th>
                                                            </React.Fragment>) : this.props.stateData.exam_type == "0" ? (
                                                                <th>Practice</th>
                                                            ) : (<th>Exams</th>)}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.question_type_data.map((item2, index) => (
                                                            <tr>
                                                                <td>{item2.qtype}</td>
                                                                {this.props.stateData.exam_type == "0,1" ? (<React.Fragment>
                                                                    <td>{Math.round(item2.practice)}% </td>
                                                                    <td>{Math.round(item2.exam)}%</td>
                                                                </React.Fragment>) : this.props.stateData.exam_type == "0" ? (
                                                                    <td>{Math.round(item2.practice)}% </td>
                                                                ) : (<td>{Math.round(item2.exam)}%</td>)}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table> */}
                                                <CardLessDataTable
                                                    articledata={this.tableData(item.question_type_data)}
                                                    articlecolumns={this.articlecolumnsFun()}
                                                //defaultSorted={defaultSorted} 
                                                />
                                            </Tab.Pane>
                                        ))}

                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(compose(

    graphql(FETCH_TIMEANALYSIS
        ,
        {
            options: props => ({
                variables: {
                    mobile: props.mobile,
                    exam_type: props.stateData.exam_type,
                    class_id: props.stateData.class_id
                },
                fetchPolicy: 'network-only'
            }), name: "getQuestionTypesData"
        }))(QuestionTypeAnalysisSection));