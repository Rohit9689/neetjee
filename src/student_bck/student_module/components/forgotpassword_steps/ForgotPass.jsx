import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

class RegisterOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStatus: false,
        };
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("do validate");
        }

        this.props.ParenthandleInputChange(e);
    };
    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3">
                    Did you forget <small className="text-muted"> your password</small>
                </h5>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="username"
                            onChange={this.props.ParenthandleInputChange}
                            autoComplete="off"
                        />
                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.formErrors.username}
                        </Form.Text>
                    </Form.Group>
                    <div className="form_footer pt-2">
                        <Button onClick={this.props.ParenthandleFormSubmit} variant="primary" className="float-right" type="submit" block>
                            Submit &amp; Next
                                                    </Button>
                    </div>

                </Form>
            </React.Fragment>
        );
    }
}

export default RegisterOne;
