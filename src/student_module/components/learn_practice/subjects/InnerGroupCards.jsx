import React, { Component } from "react";
import { components } from "react-select";
import SingleCard from "./SingleCard";
import { Row, Form, Col, Card, Nav, Tab, Button, Image, Dropdown } from "react-bootstrap";
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown";

import { Link } from "react-router-dom";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";

import TabpaneFour from "./TabpaneFour";
import TabpaneThree from "./TabpaneThree";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

const FETCH_DATA = gql` 
query($mobile: String,
  $exam_id: Int,
  $class_id: Int,$subject: Int, $chapter:Int) {
  getSubjects(mobile: $mobile,
  exam_id: $exam_id,
  class_id: $class_id, subject: $subject, chapter: $chapter){
      studentChapters{
        total_questions
        attempted_questions
        practice_wrong_answered
        error_questions
        graph
      }
      
  }
}

`;


class InnerGroupCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      userRestionModalShow: false,

    };
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


  gotoDashboard = () => {
    //console.log("this.props.enabled", this.props.enabled);

    if ((this.props.enabled == true && this.props.moduleValid.learn_tab == false) || this.props.isStudentUserValid.chapter_ids.split(",").includes(this.props.ocid.toString())) {
      if (this.props.isuserValid.lp_chapter_dashboard == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/chapter-status",
          state: {
            subjectid: this.props.subjectid,
            ocid: this.props.ocid,
            otid: "0",
            learning: {
              subjectid: this.props.subjectid,
              ocid: this.props.ocid,
              otid: "0",
            },
            practice: {
              ocid: this.props.ocid,
              otid: "0",
              subjectid: this.props.subjectid
            },

            wrong: {
              subjectid: this.props.subjectid,
              ocid: this.props.ocid,
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
  learningFun = () => {
    console.log("lp_custom_content:", this.props.isuserValid.lp_custom_content, "enabled:", this.props.enabled, "learn_tab:", this.props.moduleValid.learn_tab, "chapter_ids:", this.props.isStudentUserValid.chapter_ids, "ocid:", this.props.ocid);

    if ((this.props.enabled == true && this.props.moduleValid.learn_tab == false) || this.props.isStudentUserValid.chapter_ids.split(",").includes(this.props.ocid.toString())) {
      if (this.props.isuserValid.lp_custom_content == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/start-learning",
          state: {
            subjectid: this.props.subjectid,
            ocid: this.props.ocid,
            otid: "0"
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
    const getSubjects = this.props.getSubjects;
    const loading1 = getSubjects.loading;


    if (loading1) return (

      <Tab.Container id="subject-tabs" defaultActiveKey="first">
        <Nav variant="pills nav-fill" className="flex-row mt-2 px-2">
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
                0
              </span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="error">
            <Nav.Link title="Error Test" eventKey="four">
              <i className="fal fa-file-search mr-2" />{" "}
              <span>
                0
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <div className="content p-2">
              {/* <h6 className="mb-0">Dashboard</h6> */}
              <div className="border_pad mt-2" style={{ height: 90 }}>
                <p className="mb-1">
                </p>
              </div>
            </div>
            <div className="card-bottom dashboard">

              <a
                title="Go To Dashboard"
              >
                Go To Dashboard
              </a>
            </div>

          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <div className="content p-2">
              {/* <h6 className="mb-0">Short Notes &amp; Revision Materials</h6> */}
              <div className="card-box d-flex p-1">
                {Cookies.get("videos") == true ? (
                  <Card className="border-primary w-100">
                    <Card.Body className="p-2">
                      <div className="d-flex align-items-center">
                        <i className="text-primary fad fa-video fa-fw fa-2x mr-1" />
                        <span>Videos</span>
                      </div>
                      <p>...</p>
                    </Card.Body>
                    <Card.Footer className="p-1">
                      <a
                        title="Watching"


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
                    {/* <p>...</p> */}
                  </Card.Body>

                  <Card.Footer className="p-1">
                    <a
                      style={{ fontWeight: "bold" }}
                      title="Learning"

                    >
                      Start Learning{" "}
                      <i className="ml-2 fal fa-long-arrow-right" />
                    </a>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <div className="content p-2">
              <div className="border_pad mt-2">

                <p className="text-danger mb-1">
                  Attempted Questions:{" "}
                  0
                </p>
                <p className="text-danger mb-1">
                  Wrong Answered:{" "}
                  0
                </p>
                <div className="mt-2 right-answer">
                  Correct Answered:{" "}
                  0
                </div>

              </div>
            </div>
            <div className="card-bottom practice">
              <a
                title="Start Practice"

              >
                Start Practice
              </a>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="four">
            <div className="content p-2">

              <Card as={Card.Body} className="border_pad p-2 mt-2 text-center">
                <p className="text-danger mb-1">Not Answered: 0</p>
                <p className="text-danger mb-1">Wrong Answered: 0</p>
                <div className="mt-2 right-answer">Corrected Answered: 0</div>
              </Card>
            </div>

            <div className="card-bottom error">
              <a
                title="Start Error Exam"

              >
                Start Error Exam
              </a>

            </div>
          </Tab.Pane>

        </Tab.Content>
      </Tab.Container>

    );


    const error1 = getSubjects.error;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return (<div className="shadow border-0 mb-4 justify-content-center d-flex align-items-center" style={{ height: 90 }}>
        <div class="spinner-border text-center" style={{ color: "#633FD2" }}></div>
      </div>);
    }
    console.log("getSubjects.getgetSubjectsthird", getSubjects.getSubjects,
      {
        mobile: Cookies.get("mobile"),
        exam_id: parseInt(Cookies.get("examid")),
        class_id: parseInt(Cookies.get("classid")),
        subject: parseInt(this.props.subjectid),
        chapter: parseInt(this.props.ocid)
      });
  let subjectsData = null;

if (
  getSubjects &&
  getSubjects.getSubjects &&
  getSubjects.getSubjects.length > 0 &&
  getSubjects.getSubjects[0].studentChapters &&
  getSubjects.getSubjects[0].studentChapters.length > 0
) {
  subjectsData = getSubjects.getSubjects[0].studentChapters[0];
}
    return (
      <React.Fragment>
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
                    subjectsData?.attempted_questions || 0,
                    subjectsData?.total_questions || 0
                  )}
                  %
                </span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="error">
              <Nav.Link title="Error Test" eventKey="four">
                <i className="fal fa-file-search mr-2" />{" "}
                <span>
                  {subjectsData.error_questions}
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
                    graph={subjectsData.graph}
                    subject={this.props.subjectid}
                    chapter={this.props.ocid}
                    topic="0"
                  />
                </div>
              </div>
              {(this.props.enabled == true && this.props.moduleValid.learn_tab == false) || this.props.isStudentUserValid.chapter_ids.split(",").includes(this.props.ocid.toString()) ? (
                <div className="card-bottom dashboard">

                  <a
                    onClick={() => this.gotoDashboard()}
                    title="Go To Dashboard"
                  >
                    Go To Dashboard
                  </a>
                </div>
              ) : (<div className="card-bottom dashboard">
                <a
                  style={{ opacity: "0.1" }}
                  onClick={() => this.gotoDashboard()}
                  title="Go To Dashboard"
                >
                  Go To Dashboard
                </a >
              </div>)}

            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="content p-2">
                <h6 className="mb-0">{this.props.tabTitleTwo}</h6>
                <Card as={Card.Body} className="border_pad p-2 mt-2 text-center">
                  <div className="icon">
                    <i className="text-warning fad fa-clipboard fa-fw fa-2x" />
                    <div>Short Notes &amp; Revision Materials</div>
                  </div>
                  {/* <p className="text-danger mb-1">Short Notes Views: 200</p>
                  <p className="text-danger mb-1">Revision Material Views: 200</p> */}
                </Card>
              </div>
              {(this.props.enabled == true && this.props.moduleValid.learn_tab == false) || this.props.isStudentUserValid.chapter_ids.split(",").includes(this.props.ocid.toString()) ? (
                <div className="card-bottom learn">

                  <a
                    title="Start Learning"
                    onClick={() => this.learningFun()}
                  >
                    Start Learning
                  </a>

                </div>
              ) : (<div className="card-bottom learn">

                <a
                  style={{ opacity: "0.1" }}
                  onClick={() => this.learningFun()}
                  title="Start Learning"

                >
                  Start Learning
                </a>

              </div>)}
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <TabpaneThree
                subjectsData={subjectsData}
                enabled={this.props.enabled}
                moduleValid={this.props.moduleValid}
                isStudentUserValid={this.props.isStudentUserValid}
                subjectid={this.props.subjectid}
                ocid={this.props.ocid}
                isuserValid={this.props.isuserValid.lp_practice_exam}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="four">
              <TabpaneFour
                enabled={this.props.enabled}
                moduleValid={this.props.moduleValid}
                isStudentUserValid={this.props.isStudentUserValid}
                error_questions={subjectsData.error_questions}
                subjectid={this.props.subjectid}
                ocid={this.props.ocid}
                otid="0"
                isuserValid={this.props.isuserValid.lp_error_exam}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <ImportentAlert
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <UserRestrictionAlert
          show={this.state.userRestionModalShow}
          onHide={() => this.setState({ userRestionModalShow: false })}
        />
      </React.Fragment>

    );
  }
}



export default React.memo(withRouter(compose(
  graphql(FETCH_DATA,
    {
      options: props => ({
        variables: {
          mobile: Cookies.get("mobile"),
          exam_id: parseInt(Cookies.get("examid")),
          class_id: parseInt(Cookies.get("classid")),
          subject: parseInt(props.subjectid),
          chapter: parseInt(props.ocid)
        },
        fetchPolicy: 'cache-and-network'
      }),
      name: "getSubjects"
    }))(InnerGroupCards)));
