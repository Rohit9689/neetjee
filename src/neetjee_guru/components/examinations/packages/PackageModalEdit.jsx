import React, { Component } from "react";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import SelectDropDown from '../../selectdropdown/SelectDropDown'
import { components } from 'react-select';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";

import { withRouter } from "react-router-dom";

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
      </components.DropdownIndicator>
    )
  );
};

const EDIT_QUERY = gql`
  mutation($params: updatePackage) {
    updatePackage(params: $params)
  }
`;

const GETDATA = gql`
  query($institution_id: Int!) {
    getPackages(institution_id: $institution_id) {
      id
      package_name
      exams_covered
      timestamp
    }
  }
`;

class PackageModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      package_name: "",
      exams: "",
      examsvalue: "",
      submitError: "",
      formErrors: {
        package_name: "",
        exams: ""
      },
      package_nameValid: false,
      examsValid: false,
      loading: false,
      formValid: false
    };
  }

  handleEdit = e => {
    e.preventDefault();

    if (this.state.formValid) {
      let data = {
        package_name: this.state.package_name,
        exams_id: parseInt(this.state.exams),
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username")
      };

      this.editdata(data).catch(error => {
        console.log("error", error);
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

  handleFormSubmit = e => {
    console.log("formsubmit", this.state);
    e.preventDefault();
    if (this.state.formValid) {
      let data = {
        package_name: this.state.package_name,
        exams_covered: this.state.exams,
        id: parseInt(this.state.id),
        username: Cookies.get("username")
      };

      this.setState({ loading: true });
      this.editdata(data).catch(error => {
        console.log("error", error);
        this.setState({
          submitError: error.graphQLErrors.map(x => x.message),
          loading: false
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

  editdata = async params => {
    await this.props.editdata({
      variables: {
        params
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: GETDATA,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        let found = data1.getPackages.find(a => a.id === this.state.id);
        let idindex = data1.getPackages.indexOf(found);
        const newPackage = {
          id: this.state.id,
          package_name: this.state.package_name,
          exams_covered: this.state.exams,
          timestamp: found.timestamp,
          __typename: "Packages"
        };
        data1.getPackages.splice(idindex, 1, newPackage);
        try {
          store.writeQuery({
            query: GETDATA,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        if (data.updatePackage) {
          this.setState({
            package_name: "",
            exams: 0,
            id: -1,

            submitError: "Data Updated Successfully!",
            formErrors: {
              package_name: "",
              exams: ""
            },
            package_nameValid: false,
            examsValid: false,
            loading: false,
            formValid: false
          });

          this.SetpageLoad();
        }
      }
    });
  };

  SetpageLoad = () => {
    console.log("Setpageload packagemodaledit");
    this.setState({ submitError: "", id: 0 });
    this.props.onHide();
  };

  handleInputChange = e => {
    console.log("e.target.value", e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let package_nameValid = this.state.package_nameValid;
    let examsValid = this.state.examsValid;

    switch (fieldName) {
      case "package_name":
        if (value.length == "") {
          package_nameValid = false;
          fieldValidationErrors.package_name = "Package name Cannot Be Empty";
        } else {
          package_nameValid = true;
          fieldValidationErrors.package_name = "";
        }

        break;

      case "exams":
        if (value.length == "" || value == 0) {
          examsValid = false;
          fieldValidationErrors.exams = "Enter Exams covered";
        } else {
          examsValid = true;
          fieldValidationErrors.exams = "";
        }

        break;

      default:
        break;
    }

    // console.log("validatefield", fieldName, fieldValidationErrors);
    this.setState(
      {
        formErrors: fieldValidationErrors,
        package_nameValid: package_nameValid,
        examsValid: examsValid
      },
      this.validateForm
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("NextProps", nextProps);

    if (nextProps.editRow != undefined) {
      if (
        nextProps.editRow.id !== this.state.id &&
        nextProps.editRow.id != undefined
      ) {
        //Perform some operation

        const packagerow = nextProps.packages.find(
          x => x.id == nextProps.editRow.id
        );
        let getexam = this.props.globals.exams.find((a) => a.id == packagerow.exams_covered);
        let examval = "";
        if (getexam != undefined) {
          examval = getexam.exam;

        }
        console.log("NextProps", "Setting values", packagerow);
        let examvalue = { value: packagerow.exams_covered, label: examval }

        this.setState({
          id: nextProps.editRow.id,
          package_name: packagerow.package_name,
          exams: packagerow.exams_covered,
          examsvalue: examvalue,
          package_nameValid: true,
          examsValid: true,
          formValid: true
        });
      }
    }
  }

  validateForm() {
    this.setState({
      formValid: this.state.package_nameValid && this.state.examsValid
    });

    if (this.state.formValid) {
      this.setState({ submitError: "" });
    }
  }
  getexams(data) {
    console.log("getexams", data);
    let newArray = [];
    data.exams.map((item) => {
      const newObj = { value: item.id, label: item.exam }
      newArray.push(newObj);
    })
    return newArray;

  }
  selecthandleInputChange = (ename, evalue) => {
    console.log("selecthandleInputChange", this.props);
    const name = ename;
    const value = evalue;
    let getData = this.props.globals.exams.find((a) => a.id == evalue);
    if (name == "exams") {
      this.setState({
        examsvalue: { value: value, label: getData.exam }
      });

    }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  render() {
    console.log("modal state", this.state);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form.Text className={`form-text ${this.state.submitError === "Data Updated Successfully!" ? "text-success" : "text-danger"}`}>
            {this.state.submitError}
          </Form.Text>
          <Form>
            <Row>
              <Col xl={6} lg={6} md={8} sm={12}>
                <Form.Group controlId="InputPackageName">
                  <Form.Label className="text-uppercase">
                    Package Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="package_name"
                    onChange={this.handleInputChange}
                    value={this.state.package_name}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.state.formErrors.package_name}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="InputExamCovered" className="mt-5">
                  <Form.Label className="text-uppercase">
                    Exam Covered
                  </Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Name"
                    name="exams"
                    onChange={this.handleInputChange}
                    value={this.state.exams}
                  /> */}
                  <SelectDropDown
                    stateData={this.state.examsvalue}
                    handleChange={this.selecthandleInputChange}
                    name="exams"
                    options={this.getexams(this.props.globals)}
                    placeholderName={'Exams'}
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.state.formErrors.exams}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer variant="white" className="px-4">
          <Button
            className="btn btn-success text-uppercase px-5"
            onClick={this.handleFormSubmit}
            disabled={this.state.loading}
          >
            {this.state.loading ? "Updating..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(
  graphql(EDIT_QUERY, {
    name: "editdata"
  })(PackageModalEdit)
);
