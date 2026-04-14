import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap'

class TopicsCard extends Component {
    render() {
        return (
            <Col xl={4} lg={4} md={6} sm={6} xs={12} className="single_topic  mb-3">
                <Link to="/student/subject/chapter">
                    <Card as={Card.Body} className="d-flex flex-row justify-content-between shadow-sm border-0 h-100">
                        <h5 className="mb-0"><span>{this.props.No}</span> {this.props.title}</h5>
                        <div className="percentage">{this.props.percentage}</div>
                    </Card>
                </Link>
            </Col>
        )
    }
}

export default TopicsCard
