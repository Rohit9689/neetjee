import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import BranchModal from "./BranchModal";
import BranchModalEdit from "./BranchModalEdit";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import "./_branches.scss";
import SingleLocation from "./SingleLocation";

const ADD_BRANCH = gql`
  mutation($branches: BranchesInput) {
    addBranch(branches: $branches)
  }
`;
const GET_GLOBALS = gql`
 query($institution_id: Int!) {
          globals(institution_id: $institution_id) {
            branchData {
              total_count
              branch_data {
                region
                count
              }
            }
            regions {
              id
              region
            }
            cities {
              id
              city_name
              region_id
            }
            organisationDropdown {
              id
              group_name
            }
          }
        }
`;

const DELETE_BRANCH = gql`
  mutation($branch_id: ID) {
    deleteBranch(branch_id: $branch_id)
  }
`;

const FETCH_BRANCHES = gql`
  query($institution_id: Int!) {
    getBranches(institution_id: $institution_id) {
      id
      branch_name
      contact_no
      complete_address
      region_id
      city_id
      organisation_structure_id
      hod
      hod_mobile
      principal
      principal_mobile
      vice_principal
      vice_principal_mobile
      sections {
        id
        section_name
      }

      total_sections
    }
  }
`;

const EDIT_BRANCH = gql`
  mutation($params: UpdateBranchInput) {
    updateBranch(params: $params)
  }
`;
class BranchesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow1: false,
      status: 1,
      currentStep: 1,
      branchid: "",
      branch: "",

      mobile: "",
      address: "",
      region: "",
      city_id: 0,
      organisation_structure_id: 0,
      hod: "",
      hod_mobile: "",
      principal: "",
      principal_mobile: "",
      vice_principal: "",
      vice_principal_mobile: "",
      submitError: "",
      formErrors: {
        branch: "",
        principal: "",
        mobile: "",
        hod_mobile: "",
        principal_mobile: "",
        vice_principal_mobile: ""
      },
      hod_mobileValid: false,
      principal_mobileValid: false,
      vice_principal_mobileValid: false,
      branchValid: false,
      principalValid: false,
      mobileValid: false,
      formValid: false,
      BranchesSection: {
        Title: "Branches",
        btnName: "Add New Branch"
      },
      tableHeaderData: {
        Title: "Branches"
      },
      modalShow: false
    };
  }
  parentStateSet = () => {
    console.log("sreee");
    this.setState({
      modalShow1: false,
      status: 1,
      currentStep: 1,
      branchid: "",
      branch: "",
      mobile: "",
      address: "",
      region: "",
      city_id: 0,
      organisation_structure_id: 0,
      hod: "",
      hod_mobile: "",
      principal: "",
      principal_mobile: "",
      vice_principal: "",
      vice_principal_mobile: "",
      submitError: "",
      formErrors: {
        branch: "",
        principal: "",
        mobile: "",
        hod_mobile: "",
        principal_mobile: "",
        vice_principal_mobile: ""
      },
      hod_mobileValid: false,
      principal_mobileValid: false,
      vice_principal_mobileValid: false,
      branchValid: false,
      principalValid: false,
      mobileValid: false,
      formValid: false,
      BranchesSection: {
        Title: "Branches",
        btnName: "Add New Branch"
      },
      tableHeaderData: {
        Title: "Branches"
      },
      modalShow: true
    });
  };
  InserthandleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Cookies2", Cookies.get("username"));
    console.log("institutionid2", Cookies.get("institutionid"));

    if (this.state.formValid) {
      let addbranchobj = "";
      addbranchobj = {
        branch_name: this.state.branch,
        contact_no: this.state.mobile,
        complete_address: this.state.address,
        region_id: parseInt(this.state.region),
        city_id: parseInt(this.state.city_id),
        organisation_structure_id: parseInt(
          this.state.organisation_structure_id
        ),
        hod: this.state.hod,
        hod_mobile: this.state.hod_mobile,
        principal: this.state.principal,
        principal_mobile: this.state.principal_mobile,
        vice_principal: this.state.vice_principal,
        vice_principal_mobile: this.state.vice_principal_mobile,
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username")
      };
      this.addbranch(addbranchobj).catch(error => {
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
  addbranch = async branches => {
    await this.props.addbranch({
      variables: {
        branches
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_BRANCHES,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("data1", data1);
        const newBranch = {
          id: data.addBranch,
          branch_name: this.state.branch,
          contact_no: this.state.mobile,
          complete_address: this.state.address,
          region_id: this.state.region,
          city_id: parseInt(this.state.city_id),
          organisation_structure_id: parseInt(
            this.state.organisation_structure_id
          ),
          hod: this.state.hod,
          hod_mobile: this.state.hod_mobile,
          principal: this.state.principal,
          principal_mobile: this.state.principal_mobile,
          vice_principal: this.state.vice_principal,
          vice_principal_mobile: this.state.vice_principal_mobile,
          sections: [],
          total_sections: "2",
          __typename: "Branches"
        };
        data1.getBranches.push(newBranch);

        try {
          store.writeQuery({
            query: FETCH_BRANCHES,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        if (data.addBranch) {
          this.setState({
            currentStep: 5,
            branch: "",

            mobile: "",
            address: "",
            region: "",
            city_id: 0,
            organisation_structure_id: 0,
            hod: "",
            hod_mobile: "",
            principal: "",
            principal_mobile: "",
            vice_principal: "",
            vice_principal_mobile: "",
            submitError: "",
            formErrors: {
              branch: "",
              principal: "",
              mobile: ""
            },
            branchValid: false,
            principalValid: false,
            mobileValid: false,
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
    console.log("setTimeout");
    this.setState({ currentStep: 1, modalShow: false });
    //this.props.onHide()
  };

  // Editmodal functions
  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Cookies2", Cookies.get("username"));
    console.log("institutionid2", Cookies.get("institutionid"));

    if (this.state.formValid) {
      let editbranchobj = "";
      editbranchobj = {
        id: this.state.branchid,
        branch_name: this.state.branch,
        contact_no: this.state.mobile,
        complete_address: this.state.address,
        region_id: parseInt(this.state.region),
        city_id: parseInt(this.state.city_id),
        organisation_structure_id: parseInt(
          this.state.organisation_structure_id
        ),
        hod: this.state.hod,
        hod_mobile: this.state.hod_mobile,
        principal: this.state.principal,
        principal_mobile: this.state.principal_mobile,
        vice_principal: this.state.vice_principal,
        vice_principal_mobile: this.state.vice_principal_mobile,
        username: Cookies.get("username")
      };
      this.editbranch(editbranchobj).catch(error => {
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
  editbranch = async params => {
    await this.props.editbranch({
      variables: {
        params
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_BRANCHES,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("data1", data1);
        console.log("this.state", this.state);

        let found = data1.getBranches.find(a => a.id === this.state.branchid);
        let idindex = data1.getBranches.indexOf(found);
        const newBranch = {
          id: this.state.branchid,
          branch_name: this.state.branch,

          contact_no: this.state.mobile,
          complete_address: this.state.address,
          region_id: this.state.region,
          city_id: parseInt(this.state.city_id),
          organisation_structure_id: parseInt(
            this.state.organisation_structure_id
          ),
          hod: this.state.hod,
          hod_mobile: this.state.hod_mobile,
          principal: this.state.principal,
          principal_mobile: this.state.principal_mobile,
          vice_principal: this.state.vice_principal,
          vice_principal_mobile: this.state.vice_principal_mobile,
          sections: [],
          total_sections: "2",
          __typename: "Branches"
        };
        data1.getBranches.splice(idindex, 1, newBranch);
        try {
          store.writeQuery({
            query: FETCH_BRANCHES,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        if (data.updateBranch) {
          this.setState({
            currentStep: 5,
            branchid: "",
            branch: "",
            mobile: "",
            address: "",
            region: "",
            city_id: 0,
            organisation_structure_id: 0,
            hod: "",
            hod_mobile: "",
            principal: "",
            principal_mobile: "",
            vice_principal: "",
            vice_principal_mobile: "",
            submitError: "",
            formErrors: {
              branch: "",
              principal: "",
              mobile: ""
            },
            branchValid: false,
            principalValid: false,
            mobileValid: false,
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
    console.log("setTimeout");
    this.setState({ currentStep: 1, modalShow1: false });
  };
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let branchValid = this.state.branchValid;
    let principalValid = this.state.principalValid;
    let mobileValid = this.state.mobileValid;

    let hod_mobileValid = this.state.hod_mobileValid;
    let principal_mobileValid = this.state.principal_mobileValid;
    let vice_principal_mobileValid = this.state.vice_principal_mobileValid;

    switch (fieldName) {
      case "branch":
        if (value.length == "") {
          branchValid = false;
          fieldValidationErrors.branch = "Branch Cannot Be Empty";
        } else {
          branchValid = true;
          fieldValidationErrors.branch = "";
        }

        break;

      case "principal":
        if (value.length == "") {
          principalValid = false;
          fieldValidationErrors.principal = "principal Cannot Be Empty";
        } else {
          principalValid = true;
          fieldValidationErrors.principal = "";
        }

        break;

      case "mobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");

        if (value.length == "") {
          mobileValid = false;
          fieldValidationErrors.mobile = "Mobile No. Cannot Be Empty";
        } else if (!pattern.test(value)) {
          mobileValid = false;
          fieldValidationErrors.mobile = "Invalid mobile";
        } else {
          mobileValid = true;
          fieldValidationErrors.mobile = "";
        }

        break;

      case "hod_mobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");

        if (value.length == "") {
          hod_mobileValid = false;
          fieldValidationErrors.hod_mobile = "Mobile No. Cannot Be Empty";
        } else if (!pattern.test(value)) {
          hod_mobileValid = false;
          fieldValidationErrors.hod_mobile = "Invalid mobile";
        } else {
          hod_mobileValid = true;
          fieldValidationErrors.hod_mobile = "";
        }

        break;

      case "principal_mobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");

        if (value.length == "") {
          principal_mobileValid = false;
          fieldValidationErrors.principal_mobile = "Mobile No. Cannot Be Empty";
        } else if (!pattern.test(value)) {
          principal_mobileValid = false;
          fieldValidationErrors.principal_mobile = "Invalid mobile";
        } else {
          principal_mobileValid = true;
          fieldValidationErrors.principal_mobile = "";
        }

        break;

      case "vice_principal_mobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");

        if (value.length == "") {
          vice_principal_mobileValid = false;
          fieldValidationErrors.vice_principal_mobile = "Mobile No. Cannot Be Empty";
        } else if (!pattern.test(value)) {
          vice_principal_mobileValid = false;
          fieldValidationErrors.vice_principal_mobile = "Invalid mobile";
        } else {
          vice_principal_mobileValid = true;
          fieldValidationErrors.vice_principal_mobile = "";
        }

        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        branchValid: branchValid,
        principalValid: principalValid,
        mobileValid: mobileValid,

        hod_mobileValid: hod_mobileValid,
        principal_mobileValid: principal_mobileValid,
        vice_principal_mobileValid: vice_principal_mobileValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.principalValid &&
        this.state.branchValid &&
        this.state.mobileValid || (this.state.hod_mobileValid || this.state.principal_mobileValid || this.state.vice_principal_mobileValid)
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  commaSeparated = vals => {
    let newBranchArray = [];
    for (let i = 0; i < vals.length; i++) {
      const edata = vals[i];
      let commaSeparatedValue = [];
      let commavalue = "";
      let cValue = "";
      if (edata.sections.length > 0) {
        for (let x = 0; x < edata.sections.length; x++) {
          const newValue = edata.sections[x];
          cValue = newValue.section_name; //+ "(" + newValue.count + ")";
          commaSeparatedValue.push(cValue);
        }
      } else {
        cValue = "No Data";
        commaSeparatedValue.push(cValue);
      }
      commavalue = commaSeparatedValue.join(",");

      const newBranch = {
        id: edata.id,
        branch_name: edata.branch_name,
        complete_address: edata.complete_address,
        contact_no: edata.contact_no,

        region_id: edata.region_id,
        sections: commavalue,
        city_id: parseInt(edata.city_id),
        organisation_structure_id: parseInt(edata.organisation_structure_id),
        hod: edata.hod,
        hod_mobile: edata.hod_mobile,
        principal: edata.principal,
        principal_mobile: edata.principal_mobile,
        vice_principal: edata.vice_principal,
        vice_principal_mobile: edata.vice_principal_mobile,
        total_sections: edata.total_sections
      };
      newBranchArray.push(newBranch);
    }
    return newBranchArray;
  };
  handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
    console.log("columnid", rowIndex);

    this.setState({
      modalShow1: true,
      branchid: rowIndex.id,
      branch: rowIndex.branch_name,

      mobile: rowIndex.contact_no,
      address: rowIndex.complete_address,
      region: rowIndex.region_id,
      city_id: parseInt(rowIndex.city_id),
      organisation_structure_id: parseInt(rowIndex.organisation_structure_id),
      hod: rowIndex.hod,
      hod_mobile: rowIndex.hod_mobile,
      principal: rowIndex.principal,
      principal_mobile: rowIndex.principal_mobile,
      vice_principal: rowIndex.vice_principal,
      vice_principal_mobile: rowIndex.vice_principal_mobile,
      status: 1,
      currentStep: 1,
      submitError: "",
      formErrors: {
        branch: "",
        principal: "",
        mobile: "",
        hod_mobile: "",
        principal_mobile: "",
        vice_principal_mobile: ""

      },
      hod_mobileValid: false,
      principal_mobileValid: false,
      vice_principal_mobileValid: false,
      branchValid: true,
      principalValid: true,
      mobileValid: true,
      formValid: true,

      modalShow: false
    });
  };

  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    await this.props.handleDelete({
      variables: {
        branch_id: rowIndex.id
      },
      update: (store, { data }) => {
        console.log("data", data);
        const data1 = store.readQuery({
          query: FETCH_BRANCHES,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        console.log("data1s", data1.getBranches);
        console.log("rowIndex.id", rowIndex.id);
        data1.getBranches = data1.getBranches.filter(x => x.id != rowIndex.id);
        console.log("data2s", data1.getBranches);
        try {
          store.writeQuery({
            query: FETCH_BRANCHES,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }

        const data4 = store.readQuery({
          query: FETCH_BRANCHES,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        data1.getBranches = data4;
        console.log("data4s", data4);
        if (data.deleteBranch) {
          this.setState({
            status: 2
          });
          setTimeout(() => {
            this.DeleteSetpageLoad();
          }, 1000);
        }
      }
    });
  };
  DeleteSetpageLoad = () => {
    console.log("setTimeout");
    this.setState({ status: 1 });
  };

  actionsFormatter2(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" name="delete" className="text-danger">
          <i className="far fa-trash-alt" />
        </Button>
      </div>
    );
  }
  actionsFormatter1() {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" name="edit" className="text-theme">
          <i className="far fa-edit" />
        </Button>
      </div>
    );
  }

  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" name="view" className="text-theme">
          <i className="far fa-eye" />
        </Button>
      </div>
    );
  }
  articlecolumns = [
    {
      dataField: "branch_name",
      text: "Branch Name",
      headerAttrs: { width: 150 },
      sort: true,
      attrs: { className: "branch_name_row" }
    },
    // {
    //   dataField: "sections",
    //   text: "Sections",
    //   sort: true
    // },
    {
      dataField: "complete_address",
      text: "Address",
      sort: true,
      attrs: { className: "complexityRow" }
    },
    {
      dataField: "principal",
      text: "Principal",
      sort: true
    },
    {
      dataField: "contact_no",
      text: "Contact No.",
      sort: true,
      attrs: { className: "contact_no_row" }
    },

    {
      dataField: "actions",
      text: "Actions",
      formatter: this.actionsFormatter1,
      attrs: { className: "EditRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleEditFunction
      }
    },
    {
      dataField: "dactions",
      text: "",
      formatter: this.actionsFormatter2,
      attrs: { className: "DeleteRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleDelete
      }
    }
  ];
  render() {
    console.log("CurrentState", this.state);

    const defaultSorted = [
      {
        dataField: "branch_name",
        order: "desc"
      }
    ];
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getBranches = this.props.getBranches;
    const loading2 = getBranches.loading;
    const error2 = getBranches.error;

    if (loading1 || loading2) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }

    return (
      <section className="branches_section">
        <div className="location_cards">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <BreadcrumbsSection
                onClick={this.parentStateSet}
                // onClick={() => this.setState({ modalShow: true })}
                breadcrumbs={this.state.BranchesSection}
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Row>
                <SingleLocation
                  insid={parseInt(Cookies.get("institutionid"))}
                  branchData={globals.globals.branchData}
                />
              </Row>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <div className="card-title mb-0 text-danger">
                {this.state.status == 2 ? "Branch deleted successfully" : ""}
              </div>
              <DataTableWithOutSearch
                parentData={this.commaSeparated(
                  this.props.getBranches.getBranches
                )}
                particlecolumns={this.articlecolumns}
                tableHeading={this.state.tableHeaderData}
                defaultSorted={defaultSorted}
                branchData={getBranches.getBranches}
                name="Branches"
              />
            </Col>
          </Row>
        </div>
        <BranchModal
          globals={globals.globals}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          ParenthandleInputChange={this.handleInputChange}
          ParenthandleFormSubmitInsert={this.InserthandleFormSubmit}
          stateData={this.state}
        />
        <BranchModalEdit
          globals={globals.globals}
          show={this.state.modalShow1}
          onHide={() => this.setState({ modalShow1: false })}
          stateData={this.state}
          ParenthandleInputChange={this.handleInputChange}
          ParenthandleFormSubmit={this.handleFormSubmit}
        />
      </section>
    );
  }
}
export default withRouter(
  compose(
    graphql(
      GET_GLOBALS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          },
          fetchPolicy: 'network-only'
        }),
        name: "globals"
      }
    ),
    graphql(
      FETCH_BRANCHES,

      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          },
          fetchPolicy: 'network-only'
        }),
        name: "getBranches"
      }
    ),
    graphql(EDIT_BRANCH, {
      name: "editbranch"
    }),
    graphql(DELETE_BRANCH, {
      name: "handleDelete"
    }),
    graphql(ADD_BRANCH, {
      name: "addbranch"
    })
  )(BranchesSection)
);
