import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Alert,
  Card,
  Form,
  Modal,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { components } from "react-select";
import Select from "react-select";
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown";
import parse, { domToReact } from "html-react-parser";

import "../_preexam.scss";
import "../../learn_practice/start_error_exam/start_error_page/_errorexam.scss";
import SingleOption from "../../learn_practice/start_error_exam/start_error_page/SingleOption";
import SingleOption1 from "../../learn_practice/start_error_exam/start_error_page/SingleOption1";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import { withApollo } from "@apollo/client/react/hoc";

class StudentAssistentExamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerreloader: "0",
    };
  }
  idFunction(data) {
    console.log("idFunctionidFunction", data);
    let id = parseInt(data + 1);
    return id;
  }
  minutesTimer = (data) => {
    var date = new Date(data * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    var t = hh + ":" + mm + ":" + ss;
    return t;
  };

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
      console.log("isValidJSONtrue");
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
  onScrollgetQuestionById = async (e) => {
    console.log("onScrollgetQuestionById");
    this.setState({
      innerreloader: "1"
    });
    const result = await this.props.client.query({
      query: gql` 
            query(
                $question_id: Int, 
                
                ) {
                    getQuestionById(
                    question_id: $question_id
                    )
                    {
                        id
                        question
                        option1
                        option2
                        option3
                        option4
                        
                        list1type
                        list2type
                        mat_question
                        
                        inputquestion
                        compquestion
                        
                    
                }
            }
        `,
      variables: {

        question_id: parseInt(this.props.stateData.questions[this.props.stateData.index].id)

      },
    })
    console.log("senddata",
      "question_id:", parseInt(this.props.stateData.questions[this.props.stateData.index].id)
    );

    console.log("newstyledata1234", result.data.getQuestionById);
    this.setState({ innerreloader: "0" });
    this.props.parentonScrollgetQuestionById(result.data.getQuestionById);

  }
  render() {
    const lqlength = this.props.stateData.questions.length - 1;
    // let question = "";
    // console.log("latest", this.props.stateData.index);
    // if (this.props.stateData.questions.length>0) {
    //    if (
    //     this.props.stateData.questions[this.props.stateData.index].qtype ==
    //       "9" ||
    //     this.props.stateData.questions[this.props.stateData.index].qtype == "3"
    //   ) {
    //     let question1 = this.props.stateData.questions[
    //       this.props.stateData.index
    //     ].question.replace(/src="/g, 'src=\\"');
    //     let question2 = question1.replace(/" \/>/g, '\\" />');
    //     question = JSON.parse(question2);

    //   }
    // }
    return (
      <React.Fragment>
        {this.props.stateData.questions.length > 0 ? (
          <div className="error_exam_block py-3">
            <Row>
              <Col
                xl={2}
                lg={{ span: 2, order: 1 }}
                md={{ span: 6, order: 1 }}
                sm={{ span: 12, order: 1 }}
                xs={{ span: 12, order: 1 }}
              >
                <div className="time-spent my-2">
                  <span style={{ fontSize: 14 }}>QID-{this.props.stateData.questions[
                    this.props.stateData.index
                  ].id}</span>

                  <br /><br />
                  <h6>Time spent  <br />in this question</h6>

                  {this.props.stateData.questions.length > 0 ? (
                    <i className="fal fa-clock">
                      {" "}
                      <span className="countdown-time" style={{ fontSize: 18 }}>
                        {this.minutesTimer(
                          this.props.stateData.questions[
                            this.props.stateData.index
                          ].timer
                        )}
                      </span>
                    </i>
                  ) : (
                      ""
                    )}
                </div>
              </Col>
              {this.props.stateData.questions[this.props.stateData.index]
                .qtype == "9" ||
                this.props.stateData.questions[this.props.stateData.index]
                  .qtype == "3" ? (
                  <Col
                    xl={{ span: 8, order: 2 }}
                    lg={{ span: 8, order: 2 }}
                    md={{ span: 12, order: 3 }}
                    sm={{ span: 12, order: 3 }}
                    xs={{ span: 12, order: 3 }}
                  >
                    <div className="question_area my-2">
                      <div className="q_Name">
                        <span className="q_No">
                          {this.idFunction(this.props.stateData.index)}.
                      </span>
                        {parse(
                          this.props.stateData.questions[
                            this.props.stateData.index
                          ].mat_question
                        )}
                        <br />
                        {this.state.innerreloader == "1" || this.props.stateData.reloader == "2" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e)} className="fa fa-repeat"> <span >Reload</span></i></a><br />

                          <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                        {this.props.stateData.reloader == "1" ? (
                          <div className="text-success">Question reloaded</div>
                        ) : ("")}
                        {this.props.stateData.questions.length > 0 ? (
                          // <Row>
                          //   <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                          //     <h5 className="list-title">List 1</h5>
                          //     <ol
                          //       type={
                          //         this.props.stateData.questions[
                          //           this.props.stateData.index
                          //         ].list1type == "alphabets"
                          //           ? "A"
                          //           : this.props.stateData.questions[
                          //               this.props.stateData.index
                          //             ].list1type == "numbers"
                          //           ? "1"
                          //           : "roman"
                          //       }
                          //     >
                          //       {question.map((item) => (
                          //         <li>{parse(item.qlist1)}</li>
                          //       ))}
                          //     </ol>
                          //   </Col>
                          //   <Col xl={6} lg={6} md={6} sm={12} className="my-2">
                          //     <h5 className="list-title">List 2</h5>
                          //     <ol
                          //       type={
                          //         this.props.stateData.questions[
                          //           this.props.stateData.index
                          //         ].list2type == "alphabets"
                          //           ? "A"
                          //           : this.props.stateData.questions[
                          //               this.props.stateData.index
                          //             ].list2type == "numbers"
                          //           ? "1"
                          //           : "roman"
                          //       }
                          //     >
                          //       {question.map((item) => (
                          //         <li>{parse(item.qlist2)}</li>
                          //       ))}
                          //     </ol>
                          //   </Col>
                          // </Row>
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
                        ) : (
                            ""
                          )}
                      </div>
                      {this.props.stateData.questions[this.props.stateData.index].answer.split(",").filter((a)=>a!="").length > 1 ? (
                        <div className="q_options mt-4">
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="A"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option1
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxOne"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="B"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option2
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxTwo"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="C"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option3
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxThree"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="D"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option4
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxFour"
                          />
                        </div>
                      ) : (
                          <div className="q_options mt-4">
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="A"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "A"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option1
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxOne"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="B"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "B"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option2
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxTwo"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="C"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "C"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option3
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxThree"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="D"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "D"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option4
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxFour"
                            />
                          </div>
                        )}

                    </div>
                  </Col>
                ) : this.props.stateData.questions[this.props.stateData.index]
                  .qtype == "8" ? (
                    <Col
                      xl={{ span: 8, order: 2 }}
                      lg={{ span: 8, order: 2 }}
                      md={{ span: 12, order: 3 }}
                      sm={{ span: 12, order: 3 }}
                      xs={{ span: 12, order: 3 }}
                    >
                      <div className="question_area my-2">
                        <div className="q_Name">
                          <span className="q_No">
                            {this.idFunction(this.props.stateData.index)}
                          </span>
                          {this.props.stateData.questions.length > 0
                            ? parse(
                              this.props.stateData.questions[
                                this.props.stateData.index
                              ].question
                            )
                            : ""}
                          <br />
                          {this.state.innerreloader == "1" || this.props.stateData.reloader == "2" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e)} className="fa fa-repeat"> <span >Reload</span></i></a><br />

                            <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                          {this.props.stateData.reloader == "1" ? (
                            <div className="text-success">Question reloaded</div>
                          ) : ("")}
                        </div>

                        <Form>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control
                              type="text"
                              placeholder="Enter text"
                              name="integer"
                              //value=""
                              value={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted != null
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].attempted
                                  : ""
                              }
                              onChange={this.props.handleIntegerInputChange}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </Col>
                  ) : this.props.stateData.questions[this.props.stateData.index]
                    .qtype == "5" ? (
                      <Col
                        xl={{ span: 8, order: 2 }}
                        lg={{ span: 8, order: 2 }}
                        md={{ span: 12, order: 3 }}
                        sm={{ span: 12, order: 3 }}
                        xs={{ span: 12, order: 3 }}
                      >
                        <div className="question_area my-2">
                          {/* <Card className="p-3 mb-2 Qparagraph ">
                      <Card.Text className="text-justify">
                        {parse(
                          this.props.stateData.questions[
                            this.props.stateData.index
                          ].compquestion
                        )}
                      </Card.Text>
                    </Card> */}
                          {this.props.stateData.questions[this.props.stateData.index].compquestion != undefined ? (
                            <Card className="p-3 mb-2 Qparagraph ">
                              <Card.Text className="text-justify">{this.parseFun(this.props.stateData.questions[this.props.stateData.index].compquestion)}</Card.Text>
                            </Card>
                          ) : ("")}

                          <div className="q_Name">
                            <span className="q_No">
                              {this.idFunction(this.props.stateData.index)}
                            </span>
                            {this.props.stateData.questions.length > 0
                              ? parse(
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].question
                              )
                              : ""}
                            <br />
                            {this.state.innerreloader == "1" || this.props.stateData.reloader == "2" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e)} className="fa fa-repeat"> <span >Reload</span></i></a><br />

                              <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                            {this.props.stateData.reloader == "1" ? (
                              <div className="text-success">Question reloaded</div>
                            ) : ("")}
                          </div>
                          {this.props.stateData.questions[this.props.stateData.index].answer.split(",").filter((a)=>a!="").length > 1 ? (
                        <div className="q_options mt-4">
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="A"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option1
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxOne"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="B"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option2
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxTwo"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="C"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option3
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxThree"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="D"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option4
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxFour"
                          />
                        </div>
                      ) : (
                          <div className="q_options mt-4">
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="A"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "A"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option1
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxOne"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="B"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "B"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option2
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxTwo"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="C"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "C"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option3
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxThree"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="D"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "D"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option4
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxFour"
                            />
                          </div>)}
                        </div>
                      </Col>
                    ) : (
                      <Col
                        xl={{ span: 8, order: 2 }}
                        lg={{ span: 8, order: 2 }}
                        md={{ span: 12, order: 3 }}
                        sm={{ span: 12, order: 3 }}
                        xs={{ span: 12, order: 3 }}
                      >
                        <div className="question_area my-2">
                          <div className="q_Name">
                            <span className="q_No">
                              {this.idFunction(this.props.stateData.index)}
                            </span>
                            {this.props.stateData.questions.length > 0
                              ? parse(
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].question
                              )
                              : ""}

                            <br />
                            {this.state.innerreloader == "1" || this.props.stateData.reloader == "2" ? (<div className="text-primary">Reloading</div>) : (<div style={{ color: "#ff0000" }}><a><i onClick={(e) => this.onScrollgetQuestionById(e)} className="fa fa-repeat"> <span >Reload</span></i></a><br />

                              <small style={{ color: "#2a346c", fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;*Note: If you are unable to view the question properly,  click on Reload to refresh the Question</small></div>)}
                            {this.props.stateData.reloader == "1" ? (
                              <div className="text-success">Question reloaded</div>
                            ) : ("")}
                          </div>
                          {this.props.stateData.questions[this.props.stateData.index].answer.split(",").filter((a)=>a!="").length > 1 ? (
                        <div className="q_options mt-4">
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="A"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('A') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option1
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxOne"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="B"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('B') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option2
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxTwo"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="C"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('C') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option3
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxThree"
                          />
                          <SingleOption
                            question={
                              this.props.stateData.questions.length > 0
                                ? this.props.stateData.questions[
                                  this.props.stateData.index
                                ].id
                                : ""
                            }
                            option="D"
                            status={this.props.stateData.questions[this.props.stateData.index].attempted != null ? (this.props.stateData.questions[this.props.stateData.index].attempted.split(",").includes('D') ? true : "") : ""}
                            ParenthandleInputChange={this.props.ParenthandleInputChange2}
                            optionText={
                              this.props.stateData.questions.length > 0
                                ? this.parseFun(
                                  this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].option4
                                )
                                : ""
                            }
                            controlId="formBasicCheckboxFour"
                          />
                        </div>
                      ) : (
                          <div className="q_options mt-4">
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="A"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "A"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option1
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxOne"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="B"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "B"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option2
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxTwo"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="C"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "C"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option3
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxThree"
                            />
                            <SingleOption
                              question={
                                this.props.stateData.questions.length > 0
                                  ? this.props.stateData.questions[
                                    this.props.stateData.index
                                  ].id
                                  : ""
                              }
                              option="D"
                              status={
                                this.props.stateData.questions[
                                  this.props.stateData.index
                                ].attempted === "D"
                                  ? true
                                  : null
                              }
                              ParenthandleInputChange={
                                this.props.ParenthandleInputChange
                              }
                              optionText={
                                this.props.stateData.questions.length > 0
                                  ? this.parseFun(
                                    this.props.stateData.questions[
                                      this.props.stateData.index
                                    ].option4
                                  )
                                  : ""
                              }
                              controlId="formBasicCheckboxFour"
                            />
                          </div>)}
                        </div>
                      </Col>
                    )}
            </Row>

            {!this.props.stateData.isSubmitted ? (
              <Row className="text-center mt-3">
                <Col
                  xl={{ span: 10, offset: 1 }}
                  lg={{ span: 10, offset: 1 }}
                  md={12}
                  sm={12}
                  xs={12}
                  className="paginations-btns"
                >
                  <div className="fixed-bottom bg-white py-2">
                    {this.props.stateData.index != lqlength ? (
                      <React.Fragment>
                        {this.props.stateData.nextsubject != "1" ? (
                          <React.Fragment>
                            {this.state.innerreloader=="0"?(
                              <Button
                              variant="outline-secondary"
                              className="px-5 m-2"
                              onClick={this.props.Pskip}
                            >
                              Skip
                            </Button>
                            ):(
                              <Button
                            variant="outline-secondary"
                            className="px-5 m-2"
                            disabled
                          >
                            Skip
                          </Button>
                            )}
                          </React.Fragment>
                          
                        ) : (
                            ""
                          )}
                      </React.Fragment>
                    ) : (
                        ""
                      )}
                    {this.props.stateData.index != lqlength ? (
                      <React.Fragment>
                        {this.props.stateData.nextsubject != "1" ? (
                          <React.Fragment>
                          {this.state.innerreloader=="0"?(
                            <Button
                            variant="outline-success"
                            className="px-5 m-2"
                            onClick={this.props.PnextQuestionfunction}
                          >
                            Save And Next Question
                          </Button>
                          ):(
                            <Button
                            disabled
                            variant="outline-success"
                            className="px-5 m-2"
                            
                          >
                            Save And Next Question
                          </Button>
                          )}</React.Fragment>
                          
                        ) : (
                          <React.Fragment>
                            {this.state.innerreloader=="0"?(
                              <Button
                              variant="outline-success"
                              className="px-5 m-2"
                              onClick={this.props.SaveFunction}
                            >
                              Save
                            </Button>
                            ):(
                              <Button
                              disabled
                              variant="outline-success"
                              className="px-5 m-2"
                              
                            >
                              Save
                            </Button>
                            )}
                          </React.Fragment>
                            
                          )}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.innerreloader=="0"?(
                          <React.Fragment>
                          <Button
                            variant="outline-success"
                            className="px-5 m-2"
                            onClick={this.props.ParenthandleFormSubmit}
                          >
                            Complete Exam
                      </Button>
                          <small style={{ color: "#2a346c", fontWeight: "bold" }}><br />*Note: Complete Exam and Submit your details in the next page to get your Self Assessment Report</small>
                        </React.Fragment>
                        ):(
                          <React.Fragment>
                          <Button
                            variant="outline-success"
                            className="px-5 m-2"
                            disabled
                           >
                            Complete Exam
                      </Button>
                          <small style={{ color: "#2a346c", fontWeight: "bold" }}><br />*Note: Complete Exam and Submit your details in the next page to get your Self Assessment Report</small>
                        </React.Fragment>
                        )}
                      </React.Fragment>
                        

                      )}
                  </div>
                </Col>
              </Row>
            ) : (
                ""
              )}
          </div>
        ) : (
            <div className="text-center pt-5">
              <span className="text-danger">No Data Available</span>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default withRouter(withApollo(StudentAssistentExamSection));
