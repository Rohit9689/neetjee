import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import SelectDropDown from '../../selectdropdown/SelectDropDown'
import UploadFile from '../../uploads_file/UploadFile'
import TextEditor from '../../text_editor/TextEditor'
import { Exams, Subjects, Topics, Answers, Images, CorrectAnswer, Complexity, QuestionTheory, Typeofquestions } from './ManageOurQuestionPaperData'
import DateTime from 'react-datetime'
import '../../../../react-datetime.css'


class ManageOurQuestionPaperSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breadcrumbsData: {
                Title: "Manage Our Question Papers"
            },
            uloadOne: {
                Title: "Upload",
                SupportedFormats: "Supported Formats: doc, docx, rtf, pdf, upto 2 MB",
            }
        }
    }

    render() {

        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };

        return (
            <section className="manage_question_papers">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Form>
                            <Row>
                                <Form.Group as={Col} xl={2} lg={2} md={12} sm={12}>
                                    <Form.Label className="text-uppercase"> Exams</Form.Label>
                                    <ButtonGroup aria-label="Basic example" className="d-block">
                                        <Button variant="light" className="px-4 active" >XI</Button>
                                        <Button variant="light" className="px-4">XII</Button>
                                    </ButtonGroup>
                                </Form.Group>
                                <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectExams">
                                    <Form.Label className="text-uppercase"> Exams</Form.Label>
                                    <SelectDropDown options={Exams} placeholderName={'Exams'} dropdownIndicator={{ DropdownIndicator }} />
                                </Form.Group>
                                <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectSubjects">
                                    <Form.Label className="text-uppercase"> Subjects</Form.Label>
                                    <SelectDropDown options={Subjects} placeholderName={'Subjects'} dropdownIndicator={{ DropdownIndicator }} />
                                </Form.Group>
                                <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectTopics">
                                    <Form.Label className="text-uppercase">Topics</Form.Label>
                                    <SelectDropDown options={Topics} placeholderName={'Topics'} dropdownIndicator={{ DropdownIndicator }} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Card as={Card.Body} className="border-0 shadow-sm">
                            <h6>Question Type</h6>
                            <Form>
                                <Row className="form-inline">
                                    <Form.Group as={Col}>
                                        <Form.Check type="checkbox" className="form-check-inline" id="inlineCheckbox1" custom>
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label htmlFor="inlineCheckbox1">Simple </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox" className="form-check-inline" id="inlineCheckbox2" custom>
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label htmlFor="inlineCheckbox2">Comprehension </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox" className="form-check-inline" id="inlineCheckbox3" custom>
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label htmlFor="inlineCheckbox3">Integer </Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox" className="form-check-inline" id="inlineCheckbox4" custom>
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label htmlFor="inlineCheckbox4">Matching Matrix</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox" className="form-check-inline" id="inlineCheckbox5" custom>
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label htmlFor="inlineCheckbox5">Matrix</Form.Check.Label>
                                        </Form.Check>
                                    </Form.Group>
                                </Row>

                                <hr className="line-style my-5" />

                                <Row>
                                    <Form.Group as={Col} xl={12} lg={12} md={12} sm={12} controlId="inputText">
                                    <Form.Label className="text-uppercase">Type Your Question Here</Form.Label>
                                        <TextEditor />
                                    </Form.Group>
                                </Row>
                                <Row className="d-flex align-items-top">
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        <Form.Label className="text-uppercase">Answer-1</Form.Label>
                                    </Col>
                                    <Col xl={4} lg={4} md={3} sm={12}>
                                        <Form.Group controlId="SelectAnswers">
                                            <SelectDropDown options={Answers} placeholderName={'Text'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12}>
                                        <Form.Group controlId="inputText1">
                                            <TextEditor />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-flex align-items-top">
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        <Form.Label className="text-uppercase">Answer-2</Form.Label>
                                    </Col>
                                    <Col xl={4} lg={4} md={3} sm={12}>
                                        <Form.Group controlId="SelectAnswers">
                                            <SelectDropDown options={Images} placeholderName={'Images'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12}>
                                        <Form.Group controlId="inputText2">
                                            <UploadFile titleData={this.state.uloadOne} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-flex align-items-top">
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        <Form.Label className="text-uppercase">Answer-3</Form.Label>
                                    </Col>
                                    <Col xl={4} lg={4} md={3} sm={12}>
                                        <Form.Group controlId="SelectAnswers">
                                            <SelectDropDown options={Answers} placeholderName={'Text'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12}>
                                        <Form.Group controlId="inputText3">
                                            <TextEditor />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-flex align-items-top">
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        <Form.Label className="text-uppercase">Answer-4</Form.Label>
                                    </Col>
                                    <Col xl={4} lg={4} md={3} sm={12}>
                                        <Form.Group controlId="SelectAnswers">
                                            <SelectDropDown options={Answers} placeholderName={'Text'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12}>
                                        <Form.Group controlId="inputText4">
                                            <TextEditor />
                                        </Form.Group>
                                    </Col>
                                    <Form.Group as={Col} xl={12} lg={12} md={12} sm={12} className="text-right">
                                        <Button variant="outline-primary" className="px-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 384 512" className="mr-2">
                                                <path fill="currentColor" d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path>
                                            </svg>Add Answer
                                        </Button>
                                    </Form.Group>
                                </Row>

                                <hr className="line-style my-5" />

                                <Row className="d-flex align-items-top">
                                    <Col xl={4} lg={4} md={3} sm={12}>
                                        <Form.Group controlId="SelectAnswers">
                                            <Form.Label className="text-uppercase">Correct Answer</Form.Label>
                                            <SelectDropDown options={CorrectAnswer} placeholderName={'Correct Answer'} dropdownIndicator={{ DropdownIndicator }} />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={8} lg={8} md={9} sm={12}>
                                        <Form.Group controlId="inputText5">
                                            <Form.Label className="text-uppercase">Explanation</Form.Label>
                                            <TextEditor />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectComplexity">
                                        <Form.Label className="text-uppercase">Complexity</Form.Label>
                                        <SelectDropDown options={Complexity} placeholderName={'Select Complexity'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectPrinciple">
                                        <Form.Label className="text-uppercase">Principle</Form.Label>
                                        <DateTime dateFormat={false} timeFormat="h:mm:ss A" inputProps={{ placeholder: "00:10:30 Sec" }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectTypeofquestions">
                                        <Form.Label className="text-uppercase">Type Of Questions</Form.Label>
                                        <SelectDropDown options={Typeofquestions} placeholderName={'Questions'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} xl={3} lg={3} md={12} sm={12} controlId="SelectQuestionTheory">
                                        <Form.Label className="text-uppercase">Question Theory</Form.Label>
                                        <SelectDropDown options={QuestionTheory} placeholderName={'Question Theory'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} xl={12} lg={12} md={12} sm={12} className="text-right">
                                        <Button variant="success" className="text-uppercase px-5">Create</Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </section>
        )
    }
}


export default ManageOurQuestionPaperSection
