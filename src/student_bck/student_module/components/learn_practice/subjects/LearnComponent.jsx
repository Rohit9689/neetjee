import React, { Component } from 'react';
import Chart from "react-google-charts";
import { Card } from 'react-bootstrap';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { Link } from "react-router-dom";

const FETCH_CUSTOMCONTENT = gql`
  query($topicId: Int,$chapterId:Int,$mobile: String!) {
        getCustomContent(topicId: $topicId,chapterId:$chapterId, mobile: $mobile){
            id
            customcontent
            content{
                id
                subject
                title
                description
                video_link
                file
                bookmarked
                
            }
        }
    }
`;

class LearnComponent extends Component {
    render() {
        const topics = this.props.topics;
        const loading1 = topics.loading;
        const error1 = topics.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const funData = topics.getCustomContent.find((a) => a.id == 1);
        console.log("LearnComponentass", this.props.chapterid);
        return (
            <React.Fragment>
                <div className="card-box d-flex p-1">
                    <Card className="border-primary w-100">
                        <Card.Body className="p-2">
                            <div className="d-flex align-items-center">
                                <i className="text-primary fad fa-video fa-fw fa-2x mr-1" />
                                <div className="text-dark">Videos</div>
                            </div>
                            <div className="mt-4" style={{ fontSize: 12 }}>{this.props.availableVideos}</div>
                        </Card.Body>
                        <Card.Footer className="p-1">
                            {/* <p>Watching <i className="ml-2 fal fa-long-arrow-right" /></p> */}
                            <Link to="/student/subject/start-watching">Start Watching <i className="ml-2 fal fa-long-arrow-right" /></Link>
                        </Card.Footer>
                    </Card>
                    <Card className="border-success w-100 ml-2">
                        <Card.Body className="p-2">
                            <div className="d-flex align-items-center">
                                <i className="text-success fad fa-clipboard fa-fw fa-2x mr-1" />
                                <div className="text-dark">Revision <small>Material</small></div>
                            </div>
                            <div className="mt-2" style={{ fontSize: 12 }}>{this.props.availableMaterial}</div>
                        </Card.Body>
                        <Card.Footer className="p-1">
                            {/* <p>Learning <i className="ml-2 fal fa-long-arrow-right" /></p> */}
                            <Link to="/student/subject/start-learning">Start Learning <i className="ml-2 fal fa-long-arrow-right" /></Link>
                        </Card.Footer>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default
    compose(graphql(FETCH_CUSTOMCONTENT,
        {
            options: props => ({
                variables: {
                    topicId: 0,
                    chapterId: parseInt(props.chapterid),
                    mobile: Cookies.get("mobile")
                },
            }), name: "topics"
        }))(LearnComponent);

