import React, { Component } from "react";
import { components } from "react-select";
import { Modal, Form, Col, Button, Row } from "react-bootstrap";
import BranchData from "../groups/BranchData";
import SectionData from "../groups/SectionData";
import ClassesData from "../groups/ClassesData";
import SelectDropDown from "../../selectdropdown/SelectDropDown";

import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";

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
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class StudentModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      branch: "",
      section: "",
      class: "",
      student_name: "",
      contact_no: "",
      package: "",
      category: "",
      id: 0,
      submitError: "",
      formErrors: {
        branch: "",
        section: "",
        class: "",
        category: "",
        student_name: "",
        contact_no: "",
        package: ""
      },
      branchValid: false,
      sectionValid: false,
      classValid: false,
      student_nameValid: false,
      contact_noValid: false,
      packageValid: false,
      CategoryValid: false,
      formValid: false
    };
  }

  render() {
    console.log("this.props", this.props.stateData);
    let sections = [];
    if (this.props.stateData.branch != "" || this.props.stateData.category != "" || this.props.stateData.package != "") {
      sections = this.props.globals.globalSections;
      if (this.props.stateData.branch != "") {
        sections = sections.filter((item) => item.branch_id == this.props.stateData.branch);
      }
      if (this.props.stateData.category != "") {
        sections = sections.filter((item) => item.category_id == this.props.stateData.category);
      }
      if (this.props.stateData.package != "") {
        sections = sections.filter((item) => item.package_id == this.props.stateData.package);
      }
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {this.props.stateData.currentStep == 5 ? (
            <Form.Text className="form-text text-success">
              Update Student Data successfully
            </Form.Text>
          ) : (
              <Form.Text className="form-text text-danger">
                {this.props.stateData.submitError}
              </Form.Text>
            )}
          <Form>
            <Row>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectTeacherName"
              >
                <Form.Label className="text-uppercase">
                  {" "}
                  Student Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="student_name"
                  placeholder="Student name"
                  value={this.props.stateData.student_name}
                  onChange={this.props.parenthandleInputChange}
                />
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.student_name}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectContact"
              >
                <Form.Label className="text-uppercase"> Contact No</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Mobile No"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.contact_no}
                  name="contact_no"
                />
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.contact_no}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectBranch"
              >
                <Form.Label className="text-uppercase"> Branch</Form.Label>
                <Form.Control
                  as="select"
                  name="branch"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.branch}
                >
                  <option>--Select Branch--</option>
                  {this.props.globals.globalBranches.map(branchdata => (
                    <option value={branchdata.id}>
                      {branchdata.branch_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.branch}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectClass"
              >
                <Form.Label className="text-uppercase">Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.class}
                >
                  <option>--Select class--</option>
                  {this.props.globals.classes.map(classdata => (
                    <option value={classdata.id}>{classdata.class}</option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.class}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectPackage"
              >
                <Form.Label className="text-uppercase">Package</Form.Label>
                <Form.Control
                  as="select"
                  name="package"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.package}
                >
                  <option>--Select Package--</option>
                  {this.props.globals.globalPackages.map(packagedata => (
                    <option value={packagedata.id}>
                      {packagedata.package_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.package}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectCategory"
              >
                <Form.Label className="text-uppercase">Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.category}
                >
                  <option>--Select Category--</option>
                  {this.props.globals.globalCategories.map(categorydata => (
                    // <option value={categorydata.id}>
                    //   {categorydata.category_name}
                    // </option>
                    <React.Fragment>
                      {categorydata.package_id == this.props.stateData.package ? (
                        <option value={categorydata.id}>
                          {categorydata.category_name}
                        </option>) : ("")}
                    </React.Fragment>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.category}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectSection"
              >
                <Form.Label className="text-uppercase">Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.section}
                >
                  <option>--Select Section--</option>
                  {sections.map(sectiondata => (
                    <option value={sectiondata.id}>
                      {sectiondata.section_name}
                    </option>

                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.section}
                </Form.Text>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer variant="white" className="px-4">
          <Button
            className="btn btn-success text-uppercase"
            onClick={this.props.handleFormSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default StudentModalEdit;
