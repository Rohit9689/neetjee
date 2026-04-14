import React, { Component } from 'react'
import { Row, Col, Modal, Card, ListGroup, Alert } from 'react-bootstrap'
import SingleOption from '../exams/practice_exam/SingleOption'
import ScheduleData from '../exams/practice_exam/Questions';
import '../learn_practice/start_error_exam/start_error_page/_errorexam.scss'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import CustomModalBody from "./CustomModalBody";

const FETCH_PREVIOUSQUESTIONDATA = gql` 
query($params: PreviousPapersInput) {
    getPreviousPaperData(params: $params){
        id
        subject
        examType 
        examTime
        question
        option1
        option2
        option3
        option4
        qtype
        compquestion
        list1type
        list2type
        mat_question
        explanation
        answer
        inputquestion
        subjectName
        ChapterName
        TopicName
     }
}

`;

class CustomModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,

        }

    }
    render() {
        const getPreviousPaperData = this.props.getPreviousPaperData;
        const loading1 = getPreviousPaperData.loading;
        const error1 = getPreviousPaperData.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }


        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Corresponding Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 error_exam_block">
                    {loading1 != true ? (
                        <React.Fragment>
                            {getPreviousPaperData.getPreviousPaperData.length > 0 ? (
                                <CustomModalBody 
                                diffoftheory={this.props.stateData.diffoftheory}
                                setname={this.props.stateData.setname}
                                getPreviousPaperData={getPreviousPaperData.getPreviousPaperData} />
                            ) : (
                                    <Card as={Card.Body} className="justify-content-center flex-row">
                                        <p className="text-danger justify-content-center">No Data Available</p>
                                    </Card>
                                )}
                        </React.Fragment>
                        ) : (
                            <Card as={Card.Body} className="justify-content-center flex-row">
                                <div class="spinner-border text-primary text-center"></div>
                            </Card>
                        )}
                </Modal.Body>
            </Modal>
        )
    }
}


export default withRouter(compose(
    graphql(FETCH_PREVIOUSQUESTIONDATA,
        {
            options: props => ({
                variables: {
                    params: {
                        examtype: parseInt(props.pexamtype),
                        year: props.stateData.pyeartype.toString(),
                        subject: parseInt(props.stateData.psubject),
                        chapter: props.stateData.chapter.toString(),
                        topic: parseInt(props.stateData.topic),
                        complexity: parseInt(props.stateData.complexity),
                        qtype: parseInt(props.stateData.qtype),
                        qtheory: parseInt(props.stateData.qtheory),
                        linkage:props.stateData.linkage,
                        mobile: Cookies.get("mobile")
                    }
                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getPreviousPaperData"
        })

)(CustomModal));
