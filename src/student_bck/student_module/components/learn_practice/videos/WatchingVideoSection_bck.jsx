import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { recentdVideo, similarRecentdVideo, recommendedVideos } from './VideoData'
import '../_subjects.scss';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import axios from 'axios';

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

class WatchingVideoSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: []
        }

    }
    async  thumbNails(thumbnail) {
        console.log("thumbnail", thumbnail);
        fetch(`https://player.vimeo.com/video/${thumbnail}/config`, {
            mode: 'cors'
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    records: response
                })
            })
            .catch(error => console.log("errr", error))

        // const response = await fetch(`https://player.vimeo.com/video/${thumbnail}/config`);
        // const json = response.json();
        // console.log("json", json);
        // this.setState({ records: json });

        // try {
        //     const response = await fetch(`https://player.vimeo.com/video/${thumbnail}/config`);
        //     const json = response.json();
        //     this.setState({ records: json });
        // } catch (error) {
        //     console.log(error);
        // }

        // try {
        //     const response = await fetch(`https://player.vimeo.com/video/${thumbnail}/config`);
        //     if (!response.ok) {
        //         throw Error(response.statusText);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        // const url = `https://player.vimeo.com/video/${thumbnail}/config`;
        // axios.get(url).then(response => response.data)
        //     .then((data) => {
        //         this.setState({ records: data })
        //         console.log(this.state.records)
        //     })

    }
    render() {
        console.log("currentState", this.state);
        const topics = this.props.topics;
        const loading1 = topics.loading;
        const error1 = topics.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("WatchingVideoSection", topics.getCustomContent);
        const videoData = topics.getCustomContent.find((a) => a.id == 5);
        const { id, videoThumbnail, Title, subTitle } = recentdVideo[0];
        return (
            <section className="subject_section">
                <Container>
                    <div className="title mt-3 mb-4">
                        <h5>Biology and Its Applications</h5>
                        <p>Select video to Start Learning &amp; practice</p>
                    </div>
                    <div className="mb-3 WatchingVideos">
                        <Row>
                            {videoData.content.map((videoData, index) => (
                                <React.Fragment>
                                    {index == 0 ? (
                                        <Col xl={9} lg={9} md={12} sm={12}>
                                            <Link to="/student/subject/video-watching">
                                                <Card key={id} as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <Image src={this.thumbNails(videoData.video_link)} title="vimeo-player" fluid />
                                                    <div className="content bg-blur">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="text-block py-1">
                                                                <Card.Title className="title text-white px-2">{videoData.title}</Card.Title>
                                                                <div className="sub-title text-white pl-2">Continue video</div>
                                                            </div>
                                                            <Button className="btn btn-success btn-lg"><i className="fas fa-play text-white" /></Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </Col>
                                    ) : index == 1 || index == 2(
                                        <Col xl={3} lg={3} md={12} sm={12}>
                                            {/* <Row>
                                                <Col key={id} xl={12} lg={12} md={6} sm={12} xs={12} >
                                                    <Link to="/#">
                                                        <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                            <Image src={videoThumbnail} title="vimeo-player" fluid />
                                                            <div className="content pt-1">
                                                                <Card.Title className="px-2">{Title}</Card.Title>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="likes pl-2"><i className="fas fa-heart text-danger" />: {Likes}</div>
                                                                    <div className="videodurations text-white">{videoDurations}</div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            </Row> */}
                                        </Col>
                                    )}


                                </React.Fragment>
                            ))}
                        </Row>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} className="my-3">
                                <h5>Recommended </h5>
                            </Col>
                            {
                                recommendedVideos.map((item) => {
                                    const { id, videoThumbnail, Title, Likes, videoDurations } = item;
                                    return (
                                        <Col key={id} xl={3} lg={6} md={6} sm={6} xs={12} >
                                            <Link to="/#">
                                                <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <Image src={videoThumbnail} title="vimeo-player" fluid />
                                                    <div className="content pt-1">
                                                        <Card.Title className="px-2">{Title}</Card.Title>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2"><i className="fas fa-heart text-danger" />: {Likes}</div>
                                                            <div className="videodurations text-white">{videoDurations}</div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Container>
            </section>
        )
    }
}


export default
    compose(graphql(FETCH_CUSTOMCONTENT,
        {
            options: props => ({
                variables: {
                    topicId: parseInt(props.getChapterId.otid),
                    chapterId: parseInt(props.getChapterId.ocid),
                    mobile: Cookies.get("mobile")
                },
            }), name: "topics"
        }))(WatchingVideoSection);
