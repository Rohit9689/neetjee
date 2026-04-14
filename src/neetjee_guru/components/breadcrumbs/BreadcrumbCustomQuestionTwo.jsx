import React, { Component } from 'react'
import { Row, Col, Image } from 'react-bootstrap'

class BreadcrumbCustomQuestionTwo extends Component {
    render() {
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4">
                <Row>
                    <Col xl={6} lg={6} md={12} sm={12} className="d-flex">
                        <Image src={this.props.breadcrumbs.img} alt="img" width="50" height="55" />
                        <div className="content ml-3">
                            <h2 className="title h5">{this.props.breadcrumbs.Title}</h2>
                            <h3 className="subTitle h6 mb-0">{this.props.breadcrumbs.SubTitle}</h3>
                        </div>
                    </Col>
                    <Col xl={6} lg={6} md={12} sm={12}>
                        <div className="content-details text-xl-right text-lg-right">
                            <div className="ClassSectionTotalStudents"> {this.props.breadcrumbs.ClassSectionTotalStudents}</div>
                            {this.props.breadcrumbs.complexity != "" ? (<div className="complexity"><strong>Complexity:</strong> {this.props.breadcrumbs.complexity}</div>
                            ) : ("")}

                            {this.props.breadcrumbs.subjects != "" ? (
                                <div className="subjects"><strong>Subjects:</strong> {this.props.breadcrumbs.subjects}</div>) : ("")}

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BreadcrumbCustomQuestionTwo
