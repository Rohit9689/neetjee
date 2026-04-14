import React, { Component } from 'react'
import { Modal, Form, Button, Badge } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
class ChapterAndtopicModalTopic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userRestionModalShow: false
        }
    }
    startPractise = (id, subject_id, enabled, chapter_id) => {
        // localStorage.setItem("subjectid", subject_id);
        // localStorage.setItem("type", "practise");
        // localStorage.setItem("ocid", "0");
        // localStorage.setItem("otid", id);
        // window.open("/student/subject/practice-test", "_blank")

        // window.location.reload(false);

        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);


        if ((enabled == true && moduleValid.analysis_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(chapter_id.toString())) {
            if (isuserValid.lp_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                localStorage.setItem("subjectid", subject_id);
                localStorage.setItem("type", "practice");
                localStorage.setItem("ocid", chapter_id);
                localStorage.setItem("otid", id);
                window.open("/student/subject/practice-test", "_blank") //to open new page
                window.location.reload(false);
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
    learningFun = (id, subject_id, enabled, chapter_id) => {
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);


        if ((enabled == true && moduleValid.analysis_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(chapter_id.toString())) {
            if (this.props.isuserValid.lp_custom_content == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/subject/start-learning",
                    state: {
                        subjectid: subject_id,
                        ocid: chapter_id,
                        otid: id
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
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4" style={{ height: 522, overflowY: 'auto' }}>

                    <ul className="list-unstyled m-0 p-0">
                        {this.props.data.map((item, index) => {
                            const filglobalsubjects = globalsubjects.find((a) => a.id == this.props.lastdata.id)
                            const chData = filglobalsubjects.studentChapters.find((a) => a.id == item.chapter_id);
                            console.log("tcmodal", chData);
                            if (chData != undefined) {
                                return (
                                    <li className="mb-3">
                                        <div className="d-flex">
                                            <div className="chapter text-primary">Chapter:</div>
                                            <div className="ml-2 chapter-text">
                                                <div>{item.chapter}</div>
                                                <div className="my-2">
                                                    <div className="ml-2 topic-text d-flex">
                                                        {/* <div className="sno">{index + 1}.</div> */}
                                                        <div className="chapter text-warning">Topic:</div>
                                                        <div className="topic-text ml-3">
                                                            <div>{item.topic}</div>
                                                            <a
                                                                onClick={() => this.learningFun(item.id, this.props.lastdata.id, chData.enabled, item.chapter_id)}
                                                                className="mx-1"><Badge variant="warning">Learn Now</Badge></a>
                                                            <Link
                                                                onClick={() => this.startPractise(item.id, this.props.lastdata.id, chData.enabled, item.chapter_id)}

                                                                className="mx-1"><Badge variant="success">Practice Now</Badge></Link>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </li>

                                )

                            }
                        }
                        )}
                    </ul>
                    {/* <h5 className="text-danger">Chapters Data</h5> */}
                </Modal.Body>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Modal >
        )
    }
}

export default withRouter(ChapterAndtopicModalTopic)
