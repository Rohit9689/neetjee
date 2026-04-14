import React, { Component } from 'react'
import { Row, Col, Tab, Nav } from 'react-bootstrap'
import ConceptsData from './concepts/ConceptData'
import ConceptCardGroup from '../revision_materials/concepts/ConceptCardGroup'
import '../_subjects.scss';
import ShortNotes from './concepts/ShortNotes';
import ConceptCard from './concepts/ConceptCard';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../../preloader/PreloaderTwo';

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

const FETCH_CUSTOMCONTENT = gql`
  query($topicId: Int,$chapterId:Int,$mobile: String!) {
        getCustomContent(topicId: $topicId,chapterId:$chapterId, mobile: $mobile){
            id
            customcontent
            content{
                id
                subject
                title
                description
                video_link
                file
                bookmarked
                stared
                
            }
        }
    }
`;

class RevisionMaterialSection extends Component {
    constructor(props) {
        super(props)
        this.ConceptCard = React.createRef();
        this.ConceptCard1 = React.createRef();
        this.ConceptCard2 = React.createRef();
        this.ConceptCard3 = React.createRef();
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
                reportcomment: "",
                btags: "",
                bnewtag: "",
                ntags: "",
                nnewtag: "",
                ncomments: ""
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
            ncommentsValid: false
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
                        reportcommentValid: false
                    });

                    setTimeout(() => { this.SetpageLoad(params) }, 1500);
                }
            }
        });
    };
    SetpageLoad = (params) => {
        this.setState({ currentStep: 1 });
        if (params.content_type == "4") {
            this.ConceptCard.current.cancelFun2();
        }
        else if (params.content_type == "6") {
            this.ConceptCard1.current.cancelFun2();
        }
        else if (params.content_type == "7") {
            this.ConceptCard2.current.cancelFun2();
        }
        else if (params.content_type == "10") {
            this.ConceptCard3.current.cancelFun2();
        }
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
                        reportcommentValid: false
                    });

                    setTimeout(() => { this.SetpageLoad2(params) }, 1500);
                }
            }
        });
    };
    SetpageLoad2 = (params) => {
        this.setState({ currentStep: 1 });
        if (params.content_type == "4") {
            console.log("params.content_type", params.content_type);
            this.ConceptCard.current.cancelFun2();
        }
        else if (params.content_type == "6") {
            console.log("params.content_type", params.content_type);
            this.ConceptCard1.current.cancelFun2();
        }
        else if (params.content_type == "7") {
            console.log("params.content_type", params.content_type);
            this.ConceptCard2.current.cancelFun2();
        }
        else if (params.content_type == "10") {
            console.log("params.content_type", params.content_type);
            this.ConceptCard3.current.cancelFun2();
        }
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
                        reportcommentValid: false
                    });
                    let data1 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });

                    console.log("data1", data1);
                    let findContentData = data1.getCustomContent.find((a) => a.id == params.content_type);
                    let idindex1 = data1.getCustomContent.indexOf(findContentData)
                    console.log("findContentData", findContentData);
                    let contentObj = findContentData.content;
                    let findContentIndex = contentObj.find((b) => b.id == params.custom_content_id)
                    let idindex = contentObj.indexOf(findContentIndex)
                    const newcontentObj = {
                        id: params.custom_content_id.toString(),
                        subject: findContentIndex.subject,
                        title: findContentIndex.title,
                        description: findContentIndex.description,
                        video_link: findContentIndex.video_link,
                        file: findContentIndex.file,
                        bookmarked: true,
                        stared: findContentIndex.stared,
                        __typename: "CustomContent"
                    }
                    contentObj.splice(idindex, 1, newcontentObj);
                    console.log("data2", data1);
                    try {
                        store.writeQuery({
                            query: FETCH_CUSTOMCONTENT,
                            variables: {
                                topicId: parseInt(this.props.getChapterId.otid),
                                chapterId: parseInt(this.props.getChapterId.ocid),
                                mobile: Cookies.get("mobile")
                            },
                            data: data1
                        });

                    }
                    catch (e) {
                        console.log("Exception", e);
                    }
                    const data4 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });
                    data1.getCustomContent = data4;
                    console.log("data4", data1);

                    setTimeout(() => { this.SetpageLoad3(params) }, 1500);
                }

            }
        });
    };
    SetpageLoad3 = (params) => {
        this.setState({ currentStep: 1 });
        if (params.content_type == "4") {
            this.ConceptCard.current.cancelFun2();
        }
        else if (params.content_type == "6") {
            this.ConceptCard1.current.cancelFun2();
        }
        else if (params.content_type == "7") {
            this.ConceptCard2.current.cancelFun2();
        }
        else if (params.content_type == "10") {
            this.ConceptCard3.current.cancelFun2();
        }
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
                        reportcommentValid: false
                    });
                    let data1 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });

                    console.log("data1", data1);
                    let findContentData = data1.getCustomContent.find((a) => a.id == params.content_type);
                    let idindex1 = data1.getCustomContent.indexOf(findContentData)
                    console.log("findContentData", findContentData);
                    let contentObj = findContentData.content;
                    let findContentIndex = contentObj.find((b) => b.id == params.custom_content_id)
                    let idindex = contentObj.indexOf(findContentIndex)
                    const newcontentObj = {
                        id: params.custom_content_id.toString(),
                        subject: findContentIndex.subject,
                        title: findContentIndex.title,
                        description: findContentIndex.description,
                        video_link: findContentIndex.video_link,
                        file: findContentIndex.file,
                        bookmarked: false,
                        stared: findContentIndex.stared,
                        __typename: "CustomContent"
                    }
                    contentObj.splice(idindex, 1, newcontentObj);
                    console.log("data2", data1);
                    try {
                        store.writeQuery({
                            query: FETCH_CUSTOMCONTENT,
                            variables: {
                                topicId: parseInt(this.props.getChapterId.otid),
                                chapterId: parseInt(this.props.getChapterId.ocid),
                                mobile: Cookies.get("mobile")
                            },
                            data: data1
                        });

                    }
                    catch (e) {
                        console.log("Exception", e);
                    }
                    const data4 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });
                    data1.getCustomContent = data4;
                    console.log("data4", data1);
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
                        reportcommentValid: false
                    });
                    let data1 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });

                    console.log("data1", data1);
                    let findContentData = data1.getCustomContent.find((a) => a.id == params.content_type);
                    let idindex1 = data1.getCustomContent.indexOf(findContentData)
                    console.log("findContentData", findContentData);
                    let contentObj = findContentData.content;
                    let findContentIndex = contentObj.find((b) => b.id == params.custom_content_id)
                    let idindex = contentObj.indexOf(findContentIndex)
                    const newcontentObj = {
                        id: params.custom_content_id.toString(),
                        subject: findContentIndex.subject,
                        title: findContentIndex.title,
                        description: findContentIndex.description,
                        video_link: findContentIndex.video_link,
                        file: findContentIndex.file,
                        bookmarked: findContentIndex.bookmarked,
                        stared: true,
                        __typename: "CustomContent"
                    }
                    contentObj.splice(idindex, 1, newcontentObj);
                    console.log("data2", data1);
                    try {
                        store.writeQuery({
                            query: FETCH_CUSTOMCONTENT,
                            variables: {
                                topicId: parseInt(this.props.getChapterId.otid),
                                chapterId: parseInt(this.props.getChapterId.ocid),
                                mobile: Cookies.get("mobile")
                            },
                            data: data1
                        });

                    }
                    catch (e) {
                        console.log("Exception", e);
                    }
                    const data4 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });
                    data1.getCustomContent = data4;
                    console.log("data4", data1);
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
                        reportcommentValid: false
                    });
                    let data1 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });

                    console.log("data1", data1);
                    let findContentData = data1.getCustomContent.find((a) => a.id == params.content_type);
                    let idindex1 = data1.getCustomContent.indexOf(findContentData)
                    console.log("findContentData", findContentData);
                    let contentObj = findContentData.content;
                    let findContentIndex = contentObj.find((b) => b.id == params.custom_content_id)
                    let idindex = contentObj.indexOf(findContentIndex)
                    const newcontentObj = {
                        id: params.custom_content_id.toString(),
                        subject: findContentIndex.subject,
                        title: findContentIndex.title,
                        description: findContentIndex.description,
                        video_link: findContentIndex.video_link,
                        file: findContentIndex.file,
                        bookmarked: findContentIndex.bookmarked,
                        stared: false,
                        __typename: "CustomContent"
                    }
                    contentObj.splice(idindex, 1, newcontentObj);
                    console.log("data2", data1);
                    try {
                        store.writeQuery({
                            query: FETCH_CUSTOMCONTENT,
                            variables: {
                                topicId: parseInt(this.props.getChapterId.otid),
                                chapterId: parseInt(this.props.getChapterId.ocid),
                                mobile: Cookies.get("mobile")
                            },
                            data: data1
                        });

                    }
                    catch (e) {
                        console.log("Exception", e);
                    }
                    const data4 = store.readQuery({
                        query: FETCH_CUSTOMCONTENT,
                        variables: {
                            topicId: parseInt(this.props.getChapterId.otid),
                            chapterId: parseInt(this.props.getChapterId.ocid),
                            mobile: Cookies.get("mobile")
                        }
                    });
                    data1.getCustomContent = data4;
                }

            }
        });
    };
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
        else if (name == "btags") {
            let btags = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const tag = e[i];
                    btags.push(tag.value);
                }
                console.log("btags", btags);
                this.setState({
                    btags: btags.toString()
                }, () => {
                    this.validateField(name, "1")
                });
            }
        }
        //this.validateField(name, "1");
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
        console.log("fieldName", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let reportresonValid = this.state.reportresonValid;
        let reportcommentValid = this.state.reportcommentValid;
        let btagsValid = this.state.btagsValid;
        let bnewtagValid = this.state.bnewtagValid;
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
                btagsValid: btagsValid,
                bnewtagValid: bnewtagValid,
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
            formValid3: this.state.btagsValid || this.state.bnewtagValid
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
    }
    render() {
        console.log("currentState", this.state);
        const topics = this.props.topics;
        const loading1 = topics.loading;
        const error1 = topics.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("RevisionMaterialSection", topics.getCustomContent);
        const funData = topics.getCustomContent.find((a) => a.id == 1);
        const NumaricalsData = topics.getCustomContent.find((a) => a.id == 4);
        const ConstantsData = topics.getCustomContent.find((a) => a.id == 6);
        const ExceptionsData = topics.getCustomContent.find((a) => a.id == 7);
        const ShapesData = topics.getCustomContent.find((a) => a.id == 10);
        return (
            <div className="subject_section">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Tab.Container id="RevisionMaterial-tabs" defaultActiveKey="first" >
                            <Nav variant="pills nav-fill RevisionMaterial" className="flex-row my-4">
                                <Nav.Item>
                                    <Nav.Link eventKey="first"> Short Notes {funData.content.length}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Numaricals {NumaricalsData.content.length}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="three">Constants {ConstantsData.content.length}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="four">Exceptions {ExceptionsData.content.length}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="five">Shapes {ShapesData.content.length}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="shortNote">
                                        <ShortNotes
                                            //ref={this.ConceptCard}
                                            stateData={this.state}
                                            parenthandleInputChange={this.handleInputChange}
                                            parentselecthandleInputChange={this.selecthandleInputChange}
                                            getData={funData.content}
                                            getChapterId={this.props.getChapterId}
                                            type="1"
                                            studentGlobals={this.props.studentGlobals}
                                            parenthandleFormSubmit={this.reporthandleFormSubmit}
                                            phandleMutipleInputChange={this.handleMutipleInputChange}
                                            parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                            parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                            parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                            parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                            parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" >
                                    <div className="Numaricals">
                                        <ConceptCard
                                            ref={this.ConceptCard}
                                            stateData={this.state}
                                            parenthandleInputChange={this.handleInputChange}
                                            parentselecthandleInputChange={this.selecthandleInputChange}
                                            getData={NumaricalsData.content}
                                            type="4"
                                            parenthandleFormSubmit={this.reporthandleFormSubmit}
                                            studentGlobals={this.props.studentGlobals}
                                            phandleMutipleInputChange={this.handleMutipleInputChange}
                                            parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                            parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                            parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                            parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                            parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit}
                                        />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="three" >
                                    <div className="Constants">
                                        <ConceptCard
                                            ref={this.ConceptCard1}
                                            parenthandleInputChange={this.handleInputChange}
                                            parentselecthandleInputChange={this.selecthandleInputChange}
                                            stateData={this.state}
                                            getData={ConstantsData.content}
                                            parenthandleFormSubmit={this.reporthandleFormSubmit}
                                            parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                            type="6"
                                            studentGlobals={this.props.studentGlobals}
                                            phandleMutipleInputChange={this.handleMutipleInputChange}
                                            parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                            parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                            parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                            parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="four">
                                    <div className="Exceptions">
                                        <ConceptCard
                                            ref={this.ConceptCard2}
                                            parenthandleInputChange={this.handleInputChange}
                                            parentselecthandleInputChange={this.selecthandleInputChange}
                                            stateData={this.state}
                                            getData={ExceptionsData.content}
                                            type="7"
                                            parenthandleFormSubmit={this.reporthandleFormSubmit}
                                            studentGlobals={this.props.studentGlobals}
                                            phandleMutipleInputChange={this.handleMutipleInputChange}
                                            parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                            parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                            parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                            parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                            parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit} />
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="five">
                                    <div className="Shapes">
                                        <ConceptCard
                                            ref={this.ConceptCard3}
                                            parenthandleInputChange={this.handleInputChange}
                                            parentselecthandleInputChange={this.selecthandleInputChange}
                                            stateData={this.state}
                                            getData={ShapesData.content} type="10"
                                            parenthandleFormSubmit={this.reporthandleFormSubmit}
                                            studentGlobals={this.props.studentGlobals}
                                            phandleMutipleInputChange={this.handleMutipleInputChange}
                                            parentbookhandleFormSubmit={this.bookhandleFormSubmit}
                                            parentnoteshandleFormSubmit={this.noteshandleFormSubmit}
                                            parentstarhandleFormsubmit={this.starhandleFormsubmit}
                                            parentremovebookhandleFormSubmit={this.removebookhandleFormSubmit}
                                            parentremovestarhandleFormSubmit={this.removestarhandleFormSubmit} />
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default
    compose(graphql(FETCH_CUSTOMCONTENT,
        {
            options: props => ({
                variables: {
                    topicId: parseInt(props.getChapterId.otid),
                    chapterId: parseInt(props.getChapterId.ocid),
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: 'network-only'
            }), name: "topics"
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
        }))(RevisionMaterialSection);




