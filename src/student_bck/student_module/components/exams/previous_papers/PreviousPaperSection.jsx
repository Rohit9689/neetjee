import React, { Component } from 'react'
import { components } from 'react-select'
import { Link } from "react-router-dom";
import { Row, Col, Card, Form, Image } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

const STUDENR_PREVIOUS_EXAM = gql`
  mutation(
    $params:StudentPreviousPaperExam  
    ) {
        studentPreviousPaperExam(
        params: $params
     )
  }
`;

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

// Questions
const ExamType = [
    { value: "3", label: 'ALL' },
    { value: "1", label: 'MAINS' },
    { value: "2", label: 'ADVANCE' }
];

class PreviousPaperSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            examtype: "3",
            examtypevalue: { value: 3, label: 'ALL' },
            submitError: "",
            userRestionModalShow: false
        }
    }
    customUserResctrict = (e, type, modaldata, getDta) => {
        if (type == "custom") {
            if (modaldata == false) {
                this.props.history.push({
                    pathname: "/student/exams/custom-previous-paper-exam",
                    state: { globals: this.props.studentGlobals }
                });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        }
        if (type == "single") {
            if (getDta.enabled == true) {
                if (modaldata == false) {
                    this.handleFormSubmit(e, getDta.year, getDta.id, getDta.pexamtype)
                }
                else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }

            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }

        }



    }
    handleFormSubmit = (e, year, id, pexamtype) => {
        console.log("handleFormSubmit", year, id, pexamtype);
        e.preventDefault();
        const params = {
            mobile: Cookies.get("mobile"),
            sub_type: year,
            exam_type: parseInt(pexamtype),
            source: 0,
            set_id: parseInt(id),
            selected_years: [],
            selected_classes: [],
            question_types: [],
            complexity: [],
            question_theory: [],

        };
        console.log("params", params);
        this.customfunction(
            params
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("updatedata", data);
                if (data.studentPreviousPaperExam) {
                    console.log("updatedatadataID", data.studentPreviousPaperExam)
                    // this.props.history.push({
                    //     pathname: "/student/subject/custom-instructions",
                    //     state: {
                    //         sessionid: data.studentPreviousPaperExam,
                    //         type: "Previous Paper Exam",
                    //         etype: "previous"
                    //     }
                    // }
                    // );




                    localStorage.setItem("sessionid", data.studentPreviousPaperExam);
                    localStorage.setItem("type", "Previous Paper Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "previous");

                    window.open("/student/subject/exam", "_blank")
                }
            }
        });
    };
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", this.props, evalue);
        const name = ename;
        const value = evalue;
        if (name == "examtype") {
            if (value != "3") {
                let labelval = "";
                if (value == "1") {
                    labelval = 'MAINS';
                }
                else if (value == "2") {
                    labelval = 'ADVANCE';
                }
                this.setState({
                    examtypevalue: {
                        value: value,
                        label: labelval
                    }
                });
            }
            else {
                this.setState({
                    classvalue: {
                        value: "3",
                        label: "ALL"
                    }
                });
            }
        }
        this.setState({ [name]: value });
    }
    render() {
        const examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        console.log("this.props.studentGlobals.previousSets", this.props.studentGlobals.previousSets);
        let previousSets = "";
        if (Cookies.get("examid") == "2") {
            if (this.state.examtype == "3") {
                previousSets = this.props.studentGlobals.previousSets.filter((a) => a.exam == Cookies.get("examid"));
            }
            else {
                previousSets = this.props.studentGlobals.previousSets.filter((a) => a.exam == Cookies.get("examid") && a.pexamtype == this.state.examtype);
            }

        }
        else {
            previousSets = this.props.studentGlobals.previousSets.filter((a) => a.exam == Cookies.get("examid"));
        }
        previousSets = previousSets.sort((a, b) => {
            let nameA = a.year
            let nameB = b.year
            console.log("sort", nameA, nameB);
            if (nameB < nameA) {
                return -1;
            }
            if (nameB > nameA) {
                return 1;
            } // names must be equal
            return 0;
        })
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);

        return (
            <div className="previous_paper pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Row>

                    <Col xl={9} lg={9} md={12} sm={12}>

                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="title mb-5">Previous Papers</h5>
                            <Link
                                to={{
                                    pathname: "/student/subject/exam-history",
                                    state: {
                                        examtype: "previous_exam"
                                    }
                                }}
                                className="btn btn-outline-primary">Exam History
                        </Link>
                        </div>


                        <Form.Text className="form-text text-danger">
                            {this.state.submitError}
                        </Form.Text>
                        <Row>
                            <Col xl={6} lg={6} md={6} sm={12} className="mb-4">
                                <a
                                    onClick={(e) => this.customUserResctrict(e, "custom", isuserValid.previous_custom)}
                                    // to={{
                                    //     pathname: "/student/exams/custom-previous-paper-exam",
                                    //     state: { globals: this.props.studentGlobals }
                                    // }}
                                    className="">
                                    <Card className="shadow-sm single-card border-0 h-100">
                                        <Card.Body className="p-3 single-card-body d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center text-left">
                                                <div className="examTypeImage">
                                                    <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                </div>
                                                <div className="ml-xl-5 ml-lg-4 ml-md-3 ml-sm-3 ml-3 text">
                                                    <Card.Title className="h6 mb-0">{examname.exam} Custom</Card.Title>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            {previousSets.map((getDta) => {
                                if (getDta.enabled == true) {
                                    return (
                                        <Col xl={6} lg={6} md={6} sm={12} className="mb-4">
                                            <Card style={{ cursor: "pointer" }}
                                                onClick={(e) => this.customUserResctrict(e, "single", isuserValid.previous_single, getDta)} className="shadow-sm single-card border-0 h-100">
                                                <Card.Body className="p-3 single-card-body d-flex justify-content-between align-items-center">
                                                    {getDta.attempted == true ? (<div className="icon-img position-absolute" style={{ top: 8, left: 62 }}>
                                                        <i className="far fa-check-circle text-success" style={{ fontSize: 18 }}></i>
                                                    </div>) : (
                                                            ""
                                                        )}

                                                    <div className="d-flex align-items-center text-left">
                                                        <div className="examTypeImage">
                                                            <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                        </div>
                                                        <div className="ml-xl-5 ml-lg-4 ml-md-3 ml-sm-3 ml-3 text">
                                                            <Card.Title className="h6 mb-0">{getDta.qset + "-" + getDta.year}</Card.Title>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Image className="my-1" src={require('../../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            {/* </Link> */}
                                        </Col>)
                                }
                                else {
                                    return (<Col xl={6} lg={6} md={6} sm={12} className="mb-4">
                                        <Card style={{ cursor: "pointer", opacity: "0.3" }}
                                            onClick={(e) => this.customUserResctrict(e, "single", isuserValid.previous_single, getDta)}
                                            className="shadow-sm single-card border-0 h-100"
                                        >
                                            <Card.Body className="p-3 single-card-body d-flex justify-content-between align-items-center">
                                                <div className="icon-img position-absolute" style={{ top: 10, right: 10 }}>
                                                    <Image src={require('../../../../images/locked.png')} width="15" alt="locked image" />
                                                </div>
                                                {getDta.attempted == true ? (
                                                    <div className="icon-img position-absolute" style={{ top: 8, left: 62 }}>
                                                        <i className="far fa-check-circle text-success" style={{ fontSize: 18 }}></i>
                                                    </div>
                                                ) : ("")}

                                                <div className="d-flex align-items-center text-left">
                                                    <div className="examTypeImage">
                                                        <Image src={require('../../../../images/Neet-Exam.png')} width="60" height="65" alt="logo" roundedCircle />
                                                    </div>
                                                    <div className="ml-xl-5 ml-lg-4 ml-md-3 ml-sm-3 ml-3 text">
                                                        <Card.Title className="h6 mb-0">{getDta.qset + "-" + getDta.year}</Card.Title>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Image className="my-1" src={require('../../../../images/college-stamp.png')} width="30" height="30" alt="logo" roundedCircle />
                                                </div>
                                            </Card.Body>
                                        </Card>

                                    </Col>)
                                }
                            })}
                        </Row>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Body>
                                <div className="sectionOne">
                                    <p>Exam</p>
                                    <h6>{Cookies.get("examid") == 1 ? ("NEET") : Cookies.get("examid") == 2 ? ("JEE") : ("")} Custom</h6>
                                </div>
                                {Cookies.get("examid") == 2 ? (
                                    <Form className="sectionTwo" style={{ height: "100vh" }}>
                                        <Form.Group controlId="SelectClass">
                                            <Form.Label>Exam Type</Form.Label>
                                            <SelectDropDown
                                                stateData={this.state.examtypevalue}
                                                name="examtype"
                                                handleChange={this.selecthandleInputChange}
                                                options={ExamType}
                                                placeholderName={'Exam Type'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Form>
                                ) : ("")}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </div>
        )
    }
}

export default withRouter(compose(graphql(STUDENR_PREVIOUS_EXAM, {
    name: "customfunction"
})
)(PreviousPaperSection));
