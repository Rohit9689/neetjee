import React, { Component } from "react";
import { components } from "react-select";
import SingleCard from "./SingleCard";
import { Row, Form, Col, Card, Nav, Tab, Button, Media, Image, Dropdown } from "react-bootstrap";
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown";

import { Link } from "react-router-dom";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";

import TabpaneFour from "./TabpaneFour";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-6q0nyr-Svg"
        >
          <path
            fill="currentColor"
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
          ></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class GroupCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.CardsData,
      class: "",
      modalShow: false,
      userRestionModalShow: false,
      sorting:""
    };
  }
  sortingFun=(type)=>{
    this.setState({sorting:type});

  }
  idFunction(data) {
    console.log("idFunction");
    let id = parseInt(data + 1);
    return id;
  }
  defaultKey(index) {
    let remainder = index % 4;
    let returnValue = "";
    if (remainder == 0 || remainder == 4) {
      returnValue = "first";
    } else if (remainder == 1) {
      returnValue = "second";
    } else if (remainder == 2) {
      returnValue = "third";
    } else if (remainder == 3) {
      returnValue = "four";
    }
    return returnValue;
  }
  percentage(att, tot) {

    let per = 0;
    per = (parseInt(att) / parseInt(tot)) * 100;
    let retrunData = "";
    if (!isNaN(per)) {
      retrunData = Math.round(per);
    } else {
      retrunData = 0;
    }
    return retrunData;
  }
  defaultclassGetDataFunction(data) {
    let sarray = [];
    const obj1 = {
      value: 0,
      label: "ALL",
    };
    sarray.push(obj1);
    return sarray[0];
  }
  classGetDataFunction(data) {
    let sarray = [];
    const obj1 = {
      value: 0,
      label: "ALL",
    };
    for (let i = 0; i < data.length; i++) {
      let idata = data[i];
      const obj = {
        value: idata.id,
        label: idata.class,
      };
      sarray.push(obj);
    }
    sarray.push(obj1);
    return sarray;
  }
  handleInputChange = (name, value) => {
    this.setState({
      class: value,
    });
  };
  practiceModal = (getChapters) => {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if (getChapters.enabled == true) {
      if (isuserValid.lp_practice_exam == false) {
        this.setState({
          userRestionModalShow: false
        });
        localStorage.setItem("subjectid", this.props.history.location.state.subjectid);
        localStorage.setItem("type", "practice");
        localStorage.setItem("etype", this.props.history.location.state.chapter);
        localStorage.setItem("chapters", this.props.chapters);
        localStorage.setItem("ocid", getChapters.id);
        localStorage.setItem("otid", "0");
        localStorage.setItem("hchaptername", getChapters.chapter);
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

  };
  userRestrictionFun = (getChapters, index) => {
    if (getChapters.enabled == true) {
      
      const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
      if (isuserValid.lp_topics == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/topics",
          state: {
            otid: "0",
            ocid: getChapters.id,
            subjectid: this.props.chapters.subjectid,
            topics: getChapters.topics,
            chapters: this.props.chapters,
            chapters1: getChapters.topics,
            chapterid: this.idFunction(index),
            chapter: getChapters.chapter,
            htitle: "Topics",
            htitlecount: getChapters.topics.length,
            totquestions: this.props.chapters.totquestions,
          }
        });
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
  gotoDashboard = (getChapters, index) => {
    console.log("getChapters.enabled", getChapters.enabled);
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if (getChapters.enabled == true) {
      if (isuserValid.lp_chapter_dashboard == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/chapter-status",
          state: {
            subjectid: this.props.chapters.subjectid,
            chapterid: this.idFunction(index),
            chapter: getChapters.chapter,
            topicid: "",
            topic: "",
            ocid: getChapters.id,
            otid: "0",
            chapters: this.props.chapters,
            learning: {
              subjectid: this.props.chapters.subjectid,
              hname: "Chapter",
              chapterid: this.idFunction(index),
              chapter: getChapters.chapter,
              ocid: getChapters.id,
              otid: "0",
              chapters: this.props.chapters,
            },
            practice: {
              etype: "chapter",
              chapters: this.props.chapters,
              ocid: getChapters.id,
              otid: "0",
              hchaptername: getChapters.chapter,
              subjectid: this.props.chapters.subjectid
            },

            wrong: {
              etype: "chapter",
              chapters: this.props.chapters,
              subjectid: this.props.chapters.subjectid,
              hchaptername: getChapters.chapter,
              hname: "Chapter",
              chapterid: this.idFunction(index),
              chapter: getChapters.chapter,
              ocid: getChapters.id,
              otid: "0",
            },
          }
        });
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
  learningFun = (getChapters, index) => {
    const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
    if (getChapters.enabled == true) {
      if (isuserValid.lp_custom_content == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/start-learning",
          state: {
            subjectid: this.props.chapters.subjectid,
            hname: "Chapter",
            chapterid: this.idFunction(index),
            chapter: getChapters.chapter,
            topicid: "",
            topic: "",
            ocid: getChapters.id,
            otid: "0",
            chapters: this.props.chapters
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
    if (this.props.chapters == undefined) {
      this.props.history.push("/student/learn-practice");
    }
    let studentglobals = "";
    if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
      studentglobals = JSON.parse(localStorage.getItem("studentglobals"));
    }
    else {
      this.props.history.push("/student/login");
    }

    let globalsubjects = "";
    if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
        globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
    }
    else {
        this.props.history.push("/student/login");
    }
    let subjetsobj = globalsubjects.find((a) => a.id == this.props.chapters.subjectid);

    let chapters
    if(this.state.class!=""){
      chapters = subjetsobj.studentChapters.filter((a) => a.class == this.state.class);
      if(this.state.sorting!=""){
        if(this.state.sorting=="tasc"){
          chapters= chapters.sort((a, b) => {

            if ( a.chapter < b.chapter ){
              return -1;
            }
            if ( a.chapter > b.chapter ){
              return 1;
            }
            return 0;

           })
   

        }
        else if(this.state.sorting=="tdsc"){
          chapters= chapters.sort((a, b) => {

            if ( a.chapter > b.chapter ){
              return -1;
            }
            if ( a.chapter < b.chapter ){
              return 1;
            }
            return 0;

           })
        }
        else if(this.state.sorting=="pdsc"){
          chapters= chapters.map((item)=>{
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return{...item, lpp:retrunData}
           });
          chapters= chapters.sort((a, b) => {
            return b.lpp-a.lpp
            
         })
          

        }
        else if(this.state.sorting=="pasc"){
          chapters= chapters.map((item)=>{
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return{...item, lpp:retrunData}
           });
          chapters= chapters.sort((a, b) => {
            return a.lpp-b.lpp
            
         })
        }
        else if(this.state.sorting=="wdsc"){
          chapters= chapters.sort((a, b) => {
            return b.error_questions-a.error_questions
            
         })
        }
        else if(this.state.sorting=="wasc"){
          chapters= chapters.sort((a, b) => {
            return a.error_questions-b.error_questions
            
         })
        }

      }
      
      
    }else{
      chapters = chapters=this.props.chapters.chapters1;
      if(this.state.sorting!=""){
        if(this.state.sorting=="tasc"){
          chapters= chapters.sort((a, b) => {

            if ( a.chapter < b.chapter ){
              return -1;
            }
            if ( a.chapter > b.chapter ){
              return 1;
            }
            return 0;

           })
   

        }
        else if(this.state.sorting=="tdsc"){
          chapters= chapters.sort((a, b) => {

            if ( a.chapter > b.chapter ){
              return -1;
            }
            if ( a.chapter < b.chapter ){
              return 1;
            }
            return 0;

           })
        }
        else if(this.state.sorting=="pdsc"){
          chapters= chapters.map((item)=>{
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return{...item, lpp:retrunData}
           });
          chapters= chapters.sort((a, b) => {
            return b.lpp-a.lpp
            
         })
          

        }
        else if(this.state.sorting=="pasc"){
          chapters= chapters.map((item)=>{
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return{...item, lpp:retrunData}
           });
          chapters= chapters.sort((a, b) => {
            return a.lpp-b.lpp
            
         })
        }
        else if(this.state.sorting=="wdsc"){
          chapters= chapters.sort((a, b) => {
            return b.error_questions-a.error_questions
            
         })
        }
        else if(this.state.sorting=="wasc"){
          chapters= chapters.sort((a, b) => {
            return a.error_questions-b.error_questions
            
         })
        }

      }
        
      
      
      
    }
    

    return (
      <div className="cardrows my-2">
        <Row className="align-items-center">
          <Col xl={4} lg={4} md={12}>
            <div className="title my-3">
              <h5 className="mb-0">Learn &amp; Practice 
              {/* {this.props.chapters.subject} */}
              </h5>
              <p>Select Chapter to start learning and practice</p>
            </div>
          </Col>
          <Col xl={{ span: 3, offset: 5 }} lg={{ span: 3, offset: 5 }} md={12}>
            <div className="d-flex align-items-center">
              <Form.Group
                className="flex-row align-items-center card px-2 py-1 mb-0"
                controlId="selectClass"
              >
                <Form.Label className="text-uppercase mb-0">class</Form.Label>
                <div className="ml-2" style={{ width: 130 }}>
                  <SelectDropDown
                    handleChange={this.handleInputChange}
                    name="class"
                    options={this.classGetDataFunction(
                      studentglobals.classes
                    )}
                    placeholderName={"Select Class"}
                    dropdownIndicator={{ DropdownIndicator }}
                    defaultValue={this.defaultclassGetDataFunction(
                      studentglobals.classes
                    )}
                  />
                </div>
              </Form.Group>
              <Dropdown className="sortingDropdown">
                <Dropdown.Toggle className="ml-2" id="dropdown-basic">
                  <i className="fa fa-sort py-2"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                  <Dropdown.Header className="text-uppercase">Chapter Sorting</Dropdown.Header>
                  <div className="d-flex align-items-center">
                    <Dropdown.Item eventKey="1" onClick={() => this.sortingFun("tasc")}><i className="fas fa-sort-amount-up-alt" /><span> A-Z</span></Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.sortingFun("tdsc")}><i className="fas fa-sort-amount-down-alt" /><span> Z-A</span></Dropdown.Item>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Practice Accuracy</Dropdown.Header>
                  <Dropdown.Item eventKey="3" onClick={() => this.sortingFun("pdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={() => this.sortingFun("pasc")}>Low to High</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Pending Errors</Dropdown.Header>
                  <Dropdown.Item eventKey="5" onClick={() => this.sortingFun("wdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="6" onClick={() => this.sortingFun("wasc")}>Low to High</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Button variant="btn btn-darkblue ml-3 px-4" onClick={() => this.setState({ modalShow: true })}>Buy This Subject video</Button> */}
            </div>
          </Col>
        </Row>
        
        <Row>
          {chapters.map((getChapters, index) =>{
            return(
              <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
              <Card className="subject-card border-0 h-100 card">
                <Card.Body className="p-2">
                  <a
                    onClick={() => this.userRestrictionFun(getChapters, index)}
                    title="go to topic"
                  >
                    <Media className="p-2">
                      <div className="counter">{this.idFunction(index)}</div>
                      <Media.Body className="ml-2 text-uppercase">
                        <h6 className="title mb-0">{getChapters.chapter}</h6>
                        <p className="mb-0">
                          {" "}
                          Topics: <span>{getChapters.topics.length}</span>{" "}
                        </p>
                      </Media.Body>
                    </Media>
                  </a>
                  <Tab.Container id="subject-tabs" defaultActiveKey="first">
                    <Nav variant="pills nav-fill" className="flex-row mt-2">
                      <Nav.Item className="graph">
                        <Nav.Link title="Chapter Dashboard" eventKey="first">
                          <i className="fal fa-chart-line" />
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="learn">
                        <Nav.Link title="Short notes &amp; Revision Materials" eventKey="second">
                          <i className="fal fa-book-reader" />
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="practice">
                        <Nav.Link title="Practice Test" eventKey="third">
                          <i className="fal fa-file-invoice mr-2" />{" "}
                          <span>
                            {this.percentage(
                              getChapters.attempted_questions,
                              getChapters.total_questions
                            )}
                            %
                        </span>
                        </Nav.Link>
                      </Nav.Item>
  
                      <Nav.Item className="error">
                        <Nav.Link title="Error Test" eventKey="four">
                          <i className="fal fa-file-search mr-2" />{" "}
                          <span>
                          {getChapters.error_questions}
                            </span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="content">
                          {/* <h6 className="mb-0">Dashboard</h6> */}
                          <div className="border_pad mt-2">
                            <p className="mb-1">
                              </p>
                            <AreaChart
                              subject={this.props.chapters.subjectid}
                              chapter={getChapters.id}
                              topic="0"
                            />
                          </div>
                        </div>
                        {getChapters.enabled == true ? (
                          <div className="card-bottom dashboard">
  
                            <a
                              onClick={() => this.gotoDashboard(getChapters, index)}
                              title="Go To Dashboard"
                            >
                              Go To Dashboard
                        </a>
                          </div>
                        ) : (<div className="card-bottom dashboard">
                          <a
                            style={{ opacity: "0.1" }}
                            onClick={() => this.gotoDashboard(getChapters, index)}
                            title="Go To Dashboard"
                          >
                            Go To Dashboard
                     </a >
                        </div>)}
  
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="content">
                          {/* <h6 className="mb-0">Short Notes &amp; Revision Materials</h6> */}
                          <div className="card-box d-flex p-1">
                            {Cookies.get("videos") == true ? (
                              <Card className="border-primary w-100">
                                <Card.Body className="p-2">
                                  <div className="d-flex align-items-center">
                                    <i className="text-primary fad fa-video fa-fw fa-2x mr-1" />
                                    <span>Videos</span>
                                  </div>
                                  <p>{this.props.availableVideos}</p>
                                </Card.Body>
                                <Card.Footer className="p-1">
                                  <a
                                    title="Watching"
  
                                    to={{
                                      pathname: "/student/subject/start-watching",
                                      state: {
                                        hname: "Chapter",
                                        chapterid: this.idFunction(index),
                                        chapter: getChapters.chapter,
                                        topicid: "",
                                        topic: "",
                                        ocid: getChapters.id,
                                        otid: "0",
                                        last_attempted_chapter: this.props.chapters
                                          .last_attempted_chapter,
                                        last_attempted_chaptername: this.props
                                          .chapters.last_attempted_chaptername,
                                        last_timestamp: this.props.chapters
                                          .last_timestamp,
                                        accuracy: this.props.chapters.accuracy,
                                      },
                                    }}
                                  >
                                    {" "}
                                    Watching{" "}
                                    <i className="ml-2 fal fa-long-arrow-right" />
                                  </a>
                                </Card.Footer>
                              </Card>
                            ) : (
                                ""
                              )}
  
                            <Card className="border-success w-100 ml-2">
                              <Card.Body className="p-2">
                                <div className="d-flex align-items-center">
                                  <i className="text-success fad fa-clipboard fa-fw fa-2x mr-1" />
                                  <span>Short Notes &amp; Revision Materials</span>
                                </div>
                                <p>{this.props.availableMaterial}</p>
                              </Card.Body>
  
                              {getChapters.enabled == true ? (<Card.Footer className="p-1">
                                <a
                                 style={{ fontWeight:"bold" }}
                                  title="Learning"
                                  onClick={() => this.learningFun(getChapters, index)}
                                >
                                  Start Learning{" "}
                                  <i className="ml-2 fal fa-long-arrow-right" />
                                </a>
                              </Card.Footer>) : (<Card.Footer className="p-1">
                                <a
                                  style={{ opacity: "0.1" , fontWeight:"bold"}}
                                  onClick={() => this.learningFun(getChapters, index)}
                                 title="Learning"
                                >
                                  Start Learning{" "}
                                  <i className="ml-2 fal fa-long-arrow-right" />
                                </a>
                              </Card.Footer>)}
                            </Card>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="content">
                          {/* <h6 className="mb-0">Practice</h6> */}
                          <div className="border_pad mt-2">
                            {getChapters.total_questions > 0 ? (
                              <React.Fragment>
                                <p className="text-danger mb-1">
                                  Attempted Questions:{" "}
                                  {getChapters.attempted_questions}
                                </p>
                                <p className="text-danger mb-1">
                                  Wrong Answered:{" "}
                                  {getChapters.practice_wrong_answered}
                                </p>
                                <div className="mt-2 right-answer">
                                  Correct Answered:{" "}
                                  {parseInt(getChapters.attempted_questions - getChapters.practice_wrong_answered)}
                                </div>
                              </React.Fragment>
                            )
                              : ""}
                          </div>
                        </div>
  
  
                        {getChapters.enabled == true ? (
                          <div className="card-bottom practice">
                            {getChapters.total_questions > 0 ? (
                              <a
                                title="Start Practice"
                                onClick={(e) => this.practiceModal(getChapters)}
                              >
                                Start Practice
                          </a>
                            ) : (
                                "NO QUESTIONS AVAILABLE"
                              )}
                          </div>
                        ) : (<div className="card-bottom practice">
  
                          <a
                            style={{ opacity: "0.1" }}
                            onClick={(e) => this.practiceModal(getChapters)}
                            title="Start Practice"
  
                          >
                            Start Practice
                      </a>
  
                        </div>)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="four">
                        <TabpaneFour
                          enabled={getChapters.enabled}
                          error_questions={getChapters.error_questions}
                          etype="chapter"
                          chapters={this.props.chapters}
                          subjectid={this.props.chapters.subjectid}
                          hchaptername={getChapters.chapter}
                          hname="Chapter"
                          chapterid={this.idFunction(index)}
                          chapter={getChapters.chapter}
                          ocid={getChapters.id}
                          otid="0"
                          isuserValid={JSON.parse(this.props.isStudentUserValid.user_access_restictions).lp_error_exam}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
            )
          })}
        </Row>

        <ImportentAlert
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <UserRestrictionAlert
          show={this.state.userRestionModalShow}
          onHide={() => this.setState({ userRestionModalShow: false })}
        />
      </div>
    );
  }
}

export default withRouter((GroupCards));
