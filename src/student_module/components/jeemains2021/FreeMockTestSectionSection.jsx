import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import "./_mock-test-series.scss"
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import moment from 'moment';

const STUDENR_PREVIOUS_EXAM = gql`
  mutation(
    $params:StudentPreviousPaperExam  
    ) {
        studentPreviousPaperExam(
        params: $params
     )
  }
`;



class FreeMockTestSectionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRestionModalShow: false,
        };
    }
    customUserResctrict = (e, modaldata, a) => {
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }


        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);

        if ((a.enabled == true )) {
            // if (modaldata == false) {
            //     this.handleFormSubmit(e, a.year, a.id, a.pexamtype)
            // }
            // else {
            //     this.setState({
            //         userRestionModalShow: true
            //     });
            // }
            this.handleFormSubmit(e, a.year, a.id, a.pexamtype)

        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }
    }
    handleFormSubmit = (e, year, id, pexamtype) => {
        console.log("handleFormSubmit", year, id, pexamtype);
        e.preventDefault();
        const params = {
            mobile: Cookies.get("mobile"),
            sub_type: year,
            exam_type: parseInt(pexamtype),
            source: 0,
            set_id: parseInt(id),
            selected_years: [],
            selected_classes: [],
            question_types: [],
            complexity: [],
            question_theory: [],

        };
        console.log("params", params);
        this.customfunction(
            params
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("updatedata", data);
                if (data.studentPreviousPaperExam) {
                    localStorage.setItem("sessionid", data.studentPreviousPaperExam);
                    localStorage.setItem("type", "Previous Paper Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "jeemainsprevious_exam");

                    window.open("/student/subject/exam", "_blank");

                    this.props.history.push({
                        pathname: "/student/home",

                    })
                }
            }
        });
    };
    handleResultFunction = (id) => {

        this.props.history.push({
            pathname: "/student/subject/exam-result",
            state: {
                sessionid: id,
                examtype: "jeemainsprevious_exam",
            }
        })
    }

    graphValue(getseries) {
        let data = "";
        if (getseries != undefined) {
            data = parseInt(getseries.correct_marks) - parseInt(getseries.negative_marks);
        }
        //console.log("graphValue123", data);
        return data;

    }


    render() {

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
        let previousSets = "";
        //console.log("this.props.studentGlobals.previousSets",this.props.studentGlobals.previousSets.filter((a)=>a.mains_2021==true));

        let examgroup = [];
        this.props.getPreviousMainsPapers.map((item) => {
            examgroup.push(item.examgroup);

        });

        const uniqueArr = [... new Set(examgroup.map(data1 => data1.trimRight().trimLeft()))]
        return (
            <React.Fragment>
                {uniqueArr.map((item) => {
                    return (
                        <Row className="my-3">
                            <Col xs={12}>
                                <h1 className="title h5 my-2 font-weight-bold text-uppercase mock-text-color">{item}:</h1>
                            </Col>
                            <Col>
                                <Card as={Card.Body} className="free-mock p-2">
                                    <Row>
                                        <Col xl={12} lg={12} md={12} className="card-left">
                                            <ul className="row list-unstyled">
                                                {this.props.getPreviousMainsPapers.map((a) => {
                                                    console.log("ss",a.enabled,moduleValid);
                                                    if (a.examgroup == item) {
                                                        return (
                                                            <li className="col-xl-6 col-lg-12 mb-3">
                                                                <Card as={Card.Body} className={"p-1 single-card active"}>
                                                                    <Row className="g-0 "  className="align-items-center">
                                                                        <Col xl={8} lg={7} md={12}>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="img-block text-center mr-2">
                                                                                    <Image className="mb-2" src={require('../../../images/Neet-Exam.png')} alt="img" width="60" />
                                                                                </div>
                                                                                <div className="card-content">
                                                                                    <h6 className="title text-uppercase">{a.qset + "-" + a.year}</h6>
                                                                                    <p>Duration: 180 min</p>
                                                                                    <p>Syllabus: Class 11 + Class 12</p>

                                                                                    {/* <p style={{ fontWeight: "bold" }}>Date & Time : {moment.unix(a.exam_date).format("Do")} {moment.unix(a.exam_date).format("MMM")} {moment.unix(a.exam_date).format("LT")}
                                                                                    </p> */}

                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col xl={4} lg={5} md={12}>
                                                                            <Row className="align-items-center">

                                                                                {a.attempted == true ? (
                                                                                    <React.Fragment>
                                                                                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                            <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(a.exam_session_id)} className="freemock-score-card border-0 bg-darkblue p-1 text-center text-white">
                                                                                                <ul className="list-inline dot-circle pr-2">
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                </ul>
                                                                                                <h6 className="status-subtitle mb-0">Score</h6>
                                                                                                <h1 className="status-title mb-0">{this.graphValue(a)} <small>/ {a.total_marks}</small></h1>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                                                                            <Card as={Card.Body} style={{ cursor: "pointer" }} onClick={() => this.handleResultFunction(a.exam_session_id)} className="freemock-avgtime-card border-0 bg-warning p-1 text-center">
                                                                                                <ul className="list-inline dot-circle pr-1">
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                    <li className="list-inline-item"><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /><i className="fas fa-circle" /></li>
                                                                                                </ul>
                                                                                                <h6 className="status-subtitle mb-0">AVG Time / Q</h6>
                                                                                                <h1 className="status-title mb-0">{a.speed} <small> Sec</small></h1>
                                                                                            </Card>
                                                                                        </Col>
                                                                                        <Col xs="12">
                                                                                            {a.attempted == true ? (<Button 
                                                                                            onClick={() => this.handleResultFunction(a.session_id)} 
                                                                                            //onClick={(e) => this.customUserResctrict(e, isuserValid.previous_single, a)}
                                                                                            className="mock-btn mt-1" className="w-100"> View Result</Button>)
                                                                                                : (<Button className="mock-btn mt-1" onClick={(e) => this.customUserResctrict(e, isuserValid.previous_single, a)} className="w-100"> Start Test</Button>)}
                                                                                        </Col>
                                                                                    </React.Fragment>) : (

                                                                                        <React.Fragment>

                                                                                            <Col xs="12">
                                                                                                {(a.enabled == true)? (
                                                                                                    <Button className="mock-btn mt-2" onClick={(e) => this.customUserResctrict(e, isuserValid.previous_single, a)} className="w-100"> Start Test</Button>
                                                                                                ) : (<Button className="mock-btn mock-complated mt-2" onClick={(e) => this.customUserResctrict(e, isuserValid.previous_single, a)} className="w-100"> Suscribe</Button>)}


                                                                                            </Col>

                                                                                        </React.Fragment>
                                                                                    )}

                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Card>
                                                            </li>
                                                        )
                                                    }


                                                })}

                                            </ul>
                                        </Col>

                                    </Row>
                                </Card>
                            </Col>
                            <UserRestrictionAlert
                                oneweekplan={false}
                                show={this.state.userRestionModalShow}
                                onHide={() => this.setState({ userRestionModalShow: false })}
                            />
                        </Row >
                    )


                })}
            </React.Fragment>

        )


    }
}

export default withRouter(compose(graphql(STUDENR_PREVIOUS_EXAM, {
    name: "customfunction"
})
)(FreeMockTestSectionSection));