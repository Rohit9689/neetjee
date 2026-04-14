import React, { Component } from 'react'
import { Row, Col, Nav, Card, Image, Tab, Form, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import ResultAnalysisSection from '../../analysis/result_analysis/ResultAnalysisSection'
import PracticeExamAnalysisSection from '../../analysis/practice_exam_analysis/PracticeExamAnalysisSection'
import StrengthSection from '../../analysis/strength/StrengthSection'
import TimeAnalysisSection from '../../analysis/time_analysis/TimeAnalysisSection'
import ComplexityAnalysisSection from '../../analysis/complexity_analysis/ComplexityAnalysisSection'
import ErrorAnalysisSection from '../../analysis/error_analysis/ErrorAnalysisSection'
import QuestionTypeAnalysisSection from '../../analysis/question_type/QuestionTypeAnalysisSection'

import '../../../../react-datetime.css'
import './_studentprofile.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";

const GET_GLOBALS = gql`
 query($institution_id: Int!) {
          globals(institution_id: $institution_id) {
            globalBranches{
              id
              branch_name
            }
            globalSections{
              id
              section_name
            }
            classes{
              id
              class
            }
            
          }
        }
`;

export class StudentOrganizationProfileSection extends Component {
    constructor(props) {
        super(props)
        console.log("hislocationData", props.hislocationData);
        let index = "";
        let studentData = [];

        if (props.hislocationData != undefined) {
            let found = props.hislocationData.row.totalData.find(a => a.student_name === props.hislocationData.row.student_name);
            let idindex = props.hislocationData.row.totalData.indexOf(found);
            console.log("idindex", idindex);
            index = idindex;
            studentData = props.hislocationData.row.totalData;
        }
        this.state = {
            BreadcrumbData: {
                Title: 'Student Profile'
            },
            studentData: studentData,
            index: index,
            exam_type: "0,1",
            class_id: "1,2",
            exam_typevalue: { value: 2, label: 'ALL' },
            class_idvalue: { value: 0, label: 'ALL' },
            defaultActiveKey: "first",
        }
    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (name == "exam_type") {
            if (value == "0") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Practise' },
                    exam_type: value
                });
            }
            else if (value == "1") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Exam' },
                    exam_type: value
                });
            }
            else if (value == "2") {
                this.setState({
                    exam_typevalue: { value: value, label: 'ALL' },
                    exam_type: "0,1"
                });
            }

        }
        if (name == "class_id") {
            if (value == "0") {
                this.setState({
                    class_idvalue: { value: value, label: 'ALL' },
                    class_id: "1,2"
                });
            }
            else if (value == "1") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XI' },
                    class_id: value
                });
            }
            else if (value == "2") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XII' },
                    class_id: value
                });
            }
        }
    }
    defaultActiveKeyFun = (e) => {
        console.log("defaultActiveKeyFun");
        this.setState({
            defaultActiveKey: "first"
        });

    }

    tabwisedefaultActiveKeyFun = (type) => {
        console.log("tabwisedefaultActiveKeyFun", type);
        this.setState({
            defaultActiveKey: type
        });

    }
    eventKeyFunction = (type) => {
        console.log("eventKeyFunction");
        this.setState({ defaultActiveKey: type });
    }
    leftarrowFun = (e) => {
        this.setState({ index: this.state.index - 1 });
    }
    rightarrowFun = (e) => {
        this.setState({ index: this.state.index + 1 });
    }
    render() {
        const globals = this.props.globals;
        const loading1 = globals.loading;
        const error1 = globals.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("hislocationData", this.state);
        const data = this.state.studentData[this.state.index];
        const branchvalue = globals.globals.globalBranches.find((a) => a.id == data.branch_id);
        const classvalue = globals.globals.classes.find((a) => a.id == data.class_id);
        const sectionvalue = globals.globals.globalSections.find((a) => a.id == data.section_id);
        return (
            <div className="student-profile">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                </Row>
                <Tab.Container id="left-tabs-example" activeKey={this.state.defaultActiveKey}>
                    <Card className="profile-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="split-left">
                                    {this.state.index > 0 ? (
                                        <Button variant="link light"
                                            onClick={(e) => this.leftarrowFun()}>
                                            <i className="fad fa-chevron-circle-left" />
                                        </Button>
                                    ) : ("")}
                                    {(this.state.index + 1) < this.state.studentData.length ? (
                                        <Button variant="link light"
                                            onClick={(e) => this.rightarrowFun()}>

                                            <i className="fad fa-chevron-circle-right" />
                                        </Button>
                                    ) : ("")}
                                </div>
                                {/* <div className="split-right">
                                    <Form.Group className="d-flex align-items-center mb-0" controlId="StartDate" style={{ width: 180 }}>
                                        <Form.Label className="mb-0">Date: </Form.Label>
                                        <div className="dateTime ml-2">
                                            <i className="far fa-calendar-day" />
                                            <DateTime dateFormat="DD-MM-YYYY"
                                                timeFormat={false}
                                                inputProps={{ placeholder: 'Date Range' }} />
                                        </div>
                                    </Form.Group>
                                </div> */}
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                {data.profile_pic != "" ? (<Image src={`http://neetjeeguru.com/files/${data.profile_pic}`} width="100" roundedCircle thumbnail alt="profile-img" />) : (
                                    <Image src={require('../../../../images/businessman.png')} width="100" roundedCircle thumbnail alt="profile-img" />
                                )}

                                <div className="content ml-3">
                                    <p>Student</p>
                                    <h4>{data.student_name}</h4>
                                    {/* <p>IP, MPC, Class - XII</p> */}
                                    <p>Branch-{branchvalue.branch_name},
                                    Class-{classvalue.class},
                                    Section-{sectionvalue.section_name}</p>
                                </div>
                            </div>
                            <Nav variant="pills bg-white" className="flex-row">
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("first")}
                                        eventKey="first"
                                    >Overview</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("second")}
                                        eventKey="second"
                                    >Practise &amp; Exams Analysis</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("third")}
                                        eventKey="third"

                                    >Strength Analysis</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("four")}
                                        eventKey="four"
                                    >Time Analysis</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("five")}
                                        eventKey="five"
                                    >Complexity Analysis</Nav.Link>
                                </Nav.Item>
                                {/*<Nav.Item>
                                    <Nav.Link eventKey="six">Error Analysis</Nav.Link>
                                </Nav.Item>*/}
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={(e) => this.eventKeyFunction("seven")}
                                        eventKey="seven"
                                    >Question Type Analysis</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                    </Card>

                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ResultAnalysisSection
                                tabwisedefaultActiveKeyFun={this.tabwisedefaultActiveKeyFun}
                                mobile={data.contact_no}
                                seperationType="college"
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <PracticeExamAnalysisSection
                                mobile={data.contact_no}
                                seperationType="college"
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <StrengthSection
                                mobile={data.contact_no}
                                seperationType="college"
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="four">
                            <TimeAnalysisSection
                                mobile={data.contact_no}
                                seperationType="college"
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="five">
                            <ComplexityAnalysisSection
                                mobile={data.contact_no}
                                seperationType="college"
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange}
                            />
                        </Tab.Pane>
                        {/*<Tab.Pane eventKey="six">
                            <ErrorAnalysisSection />
                        </Tab.Pane>*/}
                        <Tab.Pane eventKey="seven">
                            <QuestionTypeAnalysisSection
                                mobile={data.contact_no}
                                seperationType="college"
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div >
        )
    }
}


export default withRouter(
    compose(
        graphql(
            GET_GLOBALS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "globals"
            }
        )
    )(StudentOrganizationProfileSection)
);
