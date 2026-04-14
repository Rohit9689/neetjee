import React, { Component } from 'react'
import { components } from 'react-select'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Row, Card,Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { newVideos, similarRecentdVideo, recentlyWatchedVideo, liveclassVideo } from './VideoData';

import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';

const FETCH_VIDEOS = gql`
  query($params: VideosInput) {
    getVideos(
      params: $params
    ) {
      videoDetails{
        totalVideos
        videosList{
          id
          paid_video
          title
          subject
          class
          chapter
          description
          video_url
          vimeo_url
          subjectName
          ChapterName
          topicName
          likes
          dislikes
          views
          is_purchased
          thumbnail
          video_id
          created_timestamp
          pdf_file
        }
      }
      }
  }
`;
class LatetsVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                loop: false,
                nav: true,
                dots: false,
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1024: {
                        items: 3,
                    },
                    1200: {
                        items: 6,
                    },
                    1360: {
                        items: 6,
                    },
                },
            }
        }

    }

    render() {
        const Classes = [
            { value: 1, label: 'Classes-1' },
            { value: 2, label: 'Classes-2' },
            { value: 3, label: 'Classes-3' }
        ];
        const Mains = [
            { value: 1, label: 'Mains-1' },
            { value: 2, label: 'Mains-2' },
            { value: 3, label: 'Mains-3' }
        ];
        const Chapter = [
            { value: 'Chapter-1', label: 'Chapter-1', color: '#00B8D9', isFixed: true },
            { value: 'Chapter-2', label: 'Chapter-2', color: '#0052CC', isFixed: true },
            { value: 'Chapter-3', label: 'Chapter-3', color: '#5243AA' },
        ];
        const Subject = [
            { value: 'Subject-1', label: 'Subject-1', color: '#00B8D9', isFixed: true },
            { value: 'Subject-2', label: 'Subject-2', color: '#0052CC', isFixed: true },
            { value: 'Subject-3', label: 'Subject-3', color: '#5243AA' },
        ];
        const Topic = [
            { value: 'Topic-1', label: 'Topic-1', color: '#00B8D9', isFixed: true },
            { value: 'Topic-2', label: 'Topic-2', color: '#0052CC', isFixed: true },
            { value: 'Topic-3', label: 'Topic-3', color: '#5243AA' },
        ];
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };
        const getLatestVideos = this.props.getLatestVideos;
        const loading1 = getLatestVideos.loading;
        const error1 = getLatestVideos.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        const Data = getLatestVideos.getVideos.videoDetails.videosList
        console.log("getLatestVideos", getLatestVideos.getVideos.videoDetails.videosList);
        return (
            <Jumbotron className="p-2 px-3 pb-2 mb-4 shadow-sm">
                <Row>
                    <Col xl={6} lg={12} md={12} sm={12}>
                        <div className="watch_video d-flex flex-column my-2">
                            <ResponsiveEmbed aspectRatio="16by9" className="shadow overflow-hidden">
                                <iframe rounded="true" className="embed-responsive-item" src={Data[0].vimeo_url} title={Data[0].title} allowFullScreen></iframe>
                            </ResponsiveEmbed>
                            <div className="content mt-3">
                                <Link
                                    to={{
                                        pathname: "/student/subject/start-video-watching",
                                        state: {
                                            index: 0,
                                            videosList: Data,
                                            type: "iv"
                                        }
                                    }}
                                    className="title mb-1">{Data[0].title}</Link>
                                <h6 className="topic-text mb-0">{Data[0].topicName}</h6>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} lg={12} md={12} sm={12}>
                        <Row>
                            {
                                Data.map((videoData, index) => {
                                    if (index != 0 && index <= 6) {
                                        return (
                                            <Col key={videoData.id} xl={4} lg={4} md={4} sm={6} xs={6} >
                                                <Card className="single_video d-flex flex-column my-1">
                                                    <Link
                                                        to={{
                                                            pathname: "/student/subject/start-video-watching",
                                                            state: {
                                                                index: index,
                                                                videosList: Data,
                                                                type: "iv"
                                                            }
                                                        }}
                                                        className="text-decoration-none text-dark">
                                                        {/* <div className="single_video d-flex flex-column my-1"> */}
                                                        {videoData.thumbnail != "" ? (<Card.Img src={videoData.thumbnail} title={videoData.title} fluid rounded className="shadow" />) : (
                                                            <Card.Img src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid rounded className="shadow" />
                                                        )}
                                                    </Link>
                                                    {/* <div className="content mt-2">
                                                            <p className="title mb-1">{videoData.title}</p>
                                                            <h6 className="topic-text mb-0">{videoData.topicName}</h6>
                                                        </div> */}
                                                    <Card.Body className="content p-2">
                                                        <h6 className="title mb-1">{videoData.title}</h6>
                                                        {/* <h6 className="topic-text mb-0">{videoData.topicName}</h6> */}

                                                        <p className="subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '35%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="chapter text-uppercase d-flex"><strong style={{ width: '35%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="topic text-uppercase d-flex"><strong style={{ width: '35%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" style={{ backgroundColor: "#202B63" }} className="text-white text-decoration-none">View Notes</Button>) : ("")}

                                                        </div>
                                                    </Card.Body>
                                                    {/* </div> */}
                                                </Card>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Jumbotron>
        )
    }
}


export default compose(

    graphql(FETCH_VIDEOS, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: Cookies.get("mobile"),
                    exam: parseInt(Cookies.get("examid")),
                    class1: 0,
                    subject: 0,
                    chapter: "",
                    topic: "",
                    institute_id: 0,
                    page: 0,
                    latest: 1,
                    recently_watched: 0
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getLatestVideos",
    }))(LatetsVideos);