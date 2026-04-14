import React, { Component } from "react";
import { components } from "react-select";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";

import ReactDOMServer from "react-dom/server";

import BreadcrumbHeading from "../../breadcrumbs/BreadcrumbHeading";
import SelectDropDown from "../../selectdropdown/SelectDropDown";
import OrganizationModal from "./OrganizationModal";

import "./_hierarchy.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const EDIT_QUERY = gql`
  mutation($params: updateOrganisationStructure) {
    updateOrganisationStructure(params: $params)
  }
`;

const ADD_QUERY = gql`
  mutation($params: addOrganisationStructure) {
    addOrganisationStructure(params: $params)
  }
`;

const GETDATA = gql`
  query($institution_id: Int!) {
    getOrganisationStructure(institution_id: $institution_id) {
      id
      group_name
      parent_id
      timestamp
    }
  }
`;

const DELETE_QUERY = gql`
  mutation($organisation_id: ID) {
    deleteOrganisationStructure(organisation_id: $organisation_id)
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

class OrganizationSetupSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbsData: {
        Title: "Organization Structure"
      },
      isToggle: false,
      modalShow: false,
      id: 0,
      parentValue: "",
      group_name: "",
      parent: 0,
      submitError: "",
      formErrors: {
        group_name: "",
        parent: ""
      },
      group_nameValid: false,
      parentValid: false,

      formValid: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleEdit = e => {
    e.preventDefault();

    if (this.state.formValid) {
      let data = {
        group_name: this.state.group_name,
        parent_id: parseInt(this.state.parent),
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username"),

        id: this.state.id
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
        group_name: this.state.group_name,
        parent_id: parseInt(this.state.parent),
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username")
      };

      this.adddata(data).catch(error => {
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

  handleDelete = id => {
    if (id != 0) {
      this.deletedata(id).catch(error => {
        console.log("error", error);

        this.setState({
          submitError: error.graphQLErrors.map(x => x.message)
        });
        console.error(
          "ERR =>",
          error.graphQLErrors.map(x => x.message)
        );
      });
    }
  };

  adddata = async params => {
    await this.props.adddata({
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

        console.log("data1", data1, data);

        const new_data = {
          id: parseInt(data.addOrganisationStructure),
          group_name: this.state.group_name,
          parent_id: parseInt(this.state.parent),
          timestamp: "123",
          __typename: "getOrganisationStructure"
        };

        data1.getOrganisationStructure.push(new_data);

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

        console.log("adddata", data1);

        if (data.addOrganisationStructure) {
          this.setState({
            group_name: "",
            parent: 0,
            parentValue: "",

            submitError: "Data Inserted Successfully!",
            formErrors: {
              group_name: "",
              parent: ""
            },
            group_nameValid: false,
            parentValid: false,
            formValid: false
          });

          setTimeout(() => {
            this.SetpageLoad1();
          }, 1500);
        }
      }
    });
  };
  SetpageLoad1 = () => {
    this.setState({ submitError: "" });
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

        console.log("data1", data1, data);

        let changed = data1.getOrganisationStructure.find(
          x => x.id == this.state.id
        );
        let replace = data1.getOrganisationStructure.indexOf(changed);

        data1.getOrganisationStructure[
          replace
        ].group_name = this.state.group_name;
        data1.getOrganisationStructure[replace].parent_id = parseInt(
          this.state.parent
        );

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

        console.log("adddata", data1);

        if (data.updateOrganisationStructure) {
          this.setState({
            group_name: "",
            parent: 0,
            id: 0,
            parentValue: "",

            submitError: "Data Updated Successfully!",
            formErrors: {
              group_name: "",
              parent: ""
            },
            group_nameValid: false,
            parentValid: false,
            formValid: false
          });

          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      }
    });
  };

  deletedata = async params => {
    await this.props.deletedata({
      variables: {
        organisation_id: parseInt(params)
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: GETDATA,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("data1", data1, data);

        data1 = data1.getOrganisationStructure.find(x => x.id != this.state.id);

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

        console.log("adddata", data1);

        if (data.deleteOrganisationStructure) {
          this.setState({
            group_name: "",
            parent: 0,
            parentValue: "",

            submitError: "Data deleted Successfully!",
            formErrors: {
              group_name: "",
              parent: ""
            },
            group_nameValid: false,
            parentValid: false,
            formValid: false
          });

          setTimeout(() => {
            this.SetpageLoad2();
          }, 1500);
        }
      }
    });
  };
  SetpageLoad2 = () => {
    this.setState({ submitError: "" });
  };

  SetpageLoad = () => {
    this.setState({ submitError: "" });
    this.props.onHide();
  };

  handleClick(e) {
    this.setState({ isToggle: !this.state.isToggle });
  }

  handleInputChange = e => {
    console.log("e.target.value", e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSelectChange = (name, value) => {
    if (name == "parent") {
      console.log("findDatathis.props", this.props);
      let findData = this.props.getOrganisationStructure.getOrganisationStructure.find((a) => a.id == value);
      if (findData != undefined) {
        this.setState({
          parentValue: {
            label: findData.group_name,
            value: findData.id,
            id: findData.id
          }
        });
      }

    }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let group_nameValid = this.state.group_nameValid;
    let parentValid = this.state.parentValid;

    switch (fieldName) {
      case "group_name":
        if (value.length == "") {
          group_nameValid = false;
          fieldValidationErrors.group_name = "Group name Cannot Be Empty";
        } else {
          group_nameValid = true;
          fieldValidationErrors.group_name = "";
        }

        break;

      case "parent":
        if (value.length == "" || value == 0) {
          parentValid = false;
          fieldValidationErrors.parent = "Please select a parent";
        } else {
          parentValid = true;
          fieldValidationErrors.parent = "";
        }

        break;

      default:
        break;
    }

    console.log("validatefield", fieldName, fieldValidationErrors);
    this.setState(
      {
        formErrors: fieldValidationErrors,
        group_nameValid: group_nameValid,
        parentValid: parentValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.group_nameValid && this.state.parentValid
    });

    if (this.state.formValid) {
      this.setState({ submitError: "" });
    }
  }

  organizeStructure(orgdata) {
    let tempdata = Array();

    //find parent first
    let parent = orgdata.filter(x => x.parent_id == 0);

    //    console.log("Parent data", parent);
    for (let i = 0; i < parent.length; i++) {
      tempdata.push(parent[i]);
    }

    let level = 1;
    let nodes = orgdata.length - tempdata.length;

    console.log("lengths", orgdata.length, nodes);

    while (nodes > 0) {
      //let child = Array();

      if (level == 1) {
        for (let i = 0; i < tempdata.length; i++) {
          const child = orgdata.filter(x => x.parent_id == tempdata[i].id);
          if (child.length > 0) {
            tempdata[i].child = child;
            nodes--;
          }
        }

        level++;
      } else if (level == 2) {
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].child != undefined)
            for (let j = 0; j < tempdata[i].child.length; j++) {
              const child = orgdata.filter(
                x => x.parent_id == tempdata[i].child[j].id
              );
              if (child.length > 0) {
                tempdata[i].child[j].child = child;
                nodes--;
              }
            }
        }
        level++;
      } else if (level == 3) {
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].child != undefined)
            for (let j = 0; j < tempdata[i].child.length; j++) {
              if (tempdata[i].child[j].child != undefined) {
                for (let k = 0; k < tempdata[i].child[j].child.length; k++) {
                  const child = orgdata.filter(
                    x => x.parent_id == tempdata[i].child[j].child[k].id
                  );
                  if (child.length > 0) {
                    tempdata[i].child[j].child[k].child = child;
                    nodes--;
                  }
                }
              }
            }
        }
        level++;
      } else if (level == 4) {
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].child != undefined)
            for (let j = 0; j < tempdata[i].child.length; j++) {
              if (tempdata[i].child[j].child != undefined) {
                for (let k = 0; k < tempdata[i].child[j].child.length; k++) {
                  if (tempdata[i].child[j].child[k].child != undefined) {
                    for (
                      let l = 0;
                      l < tempdata[i].child[j].child[k].child.length;
                      l++
                    ) {
                      const child = orgdata.filter(
                        x =>
                          x.parent_id ==
                          tempdata[i].child[j].child[k].child[l].id
                      );
                      if (child.length > 0) {
                        tempdata[i].child[j].child[k].child[l].child = child;
                        nodes--;
                      }
                    }
                  }
                }
              }
            }
        }
        level++;
      } else {
        nodes--;
      }
    }

    console.log("ORG", tempdata);

    return tempdata;
  }

  // getChildStructure = data => {
  //   //  const childstructure = getOrganisationStructure(data.child);

  //   let children = Array();

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].child != undefined) {
  //       children.push(
  //         <div className="hv-item-child">
  //           {this.getOrganisationStructure(data[i].child)}
  //         </div>
  //       );
  //     } else {
  //       children.push(
  //         <div className="hv-item-child">
  //           <div className="simple-card">
  //             <i
  //               className="fal fa-edit fa-fw"
  //               onClick={() => this.setState({ modalShow: true })}
  //             />
  //             <p>{data[i].group_name} </p>
  //           </div>
  //         </div>
  //       );
  //     }
  //   }

  //   return children;
  // };

  getOrganisationStructure = data => {
    console.log("getOrganisationStructure", data);

    let parent_structure = Array();

    for (let j = 0; j < data.length; j++) {
      //let finddata = this.props.getOrganisationStructure.getOrganisationStructure.find((a) => a.parent_id == data[j].parent_id);
      let finddata = this.props.getOrganisationStructure.getOrganisationStructure.find((a) => a.parent_id == data[j].parent_id);
      console.log("getOrganisationStructurefinddata", finddata);
      let parentvalue = { value: finddata.id, label: finddata.group_name, id: finddata.id }
      console.log("parentvalue", parentvalue);
      if (data[j].child != undefined) {
        console.log("OrgStructure.getOrganisationStructure", this.props.getOrganisationStructure.getOrganisationStructure, data[j].parent_id);
        const childstructure = this.getOrganisationStructure(data[j].child);

        //  console.log("data", data[j], j, childstructure);


        if (data[j].parent_id != 0) {

          parent_structure.push(
            <div className="hv-item-child">
              <div className="hv-item">
                <div className="hv-item-parent">
                  <div className="simple-card">
                    <i
                      className="fal fa-edit fa-fw"
                      onClick={() =>
                        this.setState({
                          modalShow: true,
                          id: data[j].id,
                          group_name: data[j].group_name,
                          parent: parseInt(data[j].parent_id),
                          //sridevi code
                          parentvalue: parentvalue,
                          formErrors: {
                            group_name: "",
                            parent: ""
                          },
                          group_nameValid: true,
                          parentValid: true,

                          formValid: true
                        })
                      }
                    />
                    <p> {data[j].group_name} </p>
                  </div>
                </div>

                <div className="hv-item-children">{childstructure}</div>
              </div>
            </div>
          );
        } else {

          parent_structure.push(
            <div className="hv-item">
              <div className="hv-item-parent">
                <div className="simple-card">
                  <i
                    className="fal fa-edit fa-fw"
                    onClick={() =>
                      this.setState({
                        modalShow: true,
                        id: data[j].id,
                        group_name: data[j].group_name,
                        parent: parseInt(data[j].parent_id),
                        //sridevi code
                        parentvalue: parentvalue,
                        formErrors: {
                          group_name: "",
                          parent: ""
                        },
                        group_nameValid: true,
                        parentValid: true,

                        formValid: true
                      })
                    }
                  />
                  <p> {data[j].group_name} </p>
                </div>
              </div>

              <div className="hv-item-children">{childstructure}</div>
            </div>
          );
        }
      } else {

        parent_structure.push(
          <div className="hv-item-child">
            <div className="simple-card">
              <i
                className="fal fa-edit fa-fw"
                onClick={() =>
                  this.setState({
                    modalShow: true,
                    id: data[j].id,
                    group_name: data[j].group_name,
                    parent: parseInt(data[j].parent_id),
                    //sridevi code
                    parentvalue: parentvalue,
                    formErrors: {
                      group_name: "",
                      parent: ""
                    },
                    group_nameValid: true,
                    parentValid: true,

                    formValid: true
                  })
                }
              />
              <p> {data[j].group_name} </p>
            </div>
          </div>
        );
      }
    }

    //console.log("Structure", parent_structure);

    return parent_structure;
  };

  getScrollStructure = data => {
    // console.log("getOrganisationStructure", data);

    let parent_structure = Array();

    for (let j = 0; j < data.length; j++) {
      if (data[j].child != undefined) {
        //  console.log("data", data[j], j);
        const childstructure = this.getScrollStructure(data[j].child);

        //  console.log("data", data[j], j, childstructure);

        parent_structure.push(
          <li className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="name">{data[j].group_name}</div>
              <i
                onClick={() => this.handleDelete(data[j].id)}
                className="fal fa-trash fa-fw"
              />
            </div>
            <ul className="list-unstyled children-list">{childstructure}</ul>
          </li>
        );
      } else {
        parent_structure.push(
          <li className="d-flex justify-content-between align-items-center">
            <div className="name">{data[j].group_name}</div>
            <i
              onClick={() => this.handleDelete(data[j].id)}
              className="fal fa-trash fa-fw"
            />
          </li>
        );
      }
    }

    // console.log("Scroll Structure", parent_structure);

    return parent_structure;
  };
  getGroups(vals) {
    console.log("getGroups", vals);
    const data = Array();
    for (let i = 0; i < vals.length; i++) {
      data.push({
        label: vals[i].group_name,
        value: vals[i].id,
        id: vals[i].id
      });
    }

    return data.sort(function (x, y) {
      return x.id - y.id;
    });
  }

  render() {
    const renderThumb = ({ style, ...props }) => {
      const thumbStyle = {
        borderRadius: 6,
        width: "3px",
        backgroundColor: "rgba(255, 255, 255, 0.1)"
      };
      return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    console.log("Props", this.props, this.state);

    const OrgStructure = this.props.getOrganisationStructure;

    const loading = OrgStructure.loading;

    if (loading) return null;

    const orgdata = this.organizeStructure(
      JSON.parse(JSON.stringify(OrgStructure.getOrganisationStructure))
    );
    const displayData = this.getOrganisationStructure(orgdata);

    const scrollData = this.getScrollStructure(orgdata);

    return (
      <section className="organiztion_section">
        <Row>
          <Col xl={9} lg={12} md={12} sm={12}>
            <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
            <div className="hv-container">
              <div className="hv-wrapper">
                <div className="hv-item">{displayData}</div>
              </div>
            </div>
          </Col>

          <Col xl={3} lg={12} md={12} sm={12}>
            <Card as={Card.Body} className="h-100">
              <Form.Text className="form-text text-danger">
                {this.state.submitError}
              </Form.Text>
              <Form className="create-tree">
                <Form.Group controlId="SelectPrinciple">
                  <Form.Label className="text-uppercase">Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="group_name"
                    value={this.state.group_name}
                    onChange={this.handleInputChange}
                  />

                  <Form.Text className="form-text text-danger">
                    {this.state.formErrors.group_name}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="SelectBranch">
                  <Form.Label className="text-uppercase">
                    Parent Group
                  </Form.Label>
                  <SelectDropDown
                    options={this.getGroups(
                      OrgStructure.getOrganisationStructure
                    )}
                    stateData={this.state.parentValue}
                    //defaultValue={this.state.parent}
                    name="parent"
                    handleChange={this.handleSelectChange}
                    placeholderName={"Parent Group"}
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                  <Form.Text className="form-text text-danger">
                    {this.state.formErrors.parent}
                  </Form.Text>
                </Form.Group>

                <Card as={Card.Body} className="tree_creation p-2">
                  <h6 className="title mb-0" onClick={this.handleClick}>
                    Parent
                  </h6>
                  <div
                    className="tree"
                    style={{ display: this.state.isToggle ? "none" : "block" }}
                  >
                    <Scrollbars
                      style={{ height: "40vh" }}
                      renderThumbVertical={renderThumb}
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                    >
                      <ul className="list-unstyled parent-list">
                        {scrollData}
                      </ul>
                    </Scrollbars>
                  </div>
                </Card>
              </Form>
              <Button
                variant="success"
                className="create_btn"
                onClick={this.handleFormSubmit}
              >
                Create
              </Button>
            </Card>
          </Col>
        </Row>

        <OrganizationModal
          show={this.state.modalShow}
          parentstate={this.state}
          orgdata={this.getGroups(OrgStructure.getOrganisationStructure)}
          handleinputchange={this.handleInputChange}
          handleselectchange={this.handleSelectChange}
          handleedit={this.handleEdit}
          onHide={() => this.setState({ modalShow: false })}
        />
      </section>
    );
  }
}

export default withRouter(
  compose(
    graphql(GETDATA, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
      }),
      name: "getOrganisationStructure"
    }),
    graphql(DELETE_QUERY, {
      name: "deletedata"
    }),
    graphql(ADD_QUERY, {
      name: "adddata"
    }),
    graphql(EDIT_QUERY, {
      name: "editdata"
    })
  )(OrganizationSetupSection)
);
