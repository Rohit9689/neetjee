import React, { Component } from 'react'
import DateTime from 'react-datetime'
import { Row, Col, Card, CardGroup, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import BarChart from '../../charts/BarChart'
import ManageQuestionModal from './ManageQuestionModal'
import DownloadQuestionPaperModal from '../../download_question_paper/DownloadQuestionPaperModal'

import '../../../../react-datetime.css'
import './_managequestionpaper.scss';
import { withRouter } from "react-router-dom";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import moment from 'moment';


const EDIT_EXAM_SHEDULE = gql`
  mutation(
    $exam_paper_id: ID
    $start_time: String!
    $end_time: String!
    ) {
        updateExamTime(
            exam_paper_id:$exam_paper_id,
            start_time:$start_time,
            end_time:$end_time
     )
  }
`;

class QuestionPaperResultSection extends Component {
    constructor(props) {
        super(props)
        console.log("QuestionPaperResultSectionprops.getExams", props.getExams);
        let someData = "";
        if (props.getExams[0] != undefined) {
            someData = moment.unix(props.getExams[0].start_time).format("DD-MM-YYYY @ LT");
        }
        else {
            someData = "";
        }

        let someData1 = "";
        if (props.getExams[0] != undefined) {
            someData1 = moment.unix(props.getExams[0].end_time).format("DD-MM-YYYY @ LT");
        }
        else {
            someData1 = "";
        }

        let result_graph = "";
        if (props.getExams[0] != undefined) {
            result_graph = props.getExams[0].result_graph;
        }
        else {
            result_graph = "";
        }


        this.state = {
            currentStep: 1,
            start_time: someData,
            end_time: someData1,
            startdate: "",
            enddate: "",
            breadcrumbsData: {
                Title: "Question Papers Result"
            },
            modalShow: false,
            modalShowTwo: false,
            formValid: false,
            submitError: "",
            result_graph: result_graph,
            formErrors: {
                startdate: "",
                enddate: ""
            },
            startdateValid: false,
            enddateValid: false

        }
    }
    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Cookies2", Cookies.get("username"));
        console.log("institutionid2", Cookies.get("institutionid"));

        if (this.state.formValid) {

            this.editexamshedule(
                this.props.getExams[0].id,
                this.state.startdate,
                this.state.enddate
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    editexamshedule = async (
        exam_paper_id,
        start_time,
        end_time

    ) => {
        await this.props.editexamshedule({
            variables: {
                exam_paper_id,
                start_time,
                end_time

            },
            update: (store, { data }) => {
                if (data.updateExamTime) {
                    let timestamp = moment(this.state.startdate, "MMM DD YYYY hh:mm:ss").unix();
                    let start_time = moment.unix(timestamp).format("DD-MM-YYYY @ LT");

                    let etimestamp = moment(this.state.enddate, "MMM DD YYYY hh:mm:ss").unix();
                    let end_time = moment.unix(etimestamp).format("DD-MM-YYYY @ LT");
                    this.setState({
                        start_time: start_time,
                        end_time: end_time,
                        currentStep: 2,
                        startdate: "",
                        enddate: "",
                        formValid: false,
                        submitError: "",
                        formErrors: {
                            startdate: "",
                            enddate: ""
                        },
                        startdateValid: false,
                        enddateValid: false
                    });

                    setTimeout(() => { this.SetpageLoad1() }, 1500);
                }
            }
        });
    };
    SetpageLoad1 = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1, modalShow: false });
    }
    datefunction = (moment, name) => {
        let date = String(moment._d);
        var res = date.substr(4, 20);
        this.setState({ startdate: res }, () => this.validateField("startdate", "1"));
    }
    datefunctionend = (moment, name) => {
        let date = String(moment._d);
        var res = date.substr(4, 20);
        this.setState({ enddate: res }, () => this.validateField("enddate", "1"));
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let startdateValid = this.state.startdateValid;
        let enddateValid = this.state.enddateValid;


        switch (fieldName) {
            case "startdate":
                if (value.length == "") {
                    startdateValid = false;
                    fieldValidationErrors.startdate = "Start Date Cannot Be Empty";
                } else {
                    startdateValid = true;
                    fieldValidationErrors.startdate = "";
                }

                break;

            case "enddate":
                if (value.length == "") {
                    enddateValid = false;
                    fieldValidationErrors.enddate = "End Date Cannot Be Empty";
                } else {
                    enddateValid = true;
                    fieldValidationErrors.enddate = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                startdateValid: startdateValid,
                enddateValid: enddateValid,


            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid: this.state.startdateValid && this.state.enddateValid
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }
    resultFunction() {
        let getData = this.props.getExams[0].student_results.filter((a) => a.attempted_exam == true);
        console.log("resultFunctionreturnDatalength", getData.length, this.props.getExams[0].student_results.length);
        let returnData = getData.length + "/" + this.props.getExams[0].student_results.length;
        console.log("resultFunctionreturnData", returnData);
        // if (!isNaN) {
        return returnData;
        //}
        // else {
        //    return "NA";
        //}

    }
    resultPercentageFunction() {
        let getData = this.props.getExams[0].student_results.filter((a) => a.attempted_exam == true);
        let returnData = (getData.length) / (this.props.getExams[0].student_results.length) * 100;
        let returnData1 = Math.round(returnData) + "%"
        console.log("resultPercentageFunctionreturnData", returnData);
        if (!isNaN) {
            return returnData1;
        }
        else {
            return "NA";
        }

    }
    editQuestionPaper() {
        console.log("editQuestionPaper", this.props);
        let examsData = this.props.globals.exams.find((a) => a.id == this.props.getExams[0].exam_type);
        let examsubjectData = examsData.exam_subjects;
        let subjects = [];
        for (let i = 0; i <= examsubjectData.length; i++) {
            let idata = examsubjectData[i];
            //console.log("idata", idata);
            if (idata != undefined) {
                let subjectData = this.props.globals.subjects.find((a) => a.id == idata.subject_id);
                // console.log("subjectData", subjectData);
                let chapters = subjectData.chapters.map((item) => {
                    const topic = item.topics.map((topicData) => {
                        return { ...topicData, checked: false }
                    })
                    return { ...item, topics: topic, chapteractive: "d-flex justify-content-between align-items-center", checked: false, checkedall: false, ownedarray: [] }
                })
                let newObject = {
                    id: subjectData.id,
                    subject: subjectData.subject,
                    chapters: chapters,
                    checked: false,
                    subjectactive: "d-flex justify-content-between align-items-center"
                }
                subjects.push(newObject);
            }

        }
        console.log("subjects", subjects);

        let subtype = "";
        if (this.props.getExams[0].sub_exam_type == "1") {
            subtype = { value: "1", label: "MAINS" }
        }
        else {
            subtype = { value: "1", label: "ADVANCE" }
        }

        let tcq = this.props.getExams[0].total_question_count;
        let totalExamCount3 = "";

        if (this.props.getExams[0].exam_type == "3" || this.props.getExams[0].exam_type == "6" || this.props.getExams[0].exam_type == "7" || this.props.getExams[0].exam_type == "8") {

            let eduration = this.props.globals.exams.find((a) => a.id == this.props.getExams[0].exam_type);
            console.log("eduration", eduration);

            if (eduration != undefined) {
                totalExamCount3 = parseFloat(eduration.avg_question_time) * parseFloat(tcq);
            }
        }

        this.props.history.push({
            pathname: "/questions/create-question-paper/own-question-paper/questionsPreview",
            state: {
                subjects: subjects,
                examtypema: this.props.getExams[0].sub_exam_type,
                examtypemavalue: subtype,
                class: this.props.getExams[0].class_id,
                classvalue: {
                    value: this.props.getExams[0].class_id,
                    label: this.props.getExams[0].class
                },
                examtype: this.props.getExams[0].exam_type,
                examtypevalue: {
                    value: this.props.getExams[0].exam_type,
                    label: this.props.getExams[0].exam_name
                },
                exam_paper_id: this.props.getExams[0].id,
                exam_questions: this.props.getExams[0].exam_questions,
                // breadCrumbsData: this.props.history.getExams
                type: "edit",
                branch: this.props.getExams[0].branch,
                section: this.props.getExams[0].section,
                tcq: tcq,
                totalExamCount3: totalExamCount3
            }
        });
    }


    render() {
        //console.log("this.props.getExams[0].filename", this.props.getExams[0].filename);
        return (
            <section className="question_paper_results mb-4">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Card as={Card.Body} className="border-0 shadow-sm manage_questionPaper_results">
                            <CardGroup className="mb-4">
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>Exam Type</Card.Text>
                                        <Card.Title>{this.props.getExams[0] != undefined ? this.props.getExams[0].exam_name : ""}</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>Class</Card.Text>
                                        <Card.Title>{this.props.getExams[0] != undefined ? this.props.getExams[0].class : ""}</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>Scheduled On</Card.Text>
                                        <Card.Title>{this.state.start_time}</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>End Time</Card.Text>
                                        <Card.Title>{this.state.end_time}</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>Results</Card.Text>
                                        {/* <Card.Title>50/60 <span className="text-primary">80%</span> </Card.Title> */}
                                        <Card.Title>{this.resultFunction()} <span className="text-primary">{this.resultPercentageFunction()}</span> </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card bg="light" text="dark">
                                    <Card.Body>
                                        <Card.Text>Status</Card.Text>
                                        <Card.Title>{this.props.location.state != undefined ? this.props.location.state.is_completed : ""}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                            <Row>
                                <Col xl={8} lg={12} md={12} sm={12} xs={12}>
                                    <Card as={Card.Body} className="p-3 shadow-sm mb-3">
                                        <div className="d-md-flex justify-content-between align-items-center mb-3">
                                            <h6>Percentage wise Result</h6>
                                            <div className="date-block d-flex align-items-center">
                                                {this.state.start_time}
                                                {/* <span className="mr-2">Scheduled Date: </span><DateTime dateFormat="DD-MM-YYYY" inputProps={{ Placeholder: '12-05-2019' }} timeFormat={false} /> */}
                                            </div>
                                        </div>
                                        <BarChart
                                            result_graph={this.state.result_graph} />
                                    </Card>
                                </Col>
                                <Col xl={4} lg={12} md={12} sm={12} xs={12}>
                                    <Card as={Card.Body} className="p-3 shadow-sm mb-3">
                                        <h6 className="mb-3">Reschedule Details</h6>
                                        <Card style={{ height: 200 }}>
                                            <Card.Header className="d-flex justify-content-between">
                                                <h6 className="title mb-0">Date</h6>
                                                <h6 className="title mb-0">Status</h6>
                                            </Card.Header>
                                            <Card.Body className="d-flex justify-content-between">
                                                <p>{this.state.start_time}</p>
                                                <p>{this.props.location.state != undefined ? this.props.location.state.is_completed : ""}</p>
                                            </Card.Body>
                                        </Card>
                                    </Card>
                                    <div className="text-center">
                                        {moment().unix() >= this.props.getExams[0].start_time ? ("") : (
                                            <React.Fragment>
                                                <Button className="btn btn-warning my-2 w-100" onClick={() => this.editQuestionPaper()}>Edit Question Paper</Button>
                                                <Button className="btn btn-primary my-2 w-100"  onClick={() => this.setState({ modalShow: true })}>Reschedule online question paper</Button>
                                            </React.Fragment>

                                        )}

                                        <Button className="btn btn-success my-2 w-100"  onClick={() => this.setState({ modalShowTwo: true })}>Preview &amp; Download question paper</Button>
                                        {/* <Button className="btn btn-info my-2" block >Paper Download with Key</Button> */}
                                        <a className="btn btn-info my-2 w-100"  href={`http://34.100.238.121:81/neetjee-dataadmin/pdf/generate_key.php?exam=${this.props.getExams[0].id}`} target="_self">Paper Download with Key</a>
                                        <a className="btn btn-secondary my-2 w-100"  href={`http://34.100.238.121:81/neetjee-dataadmin/pdf/generate_expkey.php?exam=${this.props.getExams[0].id}`} target="_self">Paper Download with Explanation &amp; Key</a>
                                        {/* <Button className="btn btn-secondary my-2" block >Paper Download with Explanation &amp; Key</Button> */}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <ManageQuestionModal
                    ParenthandleFormSubmit={this.handleFormSubmit}
                    datefunction={this.datefunction}
                    datefunctionend={this.datefunctionend}
                    stateData={this.state}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />
                <DownloadQuestionPaperModal
                    filename={this.props.getExams[0] != undefined ? this.props.getExams[0].filename : ""}
                    show={this.state.modalShowTwo}
                    onHide={() => this.setState({ modalShowTwo: false })}
                />
            </section>
        )
    }
}

export default withRouter(compose(
    graphql(EDIT_EXAM_SHEDULE, {
        name: "editexamshedule"
    }))(QuestionPaperResultSection));
