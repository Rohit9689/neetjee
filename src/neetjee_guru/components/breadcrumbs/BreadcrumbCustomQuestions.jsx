import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

class BreadcrumbCustomQuestions extends Component {
    render() {
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex">
                <Image src={this.props.breadcrumbs.img} alt="img" width="50" height="55" />
                <div className="content ml-3">
                    <h2 className="title h5 mb-0">{this.props.breadcrumbs.Title}</h2>
                    <div className="d-md-flex mt-2">
                        <div className="ClassSectionTotalStudents mr-3"> {this.props.breadcrumbs.ClassSectionTotalStudents}</div>
                        <div className="complexity mr-3"><strong>Complexity:</strong> {this.props.breadcrumbs.complexity}</div>
                        <div className="subjects"><strong>Subjects:</strong> {this.props.breadcrumbs.subjects}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BreadcrumbCustomQuestions
