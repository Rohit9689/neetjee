import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import Select from 'react-select';
import { Container, Row, Col, Card, Form, Popover, Nav, Tab, OverlayTrigger, Button, } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { NotesShortNoteList } from './NotesShortnoteMaterialData';
import parse, { domToReact } from 'html-react-parser';


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
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
const FETCH_GLOBALS = gql`
  query($mobile: String) {
    studentGlobals(mobile: $mobile) {
      reports {
        id
        report
      }
      tags {
        id
        tag
        type
      }
      contentTypes {
        id
        customcontent
      }
    }
  }
`;

class NotesSingleShortNoteMaterialRevisionsSection extends Component {
    constructor(props) {
        super(props)
        console.log("props.getData.getData", props.getData.getData);
        this.state = {
            show: true,
            modalShowb: false,
            modalShow: false,
            sidetoggle: false,
            showDescription: false,
            id: props.getData.getData.id,
            title: props.getData.getData.title,
            desc: props.getData.getData.description,
            bookmarked: props.getData.getData.bookmarked,
            totAryLen: props.getData.funData.length,

            index: props.getData.index,
            ncomments: props.getData.getData.comments,
            submitError: "",
            formValid: false,
            currentStep: 1,
            bnewtag: "",
            btags: "",
            btagsvalue: [],
            formValid3: false,
            ntags: props.getData.getData.tags,
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
            getDerived: 0
        }
        this.popoverHide3 = React.createRef();
        this.cancelFun3 = this.cancelFun3.bind(this);
        this.scrollNotes = React.createRef();

    }
    bookmarkFun(typ) {
        let data = this.props.studentGlobals.studentGlobals.tags;
        let sarray = [];
        console.log("bookmarkFun123", data);
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
    cancelFun3() {
        this.popoverHide3.handleHide();
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
            console.log("noteshandleFormSubmit", params);
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
                let globals1 = store.readQuery({
                    query: FETCH_GLOBALS,
                    variables: {
                        mobile: Cookies.get("mobile"),
                    },
                });
                const addBookmark = data.addBookmark.toString();
                console.log("globals1", globals1);
                if (this.state.bnewtag != "") {
                    let tarray = globals1.studentGlobals.tags;

                    let newobj = {
                        id: data.addBookmark.toString(),
                        tag: this.state.bnewtag,
                        type: "bookmark",
                        __typename: "Tags",
                    };
                    tarray.push(newobj);
                    globals1.studentGlobals.tags = tarray;
                    console.log("gbeforewrite", globals1);
                }

                try {
                    store.writeQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile"),
                        },
                        data: globals1,
                    });
                } catch (e) {
                    console.log("Exception", e);
                }
                this.props.studentGlobals.tags = globals1.studentGlobals.tags;

                const emptyMaterial = this.props.getData.funData.map((item) => {
                    if (this.props.getData.funData[this.state.index].id == item.id) {
                        console.log("sree", item, this.props.getData.funData[this.state.index].id);
                        return { ...item, bookmarked: "true" }
                    }
                    else {
                        return { ...item }
                    }

                });
                this.props.getData.funData = emptyMaterial
                this.setState({

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
                    const emptyMaterial = this.props.getData.funData.map((item) => {
                        if (this.props.getData.funData[this.state.index].id == item.id) {
                            console.log("sree", this.props.getData.funData[this.state.index].id);
                            return { ...item, bookmarked: "false" }
                        }
                        else {
                            return { ...item }
                        }

                    });
                    this.props.getData.funData = emptyMaterial
                    this.setState({
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
                content_type: 1,
                custom_content_id: parseInt(this.state.id)
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

        this.setState({ currentStep: 1, showDescription: false });
    }
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
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
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    previousFunction = (indexid) => {
        let index = parseFloat(indexid) - 1;
        let array = this.props.getData.funData[index];

        let ntagsvalue = [];
        let narray = array.tags.split(",");
        console.log("narray", narray);
        narray.map((aa) => {
            let findData = this.props.studentGlobals.studentGlobals.tags.find((a) => a.id == aa);
            if (findData != undefined) {
                const newObj = {
                    value: findData.id,
                    label: findData.tag
                }

                ntagsvalue.push(newObj);
            }
        });
        if (array != undefined) {
            this.setState({
                title: array.title,
                desc: array.description,
                id: array.id,
                index: index,
                ntags: array.tags,
                ncomments: array.comments,
                ntagsvalue: ntagsvalue,
                bookmarked: array.bookmarked
            });
        }
    }
    nextFunction = (indexid) => {
        let index = parseFloat(indexid) + 1;
        let array = this.props.getData.funData[index];

        let ntagsvalue = [];
        let narray = array.tags.split(",");
        console.log("narray", narray);
        narray.map((aa) => {
            let findData = this.props.studentGlobals.studentGlobals.tags.find((a) => a.id == aa);
            if (findData != undefined) {
                const newObj = {
                    value: findData.id,
                    label: findData.tag
                }

                ntagsvalue.push(newObj);
            }
        });
        if (array != undefined) {
            this.setState({
                title: array.title,
                desc: array.description,
                id: array.id,
                index: index,
                ntags: array.tags,
                ncomments: array.comments,
                ntagsvalue: ntagsvalue,
                bookmarked: array.bookmarked
            });
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
    popoverFunction3 = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Bookmarks</h6>
                    {this.state.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Bookmark saved successfully
                        </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.state.submitError3}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group
                            //controlId="SelectBookmark"
                            controlId="SelectPrinciple">
                            <Select maxMenuHeight={150}
                                defaultValue={this.bookmarkFun("def")}
                                isMulti
                                name="btags"
                                options={this.bookmarkFun()}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.handleMutipleInputChange("btags")}
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
                                value={this.state.bnewtag}
                                onChange={this.bhandleInputChange}
                                autoComplete="off" />
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun3()} size="sm" variant="link" className="py-2">
                            Cancel
                    </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button
                            //onClick={() => this.popoverHide3.handleHide()} 
                            onClick={(e) => this.bookhandleFormSubmit("1", custonid)}
                            size="sm" variant="link" className="py-2">
                            Submit
                    </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }
    bookmarkButton = () => {
        this.setState({
            modalShowb: true,
            formValid3: false,
            submitError3: "",
            bnewtag: "",
            btags: "",
            btagsvalue: []
        });

    }
    notesButton = () => {
        console.log("notesButton");
        let ncomments = "";
        let ntagsValid = false;
        let ncommentsValid = false;
        let formValid2 = false;
        let ntags = [];
        let ntagsvalue = [];
        if (this.props.getData.funData[this.state.index].comments != "") {
            ncomments = this.props.getData.funData[this.state.index].comments;
            ncommentsValid = true;
        }
        if (this.props.getData.funData[this.state.index].comments != "" && this.props.getData.funData[this.state.index].tags != "") {

            formValid2 = true;
        }
        if (this.state.tags != "") {
            let narray = this.props.getData.funData[this.state.index].tags.split(",");
            console.log("narray", narray);

            ntagsValid = true;


            narray.map((aa) => {
                //console.log("this.props.studentGlobals.tags",this.props.studentGlobals);
                let findData = this.props.studentGlobals.studentGlobals.tags.find((a) => a.id == aa);
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
                formValid2: formValid2
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
                formValid2: formValid2
            })
        }
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
                let globals1 = store.readQuery({
                    query: FETCH_GLOBALS,
                    variables: {
                        mobile: Cookies.get("mobile"),
                    },
                });
                const addNotes = data.addNotes.toString();
                console.log("globals1", globals1);
                if (params.new_tag != "") {
                    let tarray = globals1.studentGlobals.tags;

                    let newobj = {
                        id: data.addNotes.toString(),
                        tag: params.new_tag,
                        type: "notes",
                        __typename: "Tags",
                    };
                    tarray.push(newobj);
                    globals1.studentGlobals.tags = tarray;
                    console.log("gbeforewrite", globals1);
                }

                try {
                    store.writeQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile"),
                        },
                        data: globals1,
                    });
                } catch (e) {
                    console.log("Exception", e);
                }
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
                const emptyMaterial = this.props.getData.funData.map((item) => {
                    if (this.props.getData.funData[this.state.index].id == item.id) {
                        console.log("sree", this.props.getData.funData[this.state.index].id);
                        return { ...item, comments: params.comments, tags: notetag.toString() }
                    }
                    else {
                        return { ...item }
                    }

                });
                this.props.getData.funData = emptyMaterial
                this.setState({
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
        if (this.props.getData.funData[this.state.index].comments != "") {
            ncomments = this.props.getData.funData[this.state.index].comments;
        }
        this.setState({ modalShow: false, ncomments: ncomments, getDerived: parseInt(getDerived) + 1 })
    }
    render() {
        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;
        if (loading2) return null;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
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
        return (
            <div className="bookmark_shortNote_materials pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Container>
                    <div className="section-description mb-4">
                        <div className="breadcrumb-content d-md-flex justify-content-between align-items-center">
                            <h5 className="mb-0 pt-3">Shortnotes</h5>
                            <Link
                                to={{
                                    pathname: "/student/notes/shortnotes-and-materials",
                                    state: {
                                        tagid: this.props.getData.tagid,
                                        subjectid: this.props.getData.subjectid

                                    }
                                }}
                                className="btn btn-link text-dark"><i className="fal fa-long-arrow-alt-left" /> Back</Link>
                        </div>
                    </div>
                    <div className="shortnote_cards list-unstyled">
                        <div className="single_shortnote_list">
                            <Card key={this.state.id} className="single_card fullView">
                                <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                    <div>
                                        <Card.Title className="h6 mb-0">{this.state.title}</Card.Title>

                                        <ul className="sr-tags-list list-inline mt-2">
                                            {this.state.ntags.split(",").map((getData) => {
                                                let tname = studentGlobals.studentGlobals.tags.find(a => a.id == getData && a.type == "notes");
                                                console.log("tname", studentGlobals.studentGlobals.tags, getData, tname);
                                                if (tname != undefined) {
                                                    return (
                                                        <li className="list-inline-item">

                                                            {tname.tag}
                                                            <span className="ml-2 font-weight-bold">{tname.count}</span>

                                                        </li>)
                                                }
                                            })}
                                        </ul>
                                    </div>
                                    <ul className="helpTags list-inline m-0 p-0">
                                        <li className="list-inline-item">
                                            <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                                onClick={() => {
                                                    this.scrollNotes.current.scrollIntoView({ behavior: 'smooth' });
                                                }}>
                                                <i className="fal fa-notes-medical" title="Notes" style={{ color: '#00000082' }} />
                                                {this.state.ncomments != "" ? ( <i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />):("")}
                                            </Button>
                                        </li>

                                        {this.state.bookmarked == "true" ? (<li className="list-inline-item">

                                            <i style={{ cursor: "pointer" }} className="fas fa-bookmark text-success" title="Remove Bookmark" onClick={(e) => this.removebookhandleFormSubmit("1", this.state.id)} />

                                        </li>) : (<li className="list-inline-item">
                                            <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                                onClick={() => this.bookmarkButton()}
                                            >
                                                <i className="fal fa-bookmark" title="Bookmark" style={{ color: '#00000082' }} />
                                            </Button>
                                        </li>)}

                                    </ul>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>{parse(this.state.desc)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="notesTags mt-5" ref={this.scrollNotes}>
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12}><h5 className="mb-3">Notes</h5></Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <Card as={Card.Body}
                                     >
                                        {
                                            this.state.modalShow == false ? (<Form.Label className="font-weight-bold text-right">Edit <Button variant="link text-decoration-none" onClick={() => this.notesButton()}><i className="fal fa-edit" /></Button></Form.Label>) : ("")}
                                        <h6 className="mb-0">{parse(this.state.ncomments)}</h6>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {this.state.totAryLen > 1 ? (
                        <div className="pagination p-2 d-flex justify-content-between align-items-center">
                            {this.state.index > 0 ? (
                                <Button variant="outline-primary"
                                    onClick={(e) => this.previousFunction(this.state.index)}>Previous</Button>
                            ) : ("")}
                            {this.state.index < parseFloat(this.state.totAryLen) - 1 ? (
                                <Button variant="outline-primary" onClick={(e) => this.nextFunction(this.state.index)}>Next</Button>
                            ) : ("")}
                        </div>
                    ) : ("")}

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
                                                        <Card className="p-3 mb-3">
                                                            <h6 className="mb-0">{this.tagsfunction(this.state.tags)}</h6>
                                                        </Card>
                                                        <Card>
                                                            <Card.Body>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows="10"
                                                                    name="comments"
                                                                    value={this.state.ncomments}
                                                                    onChange={this.handleInputChange} />
                                                            </Card.Body>
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
                </Container>
                {/* note modal */}
                <SingleNoteModal
                    modaltype="notes"
                    studentGlobals={studentGlobals.studentGlobals}
                    noteshandleFormSubmit={this.noteshandleFormSubmit}
                    removecontypId="1"
                    custonid={this.state.id}
                    stateData={this.state}
                    show={this.state.modalShow}
                    onHide={this.notonHide}
                />

                {/* bookmark modal */}

                <SingleBookModal
                    studentGlobals={studentGlobals.studentGlobals}
                    bookhandleFormSubmit={this.bookhandleFormSubmit}
                    handleMutipleInputChange={this.handleMutipleInputChange}
                    handleInputChange={this.handleInputChange}
                    removecontypId="1"
                    custonid={this.state.id}
                    stateData={this.state}
                    show={this.state.modalShowb}
                    onHide={() => this.setState({ modalShowb: false })} />
            </div>
        )
    }
}
export default withRouter(compose(
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: "cache-and-network"
            }), name: "studentGlobals"
        }),
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
    }))(NotesSingleShortNoteMaterialRevisionsSection));


