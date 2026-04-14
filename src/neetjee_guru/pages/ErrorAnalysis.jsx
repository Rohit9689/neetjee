import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/SideNavbar'
import ErrorAnalysisSection from '../components/analysis/error_analysis/ErrorAnalysisSection'
import { Container } from 'react-bootstrap'

class ErrorAnalysis extends Component {
    render() {
        return (
            <div className="student main-wrapper">
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
