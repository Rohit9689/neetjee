import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import { Container, Row, Col, Card, Image, Table, Button, Form } from 'react-bootstrap'
import { components } from 'react-select'
import LineChart from './LineChart';
import ColumnChart from './ColumnChart';
import ColumnChartTwo from './ColumnChartTwo';
//import MainLineChart from '../../learn_practice/MainLineChart';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';

import './_resultanalysis.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';

const FETCH_ANALYTICS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getAnalytics(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        strength
        total_practice
        practice_accuracy
        total_exams
        exams_accuracy
        class_wise_data{
            exam_type
            class1_completed
            class1_accuracy
            class2_completed
            class2_accuracy
        }
        subject_strength{
            id
            subject
            strength
        }
        time_analysis{
            intime
            intime_accuracy
            lesstime
            lesstime_accuracy
            overtime
            overtime_accuracy
            speed
        }
        complexity_strength{
            difficulty
            correct
            wrong
        }
        error_analysis{
            attempted
            error
            error_corrected
        }
        question_theory{
            application_questions
            application_accuracy
            theory_questions
            theory_accuracy
        }
        weak_analysis{
            question_type
            accuracy
        }
    }
}
`;

class ResultAnalysisSection extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: "Results",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
            options: {
                chart: {
                    width: 80,
                    height: 50,
                    type: 'line',
                    sparkline: {
                        enabled: true
                    },
                    toolbar: {
                        show: false,
                        enabled: false
                    },
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: '#38d2ad',
                    width: 2,
                    dashArray: 0,
                },
                markers: {
                    size: 0,
                    colors: '#38d2ad',
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 5
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false,
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return ''
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },

            LineChartTWoTitle: {
                Title: 'ERRORS ANALYSIS'
            },
            columnChartTitle: {
                Title: 'SUBJECT STRENGTH'
            },
            columnChartTwoTitle: {
                Title: 'COMPLEXITY STRENGTH'
            }
        };
    }
    class11(data) {
        let sumper = "";
        let pgetData = data.find((item) => item.exam_type == 0);
        let egetData = data.find((item) => item.exam_type == 1);
        if (pgetData.class1_accuracy != 0 && egetData.class1_accuracy != 0) {
            sumper = Math.round((pgetData.class1_accuracy + egetData.class1_accuracy) / 2);
        }
        else {
            sumper = Math.round(pgetData.class1_accuracy + egetData.class1_accuracy);
        }

        return sumper;
    }
    class12(data) {
        let sumper = "";
        let pgetData = data.find((item) => item.exam_type == 0);
        let egetData = data.find((item) => item.exam_type == 1);
        if (pgetData.class2_accuracy != 0 && egetData.class2_accuracy != 0) {
            sumper = Math.round((pgetData.class2_accuracy + egetData.class2_accuracy) / 2);
        }
        else {
            sumper = Math.round(pgetData.class2_accuracy + egetData.class2_accuracy);
        }

        return sumper;
    }
    learnnowFun = () => {
        this.props.history.push("/student/learn-practice");
    }
    totalPractiseExamQuestions(totpra, totexams, type) {
        console.log("totpra, totexams", totpra, totexams);
        let returnData = "";
        if (type == "0") {
            returnData = totpra;
        }
        else if (type == "1") {
            returnData = totexams;
        }
        else {
            returnData = totpra + totexams;
        }
        return returnData;

    }
    render() {
        console.log("this.props.stateData", this.props.stateData);
        const getAnalytics = this.props.getAnalytics;
        const loading1 = getAnalytics.loading;
        const error1 = getAnalytics.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        // Exams
        const Exams = [
            { value: "2", label: 'ALL' },
            { value: "0", label: 'Practise' },
            { value: "1", label: 'Exam' }
        ];
        // classes
        const classes = [
            { value: "0", label: 'ALL' },
            { value: "1", label: 'Class-XI' },
            { value: "2", label: 'Class-XII' }
        ];
        // Monthly
        const Monthly = [
            { value: 1, label: 'March' },
            { value: 2, label: 'April' },
            { value: 3, label: 'May' }
        ];

        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <i className="fal fa-angle-down" />
                    </components.DropdownIndicator>
                )
            );
        };
        console.log("getAnalytics.getAnalytics"," mobile:", this.props.mobile,
        "exam_type:", this.props.stateData.exam_type,
        "class_id:", this.props.stateData.class_id , getAnalytics.getAnalytics);

        return (
            <div className="result-analysis pt-4">
                <Container fluid>
                    <Row>
                        <Col xl={{ span: 8, offset: 4 }} lg={{ span: 8, offset: 4 }} md={12} sm={12}>
                            <Form className="d-flex justify-content-end" as={Row}>
                                <Col xl={4} lg={4} md={4} sm={12}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Exam</Form.Label>
                                        <Col sm="10">
                                            <SelectDropDown
                                                stateData={this.props.stateData.exam_typevalue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="exam_type"
                                                options={Exams}
                                                placeholderName={'Exams'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={12}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Class</Form.Label>
                                        <Col sm="10">
                                            <SelectDropDown
                                                stateData={this.props.stateData.class_idvalue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="class_id"
                                                options={classes}
                                                placeholderName={'All Class'}
                                                dropdownIndicator={{ DropdownIndicator }} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={4} lg={6} md={12} sm={12}>
                            <Card className="action border-0 my-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="icon pl-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="47.292" height="53.463" viewBox="0 0 47.292 53.463"><path fill="#fad200" d="M120.355,83.764A14.561,14.561,0,1,0,97.008,95.376a4.747,4.747,0,0,1,1.862,3.788v6.709a4.037,4.037,0,0,0,4.037,4.037h6.383a3.815,3.815,0,0,0,3.815-3.815V98.828a4.762,4.762,0,0,1,1.8-3.707,14.532,14.532,0,0,0,5.448-11.357Zm0,0" transform="translate(-81.759 -61.977)" /><path fill="#f39320" d="M179.833,86.328a14.559,14.559,0,0,1-1.531,21.292,4.763,4.763,0,0,0-1.8,3.707v7.045a4.037,4.037,0,0,1-4.037,4.037H166.3c-.07,0-.14,0-.209-.005a4.039,4.039,0,0,0,3.857,2.843h6.383a3.815,3.815,0,0,0,3.815-3.815v-7.267a4.761,4.761,0,0,1,1.8-3.707,14.563,14.563,0,0,0-2.117-24.13Zm0,0" transform="translate(-148.802 -77.314)" /><path fill="#1dc2ff" d="M225.717,446.469a.8.8,0,0,1-.8-.795v-6.051a.795.795,0,0,1,1.59,0v6.051A.794.794,0,0,1,225.717,446.469Zm0,0" transform="translate(-201.487 -393.005)" /><path fill="#ff6914" d="M202.029,233.127a.8.8,0,0,0-1.124,0l-2.639,2.639-2.639-2.639a.795.795,0,0,0-1.124,1.124l2.968,2.968v11.2a.795.795,0,1,0,1.59,0v-11.2l2.968-2.968A.8.8,0,0,0,202.029,233.127Zm0,0" transform="translate(-174.037 -208.575)" /><path fill="#f39320" d="M179.833,86.328a14.559,14.559,0,0,1-1.531,21.292,4.763,4.763,0,0,0-1.8,3.707v7.045a4.037,4.037,0,0,1-4.037,4.037H166.3c-.07,0-.14,0-.209-.005a4.039,4.039,0,0,0,3.857,2.843h6.383a3.815,3.815,0,0,0,3.815-3.815v-7.267a4.761,4.761,0,0,1,1.8-3.707,14.563,14.563,0,0,0-2.117-24.13Zm0,0" transform="translate(-148.802 -77.314)" /><path fill="#ff738b" d="M339.825,7.462h-6.836a.313.313,0,0,1-.313-.313V.313A.313.313,0,0,1,332.989,0h6.836a.313.313,0,0,1,.313.313V7.149A.313.313,0,0,1,339.825,7.462Zm0,0" transform="translate(-297.99)" /><path fill="#0882bf" d="M8.249,258.608l-7.279-4.2a.313.313,0,0,0-.47.271v8.405a.313.313,0,0,0,.47.272l7.279-4.2A.313.313,0,0,0,8.249,258.608Zm0,0" transform="translate(-0.5 -227.802)" /><path fill="#1dc2ff" d="M401.346,133.054a3.035,3.035,0,1,1-3.035-3.034A3.035,3.035,0,0,1,401.346,133.054Zm0,0" transform="translate(-354.054 -116.443)" /><path fill="#ee4a84" d="M376.543,0V7.462h2.569a.313.313,0,0,0,.313-.313V.313A.313.313,0,0,0,379.111,0Zm0,0" transform="translate(-337.276)" /><path fill="#005ca0" d="M6.093,283.1.5,286.327v2.49a.313.313,0,0,0,.47.271l7.279-4.2a.313.313,0,0,0,0-.542Zm0,0" transform="translate(-0.5 -253.537)" /><path fill="#00a2ff" d="M416.237,130.02a3.038,3.038,0,0,0-.944.151,3.035,3.035,0,0,1,0,5.768,3.035,3.035,0,1,0,.944-5.919Zm0,0" transform="translate(-371.98 -116.443)" /><path fill="#fab700" d="M179.833,86.328a14.559,14.559,0,0,1-1.531,21.292,4.763,4.763,0,0,0-1.8,3.707v7.045a4.037,4.037,0,0,1-4.037,4.037H166.3c-.07,0-.14,0-.209-.005a4.039,4.039,0,0,0,3.857,2.843h6.383a3.815,3.815,0,0,0,3.815-3.815v-7.267a4.761,4.761,0,0,1,1.8-3.707,14.563,14.563,0,0,0-2.117-24.13Zm0,0" transform="translate(-148.802 -77.314)" /><path fill="#32e4ff" d="M164.371,364.418v5.843a4.037,4.037,0,0,0,4.037,4.037h6.383a3.815,3.815,0,0,0,3.815-3.815v-6.066Zm0,0" transform="translate(-147.259 -326.365)" /><path fill="#1dc2ff" d="M176.5,364.418v3.006a4.037,4.037,0,0,1-4.037,4.037H166.3l-.209,0a4.039,4.039,0,0,0,3.857,2.842h6.383a3.8,3.8,0,0,0,1.734-.417,3.82,3.82,0,0,0,2.081-3.4v-6.065H176.5Zm0,0" transform="translate(-148.803 -326.365)" /><path fill="#1dc2ff" d="M164.371,364.418h14.235V368.7H164.371Zm0,0" transform="translate(-147.259 -326.365)" /><path fill="#00a2ff" d="M264,367.424a4.029,4.029,0,0,1-.206,1.273h3.854v-4.278H264Zm0,0" transform="translate(-236.296 -326.365)" /><path fill="#fab700" d="M40.886,32.314l.257,1.047a5.294,5.294,0,0,0,3.192,3.6.255.255,0,0,1,0,.424,5.3,5.3,0,0,0-3.192,3.6l-.257,1.047a.212.212,0,0,1-.412,0l-.256-1.047a5.3,5.3,0,0,0-3.192-3.6.255.255,0,0,1,0-.424,5.3,5.3,0,0,0,3.192-3.6l.256-1.047A.212.212,0,0,1,40.886,32.314Zm0,0" transform="translate(-33.111 -28.795)" /><path fill="#fad200" d="M41.915,61.585a5.754,5.754,0,0,1-2.444-1.937,5.758,5.758,0,0,1-2.445,1.937.255.255,0,0,0,0,.424,5.758,5.758,0,0,1,2.445,1.937,5.754,5.754,0,0,1,2.444-1.937.255.255,0,0,0,0-.424Zm0,0" transform="translate(-33.111 -53.42)" /><path fill="#fab700" d="M344.737,339.218l.342,1.4a7.078,7.078,0,0,0,4.267,4.811.341.341,0,0,1,0,.567,7.078,7.078,0,0,0-4.267,4.812l-.342,1.4a.283.283,0,0,1-.55,0l-.343-1.4a7.076,7.076,0,0,0-4.267-4.812.34.34,0,0,1,0-.567,7.077,7.077,0,0,0,4.267-4.811l.343-1.4A.283.283,0,0,1,344.737,339.218Zm0,0" transform="translate(-304.035 -303.603)" /><path fill="#fad200" d="M346.112,378.343a7.693,7.693,0,0,1-3.267-2.589,7.694,7.694,0,0,1-3.267,2.589.34.34,0,0,0,0,.567,7.7,7.7,0,0,1,3.267,2.589,7.69,7.69,0,0,1,3.267-2.589A.341.341,0,0,0,346.112,378.343Zm0,0" transform="translate(-304.035 -336.517)" /></svg>
                                        </div>
                                        <div className="dot-status"> </div>
                                    </div>
                                    <div className="status d-flex mt-3">
                                        <div className="rotate-block">
                                            <p>Actions</p>
                                        </div>
                                        <div className="content ml-4">
                                            <h3>{getAnalytics.getAnalytics.strength}%</h3>
                                            <div className="d-flex justify-content-between mt-4">
                                                <div className="content-block">
                                                    <div className="d-flex">
                                                        <p>{this.totalPractiseExamQuestions(getAnalytics.getAnalytics.total_practice, getAnalytics.getAnalytics.total_exams, this.props.stateData.exam_type)} Questions</p>
                                                        {/* <p>{getAnalytics.getAnalytics.total_practice + getAnalytics.getAnalytics.total_exams} Questions</p> */}
                                                        {/* <p>185 Correct</p> */}
                                                    </div>
                                                    {/* {this.props.seperationType == "student" ? (<p className="nextstep">Your Next Steps <i className="far fa-chevron-double-right" /> </p>) : ("")} */}
                                                </div>
                                                <div id="chart">
                                                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={80} height={50} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between bg-white border-0 p-0">
                                    {this.props.stateData.class_id == "1,2" ? (
                                        <React.Fragment>
                                            <div className="classXI p-3">
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <p>Class XI</p>
                                                    <div className="dot-status"> </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <div className="class-XI">
                                                        <h6 className="mb-0">{this.class11(getAnalytics.getAnalytics.class_wise_data)}%</h6>
                                                    </div>
                                                    <div id="chart" className="ml-3">
                                                        <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={50} height={25} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-right"></div>
                                            <div className="classXII p-3">
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <p>Class XII</p>
                                                    <div className="dot-status"> </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <div className="class-XII">
                                                        <h6 className="mb-0">{this.class12(getAnalytics.getAnalytics.class_wise_data)}%</h6>
                                                    </div>
                                                    <div id="chart" className="ml-3">
                                                        <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={50} height={25} />
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>)
                                        : this.props.stateData.class_id == "1" ? (
                                            <div className="classXI p-3">
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <p>Class XI</p>
                                                    <div className="dot-status"> </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <div className="class-XI">
                                                        <h6 className="mb-0">{this.class11(getAnalytics.getAnalytics.class_wise_data)}%</h6>
                                                    </div>
                                                    <div id="chart" className="ml-3">
                                                        <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={50} height={25} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (<div className="classXII p-3">
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <p>Class XII</p>
                                                <div className="dot-status"> </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div className="class-XII">
                                                    <h6 className="mb-0">{this.class12(getAnalytics.getAnalytics.class_wise_data)}%</h6>
                                                </div>
                                                <div id="chart" className="ml-3">
                                                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" width={50} height={25} />
                                                </div>
                                            </div>
                                        </div>)}

                                </Card.Footer>
                            </Card>
                            <Card className="overall border-0 my-3">
                                <Card.Header className="bg-white p-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="student d-flex pr-2">
                                            <p className="txt">Overall</p>
                                            <Image src={require('../../../../images/student-chair.png')} width="60" alt="img" />
                                        </div>
                                        <div className="practice border-left py-2 pl-3 pr-3">
                                            {this.props.stateData.exam_type == "0,1" ? (
                                                <React.Fragment>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="practice-text d-flex align-items-center">
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17.971" height="26.176" viewBox="0 0 17.971 26.176"><g transform="translate(0 0)"><path d="M-1968.669,48.939c.126-.233.259-.459.554-.507a.675.675,0,0,1,.8.6c.131.676.249,1.354.375,2.03q.608,3.27,1.218,6.54c.068.366.214.5.59.5.91.009,1.821.008,2.731,0a.338.338,0,0,0,.235-.108q1.859-2.37,3.706-4.75c.009-.011,0-.031.009-.062l-.144-.031a.659.659,0,0,1-.574-.744.67.67,0,0,1,.711-.593c.5-.006,1,0,1.506,0q2.745,0,5.489,0a.675.675,0,0,1,.682.977.7.7,0,0,1-.7.376h-2.808c-.962,0-1.923,0-2.885.007a.43.43,0,0,0-.3.134q-1.83,2.328-3.645,4.669a1.127,1.127,0,0,0-.064.115c.124.006.221.014.318.014.825,0,1.651,0,2.477,0a.68.68,0,0,1,.746.639.679.679,0,0,1-.723.716c-.17,0-.34,0-.51,0h-.554c.047.123.082.221.122.316q1.009,2.382,2.018,4.764c.155.367.135.447-.149.709h-.306a2.2,2.2,0,0,1-.292-.4q-1.1-2.578-2.186-5.164a.3.3,0,0,0-.331-.226c-1.2.009-2.4.011-3.6,0a.335.335,0,0,0-.366.255q-1.078,2.575-2.175,5.142a2.1,2.1,0,0,1-.3.4h-.306c-.283-.279-.3-.348-.132-.737q.715-1.69,1.432-3.379c.234-.552.467-1.105.708-1.674-.069-.017-.107-.03-.147-.036a1.826,1.826,0,0,1-1.578-1.4c-.049-.171-.068-.35-.1-.525q-.627-3.383-1.254-6.766c-.093-.5-.2-.992-.306-1.488Z" transform="translate(1968.669 -39.073)" /><path d="M-1902.294-5.021h1.3c-.208.27-.379.5-.554.722-.639.819-1.275,1.64-1.923,2.452a.435.435,0,0,1-.307.156,7.41,7.41,0,0,1-1.212-.126,2.446,2.446,0,0,1-1.932-2.241,14.614,14.614,0,0,1-.108-3.771,15.161,15.161,0,0,1,.987-3.971,3.226,3.226,0,0,1,1.379-1.628,2.665,2.665,0,0,1,1.659-.383,1.644,1.644,0,0,1,1.376,1,3.082,3.082,0,0,1,.229,2.032,2.422,2.422,0,0,1-.626-1.165,1.317,1.317,0,0,0-2.035-.71,1.341,1.341,0,0,0-.5,1.474,4.922,4.922,0,0,0,2.382,3.144.337.337,0,0,1,.181.407C-1902.1-6.778-1902.194-5.925-1902.294-5.021Z" transform="translate(1910.259 19.983)" /><path d="M-1801.948,161.29h-3.314c.059-.089.1-.151.14-.208.764-.98,1.53-1.958,2.29-2.942a.426.426,0,0,1,.382-.191c.587.011,1.175,0,1.762.005a1.645,1.645,0,0,1,1.693,1.337q.881,3.561,1.749,7.125a1.678,1.678,0,0,1-1.2,2.081,1.672,1.672,0,0,1-2.052-1.314C-1800.981,165.229-1801.462,163.275-1801.948,161.29Z" transform="translate(1813.634 -142.992)" /><path d="M-1835.075-128.041a2.987,2.987,0,0,1-3-2.942,2.994,2.994,0,0,1,2.857-3.059,2.983,2.983,0,0,1,3.13,2.965A2.989,2.989,0,0,1-1835.075-128.041Z" transform="translate(1844.767 134.043)" /><path d="M-1848.131,14.356a5.649,5.649,0,0,1-3.7-1.222,4.548,4.548,0,0,1-1.594-2.633,1.056,1.056,0,0,1,.784-1.25,1.09,1.09,0,0,1,1.3.785,3.7,3.7,0,0,0,.31.775,2.815,2.815,0,0,0,2.225,1.35,8.232,8.232,0,0,0,3.27-.37,1.063,1.063,0,0,1,1.409.723,1.07,1.07,0,0,1-.846,1.34A11.773,11.773,0,0,1-1848.131,14.356Z" transform="translate(1859.347 -1.882)" /><path d="M-1715.437,43.572c-.554.21-.573.2-.854-.238l.406-.324Z" transform="translate(1729.22 -33.941)" /><path d="M-1674.89,95.453l-.681-.48.424-.338.314.775Z" transform="translate(1690.586 -82.92)" /></g></svg>
                                                            </div>
                                                            <div className="content ml-3">
                                                                <h6 className="mb-0">Total Practice Qs</h6>
                                                                <p>Accuracy</p>
                                                            </div>
                                                        </div>
                                                        <div className="ml-5 percentages">
                                                            <h6 className="mb-0">{getAnalytics.getAnalytics.total_practice}</h6>
                                                            <p className="text-gray4">{getAnalytics.getAnalytics.practice_accuracy}%</p>
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="practice-text d-flex align-items-center">
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17.971" height="26.176" viewBox="0 0 17.971 26.176"><g transform="translate(0 0)"><path d="M-1968.669,48.939c.126-.233.259-.459.554-.507a.675.675,0,0,1,.8.6c.131.676.249,1.354.375,2.03q.608,3.27,1.218,6.54c.068.366.214.5.59.5.91.009,1.821.008,2.731,0a.338.338,0,0,0,.235-.108q1.859-2.37,3.706-4.75c.009-.011,0-.031.009-.062l-.144-.031a.659.659,0,0,1-.574-.744.67.67,0,0,1,.711-.593c.5-.006,1,0,1.506,0q2.745,0,5.489,0a.675.675,0,0,1,.682.977.7.7,0,0,1-.7.376h-2.808c-.962,0-1.923,0-2.885.007a.43.43,0,0,0-.3.134q-1.83,2.328-3.645,4.669a1.127,1.127,0,0,0-.064.115c.124.006.221.014.318.014.825,0,1.651,0,2.477,0a.68.68,0,0,1,.746.639.679.679,0,0,1-.723.716c-.17,0-.34,0-.51,0h-.554c.047.123.082.221.122.316q1.009,2.382,2.018,4.764c.155.367.135.447-.149.709h-.306a2.2,2.2,0,0,1-.292-.4q-1.1-2.578-2.186-5.164a.3.3,0,0,0-.331-.226c-1.2.009-2.4.011-3.6,0a.335.335,0,0,0-.366.255q-1.078,2.575-2.175,5.142a2.1,2.1,0,0,1-.3.4h-.306c-.283-.279-.3-.348-.132-.737q.715-1.69,1.432-3.379c.234-.552.467-1.105.708-1.674-.069-.017-.107-.03-.147-.036a1.826,1.826,0,0,1-1.578-1.4c-.049-.171-.068-.35-.1-.525q-.627-3.383-1.254-6.766c-.093-.5-.2-.992-.306-1.488Z" transform="translate(1968.669 -39.073)" /><path d="M-1902.294-5.021h1.3c-.208.27-.379.5-.554.722-.639.819-1.275,1.64-1.923,2.452a.435.435,0,0,1-.307.156,7.41,7.41,0,0,1-1.212-.126,2.446,2.446,0,0,1-1.932-2.241,14.614,14.614,0,0,1-.108-3.771,15.161,15.161,0,0,1,.987-3.971,3.226,3.226,0,0,1,1.379-1.628,2.665,2.665,0,0,1,1.659-.383,1.644,1.644,0,0,1,1.376,1,3.082,3.082,0,0,1,.229,2.032,2.422,2.422,0,0,1-.626-1.165,1.317,1.317,0,0,0-2.035-.71,1.341,1.341,0,0,0-.5,1.474,4.922,4.922,0,0,0,2.382,3.144.337.337,0,0,1,.181.407C-1902.1-6.778-1902.194-5.925-1902.294-5.021Z" transform="translate(1910.259 19.983)" /><path d="M-1801.948,161.29h-3.314c.059-.089.1-.151.14-.208.764-.98,1.53-1.958,2.29-2.942a.426.426,0,0,1,.382-.191c.587.011,1.175,0,1.762.005a1.645,1.645,0,0,1,1.693,1.337q.881,3.561,1.749,7.125a1.678,1.678,0,0,1-1.2,2.081,1.672,1.672,0,0,1-2.052-1.314C-1800.981,165.229-1801.462,163.275-1801.948,161.29Z" transform="translate(1813.634 -142.992)" /><path d="M-1835.075-128.041a2.987,2.987,0,0,1-3-2.942,2.994,2.994,0,0,1,2.857-3.059,2.983,2.983,0,0,1,3.13,2.965A2.989,2.989,0,0,1-1835.075-128.041Z" transform="translate(1844.767 134.043)" /><path d="M-1848.131,14.356a5.649,5.649,0,0,1-3.7-1.222,4.548,4.548,0,0,1-1.594-2.633,1.056,1.056,0,0,1,.784-1.25,1.09,1.09,0,0,1,1.3.785,3.7,3.7,0,0,0,.31.775,2.815,2.815,0,0,0,2.225,1.35,8.232,8.232,0,0,0,3.27-.37,1.063,1.063,0,0,1,1.409.723,1.07,1.07,0,0,1-.846,1.34A11.773,11.773,0,0,1-1848.131,14.356Z" transform="translate(1859.347 -1.882)" /><path d="M-1715.437,43.572c-.554.21-.573.2-.854-.238l.406-.324Z" transform="translate(1729.22 -33.941)" /><path d="M-1674.89,95.453l-.681-.48.424-.338.314.775Z" transform="translate(1690.586 -82.92)" /></g></svg>
                                                            </div>
                                                            <div className="content ml-3">
                                                                <h6 className="mb-0">Total Exams Qs</h6>
                                                                <p>Accuracy</p>
                                                            </div>
                                                        </div>
                                                        <div className="ml-5 percentages">
                                                            <h6 className="mb-0">{getAnalytics.getAnalytics.total_exams}</h6>
                                                            <p className="text-gray4">{getAnalytics.getAnalytics.exams_accuracy}%</p>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                                : this.props.stateData.exam_type == "0" ? (
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="practice-text d-flex align-items-center">
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17.971" height="26.176" viewBox="0 0 17.971 26.176"><g transform="translate(0 0)"><path d="M-1968.669,48.939c.126-.233.259-.459.554-.507a.675.675,0,0,1,.8.6c.131.676.249,1.354.375,2.03q.608,3.27,1.218,6.54c.068.366.214.5.59.5.91.009,1.821.008,2.731,0a.338.338,0,0,0,.235-.108q1.859-2.37,3.706-4.75c.009-.011,0-.031.009-.062l-.144-.031a.659.659,0,0,1-.574-.744.67.67,0,0,1,.711-.593c.5-.006,1,0,1.506,0q2.745,0,5.489,0a.675.675,0,0,1,.682.977.7.7,0,0,1-.7.376h-2.808c-.962,0-1.923,0-2.885.007a.43.43,0,0,0-.3.134q-1.83,2.328-3.645,4.669a1.127,1.127,0,0,0-.064.115c.124.006.221.014.318.014.825,0,1.651,0,2.477,0a.68.68,0,0,1,.746.639.679.679,0,0,1-.723.716c-.17,0-.34,0-.51,0h-.554c.047.123.082.221.122.316q1.009,2.382,2.018,4.764c.155.367.135.447-.149.709h-.306a2.2,2.2,0,0,1-.292-.4q-1.1-2.578-2.186-5.164a.3.3,0,0,0-.331-.226c-1.2.009-2.4.011-3.6,0a.335.335,0,0,0-.366.255q-1.078,2.575-2.175,5.142a2.1,2.1,0,0,1-.3.4h-.306c-.283-.279-.3-.348-.132-.737q.715-1.69,1.432-3.379c.234-.552.467-1.105.708-1.674-.069-.017-.107-.03-.147-.036a1.826,1.826,0,0,1-1.578-1.4c-.049-.171-.068-.35-.1-.525q-.627-3.383-1.254-6.766c-.093-.5-.2-.992-.306-1.488Z" transform="translate(1968.669 -39.073)" /><path d="M-1902.294-5.021h1.3c-.208.27-.379.5-.554.722-.639.819-1.275,1.64-1.923,2.452a.435.435,0,0,1-.307.156,7.41,7.41,0,0,1-1.212-.126,2.446,2.446,0,0,1-1.932-2.241,14.614,14.614,0,0,1-.108-3.771,15.161,15.161,0,0,1,.987-3.971,3.226,3.226,0,0,1,1.379-1.628,2.665,2.665,0,0,1,1.659-.383,1.644,1.644,0,0,1,1.376,1,3.082,3.082,0,0,1,.229,2.032,2.422,2.422,0,0,1-.626-1.165,1.317,1.317,0,0,0-2.035-.71,1.341,1.341,0,0,0-.5,1.474,4.922,4.922,0,0,0,2.382,3.144.337.337,0,0,1,.181.407C-1902.1-6.778-1902.194-5.925-1902.294-5.021Z" transform="translate(1910.259 19.983)" /><path d="M-1801.948,161.29h-3.314c.059-.089.1-.151.14-.208.764-.98,1.53-1.958,2.29-2.942a.426.426,0,0,1,.382-.191c.587.011,1.175,0,1.762.005a1.645,1.645,0,0,1,1.693,1.337q.881,3.561,1.749,7.125a1.678,1.678,0,0,1-1.2,2.081,1.672,1.672,0,0,1-2.052-1.314C-1800.981,165.229-1801.462,163.275-1801.948,161.29Z" transform="translate(1813.634 -142.992)" /><path d="M-1835.075-128.041a2.987,2.987,0,0,1-3-2.942,2.994,2.994,0,0,1,2.857-3.059,2.983,2.983,0,0,1,3.13,2.965A2.989,2.989,0,0,1-1835.075-128.041Z" transform="translate(1844.767 134.043)" /><path d="M-1848.131,14.356a5.649,5.649,0,0,1-3.7-1.222,4.548,4.548,0,0,1-1.594-2.633,1.056,1.056,0,0,1,.784-1.25,1.09,1.09,0,0,1,1.3.785,3.7,3.7,0,0,0,.31.775,2.815,2.815,0,0,0,2.225,1.35,8.232,8.232,0,0,0,3.27-.37,1.063,1.063,0,0,1,1.409.723,1.07,1.07,0,0,1-.846,1.34A11.773,11.773,0,0,1-1848.131,14.356Z" transform="translate(1859.347 -1.882)" /><path d="M-1715.437,43.572c-.554.21-.573.2-.854-.238l.406-.324Z" transform="translate(1729.22 -33.941)" /><path d="M-1674.89,95.453l-.681-.48.424-.338.314.775Z" transform="translate(1690.586 -82.92)" /></g></svg>
                                                            </div>
                                                            <div className="content ml-3">
                                                                <h6 className="mb-0">Total Practice Qs</h6>
                                                                <p>Accuracy</p>
                                                            </div>
                                                        </div>
                                                        <div className="ml-5 percentages">
                                                            <h6 className="mb-0">{getAnalytics.getAnalytics.total_practice}</h6>
                                                            <p className="text-gray4">{getAnalytics.getAnalytics.practice_accuracy}%</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="practice-text d-flex align-items-center">
                                                                <div className="icon">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.971" height="26.176" viewBox="0 0 17.971 26.176"><g transform="translate(0 0)"><path d="M-1968.669,48.939c.126-.233.259-.459.554-.507a.675.675,0,0,1,.8.6c.131.676.249,1.354.375,2.03q.608,3.27,1.218,6.54c.068.366.214.5.59.5.91.009,1.821.008,2.731,0a.338.338,0,0,0,.235-.108q1.859-2.37,3.706-4.75c.009-.011,0-.031.009-.062l-.144-.031a.659.659,0,0,1-.574-.744.67.67,0,0,1,.711-.593c.5-.006,1,0,1.506,0q2.745,0,5.489,0a.675.675,0,0,1,.682.977.7.7,0,0,1-.7.376h-2.808c-.962,0-1.923,0-2.885.007a.43.43,0,0,0-.3.134q-1.83,2.328-3.645,4.669a1.127,1.127,0,0,0-.064.115c.124.006.221.014.318.014.825,0,1.651,0,2.477,0a.68.68,0,0,1,.746.639.679.679,0,0,1-.723.716c-.17,0-.34,0-.51,0h-.554c.047.123.082.221.122.316q1.009,2.382,2.018,4.764c.155.367.135.447-.149.709h-.306a2.2,2.2,0,0,1-.292-.4q-1.1-2.578-2.186-5.164a.3.3,0,0,0-.331-.226c-1.2.009-2.4.011-3.6,0a.335.335,0,0,0-.366.255q-1.078,2.575-2.175,5.142a2.1,2.1,0,0,1-.3.4h-.306c-.283-.279-.3-.348-.132-.737q.715-1.69,1.432-3.379c.234-.552.467-1.105.708-1.674-.069-.017-.107-.03-.147-.036a1.826,1.826,0,0,1-1.578-1.4c-.049-.171-.068-.35-.1-.525q-.627-3.383-1.254-6.766c-.093-.5-.2-.992-.306-1.488Z" transform="translate(1968.669 -39.073)" /><path d="M-1902.294-5.021h1.3c-.208.27-.379.5-.554.722-.639.819-1.275,1.64-1.923,2.452a.435.435,0,0,1-.307.156,7.41,7.41,0,0,1-1.212-.126,2.446,2.446,0,0,1-1.932-2.241,14.614,14.614,0,0,1-.108-3.771,15.161,15.161,0,0,1,.987-3.971,3.226,3.226,0,0,1,1.379-1.628,2.665,2.665,0,0,1,1.659-.383,1.644,1.644,0,0,1,1.376,1,3.082,3.082,0,0,1,.229,2.032,2.422,2.422,0,0,1-.626-1.165,1.317,1.317,0,0,0-2.035-.71,1.341,1.341,0,0,0-.5,1.474,4.922,4.922,0,0,0,2.382,3.144.337.337,0,0,1,.181.407C-1902.1-6.778-1902.194-5.925-1902.294-5.021Z" transform="translate(1910.259 19.983)" /><path d="M-1801.948,161.29h-3.314c.059-.089.1-.151.14-.208.764-.98,1.53-1.958,2.29-2.942a.426.426,0,0,1,.382-.191c.587.011,1.175,0,1.762.005a1.645,1.645,0,0,1,1.693,1.337q.881,3.561,1.749,7.125a1.678,1.678,0,0,1-1.2,2.081,1.672,1.672,0,0,1-2.052-1.314C-1800.981,165.229-1801.462,163.275-1801.948,161.29Z" transform="translate(1813.634 -142.992)" /><path d="M-1835.075-128.041a2.987,2.987,0,0,1-3-2.942,2.994,2.994,0,0,1,2.857-3.059,2.983,2.983,0,0,1,3.13,2.965A2.989,2.989,0,0,1-1835.075-128.041Z" transform="translate(1844.767 134.043)" /><path d="M-1848.131,14.356a5.649,5.649,0,0,1-3.7-1.222,4.548,4.548,0,0,1-1.594-2.633,1.056,1.056,0,0,1,.784-1.25,1.09,1.09,0,0,1,1.3.785,3.7,3.7,0,0,0,.31.775,2.815,2.815,0,0,0,2.225,1.35,8.232,8.232,0,0,0,3.27-.37,1.063,1.063,0,0,1,1.409.723,1.07,1.07,0,0,1-.846,1.34A11.773,11.773,0,0,1-1848.131,14.356Z" transform="translate(1859.347 -1.882)" /><path d="M-1715.437,43.572c-.554.21-.573.2-.854-.238l.406-.324Z" transform="translate(1729.22 -33.941)" /><path d="M-1674.89,95.453l-.681-.48.424-.338.314.775Z" transform="translate(1690.586 -82.92)" /></g></svg>
                                                                </div>
                                                                <div className="content ml-3">
                                                                    <h6 className="mb-0">Total Exams Qs</h6>
                                                                    <p>Accuracy</p>
                                                                </div>
                                                            </div>
                                                            <div className="ml-5 percentages">
                                                                <h6 className="mb-0">{getAnalytics.getAnalytics.total_exams}</h6>
                                                                <p className="text-gray4">{getAnalytics.getAnalytics.exams_accuracy}%</p>
                                                            </div>
                                                        </div>
                                                    )}

                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <Table borderless>
                                        <thead>
                                            <tr>
                                                <th className="grayTxt">Class wise</th>
                                                {this.props.stateData.class_id == "1,2" ? (
                                                    <React.Fragment>
                                                        <th>Class XI</th>
                                                        <th>Class XII</th>
                                                    </React.Fragment>
                                                )
                                                    : this.props.stateData.class_id == "1" ? (
                                                        <th>Class XI</th>
                                                    ) : (<th>Class XII</th>)}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.stateData.exam_type == "0,1" ? (
                                                <React.Fragment>
                                                    {getAnalytics.getAnalytics.class_wise_data.map((item) => {
                                                        if (item.exam_type == "0") {
                                                            return (<tr>
                                                                <td>
                                                                    <h6>Total Practice Qs</h6>
                                                                    <p className="grayTxt">Accuracy</p>
                                                                </td>
                                                                {this.props.stateData.class_id == "1,2" ? (
                                                                    <React.Fragment>
                                                                        <td>
                                                                            <h6>{item.class1_completed}</h6>
                                                                            <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                        </td>
                                                                        <td>
                                                                            <h6>{item.class2_completed}</h6>
                                                                            <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                        </td>
                                                                    </React.Fragment>
                                                                )
                                                                    : this.props.stateData.class_id == "1" ? (
                                                                        <td>
                                                                            <h6>{item.class1_completed}</h6>
                                                                            <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                        </td>
                                                                    )
                                                                        : (
                                                                            <td>
                                                                                <h6>{item.class2_completed}</h6>
                                                                                <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                            </td>
                                                                        )}

                                                            </tr>)
                                                        }
                                                        else {
                                                            return (<tr>
                                                                <td>
                                                                    <h6>Total Exams Qs</h6>
                                                                    <p className="grayTxt">Accuracy</p>
                                                                </td>
                                                                {this.props.stateData.class_id == "1,2" ? (
                                                                    <React.Fragment>
                                                                        <td>
                                                                            <h6>{item.class1_completed}</h6>
                                                                            <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                        </td>
                                                                        <td>
                                                                            <h6>{item.class2_completed}</h6>
                                                                            <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                        </td>
                                                                    </React.Fragment>
                                                                ) : this.props.stateData.class_id == "1" ? (
                                                                    <td>
                                                                        <h6>{item.class1_completed}</h6>
                                                                        <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                    </td>
                                                                ) : (
                                                                            <td>
                                                                                <h6>{item.class2_completed}</h6>
                                                                                <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                            </td>
                                                                        )}

                                                            </tr>)
                                                        }
                                                    })}
                                                </React.Fragment>
                                            )
                                                : (
                                                    <React.Fragment>
                                                        {getAnalytics.getAnalytics.class_wise_data.map((item) => {
                                                            if (item.exam_type == "0") {
                                                                if (this.props.stateData.exam_type == "0") {
                                                                    return (<tr>
                                                                        <td>
                                                                            <h6>Total Practice Qs</h6>
                                                                            <p className="grayTxt">Accuracy</p>
                                                                        </td>
                                                                        {this.props.stateData.class_id == "1,2" ? (
                                                                            <React.Fragment>
                                                                                <td>
                                                                                    <h6>{item.class1_completed}</h6>
                                                                                    <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                                </td>
                                                                                <td>
                                                                                    <h6>{item.class2_completed}</h6>
                                                                                    <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                                </td>
                                                                            </React.Fragment>
                                                                        )
                                                                            : this.props.stateData.class_id == "1" ? (
                                                                                <td>
                                                                                    <h6>{item.class1_completed}</h6>
                                                                                    <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                                </td>
                                                                            ) : (<td>
                                                                                <h6>{item.class2_completed}</h6>
                                                                                <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                            </td>)}

                                                                    </tr>)
                                                                }

                                                            }
                                                            else {
                                                                if (this.props.stateData.exam_type == "1") {
                                                                    return (<tr>
                                                                        <td>
                                                                            <h6>Total Exams Qs</h6>
                                                                            <p className="grayTxt">Accuracy</p>
                                                                        </td>
                                                                        {this.props.stateData.class_id == "1,2" ? (<React.Fragment>
                                                                            <td>
                                                                                <h6>{item.class1_completed}</h6>
                                                                                <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                            </td>
                                                                            <td>
                                                                                <h6>{item.class2_completed}</h6>
                                                                                <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                            </td>
                                                                        </React.Fragment>)
                                                                            : this.props.stateData.class_id == "1" ? (
                                                                                <td>
                                                                                    <h6>{item.class1_completed}</h6>
                                                                                    <p className="grayTxt">{item.class1_accuracy}%</p>
                                                                                </td>
                                                                            ) : (
                                                                                    <td>
                                                                                        <h6>{item.class2_completed}</h6>
                                                                                        <p className="grayTxt">{item.class2_accuracy}%</p>
                                                                                    </td>
                                                                                )}

                                                                    </tr>)
                                                                }

                                                            }
                                                        })}
                                                    </React.Fragment>
                                                )}

                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Card className="questionTypes border-0 my-3">
                                <Card.Header className="bg-white">
                                    <h6 className="mb-0">You are weak in below listed <br />question types</h6>
                                </Card.Header>
                                <Card.Body className="p-2" style={{ height: 350, overflowY: 'auto' }}>
                                    <div className="d-flex align-items-center">
                                        <p className="rotateTxt">Question Types</p>
                                        <ul className="ml-4 content w-100 list-unstyled">
                                            {getAnalytics.getAnalytics.weak_analysis.map((item) => {
                                                return (
                                                    <li className="p-2">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="left">
                                                                <h6>{item.question_type}</h6>
                                                                {/* {this.props.seperationType == "student" ? (
                                                                    <Button onClick={(e) => this.learnnowFun()}
                                                                        className="btn btn-lightgreen">Learn Now</Button>
                                                                ) : ("")} */}
                                                            </div>
                                                            <div className="right">
                                                                <div className="d-flex mb-1">
                                                                    <p className="text-gray4 font-weight-normal">Accuracy</p>
                                                                    <p className="ml-4 font-weight-bold">{item.accuracy}%</p>
                                                                </div>
                                                                {/* {this.props.seperationType == "student" ? (
                                                                    <Button
                                                                        onClick={(e) => this.learnnowFun()}
                                                                        className="btn btn-lightOrange">Learn Now</Button>
                                                                ) : ("")} */}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}

                                            {/* <li className="p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="left">
                                                        <h6>Diagram</h6>
                                                        <Button className="btn btn-lightgreen">Learn Now</Button>
                                                    </div>
                                                    <div className="right">
                                                        <div className="d-flex mb-1">
                                                            <p className="text-gray4 font-weight-normal">Accuracy</p>
                                                            <p className="ml-4 font-weight-bold">12%</p>
                                                        </div>
                                                        <Button className="btn btn-lightOrange">Learn Now</Button>
                                                    </div>
                                                </div>
                                            </li> */}
                                            {/* <li className="p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="left">
                                                        <h6>Diagram</h6>
                                                        <Button className="btn btn-lightgreen">Learn Now</Button>
                                                    </div>
                                                    <div className="right">
                                                        <div className="d-flex mb-1">
                                                            <p className="text-gray4 font-weight-normal">Accuracy</p>
                                                            <p className="ml-4 font-weight-bold">12%</p>
                                                        </div>
                                                        <Button className="btn btn-lightOrange">Learn Now</Button>
                                                    </div>
                                                </div>
                                            </li> */}
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="timeAnalysis border-0 my-3">
                                <Card.Body className="p-2">
                                    <div className="d-flex align-items-center">
                                        <div className="txt-block">
                                            <Image src={require('../../../../images/time-analysis.png')} width="20" alt="img" />
                                            <p className="rotateTxt">Time Analysis</p>
                                        </div>
                                        <Table borderless className="ml-5">
                                            <tbody>
                                                <tr>
                                                    <td>In time </td>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.intime}</th>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.intime_accuracy}%</th>
                                                </tr>
                                                <tr>
                                                    <td>Less time </td>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.lesstime}</th>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.lesstime_accuracy}%</th>
                                                </tr>
                                                <tr>
                                                    <td>Over time</td>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.overtime}</th>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.overtime_accuracy}% </th>
                                                </tr>
                                                <tr>
                                                    <td>Speed</td>
                                                    <th></th>
                                                    <th>{getAnalytics.getAnalytics.time_analysis.speed} Sec / Per Q</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={8} lg={6} md={12} sm={12}>
                            {/* <Card className="trending border-0 my-3">
                                <Card.Header className="bg-white p-0">
                                    <Row className="align-items-center">
                                        <Col xl={6} lg={6} md={6} sm={12}>
                                            <h6 className="mb-0 px-3">Trending</h6>
                                        </Col>
                                        <Col xl={6} lg={6} md={6} sm={12} className="d-flex">
                                            <SelectDropDown options={Exams} placeholderName={'Exams'} dropdownIndicator={{ DropdownIndicator }} />
                                            <SelectDropDown options={classes} placeholderName={'All Class'} dropdownIndicator={{ DropdownIndicator }} />
                                            <SelectDropDown options={Monthly} placeholderName={'Monthly'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <LineChart />
                                </Card.Body>
                            </Card> */}


                            <Card className="subjectStength border-0 my-3">
                                <Card.Header className="bg-white border-0">
                                    <Image src={require('../../../../images/strength.png')} width="30" alt="img" />
                                </Card.Header>
                                <Card.Body className="p-2">
                                    <div className="chart-block">
                                        <ColumnChart subject_strength={getAnalytics.getAnalytics.subject_strength}
                                            titleHeading={this.state.columnChartTitle}
                                            height="195" />
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* <Card className="errorsAnalysis border-0 my-3">
                                <Card.Header className="bg-white border-0 text-right">
                                    <ul className="list-inline errorsAnalysis-list">
                                        <li className="list-inline-item"><Link className="active">Error</Link></li>
                                        <li className="list-inline-item"><Link>Skipped</Link></li>
                                    </ul>
                                </Card.Header>
                                <Card.Body className="d-flex p-2">
                                    <p className="txt">Errors Analysis</p>
                                    <div className="chart-block ml-4 w-100">
                                        <MainLineChart />
                                    </div>
                                </Card.Body>
                            </Card> */}
                            <Row>
                                <Col xl={7} lg={6} md={12} sm={12}>
                                    <Card as={Card.Body} className="complexityStrength border-0 my-2 p-2">
                                        <div className="chart-block">
                                            <ColumnChartTwo
                                                complexity_strength={getAnalytics.getAnalytics.complexity_strength}
                                                titleHeading={this.state.columnChartTwoTitle} />
                                        </div>
                                    </Card>
                                </Col>


                                <Col xl={5} lg={6} md={12} sm={12}>
                                    <Card className="questionTheory border-0 my-2">
                                        <Card.Body className="p-3">
                                            <div className="align-items-center">
                                                <p className="rotateTxt">Question Theory</p>
                                                <div className="questionTheory-status ml-4">
                                                    <div className="d-flex justify-content-between align-items-center py-3 px-1 mb-3">
                                                        <div className="left">
                                                            <h6>Application Questions</h6>
                                                            <p className="grayTxt">Accuracy</p>
                                                        </div>
                                                        <div className="right">
                                                            <h6>{getAnalytics.getAnalytics.question_theory.application_questions}</h6>
                                                            <p className="grayTxt">{getAnalytics.getAnalytics.question_theory.application_accuracy}%</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center py-3 px-1">
                                                        <div className="left">
                                                            <h6>Concept Questions</h6>
                                                            <p className="grayTxt">Accuracy</p>
                                                        </div>
                                                        <div className="right">
                                                            <h6>{getAnalytics.getAnalytics.question_theory.theory_questions}</h6>
                                                            <p className="grayTxt">{getAnalytics.getAnalytics.question_theory.theory_accuracy}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
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
        }))(ResultAnalysisSection));