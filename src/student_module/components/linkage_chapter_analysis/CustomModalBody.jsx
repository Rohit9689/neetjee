import React, { Component } from 'react'
import { Row, Col, Modal, Card, ListGroup, Alert,Button } from 'react-bootstrap'
import SingleOption1 from '../learn_practice/start_error_exam/start_error_page/SingleOption1'
import ScheduleData from '../exams/practice_exam/Questions';
import '../learn_practice/start_error_exam/start_error_page/_errorexam.scss'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import parse, { domToReact } from 'html-react-parser';
import axios from "axios";

class CustomModalBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            innerreloader: "0",
            index: 0,
        }

    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }

    isValidJSON() {
        console.log("srefsgs12");
        let question1 = this.props.getStudentLinkageQuestionsData[this.state.index].question.replace(/src="/g, 'src=\\"');
        console.log("question1", question1);
        let question2 = question1.replace(/" \/>/g, '\\" />');
        console.log("question2", question2);


        try {
            let question = JSON.parse(question2);
            console.log("isValidJSONtrue");

            return (

                <ol type={
                    this.props.getStudentLinkageQuestionsData[this.state.index].list1type == "alphabets" ? ("A")
                        : (this.props.getStudentLinkageQuestionsData[this.state.index].list1type == "numbers") ? ("1")
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
        let question1 = this.props.getStudentLinkageQuestionsData[this.state.index].question.replace(/src="/g, 'src=\\"');
        let question2 = question1.replace(/" \/>/g, '\\" />');
        try {

            let question = JSON.parse(question2);
            console.log("isValidJSONtrue");
            return (
                <ol type={
                    this.props.getStudentLinkageQuestionsData[this.state.index].list2type == "alphabets" ? ("A")
                        : (this.props.getStudentLinkageQuestionsData[this.state.index].list2type == "numbers") ? ("1")
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
    next() {
        this.setState({
            index: parseInt(this.state.index) + 1
        })

    }
    previous() {
        this.setState({
            index: parseInt(this.state.index) - 1
        })

    }
    onScrollgetQuestionById = async (e, questionData) => {
        this.setState({
            innerreloader: "1"
        });
        axios.get(`http://admin.mylearningplus.in/mobile.php?getQuestion=1&qid=${parseInt(questionData.id)}`)
            .then(response => {
                let newObj = {
                    ...questionData,
                    question: response.data.question,
                    option1: response.data.option1,
                    option2: response.data.option2,
                    option3: response.data.option3,
                    option4: response.data.option4,
                    compquestion: response.data.compquestion,
                    list1type: response.data.list1type,
                    list2type: response.data.list2type,
                    mat_question: response.data.mat_question,
                    inputquestion: response.data.inputquestion

                }
                questionData = newObj;
                this.setState({ innerreloader: "2" });
                console.log("response", response.data);
            })
            .catch(error => {
                console.log(error);
            });
        setTimeout(() => { this.SetreLoad() }, 1500);
    }
    SetreLoad = () => {
        this.setState({
            innerreloader: "0"
        });
    }
    render() {
        console.log("getStudentLinkageQuestionsData2", this.props.getStudentLinkageQuestionsData);
        let questionData = this.props.getStudentLinkageQuestionsData[this.state.index];
        console.log("questionData", questionData);
        //let setArr = this.props.setname.split(",");
        let setArrc = questionData.chapterNames.split(",");

        let setArrt = questionData.topicNames.split(",");


        return (
            <React.Fragment>
                <Row className="question_area my-1">
                    {questionData.qtype == "9" || questionData.qtype == "3" ? (
                        <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                            <div className="q_Name">
                                {this.parseFun(questionData.mat_question)}
                                <span className="q_No">{this.idFunction(this.state.index)}</span>
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
                            </div>
                        </Col>

                    ) : (questionData.qtype == "5") ? (
                        <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Card className="p-3 mb-2 Qparagraph ">
                                <Card.Text className="text-justify">{this.parseFun(questionData.compquestion)}</Card.Text>
                            </Card>
                            <div className="q_Name">
                                <span className="q_No">{this.idFunction(this.state.index)}</span> {this.parseFun(questionData.question)}
                            </div>
                        </Col>
                    ) :
                            (
                                <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                                    <div className="q_Name">
                                        <span className="q_No">{this.idFunction(this.state.index)}</span> {this.parseFun(questionData.question)}
                                    </div>
                                </Col>
                            )}

                    <Col xl={4} lg={4} md={4} sm={12} xs={12} className="text-right">
                        <ul className="list-inline">
                            {this.state.index > 0 ? (<li className="list-inline-item" onClick={() => this.previous()}>
                            <Button variant="outline-primary mr-3"><i className="fas fa-arrow-circle-left"></i> Prev</Button></li>) : ("")}

                            {this.state.index != this.props.getStudentLinkageQuestionsData.length - 1 ? (<li className="list-inline-item" onClick={() => this.next()}><Button variant="outline-primary">Next <i className="fas fa-arrow-circle-right"></i></Button></li>) : ("")}
                            
                            


                            {/* {this.state.index > 0 ? (<li style={{ cursor: 'pointer' }} className="list-inline-item" onClick={() => this.previous()}><i className="fas fa-arrow-circle-left"></i></li>) : ("")}

                            {this.state.index != this.props.getStudentLinkageQuestionsData.length - 1 ? (<li style={{ cursor: 'pointer' }} className="list-inline-item" onClick={() => this.next()}><i className="fas fa-arrow-circle-right"></i></li>) : ("")} */}


                        </ul>
                    </Col>
                </Row>
                <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className="d-flex">
                                {this.state.innerreloader == "1" ? (<div className="text-primary">Reloading</div>) 
                                :this.state.innerreloader == "2" ? (
                                    <div className="text-success">Question reloaded</div>
                                ): (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e, questionData)} className="fa fa-repeat"> <span >Reload</span></i></a>
                                    
                                    <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                                   
                                </div>
                            </Col>
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
                        <div className="q_block my-2">
                            <div className="q_options my-4">
                                <SingleOption1
                                    option="A"
                                    status={
                                        questionData.answer.includes("A") ? true : questionData.attempt_answer == "A" ? false : null}
                                    showMessage={true}
                                    optionText={questionData != "" ? (this.parseFun(questionData.option1)) : ("")}
                                    controlId="formBasicCheckboxOne"
                                />
                                <SingleOption1
                                    option="B"
                                    status={
                                        questionData.answer.includes("B") ? true : questionData.attempt_answer == "B" ? false : null}
                                    showMessage={true}
                                    optionText={questionData != "" ? (this.parseFun(questionData.option2)) : ("")}
                                    controlId="formBasicCheckboxTwo" />
                                <SingleOption1
                                    option="C"
                                    status={
                                        questionData.answer.includes("C") ? true : questionData.attempt_answer == "C" ? false : null}
                                    optionText={questionData != "" ? (this.parseFun(questionData.option3)) : ("")}
                                    showMessage={true}
                                    controlId="formBasicCheckboxThree"
                                />
                                <SingleOption1
                                    option="D"
                                    status={
                                        questionData.answer.includes("D") ? true : questionData.attempt_answer == "D" ? false : null}
                                    showMessage={true}
                                    optionText={questionData != "" ? (this.parseFun(questionData.option4)) : ("")}
                                    controlId="formBasicCheckboxFour" />
                            </div>

                        </div>
                    </Col>)}

                    <Col xl={4} lg={4} md={12}>
                    <Card className="my-2">
                            <Card.Header className="bg-light">
                                <h6 className="card-title mb-0">QID</h6>
                            </Card.Header>
                            <Card.Body className="p-2" >
                                
                            {questionData.id}
                                
                            </Card.Body>
                        </Card>
                        <Card className="my-2">
                            <Card.Header className="bg-light">
                                <h6 className="card-title mb-0">Chapter Names</h6>
                            </Card.Header>
                            <Card.Body className="p-2" style={{ height: 150, overflowY: 'scroll' }}>
                                
                                    {setArrc.map((item) => {
                                        return (<div style={{textTransform:"uppercase",fontSize:12}}>{item}<br/></div>);
                                    })}
                                
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="bg-light">
                                <h6 className="card-title mb-0">Topic Names</h6>
                            </Card.Header>
                            <Card.Body className="p-2" style={{ height: 150, overflowY: 'scroll' }}>
                                
                                    {setArrt.map((item) => {
                                        return (<div style={{textTransform:"uppercase",fontSize:12}}>{item}<br/></div>);
                                    })}
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Alert variant="success" className="my-3 border-success">
                            <h5>Solution</h5>
                            <p>{this.parseFun(questionData.explanation)}</p>
                        </Alert>
                        {/* <Alert variant="success" className="my-3 border-success">
                            <h5>DEFINITION</h5>
                            <h6>Contributors to the study of cell</h6>
                            <p>The cell is the basic structural and functional unit of life. Anton Von Leeuwenhoek first saw and described a live cell. Robert Hooke first coined the term Cell after observing the compartments in the thin-sliced cork. Matthias Schleiden, a German botanist reported that all plants are composed of different kinds of cells which form the tissues of the plant. Theodore Schwann (1839), a British Zoologist proposed that; Cells have a thin layer (plasma membrane), Cell wall is unique to the plant cells and the bodies of animals and plants are composed of cells and products of cells. Schleiden and Schwann together formulated the cell theory but failed to explain as to how new cells were formed. Rudolf Virchow (1855) first explained that cells divide and new cells are formed from pre-existing cells (Omnis cellula-e cellula).</p>
                        </Alert> */}
                        {/* <Alert variant="info" className="mb-3 border-info">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Formula</h5>
                                <i className="fal fa-link" />
                            </div>
                            <p>Formula The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic. </p>
                            <p>The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                            <p> The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                        </Alert> */}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}


export default withRouter((CustomModalBody));
