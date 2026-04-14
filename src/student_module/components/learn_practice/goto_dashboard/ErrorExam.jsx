import React, { Component } from 'react'
import { Row, Col, Card, Image, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './_chapterStrength.scss';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

class ErrorExam extends Component {

    betterFun(eval1, pval2, type) {
        // console.log(("betterFuntype",type);
        if (type == "skipped" || type == "wrong" || type == "error" || type == "over" || type == "intime" || type == "speed" || type == "less") {
            if (parseInt(eval1) == "0" && parseInt(pval2) == "0") {
                return "Both"
            }
            else if (parseInt(eval1) == "0" && parseInt(pval2) != "0") {
                return "Exam"
            }
            else if (parseInt(eval1) != "0" && parseInt(pval2) == "0") {
                return "Practice"
            }
            else {

                if (parseInt(eval1) < parseInt(pval2)) {
                    let diff = parseInt(pval2) - parseInt(eval1);
                    // console.log(("11");
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Exam"
                    }

                }
                else if (parseInt(pval2) < parseInt(eval1)) {
                    // console.log(("12");
                    let diff = parseInt(eval1) - parseInt(pval2);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Practice"
                    }

                }
                else {
                    return "Both"

                }
            }
        }
        else {
            if (parseInt(eval1) == "0" && parseInt(pval2) == "0") {
                return "Not Both"
            }
            else if (parseInt(eval1) == "0" && parseInt(pval2) != "0") {
                return "Practice"
            }
            else if (parseInt(eval1) != "0" && parseInt(pval2) == "0") {
                return "Exam"
            }
            else {

                if (parseInt(eval1) > parseInt(pval2)) {
                    let diff = parseInt(eval1) - parseInt(pval2);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Exam"
                    }

                }
                else if (parseInt(pval2) > parseInt(eval1)) {
                    let diff = parseInt(pval2) - parseInt(eval1);
                    if (diff == "1") {
                        return "Both"

                    } else {
                        return "Practice"
                    }

                } else {
                    return "Both"

                }
            }

        }




    }
    render() {
        if (this.props.getChapterDashboard.loading) return (
            <tbody><tr className="text-center">Loading...</tr></tbody>);
        let practice = "";
        let exam = "";
        // console.log(("getData", this.props.getData);
        if (this.props.getChapterDashboard.getChapterDashboard != undefined) {
            practice = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "practice");
            exam = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "exam");
        }
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th className="text-left">
                            <Button variant="link text-dark text-decoration-none"
                                onClick={() => this.props.tabfunction("tableSix")}
                            >
                                {/* <i className="far fa-minus-square fa-fw" /> Error Exams */}

                                {this.props.tableSix == true ? (
                                    <React.Fragment>
                                        <i className="far fa-minus-square fa-fw" />Error Exams
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <i className="far fa-plus-square fa-fw" />Error Exams
                                    </React.Fragment>

                                )}
                            </Button>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {this.props.tableSix ?
                    <tbody>
                        <tr>
                            <td><i className="fas fa-circle text-lightgrey mr-2"></i>Error Exam</td>
                            <td>{exam != undefined ? (exam.total_error_exams) : ("0")}</td>
                            <td>{practice != undefined ? (practice.total_error_exams) : ("0")}</td>
                            <td>{this.betterFun(exam.total_error_exams, practice.total_error_exams)}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-circle text-lightgrey mr-2"></i> Error Questions</td>
                            <td>{exam != undefined ? (exam.error_questions) : ("0")}</td>
                            <td>{practice != undefined ? (practice.error_questions) : ("0")}</td>
                            <td>{this.betterFun(exam.error_questions, practice.error_questions, "error")}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-circle text-lightgrey mr-2"></i> Skipped Questions</td>
                            <td>{exam != undefined ? (<React.Fragment>{exam.error_skipped_questions != null ? (exam.error_skipped_questions) : ("0")}</React.Fragment>) : ("0")}</td>
                            <td>{practice != undefined ? (practice.error_skipped_questions) : ("0")}</td>
                            <td>{this.betterFun(exam.error_skipped_questions, practice.error_skipped_questions, "skipped")}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-circle text-lightgrey mr-2"></i> Wrong Corrected</td>
                            <td>{exam != undefined ? (exam.wrong_corrected) : ("0")}</td>
                            <td>{practice != undefined ? (practice.wrong_corrected) : ("0")}</td>
                            <td>{this.betterFun(exam.wrong_corrected, practice.wrong_corrected)}</td>
                        </tr>
                        <tr>
                            <td><i className="fas fa-circle text-lightgrey mr-2"></i> Wrong Pending</td>
                            <td>{exam != undefined ? (parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)) : ("0")}</td>
                            <td>{practice != undefined ? (parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)) : ("0")}</td>
                            <td>{this.betterFun((parseInt(exam.wrong_answered) - parseInt(exam.wrong_corrected)), (parseInt(practice.wrong_answered) - parseInt(practice.wrong_corrected)), "wrong")}</td>
                        </tr>
                    </tbody>
                    : null}
            </React.Fragment>
        )
    }
}



export default withRouter(compose(
    graphql(gql` 
    query($mobile: String!,
        $chapter_id: Int,$topic_id:Int) {
            getChapterDashboard(mobile: $mobile,
        chapter_id: $chapter_id,topic_id:$topic_id){
            type
            total_error_exams
            error_questions
            error_skipped_questions
            wrong_corrected
            wrong_answered
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    chapter_id: parseInt(props.chapter_id),
                    topic_id: parseInt(props.topic_id)

                },
                fetchPolicy: 'cache-and-network'
            }), name: "getChapterDashboard"
        })
)(ErrorExam));
