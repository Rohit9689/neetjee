import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class BreadcrumbsSection extends Component {
    render() {
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                <h2 className="title h5 mb-0">{this.props.breadcrumbs.Title}</h2>
                {this.props.type=="student"?(""):(<Button variant="success" className="text-uppercase px-4" onClick={() => this.props.onClick()}>{this.props.breadcrumbs.btnName}</Button>)}
                
            </div>
        )
    }
}

export default BreadcrumbsSection
