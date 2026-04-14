import React, { Component } from 'react'
import MockTestSeriesSection from '../components/mock_series/MockTestSeriesSection'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import { withRouter } from 'react-router-dom';

 class MockTestSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/mocktext-img.png'),
                Title: "Mock Test",
                width: 150,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    render() {
        return (
            <div className="student main-wrapper">
                <div className="student header-area mock-tests-eries-topnavbar">
                    <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.props.changeToggle()} />
                </div>
                <AsideNavbar />
                <div className="content-wrapper">
                    <MockTestSeriesSection />
                </div>
            </div>
        )
    }
}

export default withRouter(MockTestSeries);
