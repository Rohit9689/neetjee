import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import VideoSection from '../components/videos-reference/VideoSection'


class RefVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/exam.svg'),
                Title: "Videos",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    render() {
        return (
            <div className="student main-wrapper">
                <div className="student header-area videos-topnavbar">
                    <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.props.changeToggle()} />
                </div>
                <AsideNavbar />
                <div className="content-wrapper">
                    <Container>
                        <VideoSection />
                    </Container>
                </div>
            </div>
        )
    }
}

export default RefVideos
