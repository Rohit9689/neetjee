import React, { Component } from 'react'
import { Row, Col, Card, Form, Image, Button } from 'react-bootstrap'
import { components } from 'react-select'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import './_profile.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Picerror from './Picerror';

const UPDATE_USER_PROFILE = gql`
  mutation($params: UpdateStudentProfile) {
    updateStudentProfile(params: $params)
  }
`;
const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        globalBranches{
            id
            branch_name
        }
     }
}

`;
class ProfileSection extends Component {
    constructor(props) {
        super(props)
        console.log("props.getStudentProfile", props.getStudentProfile);
        let username = "";
        if (props.getStudentProfile.name != "") {
            username = props.getStudentProfile.name;
        }
        let college = "";
        if (props.getStudentProfile.college_name != "") {
            college = props.getStudentProfile.college_name;
        }
        let branchvalue = "";
        if (props.getStudentProfile.branch_id != "") {
            branchvalue = { value: props.getStudentProfile.branch_id, label: props.getStudentProfile.branch_name }
        }
        let feedback = "";
        if (props.getStudentProfile.feedback != "") {
            feedback = props.getStudentProfile.feedback
        }
        let picture = ""
        if (props.getStudentProfile.profile_pic != "") {
            picture = props.getStudentProfile.profile_pic
        }
        let institute_name = ""
        if (props.getStudentProfile.institute_name != "") {
            institute_name = props.getStudentProfile.institute_name
        }
        console.log("props.getStudentProfile.user_exams", props.getStudentProfile.user_exams);
        let userexams = [];
        if (props.getStudentProfile.user_exams.length > 0) {
            props.getStudentProfile.user_exams.map((item) => {
                let findData = props.studentGlobals.exams.find((a) => a.id == item.exam_type)
                let label = "";
                if (item.exam_type == "1") {
                    label = <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> {findData.exam}</p>
                }
                else if (item.exam_type == "2") {
                    label = <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> {findData.exam}</p>
                }
                else if (item.exam_type == "3") {
                    label = <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> {findData.exam}</p>
                }
                const extype = { value: item.exam_type, label: label }
                const newObj = {
                    hallticketno: item.hall_ticket_no,
                    examtype: item.exam_type,
                    examtypevalue: extype
                }
                userexams.push(newObj);

            })
        }
        console.log("constructor", userexams);

        this.state = {
            currentStep: 1,
            username: username,
            mobile: props.getStudentProfile.mobile,
            email: props.getStudentProfile.email,
            college: college,
            branch: props.getStudentProfile.branch_id,
            branchvalue: branchvalue,
            userexams: userexams,
            hallticketno: "",
            examtype: "",
            examtypevalue: "",
            feedback: feedback,
            formValid: true,
            submitError: "",
            type: "normal",
            picture_filename: "Choose File",
            picture: picture,
            show1: false,
            profile_pic_error: "",
            institute_name:institute_name
        }
    }
    fileUpload(file, stream) {
        console.log("fileupload", file);

        //const url = "http://admin.mylearningplus.in/mobile.php?uploadImage=true";
        const url = "https://rizee.in/mobile.php?uploadImage=true";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("stream", stream);
        const config = {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        return axios.post(url, formData, config);
    }

    handleInputChange = e => {
        console.log("handleInputChange", e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        if (name == "hallticketno") {
            var pattern = new RegExp("^[0-9]*$");
            if (!pattern.test(e.target.value)) {
                this.setState({ [name]: "" });
            }
            else {

                this.setState({ [name]: value });
            }

        }
        else {

            this.setState({ [name]: value });
        }

    };
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (name == "examtype") {
            let subjectData = this.props.studentGlobals.exams.find((a) => a.id == value);
            let label = "";
            if (evalue == "1") {
                label = <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> {subjectData.exam}</p>
            }
            else if (evalue == "2") {
                label = <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> {subjectData.exam}</p>
            }
            else if (evalue == "3") {
                label = <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> {subjectData.exam}</p>
            }
            this.setState({
                examtypevalue: {
                    value: subjectData.id,
                    label: label
                }

            });
        }
        this.setState({ [name]: value });
    }


    handleFormSubmit = e => {
        e.preventDefault();
        //console.log("Form submitted");
        if (this.state.formValid) {
            console.log("Form submitted", this.state.examtype);
            let updateuserprofile = "";
            let newArray = [];
            this.state.userexams.map((item) => {
                const newObj = {
                    exam_type: parseInt(item.examtype),
                    hall_ticket_no: item.hallticketno
                }
                newArray.push(newObj);
            })
            if (this.state.examtype != "") {
                if (this.state.type == "normal") {
                    var form_userexams = {
                        exam_type: parseInt(this.state.examtype),
                        hall_ticket_no: this.state.hallticketno
                    }
                    var index = 0;
                    var object = form_userexams;
                    var modifiedarray = newArray.splice(index, 0, object);
                }
            }


            console.log("newArray", newArray);


            // console.log("modifiedarray", modifiedarray);
            let finaluserexams = newArray;
            updateuserprofile = {
                mobile: this.state.mobile,
                class_id: parseInt(this.state.class),
                branch_id: parseInt(this.state.branch),
                college_name: this.state.college,
                profile_pic: this.state.picture,
                feedback: this.state.feedback,
                user_exams: finaluserexams
            };
            console.log("updateuserprofile", updateuserprofile);
            this.updateuserprofile(updateuserprofile).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error(
                    "ERR =>",
                    error.graphQLErrors.map(x => x.message)
                );
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    updateuserprofile = async params => {
        await this.props.updateuserprofile({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("data.updateStudentProfile", data.updateStudentProfile);
                if (data.updateStudentProfile) {
                    this.setState({
                        currentStep: 5,

                        formValid: true
                    });
                    localStorage.setItem("profile_pic", this.state.picture);
                    window.location.reload();

                    setTimeout(() => {
                        this.SetpageLoad();
                    }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1 });
        //this.props.onHide()
    };
    getBranch() {
        console.log("getBranch", this.props);
        let getData = this.props.globals.globalBranches;
        let newArray = [];
        if (getData != null) {

            getData.map((item) => {
                const newObj = {
                    value: item.id,
                    label: item.branch_name
                }
                newArray.push(newObj);
            })

        }
        return newArray;

    }
    getExamtype() {
        let getData = this.props.studentGlobals.exams;
        let newArray = [];
        if (getData != null) {
            getData.map((item) => {
                if (item.id == "1") {
                    const newObj = {
                        value: item.id,
                        label: <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> {item.exam}</p>
                    }
                    newArray.push(newObj);
                }
                else if (item.id == "2") {
                    const newObj = {
                        value: item.id,
                        label: <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> {item.exam}</p>
                    }
                    newArray.push(newObj);
                }
                else if (item.id == "3") {
                    const newObj = {
                        value: item.id,
                        label: <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> {item.exam}</p>
                    }
                    newArray.push(newObj);
                }

                //console.log("newObj", newObj);

            })
        }
        //console.log("newArray", newArray);


        return newArray;
    }
    addPost = () => {
        this.setState({ userexams: [...this.state.userexams, ""] })
    }
    handleRemove = (index) => {
        this.state.userexams.splice(index, 1)
        this.setState({ userexams: this.state.userexams })
    }
    edithandleRemove = (index) => {
        this.state.userexams.splice(index, 1)
        this.setState({ userexams: this.state.userexams });

        this.setState({ type: "edit" });
        // if (this.state.formValid) {
        //     this.setState({ submitError: "" });
        // }
    }
    addhallticketno_handlechange = (e, index) => {
        let arr = this.state.userexams;
        var pattern = new RegExp("^[0-9]*$");
        if (!pattern.test(e.target.value)) {
            const newarr = {
                ...arr[index],
                hallticketno: "",
                examtype: "",
                examtypevalue: ""
            }
            arr[index] = newarr;
            this.setState({ userexams: arr });
        }
        else {
            const newarr = {
                ...arr[index],
                hallticketno: e.target.value,
                examtype: "",
                examtypevalue: "",
            }
            arr[index] = newarr;
            this.setState({ userexams: arr });

        }

    }
    addexamtype_handlechange = (index, ename, evalue) => {

        let arr = this.state.userexams;
        let getData = this.props.studentGlobals.exams.find((a) => a.id == evalue);
        let newObj = "";
        if (evalue == "1") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        else if (evalue == "2") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        else if (evalue == "3") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        const newarr = {
            ...arr[index],
            examtype: evalue,
            examtypevalue: newObj,
        }
        arr[index] = newarr;
        this.setState({ userexams: arr });
    }
    edithallticketno_handlechange = (e, index) => {
        let arr = this.state.userexams;
        var pattern = new RegExp("^[0-9]*$");
        if (!pattern.test(e.target.value)) {
            const newarr = {
                ...arr[index],
                hallticketno: "",
                examtype: "",
                examtypevalue: ""
            }
            arr[index] = newarr;
            this.setState({ userexams: arr, type: "edit" });
        }
        else {
            const newarr = {
                ...arr[index],
                hallticketno: e.target.value,
                examtype: "",
                examtypevalue: "",
            }
            arr[index] = newarr;
            this.setState({ userexams: arr, type: "edit" });

        }

    }
    editexamtype_handlechange = (index, ename, evalue) => {

        let arr = this.state.userexams;
        let getData = this.props.studentGlobals.exams.find((a) => a.id == evalue);
        let newObj = "";
        if (evalue == "1") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        else if (evalue == "2") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        else if (evalue == "3") {
            newObj = {
                value: evalue,
                label: <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> {getData.exam}</p>
            }

        }
        const newarr = {
            ...arr[index],
            examtype: evalue,
            examtypevalue: newObj,
        }
        arr[index] = newarr;
        this.setState({ userexams: arr, type: "edit" });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fullnameValid = this.state.fullnameValid;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let mobileValid = this.state.mobileValid;
        let usertypeValid = this.state.usertypeValid;
        let subjectValid = this.state.subjectValid;
        let class11Valid = this.state.class11Valid;
        let class12Valid = this.state.class12Valid;


        switch (fieldName) {
            case "fullname":
                if (value.length == "") {
                    fullnameValid = false;
                    fieldValidationErrors.fullname = "fullname Cannot Be Empty";
                } else {
                    fullnameValid = true;
                    fieldValidationErrors.fullname = "";
                }

                break;
            case "username":
                if (value.length == "") {
                    usernameValid = false;
                    fieldValidationErrors.username = "username Cannot Be Empty";
                } else {
                    usernameValid = true;
                    fieldValidationErrors.username = "";
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
            case "password":
                if (value.length == "") {
                    passwordValid = false;
                    fieldValidationErrors.password = "Password cannot be Empty";
                } else {
                    passwordValid = true;
                    fieldValidationErrors.password = "";
                }

                break;

            case "mobile":
                var pattern = new RegExp("^[7-9][0-9]{9}$");

                if (value.length == "") {
                    mobileValid = false;
                    fieldValidationErrors.mobile = "Mobile No. Cannot Be Empty";
                } else if (!pattern.test(value)) {
                    mobileValid = false;
                    fieldValidationErrors.mobile = "Invalid mobile";
                } else {
                    mobileValid = true;
                    fieldValidationErrors.mobile = "";
                }

                break;

            case "usertype":
                if (value.length == "") {
                    usertypeValid = false;
                    fieldValidationErrors.usertype = "usertype Cannot Be Empty";
                } else {
                    usertypeValid = true;
                    fieldValidationErrors.usertype = "";
                }

                break;
            case "subject":
                if (value.length == "") {
                    subjectValid = false;
                    fieldValidationErrors.subject = "subject Cannot Be Empty";
                } else {
                    subjectValid = true;
                    fieldValidationErrors.subject = "";
                }

                break;

            case "class11":
                if (value.length == "") {
                    class11Valid = false;
                    fieldValidationErrors.class11 = "class11 Cannot Be Empty";
                } else {
                    class11Valid = true;
                    fieldValidationErrors.class11 = "";
                }

                break;

            case "class12":
                if (value.length == "") {
                    class12Valid = false;
                    fieldValidationErrors.class12 = "class12 Cannot Be Empty";
                } else {
                    class12Valid = true;
                    fieldValidationErrors.class12 = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                fullnameValid: fullnameValid,
                usernameValid: usernameValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
                mobileValid: mobileValid,
                usertypeValid: usertypeValid,
                subjectValid: subjectValid,
                class12Valid: class12Valid,
                class11Valid: class11Valid

            },
            this.validateForm
        );
    }
    validateForm() {
        console.log("validateForm", this.state.class11Valid, this.state.class12Valid);
        this.setState({
            formValid:
                this.state.fullnameValid
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }
    checkExtensionType = (e) => {
        console.log("checkMimeType", e.target.files);
        const name = e.target.name;


        if (name == "picture") {
            let files = e.target.files
            let err = ''
            const types = ['image/png', 'image/jpeg', 'image/gif']
            for (var x = 0; x < files.length; x++) {
                if (types.every(type => files[x].type !== type)) {
                    err += "Uploaded file is not a valid image. Only JPG and PNG files are allowed.";
                }
            };

            if (err !== '') {
                e.target.value = null
                console.log(err);
                // return false;
                this.setState({
                    profile_pic_error: err
                });
                this.showModal1();
            } else {
                console.log("rajeev", e.target.name, e.target.files);
                var file = e.target.files[0];

                let fileread = new FileReader();

                this.setState({
                    picture_filename: "Uploading..."
                });

                fileread.readAsDataURL(file);
                fileread.onload = async e => {
                    console.log("Target", e.target);

                    let fobj = {
                        stream: e.target.result,
                        filename: file.name,
                        mimetype: file.type
                    };

                    const upload = await this.fileUpload(file, fobj.stream);
                    console.log("file uploaded", upload.data.result);

                    if (upload.data.result == "success") {
                        this.setState({ picture: upload.data.filename });
                        this.setState({
                            picture_filename: file.name
                        });
                        //this.handleFormSubmit(upload.data.filename);
                    }
                };

            }

        }
    };
    showModal1 = () => {
        this.setState({ show1: true });
    };

    hideModal1 = () => {
        this.setState({ show1: false });
    };

    handleClick = (e) => {
        this.refs.fileUploader.click();
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


        // Branch
        const Branch = [
            { value: 1, label: 'Hyderabad' },
            { value: 2, label: 'Hyderabad-2' }
        ];

        // ExamType
        const ExamType = [
            { value: 1, label: <p><Image src={require('../../../images/Neet-Exam.png')} width="20" alt="Neet" /> NEET</p> },
            { value: 2, label: <p><Image src={require('../../../images/Jee(Mains)-Exam.png')} width="20" alt="Neet" /> Jee (Mains)</p> },
            { value: 3, label: <p><Image src={require('../../../images/Jee(Advance)-Exam.png')} width="20" alt="Neet" /> Jee (Advance)</p> },
            { value: 4, label: <p><Image src={require('../../../images/Eamcet-Exam.png')} width="20" alt="Neet" /> EAMCET</p> }
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
        //console.log("studentGlobals.studentGlobals", studentGlobals.studentGlobals);
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        console.log("isuserValid", isuserValid);
        console.log("this.state", this.state);
        if (isuserValid.profile_tab == true) {
            return (
                <section className="profile_section pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">

                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                                <h5 className="text-danger">Profile feature is not available for your package</h5>
                            </div>

                        </Col>
                    </Row>

                </section>
            )
        }
        else {
            return (
                <section className="profile_section pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h4 className="title">Profile</h4>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white">
                                    <Card.Title className="m-0 h6">Public Information</Card.Title>
                                </Card.Header>
                                {this.state.currentStep == 5 ? (
                                    <Form.Text className="form-text text-danger">
                                        User Saved successfully
                                    </Form.Text>
                                ) : (
                                        <Form.Text className="form-text text-danger">
                                            {this.state.submitError}
                                        </Form.Text>
                                    )}
                                <Card.Body>
                                    <Row>
                                        <Col xl={3} lg={3} md={4} sm={12}>
                                            <div className="profile_block pb-3">
                                                <div className="profile_img">
                                                    {this.props.getStudentProfile.profile_pic != "" ? (

                                                        < Image width="140" style={{ height: '140px' }} src={`https://admin.rizee.in/files/${this.props.getStudentProfile.profile_pic}`} alt="profile-img" thumbnail roundedCircle />
                                                    ) : this.state.picture != "" ? (
                                                        <Image width="140" style={{ height: "140px" }} src={this.state.picture} alt="profile-img" thumbnail roundedCircle />
                                                    ) : (
                                                                <Image width="140" style={{ height: "140px" }} src={require('../../../images/businessman.png')} alt="profile-img" thumbnail roundedCircle />
                                                            )}

                                                    {/* <div className="upload_btn">
                                                        <i className="fal fa-edit" onClick={this.handleInputChangelogo} />
                                                    </div> */}
                                                    <div className="upload_btn" onClick={this.handleClick}>
                                                        <i className="fas fa-camera"></i>
                                                        <input type="file" name="picture" onChange={this.checkExtensionType} id="file" ref="fileUploader" style={{ display: "none" }} />
                                                    </div>
                                                </div>
                                                <small className="file-text mt-3"><span className="text-primary">{this.state.picture_filename}</span><br /> For best results, image Only JPG and PNG files are allowed</small>
                                            </div>
                                        </Col>
                                        <Col xl={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }} md={8} sm={12}>
                                            <Form>
                                                <Row>
                                                    <Form.Group as={Col} sm={6} xs={12} controlId="formBasicName">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="username"
                                                            value={this.state.username}
                                                            onChange={this.handleInputChange}
                                                            placeholder="Enter Name"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={6} xs={12} controlId="formBasicMobile">
                                                        <Form.Label>Mobile Number</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="mobile"
                                                            value={this.state.mobile}
                                                            onChange={this.handleInputChange}
                                                            placeholder="Enter Mobile"
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleInputChange}
                                                        placeholder="Enter Email"
                                                        readOnly
                                                    />
                                                </Form.Group>
                                                <Button
                                                    variant="primary px-4"
                                                    type="submit"
                                                    onClick={this.handleFormSubmit}
                                                > Save </Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white">
                                    <Card.Title className="m-0 h6">Private Information</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col lg={10} md={12}>
                                            <Form>
                                                <Form.Row>
                                                    {Cookies.get("student_userlevel") != 1 ? (
                                                        // <Form.Group as={Col} sm={6} xs={12} controlId="formBasicCollege">
                                                        //     <Form.Label>College Name</Form.Label>
                                                        //     <Form.Control
                                                        //         type="text"
                                                        //         name="college"
                                                        //         value={this.state.college}
                                                        //         onChange={this.handleInputChange}
                                                        //         placeholder="Enter College Name"
                                                        //         autoComplete="off" />
                                                        // </Form.Group>
                                                        ""
                                                    ) : (
                                                        <React.Fragment>
                                                            <Form.Group as={Col} sm={6} xs={12} controlId="formBasicCollege">
                                                                <Form.Label>College Name</Form.Label>
                                                                <Form.Control
                                                                    readOnly="readOnly"
                                                                    type="text"
                                                                    name="college"
                                                                    value={this.state.institute_name}
                                                                    onChange={this.handleInputChange}
                                                                    placeholder="Enter College Name"
                                                                    autoComplete="off" />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} xs={12} controlId="formBasicBranch">
                                                            <Form.Label>Branch</Form.Label>
                                                            <SelectDropDown
                                                                stateData={this.state.branchvalue}
                                                                handleChange={this.selecthandleInputChange}
                                                                name="branch"
                                                                options={this.getBranch()}
                                                                placeholderName={'Branch'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </Form.Group>
                                                        </React.Fragment>
                                                        )}

                                                    
                                                </Form.Row>
                                                {this.props.getStudentProfile.user_exams.length === 0 ? (
                                                    <React.Fragment>
                                                        <Form.Row>
                                                            <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} xs={12} controlId="formBasicAdmission">
                                                                <Form.Label>Admission/Hall ticket no.</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="hallticketno"
                                                                    value={this.state.hallticketno}
                                                                    onChange={this.handleInputChange}
                                                                    placeholder="Enter Hall ticket no."
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} xl={5} lg={5} md={5} sm={12} xs={12} controlId="formBasicBranch">
                                                                <Form.Label>Exam Type</Form.Label>
                                                                <SelectDropDown
                                                                    stateData={this.state.examtypevalue}
                                                                    handleChange={this.selecthandleInputChange}
                                                                    name="examtype"
                                                                    options={this.getExamtype()}
                                                                    placeholderName={'Exams'}
                                                                    dropdownIndicator={{ DropdownIndicator }} />
                                                            </Form.Group>
                                                            <Form.Group as={Col} xl={1} lg={1} md={1} sm={1} xs={2} controlId="formBasicBranch">
                                                                <Button className="btn btn-lightblue mt-md-4" onClick={this.addPost} block> <i className="fas fa-plus" /></Button>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        {this.state.userexams.map((userexams, index) => {
                                                            return (
                                                                <Form.Row>
                                                                    <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} xs={12} controlId="formBasicAdmission">
                                                                        <Form.Label>Admission/Hall ticket no.</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="hallticketno"
                                                                            onChange={(e) => this.addhallticketno_handlechange(e, index)}
                                                                            value={userexams.hallticketno}
                                                                            placeholder="Enter Hall ticket no."
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group as={Col} xl={5} lg={5} md={5} sm={12} xs={12} controlId="formBasicBranch">
                                                                        <Form.Label>Exam Type</Form.Label>
                                                                        <SelectDropDown
                                                                            index={index}
                                                                            stateData={userexams.examtypevalue}
                                                                            handleChange={this.addexamtype_handlechange}
                                                                            name="examtype"
                                                                            options={this.getExamtype()}
                                                                            placeholderName={'Exams'}
                                                                            dropdownIndicator={{ DropdownIndicator }} />
                                                                    </Form.Group>
                                                                    <Form.Group as={Col} xl={1} lg={1} md={1} sm={1} xs={2} controlId="formBasicBranch">
                                                                        <Button onClick={() => this.handleRemove(index)} className="btn btn-lightred mt-md-4" block> <i className="fas fa-minus" /></Button>
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            )
                                                        })}
                                                    </React.Fragment>
                                                ) : (
                                                        <React.Fragment>
                                                            {this.state.userexams.map((item, index) => {
                                                                return (
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} xs={12} controlId="formBasicAdmission">
                                                                            <Form.Label>Admission/Hall ticket no.</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="hallticketno"
                                                                                value={item.hallticketno}
                                                                                onChange={(e) => this.edithallticketno_handlechange(e, index)}
                                                                                placeholder="Enter Hall ticket no."
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} xl={5} lg={5} md={5} sm={12} xs={12} controlId="formBasicBranch">
                                                                            <Form.Label>Exam Type</Form.Label>
                                                                            <SelectDropDown
                                                                                index={index}
                                                                                stateData={item.examtypevalue}
                                                                                handleChange={this.editexamtype_handlechange}
                                                                                name="examtype"
                                                                                options={this.getExamtype()}
                                                                                placeholderName={'Exams'}
                                                                                dropdownIndicator={{ DropdownIndicator }} />
                                                                        </Form.Group>
                                                                        {index == 0 ? (
                                                                            <Form.Group as={Col} xl={1} lg={1} md={1} sm={1} xs={2} controlId="formBasicBranch">
                                                                                <Button className="btn btn-lightblue mt-md-4" onClick={this.addPost} block> <i className="fas fa-plus" /></Button>
                                                                            </Form.Group>
                                                                        ) : (<Form.Group as={Col} xl={1} lg={1} md={1} sm={1} xs={2} controlId="formBasicBranch">
                                                                            <Button onClick={() => this.edithandleRemove(index)} className="btn btn-lightred mt-md-4" block> <i className="fas fa-minus" /></Button>
                                                                        </Form.Group>)}

                                                                    </Form.Row>
                                                                )
                                                            })}
                                                        </React.Fragment>
                                                    )}


                                                <Form.Group controlId="formBasicSubject">
                                                    <Form.Label>Feedback form with Subject</Form.Label>
                                                    <Form.Control
                                                        name="feedback"
                                                        as="textarea"
                                                        rows="4"
                                                        placeholder="Enter Subject"
                                                        value={this.state.feedback}
                                                        onChange={this.handleInputChange} />
                                                </Form.Group>
                                                <Button className="btn btn-blue px-4"
                                                    type="submit"
                                                    onClick={this.handleFormSubmit}
                                                >Save</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Picerror picerror={this.state.profile_pic_error} show={this.state.show1} onHide={() => this.setState({ show1: false })} />
                </section>
            )
        }

    }
}
export default withRouter(
    compose(
        graphql(UPDATE_USER_PROFILE, {
            name: "updateuserprofile"
        }),
        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        institution_id: props.getStudentProfile.institution_id
                    },
                }), name: "globals"
            })
    )(ProfileSection)
);
