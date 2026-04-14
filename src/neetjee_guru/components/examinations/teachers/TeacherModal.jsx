import React, { Component } from 'react'
import Select from 'react-select';
import { components } from 'react-select'
import { Modal, Form, Col, Button } from 'react-bootstrap';
import BranchData from '../groups/BranchData'
import SectionData from '../groups/SectionData'
import ClassesData from '../groups/ClassesData'
import SelectDropDown from '../../selectdropdown/SelectDropDown';


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { MultiSelect } from "react-multi-select-component";
// import { withRouter } from "react-router-dom";

// Subjects
const Subjects = [
    { value: 1, label: 'Maths' },
    { value: 2, label: 'Physics' },
    { value: 3, label: 'Biology' },
    { value: 4, label: 'Chemistry' }
];

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};


const FETCH_TEACHERS = gql`
  query($institution_id: Int!) {
    getFaculity(institution_id: $institution_id){
        id
        name,
        mobile,
        subject,
        branch,
        class,
        section,
        email,
        userlevel,
        username
         }
    }
`;

const ADD_TEACHER = gql`
  mutation($params:TeacherInput1) {
    addFaculity(params: $params)
  }
`;
class TeacherModal extends Component {
    constructor(props) {
        super(props);
        //console.log("constructor", this.props);
        this.state = {
            currentStep: 1,
            teacher_name: "",
            contact_no: "",
            userlevel: "",
            userlevelvalue: "",
            subject: [],
            subjectvalue: [],
            branch: [],
            branchvalue: [],
            section: [],
            sectionvalue: [],
            email: "",
            class: "",
            classvalue: "",
            password: "",
            submitError: "",
            formErrors: {
                teacher_name: "",
                contact_no: "",
                subject: "",
                branch: "",
                class: "",
                section: "",
                password: "",
                email: "",
                userlevel: ""
            },
            teacher_nameValid: false,
            contact_noValid: false,
            subjectValid: false,
            sectionValid: false,
            classValid: false,
            branchValid: false,
            passwordValid: false,
            emailValid: false,
            userlevelValid: false,
            formValid: false
        };
    }
    handleMultipleSelectInputChange = (e, name) => {
        console.log("handleMultipleSelectInputChange", e, name);
        if (name == "subject") {
            let subject = Array();
            let subjectvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const subjectval = e[i];
                    const newObj = {
                        label: subjectval.label,
                        value: subjectval.value
                    }
                    subjectvalue.push(newObj);
                    subject.push(subjectval.value);
                }
                this.setState({
                    subjectvalue: subjectvalue,
                    subject: subject
                }, () => { this.validateField(name, "1") });
            }
        }
        else if (name == "section") {
            let section = Array();
            let sectionvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const sectionval = e[i];
                    const newObj = {
                        label: sectionval.label,
                        value: sectionval.value
                    }
                    sectionvalue.push(newObj);
                    section.push(sectionval.value);
                }
                this.setState({
                    sectionvalue: sectionvalue,
                    section: section
                }, () => { this.validateField(name, "1") });
            }

        }
        else if (name == "branch") {
            let branch = Array();
            let branchvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const branchval = e[i];
                    const newObj = {
                        label: branchval.label,
                        value: branchval.value
                    }
                    branchvalue.push(newObj);
                    branch.push(branchval.value);
                }
                this.setState({
                    branch: branch,
                    branchvalue: branchvalue
                }, () => { this.validateField(name, "1") });
            }
        }


    };

    getClassValues(vals) {
        let classes = Array();
        for (let i = 0; i < vals.length; i++) {
            const classval = vals[i];
            classes.push({ label: classval.class, value: classval.id });
        }
        classes.unshift({ label: "ALL", value: "0" });
        return classes;
    }


    handleInputChange = e => {
        console.log("e.target.name", e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };



    validateField(fieldName, value) {
        console.log("validateField", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let teacher_nameValid = this.state.teacher_nameValid;
        let contact_noValid = this.state.contact_noValid;
        let subjectValid = this.state.subjectValid;
        let sectionValid = this.state.sectionValid;
        let branchValid = this.state.branchValid;
        let classValid = this.state.classValid;
        let passwordValid = this.state.passwordValid;
        let emailValid = this.state.emailValid;
        let userlevelValid = this.state.userlevelValid;
        switch (fieldName) {
            case "teacher_name":
                if (value.length == "") {
                    teacher_nameValid = false;
                    fieldValidationErrors.teacher_name = "Teacher Name Cannot Be Empty";
                }
                else {
                    teacher_nameValid = true;
                    fieldValidationErrors.teacher_name = "";
                }

                break;

            case "password":
                if (value.length == "") {
                    passwordValid = false;
                    fieldValidationErrors.password = "Password cannot be Empty";
                } else {
                    passwordValid = true;
                    fieldValidationErrors.password = "";
                }

                break;
            case "email":
                var pattern = new RegExp(
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );

                if (value.length < 4) {
                    emailValid = false;
                    fieldValidationErrors.email =
                        "email cannot be less than 5 chars";
                } else if (!pattern.test(value)) {
                    emailValid = false;
                    fieldValidationErrors.email = "Invalid email";
                } else {
                    emailValid = true;
                    fieldValidationErrors.email = "";
                }

                break;
            case "contact_no":
                var pattern = new RegExp("^[6-9][0-9]{9}$");

                if (value.length == "") {
                    contact_noValid = false;
                    fieldValidationErrors.contact_no = "contact No. Cannot Be Empty";
                } else if (!pattern.test(value)) {
                    contact_noValid = false;
                    fieldValidationErrors.contact_no = "Invalid contact No.";
                } else {
                    contact_noValid = true;
                    fieldValidationErrors.contact_no = "";
                }

                break;
            case "userlevel":
                if (value.length == "") {
                    userlevelValid = false;
                    fieldValidationErrors.userlevel = "userlevel cannot be empty";
                }
                else {
                    userlevelValid = true;
                    fieldValidationErrors.userlevel = "";
                }

                break;

            case "subject":
                if (value.length == "") {
                    subjectValid = false;
                    fieldValidationErrors.subject = "Subject cannot be empty";
                }
                else {
                    subjectValid = true;
                    fieldValidationErrors.subject = "";
                }

                break;
            case "section":
                if (value.length == "") {
                    sectionValid = false;
                    fieldValidationErrors.section = "section cannot be empty";
                }
                else {
                    sectionValid = true;
                    fieldValidationErrors.section = "";
                }

                break;
            case "class":
                if (value.length == "") {
                    classValid = false;
                    fieldValidationErrors.class = "class cannot be empty";
                }
                else {
                    classValid = true;
                    fieldValidationErrors.class = "";
                }

                break;

            case "branch":
                if (value.length == "") {
                    branchValid = false;
                    fieldValidationErrors.branch = "Branch cannot be empty";
                }
                else {
                    branchValid = true;
                    fieldValidationErrors.branch = "";
                }
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                teacher_nameValid: teacher_nameValid,
                passwordValid: passwordValid,
                emailValid: emailValid,
                contact_noValid: contact_noValid,
                subjectValid: subjectValid,
                sectionValid: sectionValid,
                classValid: classValid,
                branchValid: branchValid,
                userlevelValid: userlevelValid
            },
            this.validateForm
        );
    }

    validateForm() {
        console.log("validateForm",this.state);
        if (this.state.userlevel == "3") {
            this.setState({
                formValid: this.state.teacher_nameValid &&
                    this.state.passwordValid &&
                    this.state.emailValid &&
                    this.state.contact_noValid &&
                    this.state.subjectValid &&
                    this.state.sectionValid &&
                    this.state.classValid &&
                    this.state.userlevelValid &&
                    this.state.branchValid
            });
        }
        else {
            this.setState({
                formValid: this.state.teacher_nameValid &&
                    this.state.passwordValid &&
                    this.state.emailValid &&
                    this.state.contact_noValid &&
                    this.state.userlevelValid &&
                    this.state.branchValid
            });
        }

        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }
    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Cookies2", Cookies.get("username"));
        console.log("institutionid2", Cookies.get("institutionid"));
        console.log("Data", this.state);
        let classval = "";
        if (this.state.class == "0") {
            classval = "1,2";

        }
        else {
            classval = this.state.class.toString()
        }

        if (this.state.formValid) {
            const addFaculity = {
                name: this.state.teacher_name,
                mobile: this.state.contact_no,
                subject: this.state.subject.toString(),
                branch: this.state.branch.toString(),
                class: classval.split(','),
                section: this.state.section,
                institution_id: parseInt(Cookies.get("institutionid")),
                username: Cookies.get("username"),
                email: this.state.email,
                userlevel: parseInt(this.state.userlevel),
                password: this.state.password

            }
            console.log("addFaculity", addFaculity);
            this.addFaculity(addFaculity).catch(error => {
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

    addFaculity = async params => {
        await this.props.addFaculity({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("Datas", data)
                let data1 = store.readQuery({
                    query: FETCH_TEACHERS,
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid")),
                        userlevel:parseInt(Cookies.get("userlevel"))
                    }
                });

                const newTeacher = {
                    id: data.addFaculity,
                    name: this.state.teacher_name,
                    mobile: this.state.contact_no,
                    subject: this.state.subject.toString(),
                    branch: this.state.branch.toString(),
                    class: params.class.toString(),
                    section: this.state.section.toString(),
                    email: this.state.email,
                    userlevel: parseInt(this.state.userlevel),
                    username:this.state.email,
                    __typename: "Teachers1"
                };

                data1.getFaculity.push(newTeacher);
                console.log("data2", data1);
                try {
                    store.writeQuery({
                        query: FETCH_TEACHERS,
                        variables: {
                            institution_id: parseInt(Cookies.get("institutionid")),
                            userlevel:parseInt(Cookies.get("userlevel"))
                        },
                        data: data1
                    });

                }
                catch (e) {
                    console.log("Exception", e);
                }

                if (data.addFaculity) {
                    this.setState({
                        currentStep: 5,
                        teacher_name: "",
                        contact_no: "",
                        userlevel:"",
                        userlevelvalue:"",
                        subject: [],
                        subjectvalue: [],
                        branch: [],
                        branchvalue: [],
                        section: [],
                        sectionvalue: [],
                        email: "",
                        class: "",
                        classvalue: "",
                        password: "",
                        submitError: "",
                        formErrors: {
                            teacher_name: "",
                            contact_no: "",
                            subject: "",
                            branch: "",
                            class: "",
                            section: "",
                            password: "",
                            email: "",
                            userlevel:""
                        },
                        teacher_nameValid: false,
                        contact_noValid: false,
                        subjectValid: false,
                        sectionValid: false,
                        classValid: false,
                        branchValid: false,
                        passwordValid: false,
                        emailValid: false,
                        userlevelValid: false,
                        formValid: false
                    });

                    setTimeout(() => { this.SetpageLoad() }, 1500);
                }
            }
        });
    };

    SetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1 });
        this.props.onHide();
    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", this.props, evalue);
        const name = ename;
        const value = evalue;
        if (name == "class") {
            if (value != "0") {
                let classData = this.props.globals.classes.find((a) => a.id == value);
                this.setState({
                    classvalue: {
                        value: classData.id,
                        label: classData.class
                    }
                });
            }
            else {
                this.setState({
                    classvalue: {
                        value: "0",
                        label: "ALL"
                    }
                });
            }
        }
        if (name == "userlevel") {
            if (value != "0") {
                let labelval = "";
                if (value == "1") {
                    labelval = "DEAN";
                }
                else if (value == "2") {
                    labelval = "PRINCIPAL";
                }
                else if (value == "3") {
                    labelval = "TEACHER";
                }
                this.setState({
                    userlevelvalue: {
                        value: value,
                        label: labelval
                    }
                });
            }

        }
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    getuserlevel() {
        const newArray = [
            { value: "1", label: "DEAN" },
            { value: "2", label: "PRINCIPAL" },
            { value: "3", label: "TEACHER" }
        ];
        return newArray;
    }
    render() {
        console.log("teachermodal", this.state);
        //start subject data
        let subjectnewArray = [];
        this.props.globals.subjects.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.subject,
                }
                subjectnewArray.push(newObj);
            }

        })
        let subjectselectall = true;
        let subjectlabelledBy = "Select";
        let subjectdisableSearch = false;
        if (subjectnewArray.length > 0) {
            subjectselectall = true;
            subjectdisableSearch = false;
        }
        else {
            subjectdisableSearch = true;
            subjectselectall = false;
            subjectlabelledBy = "No Options"
        }
        //end subject data

        //start branch data
        let branchnewArray = [];
        this.props.globals.globalBranches.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.branch_name,
                }
                branchnewArray.push(newObj);
            }

        })
        let branchselectall = true;
        let branchlabelledBy = "Select";
        let branchdisableSearch = false;
        if (branchnewArray.length > 0) {
            branchselectall = true;
            branchdisableSearch = false;
        }
        else {
            branchdisableSearch = true;
            branchselectall = false;
            branchlabelledBy = "No Options"
        }
        //end branch data

        //start section data
        let sectionnewArray = [];
        this.props.globals.globalSections.map((item) => {
            if (item != undefined) {
                if (this.state.branch.includes(item.branch_id.toString())) {
                    const newObj = {
                        value: item.id,
                        label: item.section_name,
                    }
                    sectionnewArray.push(newObj);
                }

            }

        })
        let sectionselectall = true;
        let sectionlabelledBy = "Select";
        let sectiondisableSearch = false;
        if (sectionnewArray.length > 0) {
            sectionselectall = true;
            sectiondisableSearch = false;
        }
        else {
            sectiondisableSearch = true;
            sectionselectall = false;
            sectionlabelledBy = "No Options"
        }
        //end section data
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.state.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Faculty Saved successfully
                        </Form.Text>
                    ) : (
                            <Form.Text className="form-text text-danger">
                                {this.state.submitError}
                            </Form.Text>
                        )}
                    <Form>
                        <Row>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectTeacherName">
                                <Form.Label className="text-uppercase"> Faculty Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="teacher_name"
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                    value={this.state.teacher_name}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.teacher_name}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectBranch">
                                <Form.Label className="text-uppercase">User Level<span className="text-danger">*</span></Form.Label>
                                <SelectDropDown
                                    stateData={this.state.userlevelvalue}
                                    handleChange={this.selecthandleInputChange}
                                    name="userlevel"
                                    options={this.getuserlevel()}
                                    placeholderName={'user level'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />

                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.branch}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectContact">
                                <Form.Label className="text-uppercase"> Password<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="Password"
                                    placeholder="Password"
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                    name="password"
                                    value={this.state.password}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.password}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectContact">
                                <Form.Label className="text-uppercase"> Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                    value={this.state.email}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectContact">
                                <Form.Label className="text-uppercase"> Contact No</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Mobile No"
                                    name="contact_no"
                                    onChange={this.handleInputChange}
                                    autoComplete="off"
                                    value={this.state.contact_no}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.contact_no}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectClass">
                                <Form.Label className="text-uppercase">Class{this.state.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <SelectDropDown
                                    stateData={this.state.classvalue}
                                    handleChange={this.selecthandleInputChange}
                                    name="class"
                                    options={this.getClassValues(this.props.globals.classes)}
                                    placeholderName={'Class'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.class}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectSubjects">
                                <Form.Label className="text-uppercase"> Subjects{this.state.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Subjects are selected.",
                                        "selectSomeItems": subjectlabelledBy
                                    }
                                    }
                                    disableSearch={subjectdisableSearch}
                                    hasSelectAll={subjectselectall}
                                    options={subjectnewArray}
                                    value={this.state.subjectvalue}
                                    onChange={(e) => this.handleMultipleSelectInputChange(e, "subject")}
                                    labelledBy={"Select"}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.subject}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectBranch">
                                <Form.Label className="text-uppercase">Branch<span className="text-danger">*</span></Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Branches are selected.",
                                        "selectSomeItems": branchlabelledBy
                                    }
                                    }
                                    disableSearch={branchdisableSearch}
                                    hasSelectAll={branchselectall}
                                    options={branchnewArray}
                                    value={this.state.branchvalue}
                                    onChange={(e) => this.handleMultipleSelectInputChange(e, "branch")}
                                    labelledBy={"Select"}
                                />

                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.branch}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectSection">
                                <Form.Label className="text-uppercase">Section{this.state.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Sections are selected.",
                                        "selectSomeItems": sectionlabelledBy
                                    }
                                    }
                                    disableSearch={sectiondisableSearch}
                                    hasSelectAll={sectionselectall}
                                    options={sectionnewArray}
                                    value={this.state.sectionvalue}
                                    onChange={(e) => this.handleMultipleSelectInputChange(e, "section")}
                                    labelledBy={"Select"}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.state.formErrors.section}
                                </Form.Text>
                            </Form.Group>

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4">
                    <Button onClick={this.handleFormSubmit} className="btn btn-success text-uppercase" >
                        {/* onClick={() => { this.props.onHide() }} */}
                        Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default
    compose(graphql(ADD_TEACHER, {
        name: "addFaculity"
    }))(TeacherModal);