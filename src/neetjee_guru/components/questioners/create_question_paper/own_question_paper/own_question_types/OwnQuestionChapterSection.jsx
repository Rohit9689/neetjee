import React, { Component } from 'react'
import { components } from 'react-select'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Table, Form, ButtonGroup, Button } from 'react-bootstrap'
import BreadcrumbCustomQuestionTwo from '../../../../breadcrumbs/BreadcrumbCustomQuestionTwo'
import SelectDropDown from '../../../../selectdropdown/SelectDropDown';
import QuestionModal from '../../QuestionModal';
import DownloadQuestionPaperModal from '../../../../download_question_paper/DownloadQuestionPaperModal';
import { Link } from 'react-router-dom';

import './_ownquestiontype.scss'

// noofsets
export const noofsets = [
    { value: 1, label: '12' },
    { value: 2, label: '6' },
    { value: 3, label: '8' },
    { value: 4, label: '6' },
    { value: 5, label: '4' },
    { value: 6, label: '2' }
];
// Paper
const PaperData = [
    { value: 'JEE-2014', label: 'JEE-2014' },
    { value: 'JEE-2013', label: 'JEE-2013' },
    { value: 'JEE-2012', label: 'JEE-2012' },
    { value: 'JEE-2011', label: 'JEE-2011' },
    { value: 'JEE-2010', label: 'JEE-2010' },
    { value: 'JEE-2009', label: 'JEE-2009' },
    { value: 'JEE-2008', label: 'JEE-2008' },
    { value: 'JEE-2007', label: 'JEE-2007' },
    { value: 'JEE-2006', label: 'JEE-2006' },
    { value: 'JEE-2005', label: 'JEE-2005' }
];
const courses = [
    'JEE - 2001',
    'JEE - 2002',
    'JEE - 2003',
    'JEE - 2004',
    'JEE - 2005',
    'JEE - 2006',
    'JEE - 2007',
    'JEE - 2008',
    'JEE - 2009',
    'JEE - 2010',
    'JEE - 2011',
    'JEE - 2012'
];

// Chapters
const Chapters = [
    { value: 1, label: 'New Chapters' },
    { value: 2, label: 'Chapters-1' },
    { value: 3, label: 'Chapters-2' }
];

// slectSubject
export const slectSubject = [
    { value: 1, label: 'Maths' },
    { value: 2, label: 'Biology' },
    { value: 3, label: 'Zoology' },
    { value: 4, label: 'Physics' },
    { value: 5, label: 'Chemistry' }
];

// TypeofQuestions
export const TypeofQuestions = [
    { value: 1, label: 'Matching-1' },
    { value: 2, label: 'Matching-2' }
];

// ApplicationTheory
export const ApplicationTheory = [
    { value: 1, label: 'Theory-1' },
    { value: 2, label: 'Theory-2' }
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
class OwnQuestionChapterSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            BreadcrumbCustomQuestionsSection: {
                img: require('../../../../../../images/Neet-Exam.png'),
                Title: 'NEET Exam - Question Paper',
                SubTitle: ' Chapter Test',
                ClassSectionTotalStudents: 'Class - XI, Section - A ( Students : 60)',
                complexity: 'Difficulty 60%, Moderate 25%, easy 15%',
                subjects: 'Mathematics, Physics, Chemistry'
            },
            modalShow: false,
            modalShowTwo: false,
            search: []
        }
    }

    render() {
        let options;
        if (this.state.search.length) {
            const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
            options = courses.filter(option =>
                option.match(searchPattern)
            );
        } else {
            options = courses;
        }
        return (
            <div className="Own_Question_Types">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <div className="">
                            <BreadcrumbCustomQuestionTwo breadcrumbs={this.state.BreadcrumbCustomQuestionsSection} />
                        </div>
                        <ul className="list-unstyled">
                            <li>
                                <h6 className="mb-3 title text-uppercase">Exam - Setup</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm">
                                    <Form>
                                        <Row className="align-items-end">
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group controlId="formClass" className="d-flex align-items-center">
                                                    <Card as={Card.Body} className="w-100 p-2">
                                                        <Form.Check type="checkbox" id="checkbox1" custom>
                                                            <Form.Check.Input type="checkbox" />
                                                            <Form.Check.Label htmlFor="checkbox1">Question Bank Questions</Form.Check.Label>
                                                        </Form.Check>
                                                    </Card>
                                                    <Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                        <div className="percentage">90%</div>
                                                    </Card>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group controlId="formClass" className="d-flex align-items-center">
                                                    <Card as={Card.Body} className="w-100 p-2">
                                                        <Form.Check type="checkbox" id="checkbox2" custom>
                                                            <Form.Check.Input type="checkbox" />
                                                            <Form.Check.Label htmlFor="checkbox2">Own Added Questions</Form.Check.Label>
                                                        </Form.Check>
                                                    </Card>
                                                    <Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                        <div className="percentage">10%</div>
                                                    </Card>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group controlId="formCategory">
                                                    <Form.Label>No Of Sets</Form.Label>
                                                    <SelectDropDown options={noofsets} placeholderName={'No of Sets'} dropdownIndicator={{ DropdownIndicator }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                            </li>
                            <li>
                                <h6 className="mb-3 title text-uppercase">Syllabus - Section</h6>
                                <Card className="border-0 shadow-sm custom_setup">
                                    <Card.Header className="bg-white">
                                        <Row className="align-items-center">
                                            <Col xl={3} lg={3} md={6} sm={12} xs={12} className="my-2 d-flex align-items-center">
                                                <div className="mr-2">Class:</div>
                                                <ButtonGroup aria-label="Basic example">
                                                    <Button variant="outline-secondary active">X-11</Button>
                                                    <Button variant="outline-secondary">XII-2</Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="text-xl-center text-lg-center">
                                                <p className="text-muted my-2">Total Chapter Selected: 13</p>
                                            </Col>
                                            <Col xl={3} lg={3} md={12} sm={12} xs={12} className="text-xl-right text-lg-right">
                                                <Form.Group className="my-2 d-flex align-items-center">
                                                    <Form.Label className="mr-2">Weightage </Form.Label>
                                                    <Form.Control style={{ width: 65 }} type="text" placeholder="70%" disabled />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="g-0 mb-4">
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Subjects </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled subject-list m-0">
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="subName">Botany</div>
                                                                <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="subName">Zoology</div>
                                                                <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="subName">Physics</div>
                                                                <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="subName">Chemistry</div>
                                                                <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="subName">Maths</div>
                                                                <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                            </li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Zoology Chapters</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled chapter-list m-0">
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name1</div>
                                                                <div className="counts">(1)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name2</div>
                                                                <div className="counts">(2)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name3</div>
                                                                <div className="counts">(3)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name4</div>
                                                                <div className="counts">(4)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name5</div>
                                                                <div className="counts">(5)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name6</div>
                                                                <div className="counts">(6)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name7</div>
                                                                <div className="counts">(7)</div>
                                                            </li>
                                                            <li className="d-flex justify-content-between align-items-center">
                                                                <div className="names">Chap Name8</div>
                                                                <div className="counts">(8)</div>
                                                            </li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Chap Name4 - Topic </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled chap-topic-list m-0 pl-1">
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxAll" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxOne" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxOne">Chapter Name - 1</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxTwo">Chapter Name - 2</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxThree" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxThree">Chapter Name - 3</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxFour" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxFour">Chapter Name - 4</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxFive" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxFive">Chapter Name - 5</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxSix" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxSix">Chapter Name - 6</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </li>
                            <li>
                                <h6 className="text-uppercase">Old Question Papers</h6>
                                <Card className="border-0 shadow-sm custom_setup">
                                    <Card.Header className="bg-white d-sm-flex align-items-center justify-content-between">
                                        <Form.Group className="mb-0 d-flex align-items-center" controlId="SelectPaper">
                                            <Form.Label className="text-uppercase mr-3">Paper</Form.Label>
                                            <Select maxMenuHeight={150}
                                                defaultValue={[PaperData[0], PaperData[1], PaperData[2], PaperData[3]]}
                                                isMulti
                                                name="colors"
                                                options={PaperData}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex align-items-center">
                                            <Form.Label className="mr-2">Weightage </Form.Label>
                                            <Form.Control style={{ width: 65 }} type="text" placeholder="20%" disabled />
                                        </Form.Group>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="g-0 mb-4">
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white d-flex align-items-center py-1 justify-content-between">
                                                    <Card.Title className="mb-0 h6">Papers: </Card.Title>
                                                    <Form.Control style={{ width: 100 }} type="text" placeholder="search" onChange={(e) => this.setState({ search: e.target.value.split(' ') })} />
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled chapter-list m-0">
                                                            {options.map((option, i) =>
                                                                <li key={option + i}>{option}</li>
                                                            )}
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={8} lg={8} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 pt-1 h6">&nbsp;</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext1">
                                                        <Form.Label column sm="3">
                                                            Botany
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext2">
                                                        <Form.Label column sm="3">
                                                            Zoology
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext3">
                                                        <Form.Label column sm="3">
                                                            Physics
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext4">
                                                        <Form.Label column sm="3">
                                                            Chemistry
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </li>
                            <li>
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="d-sm-flex justify-content-between align-items-center bg-white">
                                        <h6>Own Added Questions</h6>
                                        <Form.Group className="my-0 d-flex align-items-center">
                                            <Form.Label className="mr-2">Weightage </Form.Label>
                                            <Form.Control style={{ width: 65 }} type="text" placeholder="10%" disabled />
                                        </Form.Group>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="my-3 d-md-flex justify-content-between align-items-center">
                                            <h6>Filter</h6>
                                            <div className="d-flex align-items-center">
                                                <div className="mr-2">Class:</div>
                                                <ButtonGroup aria-label="Basic example">
                                                    <Button variant="outline-secondary active">XI</Button>
                                                    <Button variant="outline-secondary">XII</Button>
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                        <Card as={Card.Body}>
                                            <Form>
                                                <Row>
                                                    <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="slectSubject">
                                                        <Form.Label className="text-uppercase">Subject</Form.Label>
                                                        <SelectDropDown options={slectSubject} placeholderName={'Subject'} dropdownIndicator={{ DropdownIndicator }} />
                                                    </Form.Group>
                                                    <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectChapters">
                                                        <Form.Label className="text-uppercase">Chapters</Form.Label>
                                                        <SelectDropDown options={Chapters} placeholderName={'Chapters'} dropdownIndicator={{ DropdownIndicator }} />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectTypeofQuestions">
                                                        <Form.Label className="text-uppercase">Type Of Questions</Form.Label>
                                                        <SelectDropDown options={TypeofQuestions} placeholderName={'Type Of Questions'} dropdownIndicator={{ DropdownIndicator }} />
                                                    </Form.Group>
                                                    <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectApplicationTheory">
                                                        <Form.Label className="text-uppercase">Application Theory</Form.Label>
                                                        <SelectDropDown options={ApplicationTheory} placeholderName={'Application Theory'} dropdownIndicator={{ DropdownIndicator }} />
                                                    </Form.Group>
                                                </Row>
                                            </Form>
                                        </Card>

                                        <div className="my-3 d-md-flex justify-content-between align-items-center">
                                            <h6>Questions</h6>
                                            <Form.Group className="my-2 d-flex align-items-center">
                                                <Form.Control style={{ width: 150 }} type="text" placeholder="Searach" />
                                            </Form.Group>
                                        </div>
                                        <Card as={Card.Body}>
                                            <Scrollbars style={{ height: 250 }}
                                                {...this.props}
                                                renderThumbVertical={renderThumb}
                                                autoHide
                                                autoHideTimeout={500}
                                                autoHideDuration={200}>
                                                <Card as={Card.Body} className="bg-light my-2">
                                                    <Form.Check type="checkbox" id="checkbox_01" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkbox_01">3. It is a long established fact that a reader will be distracted by the readable<br /> content of a page when looking at its layout.</Form.Check.Label>
                                                    </Form.Check>
                                                </Card>
                                                <Card as={Card.Body} className="bg-light my-2">
                                                    <Form.Check type="checkbox" id="checkbox_02" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkbox_02">3. It is a long established fact that a reader will be distracted by the readable<br /> content of a page when looking at its layout.</Form.Check.Label>
                                                    </Form.Check>
                                                </Card>
                                                <Card as={Card.Body} className="bg-light my-2">
                                                    <Form.Check type="checkbox" id="checkbox_03" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkbox_03">3. It is a long established fact that a reader will be distracted by the readable<br /> content of a page when looking at its layout.</Form.Check.Label>
                                                    </Form.Check>
                                                </Card>
                                                <Card as={Card.Body} className="bg-light my-2">
                                                    <Form.Check type="checkbox" id="checkbox_04" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkbox_04">3. It is a long established fact that a reader will be distracted by the readable<br /> content of a page when looking at its layout.</Form.Check.Label>
                                                    </Form.Check>
                                                </Card>
                                                <Card as={Card.Body} className="bg-light my-2">
                                                    <Form.Check type="checkbox" id="checkbox_05" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkbox_05">3. It is a long established fact that a reader will be distracted by the readable<br /> content of a page when looking at its layout.</Form.Check.Label>
                                                    </Form.Check>
                                                </Card>
                                            </Scrollbars>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </li>
                        </ul>
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
                                <Scrollbars style={{ height: "100vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    <Card className="border-0 bg-light">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="mb-0 text-white">Botnay</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <Scrollbars style={{ height: "250px" }}
                                                {...this.props}
                                                renderThumbVertical={renderThumb}
                                                autoHide
                                                autoHideTimeout={500}
                                                autoHideDuration={200}>
                                                <Card className="single-list-card border-0 p-2">
                                                    <Card.Title className="h6">Chap Name-1</Card.Title>
                                                    <ul className="list-unstyled topic-list bg-light m-0">
                                                        <li>Topic Name-1</li>
                                                        <li>Topic Name-2</li>
                                                    </ul>
                                                </Card>
                                                <Card className="single-list-card border-0 p-2">
                                                    <Card.Title className="h6">Chap Name-2</Card.Title>
                                                    <ul className="list-unstyled topic-list bg-light m-0">
                                                        <li>Topic Name-1</li>
                                                    </ul>
                                                </Card>
                                                <Card className="single-list-card border-0 p-2">
                                                    <Card.Title className="h6">Chap Name-3</Card.Title>
                                                    <ul className="list-unstyled topic-list bg-light m-0">
                                                        <li>Topic Name-1</li>
                                                        <li>Topic Name-2</li>
                                                    </ul>
                                                </Card>
                                                <Card className="single-list-card border-0 p-2">
                                                    <Card.Title className="h6">Chap Name-4</Card.Title>
                                                    <ul className="list-unstyled topic-list bg-light m-0">
                                                        <li>All Topics</li>
                                                    </ul>
                                                </Card>
                                            </Scrollbars>
                                        </Card.Body>
                                    </Card>
                                    <Card className="border-0 bg-light mb-2">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="mb-0 text-white">Biology</Card.Title>
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
                                            <Card.Title className="h6 mb-0 text-white">Own Added Questions</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <ul className="list-unstyled chapter-list bg-light m-0">
                                                <li><Link to="#">Chap Name-1</Link></li>
                                                <li><Link to="#">Chap Name-2</Link></li>
                                                <li><Link to="#">Chap Name-3</Link></li>
                                                <li><Link to="#">Chap Name-4</Link></li>
                                                <li><Link to="#">Chap Name-5</Link></li>
                                                <li><Link to="#">Chap Name-6</Link></li>
                                                <li><Link to="#">Chap Name-7</Link></li>
                                                <li><Link to="#">Chap Name-8</Link></li>
                                                <li><Link to="#">Chap Name-9</Link></li>
                                                <li><Link to="#">Chap Name-10</Link></li>
                                                <li><Link to="#">Chap Name-11</Link></li>
                                                <li><Link to="#">Chap Name-12</Link></li>
                                                <li><Link to="#">Chap Name-13</Link></li>
                                                <li><Link to="#">Chap Name-14</Link></li>
                                                <li><Link to="#">Chap Name-15</Link></li>
                                                <li><Link to="#">Chap Name-16</Link></li>
                                                <li><Link to="#">Chap Name-17</Link></li>
                                                <li><Link to="#">Chap Name-18</Link></li>
                                                <li><Link to="#">Chap Name-19</Link></li>
                                                <li><Link to="#">Chap Name-20</Link></li>
                                                <li><Link to="#">Chap Name-21</Link></li>
                                                <li><Link to="#">Chap Name-22</Link></li>
                                                <li><Link to="#">Chap Name-23</Link></li>
                                                <li><Link to="#">Chap Name-24</Link></li>
                                                <li><Link to="#">Chap Name-25</Link></li>
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
            </div>
        )
    }
}

export default OwnQuestionChapterSection
