import React, { Component } from 'react'
import { Row, Col, Card, Tab, Nav, Form, Table, Image, Accordion, Button } from 'react-bootstrap'
import { components } from 'react-select'
import Select from 'react-select';
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown'
import './_previous-paper-analysis.scss'
import * as Cookies from "es-cookie";
import { MultiSelect } from "react-multi-select-component";
import { withRouter, Link } from "react-router-dom";
import moment from 'moment';
import UserRestrictionAlert from '../home/UserRestrictionAlert';

// Exams
const SelectExam = [
    { value: "1", label: 'Mains' },
    { value: "2", label: 'Advance' }

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



class HeaderTabContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRestionModalShow: false,
            examtype: props.stateData.examtype,
            subject: props.stateData.subject,
            subjectValue: props.stateData.subjectValue,
            yeartype: props.stateData.yeartype,
            yeartypevalue: props.stateData.yeartypevalue,
            activeSubject: "",
            subexamtype: props.stateData.subexamtype,
            subexamtypeValue: props.stateData.subexamtypeValue,
            defaulteventKey: "first",
            submitError: ""
        }
    }
    searchSubmit = () => {

        if (this.state.yeartype.length == 0) {
            this.setState({
                submitError: "Please Select Exam Slot"
            });
        }
        else {
            this.setState({
                submitError: ""
            });
            this.props.searchSubmit(this.state);
        }


    }

    //for radio button
    handleInputChange = (e) => {

        const name = e.target.name
        const value = e.target.value
        if (name == "examtype") {
            this.setState({

                subject: "0",
                subjectValue: {
                    value: "0",
                    label: "Select All"
                },
                yeartype: [],
                yeartypevalue: [],
                activeSubject: "",
                subexamtype: "1",
                subexamtypeValue: {
                    value: "1",
                    label: "MAINS"
                },
                defaulteventKey: "first"
            });
        }

        this.setState({ [name]: value });

    }
    //for single dropdown
    selecthandleInputChange = (ename, evalue) => {

        const name = ename;
        const value = evalue;
        if (name == "subject") {
            if (value != "0") {
                let subjectData = this.props.globalsubjects.find((a) => a.id == value);
                this.setState({
                    subjectValue: {
                        value: subjectData.id,
                        label: subjectData.subject
                    }
                });
            } else {
                this.setState({
                    subjectValue: {
                        value: "0",
                        label: "Select All"
                    }
                });
            }

        }
        if (name == "subexamtype") {

            if (value == "1") {

                this.setState({
                    subexamtypeValue: {
                        value: "1",
                        label: "MAINS"
                    }
                    ,
                    subject: "0",
                    subjectValue: {
                        value: "0",
                        label: "Select All"
                    },
                    yeartype: [],
                    yeartypevalue: [],
                });

            }
            else {
                this.setState({
                    subexamtypeValue: {
                        value: "2",
                        label: "ADVANCE"
                    },
                    subject: "0",
                    subjectValue: {
                        value: "0",
                        label: "Select All"
                    },
                    yeartype: [],
                    yeartypevalue: [],
                });

            }

        }

        this.setState({ [name]: value });
    }
    //for multiple dropdown
    handleMultipleSelectInputChange = (e, name, data) => {
        console.log("handleMultipleSelectInputChange", data, e);

        if (name == "yeartype") {
            let yeartype = Array();
            let yeartypevalue = Array();

            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const yeartypeval = e[i];
                    if (yeartypeval.checked == false) {
                        if (data.length != e.length) {
                            this.setState({
                                userRestionModalShow: true
                            })
                        }

                    }
                    else {
                        const newObj = {
                            label: yeartypeval.label,
                            value: yeartypeval.value,
                            year: yeartypeval.year
                        }
                        yeartypevalue.push(newObj);
                        yeartype.push(yeartypeval.value);
                    }


                }
                this.setState({
                    yeartypevalue: yeartypevalue,
                    yeartype: yeartype
                });
            }
            else {
                this.setState({
                    yeartypevalue: [],
                    yeartype: []
                });

            }
        }
    };
    getSubjects() {
        let subjectArray = [];
        let subjectfilter = [];

        if (Cookies.get("examid") == 5) {
            if (this.state.examtype == "0") {
                subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == "1");
            }
            else {
                subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == "2");
            }


        }
        else {
            subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        }



        this.props.globalsubjects.map((smap) => {
            let data = subjectfilter.exam_subjects.filter((a) => a.subject_id == smap.id)

            if (data.length > 0) {
                const newObj = {
                    value: smap.id,
                    label: smap.subject
                }
                subjectArray.push(newObj);
            }

        });
        if (subjectArray.length > 0) {
            const newObj1 = {
                value: "0",
                label: "Select All"
            }
            subjectArray.unshift(newObj1);

        }
        return subjectArray;

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

        console.log("isStudentUserValid", isStudentUserValid);

        
        

        //start get test data
        let yearnewArray = [];

        this.props.studentGlobals.previousSets.map((item) => {
            if (item != undefined) {
                if (Cookies.get("examid") != 5) {

                    if (item.exam == Cookies.get("examid")) {
                        if (item.exam == "1") {
                            let labelname = item.qset + "-" + item.year
                            if ((item.enabled == true) ) {
                                const newObj = {
                                    value: item.id,
                                    label: labelname,
                                    year: item.year,
                                    checked: true
                                }
                                yearnewArray.push(newObj);
                            }
                            else {
                                const newObj = {
                                    value: item.id,
                                    label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {labelname}</p>,
                                    year: item.year,
                                    checked: false
                                }
                                yearnewArray.push(newObj);
                            }

                        }
                        else if (item.exam == "2") {
                            if (this.state.subexamtype == item.pexamtype) {

                                let labelname = item.qset + "-" + item.year
                                if ((item.enabled == true)) {
                                    const newObj = {
                                        value: item.id,
                                        label: labelname,
                                        year: item.year,
                                        checked: true
                                    }
                                    yearnewArray.push(newObj);
                                }
                                else {
                                    const newObj = {
                                        value: item.id,
                                        label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {labelname}</p>,
                                        year: item.year,
                                        checked: false
                                    }
                                    yearnewArray.push(newObj);
                                }
                            }
                        }


                    }

                }
                else {
                    if (this.state.examtype == "0") {
                        if (item.exam == "1") {
                            // if(this.state.subexamtype==item.pexamtype){
                            let labelname = item.qset + "-" + item.year
                            if ((item.enabled == true)) {
                                const newObj = {
                                    value: item.id,
                                    label: labelname,
                                    year: item.year,
                                    checked: true
                                }
                                yearnewArray.push(newObj);
                            }
                            else {
                                const newObj = {
                                    value: item.id,
                                    label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {labelname}</p>,
                                    year: item.year,
                                    checked: false
                                }
                                yearnewArray.push(newObj);
                            }
                            //}
                        }

                    }
                    else if (this.state.examtype == "1") {
                        if (item.exam == "2") {
                            if (this.state.subexamtype == item.pexamtype) {
                                let labelname = item.qset + "-" + item.year
                                if ((item.enabled == true)) {
                                    const newObj = {
                                        value: item.id,
                                        label: labelname,
                                        year: item.year,
                                        checked: true
                                    }
                                    yearnewArray.push(newObj);
                                }
                                else {
                                    const newObj = {
                                        value: item.id,
                                        label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {labelname}</p>,
                                        year: item.year,
                                        checked: false
                                    }
                                    yearnewArray.push(newObj);
                                }
                            }
                        }

                    }



                }
            }


        })

        yearnewArray = yearnewArray.sort((a, b) => {
            let nameA = a.year
            let nameB = b.year

            if (nameB < nameA) {
                return -1;
            }
            if (nameB > nameA) {
                return 1;
            } // names must be equal
            return 0;
        })


        let yearselectall = true;
        let yearlabelledBy = "Select";
        let yeardisableSearch = false;
        if (yearnewArray.length > 0) {
            yearselectall = true;
            yeardisableSearch = false;
        }
        else {
            yeardisableSearch = true;
            yearselectall = false;
            yearlabelledBy = "No Options"
        }
        //end get year data
        let currentTime = moment().unix();
        let trailRestriction = this.props.globalsubjects.find((a) => a.id == "2");
        let clength = trailRestriction.studentChapters.filter((a) => a.enabled == true || isStudentUserValid.previous_sets.split(",").includes(a.id.toString()));


        return (
            <Card as={Card.Body}>
                <Form>
                    <Row>
                        {Cookies.get("examid") == 5 ? (
                            <Col xl={3} lg={3} md={6} sm={12}>
                                <Form.Label>Exam </Form.Label>

                                <div key="inline-radio" className="mb-3">

                                    <Form.Check className={this.state.examtype == "0" ? ("active") : (null)} inline custom label={
                                        <div className="d-flex align-items-center">
                                            <Image src={require('../../../images/Neet-Exam.png')} alt='img' width="20" height="23" />
                                            <h6 className="mb-0 ml-1">NEET</h6>
                                        </div>
                                    } type="radio" id="inline-radio-1" name="examtype"
                                        checked={this.state.examtype == "0" ? (true) : (false)}
                                        value="0" onChange={(e) => this.handleInputChange(e)} />

                                    <Form.Check className={this.state.examtype == "1" ? ("active") : (null)} inline custom label={
                                        <div className="d-flex align-items-center">
                                            <Image src={require('../../../images/jee-exam.png')} alt='img' width="23" height="23" />
                                            <h6 className="mb-0 ml-1">JEE</h6>
                                        </div>
                                    } type="radio" id={`inline-radio-2`}
                                        name="examtype"

                                        checked={this.state.examtype == "1" ? (true) : (false)}
                                        value="1" onChange={(e) => this.handleInputChange(e)} />
                                </div>
                            </Col>
                        ) : ("")}

                        {this.state.examtype == "1" || Cookies.get("examid") == "2" ? (
                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={12}>
                                <Form.Label>Select Exam Type</Form.Label>
                                <SelectDropDown
                                    stateData={this.state.subexamtypeValue}
                                    handleChange={this.selecthandleInputChange}
                                    name="subexamtype"
                                    options={SelectExam}
                                    placeholderName={'Exam type'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />

                            </Form.Group>
                        ) : (
                                ""
                            )}


                        <Form.Group as={Col} xl={3} lg={3} md={6} sm={12}>
                            <Form.Label>Select Exam Slot</Form.Label>
                            <MultiSelect
                                overrideStrings={{
                                    "allItemsAreSelected": "All Years are selected.",
                                    "selectSomeItems": yearlabelledBy
                                }
                                }
                                disableSearch={yeardisableSearch}
                                hasSelectAll={yearselectall}
                                options={yearnewArray}
                                value={this.state.yeartypevalue}
                                onChange={(e) => this.handleMultipleSelectInputChange(e, "yeartype", yearnewArray)}
                                labelledBy={"Select"}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xl={3} lg={3} md={6} sm={12}>
                            <Form.Label>Select Subject</Form.Label>
                            <SelectDropDown
                                stateData={this.state.subjectValue}
                                handleChange={this.selecthandleInputChange}
                                name="subject"
                                options={this.getSubjects()}
                                placeholderName={'Subject'}
                                dropdownIndicator={{ DropdownIndicator }}
                            />
                        </Form.Group>

                        <Col xl={12} lg={12} md={12} sm={12} className="text-left">
                            <div>
                                <small style={{ color: "#f81201", fontWeight: "bold" }}>{this.state.submitError}</small>
                            </div>
                            <Button className="btn-blue my-2 px-5"
                                onClick={() => this.searchSubmit()}>Submit</Button>
                            {(this.props.isTrialUser.isTrialUser == true && clength.length < 20) || (currentTime > this.props.isTrialUser.expiry_date && clength.length < 20) ? (<div style={{ color: "#f81201" }}>
                                {Cookies.get("student_userlevel") == "1" ? (
                                    <small>*Note: Dear Student, Now you have limited Access.</small>
                                ) : (
                                        <small>*Note: To access all Previous Papers <span style={{ color: "#f81201", fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                    )}

                            </div>) : ("")}
                        </Col>

                    </Row>
                </Form>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Card>


        )
    }
}



export default withRouter(HeaderTabContent);
