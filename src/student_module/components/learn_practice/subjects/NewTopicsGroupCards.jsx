import React, { Component } from "react";
import { Row, Col, Card, Nav, Tab, Dropdown } from "react-bootstrap";
import AreaChart from "./AreaChart";
import TabpaneFour from "./TabpaneFour";
import { Link, withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

class NewTopicsGroupCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.CardsData,
      class: "",
      modalShow: false,
      userRestionModalShow: false,
      sorting: ""
    };
  }
  sortingFun = (type) => {
    this.setState({ sorting: type });

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
    if (retrunData > 100) {
      return 100;
    }
    else {
      return retrunData;
    }

  }

  practiceModal = (getTopics, isuserValid, moduleValid, isStudentUserValid) => {

    if ((getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString())) {
      if (isuserValid.lp_topics_practice_exam == false) {
        this.setState({
          userRestionModalShow: false
        });
        localStorage.setItem("subjectid", getTopics.subject);
        localStorage.setItem("type", "practice");
        //localStorage.setItem("ocid", "0");
        localStorage.setItem("ocid", getTopics.chapter);
        localStorage.setItem("otid", getTopics.id);
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

  gotoDashboard = (getTopics, index, isuserValid, moduleValid, isStudentUserValid) => {

    if ((getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString())) {
      if (isuserValid.lp_topic_dashboard == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/chapter-status",
          state: {
            subjectid: getTopics.subject,

            ocid: getTopics.chapter,
            otid: getTopics.id,

            learning: {
              ocid: "0",
              otid: getTopics.id,
              subjectid: getTopics.subject
            },
            practice: {
              ocid: getTopics.chapter,
              otid: getTopics.id,
              subjectid: getTopics.subject
            },

            wrong: {
              subjectid: getTopics.subject,
              ocid: getTopics.chapter,
              otid: getTopics.id

            }
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
  learningFun = (getTopics, index, isuserValid, moduleValid, isStudentUserValid) => {

    if ((getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString())) {
      if (isuserValid.lp_topic_custom_content == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/start-learning",
          state: {
            subjectid: getTopics.subject,
            ocid: getTopics.chapter,
            otid: getTopics.id
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
    if (this.props.getTopics == undefined) {
      this.props.history.push("/student/learn-practice");
    }
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

    let topics = this.props.getTopics;
    if (this.state.sorting != "") {
      if (this.state.sorting == "tasc") {
        topics = topics.sort((a, b) => {

          if (a.topic < b.topic) {
            return -1;
          }
          if (a.topic > b.topic) {
            return 1;
          }
          return 0;

        })


      }
      else if (this.state.sorting == "tdsc") {
        topics = topics.sort((a, b) => {

          if (a.topic > b.topic) {
            return -1;
          }
          if (a.topic < b.topic) {
            return 1;
          }
          return 0;

        })
      }
      else if (this.state.sorting == "pdsc") {
        topics = topics.map((item) => {
          let per = 0;
          per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
          let retrunData = "";
          if (!isNaN(per)) {
            retrunData = Math.round(per);
          } else {
            retrunData = 0;
          }
          return { ...item, lpp: retrunData }
        });
        topics = topics.sort((a, b) => {
          return b.lpp - a.lpp

        })


      }
      else if (this.state.sorting == "pasc") {
        topics = topics.map((item) => {
          let per = 0;
          per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
          let retrunData = "";
          if (!isNaN(per)) {
            retrunData = Math.round(per);
          } else {
            retrunData = 0;
          }
          return { ...item, lpp: retrunData }
        });
        topics = topics.sort((a, b) => {
          return a.lpp - b.lpp

        })
      }
      else if (this.state.sorting == "wdsc") {
        topics = topics.sort((a, b) => {
          return b.error_questions - a.error_questions

        })
      }
      else if (this.state.sorting == "wasc") {
        topics = topics.sort((a, b) => {
          return a.error_questions - b.error_questions

        })
      }

    }
    return (
      <div className="cardrows my-2">
        <Row className="align-items-center">
          <Col xl={4} lg={4} md={12}>
            <div className="title my-3">
              <h5 className="mb-0">Learn &amp; Practise
                {/* {this.props.getTopics[0].subject_name} */}
              </h5>
              <p>Select Topic to Begin</p>
            </div>
          </Col>
          <Col xl={{ span: 3, offset: 5 }} lg={{ span: 3, offset: 5 }} md={12}>
            <div className="d-flex align-items-center justify-content-end">
              <Dropdown className="sortingDropdown">
                <Dropdown.Toggle className="ml-2" id="dropdown-basic">
                  <i className="fa fa-sort py-2"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                  <Dropdown.Header className="text-uppercase">Topic Sorting</Dropdown.Header>
                  <div className="d-flex align-items-center">
                    <Dropdown.Item eventKey="1" onClick={() => this.sortingFun("tasc")}><i className="fas fa-sort-amount-up-alt" /><span> A-Z</span></Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.sortingFun("tdsc")}><i className="fas fa-sort-amount-down-alt" /><span> Z-A</span></Dropdown.Item>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Practise Accuracy</Dropdown.Header>
                  <Dropdown.Item eventKey="3" onClick={() => this.sortingFun("pdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={() => this.sortingFun("pasc")}>Low to High</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Pending Errors</Dropdown.Header>
                  <Dropdown.Item eventKey="5" onClick={() => this.sortingFun("wdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="6" onClick={() => this.sortingFun("wasc")}>Low to High</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Link to={{
                pathname:"/student/subject/start-watching",
                state: {
                  otid: "0",
                  ocid: this.props.getChapters.ocid,
                  subjectid: this.props.getChapters.subjectid,
                }
              }}
              className="btn btn-darkblue ml-3 px-4 text-white">videos</Link> */}
            </div>
          </Col>
        </Row>
        <Row>
          {topics.map((getTopics, index) => {
            return (
              <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                <Card className="subject-card border-0 h-100 card">
                  <Card.Header className="bg-white border-0 p-2">
                    <div className="p-2 d-flex">
                      <div className="counter">{this.idFunction(index)}</div>
                      <div className="ml-2 text-uppercase">
                        <h6 className="title mb-0">{getTopics.topic}</h6>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">


                    <Tab.Container id="subject-tabs" defaultActiveKey="first">
                      <Nav variant="pills nav-fill" className="flex-row mt-2 px-2">
                        <Nav.Item className="graph">
                          <Nav.Link title="Topic Dashboard" eventKey="first">
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
                                getTopics.attempted_questions,
                                getTopics.total_questions
                              )}
                              %
                            </span>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="error">
                          <Nav.Link title="Error Test" eventKey="four">
                            <i className="fal fa-file-search mr-2" />{" "}
                            <span>
                              {getTopics.error_questions}
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <div className="content p-2">
                            {/* <h6 className="mb-0">Dashboard</h6> */}
                            <div className="border_pad mt-2">
                              <p className="mb-1">
                              </p>
                              <AreaChart
                                graph={getTopics.graph}
                                subject={getTopics.subject}
                                chapter={getTopics.chapter}
                                topic={getTopics.id}
                              />
                            </div>
                          </div>
                          {(getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString()) ? (
                            <div className="card-bottom dashboard">

                              <a
                                onClick={() => this.gotoDashboard(getTopics, index, isuserValid, moduleValid, isStudentUserValid)}
                                title="Go To Dashboard"
                              >
                                Go To Dashboard
                              </a>
                            </div>
                          ) : (<div className="card-bottom dashboard">
                            <a
                              style={{ opacity: "0.1" }}
                              onClick={() => this.gotoDashboard(getTopics, index, isuserValid, moduleValid, isStudentUserValid)}
                              title="Go To Dashboard"
                            >
                              Go To Dashboard
                            </a >
                          </div>)}

                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          {/* <div className="content p-2"> */}

                          {/* <div className="card-box d-flex p-1">
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
                                        chapter: getTopics.chapter,
                                        topicid: "",
                                        topic: "",
                                        ocid: getTopics.chapter,
                                        otid: getTopics.id,
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
                              )} */}
                          <div className="content p-2">

                            <Card as={Card.Body} className="border_pad p-2 mt-2 text-center">
                              <div className="icon">
                                <i className="text-warning fad fa-clipboard fa-fw fa-2x" />
                                <div>Short Notes &amp; Revision Materials</div>
                              </div>
                              {/* <p className="text-danger mb-1">Short Notes Views: 200</p>
                  <p className="text-danger mb-1">Revision Material Views: 200</p> */}
                            </Card>
                          </div>
                          {(getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString()) ? (<div className="card-bottom learn">
                            <a
                              style={{ fontWeight: "bold" }}
                              title="Learning"
                              onClick={() => this.learningFun(getTopics, index, isuserValid, moduleValid, isStudentUserValid)}
                            >
                              Start Learning{" "}
                              {/* <i className="ml-2 fal fa-long-arrow-right" /> */}
                            </a>
                          </div>) : (<div className="card-bottom learn">
                            <a
                              style={{ fontWeight: "bold", opacity: "0.1" }}
                              onClick={() => this.learningFun(getTopics, index, isuserValid, moduleValid, isStudentUserValid)}
                              title="Learning"
                            >
                              Start Learning{" "}
                              {/* <i className="ml-2 fal fa-long-arrow-right" /> */}
                            </a>
                          </div>)}
                          {/* <Card className="border-success w-100 ml-2">
                              <Card.Body className="p-2">
                                <div className="d-flex align-items-center">
                                  <i className="text-success fad fa-clipboard fa-fw fa-2x mr-1" />
                                  <span>Short Notes &amp; Revision Materials</span>
                                </div>
                                <p>{this.props.availableMaterial}</p>
                              </Card.Body>
  
                              {(getTopics.enabled == true && moduleValid.learn_tab==false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString()) ? (<Card.Footer className="p-1">
                                <a
                                style={{ fontWeight:"bold" }}
                                  title="Learning"
                                  onClick={() => this.learningFun(getTopics, index, isuserValid)}
                                >
                                  Start Learning{" "}
                                  <i className="ml-2 fal fa-long-arrow-right" />
                                </a>
                              </Card.Footer>) : (<Card.Footer className="p-1">
                                <a
                                  style={{ fontWeight:"bold" , opacity: "0.1" }}
                                  onClick={() => this.learningFun(getTopics, index, isuserValid)}
                                  title="Learning"
                                >
                                  Start Learning{" "}
                                  <i className="ml-2 fal fa-long-arrow-right" />
                                </a>
                              </Card.Footer>)}
                            </Card> */}

                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div className="content p-2">
                            {/* <h6 className="mb-0">Practice</h6> */}
                            <div className="border_pad mt-2">
                              {getTopics.total_questions > 0 ? (
                                <React.Fragment>
                                  <p className="text-danger mb-1">
                                    Attempted Questions:{" "}
                                    {getTopics.attempted_questions}
                                  </p>
                                  <p className="text-danger mb-1">
                                    Wrong Answered:{" "}
                                    {getTopics.practice_wrong_answered}
                                  </p>
                                  <div className="mt-2 right-answer">
                                    Correct Answered:{" "}
                                    {parseInt(getTopics.attempted_questions - getTopics.practice_wrong_answered)}
                                  </div>
                                </React.Fragment>
                              )
                                : ""}
                            </div>
                          </div>


                          {(getTopics.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(getTopics.chapter.toString()) ? (
                            <div className="card-bottom practice">
                              {getTopics.total_questions > 0 ? (
                                <a
                                  title="Start Practice"
                                  onClick={(e) => this.practiceModal(getTopics, isuserValid, moduleValid, isStudentUserValid)}
                                >
                                  Start Practise
                                </a>
                              ) : (
                                "NO QUESTIONS AVAILABLE"
                              )}
                            </div>
                          ) : (<div className="card-bottom practice">

                            <a
                              style={{ opacity: "0.1" }}
                              onClick={(e) => this.practiceModal(getTopics, isuserValid, moduleValid, isStudentUserValid)}
                              title="Start Practice"

                            >
                              Start Practise
                            </a>

                          </div>)}
                        </Tab.Pane>
                        <Tab.Pane eventKey="four">
                          <TabpaneFour
                            enabled={getTopics.enabled}
                            error_questions={getTopics.error_questions}
                            subjectid={getTopics.subject}
                            ocid={getTopics.chapter}
                            otid={getTopics.id}
                            isuserValid={isuserValid.lp_topic_error_exam}
                            moduleValid={moduleValid}
                            isStudentUserValid={isStudentUserValid}
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

export default withRouter((NewTopicsGroupCards));
