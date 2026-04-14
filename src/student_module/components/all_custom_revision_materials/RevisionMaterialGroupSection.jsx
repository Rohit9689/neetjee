import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { CustomRevisionMaterialData } from './CustomRevisionMaterialData';
import './_custom_revision_materials.scss';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
import { MultiSelect } from "react-multi-select-component";
import moment from 'moment';
import StickyHelp from '../navbars/StickyHelp';
import UserRestrictionAlert from '../home/UserRestrictionAlert';
class RevisionMaterialGroupSection extends Component {

    constructor(props) {
        super(props);
        const Data = props.getStudentMaterialCount.subjects_counts.map((item) => {
            let multichapter = [];
            let multichaptervalue = [];
            item.material_chapters.map((citem) => {
                multichapter.push(citem.id);
                multichaptervalue.push({
                    value: citem.id,
                    label: citem.chapter,
                    checked: true
                });
            });
            return { id: item.id, subject: item.subject, checked: true, multichapter: multichapter, multichaptervalue: multichaptervalue }

        });

        const chapterMaterialCounts = props.getStudentMaterialCount.material_counts.map((item) => {
            return { ...item, checked: false }
        });
        this.state = {
            userRestionModalShow: false,
            multichecked: false,
            multiDropdowns: Data,
            chapterMaterialCounts: chapterMaterialCounts,
            headerBottomImg: {
                helpImgAlt: 'revisionmaterial-help-img',
                title: "Revision Material"
            }

        };

    }
    contentIcon = (id) => {

        const chapterMaterialCounts3 = this.state.chapterMaterialCounts.map((item) => {

            if (item.id == id) {
                if (item.checked == true) {
                    return { ...item, checked: false }
                }
                else {
                    return { ...item, checked: true }
                }
            }
            else {
                return { ...item }
            }


        });
        this.setState({
            chapterMaterialCounts: chapterMaterialCounts3
        })


    }
    handleChange = (e) => {
        if (e.target.checked == true) {
            this.setState({
                multichecked: true
            })
        }
        else {
            this.setState({
                multichecked: false
            })
        }


    }
    materialClass(mname) {
        let cname = "";
        if (mname == "Formula") {
            cname = "single-card formula"
        }
        else if (mname == "Reactions") {
            cname = "single-card reactions"
        }
        else if (mname == "Numericals") {
            cname = "single-card numericals"
        }
        else if (mname == "Constants") {
            cname = "single-card constants"
        }
        else if (mname == "Exceptions") {
            cname = "single-card exceptions"
        }
        else if (mname == "Diagrams") {
            cname = "single-card diagrams"
        }
        else if (mname == "File Upload") {
            cname = "single-card formula"
        }
        else if (mname == "Shapes") {
            cname = "single-card shapes"
        }
        else if (mname == "Chemical Composition") {
            cname = "single-card chemicalcomposition"
        }
        else if (mname == "Named Reactions") {
            cname = "single-card namedreactions"
        }
        else if (mname == "Reactions Mechanisms") {
            cname = "single-card reactionsmechanisms"
        }
        else if (mname == "Abbrevation") {
            cname = "single-card abbreviation"
        }
        else if (mname == "Important Points") {
            cname = "single-card importantpoints"
        }
        else if (mname == "Properties") {
            cname = "single-card properties"
        }
        else if (mname == "Scientist") {
            cname = "single-card scientiest"
        }
        else if (mname == "Examples") {
            cname = "single-card examples"
        }
        else if (mname == "Tips & Shortcuts") {
            cname = "single-card tipsshortcuts"
        }
        else if (mname == "Formula Derivation") {
            cname = "single-card formuladerviation"
        }
        else if (mname == "Graphs") {
            cname = "single-card graph"
        }
        else if (mname == "Definition") {
            cname = "single-card definition"
        }
        else if (mname == "Differences") {
            cname = "single-card differences"
        }
        else if (mname == "Experiment") {
            cname = "single-card experiment"
        }
        else {
            cname = "single-card formula"
        }
        return cname;

    }
    handleMultipleSelectInputChange = (e, data, index) => {

        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }

        let chlength = globalsubjects.find((a) => a.id == data.id);


        let multichapter = Array();
        let multichaptervalue = Array();

        if (e != null) {
            if (e.length == 0) {
                const modifiedData = this.state.multiDropdowns.map((item) => {
                    if (item.id == data.id) {
                        return { ...item, checked: true, multichapter: multichapter, multichaptervalue: multichaptervalue }
                    }
                    else {
                        return { ...item }
                    }

                });
                this.setState({
                    multiDropdowns: modifiedData
                });
            }
            else {
                for (let i = 0; i < e.length; i++) {
                    const multichapterval = e[i];
                    console.log("multichapterval.checked", multichapterval.checked);
                    if (multichapterval.checked == false) {
                        if (chlength.studentChapters.length != e.length) {
                            this.setState({
                                userRestionModalShow: true
                            })
                        }

                    }
                    else {


                        const newObj = {
                            label: multichapterval.label,
                            value: multichapterval.value,
                            checked: multichapterval.checked
                        }
                        multichaptervalue.push(newObj);
                        multichapter.push(multichapterval.value);

                        const modifiedData = this.state.multiDropdowns.map((item) => {
                            if (item.id == data.id) {
                                return { ...item, checked: true, multichapter: multichapter, multichaptervalue: multichaptervalue }
                            }
                            else {
                                return { ...item }
                            }

                        });
                        this.setState({
                            multiDropdowns: modifiedData
                        });

                    }


                }
            }


        }
    };
    multiChapteroptions(data) {
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        let singleSubject = globalsubjects.find((a) => a.id == data);


        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);

        let multichapterArray = [];
        singleSubject.studentChapters.map((map) => {

            if ((map.enabled == true && moduleValid.revision_material_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(map.id.toString())) {
                console.log("rvmate", isStudentUserValid.chapter_ids.split(","), map.id, map.enabled);
                const newObj1 = {
                    value: map.id,
                    label: map.chapter,
                    checked: true
                }
                multichapterArray.push(newObj1);
            }
            else {
                if (this.props.stateData.type != "default") {
                    const newObj = {
                        value: map.id,
                        label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {map.chapter}</p>,
                        checked: false
                    }
                    multichapterArray.push(newObj);
                }

            }

        })
        let combained = [];
        combained = multichapterArray.filter((a) => a.checked == true);
        combained.push(...multichapterArray.filter((a) => a.checked == false));
        multichapterArray = combained;

        return multichapterArray;
    }
    render() {

        let emptyData = this.state.chapterMaterialCounts.map((item) => {
            return { ...item, count: 0 }
        });

        this.props.getStudentMaterialCount.subjects_counts.map((subcount) => {
            let filterData = this.state.multiDropdowns.find((aa) => aa.id == subcount.id);
            if (filterData.multichapter.length > 0) {

                subcount.material_chapters.map((item) => {
                    let chapterfilter = filterData.multichapter.find((a) => a == item.id);
                    if (chapterfilter != undefined) {

                        emptyData = emptyData.map((item2) => {
                            let filterData = item.content_counts.find((a) => a.id == item2.id);
                            if (filterData != undefined) {
                                let dcount = parseInt(item2.count) + parseInt(filterData.count)
                                return { ...item2, count: parseInt(dcount) }
                            }
                            else {
                                return { ...item2 }

                            }

                        });
                    }

                });
            }
        });
        let chapterMaterialCounts2 = emptyData.sort((a, b) => {
            return b.count - a.count
        })

        let normalView = this.props.getStudentMaterialCount.material_counts.sort((a, b) => {
            return b.count - a.count

        })
        let ntotal = 0;
        this.props.getStudentMaterialCount.material_counts.map((a) => {
            ntotal = parseInt(a.count) + parseInt(ntotal);
        })
        let nextLength = this.state.chapterMaterialCounts.filter((a) => a.checked == true);
        let trailRestriction = this.state.multiDropdowns.find((a) => a.id == "2");
        let currentTime = moment().unix();
        return (
            <section className="revision-materials-section">
                <div className="position-absolute" style={{ right: 0, top: 0 }}>
                    <Image src={require('../../../images/revision-material-bg-shape.svg')} alt="revision-material-bg-shape" />
                </div>
                <Container>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h1 style={{fontSize:"1.75rem"}}className="section-title font-weight-bold">Revision <span className="font-weight-normal">Material</span></h1>
                            <p className="text-muted">Select Multiple Material Types and Start Learning</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <li className="btn btn-light list-inline-item rounded-pill shadow-sm">#Total - <strong>{ntotal}</strong></li>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={12} sm={12}>
                            <div className="d-lg-flex justify-content-between align-items-start my-2">
                                {
                                    !this.state.multichecked ?
                                        (
                                            <React.Fragment>
                                                <div>
                                                    <div>
                                                        <ul className="list-inline mb-2 p-0">
                                                            {this.props.getStudentMaterialCount.subjects_counts.map((subcount) => {
                                                                return (<li className="btn btn-light list-inline-item rounded-pill shadow-sm my-1">#{subcount.subject} - <strong>{subcount.count}</strong></li>);

                                                            })}


                                                        </ul>
                                                    </div>
                                                    {this.props.stateData.type != "default" ? (
                                                        <React.Fragment>
                                                            {(this.props.isStudentUserValid.isTrialUser == true && trailRestriction.multichapter.length < 20) || (currentTime > this.props.isStudentUserValid.expiry_date && trailRestriction.multichapter.length < 20) ? (
                                                                <div style={{ color: "#f81201" }}>
                                                                    {Cookies.get("student_userlevel") == "1" ? (
                                                                        <small>*Note: Dear Student, Now you have limited Access.</small>
                                                                    ) : (
                                                                        <small>*Note: To access full syllabus <span style={{ color: "#f81201", fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                                    )}

                                                                </div>
                                                            ) : ("")}
                                                        </React.Fragment>

                                                    ) : ("")}

                                                </div>


                                            </React.Fragment>)
                                        :
                                        (
                                            <Form>
                                                <Row>
                                                    {this.state.multiDropdowns.map((item, index) => {
                                                        return (
                                                            <Form.Group as={Col} controlId="formGridMaths">
                                                                <Form.Label className="font-weight-bold">{item.subject} ({item.multichaptervalue.length} Chapters)</Form.Label>
                                                                <div className="first mr-3" style={{ width: 250 }}>
                                                                    <MultiSelect
                                                                        overrideStrings={{
                                                                            "allItemsAreSelected": "All Chapters are selected.",
                                                                        }
                                                                        }
                                                                        options={this.multiChapteroptions(item.id)}
                                                                        value={item.multichaptervalue}
                                                                        onChange={(e) => this.handleMultipleSelectInputChange(e, item, index)}
                                                                        labelledBy={"Select"}
                                                                    />
                                                                </div>

                                                            </Form.Group>
                                                        );

                                                    })}
                                                </Row>
                                                {this.props.stateData.type != "default" ? (
                                                    <React.Fragment>
                                                        {(this.props.isStudentUserValid.isTrialUser == true && trailRestriction.multichapter.length < 20) || (currentTime > this.props.isStudentUserValid.expiry_date && trailRestriction.multichapter.length < 20) ? (<div style={{ color: "#f81201" }}>
                                                            {Cookies.get("student_userlevel") == "1" ? (
                                                                <small>*Note: Dear Student, Now you have limited Access.</small>
                                                            ) : (
                                                                <small>*Note: To access full syllabus <span style={{ color: "#f81201", fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                            )}

                                                        </div>) : ("")}
                                                    </React.Fragment>
                                                ) : ("")}

                                            </Form>
                                        )
                                }

                                <div className="custom-btn">
                                    <div className="rounded-pill btn btn-outline-primary px-3 py-2 mb-2">
                                        <Form.Check type="checkbox" className="form-check-inline" id="selectOptionsFilter" custom>
                                            <Form.Check.Input type="checkbox" checked={this.state.multichecked} onChange={this.handleChange} />
                                            <Form.Check.Label className="font-weight-bold" htmlFor="selectOptionsFilter">Select </Form.Check.Label>
                                        </Form.Check>
                                    </div>

                                    <div className="next-btn">
                                        {nextLength.length > 0 ? (<Link to={{
                                            pathname: this.props.stateData.type != "default" ? "/student/revision-material-groups/custom-revision-materials" : "/student/revision-material-groups/default-custom-revision-materials",
                                            state: {
                                                multiStateData: this.state
                                            }
                                        }} className="btn-lightblue rounded-pill d-block text-decoration-none">Next</Link>) : ("")}
                                    </div>
                                </div>
                            </div>
                            <div className="revision-material-cards mt-5">
                                {
                                    !this.state.multichecked ?
                                        (
                                            <Row>
                                                {
                                                    normalView.map((mcount) => {
                                                        if (mcount.count > 0) {
                                                            return (
                                                                <Col xl={3} lg={4} md={4} sm={6} xs={6} key={mcount.id}
                                                                    className={this.materialClass(mcount.customcontent)}
                                                                >
                                                                    <Card as={Link}
                                                                        to={{
                                                                            pathname: this.props.stateData.type != "default" ? "/student/revision-material-groups/custom-revision-materials" : "/student/revision-material-groups/default-custom-revision-materials",
                                                                            state: {
                                                                                multiStateData: this.state,
                                                                                content_type: mcount.id

                                                                            }
                                                                        }}
                                                                        className="stretched-link text-decoration-none">
                                                                        <Card.Body className="d-flex flex-row align-items-center">
                                                                            <div className="icon"><Image src={mcount.image} alt="material-img" width="40" /></div>
                                                                            <div className="content ml-3">
                                                                                <h6 className="mb-0 title">{mcount.customcontent}</h6>
                                                                                <h3 className="mb-0 count">{mcount.count}</h3>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Col>
                                                            )
                                                        }

                                                    })
                                                }
                                            </Row>
                                        )
                                        :
                                        (
                                            <React.Fragment>
                                                <Row>
                                                    {
                                                        chapterMaterialCounts2.map((findMaterial) => {
                                                            if (findMaterial.count > 0) {
                                                                return (
                                                                    <Col xl={3} lg={4} md={4} sm={6} xs={6} key={findMaterial.id} className={this.materialClass(findMaterial.customcontent)}>
                                                                        <Card onClick={() => this.contentIcon(findMaterial.id)}>
                                                                            <Card.Body className="d-flex flex-row align-items-center">
                                                                                {findMaterial.checked == true ? (<i

                                                                                    className="position-absolute fal fa-check-circle text-white" style={{ right: 10, top: 10 }} />) : (<i

                                                                                        className="position-absolute fal fa-circle text-white" style={{ right: 10, top: 10 }} />)}

                                                                                <div className="icon">
                                                                                    <Image src={findMaterial.image} alt="material-img" width="40" /></div>
                                                                                <div className="content ml-3">
                                                                                    <h6 className="mb-0 title">{findMaterial.customcontent}</h6>
                                                                                    <h3 className="mb-0 count">{findMaterial.count}</h3>
                                                                                </div>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </Row>
                                            </React.Fragment>
                                        )
                                }

                            </div>
                        </Col>
                    </Row>
                </Container>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </section>
        )
    }
}

export default withRouter((RevisionMaterialGroupSection));
