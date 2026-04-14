import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ExamsTestSeriesSection from '../components/exams/test_series/ExamsTestSeriesSection';
import * as Cookies from "es-cookie";
class ExamsTestSeries extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                     <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            <ExamsTestSeriesSection/>
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ExamsTestSeries;
