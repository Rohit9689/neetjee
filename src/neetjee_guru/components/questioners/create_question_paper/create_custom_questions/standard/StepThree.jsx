import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

class StepThree extends Component {
    render() {
        if (this.props.currentstep !== 3) {
            return null;
        }
        return (
            <Row className="StepThree mt-5">
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Card as={Card.Body} className="p-2 border-0 shadow-sm text-center">
                        <iframe title="myPdf" src={require('../../../../../../images/dummy.pdf')} width="100%" height="500px"> </iframe>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default StepThree
