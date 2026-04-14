import React, { Component } from 'react'
import { components } from 'react-select'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Row, Card, Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { newVideos, similarRecentdVideo, recentlyWatchedVideo, liveclassVideo } from './VideoData';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PdfModal from '../learn_practice/subjects/PdfModal';
import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';

const FETCH_VIDEOS = gql`
  query($params: VideosInput) {
    getVideoCategories(
      params: $params
    ) {
        id
        category
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
`;
class CategoryVideos extends Component {
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
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1024: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                    1360: {
                        items: 4,
                    },
                }
            }
        }

    }
    modalShow1 = (title, pdf_file) => {
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

    }
    render() {
        console.log("params:", {
            mobile: Cookies.get("mobile"),
            exam: parseInt(Cookies.get("examid")),
            class1: parseInt(this.props.stateData.class),
            subject: parseInt(this.props.stateData.subject),
            chapter: this.props.stateData.chapter,
            topic: this.props.stateData.topic,
            institute_id: 0,
            page: 0,
            latest: 0,
            recently_watched: 0
        });
        const getVideoCategories = this.props.getVideoCategories;
        const loading1 = getVideoCategories.loading;
        const error1 = getVideoCategories.error;
        if (loading1) return (
            <Row className="recently-videos py-3">
                <Col xl={12} lg={12} md={12}>
                    <div className="my-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 font-weight-bold">Category Videos</h5>
                        <Link
                            className="text-decoration-none text-dark scroll-more text-uppercase">More Videos</Link>
                    </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                    <div className="d-flex justify-content-center">
                        <div class="spinner-border text-primary"></div>
                    </div>

                </Col>

            </Row>
        );
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const Data = getVideoCategories.getVideoCategories
        console.log("getVideoCategories", getVideoCategories.getVideoCategories);
        return (
            <Row className="recently-videos py-3">
                {Data.length > 0 ? (<React.Fragment>
                    {Data.map((map) => {
                        if (map.videosList.length > 0) {
                            let Data = map.videosList;
                            return (<React.Fragment>
                                <Col xl={12} lg={12} md={12}>
                                    <div className="my-3 d-md-flex align-items-center header-titles">
                                        <h5 className="mb-0 font-weight-bold">{this.props.etypeData.value} Videos</h5>
                                        <Link
                                            to={{
                                                pathname: "/student/videos/recently-watched",
                                                state: {
                                                    videoData: map.videosList,
                                                    type: "Category Videos"
                                                }
                                            }}

                                            className="text-decoration-none text-primary scroll-more text-uppercase ml-3">More Videos</Link>
                                    </div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    {Data.length > 0 ? (
                                        <OwlCarousel
                                            {...this.state.options}
                                            className="owl-theme"
                                        // responsive={this.state.responsive}
                                        >
                                            {
                                                Data.map((videoData, index) => {
                                                    if (index <= 10) {
                                                        return (

                                                            <Card className="single_video">
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
                                                                    {/* <div key={videoData.id} className="items single_video d-flex flex-column my-1"> */}
                                                                    {videoData.thumbnail != "" ? (<Card.Img src={videoData.thumbnail} title={videoData.title} fluid rounded className="shadow" />) : (
                                                                        <Card.Img src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid rounded className="shadow" />
                                                                    )}
                                                                    {/* <div className="content mt-2">
                                                    <p className="title mb-1">{videoData.title}</p>
                                                    <h6 className="topic-text mb-0">{videoData.topicName}</h6>
                                                </div> */}
                                                                </Link>
                                                                <Card.Body className="content p-2">
                                                                    <h6 className="title mb-1">{videoData.title}</h6>
                                                                    {/* <h6 className="topic-text mb-0">{videoData.topicName}</h6> */}

                                                                    {videoData.subjectName != "" ? (<p className="subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '44%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>) : ("")}
                                                                    {videoData.ChapterName != "" ? (<p style={{ fontSize: 12 }} className="chapter text-uppercase d-flex"><strong style={{ width: '44%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>) : ("")}
                                                                    {videoData.topicName != "" ? (<p style={{ fontSize: 12 }} className="topic text-uppercase d-flex"><strong style={{ width: '44%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>) : ("")}
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
                            </React.Fragment>)
                        }
                    })}
                </React.Fragment>) : ("No Data Available")}
                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </Row>
        )
    }
}


export default withRouter(compose(

    graphql(FETCH_VIDEOS, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: Cookies.get("mobile"),
                    exam: parseInt(Cookies.get("examid")),
                    class1: parseInt(props.stateData.class),
                    subject: parseInt(props.stateData.subject),
                    chapter: props.stateData.chapter,
                    topic: props.stateData.topic,
                    institute_id: 0,
                    page: 0,
                    latest: 0,
                    recently_watched: 0
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getVideoCategories",
    }))(CategoryVideos));