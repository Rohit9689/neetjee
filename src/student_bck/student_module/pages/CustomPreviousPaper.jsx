import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import CustomPreviousPaperSection from '../components/exams/previous_papers/CustomPreviousPaperSection'

class CustomPreviousPaper extends Component {
    render() {
        console.log("CustomPreviousPaper", this.props.history.location.state);
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            <CustomPreviousPaperSection
                                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CustomPreviousPaper
