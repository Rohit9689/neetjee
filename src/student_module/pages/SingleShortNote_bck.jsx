import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import SingleShortNoteSection from '../components/learn_practice/revision_materials/concepts/SingleShortNoteSection'
import ChepterHeaderSectionThree from '../components/learn_practice/top_header/ChepterHeaderSectionThree'
import { Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';

const ADD_REPORT = gql`
  mutation(
    $params:AddReport  
    ) {
        addReport(
        params: $params
     )
  }
`;

const ADD_NOTES = gql`
  mutation(
    $params:AddNotes  
    ) {
        addNotes(
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

const ADD_STAR = gql`
  mutation(
    $params:AddStar  
    ) {
        addStar(
        params: $params
     )
  }
`;

const REMOVE_STAR = gql`
  mutation(
    $params:AddStar  
    ) {
        removeStar(
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

class SingleShortNote extends Component {
    constructor(props) {
        super(props)
        this.SingleShortNoteSection = React.createRef();
        this.state = {
            reportreson: 0,
            reportcomment: "",
            submitError1: "",
            submitError2: "",
            submitError3: "",
            ntags: "",
            nnewtag: "",
            ncomments: "",
            bnewtag: "",
            btags: "",
            formErrors: {
                reportreson: "",
                reportcomment: ""
            },
            currentStep: 1,
            formValid1: false,
            formValid2: false,
            formValid3: false,
            formValid4: false,
            reportresonValid: false,
            reportcommentValid: false,
            bookmarked: props.history.location.state.bookmarked,
            stared: props.history.location.state.stared


        }
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
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: this.state.bookmarked,
                        stared: this.state.stared
                    });

                    setTimeout(() => { this.SetpageLoad() }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        this.setState({ currentStep: 1 });
        this.SingleShortNoteSection.current.cancelFun1();
    }

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
                if (data.addNotes) {
                    this.setState({
                        currentStep: 5,
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: this.state.bookmarked,
                        stared: this.state.stared
                    });

                    setTimeout(() => { this.SetpageLoad2() }, 1500);
                }
            }
        });
    };
    SetpageLoad2 = () => {
        this.setState({ currentStep: 1 });
        this.SingleShortNoteSection.current.cancelFun2();
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
                if (data.addBookmark) {
                    this.setState({
                        currentStep: 5,
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: true,
                        stared: this.state.stared
                    });
                    setTimeout(() => { this.SetpageLoad3() }, 1500);
                    this.props.history.push({
                        pathname: "/student/subject/start-learning",
                        state: {
                            hname: this.props.history.location.state.getChapterId.hname,
                            chapterid: this.props.history.location.state.getChapterId.chapterid,
                            chapter: this.props.history.location.state.getChapterId.chapter,
                            ocid: this.props.history.location.state.getChapterId.ocid,
                            otid: "0"
                        }
                    });
                }

            }
        });
    };
    SetpageLoad3 = () => {
        this.setState({ currentStep: 1 });
        //this.SingleShortNoteSection.current.cancelFun3();
    }


    //remove book mark
    removebookhandleFormSubmit = (contype, conid) => {
        console.log("removebookhandleFormSubmit", contype, conid);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid),
        }
        console.log("noteshandleFormSubmit", params);
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
                if (data.removeBookmark) {
                    this.setState({
                        currentStep: 1,
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: false,
                        stared: this.state.stared
                    });
                    this.props.history.push({
                        pathname: "/student/subject/start-learning",
                        state: {
                            hname: this.props.history.location.state.getChapterId.hname,
                            chapterid: this.props.history.location.state.getChapterId.chapterid,
                            chapter: this.props.history.location.state.getChapterId.chapter,
                            ocid: this.props.history.location.state.getChapterId.ocid,
                            otid: "0"
                        }
                    });
                }

            }
        });
    };

    starhandleFormsubmit = (contype, conid) => {
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid)
        }
        console.log("noteshandleFormSubmit", params);
        this.starmark(
            params
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    starmark = async (
        params) => {
        await this.props.starmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.addStar) {
                    this.setState({
                        currentStep: 1,
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: this.state.bookmarked,
                        stared: true
                    });
                    this.props.history.push({
                        pathname: "/student/subject/start-learning",
                        state: {
                            hname: this.props.history.location.state.getChapterId.hname,
                            chapterid: this.props.history.location.state.getChapterId.chapterid,
                            chapter: this.props.history.location.state.getChapterId.chapter,
                            ocid: this.props.history.location.state.getChapterId.ocid,
                            otid: "0"
                        }
                    });
                }
            }
        });
    };
    //remove star mark
    removestarhandleFormSubmit = (contype, conid) => {
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(contype),
            custom_content_id: parseInt(conid)
        }
        console.log("noteshandleFormSubmit", params);
        this.removestarmark(
            params

        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    removestarmark = async (
        params) => {
        await this.props.removestarmark({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.removeStar) {
                    this.setState({
                        currentStep: 1,
                        reportreson: 0,
                        reportcomment: "",
                        submitError1: "",
                        submitError2: "",
                        submitError3: "",
                        ntags: "",
                        nnewtag: "",
                        ncomments: "",
                        bnewtag: "",
                        btags: "",
                        formErrors: {
                            reportreson: "",
                            reportcomment: ""
                        },

                        formValid1: false,
                        formValid2: false,
                        formValid3: false,
                        formValid4: false,
                        reportresonValid: false,
                        reportcommentValid: false,
                        bookmarked: this.state.bookmarked,
                        stared: false
                    });
                    this.props.history.push({
                        pathname: "/student/subject/start-learning",
                        state: {
                            hname: this.props.history.location.state.getChapterId.hname,
                            chapterid: this.props.history.location.state.getChapterId.chapterid,
                            chapter: this.props.history.location.state.getChapterId.chapter,
                            ocid: this.props.history.location.state.getChapterId.ocid,
                            otid: "0"
                        }
                    });
                }

            }
        });
    };
    handleMutipleInputChange = (e, type) => {
        if (type == "ntags") {
            let ntags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    ntags.push(tag.value);
                }
                this.setState({
                    ntags: ntags.toString()
                });
            }
        }
        else if (type == "btags") {
            let btags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    btags.push(tag.value);
                }
                this.setState({
                    btags: btags.toString()
                });
            }
        }
    };
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    handleInputChange = e => {
        //console.log("handleInputChange", e.target.name);
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
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                reportresonValid: reportresonValid,
                reportcommentValid: reportcommentValid

            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid1: this.state.reportresonValid && this.state.reportcommentValid,
            formValid2: true,
            formValid3: true
        });
        if (this.state.formValid1) {
            this.setState({ submitError1: "" }, () => { });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" }, () => { });
        }
        if (this.state.formValid3) {
            this.setState({ submitError3: "" }, () => { });
        }
    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                <AsideNavbar onClick={() => this.props.changeToggle()}/>
                    <div className="student-overlay" onClick={() => this.props.changeToggle()} />
                    <div className="content-wrapper pt-0">
                        <ChepterHeaderSectionThree getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                        <Container fluid={true}>
                            <SingleShortNoteSection
                                ref={this.SingleShortNoteSection}
                                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                stateData={this.state}
                                parenthandleInputChange={this.handleInputChange}
                                parentselecthandleInputChange={this.selecthandleInputChange}
                                type="1"
                                studentGlobals={studentGlobals.studentGlobals}
                                parenthandleFormSubmit={this.reporthandleFormSubmit}
                                phandleMutipleInputChange={this.handleMutipleInputChange}
                                parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit}
                            />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default
    withRouter(
        compose(graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    },
                }), name: "studentGlobals"
            }), graphql(ADD_REPORT, {
                name: "addreport"
            }), graphql(ADD_NOTES, {
                name: "addnotes"
            }), graphql(ADD_BOOKMARKS, {
                name: "addbookmark"
            }),
            graphql(ADD_STAR, {
                name: "starmark"
            }),
            graphql(REMOVE_STAR, {
                name: "removestarmark"
            }),
            graphql(REMOVE_BOOKMARKS, {
                name: "removebookmark"
            }))(SingleShortNote));
