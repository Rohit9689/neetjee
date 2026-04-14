import React, { Component } from "react";
import { components } from "react-select";
import { Modal, Form, Col, Button } from "react-bootstrap";
import BranchData from "../groups/BranchData";
import SectionData from "../groups/SectionData";
import ClassesData from "../groups/ClassesData";
import SelectDropDown from "../../selectdropdown/SelectDropDown";

import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";

const ADD_STUDENT = gql`
  mutation($params: StudentInput) {
    addStudent(params: $params)
  }
`;

const FETCH_STUDENTS = gql`
  query($institution_id: Int!) {
    getStudents(institution_id: $institution_id) {
      id
      student_name
      contact_no
      branch_id
      class_id
      section_id
      package_id
      category_id
    }
  }
`;

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

class StudentModal extends Component {
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
      submitError: "",
      formErrors: {
        branch: "",
        section: "",
        class: "",
        package: "",
        student_name: "",
        contact_no: "",
        category: ""
      },
      branchValid: false,
      sectionValid: false,
      classValid: false,
      student_nameValid: false,
      contact_noValid: false,
      packageValid: false,
      category: false,
      formValid: false
    };
  }

  handleInputChange = e => {
    console.log("event", e.target);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let branchValid = this.state.branchValid;
    let sectionValid = this.state.sectionValid;
    let classValid = this.state.classValid;
    let student_nameValid = this.state.student_nameValid;
    let contact_noValid = this.state.contact_noValid;
    let packageValid = this.state.packageValid;
    let categoryValid = this.state.categoryValid;

    switch (fieldName) {
      case "branch":
        if (value.length == "") {
          branchValid = false;
          fieldValidationErrors.branch = "Select Branch";
        } else {
          branchValid = true;
          fieldValidationErrors.branch = "";
        }

        break;

      case "section":
        if (value.length == "") {
          sectionValid = false;
          fieldValidationErrors.section = "Select Section";
        } else {
          sectionValid = true;
          fieldValidationErrors.section = "";
        }

        break;

      case "class":
        if (value.length == "") {
          classValid = false;
          fieldValidationErrors.class = "Select Class";
        } else {
          classValid = true;
          fieldValidationErrors.class = "";
        }
        break;

      case "student_name":
        if (value.length == "") {
          student_nameValid = false;
          fieldValidationErrors.student_name = "Name Cannot Be Empty";
        } else {
          student_nameValid = true;
          fieldValidationErrors.student_name = "";
        }
        break;

      // case "contact_no":
      //   if (value.length == "") {
      //     contact_noValid = false;
      //     fieldValidationErrors.contact_no = "Phone no. Cannot Be Empty";
      //   } else if (value.length != 10) {
      //     contact_noValid = false;
      //     fieldValidationErrors.contact_no = "Invalid Phone number";
      //   } else {
      //     contact_noValid = true;
      //     fieldValidationErrors.contact_no = "";
      //   }
      //   break;

      case "contact_no":
        var pattern = new RegExp("^[6-9][0-9]{9}$");

        if (value.length == "") {
          contact_noValid = false;
          fieldValidationErrors.contact_no = "contact No. Cannot Be Empty";
        } else if (!pattern.test(value)) {
          contact_noValid = false;
          fieldValidationErrors.contact_no = "Invalid contact No.";
        } else {
          contact_noValid = true;
          fieldValidationErrors.contact_no = "";
        }

        break;

      case "package":
        if (value.length == "") {
          packageValid = false;
          fieldValidationErrors.package = "Select Package";
        } else {
          packageValid = true;
          fieldValidationErrors.package = "";
        }
        break;
      case "category":
        if (value.length == "") {
          categoryValid = false;
          fieldValidationErrors.category = "Select Package";
        } else {
          categoryValid = true;
          fieldValidationErrors.category = "";
        }
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        branchValid: branchValid,
        sectionValid: sectionValid,
        classValid: classValid,
        student_nameValid: student_nameValid,
        contact_noValid: contact_noValid,
        packageValid: packageValid,
        categoryValid: categoryValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.branchValid ||
        this.state.sectionValid ||
        this.state.classValid ||
        this.state.student_nameValid ||
        this.state.contact_noValid ||
        this.state.packageValid ||
        this.state.categoryValid
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");

    if (this.state.formValid) {
      let addStudent = {
        section_id: parseInt(this.state.section),
        class_id: parseInt(this.state.class),
        package_id: parseInt(this.state.package),
        category_id: parseInt(this.state.category),
        branch_id: parseInt(this.state.branch),
        institution_id: parseInt(Cookies.get("institutionid")),
        student_name: this.state.student_name,
        contact_no: this.state.contact_no,
        username: Cookies.get("username")
      };

      this.addStudent(addStudent).catch(error => {
        console.log("catch if error");
        console.log(error);
        this.setState({
          submitError: error.graphQLErrors.map(x => x.message)
        });
        console.error(
          "ERR =>",
          error.graphQLErrors.map(x => x.message)
        );
      });
    } else {
      this.setState({ submitError: "Please fill all the values to proceed" });
    }
  };

  addStudent = async params => {
    await this.props.addStudent({
      variables: {
        params
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_STUDENTS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("data1", data1);

        const new_student = {
          id: data.addStudent,
          student_name: this.state.student_name,
          contact_no: this.state.contact_no,
          package_id: this.state.package,
          category_id: this.state.category,
          branch_id: this.state.branch,
          class_id: this.state.class,
          section_id: this.state.section,
          __typename: "students"
        };

        data1.getStudents.push(new_student);

        try {
          store.writeQuery({
            query: FETCH_STUDENTS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }

        console.log("addstudent", data);

        if (data.addStudent) {
          this.setState({
            currentStep: 5,
            branch: "",
            section: "",
            class: "",
            student_name: "",
            contact_no: "",
            package: "",
            category: "",
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
            categoryValid: false,
            formValid: false
          });

          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      }
    });
  };

  SetpageLoad = () => {
    this.setState({ currentStep: 1, submitError: "" });
    this.props.onHide();
  };

  render() {
    if (this.props.globals == undefined) return null;

    console.log("StudentModal", this.props.globals, this.state);

    let sections = [];
    if (this.state.branch != "" || this.state.category != "" || this.state.package != "") {
      sections = this.props.globals.globalSections;
      if (this.state.branch != "") {
        sections = sections.filter((item) => item.branch_id == this.state.branch);
      }
      if (this.state.category != "") {
        sections = sections.filter((item) => item.category_id == this.state.category);
      }
      if (this.state.package != "") {
        sections = sections.filter((item) => item.package_id == this.state.package);
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
          {this.state.currentStep == 5 ? (
            <Form.Text className="form-text text-danger">
              Student Data Saved successfully
            </Form.Text>
          ) : (
              <Form.Text className="form-text text-danger">
                {this.state.submitError}
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
                <Form.Text className="form-text text-danger">
                  {this.state.submitError}
                </Form.Text>
                <Form.Label className="text-uppercase">
                  {" "}
                  Student Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="student_name"
                  placeholder="Student name"
                  value={this.state.student_name}
                  onChange={this.handleInputChange}
                />
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.student_name}
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
                  onChange={this.handleInputChange}
                  value={this.state.contact_no}
                  name="contact_no"
                />
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.contact_no}
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
                  onChange={this.handleInputChange}
                  value={this.state.branch}
                >
                  <option>--Select Branch--</option>
                  {this.props.globals.globalBranches.map(branchdata => (
                    <option value={branchdata.id}>
                      {branchdata.branch_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.branch}
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
                  onChange={this.handleInputChange}
                  value={this.state.class}
                >
                  <option>--Select class--</option>
                  {this.props.globals.classes.map(classdata => (
                    <option value={classdata.id}>{classdata.class}</option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.class}
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
                  onChange={this.handleInputChange}
                  value={this.state.package}
                >
                  <option>--Select Package--</option>
                  {this.props.globals.globalPackages.map(packagedata => (
                    <option value={packagedata.id}>
                      {packagedata.package_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.package}
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
                  onChange={this.handleInputChange}
                  value={this.state.category}
                >
                  <option>--Select Category--</option>
                  {this.props.globals.globalCategories.map(categorydata => (
                    <React.Fragment>
                      {categorydata.package_id == this.state.package ? (
                        <option value={categorydata.id}>
                          {categorydata.category_name}
                        </option>) : ("")}
                    </React.Fragment>

                  ))}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.category}
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
                  onChange={this.handleInputChange}
                  value={this.state.section}
                >
                  <option>--Select Section--</option>
                  {sections.map(sectiondata => (


                    <option value={sectiondata.id}>
                      {sectiondata.section_name}
                    </option>)


                  )}
                </Form.Control>
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.section}
                </Form.Text>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer variant="white" className="px-4">
          <Button
            className="btn btn-success text-uppercase"
            onClick={this.handleFormSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default graphql(ADD_STUDENT, {
  name: "addStudent"
})(StudentModal);
