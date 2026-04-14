import React, { Component } from 'react'
import { Row, Col, Card, Image, Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import './_chapterStrength.scss';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

class TopicAccuracy extends Component {
    topicexam(topic_name) {
        let datacount = this.props.getChapterDashboard.getChapterDashboard.find((a) => a.type == "exam");
        let getData = datacount.topics_report.find((a) => a.topic_name == topic_name);
        //// console.log(("getData", getData);
        let percentage = "";
        if (getData != undefined) {
            percentage = parseInt(getData.correct) / parseInt(getData.total_questions) * 100;
        }

        if (isNaN(percentage)) {
            return '0';
        }
        else {
            return Math.round(percentage);
        }


    }
    topicpractic(correct, total_questions) {
        let percentage = parseInt(correct) / parseInt(total_questions) * 100;
        if (isNaN(percentage)) {
            return '0';
        }
        else {
            return Math.round(percentage);
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
            <tbody>
                {this.props.getChapterDashboard.getChapterDashboard[0].topics_report.map((a) => (<tr>
                    <td><i className="fas fa-lightbulb-exclamation color_dark_red mr-2 font_18"></i>{a.topic_name}<br />
                        <span style={{ fontWeight: "normal", fontSize: "" }}>{a.total_questions > 0 ? (`topic completed practice- ${a.topic_practice_percentage} % , total questions- ${a.total_questions}`) : ("Practice Not yet started.")}</span></td>
                    <td>{this.topicexam(a.topic_name)}%</td>
                    <td>{this.topicpractic(a.correct, a.total_questions)}%</td>
                    <td>{this.betterFun(this.topicexam(a.topic_name), this.topicpractic(a.correct, a.total_questions))}</td>
                </tr>))}
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
            topics_report{
                topic_name
                total_questions
                correct
                topic_practice_percentage
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
)(TopicAccuracy));
