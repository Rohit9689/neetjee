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

import './_ownquestiontype.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import parse, { domToReact } from 'html-react-parser';
import PreloaderTwo from '../../../../preloader/PreloaderTwo';
import CutomCategoryTotalQuestionsModal from './CutomCategoryTotalQuestionsModal';
import { MultiSelect } from "react-multi-select-component";
import './_ownquestiontype.scss'
import QuestionComponent from './QuestionComponent';
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

const FETCH_INSTITUTIONQUESTIONS = gql` 
query($subject:String!,
$chapter:String!,
$question_type:String,
$question_theory:String,
$complexity: String,
    $institute_id: Int!,
    $page: Int,
    $type: Int) {
    getInstituteQuestions(
        subject: $subject,
        chapter: $chapter,
        question_type: $question_type,
        question_theory: $question_theory,
        complexity:$complexity,
        institute_id: $institute_id,
        page:$page,
        type: $type){
            id
            subject
            question
            chapter
            topic
            complexity
            question_theory
            qtype
            mat_question
            compquestion
            list1type
            list2type
            subject_name
            chapter_name
            topic_name
            option1
            option2
            option3
            option4
            answer
        
    }
}

`;
class ParentQuestionComponent extends Component {
    constructor(props) {
        super(props)
        // const getinsQuestions = props.getInstituteQuestions.map((item) => {
        //     return { ...item, checked: true }
        // })
        console.log("ParentQuestionComponent", props);
        let clsdata = (props.globals?.globals?.classes || []).map((item) => {
            if (item.id == "1") {
                return { ...item, active: "outline-secondary active" }
            }
            return { ...item, active: "outline-secondary" }

        })
        this.state = {
            modalShow: false,
            classData1: clsdata,
            owedqfilterclass: "1",
            searchsubject: "",
            page: 1

        }
    }
    decodefun(data, id) {
        var decdata = "";
        try {
            decdata = decodeURIComponent(data);
        }
        catch (err) {
            console.log("Error Message:", err.message, id, data);
        }
        return decdata;
    }
    // QuestionFunction = (e, data) => {
    //     let Array = this.state.getInstituteQuestions.map((item) => {
    //         if (item.id == data) {
    //             if (e.target.checked == true) {
    //                 return { ...item, checked: true }
    //             }
    //             else {
    //                 return { ...item, checked: false }
    //             }
    //         }
    //         return { ...item }
    //     })
    //     this.setState({});

    // }
    ownedquestionClassFun1 = (e, data) => {
        console.log("owedqfilterclass", data);
        let classArray = (this.state.classData1 || []).map((item) => {
            if (item.id == data) {
                return { ...item, active: "outline-secondary active" }
            }
            else {
                return { ...item, active: "outline-secondary" }
            }

        })
        this.setState({ classData1: classArray, owedqfilterclass: data });
    }
    getquestiontypes() {
        let getArray = [];
        (this.props.globals?.globals?.questionTypes || []).map((questionData) => {
            const newObj = {
                value: questionData.id,
                label: questionData.questiontype
            }
            getArray.push(newObj);
        })
        return getArray;
    }
    applicationtheory() {
        let getArray = [];
        if ((this.props.globals?.globals?.questionTheory?.length || 0) > 0) {
            (this.props.globals?.globals?.questionTheory || []).map((theoryData) => {
                const newObj = {
                    value: theoryData.id,
                    label: theoryData.question_theory
                }
                getArray.push(newObj);
            })

            const newObj1 = {
                value: "0",
                label: "Select All"
            }
            getArray.unshift(newObj1);
        }

        return getArray;
    }
    complexity() {
        let getArray = [];
        if ((this.props.globals?.globals?.complexity?.length || 0) > 0) {
            (this.props.globals?.globals?.complexity || []).map((complexityData) => {
                const newObj = {
                    value: complexityData.id,
                    label: complexityData.complexity
                }
                getArray.push(newObj);
            })

            const newObj1 = {
                value: "0",
                label: "Select All"
            }
            getArray.unshift(newObj1);
        }

        return getArray;
    }
    getSubjects() {
        let getArray = [];
        const subjects = this.props.stateData?.subjects || [];
        for (let i = 0; i < subjects.length; i++) {
            let idata = subjects[i];
            const newObj = {
                value: idata.id,
                label: idata.subject
            }
            getArray.push(newObj);
        }
        return getArray;
    }
    getChapters() {
        let getArray = [];
        const subjects = this.props.stateData?.subjects || [];
        if (subjects.length > 0) {
            subjects.map((submap) => {
                if (submap.id == this.props.sid) {
                    const chapters = submap.chapters || [];
                    for (let i = 0; i < chapters.length; i++) {
                        let idata = chapters[i];
                        const newObj = {
                            value: idata.id,
                            label: idata.chapter
                        }
                        getArray.push(newObj);
                    }
                }
            })
        }
        return getArray;
    }
    handleChange = (e) => {
        this.setState({
            searchsubject: e.target.value
        });

    }
    onhide = () => {
        this.setState({
            modalShow: false,
        });

    }
    questionCount = () => {
        this.setState({
            modalShow: true,
        });
    }
    render() {
        console.log("parentQuestionComponent", "variables:", {
            subject: this.props.stateData.searchsubject,
            chapter: this.props.stateData.searchchapter,
            question_type: this.props.stateData.questiontypes.toString(),
            question_theory: this.props.stateData.applicationtheory,
            complexity: this.props.stateData.complexity,
            institute_id: parseInt(Cookies.get("institutionid")),
            page: 1,
            type: 0
        });
        const getInstituteQuestions = this.props.getInstituteQuestions;
        const loading3 = getInstituteQuestions.loading;
        const error3 = getInstituteQuestions.error;
        let qcountarr = [];
        (this.props.stateData?.subjects || []).map((smap) => {
            (smap.chapters || []).map((cmap) => {
                if (cmap.ownedarray && cmap.ownedarray.length > 0) {
                    qcountarr.push(...cmap.ownedarray);
                }

            })

        })
        //start question type data
        let qtypenewArray = [];
        (this.props.globals?.globals?.questionTypes || []).map((questionData) => {
            const newObj = {
                value: questionData.id,
                label: questionData.questiontype
            }
            qtypenewArray.push(newObj);
        })
        let qtypeselectall = true;
        let qtypelabelledBy = "Select";
        let qtypedisableSearch = false;
        if (qtypenewArray.length > 0) {
            qtypeselectall = true;
            qtypedisableSearch = false;
        }
        else {
            qtypedisableSearch = true;
            qtypeselectall = false;
            qtypelabelledBy = "No Options"
        }
        //end question type data
        console.log("qcountarr", getInstituteQuestions.getInstituteQuestions);
        if (loading3) {
            return (
                <React.Fragment>
                    <li>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="d-sm-flex justify-content-between align-items-center bg-white">
                                <h6>Own Added Questions</h6>
                                <Form.Group className="my-0 d-flex align-items-center">
                                    <Form.Label className="mr-2">Total Questions : <Link onClick={() => this.questionCount()} style={{ fontWeight: "bold" }}>{qcountarr.length}</Link></Form.Label>
                                </Form.Group>
                                <Form.Group className="my-0 d-flex align-items-center">
                                    <Form.Label className="mr-2">Weightage </Form.Label>
                                    <Form.Control style={{ width: 65 }} type="text" value={this.props.stateData.ownaddedpercentage + "%"}
                                        placeholder="%"
                                        disabled />
                                </Form.Group>
                            </Card.Header>
                            <Card.Body>
                                <div className="my-3 d-md-flex justify-content-between align-items-center">
                                    <h6>Filter</h6>
                                    <div className="d-flex align-items-center">
                                        <div className="mr-2">Class:</div>
                                        <ButtonGroup aria-label="Basic example">
                                            {(this.state.classData1 || []).map((classmapData) => (
                                                <Button onClick={(e) => this.ownedquestionClassFun1(e, classmapData.id)} variant={classmapData.active}>{classmapData.class}
                                                </Button>))}
                                            {/* <Button variant="outline-secondary">XII</Button> */}
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <Card as={Card.Body}>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="slectSubject">
                                                <Form.Label className="text-uppercase">Subject<span className="text-danger" style={{ fontSize: 14 }}>*</span></Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.searchsubjectvalue}
                                                    handleChange={this.props.pselecthandleInputChange}
                                                    name="searchsubject"
                                                    options={this.getSubjects()}
                                                    placeholderName={'Subject'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectChapters">
                                                <Form.Label className="text-uppercase">Chapters<span className="text-danger" style={{ fontSize: 14 }}>*</span></Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.searchchaptervalue}
                                                    handleChange={this.props.pselecthandleInputChange}
                                                    name="searchchapter"
                                                    options={this.getChapters()}
                                                    placeholderName={'Chapters'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectTypeofQuestions">
                                                <Form.Label className="text-uppercase">Type Of Questions</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Question types are selected.",
                                                        "selectSomeItems": qtypelabelledBy
                                                    }
                                                    }
                                                    disableSearch={qtypedisableSearch}
                                                    hasSelectAll={qtypeselectall}
                                                    options={qtypenewArray}
                                                    value={this.props.stateData.questiontypesvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "questiontypes")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectComplexity">
                                                <Form.Label className="text-uppercase">Complexity</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.complexityvalue}
                                                    handleChange={this.props.pselecthandleInputChange}
                                                    name="complexity"
                                                    options={this.complexity()}
                                                    placeholderName={'Complexity'} dropdownIndicator={{ DropdownIndicator }} />
                                            </Form.Group>

                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectApplicationTheory">
                                                <Form.Label className="text-uppercase">Application Theory</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.applicationtheoryvalue}
                                                    handleChange={this.props.pselecthandleInputChange}
                                                    name="applicationtheory"
                                                    options={this.applicationtheory()}
                                                    placeholderName={'Application Theory'} dropdownIndicator={{ DropdownIndicator }} />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </Card>

                                <div className="my-3 d-md-flex justify-content-between align-items-center">
                                    <h6>Questions</h6>
                                    <Form.Group className="my-2 d-flex align-items-center">
                                        <Form.Control style={{ width: 150 }} type="text" placeholder="Search" />
                                    </Form.Group>
                                </div>
                                <Card as={Card.Body} className="justify-content-center flex-row">
                                    <div class="spinner-border text-primary text-center"></div>
                                </Card>
                            </Card.Body>
                        </Card>
                    </li>
                </React.Fragment>
            )
        };
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        return (
            <QuestionComponent
                page={this.state.page}
                getInstituteQuestions={getInstituteQuestions.getInstituteQuestions}
                globals={this.props.globals}
                stateData={this.props.stateData}
                pselecthandleInputChange={this.props.pselecthandleInputChange}
                pQuestionFunction={this.props.pQuestionFunction}
                handleMultipleSelectInputChange={this.props.handleMultipleSelectInputChange}
            />
        )
    }
}



export default
    compose(

        graphql(FETCH_INSTITUTIONQUESTIONS,
            {
                options: props => ({

                    variables: {
                        subject: props.stateData.searchsubject,
                        chapter: props.stateData.searchchapter,
                        question_type: props.stateData.questiontypes.toString() || "",
                        question_theory: props.stateData.applicationtheory,
                        complexity: props.stateData.complexity,
                        institute_id: parseInt(Cookies.get("institutionid")),
                        page: 1,
                        type: 0
                    }
                }), name: "getInstituteQuestions"
            })

    )
        (ParentQuestionComponent);
