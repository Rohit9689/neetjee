import React, { Component } from 'react'
import { Col, Card } from 'react-bootstrap'
import ContentLoader from 'react-content-loader';

class SubjectCardsLoader extends Component {
    render() {
        return (
            <Col xl={3} lg={3} md={6} sm={12}>
                <Card className="single-card shadow-sm border-0">
                    <Card.Body className="p-2">
                        <div className="showcase-component">
                            <ContentLoader
                                viewBox="0 0 500 175"
                                height={175}
                                width={'100%'}
                                speed={2}
                            >
                                {/* <circle cx="70.2" cy="73.2" r="41.3" /> */}
                                <rect x="30" y="30" rx="10" ry="10" width="70" height="70" /> 
                                <rect x="129.9" y="29.5" width="125.5" height="17" />
                                <rect x="129.9" y="64.7" width="296" height="17" />
                                <rect x="129.9" y="97.8" width="253.5" height="17" />
                                <rect x="129.9" y="132.3" width="212.5" height="17" />
                            </ContentLoader>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}


export default SubjectCardsLoader
