
import React, { Component } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'

import './_stepwizard.scss'
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import SuccessMessage from './SuccessMessage';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

const styles = {
    width: '120px',
};

const EDIT_QUESTION_PATTERN = gql`
  mutation(
    $params:EditPatternInput  
    ) {
        editPattern(
        params: $params
     )
  }
`;

class CreateQuestionPatternSectionEdit extends Component {
    constructor(props) {
        super(props)
        console.log("editData", this.props);
        const extypobj = {
            value: this.props.editData.location.state.exam_type.toString(),
            label: this.props.editData.location.state.exam_name
        }

        const classobj = {
            value: this.props.editData.location.state.class_id.toString(),
            label: this.props.editData.location.state.class_name
        }

        const scobj = {
            value: this.props.editData.location.state.section_category_id.toString(),
            label: this.props.editData.location.state.section_category
        }

        this.state = {
            breadcrumbsData: {
                Title: "Edit pattern For Question paper"
            },
            name: this.props.editData.location.state.name,
            exam: "",
            examname: extypobj,
            class: "",
            category: "",
            subArray: this.props.editData.location.state.subArray,
            noofquestions: this.props.editData.location.state.noofquestions,
            formErrors: {
                name: "",
                exam: "",
                class: "",
                category: ""
            },
            nameValid: false,
            examValid: false,
            classValid: false,
            categoryValid: false,
            submitError: "",

            currentStep: 1,
            modalShowOne: false,
            modalShowTwo: false,
            formValid: false,
            selectDataClass: classobj,
            selectDatasc: scobj,
            numberError: ""

        }
    }

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Cookies2", Cookies.get("username"));
        console.log("institutionid2", Cookies.get("institutionid"));

        if (this.state.formValid) {
            let attributesArray = [];

            for (let i = 0; i < this.state.subArray.length; i++) {
                let edata = this.state.subArray[i];
                let toqArray = [];
                for (let toq = 0; toq < edata.toq.length; toq++) {
                    let etoq = edata.toq[toq];
                    if (etoq.noofquestion != "") {
                        const toqData = {
                            question_type_id: parseInt(etoq.id),
                            no_of_questions: parseInt(etoq.noofquestion),
                            weightage: 0,
                            negative_marks: 0
                        }
                        toqArray.push(toqData);
                    }
                }
                const qtobject = {
                    application: parseInt(edata.application),
                    concept: parseInt(edata.concept)
                }
                const attribute = {
                    subject_id: parseInt(edata.id),
                    no_of_questions: parseInt(edata.totnoofquestions),
                    weightage: 0,
                    negative_marks: 0,
                    equalWeightage: 0,
                    question_type: toqArray,
                    question_theory: qtobject
                }
                attributesArray.push(attribute);

            }
            console.log("attributesArray", attributesArray);


            let editexampattern = "";
            editexampattern = {
                id: this.props.editData.location.state.pid,
                name: this.state.name,
                exam_type: parseInt(this.state.exam),
                class_id: parseInt(this.state.class),
                section_category_id: parseInt(this.state.category),
                exam_duration: 0,
                attributes: attributesArray,
                username: Cookies.get("username")
            }
            this.editpattern(
                editexampattern
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    editpattern = async (
        params) => {
        await this.props.editpattern({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.editPattern) {
                    this.setState({
                        currentStep: 5,
                        modalShowOne: true,

                        breadcrumbsData: {
                            Title: "Create pattern For Question paper"
                        },
                        name: "",
                        exam: "",
                        class: "",
                        category: "",
                        subArray: [],
                        noofquestions: "0",
                        formErrors: {
                            name: "",
                            exam: "",
                            class: "",
                            category: ""
                        },
                        nameValid: false,
                        examValid: false,
                        classValid: false,
                        categoryValid: false,
                        submitError: "",

                        currentStep: 1,
                        modalShowTwo: false
                    });

                    setTimeout(() => { this.SetpageLoad() }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1, modalShowOne: false });
        this.props.history.push("/questions/question-pattern");
    }
    SubjectFunction = (e, index) => {
        let statesubArray = this.state.subArray;
        if (statesubArray.length > 0) {
            if (e.target.name == "application") {
                statesubArray[index].application = e.target.value;
            }
            if (e.target.name == "concept") {
                statesubArray[index].concept = e.target.value;
            }
        }
        this.setState({ subArray: statesubArray });
        console.log("SubjectFunction", index, e.target.name, e.target.value);

    }
    TypeOfQuestion = (e, index2, subid, toqid, index1) => {
        console.log("TypeOfQuestion", e.target.name, e.target.value, index2, subid, toqid);
        let stateSubArray = this.state.subArray;
        let findObject = stateSubArray.find((a) => a.id == subid);
        console.log("findObject", findObject);
        // findObject.toq.map((item) => {
        //     if (item.id == toqid && findObject.id == subid) {
        //         item.noofquestion = e.target.value
        //     }

        // });
        //console.log("findObject", findObjectOftoq);

        const data = findObject.toq.map((item) => {
            if (item.id == toqid) {
                const re = /^[0-9\b]+$/;
                if (e.target.value == '' || re.test(e.target.value)) {

                    if (e.target.value < parseInt(findObject.totnoofquestions) || parseInt(e.target.value == findObject.totnoofquestions)) {
                        return { ...item, noofquestion: e.target.value, numberError: "", noofqerror: "" }
                    }
                    else {
                        const defaultError = e.target.name + " " + "should be less than or equal to" + findObject.totnoofquestions;
                        return { ...item, noofquestion: "", numberError: "", noofqerror: defaultError }
                    }

                }
                else {
                    return { ...item, noofquestion: "", numberError: "Invalid Input" }
                }

            }
            return item
        });
        const newArray = { ...findObject, toq: data }
        stateSubArray.splice(index1, 1, newArray);


        //findObjectOftoq.noofquestion = e.target.value;
        this.setState({ subArray: stateSubArray });

    }

    handleInputChange = e => {
        console.log("handleInputChange", e);
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    handleSelectChange = (name, value, selected) => {
        console.log("asername", selected, name, value);
        const selectData = selected;
        delete selectData.id
        if (name == "class") {
            this.setState({ selectDataClass: selectData });
        }
        else if (name == "category") {
            this.setState({ selectDatasc: selectData });
        }

        let noofquestions = 0;
        if (name == "exam") {
            let examsubjects = this.props.globals.globals.exams.find((a) => a.id == value);
            console.log("examsubjects", examsubjects);
            let examData = examsubjects.exam_subjects;
            let subArray = [];
            var total = [];
            let TypeOfQuestionData = this.props.globals.globals.questionTypes;
            let tqArray = [];
            for (let t = 0; t < TypeOfQuestionData.length; t++) {
                const tqData = {
                    id: TypeOfQuestionData[t].id,
                    questionType: TypeOfQuestionData[t].questiontype,
                    noofquestion: "",
                    numberError: "",
                    noofqerror: ""
                }
                tqArray.push(tqData);
            }

            for (let i = 0; i < examData.length; i++) {
                let idata = examData[i];
                let globalData = this.props.globals.globals.subjects.find((b) => b.id == idata.subject_id);
                const subname = {
                    id: globalData.id,
                    subject: globalData.subject,
                    totnoofquestions: idata.no_of_questions,
                    toq: tqArray,
                    application: "",
                    concept: ""
                };
                subArray.push(subname);
                total.push(parseInt(idata.no_of_questions));
            }
            for (let num of total) {
                noofquestions = noofquestions + num
            }
            this.setState({ subArray: subArray, noofquestions: noofquestions });
        }
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let examValid = this.state.examValid;
        let classValid = this.state.classValid;
        let categoryValid = this.state.categoryValid;
        switch (fieldName) {
            case "name":
                if (value.length == "") {
                    nameValid = false;
                    fieldValidationErrors.name = "Name Cannot Be Empty";
                } else {
                    nameValid = true;
                    fieldValidationErrors.name = "";
                }

                break;

            case "exam":
                if (value.length == "") {
                    examValid = false;
                    fieldValidationErrors.exam = "Exam Cannot Be Empty";
                } else {
                    examValid = true;
                    fieldValidationErrors.exam = "";
                }

                break;

            case "class":
                if (value.length == "") {
                    classValid = false;
                    fieldValidationErrors.class = "Class Cannot Be Empty";
                } else {
                    classValid = true;
                    fieldValidationErrors.class = "";
                }

                break;

            case "category":
                if (value.length == "") {
                    categoryValid = false;
                    fieldValidationErrors.category = "Category Cannot Be Empty";
                } else {
                    categoryValid = true;
                    fieldValidationErrors.category = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                nameValid: nameValid,
                examValid: examValid,
                classValid: classValid,
                categoryValid: categoryValid

            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid: this.state.nameValid
                && this.state.examValid
                && this.state.classValid
                && this.state.categoryValid

        });
        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }

    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2 ? 2 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    /*
    * the functions for our button
    */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1 && currentStep !== 3) {
            return (
                <Button style={styles} variant="dark" onClick={this._prev}> Back </Button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 2) {
            return (
                <Button style={styles} variant="success" className="float-right" onClick={this.handleFormSubmit}> Submit </Button>
            )
        }
        if (currentStep < 2) {
            return (
                <Button style={styles} variant="success" className="float-right" onClick={this._next}> Next </Button>
            )
        }

        return null;
    }
    render() {
        const globals = this.props.globals;
        const loading1 = globals.loading;
        const error1 = globals.error;

        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        console.log("currentState", this.state);
        return (
            <section className="create_question_pattern">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="step-wizard">
                            <ul className="step-indicator border-bottom pb-4">
                                <li className={this.state.currentStep === 1 ? "active" : "complete"}>
                                    <div className="step"><i className="far fa-check-circle"></i></div>
                                    <div className="caption">Setup</div>
                                </li>
                                <li className={this.state.currentStep === 2 ? "active" :
                                    this.state.currentStep > 2 ? "complete" : ""
                                }>
                                    <div className="step"><i className="far fa-question-circle"></i></div>
                                    <div className="caption">Questions</div>
                                </li>
                                <li className={this.state.currentStep === 3 ? "active" :
                                    this.state.currentStep > 3 ? "done" : ""
                                }>
                                    <div className="step"><i className="far fa-calendar-alt"></i></div>
                                    <div className="caption">Save</div>
                                </li>
                            </ul>
                            {this.state.submitError != "" ? (
                                <Form.Text className="form-text text-danger">
                                    {this.state.submitError}
                                </Form.Text>
                            ) : (""


                                )}
                            <StepOne
                                currentStep={this.state.currentStep}
                                parenthandleInputChange={this.handleInputChange}
                                parenthandleFormSubmit={this.handleFormSubmit}
                                stateData={this.state}
                                globals={globals.globals}
                                parenthandleSelectChange={this.handleSelectChange}
                            />
                            <StepTwo
                                currentStep={this.state.currentStep}
                                //parenthandleInputChange={this.handleInputChange}
                                parenthandleFormSubmit={this.handleFormSubmit}
                                stateData={this.state}
                                globals={globals.globals}
                                //parenthandleSelectChange={this.handleSelectChange}
                                parentSubjectFunction={this.SubjectFunction}
                                parentTypeOfQuestion={this.TypeOfQuestion}
                            />
                            <div className="mt-4">
                                {this.previousButton()}
                                {this.nextButton()}
                            </div>
                        </div>
                        <SuccessMessage
                            show={this.state.modalShowOne}
                            onHide={() => this.setState({ modalShowOne: false })}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default withRouter(compose(
    graphql(gql` 
    query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        exams{
            id
            exam
            exam_subjects{
                subject_id
                no_of_questions
            }
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
            }
        }

        classes{
            id
            class
        }
        globalSectionCategory{
            id
            section_category
            class_ids
        }
        questionTypes{
            id
            questiontype
        }
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                },
            }), name: "globals"
        }), graphql(EDIT_QUESTION_PATTERN, {
            name: "editpattern"
        }))(CreateQuestionPatternSectionEdit));
