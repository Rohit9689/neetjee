import React, { Component } from 'react'
import { Row, Col, Button, Alert, Card, Form, Modal, Popover, OverlayTrigger } from 'react-bootstrap'
import { components } from 'react-select'
import Select from 'react-select';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import parse, { domToReact } from 'html-react-parser';

import '../_preexam.scss';
import '../../learn_practice/start_error_exam/start_error_page/_errorexam.scss';
import SingleOption from '../../learn_practice/start_error_exam/start_error_page/SingleOption';
import SingleOption1 from '../../learn_practice/start_error_exam/start_error_page/SingleOption1';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import { withApollo } from "@apollo/client/react/hoc";
import axios from "axios";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

const ADD_NOTES = gql`
  mutation(
    $params:AddNotes  
    ) {
        addNotes(
        params: $params
     )
  }
`;

const ADD_REPORT = gql`
  mutation(
    $params:AddReport  
    ) {
        addReport(
        params: $params
     )
  }
`;

const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        reports{
            id
            report
        }
        tags{
            id
            tag
            type
        }
        
        
    }
}

`;

class PracticeExamSection extends Component {
    constructor(props) {
        super(props)
        console.log("sreecomponent", props, props.stateData);

        this.state = {
            //singlequestionData: props.stateData.getStudentCustomPracticeQuestions[props.stateData.index],
            //bookmarkModalShow: false
            innerreloader: "0",
            currentStep: 1,
            submitError1: "",
            submitError2: "",
            ntags: "",
            nnewtag: "",
            ncomments: "",
            formValid2: false,
            formValid1: false,
            reportreson: "",
            reportcomment: "",
            formErrors: {
                ntags: "",
                nnewtag: "",
                ncomments: "",
                reportcomment: "",
                reportreson: ""
            },
            ntagsValid: false,
            nnewtagValid: false,
            ncommentsValid: false,
            reportcommentValid: false,
            reportresonValid: false,
            singlequestionDatavar: ""
        }
        //this.singlequestionDatavar="";
        this.popoverHide2 = React.createRef();
        this.cancelFun2 = this.cancelFun2.bind(this);

        this.popoverHide = React.createRef();
        this.cancelFun1 = this.cancelFun1.bind(this);

        this.popoverHide3 = React.createRef();
        this.cancelFun3 = this.cancelFun3.bind(this);
    }

    cancelFun2() {
        this.popoverHide2.handleHide();
    }
    cancelFun1() {
        this.popoverHide.handleHide();
    }
    cancelFun3() {
        this.popoverHide3.handleHide();
    }

    idFunction(data) {
        console.log("idFunctionidFunction", data);
        let id = parseInt(data + 1);
        return id;
    }
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    reporthandleFormSubmit = (contype, conid) => {
        console.log("handleFormSubmit", contype, conid);
        //e.preventDefault();
        if (this.state.formValid1) {
            const params = {
                mobile: Cookies.get("mobile"),
                report_id: parseInt(this.state.reportreson),
                comments: this.state.reportcomment,
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid)
            }
            this.addreport(
                params

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError1: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError1: "Please fill all the values to proceed" });
        }
    };
    addreport = async (
        params) => {
        await this.props.addreport({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.addReport) {
                    this.setState({
                        currentStep: 5,
                        submitError1: "",
                        formValid1: false,
                        reportreson: "",
                        reportcomment: "",
                        formErrors: {
                            reportcomment: "",
                            reportreson: ""
                        },
                        reportcommentValid: false,
                        reportresonValid: false
                    });
                    setTimeout(() => { this.SetpageLoad() }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        this.setState({ currentStep: 1 });
        this.cancelFun1();

    }
    iconhandleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        console.log("fieldName", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let ntagsValid = this.state.ntagsValid;
        let nnewtagValid = this.state.nnewtagValid;
        let ncommentsValid = this.state.ncommentsValid;
        let reportresonValid = this.state.reportresonValid;
        let reportcommentValid = this.state.reportcommentValid;
        switch (fieldName) {
            case "reportreson":
                if (value.length == "") {
                    reportresonValid = false;
                    fieldValidationErrors.reportreson = "Reason Cannot Be Empty";
                } else {
                    reportresonValid = true;
                    fieldValidationErrors.reportreson = "";
                }

                break;

            case "reportcomment":
                if (value.length == "") {
                    reportcommentValid = false;
                    fieldValidationErrors.reportcomment = "Comments Cannot Be Empty";
                } else {
                    reportcommentValid = true;
                    fieldValidationErrors.reportcomment = "";
                }

                break;
            case "ntags":
                if (value.length == "") {
                    ntagsValid = false;
                    fieldValidationErrors.ntags = "Bookmark new tag Cannot Be Empty";
                } else {
                    ntagsValid = true;
                    fieldValidationErrors.ntags = "";
                }

                break;

            case "nnewtag":
                if (value.length == "") {
                    nnewtagValid = false;
                    fieldValidationErrors.nnewtag = "Bookmark new tag Cannot Be Empty";
                } else {
                    nnewtagValid = true;
                    fieldValidationErrors.nnewtag = "";
                }

                break;

            case "ncomments":
                if (value.length == "") {
                    ncommentsValid = false;
                    fieldValidationErrors.ncomments = "note comments Cannot Be Empty";
                } else {
                    ncommentsValid = true;
                    fieldValidationErrors.ncomments = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                reportresonValid: reportresonValid,
                reportcommentValid: reportcommentValid,
                ntagsValid: ntagsValid,
                nnewtagValid: nnewtagValid,
                ncommentsValid: ncommentsValid
            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid1: this.state.reportresonValid && this.state.reportcommentValid,
            formValid2: (this.state.ntagsValid || this.state.nnewtagValid) && this.state.ncommentsValid,
        });
        if (this.state.formValid1) {
            this.setState({ submitError1: "" });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" });
        }

    }
    handleMutipleInputChange = (e, name) => {
        console.log("handleMutipleInputChange", e, name)
        if (name == "ntags") {
            let ntags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    ntags.push(tag.value);
                }
                this.setState({
                    ntags: ntags.toString()
                }, () => {
                    this.validateField(name, "1")
                });
            }
        }
    };
    noteshandleFormSubmit = (contype, conid) => {
        console.log("handleFormSubmit", contype, conid);
        //e.preventDefault();
        if (this.state.formValid2) {
            const params = {
                mobile: Cookies.get("mobile"),
                tags: this.state.ntags,
                new_tag: this.state.nnewtag,
                comments: this.state.ncomments,
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid)
            }
            console.log("noteshandleFormSubmit", params);
            this.addnotes(
                params

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError2: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError2: "Please fill all the values to proceed" });
        }
    };
    addnotes = async (
        params) => {
        await this.props.addnotes({
            variables: {
                params
            },
            update: (store, { data }) => {
                //if (data.addNotes) {
                console.log("globals1", data.addNotes);
                let globals1 = store.readQuery({
                    query: FETCH_GLOBALS,
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                });
                console.log("globals1", globals1, data.addNotes);
                if (this.state.nnewtag != "") {
                    let tarray = globals1.studentGlobals.tags;
                    let newobj = {
                        id: data.addNotes.toString(),
                        tag: this.state.nnewtag,
                        type: "notes",
                        __typename: "Tags"
                    }
                    tarray.push(newobj);
                    globals1.studentGlobals.tags = tarray;
                    console.log("gbeforewrite", globals1);
                }

                try {
                    store.writeQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile")
                        },
                        data: globals1
                    });

                }
                catch (e) {
                    console.log("Exception", e);
                }
                this.setState({
                    currentStep: 5,
                    submitError2: "",
                    ntags: "",
                    nnewtag: "",
                    ncomments: "",
                    formValid2: "",
                    formErrors: {
                        ntags: "",
                        nnewtag: "",
                        ncomments: ""
                    },
                    ntagsValid: false,
                    nnewtagValid: false,
                    ncommentsValid: false
                });

                setTimeout(() => { this.SetpageLoad2() }, 1500);
                //}
            }
        });
    };
    SetpageLoad2 = () => {
        this.setState({ currentStep: 1 });
        this.cancelFun2();
    }
    minutesTimer = (data) => {
        var date = new Date(data * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        var t = hh + ":" + mm + ":" + ss;
        return t;
    }
    reasonFun(data) {
        let sarray = [];
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            const obj = {
                value: idata.id,
                label: idata.reason,
            }
            sarray.push(obj);
        }
        return sarray;
    }
    // questionDispalyFunc() {
    //     let question = this.parseFun(singlequestionData.question);
    //     console.log("questionDispalyFunc", question);
    //     let id = singlequestionData.id;
    //     console.log("questionDispalyFuncid", id);
    //     let qid = "";
    //     if (question.props.children != undefined) {
    //         qid = (question.props.children) + "-" + (id);
    //     }
    //     return question;
    // }
    reasonsFun() {
        let data = this.props.studentGlobals.reports;
        let sarray = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const obj = {
                    value: idata.id,
                    label: idata.report,
                }
                sarray.push(obj);
            }
        }
        return sarray;
    }
    notesTags(typ) {
        let data = this.props.studentGlobals.tags;
        let sarray = [];
        console.log("notesTags", data);
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                //bookmark
                if (idata.type == "notes") {
                    const obj = {
                        value: idata.id,
                        label: idata.tag,
                    }
                    sarray.push(obj);
                }

            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        }
        else {
            somvar = sarray;
        }
        return somvar;
    }
    bookmarkFun(typ) {
        let data = this.props.studentGlobals.tags;
        let sarray = [];
        console.log("notesTags", data);
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                if (idata.type == "bookmark") {
                    const obj = {
                        value: idata.id,
                        label: idata.tag,
                    }
                    sarray.push(obj);
                }

            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        }
        else {
            somvar = sarray;
        }
        return somvar;
    }
    popoverFunction = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Report</h6>
                    {this.state.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Report saved successfully
                        </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.state.submitError1}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group controlId="SelectPrinciple">
                            <SelectDropDown
                                name="reportreson"
                                handleChange={this.selecthandleInputChange}
                                options={this.reasonsFun()}
                                placeholderName={'Select Reasons'}
                                dropdownIndicator={{ DropdownIndicator }}
                            />
                        </Form.Group>
                        <Form.Group controlId="CommentsTextarea1">
                            <Form.Control
                                value={this.state.reportcomment}
                                name="reportcomment"
                                onChange={this.iconhandleInputChange}
                                as="textarea"
                                rows="3"
                                placeholder="Some Comments"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.formErrors.reportcomment}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun1()} size="sm" variant="a" className="py-2">
                            Cancel
            </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={(e) => this.reporthandleFormSubmit("99", custonid)} size="sm" variant="a" className="py-2">
                            Submit
            </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }

    popoverFunction2 = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Notes</h6>
                    {this.state.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Note saved successfully
                        </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.state.submitError2}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group controlId="SelectPrinciple">
                            <Select maxMenuHeight={150}
                                //defaultValue={this.notesTags("def")}
                                isMulti
                                name="ntags"
                                options={this.notesTags()}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => this.handleMutipleInputChange(e, "ntags")}
                            />

                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag2">
                            <Form.Control
                                type="text"
                                placeholder="Enter New Tag"
                                name="nnewtag"
                                value={this.state.newtag}
                                onChange={this.iconhandleInputChange}
                                autoComplete="off" />
                        </Form.Group>
                        <Form.Group controlId="CommentsTextarea2">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Some Comments"
                                name="ncomments"
                                value={this.state.ncomments}
                                onChange={this.iconhandleInputChange} />
                            <Form.Text className="form-text text-danger">
                                {this.state.formErrors.ncomments}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun2()} size="sm" variant="a" className="py-2">
                            Cancel
                    </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button
                            onClick={(e) => this.noteshandleFormSubmit("99", custonid)}
                            //onClick={() => this.popoverHide2.handleHide()} 
                            size="sm" variant="a" className="py-2">
                            Submit
                    </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }

    popoverFunction3 = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Bookmarks</h6>
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Bookmark saved successfully
                        </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError3}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group
                            //controlId="SelectBookmark"
                            controlId="SelectPrinciple">
                            <Select maxMenuHeight={150}
                                //defaultValue={this.bookmarkFun("def")}
                                isMulti
                                name="btags"
                                options={this.bookmarkFun()}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => this.props.phandleMutipleInputChange(e, "btags")}
                            />
                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag3">
                            <Form.Control
                                type="text"
                                placeholder="Enter New Tag"
                                name="bnewtag"
                                value={this.props.stateData.bnewtag}
                                onChange={this.props.parenticonhandleInputChange} />
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun3()} size="sm" variant="a" className="py-2">
                            Cancel
                    </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button
                            //onClick={() => this.popoverHide3.handleHide()} 
                            onClick={(e) => this.props.parentbookhandleFormSubmit("99", custonid)}
                            size="sm" variant="a" className="py-2">
                            Submit
                    </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }
    isValidJSON(singlequestionData) {
        console.log("srefsgs1", singlequestionData.question1);
        // let question1 = singlequestionData.question.replace(/src="/g, 'src=\\"');
        // console.log("question1", question1);
        // let question2 = question1.replace(/" \/>/g, '\\" />');
        // console.log("question2", question2);


        try {
            //let question = JSON.parse(question2);
            let question = singlequestionData.question1;
            console.log("isValidJSONtrue");

            return (

                <ol className="ml-3 p-0" type={
                    singlequestionData.list1type == "alphabets" ? ("A")
                        : (singlequestionData.list1type == "numbers") ? ("1")
                            : ("roman")}

                >
                    {question.map((item) => (
                        <li>{this.parseFun(item.qlist1)}</li>
                    ))}


                </ol>
            );

        } catch (ex) {
            console.log("isValidJSONfalse");
            return false;
        }

    }
    isValidJSON2(singlequestionData) {
        console.log("srefsgs123", singlequestionData.question1);



        // let question1 = singlequestionData.question.replace(/src="/g, 'src=\\"');
        // let question2 = question1.replace(/" \/>/g, '\\" />');
        try {

            //let question = JSON.parse(question2);
            let question = singlequestionData.question1;
            console.log("isValidJSONtrue");
            return (
                <ol className="ml-3 p-0" type={
                    singlequestionData.list2type == "alphabets" ? ("A")
                        : (singlequestionData.list2type == "numbers") ? ("1")
                            : ("roman")}>

                    {question.map((item) => (
                        <li>{this.parseFun(item.qlist2)}</li>
                    ))}

                </ol>
            );

        } catch (ex) {
            console.log("isValidJSONfalse");
            return false;
        }

    }
    parseFun(str) {
        console.log("parseFun", str);
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
    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log("getDerivedStateFromProps", nextProps.stateData.getStudentCustomPracticeQuestions[nextProps.stateData.index]);
        if (nextProps.stateData.getStudentCustomPracticeQuestions[nextProps.stateData.index]!= undefined) {
            if (nextProps.stateData.getStudentCustomPracticeQuestions[nextProps.stateData.index].id == prevState.singlequestionDatavar.id) {
                console.log("consatisfy");
                return ({ singlequestionDatavar: prevState.singlequestionDatavar }) // <- this is setState equivalent
            }
            else {
                console.log("notconsatisfy", nextProps.stateData.getStudentCustomPracticeQuestions[nextProps.stateData.index]);
                return ({ singlequestionDatavar: nextProps.stateData.getStudentCustomPracticeQuestions[nextProps.stateData.index] })
            }
        }


    }

    onScrollgetQuestionById = async (e, singlequestionData1) => {
        this.setState({
            innerreloader: "1"
        });
        axios.get(`https://rizee.in/mobile.php?getQuestion=1&qid=${parseInt(singlequestionData1.id)}`)
            .then(response => {

                if (response.data.status == "success") {
                    console.log("response", response.data.status, response.data.data.question);
                    const newObj = {
                        ...singlequestionData1,
                        question1: response.data.data.question1,
                        question: response.data.data.question,
                        option1: response.data.data.option1,
                        option2: response.data.data.option2,
                        option3: response.data.data.option3,
                        option4: response.data.data.option4,
                        compquestion: response.data.data.compquestion,
                        list1type: response.data.data.list1type,
                        list2type: response.data.data.list2type,
                        mat_question: response.data.data.mat_question,
                        inputquestion: response.data.data.inputquestion

                    }
                    //this.singlequestionDatavar = newObj;
                    //console.log("response123",this.singlequestionDatavar, newObj);
                    this.setState({ innerreloader: "2", singlequestionDatavar: newObj });
                    setTimeout(() => { this.SetreLoad() }, 1500);

                }
                else {
                    this.setState({ innerreloader: "3" });
                    setTimeout(() => { this.SetreLoad() }, 1500);
                }

            })
            .catch(error => {
                console.log(error);
            });



    }
    SetreLoad = () => {
        console.log("SetreLoad");
        this.setState({
            innerreloader: "0"
        });
    }

    render() {
        console.log("currentstate", this.state);
        let singlequestionData = this.state.singlequestionDatavar;
        //console.log("singlequestionDatare",this.state.singlequestionDatavar, this.props.stateData.getStudentCustomPracticeQuestions[this.props.stateData.index]);

        const lqlength = this.props.getStudentCustomPracticeQuestions.length - 1;
        const sidelength = this.props.stateData.questions.filter((a) => a.sidebutton == "1");
        //console.log("sidelength", sidelength.length);
        return (
            <React.Fragment>
                {singlequestionData != "" ? (<div className="error_exam_block py-3">
                    <Row>
                        <Col xl={2} lg={{ span: 2, order: 1 }} md={{ span: 6, order: 1 }} sm={{ span: 12, order: 1 }} xs={{ span: 12, order: 1 }}>
                            <div className="time-spent my-2">
                                <span style={{ fontSize: 14 }}>QID-{singlequestionData.id}</span>
                                <br /><br />
                                <h6>Time spent <br />in this question</h6>
                                {singlequestionData != "" ? (
                                    <i className="fal fa-clock"> <span style={{ fontSize: 18 }} className="countdown-time">{this.minutesTimer(this.props.stateData.questions[this.props.stateData.index].timer)}
                                    </span></i>
                                ) : ("")}
                            </div>
                        </Col>
                        {singlequestionData.qtype == "9"
                            || singlequestionData.qtype == "3"
                            ? (
                                <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>

                                    <div className="question_area my-2">
                                        <div className="q_Name">
                                            <span className="q_No">
                                                {this.idFunction(this.props.stateData.index)}.
                                        </span>
                                            {this.parseFun(singlequestionData.mat_question)}
                                            <br />
                                            {this.state.innerreloader == "1" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e, singlequestionData)} className="fa fa-repeat"> <span >Reload</span></i></a>

                                                <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                                            {this.state.innerreloader == "2" ? (
                                                <div className="text-success">Question reloaded</div>
                                            ) : this.state.innerreloader == "3" ? (<div className="text-danger">Reload failed</div>)
                                                    : ("")}
                                            {singlequestionData != "" ?
                                                (

                                                    <Row>
                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                            <h5 className="list-title"> List I</h5>

                                                            {this.isValidJSON(singlequestionData)}
                                                        </Col>
                                                        <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                            <h5 className="list-title"> List II</h5>
                                                            {this.isValidJSON2(singlequestionData)}
                                                        </Col>
                                                    </Row>
                                                )
                                                :
                                                ("")}

                                        </div>
                                        {
                                            this.props.stateData.questions[this.props.stateData.index].isSubmitted ?
                                                (
                                                    <div className="q_options mt-4">
                                                        <SingleOption1
                                                            option="A"
                                                            status={
                                                                singlequestionData.answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "A" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option1)) : ("")}
                                                            controlId="formBasicCheckboxOne"
                                                        />
                                                        <SingleOption1
                                                            option="B"
                                                            status={
                                                                singlequestionData.answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "B" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option2)) : ("")}
                                                            controlId="formBasicCheckboxTwo" />
                                                        <SingleOption1
                                                            option="C"
                                                            status={
                                                                singlequestionData.answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "C" ? false : null}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option3)) : ("")}
                                                            showMessage={true}
                                                            controlId="formBasicCheckboxThree"
                                                        />
                                                        <SingleOption1
                                                            option="D"
                                                            status={
                                                                singlequestionData.answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "D" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option4)) : ("")}
                                                            controlId="formBasicCheckboxFour" />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <React.Fragment>
                                                        {singlequestionData.answer.split(",").filter((a) => a != "").length > 1 ? (<div className="q_options mt-4">
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="A"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                controlId="formBasicCheckboxOne"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="B"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                controlId="formBasicCheckboxTwo"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="C"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                controlId="formBasicCheckboxThree"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="D"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                controlId="formBasicCheckboxFour"
                                                            />
                                                        </div>) : (<div className="q_options mt-4">
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="A"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted === 'A' ? true : null}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                controlId="formBasicCheckboxOne"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="B"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted === 'B' ? true : null}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                controlId="formBasicCheckboxTwo"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="C"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted === 'C' ? true : null}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                controlId="formBasicCheckboxThree"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="D"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted === 'D' ? true : null}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                controlId="formBasicCheckboxFour"
                                                            />
                                                        </div>)}</React.Fragment>


                                                )
                                        }

                                    </div>
                                </Col>
                            ) : (singlequestionData.qtype == "8") ? (
                                <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                    <div className="question_area my-2">

                                        <div className="q_Name">
                                            <span className="q_No">
                                                {this.idFunction(this.props.stateData.index)}
                                            </span>
                                            {singlequestionData != "" ?
                                                (
                                                    this.parseFun(singlequestionData.question)
                                                )
                                                :
                                                ("")}
                                            <br />
                                            {this.state.innerreloader == "1" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e, singlequestionData)} className="fa fa-repeat"> <span >Reload</span></i></a>

                                                <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                                            {this.state.innerreloader == "2" ? (
                                                <div className="text-success">Question reloaded</div>
                                            ) : this.state.innerreloader == "3" ? (<div className="text-danger">Reload failed</div>)
                                                    : ("")}
                                        </div>
                                        {
                                            this.props.stateData.questions[this.props.stateData.index].isSubmitted ?
                                                (
                                                    <React.Fragment>
                                                        {this.props.stateData.questions[this.props.stateData.index].status == "currect" ?
                                                            (<Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                                                <div className="option_name">
                                                                    {(this.props.stateData.questions[this.props.stateData.index].attempted)}
                                                                </div>
                                                                <div className="option_selected text-success">
                                                                    <span className="mr-2">Attempted Answer</span><i className="fal fa-check-circle" />
                                                                </div>
                                                            </Card>) : this.props.stateData.questions[this.props.stateData.index].status == "wrong" ? (
                                                                <Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                                                    <div className="option_name">
                                                                        {(this.props.stateData.questions[this.props.stateData.index].attempted)}
                                                                    </div>
                                                                    <div className="option_selected text-danger">
                                                                        <span className="mr-2">Wrong Answer</span><i className="fal fa-times-circle" />
                                                                    </div>
                                                                </Card>
                                                            ) : ("")}
                                                    </React.Fragment>



                                                )
                                                :
                                                (
                                                    //integer
                                                    <Form>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Control

                                                                type="text"
                                                                placeholder="Enter text"
                                                                name="integer"
                                                                //value=""
                                                                value={this.props.stateData.questions[this.props.stateData.index].attempted != null ? this.props.stateData.questions[this.props.stateData.index].attempted : ""}
                                                                onChange={this.props.handleIntegerInputChange}

                                                            />
                                                        </Form.Group>
                                                    </Form>

                                                    //comprehension



                                                )
                                        }

                                    </div>
                                </Col>) : (singlequestionData.qtype == "5") ? (
                                    <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                        <div className="question_area my-2">
                                            <Card className="p-3 mb-2 Qparagraph ">
                                                <Card.Text className="text-justify">{this.parseFun(singlequestionData.compquestion)}</Card.Text>
                                            </Card>

                                            <div className="q_Name">
                                                <span className="q_No">
                                                    {this.idFunction(this.props.stateData.index)}
                                                </span>
                                                {singlequestionData != "" ?
                                                    (
                                                        this.parseFun(singlequestionData.question)
                                                    )
                                                    :
                                                    ("")}

                                                <br />
                                                {this.state.innerreloader == "1" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e, singlequestionData)} className="fa fa-repeat"> <span >Reload</span></i></a>

                                                    <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                                                {this.state.innerreloader == "2" ? (
                                                    <div className="text-success">Question reloaded</div>
                                                ) : this.state.innerreloader == "3" ? (<div className="text-danger">Reload failed</div>)
                                                        : ("")}


                                            </div>
                                            {
                                                this.props.stateData.questions[this.props.stateData.index].isSubmitted ?
                                                    (
                                                        <div className="q_options mt-4">
                                                            <SingleOption1
                                                                option="A"
                                                                status={
                                                                    singlequestionData.answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "A" ? false : null}
                                                                showMessage={true}
                                                                optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option1)) : ("")}
                                                                controlId="formBasicCheckboxOne"
                                                            />
                                                            <SingleOption1
                                                                option="B"
                                                                status={
                                                                    singlequestionData.answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "B" ? false : null}
                                                                showMessage={true}
                                                                optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option2)) : ("")}
                                                                controlId="formBasicCheckboxTwo" />
                                                            <SingleOption1
                                                                option="C"
                                                                status={
                                                                    singlequestionData.answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "C" ? false : null}
                                                                optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option3)) : ("")}
                                                                showMessage={true}
                                                                controlId="formBasicCheckboxThree"
                                                            />
                                                            <SingleOption1
                                                                option="D"
                                                                status={
                                                                    singlequestionData.answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "D" ? false : null}
                                                                showMessage={true}
                                                                optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option4)) : ("")}
                                                                controlId="formBasicCheckboxFour" />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <React.Fragment>
                                                            {singlequestionData.answer.split(",").filter((a) => a != "").length > 1 ? (<div className="q_options mt-4">
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="A"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                    controlId="formBasicCheckboxOne"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="B"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                    controlId="formBasicCheckboxTwo"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="C"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                    controlId="formBasicCheckboxThree"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="D"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                    controlId="formBasicCheckboxFour"
                                                                />
                                                            </div>) : (<div className="q_options mt-4">

                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="A"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted === 'A' ? true : null}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                    controlId="formBasicCheckboxOne"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="B"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted === 'B' ? true : null}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                    controlId="formBasicCheckboxTwo"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="C"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted === 'C' ? true : null}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                    controlId="formBasicCheckboxThree"
                                                                />
                                                                <SingleOption
                                                                    question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                    option="D"
                                                                    status={this.props.stateData.questions[this.props.stateData.index].attempted === 'D' ? true : null}
                                                                    ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                    optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                    controlId="formBasicCheckboxFour"
                                                                />
                                                            </div>)}
                                                        </React.Fragment>


                                                    )
                                            }

                                        </div>
                                    </Col>
                                ) : (<Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                    <div className="question_area my-2">
                                        <div className="q_Name">
                                            <span className="q_No">
                                                {this.idFunction(this.props.stateData.index)}
                                            </span>
                                            {singlequestionData != "" ?
                                                (
                                                    this.parseFun(singlequestionData.question)
                                                )
                                                :
                                                ("")}
                                            <br />
                                            {this.state.innerreloader == "1" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e, singlequestionData)} className="fa fa-repeat"> <span >Reload</span></i></a>

                                                <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                                            {this.state.innerreloader == "2" ? (
                                                <div className="text-success">Question reloaded</div>
                                            ) : this.state.innerreloader == "3" ? (<div className="text-danger">Reload failed</div>)
                                                    : ("")}
                                        </div>
                                        {
                                            this.props.stateData.questions[this.props.stateData.index].isSubmitted ?
                                                (
                                                    <div className="q_options mt-4">
                                                        <SingleOption1
                                                            option="A"
                                                            status={
                                                                singlequestionData.answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "A" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option1)) : ("")}
                                                            controlId="formBasicCheckboxOne"
                                                        />
                                                        <SingleOption1
                                                            option="B"
                                                            status={
                                                                singlequestionData.answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "B" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option2)) : ("")}
                                                            controlId="formBasicCheckboxTwo" />
                                                        <SingleOption1
                                                            option="C"
                                                            status={
                                                                singlequestionData.answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "C" ? false : null}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option3)) : ("")}
                                                            showMessage={true}
                                                            controlId="formBasicCheckboxThree"
                                                        />
                                                        <SingleOption1
                                                            option="D"
                                                            status={
                                                                singlequestionData.answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempted == "D" ? false : null}
                                                            showMessage={true}
                                                            optionText={singlequestionData != "" ? (this.parseFun(singlequestionData.option4)) : ("")}
                                                            controlId="formBasicCheckboxFour" />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <React.Fragment>
                                                        {singlequestionData.answer.split(",").filter((a) => a != "").length > 1 ? (<div className="q_options mt-4">
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="A"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                controlId="formBasicCheckboxOne"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="B"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                controlId="formBasicCheckboxTwo"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="C"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                controlId="formBasicCheckboxThree"
                                                            />
                                                            <SingleOption
                                                                question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                option="D"
                                                                status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                                                                ParenthandleInputChange={this.props.ParenthandleInputChange2}
                                                                optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                controlId="formBasicCheckboxFour"
                                                            />
                                                        </div>) : (
                                                                <div className="q_options mt-4">
                                                                    <SingleOption
                                                                        question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                        option="A"
                                                                        status={this.props.stateData.questions[this.props.stateData.index].attempted === 'A' ? true : null}
                                                                        ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                        optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option1) : ""}
                                                                        controlId="formBasicCheckboxOne"
                                                                    />
                                                                    <SingleOption
                                                                        question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                        option="B"
                                                                        status={this.props.stateData.questions[this.props.stateData.index].attempted === 'B' ? true : null}
                                                                        ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                        optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option2) : ""}
                                                                        controlId="formBasicCheckboxTwo"
                                                                    />
                                                                    <SingleOption
                                                                        question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                        option="C"
                                                                        status={this.props.stateData.questions[this.props.stateData.index].attempted === 'C' ? true : null}
                                                                        ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                        optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option3) : ""}
                                                                        controlId="formBasicCheckboxThree"
                                                                    />
                                                                    <SingleOption
                                                                        question={singlequestionData != "" ? singlequestionData.id : ""}
                                                                        option="D"
                                                                        status={this.props.stateData.questions[this.props.stateData.index].attempted === 'D' ? true : null}
                                                                        ParenthandleInputChange={this.props.ParenthandleInputChange}
                                                                        optionText={singlequestionData != "" ? this.parseFun(singlequestionData.option4) : ""}
                                                                        controlId="formBasicCheckboxFour"
                                                                    />
                                                                </div>
                                                            )}
                                                    </React.Fragment>


                                                )
                                        }

                                    </div>
                                </Col>)}

                        <Col xl={{ span: 2, order: 3 }} lg={{ span: 2, order: 3 }} md={{ span: 6, order: 2 }} sm={{ span: 12, order: 2 }} xs={{ span: 12, order: 2 }}>
                            <div className="instruction my-2">
                                <ul className="helpTags list-inline m-0 p-0">
                                    <li className="list-inline-item mx-2">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction(singlequestionData.id)} ref={r => (this.popoverHide = r)} rootClose>
                                            <i className="fal fa-info-circle" title="report" />
                                        </OverlayTrigger>
                                    </li>
                                    <li className="list-inline-item mx-2">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction2(singlequestionData.id)} ref={r => (this.popoverHide2 = r)} rootClose>
                                            <i className="fal fa-notes-medical" title="note" />
                                        </OverlayTrigger>
                                    </li>
                                    {singlequestionData.bookmarked == "true" ? (<li className="list-inline-item mx-2">

                                        <i className="fas fa-bookmark text-success" title="bookmark" onClick={(e) => this.props.parentremovebookhandleFormSubmit("99", singlequestionData.id)} />

                                    </li>) : (<li className="list-inline-item mx-2">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction3(singlequestionData.id)} ref={r => (this.popoverHide3 = r)} rootClose>
                                            <i className="fal fa-bookmark" title="bookmark" />
                                        </OverlayTrigger>
                                    </li>)}

                                </ul>
                            </div>
                        </Col>
                    </Row>


                    {
                        !this.props.stateData.questions[this.props.stateData.index].isSubmitted ?
                            (
                                <React.Fragment>
                                    {this.state.innerreloader == "0" ? (
                                        <Row className="text-center mt-3">
                                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                                {this.props.stateData.index != lqlength && sidelength.length > 1 ? (<Button variant="outline-secondary" className="px-5 m-2" onClick={this.props.Pskip}>Skip</Button>) : ("")}
                                                <Button variant="outline-primary" className="px-5 m-2" onClick={this.props.clearoption} >Clear Option</Button>
                                                <Button variant="outline-success" className="px-5 m-2" onClick={this.props.Psubmitnext} >Submit</Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                            <Row className="text-center mt-3">
                                                <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                                    {this.props.stateData.index != lqlength && sidelength.length > 1 ? (
                                                        <Button variant="outline-secondary" disabled className="px-5 m-2">Skip</Button>) : ("")}
                                                    <Button variant="outline-primary" disabled className="px-5 m-2" >Clear Option</Button>
                                                    <Button variant="outline-success" disabled className="px-5 m-2" >Submit</Button>
                                                </Col>
                                            </Row>
                                        )}
                                </React.Fragment>

                            )

                            :

                            (
                                <React.Fragment>
                                    <Row>
                                        <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                            <Alert variant="success" className="my-3 border-success">
                                                <h5>Solution</h5>
                                                <p>{this.parseFun(singlequestionData.explanation)}</p>
                                            </Alert>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                            {this.props.getStudentCustomPracticeQuestions != undefined ? (
                                                <React.Fragment>
                                                    {this.props.stateData.questions[this.props.stateData.index].status == "wrong" ? (
                                                        <React.Fragment>{this.props.stateData.questions[this.props.stateData.index].reasonstatus == "0" ? (<Row>
                                                            <Col>
                                                                <Card>
                                                                    <Card.Body>
                                                                        <Form>
                                                                            <Row>
                                                                                <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectReasons">
                                                                                    <Form.Label>Reason For Wrong Attempt</Form.Label>
                                                                                    <SelectDropDown
                                                                                        name="reason"
                                                                                        options={this.reasonFun(this.props.studentGlobals.errorReasons)}
                                                                                        placeholderName={'Select Reasons'}
                                                                                        dropdownIndicator={{ DropdownIndicator }}
                                                                                        handleChange={this.props.ParentSelecthandleChange} />
                                                                                </Form.Group>
                                                                                <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectTextarea">
                                                                                    <Form.Label>Some Comments</Form.Label>
                                                                                    <Form.Control
                                                                                        name="rcomments"
                                                                                        onChange={this.props.pCommentsFunction}
                                                                                        as="textarea" rows="3" />
                                                                                </Form.Group>
                                                                            </Row>
                                                                        </Form>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        </Row>) : ("")}</React.Fragment>

                                                    ) : ("")}

                                                </React.Fragment>) : ("")}

                                        </Col>
                                    </Row>

                                    <Row className="text-center mt-3">
                                        <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                            {this.props.stateData.index != lqlength ? (
                                                <React.Fragment>
                                                    {this.props.stateData.nextbutton != "1" ? (
                                                        <React.Fragment>
                                                            {this.state.innerreloader == "0" ? (<Button variant="outline-success" className="px-5 m-2" onClick={this.props.PnextQuestionfunction}>Next Question</Button>) : (
                                                                <Button variant="outline-success" disabled className="px-5 m-2">Next Question</Button>
                                                            )}
                                                        </React.Fragment>

                                                    ) : ("")}
                                                </React.Fragment>

                                            ) : ("")}
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )
                    }
                </div>) : (
                        <div className="text-center pt-5">
                            <span className="text-danger">No Data Available</span>
                        </div>
                    )
                }
            </React.Fragment>

        )
    }
}

export default withRouter(
    compose(
        graphql(ADD_REPORT, {
            name: "addreport"
        }),
        graphql(ADD_NOTES, {
            name: "addnotes"
        }))(PracticeExamSection));



