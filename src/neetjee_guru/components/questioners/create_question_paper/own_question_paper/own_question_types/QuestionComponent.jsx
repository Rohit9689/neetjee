import React, { Component } from 'react'
import { components } from 'react-select'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Table, Form, ButtonGroup, Button } from 'react-bootstrap'
import BreadcrumbCustomQuestionTwo from '../../../../breadcrumbs/BreadcrumbCustomQuestionTwo'
import SelectDropDown from '../../../../selectdropdown/SelectDropDown';
import QuestionModal from '../../QuestionModal';
import DownloadQuestionPaperModal from '../../../../download_question_paper/DownloadQuestionPaperModal';
import { Link, withRouter } from 'react-router-dom';

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
import { withApollo } from "@apollo/client/react/hoc";
import InfiniteScroll from 'react-infinite-scroll-component';
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


class QuestionComponent extends Component {
    constructor(props) {
        super(props)
        // const getinsQuestions = props.getInstituteQuestions.map((item) => {
        //     return { ...item, checked: true }
        // })
        console.log("QuestionComponent", props);
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
            getInstituteQuestions: props.getInstituteQuestions,
            loader: 0,
            hasMore: true,
            page: props.page
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
        let classArray = this.state.classData1.map((item) => {
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
    onScrollgetQuestionsContent1 = async (e, dactive) => {
        if (this.state.getInstituteQuestions.length < 9) {
            this.setState({ hasMore: false });
        }
        else {

            let page = parseInt(this.state.page) + 1;
            this.setState({
                page: page
            });
            console.log("variables:", {
                subject: this.props.stateData.searchsubject,
                chapter: this.props.stateData.searchchapter,
                question_type: this.props.stateData.questiontypes.toString(),
                question_theory: this.props.stateData.applicationtheory,
                complexity: this.props.stateData.complexity,
                institute_id: parseInt(Cookies.get("institutionid")),
                page: parseInt(page),
                type: 0
            });

            const result = await this.props.client.query({
                query: gql` 
        query(
            $subject:String!,
            $chapter:String!,
            $question_type:String,
            $question_theory:String,
            $complexity: String,
            $institute_id: Int!,
            $page: Int,
            $type: Int, 
            
            ) {
                getInstituteQuestions(
                    subject: $subject,
                    chapter: $chapter,
                    question_type: $question_type,
                    question_theory: $question_theory,
                    complexity:$complexity,
                    institute_id: $institute_id,
                    page:$page,
                    type: $type
                )
                {
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
    `,
                variables: {
                    subject: this.props.stateData.searchsubject,
                    chapter: this.props.stateData.searchchapter,
                    question_type: this.props.stateData.questiontypes.toString() || "",
                    question_theory: this.props.stateData.applicationtheory,
                    complexity: this.props.stateData.complexity,
                    institute_id: parseInt(Cookies.get("institutionid")),
                    page: parseInt(page),
                    type: 0

                },
            })
            console.log("result.data.getInstituteQuestions1", result.data.getInstituteQuestions);
            if (result.data.getInstituteQuestions.length == 0) {
                this.setState({ hasMore: false, page: page });
                return;
            }
            else {
                setTimeout(() => {
                    this.setState({
                        page: page,
                        getInstituteQuestions: this.state.getInstituteQuestions.concat(result.data.getInstituteQuestions)
                    });
                }, 500);
            }



        }

    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    render() {
        console.log("rendercurrentState", "variables:", {
            subject: this.props.stateData.searchsubject,
            chapter: this.props.stateData.searchchapter,
            question_type: this.props.stateData.questiontypes.toString(),
            question_theory: this.props.stateData.applicationtheory,
            complexity: this.props.stateData.complexity,
            institute_id: parseInt(Cookies.get("institutionid")),
            page: 1,
            type: 0
        });

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
        console.log("this.state.getInstituteQuestions", this.state.getInstituteQuestions);
        let finddata = [];
        (this.state.getInstituteQuestions || []).map((item) => {
            (this.props.stateData?.subjects || []).map((item1) => {
                if (item1.id == item.subject) {
                    (item1.chapters || []).map((item3) => {

                        const arr = item.chapter.split(",");
                        console.log("drfg", arr, item3.id);

                        if (arr.includes(item3.id.toString())) {

                            finddata = item3.ownedarray
                        }
                    })
                }
            })
        });
        const newData1 = (this.state.getInstituteQuestions || []).map((item) => {
            if (finddata.length > 0) {
                if (finddata.find((a) => a.id == item.id)) {
                    return { ...item, checked: true }
                }
                else {
                    return { ...item, checked: false }
                }
            }
            else {
                return { ...item, checked: false }
            }
        })
        let latestData = newData1.filter((a) => a.id.includes(this.state.searchsubject));
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
                                        {(this.state.classData1 || []).map((classmapData) => (<Button onClick={(e) => this.ownedquestionClassFun1(e, classmapData.id)} variant={classmapData.active}>{classmapData.class}</Button>))}
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
                                    <Form.Control
                                        style={{ width: 150 }}
                                        type="text"
                                        name="quesionsearch"
                                        value={this.state.quesionsearch}
                                        onChange={this.handleChange}
                                        placeholder="Search"
                                    />
                                </Form.Group>
                            </div>

                            <Card as={Card.Body}>
                                <Scrollbars style={{ height: 500 }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.state.getInstituteQuestions.length > 0 ? (
                                        <InfiniteScroll
                                            dataLength={this.state.getInstituteQuestions.length}
                                            next={(e) => this.onScrollgetQuestionsContent1(e)}
                                            hasMore={this.state.hasMore}
                                            loader={
                                                <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                                    <b>Loading...</b>
                                                </p>}
                                            endMessage={
                                                <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                                    <b>Yay! You have seen it all</b>
                                                </p>
                                            }
                                        >
                                            {(latestData || []).map((questionsData, index) => {
                                                if (questionsData.qtype == "9" || questionsData.qtype == "3") {
                                                    console.log("questionsData.question", questionsData.question, questionsData.id);
                                                    let question1 = questionsData.question.replace(/src="/g, 'src=\\"');
                                                    let question2 = question1.replace(/" \/>/g, '\\" />');
                                                    let question = [];
                                                    try {
                                                        question = JSON.parse(question2);
                                                    }
                                                    catch (err) {
                                                        console.log("MATRIX ERROR:", err.message);
                                                    }


                                                    console.log("questionsData.questionnn", question);
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}.</span>
                                                                    {parse(questionsData.mat_question)}
                                                                    <Row>
                                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                            <ol className="matrixlistoptions" type={
                                                                                questionsData.list1type == "alphabets" ? ("A")
                                                                                    : (questionsData.list1type == "numbers") ? ("1")
                                                                                        : ("roman")}
                                                                            >
                                                                                {(question || []).map((item) => (
                                                                                    <li>{parse(item.qlist1)}</li>
                                                                                ))}
                                                                            </ol>
                                                                        </Col>
                                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                            <ol className="matrixlistoptions" type={
                                                                                questionsData.list2type == "alphabets" ? ("A")
                                                                                    : (questionsData.list2type == "numbers") ? ("1")
                                                                                        : ("roman")}>
                                                                                {(question || []).map((item) => (
                                                                                    <li>{parse(item.qlist2)}</li>
                                                                                ))}
                                                                            </ol>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>A.</span>
                                                                        <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>B.</span>
                                                                        <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>C.</span>
                                                                        <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>D.</span>
                                                                        <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>)
                                                }
                                                else if (questionsData.qtype == "8") {
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}</span>
                                                                    {parse(questionsData.question)}
                                                                    {" QID- " + questionsData.id}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>
                                                    )

                                                }
                                                else if (questionsData.qtype == "5") {
                                                    return (<Card as={Card.Body} className="bg-light my-2">
                                                        <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                            <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                            <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                {parse(questionsData.compquestion)}
                                                                <span>{this.idFunction(index)}</span>
                                                                {parse(questionsData.question)}
                                                                {" QID- " + questionsData.id}
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                        <hr className="my-3" />
                                                        <Row>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>A.</span>
                                                                    <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>B.</span>
                                                                    <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>C.</span>
                                                                    <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>D.</span>
                                                                    <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="font-weight-bold">Currect Answer:</span>
                                                                    <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </Card>)
                                                }
                                                else {
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}</span>
                                                                    {parse(questionsData.question)}
                                                                    {" QID- " + questionsData.id}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>A.</span>
                                                                        <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>B.</span>
                                                                        <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>C.</span>
                                                                        <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>D.</span>
                                                                        <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>
                                                    )
                                                }
                                            })}
                                        </InfiniteScroll>
                                    ) : (
                                        <React.Fragment>
                                            {(latestData || []).map((questionsData, index) => {
                                                if (questionsData.qtype == "9" || questionsData.qtype == "3") {
                                                    console.log("questionsData.question", questionsData.question, questionsData.id);
                                                    let question1 = questionsData.question.replace(/src="/g, 'src=\\"');
                                                    let question2 = question1.replace(/" \/>/g, '\\" />');
                                                    let question = [];
                                                    try {
                                                        question = JSON.parse(question2);
                                                    }
                                                    catch (err) {
                                                        console.log("MATRIX ERROR:", err.message);
                                                    }


                                                    console.log("questionsData.questionnn", question);
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}.</span>
                                                                    {parse(questionsData.mat_question)}
                                                                    <Row>
                                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                            <ol className="matrixlistoptions" type={
                                                                                questionsData.list1type == "alphabets" ? ("A")
                                                                                    : (questionsData.list1type == "numbers") ? ("1")
                                                                                        : ("roman")}
                                                                            >
                                                                                {(question || []).map((item) => (
                                                                                    <li>{parse(item.qlist1)}</li>
                                                                                ))}
                                                                            </ol>
                                                                        </Col>
                                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                            <ol className="matrixlistoptions" type={
                                                                                questionsData.list2type == "alphabets" ? ("A")
                                                                                    : (questionsData.list2type == "numbers") ? ("1")
                                                                                        : ("roman")}>
                                                                                {(question || []).map((item) => (
                                                                                    <li>{parse(item.qlist2)}</li>
                                                                                ))}
                                                                            </ol>
                                                                        </Col>
                                                                    </Row>
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>A.</span>
                                                                        <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>B.</span>
                                                                        <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>C.</span>
                                                                        <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>D.</span>
                                                                        <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>)
                                                }
                                                else if (questionsData.qtype == "8") {
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}</span>
                                                                    {parse(questionsData.question)}
                                                                    {" QID- " + questionsData.id}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>
                                                    )

                                                }
                                                else if (questionsData.qtype == "5") {
                                                    return (<Card as={Card.Body} className="bg-light my-2">
                                                        <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                            <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                            <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                {parse(questionsData.compquestion)}
                                                                <span>{this.idFunction(index)}</span>
                                                                {parse(questionsData.question)}
                                                                {" QID- " + questionsData.id}
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                        <hr className="my-3" />
                                                        <Row>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>A.</span>
                                                                    <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>B.</span>
                                                                    <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>C.</span>
                                                                    <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                </div>
                                                            </Col>
                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span>D.</span>
                                                                    <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="font-weight-bold">Currect Answer:</span>
                                                                    <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </Card>)
                                                }
                                                else {
                                                    return (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"checkbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.pQuestionFunction(e, questionsData, "wbank")} />
                                                                <Form.Check.Label htmlFor={"checkbox_01" + index}>
                                                                    <span>{this.idFunction(index)}</span>
                                                                    {parse(questionsData.question)}
                                                                    {" QID- " + questionsData.id}
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                            <hr className="my-3" />
                                                            <Row>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>A.</span>
                                                                        <div className="ml-2">{parse(questionsData.option1)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>B.</span>
                                                                        <div className="ml-2">{parse(questionsData.option2)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>C.</span>
                                                                        <div className="ml-2">{parse(questionsData.option3)}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span>D.</span>
                                                                        <div className="ml-2">{parse(questionsData.option4)}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="font-weight-bold">Currect Answer:</span>
                                                                        <div className="font-weight-bold ml-2">{questionsData.answer}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Card>
                                                    )
                                                }
                                            })}

                                            {this.state.getInstituteQuestions.length == 0 ? (<p style={{ textAlign: "center" }}>
                                                <b>No data available </b>
                                            </p>) : (<p style={{ textAlign: "center" }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>)}
                                        </React.Fragment>
                                    )}
                                </Scrollbars>
                            </Card>


                        </Card.Body>
                    </Card>
                </li>
                <CutomCategoryTotalQuestionsModal
                    globals={this.props.stateData.subjects}
                    qcountarr={qcountarr}
                    show={this.state.modalShow}
                    onHide={this.onhide}
                />
            </React.Fragment >
        )
    }
}

export default withApollo(withRouter((QuestionComponent)));