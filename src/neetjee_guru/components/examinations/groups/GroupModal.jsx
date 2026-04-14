import React, { Component } from "react";
import Select from "react-select";
import { Modal, Form, Col, Card, Button, Row } from "react-bootstrap";
import BranchData from "./BranchData";
import SectionData from "./SectionData";
import ClassesData from "./ClassesData";
import { components } from "react-select";
import SelectDropDown from "../../selectdropdown/SelectDropDown";

import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";

const DropdownIndicator = (props) => {
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

const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
      classes {
        id
        class
      }
      globalBranches {
        id
        branch_name
      }
      globalCategories {
        id
        category_name
      }
      globalPackages {
        id
        package_name
      }
      globalSectionCategory {
        id
        section_category
      }
      globalSections {
        id
        section_name
        branch_id
        section_category_id
        category_id
      }
    }
  }
`;

const FETCH_SECTIONSCATEGORY = gql`
  query($institution_id: Int!) {
    getSectionCategories(institution_id: $institution_id) {
      id
      section_category
      package_id
      category_id
      branch_ids
      class_ids
      section_ids
      branch_id_values
      class_id_values
      section_id_values
      package_name
    }
  }
`;
const ADD_GROUP = gql`
  mutation($params: SectionCategoryInput) {
    addSectionCategory(params: $params)
  }
`;
class GroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      branch: [],
      section: "",
      class: "",
      group: "",
      package: "",
      category: "",
      submitError: "",
      formErrors: {
        group: "",
        package: "",
        category: "",
        branch: "",
        class: "",
        section: ""
      },
      sectionValid: false,
      groupValid: false,
      packageValid: false,
      categoryValid: false,
      classValid: false,
      branchValid: false,
      formValid: false,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let groupValid = this.state.groupValid;
    let packageValid = this.state.packageValid;
    let categoryValid = this.state.categoryValid;
    let classValid = this.state.classValid;
    let branchValid = this.state.branchValid;
    let sectionValid = this.state.sectionValid;
    switch (fieldName) {
      case "section":
        if (value.length == "") {
          sectionValid = false;
          fieldValidationErrors.section = "Section Cannot Be Empty";
        } else {
          sectionValid = true;
          fieldValidationErrors.section = "";
        }

        break;

      case "package":
        if (value.length == "") {
          packageValid = false;
          fieldValidationErrors.package = "Package Cannot Be Empty";
        } else {
          packageValid = true;
          fieldValidationErrors.package = "";
        }
        break;

      case "group":
        if (value.length == "") {
          groupValid = false;
          fieldValidationErrors.group = "Group Cannot Be Empty";
        } else {
          groupValid = true;
          fieldValidationErrors.group = "";
        }
        break;

      case "category":
        if (value.length == "") {
          categoryValid = false;
          fieldValidationErrors.category = "Difficulty Cannot Be Empty";
        } else {
          categoryValid = true;
          fieldValidationErrors.category = "";
        }
        break;
      case "class":
        if (value.length == "") {
          classValid = false;
          fieldValidationErrors.class = "Class Cannot Be Empty";
        } else {
          classValid = true;
          fieldValidationErrors.class = "";
        }
        break;
      case "branch":
        if (value.length == "") {
          branchValid = false;
          fieldValidationErrors.branch = "Branch Cannot Be Empty";
        } else {
          branchValid = true;
          fieldValidationErrors.branch = "";
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        groupValid: groupValid,
        packageValid: packageValid,
        categoryValid: categoryValid,
        classValid: classValid,
        branchValid: branchValid,
        sectionValid: sectionValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.groupValid &&

        this.state.classValid &&
        this.state.branchValid && this.state.packageValid &&
        this.state.categoryValid &&
        this.state.sectionValid
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (this.state.formValid) {
      let addSectionCategory = "";
      let sectionData = [];
      if (this.state.section.toString() != "0") {
        sectionData = this.state.section;
      }
      else {
        this.props.globals.globalSections.map((item) => {
          sectionData.push(item.id);
        });
      }
      addSectionCategory = {
        section_category: this.state.group,
        class_ids: parseInt(this.state.class),
        section_ids: sectionData,
        package_id: parseInt(this.state.package),
        category_id: parseInt(this.state.category),
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username"),
      };
      this.addSectionCategory(addSectionCategory).catch((error) => {
        console.log("catch if error");
        console.log(error);
        this.setState({
          submitError: error.graphQLErrors.map((x) => x.message),
        });
        console.error(
          "ERR =>",
          error.graphQLErrors.map((x) => x.message)
        );
      });
    } else {
      this.setState({ submitError: "Please fill all the values to proceed" });
    }
  };
  addSectionCategory = async (params) => {
    await this.props.addSectionCategory({
      variables: {
        params,
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_SECTIONSCATEGORY,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });

        let branchvalue = [];
        if (this.state.branch != "") {
          if (this.state.branch.toString() != "0") {
            this.state.branch.map((item) => {
              let findData = this.props.globals.globalBranches.find((a) => a.id == item);
              if (findData != undefined) {
                const newObj = findData.branch_name;
                branchvalue.push(newObj);
              }

            })
          }
          else {
            this.props.globals.globalBranches.map((item) => {
              //let findData = this.props.globals.globalBranches.find((a) => a.id == item);
              if (item != undefined) {
                const newObj = item.branch_name;
                branchvalue.push(newObj);
              }

            })
          }

        }

        let sectionvalue = [];
        if (this.state.section != "") {
          if (this.state.section.toString() != "0") {
            this.state.section.map((item) => {
              let findData = this.props.globals.globalSections.find((a) => a.id == item);
              if (findData != undefined) {
                const newObj = findData.section_name;
                sectionvalue.push(newObj);
              }

            })
          } else {
            this.props.globals.globalSections.map((item) => {
              //let findData = this.props.globals.globalSections.find((a) => a.id == item);
              if (item != undefined) {
                const newObj = item.section_name;
                sectionvalue.push(newObj);
              }

            })
          }

        }
        let packagename = "";
        if (this.state.package != "") {
          let findData = this.props.globals.globalPackages.find((a) => a.id == this.state.package);
          if (findData != undefined) {
            packagename = findData.package_name;
          }
        }
        console.log("packagename", packagename);
        let class_id_values = "";
        if (this.state.class != "") {
          let findData = this.props.globals.classes.find((a) => a.id == this.state.class);
          if (findData != undefined) {
            class_id_values = findData.class;
          }


        }

        const newSection = {
          id: data.addSectionCategory,
          section_category: this.state.group,
          branch_ids: this.state.branch.toString(),
          class_ids: parseInt(this.state.class),
          section_ids: this.state.section.toString(),
          package_id: parseInt(this.state.package),
          package_name: packagename,
          category_id: parseInt(this.state.category),

          branch_id_values: branchvalue.toString(),
          class_id_values: class_id_values,
          section_id_values: sectionvalue.toString(),

          __typename: "SectionCategory",

        };
        data1.getSectionCategories.push(newSection);

        try {
          store.writeQuery({
            query: FETCH_SECTIONSCATEGORY,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid")),
            },
            data: data1,
          });
        } catch (e) {
          console.log("Exception", e);
        }



        let data4 = store.readQuery({
          query: FETCH_SECTIONSCATEGORY,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });
        console.log("data4", data4);
        data1.getSectionCategories = data4;

        console.log("addSectionCategorydata", data);
        if (data.addSectionCategory) {
          this.setState({
            currentStep: 5,
            branch: "",
            section: "",
            class: "",
            group: "",
            package: "",
            category: "",
            submitError: "",
            formErrors: {
              group: "",
              package: "",
              category: "",
              class: "",
              branch: "",
              section: ""
            },
            sectionValid: false,
            groupValid: false,
            packageValid: false,
            categoryValid: false,
            classValid: false,
            branchValid: false,
          });

          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      },
    });
  };
  SetpageLoad = () => {
    this.setState({ currentStep: 1, submitError: "" });
    this.props.onHide();
  };

  getSectionDefaultValues(vals) {
    let sections = Array();
    // for (let i = 0; i < vals.length; i++) {
    //     if (i % 2 == 0) {
    //         const branchval = vals[i];
    //         branchs.push({ label: branchval.branch_name, value: branchval.branch_name, id: branchval.id });
    //     }
    // }

    return sections;
  }

  getSectionValues(vals) {
    let sections = Array();
    for (let i = 0; i < vals.length; i++) {
      const sectionval = vals[i];
      sections.push({
        label: sectionval.section_name,
        value: sectionval.section,
        id: sectionval.id,
      });
    }

    return sections;
  }
  branchhandleMultipleSelectInputChange = e => {
    let branch = Array();
    if (e != null) {
      for (let i = 0; i < e.length; i++) {
        const branchval = e[i];
        branch.push(branchval.value);
      }
      this.setState({
        branch: branch
      },
        () => {
          this.validateField("branch", "1");
        }
      );
    }
    else {
      this.setState({
        branch: ""
      },
        () => {
          this.validateField("branch", "");
        }
      );
    }
  };
  sectionhandleMultipleSelectInputChange = e => {
    let section = Array();
    if (e != null) {
      for (let i = 0; i < e.length; i++) {
        const sectionval = e[i];
        section.push(sectionval.value);
      }
      this.setState({
        section: section
      }, () => {
        this.validateField("section", "1");
      });
    }
    else {
      this.setState({
        section: ""
      }, () => {
        this.validateField("section", "");
      });
    }
  };
  getBrachData() {
    let getArray = [];
    const newObj1 = {
      value: "0",
      label: "ALL"
    }
    getArray.push(newObj1);
    if (this.state.branch.toString() != "0") {
      for (let i = 0; i <= this.props.globals.globalBranches.length; i++) {
        let idata = this.props.globals.globalBranches[i];
        if (idata != undefined) {
          const newObj = {
            value: idata.id,
            label: idata.branch_name
          }
          getArray.push(newObj);

        }

      }
    }

    return getArray;
  }
  getSectionData() {
    let getArray = [];
    if (this.state.branch != "" || this.state.package != "" || this.state.category != "") {

      if (this.state.section.toString() != "0") {
        for (let i = 0; i <= this.props.getSections.length; i++) {
          let idata = this.props.getSections[i];
          if (idata != undefined) {
            if (this.state.branch != "") {
              if (this.state.branch.toString() != "0") {
                this.state.branch.map((branchmapData) => {
                  if (branchmapData == idata.branch_id) {
                    if (this.state.package != "") {
                      if (this.state.package == idata.package_id) {
                        if (this.state.category != "") {
                          if (this.state.category == idata.category_id) {
                            const newObj = {
                              value: idata.id,
                              label: idata.section_name
                            }
                            getArray.push(newObj);
                          }
                        }
                        else {
                          const newObj = {
                            value: idata.id,
                            label: idata.section_name
                          }
                          getArray.push(newObj);
                        }
                      }
                    }
                    else {
                      const newObj = {
                        value: idata.id,
                        label: idata.section_name
                      }
                      getArray.push(newObj);
                    }


                  }

                })

              }
              else {
                this.props.globals.globalBranches.map((branchmapData) => {
                  if (branchmapData.id == idata.branch_id) {
                    if (this.state.package != "") {
                      if (this.state.package == idata.package_id) {
                        if (this.state.category != "") {
                          if (this.state.category == idata.category_id) {
                            const newObj = {
                              value: idata.id,
                              label: idata.section_name
                            }
                            getArray.push(newObj);
                          }
                        }
                        else {
                          const newObj = {
                            value: idata.id,
                            label: idata.section_name
                          }
                          getArray.push(newObj);
                        }
                      }
                    }
                    else {
                      const newObj = {
                        value: idata.id,
                        label: idata.section_name
                      }
                      getArray.push(newObj);


                    }

                  }

                })

              }

            }
            else {
              if (this.state.package != "") {
                if (this.state.package == idata.package_id) {
                  if (this.state.category != "") {
                    if (this.state.category == idata.category_id) {
                      const newObj = {
                        value: idata.id,
                        label: idata.section_name
                      }
                      getArray.push(newObj);
                    }
                  } else {
                    const newObj = {
                      value: idata.id,
                      label: idata.section_name
                    }
                    getArray.push(newObj);
                  }


                }

              }
            }

          }

        }

        if (getArray.length > 0) {
          const newObj1 = {
            value: "0",
            label: "ALL"
          }
          getArray.unshift(newObj1);

        }
      }

    }

    return getArray;
  }
  render() {
    console.log("this.state", this.state);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {this.state.currentStep == 5 ? (
            <Form.Text className="form-text text-danger">
              Group Saved successfully
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
                controlId="SelectName"
              >
                <Form.Label className="text-uppercase"> Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Group"
                  name="group"
                  onChange={this.handleInputChange}
                  autoComplete="off"
                  value={this.state.group}
                />
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.group}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectBranch"
              >
                <Form.Label className="text-uppercase">branches</Form.Label>
                <Select maxMenuHeight={150}
                  name="branch"
                  isMulti
                  options={this.getBrachData()}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholderName={'Branch'}
                  onChange={this.branchhandleMultipleSelectInputChange}
                />
                <Form.Text className="form-text text-danger">
                  {this.state.formErrors.branch}
                </Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={12}
                sm={12}
                controlId="SelectPackage"
              >
                <Form.Label className="text-uppercase">packages</Form.Label>
                <Form.Control
                  as="select"
                  name="package"
                  onChange={this.handleInputChange}
                  value={this.state.package}
                >
                  <option value="">--Select Package--</option>
                  {this.props.globals.globalPackages.map((packagesdata) => (
                    <option value={packagesdata.id}>
                      {packagesdata.package_name}
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
                <Form.Label className="text-uppercase">categories</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.handleInputChange}
                  value={this.state.category}
                >
                  <option value="">--Select Category--</option>
                  {this.props.globals.globalCategories.map((categoriesdata) => (
                    <React.Fragment>
                      {this.state.package == categoriesdata.package_id ? (
                        <option value={categoriesdata.id}>
                          {categoriesdata.category_name}
                        </option>
                      ) : ("")}
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
                controlId="SelectClass"
              >
                <Form.Label className="text-uppercase">Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  onChange={this.handleInputChange}
                  value={this.state.class}
                >
                  <option>--Select Class--</option>
                  {this.props.globals.classes.map((classesdata) => (
                    <option value={classesdata.id}>{classesdata.class}</option>
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
                controlId="SelectSection"
              >
                <Form.Label className="text-uppercase">Sections</Form.Label>
                <Select maxMenuHeight={150}
                  name="section"
                  isMulti
                  options={this.getSectionData()}
                  className="basic-multi-select"
                  classNamePrefix="select section"
                  onChange={this.sectionhandleMultipleSelectInputChange}
                />
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
            Create &amp; Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default compose(
  graphql(ADD_GROUP, {
    name: "addSectionCategory",
  })
)(GroupModal);
