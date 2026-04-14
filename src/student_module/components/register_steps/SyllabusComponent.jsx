import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Card, Form, Nav, Button } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";


// target Year
export const targetYear = [
    { value: "2021", label: '2021' },
    { value: "2022", label: '2022' }
 ];



const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};


class SyllabusComponent extends Component {

    classfun = () => {
        let empty = [];
        for (let i = 0; i < this.props.studentGlobals.studentGlobals.classes.length; i++) {
            let somedata = this.props.studentGlobals.studentGlobals.classes[i];
            empty.push({ value: somedata.id, label: somedata.class });
        }
        return empty;
    }
    examsfun = () => {
        let empty = [];
        for (let i = 0; i < this.props.studentGlobals.studentGlobals.exams.length; i++) {
            let somedata = this.props.studentGlobals.studentGlobals.exams[i];
            if (somedata.id !== "5") {
                empty.push({ value: somedata.id, label: somedata.exam });
            }

        }
        return empty;
    }
    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }
        const studentGlobals = this.props.studentGlobals;
        const loading1 = studentGlobals.loading;
        const error1 = studentGlobals.error;

        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("stateData", this.props.stateData);

        // let studentGlobals1 = "";
        // if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
        //     studentGlobals1 = JSON.parse(localStorage.getItem("studentglobals"));
        // }
        // else {
        //     this.props.history.push("/student/login");
        // }
        // console.log("studentGlobals1",studentGlobals1);
        return (
            <React.Fragment>
                <Card as={Card.Body} className="stepFormThree border-0 px-4">
                    <div className="title border-bottom pb-3 mb-5">
                        <Form.Text className="form-text text-danger" style={{ 'font-size': '15px' }}>
                            {this.props.stateData.stepstatus3 == "1" ? (
                                "Syllabus details have been submitted successfully"
                            ) : (this.props.stateData.submitError3)}

                        </Form.Text>
                        <h5>Select Syllabus</h5>
                        {/* <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                    </div>
                    <Form>
                        <Form.Group as={Row} controlId="formClass">
                            <Form.Label column sm="5" className="text-muted">Select Class</Form.Label>
                            <Col sm="7" className="d-flex align-items-center">
                                <div className="w-100">
                                    <SelectDropDown
                                        name="class"
                                        options={this.classfun()}
                                        placeholderName={'Class'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        stateData={this.props.stateData.selectDataClass}
                                        handleChange={this.props.handleSelectChange}
                                    />
                                </div>
                                {this.props.stateData.classValid == true ? (
                                    <i className="active ml-2 fas fa-check-circle" />
                                ) : (
                                        <i className="ml-2 fas fa-check-circle" />
                                    )}

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formExams">
                            <Form.Label column sm="5" className="text-muted">Select Exams</Form.Label>
                            <Col sm="7" className="d-flex align-items-center">
                                <div className="w-100">
                                    <SelectDropDown
                                        name="exam"
                                        options={this.examsfun()}
                                        placeholderName={'Exam'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        stateData={this.props.stateData.selectDataexam}
                                        handleChange={this.props.handleSelectChange}
                                    />
                                </div>
                                {this.props.stateData.examValid == true ? (
                                    <i className="active ml-2 fas fa-check-circle" />
                                ) : (
                                        <i className="ml-2 fas fa-check-circle" />
                                    )}

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formExams">
                            <Form.Label column sm="5" className="text-muted">Target Year</Form.Label>
                            <Col sm="7" className="d-flex align-items-center">
                                <div className="w-100">
                                    <SelectDropDown
                                        options={targetYear}
                                        name="targetyear"
                                        placeholderName={'Target Year'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        handleChange={this.props.handleSelectChange} />
                                </div>
                                {this.props.stateData.targetyearValid == true ? (
                                    <i className="active ml-2 fas fa-check-circle" />
                                ) : (
                                        <i className="ml-2 fas fa-check-circle" />
                                    )}

                            </Col>
                        </Form.Group>
                        {this.props.stateData.selectSyllabusStatus == "0" ? (
                            <Form.Group as={Row} controlId="formRePassword">
                                <Col sm="7" className="d-flex align-items-center">
                                    <Button variant="primary px-3" onClick={this.props.syllabusDetailshandleFormSubmit}>
                                        <div className="d-flex align-items-center">
                                            <span>Submit</span>
                                        </div>
                                    </Button>
                                </Col>
                            </Form.Group>
                        ) : ("")}
                    </Form>
                </Card>


            </React.Fragment>

        )
    }
}

export default withRouter(
    graphql(gql` 
        query($mobile: String) {
            studentGlobals(mobile: $mobile){
            exams{
                id
                exam
            }
           classes{
                id
                class
            }
        }
        }
        `,
        {
            options: props => ({
                variables: {
                    mobile: "9999999999"
                },
                fetchPolicy: 'cache-and-network'
            }), name: "studentGlobals"
        })(SyllabusComponent)
);
