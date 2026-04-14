import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import VideoNavbar from '../components/learn_practice/videos/singlevideo/VideoNavbar'
import '../components/learn_practice/videos/singlevideo/_singlevideo.scss'
import BuySingleVideoModal from '../components/learn_practice/videos/singlevideo/BuySingleVideoModal'

class SingleVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true,
            modalShow: false,
        }
    }

    myclickFun = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <section className="single_video">
                <VideoNavbar />
                {
                    this.state.show ?
                        <div className="single_video_section lock-content pb-5">
                            <Container>
                                <Row>
                                    <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} sm={12} xs={12}>
                                        <div className="embed-responsive embed-responsive-16by9 my-3">
                                            <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/382010779" title='video' allowFullScreen></iframe>
                                            <div className="video-mask">
                                                <div className="mask-content d-flex flex-column justify-content-center">
                                                    <div className="views mb-3">
                                                        <i className="fal fa-eye fa-2x text-warning"></i>
                                                        <div className="view-text mt-1 text-warning">13.5k Views</div>
                                                    </div>
                                                    <div className="likes mb-3">
                                                        <i className="fal fa-thumbs-up fa-2x text-white"></i>
                                                        <div className="like-text mt-1 text-white">12.5k Likes</div>
                                                    </div>
                                                    <div className="purches mb-2">
                                                        <i className="fal fa-shopping-basket fa-2x text-success"></i>
                                                        <div className="purches-text mt-1 text-success">8.5k Students Purches</div>
                                                    </div>
                                                    <Button variant="btn btn-darkblue px-4" onClick={() => this.setState({ modalShow: true })}>Buy Video @ ₹199 /-</Button>
                                                    <BuySingleVideoModal onClick={this.myclickFun} show={this.state.modalShow} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-block text-white">
                                            <i className="fas fa-lock"></i>
                                            <div className="content">
                                                <Row className="header border-bottom pb-2 mb-3">
                                                    <Col xl={12} lg={12} md={12}>
                                                        <div className="header-content">
                                                            <h5 className="title">Physics in Relation to Other Sciences</h5>
                                                            <h6>Physics - Physical World</h6>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="description">
                                                    <p>As most of us learned in high school physics, ray tracing is an idea that has been around for centuries. Global illumination in computer graphics has a somewhat shorter history.</p>
                                                    <p>Early computer graphics shading models proposed by Henri Gouraud and Bui Tuong Phong, among others, computed reflections based on the spatial relationship between light sources and a point on a surface. Somewhat later, Jim Blinn developed a reflection model derived from Ken Torrance’s work describing inter-reflections of the microscopic structures of surfaces. (That model was later expanded by Rob Cook and Ken Torrance himself into the widely used Cook-Torrance shading model.) Shortly thereafter, Blinn and Martin Newell published a paper describing environment mapping, which replaced light sources with a 360-degree texture map of the surrounding environment.</p>
                                                    <p>Why Ray Tracing Is a Natural Choice for Global Illumination?</p>
                                                    <p>Add ray tracing features to an existing DirectX 12 sample application.</p>
                                                    <p>This step-by-step guide walks you through the major building blocks.</p>
                                                    <p>The guide also includes extensive code snippets you can drop into. </p>
                                                    <p>Learn how to set up your Windows development environment to. </p>
                                                    <p> Because ray tracing is so incredibly simple, it should have been an obvious choice for implementing global illumination in computer graphics. Ray casting for image generation had been pioneered by Arthur Appel, at IBM, and commercialized by Robert Goldstein and associates, at MAGI. MAGI had originally utilized multi-bounce ray tracing to track radiation within tanks. In my own early career, I had been involved with ocean acoustics and remembered a diagram of ray-traced sound being refracted through varying depths of the ocean and reflected from the surface. Eventually a memory of that diagram popped into my head and it then became clear to me how to improve upon the global illumination method that Blinn and Newell had initiated. </p>
                                                    <p>My own hesitation about using ray tracing was simply concern about performance. There has always been a bit of a divide between computer graphics for real-time interaction and graphics for film. General Electric’s lunar landing simulator obviously had to run in real time to train astronauts. This constraint continued with David Evans and Ivan Sutherland’s flight simulators as well as neighboring research at the University of Utah. Henri Gouraud’s smooth shading ran in real time at essentially no cost. A little known chapter in Bui Tuong Phong’s dissertation includes a description of circuitry for real-time shading even though most implementations of Phong shading did not run in real time</p>
                                                </div>
                                                <Row className="text-center mt-4">
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <Button variant="light" className="mx-1">Skip</Button>
                                                        <Button variant="light" className="mx-1">Download Notes</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Practice This Topic</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Revision Material</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        :
                        <div className="single_video_section pb-5">
                            <Container>
                                <Row>
                                    <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} sm={12} xs={12}>
                                        <div className="embed-responsive embed-responsive-16by9 my-3">
                                            <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/382010779" title='video' allowFullScreen></iframe>
                                        </div>
                                        <div className="content-block text-white">
                                            <div className="content">
                                                <Row className="header border-bottom pb-2 mb-3">
                                                    <Col xl={12} lg={12} md={12}>
                                                        <div className="header-content">
                                                            <h5 className="title">Physics in Relation to Other Sciences</h5>
                                                            <h6>Physics - Physical World</h6>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="description">
                                                    <p>As most of us learned in high school physics, ray tracing is an idea that has been around for centuries. Global illumination in computer graphics has a somewhat shorter history.</p>
                                                    <p>Early computer graphics shading models proposed by Henri Gouraud and Bui Tuong Phong, among others, computed reflections based on the spatial relationship between light sources and a point on a surface. Somewhat later, Jim Blinn developed a reflection model derived from Ken Torrance’s work describing inter-reflections of the microscopic structures of surfaces. (That model was later expanded by Rob Cook and Ken Torrance himself into the widely used Cook-Torrance shading model.) Shortly thereafter, Blinn and Martin Newell published a paper describing environment mapping, which replaced light sources with a 360-degree texture map of the surrounding environment.</p>
                                                    <p>Why Ray Tracing Is a Natural Choice for Global Illumination?</p>
                                                    <p>Add ray tracing features to an existing DirectX 12 sample application.</p>
                                                    <p>This step-by-step guide walks you through the major building blocks.</p>
                                                    <p>The guide also includes extensive code snippets you can drop into. </p>
                                                    <p>Learn how to set up your Windows development environment to. </p>
                                                    <p> Because ray tracing is so incredibly simple, it should have been an obvious choice for implementing global illumination in computer graphics. Ray casting for image generation had been pioneered by Arthur Appel, at IBM, and commercialized by Robert Goldstein and associates, at MAGI. MAGI had originally utilized multi-bounce ray tracing to track radiation within tanks. In my own early career, I had been involved with ocean acoustics and remembered a diagram of ray-traced sound being refracted through varying depths of the ocean and reflected from the surface. Eventually a memory of that diagram popped into my head and it then became clear to me how to improve upon the global illumination method that Blinn and Newell had initiated. </p>
                                                    <p>My own hesitation about using ray tracing was simply concern about performance. There has always been a bit of a divide between computer graphics for real-time interaction and graphics for film. General Electric’s lunar landing simulator obviously had to run in real time to train astronauts. This constraint continued with David Evans and Ivan Sutherland’s flight simulators as well as neighboring research at the University of Utah. Henri Gouraud’s smooth shading ran in real time at essentially no cost. A little known chapter in Bui Tuong Phong’s dissertation includes a description of circuitry for real-time shading even though most implementations of Phong shading did not run in real time</p>
                                                </div>
                                                <Row className="text-center mt-4">
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <Button variant="light" className="mx-1">Skip</Button>
                                                        <Button variant="light" className="mx-1">Download Notes</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Practice This Topic</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Revision Material</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                }
            </section>
        )
    }
}

export default SingleVideo
