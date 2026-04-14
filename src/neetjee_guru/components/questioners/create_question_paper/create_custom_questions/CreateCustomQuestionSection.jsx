import React, { Component } from 'react'
import { components } from 'react-select'
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading'
import SelectDropDown from '../../../selectdropdown/SelectDropDown';

import './_createcustomquestions.scss'

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
    { value: 4, label: 'All Sections' }
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
export const Noofsets = [
    { value: 1, label: '3' },
    { value: 2, label: '4' },
    { value: 3, label: '5' },
    { value: 4, label: '6' }
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

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class CreateCustomQuestionSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BreadcrumbData: {
                Title: 'Custom Question paper'
            }
        }
    }

    render() {
        return (
            <section className="create_custom_questions">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h6 className="title text-uppercase mb-3">exam - Setup</h6>
                        <Card as={Card.Body} className="border-0 shadow-sm">
                            <Form>
                                <Row>
                                    <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} controlId="formExam">
                                        <Form.Label className="text-uppercase">Exam</Form.Label>
                                        <SelectDropDown options={Exams} placeholderName={'Exams'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} controlId="formClass">
                                        <Form.Label className="text-uppercase">Class</Form.Label>
                                        <SelectDropDown options={Classes} placeholderName={'Class'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} controlId="formCategory">
                                        <Form.Label className="text-uppercase">Section Category</Form.Label>
                                        <SelectDropDown options={Category} placeholderName={'Category'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} controlId="formSubjects">
                                        <Form.Label className="text-uppercase">Subjects</Form.Label>
                                        <SelectDropDown options={Subjects} placeholderName={'Subjects'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} controlId="formNoofsets">
                                        <Form.Label className="text-uppercase">No Of Sets</Form.Label>
                                        <SelectDropDown options={Noofsets} placeholderName={'6'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <ul className="create_custom_timeline list-unstyled mt-4">
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Section - Selection</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="custom-groups border-0 shadow-sm">
                                                <Scrollbars style={{ height: 280 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Card className="single-card-group d-flex flex-row align-items-center active">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">A1,A2 A4,A5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-4</h6>
                                                                    <p className="mb-0">A1,A6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">A4,A7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-2</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">A1,A2 A4,A5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-4</h6>
                                                                    <p className="mb-0">A1,A6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">A4,A7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-3</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">A1,A2 A4,A5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-4</h6>
                                                                    <p className="mb-0">A1,A6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">A4,A7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group add-card">
                                                            <i className="fas fa-plus" />
                                                        </Card>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Branches</h6>
                                                </Card.Header>
                                                <Scrollbars style={{ height: 236 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <ul className="branches-list p-0 m-0">
                                                            <li className="d-flex justify-content-between align-items-center">Select All</li>
                                                            <li className="d-flex justify-content-between align-items-center active">
                                                                <div className="branch_title">branches - 1 </div>
                                                                <div className="insert_sections">A1,A5,A8</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 2 </div>
                                                                <div className="insert_sections">A1,A2,A3,A4,A5</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 3 </div>
                                                                <div className="insert_sections">A1,A2,A3</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 4 </div>
                                                                <div className="insert_sections">A1,A2,A5</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 5 </div>
                                                                <div className="insert_sections"></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 6 </div>
                                                                <div className="insert_sections">A1,A3,A6</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 7 </div>
                                                                <div className="insert_sections"></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="branch_title">branches - 8 </div>
                                                                <div className="insert_sections">A1,A2,A3</div>
                                                            </li>
                                                        </ul>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white d-flex justify-content-between">
                                                    <h6 className="mb-0 text-uppercase">Sections</h6>
                                                    <h6 className="mb-0 text-uppercase">Branches-1(10)</h6>
                                                </Card.Header>
                                                <Scrollbars className="p-3" style={{ height: 236 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <ul className="sections-list m-0 pl-1">
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxAll" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxAll">Select All</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li className="active">
                                                                <Form.Check type="checkbox" id="sectioncheckboxOne" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxOne">Sections - A1</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxTwo" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxTwo">Sections - A2</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxThree" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxThree">Sections - A3</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxFour" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxFour">Sections - A4</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxFive" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxFive">Sections - A5</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxSix" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxSix">Sections - A6</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxSeven" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxSeven">Sections - A7</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="sectioncheckboxEight" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="sectioncheckboxEight">Sections - A8</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                        </ul>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save &amp; Next</Button>
                                    </Card.Footer>
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Syllabus - Selection</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="custom-groups border-0 shadow-sm">
                                                <Scrollbars style={{ height: 282 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Card className="single-card-group d-flex flex-row align-items-center active">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-2</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-3</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group add-card">
                                                            <i className="fas fa-plus" />
                                                        </Card>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={8} lg={8} md={12} sm={12} xs={12}>
                                            <Row className="g-0">
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    <li className="active">Select All</li>
                                                                    <li>Maths </li>
                                                                    <li>Physics</li>
                                                                    <li>Biology </li>
                                                                    <li>Chemistry</li>
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Chapters</h6>
                                                        </Card.Header>
                                                        <Scrollbars className="p-3" style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="sections-list m-0 pl-1">
                                                                    <li className="active">
                                                                        <Form.Check type="checkbox" id="chapcheckboxOne" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxOne">Chap Names - 1</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxTwo" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxTwo">Chap Names - 2</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxThree" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxThree">Chap Names - 3</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxFour" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxFour">Chap Names - 4</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxFive" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxFive">Chap Names - 5</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxSix" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxSix">Chap Names - 6</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxSeven" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxSeven">Chap Names - 7</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="chapcheckboxEight" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="chapcheckboxEight">Chap Names - 8</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Chapters</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    <Form.Group as={Row} controlId="formChapter1">
                                                                        <Form.Label column sm="7"> Chap Name - 1  </Form.Label>
                                                                        <Col sm="5">
                                                                            <Form.Control type="text" placeholder="" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                    <Form.Group as={Row} controlId="formChapter2">
                                                                        <Form.Label column sm="7">
                                                                            Chap Name - 2
                                                                        </Form.Label>
                                                                        <Col sm="5">
                                                                            <Form.Control type="text" placeholder="" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                    <Form.Group as={Row} controlId="formChapter3">
                                                                        <Form.Label column sm="7">
                                                                            Chap Name - 1
                                                                        </Form.Label>
                                                                        <Col sm="5">
                                                                            <Form.Control type="text" placeholder="" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save</Button>
                                    </Card.Footer>
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Type of Question - Selection</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="custom-groups border-0 shadow-sm">
                                                <Scrollbars style={{ height: 282 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <i className="px-1 fas fa-check-circle" />
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0 text-uppercase">Select all Groups</h6>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center active">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-2</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-3</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group add-card">
                                                            <i className="fas fa-plus" />
                                                        </Card>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={8} lg={8} md={12} sm={12} xs={12}>
                                            <Row className="g-0">
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    <li className="active">Select All</li>
                                                                    <li>Maths </li>
                                                                    <li>Physics</li>
                                                                    <li>Biology </li>
                                                                    <li>Chemistry</li>
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Type Of Questions</h6>
                                                        </Card.Header>
                                                        <Scrollbars className="p-3" style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="sections-list m-0 pl-1">
                                                                    <li className="active">
                                                                        <Form.Check type="checkbox" id="typeofcheckboxOne" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxOne">A &amp; R</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="typeofcheckboxTwo" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxTwo">Comprehension </Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="typeofcheckboxThree" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxThree">Diagram </Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="typeofcheckboxFour" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxFour">Formula </Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="typeofcheckboxFive" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxFive">General </Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                    <li>
                                                                        <Form.Check type="checkbox" id="typeofcheckboxSix" custom>
                                                                            <Form.Check.Input type="checkbox" />
                                                                            <Form.Check.Label htmlFor="typeofcheckboxSix">Integer</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </li>
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    <Form.Group as={Row} controlId="formChapter1">
                                                                        <Form.Label column sm="7"> A &amp; R - 1 </Form.Label>
                                                                        <Col sm="5">
                                                                            <Form.Control type="text" placeholder="" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                    <Form.Group as={Row} controlId="formChapter2">
                                                                        <Form.Label column sm="7">
                                                                            Diagram
                                                                        </Form.Label>
                                                                        <Col sm="5">
                                                                            <Form.Control type="text" placeholder="" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save</Button>
                                    </Card.Footer>
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Complexity</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="custom-groups border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Groups</h6>
                                                </Card.Header>
                                                <Scrollbars className="p-3" style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Card className="single-card-group d-flex flex-row align-items-center active">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <i className="px-1 fas fa-check-circle" />
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0 text-uppercase">Select all Groups</h6>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-2</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group add-card">
                                                            <i className="fas fa-plus" />
                                                        </Card>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                </Card.Header>

                                                <Scrollbars style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <ul className="subjects-list p-0 m-0">
                                                            <li className="active">Select All</li>
                                                            <li>Maths </li>
                                                            <li>Physics</li>
                                                            <li>Biology </li>
                                                            <li>Chemistry</li>
                                                        </ul>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Complexity</h6>
                                                </Card.Header>
                                                <Scrollbars style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Form>
                                                            <Form.Group as={Row} controlId="formText1">
                                                                <Form.Label column sm="8"> Difficulty  </Form.Label>
                                                                <Col sm="4">
                                                                    <Form.Control type="text" placeholder="" />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group as={Row} controlId="formText2">
                                                                <Form.Label column sm="8">
                                                                    Moderate
                                                                </Form.Label>
                                                                <Col sm="4">
                                                                    <Form.Control type="text" placeholder="" />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group as={Row} controlId="formText3">
                                                                <Form.Label column sm="8">
                                                                    Easy
                                                                </Form.Label>
                                                                <Col sm="4">
                                                                    <Form.Control type="text" placeholder="" />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save</Button>
                                    </Card.Footer>
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Question Theory</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="custom-groups border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Groups</h6>
                                                </Card.Header>
                                                <Scrollbars className="p-3" style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Card className="single-card-group d-flex flex-row align-items-center active">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <i className="px-1 fas fa-check-circle" />
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0 text-uppercase">Select all Groups</h6>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group d-flex flex-row align-items-center">
                                                            <Card.Header className="card-left flex-auto border-0">
                                                                <h6>G-1</h6>
                                                            </Card.Header>
                                                            <Card.Body className="p-0 card-right d-flex">
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-1</h6>
                                                                    <p className="mb-0">C1,C2 C4,C5</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">P-4</h6>
                                                                    <p className="mb-0">C1,C6</p>
                                                                </div>
                                                                <div className="signle-group">
                                                                    <h6 className="mb-0">B-7</h6>
                                                                    <p className="mb-0">C4,C7</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card className="single-card-group add-card">
                                                            <i className="fas fa-plus" />
                                                        </Card>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                </Card.Header>

                                                <Scrollbars style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <ul className="subjects-list p-0 m-0">
                                                            <li className="active">Select All</li>
                                                            <li>Maths </li>
                                                            <li>Physics</li>
                                                            <li>Biology </li>
                                                            <li>Chemistry</li>
                                                        </ul>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                        <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                            <Card className="border-0 shadow-sm">
                                                <Card.Header className="bg-white">
                                                    <h6 className="mb-0 text-uppercase">Question Theory</h6>
                                                </Card.Header>
                                                <Scrollbars style={{ height: 242 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <Card.Body className="p-3">
                                                        <Form>
                                                            <Form.Group as={Row} controlId="formTextA">
                                                                <Form.Label column sm="8"> Application  </Form.Label>
                                                                <Col sm="4">
                                                                    <Form.Control type="text" placeholder="" />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group as={Row} controlId="formTextB">
                                                                <Form.Label column sm="8">
                                                                    Concept
                                                                </Form.Label>
                                                                <Col sm="4">
                                                                    <Form.Control type="text" placeholder="" />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                    </Card.Body>
                                                </Scrollbars>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save</Button>
                                    </Card.Footer>
                                </Card>
                            </li>
                        </ul>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-right">
                        {/* <Link to="/questions/create-question-paper/create-custom-question-paper/create-custom-summery" className="mt-5 px-5 btn btn-outline-light text-uppercase">Next</Link> */}
                        <Link to="/questions/create-question-paper/create-custom-question-paper/create-custom-summery" className="mt-5 px-5 btn btn-success text-uppercase">Next</Link>
                    </Col>
                </Row>
            </section>
        )
    }
}

export default CreateCustomQuestionSection
