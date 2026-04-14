import React, { Component } from 'react'
import { Row, Card, Col, Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars'
import DateTime from 'react-datetime'
import '../../../../react-datetime.css';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import parse, { domToReact } from 'html-react-parser';
import { components } from 'react-select';
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';

const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        exams{
            id
            exam
            exam_subjects{
                subject_id
            }
        }
        globalBranches{
            id
            branch_name
        }
        classes{
            id
            class
        }
        globalSections{
            id
            section_name
        }
        subjects{
            id
            subject
            chapters{
                id
                chapter
                topics{
                    id
                    topic
                }
                class
            }
        }
        questionTypes{
            id
            questiontype
        }
        questionTheory{
            id
            question_theory
        }
    }
}

`;

const FETCH_INSTITUTIONQUESTIONS = gql` 
query($subject:String!,
$chapter:String!,
$question_type:String,
$question_theory:String,
    $institute_id: Int!) {
    getInstituteQuestions(
        subject: $subject,
        chapter: $chapter,
        question_type: $question_type,
        question_theory: $question_theory,
        institute_id: $institute_id){
            id
            subject
            question
            chapter
            topic
            complexity
            question_theory
            qtype
        
    }
}

`;
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
class ReplaceQuestionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false,
            searchownquestionId: ""
        };
    }
    handleChange = (e) => {
        this.setState({
            searchownquestionId: e.target.value
        });

    }
    parseFun(str) {
        console.log("parseFunstr",str);
        if (str != undefined || str != "") {
            try {
                return parse(str);
            } catch (ex) {
                return false;
            }
        }
        else {
            return false;
        }
    
    }
    // decodefun(data) {
    //     var decdata = decodeURIComponent(data);
    //     return decdata;
    // }
    errorMessage() {
        if (this.props.stateData.currentStep == 5) {
            return (
                <div className="d-flex justify-content-center align-item-center">
                    <div className="success-msge text-center">
                        <h5 className="text-uppercase">Questions  <br />Replaced successfully</h5>
                        <div className="icon my-4">
                            <svg role="img" viewBox="0 0 512 512" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                <path fill="green" d="M345.34 182.46a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34L226.54 289.94l-48.57-48.57a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34l-11.31 11.31c-3.12 3.12-3.12 8.19 0 11.31l65.54 65.54c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.65-2.34l124.45-124.45c3.12-3.12 3.12-8.19 0-11.31l-11.3-11.31zM512 256c0-35.5-19.4-68.2-49.6-85.5 9.1-33.6-.3-70.4-25.4-95.5s-61.9-34.5-95.5-25.4C324.2 19.4 291.5 0 256 0s-68.2 19.4-85.5 49.6c-33.6-9.1-70.4.3-95.5 25.4s-34.5 61.9-25.4 95.5C19.4 187.8 0 220.5 0 256s19.4 68.2 49.6 85.5c-9.1 33.6.3 70.4 25.4 95.5 26.5 26.5 63.4 34.1 95.5 25.4 17.4 30.2 50 49.6 85.5 49.6s68.1-19.4 85.5-49.6c32.7 8.9 69.4.7 95.5-25.4 25.1-25.1 34.5-61.9 25.4-95.5 30.2-17.3 49.6-50 49.6-85.5zm-91.1 68.3c5.3 11.8 29.5 54.1-6.5 90.1-28.9 28.9-57.5 21.3-90.1 6.5C319.7 433 307 480 256 480c-52.1 0-64.7-49.5-68.3-59.1-32.6 14.8-61.3 22.2-90.1-6.5-36.8-36.7-10.9-80.5-6.5-90.1C79 319.7 32 307 32 256c0-52.1 49.5-64.7 59.1-68.3-5.3-11.8-29.5-54.1 6.5-90.1 36.8-36.9 80.8-10.7 90.1-6.5C192.3 79 205 32 256 32c52.1 0 64.7 49.5 68.3 59.1 11.8-5.3 54.1-29.5 90.1 6.5 36.8 36.7 10.9 80.5 6.5 90.1C433 192.3 480 205 480 256c0 52.1-49.5 64.7-59.1 68.3z"></path>
                            </svg>
                        </div>
                    </div>
                </div>



            );

        }
        else {
            return (<Form.Text className="form-text text-danger">
                {this.props.stateData.submitError1}
            </Form.Text>);

        }


    }
    getquestiontypes(data) {
        console.log("getquestiontypes", data);
        let getArray = [];
        data.questionTypes.map((questionData) => {
            const newObj = {
                value: questionData.id,
                label: questionData.questiontype
            }
            getArray.push(newObj);
        })
        return getArray;
    }
    getChapters = () => {
        let getArray = [];
        for (let i = 0; i <= this.props.stateData.subjects.length; i++) {
            let idata = this.props.stateData.subjects[i];
            if (idata != undefined) {
                if (idata.id == this.props.stateData.searchsubjectown) {
                    let chData = "";
                    // if (this.state.owedqfilterclass != "0") {
                    //     chData = idata.chapters.filter((a) => a.class == this.state.owedqfilterclass);
                    // }
                    // else {
                    chData = idata.chapters;
                    //}
                    chData.map((chmapData) => {
                        const newObj = {
                            value: chmapData.id,
                            label: chmapData.chapter
                        }
                        getArray.push(newObj);
                    })

                }
            }

        }
        return getArray;
    }
    applicationtheory(data) {
        let getArray = [];
        data.questionTheory.map((theoryData) => {
            const newObj = {
                value: theoryData.id,
                label: theoryData.question_theory
            }
            getArray.push(newObj);
        })
        return getArray;
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
    render() {
        console.log("this.satte", this.props.stateData.searchsubjectownvalue);
        const globals = this.props.globals;
        const loading3 = globals.loading;
        const error3 = globals.error;

        const getInstituteQuestions = this.props.getInstituteQuestions;
        const loading4 = getInstituteQuestions.loading;
        const error4 = getInstituteQuestions.error;
        if (loading3) return null;
        if (loading4) return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">  Questions Replace</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">

                    {this.errorMessage()}

                    {this.props.stateData.spinnerStatus == "1" ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div class="spinner-border text-primary"></div>
                        </div>
                    ) : (
                            <React.Fragment>
                                <Form>

                                    <Row>
                                        <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                            <Form.Check type="checkbox" id="checkboxOne" custom>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="questionbankquestions"
                                                    value=""
                                                    checked={this.props.stateData.questionbankquestions}
                                                    onClick={this.props.phandleInputChange} />
                                                <Form.Check.Label htmlFor="checkboxOne">Question Bank Questions</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                            <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="ownaddedquestions"
                                                    value=""
                                                    checked={this.props.stateData.ownaddedquestions}
                                                    onClick={this.props.phandleInputChange} />
                                                <Form.Check.Label htmlFor="checkboxTwo">Own Added Questions</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </Row>
                                </Form>
                                {this.props.stateData.ownaddedquestions == true ? (
                                    <Card className="border-0 shadow-sm">
                                        <Card.Header className="d-sm-flex justify-content-between align-items-center bg-white">
                                            <h6>Own Added Questions</h6>
                                            {/* <Form.Group className="my-0 d-flex align-items-center">
                                                                    <Form.Label className="mr-2">Weightage </Form.Label>
                                                                    <Form.Control style={{ width: 65 }} type="text" value={this.props.stateData.ownaddedpercentage + "%"}
                                                                        placeholder="%"
                                                                        disabled />
                                                                </Form.Group> */}
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="my-3 d-md-flex justify-content-between align-items-center">
                                                <h6>Filter</h6>
                                                {/* <div className="d-flex align-items-center">
                                                <div className="mr-2">Class:</div>
                                                <ButtonGroup aria-label="Basic example">
                                                                            {this.state.classData1.map((classmapData) => (<Button onClick={(e) => this.ownedquestionClassFun1(e, classmapData.id)} variant={classmapData.active}>{classmapData.class}</Button>))}
                                                                         </ButtonGroup>
                                            </div> */}
                                            </div>
                                            <Card as={Card.Body}>
                                                <Form>
                                                    <Row>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="slectSubject1">
                                                            <Form.Label className="text-uppercase">Subject</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.searchchaptervalue}
                                                                //stateData={this.props.stateData.searchsubjectownvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="searchsubjectown"
                                                                options={this.getSubjects()}
                                                                placeholderName={'Subject'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectChapters">
                                                            <Form.Label className="text-uppercase">Chapters</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.searchchaptervalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="searchchapter"
                                                                options={this.getChapters()}
                                                                placeholderName={'Chapters'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectTypeofQuestions">
                                                            <Form.Label className="text-uppercase">Type Of Questions</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.questiontypesvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="questiontypes"
                                                                options={this.getquestiontypes(globals.globals)}
                                                                placeholderName={'Type Of Questions'} dropdownIndicator={{ DropdownIndicator }} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectApplicationTheory">
                                                            <Form.Label className="text-uppercase">Application Theory</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.applicationtheoryvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="applicationtheory"
                                                                options={this.applicationtheory(globals.globals)}
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
                                                        name="searchownquestionId"
                                                        value={this.state.searchownquestionId}
                                                        onChange={this.handleChange}
                                                        placeholder="Search"
                                                    />
                                                </Form.Group>
                                            </div>
                                            <Card as={Card.Body} className="justify-content-center flex-row">
                                                <div class="spinner-border text-primary text-center"></div>
                                            </Card>
                                        </Card.Body>
                                    </Card>
                                ) : ("")}
                            </React.Fragment>)}


                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success text-uppercase px-lg-5 ml-1"
                        onClick={this.props.ParenthandleFormSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal >
        );
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        if (error4 !== undefined) {
            alert("Server Error. " + error4.message);
            return null;
        }
        console.log("getInstituteQuestions.getInstituteQuestions", getInstituteQuestions.getInstituteQuestions);
        //const newData = getInstituteQuestions.getInstituteQuestions;
        //let latestData = newData.filter((a) => a.id.includes(this.state.searchquestionid));
        const newData = getInstituteQuestions.getInstituteQuestions.map((item) => {
            let finddata = this.props.stateData.ownaddedArray;

            if (finddata.length > 0) {
                if (finddata.find((a) => a == item.id)) {
                    return { ...item, checked: true }
                }
                else {
                    return { ...item, checked: false }
                }
            }
            else {
                return { ...item, checked: false }
            }

        });
        let latestData = newData.filter((a) => a.id.includes(this.state.searchownquestionId));
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">  Questions Replace</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.errorMessage()}
                    {this.props.stateData.spinnerStatus == "1" ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <div class="spinner-border text-primary"></div>
                        </div>) : (
                            <React.Fragment>
                                <Form>
                                    <Row>
                                        <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                            <Form.Check type="checkbox" id="checkboxOne" custom>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="questionbankquestions"
                                                    value=""
                                                    checked={this.props.stateData.questionbankquestions}
                                                    onClick={this.props.phandleInputChange} />
                                                <Form.Check.Label htmlFor="checkboxOne">Question Bank Questions</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                            <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="ownaddedquestions"
                                                    value=""
                                                    checked={this.props.stateData.ownaddedquestions}
                                                    onClick={this.props.phandleInputChange} />
                                                <Form.Check.Label htmlFor="checkboxTwo">Own Added Questions</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </Row>
                                </Form>
                                {this.props.stateData.ownaddedquestions == true ? (
                                    <Card className="border-0 shadow-sm">
                                        <Card.Header className="d-sm-flex justify-content-between align-items-center bg-white">
                                            <h6>Own Added Questions</h6>
                                            {/* <Form.Group className="my-0 d-flex align-items-center">
                                                            <Form.Label className="mr-2">Weightage </Form.Label>
                                                            <Form.Control style={{ width: 65 }} type="text" value={this.props.stateData.ownaddedpercentage + "%"}
                                                                placeholder="%"
                                                                disabled />
                                                        </Form.Group> */}
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="my-3 d-md-flex justify-content-between align-items-center">
                                                <h6>Filter</h6>
                                                {/* <div className="d-flex align-items-center">
                                        <div className="mr-2">Class:</div>
                                        <ButtonGroup aria-label="Basic example">
                                                                    {this.state.classData1.map((classmapData) => (<Button onClick={(e) => this.ownedquestionClassFun1(e, classmapData.id)} variant={classmapData.active}>{classmapData.class}</Button>))}
                                                                 </ButtonGroup>
                                    </div> */}
                                            </div>
                                            <Card as={Card.Body}>
                                                <Form>
                                                    <Row>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="slectSubject1">
                                                            <Form.Label className="text-uppercase">Subject</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.searchsubjectownvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="searchsubjectown"
                                                                options={this.getSubjects()}
                                                                placeholderName={'Subject'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectChapters">
                                                            <Form.Label className="text-uppercase">Chapters</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.searchchaptervalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="searchchapter"
                                                                options={this.getChapters()}
                                                                placeholderName={'Chapters'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectTypeofQuestions">
                                                            <Form.Label className="text-uppercase">Type Of Questions</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.questiontypesvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="questiontypes"
                                                                options={this.getquestiontypes(globals.globals)}
                                                                placeholderName={'Type Of Questions'} dropdownIndicator={{ DropdownIndicator }} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="selectApplicationTheory">
                                                            <Form.Label className="text-uppercase">Application Theory</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.props.stateData.applicationtheoryvalue}
                                                                handleChange={this.props.pselecthandleInputChange}
                                                                name="applicationtheory"
                                                                options={this.applicationtheory(globals.globals)}
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
                                                        name="searchownquestionId"
                                                        value={this.state.searchownquestionId}
                                                        onChange={this.handleChange}
                                                        placeholder="Search"
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
                                                    {latestData.map((questionsData, index) => (
                                                        <Card as={Card.Body} className="bg-light my-2">
                                                            <Form.Check type="checkbox" id={"owncheckbox_01" + index} custom>
                                                                <Form.Check.Input type="checkbox"
                                                                    checked={questionsData.checked}
                                                                    onClick={(e) => this.props.ownQuestionFunction(e, questionsData)}
                                                                />
                                                                <Form.Check.Label htmlFor={"owncheckbox_01" + index}>{questionsData.id}. {this.parseFun(questionsData.question)}</Form.Check.Label>
                                                            </Form.Check>
                                                        </Card>))}
                                                </Scrollbars>
                                            </Card>
                                        </Card.Body>
                                    </Card>
                                ) : ("")}
                            </React.Fragment>
                        )}


                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success text-uppercase px-lg-5 ml-1"
                        onClick={this.props.ParenthandleFormSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default withRouter(
    compose(
        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                }), name: "globals"
            }),
        graphql(FETCH_INSTITUTIONQUESTIONS,
            {
                options: props => ({

                    variables: {
                        subject: props.stateData.searchsubjectown,
                        chapter: props.stateData.searchchapter,
                        question_type: props.stateData.questiontypes,
                        question_theory: props.stateData.applicationtheory,
                        institute_id: parseInt(Cookies.get("institutionid"))
                    }
                }), name: "getInstituteQuestions"
            })

    )
        (ReplaceQuestionsModal));
