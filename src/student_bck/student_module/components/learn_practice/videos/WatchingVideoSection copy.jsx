import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { recentdVideo, similarRecentdVideo, recommendedVideos } from './VideoData'
import '../_subjects.scss'
import BuyChapterVideoModal from '../subjects/BuyChapterVideoModal';
import InstituteVideosSection from './InstituteVideosSection';
import * as Cookies from "es-cookie";
import { withApollo } from "@apollo/client/react/hoc";
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from "@apollo/client";
class WatchingVideoSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            getVideos: props.getVideos,
            page: props.page,
            loader: 0,
            hasMore: true,
            records: ""
        }
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
                            title
                            subject
          chapter
                            description
                            video_url
                            vimeo_url
                            subjectName
                            ChapterName
                            likes
                            dislikes
                            views
                            is_purchased
                            thumbnail
                            video_id
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
                        subject: 0,
                        chapter: parseInt(this.props.getChapterId.ocid),
                        institute_id: 0,
                        page: parseInt(page)
                    }
                },
            })
            console.log("params:", {
                mobile: Cookies.get("mobile"),
                exam: parseInt(Cookies.get("examid")),
                class1: 0,
                subject: 0,
                chapter: parseInt(this.props.getChapterId.ocid),
                institute_id: 0,
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
        let selectionType = "";
        let subject = "0";
        let chapter = "0";
        let topic = "0";
        if (this.props.defaultActiveKey == "third") {
            if (this.props.getChapterId.otid != "0") {
                selectionType = "topic";
                topic = this.props.getChapterId.otid;
            }
            else {
                selectionType = "chapter";
                chapter = this.props.getChapterId.ocid;
            }

        }
        else {
            selectionType = "subject";
            subject = this.props.getChapterId.subjectid;
        }
        //console.log("44646456",selectionType,subject, chapter,topic, this.state.getVideos.videoDetails.videosList);
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
                        <section className="subject_section">
                            <Row className="align-items-center">
                                <Col xl={9} lg={9} md={12}>
                                    <div className="title-block mt-3 mb-2">
                                        <h5 className="title mb-0">{this.state.getVideos.videoDetails.videosList[0].ChapterName}</h5>
                                        <p className="text-gray4">Select video to Start Learning &amp; practice</p>
                                    </div>
                                </Col>
                                <Col xl={3} lg={3} md={12}>
                                    <Button variant="btn btn-darkblue ml-3 px-4" onClick={() => this.setState({ modalShow: true })}>Buy This Chapter video</Button>
                                    <BuyChapterVideoModal getChapterId={this.props.getChapterId}
                                        selectionType={selectionType}
                                        subject={subject}
                                        chapter={chapter}
                                        topic={topic}

                                        show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                                </Col>
                            </Row>
                            <div className="mb-3 WatchingVideos">
                                {/* <Row>
                              <Col xl={7} lg={7} md={12} sm={12}>
                                  <Link to={{
                                                        pathname:"/student/subject/video-watching",
                                                        state:{
                                                            videoObj:videoData,
                                                            getChapterId:this.props.getChapterId

                                                        }
                                                    }}>
                                      <Card key={id} as={Card.Body} className="p-0 single_video shadow-sm mt-xl-5 mt-lg-5 mb-2">
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
                                      <Col xl={12} lg={12} md={12}>
                                          <h5 className="my-1 pb-3">Recommended </h5>
                                      </Col>
                                      {
                                          similarRecentdVideo.map((item) => {
                                              const { id, videoThumbnail, Title, Likes, videoDurations } = item;
                                              return (
                                                  <Col key={id} xl={6} lg={6} md={6} sm={12} xs={12} >
                                                      <Link to={{
                                                        pathname:"/student/subject/start-video-watching",
                                                        state:{
                                                            videoObj:videoData,
                                                            getChapterId:this.props.getChapterId

                                                        }
                                                    }}>
                                                          <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                              <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                              <Image src={videoThumbnail} title="vimeo-player" fluid />
                                                              <div className="content pt-1">
                                                                  <Card.Title className="px-2 text-white">{Title}</Card.Title>
                                                                  <div className="d-flex justify-content-between align-items-center">
                                                                      <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {Likes}</div>
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
                                    <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                        <h5>ELAPP Videos</h5>
                                    </Col>
                                    {this.state.getVideos.videoDetails.videosList.map((videoData) => {
                                        if (videoData.is_purchased == true) {
                                            console.log("videoData", videoData);
                                            return (
                                                <Col key={id} xl={3} lg={3} md={6} sm={6} xs={12} >
                                                    <Link to={{
                                                        pathname: "/student/subject/start-video-watching",
                                                        state: {
                                                            videoObj: videoData,
                                                            getChapterId: this.props.getChapterId

                                                        }
                                                    }}>
                                                        <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                            <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                            {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title="vimeo-player" fluid />) : (
                                                                <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                            )}

                                                            <div className="content pt-1">
                                                                <Card.Title className="px-2 text-white">{videoData.title}</Card.Title>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {videoData.views}</div>
                                                                    <div className="videodurations text-white">0 Min</div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            )

                                        }
                                        else {
                                            return (
                                                <Col key={id} xl={3} lg={3} md={6} sm={6} xs={12} >
                                                    <Link

                                                        to={{
                                                            pathname: "/student/subject/video-watching",
                                                            state: {
                                                                videoObj: videoData,
                                                                getChapterId: this.props.getChapterId

                                                            }
                                                        }}
                                                    >
                                                        <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                            <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                            {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title="vimeo-player" fluid />) : (
                                                                <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                            )}
                                                            <div className="content pt-1">
                                                                <Card.Title className="px-2 text-white">{videoData.title}</Card.Title>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {videoData.views}</div>
                                                                    <div className="videodurations text-white">0 Min</div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>

                                            )
                                        }

                                    })}
                                </Row>
                                {Cookies.get("student_userlevel") == "1" ? (<InstituteVideosSection defaultActiveKey={this.props.defaultActiveKey} getChapterId={this.props.getChapterId} />) : ("")}


                            </div>
                        </section>
                    </InfiniteScroll>
                ) : (
                    <section className="subject_section">
                        <Row className="align-items-center">
                            <Col xl={9} lg={9} md={12}>
                                <div className="title-block mt-3 mb-2">
                                    <h5 className="title mb-0">{this.state.getVideos.videoDetails.videosList.length > 0 ? (this.state.getVideos.videoDetails.videosList[0].ChapterName) : ("")}</h5>
                                    <p className="text-gray4">Select video to Start Learning &amp; practice</p>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={12}>
                                <Button variant="btn btn-darkblue ml-3 px-4" onClick={() => this.setState({ modalShow: true })}>Buy This Chapter video</Button>
                                <BuyChapterVideoModal getChapterId={this.props.getChapterId}
                                    selectionType={selectionType}
                                    subject={subject}
                                    chapter={chapter}
                                    topic={topic}
                                    show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                            </Col>
                        </Row>
                        <div className="mb-3 WatchingVideos">
                            {/* <Row>
                        <Col xl={7} lg={7} md={12} sm={12}>
                            <Link to={{
                                                        pathname:"/student/subject/video-watching",
                                                        state:{
                                                            videoObj:videoData,
                                                            getChapterId:this.props.getChapterId

                                                        }
                                                    }}>
                                <Card key={id} as={Card.Body} className="p-0 single_video shadow-sm mt-xl-5 mt-lg-5 mb-2">
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
                                <Col xl={12} lg={12} md={12}>
                                    <h5 className="my-1 pb-3">Recommended </h5>
                                </Col>
                                {
                                    similarRecentdVideo.map((item) => {
                                        const { id, videoThumbnail, Title, Likes, videoDurations } = item;
                                        return (
                                            <Col key={id} xl={6} lg={6} md={6} sm={12} xs={12} >
                                                <Link to={{
                                                        pathname:"/student/subject/start-video-watching",
                                                        state:{
                                                            videoObj:videoData,
                                                            getChapterId:this.props.getChapterId

                                                        }
                                                    }}>
                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                        <Image src={videoThumbnail} title="vimeo-player" fluid />
                                                        <div className="content pt-1">
                                                            <Card.Title className="px-2 text-white">{Title}</Card.Title>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {Likes}</div>
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
                                <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                    <h5>ELAPP Videos</h5>
                                </Col>
                                {this.state.getVideos.videoDetails.videosList.map((videoData) => {
                                    if (videoData.is_purchased == true) {
                                        console.log("videoData", videoData);
                                        return (
                                            <Col key={id} xl={3} lg={3} md={6} sm={6} xs={12} >
                                                <Link
                                                    to={{
                                                        pathname: "/student/subject/start-video-watching",
                                                        state: {
                                                            videoObj: videoData,
                                                            getChapterId: this.props.getChapterId

                                                        }
                                                    }}
                                                >
                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title="vimeo-player" fluid />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                        )}

                                                        <div className="content pt-1">
                                                            <Card.Title className="px-2 text-white">{videoData.title}</Card.Title>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {videoData.views}</div>
                                                                <div className="videodurations text-white">0 Min</div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )

                                    }
                                    else {
                                        return (
                                            <Col key={id} xl={3} lg={3} md={6} sm={6} xs={12} >
                                                <Link to={{
                                                    pathname: "/student/subject/video-watching",
                                                    state: {
                                                        videoObj: videoData,
                                                        getChapterId: this.props.getChapterId

                                                    }
                                                }}>
                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title="vimeo-player" fluid />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                        )}
                                                        <div className="content pt-1">
                                                            <Card.Title className="px-2 text-white">{videoData.title}</Card.Title>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-white"><i className="fas fa-heart text-danger" />: {videoData.views}</div>
                                                                <div className="videodurations text-white">0 Min</div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>

                                        )
                                    }

                                })}
                            </Row>
                            {Cookies.get("student_userlevel") == "1" ? (<InstituteVideosSection defaultActiveKey={this.props.defaultActiveKey} getChapterId={this.props.getChapterId} />) : ("")}
                        </div>
                        {this.state.getVideos.length == 0 ? (<p style={{ textAlign: "center" }}>
                            <b>No data available </b>
                        </p>) : (<p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>)}
                    </section>
                )}
            </React.Fragment>



        )
    }
}


export default withApollo((WatchingVideoSection));
