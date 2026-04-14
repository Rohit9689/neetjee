import React, { Component } from 'react'
import { Row, Col, Button, Alert, Card, Form, Modal, Popover, OverlayTrigger } from 'react-bootstrap'
import { components } from 'react-select'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import parse, { domToReact } from 'html-react-parser';

import '../_preexam.scss';
import '../../learn_practice/start_error_exam/start_error_page/_errorexam.scss';
import SingleOption1 from '../../learn_practice/start_error_exam/start_error_page/SingleOption1';
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class ViewQuestionAnswerSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    isValidJSON() {
        console.log("srefsgs12");
        let question1 = this.props.stateData.questions[this.props.stateData.index].question.replace(/src="/g, 'src=\\"');
        console.log("question1", question1);
        let question2 = question1.replace(/" \/>/g, '\\" />');
        console.log("question2", question2);


        try {
            let question = JSON.parse(question2);
            console.log("isValidJSONtrue");

            return (

                <ol className="ml-3 p-0" type={
                    this.props.stateData.questions[this.props.stateData.index].list1type == "alphabets" ? ("A")
                        : (this.props.stateData.questions[this.props.stateData.index].list1type == "numbers") ? ("1")
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
    isValidJSON2(str) {
        console.log("srefsgs123");
        let question1 = this.props.stateData.questions[this.props.stateData.index].question.replace(/src="/g, 'src=\\"');
        let question2 = question1.replace(/" \/>/g, '\\" />');
        try {

            let question = JSON.parse(question2);
            console.log("isValidJSONtrue", question);
            return (
                <ol className="ml-3 p-0" type={
                    this.props.stateData.questions[this.props.stateData.index].list2type == "alphabets" ? ("A")
                        : (this.props.stateData.questions[this.props.stateData.index].list2type == "numbers") ? ("1")
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
        console.log("str", str);
        if (str != undefined || str != "") {
            try {
                return parse(str);
            } catch (ex) {
                return false;
            }
        }
        else {
            return false;
        }

    }
    render() {

        const lqlength = this.props.stateData.questions.length - 1;
        const SectionData = [
            { value: 'NEET 2020', label: 'NEET 2020', color: '#00B8D9', isFixed: true },
            { value: 'JEE 2020', label: 'JEE 2020', color: '#0052CC', isFixed: true },
            { value: 'EAMCET 2020', label: 'EAMCET 2020', color: '#5243AA' },
        ];
        console.log("attempt_answerattempt_answer", this.props.stateData.questions, this.props.stateData.questions[this.props.stateData.index])

        return (
            <React.Fragment>
                {this.props.stateData.questions.length > 0 ? (<div className="error_exam_block py-3">
                    <Row>
                        <Col xl={2} lg={{ span: 2, order: 1 }} md={{ span: 6, order: 1 }} sm={{ span: 12, order: 1 }} xs={{ span: 12, order: 1 }}>
                            <div className="time-spent my-2">

                            </div>
                        </Col>
                        {this.props.stateData.questions[this.props.stateData.index].qtype == "9" || this.props.stateData.questions[this.props.stateData.index].qtype == "3" ? (
                            <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>

                                <div className="question_area my-2">
                                    <div className="q_Name">
                                        <span className="q_No">
                                            {this.idFunction(this.props.stateData.index)}.
                                        </span>
                                        {this.parseFun(this.props.stateData.questions[this.props.stateData.index].mat_question)}
                                        {
                                            " QID- " + this.props.stateData.questions[this.props.stateData.index].id
                                        }
                                        {this.props.stateData.questions.length > 0 ?
                                            (

                                                <Row>
                                                    <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                        <h5 className="list-title"> List I</h5>

                                                        {this.isValidJSON()}
                                                    </Col>
                                                    <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                                                        <h5 className="list-title"> List II</h5>
                                                        {this.isValidJSON2()}
                                                    </Col>
                                                </Row>
                                            )
                                            :
                                            ("")}

                                    </div>

                                    <div className="q_options mt-4">
                                        <SingleOption1
                                            option="A"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "A" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option1)) : ("")}
                                            controlId="formBasicCheckboxOne"
                                        />
                                        <SingleOption1
                                            option="B"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "B" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option2)) : ("")}
                                            controlId="formBasicCheckboxTwo" />
                                        <SingleOption1
                                            option="C"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "C" ? false : null}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option3)) : ("")}
                                            showMessage={true}
                                            controlId="formBasicCheckboxThree"
                                        />
                                        <SingleOption1
                                            option="D"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "D" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option4)) : ("")}
                                            controlId="formBasicCheckboxFour" />
                                    </div>

                                </div>
                            </Col>
                        ) : (this.props.stateData.questions[this.props.stateData.index].qtype == "8") ? (
                            <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                <div className="question_area my-2">

                                    <div className="q_Name">
                                        <span className="q_No">
                                            {this.idFunction(this.props.stateData.index)}
                                        </span>
                                        {this.props.stateData.questions.length > 0 ?
                                            (
                                                this.parseFun(this.props.stateData.questions[this.props.stateData.index].question)
                                            )
                                            :
                                            ("")}
                                        {
                                            " QID- " + this.props.stateData.questions[this.props.stateData.index].id
                                        }
                                    </div>

                                    <React.Fragment>
                                        {this.props.stateData.questions[this.props.stateData.index].status == "2" ?
                                            (<Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                                <div className="option_name">
                                                    {(this.props.stateData.questions[this.props.stateData.index].attempt_answer)}
                                                </div>
                                                <div className="option_selected text-success">
                                                    <span className="mr-2">Attempted Answer</span><i className="fal fa-check-circle" />
                                                </div>
                                            </Card>) : this.props.stateData.questions[this.props.stateData.index].status == "1" ? (
                                                <React.Fragment>
                                                    <Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                                        <div className="option_name">
                                                            {(this.props.stateData.questions[this.props.stateData.index].attempt_answer)}
                                                        </div>
                                                        <div className="option_selected text-danger">
                                                            <span className="mr-2">Attempted Answer</span><i className="fal fa-times-circle" />
                                                        </div>
                                                    </Card><br/>
                                                    <Card as={Card.Body} className="flex-row justify-content-between align-items-center">
                                                        <div className="option_name">
                                                            {(this.props.stateData.questions[this.props.stateData.index].answer)}
                                                        </div>
                                                        <div className="option_selected text-success">
                                                            <span className="mr-2">Correct Answer</span><i className="fal fa-check-circle" />
                                                        </div>
                                                    </Card>
                                                </React.Fragment>
                                            ) : ("")}
                                    </React.Fragment>





                                </div>
                            </Col>) : (this.props.stateData.questions[this.props.stateData.index].qtype == "5") ? (
                                <Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                    <div className="question_area my-2">
                                        <Card className="p-3 mb-2 Qparagraph ">
                                            <Card.Text className="text-justify">{this.parseFun(this.props.stateData.questions[this.props.stateData.index].compquestion)}</Card.Text>
                                        </Card>

                                        <div className="q_Name">
                                            <span className="q_No">
                                                {this.idFunction(this.props.stateData.index)}
                                            </span>
                                            {this.props.stateData.questions.length > 0 ?
                                                (
                                                    this.parseFun(this.props.stateData.questions[this.props.stateData.index].question)
                                                )
                                                :
                                                ("")}
                                            {
                                                " QID- " + this.props.stateData.questions[this.props.stateData.index].id
                                            }
                                        </div>

                                        <div className="q_options mt-4">
                                            <SingleOption1
                                                option="A"
                                                status={
                                                    this.props.stateData.questions[this.props.stateData.index].answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "A" ? false : null}
                                                showMessage={true}
                                                optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option1)) : ("")}
                                                controlId="formBasicCheckboxOne"
                                            />
                                            <SingleOption1
                                                option="B"
                                                status={
                                                    this.props.stateData.questions[this.props.stateData.index].answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "B" ? false : null}
                                                showMessage={true}
                                                optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option2)) : ("")}
                                                controlId="formBasicCheckboxTwo" />
                                            <SingleOption1
                                                option="C"
                                                status={
                                                    this.props.stateData.questions[this.props.stateData.index].answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "C" ? false : null}
                                                optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option3)) : ("")}
                                                showMessage={true}
                                                controlId="formBasicCheckboxThree"
                                            />
                                            <SingleOption1
                                                option="D"
                                                status={
                                                    this.props.stateData.questions[this.props.stateData.index].answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "D" ? false : null}
                                                showMessage={true}
                                                optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option4)) : ("")}
                                                controlId="formBasicCheckboxFour" />
                                        </div>
                                    </div>
                                </Col>
                            ) : (<Col xl={{ span: 8, order: 2 }} lg={{ span: 8, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                                <div className="question_area my-2">
                                    <div className="q_Name">
                                        <span className="q_No">
                                            {this.idFunction(this.props.stateData.index)}
                                        </span>
                                        {this.props.stateData.questions.length > 0 ?
                                            (
                                                this.parseFun(this.props.stateData.questions[this.props.stateData.index].question)
                                            )
                                            :
                                            ("")}
                                        {
                                            " QID- " + this.props.stateData.questions[this.props.stateData.index].id
                                        }
                                    </div>

                                    <div className="q_options mt-4">
                                        <SingleOption1
                                            option="A"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("A") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "A" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option1)) : ("")}
                                            controlId="formBasicCheckboxOne"
                                        />
                                        <SingleOption1
                                            option="B"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("B") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "B" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option2)) : ("")}
                                            controlId="formBasicCheckboxTwo" />
                                        <SingleOption1
                                            option="C"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("C") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "C" ? false : null}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option3)) : ("")}
                                            showMessage={true}
                                            controlId="formBasicCheckboxThree"
                                        />
                                        <SingleOption1
                                            option="D"
                                            status={
                                                this.props.stateData.questions[this.props.stateData.index].answer.includes("D") ? true : this.props.stateData.questions[this.props.stateData.index].attempt_answer == "D" ? false : null}
                                            showMessage={true}
                                            optionText={this.props.stateData.questions.length > 0 ? (this.parseFun(this.props.stateData.questions[this.props.stateData.index].option4)) : ("")}
                                            controlId="formBasicCheckboxFour" />
                                    </div>
                                </div>
                            </Col>)}
                    </Row>



                    <React.Fragment>
                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                <Alert variant="success" className="my-3 border-success">
                                    <h5>Solution</h5>
                                    <p>{this.parseFun(this.props.stateData.questions[this.props.stateData.index].explanation)}</p>
                                </Alert>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                {this.props.stateData.questions != undefined ? (
                                    <React.Fragment>
                                        {this.props.stateData.questions[this.props.stateData.index].status == "1" ? (
                                            <React.Fragment>{this.props.stateData.questions[this.props.stateData.index].reasonstatus == "0" ? (<Row>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <Form>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectReasons">
                                                                        <Form.Label>Reason For Wrong Attempt</Form.Label>
                                                                        <SelectDropDown
                                                                            name="reason"
                                                                            options={this.reasonFun(this.props.studentGlobals.errorReasons)}
                                                                            placeholderName={'Select Reasons'}
                                                                            dropdownIndicator={{ DropdownIndicator }}
                                                                            handleChange={this.props.ParentSelecthandleChange} />
                                                                    </Form.Group>
                                                                    <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectTextarea">
                                                                        <Form.Label>Some Comments</Form.Label>
                                                                        <Form.Control
                                                                            name="rcomments"
                                                                            onChange={this.props.pCommentsFunction}
                                                                            as="textarea" rows="3" />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>) : ("")}</React.Fragment>

                                        ) : ("")}

                                    </React.Fragment>) : ("")}

                            </Col>
                        </Row>

                        <Row className="text-center mt-3">
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                {this.props.stateData.index > 0 ? (<Button variant="outline-primary" className="px-5 m-2" onClick={this.props.PreQuestionfunction}>Previous Question</Button>) : ("")}
                                {this.props.stateData.index != lqlength ? (<Button variant="outline-success" className="px-5 m-2" onClick={this.props.PnextQuestionfunction}>Next Question</Button>) : ("")}
                            </Col>
                        </Row>
                    </React.Fragment>

                </div>) : (
                        <div className="text-center pt-5">
                            <span className="text-danger">No Data Available</span>
                        </div>
                    )
                }
            </React.Fragment>

        )
    }
}

export default withRouter(ViewQuestionAnswerSection);


