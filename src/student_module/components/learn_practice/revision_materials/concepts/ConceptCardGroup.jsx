import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import ConceptCard from './ConceptCard';
import { Col, Card } from 'react-bootstrap';
import parse, { domToReact } from 'html-react-parser';

class ConceptCardGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.ConceptsData
        }
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    render() {
        console.log("ConceptCardGroup", this.props.FundamentalData);
        return (
            <Row className="concept_cards">
                {this.props.getData.map((data, index) => (
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card className="single_concept mb-4">
                            <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                <Card.Title className="h6 mb-0">{data.title}</Card.Title>
                                <ul className="helpTags list-inline m-0 p-0">
                                    <li className="list-inline-item"><i className="fal fa-star" /></li>
                                    <li className="list-inline-item"><i className="fal fa-info-circle" /></li>
                                    <li className="list-inline-item"><i className="fal fa-notes-medical" /></li>
                                    <li className="list-inline-item"><i className="fal fa-bookmark" /></li>
                                </ul>
                            </Card.Header>
                            <Card.Body className="pt-2">
                                <Card.Text>{parse(this.decodefun(data.description))}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    }
}

export default ConceptCardGroup
