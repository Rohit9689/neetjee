import React, { Component } from 'react'
import { components } from 'react-select'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Row, Card, Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { newVideos, similarRecentdVideo, recentlyWatchedVideo, liveclassVideo } from './VideoData';

import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PdfModal from '../learn_practice/subjects/PdfModal';
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
            modalShow1: false,
            modaltitle: "",
            pdf_file: "",
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
                        items: 2,
                    },
                    992: {
                        items: 2,
                    },
                    1024: {
                        items: 2,
                    },
                    1200: {
                        items: 2,
                    },
                    1360: {
                        items: 2,
                    },
                },
            }
        }


    }
    modalShow1 = (title, pdf_file) => {
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

    }

    render() {
        const getLatestVideos = this.props.getLatestVideos;
        const loading1 = getLatestVideos.loading;
        const error1 = getLatestVideos.error;
        if (loading1) return (
            <Jumbotron className="p-2 px-3 pb-2 mb-4 shadow-sm">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="d-flex justify-content-center">
                            <div class="spinner-border text-primary"></div>
                        </div>
                    </Col>
                </Row>
            </Jumbotron>
        );
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
                        {Data.length > 0 ? (
                            <OwlCarousel
                                {...this.state.options}
                                className="owl-theme"
                            
                            >
                                {
                                    Data.map((videoData, index) => {
                                        if (index != 0 && index <= 6) {
                                            return (

                                                <Card key={videoData.id} className="single_video d-flex flex-column my-1">
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

                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid rounded className="shadow" />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid rounded className="shadow" />
                                                        )}

                                                        
                                                    </Link>
                                                    <Card.Body className="content p-2">
                                                        <h6 className="title mb-1">{videoData.title}</h6>
                                                        
                                                        {videoData.subjectName != "" ? (<p className="subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '45%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>) : ("")}
                                                        {videoData.ChapterName != "" ? (<p style={{ fontSize: 12 }} className="chapter text-uppercase d-flex"><strong style={{ width: '45%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>) : ("")}
                                                        {videoData.topicName != "" ? (<p style={{ fontSize: 12 }} className="topic text-uppercase d-flex"><strong style={{ width: '45%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>) : ("")}



                                                        <div className="d-flex justify-content-between align-items-center video_footer">
                                                            <div className="likes text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" style={{ backgroundColor: "#202B63" }} className="text-white text-decoration-none">View Notes</Button>) : ("")}

                                                        </div>
                                                    </Card.Body>
                                                </Card>


                                            )
                                        }
                                    })
                                }
                            </OwlCarousel>
                        ) : ("")}

                    </Col>
                </Row>
                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </Jumbotron >
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