import React, { Component } from "react";
import Select from "react-select";
import { Modal, Form, Col, Card, Button, Row } from "react-bootstrap";
import { components } from "react-select";
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

class GroupModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupid: "",
      currentStep: 1,
      classname: "",
      section: [],
      package: "",
      category: "",
      branch: [],
      group: "",
      submitError: "",
      formErrors: {
        group: "",
        package: "",
        category: "",
        class: "",
        branch: ""
      },
      groupValid: true,
      classValid: true,
      branchValid: true,
      packageValid: true,
      categoryValid: true,
      formValid: true
    };
  }
  getBrachData() {
    let getArray = [];
    const newObj1 = {
      value: "0",
      label: "ALL"
    }
    getArray.push(newObj1);
    if (this.props.stateData.branch.toString() != "0") {
      for (let i = 0; i <= this.props.globals.globalBranches.length; i++) {
        let idata = this.props.globals.globalBranches[i];
        if (idata != undefined) {
          const newObj = {
            value: idata.id,
            label: idata?.branch_name
          }
          getArray.push(newObj);

        }
      }
    }
    return getArray;
  }
  getBranchesDefaultValues() {
    //let data = this.props.stateData.branch.split(",");
    let getdata = [];
    if (this.props.stateData.branch.toString() != "0") {
      this.props.stateData.branch.map((item) => {
        let findData = this.props.globals.globalBranches.find((a) => a.id == item);
        const newObj = {
          value: item,
          label: findData?.branch_name
        }
        getdata.push(newObj);
      }

      )
    }
    else {
      // this.props.globals.globalBranches.map((item) => {
      //   const newObj = {
      //     value: item.id,
      //     label: item.branch_name
      //   }
      //   getdata.push(newObj);
      // }

      // )

      const newObj = {
        value: "0",
        label: "ALL"
      }
      getdata.push(newObj);
    }

    return getdata;
  }
  getSectionsDefaultValues() {
    //let data = this.props.stateData.section.split(",");
    let getdata = [];
    console.log("getSectionsDefaultValuesgetSectionsDefaultValues", this.props.stateData.section);
    if (this.props.stateData.section.toString() != "0") {
      this.props.stateData.section.map((item) => {
        let findData = this.props.getSections.find((a) => a.id == item);
        const newObj = {
          value: item,
          label: findData?.section_name
        }
        getdata.push(newObj);
      })
    }
    else {
      const newObj = {
        value: "0",
        label: "ALL"
      }
      getdata.push(newObj);
    }

    return getdata;
  }
  getSectionData() {
    let getArray = [];
    if (this.props.stateData.branch != "" || this.props.stateData.package != "" || this.props.stateData.category != "") {

      if (this.props.stateData.section.toString() != "0") {
        for (let i = 0; i <= this.props.getSections.length; i++) {
          let idata = this.props.getSections[i];
          if (idata != undefined) {
            if (this.props.stateData.branch != "") {
              if (this.props.stateData.branch.toString() != "0") {

                this.props.stateData.branch.map((branchmapData) => {
                  if (branchmapData == idata.branch_id) {
                    if (this.props.stateData.package != "") {
                      if (this.props.stateData.package == idata.package_id) {
                        if (this.props.stateData.category != "") {
                          if (this.props.stateData.category == idata.category_id) {
                            const newObj = {
                              value: idata.id,
                              label: idata?.section_name
                            }
                            getArray.push(newObj);
                          }
                        }
                        else {
                          const newObj = {
                            value: idata.id,
                            label: idata?.section_name
                          }
                          getArray.push(newObj);
                        }

                      }
                    }
                    else {
                      const newObj = {
                        value: idata.id,
                        label: idata?.section_name
                      }
                      getArray.push(newObj);
                      console.log("getArray", getArray);
                    }

                  }

                })
              } else {
                this.props.globals.globalBranches.map((branchmapData) => {
                  if (branchmapData.id == idata.branch_id) {
                    if (this.props.stateData.package != "") {
                      if (this.props.stateData.package == idata.package_id) {
                        if (this.props.stateData.category != "") {
                          if (this.props.stateData.category == idata.category_id) {
                            const newObj = {
                              value: idata.id,
                              label: idata?.section_name
                            }
                            getArray.push(newObj);
                          }
                        }
                        else {
                          const newObj = {
                            value: idata.id,
                            label: idata?.section_name
                          }
                          getArray.push(newObj);
                        }

                      }
                    }
                    else {
                      const newObj = {
                        value: idata.id,
                        label: idata?.section_name
                      }
                      getArray.push(newObj);

                    }

                  }

                })
                console.log("getArraygetArray", getArray);
              }

            }
            else {
              if (this.props.stateData.package != "") {
                if (this.props.stateData.package == idata.package_id) {
                  if (this.props.stateData.category != "") {
                    if (this.props.stateData.category == idata.category_id) {
                      const newObj = {
                        value: idata.id,
                        label: idata?.section_name
                      }
                      getArray.push(newObj);
                    }
                  } else {
                    const newObj = {
                      value: idata.id,
                      label: idata?.section_name
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
    console.log("this.props.stateData.section", this.props.stateData.section);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {this.props.stateData.currentStep == 5 ? (
            <Form.Text className="form-text text-danger">
              Group Updated successfully
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
                controlId="SelectName"
              >
                <Form.Label className="text-uppercase"> Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Group"
                  name="group"
                  onChange={this.props.parenthandleInputChange}
                  autoComplete="off"
                  value={this.props.stateData.group}
                />
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.group}
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
                  //defaultValue={this.getBranchesDefaultValues()}
                  value={this.getBranchesDefaultValues()}
                  name="branch"
                  isMulti
                  options={this.getBrachData()}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholderName={'Branch'}
                  onChange={this.props.branchhandleMultipleSelectInputChange}
                />
                <Form.Text className="form-text text-danger">
                  {this.props.stateData.formErrors.branch}
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
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.package}
                >
                  <option value="">--Select Package--</option>
                  {this.props.globals.globalPackages.map(packagesdata => (
                    <option value={packagesdata.id}>
                      {packagesdata.package_name}
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
                <Form.Label className="text-uppercase">categories</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.category}
                >
                  <option value="">--Select Category--</option>
                  {this.props.globals.globalCategories.map(categoriesdata => (
                    <React.Fragment>
                      {this.props.stateData.package == categoriesdata.package_id ? (
                        <option value={categoriesdata.id}>
                          {categoriesdata.category_name}
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
                controlId="SelectClass"
              >
                <Form.Label className="text-uppercase">Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  onChange={this.props.parenthandleInputChange}
                  value={this.props.stateData.class}
                >
                  <option>--Select Class--</option>
                  {this.props.globals.classes.map(classesdata => (
                    <option value={classesdata.id}>{classesdata.class}</option>
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
                controlId="SelectSection"
              >
                <Form.Label className="text-uppercase">Sections</Form.Label>
                <Select maxMenuHeight={150}
                  value={this.getSectionsDefaultValues()}
                  name="section"
                  isMulti
                  options={this.getSectionData()}
                  className="basic-multi-select"
                  classNamePrefix="select section"
                  onChange={this.props.sectionhandleMultipleSelectInputChange}
                />
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
            Create &amp; Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default GroupModalEdit;
