import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import CustomPreviousPaperSection from '../components/exams/previous_papers/CustomPreviousPaperSection'
import * as Cookies from "es-cookie";
class CustomPreviousPaper extends Component {
    
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
     };
    render() {
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            <CustomPreviousPaperSection
                                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                        </Container>
                    </div>
                </div>
                </div>
        )
    }
}

export default CustomPreviousPaper
