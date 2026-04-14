import React, { Component } from 'react'
import { Row, Col, Modal, Card, ListGroup, Alert } from 'react-bootstrap'
import '../learn_practice/start_error_exam/start_error_page/_errorexam.scss'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import CustomModalBody from "./CustomModalBody";

const FETCH_PREVIOUSQUESTIONDATA = gql` 
query($chapter: Int, $linkageChapter: Int) {
    getStudentLinkageQuestionsData(chapter: $chapter, linkageChapter: $linkageChapter){
        id
        subject
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
        chapterNames
        topicNames
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
        const getStudentLinkageQuestionsData = this.props.getStudentLinkageQuestionsData;
        const loading1 = getStudentLinkageQuestionsData.loading;
        const error1 = getStudentLinkageQuestionsData.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
console.log("this.props.stateData",this.props.stateData);
        console.log("custommodalSection",
       " chapter:" ,parseInt(this.props.stateData.chapter),
        "linkageChapter:", parseInt(this.props.stateData.linkage));
        console.log("getStudentLinkageQuestionsData", getStudentLinkageQuestionsData.getStudentLinkageQuestionsData);

        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Sample Linkage Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 error_exam_block">
                    {loading1 != true ? (
                        <React.Fragment>
                            {getStudentLinkageQuestionsData.getStudentLinkageQuestionsData.length > 0 ? (
                                <CustomModalBody 
                                setname={this.props.stateData.setname}
                                getStudentLinkageQuestionsData={getStudentLinkageQuestionsData.getStudentLinkageQuestionsData} />
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
                   
                    chapter: parseInt(props.stateData.chapter),
                    linkageChapter: parseInt(props.stateData.linkage)
                     
                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getStudentLinkageQuestionsData"
        })

)(CustomModal));
