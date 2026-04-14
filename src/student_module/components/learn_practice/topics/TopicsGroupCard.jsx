import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


class TopicsGroupCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.topicsData
        }
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }

    render() {
        console.log("TopicsGroupCard", this.props.getTopics);
        return (
            <Row className="topic_cards">
                {this.props.getTopics.topics.map((getTopic, index) => (
                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="single_topic  mb-3">
                        <Link

                            to={{
                                pathname: "/student/subject/chapter",
                                state: {
                                    chapters: this.props.getTopics.chapters,
                                    subjectid: this.props.getTopics.subjectid,
                                    chapter: this.props.getTopics.chapter,
                                    chapterid: this.props.getTopics.chapterid,
                                    topicid: this.idFunction(index),
                                    otid: getTopic.id,
                                    ocid: "0",
                                    topic: getTopic.topic,
                                    topictotquestions: getTopic.total_questions
                                }
                            }}
                        >

                            <Card as={Card.Body} className="d-flex flex-row justify-content-between shadow-sm border-0 h-100">
                                <h5 className="mb-0"><span>{this.idFunction(index)}.</span> {getTopic.topic}</h5>
                                <div className="percentage">{getTopic.practice_percentage}%</div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        )
    }
}

export default TopicsGroupCard
