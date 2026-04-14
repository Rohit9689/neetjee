import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button, Badge, ListGroup } from 'react-bootstrap'
import parse, { domToReact } from 'html-react-parser';
import { components } from 'react-select';
import { withRouter } from "react-router-dom";
import '../../../../../../student_module/components/learn_practice/start_error_exam/start_error_page/_errorexam.scss'
import SingleOption1 from '../../../../../../student_module/components/learn_practice/start_error_exam/start_error_page/SingleOption1'
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

class CutomCategoryTotalQuestionsModalBody extends Component {
    defaultSortedFun() {
        let returnArray = [];

        const newObj = {
            dataField: "id",
            order: "desc"
        }
        returnArray.push(newObj);


        return returnArray;
    }
    isValidJSON(index) {
        console.log("srefsgs12");
        let question1 = this.props.qcountarr[index].question.replace(/src="/g, 'src=\\"');
        console.log("question1", question1);
        let question2 = question1.replace(/" \/>/g, '\\" />');
        console.log("question2", question2);


        try {
            let question = JSON.parse(question2);
            console.log("isValidJSONtrue");

            return (

                <ol type={
                    this.props.qcountarr[index].list1type == "alphabets" ? ("A")
                        : (this.props.qcountarr[index].list1type == "numbers") ? ("1")
                            : ("roman")}

                >
                    {question.map((item) => (
                        <li>{this.parseFun(item.qlist1)}</li>
                    ))}


                </ol>
            );

        } catch (ex) {
            console.log("isValidJSONfalse");
            return false;
        }
    }
    isValidJSON2(index) {
        console.log("srefsgs123");
        let question1 = this.props.qcountarr[index].question.replace(/src="/g, 'src=\\"');
        let question2 = question1.replace(/" \/>/g, '\\" />');
        try {

            let question = JSON.parse(question2);
            console.log("isValidJSONtrue");
            return (
                <ol type={
                    this.props.qcountarr[index].list2type == "alphabets" ? ("A")
                        : (this.props.qcountarr[index].list2type == "numbers") ? ("1")
                            : ("roman")}>

                    {question.map((item) => (
                        <li>{this.parseFun(item.qlist2)}</li>
                    ))}

                </ol>
            );

        } catch (ex) {
            console.log("isValidJSONfalse");
            return false;
        }
    }
    parseFun(str) {
        if (str != undefined || str != "") {
            try {
                return parse(str);
            } catch (ex) {
                return false;
            }
        }
        else {
            return null;
        }

    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }



    render() {

        return (
            <React.Fragment>
                {this.props.qcountarr.map((questionData, index) => {
                    return (
                        <Card as={Card.Body} className="mb-3">
                            <Row className="question_area">
                                {questionData.qtype == "9" || questionData.qtype == "3" ? (
                                    <React.Fragment>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <div className="q_Name">
                                                {this.parseFun(questionData.mat_question)}

                                                <span className="q_No">{this.idFunction(index)}</span>
                                                <Row>
                                                    <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                        <h5 className="list-title"> List I</h5>

                                                        {this.isValidJSON(index)}
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                        <h5 className="list-title"> List II</h5>
                                                        {this.isValidJSON2(index)}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>

                                    </React.Fragment>

                                ) : (questionData.qtype == "5") ? (
                                    <React.Fragment>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Card className="p-3 mb-2 Qparagraph ">
                                                <Card.Text className="text-justify">{this.parseFun(questionData.compquestion)}</Card.Text>
                                            </Card>
                                            <div className="q_Name">
                                                <span className="q_No">{this.idFunction(index)}</span> {this.parseFun(questionData.question)}

                                            </div>
                                        </Col>
                                    </React.Fragment>
                                ) :
                                        (<React.Fragment>
                                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                <div className="q_Name">
                                                    <span className="q_No">{this.idFunction(index)}</span> {this.parseFun(questionData.question)}

                                                </div>
                                            </Col>
                                        </React.Fragment>
                                        )}
                            </Row>
                            <Row>
                                {questionData.qtype == "8" ? (<Col xl={8} lg={8} md={12}>
                                    <Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                        <div className="option_name">
                                            {(questionData.answer)}
                                        </div>
                                        <div className="option_selected text-success">
                                            <span className="mr-2">Answer</span><i className="fal fa-check-circle" />
                                        </div>
                                    </Card>
                                </Col>) : (<Col xl={8} lg={8} md={12}>
                                    <div className="q_block">
                                        <div className="q_options">
                                            <SingleOption1
                                                option="A"
                                                status={
                                                    questionData.answer.includes("A") ? true : questionData.answer == "A" ? false : null}
                                                showMessage={true}
                                                optionText={questionData != "" ? (this.parseFun(questionData.option1)) : ("")}
                                                controlId="formBasicCheckboxOne"
                                            />
                                            <SingleOption1
                                                option="B"
                                                status={
                                                    questionData.answer.includes("B") ? true : questionData.answer == "B" ? false : null}
                                                showMessage={true}
                                                optionText={questionData != "" ? (this.parseFun(questionData.option2)) : ("")}
                                                controlId="formBasicCheckboxTwo" />
                                            <SingleOption1
                                                option="C"
                                                status={
                                                    questionData.answer.includes("C") ? true : questionData.answer == "C" ? false : null}
                                                optionText={questionData != "" ? (this.parseFun(questionData.option3)) : ("")}
                                                showMessage={true}
                                                controlId="formBasicCheckboxThree"
                                            />
                                            <SingleOption1
                                                option="D"
                                                status={
                                                    questionData.answer.includes("D") ? true : questionData.answer == "D" ? false : null}
                                                showMessage={true}
                                                optionText={questionData != "" ? (this.parseFun(questionData.option4)) : ("")}
                                                controlId="formBasicCheckboxFour" />
                                        </div>

                                    </div>
                                </Col>)}
                                <Col xl={4} lg={4} md={12}>
                                    <Card className="my-3">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="bg-light">
                                                <p className="text-muted">QID</p>
                                                <h6>{questionData.id}</h6>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <p className="text-muted">Subject</p>
                                                <h6>{questionData.subject_name}</h6>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <p className="text-muted">Chater</p>
                                                <h6>{questionData.chapter_name}</h6>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <p className="text-muted">Topic</p>
                                                <h6>{questionData.topic_name}</h6>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default withRouter(
    (CutomCategoryTotalQuestionsModalBody)
);
