import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import './_home.scss';
import ErrorSkippedModal from "./ErrorSkippedModal";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";

const GET_ERRORSKIPPED = gql`
 query($params: DashboardInput) {
    getErrorSkippedData(params: $params) {
        id
        question
        error_count
        skipped_count
        subject
        chapter
        subject_name
        chapter_name
        }
        }
`;

class ErrorSkippedModalSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            modalType: "",
            subject: "0",
            subjectValue: { value: "0", label: "All Subjects" },
            chapter: "0",
            chapterValue: { value: "0", label: "All Chapters" }
        }
    }
    modalShowFun = (type) => {
        console.log("modalShowFun");
        this.setState({
            modalType: type,
            modalShow: true,
            subject: "0",
            subjectValue: { value: "0", label: "All Subjects" },
            chapter: "0",
            chapterValue: { value: "0", label: "All Chapters" }
        });

    }
    onhide = () => {
        this.setState({
            modalShow: false,
            subject: "0",
            subjectValue: { value: "0", label: "All Subjects" },
            chapter: "0",
            chapterValue: { value: "0", label: "All Chapters" }
        });

    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue, this.props);
        const name = ename;
        const value = evalue;
        if (name == "subject") {
            if (value != "0") {
                const singlesubject = this.props.globals.globals.subjects.find((a) => a.id == value);
                this.setState({
                    subjectValue: {
                        value: singlesubject.id,
                        label: singlesubject.subject
                    },
                    chapter: "0",
                    chapterValue: { value: "0", label: "All Chapters" }
                });
            } else {
                this.setState({
                    subjectValue: {
                        value: "0",
                        label: "All Subjects"
                    },
                    chapter: "0",
                    chapterValue: { value: "0", label: "All Chapters" }
                });
            }

        }
        else if (name == "chapter") {
            if (value != "0") {
                const singlesubject = this.props.globals.globals.subjects.find((a) => a.id == this.state.subject);

                let singlechapter = "";
                if (singlesubject != undefined) {
                    singlechapter = singlesubject.chapters.find((a) => a.id == value);
                }
                else {
                    let newArray = [];
                    this.props.globals.globals.subjects.map((item) => {
                        newArray.push(...item.chapters);
                    });
                    console.log("newArray", newArray);
                    singlechapter = newArray.find((a) => a.id == value);
                }

                console.log("singlechapter", singlechapter);
                this.setState({
                    chapterValue: {
                        value: singlechapter.id,
                        label: singlechapter.chapter
                    }
                });
            } else {
                this.setState({
                    chapterValue: {
                        value: "0",
                        label: "All Chapters"
                    }
                });
            }

        }
        this.setState({ [name]: value });
    }
    subjectfunction() {
        console.log("subjectfunction", this.props);
        let getsingleexam = this.props.globals.globals.exams.find((a) => a.id == this.props.eexamptype);
        let getarray = [];
        this.props.globals.globals.subjects.map((item) => {
            let filterData = getsingleexam.exam_subjects.filter((a) => a.subject_id == item.id)
            if (filterData.length > 0) {
                const newObj = {
                    value: item.id,
                    label: item.subject
                }
                getarray.push(newObj);
            }
        })
        if (getarray.length > 0) {
            const newObj1 = {
                value: "0",
                label: "All Subjects"
            }
            getarray.unshift(newObj1);
        }
        return getarray;

    }
    chapterfunction() {
        console.log("chapterfunction", this.props);
        let getsingleexam = this.props.globals.globals.exams.find((a) => a.id == this.props.eexamptype);
        let getarray = [];
        let uniquea = [];
        if (this.state.subject != 0) {


            this.props.globals.globals.subjects.map((item) => {
                let filterData = getsingleexam.exam_subjects.filter((a) => a.subject_id == item.id)
                if (filterData.length > 0) {
                    if (this.state.subject != 0) {
                        if (this.state.subject == item.id) {

                            item.chapters.map((ch) => {
                                this.props.getErrorSkippedData.map((data) => {

                                    if (data.chapter.split(",").includes(ch.id.toString())) {
                                        console.log("datadata", data);

                                        if (this.state.modalType == "error") {
                                            console.log("this.state.modalType", this.state.subject, this.state.modalType, data.chapter, ch.id);
                                            if (data.error_count > 0) {
                                                const newObj = {
                                                    value: ch.id,
                                                    label: ch.chapter
                                                }
                                                getarray.push(newObj);
                                            }
                                        }
                                        if (this.state.modalType == "skipped") {
                                            if (data.skipped_count > 0) {
                                                const newObj = {
                                                    value: ch.id,
                                                    label: ch.chapter
                                                }
                                                getarray.push(newObj);
                                            }
                                        }
                                        if (this.state.modalType == "errorskipped") {
                                            const sum = parseInt(data.error_count) + parseInt(data.skipped_count);
                                            if (sum > 0) {
                                                const newObj = {
                                                    value: ch.id,
                                                    label: ch.chapter
                                                }
                                                getarray.push(newObj);

                                            }
                                        }

                                    }

                                });
                            })
                        }

                    }
                    // else {
                    //     item.chapters.map((ch) => {
                    //         getErrorSkippedData.getErrorSkippedData.map((data)=>{
                    //             if(data.chapter.split(",").includes(ch.id.toString())){
                    //                 const newObj = {
                    //                             value: ch.id,
                    //                             label: ch.chapter
                    //                         }
                    //                         getarray.push(newObj);
                    //             }

                    //         });
                    //      })
                    // }


                }
            })
            let jsonObject = getarray.map(JSON.stringify);

            let uniqueSet = new Set(jsonObject);
            let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            console.log("uniqueArray", uniqueArray);
            uniquea = uniqueArray;
            if (uniquea.length > 0) {
                const newObj1 = {
                    value: "0",
                    label: "All Chapters"
                }
                uniquea.unshift(newObj1);
            }
        }
        return uniquea;
    }
    render() {
        const globals = this.props.globals;
        const loading1 = globals.loading;
        const error1 = globals.error;

        const getErrorSkippedData = this.props.getErrorSkippedData;
        const loading3 = getErrorSkippedData.loading;
        const error3 = getErrorSkippedData.error;

        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }

        //if (loading1) return null;
        if (error1 !== undefined) {
            return null;

        }
        

        if (loading1 || loading3) {
            return(
                <Row className="question-type">
                <Col xl={12} lg={12} md={12} sm={12} className="my-2">
                    <Card className="single-block h-100 flex-row justify-content-between align-items-center p-3">
                    <Card as={Card.Body} className="justify-content-center flex-row">
                                <div class="spinner-border text-primary text-center"></div>
                            </Card>
                    </Card>
                </Col>
            </Row>
            )
            

        }
        else{
            let subfilter = getErrorSkippedData.getErrorSkippedData;
        if (this.state.subject != "0") {
            subfilter = getErrorSkippedData.getErrorSkippedData.filter((a) => {
                console.log("ayti", a);
                if (a.subject == this.state.subject) {
                    if (this.state.chapter != "0") {
                        if (a.chapter.split(",").includes(this.state.chapter)) {
                            console.log("a1", a);
                            return { ...a }
                        }
                    }
                    else if (this.state.chapter == "0") {
                        console.log("a2", a);
                        return { ...a }
                    }
                    else {
                        return null
                    }
                }
            });
        }
        else {
            subfilter = getErrorSkippedData.getErrorSkippedData.filter((a) => {
                console.log("ayti567", a, this.state.chapter);
                if (this.state.chapter != "0") {
                    if (a.chapter.split(",").includes(this.state.chapter)) {
                        console.log("a3", a);
                        return { ...a }
                    }
                }
                else if (this.state.chapter == "0") {
                    console.log("a4", a);
                    return { ...a }
                }
                else {
                    return null
                }


            });
        }
        return (
            <React.Fragment>
                <Row className="question-type">
                    <Col xl={4} lg={4} md={6} sm={12} className="my-2">
                        <Card className="single-block h-100 flex-row justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <a> <i onClick={(e) => this.modalShowFun("skipped")} className="fal fa-plus-square mr-3" /></a>

                                <h6 className="mb-0">Skipped Questions</h6>
                            </div>
                            <h6 className="mb-0">{this.props.dashBoardData.skipped_questions}%</h6>
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} className="my-2">
                        <Card className="single-block h-100 flex-row justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <a> <i onClick={(e) => this.modalShowFun("error")} className="fal fa-plus-square mr-3" /></a>
                                <h6 className="mb-0">Error Questions</h6>
                            </div>
                            <h6 className="mb-0">{this.props.dashBoardData.error_questions}%</h6>
                        </Card>
                    </Col>
                    <Col xl={4} lg={4} md={6} sm={12} className="my-2">
                        <Card className="single-block h-100 flex-row justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <a><i onClick={(e) => this.modalShowFun("errorskipped")} className="fal fa-plus-square mr-3" /></a>
                                <h6 className="mb-0">Most Error and Skipped Questions</h6>
                            </div>
                            <h6 className="mb-0">{this.props.dashBoardData.most_error_questions}%</h6>
                        </Card>
                    </Col>
                </Row>
                <ErrorSkippedModal
                    selecthandleInputChange={this.selecthandleInputChange}
                    subjectfunction={this.subjectfunction()}
                    chapterfunction={this.chapterfunction()}
                    geterrorskippeddata={subfilter}
                    data={this.state.modalType}
                    show={this.state.modalShow}
                    onHide={this.onhide}
                    stateData={this.state}

                />
            </React.Fragment>
        );
    }



    }
}



export default withRouter(
    compose(
        graphql(
            gql`
 query($institution_id: Int!,$userName: String) {
          globals(institution_id: $institution_id,userName: $userName) {
            exams{
                id
                exam
                exam_subjects{
                  subject_id
                }
            }
            subjects{
              id
              subject
              chapters{
                id
                chapter
              }
            }
            
          }
        }
`,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid")),
                        userName: Cookies.get("username")
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "globals"
            }
        ),
        graphql(
            GET_ERRORSKIPPED,
            {
                options: props => ({
                    variables: {
                        params: {
                            exam_id: parseInt(props.stateData.eexamptype),
                            test: props.stateData.etesttype.toString(),
                            test_names: props.stateData.etestname,
                            class_ids: props.stateData.eclass.toString(),
                            category_ids: props.stateData.ecategory.toString(),
                            location_levels: props.stateData.elocation.toString(),
                            region_ids: props.stateData.eregion.toString(),
                            clusters: props.stateData.ecluster.toString(),
                            branch_ids: props.stateData.ebranch.toString(),
                            section_ids: props.stateData.esection,
                            start_time: props.stateData.startDate,
                            end_time: props.stateData.endDate,
                            institution_id: parseInt(Cookies.get("institutionid")),
                            username: Cookies.get("username")
                        }
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "getErrorSkippedData"
            }
        )
    )(ErrorSkippedModalSection)
);
