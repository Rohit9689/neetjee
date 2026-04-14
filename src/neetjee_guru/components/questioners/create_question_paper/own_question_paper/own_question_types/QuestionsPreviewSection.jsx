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
import parse, { domToReact } from 'html-react-parser';
import { withRouter } from "react-router-dom";

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
class QuestionsPreviewSection extends Component {
    constructor(props) {
        super(props)
        console.log("QuestionsPreviewSection", props.breadCrumbsData.examtype, props.globals);
        let Title = "";
        let ClassSectionTotalStudents = "";
        let complexity = "";
        let subjects = "";
        let img = "";
        if (props.breadCrumbsData.type == "edit") {
            let subArray = [];
            props.breadCrumbsData.subjects.map((item) => {
                subArray.push(item.subject);
            })
            Title = props.breadCrumbsData.examtypevalue.label + "  Exam - Question Paper";
            ClassSectionTotalStudents = "Class -" + props.breadCrumbsData.classvalue.label + ",Branch -" + props.breadCrumbsData.branch + ",Section -" + props.breadCrumbsData.section;
            complexity = "";
            subjects = subArray.toString();
            if (props.breadCrumbsData.examtype == 1) {
                img = require('../../../../../../images/Neet-Exam.png');
            } else if (props.breadCrumbsData.examtype == 2) {
                img = require('../../../../../../images/Jee(Mains)-Exam.png');

            }
            else if (props.breadCrumbsData.examtype == "3" || props.breadCrumbsData.examtype == "6") {
                img = require('../../../../../../images/tschelogo.png');

            }
            else if (props.breadCrumbsData.examtype == "7" || props.breadCrumbsData.examtype == "8") {
                img = require('../../../../../../images/Jntuk-logo.png');

            }
        } else {
            if (props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection != undefined) {
                Title = props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.Title;
                ClassSectionTotalStudents = props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.ClassSectionTotalStudents;
                complexity = props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.complexity;
                subjects = props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.subjects;
                img = props.breadCrumbsData.breadCrumbsData.stateData.BreadcrumbCustomQuestionsSection.img;
            }
        }


        this.state = {
            BreadcrumbCustomQuestionsSection: {
                img: img,
                Title: Title,
                SubTitle: 'Questions Preview',
                ClassSectionTotalStudents: ClassSectionTotalStudents,
                complexity: complexity,
                subjects: subjects
            },
            modalShow: false,
            modalShowTwo: false,
            search: []
        }
    }
    manageexams = (e) => {
        this.props.history.push({
            pathname: "/questions/manage-question-paper",

        });
    }

    decodefun(id, data) {
        console.log("decodefun", id, data);
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    getSubjects() {
        let getArray = [];
        for (let i = 0; i <= this.props.stateData.subjects.length; i++) {
            let idata = this.props.stateData.subjects[i];
            if (idata != undefined) {
                const newObj = {
                    value: idata.id,
                    label: idata.subject
                }
                getArray.push(newObj);

            }

        }
        return getArray;
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    render() {
        
        let filterData = [];
        this.props.examquestionsData.map((item) => {
            let isAlreadyExists = filterData.filter(val => val.chapter == item.chapter);
            if (item.checked == true && isAlreadyExists.length == 0) {
                filterData.push({ ...item, length: "" });
            }
        });
        
        const newData = filterData.map(item => {
            const clength = this.props.examquestionsData.filter(val => val.chapter == item.chapter && val.checked == true);
            return { ...item, length: clength.length };
        });
        
        return (
            <div className="Own_Question_Types">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <div className="">
                            <BreadcrumbCustomQuestionTwo breadcrumbs={this.state.BreadcrumbCustomQuestionsSection} />
                        </div>
                        <ul className="list-unstyled">
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError1}
                            </Form.Text>
                            <li>
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="d-sm-flex justify-content-between align-items-center bg-white">
                                        <h6>Questions Preview</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="my-3 d-md-flex justify-content-between align-items-center">
                                            <h6>Filter</h6>
                                        </div>
                                        <Card as={Card.Body}>
                                            <Form>
                                                <Row>
                                                    <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="slectSubject">
                                                        <Form.Label className="text-uppercase">Subject</Form.Label>
                                                        <SelectDropDown
                                                            stateData={this.props.stateData.searchsubjectvalue}
                                                            handleChange={this.props.pselecthandleInputChange}
                                                            name="searchsubject"
                                                            options={this.getSubjects()}
                                                            placeholderName={'Subject'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
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
                                                    name="searchquestionid"
                                                    value={this.props.stateData.searchquestionid}
                                                    placeholder="Search"
                                                    onChange={this.props.handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <Card as={Card.Body}>
                                            <Scrollbars style={{ height: 250 }}
                                                {...this.props}
                                                renderThumbVertical={renderThumb}
                                                autoHide
                                                autoHideTimeout={500}
                                                autoHideDuration={200}>
                                                {this.props.examquestionsData.map((questionsData, index) => {
                                                    console.log("questionsData.qtype", questionsData.qtype);
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
                                                                    <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.QuestionFunction(e, questionsData.id)} />
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
                                                                                    {question.map((item) => (
                                                                                        <li>{parse(item.qlist1)}</li>
                                                                                    ))}
                                                                                </ol>
                                                                            </Col>
                                                                            <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                                                <ol className="matrixlistoptions" type={
                                                                                    questionsData.list2type == "alphabets" ? ("A")
                                                                                        : (questionsData.list2type == "numbers") ? ("1")
                                                                                            : ("roman")}>
                                                                                    {question.map((item) => (
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
                                                                    <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.QuestionFunction(e, questionsData.id)} />
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
                                                                <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.QuestionFunction(e, questionsData.id)} />
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
                                                                    <Form.Check.Input type="checkbox" checked={questionsData.checked} onClick={(e) => this.props.QuestionFunction(e, questionsData.id)} />
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
                                            </Scrollbars>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </li>
                        </ul>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Class </th>
                                            <th>: {this.props.breadCrumbsData.classvalue.label}</th>
                                        </tr>
                                        <tr>
                                            <th>Exam </th>
                                            <th>: {this.props.breadCrumbsData.examtypevalue.label} </th>
                                        </tr>
                                        {this.props.breadCrumbsData.examtype != "" ? (
                                            <React.Fragment>
                                                {this.props.breadCrumbsData.examtype == "1" ? (
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
                                                )
                                                    : this.props.breadCrumbsData.examtype == "3" || this.props.breadCrumbsData.examtype == "6" || this.props.breadCrumbsData.examtype == "7" || this.props.breadCrumbsData.examtype == "8" ? (
                                                        <React.Fragment>
                                                            <tr>
                                                                <th> Duration </th>
                                                                <th>: {Math.ceil(this.props.breadCrumbsData.totalExamCount3)}min </th>
                                                            </tr>
                                                            <tr>
                                                                <th>No Of Questions </th>
                                                                <th>: {this.props.breadCrumbsData.tcq}</th>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                        : (
                                                            <React.Fragment>
                                                                {this.props.breadCrumbsData.examtypema == "1" ? (
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
                                <Scrollbars style={{ height: "45vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    <Card className="border-0 bg-light mb-2">
                                        <Card.Header className="bg-secondary">
                                            <Card.Title className="h6 mb-0 text-white">Replace Questions</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <ul className="list-unstyled chapter-list bg-light m-0">
                                                {newData.map((item) => {
                                                    return (<li><Link to="#">{item.chapter_name}-{item.length}</Link></li>);
                                                })}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0">
                                <Button variant="primary" className="px-4 text-uppercase" className="w-100"
                                    onClick={this.props.ParentreplaceQuestions}
                                >Replace questions</Button>
                                <Button variant="primary" className="px-4 text-uppercase" className="w-100" onClick={() => this.manageexams()}>Go to manage exams</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default withRouter(QuestionsPreviewSection);
