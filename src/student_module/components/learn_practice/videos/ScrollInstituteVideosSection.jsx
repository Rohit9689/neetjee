import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import { recentdVideo, similarRecentdVideo, recommendedVideos } from './VideoData'
import '../_subjects.scss'
import BuyChapterVideoModal from '../subjects/BuyChapterVideoModal';
import InstituteVideosSection from './InstituteVideosSection';
import * as Cookies from "es-cookie";
import { withApollo } from "@apollo/client/react/hoc";
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from "@apollo/client";
import { components } from 'react-select'
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown"
import { MultiSelect } from "react-multi-select-component";
import PdfModal from '../subjects/PdfModal';
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class ScrollInstituteVideosSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getVideos: props.getVideos,
            page: props.page,
            loader: 0,
            hasMore: true,
            modalShow1: false,
            modaltitle: "",
            pdf_file: ""
        }
    }

    modalShow1 = (title, pdf_file) => {
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

    }
    onScrollgetVideos = async (e) => {
        console.log("this.state.getVideos.length", this.state.getVideos.length);
        if (this.state.getVideos.length < 9) {
            this.setState({ hasMore: false });
        }
        else {
            let page = parseInt(this.state.page) + 1;
            const result = await this.props.client.query({
                query: gql`
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
              `,
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        exam: parseInt(Cookies.get("examid")),
                        class1: 0,
                        subject: parseInt(this.props.ComponentParams.subject),
                        chapter: this.props.ComponentParams.chapter,
                        institute_id: parseInt(Cookies.get("institution_id")),
                        page: parseInt(page)
                    }
                },
            })
            console.log("params:", {
                mobile: Cookies.get("mobile"),
                exam: parseInt(Cookies.get("examid")),
                class1: 0,
                subject: parseInt(this.props.ComponentParams.subject),
                chapter: parseInt(this.props.ComponentParams.chapter),
                institute_id: parseInt(Cookies.get("institution_id")),
                page: parseInt(page)
            });

            if (result.data.getVideos.length == 0) {
                this.setState({ hasMore: false, page: page });
                return;
            }
            else {
                setTimeout(() => {
                    this.setState({
                        page: page,
                        getVideos: this.state.getVideos.concat(result.data.getVideos)
                    });
                }, 500);
            }
        }
    }
    render() {
        const { id, videoThumbnail, Title, subTitle } = recentdVideo[0];
        //console.log("InfiniteScroll",this.props.defaultActiveKey,this.props.getChapterId.otid);
        let videosList = this.state.getVideos.videoDetails.videosList;
        //console.log("No Options", this.props.stateData.searchclass, this.props.stateData.chaptertype);
        if (this.props.stateData.searchclass != "0") {
            videosList = this.state.getVideos.videoDetails.videosList.filter((a) => a.class == this.props.stateData.searchclass);
        }
        else if (this.props.stateData.chaptertype.length > 0) {
            videosList = this.state.getVideos.videoDetails.videosList.filter((a) => this.props.stateData.chaptertype.includes(a.chapter.toString()));
        }


        return (
            <React.Fragment>
                {this.state.getVideos.length > 7 ? (
                    <InfiniteScroll
                        dataLength={this.state.getVideos.length}
                        next={this.onScrollgetVideos}
                        hasMore={this.state.hasMore}
                        loader={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Loading...</b>
                            </p>}
                        endMessage={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >


                        <div className="mb-3 WatchingVideos">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                    <h5>Institute Videos</h5>
                                </Col>
                                {videosList.map((videoData, index) => {
                                    if (videoData.is_purchased == true) {
                                        console.log("videoData", videoData);
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={6} xs={12} >
                                                <Link to={{
                                                    pathname: "/student/subject/start-video-watching",
                                                    state: {
                                                        index: index,
                                                        videosList: videosList.filter((a) => a.is_purchased == true),
                                                        getChapterId: this.props.getChapterId,
                                                        ComponentParams: this.props.ComponentParams

                                                    }
                                                }}>
                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                        )}

                                                        <div className="content pt-1">
                                                            <h6 className="px-2 title">{videoData.title}</h6>
                                                            <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                                {videoData.pdf_file!=""?( <Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>):("")}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )

                                    }
                                    else {
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={6} xs={12} >
                                                <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                    {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                        <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                    )}
                                                    <div className="content pt-1">
                                                        <h6 className="px-2 title">{videoData.title}</h6>
                                                        <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file!=""?( <Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>):("")}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>

                                        )
                                    }

                                })}
                            </Row>
                        </div>

                    </InfiniteScroll>
                ) : (

                        <div className="mb-3 WatchingVideos">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                    <h5>Institute Videos</h5>
                                </Col>
                                {videosList.map((videoData, index) => {
                                    if (videoData.is_purchased == true) {
                                        console.log("videoData", videoData);
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={6} xs={12} >
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/start-video-watching",
                                                        state: {
                                                            index: index,
                                                            videosList: videosList.filter((a) => a.is_purchased == true),
                                                            getChapterId: this.props.getChapterId,
                                                            ComponentParams: this.props.ComponentParams

                                                        }
                                                    }}
                                                >
                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                        )}

                                                        <div className="content pt-1">
                                                            <h6 className="px-2 title">{videoData.title}</h6>
                                                            <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                                {videoData.pdf_file!=""?( <Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>):("")}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )

                                    }
                                    else {
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={6} xs={12} >

                                                <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                    {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                        <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                    )}
                                                    <div className="content pt-1">
                                                        <h6 className="px-2 title">{videoData.title}</h6>
                                                        <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file!=""?( <Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>):("")}
                                                        </div>
                                                    </div>
                                                </Card>

                                            </Col>

                                        )
                                    }

                                })}
                            </Row>
                            {videosList.length == 0 ? (<p style={{ textAlign: "center" }}>
                                <b>No data available </b>
                            </p>) : (<p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>)}
                        </div>
                    )}
                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </React.Fragment>



        )
    }
}


export default withApollo((ScrollInstituteVideosSection));
