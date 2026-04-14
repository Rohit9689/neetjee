import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Form, Table, InputGroup, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'
import '../../../../react-datetime.css'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown'

import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentCustomExam  
    ) {
        studentCustomExam(
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

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};


class SemiGrandExamSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mainexam: "1",
            mainexamvalue: { value: "1", label: "NEET" },
            class: 0,
            preparationType: 0,
            formValid: false,
            submitError: "",
            choiceforexam: 2,
            examname: "",
            sdate: "",
            examtype: 1,
            formErrors: {
                examname: "",
                sdate: "",
                class: ""
            },
            classValid: false,
            examnameValid: false,
            sdateValid: false
        }
    }
    handleFormSubmit = e => {
        console.log("handleFormSubmit");
        e.preventDefault();
        if (this.state.formValid) {
            let examname = "";
            let examdate = "";
            // let saveexamtype = "";
            if (this.state.choiceforexam == "2") {
                examname = this.state.examname;
                examdate = this.state.sdate;
                //saveexamtype = this.state.saveexamtype;
            }
            else {
                examname = "";
                examdate = "";
                //saveexamtype = 0;
            }
            let examtype = "";
            if (Cookies.get("examid") != "5") {
                if (Cookies.get("examid") == "2") {
                    examtype = this.state.examtype;
                }
                else {
                    examtype = "0";
                }
            }
            else {
                if (this.state.mainexam == "2") {
                    examtype = this.state.examtype;
                }
                else {
                    examtype = "0";
                }

            }
            const params = {
                mobile: Cookies.get("mobile"),
                sub_type: "semi-grand",
                class_id: parseInt(this.state.class),
                syllabus: [],
                advance_options: 0,
                question_types: [],
                complexity: [],
                question_theory: [],
                syllabus_web: [],
                question_types_subjectwise: [],
                complexity_subjectwise: [],
                question_theory_subjectwise: [],
                source: 0,
                exam_type: parseInt(examtype),
                exam_name: examname,
                exam_date: examdate,
                save_exam_type: parseInt(this.state.choiceforexam)
            };
            console.log("semiparams", params);
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
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                //console.log("updatedata", data);
                if (data.studentCustomExam) {
                    this.setState({
                        class: 0,
                        preparationType: 0,
                        formValid: false,
                        submitError: "",
                        //choiceforexam: 1,
                        examname: "",
                        sdate: "",
                        examtype: 0,
                        formErrors: {
                            examname: "",
                            sdate: "",
                            class: ""
                        },
                        classValid: false,
                        examnameValid: false,
                        sdateValid: false

                    });
                    if (this.state.choiceforexam == "2") {
                        this.props.history.push({
                            pathname: "/student/get-ready-for-exam"
                        }
                        );
                    }
                    else {
                        // this.props.history.push({
                        //     pathname: "/student/subject/custom-instructions",
                        //     state: {
                        //         sessionid: data.studentCustomExam,
                        //         type: "Custom Exam",
                        //         etype: "customsemi"
                        //     }
                        // }
                        // );
                        this.props.history.push({
                            pathname: "/student/get-ready-for-exam"
                        }
                        );
                        localStorage.setItem("sessionid", data.studentCustomExam);
                        localStorage.setItem("type", "Custom Exam");
                        localStorage.setItem("stype", "");
                        localStorage.setItem("exam_paper_id", "0");
                        localStorage.setItem("etype", "customsemi");

                        window.open("/student/subject/exam", "_blank")
                    }
                }
            }
        });
    };
    classGetDataFunction(data) {
        let sarray = [];

        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            const obj = {
                value: idata.id,
                label: idata.class,
            }
            sarray.push(obj);
        }
        //sarray.unshift(obj1);
        return sarray;
    }
    handleSelectInputChange = (name, value) => {
        console.log("handleSelectInputChange", name, value);
        if (name == "class") {
            if (value == "0") {
                this.setState(
                    {
                        classvalue: {
                            label: "ALL", value: "0"
                        }
                    });
            }
            else {
                let filterData = this.props.studentGlobals.classes.find((a) => a.id == value);
                this.setState({
                    classvalue:
                        { label: filterData.class, value: filterData.id }
                });
            }


        }
        if (name == "mainexam") {
            let examData = this.props.studentGlobals.exams.find((a) => a.id == value);

            this.setState({
                mainexamvalue: {
                    value: value,
                    label: examData.exam

                }
            });
        }
        const ename = name;
        const evalue = value;
        this.setState({ [ename]: evalue }, () => {
            this.validateField(name, value);
        }

        );
    }
    // handleSelectInputChange = (name, value) => {
    //     if (name = "class") {
    //         if (value == "0") {
    //             this.setState({
    //                 label: "ALL", value: "0"
    //             });
    //         } else {
    //             let filterData = this.props.studentGlobals.classes.find((a) => a.id == value);
    //             this.setState({
    //                 label: filterData.class, value: filterData.id
    //             });
    //         }


    //     }
    //     this.setState({
    //         class: value
    //     }, () => {
    //         this.validateField(name, value);
    //     });
    // }
    datefunction = (moment) => {
        let date = String(moment._d);
        var res = date.substr(4, 20);
        this.setState({ sdate: res }, () => {
            this.validateField("sdate", "1");
        });
    }
    handleInputChange = e => {
        console.log("handleInputChange", e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let classValid = this.state.classValid;
        let examnameValid = this.state.examnameValid;
        let sdateValid = this.state.sdateValid;
        switch (fieldName) {
            case "examname":
                if (value.length == "") {
                    examnameValid = false;
                    fieldValidationErrors.examname = "Please Enter Exam name";
                } else {
                    examnameValid = true;
                    fieldValidationErrors.examname = "";
                }

                break;

            case "sdate":
                if (value.length == "") {
                    sdateValid = false;
                    fieldValidationErrors.sdate = "Please Select Date";
                } else {
                    sdateValid = true;
                    fieldValidationErrors.sdate = "";
                }

                break;

            case "class":
                if (value.length == "") {
                    classValid = false;
                    fieldValidationErrors.class = "Please Select Class";
                } else {
                    classValid = true;
                    fieldValidationErrors.class = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                classValid: classValid,
                examnameValid: examnameValid,
                sdateValid: sdateValid
            },
            this.validateForm
        );
    }
    validateForm() {
        if (this.state.choiceforexam == 2) {
            this.setState({
                formValid: this.state.examnameValid && this.state.sdateValid && this.state.classValid
            });
        }
        else {
            this.setState({
                formValid: this.state.classValid
            });
        }
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }
    getmainexampe() {
        let getArray = [];
        for (let i = 0; i <= this.props.studentGlobals.exams.length; i++) {
            let idata = this.props.studentGlobals.exams[i];
            if (idata != undefined) {

                const newObj = {
                    value: idata.id,
                    label: idata.exam
                }
                getArray.push(newObj);



            }

        }
        return getArray;
    }
    render() {
        console.log("currentState", this.state);
        const classname = this.props.studentGlobals.classes.find((a) => a.id == this.state.class);
        let examname = ""
        if (Cookies.get("examid") != "5") {
            examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        }
        else {
            examname = this.props.studentGlobals.exams.find((a) => a.id == this.state.mainexam);
        }
        var yesterday = DateTime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };
        return (
            <section className="get_ready_for_exam_types px-xl-4 px-lg-4">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <h5 className="mb-4 title">Semi Grand Exam</h5>

                        <div className="mt-4 get_ready_for_exam_syllabus">
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white border-0">
                                    <h6 className="mb-0 text-uppercase">Learn Setup</h6>
                                    <Form.Text className="form-text text-danger">
                                        {this.state.submitError}
                                    </Form.Text>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} xl={6} lg={6} md={6} sm={12}>
                                                <Form.Label>Class</Form.Label>
                                                <SelectDropDown
                                                    handleChange={this.handleSelectInputChange}
                                                    name="class"
                                                    options={this.classGetDataFunction(this.props.studentGlobals.classes)}
                                                    placeholderName={'class'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                                <Form.Text className="form-text text-danger">
                                                    {this.state.formErrors.classValid}
                                                </Form.Text>
                                            </Form.Group>
                                            {Cookies.get("examid") == "5" ? (

                                                <Form.Group as={Col} xl={6} lg={6} md={6} sm={12}>
                                                    <Form.Label>Exam</Form.Label>
                                                    <SelectDropDown
                                                        stateData={this.state.mainexamvalue}
                                                        handleChange={this.handleSelectInputChange}
                                                        name="mainexam"
                                                        options={this.getmainexampe()}
                                                        placeholderName={'Exam'}
                                                        dropdownIndicator={{ DropdownIndicator }}
                                                    />
                                                </Form.Group>

                                            ) : ("")}

                                        </Row>
                                        {Cookies.get("examid") == "2" || this.state.mainexam == "2" ? (
                                            <Row className="mb-2">
                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                    <Form.Label>Type</Form.Label>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={12}>
                                                    <Card className="p-2 flex-row justify-content-between align-items-center mb-3">
                                                        <Form.Label className="mb-0">Mains</Form.Label>
                                                        <Form.Check
                                                            defaultChecked={true}
                                                            type="radio"
                                                            id="radio_One"
                                                            custom label=""
                                                            name="examtype"
                                                            onChange={this.handleInputChange}
                                                            value="1"
                                                        />
                                                    </Card>
                                                </Col>
                                                <Col xl={6} lg={6} md={6} sm={12}>

                                                    <Card className="p-2 flex-row justify-content-between align-items-center" >
                                                        <Form.Label className="mb-0">Advance</Form.Label>
                                                        <Form.Check
                                                            type="radio"
                                                            id="radio_Two"
                                                            custom label=""
                                                            name="examtype"
                                                            onChange={this.handleInputChange}
                                                            value="2" />
                                                    </Card>
                                                </Col>
                                            </Row>) : ("")}
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="custom_setup mt-4">
                            <Form>
                                <Card as={Card.Body} className="border-0 shadow-sm">
                                    <h6 className="mb-3 text-uppercase">Schedule Exam</h6>

                                    {/* <div className="d-md-flex align-items-center justify-content-between mb-2 px-2">
                                        <Form.Group>
                                            <Form.Check type="radio" id="radioOne" custom inline>
                                                <Form.Check.Input
                                                    value="2"
                                                    name="choiceforexam"
                                                    type="radio"
                                                    onChange={this.handleInputChange}
                                                    defaultChecked={true}
                                                />
                                                <Form.Check.Label htmlFor="radioOne">Save For later</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="radio" id="radioTwo" custom inline>
                                                <Form.Check.Input
                                                    value="0"
                                                    name="choiceforexam"
                                                    type="radio"
                                                    onChange={this.handleInputChange}
                                                />
                                                <Form.Check.Label htmlFor="radioTwo">Start Exam</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>

                                    </div> */}
                                    {this.state.choiceforexam == 2 ? (
                                        <React.Fragment>
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="InputExamName">
                                                            <Form.Label className="text-uppercase">Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Exam Name"
                                                                name="examname"
                                                                value={this.state.examname}
                                                                onChange={this.handleInputChange}
                                                                autoComplete="off"
                                                            />
                                                            <Form.Text className="form-text text-danger">
                                                                {this.state.formErrors.examname}
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="SelectExamDate" className="selectExamDate">
                                                            <Form.Label className="text-uppercase">Date & Time</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-calendar-day" /></InputGroup.Text>
                                                                <div className="up-datedirection w-100">
                                                                    <DateTime
                                                                        dateFormat="DD-MM-YYYY"
                                                                        inputProps={{ placeholder: '29-05-2020' }}
                                                                        name="sdate"
                                                                        onChange={this.datefunction}
                                                                        isValidDate={valid}
                                                                    />
                                                                </div>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Row>
                                                </Card.Body>
                                                {/* <Card.Footer className="bg-white">
                                                    <Row>
                                                        <Form.Group className="mb-0" as={Col} xl={6} lg={6} md={6} sm={12}>
                                                            <Form.Check type="radio" id="sradioOne" custom>
                                                                <Form.Check.Input
                                                                    name="saveexamtype"
                                                                    type="radio"
                                                                    value="1"
                                                                    onChange={this.handleInputChange}
                                                                    defaultChecked={true}
                                                                />
                                                                <Form.Check.Label htmlFor="sradioOne">Preparation For External Exam</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                        <Form.Group className="mb-0" as={Col} xl={6} lg={6} md={6} sm={12}>
                                                            <Form.Check type="radio" id="sradioTwo" custom >
                                                                <Form.Check.Input
                                                                    name="saveexamtype"
                                                                    type="radio"
                                                                    value="2"
                                                                    onChange={this.handleInputChange} />
                                                                <Form.Check.Label htmlFor="sradioTwo">Exam in the system</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                    </Row>
                                                </Card.Footer> */}
                                            </Card>
                                        </React.Fragment>
                                    ) : ("")}

                                </Card>
                            </Form>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0 p-2 bg-white">
                                <Card as={Card.Body} className="border-0 p-2 bg-light">
                                    <Table className="table-borderless">
                                        <tbody>
                                            <tr>
                                                <th>Class </th>
                                                <th>: {this.state.class != 0 ? (classname != undefined ? (classname.class) : ("")) : ("ALL")}</th>
                                            </tr>
                                            <tr>
                                                <th>Exam </th>
                                                <th>: {examname.exam} </th>
                                            </tr>
                                            {/* <tr>
                                                <th> Duration </th>
                                                <th>: 180min </th>
                                            </tr>
                                            <tr>
                                                <th>No Of Questions </th>
                                                <th>: 180</th>
                                            </tr> */}
                                            {Cookies.get("examid") == "1" ? (
                                                <React.Fragment>
                                                    <tr>
                                                        <th> Duration </th>
                                                        <th>: 180min </th>
                                                    </tr>
                                                    <tr>
                                                        <th>No Of Questions </th>
                                                        <th>: 180</th>
                                                    </tr>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    {this.state.examtype == "1" ? (
                                                        <React.Fragment>
                                                            <tr>
                                                                <th> Duration </th>
                                                                <th>: 180min </th>
                                                            </tr>
                                                            <tr>
                                                                <th>No Of Questions </th>
                                                                <th>: 75</th>
                                                            </tr>
                                                        </React.Fragment>) : (
                                                        <React.Fragment>
                                                            <tr>
                                                                <th> Duration </th>
                                                                <th>: 300min </th>
                                                            </tr>
                                                            <tr>
                                                                <th>No Of Questions </th>
                                                                <th>: 75</th>
                                                            </tr>
                                                        </React.Fragment>)}

                                                </React.Fragment>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Scrollbars style={{ height: "50vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>

                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0 bg-white text-center">
                                {/* <Link className="px-5 btn btn-success text-uppercase text-white" to="#">Prepare</Link> */}
                                {this.state.choiceforexam == 2 ? (
                                    <Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-white text-uppercase">Save &amp; Continue</Button>) : (
                                    <Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-white text-uppercase">Start Exam</Button>)}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </section>
        )
    }
}


export default withRouter(compose(graphql(COUSTOM_EXAM, {
    name: "customfunction"
})
)(SemiGrandExamSection));
