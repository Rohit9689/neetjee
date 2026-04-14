import React, { Component } from 'react'
import { components } from 'react-select'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Table, Form, ButtonGroup, Button } from 'react-bootstrap'
import BreadcrumbCustomQuestionTwo from '../../../../breadcrumbs/BreadcrumbCustomQuestionTwo'
import SelectDropDown from '../../../../selectdropdown/SelectDropDown';
//import QuestionModal from '../../QuestionModal';
//import DownloadQuestionPaperModal from '../../../../download_question_paper/DownloadQuestionPaperModal';
import { Link } from 'react-router-dom';
import ParentQuestionComponent from './ParentQuestionComponent';
import ParentQuestionBankComponent from './ParentQuestionBankComponent';
import { withRouter } from "react-router-dom";

import './_ownquestiontype.scss'
import { parse } from 'graphql';

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

const examtypema = [
    { value: "1", label: "MAINS" },
    { value: "2", label: "ADVANCE" }
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
class OwnQuestionCustomSection extends Component {
    constructor(props) {
        super(props)
        let clsdata = props.globals.classes.map((item) => {
            if (item.id == "1") {
                return { ...item, active: "outline-secondary active" }
            }
            return { ...item, active: "outline-secondary" }

        })

        let Title = "";
        let ClassSectionTotalStudents = "";
        let complexity = "";
        let subjects = "";
        let img = "";

        if (props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection != undefined) {
            Title = props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.Title;
            ClassSectionTotalStudents = props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.ClassSectionTotalStudents;
            complexity = props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.complexity;
            subjects = props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.subjects;
            img = props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.img;
        }

        console.log("breadCrumbsData", props.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.complexity);

        this.state = {
            ownedquestions: [],
            classData: clsdata,
            syllabusclass: "1",
            BreadcrumbCustomQuestionsSection: {
                img: img,
                Title: Title,
                SubTitle: 'Category',
                ClassSectionTotalStudents: ClassSectionTotalStudents,
                complexity: complexity,
                subjects: subjects
            },
            modalShow: false,
            modalShowTwo: false,
            search: [],
            chapterArray: [],
            advancedoption: false,

        }
    }
    ownedquestionClassFun1 = (e, data) => {
        console.log("owedqfilterclass", data);
        let classArray = this.state.classData.map((item) => {
            if (item.id == data) {
                return { ...item, active: "outline-secondary active" }
            }
            else {
                return { ...item, active: "outline-secondary" }
            }

        })
        this.setState({ classData1: classArray, owedqfilterclass: data });
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }

    syllabusClassFun = (e, data) => {
        console.log("syllabusClassFun", data);
        let classArray = this.state.classData.map((item) => {
            if (item.id == data) {
                return { ...item, active: "outline-secondary active" }
            }
            else {
                return { ...item, active: "outline-secondary" }
            }

        })
        this.setState({ classData: classArray, syllabusclass: data });
    }


    getexamType() {
        let getArray = [];
        for (let i = 0; i <= this.props.globals.exams.length; i++) {
            let idata = this.props.globals.exams[i];
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
    getBrachData() {
        let getArray = [];
        for (let i = 0; i <= this.props.globals.globalBranches.length; i++) {
            let idata = this.props.globals.globalBranches[i];
            if (idata != undefined) {
                const newObj = {
                    value: idata.id,
                    label: idata.branch_name
                }
                getArray.push(newObj);

            }

        }
        return getArray;
    }
    defaultclassGetDataFunction(data) {
        let sarray = [];
        const obj1 = {
            value: 0,
            label: "ALL",
        }
        sarray.push(obj1);
        return sarray[0];
    }
    getClassData() {
        let getArray = [];
        // let newDefault = {
        //     value: 0,
        //     label: "ALL"
        // }
        // getArray.push(newDefault);
        for (let i = 0; i <= this.props.globals.classes.length; i++) {
            let idata = this.props.globals.classes[i];
            if (idata != undefined) {
                const newObj = {
                    value: idata.id,
                    label: idata.class
                }
                getArray.push(newObj);

            }
        }
        return getArray;
    }
    getSectionData() {
        console.log("getSectionData", this.props.getSections);
        let getArray = [];
        if (this.props.stateData.branch != "") {
            for (let i = 0; i <= this.props.getSections.length; i++) {
                let idata = this.props.getSections[i];
                if (idata != undefined) {
                    this.props.stateData.branch.map((branchmapData) => {
                        if (branchmapData == idata.branch_id) {
                            const newObj = {
                                value: idata.id,
                                label: idata.section_name
                            }
                            getArray.push(newObj);
                        }

                    })
                }

            }
        }

        return getArray;
    }


    totalchapters(propsData) {
        let totArray = [];
        propsData.map((mapData) => {
            let selectedchaptercount = mapData.chapters.filter((a) => a.checked == true)
            let newObject = selectedchaptercount.length;
            totArray.push(parseInt(newObject));
        })
        var sum = totArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sum;
    }
    manageexams = (e) => {
        this.props.history.push({
            pathname: "/questions/manage-question-paper",

        });
    }
    examoptions() {
        let newArray = [];
        this.props.globals.exams.map((item) => {
            if (item.id == "1" || item.id == "2") {
                const newObj = { value: item.id, label: item.exam }
                newArray.push(newObj);
            }

        })
        return newArray;
    }
    handleInputChange = (e) => {
        console.log("e.target.checked", e.target.checked);
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.name == "advancedoption") {
            if (e.target.checked == true) {
                this.setState({ advancedoption: true });
            }
            else {
                this.setState({ advancedoption: false });
            }

        }
        else {
            this.setState({ [name]: value }, () => {
                this.validateField(name, value);
            });
        }

    };
    render() {
        console.log("parentcurrentstate", this.props.stateData);
        let array = [];
        let displayqustions = this.props.stateData.subjects.map((item) => {
            item.chapters.map((chdata) => {
                let object = { ...chdata }
                array.push(object);
            })
        })
        let chaptername = "Chapter";
        const chapter = this.props.stateData.subjects.map((item) => {
            if (item.subjectactive == "d-flex justify-content-between align-items-center active") {
                item.chapters.map((chdata) => {
                    if (chdata.chapteractive == "d-flex justify-content-between align-items-center active") {
                        chaptername = chdata.chapter;

                    }

                })
            }

        })



        let options;
        if (this.state.search.length) {
            const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
            options = courses.filter(option =>
                option.match(searchPattern)
            );
        } else {
            options = courses;
        }

        console.log("globals345", this.props.globals.exams);


        let tcq = 0;
        this.props.stateData.subjects.map((item) => {
            tcq = tcq + item.qcount
        });

        let totalExamCount3 = "";
        let xl = 4;
        let lg = 4;
        if (this.props.stateData.examtype == "3" || this.props.stateData.examtype == "6" || this.props.stateData.examtype == "7" || this.props.stateData.examtype == "8") {
            xl = 2;
            lg = 2;

            let eduration = this.props.globals.exams.find((a) => a.id == this.props.stateData.examtype);
            console.log("eduration", eduration);

            if (eduration != undefined) {
                totalExamCount3 = parseFloat(eduration.avg_question_time) * parseFloat(tcq);
            }
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
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.submitError1}
                                    </Form.Text>
                                    <Form>
                                        <Row className="align-items-top">
                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group controlId="formClass">
                                                    <Form.Label>Question Bank Questions</Form.Label>
                                                    <div className="d-flex align-items-center">
                                                        <Card as={Card.Body} className="w-100 p-2">
                                                            <Form.Check type="checkbox" id="checkbox1" custom>
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    name="questionbankquestions"
                                                                    value=""
                                                                    checked={this.props.stateData.questionbankquestions}
                                                                    onClick={this.props.phandleInputChange} />
                                                                <Form.Check.Label htmlFor="checkbox1">In Percentage (%)</Form.Check.Label>
                                                            </Form.Check>
                                                        </Card>
                                                        {this.props.stateData.questionbankquestions == true ? (
                                                            <React.Fragment><Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                                {/* <div className="percentage">70%</div>    */}
                                                                <Form.Control
                                                                    autoComplete="off"
                                                                    maxLength={3}
                                                                    type="text"
                                                                    name="questionbankpercentage"
                                                                    value={this.props.stateData.questionbankpercentage}
                                                                    className="p-0 border-0"
                                                                    onChange={this.props.phandleInputChange}
                                                                    placeholder={'%'} />

                                                            </Card>
                                                            </React.Fragment>) : ("")}
                                                    </div>
                                                </Form.Group>
                                                <Form.Text className="form-text text-danger">
                                                    {this.props.stateData.formErrors.questionbankpercentage}
                                                </Form.Text>
                                                {/* <Form.Group controlId="formExam" className="d-flex align-items-center">
                                                    <Card as={Card.Body} className="w-100 p-2">
                                                        <Form.Check type="checkbox" id="checkbox2" custom>
                                                            <Form.Check.Input type="checkbox" />
                                                            <Form.Check.Label htmlFor="checkbox2">Old Public Exam Question Paper</Form.Check.Label>
                                                        </Form.Check>
                                                    </Card>
                                                    <Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                        <div className="percentage">70%</div>
                                                    </Card>
                                                </Form.Group> */}
                                                {/* <Form.Group controlId="formClass" className="d-flex align-items-center">
                                                    <Card as={Card.Body} className="w-100 p-2">
                                                        <Form.Check type="checkbox" id="checkbox3" custom>
                                                            <Form.Check.Input type="checkbox" />
                                                            <Form.Check.Label htmlFor="checkbox3">Own Added Questions</Form.Check.Label>
                                                        </Form.Check>
                                                    </Card>
                                                    <Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                        <div className="percentage">10%</div>
                                                    </Card>
                                                </Form.Group> */}
                                                <Form.Group controlId="formClass">
                                                    <Form.Label>Own Added Questions</Form.Label>
                                                    <div className="d-flex align-items-center">
                                                        <Card as={Card.Body} className="w-100 p-2">
                                                            <Form.Check type="checkbox" id="checkbox3" custom>
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    name="ownaddedquestions"
                                                                    value=""
                                                                    onChange={this.props.phandleInputChange} />
                                                                <Form.Check.Label htmlFor="checkbox3">In Percentage (%)</Form.Check.Label>
                                                            </Form.Check>
                                                        </Card>
                                                        {this.props.stateData.ownaddedquestions == true ? (<React.Fragment>
                                                            <Card as={Card.Body} className="p-2" style={{ width: 50, height: 43 }}>
                                                                {/* <div className="percentage">10%</div> */}
                                                                <Form.Control
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    maxLength={3}
                                                                    name="ownaddedpercentage"
                                                                    value={this.props.stateData.ownaddedpercentage}
                                                                    className="p-0 border-0"
                                                                    onChange={this.props.phandleInputChange}
                                                                    placeholder={'%'} />

                                                            </Card>
                                                        </React.Fragment>) : ("")}
                                                    </div>
                                                </Form.Group>
                                                <Form.Text className="form-text text-danger">
                                                    {this.props.stateData.formErrors.ownaddedpercentage}
                                                </Form.Text>


                                                <div className="d-flex align-items-center mb-2 px-2">
                                                    <div className="w-100 ml-2">
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input

                                                                type="radio"
                                                                id="generatetype1"
                                                                value="1"
                                                                name="generatetype"
                                                                className="custom-control-input"
                                                                onChange={this.props.phandleInputChange}
                                                                defaultChecked={true}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="generatetype1"
                                                            >
                                                                Auto Generate
              </label>
                                                        </div>
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input
                                                                type="radio"
                                                                id="generatetype2"
                                                                value="2"
                                                                name="generatetype"
                                                                className="custom-control-input"
                                                                onChange={this.props.phandleInputChange}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="generatetype2"
                                                            >
                                                                Select from Question Bank
              </label>
                                                        </div>
                                                    </div>
                                                </div>




                                            </Col>

                                            <Col lg={6} md={12} sm={12}>
                                                <Form.Group className="mb-4" controlId="formCategory">
                                                    <Form.Label>Exam Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Exam Name"
                                                        name="exam_name"
                                                        onChange={this.props.phandleInputChange}
                                                        autoComplete="off"
                                                        value={this.props.stateData.exam_name}
                                                    />
                                                    <Form.Text className="form-text text-danger">
                                                        {this.props.stateData.formErrors.exam_name}
                                                    </Form.Text>
                                                </Form.Group>
                                                {this.props.stateData.examtype == "5" ? (
                                                    <Form.Group className="mb-4" controlId="formCategory">
                                                        <Form.Label>Exam</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.otherexamvalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="otherexam"
                                                            options={this.examoptions()}
                                                            placeholderName={'Exam'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </Form.Group>
                                                ) : ("")}
                                                {(this.props.stateData.examtype == "2" || this.props.stateData.otherexam == "2") ? (
                                                    <Form.Group className="mb-4" controlId="formCategory">
                                                        <Form.Label>Exam Type</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.examtypemavalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="examtypema"
                                                            options={examtypema}
                                                            placeholderName={'Exam Type'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </Form.Group>) : ("")}
                                                <Form.Group className="mb-4" controlId="formCategory">
                                                    <Form.Label>Class</Form.Label>
                                                    <SelectDropDown
                                                        stateData={this.props.stateData.classvalue}
                                                        handleChange={this.props.pselecthandleInputChange}
                                                        name="class"
                                                        options={this.getClassData()}
                                                        placeholderName={'Class'}
                                                        dropdownIndicator={{ DropdownIndicator }}
                                                    //defaultValue={this.defaultclassGetDataFunction()}
                                                    />
                                                </Form.Group>
                                                {this.props.stateData.generatetype == "1" ? (
                                                    <Form.Group className="mb-4" controlId="formCategory">
                                                        <Form.Check type="checkbox" id="advancedcheckboxOne" custom>
                                                            <Form.Check.Input type="checkbox"
                                                                checked={this.props.stateData.advancedoptions}
                                                                name="advancedoptions"
                                                                onChange={this.props.phandleInputChange}
                                                            />
                                                            <Form.Check.Label
                                                                htmlFor="advancedcheckboxOne"
                                                            >Advanced Options</Form.Check.Label>
                                                        </Form.Check>
                                                    </Form.Group>
                                                ) : ("")}

                                            </Col>

                                            {/* <Col lg={6} md={12} sm={12}>
                                                <Form.Group controlId="formCategory">
                                                    <SelectDropDown options={noofsets} placeholderName={'No of Sets'} dropdownIndicator={{ DropdownIndicator }} />
                                                </Form.Group>
                                            </Col> */}
                                        </Row>
                                    </Form>
                                </Card>
                            </li>
                            {this.props.stateData.generatetype == "1" && this.props.stateData.questionbankquestions == true ? (
                                <li>
                                    <h6 className="mb-3 title text-uppercase">Syllabus - Selection</h6>
                                    <Card className="border-0 shadow-sm custom_setup">
                                        <Card.Header className="bg-white">
                                            <Row className="align-items-center">
                                                <Col xl={4} lg={4} md={6} sm={12} xs={12} className="my-2 d-flex align-items-center">
                                                    <div className="mr-2">Class:</div>
                                                    <ButtonGroup aria-label="Basic example">
                                                        {this.state?.classData?.map((classmapData) => (<Button onClick={(e) => this.syllabusClassFun(e, classmapData.id)} variant={classmapData.active}>{classmapData.class}</Button>))}

                                                        {/* <Button variant="outline-secondary">XII-2</Button> */}
                                                    </ButtonGroup>
                                                </Col>
                                                <Col xl={4} lg={4} md={4} sm={12} xs={12} className="text-xl-center text-lg-center">
                                                    <p className="text-muted my-2">Total Chapter Selected: {this.totalchapters(this.props.stateData.subjects)}</p>
                                                </Col>
                                                {this.props.stateData.examtype == "3" || this.props.stateData.examtype == "6" || this.props.stateData.examtype == "7" || this.props.stateData.examtype == "8" ? (
                                                    <Col xl={4} lg={4} md={12} sm={12} xs={12} className="text-xl-right text-lg-right">
                                                        <Form.Group className="my-2 d-flex align-items-center">
                                                            <Form.Label className="mr-4">Max Question Time (Sec/Q) </Form.Label>
                                                            <Form.Control
                                                                style={{ width: 60 }}
                                                                type="text"
                                                                placeholder="duration"
                                                                name="timeduration"
                                                                onChange={this.props.phandleInputChange}
                                                                autoComplete="off"
                                                                value={this.props.stateData.timeduration}
                                                            />
                                                            <Form.Text className="form-text text-danger">
                                                                {this.props.stateData.formErrors.timeduration}
                                                            </Form.Text>

                                                        </Form.Group>
                                                    </Col>) : ("")}

                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className="g-0 mb-4">

                                                <Card as={Col} xl={xl} lg={lg} md={12}>
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
                                                                {this.props.stateData?.subjects?.map((subjectmapData) => (
                                                                    <li className={subjectmapData.subjectactive} onClick={(e) => this.props.psubjectFunction(subjectmapData.id)}>
                                                                        <div className="subName">{subjectmapData.subject}</div>
                                                                        <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                                    </li>))}
                                                            </ul>
                                                        </Scrollbars>
                                                    </Card.Body>
                                                </Card>
                                                {this.props.stateData.examtype == "3" || this.props.stateData.examtype == "6" || this.props.stateData.examtype == "7" || this.props.stateData.examtype == "8" ? (
                                                    <Card as={Col} xl={xl} lg={lg} md={12}>
                                                        <Card.Header className="bg-white">
                                                            <Card.Title className="mb-0 h6">Q's Count</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body className="p-2">
                                                            <Scrollbars style={{ height: 160 }}
                                                                {...this.props}
                                                                renderThumbVertical={renderThumb}
                                                                autoHide
                                                                autoHideTimeout={500}
                                                                autoHideDuration={200}>
                                                                <Form>
                                                                    {this.props.stateData?.subjects?.map((item) => (
                                                                        <div>
                                                                            {item.subjectactive == "d-flex justify-content-between align-items-center active" ? (

                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {/* {item.totpererr} */}
                                                                                    </Form.Text>
                                                                                    <Form.Group as={Row} controlId="formChapter1">
                                                                                        {/* <Form.Label column sm="7"> Count  </Form.Label> */}
                                                                                        <Col sm="12">

                                                                                            <Form.Control
                                                                                                value={item.qcount}
                                                                                                type="text"
                                                                                                name="percentage"
                                                                                                placeholder=""
                                                                                                autoComplete="off"
                                                                                                onChange={(e) => this.props.squestioncount(e, item.id)}
                                                                                                maxLength="2"
                                                                                            />
                                                                                            <Form.Text className="form-text text-danger">
                                                                                                {item.totError}
                                                                                            </Form.Text>
                                                                                        </Col>
                                                                                    </Form.Group>



                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Scrollbars>
                                                        </Card.Body>
                                                    </Card>) : ("")}



                                                <Card as={Col} xl={4} lg={4} md={12}>
                                                    <Card.Header className="bg-white">
                                                        <Card.Title className="mb-0 h6">Chapters</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">
                                                        <Scrollbars style={{ height: 160 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <ul className="list-unstyled chapter-list m-0">
                                                                {this.props.stateData?.subjects?.map((subjectmapData) => {
                                                                    let mchaptermapData = [];
                                                                    if (subjectmapData.subjectactive == "d-flex justify-content-between align-items-center active") {

                                                                        if (this.state.syllabusclass != "0") {
                                                                            console.log("this.state.syllabusclass", this.state.syllabusclass);
                                                                            mchaptermapData = subjectmapData.chapters.filter((a) => a.class == this.state.syllabusclass);
                                                                            console.log("filter", mchaptermapData);
                                                                        }
                                                                        else {
                                                                            mchaptermapData = subjectmapData.chapters;
                                                                            console.log("filter2", mchaptermapData);
                                                                        }
                                                                    }

                                                                    return (
                                                                        <React.Fragment>
                                                                            {subjectmapData.subjectactive == "d-flex justify-content-between align-items-center active" ? (
                                                                                <React.Fragment>
                                                                                    {mchaptermapData?.map((chaptermapData) => {
                                                                                        return (
                                                                                            <li className={chaptermapData.chapteractive} onClick={(e) => this.props.pchapterFunction(subjectmapData.id, chaptermapData.id)}>
                                                                                                <div className="names">{chaptermapData.chapter}</div>
                                                                                                <div className="counts">({chaptermapData.topics.length})</div>
                                                                                            </li>)
                                                                                    })}
                                                                                </React.Fragment>
                                                                            ) : ("")}
                                                                        </React.Fragment>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Scrollbars>
                                                    </Card.Body>
                                                </Card>
                                                <Card as={Col} xl={4} lg={4} md={12}>
                                                    <Card.Header className="bg-white">
                                                        <Card.Title className="mb-0 h6">{chaptername} - Topic</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="p-2">
                                                        <Scrollbars style={{ height: 160 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <ul className="list-unstyled chap-topic-list m-0 pl-1">
                                                                {this.props.stateData?.subjects?.map((subjectmapData) => (
                                                                    <React.Fragment>
                                                                        {subjectmapData.subjectactive == "d-flex justify-content-between align-items-center active" ? (
                                                                            <React.Fragment>
                                                                                {subjectmapData?.chapters?.map((chaptermapData) => (
                                                                                    <React.Fragment>
                                                                                        {chaptermapData.chapteractive == "d-flex justify-content-between align-items-center active" ? (
                                                                                            <React.Fragment>
                                                                                                {chaptermapData?.topics?.map((topicmapData, index) => (
                                                                                                    <React.Fragment>
                                                                                                        {index == "0" ? (
                                                                                                            <React.Fragment>
                                                                                                                <li>
                                                                                                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                                                                                                        <Form.Check.Input checked={chaptermapData.checkedall} type="checkbox" onClick={(e) => this.props.ptopiccheckallFunction(e, subjectmapData.id, chaptermapData.id)} />
                                                                                                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                                                                                    </Form.Check>
                                                                                                                </li>
                                                                                                                <li>
                                                                                                                    <Form.Check type="checkbox" id={"checkboxOne" + index} custom>
                                                                                                                        <Form.Check.Input checked={topicmapData.checked} type="checkbox" onClick={(e) => this.props.ptopicFunction(e, subjectmapData.id, chaptermapData.id, topicmapData.id)} />
                                                                                                                        <Form.Check.Label htmlFor={"checkboxOne" + index}>{topicmapData.topic}</Form.Check.Label>
                                                                                                                    </Form.Check>
                                                                                                                </li>
                                                                                                            </React.Fragment>
                                                                                                        ) : (<li>
                                                                                                            <Form.Check type="checkbox" id={"checkboxOne" + index} custom>
                                                                                                                <Form.Check.Input checked={topicmapData.checked} type="checkbox" onClick={(e) => this.props.ptopicFunction(e, subjectmapData.id, chaptermapData.id, topicmapData.id)} />
                                                                                                                <Form.Check.Label htmlFor={"checkboxOne" + index}>{topicmapData.topic}</Form.Check.Label>
                                                                                                            </Form.Check>
                                                                                                        </li>)}
                                                                                                    </React.Fragment>

                                                                                                ))}
                                                                                            </React.Fragment>
                                                                                        ) : ("")}
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </React.Fragment>
                                                                        ) : ("")}
                                                                    </React.Fragment>
                                                                ))}


                                                            </ul>
                                                        </Scrollbars>
                                                    </Card.Body>
                                                </Card>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </li>
                            ) : ("")}

                            {/* {this.props.stateData.examtype=="3"?(
                                <li>
                                <h6 className="mb-3 title text-uppercase">Subject Wise Questions - Selection</h6>
                                <Card className="border-0 shadow-sm custom_setup">
                                    <Card.Header className="bg-white">
                                        <Row className="align-items-center">
                                            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="my-2 d-flex align-items-center">
                                               <div className="mr-2">Time Duration :</div>
                                                 <Form.Group className="mb-4" controlId="formCategory">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Exam Name"
                                                        name="timeduration"
                                                        onChange={this.props.phandleInputChange}
                                                        autoComplete="off"
                                                        value={this.props.stateData.timeduration}
                                                    />
                                                    <Form.Text className="form-text text-danger">
                                                        {this.props.stateData.formErrors.timeduration}
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                            
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="g-0 mb-4">
                                            <Card as={Col} xl={6} lg={6} md={12}>
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
                                                            {this.props.stateData.questioncountsubjects.map((subjectmapData) => (
                                                                <li className={subjectmapData.subjectactive} onClick={(e) => this.props.questioncountsubjectFunction(subjectmapData.id)}>
                                                                    <div className="subName">{subjectmapData.subject}</div>
                                                                    <div className="arrow"><i className="fal fa-arrow-right" /></div>
                                                                </li>))}
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={6} lg={6} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Selected Count</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <Form>
                                                                    {this.props.stateData.questioncountsubjects.map((item) => (
                                                                        <div>
                                                                            {item.subjectactive == "d-flex justify-content-between align-items-center active" ? (

                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        
                                                                                    </Form.Text>
                                                                                    <Form.Group as={Row} controlId="formChapter1">
                                                                                            <Form.Label column sm="7"> Count  </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={item.qcount}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder=""
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.props.squestioncount(e, item.id)}
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {item.totError}
                                                                                                </Form.Text>
                                                                                            </Col>
                                                                                        </Form.Group>


                                                                                    
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </li>
                            ):("")} */}
                            {(this.props.stateData.questionbankquestions == true && this.props.stateData.generatetype == "2") ? (
                                <ParentQuestionBankComponent

                                    globals={this.props}
                                    stateData={this.props.stateData}
                                    pselecthandleInputChange={this.props.pselecthandleInputChange}
                                    pQuestionFunction={this.props.pQuestionFunction}
                                    handleMultipleSelectInputChange={this.props.handleMultipleSelectInputChange}
                                />
                            ) : ("")}

                            {(this.props.stateData.ownaddedquestions == true && this.props.stateData.ownaddedpercentage > 0) ? (
                                <ParentQuestionComponent
                                    globals={this.props}
                                    stateData={this.props.stateData}
                                    pselecthandleInputChange={this.props.pselecthandleInputChange}
                                    pQuestionFunction={this.props.pQuestionFunction}
                                    handleMultipleSelectInputChange={this.props.handleMultipleSelectInputChange}
                                />
                                
                            ) : ("")}
                            {this.props.stateData.advancedoptions == true ? (
                                <React.Fragment>
                                    <li>
                                        <h6 className="heading text-uppercase mb-3">Type of Question - Selection</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0 custom_setup">
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
                                                                <ul className="list-unstyled subject-list p-0 m-0">
                                                                    {this.props.stateData?.advancedsubjects?.map((getsub, index) => (
                                                                        <li
                                                                            className={getsub.subjectactive1}
                                                                            onClick={() => this.props.subjectFunction1(getsub.id, "qtype")}
                                                                        >{getsub.subject} </li>))}
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
                                                                <ul className="list-unstyled chap-topic-list m-0 pl-1">
                                                                    {this.props.stateData?.advancedsubjects?.map((chData) => (
                                                                        <div>
                                                                            {chData.subjectactive1 == "d-flex justify-content-between align-items-center active" ? (
                                                                                <div>
                                                                                    {chData?.questionTypes?.map((cData, index) => (

                                                                                        <li className={cData.active}>
                                                                                            <Form.Check type="checkbox" id={"typeofcheckboxOne" + "_" + index + "_" + chData.id} custom>
                                                                                                <Form.Check.Input type="checkbox" checked={cData.checked}
                                                                                                    onClick={(e) => this.props.questiontypeFunction(e, chData.id, cData.id)} />
                                                                                                <Form.Check.Label htmlFor={"typeofcheckboxOne" + "_" + index + "_" + chData.id}>{cData.questiontype}</Form.Check.Label>
                                                                                            </Form.Check>
                                                                                        </li>

                                                                                    ))}

                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Question Types</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.props?.stateData?.advancedsubjects?.map((chData) => (
                                                                        <div>
                                                                            {chData.subjectactive1 == "d-flex justify-content-between align-items-center active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr1}
                                                                                    </Form.Text>
                                                                                    {chData?.questionTypes?.map((cData) => (
                                                                                        <div>
                                                                                            {cData.checked == true ? (
                                                                                                <Form.Group as={Row} controlId="formChapter1">
                                                                                                    <Form.Label column sm="7"> {cData.questiontype} (%) </Form.Label>
                                                                                                    <Col sm="5">

                                                                                                        <Form.Control
                                                                                                            value={cData.percentage}
                                                                                                            type="text"
                                                                                                            name="percentage"
                                                                                                            placeholder="percentage"
                                                                                                            autoComplete="off"
                                                                                                            onChange={(e) => this.props.percentageFun1(e, chData.id, cData.id)}
                                                                                                        />
                                                                                                        <Form.Text className="form-text text-danger">
                                                                                                            {cData.totperError}
                                                                                                        </Form.Text>
                                                                                                    </Col>
                                                                                                </Form.Group>) : ("")}
                                                                                        </div>

                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                    <li>
                                        <h6 className="heading text-uppercase mb-3">Complexity</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0 custom_setup">
                                            <Row className="g-0">
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
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
                                                                <ul className="list-unstyled subject-list p-0 m-0">
                                                                    {this.props.stateData.advancedsubjects.map((getsub) => (
                                                                        <li
                                                                            className={getsub.subjectactive2}
                                                                            onClick={() => this.props.subjectFunction1(getsub.id, "comp")}
                                                                        >{getsub.subject} </li>))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Complexity</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.props.stateData.advancedsubjects.map((chData) => (
                                                                        <div>
                                                                            {chData.subjectactive2 == "d-flex justify-content-between align-items-center active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr2}
                                                                                    </Form.Text>
                                                                                    {chData.complexity.map((cData) => (


                                                                                        <Form.Group as={Row} controlId="formChapter1">
                                                                                            <Form.Label column sm="7"> {cData.complexity} (%) </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={cData.percentage}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder="percentage"
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.props.percentageFun2(e, chData.id, cData.id)}
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {cData.totperError}
                                                                                                </Form.Text>
                                                                                            </Col>
                                                                                        </Form.Group>


                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                    <li>
                                        <h6 className="heading text-uppercase mb-3">Question Theory</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0 custom_setup">
                                            <Row className="g-0">
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
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
                                                                <ul className="list-unstyled subject-list p-0 m-0">

                                                                    {this.props.stateData.advancedsubjects.map((getsub, index) => (
                                                                        <li
                                                                            className={getsub.subjectactive3}
                                                                            onClick={() => this.props.subjectFunction1(getsub.id, "theory")}
                                                                        >{getsub.subject} </li>))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Question Theory</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.props.stateData.advancedsubjects.map((chData) => (
                                                                        <div>
                                                                            {chData.subjectactive3 == "d-flex justify-content-between align-items-center active" ? (

                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr3}
                                                                                    </Form.Text>
                                                                                    {chData.questionTheory.map((cData, index) => (


                                                                                        <Form.Group as={Row} controlId="formChapter1">
                                                                                            <Form.Label column sm="7"> {cData.question_theory} (%) </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={cData.percentage}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder="percentage"
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.props.percentageFun3(e, chData.id, cData.id)}
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {cData.totperError}
                                                                                                </Form.Text>
                                                                                            </Col>
                                                                                        </Form.Group>


                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                </React.Fragment>
                            ) : ("")}

                        </ul>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Class </th>
                                            <th>: {this.props.stateData.classvalue.label}</th>
                                        </tr>
                                        <tr>
                                            <th>Exam </th>
                                            <th>: {this.props.stateData.examtypevalue.label} </th>
                                        </tr>
                                        {this.props.stateData.examtype != "" ? (
                                            <React.Fragment>
                                                {this.props.stateData.examtype == "1" ? (
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
                                                ) : this.props.stateData.examtype == "3" || this.props.stateData.examtype == "6" || this.props.stateData.examtype == "7" || this.props.stateData.examtype == "8" ? (
                                                    <React.Fragment>
                                                        <tr>
                                                            <th> Duration </th>
                                                            <th>: {Math.ceil(totalExamCount3)}min </th>
                                                        </tr>
                                                        <tr>
                                                            <th>No Of Questions </th>
                                                            <th>: {tcq}</th>
                                                        </tr>
                                                    </React.Fragment>
                                                ) : (
                                                            <React.Fragment>
                                                                {this.props.stateData.examtypema == "1" ? (
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
                                            </React.Fragment>
                                        ) : ("")}



                                    </tbody>
                                </Table>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <Scrollbars style={{ height: "44vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.props.stateData.subjects.map((subjectmapData) => (
                                        <React.Fragment>{subjectmapData.checked == true ? (
                                            <Card className="border-0 bg-light">
                                                <Card.Header className="bg-secondary">
                                                    <Card.Title className="mb-0 text-white">{subjectmapData.subject}</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-3">
                                                    <Scrollbars style={{ height: "250px" }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        {subjectmapData.chapters.map((chaptermapData) => {
                                                            let topiccount = "";
                                                            if (chaptermapData.checked == true) {
                                                                topiccount = chaptermapData.topics.filter((b) => b.checked == true)
                                                            }
                                                            return (
                                                                <React.Fragment>{chaptermapData.checked == true ? (
                                                                    <Card className="single-list-card border-0 p-2">
                                                                        <Card.Title className="h6">{chaptermapData.chapter}-{topiccount.length}</Card.Title>
                                                                        <ul className="list-unstyled topic-list bg-light m-0">
                                                                            {chaptermapData.topics.map((topicmapData) => (
                                                                                <React.Fragment>{topicmapData.checked == true ? (<li>{topicmapData.topic}</li>) : ("")}</React.Fragment>
                                                                            ))}
                                                                        </ul>
                                                                    </Card>) : ("")}</React.Fragment>
                                                            )
                                                        })}
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>) : ("")}</React.Fragment>
                                    ))}
                                    {this.props.stateData.ownaddedquestions == true && this.props.stateData.ownaddedpercentage > 0 ? (
                                        <Card className="border-0 bg-light mb-2">
                                            <Card.Header className="bg-secondary">
                                                <Card.Title className="h6 mb-0 text-white">Own Added Questions</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="p-3">
                                                <ul className="list-unstyled chapter-list bg-light m-0">
                                                    {array.map((chaptermapdata) => {
                                                        if (chaptermapdata.ownedarray.length > 0) {
                                                            return (<li><Link to="#">{chaptermapdata.chapter}-{chaptermapdata.ownedarray.length}</Link></li>)
                                                        }
                                                    })}
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    ) : ("")}
                                    {this.props.stateData.generatetype == "2" ? (
                                        <React.Fragment>
                                            {this.props.stateData.questionbankquestions == true && this.props.stateData.questionbankpercentage > 0 ? (
                                                <Card className="border-0 bg-light mb-2">
                                                    <Card.Header className="bg-secondary">
                                                        <Card.Title className="h6 mb-0 text-white">Question Bank Added Questions</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body className="p-3">
                                                        <ul className="list-unstyled chapter-list bg-light m-0">
                                                            {array.map((chaptermapdata) => {
                                                                if (chaptermapdata.questionbarray.length > 0) {
                                                                    return (<li><Link to="#">{chaptermapdata.chapter}-{chaptermapdata.questionbarray.length}</Link></li>)
                                                                }
                                                            })}
                                                        </ul>
                                                    </Card.Body>
                                                </Card>
                                            ) : ("")}
                                        </React.Fragment>
                                    ) : ("")}


                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0">
                                <Button variant="primary" className="px-4 text-uppercase w-100" onClick={this.props.ParentgenerateQuestionPaper}>Generate question paper</Button>
                                {/* <Button variant="primary" className="px-4 text-uppercase" className="w-100" onClick={() => this.manageexams()}>Go to manage exams</Button> */}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                {/* <QuestionModal show={this.state.modalShow} showothermodal={() => this.setState({ modalShowTwo: true })} onHide={() => this.setState({ modalShow: false })} />
                <DownloadQuestionPaperModal show={this.state.modalShowTwo} onHide={() => this.setState({ modalShowTwo: false })} /> */}
            </div>
        )
    }
}

export default withRouter(OwnQuestionCustomSection);
