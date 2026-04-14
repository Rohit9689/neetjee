import React, { Component } from 'react'
import { Row, Col, Card, Image, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './_chapterStrength.scss';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

class MostErrorQType extends Component {
    qtypePercentage(question_type_name) {
        // console.log(("qtypePercentageqtypePercentage", this.props.getChapterDashboard);
        let datacount = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "practice");
        let array = datacount.qtype_report_web;
        let Data = array.find((b) => b.question_type_name == question_type_name);

        let returnData = (parseInt(Data.correct) / (parseInt(Data.correct) + parseInt(Data.wrong))) * 100;
        // console.log(("qtypePercentageData", returnData);


        if (isNaN(returnData)) {
            return '0';
        }
        else {
            return Math.round(returnData);
        }
    }
    qtypePercentageexam(question_type_name) {
        // // console.log(("qtypePercentage", question_type);
        let returnData = "";
        let datacount = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "exam");
        if (datacount != undefined) {
            let array = datacount.qtype_report_web;
            let Data = array.find((b) => b.question_type_name == question_type_name);
            //// console.log(("Data", Data);

            if (Data != undefined) {
                returnData = (parseInt(Data.correct) / (parseInt(Data.correct) + parseInt(Data.wrong) + parseInt(Data.not_answered))) * 100;
                // console.log(("returnData", returnData);
            }

        }
        if (isNaN(returnData)) {
            return '0';
        }
        else {
            return Math.round(returnData);
        }

    }
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
        console.log("topic accuracy", this.props.getChapterDashboard.getChapterDashboard);
        return (
            <React.Fragment>
                <thead>
                    <tr>
                        <th className="text-left">
                            <Button variant="link text-dark text-decoration-none" onClick={() => this.props.tabfunction("tableThree")}>
                                {/* <i className="far fa-minus-square fa-fw" /> Most Error Question Type */}
                                {this.props.tableThree == true ? (
                                    <React.Fragment>
                                        <i className="far fa-minus-square fa-fw" />Most Error Question Type
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <i className="far fa-plus-square fa-fw" />Most Error Question Type
                                    </React.Fragment>

                                )}
                            </Button>
                        </th>
                        <th>{this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "exam").qtype_report_web.length}</th>
                        <th>{this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "practice").qtype_report_web.length}</th>
                        <th></th>
                    </tr>
                </thead>
                {this.props.tableThree ?

                    <tbody>
                        {this.props.getChapterDashboard.getChapterDashboard[0].qtype_report_web.map((data, index) => (
                            <tr>
                                <td><i className="fas fa-circle text-lightgrey mr-2"></i>{data.question_type_name}</td>
                                <td>{this.qtypePercentageexam(data.question_type_name)}%</td>
                                <td>{this.qtypePercentage(data.question_type_name)}%</td>
                                <td>{this.betterFun(this.qtypePercentageexam(data.question_type_name), this.qtypePercentage(data.question_type_name), "error")}</td>
                            </tr>
                        ))}
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
            qtype_report_web{
                question_type
                question_type_name
                correct
                wrong
                not_answered
            }
            
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
)(MostErrorQType));
