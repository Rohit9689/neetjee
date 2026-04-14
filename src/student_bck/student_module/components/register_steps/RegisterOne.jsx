import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class RegisterOne extends Component {
    render() {
        if (this.props.currentStep !== 1) {
            return null
        }
        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3">Register <small className="text-muted">to Create your account</small></h5>
                <Form>
                    <Form.Group controlId="formBasicText">
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicMobile">
                        <Form.Control type="phone" placeholder="Mobile" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

export default RegisterOne
