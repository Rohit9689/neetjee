import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Container, Row, Col, Card, Form, Popover, Tab, OverlayTrigger, Button, } from 'react-bootstrap'
import { BookmarkShortNoteList } from './BookmarkShortnoteMaterialData';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import parse, { domToReact } from 'html-react-parser';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import SingleNoteModal from "../../learn_practice/revision_materials/SingleNoteModal";

const REMOVE_BOOKMARKS = gql`
  mutation(
    $params:AddBookmark  
    ) {
        removeBookmark(
        params: $params
     )
  }
`;
const TOTAL_VIEWS = gql`
  mutation($params: StudentContentViewInput) {
    updateStudentContentViews(params: $params)
  }
`;
const ADD_NOTES = gql`
  mutation($params: AddNotes) {
    addNotes(params: $params)
  }
`;
class BookmarkSingleShortNoteMaterialRevisionsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            funData: props.getData.funData,
            index: props.getData.index,

            modalShow: false,
            ncomments: props.getData.getData.comments,
            ntags: props.getData.getData.tags,
            ntagsvalue: [],
            nnewtag: "",
            submitError2: "",
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
        this.popoverHide = React.createRef();
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
                let findData = this.props.studentGlobals.tags.find((a) => a.id == aa);
                if (findData != undefined) {
                    if(findData.type=="notes"){
                        const newObj = {
                            value: findData.id,
                            label: findData.tag
                        }
                        ntags.push(findData.id);
                        ntagsvalue.push(newObj);
                    }
                    
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
                
                const addNotes = data.addNotes.toString();
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
                    console.log("gbeforewrite", this.props);
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
                        //console.log("sree", this.props.getData.funData[this.state.index].id);
                        return { ...item, comments: params.comments, tags: notetag.toString() }
                    }
                    else {
                        return { ...item }
                    }

                });
                this.props.getData.funData = emptyMaterial
                console.log("emptyMaterial", emptyMaterial);
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

                    let filterId = this.state.funData[this.state.index];
                    console.log("filterId", filterId);
                    const funData = this.state.funData.filter((a) => a.id != filterId.id);
                    console.log("funData", funData);
                    if(funData.length==0){
                        this.props.history.push({
                            pathname: "/student/bookmark/shortnotes-and-materials",
                            state: {
                                tagid: this.props.getData.tagid,
                                subjectid: this.props.getData.subjectid
                            }
                        })
                    }
                    else{
                        this.setState({
                            funData: funData,
    
                        });
                    }

                    
                }
            }
        });
    };
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
                index: index,
                ntags: array.tags,
                ncomments: array.comments,
                ntagsvalue: ntagsvalue,
            }, () => this.totalviewhandleFormSubmit());
        }
    }
    nextFunction = (indexid) => {
        let index = parseFloat(indexid) + 1;
        let array = this.props.getData.funData[index];
        let ntagsvalue = [];
        let narray = array.tags.split(",");
        console.log("narray", narray);
        narray.map((aa) => {
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
                index: index,
                ntags: array.tags,
                ncomments: array.comments,
                ntagsvalue: ntagsvalue,
            }, () => this.totalviewhandleFormSubmit());
        }
    }
    //total views start
    totalviewhandleFormSubmit = (e) => {
        console.log("totalviewhandleFormSubmit", this.state.funData[this.state.index].id);
        const params = {
            mobile: Cookies.get("mobile"),
            content_type: parseInt(this.props.getData.removecontypId),
            custom_content_id: parseInt(this.state.funData[this.state.index].id),
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
                console.log("updateStudentContentViews", data.updateStudentContentViews);
                if (data.updateStudentContentViews) {
                    const emptyMaterial = this.state.funData.map((item) => {
                        if (this.state.funData[this.state.index].id == item.id) {
                            console.log("fix", this.state.funData[this.state.index].total_views, this.state.funData[this.state.index].your_views);
                            let total_views = parseInt(this.state.funData[this.state.index].total_views) + 1;
                            let your_views = parseInt(this.state.funData[this.state.index].your_views) + 1;
                            console.log("lfix", total_views, your_views);
                            return { ...item, total_views: total_views, your_views: your_views }
                        }
                        else {
                            return { ...item }
                        }

                    });
                    this.props.stateData.views = "1"
                    this.setState({
                        funData: emptyMaterial
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
        console.log("def", this.props.getData);
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

       const { id, title, description } = BookmarkShortNoteList[0];

        return (
            <div className="bookmark_shortNote_materials pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Container>
                    <div className="section-description mb-4">
                        <div className="breadcrumb-content d-md-flex justify-content-between align-items-center">
                            <h5 className="mb-0 pl-3 pt-3">{this.props.getData.type == "short" ? ("Shortnotes") : ("Revision Material")}</h5>
                            <Link
                                to={{
                                    pathname: "/student/bookmark/shortnotes-and-materials",
                                    state: {
                                        tagid: this.props.getData.tagid,
                                        subjectid: this.props.getData.subjectid,
                                        defaultActiveKey: this.props.getData.defaultActiveKey

                                    }
                                }}
                                className="btn btn-link text-dark"
                            ><i className="fal fa-long-arrow-alt-left" /> Back</Link>
                        </div>
                    </div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/* <ul className="shortnote_cards list-unstyled">
                                    <li className="single_shortnote_list"> */}
                                <Card key={this.state.funData[this.state.index].id} className="single_card fullView">
                                    <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                        <div>
                                            <Card.Title className="h6 mb-0">{this.state.funData[this.state.index].title}</Card.Title>
                                            <ul className="sr-tags-list list-inline mt-2">
                                                {this.state.funData[this.state.index].tags.split(",").map((getData) => {
                                                    console.log("stname", this.props.studentGlobals.tags, getData);
                                                    let tname = this.props.studentGlobals.tags.find(a => a.id == getData && a.type == "bookmark");
                                                    
                                                    if (tname != undefined) {
                                                        return (
                                                            <li className="list-inline-item">

                                                                {tname.tag}
                                                                

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
                                            <li className="list-inline-item">
                                                <i style={{ cursor: "pointer" }} title="Remove Bookmark" className="fas fa-bookmark text-success" onClick={(e) => this.removebookhandleFormSubmit(this.props.getData.removecontypId, this.state.funData[this.state.index].id)} />
                                            </li>
                                        </ul>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>{parse(this.state.funData[this.state.index].description)}</Card.Text>
                                    </Card.Body>
                                    
                                </Card>
                                <Card as={Card.Body} className="shadow-sm mb-2">
                            <Row ref={this.scrollNotes}>
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
                        </Card>
                                <Card as={Card.Body} className="shadow-sm mb-2">
                                    <Row>
                                    <Col xl={4} lg={4} md={6} sm={6} xs={6}><i className="mr-2 fas fa-eye text-success"></i>My views : <strong>{this.state.funData[this.state.index].your_views}</strong> </Col>
                                        {/* <Col xl={4} lg={4} md={6} sm={6} xs={6}><i className="mr-2 fas fa-eye text-primary"></i>Total Views : <strong>{this.state.funData[this.state.index].total_views}</strong> </Col>
                                        
                                        <Col xl={4} lg={4} md={6} sm={6} xs={6}><i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks : <strong>{this.state.funData[this.state.index].bookmark_count}</strong></Col> */}

                                        

                                    </Row>
                                </Card>
                                {this.state.funData.length>1?(
                                    <Card>
                                    <div className="pagination p-2 d-flex justify-content-between align-items-center">
                                        {this.state.index > 0 ? (
                                            <Button variant="outline-primary"
                                                onClick={(e) => this.previousFunction(this.state.index)}>Previous</Button>
                                        ) : ("")}
                                        {this.state.index < parseFloat(this.state.funData.length) - 1 ? (
                                            <Button variant="outline-primary" onClick={(e) => this.nextFunction(this.state.index)}>Next</Button>
                                        ) : ("")}
                                    </div>
                                </Card>
                                ):("")}
                                

                                {/* </li>
                                </ul> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h6>Hello B</h6>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
                {/* note modal */}
                <SingleNoteModal
                    modaltype="notes"
                    studentGlobals={this.props.studentGlobals}
                    noteshandleFormSubmit={this.noteshandleFormSubmit}
                    removecontypId={this.props.getData.removecontypId}
                    custonid={this.state.funData[this.state.index].id}
                    stateData={this.state}
                    show={this.state.modalShow}
                    onHide={this.notonHide}
                />

                
            </div>
        )
    }
}


export default withRouter(
    compose(graphql(REMOVE_BOOKMARKS, {
        name: "removebookmark"
    }), graphql(TOTAL_VIEWS, {
        name: "totalviews",
    }),
    graphql(ADD_NOTES, {
        name: "addnotes",
    })
    )(BookmarkSingleShortNoteMaterialRevisionsSection));
