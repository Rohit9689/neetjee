import React, { Component } from 'react'
import ErrorAnalysisNavbar from '../components/analysis/error_analysis/ErrorAnalysisNavbar'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ErrorAnalysisSection from '../components/analysis/error_analysis/ErrorAnalysisSection'
import { Container } from 'react-bootstrap'
import * as Cookies from "es-cookie";
class ErrorAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
        }

    }
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
                <div className="student main-wrapper">
                    <div className="student header-area">
                        <ErrorAnalysisNavbar onClick={() => this.menuToggler()} />
                    </div>
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        <Container fluid={true}>
                            <ErrorAnalysisSection />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorAnalysis
