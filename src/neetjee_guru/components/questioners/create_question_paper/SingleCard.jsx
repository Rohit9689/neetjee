import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Col, Card, Image } from 'react-bootstrap'

class SingleCard extends Component {
    render() {
        return (
            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                <Link to="/questions/create-question-paper/own-question-paper">
                    <Card className="single_card shadow-sm border-0 mb-3">
                        <Card.Header className="img_block bg-white">
                            <Image src={this.props.image} alt="img" />
                        </Card.Header>
                        <Card.Body className="content_block pt-5">
                            <h6 className="title text-uppercase">{this.props.examName}</h6>
                            <div className="class_section_names">{this.props.ClassName}, {this.props.SectionName}</div>
                            <div className="description">{this.props.description}</div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        )
    }
}

export default SingleCard
