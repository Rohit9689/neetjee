import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Form, CardGroup, Table, InputGroup, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'
import '../../../../react-datetime.css'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentCustomExam  
    ) {
        studentCustomExam(
        params: $params
     )
  }
`;

// Class
const Class = [
    { value: 1, label: 'Class-XI' },
    { value: 2, label: 'Class-XII' }
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


class ChapterExamSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            class: 0,
            classvalue: { label: "ALL", value: "0" },
            mainexam: "1",
            mainexamvalue: { value: "1", label: "NEET" },

            subjectArray: [],
            formValid: false,
            submitError: "",
            choiceforexam: 2,
            examname: "",
            sdate: "",
            examtype: 1,
            formErrors: {
                examname: "",
                sdate: "",

            },
            examnameValid: false,
            sdateValid: false

        }
    }
    componentDidMount = () => {
        if (Cookies.get("examid") == "5") {

            //console.log("this.props", this.props.globals.globals.subjects);
            let examsData = this.props.studentGlobals.exams.find((a) => a.id == this.state.mainexam);
            let examsubjectData = examsData.exam_subjects;
            let sampleArray1 = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let someData = this.props.getSubjects.find((a) => a.id == idata.subject_id);

                    const newarr1 = {
                        ...someData,
                        classActive: "",
                    }
                    sampleArray1.push(newarr1);
                    someData.studentChapters.map((item) => {
                        item.checked = false
                    });


                }

            }
            this.setState({
                subjectArray: sampleArray1

            });

        }
        else {
            let sampleArray = [];

            for (let i = 0; i < this.props.getSubjects.length; i++) {
                let someData = this.props.getSubjects[i];
                const newarr1 = {
                    ...someData,
                    classActive: "",
                }
                sampleArray.push(newarr1);
                someData.studentChapters.map((item) => {
                    item.checked = false
                });
            }
            this.setState({
                subjectArray: sampleArray

            });
        }


    }
    handleFormSubmit = e => {
        console.log("handleFormSubmit");
        e.preventDefault();
        let syllabus_web = [];
        for (let i = 0; i < this.state.subjectArray.length; i++) {
            let idata = this.state.subjectArray[i];
            let chapterArray = [];
            let ichdata = idata.studentChapters;
            if (ichdata != undefined) {
                for (let c = 0; c <= ichdata.length; c++) {
                    let cidata = ichdata[c];
                    if (cidata != undefined) {
                        if (cidata.checked == true) {
                            const newchapter = cidata.id;
                            chapterArray.push(newchapter);
                        }
                    }

                }
            }
            //syllabus
            console.log("idata.id", idata.id);
            const newsyllabusweb = {
                subject_id: parseInt(idata.id),
                chapters: chapterArray
            }
            syllabus_web.push(newsyllabusweb);
        }
        console.log("syllabus_web", syllabus_web);
        let status = false;
        syllabus_web.map((a) => {
            if (a.chapters.length > 0) {
                status = true;
            }
        });
        if (this.state.formValid && status == true) {

            let examname = "";
            let examdate = "";
            if (this.state.choiceforexam == "2") {
                examname = this.state.examname;
                examdate = this.state.sdate;
            }
            else {
                examname = "";
                examdate = "";
            }

            let examtype = "";
            if (Cookies.get("examid") != "5") {
                if (Cookies.get("examid") == "2") {
                    examtype = this.state.examtype;
                }
                else {
                    examtype = "0";
                }
            }
            else {
                if (this.state.mainexam == "2") {
                    examtype = this.state.examtype;
                }
                else {
                    examtype = "0";
                }

            }
            const params = {
                mobile: Cookies.get("mobile"),
                sub_type: "chapter",
                class_id: parseInt(this.state.class),
                syllabus: syllabus_web,
                advance_options: 0,
                question_types: [],
                complexity: [],
                question_theory: [],
                syllabus_web: [],
                question_types_subjectwise: [],
                complexity_subjectwise: [],
                question_theory_subjectwise: [],
                source: 1,
                exam_type: parseInt(examtype),
                exam_name: examname,
                exam_date: examdate,
                save_exam_type: parseInt(this.state.choiceforexam)
            };
            console.log("chparams", params);
            this.customfunction(
                params
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        }
        else if (status == false) {
            this.setState({ submitError: "Please select one chapter from at least one subject" });
        }
        else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.studentCustomExam) {
                    let sampleArray = [];

                    for (let i = 0; i < this.props.getSubjects.length; i++) {
                        let someData = this.props.getSubjects[i];
                        const newarr1 = {
                            ...someData,
                            classActive: "",
                        }
                        sampleArray.push(newarr1);
                        someData.studentChapters.map((item) => {
                            item.checked = false
                        });
                    }

                    this.setState({
                        class: 0,
                        subjectArray: sampleArray,
                        formValid: false,
                        submitError: "",
                        examname: "",
                        sdate: "",
                        examtype: 0,
                        formErrors: {
                            choiceforexam: ""
                        }

                    });
                    if (this.state.choiceforexam == "2") {
                        this.props.history.push({
                            pathname: "/student/get-ready-for-exam"
                        }
                        );
                    }
                    else {
                        // this.props.history.push({
                        //     pathname: "/student/subject/custom-instructions",
                        //     state: {
                        //         sessionid: data.studentCustomExam,
                        //         type: "Custom Exam",
                        //         etype: "customchapter"
                        //     }
                        // }
                        // );

                        // this.props.history.push({
                        //     pathname: "/student/get-ready-for-exam"
                        // }
                        // );

                        localStorage.setItem("sessionid", data.studentCustomExam);
                        localStorage.setItem("type", "Custom Exam");
                        localStorage.setItem("stype", "");
                        localStorage.setItem("exam_paper_id", "0");
                        localStorage.setItem("etype", "customchapter");

                        window.open("/student/subject/exam", "_blank")
                    }

                }
            }
        });
    };
    classGetDataFunction(data) {
        let sarray = [];
        const obj1 = {
            value: 0,
            label: "ALL",
        }
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            const obj = {
                value: idata.id,
                label: idata.class,
            }
            sarray.push(obj);
        }
        sarray.unshift(obj1);
        return sarray;
    }
    handleSelectInputChange = (name, value) => {
        console.log("handleSelectInputChange", name, value);
        if (name == "class") {
            if (value == "0") {
                this.setState(
                    {
                        classvalue: {
                            label: "ALL", value: "0"
                        }
                    });
            }
            else {
                let filterData = this.props.studentGlobals.classes.find((a) => a.id == value);
                this.setState({
                    classvalue:
                        { label: filterData.class, value: filterData.id }
                });
            }


        }
        if (name == "mainexam") {
            let examsData = this.props.studentGlobals.exams.find((a) => a.id == value);


            //subjets Data
            let examsubjectData = examsData.exam_subjects;
            let sampleArray1 = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let someData = this.props.getSubjects.find((a) => a.id == idata.subject_id);

                    const newarr1 = {
                        ...someData,
                        classActive: "",
                    }
                    sampleArray1.push(newarr1);
                    someData.studentChapters.map((item) => {
                        item.checked = false
                    });


                }

            }
            //end subjects

            this.setState({
                subjectArray: sampleArray1,
                mainexamvalue: {
                    value: value,
                    label: examsData.exam

                }
            });
        }
        const ename = name;
        const evalue = value;
        this.setState({ [ename]: evalue }

        );
    }
    subjectFunction = (id, index) => {
        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive = "";
        }
        arr[idindex].classActive = "active";
        this.setState({ subjectArray: arr });
    }
    CheckAllFun = (e, subjectid, chid) => {
        let arr = this.state.subjectArray;
        let findsubData = arr.find((a) => a.id == subjectid);
        let idindex = arr.indexOf(findsubData);
        if (e.target.checked == true) {
            findsubData.studentChapters.map((t) => { t.checked = true; });
            arr[idindex].checkedall = true;
        }
        else {
            findsubData.studentChapters.map((t) => { t.checked = ""; });
            arr[idindex].checkedall = "";
        }
        this.setState({ subjectArray: arr });
    }
    chapterFunction = (e, subid, qtyid) => {
        let arr = this.state.subjectArray.map(item => {
            if (item.id == subid) {
                const qtype = item.studentChapters.map(qitem => {

                    if (qitem.id == qtyid) {
                        if (qitem.checked == false) {
                            return { ...qitem, checked: true }
                        } else {
                            return { ...qitem, checked: false }
                        }
                    }
                    return { ...qitem, checked: false };
                })
                return { ...item, studentChapters: qtype };


            }
            return item;
        }

        )
        this.setState({ subjectArray: arr });
    }
    datefunction = (moment) => {
        let date = String(moment._d);
        var res = date.substr(4, 20);
        this.setState({ sdate: res }, () => {
            this.validateField("sdate", "1");
        });
    }
    handleInputChange = e => {
        console.log("handleInputChange", e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        console.log("validateField", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let examnameValid = this.state.examnameValid;
        let sdateValid = this.state.sdateValid;
        switch (fieldName) {
            case "examname":
                if (value.length == "") {
                    examnameValid = false;
                    fieldValidationErrors.examname = "Please Enter Exam name";
                } else {
                    examnameValid = true;
                    fieldValidationErrors.examname = "";
                }

                break;

            case "sdate":
                if (value.length == "") {
                    sdateValid = false;
                    fieldValidationErrors.sdate = "Please Select Date";
                } else {
                    sdateValid = true;
                    fieldValidationErrors.sdate = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                examnameValid: examnameValid,
                sdateValid: sdateValid
            },
            this.validateForm
        );
    }
    validateForm() {
        if (this.state.choiceforexam == 2) {
            console.log("formvalid", "2");
            this.setState({
                formValid: this.state.examnameValid && this.state.sdateValid
            });
        }
        else {
            console.log("formvalid", "0");
            this.setState({
                formValid: true
            });
        }
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }
    getmainexampe() {
        let getArray = [];
        for (let i = 0; i <= this.props.studentGlobals.exams.length; i++) {
            let idata = this.props.studentGlobals.exams[i];
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
    render() {
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);

        const classname = this.props.studentGlobals.classes.find((a) => a.id == this.state.class);
        let examname = ""
        console.log("Cookies.get(examid)", Cookies.get("examid"));
        if (Cookies.get("examid") != "5") {
            examname = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        }
        else {
            examname = this.props.studentGlobals.exams.find((a) => a.id == this.state.mainexam);
        }
        var yesterday = DateTime.moment().subtract(1, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };
        console.log("this.state", this.state);
        let subcount = 0;
        const timesubData = this.state.subjectArray.map((item) => {
            let filterData = item.studentChapters.filter((a) => a.checked == true);
            if (filterData.length > 0) {
                subcount = subcount + 1;
            }

        });

        let examtime = "";
        if (Cookies.get("examid") == "1") {
            examtime = subcount * 45;
        } else {
            examtime = subcount * 60;
        }
        console.log("subcount", subcount);

        let currentTime = moment().unix();
        let trailRestriction = this.props.getSubjects.find((a) => a.id == "2");
        let clength = trailRestriction.studentChapters.filter((a) => (a.enabled == true && moduleValid.ready_exam_tab==false) || isStudentUserValid.chapter_ids.split(",").includes(a.id.toString()));
        console.log("this.props.isStudentUserValid.isTrialUser",this.props.isStudentUserValid.isTrialUser,clength);

        return (
            <section className="get_ready_for_exam_types px-xl-4 px-lg-4">
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <h5 className="mb-4 title">Chapter Exam</h5>
                        {(this.props.isStudentUserValid.isTrialUser == true && clength.length < 20) || (currentTime > this.props.isStudentUserValid.expiry_date && clength.length < 20) ? (

                            <small>
                                <span style={{ color: "#f81201" }}>*Note: To access full syllabus </span>
                                <span style={{ fontWeight: "bold" }}><Link style={{ color: '#007bff' }} to={"/student/package"}>upgrade to Paid Plan</Link></span>
                            </small>) : ("")}
                        <div className="mt-4 get_ready_for_exam_syllabus">
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white border-0 d-md-flex justify-content-between align-items-center">
                                    <h6 className="mb-0 text-uppercase">Syllabus</h6>

                                    <div className="" style={{ width: 200 }}>
                                        <SelectDropDown
                                            stateData={this.state.classvalue}
                                            handleChange={this.handleSelectInputChange}
                                            name="class"
                                            options={this.classGetDataFunction(this.props.studentGlobals.classes)}
                                            placeholderName={'class'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </div>
                                </Card.Header>

                                <Card.Body>
                                    <Form.Text className="form-text text-danger">
                                        {this.state.submitError}
                                    </Form.Text>

                                    {Cookies.get("examid") == "5" ? (


                                        <div className="w-25">

                                            <Form.Group className="mb-4" controlId="formCategory">
                                                <Form.Label>Exam</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.state.mainexamvalue}
                                                    handleChange={this.handleSelectInputChange}
                                                    name="mainexam"
                                                    options={this.getmainexampe()}
                                                    placeholderName={'Exam'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                        </div>

                                    ) : ("")}

                                    <CardGroup className="border-0">
                                        <Card>
                                            <Card.Header className="bg-white">
                                                <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="p-2">
                                                <ul className="list-unstyled subjects-list m-0">
                                                    {this.state.subjectArray.map((getsub, index) => (
                                                        <li
                                                            className={getsub.classActive}
                                                            onClick={() => this.subjectFunction(getsub.id, index)}
                                                        >{getsub.subject} </li>
                                                    ))}
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Header className="bg-white">
                                                <Card.Title className="mb-0 h6">Chapters</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="p-2">
                                                <Scrollbars style={{ height: 130 }}
                                                    {...this.props}
                                                    renderThumbVertical={renderThumb}
                                                    autoHide
                                                    autoHideTimeout={500}
                                                    autoHideDuration={200}>
                                                    <ul className="list-unstyled topic-list m-0 pl-1">
                                                        {this.state.subjectArray.map((chData) => {
                                                            let filterData = chData.studentChapters.filter((a) => (a.enabled == true && moduleValid.ready_exam_tab==false) || isStudentUserValid.chapter_ids.split(",").includes(a.id.toString()));
                                                            if (this.state.class != '0') {
                                                                filterData = chData.studentChapters.filter((a) => a.class == this.state.class && (a.enabled == true && moduleValid.ready_exam_tab==false) || isStudentUserValid.chapter_ids.split(",").includes(a.id.toString()));
                                                            }
                                                            console.log("filterData", filterData);

                                                            return (
                                                                <div>
                                                                    {chData.classActive == "active" ? (
                                                                        <div>
                                                                            {filterData.map((cData, index) => (

                                                                                <div>
                                                                                    <li>
                                                                                        <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                            <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.chapterFunction(e, chData.id, cData.id)} />
                                                                                            <Form.Check.Label
                                                                                                htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                            >{cData.chapter}</Form.Check.Label>
                                                                                        </Form.Check>
                                                                                    </li>
                                                                                </div>
                                                                            ))}

                                                                        </div>
                                                                    ) : ("")}

                                                                </div>

                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="custom_setup mt-4">
                            <Form>
                                <Card as={Card.Body} className="border-0 shadow-sm">
                                    <h6 className="mb-3 text-uppercase">Schedule Exam</h6>

                                    <div className="d-md-flex align-items-center justify-content-between mb-2 px-2">
                                        {/* <Form.Group>
                                            <Form.Check type="radio" id="radioOne" custom inline>
                                                <Form.Check.Input
                                                    value="2"
                                                    name="choiceforexam"
                                                    type="radio"
                                                    onChange={this.handleInputChange}
                                                    defaultChecked={true}
                                                />
                                                <Form.Check.Label htmlFor="radioOne">Save For later</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check type="radio" id="radioTwo" custom inline>
                                                <Form.Check.Input
                                                    value="0"
                                                    name="choiceforexam"
                                                    type="radio"
                                                    onChange={this.handleInputChange}
                                                />
                                                <Form.Check.Label htmlFor="radioTwo">Start Exam</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group> */}
                                        {Cookies.get("examid") == "2" || this.state.mainexam == "2" ? (
                                            <Form.Group>
                                                <Form.Check type="radio" id="radioOne1" custom inline>
                                                    <Form.Check.Input
                                                        name="examtype"
                                                        type="radio"
                                                        onChange={this.handleInputChange}
                                                        value="1"
                                                        defaultChecked={true}
                                                    />
                                                    <Form.Check.Label htmlFor="radioOne1">Main</Form.Check.Label>
                                                </Form.Check>
                                                <Form.Check type="radio" id="radioTwo1" custom inline>
                                                    <Form.Check.Input
                                                        name="examtype"
                                                        type="radio"
                                                        onChange={this.handleInputChange}
                                                        value="2"
                                                    />
                                                    <Form.Check.Label htmlFor="radioTwo1">Advance</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>) : ("")}
                                    </div>
                                    {this.state.choiceforexam == 2 ? (
                                        <React.Fragment>
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="InputExamName">
                                                            <Form.Label className="text-uppercase">Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter Exam Name"
                                                                name="examname"
                                                                value={this.state.examname}
                                                                onChange={this.handleInputChange}
                                                                autoComplete="off"
                                                            />
                                                            <Form.Text className="form-text text-danger">
                                                                {this.state.formErrors.examname}
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group as={Col} xl={6} lg={6} md={6} sm={12} controlId="SelectExamDate" className="selectExamDate">
                                                            <Form.Label className="text-uppercase">Date & Time</Form.Label>
                                                            <InputGroup>
                                                                <InputGroup.Prepend>
                                                                    <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-calendar-day" /></InputGroup.Text>
                                                                </InputGroup.Prepend>
                                                                <div className="up-datedirection w-100">
                                                                <DateTime
                                                                //timeFormat={moment().format("MMM DD YYYY hh:mm:ss")}
                                                                direction="up"
                                                                    dateFormat="DD-MM-YYYY"
                                                                    inputProps={{ placeholder: '29-05-2020' }}
                                                                    name="sdate"
                                                                    onChange={this.datefunction}
                                                                    isValidDate={valid}
                                                                />
                                                                </div>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Row>
                                                </Card.Body>
                                                {/* <Card.Footer className="bg-white">
                                                    <Row>
                                                        <Form.Group className="mb-0" as={Col} xl={6} lg={6} md={6} sm={12}>
                                                            <Form.Check type="radio" id="sradioOne" custom>
                                                                <Form.Check.Input
                                                                    name="saveexamtype"
                                                                    type="radio"
                                                                    value="1"
                                                                    onChange={this.handleInputChange}
                                                                    defaultChecked={true} />
                                                                <Form.Check.Label htmlFor="sradioOne">Preparation For External Exam</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                        <Form.Group className="mb-0" as={Col} xl={6} lg={6} md={6} sm={12}>
                                                            <Form.Check type="radio" id="sradioTwo" custom >
                                                                <Form.Check.Input
                                                                    name="saveexamtype"
                                                                    type="radio"
                                                                    value="2"
                                                                    onChange={this.handleInputChange} />
                                                                <Form.Check.Label htmlFor="sradioTwo">Exam in the system</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                    </Row>
                                                </Card.Footer> */}
                                            </Card>
                                        </React.Fragment>
                                    ) : ("")}

                                </Card>
                            </Form>
                        </div>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0 p-2 bg-white">
                                <Card as={Card.Body} className="border-0 p-2 bg-light">
                                    <Table className="table-borderless">
                                        <tbody>
                                            <tr>
                                                <th>Class </th>

                                                <th>: {this.state.class != 0 ? (classname != undefined ? (classname.class) : ("")) : ("ALL")}</th>

                                            </tr>
                                            <tr>
                                                <th>Exam </th>
                                                <th>: {examname.exam} </th>
                                            </tr>
                                            <tr>
                                                <th> Duration </th>
                                                <th>: {examtime}min </th>
                                            </tr>
                                            {/* <tr>
                                                <th>No Of Questions </th>
                                                <th>: 180</th>
                                            </tr> */}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Card.Header>
                            <Card.Body className="p-2">
                                <Scrollbars style={{ height: "55vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.state.subjectArray.map((data) => (
                                        <Card className="border-0 bg-light">
                                            <Card.Header className="bg-secondary">
                                                <Card.Title className="mb-0 text-white">{data.subject}</Card.Title>
                                            </Card.Header>
                                            <Card.Body className="p-2">
                                                {data.studentChapters.map((data1) => (
                                                    <React.Fragment>{data1.checked == true ? (
                                                        <Card className="single-list-card border-0 p-2">
                                                            <Card.Title className="mb-0 font-weight-normal">{data1.chapter}</Card.Title>
                                                        </Card>) : ("")}</React.Fragment>))}
                                            </Card.Body>
                                        </Card>))}
                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0 bg-white text-center">
                                {this.state.choiceforexam == 2 ? (
                                    <Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-white">Save &amp; Continue</Button>) : (
                                        <Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-white">Start Exam</Button>)}

                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </section >
        )
    }
}

export default withRouter(compose(graphql(COUSTOM_EXAM, {
    name: "customfunction"
})
)(ChapterExamSection));
