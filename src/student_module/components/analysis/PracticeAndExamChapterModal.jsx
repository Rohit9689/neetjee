import React, { Component } from 'react'
import { Modal, Form, Button, Badge, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UserRestrictionAlert from '../home/UserRestrictionAlert';
//import { Row, Card, Col, Modal, Form, Button, ButtonGroup } from 'react-bootstrap';

class PracticeAndExamChapterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chData: [],
            userRestionModalShow: false
        }
    }
    render() {
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
                        <Form.Text className="form-text text-danger">
                            {this.props.submitError}
                        </Form.Text>
                        {this.props.data.map((item, index) => {
                            const filglobalsubjects = globalsubjects.find((a) => a.id == this.props.subjectid)
                            const chData = filglobalsubjects.studentChapters.find((a) => a.id == item.id);
                            if ((chData.enabled == true && moduleValid.exam_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(item.id.toString())) {
                                return (
                                    <li className="mb-3">
                                        <div className="d-flex">

                                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                                <Form.Check type="checkbox" id={"checkboxOne" + index} custom>
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        name="chaptercheck"
                                                        value=""
                                                        checked={item.checked}
                                                        onClick={(e) => this.props.handleInputChange(e, item.id)}
                                                    />
                                                    <Form.Check.Label htmlFor={"checkboxOne" + index}>{item.chapter}</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </div>
                                    </li>

                                )
                            }
                            else {
                                return (
                                    //     <li style={{cursor:"pointer"}} onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                    //     <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                    //     {getsinglechap.chapter}
                                    // </li>

                                    <li style={{ cursor: "pointer" }} onClick={() => this.setState({ userRestionModalShow: true })} className="mb-3">
                                        <div className="d-flex">
                                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="StartDate">
                                                <Image src={require('../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                {item.chapter}
                                            </Form.Group>
                                        </div>
                                    </li>

                                )
                            }

                        }
                        )}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success text-uppercase px-lg-5 ml-1"
                        onClick={this.props.startExamhandleFormSubmit}
                    >Start Now</Button>
                </Modal.Footer>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Modal >
        )
    }
}

export default PracticeAndExamChapterModal
