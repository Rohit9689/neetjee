import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class RegisterOne extends Component {
    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3">Mobile <small className="text-muted">OTP Verification</small></h5>
                <Form>
                    <Form.Group controlId="formBasicMobile">
                        <Form.Control type="phone" placeholder="OTP Code" />
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

export default RegisterOne
