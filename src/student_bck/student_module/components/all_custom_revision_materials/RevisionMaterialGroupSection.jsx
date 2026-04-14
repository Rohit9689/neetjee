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
        // const Data = props.globalsubjects.map((item) => {
        //     let multichapter = [];
        //     let multichaptervalue = [];
        //     item.studentChapters.map((citem) => {
        //         if (citem.enabled == true) {
        //             multichapter.push(citem.id);
        //             multichaptervalue.push({
        //                 value: citem.id,
        //                 label: citem.chapter,
        //                 checked:true
        //             });
        //         }
        //         else {
                    
        //             multichaptervalue.push({
        //                 value: citem.id,
        //                 label: citem.chapter,
        //                 checked:false
        //             });
        //         }

        //     });
        //     return { id: item.id, subject: item.subject, checked: true, multichapter: multichapter, multichaptervalue: multichaptervalue }
        // })

        const Data = props.getStudentMaterialCount.subjects_counts.map((item) => {
            let multichapter = [];
            let multichaptervalue = [];
            item.material_chapters.map((citem) => {
                multichapter.push(citem.id);
                multichaptervalue.push({
                    value: citem.id,
                    label: citem.chapter,
                    checked:true
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

        let chlength=globalsubjects.find((a)=>a.id == data.id);

        console.log("handleMultipleSelectInputChange",chlength.studentChapters.length,e.length, e, data);
        let multichapter = Array();
        let multichaptervalue = Array();
        
        if (e != null) {
            for (let i = 0; i < e.length; i++) {
                const multichapterval = e[i];
                console.log("multichapterval.checked", multichapterval.checked);
                if (multichapterval.checked == false) {
                    if(chlength.studentChapters.length!=e.length){
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


        //  // console.log("modifiedData", modifiedData);




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
        console.log("singleSubject", singleSubject);
        let multichapterArray = [];
        singleSubject.studentChapters.map((map) => {
            console.log("map.enabled", map.enabled)
            if (map.enabled == false) {
                const newObj = {
                    value: map.id,
                    label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {map.chapter}</p>,
                    //disabled: true,
                    checked: false
                }
                multichapterArray.push(newObj);
            }
            else if (map.enabled == true) {
                const newObj1 = {
                    value: map.id,
                    label: map.chapter,
                    //disabled: false
                    checked: true
                }
                multichapterArray.push(newObj1);
            }

        })
        // let multichapterArray = [];
        // this.props.getStudentMaterialCount.subjects_counts.map((item) => {

        //     if (item.id == data) {
        //         item.material_chapters.map((chmap) => {
        //             const newObj = {
        //                 value: chmap.id,
        //                 label: <p><Image src={require('../../../../images/locked.png')} width="20" alt="Lock" /> {chmap.chapter}</p> ,
        //             }
        //             multichapterArray.push(newObj);
        //         });

        //     }



        // })
        return multichapterArray;
    }
    render() {

        let emptyData = this.state.chapterMaterialCounts.map((item) => {
            return { ...item, count: 0 }
        });
        // // console.log("emptyData334", emptyData, this.props.getStudentMaterialCount);
        this.props.getStudentMaterialCount.subjects_counts.map((subcount) => {
            let filterData = this.state.multiDropdowns.find((aa) => aa.id == subcount.id);
            if (filterData.multichapter.length > 0) {
                // console.log("subcount.material_chapters", subcount.material_chapters);
                subcount.material_chapters.map((item) => {
                    let chapterfilter = filterData.multichapter.find((a) => a == item.id);
                    // console.log("chapterfilter", chapterfilter);
                    if (chapterfilter != undefined) {

                        emptyData = emptyData.map((item2) => {
                            // console.log("item2", item2);
                            // console.log("item.content_counts", item.content_counts);
                            let filterData = item.content_counts.find((a) => a.id == item2.id);
                            // console.log("filterData", filterData);
                            if (filterData != undefined) {
                                let dcount = parseInt(item2.count) + parseInt(filterData.count)
                                return { ...item2, count: parseInt(dcount) }
                            }
                            else {
                                return { ...item2 }

                            }

                        });
                        //   // console.log("emptyData", emptyData);
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

        //// console.log("chapterMaterialCounts2", chapterMaterialCounts2);
        let nextLength = this.state.chapterMaterialCounts.filter((a) => a.checked == true);

        // console.log("this.state", this.state.multiDropdowns);
        let trailRestriction = this.state.multiDropdowns.find((a) => a.id == "2");
        // console.log("trailRestriction", trailRestriction.multichapter);
        // console.log("this.props.isStudentUserValid.isTrialUser",this.props.isStudentUserValid.isTrialUser);
        let currentTime = moment().unix();
        return (
            <section className="revision-materials-section">
                <div className="position-absolute" style={{ right: 0, top: 0 }}>
                    <Image src={require('../../../images/revision-material-bg-shape.svg')} alt="revision-material-bg-shape" />
                </div>
                <Container>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h2 className="section-title font-weight-bold">Revision <span className="font-weight-normal">Material</span></h2>
                            <p className="text-muted">Select Multiple Material Types and Start Learning</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={10} lg={10} md={12} sm={12}>
                            <div className="d-lg-flex justify-content-between align-items-start my-4">
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
                                                    {(this.props.isStudentUserValid.isTrialUser == true && trailRestriction.multichapter.length < 20) || (currentTime > this.props.isStudentUserValid.expiry_date && trailRestriction.multichapter.length < 20) ? (
                                                        <div style={{ color: "#f81201" }}>
                                                            {Cookies.get("student_userlevel") == "1" ? (
                                                                <small>*Note: Dear Student, Now you have limited Access.</small>
                                                            ) : (
                                                                    <small>*Note: To access full syllabus <span style={{ color: "#f81201", fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                                )}

                                                        </div>
                                                    ) : ("")}
                                                </div>


                                            </React.Fragment>)
                                        :
                                        (
                                            <Form>
                                                <Form.Row>
                                                    {this.state.multiDropdowns.map((item, index) => {
                                                        return (
                                                            <Form.Group as={Col} controlId="formGridMaths">
                                                                <Form.Label className="font-weight-bold">{item.subject} ({item.multichaptervalue.length} Chapters)</Form.Label>
                                                                <div className="first mr-3" style={{ width: 250 }}>
                                                                    <MultiSelect
                                                                        overrideStrings={{
                                                                            "allItemsAreSelected": "All Chapters are selected.",
                                                                            //"selectSomeItems": multisubjectlabelledBy
                                                                        }
                                                                        }
                                                                        // disableSearch={multisubjectdisableSearch}
                                                                        // hasSelectAll={multisubjectselectall}
                                                                        options={this.multiChapteroptions(item.id)}
                                                                        value={item.multichaptervalue}
                                                                        onChange={(e) => this.handleMultipleSelectInputChange(e, item, index)}
                                                                        labelledBy={"Select"}
                                                                    />
                                                                </div>

                                                            </Form.Group>
                                                        );

                                                    })}
                                                </Form.Row>
                                                {(this.props.isStudentUserValid.isTrialUser == true && trailRestriction.multichapter.length < 20) || (currentTime > this.props.isStudentUserValid.expiry_date && trailRestriction.multichapter.length < 20) ? (<div style={{ color: "#f81201" }}>
                                                    {Cookies.get("student_userlevel") == "1" ? (
                                                        <small>*Note: Dear Student, Now you have limited Access.</small>
                                                    ) : (
                                                            <small>*Note: To access full syllabus <span style={{ color: "#f81201", fontWeight: "bold" }}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small>
                                                        )}

                                                </div>) : ("")}
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
                                            pathname: "/student/revision-material-groups/custom-revision-materials",
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
                                                        //const { id, subjectName, title, count } = item;
                                                        if (mcount.count > 0) {
                                                            return (
                                                                <Col xl={3} lg={4} md={4} sm={6} xs={6} key={mcount.id}
                                                                    //className="single-card shortnotes"
                                                                    className={this.materialClass(mcount.customcontent)}
                                                                >
                                                                    <Card as={Link}
                                                                        to={{
                                                                            pathname: "/student/revision-material-groups/custom-revision-materials",
                                                                            state: {
                                                                                multiStateData: this.state,
                                                                                content_type: mcount.id
                                                                            }
                                                                        }}
                                                                        //to="/student/revision-material-groups/custom-revision-materials"
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
                                                            // const { id, subjectName, title, count } = item;
                                                            if (findMaterial.count > 0) {
                                                                return (
                                                                    <Col xl={3} lg={4} md={4} sm={6} xs={6} key={findMaterial.id} className={this.materialClass(findMaterial.customcontent)}>
                                                                        <Card onClick={() => this.contentIcon(findMaterial.id)}>
                                                                            <Card.Body className="d-flex flex-row align-items-center">
                                                                                {/* {findMaterial.checked == true ? (<i
                                                                                    onClick={() => this.contentIcon(false, findMaterial.id)}
                                                                                    className="position-absolute fal fa-check-circle text-white" style={{ right: 10, top: 10 }} />) : (<i
                                                                                        onClick={() => this.contentIcon(true, findMaterial.id)}
                                                                                        className="position-absolute fal fa-circle text-white" style={{ right: 10, top: 10 }} />)} */}


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
                                                {/* <Row>
                                                    {nextLength.length > 0 ? (<Col xl={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }} sm={12} className="text-center mt-4">
                                                        <Link to={{
                                                            pathname: "/student/revision-material-groups/custom-revision-materials",
                                                            state: {
                                                                multiStateData: this.state
                                                            }
                                                        }} className="btn-lightblue rounded-pill d-block text-decoration-none">Next</Link>
                                                    </Col>) : ("")}

                                                </Row> */}
                                            </React.Fragment>
                                        )
                                }

                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* <StickyHelp headerBottom={this.state.headerBottomImg} /> */}
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </section>
        )
    }
}

export default withRouter((RevisionMaterialGroupSection));
