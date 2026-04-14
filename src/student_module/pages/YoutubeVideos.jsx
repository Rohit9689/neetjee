import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import VideoSection from '../components/videos/VideoSection'
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
import YoutubeVideosSection from '../components/youtube/YoutubeVideosSection';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
import { withRouter } from 'react-router-dom'



class YoutubeVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/Vieos Image.png'),
                Title: this.props.match.params.TITLE.split(":")[1],
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Videos_Home;
        ReactGA.pageview('/student/videos', ["ELAPP"], title);
    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
        if (toggled === "wrapper") {
            this.setState({ toggled: "wrapper sidebar-enable" });
            Cookies.set("toggle", "wrapper sidebar-enable");
        } else {
            this.setState({ toggled: "wrapper" });
            Cookies.set("toggle", "wrapper");
        }
    };
    render() {

        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area videos-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container fluid>
                            <Row>
                                <Col xl={12} lg={12} md={12}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/* <h5 className="font-weight-bold mb-1">{this.props.videoData.type} </h5> */}
                                        <Button className="btn btn-white text-capitalize shadow-sm btn btn-primary mb-3" onClick={this.props.history.goBack}>
                                            <i className="mr-2 fal fa-long-arrow-left" /> Back
                                        </Button>
                                    </div>
                                </Col>
                                <Col xl={12} lg={12} md={12}>
                                    <div className="embed-responsive embed-responsive-21by9 my-3">
                                        {this.props.match.params.SOURCE.split(":")[1] == 1 ? (
                                            <YoutubeVideosSection
                                                videoid={this.props.match.params.VIDEOID.split(":")[1]}
                                                source={this.props.match.params.SOURCE.split(":")[1]}
                                            />
                                            // <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                                        ) : (
                                            <iframe className="embed-responsive-item" src={`https://player.vimeo.com/video/${this.props.match.params.VIDEOID.split(":")[1]}`} title={this.props.match.params.TITLE.split(":")[1]} controls={false} allowFullScreen></iframe>
                                        )}

                                    </div>

                                </Col>
                            </Row>
                        </Container>



                    </div>

                </div>
            </div>
        )
    }
}


export default withRouter(YoutubeVideos);