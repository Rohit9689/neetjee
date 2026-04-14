import React, { Component } from "react";
import { Container } from "react-bootstrap";
import AsideNavbarDummy from "../components/navbars/AsideNavbarDummy";
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import DummyHomeNavbar from '../components/home/DummyHomeNavbar';
import ContentLoader from 'react-content-loader';
import { Row, Col, Card } from 'react-bootstrap';

const FETCH_GET_SUBJECTS = gql`
  query($mobile: String) {
    getSubjects(mobile: $mobile) {
      id
      subject
      practice_percentage
      studentChapters {
        id
        chapter
        topics {
          id
          topic
         }
        class
        attempted_questions
        practice_wrong_answered
        enabled
        total_questions
      }
      
      
    }
  }
`;

const FETCH_STUDENTGLOBALS = gql`
  query($mobile: String) {
    studentGlobals(mobile: $mobile) {
      exams {
        id
        exam
        exam_subjects{
          subject_id
        }
      }
      classes {
        id
        class
      }
      questionTypes {
        id
        questiontype
      }
      complexity {
        id
        complexity
      }
      questionTheory {
        id
        question_theory
      }
      previousSets {
        id
        year
        qset
        exam
        pexamtype
        enabled
        attempted
      }
      previousYears {
        year
      }
      appModules{
        id
        title
      }
      exam_time
      tags{
        id
        tag
        type
      }
    }
  }
`;

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        app_version
        user_access_restictions
     }
}

`;

class AutoStudentLoadingSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: "1"
    }
  }
  render() {
    console.log("mobile", this.props.type);
    if (Cookies.get("studenttoken") == undefined)
      this.props.history.push("/student/login");

    const getSubjects = this.props.getSubjects;
    const loading1 = getSubjects.loading;
    const error1 = getSubjects.error;

    const studentGlobals = this.props.studentGlobals;
    const loading2 = studentGlobals.loading;
    const error2 = studentGlobals.error;

    const isStudentUserValid = this.props.isStudentUserValid;
    const loading5 = isStudentUserValid.loading;
    const error5 = isStudentUserValid.error;

    if (error5 !== undefined) {
      alert("Server Error. " + error5.message);
      return null;
    }
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }

    if (isStudentUserValid.isStudentUserValid != undefined) {
      if (isStudentUserValid.isStudentUserValid.estatus == 0) {
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("refreshtoken");
        Cookies.remove("email");
        Cookies.remove("id");
        Cookies.remove("institutionid");
        Cookies.remove("userlevel");
        Cookies.remove("name");
        this.props.history.push("/student/login");
      }
    }
    localStorage.removeItem('studentglobals');
    localStorage.removeItem('globalsubjects');
    localStorage.setItem(
      "studentglobals",
      JSON.stringify(studentGlobals.studentGlobals)
    );
    localStorage.setItem(
      "globalsubjects",
      JSON.stringify(getSubjects.getSubjects)
    );
    localStorage.setItem(
      "isStudentUserValid",
      JSON.stringify(isStudentUserValid.isStudentUserValid)
    );
    //console.log("langetSubjects", getSubjects.getSubjects)
    return (
      <div className="student main-wrapper">
        {(loading1 == true || loading2 == true || loading5 == true) && (
          <React.Fragment>
            <div className="student header-area">

              <DummyHomeNavbar
                onClick={() => this.props.changeToggle()} />

            </div>
            <AsideNavbarDummy onClick={(e) => {
              e.preventDefault();
            }}
            />
            <div className="content-wrapper pt-0">
              <Container>
                <section className="student-home">
                  <Row className="student-subject-card">
                    <Col xl={3} lg={3} md={6} sm={12}>
                      <Card className="single-card shadow-sm border-0">
                        <Card.Body className="p-2">
                          <div className="showcase-component">
                            <ContentLoader
                              viewBox="0 0 500 175"
                              height={175}
                              width={'100%'}
                              speed={2}
                            >
                              <rect x="30" y="30" rx="10" ry="10" width="70" height="70" />
                              <rect x="129.9" y="29.5" width="125.5" height="17" />
                              <rect x="129.9" y="64.7" width="296" height="17" />
                              <rect x="129.9" y="97.8" width="253.5" height="17" />
                              <rect x="129.9" y="132.3" width="212.5" height="17" />
                            </ContentLoader>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={12}>
                      <Card className="single-card shadow-sm border-0">
                        <Card.Body className="p-2">
                          <div className="showcase-component">
                            <ContentLoader
                              viewBox="0 0 500 175"
                              height={175}
                              width={'100%'}
                              speed={2}
                            >
                              <rect x="30" y="30" rx="10" ry="10" width="70" height="70" />
                              <rect x="129.9" y="29.5" width="125.5" height="17" />
                              <rect x="129.9" y="64.7" width="296" height="17" />
                              <rect x="129.9" y="97.8" width="253.5" height="17" />
                              <rect x="129.9" y="132.3" width="212.5" height="17" />
                            </ContentLoader>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={12}>
                      <Card className="single-card shadow-sm border-0">
                        <Card.Body className="p-2">
                          <div className="showcase-component">
                            <ContentLoader
                              viewBox="0 0 500 175"
                              height={175}
                              width={'100%'}
                              speed={2}
                            >
                              <rect x="30" y="30" rx="10" ry="10" width="70" height="70" />
                              <rect x="129.9" y="29.5" width="125.5" height="17" />
                              <rect x="129.9" y="64.7" width="296" height="17" />
                              <rect x="129.9" y="97.8" width="253.5" height="17" />
                              <rect x="129.9" y="132.3" width="212.5" height="17" />
                            </ContentLoader>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={12}>
                      <Card className="single-card shadow-sm border-0">
                        <Card.Body className="p-2">
                          <div className="showcase-component">
                            <ContentLoader
                              viewBox="0 0 500 175"
                              height={175}
                              width={'100%'}
                              speed={2}
                            >
                              <rect x="30" y="30" rx="10" ry="10" width="70" height="70" />
                              <rect x="129.9" y="29.5" width="125.5" height="17" />
                              <rect x="129.9" y="64.7" width="296" height="17" />
                              <rect x="129.9" y="97.8" width="253.5" height="17" />
                              <rect x="129.9" y="132.3" width="212.5" height="17" />
                            </ContentLoader>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>


                  <Row>
                    <Col xl={4} lg={4} md={12} sm={12}>
                      <Card className="learn_practice my-3 border-0">
                        <div className="showcase-component">
                          <ContentLoader
                            speed={2}
                            width={400}
                            height={560}
                            viewBox="0 0 420 560"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                          </ContentLoader>
                        </div>
                      </Card>
                    </Col>
                    <Col xl={4} lg={4} md={12} sm={12}>
                      <Card className="border-0 my-3">
                        <div className="showcase-component">
                          <ContentLoader
                            speed={2}
                            width={400}
                            height={560}
                            viewBox="0 0 420 560"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                          </ContentLoader>
                        </div>
                      </Card>
                    </Col>
                    <Col xl={4} lg={4} md={12} sm={12}>
                      <Card className="exploreTags my-3 border-0">
                        <div className="showcase-component">
                          <ContentLoader
                            speed={2}
                            width={400}
                            height={560}
                            viewBox="0 0 420 560"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                          </ContentLoader>
                        </div>
                      </Card>
                    </Col>
                  </Row>

                </section>
              </Container>
            </div>

          </React.Fragment>

        )}
        <div>
          {!loading1 &&
            !loading2 &&
            !loading5 &&
            (<React.Fragment>
              {/* { this.props.type!="home"?(this.props.history.push("/student/package"))
              :this.props.type!="home"?(this.props.history.push("/student/package"))?()
              :(this.props.history.push("/student/home"))} */}
              {this.props.type == "home" ? (
                this.props.history.push("/student/home")
              ) : this.props.type == "mocktest" ? (
                this.props.history.push("/student/exams/test-series")
              ) : (
                    this.props.history.push("/student/package")
                  )}
            </React.Fragment>)
          }
        </div>

      </div>
    );
  }
}

export default withRouter(
  compose(
    graphql(FETCH_GET_SUBJECTS, {
      options: (props) => ({
        variables: {
          mobile: Cookies.get("mobile"),
        }
        ,
        fetchPolicy: "no-cache"
      }),
      name: "getSubjects",
    }),
    graphql(FETCH_STUDENTGLOBALS, {
      options: (props) => ({
        variables: {
          mobile: Cookies.get("mobile"),
        }
        ,
        fetchPolicy: "no-cache"
      }),
      name: "studentGlobals",
    }),
    graphql(FETCH_ISSTUDENTUSERVALID,
      {
        options: props => ({
          variables: {
            mobile: Cookies.get("mobile")
          }
          ,
          fetchPolicy: "cache-and-network"
        }), name: "isStudentUserValid"
      })
  )(AutoStudentLoadingSection)
);
