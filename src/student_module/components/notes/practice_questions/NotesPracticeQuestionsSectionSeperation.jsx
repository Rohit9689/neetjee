import React, { Component } from 'react'
import { Container, Row, Col, Card, CardGroup, Nav, Button, Alert, Form, Popover, OverlayTrigger, Badge } from 'react-bootstrap'
import { components } from 'react-select'
import { Scrollbars } from 'react-custom-scrollbars'
import Select from 'react-select';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { Link } from 'react-router-dom';
import practiceQuestionListData from './QuestionListData';
import parse, { domToReact } from 'html-react-parser';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import SingleOption1 from '../../learn_practice/start_error_exam/start_error_page/SingleOption1';
import '../../learn_practice/start_error_exam/start_error_page/_errorexam.scss';
import SingleNoteModal from "../../learn_practice/revision_materials/SingleNoteModal";
import SingleBookModal from "../../learn_practice/revision_materials/SingleBookModal";


const UPDATE_NOTES = gql`
  mutation(
    $params:UpdateNotes  
    ) {
        updateStudentNotes(
        params: $params
     )
  }
`;
const ADD_BOOKMARKS = gql`
  mutation(
    $params:AddBookmark  
    ) {
        addBookmark(
        params: $params
     )
  }
`;

const REMOVE_BOOKMARKS = gql`
  mutation(
    $params:AddBookmark  
    ) {
        removeBookmark(
        params: $params
     )
  }
`;
const ADD_NOTES = gql`
  mutation($params: AddNotes) {
    addNotes(params: $params)
  }
`;
// Reasons
const Reasons = [
    { value: 1, label: 'Reasons-1' },
    { value: 2, label: 'Reasons-2' },
    { value: 3, label: 'Reasons-3' }
];
const SectionData = [
    { value: 'NEET 2020', label: 'NEET 2020', color: '#00B8D9', isFixed: true },
    { value: 'JEE 2020', label: 'JEE 2020', color: '#0052CC', isFixed: true },
    { value: 'EAMCET 2020', label: 'EAMCET 2020', color: '#5243AA' },
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

class NotesPracticeQuestionsSectionSeperation extends Component {
    constructor(props) {
        super(props)
        let classactivep = "";
        let classactivee = "";
        if (props.contentType == "99") {
            classactivep = "active";
            classactivee = "";
        }
        else if (props.contentType == "98") {
            classactivee = "active";
            classactivep = "";
        }
        const qData = props.questionData.map((item, index) => {
            if (index == 0) {
                return { ...item, classActive: "active" }

            }
            return { ...item, classActive: "" }
        })
        this.state = {
            currentStep: "1",
            submitError: "",
            comments: "",
            customcontentid: "",
            tags: "",
            item: "",
            tagid: props.getData.tagid,
            subjectid: props.getData.subjectid,
            questionData: qData,
            classactivep: classactivep,
            classactivee: classactivee,
            showDetails: false,
            sidetoggle: false,
            showDescription: false,
            formValid: false,

            show: true,
            modalShowb: false,
            modalShow: false,
            bnewtag: "",
            btags: "",
            btagsvalue: [],
            formValid3: false,
            ncomments:"",
            ntags: "",
            ntagsvalue: [],
            nnewtag: "",
            submitError2: "",
            submitError3: "",
            formErrors: {
                ntags: "",
                nnewtag: "",
                ncomments: ""

            },
            formValid2: false,
            ntagsValid: false,
            nnewtagValid: false,
            ncommentsValid: false,
            getDerived: 0,
            
            removecontypId: "",
            custonid: ""
        }
        this.scrollNotes = React.createRef();
    }
    showFunction = () => {
        console.log("showFunction");
        if (this.state.show == true) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }


    }

    //add note
    noteshandleFormSubmit = (ntags, nnewtag, ncomments, contype, conid, getDerived) => {

        //e.preventDefault();

        const params = {
            mobile: Cookies.get("mobile"),
            tags: ntags,
            new_tag: nnewtag,
            comments: ncomments,
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        };
        console.log("noteshandleFormSubmit", params);
        this.addnotes(params, getDerived).catch((error) => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError2: error.graphQLErrors.map((x) => x.message),
            });
            console.error(
                "ERR =>",
                error.graphQLErrors.map((x) => x.message)
            );
        });

    };
    addnotes = async (params, getDerived) => {
        await this.props.addnotes({
            variables: {
                params,
            },
            update: (store, { data }) => {
                console.log("data.addNotes", data.addNotes);
                //if (data.addNotes) {
                // let globals1 = store.readQuery({
                //     query: FETCH_GLOBALS,
                //     variables: {
                //         mobile: Cookies.get("mobile"),
                //     },
                // });
                const addNotes = data.addNotes.toString();
                //console.log("globals1", globals1);
                if (params.new_tag != "") {
                    let tarray = this.props.studentGlobals.tags;

                    let newobj = {
                        id: data.addNotes.toString(),
                        tag: params.new_tag,
                        type: "notes",
                        __typename: "Tags",
                    };
                    tarray.push(newobj);
                    this.props.studentGlobals.tags = tarray;
                    //console.log("gbeforewrite", globals1);
                }

                // try {
                //     store.writeQuery({
                //         query: FETCH_GLOBALS,
                //         variables: {
                //             mobile: Cookies.get("mobile"),
                //         },
                //         data: globals1,
                //     });
                // } catch (e) {
                //     console.log("Exception", e);
                // }
                let notetag = [];
                if (params.new_tag != "") {
                    notetag.push(addNotes);
                }
                if (params.tags != "") {
                    let array = params.tags.split(",");
                    array.map((item) => {
                        notetag.push(item)
                    });
                }
                const emptyMaterial = this.state.questionData.map((item) => {
                    if (params.custom_content_id == item.id) {
                        //console.log("sree", this.props.getData.funData[this.state.index].id);
                        return { ...item, comments: params.comments, tags: notetag.toString() }
                    }
                    else {
                        return { ...item }
                    }

                });
               
                this.setState({
                    questionData:emptyMaterial,
                    submitError2: "",
                    ntags: "",
                    ntagsvalue: [],
                    nnewtag: "",
                    ncomments: params.comments,
                    formErrors: {
                        ntags: "",
                        nnewtag: "",
                        ncomments: ""
                    },
                    currentStep: 5,
                    formValid2: false,
                    ntagsValid: false,
                    nnewtagValid: false,
                    ncommentsValid: false
                });

                setTimeout(() => {
                    this.SetpageLoad2(getDerived);
                }, 1500);
                //}
            },
        });
    };
    SetpageLoad2 = (getDerived) => {
        this.setState({ currentStep: 1, modalShow: false, show: true, getDerived: parseInt(getDerived) + 1 });
        //this.cancelFun2();
    };
    handleEditorChange = (e) => {
        console.log("handleEditorChange", e.target.getContent());
        this.setState({
            ncomments: e.target.getContent()
        }, () => {
            this.validateField("ncomments", "1");
        });

    }

    notonHide = (getDerived) => {
        let ncomments = "";
        let findData = this.state.questionData.find((a) => a.id == this.state.custonid);
        if (findData.comments != "") {
            ncomments = findData.comments;
        }
        this.setState({ modalShow: false, ncomments: ncomments, getDerived: parseInt(getDerived) + 1 })
    }
    notesButton = (contype, id) => {
        console.log("notesButton");
        let findData = this.state.questionData.find((a) => a.id == id);
        let ncomments = "";
        let ntagsValid = false;
        let ncommentsValid = false;
        let formValid2 = false;
        let ntags = [];
        let ntagsvalue = [];
        if (findData.comments != "") {
            ncomments = findData.comments;
            ncommentsValid = true;
        }
        if (findData.comments != "" && findData.tags != "") {

            formValid2 = true;
        }
        if (findData.tags != "") {
            let narray = findData.tags.split(",");
            console.log("narray", narray);

            ntagsValid = true;


            narray.map((aa) => {
                //console.log("this.props.studentGlobals.tags",this.props.studentGlobals);
                let findData = this.props.studentGlobals.tags.find((a) => a.id == aa);
                if (findData != undefined) {
                    const newObj = {
                        value: findData.id,
                        label: findData.tag
                    }
                    ntags.push(findData.id);
                    ntagsvalue.push(newObj);
                }
            });
            this.setState({
                modalShow: true,
                ntags: ntags.toString(),
                ntagsvalue: ntagsvalue,
                ncomments: ncomments,
                ntagsValid: ntagsValid,
                ncommentsValid: ncommentsValid,
                formValid2: formValid2,
                removecontypId: contype,
                custonid: id
            })
        }
        else {
            this.setState({
                modalShow: true,
                ntags: ntags.toString(),
                ntagsvalue: ntagsvalue,
                ncomments: ncomments,
                ntagsValid: ntagsValid,
                ncommentsValid: ncommentsValid,
                formValid2: formValid2,
                removecontypId: contype,
                custonid: id
            })
        }
    }
    handleMutipleInputChange = (e, type) => {
        if (type == "ntags") {
            let ntags = Array();
            let ntagsvalue = Array();
            if (e.length != 0) {
                for (let i = 0; i < e.length; i++) {
                    const ntagsval = e[i];
                    const newObj = {
                        label: ntagsval.label,
                        value: ntagsval.value
                    }
                    ntagsvalue.push(newObj);
                    ntags.push(ntagsval.value);
                }
                this.setState({
                    ntagsvalue: ntagsvalue,
                    ntags: ntags.toString()
                }, () => {
                    this.validateField(type, "1");
                });
            }
            else {
                this.setState({
                    ntagsvalue: [],
                    ntags: ""
                }, () => {
                    this.validateField(type, "");
                });

            }
        }
        else if (type == "btags") {
            let btags = Array();
            let btagsvalue = Array();
            if (e.length != 0) {
                for (let i = 0; i < e.length; i++) {
                    const btagsval = e[i];
                    const newObj = {
                        label: btagsval.label,
                        value: btagsval.value
                    }
                    btagsvalue.push(newObj);
                    btags.push(btagsval.value);
                }
                this.setState({
                    btagsvalue: btagsvalue,
                    btags: btags.toString()
                }, () => {
                    this.validateField(type, "1");
                });
            }
            else {
                this.setState({
                    btagsvalue: [],
                    btags: ""
                }, () => {
                    this.validateField(type, "");
                });

            }
        }

    };
    bookmarkButton = (contype, id) => {
        this.setState({
            modalShowb: true,
            formValid3: false,
            submitError3: "",
            bnewtag: "",
            btags: "",
            btagsvalue: [],
            removecontypId: contype,
            custonid: id
        });

    }
    bookhandleFormSubmit = (contype, conid) => {
        if (this.state.formValid3) {
            const params = {
                mobile: Cookies.get("mobile"),
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid),
                tags: this.state.btags,
                new_tag: this.state.nnewtag
            }
            console.log("bookhandleFormSubmit", params);
            this.addbookmark(
                params

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError3: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError3: "Please fill all the values to proceed" });
        }
    };
    addbookmark = async (
        params) => {
        await this.props.addbookmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                // if (data.addBookmark) {
                // let globals1 = store.readQuery({
                //     query: FETCH_GLOBALS,
                //     variables: {
                //         mobile: Cookies.get("mobile"),
                //     },
                // });
                const addBookmark = data.addBookmark.toString();
               
                if (this.state.bnewtag != "") {
                    let tarray =this.props.studentGlobals.tags;

                    let newobj = {
                        id: data.addBookmark.toString(),
                        tag: this.state.bnewtag,
                        type: "bookmark",
                        __typename: "Tags",
                    };
                    tarray.push(newobj);
                   this.props.studentGlobals.tags = tarray;
                    //console.log("gbeforewrite", globals1);
                }

                // try {
                //     store.writeQuery({
                //         query: FETCH_GLOBALS,
                //         variables: {
                //             mobile: Cookies.get("mobile"),
                //         },
                //         data: globals1,
                //     });
                // } catch (e) {
                //     console.log("Exception", e);
                // }
                //this.props.studentGlobals.tags = globals1.studentGlobals.tags;
                console.log("sggs", this.state.questionData);
                const emptyMaterial = this.state.questionData.map((item) => {
                    if (params.custom_content_id == item.id) {
                        console.log("sree", item, params.custom_content_id);
                        return { ...item, bookmarked: "true" }
                    }
                    else {
                        return { ...item }
                    }

                });
                console.log("sggs123", this.state.questionData);
                
               
                this.setState({
                    questionData:emptyMaterial,
                    btags: "",
                    bnewtag: "",
                    btagsvalue: [],
                    bookmarked: "true",
                    currentStep: 5,
                    submitError3: "",
                    formValid3: false
                });
                setTimeout(() => { this.SetpageLoad3() }, 1500);

                //}

            }
        });
    };
    SetpageLoad3 = () => {
        this.setState({ currentStep: 1, modalShowb: false }, () => {
        });
    }
    removebookhandleFormSubmit = (contype, conid) => {
        console.log("removebookhandleFormSubmit", contype, conid);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        }
        console.log("removebookhandleFormSubmit", params);
        this.removebookmark(
            params

        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError3: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    removebookmark = async (
        params) => {
        await this.props.removebookmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("data.removeBookmark", data.removeBookmark);
                if (data.removeBookmark) {
                    const emptyMaterial = this.state.questionData.map((item) => {
                        if (params.custom_content_id == item.id) {
                           // console.log("sree", this.props.getData.funData[this.state.index].id);
                            return { ...item, bookmarked: "false" }
                        }
                        else {
                            return { ...item }
                        }

                    });
                    
                    //this.state.questionData = emptyMaterial
                    console.log("removeBookmark123", emptyMaterial);
                    this.setState({
                        questionData:emptyMaterial,
                        bookmarked: "false"
                    });

                }
            }
        });
    };
    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.formValid) {
            let updatenotesobj = {
                mobile: Cookies.get("mobile"),
                comments: this.state.comments,
                content_type: 99,
                custom_content_id: parseInt(this.state.customcontentid)
            };
            console.log("updatenotesobj", updatenotesobj);

            this.updatenotes(
                updatenotesobj
            ).catch(error => {

                console.log("catch if error", error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    updatenotes = async (
        params) => {
        await this.props.updatenotes({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.updateStudentNotes) {
                    this.setState({
                        currentStep: 5,

                    });

                    setTimeout(() => { this.SetpageLoad1() }, 1500);
                }
            }
        });
    };
    SetpageLoad1 = () => {
        console.log("setTimeout", this.state.questionData, this.state.customcontentid);
        let arr1 = this.state.questionData;
        let arr = this.state.questionData.find((a) => a.id == this.state.customcontentid);
        let index = this.state.questionData.indexOf(arr);
        console.log("index", index, arr.classActive);
        if (arr.classActive == "active") {
            arr1[index].comments = this.state.comments;
        }
        this.setState({ currentStep: 1, showDescription: false, questionData: arr1 });
    }
    // handleInputChange = e => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     this.setState({ comments: value }, () => {
    //         this.validateForm();
    //     });
    // };
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let reportresonValid = this.state.reportresonValid;
        let reportcommentValid = this.state.reportcommentValid;
        let ntagsValid = this.state.ntagsValid;
        let nnewtagValid = this.state.nnewtagValid;
        let ncommentsValid = this.state.ncommentsValid;

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
                    fieldValidationErrors.ncomments = "note ncomments Cannot Be Empty";
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
                ncommentsValid: ncommentsValid,

            },
            this.validateForm
        );
    }
    validateForm() {
        console.log("validateForm", this.state.ntagsValid, this.state.nnewtagValid,
            this.state.ncommentsValid);
        this.setState({
            formValid1: this.state.reportresonValid && this.state.reportcommentValid,
            formValid2:
                (this.state.ntagsValid || this.state.nnewtagValid) &&
                this.state.ncommentsValid,
            formValid3: true,
            formValid: true,
        });
        if (this.state.formValid1) {
            this.setState({ submitError1: "" });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" });
        }
        if (this.state.formValid3) {
            this.setState({ submitError3: "" });
        }
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }

    tagsfunction = (data) => {
        let Arr = data.split(',');
        let sample = [];
        for (let i = 0; i <= Arr.length; i++) {
            let idata = Arr[i];
            if (idata != "") {
                let getData = this.props.studentGlobals.tags.find((a) => a.id == idata);
                if (getData != undefined) {
                    sample.push(getData.tag);
                }

            }
        }
        return sample.toString();
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    decodefun(data) {
        var decdata = "";
        try {
            decdata = decodeURIComponent(data);
            console.log("decdata", decdata);

        } catch (err) {
            console.log("catchError", err.message);
        }
        return decdata;
    }
    solutionFunction = (e, id) => {
        console.log("solutionFunction", id);
        let arr = this.state.questionData.map((item) => {
            if (item.id == id) {
                console.log("equal");
                return { ...item, classActive: "active" }
            }
            return { ...item, classActive: "" }
        });
        this.setState({ questionData: arr });
    }
    parseFun(str) {
        console.log("str", str);
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
    answerFunction(id) {
        let findData = this.state.questionData.find((a) => a.id == id);
       
        return (
            <React.Fragment>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                        <div className="error_exam_block">
                            <div className="q_options">
                                <SingleOption1
                                    option="A"
                                    status={
                                        findData.answer.includes("A") ? true : findData.answer == "A" ? false : null}
                                    showMessage={true}
                                    optionText={this.parseFun(findData.option1)}
                                    controlId="formBasicCheckboxOne"
                                />
                                <SingleOption1
                                    option="B"
                                    status={
                                        findData.answer.includes("B") ? true : findData.answer == "B" ? false : null}
                                    showMessage={true}
                                    optionText={this.parseFun(findData.option2)}
                                    controlId="formBasicCheckboxTwo" />
                                <SingleOption1
                                    option="C"
                                    status={
                                        findData.answer.includes("C") ? true : findData.answer == "C" ? false : null}
                                    optionText={this.parseFun(findData.option3)}
                                    showMessage={true}
                                    controlId="formBasicCheckboxThree"
                                />
                                <SingleOption1
                                    option="D"
                                    status={
                                        findData.answer.includes("D") ? true : findData.answer == "D" ? false : null}
                                    showMessage={true}
                                    optionText={this.parseFun(findData.option4)}
                                    controlId="formBasicCheckboxFour" />
                            </div>
                        </div>
                    </Card>
                </Col>

            </React.Fragment>

        );
    }

    render() {
        console.log("notequestion", this.state.questionData);
        const popover = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Report</h6>
                        <Form>
                            <Form.Group controlId="SelectPrinciple">
                                <SelectDropDown options={Reasons} placeholderName={'Select Reasons'} dropdownIndicator={{ DropdownIndicator }} />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea1">
                                <Form.Control

                                    as="textarea"
                                    rows="3"
                                    placeholder="Some Comments"

                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                            </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        const popover2 = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Notes</h6>
                        <Form>
                            <Form.Group controlId="SelectPrinciple">
                                <Select maxMenuHeight={150}
                                    defaultValue={[SectionData[0]]}
                                    isMulti
                                    name="colors"
                                    options={SectionData}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Form.Group>
                            <div className="mb-2 text-center">
                                <span>or</span>
                            </div>
                            <Form.Group controlId="NewTag2">
                                <Form.Control type="text" placeholder="Enter New Tag" />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea2">
                                <Form.Control as="textarea" rows="3" placeholder="Some Comments" />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                            </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        const popover3 = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Bookmarks</h6>
                        <Form>
                            <Form.Group controlId="SelectBookmark">
                                <Select maxMenuHeight={150}
                                    defaultValue={[SectionData[0]]}
                                    isMulti
                                    name="colors"
                                    options={SectionData}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Form.Group>
                            <div className="mb-2 text-center">
                                <span>or</span>
                            </div>
                            <Form.Group controlId="NewTag3">
                                <Form.Control type="text" placeholder="Enter New Tag" />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                        </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                        </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        return (
            <div className="practice_questions pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Container>
                    <div className={`asideNavBar ${this.state.sidetoggle === true ? 'active' : ''}`}>
                        <div className="overlay" onClick={() => this.setState({ sidetoggle: false })}></div>
                        <Card className="aside-content rounded-left">
                            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                <Card.Title onClick={() => this.setState({ sidetoggle: false })} className="mb-0"><i className="fal fa-arrow-left" /></Card.Title>
                                <Card.Title className="mb-0">
                                    {
                                        this.state.showDescription ?
                                            (
                                                <i className="fal fa-save" onClick={this.handleFormSubmit} />
                                            )
                                            :
                                            (
                                                <i className="fal fa-edit" onClick={() => this.setState({ showDescription: !this.state.showDescription })} />
                                            )
                                    }
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Scrollbars style={{ height: '100vh', maxHeight: '100%' }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.state.currentStep == 5 ? (
                                        <Form.Text className="form-text text-danger">
                                            Saved successfully
                                        </Form.Text>
                                    ) : (

                                            <Form.Text className="form-text text-danger">
                                                {this.state.submitError}
                                            </Form.Text>
                                        )}
                                    <Row>
                                        {
                                            this.state.showDescription ?
                                                (
                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                        <Card as={Card.Body} className="mb-3">
                                                            <h6 className="mb-0">{this.tagsfunction(this.state.tags)}</h6>
                                                        </Card>
                                                        <Card className="mb-3">
                                                            <Card.Body className="p-3">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows="6"
                                                                    //value={this.state.item}
                                                                    name="comments"
                                                                    value={this.state.comments}
                                                                    onChange={this.handleInputChange}
                                                                />
                                                            </Card.Body>
                                                            {/* <Card.Footer className="bg-white">
                                                                <Button
                                                                    onClick={this.handleFormSubmit}
                                                                    variant="outline-primary"> Save </Button>
                                                            </Card.Footer> */}
                                                        </Card>
                                                    </Col>
                                                )

                                                :

                                                (
                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                        <p>{this.state.comments}</p>
                                                    </Col>
                                                )
                                        }
                                    </Row>
                                </Scrollbars>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <Row className="page-indication">
                        <Col xl={12} lg={12} md={12}>
                            <div className="title mt-3 mb-4">
                                <h5>Navbar</h5>
                            </div>
                            <Nav className="my-3">
                                <Nav.Item><Nav.Link className="active" as={Link} to="#">Link</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link2</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link3</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link4</Nav.Link></Nav.Item>
                            </Nav>
                        </Col>
                    </Row> */}
                    <Row className="page-indication">
                        <Col xl={12} lg={12} md={12}>
                            <div className="title mt-3 mb-4">
                                <h5>Notes</h5>
                            </div>
                            <Nav className="my-3">
                                {/* <Nav.Item>
                                    <Nav.Link as={Link}
                                        to={{
                                            pathname: "/student/notes/videos",
                                            state: {
                                                tagid: this.state.tagid,
                                                subjectid: this.state.subjectid,
                                                
                                            }
                                        }}
                                    >Videos</Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item>
                                    {this.props.getStudentNotes[0].shortnotes_count != 0 ? (
                                        <Nav.Link as={Link}
                                            to={{
                                                pathname: "/student/notes/shortnotes-and-materials",
                                                state: {
                                                    tagid: this.state.tagid,
                                                    subjectid: this.state.subjectid,

                                                }
                                            }}
                                        >Short Notes & Revision Material - {this.props.getStudentNotes[0].shortnotes_count}</Nav.Link>
                                    ) : (<Nav.Link

                                    >Short Notes & Revision Material - {this.props.getStudentNotes[0].shortnotes_count}</Nav.Link>)}
                                </Nav.Item>
                                <Nav.Item>
                                    {this.props.getStudentNotes[0].practice_questions_count != 0 ? (
                                        <Nav.Link
                                            className={this.state.classactivep}
                                            as={Link}
                                            to={{
                                                pathname: "/student/notes/practice-questions",
                                                state: {
                                                    tagid: this.state.tagid,
                                                    subjectid: this.state.subjectid,

                                                }
                                            }}
                                        >Practice Questions - {this.props.getStudentNotes[0].practice_questions_count}</Nav.Link>
                                    ) : (<Nav.Link
                                        className={this.state.classactivep}

                                    >Practice Questions - {this.props.getStudentNotes[0].practice_questions_count}</Nav.Link>)}
                                </Nav.Item>
                                <Nav.Item>
                                    {this.props.getStudentNotes[0].exam_questions_count != 0 ? (
                                        <Nav.Link
                                            className={this.state.classactivee}
                                            as={Link}
                                            to={{
                                                pathname: "/student/notes/exam-questions",
                                                state: {
                                                    tagid: this.state.tagid,
                                                    subjectid: this.state.subjectid,

                                                }
                                            }}
                                        >Exam Questions - {this.props.getStudentNotes[0].exam_questions_count}</Nav.Link>
                                    ) : (<Nav.Link
                                        className={this.state.classactivee}

                                    >Exam Questions - {this.props.getStudentNotes[0].exam_questions_count}</Nav.Link>)}
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row className="g-0">
                        <Col xl={4} lg={4} md={12} sm={12} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center my-3 mr-3">
                                {this.props.contentType == 99 ? (<h6>Practice Questions</h6>) : (<h6>Exam Questions</h6>)}

                                {/* <i className="fal fa-search" /> */}
                            </div>
                            <ul className="questions-list list-unstyled m-0 p-0">
                                <Scrollbars style={{ height: '100vh' }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {
                                        this.state.questionData.map((item, index) => {
                                            return (
                                                <li key={item.id} >
                                                    <Link
                                                        onClick={(e) => this.solutionFunction(e, item.id)}
                                                        className={item.classActive}
                                                    >
                                                        <Card className="single_question border-0 shadow-sm">
                                                            <Card.Body className="d-flex align-items-center">
                                                                <div className="badge srNo">{this.idFunction(index)}</div>
                                                                <div className="question-content">{parse(this.decodefun(item.question))}-QID{item.id}</div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </Scrollbars>
                            </ul>
                        </Col>
                        {/* <Col xl={4} lg={4} md={12} sm={12} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center my-3 mr-3">
                                <h6>Practice Questions</h6>
                                <i className="fal fa-search" />
                            </div>
                            <ul className="questions-list list-unstyled m-0 p-0">
                                <Scrollbars style={{ height: '100vh' }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {
                                        practiceQuestionListData.map((item) => {
                                            const { id, activeClass, question } = item;
                                            return (
                                                <li key={id} >
                                                    <Link to="#" className={activeClass}>
                                                        <Card className="single_question border-0 shadow-sm">
                                                            <Card.Body className="d-flex align-items-center">
                                                                <div className="badge srNo">{id}</div>
                                                                <div className="question-content">{question}</div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </Scrollbars>
                            </ul>
                        </Col> */}
                        {this.state.questionData.map((item, index) => (
                            <React.Fragment>
                                {item.classActive == "active" ? (
                                    <Col xl={8} lg={8} md={12} sm={12}>
                                        <Card className="border-0 shadow-sm">
                                            <Card.Header className="bg-white border-0">
                                                <div className="instruction text-right my-2">
                                                    <ul className="helpTags list-inline m-0 p-0">
                                                    <li className="list-inline-item">
                                                        <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                                            onClick={() => {
                                                                this.scrollNotes.current.scrollIntoView({ behavior: 'smooth' });
                                                            }}>
                                                            <i className="fal fa-notes-medical" style={{ color: '#00000082' }} />
                                                            {item.ncomments != "" ? (
                                                            <i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />):("")}
                                                        </Button>
                                                    </li>
                                                        {item.bookmarked == "true" ? (<li className="list-inline-item">

                                                            <i style={{ cursor: "pointer" }} className="fas fa-bookmark text-success" onClick={(e) => this.removebookhandleFormSubmit(this.props.contentType, item.id)} />

                                                        </li>) : (<li className="list-inline-item">
                                                            <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                                                onClick={() => this.bookmarkButton(this.props.contentType, item.id)}
                                                            >
                                                                <i className="fal fa-bookmark" style={{ color: '#00000082' }} />
                                                            </Button>
                                                        </li>)}
                                                    </ul>
                                                </div>
                                            </Card.Header>
                                            <Card.Body className="pt-2">
                                                <Row className="question-area mb-4">
                                                    <Col xl={12} lg={12} md={12} sm={12} className="d-flex">
                                                        <h6 className="srNo text-success mr-3">{this.idFunction(index)}</h6>
                                                        <h6 className="question-text">{parse(this.decodefun(item.question))}-QID{item.id}</h6>
                                                    </Col>
                                                </Row>

                                                <ul className="sr-tags-list list-inline">
                                                    {item.tags.split(",").map((getData) => {
                                                        let tname = this.props.studentGlobals.tags.find(a => a.id == getData );
                                                        console.log("tname", this.props.studentGlobals.tags, getData, tname);
                                                        if (tname != undefined) {
                                                            return (
                                                                <li className="list-inline-item">
                                                                    {tname.tag}
                                                                </li>)
                                                        }
                                                    })}
                                                </ul>

                                                <Row className="question-option">

                                                    {this.answerFunction(item.id)}
                                                </Row>
                                                <Row className="question-descrption">
                                                    
                                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                                    <Alert variant="success" className="my-3 border-success">
                                                                        <h5>Solution</h5>
                                                                        <p>{parse(this.decodefun(item.explanation))}</p>
                                                                    </Alert>
                                                                    {/* <Alert variant="success" className="my-3 border-success">
                                                            <h5>DEFINITION</h5>
                                                            <h6>Contributors to the study of cell</h6>
                                                            <p>The cell is the basic structural and functional unit of life. Anton Von Leeuwenhoek first saw and described a live cell. Robert Hooke first coined the term Cell after observing the compartments in the thin-sliced cork. Matthias Schleiden, a German botanist reported that all plants are composed of different kinds of cells which form the tissues of the plant. Theodore Schwann (1839), a British Zoologist proposed that; Cells have a thin layer (plasma membrane), Cell wall is unique to the plant cells and the bodies of animals and plants are composed of cells and products of cells. Schleiden and Schwann together formulated the cell theory but failed to explain as to how new cells were formed. Rudolf Virchow (1855) first explained that cells divide and new cells are formed from pre-existing cells (Omnis cellula-e cellula).</p>
                                                        </Alert> */}
                                                                    {/* <Alert variant="info" className="mb-3 border-info">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h5>Formula</h5>
                                                                <i className="fal fa-link" />
                                                            </div>
                                                            <p>Formula The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic. </p>
                                                            <p>The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                                                            <p> The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                                                        </Alert> */}
                                                                </Col>

                                                           
                                                </Row>
                                                {/* <Row className="mt-3">
                                        <Col xl={12} lg={12} md={12}>
                                            <CardGroup>
                                                <Card as={Card.Body} className="bg-light">
                                                    <p className="text-muted">Attempted</p>
                                                    <h6>10,000</h6>
                                                </Card>
                                                <Card as={Card.Body} className="correct">
                                                    <p className="text-muted">Correct Answered</p>
                                                    <h6>6,000</h6>
                                                </Card>
                                                <Card as={Card.Body} className="wrong">
                                                    <p className="text-muted">Wrong Answered</p>
                                                    <h6>4,000</h6>
                                                </Card>
                                            </CardGroup>
                                        </Col>
                                    </Row> */}
                                                {/* <Row className="mt-3">
                                        <Col xl={4} lg={4} md={12}>
                                            <Card as={Card.Body} className="bg-light mb-3">
                                                <p className="text-muted">Not-Attempted</p>
                                                <h6>5,000</h6>
                                            </Card>
                                        </Col>
                                        <Col xl={8} lg={8} md={12}>
                                            <CardGroup>
                                                <Card as={Card.Body} className="correct">
                                                    <p className="text-muted">Public Exam</p>
                                                    <h6>2017 &amp; 2018</h6>
                                                </Card>
                                                <Card as={Card.Body} className="wrong">
                                                    <p className="text-muted">Type of question</p>
                                                    <h6>General</h6>
                                                </Card>
                                            </CardGroup>
                                        </Col>
                                    </Row> */}
                                                <Row ref={this.scrollNotes}>
                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                        <h6>Notes</h6>
                                                    </Col>
                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                        <ul className="list-unstyled note-list p-0 m-0">
                                                            <li>
                                                                <Card className="mb-3" as={Card.Body}
                                                                //onClick={() => this.setState({ sidetoggle: true, comments: item.comments, tags: item.tags, customcontentid: item.id })}
                                                                >
                                                                    {
                                                                        this.state.modalShow == false ? (<Form.Label className="font-weight-bold">Edit <Button variant="link text-decoration-none" onClick={() => this.notesButton(this.props.contentType, item.id)}><i className="fal fa-edit" /></Button></Form.Label>) : ("")}
                                                                    <h6 className="mb-0">{parse(item.comments)}</h6>
                                                                </Card>
                                                            </li>

                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>) : ("")}

                            </React.Fragment>))}
                    </Row>
                </Container>
                {/* note modal */}
                <SingleNoteModal
                    modaltype="notes"
                    studentGlobals={this.props.studentGlobals}
                    noteshandleFormSubmit={this.noteshandleFormSubmit}
                    removecontypId={this.state.removecontypId}
                    custonid={this.state.custonid}
                    stateData={this.state}
                    show={this.state.modalShow}
                    onHide={this.notonHide}
                />

                {/* bookmark modal */}

                <SingleBookModal
                    studentGlobals={this.props.studentGlobals}
                    bookhandleFormSubmit={this.bookhandleFormSubmit}
                    handleMutipleInputChange={this.handleMutipleInputChange}
                    handleInputChange={this.handleInputChange}
                    removecontypId={this.state.removecontypId}
                    custonid={this.state.custonid}
                    stateData={this.state}
                    show={this.state.modalShowb}
                    onHide={() => this.setState({ modalShowb: false })} />
            </div>
        )
    }
}





export default withRouter(compose(
    graphql(UPDATE_NOTES, {
        name: "updatenotes"
    }),
    graphql(ADD_NOTES, {
        name: "addnotes",
    }),
    graphql(ADD_BOOKMARKS, {
        name: "addbookmark"
    }), graphql(REMOVE_BOOKMARKS, {
        name: "removebookmark"
    }))(NotesPracticeQuestionsSectionSeperation));


