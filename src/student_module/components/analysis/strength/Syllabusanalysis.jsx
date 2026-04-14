import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card, CardGroup, ListGroup, Form, Button, Table, Badge, Image } from 'react-bootstrap';
import AnalysisFilter from '../AnalysisFilter'
import CuttoffStrength from './CuttoffStrength';

import './_strength.scss'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import ChapterAndtopicModal from "../ChapterAndtopicModal";
import ChapterAndtopicModalTopic from "../ChapterAndtopicModalTopic";
import { Scrollbars } from 'react-custom-scrollbars'
import CardLessDataTable from '../../../../neetjee_guru/components/datatables/CardLessDataTable'


const FETCH_SUBJECTANALYSIS = gql` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getSubjectAnalysisData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        class_id
        syllabus_analysis{
            id
            subject
            chapters_strength{
                strength
                total
                chapter_list{
                    id
                    chapter
                }
            }
            topics_strength{
                strength
                total
                topic_list{
                    id
                    topic
                    chapter
                    chapter_id
                }
            }
            last_attempted_chapter
            last_attempted_chapter_name
            last_timestamp
            last_accuracy
        }
        
        
        
    }
}
`;

class Syllabusanalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chapter: "1",
            topic: "",
            modalShow: false,
            modalShow1: false,
            modaldata: [],
            name: "",
            lastdata: ""
        }
    }
    modalFun = (data, name, lastdata) => {
        console.log("modalFun", data, name, lastdata);
        if (name == "Topics Data") {
            this.setState({
                modalShow1: true,
                modaldata: data,
                name: name,
                lastdata: lastdata
            });
        }
        else {
            this.setState({
                modalShow: true,
                modaldata: data,
                name: name,
                lastdata: lastdata
            });
        }


    }
    chaaptercount(data) {
        console.log("chaaptercount", data);
        let newArray = [];
        if (data != null) {
            data.map((item) => {
                newArray.push(item.total);
            });
        }



        var sumaccuracy = newArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sumaccuracy;

    }
    topiccount = (data) => {
        let newArray = [];
        data.map((item) => {
            newArray.push(item.total);
        });

        var sumaccuracy = newArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sumaccuracy;
    }
    handleInput = (type) => {
        if (type == "topic") {
            this.setState({
                topic: "1",
                chapter: ""
            });
        }
        if (type == "chapter") {
            this.setState({
                chapter: "1",
                topic: ""
            });
        }

    }
    render() {
        console.log("dsgsdgg", this.props.mobile);
        const getSubjectAnalysisData = this.props.getSubjectAnalysisData;
        const loading1 = getSubjectAnalysisData.loading;
        const error1 = getSubjectAnalysisData.error;
        if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        let practiceSubjectAnalysisData = "";
        if (this.props.class_id == "1,2") {
            practiceSubjectAnalysisData = getSubjectAnalysisData.getSubjectAnalysisData.find((item) => item.class_id == "0");
        }
        else {
            practiceSubjectAnalysisData = getSubjectAnalysisData.getSubjectAnalysisData.find((item) => item.class_id == this.props.class_id);
        }

        console.log("getSubjectAnalysisData.getSubjectAnalysisData123", getSubjectAnalysisData.getSubjectAnalysisData);

        return (
            <React.Fragment>

                <Card className="syllabus-status my-3">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-0">Syllabus analysis</h6>
                        <ul className="filter">
                            {/* <li><Link className="active" to="#">Chapters</Link></li>
                                <li><Link to="#">Topics</Link></li> */}
                            <li><a className={this.state.chapter == "1" ? ("active") : ("")} onClick={(e) => this.handleInput("chapter")}>Chapters</a></li>
                            <li><a className={this.state.topic == "1" ? ("active") : ("")} onClick={(e) => this.handleInput("topic")}>Topics</a></li>
                        </ul>
                    </Card.Header>
                    {this.state.chapter == "1" ? (
                        <Card.Body className="p-0">
                            <CardGroup>
                                {practiceSubjectAnalysisData.syllabus_analysis.map((subitem) => (
                                    <Card>
                                        <Card.Header className="bg-white">{subitem.subject}</Card.Header>
                                        <Card.Body className="p-2">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                    <h6 className="font-weight-normal">Total Chapters</h6>
                                                    <Button variant="dark">{this.chaaptercount(subitem.chapters_strength)}</Button>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                    <p className="font-weight-bold">Strength</p>
                                                    <p className="font-weight-bold">Chapters</p>
                                                </ListGroup.Item>
                                                {subitem.chapters_strength != null ? (<React.Fragment>
                                                    {subitem.chapters_strength.map((chsmap) => (<ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                        <p>{chsmap.strength}%</p>
                                                        <a
                                                            onClick={(e) => this.modalFun(
                                                                chsmap.chapter_list,
                                                                "Chapters Data",
                                                                subitem)}>{chsmap.total}<i className="ml-3 fal fa-angle-right" /></a>
                                                        {/* <p><Link>{chsmap.total}<i className="ml-3 fal fa-angle-right" /></Link></p> */}
                                                    </ListGroup.Item>))}
                                                </React.Fragment>) : ("")}

                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </CardGroup>
                        </Card.Body>
                    ) : ("")}

                    {this.state.topic == "1" ? (
                        <Card.Body className="p-0">
                            <CardGroup>
                                {practiceSubjectAnalysisData.syllabus_analysis.map((subitem) => (
                                    <Card>
                                        <Card.Header className="bg-white">{subitem.subject}</Card.Header>
                                        <Card.Body className="p-2">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                    <h6 className="font-weight-normal">Total Topics</h6>
                                                    <Button variant="dark">{this.topiccount(subitem.topics_strength)}</Button>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                    <p className="font-weight-bold">Strength</p>
                                                    <p className="font-weight-bold">Topics</p>
                                                </ListGroup.Item>
                                                {subitem.topics_strength.map((topsmap) => (<ListGroup.Item className="d-flex justify-content-between align-items-center">
                                                    <p>{topsmap.strength}%</p>
                                                    <a
                                                        onClick={(e) => this.modalFun(topsmap.topic_list, "Topics Data", subitem)}>{topsmap.total}<i className="ml-3 fal fa-angle-right" /></a>
                                                    {/* <p><Link>{chsmap.total}<i className="ml-3 fal fa-angle-right" /></Link></p> */}
                                                </ListGroup.Item>))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </CardGroup>
                        </Card.Body>
                    ) : ("")}

                </Card>
                <ChapterAndtopicModal
                    isuserValid={this.props.isuserValid}
                    name={this.state.name}
                    data={this.state.modaldata}
                    lastdata={this.state.lastdata}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />
                <ChapterAndtopicModalTopic
                    isuserValid={this.props.isuserValid}
                    name={this.state.name}
                    data={this.state.modaldata}
                    lastdata={this.state.lastdata}
                    show={this.state.modalShow1}
                    onHide={() => this.setState({ modalShow1: false })}
                />
            </React.Fragment>
        )


    }
}


export default withRouter(compose(

    graphql(FETCH_SUBJECTANALYSIS
        ,
        {
            options: props => ({
                variables: {
                    mobile: props.mobile,
                    exam_type: props.exam_type,
                    class_id: props.class_id

                },
                fetchPolicy: 'network-only'
            }), name: "getSubjectAnalysisData"
        }))(Syllabusanalysis));
