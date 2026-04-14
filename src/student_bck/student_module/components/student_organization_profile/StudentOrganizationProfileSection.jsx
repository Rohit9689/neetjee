import React, { Component } from 'react'
import { Row, Col, Nav, Card, Image, Tab, Form, Button, Container } from 'react-bootstrap'
import DateTime from 'react-datetime'
import BreadcrumbHeading from '../../../neetjee_guru/components/breadcrumbs/BreadcrumbHeading'
import ResultAnalysisSection from '../singleanalysis/result_analysis/ResultAnalysisSection'
import PracticeExamAnalysisSection from '../singleanalysis/practice_exam_analysis/PracticeExamAnalysisSection'
import StrengthSection from '../singleanalysis/strength/StrengthSection'
import TimeAnalysisSection from '../singleanalysis/time_analysis/TimeAnalysisSection'
import ComplexityAnalysisSection from '../singleanalysis/complexity_analysis/ComplexityAnalysisSection'
import ErrorAnalysisSection from '../singleanalysis/error_analysis/ErrorAnalysisSection'
import QuestionTypeAnalysisSection from '../singleanalysis/question_type/QuestionTypeAnalysisSection'
import '../../../react-datetime.css'
import './_studentprofile.scss';
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../preloader/PreloaderTwo'
import StudentOrganizationNavbar from './StudentOrganizationNavbar'
import Footer from '../login_register/Footer';
import SingleStudentExamHistorySection from "./SingleStudentExamHistorySection";
import SingleStudentPractiseHistorySection from "./SingleStudentPractiseHistorySection";
import SingleStudentContentHistorySection from "./SingleStudentContentHistorySection";

const FETCH_USER_PROFILE = gql` 
query($mobile: String) {
    getStudentProfile(mobile: $mobile){
        name
        class_id
        college_name
        institute_name
        profile_pic
        exam_id
        branch_name
        section_name
        subjects{
            id
            subject
            studentChapters{
                id
                chapter
                topics{
                    id
                    topic
                }
            }
        }
        studentGlobals{
            classes{
                id
                class
            }
            exams{
                id
                exam
            }
            contentTypes{
                id
                customcontent
            }
        }
        
     }
}

`;

const FETCH_VIEWS = gql` 
query($mobile: String!) {
    getStudentAnalysisCards(mobile: $mobile){
        name
        value
     }
}

`;
class StudentOrganizationProfileSection extends Component {
    constructor(props) {
        super(props)
        let index = "";
        this.state = {
            BreadcrumbData: {
                Title: 'Student Profile'
            },
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
        const getStudentProfile = this.props.getStudentProfile;
        const loading1 = getStudentProfile.loading;
        const error1 = getStudentProfile.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        const getStudentAnalysisCards = this.props.getStudentAnalysisCards;
        const loading2 = getStudentAnalysisCards.loading;
        const error2 = getStudentAnalysisCards.error;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

        //console.log("getStudentAnalysisCards", getStudentAnalysisCards.getStudentAnalysisCards)

        if (loading1 == true || loading2 == true) {
            return (<PreloaderTwo />)
        }
        else {
            let className = "";
            if (getStudentProfile.getStudentProfile != undefined) {

                if (getStudentProfile.getStudentProfile.class_id == 0) {
                    className = "XI,XII"
                }
                else {
                    className = getStudentProfile.getStudentProfile.studentGlobals.classes.find((a) => a.id == getStudentProfile.getStudentProfile.class_id).class;
                }
            }


            return (
                <React.Fragment>
                    <StudentOrganizationNavbar getStudentProfile={getStudentProfile.getStudentProfile} />
                    <Container fluid>
                        <div className="student-profile">
                            <Tab.Container id="left-tabs-example" activeKey={this.state.defaultActiveKey}>
                                <Card className="profile-card">
                                    <Card.Body>
                                        <Row className="mb-4" noGutters>
                                            <Col xl={3} lg={4} md={12} sm={12}>
                                                <div className="d-flex align-items-center">
                                                    {getStudentProfile.getStudentProfile.profile_pic != "" ? (<Image src={`https://admin.rizee.in/files/${getStudentProfile.getStudentProfile.profile_pic}`} width="100" roundedCircle thumbnail alt="profile-img" />) : (
                                                        <Image src={require('../../../images/businessman.png')} width="100" roundedCircle thumbnail alt="profile-img" />
                                                    )}

                                                    <div className="content ml-2 mr-2">
                                                        <p>Student</p>
                                                        <h5>{getStudentProfile.getStudentProfile.name}</h5>
                                                        <p>
                                                            {getStudentProfile.getStudentProfile.college_name != "" ? ("College-" + getStudentProfile.getStudentProfile.college_name + ",") : ("")}
                                                            <br />Class-{className}
                                                            <br />{getStudentProfile.getStudentProfile.branch_name != "" ? (',Branch-' + getStudentProfile.getStudentProfile.branch_name) : ("")}
                                                            <br />{getStudentProfile.getStudentProfile.section_name != "" ? (",Section-" + getStudentProfile.getStudentProfile.section_name) : ("")}

                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={9} lg={9} md={12} sm={12}>
                                                <Row noGutters>
                                                    {getStudentAnalysisCards.getStudentAnalysisCards.map((map) => {
                                                        return (

                                                            <Col>
                                                                <Card as={Card.Body}
                                                                    className="border-0 shadow-sm mr-1 pl-3 mb-3"
                                                                    style={{ backgroundColor: "#212b65" }}>
                                                                    <p className="location_name mb-2 text-white">{map.name}</p>
                                                                    <h4 className="counts font-weight-bold text-white">
                                                                        {map.value != null ? (map.value) : ("0")}
                                                                    </h4>
                                                                </Card>
                                                            </Col>

                                                        )
                                                    })}
                                                </Row>
                                            </Col>
                                        </Row>
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
                                            <Nav.Item>
                                                <Nav.Link
                                                    onClick={(e) => this.eventKeyFunction("eight")}
                                                    eventKey="eight"
                                                >Exams</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    onClick={(e) => this.eventKeyFunction("nine")}
                                                    eventKey="nine"
                                                >Practise</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link
                                                    onClick={(e) => this.eventKeyFunction("ten")}
                                                    eventKey="ten"
                                                >Content History</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Body>
                                </Card>

                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <ResultAnalysisSection
                                            tabwisedefaultActiveKeyFun={this.tabwisedefaultActiveKeyFun}
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <PracticeExamAnalysisSection
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <StrengthSection
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="four">
                                        <TimeAnalysisSection
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="five">
                                        <ComplexityAnalysisSection
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
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
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="eight">
                                        <SingleStudentExamHistorySection
                                            subjects={getStudentProfile.getStudentProfile.subjects}
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="nine">
                                        <SingleStudentPractiseHistorySection
                                            subjects={getStudentProfile.getStudentProfile.subjects}
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="ten">
                                        <SingleStudentContentHistorySection
                                            subjects={getStudentProfile.getStudentProfile.subjects}
                                            studentGlobals={getStudentProfile.getStudentProfile.studentGlobals}
                                            mobile={this.props.hislocationData.mobile.split(":")[1]}
                                            seperationType="college"
                                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                                            stateData={this.state}
                                            selecthandleInputChange={this.selecthandleInputChange} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div >
                    </Container>
                    <div className="mt-4">


                        <Footer />
                    </div>
                </React.Fragment>

            )
        }
    }
}

export default withRouter(compose(
    graphql(FETCH_USER_PROFILE,
        {
            options: props => ({
                variables: {
                    mobile: props.hislocationData.mobile.split(":")[1]
                },
            }), name: "getStudentProfile"
        }),
    graphql(FETCH_VIEWS,
        {
            options: props => ({
                variables: {
                    mobile: props.hislocationData.mobile.split(":")[1]
                },
            }), name: "getStudentAnalysisCards"
        })
)
    (StudentOrganizationProfileSection));