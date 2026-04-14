import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Form, CardGroup, ButtonGroup, Table, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading'
import SelectDropDown from '../../../selectdropdown/SelectDropDown'
import DownloadQuestionPaperModal from '../../../download_question_paper/DownloadQuestionPaperModal'
import QuestionModal from '../QuestionModal'

import '../_createquestionpaper.scss'

class QuickQuestionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbData: {
                Title: 'Quick Exam'
            },
            modalShow: false,
            modalShowTwo: false
        }
    }

    render() {
        // Questions
        const Class = [
            { value: 1, label: 'XI' },
            { value: 2, label: 'XII' }
        ];

        // Types
        const Types = [
            { value: 1, label: 'Main' },
            { value: 2, label: 'Adavnce' }
        ];

        // ExamDurations
        const Exam = [
            { value: 1, label: 'NEET' },
            { value: 2, label: 'JEE (Mains)' },
            { value: 3, label: 'JEE (Advance)' },
            { value: 4, label: 'EAMCET' }
        ];

        // ExamDurations
        const ExamDurations = [
            { value: 1, label: '60 Min' },
            { value: 2, label: '120 Min' },
            { value: 3, label: '180 Min' }
        ];

        // NoofQuestions
        const NoofQuestions = [
            { value: 1, label: '180' },
            { value: 2, label: '120' },
            { value: 3, label: '90' },
            { value: 4, label: '60' }
        ];
        // Paper Sets
        const PaperSets = [
            { value: 1, label: '6' },
            { value: 2, label: '4' },
            { value: 3, label: '2' },
            { value: 4, label: '1' }
        ];
        //Complexity
        const Complexity = [
            { value: 1, label: 'Easy' },
            { value: 2, label: 'Moderate' },
            { value: 3, label: 'Difficulty' }
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

        return (
            <section className="adaptive_question_papers">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                        <div className="custom_setup">
                            <h6 className="text-uppercase">Exam - Setup</h6>
                            <Card as={Card.Body} className="border-0 shadow-sm">
                                <Form>
                                    <Row>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectClass">
                                            <Form.Label className="text-uppercase">Exam For Whitch Class</Form.Label>
                                            <SelectDropDown options={Class} placeholderName={'Class'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectExam">
                                            <Form.Label className="text-uppercase">Exam</Form.Label>
                                            <SelectDropDown options={Exam} placeholderName={'Select Exams'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectType">
                                            <Form.Label className="text-uppercase">Type</Form.Label>
                                            <SelectDropDown options={Types} placeholderName={'Select Type'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectPaperSets">
                                            <Form.Label className="text-uppercase">Unique Question Paper Sets</Form.Label>
                                            <SelectDropDown options={PaperSets} placeholderName={'Sets'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectExamDurations">
                                            <Form.Label className="text-uppercase">Exam Durations</Form.Label>
                                            <SelectDropDown options={ExamDurations} placeholderName={'180 Min'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="NoofQuestions">
                                            <Form.Label className="text-uppercase">No Of Questions</Form.Label>
                                            <SelectDropDown options={NoofQuestions} placeholderName={'180'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="Complexity">
                                            <Form.Label className="text-uppercase">Complexity</Form.Label>
                                            <SelectDropDown options={Complexity} placeholderName={'Complexity'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                        <div className="mt-4 Custom_Exam_Syllabus">
                            <h6 className="mb-3 text-uppercase">Exam - Syllabus</h6>
                            <Card>
                                <Card.Header className="bg-white d-md-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-2">Class:</div>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="outline-secondary active">Left</Button>
                                            <Button variant="outline-secondary">Right</Button>
                                        </ButtonGroup>
                                    </div>
                                    <p className="text-muted text-uppercase">Total Chapter Selected: 13</p>
                                </Card.Header>
                            </Card>
                            <CardGroup className="border-0 shadow-sm">
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <ul className="list-unstyled subjects-list m-0">
                                            <li className="d-md-flex justify-content-between align-items-center">Select All</li>
                                            <li className="d-md-flex justify-content-between align-items-center">
                                                <div className="title">Math's</div>
                                                <div className="counts">(5)</div>
                                            </li>
                                            <li className="active d-md-flex justify-content-between align-items-center">
                                                <div className="title">Physics</div>
                                                <div className="counts">(4)</div>
                                            </li>
                                            <li className="d-md-flex justify-content-between align-items-center">
                                                <div className="title">Chemistry</div>
                                                <div className="counts">(5)</div>
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Physics</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <Scrollbars style={{ height: 130 }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled chapter-list m-0 pl-1">
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxOne">Chap Name - 1</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxTwo">Chap Name - 2</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxThree" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxThree">Chap Name - 3</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxFour" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxFour">Chap Name - 4</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                            </ul>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside h-100 border-0 shadow-sm">
                            <Card.Header className="border-0">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Class </th>
                                            <th>: XI</th>
                                        </tr>
                                        <tr>
                                            <th>Exam </th>
                                            <th>: NEET </th>
                                        </tr>
                                        <tr>
                                            <th> Duration </th>
                                            <th>: 180min </th>
                                        </tr>
                                        <tr>
                                            <th>No Of Questions </th>
                                            <th>: 180</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <Scrollbars style={{ height: "430px" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    <Card className="border-0 bg-light mb-2">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="mb-0 text-white">Math's</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <ul className="list-unstyled chapter-list bg-light m-0">
                                                <li>Chap Name-1</li>
                                                <li>Chap Name-2</li>
                                                <li>Chap Name-3</li>
                                                <li>Chap Name-4</li>
                                                <li>Chap Name-5</li>
                                                <li>Chap Name-6</li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                    <Card className="border-0 bg-light mb-2">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="mb-0 text-white">Physics</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <ul className="list-unstyled chapter-list bg-light m-0">
                                                <li>Chap Name-1</li>
                                                <li>Chap Name-2</li>
                                                <li>Chap Name-3</li>
                                                <li>Chap Name-4</li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                    <Card className="border-0 bg-light mb-2">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="mb-0 text-white">Chemistry</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <ul className="list-unstyled chapter-list bg-light m-0">
                                                <li>Chap Name-1</li>
                                                <li>Chap Name-2</li>
                                                <li>Chap Name-3</li>
                                                <li>Chap Name-4</li>
                                                <li>Chap Name-5</li>
                                                <li>Chap Name-6</li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0">
                                <Button variant="primary" className="px-4 text-uppercase" className="w-100" onClick={() => this.setState({ modalShow: true })}>Generate question paper</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <QuestionModal show={this.state.modalShow} showothermodal={() => this.setState({ modalShowTwo: true })} onHide={() => this.setState({ modalShow: false })} />
                <DownloadQuestionPaperModal show={this.state.modalShowTwo} onHide={() => this.setState({ modalShowTwo: false })} />
            </section>
        )
    }
}

export default QuickQuestionSection
