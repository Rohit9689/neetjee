import React, { Component } from 'react'
import { components } from 'react-select'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Card, Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PdfModal from '../learn_practice/subjects/PdfModal';
import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import parse, { domToReact } from "html-react-parser";
const FETCH_VIDEOS = gql`
  query($params: VideosInput) {
    getFeaturedVideos(
      params: $params
    ) {
      videoDetails{
        totalVideos
        videosList{
          id
          paid_video
          title
          class
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
          video_source
        }
      }
      }
  }
`;
class FearturedRecentlyWatchedVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow1: false,
            modaltitle: "",
            pdf_file: "",
        }

    }
    modalShow1 = (title, pdf_file) => {
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    render() {
        const EXAMTYPE = [{
            id: "0",
            value: "NEET"
        },
        {
            id: "1",
            value: "JEE Mains"
        },
        {
            id: "2",
            value: "JEE Advance"
        }]
        let etypeData = EXAMTYPE.find((a) => a.id == this.props.examtype);
        const getRecentlyWatchedVideos = this.props.getRecentlyWatchedVideos;
        const loading1 = getRecentlyWatchedVideos.loading;
        const error1 = getRecentlyWatchedVideos.error;
        if (loading1) return (
            <Row className="recently-videos py-3">
                {/* <Col xl={12} lg={12} md={12}>
                    <div className="my-3 d-flex align-items-center">
                        <h5 className="mb-0 font-weight-bold">Recently Watched</h5>
                        <Link
                            className="text-decoration-none text-primary scroll-more text-uppercase ml-3">More Videos</Link>
                    </div>
                </Col> */}
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
        let Data = getRecentlyWatchedVideos.getFeaturedVideos.videoDetails.videosList
        console.log("featureddd", this.props);
        const settings = {
            // dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: (
                <div>
                    <div className="next-slick-arrow"> <i className="fas fa-chevron-right"></i> </div>
                </div>
            ),
            prevArrow: (
                <div>
                    <div className="prev-slick-arrow"> <i className="fas fa-chevron-left"></i> </div>
                </div>
            ),
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };


        return (
            <Row>
                <Col xs={12} className="d-flex align-items-center">
                    {this.props.type=="fdefaultvideo"?(
                        <h1 style={{fontSize:"1.75rem"}} className="mb-2 mr-2">Help Videos</h1>
                    ):("")}
                    
                    {/* <Link to={{
                        pathname: "/student/videos/recently-watched",
                        state: {
                            videoData: Data,
                            type: etypeData.value,
                            urltype: this.props.type,
                            mobile: this.props.mobile,
                            mname:this.props.mname
                        }
                    }} className="text-uppercase text-decoration-none">More Videos</Link> */}
                </Col>
                <Col xl={12}>
                    {Data.length > 0 ? (

                        <Row>
                            {
                                Data.map((videoData, index) => {
                                    // if (index <= 10) {
                                    return (
                                        <Col xl={3} lg={4} md={6} sm={6} key={videoData.id} className="pt-1">
                                            <Card className="single-slide-card shadow-sm border-0">
                                                <Card.Header className="bg-white border-0 mb-0 p-1">
                                                    <Link to={{
                                                        pathname: "/student/subject/start-video-watching",
                                                        state: {
                                                            index: index,
                                                            videosList: Data,
                                                            type: "iv",
                                                            mobile: this.props.mobile,
                                                            urltype: this.props.type,
                                                            mname: this.props.mname

                                                        }
                                                    }}>
                                                        {videoData.thumbnail != "" ? (<Card.Img variant="top slick-slide-image shadow" src={videoData.thumbnail} alt={videoData.title} />) : (
                                                            <Card.Img variant="top slick-slide-image shadow" src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} alt="img" />
                                                        )}

                                                    </Link>
                                                </Card.Header>
                                                <Card.Body className="p-2 pt-0">
                                                    <h2 className="slick-slide-title">{parse(
                                                        this.decodefun(
                                                            videoData.title
                                                        )
                                                    )}</h2>
                                                    {videoData.subjectName != "" ?
                                                        <Row className="g-0">
                                                            <Col xs={4}>Subject:</Col>
                                                            <Col xs={8}>{videoData.subjectName}</Col>
                                                        </Row>
                                                        : ("")}
                                                    {videoData.ChapterName != "" ?
                                                        <Row className="g-0">
                                                            <Col xs={4}>Chapter:</Col>
                                                            <Col xs={8}>{videoData.ChapterName}</Col>
                                                        </Row>
                                                        : ("")}
                                                    {videoData.topicName != "" ?
                                                        <Row className="g-0">
                                                            <Col xs={4}>Topic:</Col>
                                                            <Col xs={8}>{videoData.topicName}</Col>
                                                        </Row>
                                                        : ("")}
                                                </Card.Body>
                                                <Card.Footer className="bg-white border-0 d-flex align-items-center justify-content-between p-2">
                                                    <div className="views">
                                                        {/* <i className="fas fa-eye text-dark" /> : {videoData.views} */}
                                                    </div>
                                                    {videoData.pdf_file != "" ? <Button variant="link" onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)}>View Notes</Button> : ("")}
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    )
                                    //}


                                })
                            }
                        </Row>
                    ) : ("No Data Available")}

                </Col>
                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </Row >
        )
    }
}


export default withRouter(compose(

    graphql(FETCH_VIDEOS, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: props.mobile,
                    exam: parseInt(props.examtype),
                    exam_type: "",
                    class1: 0,
                    subject: 0,
                    chapter: "",
                    topic: "",
                    category_id: 0,
                    institute_id: 0,
                    page: 0,
                    latest: 0,
                    recently_watched: 0
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getRecentlyWatchedVideos",
    }))(FearturedRecentlyWatchedVideos));