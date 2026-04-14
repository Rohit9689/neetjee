import React, { Component } from 'react'
import { components } from 'react-select'
import { Container, Row, Col, Form, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import '../videos/singlevideo/_singlevideo.scss'
import Select from 'react-select';
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown"
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
import { withRouter } from 'react-router-dom'
import SingleNoteModal from '../revision_materials/SingleNoteModal';
import SingleBookModal from '../revision_materials/SingleBookModal';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withApollo } from "@apollo/client/react/hoc";
import moment from 'moment';
import PdfViewerSection from './PdfViewerSection';
import YoutubeVideosSection from '../../youtube/YoutubeVideosSection';
import parse, { domToReact } from "html-react-parser";
const DropdownIndicator = (props) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                    className="css-6q0nyr-Svg"
                >
                    <path
                        fill="currentColor"
                        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                    ></path>
                </svg>
            </components.DropdownIndicator>
        )
    );
};
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


const ADD_REPORT = gql`
  mutation($params: AddReport) {
    addReport(params: $params)
  }
`;

const ADD_NOTES = gql`
  mutation($params: AddNotes) {
    addNotes(params: $params)
  }
`;

const ADD_BOOKMARKS = gql`
  mutation($params: AddBookmark) {
    addBookmark(params: $params)
  }
`;

const ADD_STAR = gql`
  mutation($params: AddStar) {
    addStar(params: $params)
  }
`;

const REMOVE_STAR = gql`
  mutation($params: AddStar) {
    removeStar(params: $params)
  }
`;

const REMOVE_BOOKMARKS = gql`
  mutation($params: AddBookmark) {
    removeBookmark(params: $params)
  }
`;
const TOTAL_VIEWS = gql`
  mutation($mobile: String!, $id: Int) {
    videoView(mobile: $mobile, id: $id)
  }
`;
class SingleVideoWatchingSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videosList: props.getData.videosList,
            index: props.getData.index,
            userRestionModalShow: false,

            show: true,
            modalShow: false,
            modalShowb: false,
            reportreson: 0,
            reportcomment: "",
            submitError1: "",
            submitError2: "",
            submitError3: "",
            ntags: "",
            ntagsvalue: [],
            nnewtag: "",
            ncomments: "",
            //ncomments: props.getData.getData.notes.comments,
            bnewtag: "",
            btags: "",
            btagsvalue: [],
            formErrors: {
                reportreson: "",
                reportcomment: "",
                btags: "",
                bnewtag: "",
                ntags: "",
                nnewtag: "",
                ncomments: "",
            },
            currentStep: 1,
            formValid1: false,
            formValid2: false,
            formValid3: false,
            formValid4: false,
            reportresonValid: false,
            reportcommentValid: false,
            btagsValid: false,
            bnewtagValid: false,
            ntagsValid: false,
            nnewtagValid: false,
            ncommentsValid: false,
            //page: props.getData.page,
            loader: 0,
            getDerived: 0
        };
        this.popoverHide2 = React.createRef();
        this.cancelFun2 = this.cancelFun2.bind(this);

        this.popoverHide = React.createRef();
        this.cancelFun1 = this.cancelFun1.bind(this);

        this.popoverHide3 = React.createRef();
        this.cancelFun3 = this.cancelFun3.bind(this);
    }
    decodefun(data, id) {
        var decdata = "";
        try {
            decdata = decodeURIComponent(data);
        }
        catch (err) {
            console.log("Error Message:", err.message, id, data);
        }
        return decdata;
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
    practiceModal = (isuserValid) => {


        if (isuserValid.lp_practice_exam == false) {
            this.setState({
                userRestionModalShow: false
            });
            localStorage.setItem("subjectid", this.props.getData.getChapterId.subjectid);
            localStorage.setItem("type", "practice");
            localStorage.setItem("ocid", this.props.getData.getChapterId.ocid);
            localStorage.setItem("otid", "0");
            window.open("/student/subject/practice-test", "_blank") //to open new page
        } else {
            this.setState({
                userRestionModalShow: true
            });
        }


    };
    learningFun = (isuserValid) => {
        if (isuserValid.lp_custom_content == false) {
            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/start-learning",
                state: {
                    subjectid: this.props.getData.getChapterId.subjectid,
                    ocid: this.props.getData.getChapterId.ocid,
                    otid: "0",
                    defaultActiveKey: "third"
                }
            }
            );
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    previousFunction = (indexid) => {
        let index = parseFloat(indexid) - 1;
        this.setState({
            index: index
        }, () => this.totalviewhandleFormSubmit());
    }
    nextFunction = async (e, indexid) => {
        let index = parseFloat(indexid) + 1;
        this.setState({
            index: index
        }, () => this.totalviewhandleFormSubmit());
    }
    //add note
    noteshandleFormSubmit = (ntags, nnewtag, ncomments, contype, conid, getDerived) => {
        console.log("handleFormSubmit", contype, conid);
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
                if (data.addNotes != "") {
                    let globals1 = store.readQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile"),
                        },
                    });
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
                    this.props.studentGlobals.tags = globals1.studentGlobals.tags;

                }
                let fData = this.state.videosList.map((itema) => {
                    if (itema.id == this.state.videosList[this.state.index].id) {
                        //console.log("new_tag", this.state.new_tag, "ntags", this.state.ntags);
                        let notetag = [];
                        if (params.new_tag != "") {
                            notetag.push(data.addNotes);
                        }
                        if (params.tags != "") {
                            let array = params.tags.split(",");
                            array.map((item) => {
                                notetag.push(item)
                            });
                        }

                        return {
                            ...itema, notes: { tags: notetag.toString(), comments: params.comments }
                        }
                    }
                    else {
                        return {
                            ...itema
                        }
                    }
                });

                this.setState({
                    currentStep: 5,
                    videosList: fData

                    //index: this.props.getData.index,
                });
                setTimeout(() => {
                    this.SetpageLoad2(getDerived);
                }, 1500);
                //}
            },
        });
    };
    SetpageLoad2 = (getDerived) => {
        console.log("ppgetDerived", getDerived);
        this.setState({ currentStep: 1, modalShow: false, show: true, getDerived: parseInt(getDerived) + 1 });

    };
    notonHide = (getDerived) => {
        this.setState({ modalShow: false, getDerived: parseInt(getDerived) + 1 })
    }
    //add book mark
    bookhandleFormSubmit = (contype, conid) => {
        if (this.state.formValid3) {
            const params = {
                mobile: Cookies.get("mobile"),
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid),
                tags: this.state.btags,
                new_tag: this.state.bnewtag,
            };
            console.log("bookhandleFormSubmit", params);
            this.addbookmark(params).catch((error) => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError3: error.graphQLErrors.map((x) => x.message),
                });
                console.error(
                    "ERR =>",
                    error.graphQLErrors.map((x) => x.message)
                );
            });
        } else {
            this.setState({ submitError3: "Please fill all the values to proceed" });
        }
    };
    addbookmark = async (params) => {
        await this.props.addbookmark({
            variables: {
                params,
            },
            update: (store, { data }) => {
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

                const emptyMaterial = this.state.videosList.map((item) => {
                    if (this.state.videosList[this.state.index].id == item.id) {
                        console.log("sree", item, this.state.videosList[this.state.index].id);
                        return { ...item, bookmarked: true, bookmark_count: parseInt(this.state.videosList[this.state.index].bookmark_count) + 1 }
                    }
                    else {
                        return { ...item }
                    }

                });

                this.setState({
                    videosList: emptyMaterial,
                    btags: "",
                    bnewtag: "",
                    btagsvalue: [],
                    currentStep: 5,
                    submitError3: "",
                    formValid3: false
                });
                setTimeout(() => { this.SetpageLoad3() }, 1500);

            },
        });
    };
    SetpageLoad3 = () => {
        this.setState({ currentStep: 1, modalShowb: false }, () => {
        });
    }
    handleMutipleInputChange = (e, name) => {
        console.log("handleMutipleInputChange", e, name);
        if (name == "ntags") {
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
                    this.validateField(name, "1");
                });
            }
            else {
                this.setState({
                    ntagsvalue: [],
                    ntags: ""
                }, () => {
                    this.validateField(name, "");
                });

            }
        }
        else if (name == "btags") {
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
                    this.validateField(name, "1");
                });
            }
            else {
                this.setState({
                    btagsvalue: [],
                    btags: ""
                }, () => {
                    this.validateField(name, "");
                });

            }
        }

    };
    handleInputChange = (e) => {
        //console.log("handleInputChange", e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        console.log("fieldName", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let reportresonValid = this.state.reportresonValid;
        let reportcommentValid = this.state.reportcommentValid;
        let btagsValid = this.state.btagsValid;
        let bnewtagValid = this.state.bnewtagValid;
        let ntagsValid = this.state.ntagsValid;
        let nnewtagValid = this.state.nnewtagValid;
        let ncommentsValid = this.state.ncommentsValid;
        console.log(
            "validateField",
            this.state.bnewtagValid,
            this.state.ntagsValid,
            this.state.ncommentsValid
        );
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

            case "btags":
                if (value.length == "") {
                    btagsValid = false;
                    fieldValidationErrors.btags = "Bookmark tags Cannot Be Empty";
                } else {
                    btagsValid = true;
                    fieldValidationErrors.btags = "";
                }

                break;

            case "bnewtag":
                if (value.length == "") {
                    bnewtagValid = false;
                    fieldValidationErrors.bnewtag = "Bookmark new tag Cannot Be Empty";
                } else {
                    bnewtagValid = true;
                    fieldValidationErrors.bnewtag = "";
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
                    fieldValidationErrors.nnewtag = " new tag Cannot Be Empty";
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
                btagsValid: btagsValid,
                bnewtagValid: bnewtagValid,
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
            formValid3: this.state.btagsValid || this.state.bnewtagValid,
        });
        console.log("this.state.formValid2", this.state.formValid2);
        if (this.state.formValid1) {
            this.setState({ submitError1: "" });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" });
        }
        if (this.state.formValid3) {
            this.setState({ submitError3: "" });
        }
    }
    reasonsFun() {
        //console.log("reasonsFun", this.props);
        let data = this.props.studentGlobals.reports;
        let sarray = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const obj = {
                    value: idata.id,
                    label: idata.report,
                };
                sarray.push(obj);
            }
        }
        return sarray;
    }
    popoverFunction = (custonid) => {
        return (
            <Popover
                {...this.props}
                id="filter-popover"
                className="custom-popover shadow border-0"
                style={{ width: "250px" }}
            >
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
                                    placeholderName={"Select Reasons"}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea1">
                                <Form.Control
                                    value={this.state.reportcomment}
                                    name="reportcomment"
                                    onChange={this.handleInputChange}
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
                            <Button
                                onClick={() => this.cancelFun1()}
                                size="sm"
                                variant="link"
                                className="py-2"
                            >
                                Cancel
                  </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button
                                onClick={(e) => this.reporthandleFormSubmit("5", custonid)}
                                size="sm"
                                variant="link"
                                className="py-2"
                            >
                                Submit
                  </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
    };
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
    notesButton = (data) => {
        console.log("notesButton", data);
        let ncomments = "";
        let ntagsValid = false;
        let ncommentsValid = false;
        let formValid2 = false;
        let ntags = [];
        let ntagsvalue = [];
        if (data.comments != "") {
            ncomments = data.comments;
            ncommentsValid = true;
        }
        if (data.comments != "" && data.tags != "") {

            formValid2 = true;
        }
        if (data.tags != "") {
            let narray = data.tags.split(",");

            ntagsValid = true;


            narray.map((aa) => {
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
    //remove book mark
    removebookhandleFormSubmit = (contype, conid) => {
        console.log("removebookhandleFormSubmit", contype, conid);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        };
        console.log("noteshandleFormSubmit", params);
        this.removebookmark(params).catch((error) => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError3: error.graphQLErrors.map((x) => x.message),
            });
            console.error(
                "ERR =>",
                error.graphQLErrors.map((x) => x.message)
            );
        });
    };
    removebookmark = async (params) => {
        await this.props.removebookmark({
            variables: {
                params,
            },
            update: (store, { data }) => {
                if (data.removeBookmark) {
                    const emptyMaterial = this.state.videosList.map((item) => {
                        if (this.state.videosList[this.state.index].id == item.id) {
                            console.log("sree", this.state.videosList[this.state.index].id);
                            return { ...item, bookmarked: false, bookmark_count: parseInt(this.state.videosList[this.state.index].bookmark_count) - 1 }
                        }
                        else {
                            return { ...item }
                        }

                    });

                    this.setState({
                        videosList: emptyMaterial
                    });
                }
            },
        });
    };
    starhandleFormsubmit = (contype, conid) => {
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        };
        console.log("noteshandleFormSubmit", params);
        this.starmark(params).catch((error) => {
            console.log("catch if error");
            console.log(error);
            console.error(
                "ERR =>",
                error.graphQLErrors.map((x) => x.message)
            );
        });
    };
    starmark = async (params) => {
        await this.props.starmark({
            variables: {
                params,
            },
            update: (store, { data }) => {
                if (data.addStar) {
                    const emptyMaterial = this.state.videosList.map((item) => {
                        if (this.state.videosList[this.state.index].id == item.id) {
                            console.log("sree", this.state.videosList[this.state.index].id);
                            return { ...item, stared: true, star_count: parseInt(this.state.videosList[this.state.index].star_count) + 1 }
                        }
                        else {
                            return { ...item }
                        }

                    });

                    this.setState({
                        videosList: emptyMaterial
                    });
                }
            },
        });
    };
    //remove star mark
    removestarhandleFormSubmit = (contype, conid) => {
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        };
        console.log("noteshandleFormSubmit", params);
        this.removestarmark(params).catch((error) => {
            console.log("catch if error");
            console.log(error);
            console.error(
                "ERR =>",
                error.graphQLErrors.map((x) => x.message)
            );
        });
    };
    removestarmark = async (params) => {
        await this.props.removestarmark({
            variables: {
                params,
            },
            update: (store, { data }) => {
                if (data.removeStar) {
                    const emptyMaterial = this.state.videosList.map((item) => {
                        if (this.state.videosList[this.state.index].id == item.id) {
                            console.log("sree", this.state.videosList[this.state.index].id);
                            return { ...item, stared: false, star_count: parseInt(this.state.videosList[this.state.index].star_count) - 1 }
                        }
                        else {
                            return { ...item }
                        }

                    });

                    this.setState({
                        videosList: emptyMaterial
                    });
                }
            },
        });
    };
    //total views start
    totalviewhandleFormSubmit = (e) => {
        console.log("totalviewhandleFormSubmit", this.state.videosList[this.state.index].id);

        const mobile = Cookies.get("mobile")
        const id = parseInt(this.state.videosList[this.state.index].id)

        //console.log("totalviewhandleFormSubmit", params);
        this.totalviews(mobile, id).catch((error) => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError3: error.graphQLErrors.map((x) => x.message),
            });
            console.error(
                "ERR =>",
                error.graphQLErrors.map((x) => x.message)
            );
        });
    };
    totalviews = async (mobile, id) => {
        await this.props.totalviews({
            variables: {
                mobile, id
            },
            update: (store, { data }) => {
                console.log("videoView", data.videoView);
                if (data.videoView) {
                    const emptyMaterial = this.state.videosList.map((item) => {
                        if (this.state.videosList[this.state.index].id == item.id) {
                            //console.log("fix", this.state.videosList[this.state.index].views, this.state.videosList[this.state.index].your_views);
                            let views = parseInt(this.state.videosList[this.state.index].views) + 1;
                            //let your_views = parseInt(this.state.videosList[this.state.index].your_views) + 1;
                            //console.log("lfix", views, your_views);
                            return {
                                ...item, views: views,
                                //your_views: your_views 
                            }
                        }
                        else {
                            return { ...item }
                        }

                    });
                    this.props.stateData.views = "1"
                    this.setState({
                        videosList: emptyMaterial
                    });
                }
            },
        });
    };

    //total views end
    componentDidMount = () => {
        console.log("totalviewcomponentDidMount", this.props.stateData.views);
        if (this.props.stateData.views == "") {
            this.totalviewhandleFormSubmit();

        }

    }
    render() {
        console.log("this.props.urltype",this.props.urltype);
        
        //for StudentUserValid
        let isuserValid = "";
        if (this.props.urltype != "default" && this.props.urltype != "fdefaultvideo") {
            let isStudentUserValid = "";
            if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
                isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
            }
            else {
                this.props.history.push("/student/login");
            }
            isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        }

        const data = this.state.videosList[this.state.index];


        return (
            <React.Fragment>
                <div className="single_video_section pb-5">
                    <Container>
                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} sm={12} xs={12}>
                                <div className="embed-responsive embed-responsive-16by9 my-3">
                                    {data.video_source==1?(
                                        <YoutubeVideosSection
                                        videoid={data.video_id}
                                    />
                                    ):(
                                        <iframe className="embed-responsive-item" src={data.vimeo_url} title={data.title} controls={false} allowFullScreen></iframe>
                                    )}
                                    
                                </div>
                                <div className="content-block text-white">
                                    <div className="content">
                                        <Row className="align-items-end header mb-3" style={{ borderBottom: '1px solid #777373' }}>
                                            <Col xl={8} lg={8} md={12}>
                                                <div className="header-content">
                                                    <h5 className="title">{data.title}</h5>
                                                    <h6>{data.subjectName} - {data.ChapterName}</h6>
                                                </div>
                                            </Col>
                                            <Col xl={8} lg={8} md={12}>
                                                <div className="subheader-content">
                                                    <p className="text-white-50 mb-2">
                                                        {/* {data.views} Views .  */}
                                                    {moment.unix(data.created_timestamp).format("YYYY/MM/DD")}</p>
                                                </div>
                                            </Col>

                                            <Col xl={4} lg={4} md={12}>
                                                <div className="header-content d-flex align-items-end">
                                                    {/* <ul className="helpTags list-inline m-0 p-0  border-bottom">
                                                        <li className="list-inline-item">
                                                            <Button variant="link text-decoration-none text-white" 
                                                            onClick={(e) =>
                                                                this.likeshandleFormsubmit(
                                                                    "5",
                                                                    this.state.videosList[this.state.index].id
                                                                )
                                                            }
                                                            >
                                                                <i className="fas fa-thumbs-up"></i> {data.likes}
                                                            </Button>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <Button variant="link text-decoration-none text-white">
                                                                <i className="fas fa-thumbs-down"></i> {data.dislikes}
                                                            </Button>
                                                        </li>
                                                    </ul> */}
                                                    <ul className="helpTags list-inline ml-2 m-0 pb-2">
                                                        {/* <li className="list-inline-item mr-4">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} ref={r => (this.popoverHide = r)} rootClose>
                                                                <i className="fal fa-info-circle" />
                                                            </OverlayTrigger>
                                                        </li>
                                                        <li className="list-inline-item mr-4">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} ref={r => (this.popoverHide2 = r)} rootClose>
                                                                <i className="fal fa-notes-medical" />
                                                            </OverlayTrigger>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover3} ref={r => (this.popoverHide3 = r)} rootClose>
                                                                <i className="fal fa-bookmark" />
                                                            </OverlayTrigger>
                                                        </li> */}
                                                        {/* {this.state.videosList[this.state.index].stared ==
                                                            true ? (
                                                                <li className="list-inline-item mr-4">
                                                                    <i
                                                                        style={{ cursor: "pointer" }}
                                                                        title="star"
                                                                        className="fas fa-star text-warning"
                                                                        onClick={(e) =>
                                                                            this.removestarhandleFormSubmit(
                                                                                "5",
                                                                                this.state.videosList[this.state.index].id
                                                                            )
                                                                        }
                                                                    />
                                                                </li>
                                                            ) : (
                                                                <li className="list-inline-item mr-4">
                                                                    <i
                                                                        style={{ cursor: "pointer" }}
                                                                        title="star"
                                                                        className="fal fa-star"
                                                                        onClick={(e) =>
                                                                            this.starhandleFormsubmit(
                                                                                "5",
                                                                                this.state.videosList[this.state.index].id
                                                                            )
                                                                        }
                                                                    />
                                                                </li>
                                                            )} */}

                                                        {/* <li className="list-inline-item mr-4" style={{ cursor: "pointer" }}>
                                                            <OverlayTrigger
                                                                trigger="click"
                                                                placement="bottom"
                                                                overlay={this.popoverFunction(
                                                                    this.state.videosList[this.state.index].id
                                                                )}
                                                                ref={(r) => (this.popoverHide = r)}
                                                                rootClose
                                                            >
                                                                <i
                                                                    className="fal fa-info-circle"
                                                                    title="report"
                                                                />
                                                            </OverlayTrigger>
                                                        </li>

                                                        <li className="list-inline-item mr-4">
                                                            <Button variant="link p-0 text-decoration-none position-relative text-white" style={{ lineHeight: '21px' }}
                                                                onClick={() => this.notesButton(this.state.videosList[this.state.index].notes)}
                                                            >
                                                                <i className="fal fa-notes-medical" />
                                                             </Button>
                                                        </li>

                                                        {this.state.videosList[this.state.index].bookmarked ==
                                                            true ? (
                                                                <li className="list-inline-item mr-4" >
                                                                    <i
                                                                        style={{ cursor: "pointer" }}
                                                                        className="fa1 fa-bookmark text-success"
                                                                        title="bookmark"
                                                                        onClick={(e) =>
                                                                            this.removebookhandleFormSubmit(
                                                                                "5",
                                                                                this.state.videosList[this.state.index].id
                                                                            )
                                                                        }
                                                                    />
                                                                </li>
                                                            ) : (
                                                                <li className="list-inline-item mr-4">
                                                                    <Button variant="link p-0 text-decoration-none position-relative text-white" style={{ lineHeight: '21px' }}
                                                                        onClick={() => this.bookmarkButton()}
                                                                    >
                                                                        <i className="fal fa-bookmark"/>
                                                                    </Button>
                                                                </li>
                                                            )} */}
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="description">
                                            <p>
                                               { parse(
                                                 this.decodefun(
                                                    data.description,data
                                                )
                                            )}
                                            </p>
                                            
                                        </div>
                                        <Container>
                                            <Row className="text-center mt-4">
                                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>

                                                    {this.state.index > 0 ? (
                                                        <Button variant="light" className="mx-1" onClick={(e) =>
                                                            this.previousFunction(this.state.index)
                                                        }>Previous</Button>
                                                    ) : (
                                                            ""
                                                        )}

                                                    {this.props.getData.type != "iv" ? (<React.Fragment>
                                                        <Button variant="light border-success text-success" className="mx-1" onClick={(e) => this.practiceModal(isuserValid)}>Practise</Button>
                                                        <Button variant="light border-success text-success" className="mx-1" onClick={(e) => this.learningFun(isuserValid)}>Revision Material</Button>
                                                    </React.Fragment>) : ("")}

                                                    {this.state.index <
                                                        parseFloat(this.state.videosList.length) - 1 ? (
                                                            <Button variant="light" className="mx-1" onClick={(e) =>
                                                                this.nextFunction(e, this.state.index)
                                                            }>Skip</Button>
                                                        ) : (
                                                            ""
                                                        )}
                                                </Col>
                                            </Row>
                                        </Container>
                                        {data.pdf_file != "" ? (<PdfViewerSection pdf_file={data.pdf_file} />) : ("")}

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* <div className="fixed-bottom">
                    <Container>
                        <Row className="text-center mt-4">
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>

                                {this.state.index > 0 ? (
                                    <Button variant="light" className="mx-1" onClick={(e) =>
                                        this.previousFunction(this.state.index)
                                    }>Previous</Button>
                                ) : (
                                        ""
                                    )}


                                <Button variant="light border-success text-success" className="mx-1" onClick={(e) => this.practiceModal(isuserValid)}>Practise</Button>
                                <Button variant="light border-success text-success" className="mx-1" onClick={(e) => this.learningFun(isuserValid)}>Revision Material</Button>
                                {this.state.index <
                                    parseFloat(this.state.videosList.length) - 1 ? (
                                        <Button variant="light" className="mx-1" onClick={(e) =>
                                            this.nextFunction(e, this.state.index)
                                        }>Skip</Button>
                                    ) : (
                                        ""
                                    )}
                            </Col>
                        </Row>
                    </Container>
                </div> */}
                <SingleNoteModal
                    studentGlobals={this.props.studentGlobals}
                    noteshandleFormSubmit={this.noteshandleFormSubmit}
                    removecontypId="5"
                    custonid={data.id}
                    stateData={this.state}
                    show={this.state.modalShow}
                    onHide={this.notonHide}
                />
                <SingleBookModal
                    studentGlobals={this.props.studentGlobals}
                    bookhandleFormSubmit={this.bookhandleFormSubmit}
                    handleMutipleInputChange={this.handleMutipleInputChange}
                    handleInputChange={this.handleInputChange}
                    removecontypId="5"
                    custonid={data.id}
                    stateData={this.state}
                    show={this.state.modalShowb}
                    onHide={() => this.setState({ modalShowb: false })} />
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </React.Fragment>
        )
    }
}



export default withApollo(withRouter(
    compose(
        graphql(REMOVE_BOOKMARKS, {
            name: "removebookmark",
        }),
        graphql(TOTAL_VIEWS, {
            name: "totalviews",
        }),
        graphql(ADD_REPORT, {
            name: "addreport",
        }),
        graphql(ADD_NOTES, {
            name: "addnotes",
        }),
        graphql(ADD_BOOKMARKS, {
            name: "addbookmark",
        }),
        graphql(ADD_STAR, {
            name: "starmark",
        }),
        graphql(REMOVE_STAR, {
            name: "removestarmark",
        })
    )(SingleVideoWatchingSection)
));
