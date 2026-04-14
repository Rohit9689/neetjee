import React, { Component } from "react";
import { components } from "react-select";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import SelectDropDown from "../../selectdropdown/SelectDropDown";

class OrganizationModal extends Component {
  render() {
    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-6q0nyr-Svg"
            >
              <path
                fill="currentColor"
                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
              ></path>
            </svg>
          </components.DropdownIndicator>
        )
      );
    };

    // parentGroup
    const parentGroup = [
      { value: 1, label: "Telangana" },
      { value: 2, label: "Andhra Pradesh" },
      { value: 3, label: "Chennai" }
    ];

    if (this.props.orgdata == undefined) return null;

    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Organization Structure Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            <Col xl={12} lg={12} md={12}>
              <Form.Text className="form-text text-danger">
                {this.props.parentstate.submitError}
              </Form.Text>
              <Form>
                <Form.Group controlId="SelectPrinciple">
                  <Form.Label className="text-uppercase">Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="group_name"
                    onChange={this.props.handleinputchange}
                    value={this.props.parentstate.group_name}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.props.parentstate.formErrors.group_name}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="SelectBranch">
                  <Form.Label className="text-uppercase">
                    Parent Group
                  </Form.Label>
                  <SelectDropDown
                    stateData={this.props.parentvalue}
                    options={this.props.orgdata}
                    name="parent"
                    onChange={this.props.handleselectchange}
                    defaultValue={this.props.parentstate.parent.toString()}
                    placeholderName={"Parent Group"}
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.props.parentstate.formErrors.parent}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="SelectBranch">
                  <Button
                    variant="success"
                    className="px-5"
                    onClick={this.props.handleedit}
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default OrganizationModal;
