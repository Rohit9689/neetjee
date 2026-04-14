import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import './_custom_revision_materials.scss';
import parse, { domToReact } from "html-react-parser";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import { withApollo } from "@apollo/client/react/hoc";
import SingleNoteModal from "../learn_practice/revision_materials/SingleNoteModal";
import SingleBookModal from "../learn_practice/revision_materials/SingleBookModal";
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
  mutation($params: StudentContentViewInput) {
    updateStudentContentViews(params: $params)
  }
`;
class SingleCustomRevisionMaterialSection extends Component {
    constructor(props) {
    super(props);
        this.state = {
            show: true,
            modalShowb: false,
            modalShow: false,
            index: props.getStudentRevisionMaterial.index,
            getStudentRevisionMaterial: props.getStudentRevisionMaterial.getStudentRevisionMaterial,
            stateData: props.getStudentRevisionMaterial.stateData,
            page: props.getStudentRevisionMaterial.page,
            loader: 0,
            //icons Data
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
            getDerived:0
        }
        this.popoverHide2 = React.createRef();
        this.cancelFun2 = this.cancelFun2.bind(this);

        this.popoverHide = React.createRef();
        this.cancelFun1 = this.cancelFun1.bind(this);

        this.popoverHide3 = React.createRef();
        this.cancelFun3 = this.cancelFun3.bind(this);
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        decdata = decdata.replace(/font-family/g, "ff");

        return decdata;
    }
    previousQuestion = () => {
        let findex = this.state.index - 1;

        let array = this.state.getStudentRevisionMaterial[findex];
    let ntagsvalue = [];
    console.log("previousFunction", array);
    let narray = array.notes.tags.split(",");
    console.log("narray", narray);
    narray.map((aa) => {
      //console.log("this.props.studentGlobals.tags",this.props.studentGlobals);
      let findData = this.props.studentGlobals.tags.find((a) => a.id == aa);
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
          index: findex,
          ntags: array.tags,
          ncomments: array.comments,
          ntagsvalue: ntagsvalue,
          bookmarked: array.bookmarked
        }, () => this.totalviewhandleFormSubmit());
      }
        

    }
    nextQuestion = async (e) => {
       
        let findex = this.state.index + 1;
        let array = this.state.getStudentRevisionMaterial[findex];
        let ntagsvalue = [];
        console.log("nextQuestion", array);
        let narray = array.notes.tags.split(",");
        console.log("narray", narray);
        narray.map((aa) => {
          //console.log("this.props.studentGlobals.tags",this.props.studentGlobals);
          let findData = this.props.studentGlobals.tags.find((a) => a.id == aa);
          if (findData != undefined) {
            const newObj = {
              value: findData.id,
              label: findData.tag
            }
    
            ntagsvalue.push(newObj);
          }
        });


        let totallenth = this.state.getStudentRevisionMaterial.length;
        let page = parseInt(this.state.page) + 1;
        // console.log("11mobile:", Cookies.get("mobile"),
        //     "content_type:", this.state.stateData.contentType,
        //     'subject_id:', parseInt(this.state.stateData.subjectsearch),
        //     "chapter_ids:", this.state.stateData.chaptersearch.toString(),
        //     " topic_id:", parseInt(this.state.stateData.topicsearch),
        //     "class_id:", parseInt(this.state.stateData.classsearch),
        //     'page:', parseInt(page));
        if (findex == totallenth - 1) {

            this.setState({
                loader: 1,
                page: page
            });
            console.log("22mobile:", Cookies.get("mobile"),
                "content_type:", this.state.stateData.contentType,
                'subject_id:', parseInt(this.state.stateData.subjectsearch),
                "chapter_ids:", this.state.stateData.chaptersearch.toString(),
                " topic_id:", parseInt(this.state.stateData.topicsearch),
                "class_id:", parseInt(this.state.stateData.classsearch),
                'page:', parseInt(page));

            const result = await this.props.client.query({
                query: gql` 
        query(
            $params: RevisionMaterialInput, 
            
            ) {
                getStudentRevisionMaterial(
                params: $params
                )
                {
                    id
                    subject
                    title
                    description
                    content_type
                    video_link
                    file
                    topic
                    chapter
                    chapter_name
                    topic_name
                    bookmarked
                    stared
                    star_count
                    bookmark_count
                    total_views
                    your_views
                    content_image
                    notes{
                        tags
                        comments
                    }
                
            }
        }
    `,
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        content_type: this.state.stateData.contentType,
                        subject_id: parseInt(this.state.stateData.subjectsearch),
                        chapter_ids: this.state.stateData.chaptersearch.toString(),
                        topic_id: parseInt(this.state.stateData.topicsearch),
                        class_id: parseInt(this.state.stateData.classsearch),
                        page: parseInt(page)
                    }
                },
            })
            if (result.data.getStudentRevisionMaterial.length > 0) {
                this.setState({ getStudentRevisionMaterial: this.state.getStudentRevisionMaterial.concat(result.data.getStudentRevisionMaterial), 
                    loader: 0, 
                    index: findex,
                    ntags: array.tags,
                    ncomments: array.comments,
                    ntagsvalue: ntagsvalue,
                    bookmarked: array.bookmarked });
            }
            else {
                this.setState({ loader: 0, index: findex,ntags: array.tags,
                    ncomments: array.comments,
                    ntagsvalue: ntagsvalue,
                    bookmarked: array.bookmarked });
            }


        }
        else {
            this.setState({
                index: findex,ntags: array.tags,
                ncomments: array.comments,
                ntagsvalue: ntagsvalue,
                bookmarked: array.bookmarked
            });
        }
        this.totalviewhandleFormSubmit();

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
                    // this.props.history.push({
                    //     pathname: "/student/revision-material-groups/custom-revision-materials",
                    //     state: {
                    //         multiStateData: this.props.getStudentRevisionMaterial.stateData.multiStateData,

                    //         content_type: this.props.getStudentRevisionMaterial.stateData.contentType
                    //     }
                    // });
                    const emptyMaterial = this.state.getStudentRevisionMaterial.map((item) => {
                        if (this.state.getStudentRevisionMaterial[this.state.index].id == item.id) {
                            console.log("sree", this.state.getStudentRevisionMaterial[this.state.index].id);
                            return { ...item, bookmarked: false, bookmark_count:parseInt(this.state.getStudentRevisionMaterial[this.state.index].bookmark_count)-1 }
                        }
                        else {
                            return { ...item }
                        }

                    });

                    this.setState({
                        getStudentRevisionMaterial: emptyMaterial
                    });
                }
            },
        });
    };
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
                //if (data.addBookmark) {

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

                const emptyMaterial = this.state.getStudentRevisionMaterial.map((item) => {
                    if (this.state.getStudentRevisionMaterial[this.state.index].id == item.id) {
                        console.log("sree", item, this.state.getStudentRevisionMaterial[this.state.index].id);
                        return { ...item, bookmarked: true ,bookmark_count:parseInt(this.state.getStudentRevisionMaterial[this.state.index].bookmark_count)+1}
                    }
                    else {
                        return { ...item }
                    }

                });

                this.setState({
                    getStudentRevisionMaterial: emptyMaterial,
                    btags: "",
                    bnewtag: "",
                    btagsvalue: [],
                    currentStep: 5,
                    submitError3: "",
                    formValid3: false
                });
                setTimeout(() => { this.SetpageLoad3() }, 1500);


                // this.props.history.push({
                //     pathname: "/student/revision-material-groups/custom-revision-materials",
                //     state: {
                //         multiStateData: this.props.getStudentRevisionMaterial.stateData.multiStateData,

                //         content_type: this.props.getStudentRevisionMaterial.stateData.contentType
                //     }
                // });
                // }
            },
        });
    };
    SetpageLoad3 = () => {
        this.setState({ currentStep: 1, modalShowb: false }, () => {
        });
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
            this.addnotes(params,getDerived).catch((error) => {
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
    addnotes = async (params,getDerived) => {
        await this.props.addnotes({
            variables: {
                params,
            },
            update: (store, { data }) => {
                if (data.addNotes != "") {
                    let globals1 = store.readQuery({
                        query: FETCH_GLOBALS,
                        variables: {
                            mobile: Cookies.get("mobile"),
                        }
                        ,
                        fetchPolicy: 'cache-and-network'
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
                            }
                            ,
                            fetchPolicy: 'cache-and-network',
                            data: globals1,
                        });
                    } catch (e) {
                        console.log("Exception", e);
                    }
                    this.props.studentGlobals.tags = globals1.studentGlobals.tags;


                }
                let fData = this.state.getStudentRevisionMaterial.map((itema) => {
                    if (itema.id == this.state.getStudentRevisionMaterial[this.state.index].id) {
                        console.log("nnewtag", params.new_tag, "ntags", params.tags);
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
                        ncomments: "",
                    },
                    currentStep: 5,
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
                    getStudentRevisionMaterial: fData,


                });
                setTimeout(() => {
                    this.SetpageLoad2(getDerived);
                }, 1500);
                //}
            },
        });
    };
    SetpageLoad2 = (getDerived) => {
        this.setState({ currentStep: 1, modalShow: false, show: true, getDerived:parseInt(getDerived)+1 });

    };
    //add report
    reporthandleFormSubmit = (contype, conid) => {
        console.log("handleFormSubmit", contype, conid);
        //e.preventDefault();
        if (this.state.formValid1) {
            const params = {
                mobile: Cookies.get("mobile"),
                report_id: parseInt(this.state.reportreson),
                comments: this.state.reportcomment,
                content_type: parseInt(contype),
                custom_content_id: parseInt(conid),
            };
            this.addreport(params).catch((error) => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError1: error.graphQLErrors.map((x) => x.message),
                });
                console.error(
                    "ERR =>",
                    error.graphQLErrors.map((x) => x.message)
                );
            });
        } else {
            this.setState({ submitError1: "Please fill all the values to proceed" });
        }
    };
    addreport = async (params) => {
        await this.props.addreport({
            variables: {
                params,
            },
            update: (store, { data }) => {
                if (data.addReport) {
                    this.setState({
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
                            ncomments: "",
                        },
                        currentStep: 5,
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
                    });

                    setTimeout(() => {
                        this.SetpageLoad(params);
                    }, 1500);
                }
            },
        });
    };
    SetpageLoad = (params) => {
        this.setState({ currentStep: 1 });
        this.cancelFun1();
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
                    // this.props.history.push({
                    //     pathname: "/student/revision-material-groups/custom-revision-materials",
                    //     state: {
                    //         multiStateData: this.props.getStudentRevisionMaterial.stateData.multiStateData,

                    //         content_type: this.props.getStudentRevisionMaterial.stateData.contentType
                    //     }
                    // });
                    const emptyMaterial = this.state.getStudentRevisionMaterial.map((item) => {
                        if (this.state.getStudentRevisionMaterial[this.state.index].id == item.id) {
                          console.log("sree", this.state.getStudentRevisionMaterial[this.state.index].id);
                          return { ...item, stared: true, star_count: parseInt(this.state.getStudentRevisionMaterial[this.state.index].star_count) + 1 }
                        }
                        else {
                          return { ...item }
                        }
            
                      });
            
                      this.setState({
                        getStudentRevisionMaterial: emptyMaterial
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
                    // this.props.history.push({
                    //     pathname: "/student/revision-material-groups/custom-revision-materials",
                    //     state: {
                    //         multiStateData: this.props.getStudentRevisionMaterial.stateData.multiStateData,

                    //         content_type: this.props.getStudentRevisionMaterial.stateData.contentType
                    //     }
                    // });
                    const emptyMaterial = this.state.getStudentRevisionMaterial.map((item) => {
                        if (this.state.getStudentRevisionMaterial[this.state.index].id == item.id) {
                            console.log("sree", this.state.getStudentRevisionMaterial[this.state.index].id);
                            return { ...item, stared: false, star_count:parseInt(this.state.getStudentRevisionMaterial[this.state.index].star_count)-1 }
                        }
                        else {
                            return { ...item }
                        }

                    });

                    this.setState({
                        getStudentRevisionMaterial: emptyMaterial
                    });
                }
            },
        });
    };
    reasonsFun() {
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
                    };
                    sarray.push(obj);
                }
            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        } else {
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
                    };
                    sarray.push(obj);
                }
            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        } else {
            somvar = sarray;
        }
        return somvar;
    }
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    handleInputChange = (e) => {
        //console.log("handleInputChange", e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    handleMutipleInputChange = (e, name) => {
        console.log("handleMutipleInputChange", e, name);
        // if (name == "ntags") {
        //     let ntags = Array();
        //     if (e != null) {
        //         for (let i = 0; i < e.length; i++) {
        //             const tag = e[i];
        //             ntags.push(tag.value);
        //         }
        //         this.setState(
        //             {
        //                 ntags: ntags.toString(),
        //             },
        //             () => {
        //                 this.validateField(name, "1");
        //             }
        //         );
        //     }
        // } 
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
        // else if (name == "btags") {
        //     let btags = Array();
        //     if (e != null) {
        //         for (let i = 0; i < e.length; i++) {
        //             const tag = e[i];
        //             btags.push(tag.value);
        //         }
        //         console.log("btags", btags);
        //         this.setState(
        //             {
        //                 btags: btags.toString(),
        //             },
        //             () => {
        //                 this.validateField(name, "1");
        //             }
        //         );
        //     }
        // }
        //this.validateField(name, "1");
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
                                onClick={(e) => this.reporthandleFormSubmit(this.state.stateData.contentType, custonid)}
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

    popoverFunction2 = (custonid) => {
        return (
            <Popover
                {...this.props}
                id="filter-popover"
                className="custom-popover shadow border-0"
                style={{ width: "250px" }}
            >
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
                                <Select
                                    maxMenuHeight={150}
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
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Enter New Tag"
                                    name="nnewtag"
                                    value={this.state.newtag}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea2">
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Some Comments"
                                    name="ncomments"
                                    value={this.state.ncomments}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button
                                onClick={() => this.cancelFun2()}
                                size="sm"
                                variant="link"
                                className="py-2"
                            >
                                Cancel
                  </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button
                                onClick={(e) => this.noteshandleFormSubmit(this.state.stateData.contentType, custonid)}
                                //onClick={() => this.popoverHide2.handleHide()}
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

    popoverFunction3 = (custonid) => {
        return (
            <Popover
                {...this.props}
                id="filter-popover"
                className="custom-popover shadow border-0"
                style={{ width: "250px" }}
            >
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
                                controlId="SelectPrinciple"
                            >
                                <Select
                                    maxMenuHeight={150}
                                    //defaultValue={this.bookmarkFun("def")}
                                    isMulti
                                    name="btags"
                                    options={this.bookmarkFun()}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={(e) => this.handleMutipleInputChange(e, "btags")}
                                />
                            </Form.Group>
                            <div className="mb-2 text-center">
                                <span>or</span>
                            </div>
                            <Form.Group controlId="NewTag3">
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Enter New Tag"
                                    name="bnewtag"
                                    value={this.state.bnewtag}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button
                                onClick={() => this.cancelFun3()}
                                size="sm"
                                variant="link"
                                className="py-2"
                            >
                                Cancel
                  </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button
                                //onClick={() => this.popoverHide3.handleHide()}
                                onClick={(e) => this.bookhandleFormSubmit(this.state.stateData.contentType, custonid)}
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
    showFunction = () => {
        console.log("showFunction");
        if (this.state.show == true) {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: true });
        }


    }
    handleEditorChange = (e) => {
        console.log("handleEditorChange", e.target.getContent());
        this.setState({
            ncomments: e.target.getContent()
        }, () => {
            this.validateField("ncomments", "1");
        });

    }

    //total views start
   totalviewhandleFormSubmit = (e) => {
        console.log("totalviewhandleFormSubmit", this.state.stateData.contentType);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(this.state.stateData.contentType),
            custom_content_id: parseInt(this.state.getStudentRevisionMaterial[this.state.index].id),
        };
        console.log("totalviewhandleFormSubmit", params);
        this.totalviews(params).catch((error) => {
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
    totalviews = async (params) => {
        await this.props.totalviews({
            variables: {
                params,
            },
            update: (store, { data }) => {
                console.log("updateStudentContentViews",data.updateStudentContentViews);
                if (data.updateStudentContentViews) {
                    const emptyMaterial = this.state.getStudentRevisionMaterial.map((item) => {
                        
                        if (this.state.getStudentRevisionMaterial[this.state.index].id == item.id) {
                            console.log("updateStudentContentViewsindex",this.state.index, this.state.getStudentRevisionMaterial[this.state.index].id, this.state.getStudentRevisionMaterial);
                            let total_views=parseInt(this.state.getStudentRevisionMaterial[this.state.index].total_views)+1;
                            let your_views=parseInt(this.state.getStudentRevisionMaterial[this.state.index].your_views)+1;
                            return { ...item, total_views: total_views ,your_views:your_views}
                        }
                        else {
                            return { ...item }
                        }

                    });
                    this.props.stateData.views="1"
                    this.setState({
                        getStudentRevisionMaterial: emptyMaterial
                    });
                }
            },
        });
    };
   
    //total views end
    componentDidMount=()=>{
        console.log("totalviewcomponentDidMount", this.props.stateData.views);
        if(this.props.stateData.views==""){
           this.totalviewhandleFormSubmit();

        }

    }
    notonHide=(getDerived)=>{
        this.setState({ modalShow: false,getDerived:parseInt(getDerived)+1 })
      }
    render() {
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


        const { id, title, description } = ConceptsData[0];
        const singleData = this.state.getStudentRevisionMaterial[this.state.index];
        console.log("singleData", this.state);
        return (
            <section className="custom-revision-materials pt-4 px-xl-3 px-lg-3">
                <Row className="concept_cards singles-materials">
                    <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12}>
                        <Card key={singleData.id} className="single_concept mb-4">
                            <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                <div className="d-flex">
                                    <div className="icon_area">
                                        <Image src={singleData.content_image} alt="material-img" width="25" />
                                    </div>
                                    <Card.Title className="h6 mb-0 ml-3">{singleData.title}</Card.Title>
                                </div>

                                <ul className="helpTags list-inline m-0 p-0">
                                    {this.state.getStudentRevisionMaterial[this.state.index].stared ==
                                        true ? (
                                            <li className="list-inline-item">
                                                <i
                                                    title="star"
                                                    className="fas fa-star text-warning"
                                                    onClick={(e) =>
                                                        this.removestarhandleFormSubmit(
                                                            this.state.stateData.contentType,
                                                            this.state.getStudentRevisionMaterial[this.state.index].id
                                                        )
                                                    }
                                                />
                                            </li>
                                        ) : (
                                            <li className="list-inline-item">
                                                <i
                                                    title="star"
                                                    className="fal fa-star"
                                                    onClick={(e) =>
                                                        this.starhandleFormsubmit(
                                                            this.state.stateData.contentType,
                                                            this.state.getStudentRevisionMaterial[this.state.index].id
                                                        )
                                                    }
                                                />
                                            </li>
                                        )}

                                    <li className="list-inline-item">
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="bottom"
                                            overlay={this.popoverFunction(
                                                this.state.getStudentRevisionMaterial[this.state.index].id
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
                                    <li className="list-inline-item">
                                        <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                            //onClick={() => this.setState({ modalShow: true })}
                                            onClick={() => this.notesButton(this.state.getStudentRevisionMaterial[this.state.index].notes)}
                                        >
                                            <i className="fal fa-notes-medical" style={{ color: '#00000082' }} />
                                            {this.state.getStudentRevisionMaterial[this.state.index].notes.tags != "" || this.state.getStudentRevisionMaterial[this.state.index].notes.comments != "" ? (<i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />) : ("")}
                                        </Button>


                                    </li>

                                    {this.state.getStudentRevisionMaterial[this.state.index].bookmarked ==
                                        true ? (
                                            <li className="list-inline-item">
                                                <i
                                                    className="fas fa-bookmark text-success"
                                                    title="bookmark"
                                                    onClick={(e) =>
                                                        this.removebookhandleFormSubmit(
                                                            this.state.stateData.contentType,
                                                            this.state.getStudentRevisionMaterial[this.state.index].id
                                                        )
                                                    }
                                                />
                                            </li>
                                        ) : (
                          <li className="list-inline-item">
                                                <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}
                                                    //onClick={() => this.setState({ modalShowb: true })}
                                                    onClick={() => this.bookmarkButton()}
                                                >
                                                    <i className="fal fa-bookmark" style={{ color: '#00000082' }} />
                                                </Button>
                                            </li>
                                        )}
                                </ul>
                            </Card.Header>
                            <Card.Body className="pt-2">
                                <Card.Text>{parse(this.decodefun(singleData.description))}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card as={Card.Body} className="shadow-sm mb-5">
                            <Row>
                               
<Col xl={3} lg={3} md={6} sm={6} xs={6}><i className="mr-2 fas fa-eye text-success"></i>My views : <strong>{singleData.your_views}</strong> </Col>
{/* <Col xl={3} lg={3} md={6} sm={6} xs={6}><i className="mr-2 fas fa-eye text-primary"></i>Total Views : <strong>{singleData.total_views}</strong> </Col>
                    
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}><i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks : <strong>{singleData.bookmark_count}</strong></Col>

                    <Col xl={3} lg={3} md={6} sm={6} xs={6}><i className="mr-2 fas fa-star text-primary"></i>Total Stared : <strong>{singleData.star_count}</strong></Col> */}
                            </Row>
                        </Card>

                    </Col>
                    <div as={Col} xl={12} lg={12} md={12} className="bg-white pagination border-top py-3 px-3 d-flex justify-content-end fixed-bottom">
                        {this.state.index > 0 ? (<Button variant="outline-primary mr-3" style={{ width: 120 }} onClick={(e) => this.previousQuestion()}>Previous</Button>) : ("")}
                        {this.state.index <
                            parseFloat(this.state.getStudentRevisionMaterial.length) - 1 ? (
                                <React.Fragment>
                                    {this.state.loader == 1 ? (<Button variant="outline-primary" style={{ width: 120 }} disabled><span className="spinner-border spinner-border-sm"></span>
                                        loading..</Button>) : (
                                            <Button variant="outline-primary" style={{ width: 120 }} onClick={(e) => this.nextQuestion()}>Next</Button>
                                        )}

                                </React.Fragment>

                            ) : ("")}

                    </div>
                </Row>
                <SingleNoteModal
                    // showFunction={this.showFunction}
                    // studentGlobals={this.props.studentGlobals}
                    // noteshandleFormSubmit={this.noteshandleFormSubmit}
                    // handleEditorChange={this.handleEditorChange}
                    // handleMutipleInputChange={this.handleMutipleInputChange}
                    // handleInputChange={this.handleInputChange}
                    // removecontypId={this.state.stateData.contentType}
                    // custonid={this.state.getStudentRevisionMaterial[this.state.index].id}
                    // stateData={this.state}
                    // show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} 

                    studentGlobals={this.props.studentGlobals}
          noteshandleFormSubmit={this.noteshandleFormSubmit}
          removecontypId={this.state.stateData.contentType}
          custonid={this.state.getStudentRevisionMaterial[this.state.index].id}
          stateData={this.state}
          show={this.state.modalShow} 
          onHide={this.notonHide}
                    />


                <SingleBookModal
                    studentGlobals={this.props.studentGlobals}
                    bookhandleFormSubmit={this.bookhandleFormSubmit}
                    handleMutipleInputChange={this.handleMutipleInputChange}
                    handleInputChange={this.handleInputChange}
                    removecontypId={this.state.stateData.contentType}
                    custonid={this.state.getStudentRevisionMaterial[this.state.index].id}
                    stateData={this.state}
                    show={this.state.modalShowb}
                    onHide={() => this.setState({ modalShowb: false })} />
            </section>
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
    )(SingleCustomRevisionMaterialSection)
));
