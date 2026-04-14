import React, { Component } from 'react'

class BreadcrumbsSectionTwo extends Component {
    render() {
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                <h2 className="title h5 mb-0">{this.props.breadcrumbs.Title}</h2>
                <a href={this.props.breadcrumbs.Link} className="btn btn-success text-uppercase text-white px-4">{this.props.breadcrumbs.btnName}</a>
            </div>
        )
    }
}

export default BreadcrumbsSectionTwo
