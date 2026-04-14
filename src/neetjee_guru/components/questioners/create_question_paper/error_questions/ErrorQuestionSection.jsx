import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Image, Form, CardGroup, Table, Button } from 'react-bootstrap';
import SelectDropDown from '../../../selectdropdown/SelectDropDown';
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading';
import QuestionModal from '../QuestionModal';
import DownloadQuestionPaperModal from '../../../download_question_paper/DownloadQuestionPaperModal';

import '../_createquestionpaper.scss'

class ErrorQuestionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbData: {
                Title: 'Error questions - Question paper'
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

        // ExamDurations
        const Exam = [
            { value: 1, label: <p><Image src={require('../../../../../images/Neet-Exam.png')} width="20" alt="Neet" /> NEET</p> },
            { value: 2, label: <p><Image src={require('../../../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> Jee (Mains)</p> },
            { value: 3, label: <p><Image src={require('../../../../../images/Jee(Advance)-Exam.png')} width="20" alt="Neet" /> Jee (Advance)</p> },
            { value: 4, label: <p><Image src={require('../../../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> EAMCET</p> }
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
        // NoOfSets
        const NoOfSets = [
            { value: 1, label: '2' },
            { value: 2, label: '4' },
            { value: 3, label: '6' },
            { value: 4, label: '8' }
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
            <section className="error_questions">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                        <div className="custom_setup">
                            <h6 className="text-uppercase">Exam - Setup</h6>
                            <Card as={Card.Body} className="border-0 shadow-sm">
                                <Form>
                                    <Row>
                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="SelectClass">
                                            <Form.Label className="text-uppercase">Class</Form.Label>
                                            <SelectDropDown options={Class} placeholderName={'Class'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="SelectExam">
                                            <Form.Label className="text-uppercase">Exam</Form.Label>
                                            <SelectDropDown options={Exam} placeholderName={'Select Exams'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectExamDurations">
                                            <Form.Label className="text-uppercase">Exam Durations</Form.Label>
                                            <SelectDropDown options={ExamDurations} placeholderName={'180 Min'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="NoofQuestions">
                                            <Form.Label className="text-uppercase">No Of Questions</Form.Label>
                                            <SelectDropDown options={NoofQuestions} placeholderName={'180'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="NoOfSets">
                                            <Form.Label className="text-uppercase">No Of Sets</Form.Label>
                                            <SelectDropDown options={NoOfSets} placeholderName={'6'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                        <div className="mt-4 Custom_Exam_Syllabus">
                            <h6 className="mb-3 text-uppercase">Exam - Syllabus</h6>
                            <CardGroup className="border-0 shadow-sm">
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <ul className="list-unstyled subjects-list m-0">
                                            <li>Mathematics</li>
                                            <li>Physics</li>
                                            <li className="active">Biology</li>
                                            <li>Chemistry</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Biology Chapters</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <Scrollbars style={{ height: 130 }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled chapter-list m-0">
                                                <li className="active">Chapter - 1 </li>
                                                <li>Chapter - 2 </li>
                                                <li>Chapter - 3 </li>
                                                <li>Chapter - 4 </li>
                                                <li>Chapter - 5 </li>
                                                <li>Chapter - 6 </li>
                                                <li>Chapter - 7 </li>
                                                <li>Chapter - 8 </li>
                                            </ul>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Chap Name4-Topic</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <Scrollbars style={{ height: 130 }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled topic-list m-0 pl-1">
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxOne">Topic Name - 1</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxTwo">Topic Name - 2</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxThree" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxThree">Topic Name - 3</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxFour" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxFour">Topic Name - 4</Form.Check.Label>
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
                                <Card className="border-0 bg-light">
                                    <Card.Header className="bg-secondary">
                                        <Card.Title className="mb-0 text-white">Biology</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-3">
                                        <Scrollbars style={{ height: "250px" }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <Card className="single-list-card border-0 p-2">
                                                <Card.Title>Chap Name-1</Card.Title>
                                                <ul className="list-unstyled topic-list bg-light m-0">
                                                    <li>Topic Name-1</li>
                                                    <li>Topic Name-2</li>
                                                </ul>
                                            </Card>
                                            <Card className="single-list-card border-0 p-2">
                                                <Card.Title>Chap Name-2</Card.Title>
                                                <ul className="list-unstyled topic-list bg-light m-0">
                                                    <li>Topic Name-1</li>
                                                </ul>
                                            </Card>
                                            <Card className="single-list-card border-0 p-2">
                                                <Card.Title>Chap Name-3</Card.Title>
                                                <ul className="list-unstyled topic-list bg-light m-0">
                                                    <li>Topic Name-1</li>
                                                    <li>Topic Name-2</li>
                                                </ul>
                                            </Card>
                                            <Card className="single-list-card border-0 p-2">
                                                <Card.Title>Chap Name-4</Card.Title>
                                                <ul className="list-unstyled topic-list bg-light m-0">
                                                    <li>All Topics</li>
                                                </ul>
                                            </Card>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
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

export default ErrorQuestionSection
