import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerStatus: false
        }
    }
    render() {

        if (this.props.currentStep !== 3) {
            return null
        }

        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3">Do you want to change  <small className="text-muted"> your password</small></h5>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="username"
                            autoComplete="off"
                            value={this.props.stateData.username}
                            readonly
                        />
                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.formErrors.username}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.props.ParenthandleInputChange}
                            autoComplete="off"
                        />
                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.formErrors.password}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Conform Password"
                            name="cpassword"
                            onChange={this.props.ParenthandleInputChange}
                            autoComplete="off"
                        />
                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.formErrors.cpassword}
                        </Form.Text>
                    </Form.Group>
                    <div className="form_footer pt-2">
                        <Button type="submit" onClick={this.props.changePasswordFormSubmit} variant="primary" className="float-right px-5"> Submit </Button>
                    </div>

                </Form>
            </React.Fragment>
        )
    }
}

export default ChangePassword
