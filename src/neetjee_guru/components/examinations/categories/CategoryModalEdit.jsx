import React, { Component } from "react";
import { components } from "react-select";
import { Row, Col, Modal, Form, Card, Button } from "react-bootstrap";
import SelectDropDown from "../../selectdropdown/SelectDropDown";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";


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

const GETDATA2 = gql`
  query($institution_id: Int!) {
    getCategories(institution_id: $institution_id) {
      id
      category_name
      package_id
      package_name
      # exams_covered
      high_difficult
      difficult
      moderate
      easy
      timestamp
    }
  }
`;

const EDIT_QUERY = gql`
  mutation($params: UpdateCategory) {
    updateCategory(params: $params)
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
          <path
            fill="currentColor"
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
          ></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class CategoryModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      category_name: "",

      package: 0,
      package_name: "",
      high_difficult: 0,
      difficult: 0,
      medium: 0,
      easy: 0,
      submitError: "",
      formErrors: {
        category_name: "",
        package: ""
      },
      category_nameValid: false,

      packageValid: false,

      formValid: false
    };
  }

  handleFormSubmit = e => {
    console.log("formsubmit", this.state);
    e.preventDefault();

    const addsum =
      parseInt(this.state.high_difficult) +
      parseInt(this.state.difficult) +
      parseInt(this.state.medium) +
      parseInt(this.state.easy);

    if (this.state.formValid && parseInt(addsum) == 100) {
      let data = {
        id: parseInt(this.state.id),
        category_name: this.state.category_name,
        package_id: parseInt(this.state.package),
        high_difficult: parseFloat(this.state.high_difficult),
        difficult: parseFloat(this.state.difficult),
        moderate: parseFloat(this.state.medium),
        easy: parseFloat(this.state.easy),

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
    } else if (parseInt(addsum) != 100 && parseInt(addsum) != 0) {
      this.setState({
        submitError: "Please ensure that the summation for difficulties is 100"
      });
    } else {
      this.setState({ submitError: "Please fill all the values to proceed" });
    }
  };

  editdata = async params => {
  const result = await this.props.editdata({
    variables: { params },
    update: (store, { data }) => {
      try {
        let data1 = store.readQuery({
          query: GETDATA2,
          variables: { institution_id: parseInt(Cookies.get("institutionid")) }
        });

        let found = data1.getCategories.find(a => a.id === this.state.id);
        let idindex = data1.getCategories.indexOf(found);
        const newCategories = {
          id: this.state.id,
          category_name: this.state.category_name,
          package_id: this.state.package,
          package_name: this.state.package_name.label,
          high_difficult: this.state.high_difficult,
          difficult: this.state.difficult,
          moderate: this.state.medium,
          easy: this.state.easy,
          timestamp: found.timestamp,
          __typename: "Categories"
        };
        data1.getCategories.splice(idindex, 1, newCategories);

        store.writeQuery({
          query: GETDATA2,
          variables: { institution_id: parseInt(Cookies.get("institutionid")) },
          data: data1
        });
      } catch (e) {
        console.log("Cache update exception", e);
      }
    }
  });

  // ✅ Close modal from actual response
  if (result.data.updateCategory) {
    this.setState({
      id: 0,
      category_name: "",
      package: 0,
      package_name: "",
      high_difficult: 0,
      difficult: 0,
      medium: 0,
      easy: 0,
      submitError: "",
      formErrors: { category_name: "", package: "" },
      category_nameValid: false,
      packageValid: false,
      formValid: false
    });
    this.props.onHide(); // ← closes modal
  }
};

  getExams(npackage) {
    if (this.props.getPackages != undefined) {
      const pack = this.props.getPackages.getPackages.find(
        x => (x.id = npackage)
      );

      return pack.exams_covered;
    }
  }

  getPackages(vals) {
    const data = Array();
    for (let i = 0; i < vals.length; i++) {
      data.push({
        label: vals[i].package_name,
        value: vals[i].id,
        id: vals[i].id
      });
    }

    return data.sort(function (x, y) {
      return x.id - y.id;
    });
  }

  handleSelectChange = (name, value) => {
    const selectedpackage = this.props.getPackages.getPackages.find(
      x => x.id == value
    );

    this.setState(
      { package: value, package_name: { value: value, label: selectedpackage.package_name } },
      () => {
        this.validateField(name, value);
      }
    );
  };

  SetpageLoad = () => {
    this.setState({ submitError: "" });
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
    let category_nameValid = this.state.category_nameValid;
    let packageValid = this.state.packageValid;
    let submitError = this.state.submitError;

    console.log("ValidateField", fieldName, value);

    switch (fieldName) {
      case "category_name":
        if (value.length == "") {
          category_nameValid = false;
          fieldValidationErrors.category_name = "Category name Cannot Be Empty";
        } else {
          category_nameValid = true;
          fieldValidationErrors.category_name = "";
        }

        break;

      case "package":
        if (value.length == "" || value == 0) {
          packageValid = false;
          fieldValidationErrors.package = "Select Package";
        } else {
          packageValid = true;
          fieldValidationErrors.package = "";
        }

        break;

      case "high_difficult":
        if (value < 0 || value > 100) {
          packageValid = false;
          submitError = "Invalid Values entered for Difficulty %";
        } else {
          packageValid = true;
          submitError = "";
        }
        break;

      case "difficult":
        if (value < 0 || value > 100) {
          packageValid = false;
          submitError = "Invalid Values entered for Difficulty %";
        } else {
          packageValid = true;
          submitError = "";
        }
        break;

      case "medium":
        if (parseInt(value) < 0 || parseInt(value) > 100) {
          packageValid = false;
          submitError = "Invalid Values entered for Difficulty %";
        } else {
          packageValid = true;
          submitError = "";
        }
        break;

      case "easy":
        if (value < 0 || value > 100) {
          packageValid = false;
          submitError = "Invalid Values entered for Difficulty %";
        } else {
          packageValid = true;
          submitError = "";
        }
        break;

      default:
        break;
    }

    // console.log("validatefield", fieldName, fieldValidationErrors);
    this.setState(
      {
        formErrors: fieldValidationErrors,
        category_nameValid: category_nameValid,
        packageValid: packageValid,
        submitError: submitError
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.category_nameValid && this.state.packageValid
    });

    if (this.state.formValid) {
      this.setState({ submitError: "" });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("NextProps", nextProps);

    if (nextProps.editRow != undefined) {
      if (
        nextProps.editRow.id !== this.state.id &&
        nextProps.editRow.id != undefined
      ) {
        //Perform some operation

        const catrow = nextProps.categories.find(
          x => x.id == nextProps.editRow.id
        );

        console.log("NextProps", "Setting values", catrow);

        this.setState({
          id: nextProps.editRow.id,
          category_name: catrow.category_name,
          package: catrow.package_id,
          high_difficult: catrow.high_difficult,
          difficult: catrow.difficult,
          medium: catrow.moderate,
          easy: catrow.easy,
          category_nameValid: true,
          packageValid: true,
          formValid: true,
          package_name: { value: catrow.package_id, label: catrow.package_name }
        });
      }
    }
  }

  render() {
    console.log("state", this.state, this.props);

    if (this.props.getPackages.loading) return null;

    const packages = this.props.getPackages.getPackages;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form.Text className="form-text text-danger">
            {this.state.submitError}
          </Form.Text>
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group controlId="SelectCaterogry">
                  <Form.Label className="text-uppercase">
                    Section Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="category_name"
                    value={this.state.category_name}
                    onChange={this.handleInputChange}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.state.formErrors.category_name}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="SelectPackageType" className="mt-5">
                  <Form.Label className="text-uppercase">
                    Package Name
                  </Form.Label>
                  <SelectDropDown
                    stateData={this.state.package_name}
                    options={this.getPackages(packages)}
                    placeholderName={"select package"}
                    //defaultValue={this.state.package}
                    handleChange={this.handleSelectChange}
                    name="package"
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Card as={Card.body} className="h-100 p-4">
                  <Row className="px-2 mb-2 justify-content-between">
                    <Form.Label className="text-uppercase">
                      Category Complexity
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="InputHDifficulty">
                      <Form.Control
                        type="text"
                        placeholder="HIGH DIFFICULTY"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="InputHDifficultyValue">
                      <Form.Control
                        type="number"
                        placeholder="60%"
                        name="high_difficult"
                        maxLength={3}
                        value={this.state.high_difficult}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="InputDifficulty">
                      <Form.Control
                        type="text"
                        placeholder="DIFFICULTY"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="InputDifficultyValue">
                      <Form.Control
                        type="number"
                        placeholder="10%"
                        maxLength={3}
                        name="difficult"
                        value={this.state.difficult}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="InputModerate">
                      <Form.Control
                        type="text"
                        placeholder="MODERATE"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="InputModerateVAlue">
                      <Form.Control
                        type="number"
                        placeholder="20%"
                        name="medium"
                        maxLength={3}
                        value={this.state.medium}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="InputEasy">
                      <Form.Control type="text" placeholder="EASY" disabled />
                    </Form.Group>
                    <Form.Group as={Col} controlId="InputEasyValue">
                      <Form.Control
                        type="number"
                        placeholder="10%"
                        name="easy"
                        maxLength={3}
                        value={this.state.easy}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer variant="white" className="px-4">
          <Button
            className="btn btn-success text-uppercase px-5"
            onClick={this.handleFormSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(
  compose(
    graphql(EDIT_QUERY, {
      name: "editdata"
    }),
    graphql(GETDATA, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
        ,
        fetchPolicy: 'network-only'
      }),
      name: "getPackages"
    })
  )(CategoryModalEdit)
);
