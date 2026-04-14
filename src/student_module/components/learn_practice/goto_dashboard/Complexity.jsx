import React, { Component } from 'react'
import { Row, Col, Card, Image, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './_chapterStrength.scss';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

class Complexity extends Component {
    complexityPrcatise(id) {
        // console.log(("qtypePercentageqtypePercentage", this.props.getChapterDashboard);
        let datacount = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "practice");
        let array = datacount.complexity_report_web;
        let Data = array.find((b) => b.complexity_id == id);

        let returnData = (parseInt(Data.correct) / (parseInt(Data.correct) + parseInt(Data.wrong))) * 100;
        // console.log(("qtypePercentageData", returnData);


        if (isNaN(returnData)) {
            return '0';
        }
        else {
            return Math.round(returnData);
        }
    }
    complexityexam(id) {
        // // console.log(("qtypePercentage", question_type);
        let returnData = "";
        let datacount = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "exam");
        if (datacount != undefined) {
            let array = datacount.complexity_report_web;
            let Data = array.find((b) => b.complexity_id == id);
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
        console.log("topic accuracy", this.props.getChapterDashboard.getChapterDashboard[0]);
        return (
            <tbody>
                {this.props.getChapterDashboard.getChapterDashboard[0].complexity_report_web.map((data) => (
                    <tr>
                        <td><i className="fas fa-circle text-lightgrey mr-2"></i>{data.complexity_name}</td>
                        <td>{this.complexityexam(data.complexity_id)}%</td>
                        <td>{this.complexityPrcatise(data.complexity_id)}%</td>
                        <td>{this.betterFun(this.complexityexam(data.complexity_id), this.complexityPrcatise(data.complexity_id))}</td>
                    </tr>
                ))}

            </tbody>
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
            complexity_report_web{
                complexity_id
                complexity_name
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
)(Complexity));
