import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Card, Form } from 'react-bootstrap'
import SelectDropDown from '../../selectdropdown/SelectDropDown';

// Exams
export const Exams = [
    { value: 1, label: 'NEET' },
    { value: 2, label: 'JEE' }
];

// Classes
export const Classes = [
    { value: 1, label: 'XI' },
    { value: 2, label: 'XII' }
];

// Category
export const Category = [
    { value: 1, label: 'A' },
    { value: 2, label: 'B' },
    { value: 3, label: 'C' },
    { value: 4, label: 'D' }
];

// Subjects
export const Subjects = [
    { value: 1, label: 'Maths' },
    { value: 2, label: 'Physics' },
    { value: 3, label: 'Biology' },
    { value: 4, label: 'Chemistry' },
    { value: 5, label: 'All' }
];

// No of Questions
export const NoofQuestions = [
    { value: 1, label: '180=60*3' },
    { value: 2, label: '120=40*3' },
    { value: 3, label: '90=30*3' },
    { value: 4, label: '60=20*3' }
];

// Exam Duration
export const ExamDuration = [
    { value: 1, label: '180 Min' },
    { value: 2, label: '120 Min' },
    { value: 3, label: '90 Min' },
    { value: 4, label: '60 Min' }
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


class StepOne extends Component {
    examfun = (data) => {
        let empty = [];
        for (let i = 0; i < data.length; i++) {
            let somedata = data[i];
            empty.push({ value: somedata.id, label: somedata.exam });
        }
        return empty;
    }

    getClasses(vals) {
        const classes = Array();
        for (let i = 0; i < vals.length; i++) {
            classes.push({
                label: vals[i].class,
                value: vals[i].id,
                id: vals[i].class
            });
        }

        return classes;
    }

    getSectionsCategory(vals) {
        const sections = Array();

        for (let i = 0; i < vals.length; i++) {
            if (this.props.stateData.class > 0) {
                if (parseInt(this.props.stateData.class) == vals[i].class_ids) {
                    sections.push({
                        label: vals[i].section_category,
                        value: vals[i].id,
                        id: vals[i].section_category
                    });
                }
            } else {
                sections.push({
                    label: vals[i].section_category,
                    value: vals[i].id,
                    id: vals[i].section_category
                });
            }
        }

        console.log("sections", this.props.stateData.class, sections);

        return sections;
    }
    render() {
        console.log("thi.props", this.props.stateData);
        if (this.props.currentStep !== 1) {
            return null;
        }
        return (
            <Row className="stepOne mt-5">
                <Col xl={12} lg={12} md={12} sm={12}>
                    <h6 className="mb-3 title text-uppercase">Custom exam - Setup</h6>
                    <Card as={Card.Body} className="border-0 shadow-sm">
                        <Form>
                            <Row>
                                <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        onChange={this.props.parenthandleInputChange}
                                        autoComplete="off"
                                        value={this.props.stateData.name}
                                    />
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.formErrors.name}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formExam">
                                    <Form.Label>Exam</Form.Label>
                                    <SelectDropDown
                                        name="exam"
                                        options={this.examfun(this.props.globals.exams)}
                                        placeholderName={'Exams'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        handleChange={this.props.parenthandleSelectChange}
                                        stateData={this.props.stateData.examname}
                                    />
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.formErrors.exam}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formClass">
                                    <Form.Label>Class</Form.Label>
                                    <SelectDropDown
                                        options={this.getClasses(this.props.globals.classes)}
                                        name="class"
                                        placeholderName={"Classes"}
                                        handleChange={this.props.parenthandleSelectChange}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        stateData={this.props.stateData.selectDataClass}
                                    />
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.formErrors.class}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formCategory">
                                    <Form.Label>Section Category</Form.Label>
                                    <SelectDropDown
                                        options={this.getSectionsCategory(this.props.globals.globalSectionCategory)}
                                        name="category"
                                        placeholderName={"Category"}
                                        handleChange={this.props.parenthandleSelectChange}
                                        dropdownIndicator={{ DropdownIndicator }}
                                        stateData={this.props.stateData.selectDatasc}
                                    />
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.formErrors.category}
                                    </Form.Text>
                                </Form.Group>
                                {/* <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formSubjects">
                                    <Form.Label>Subjects</Form.Label>
                                    <SelectDropDown options={Subjects} placeholderName={'Subjects'} dropdownIndicator={{ DropdownIndicator }} />
                                </Form.Group> */}
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} className="mt-4">
                    <h6 className="mb-3 title text-uppercase">Custom exam - Setup</h6>
                    <Card as={Card.Body} className="border-0 shadow-sm">
                        <Form>
                            <Row>
                                <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formQuestions">
                                    <Form.Label>No Of Questions</Form.Label>
                                    {/* <SelectDropDown
                                        options={NoofQuestions}
                                        placeholderName={'Questions'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    /> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="No of Questions"
                                        name="noofoptions"
                                        onChange={this.props.parenthandleInputChange}
                                        autoComplete="off"
                                        value={this.props.stateData.noofquestions}
                                        readonly="readonly"
                                    />
                                </Form.Group>
                                {/* <Form.Group as={Col} lg={4} md={12} sm={12} controlId="formExamDuration">
                                    <Form.Label>Exam Duration</Form.Label>
                                    <SelectDropDown options={ExamDuration} placeholderName={'Exam Duration'} dropdownIndicator={{ DropdownIndicator }} />
                                </Form.Group> */}
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default StepOne
