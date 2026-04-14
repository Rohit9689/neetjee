import React, { Component } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'
import AnalysisFilter from '../AnalysisFilter'
import StackedColumnChart from './StackedColumnChart'

import './_timeanalysis.scss'
import BarChart from './BarChart'
import VerticalBarChart from './VerticalBarChart';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import CardLessDataTable from '../../../../neetjee_guru/components/datatables/CardLessDataTable'


const FETCH_TIMEANALYSIS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getTimeAnalysisData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        class_id
        exam_wise_data{
            exam_type
            exam_complexity_data{
                complexity
                total_questions
                total_error_questions
            }
        }
        complexity_timewise_data{
            complexity
            time_data{
                intime
                intime_error
                lesstime
                lesstime_error
                overtime
                overtime_error
                wrong
            }
        }
        subject_timewise_data{
            subject
            time_data{
                intime
                intime_error
                lesstime
                lesstime_error
                overtime
                overtime_error
                wrong
            }
        }
        qtype_timewise_data{
            qtype
            time_data{
                intime
                intime_error
                lesstime
                lesstime_error
                overtime
                overtime_error
                wrong
            }
        }
    }
}
`;

class TimeAnalysisSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practiceTitle: {
                Title: 'PRACTICE'
            },
            examTitle: {
                Title: 'EXAMS'
            }
        };
    }
    articlecolumns = [
        {
            dataField: "questiontypes",
            text: "Question Types",
            sort: true
        },
        {
            dataField: "intime",
            text: "In time(%)",
            sort: true
        },
        {
            dataField: "intimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "lesstime",
            text: "Less time(%)",
            sort: true
        },
        {
            dataField: "lesstimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "overtime",
            text: "Over Time(%)",
            sort: true
        },
        {
            dataField: "overtimeerror",
            text: "Error(%)",
            sort: true
        }
    ];
    tableData(data) {
        let returnData = [];
        data.map((mapData) => {
            let intime = "";
            let intimeerror = "";
            let lesstime = "";
            let lesstimeerror = "";
            let overtime = "";
            let overtimeerror = "";
            mapData.time_data.map((item) => {
                intime = Math.round(item.intime);
                intimeerror = Math.round(item.intime_error);
                lesstime = Math.round(item.lesstime);
                lesstimeerror = Math.round(item.lesstime_error);
                overtime = Math.round(item.overtime);
                overtimeerror = Math.round(item.overtime_error);

            });
            if (intime == 0 && intimeerror == 0 && lesstime == 0 && lesstimeerror == 0 && overtime == 0 && overtimeerror == 0) {

            }
            else {
                const newObj = {
                    questiontypes: mapData.qtype,
                    intime: intime,
                    intimeerror: intimeerror,
                    lesstime: lesstime,
                    lesstimeerror: lesstimeerror,
                    overtime: overtime,
                    overtimeerror: overtimeerror,
                }
                returnData.push(newObj);
            }



        });
        return returnData;
    }
    timeComplexity(data) {
        let returnArr = [];
        data.map((mapData) => {
            let intime = "";
            let intimeerror = "";
            let lesstime = "";
            let lesstimeerror = "";
            let overtime = "";
            let overtimeerror = "";
            mapData.time_data.map((item) => {
                intime = Math.round(item.intime);
                intimeerror = Math.round(item.intime_error);
                lesstime = Math.round(item.lesstime);
                lesstimeerror = Math.round(item.lesstime_error);
                overtime = Math.round(item.overtime);
                overtimeerror = Math.round(item.overtime_error);

            });
            // if (intime == 0 && intimeerror == 0 && lesstime == 0 && lesstimeerror == 0 && overtime == 0 && overtimeerror == 0) {

            // }
            // else {
            const newObj = {
                complexity: mapData.complexity,
                intime: intime,
                intimeerror: intimeerror,
                lesstime: lesstime,
                lesstimeerror: lesstimeerror,
                overtime: overtime,
                overtimeerror: overtimeerror,
            }
            returnArr.push(newObj);
            //}
        });
        return returnArr;
    }
    timeComplexitycolumns = [
        {
            dataField: "complexity",
            text: "Complexity",
            sort: true
        },
        {
            dataField: "intime",
            text: "In time(%)",
            sort: true
        },
        {
            dataField: "intimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "lesstime",
            text: "Less time(%)",
            sort: true
        },
        {
            dataField: "lesstimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "overtime",
            text: "Over Time(%)",
            sort: true
        },
        {
            dataField: "overtimeerror",
            text: "Error(%)",
            sort: true
        }
    ];

    timeComplexitydefaultSorted = [
        {
            dataField: "complexity",
            order: "asc"
        }
    ];

    //time subjects
    timeSubjects(data) {
        let returnArr = [];
        data.map((mapData) => {
            let intime = "";
            let intimeerror = "";
            let lesstime = "";
            let lesstimeerror = "";
            let overtime = "";
            let overtimeerror = "";
            mapData.time_data.map((item) => {
                intime = Math.round(item.intime);
                intimeerror = Math.round(item.intime_error);
                lesstime = Math.round(item.lesstime);
                lesstimeerror = Math.round(item.lesstime_error);
                overtime = Math.round(item.overtime);
                overtimeerror = Math.round(item.overtime_error);

            });
            // if (intime == 0 && intimeerror == 0 && lesstime == 0 && lesstimeerror == 0 && overtime == 0 && overtimeerror == 0) {

            // }
            // else {
            const newObj = {
                subject: mapData.subject,
                intime: intime,
                intimeerror: intimeerror,
                lesstime: lesstime,
                lesstimeerror: lesstimeerror,
                overtime: overtime,
                overtimeerror: overtimeerror,
            }
            returnArr.push(newObj);
            //}
        });
        return returnArr;
    }
    timeSubjectscolumns = [
        {
            dataField: "subject",
            text: "Subject",
            sort: true
        },
        {
            dataField: "intime",
            text: "In time(%)",
            sort: true
        },
        {
            dataField: "intimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "lesstime",
            text: "Less time(%)",
            sort: true
        },
        {
            dataField: "lesstimeerror",
            text: "Error(%)",
            sort: true
        },
        {
            dataField: "overtime",
            text: "Over Time(%)",
            sort: true
        },
        {
            dataField: "overtimeerror",
            text: "Error(%)",
            sort: true
        }
    ];

    timeSubjectsdefaultSorted = [
        {
            dataField: "subject",
            order: "asc"
        }
    ];
    render() {
        const getTimeAnalysisData = this.props.getTimeAnalysisData;
        const loading1 = getTimeAnalysisData.loading;
        const error1 = getTimeAnalysisData.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getTimeAnalysisData.getTimeAnalysisData",
            getTimeAnalysisData.getTimeAnalysisData);
        let TimeAnalysisData = "";
        if (this.props.stateData.class_id == "1,2") {
            TimeAnalysisData = getTimeAnalysisData.getTimeAnalysisData.find((item) => item.class_id == "0");
        }
        else {
            TimeAnalysisData = getTimeAnalysisData.getTimeAnalysisData.find((item) => item.class_id == this.props.stateData.class_id);
        }
        return (
            <div className="time-analysis pt-4">
                <AnalysisFilter
                    defaultActiveKeyFun={this.props.defaultActiveKeyFun}
                    stateData={this.props.stateData}
                    selecthandleInputChange={this.props.selecthandleInputChange} />
                <Row>
                    {/* <Col xl={6} lg={6} md={12} sm={12}>
                        <Card className="time-error my-3">
                            <Card.Header className="bg-white py-3">
                                <h6 className="mb-0">Time vs Error</h6>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <Row>
                                    <Col xs={10}>
                                        <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                            <BarChart
                                                type="p"
                                                TimeAnalysisData={TimeAnalysisData}
                                                titleHeading={this.state.practiceTitle} />
                                            <hr className="my-2" />
                                            <BarChart
                                                type="e"
                                                TimeAnalysisData={TimeAnalysisData}
                                                titleHeading={this.state.examTitle} />
                                        </div>
                                    </Col>
                                    <Col xs={2} className="mt-1" style={{ marginLeft: '-12px' }}>
                                        <h6 style={{ fontSize: '14px', textAlign: 'center' }}>Errors</h6>
                                        <VerticalBarChart
                                            TimeAnalysisData={TimeAnalysisData}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col xl={6} lg={6} md={12} sm={12}>
                        <Card className="time-complexity my-3">
                            <Card.Header className="bg-white">
                                <div className="graph-block">
                                    <div className="border-bottom pb-2">
                                        <h6 className="">Time vs complexity</h6>
                                    </div>
                                    <div className="graph">
                                        <StackedColumnChart
                                            type="tc"
                                            TimeAnalysisData={TimeAnalysisData} />
                                            <div className="indicatetext position-absolute" style={{top: 60, right: 10}}>
                                                <i className="fas fa-circle text-danger mr-1" style={{fontSize: 12}}></i> <span>Wrong Ans</span>
                                            </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Card className="complexity-question">
                                    <CardLessDataTable
                                        articledata={this.timeComplexity(TimeAnalysisData.complexity_timewise_data)}
                                        articlecolumns={this.timeComplexitycolumns}
                                        defaultSorted={this.timeComplexitydefaultSorted} />
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6} lg={6} md={12} sm={12}>
                        <Card className="time-subject my-3">
                            <Card.Header className="bg-white">
                                <div className="graph-block">
                                    <div className="border-bottom pb-2">
                                        <h6 className="">Time vs Subjects</h6>
                                    </div>
                                    <div className="graph">
                                        <StackedColumnChart
                                            type="ts"
                                            TimeAnalysisData={TimeAnalysisData}
                                        />
                                        <div className="indicatetext position-absolute" style={{top: 60, right: 10}}>
                                        <i className="fas fa-circle text-danger mr-1" style={{fontSize: 12}}></i> <span>Wrong Ans</span>
                                    </div>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Card className="complexity-question">
                                    <CardLessDataTable
                                        articledata={this.timeSubjects(TimeAnalysisData.subject_timewise_data)}
                                        articlecolumns={this.timeSubjectscolumns}
                                        defaultSorted={this.timeSubjectsdefaultSorted}
                                    />
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Card className="time-question-type my-3">
                            <Card.Header className="bg-white border-0 py-3">
                                <h6 className="mb-0">Time vs Question type</h6>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <CardLessDataTable
                                    articledata={this.tableData(TimeAnalysisData.qtype_timewise_data)}
                                    articlecolumns={this.articlecolumns}
                                //defaultSorted={defaultSorted} 
                                />
                            </Card.Body>

                        </Card>
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
            }), name: "getTimeAnalysisData"
        }))(TimeAnalysisSection));
