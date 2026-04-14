import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, Nav, Image, Button } from 'react-bootstrap';
import { recentdVideo, similarRecentdVideo, recommendedVideos } from './VideoData'
import '../_notes.scss';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../../preloader/PreloaderTwo';

const FETCH_NOTESHORTNOTES = gql`
  query(
          $mobile: String!, $subject_id: Int, $tag_id: String, $contentType: Int) {
            getStudentNotes(mobile: $mobile, subject_id: $subject_id, tag_id:$tag_id, contentType:$contentType ){
              id
              customcontent
              content{
                  id
                  subject
                  title
                  chapter
                  description
                  video_link
                  tags
                  comments
                  file
                  question
                  option1
                  option2
                  option3
                  option4
                  explanation
                  answer
              }
          }
      }
`;

class NotesVideoSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            thumbnailUrl: "",
            videoUrl: "",
            duration: ""
        }
    }
    thumbnailFun(data) {
        //const { item } = this.state;
        const VIMEO_ID = data;
        fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`, { mode: 'cors' })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    thumbnailUrl: res.video.thumbs['640'],
                    videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
                    duration: res.video.duration
                })
            });
    }
    render() {
        const getStudentNotes = this.props.getStudentNotes;
        const loading1 = getStudentNotes.loading;
        const error1 = getStudentNotes.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) return <PreloaderTwo />;
        const { id, videoThumbnail, Title, subTitle } = recentdVideo[0];
        return (
            <div className="bookmarks_videos pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Container>
                    <Row className="page-indication">
                        <Col xl={12} lg={12} md={12}>
                            <div className="title mt-3 mb-4">
                                <h5>Notes Navbar</h5>
                            </div>
                            <Nav className="my-3">
                                <Nav.Item>
                                    <Nav.Link
                                        className="active"
                                        as={Link}
                                        to={{
                                            pathname: "/student/notes/videos",
                                            state: {
                                                tagid: this.props.getData.tagid,
                                                subjectid: this.props.getData.subjectid,
                                                defaultActiveKey: this.props.getData.defaultActiveKey
                                            }
                                        }}
                                    >Videos
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item><Nav.Link as={Link}
                                    to={{
                                        pathname: "/student/notes/shortnotes-and-materials",
                                        state: {
                                            tagid: this.props.getData.tagid,
                                            subjectid: this.props.getData.subjectid,
                                            defaultActiveKey: this.props.getData.defaultActiveKey
                                        }
                                    }}
                                >Shortnotes and Revision material</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link}
                                    to={{
                                        pathname: "/student/notes/practice-questions",
                                        state: {
                                            tagid: this.props.getData.tagid,
                                            subjectid: this.props.getData.subjectid,
                                            defaultActiveKey: this.props.getData.defaultActiveKey
                                        }
                                    }}
                                >Practice Questions</Nav.Link></Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link}
                                        to={{
                                            pathname: "/student/notes/exam-questions",
                                            state: {
                                                tagid: this.props.getData.tagid,
                                                subjectid: this.props.getData.subjectid,
                                                defaultActiveKey: this.props.getData.defaultActiveKey
                                            }
                                        }}
                                    >Exam Questions</Nav.Link></Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <div className="title mt-3 mb-4">
                        <h5>Notes Videos</h5>
                    </div>
                    <div className="mb-3">
                        {/* <Row>
                            <Col xl={7} lg={7} md={12} sm={12}>
                                <Link to="/student/notes/videos/watch-video">
                                    <Card key={id} as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                        <Image src={videoThumbnail} title="vimeo-player" fluid />
                                        <div className="content bg-blur">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="text-block py-1">
                                                    <Card.Title className="title text-white px-2">{Title}</Card.Title>
                                                    <div className="sub-title text-white pl-2">{subTitle}</div>
                                                </div>
                                                <Button className="btn btn-success btn-lg"><i className="fas fa-play text-white" /></Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col xl={5} lg={5} md={12} sm={12}>
                                <Row>
                                    {
                                        similarRecentdVideo.map((item) => {
                                            const { id, videoThumbnail, Title, Likes, videoDurations } = item;
                                            return (
                                                <Col key={id} xl={6} lg={6} md={6} sm={12} xs={12} >
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
                            </Col>
                        </Row> */}
                        <Row>
                            {/* <Col xl={12} lg={12} md={12} sm={12} className="my-3">
                                <h5>Recommended </h5>
                            </Col> */}
                            {
                                getStudentNotes.getStudentNotes[0].content.map((item) => {
                                    //const { id, videoThumbnail, Title, Likes, videoDurations } = item;
                                    return (
                                        <Col key={id} xl={2} lg={2} md={6} sm={6} xs={12} >
                                            <Link
                                                //to="/#"
                                                to={{
                                                    pathname: "/student/notes/videos/watch-video",
                                                    state: {
                                                        videolink: item.video_link,
                                                        id: item.id,
                                                        comments: item.comments,
                                                        tags: item.tags,
                                                        title: item.title,
                                                        studentGlobals: this.props.studentGlobals
                                                    }
                                                }}
                                            >
                                                <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <Image src={videoThumbnail} title="vimeo-player" fluid />
                                                    <div className="content pt-1">
                                                        <Card.Title className="px-2">{item.title}</Card.Title>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2"><i className="fas fa-heart text-danger" />: 100</div>
                                                            <div className="videodurations text-white">25:56 Min</div>
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
            </div>
        )
    }
}
export default
    compose(graphql(FETCH_NOTESHORTNOTES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    subject_id: parseInt(props.stateData.subjectId),
                    tag_id: props.stateData.tags,
                    contentType: 5
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentNotes"
        })
    )(NotesVideoSection);
