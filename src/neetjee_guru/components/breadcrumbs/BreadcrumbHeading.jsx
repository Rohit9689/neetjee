import React, { Component } from 'react'

class BreadcrumbHeading extends Component {
    render() {
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                <h2 className="title h5 mb-0">{this.props.breadcrumbs.Title}</h2>
            </div>
        )
    }
}

export default BreadcrumbHeading
