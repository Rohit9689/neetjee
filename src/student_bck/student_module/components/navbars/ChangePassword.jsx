import React, { Component } from 'react'
import { Modal, Form, Col, FormGroup, Button } from 'react-bootstrap';
import * as Cookies from "es-cookie";

import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';

const CHANGE_PASSWORD = gql`
  mutation(
    $email: String!,
    $password: String!,
    $old_password: String
    ) {
        changePassword(
    email: $email,
    password: $password,
    old_password:$old_password
    ) 
  }
`;
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            submitError: "",
            formValid: false,
            oldPassword: "",
            newPassword: "",
            formErrors: {
                oldPassword: "",
                newPassword: ""
            },
            oldPasswordValid: false,
            newPasswordValid: false,
        };
    }
    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.formValid) {
            this.chngpwsd(
                Cookies.get("studentemail"),
                this.state.newPassword,
                this.state.oldPassword

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    chngpwsd = async (
        email,
        password,
        old_password) => {
        await this.props.chngpwsd({
            variables: {
                email,
                password,
                old_password
            },
            update: (store, { data }) => {
                if (data.changePassword) {
                    this.setState({
                        currentStep: 5,
                        submitError: "",
                        formValid: false,
                        oldPassword: "",
                        newPassword: "",
                        formErrors: {
                            oldPassword: "",
                            newPassword: ""
                        },
                        oldPasswordValid: false,
                        newPasswordValid: false,
                        //modalShow: false
                    });
                    setTimeout(() => { this.SetpageLoad() }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        this.setState({ currentStep: 1 });
        this.props.onHide()
    }
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let oldPasswordValid = this.state.oldPasswordValid;
        let newPasswordValid = this.state.newPasswordValid;
        switch (fieldName) {
            case "oldPassword":
                if (value.length == "") {
                    oldPasswordValid = false;
                    fieldValidationErrors.oldPassword = "Old password Cannot Be Empty";
                } else {
                    oldPasswordValid = true;
                    fieldValidationErrors.oldPassword = "";
                }

                break;

            case "newPassword":
                if (value.length == "") {
                    newPasswordValid = false;
                    fieldValidationErrors.newPassword = "New password Cannot Be Empty";
                } else {
                    newPasswordValid = true;
                    fieldValidationErrors.newPassword = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                oldPasswordValid: oldPasswordValid,
                newPasswordValid: newPasswordValid
            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid: this.state.oldPasswordValid && this.state.newPasswordValid
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }

    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.state.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Password Changed successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.state.submitError}
                            </Form.Text>
                        )}
                    <Form>
                        <Form.Group controlId="SelectBranch">
                            <Form.Label className="text-uppercase">Email ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={this.state.handleInputChange}
                                autoComplete="off"
                                value={Cookies.get("studentemail")}
                                readonly
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="SelectPrinciple">
                            <Form.Label className="text-uppercase">Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="oldPassword"
                                onChange={this.handleInputChange}
                                autoComplete="off"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.formErrors.oldPassword}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="SelectPrinciple">
                            <Form.Label className="text-uppercase">New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="newPassword"
                                onChange={this.handleInputChange}
                                autoComplete="off"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.state.formErrors.newPassword}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4">
                    <Button
                        onClick={this.handleFormSubmit}
                        className="btn btn-success text-uppercase"
                    >

                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default withRouter(compose(
    graphql(CHANGE_PASSWORD, {
        name: "chngpwsd"
    }))(ChangePassword)
);
