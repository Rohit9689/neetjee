import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import ModalSection from './ModalSection';
import DataTableWithSearch from '../../data_tables/DataTableWithSearch';
import moment from 'moment';
import { withRouter } from "react-router-dom";

import './_startErrorExam.scss';
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

import PractiseExamHistoryResultModal from "../../exams/PractiseExamHistoryResultModal";
const defaultSorted = [
    {
        dataField: "date",
        order: "desc"
    }
];
class StartErrorExamSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeaderData: {
                Title: 'Sections'
            },
            unanswered: props.getErrorDetails.overall.not_answered,
            erranswered: props.getErrorDetails.overall.wrong_answered,
            modalShow: false,
            userRestionModalShow: false,
            resultModalShow: false,
            sessionid: "0"
        };
    }
    pcancelFunction = () => {
        this.setState({
            resultModalShow: false
        });
    }
    handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        if (isuserValid.practise_completed_analysis == false) {
            // this.setState({
            //     sessionid: rowIndex.id,
            //     resultModalShow: true,
            //     userRestionModalShow: false
            // });
            this.props.history.push({
                pathname: "/student/subject/practice-result",
                state: {
                    stype: "error",
                    sessionid: rowIndex.id,
                    getData: this.props.getChapterId
                }
            })
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }

    }
    handleViewQuestionanswer = (e, cell, row, rowIndex, formatExtraData) => {
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        if (isuserValid.practise_completed_analysis == false) {
            this.setState({
                userRestionModalShow: false
            });
            // this.props.history.push({
            //     pathname: "/student/practice-view-question-answer",
            //     state: {
            //         sessionid: rowIndex.id
            //     }
            // })
            this.props.history.push({
                pathname: "/student/practice-view-question-answer",
                state: {
                    stype: "error",
                    htype: "history",
                    sessionid: rowIndex.id
                }
            })
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    articlecolumns = [
        {
            dataField: "date",
            text: "Date",
            sort: true
        },
        {
            dataField: "score",
            text: "Score",
            sort: true,
            headerAttrs: { width: 50 },
        },

        {
            dataField: "accurancy",
            text: "Accuracy(%)",
            sort: true
        },
        {
            dataField: "skiped",
            text: "Skiped Questions",
            sort: true
        },
        {
            dataField: "wrong",
            text: "Wrong Questions",
            sort: true
        },
        {
            dataField: "Actions",
            text: "Actions",
            sort: true,
            formatter: this.actionsFormatter,
            headerAlign: 'right',
            align: 'right',
            events: {
                onClick: this.handleSessionFunction
            }
        },
        {
            dataField: "Actions",
            //text: "Actions",
            //sort: true,
            formatter: this.actionsFormatter2,
            headerAlign: 'left',
            align: 'left',
            events: {
                onClick: this.handleViewQuestionanswer,
            }
        }
    ];
    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-end align-items-top">
                <Button variant="outline-primary" className="font-weight-bold"><i class="px-3 fas fa-chart-line table_chart_icon" /></Button>
            </div>
        );
    }

    actionsFormatter2(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-start align-items-top">
                <Button variant="outline-primary" className="font-weight-bold"><div className="table_viewQA px-3">Q &amp; A</div></Button>
            </div>
        );
    }

    handleInpuchange = (e) => {
        console.log("handleInpuchange", e.target.checked, e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.checked == true) {
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: "0" });
        }
    }
    tableData(data) {
        //console.log("tableData", data);
        let tableArray = [];
        if (data != undefined) {
            for (let t = 0; t < data.length; t++) {
                let idata = data[t];
                if (idata.type == "error") {
                    const scoreplus = parseInt(idata.correct_marks) + parseInt(idata.negative_marks);
                    const scoreminus = parseInt(idata.correct_marks) - parseInt(idata.negative_marks);
                    const newscore = scoreminus + "/" + scoreplus;
                    const newobj = {
                        id: idata.id,
                        date: moment.unix(idata.timestamp).format("YYYY/MM/DD"),
                        //date: this.convertTime(idata.timestamp),
                        score: newscore,
                        accurancy: idata.accuracy,
                        skiped: idata.not_answered,
                        wrong: idata.wrong
                    }
                    tableArray.push(newobj);
                }


            }
        }

        return tableArray;

    }
    convertTime = time => {
        if (time.length <= 8) return "Invalid Time";

        var a = new Date(parseInt(time) * 1000);
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        if (date.length == 1) date = "0" + date;

        var hour = a.getHours();
        if (hour.length == 1) hour = "0" + hour;

        var min = a.getMinutes();

        if (min.length == 1) min = "0" + min;

        var sec = a.getSeconds();
        var time = date + " - " + month + " - " + year;
        return time;
    };

    render() {
        console.log("getErrorDetails.getErrorDetails", this.props.getErrorDetails);
        return (
            <div className="start_error mt-4">
                <Card as={Card.Body}>
                    <Row>
                        <Col sm={5}>
                            <Card className="border_lightRed">
                                <Card.Header className="bg_lightRed border-0">
                                    <div className="d-lg-flex justify-content-between align-items-center mt-1 font-weight-bold font_16">
                                        <div>Pending Error questions</div>
                                        <div className="text-right">{parseInt(this.props.getErrorDetails.overall.not_answered) + parseInt(this.props.getErrorDetails.overall.wrong_answered)}</div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-lg-flex justify-content-between align-items-center mt-2 font-weight-bold">
                                        <div className="color_yash">Not Answered</div>
                                        <div className="text-right">{this.props.getErrorDetails.overall.not_answered}</div>
                                    </div>
                                    <div className="d-lg-flex justify-content-between align-items-center mt-2 font-weight-bold">
                                        <div className="color_yash">Wrong Answered</div>
                                        <div className="text-right">{parseInt(this.props.getErrorDetails.overall.wrong_answered)+parseInt(this.props.getErrorDetails.overall.correct_answered)}</div>
                                    </div>
                                    <div className="d-lg-flex justify-content-between align-items-center button_bg_lightgreen">
                                        <div className="">Error corrected:</div>
                                        <div className="text-right">{this.props.getErrorDetails.overall.correct_answered}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={5}>
                            <Card className="p-2">
                                <p className="color_333 font-weight-bold mb-1">Practise</p>
                                <div className="bg_lightGreen font-weight-bold color_333">
                                    <Row>
                                        <Col sm={6}>
                                            <div className="color_yash">Wrong Answered</div>
                                            <div className="mt-1">{this.props.getErrorDetails.practice != undefined ? (parseInt(this.props.getErrorDetails.practice.wrong_answered)+parseInt(this.props.getErrorDetails.practice.correct_answered)) : (0)}</div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="bg_darkYash">
                                                <div className="color_yash">Error corrected:</div>
                                                <div className="mt-1">{this.props.getErrorDetails.practice != undefined ? (this.props.getErrorDetails.practice.correct_answered) : (0)}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <p className="color_333 font-weight-bold mb-1 mt-2">Exam</p>
                                <div className="bg_lightGreen font-weight-bold">
                                    <Row>
                                        <Col sm={6}>
                                            <div className="color_yash text-center">Not Answered : <span className="color_333">{this.props.getErrorDetails.test != undefined ? (this.props.getErrorDetails.test.not_answered) : (0)}</span></div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="color_yash text-center">Wrong Answered : <span className="color_333">{this.props.getErrorDetails.test != undefined ? (parseInt(this.props.getErrorDetails.test.wrong_answered)+parseInt(this.props.getErrorDetails.test.correct_answered)) : (0)}
                                            </span></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="bg_darkYash color_yash text-center mt-2 p-2">Error corrected: <span className="color_333">
                                                {this.props.getErrorDetails.test != undefined ? (this.props.getErrorDetails.test.correct_answered) : (0)}
                                            </span></div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <div className="border_green custom-cursor" onClick={() => this.setState({ modalShow: true })}>
                                <Image src={require('../../../../images/human_error.png')} alt="Image" />
                                <p className="color_green font-weight-bold text-center">Start Error Exam</p>
                            </div>
                            <ModalSection
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })}
                                getErrorDetails={this.props.getErrorDetails}
                                getChapterId={this.props.getChapterId}
                                parenthandleInpuchange={this.handleInpuchange}
                                stateData={this.state}
                            />
                        </Col>
                    </Row>
                </Card>
                <Row>
                    <Col className="mt-2">
                        <DataTableWithSearch
                            parentData={this.tableData(this.props.getStudentSessions)}
                            particlecolumns={this.articlecolumns}
                            defaultSorted={defaultSorted}
                            tableHeading={this.state.tableHeaderData}
                        />
                    </Col>
                </Row>
                {this.state.sessionid != 0 ? (<PractiseExamHistoryResultModal
                    pcancelFunction={this.pcancelFunction}
                    type="Error Exam Result"
                    stateData={this.state}
                    show={this.state.resultModalShow}
                    onHide={() => this.setState({ resultModalShow: false })} />) : ("")}

                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </div>

        )
    }
}

export default withRouter(StartErrorExamSection);
