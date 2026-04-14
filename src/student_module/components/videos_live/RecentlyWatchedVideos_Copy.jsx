import React, { Component } from 'react'
import { components } from 'react-select'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Row, Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { newVideos, similarRecentdVideo, recentlyWatchedVideo, liveclassVideo } from './VideoData';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';

import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
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
class RecentlyWatchedVideos extends Component {
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
        const getRecentlyWatchedVideos = this.props.getRecentlyWatchedVideos;
        const loading1 = getRecentlyWatchedVideos.loading;
        const error1 = getRecentlyWatchedVideos.error;
        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const Data = getRecentlyWatchedVideos.getVideos.videoDetails.videosList
        return (
            <Row className="recently-videos py-3">
                <Col xl={12} lg={12} md={12}>
                    <div className="my-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 font-weight-bold">Recently Watched</h5>
                        <Link
                            to={{
                                pathname: "/student/videos/recently-watched",
                                state: {
                                    videoData: Data,
                                    type:"Recently Watched"
                                }
                            }}

                            className="text-decoration-none text-dark scroll-more text-uppercase">More Videos</Link>
                    </div>
                </Col>
                <Col xl={12} lg={12} md={12}>
                    <OwlCarousel
                        {...this.state.options}
                        className="owl-theme"
                    // responsive={this.state.responsive}
                    >
                        {
                            Data.map((videoData, index) => {
                                if (index <= 10) {
                                    return (
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
                                            <div key={videoData.id} className="items single_video d-flex flex-column my-1">
                                                {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid rounded className="shadow" />) : (
                                                    <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid rounded className="shadow" />
                                                )}
                                                <div className="content mt-2">
                                                    <p className="title mb-1">{videoData.title}</p>
                                                    <h6 className="topic-text mb-0">{videoData.topicName}</h6>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }


                            })
                        }
                    </OwlCarousel>
                </Col>
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
                    class1: 0,
                    subject: 0,
                    chapter: "",
                    topic:"",
                    institute_id: 0,
                    page: 0,
                    latest: 0,
                    recently_watched: 1
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getRecentlyWatchedVideos",
    }))(RecentlyWatchedVideos));