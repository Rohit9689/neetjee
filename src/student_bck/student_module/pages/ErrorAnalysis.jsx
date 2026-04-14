import React, { Component } from 'react'
import ErrorAnalysisNavbar from '../components/analysis/error_analysis/ErrorAnalysisNavbar'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ErrorAnalysisSection from '../components/analysis/error_analysis/ErrorAnalysisSection'
import { Container } from 'react-bootstrap'

class ErrorAnalysis extends Component {
    render() {
        return (
            <div className="student main-wrapper">
                <div className="student header-area">
                    <ErrorAnalysisNavbar onClick={() => this.props.changeToggle()} />
                </div>
                <AsideNavbar />
                <div className="content-wrapper pt-0">
                    <Container fluid={true}>
                        <ErrorAnalysisSection />
                    </Container>
                </div>
            </div>
        )
    }
}

export default ErrorAnalysis
