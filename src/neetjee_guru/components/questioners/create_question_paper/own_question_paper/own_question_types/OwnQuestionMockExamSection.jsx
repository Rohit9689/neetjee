import React, { Component } from 'react'
import { components } from 'react-select'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Table, Form, ButtonGroup, Button } from 'react-bootstrap'
import BreadcrumbCustomQuestionTwo from '../../../../breadcrumbs/BreadcrumbCustomQuestionTwo'
import SelectDropDown from '../../../../selectdropdown/SelectDropDown';
import QuestionModal from '../../QuestionModal';
import DownloadQuestionPaperModal from '../../../../download_question_paper/DownloadQuestionPaperModal';
import QuestionComponent from './QuestionComponent';
import { Link } from 'react-router-dom';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import parse, { domToReact } from 'html-react-parser';
import PreloaderTwo from '../../../../preloader/PreloaderTwo';
import DateTime from 'react-datetime'
import '../../../../../../react-datetime.css'

import './_ownquestiontype.scss'



// noofsets
export const noofsets = [
    { value: 1, label: '1' },
    { value: 2, label: '2' }
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
const examtypema = [
    { value: "1", label: "MAINS" },
    { value: "2", label: "ADVANCE" }
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
class OwnQuestionMockExamSection extends Component {
    constructor(props) {
        super(props)
        console.log("constructorprops", props);
        let clsdata = props.globals.classes.map((item) => {
            if (item.id == "1") {
                return { ...item, active: "outline-secondary active" }
            }
            return { ...item, active: "outline-secondary" }

        })


        this.state = {
            //displayqustions: array,
            ownedquestions: [],
            classData: clsdata,
            syllabusclass: "1",


            BreadcrumbCustomQuestionsSection: {
                img: require('../../../../../../images/Neet-Exam.png'),
                Title: 'Mock Question Paper',
                SubTitle: '',
                ClassSectionTotalStudents: "",
                complexity: "",
                subjects: ""
            },
            //modalShow: false,
            //modalShowTwo: false,
            search: [],
            chapterArray: []
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
                if (idata.id != "5") {
                    const newObj = {
                        value: idata.id,
                        label: idata.exam
                    }
                    getArray.push(newObj);
                }


            }

        }
        return getArray;
    }
    getBrachData() {
        console.log("getBrachData", this.props.globals.globalBranches);

        let getArray = [];
        if (this.props.globals.globalBranches.length > 0) {


            if (this.props.stateData.branch.toString() != "0") {
                for (let i = 0; i <= this.props.globals.globalBranches.length; i++) {
                    let idata = this.props.globals.globalBranches[i];

                    //console.log("idata",idata);


                    if (idata != undefined) {
                        let exam_idarr = idata.exam_id.split(",");

                        exam_idarr.map((emap) => {
                            if (emap == "5") {

                                const newObj = {
                                    value: idata.id,
                                    label: idata.branch_name
                                }
                                getArray.push(newObj);
                            }
                            else if (emap == this.props.stateData.examtype) {

                                const newObj = {
                                    value: idata.id,
                                    label: idata.branch_name
                                }
                                getArray.push(newObj);
                            }

                        })

                    }



                }
            }
            if (getArray.length > 0) {
                let newDefault = {
                    value: 0,
                    label: "ALL"
                }
                getArray.unshift(newDefault);
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
        if (this.props.stateData.section.toString() != "0") {
            if (this.props.stateData.branch != "") {
                for (let i = 0; i <= this.props.getSections.length; i++) {
                    let idata = this.props.getSections[i];
                    if (idata != undefined) {
                        this.props.stateData.branch.map((branchmapData) => {
                            if (branchmapData == "0") {
                                const newObj = {
                                    value: idata.id,
                                    label: idata.section_name
                                }
                                getArray.push(newObj);
                            } else if (branchmapData == idata.branch_id) {
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
        }

        if (getArray.length > 0) {

            let newDefault = {
                value: 0,
                label: "ALL"
            }
            getArray.unshift(newDefault);
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
    getOldpapers() {
        let getArray = [];
        console.log("this.props.getInstituteMocktests", this.props.getInstituteMocktests);
        if (this.props.stateData.examtype != "") {
            for (let i = 0; i <= this.props.getInstituteMocktests.length; i++) {
                let idata = this.props.getInstituteMocktests[i];
                if (idata != undefined) {
                    if (this.props.stateData.examtype == "1") {
                        if (idata.sub_exam_type == "0") {
                            
                            const newObj = {
                                value: idata.mocktest_id,
                                label: idata.exam_name
                            }
                            getArray.push(newObj);
                        }
                    }
                    if (this.props.stateData.examtype == "2") {
                        if (this.props.stateData.examtypema == idata.sub_exam_type) {
                            
                            const newObj = {
                                value: idata.mocktest_id,
                                label: idata.exam_name
                            }
                            getArray.push(newObj);
                        }

                    }


                }
            }
        }

        return getArray;
    }
    render() {
        var yesterday = DateTime.moment().subtract(1, 'day');

        var valid = function (current) {
            return current.isAfter(yesterday);
        };

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
                                {this.props.stateData.spinnerStatus == "1" ? (
                                    <Card as={Card.Body} className="border-0 shadow-sm justify-content-center flex-row">
                                        <div class="spinner-border text-primary text-center"></div>
                                    </Card>) : (<Card as={Card.Body} className="border-0 shadow-sm">
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.currentStep == "5" ? (
                                                "Mock Question Paper Generated Successfully"
                                            ) : (this.props.stateData.submitError1)}

                                        </Form.Text>
                                        <Form>
                                            <Row className="align-items-top">
                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Exam Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Exam Name"
                                                            name="exam_name"
                                                            onChange={this.props.parenthandleInputChange}
                                                            autoComplete="off"
                                                            value={this.props.stateData.exam_name}
                                                        />
                                                        <Form.Text className="form-text text-danger">
                                                            {this.props.stateData.formErrors.exam_name}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="align-items-top">

                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Exam</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.examtypevalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="examtype"
                                                            options={this.getexamType()}
                                                            placeholderName={'Exam Type'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                {this.props.stateData.examtype == "2" ? (
                                                    <Col lg={6} md={12} sm={12}>
                                                        <Form.Group controlId="formCategory">
                                                            <Form.Label>Exam Type</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.examtypemavalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="examtypema"
                                                                options={examtypema}
                                                                placeholderName={'Exam Type'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                    </Col>) : ("")}

                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Mock Papers</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.oldpapersvalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="oldpapers"
                                                            options={this.getOldpapers()}
                                                            placeholderName={'Mock papers'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Branch</Form.Label>
                                                        <Select maxMenuHeight={150}
                                                            name="branch"
                                                            isMulti
                                                            options={this.getBrachData()}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            placeholder="Branch"
                                                            onChange={this.props.branchhandleMultipleSelectInputChange}
                                                        />

                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Class</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.classvalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="class"
                                                            options={this.getClassData()}
                                                            placeholderName={'Class'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col lg={{ span: 6, offset: 6 }} md={12} sm={12}> */}
                                                <Col lg={6} md={12} sm={12}>
                                                    <Form.Group controlId="formCategory">
                                                        <Form.Label>Section</Form.Label>
                                                        <Select maxMenuHeight={150}
                                                            placeholder="Section"
                                                            name="section"
                                                            isMulti
                                                            options={this.getSectionData()}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select section"
                                                            onChange={this.props.sectionhandleMultipleSelectInputChange}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                                    <Form.Label>Start Date</Form.Label>
                                                    <DateTime
                                                        name="startdate"
                                                        dateFormat="DD-MM-YYYY"
                                                        inputProps={{ placeholder: 'Start Date' }}
                                                        onChange={this.props.parentpdatefunction}
                                                        isValidDate={valid}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} lg={6} md={12} sm={12} controlId="EndDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <DateTime
                                                        name="enddate"
                                                        onChange={this.props.parentpdatefunctionend}
                                                        dateFormat="DD-MM-YYYY"
                                                        inputProps={{ placeholder: 'End Date' }}
                                                        isValidDate={valid}
                                                    />
                                                </Form.Group>

                                            </Row>
                                        </Form>
                                    </Card>)}
                            </li>
                        </ul>
                    </Col >
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
                                <Scrollbars style={{ height: "48vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0">
                                <Button variant="primary" className="px-4 text-uppercase" className="w-100" onClick={this.props.spinnerStatus}>Generate question paper</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row >

            </div >
        )
    }
}
export default (OwnQuestionMockExamSection);