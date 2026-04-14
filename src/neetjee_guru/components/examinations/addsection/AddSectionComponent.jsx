import React, { Component } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import AddSectionModal from "./AddSectionModal";
import AddSectionModalEdit from "./AddSectionModalEdit";

import "./_addsection.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import SectionSingleLocation from "./sectionSingleLocation";

const EDIT_SECTION = gql`
  mutation($sections: EditSection) {
    editSection(sections: $sections)
  }
`;

const ADD_SECTION = gql`
  mutation($sections: AddSection) {
    addSection(sections: $sections)
  }
`;

const GETSECTIONCATEGORIES_SECTION = gql`
  query($institution_id: Int!) {
    getCategories(institution_id: $institution_id) {
      id
      category_name
      package_name
      high_difficult

      difficult
      moderate
      easy
    }
  }
`;

const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
      sectionData {
        total_count
        section_data {
          section_category
          count
        }
      }

      globalBranches {
        id
        branch_name
      }

      globalCategories {
        id
        category_name
      }
    }
  }
`;

const FETCH_SECTIONS = gql`
  query($institution_id: Int!) {
    getSections(institution_id: $institution_id) {
      id
      section_name
      category_id
      branch_id
      category_name
      branch_name
      high_difficult
      difficult
      moderate
      easy
    }
  }
`;

const DELETE_SECTION = gql`
  mutation($section_id: ID) {
    deleteSection(section_id: $section_id)
  }
`;

class AddSectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
      sectionid: "",
      currentStep: 1,
      branch: 0,
      branchvalue: "",
      category: 0,
      categoryvalue: "",
      high_difficult: 0,
      difficult: 0,
      moderate: 0,
      easy: 0,
      section: "",
      package: "",
      submitError: "",
      formErrors: {
        branch: "",
        category: "",
        section: ""
      },
      branchValid: false,
      categoryValid: true,
      sectionValid: false,
      formValid: false,

      BranchesSection: {
        Title: "Create New Section",
        btnName: "Add Section"
      },
      tableHeaderData: {
        Title: "Sections"
      },
      modalShow: false,
      modalShow1: false
    };
  }

  parentStateSet = () => {
    console.log("sreee");
    this.setState({
      status: 1,
      sectionid: "",
      currentStep: 1,
      branch: 0,
      branchvalue: "",
      category: 0,
      categoryvalue: "",
      high_difficult: 0,
      difficult: 0,
      moderate: 0,
      easy: 0,
      section: "",
      package: "",
      submitError: "",
      formErrors: {
        branch: "",
        category: "",
        section: ""
      },
      branchValid: false,
      categoryValid: true,
      sectionValid: false,
      formValid: false,

      BranchesSection: {
        Title: "Create New Section",
        btnName: "Add Section"
      },
      tableHeaderData: {
        Title: "Sections"
      },
      modalShow: true,
      modalShow1: false
    });
  };
  selecthandleInputChange = (ename, evalue) => {
    console.log("selecthandleInputChange", this.props.getCategories.getCategories);
    const name = ename;
    const value = evalue;
    if (name == "category") {
      let findData = this.props.getCategories.getCategories.find((a) => a.id == value)
      console.log("categoryfindData", findData);
      this.setState({
        categoryvalue: {
          value: value,
          label: findData.category_name,
        },
        package: findData.package_name,
        high_difficult: findData.high_difficult,
        difficult: findData.difficult,
        moderate: findData.moderate,
        easy: findData.easy
      });
    }
    if (name == "branch") {
      let findData = this.props.globals.globals.globalBranches.find((a) => a.id == value)
      this.setState({
        branchvalue: {
          value: value,
          label: findData.branch_name,
        },
      });
    }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  edithandleFormSubmit = e => {
    e.preventDefault();
    if (this.state.formValid) {
      let editsectionobj = "";
      editsectionobj = {
        id: this.state.sectionid,
        section_name: this.state.section,
        branch_id: parseInt(this.state.branch),
        category_id: parseInt(this.state.category),
        username: Cookies.get("username")
      };
      this.editsection(editsectionobj).catch(error => {
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
  editsection = async sections => {
    await this.props.editsection({
      variables: {
        sections
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_SECTIONS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        const newSection = {
          branch_id: parseInt(this.state.branch),
          id: this.state.sectionid,
          category_id: parseInt(this.state.category),
          category_name: this.state.categoryvalue.label,
          section_name: this.state.section,
          branch_name: this.state.branchvalue.label,
          high_difficult: parseInt(this.state.high_difficult),
          difficult: parseInt(this.state.difficult),
          moderate: parseInt(this.state.moderate),
          easy: parseInt(this.state.easy),
          __typename: "Sections"
        };

        let esection = data1.getSections.find(
          x => (x.id = this.state.sectionid)
        );
        const idindex = data1.getSections.indexOf(esection);

        data1.getSections.splice(idindex, 1, newSection);
        try {
          store.writeQuery({
            query: FETCH_SECTIONS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        console.log(data, "editSection");
        if (data.editSection) {
          this.setState({
            status: 1,
            sectionid: "",
            currentStep: 5,
            branch_name: "",
            branch: 0,
            category: 0,
            category_name: "",
            high_difficult: 0,
            difficult: 0,
            moderate: 0,
            easy: 0,
            section: "",
            package: "",
            submitError: "",
            formErrors: {
              branch: "",
              category: "",
              section: ""
            },
            branchValid: false,
            categoryValid: false,
            sectionValid: false,
            formValid: false
          });

          setTimeout(() => {
            this.SetpageLoadedit();
          }, 1500);
        }
      }
    });
  };
  SetpageLoadedit = () => {
    this.setState({ currentStep: 1, modalShow1: false });
  };
  handleFormSubmit = e => {
    console.log("formsubmit", this.state);
    e.preventDefault();
    if (this.state.formValid) {
      let addsectionobj = "";
      addsectionobj = {
        section_name: this.state.section,
        branch_id: parseInt(this.state.branch),
        category_id: parseInt(this.state.category),
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username")
      };
      this.addsection(addsectionobj).catch(error => {
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
  addsection = async sections => {
    await this.props.addsection({
      variables: {
        sections
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_SECTIONS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        const newSection = {
          branch_id: parseInt(this.state.branch),
          id: data.addSection,
          category_id: parseInt(this.state.category),
          category_name: this.state.categoryvalue.label,
          section_name: this.state.section,
          branch_name: this.state.branchvalue.label,
          high_difficult: parseInt(this.state.high_difficult),
          difficult: parseInt(this.state.difficult),
          moderate: parseInt(this.state.moderate),
          easy: parseInt(this.state.easy),
          __typename: "Sections"
        };
        data1.getSections.push(newSection);

        try {
          store.writeQuery({
            query: FETCH_SECTIONS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        if (data.addSection) {
          this.setState({
            currentStep: 5,
            branch_name: "",
            branch: 0,
            category: 0,
            category_name: "",
            high_difficult: 0,
            difficult: 0,
            moderate: 0,
            easy: 0,
            section: "",
            package: "",
            submitError: "",
            formErrors: {
              branch: "",
              category: "",
              section: ""
            },
            branchValid: false,
            categoryValid: true,
            sectionValid: false,
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
    this.setState({ currentStep: 2, modalShow: false });
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
    let branchValid = this.state.branchValid;
    let categoryValid = this.state.categoryValid;
    let sectionValid = this.state.sectionValid;

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
      case "category":
        if (value.length == "") {
          categoryValid = false;
          fieldValidationErrors.category = "Category Cannot Be Empty";
        } else {
          categoryValid = true;
          fieldValidationErrors.category = "";
        }

        break;

      case "section":
        if (value.length == "") {
          sectionValid = false;
          fieldValidationErrors.section = "Section Cannot Be Empty";
        } else {
          sectionValid = true;
          fieldValidationErrors.section = "";
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        branchValid: branchValid,
        categoryValid: categoryValid,
        sectionValid: sectionValid
      },
      this.validateForm
    );
  }
  validateForm() {
    console.log("validateForm", this.state);
    this.setState({

      formValid:
        this.state.branchValid &&
        this.state.categoryValid &&
        this.state.sectionValid
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  commaSeparated = () => {
    console.log("branchData", this.props.getSections.getSections);
    let newSectionArray = [];
    for (let i = 0; i < this.props.getSections.getSections.length; i++) {
      const edata = this.props.getSections.getSections[i];
      let newcomplexity =
        "High Difficult -" +
        edata.high_difficult +
        "%" +
        " , " +
        "Difficult -" +
        edata.difficult +
        "%" +
        " , " +
        "Moderate  -" +
        edata.moderate +
        "%" +
        " , " +
        "Easy -" +
        edata.easy +
        "%";
        console.log("edata.category_id", edata.category_id);
      let findData = this.props.getCategories.getCategories.find((a) => a.id == edata.category_id);
      let packagen="";
      if(findData!=undefined){
        packagen=findData.package_name
      }
      console.log("findData", findData);
      const newSection = {
        id: edata.id,
        section_name: edata.section_name,
        category_name: edata.category_name,
        complexity: newcomplexity,
        branch_id: edata.branch_id,
        category_id: edata.category_id,
        high_difficult: edata.high_difficult,
        difficult: edata.difficult,
        moderate: edata.moderate,
        branch_name: edata.branch_name,
        easy: edata.easy,
        package: packagen
      };
      newSectionArray.push(newSection);
    }
    return newSectionArray;
  };
  handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
    console.log("handleEditFunctionrowIndex", rowIndex);
    this.setState({
      status: 1,
      sectionid: rowIndex.id,
      currentStep: 1,
      branch: rowIndex.branch_id,
      branchvalue: { value: rowIndex.branch_id, label: rowIndex.branch_name },
      category: rowIndex.category_id,
      categoryvalue: { value: rowIndex.category_id, label: rowIndex.category_name },
      high_difficult: rowIndex.high_difficult,
      difficult: rowIndex.difficult,
      moderate: rowIndex.moderate,
      easy: rowIndex.easy,
      section: rowIndex.section_name,
      package: rowIndex.package,
      submitError: "",
      formErrors: {
        branch: "",
        category: "",
        section: ""
      },
      branchValid: true,
      categoryValid: true,
      sectionValid: true,
      formValid: true,

      BranchesSection: {
        Title: "Create New Section",
        btnName: "Add Section"
      },
      tableHeaderData: {
        Title: "Sections"
      },
      modalShow: false,
      modalShow1: true
    });
  };

  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    await this.props.handleDelete({
      variables: {
        section_id: rowIndex.id
      },
      update: (store, { data }) => {
        console.log("data", data);
        let data1 = store.readQuery({
          query: FETCH_SECTIONS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        data1.getSections = data1.getSections.filter(x => x.id != rowIndex.id);
        try {
          store.writeQuery({
            query: FETCH_SECTIONS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }
        let data2 = store.readQuery({
          query: FETCH_SECTIONS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        data1.getSections = data2;
        if (data.deleteSection) {
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
    this.setState({ status: 1 });
  };

  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" className="text-theme">
          <i className="far fa-eye" />
        </Button>
      </div>
    );
  }

  actionsFormatter1(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" className="text-theme">
          <i className="far fa-edit" />
        </Button>
      </div>
    );
  }
  actionsFormatter2(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="lzink" className="text-danger">
          <i className="far fa-trash-alt" />
        </Button>
      </div>
    );
  }
  articlecolumns = [
    {
      dataField: "section_name",
      text: "Section",
      sort: true
    },
    {
      dataField: "branch_name",
      text: "Branch",
      sort: true
    },
    {
      dataField: "category_name",
      text: "Category",
      sort: true
    },
    {
      dataField: "complexity",
      text: "Complexity",
      sort: true,
      headerAlign: "left",
      attrs: { className: "complexityRow" }
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: this.actionsFormatter1,
      headerAlign: "center",
      events: {
        onClick: this.handleEditFunction
      }
    },
    {
      dataField: "actions",
      formatter: this.actionsFormatter2,
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
        dataField: "section_name",
        order: "desc"
      }
    ];

    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getSections = this.props.getSections;
    const loading2 = getSections.loading;
    const error2 = getSections.error;

    const getCategories = this.props.getCategories;
    const loading3 = getCategories.loading;
    const error3 = getCategories.error;

    if (loading1 || loading2 || loading3) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }

    if (error3 !== undefined) {
      alert("Server Error. " + error3.message);
      return null;
    }
    console.log("getCategoriessss", getCategories.getCategories);

    return (
      <section className="add_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbsSection
              onClick={this.parentStateSet}
              //onClick={() => this.setState({ modalShow: true })}
              breadcrumbs={this.state.BranchesSection}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <Row>
              <SectionSingleLocation
                sectioncount={getSections.getSections.length}
                currentStep={this.state.currentStep}
                insid={parseInt(Cookies.get("institutionid"))}
              />
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Section deleted successfully" : ""}
            </div>
            <DataTableWithOutSearch
              parentData={this.commaSeparated()}
              particlecolumns={this.articlecolumns}
              tableHeading={this.state.tableHeaderData}
              defaultSorted={defaultSorted}
              branchData={getSections.getSections}
              name="Sections"
            />
          </Col>
        </Row>
        <AddSectionModal
          parentselecthandleInputChange={this.selecthandleInputChange}
          stateData={this.state}
          globals={globals.globals}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          parenthandleInputChange={this.handleInputChange}
          parenthandleFormSubmit={this.handleFormSubmit}
          getCategories={getCategories.getCategories}
        />
        <AddSectionModalEdit
          parentselecthandleInputChange={this.selecthandleInputChange}
          stateData={this.state}
          globals={globals.globals}
          show={this.state.modalShow1}
          onHide={() => this.setState({ modalShow1: false })}
          parenthandleInputChange={this.handleInputChange}
          parenthandleFormSubmit={this.edithandleFormSubmit}
          getCategories={getCategories.getCategories}

        />
      </section>
    );
  }
}
export default withRouter(
  compose(
    graphql(FETCH_GLOBALS, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
      }),
      name: "globals"
    }),
    graphql(FETCH_SECTIONS, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
      }),
      name: "getSections"
    }),
    graphql(GETSECTIONCATEGORIES_SECTION, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
      }),
      name: "getCategories"
    }),
    graphql(DELETE_SECTION, {
      name: "handleDelete"
    }),
    graphql(ADD_SECTION, {
      name: "addsection"
    }),
    graphql(EDIT_SECTION, {
      name: "editsection"
    })
  )(AddSectionComponent)
);
