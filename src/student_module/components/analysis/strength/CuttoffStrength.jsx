import React, { Component } from 'react'
import { Row, Col, Card, CardGroup, ListGroup, Form, Button, Table, Badge } from 'react-bootstrap';
import './_strength.scss'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
class CuttoffStrength extends Component {
    constructor(props) {
        super(props)
        const weakData = props.practiceSubjectAnalysisData.subject_data.map((item) => {
            const sdata = item.weak_chapters.sort((a, b) => {
                return a.accuracy - b.accuracy;
            });
            return { ...item, weak_chapters: sdata, select: "0" }
        });
        this.state = {
            practiceSubjectAnalysisData: weakData,
            userRestionModalShow: false
        }
    }
    strengthCuttOff = (e, subject) => {
        const sub = this.props.practiceSubjectAnalysisData.subject_data.map((item2) => {
            if (item2.subject == subject) {

                let wData = [];
                let select = "";
                if (e.target.value == "1") {
                    select = "1";
                }
                if (e.target.value == "2") {
                    select = "2";
                }
                if (e.target.value == "3") {
                    select = "3";
                }
                if (e.target.value == "4") {
                    select = "4";
                }
                if (e.target.value == "5") {
                    select = "5";
                }
                if (e.target.value == "6") {
                    select = "6";
                }
                if (e.target.value == "7") {
                    select = "7";
                }
                if (e.target.value == "0") {
                    select = "0";
                }

                if (e.target.value == "1") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 0 && weakmap.accuracy < 15);
                }
                if (e.target.value == "2") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 15 && weakmap.accuracy < 30);
                }
                if (e.target.value == "3") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 30 && weakmap.accuracy < 45);
                }
                if (e.target.value == "4") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 45 && weakmap.accuracy < 60);
                }
                if (e.target.value == "5") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 60 && weakmap.accuracy < 70);
                }
                if (e.target.value == "6") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 70 && weakmap.accuracy < 80);
                }
                if (e.target.value == "7") {
                    wData = item2.weak_chapters.filter((weakmap) => weakmap.accuracy >= 80);
                }
                if (e.target.value == "0") {
                    wData = item2.weak_chapters
                }
                return { ...item2, weak_chapters: wData, select: select }
            }
            else {
                return { ...item2 }
            }
        });
        this.setState({
            practiceSubjectAnalysisData: sub
        });
    }
    startPractise = (weakmapid, subject_id, enabled) => {
        // localStorage.setItem("subjectid", subject_id);
        // localStorage.setItem("type", "practise");
        // localStorage.setItem("ocid", weakmapid);
        // localStorage.setItem("otid", "0");
        // window.open("/student/subject/practice-test", "_blank")

        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);


        if ((enabled == true && moduleValid.analysis_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(weakmapid.toString())) {
            if (isuserValid.lp_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                localStorage.setItem("subjectid", subject_id);
                localStorage.setItem("type", "practice");
                localStorage.setItem("ocid", weakmapid);
                localStorage.setItem("otid", "0");
                window.open("/student/subject/practice-test", "_blank") //to open new page
            } else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    learningFun = (weakmapid, subject_id, enabled) => {
        console.log("weakmapid, subject_id, enabled", weakmapid, subject_id, enabled);
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);


        if ((enabled == true && moduleValid.analysis_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(weakmapid.toString())) {
            if (isuserValid.lp_custom_content == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-learning",
                    state: {
                        subjectid: subject_id,
                        ocid: weakmapid,
                        otid: "0"
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
        else {
            this.setState({
                userRestionModalShow: true
            });
        }

    }
    render() {
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }

        return (
            <React.Fragment>
                {this.state.practiceSubjectAnalysisData.map((item) => {

                    if (this.props.item.subject == item.subject) {
                        return (
                            <Col xl={4} lg={6} md={12} sm={12} className="my-3">
                                <Card className="weeklist-card h-100 border-0">
                                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                        <h6 className="week-title mb-0">You are weak in below listed Chapters</h6>
                                        <Form.Group controlId="exampleForm.ControlSelect1" className="cutoff mb-0">
                                            <Form.Label>Accuracy cutoff</Form.Label>
                                            <Form.Control as="select" custom="true"
                                                //value={item.select}
                                                onClick={(e) => this.strengthCuttOff(e, this.props.item.subject)}>
                                                <option value="0">All</option>
                                                <option value="1">0% - 15%</option>
                                                <option value="2">15% - 30%</option>
                                                <option value="3">30% - 45%</option>
                                                <option value="4">45% - 60%</option>
                                                <option value="5">60% - 70%</option>
                                                <option value="6">70% - 80%</option>

                                                <option value="7">above 80%</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Card.Header>
                                    <Card.Body className="p-2" style={{ height: 215, overflowY: 'scroll' }}>
                                        <ul className="list-unstyled chapter-list my-2 p-0">
                                            {item.weak_chapters.map((weakmap) => {
                                                const filglobalsubjects = globalsubjects.find((a) => a.id == item.subject_id)
                                                const chData = filglobalsubjects.studentChapters.find((a) => a.id == weakmap.id);
                                                //console.log("schData.enabled",chData);
                                                if (chData != undefined) {
                                                    return (<li>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="title">{weakmap.chapter_name}
                                                            </div>

                                                            <div className="d-flex ">
                                                                <p className="mr-2">Accuracy</p>
                                                                <Form.Check.Label htmlFor="checkboxOne">{weakmap.accuracy}%</Form.Check.Label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="btns">
                                                                <Link
                                                                    onClick={() => this.startPractise(weakmap.id, this.props.item.subject_id, chData.enabled)}
                                                                    className="mx-1"><Button variant="success p-1" style={{ fontSize: 10 }}>Practice Now</Button></Link>
                                                                <a
                                                                    onClick={() => this.learningFun(weakmap.id, this.props.item.subject_id, chData.enabled)}
                                                                    // to={{
                                                                    //     pathname: "/student/subject/start-learning",
                                                                    //     state: {
                                                                    //         page:"strength",
                                                                    //         subject:item.subject,
                                                                    //         hname: "Chapter",
                                                                    //         chapterid: weakmap.id,
                                                                    //         chapter: weakmap.chapter_name,
                                                                    //         topicid: "",
                                                                    //         topic: "",
                                                                    //         ocid: weakmap.id,
                                                                    //         otid: "0",
                                                                    //         subjectid: this.props.item.subject_id
                                                                    //     }
                                                                    // }}
                                                                    className="mx-1"><Button variant="warning p-1" style={{ fontSize: 10 }}>Learn Now</Button></a>

                                                            </div>
                                                            <div className="ml-2">Total q's: {weakmap.count}</div>
                                                        </div>
                                                    </li>);

                                                }


                                            }
                                            )}
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }

                })}
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </React.Fragment>

        )
    }
}


export default withRouter(CuttoffStrength);
