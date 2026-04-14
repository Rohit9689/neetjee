import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import GroupModal from "./GroupModal";
import GroupModalEdit from "./GroupModalEdit";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const DELETE_SECTIONCATEGORY = gql`
  mutation($section_category_id: ID) {
    deleteSectionCategory(section_category_id: $section_category_id)
  }
`;

const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
      classes {
        id
        class
      }
      globalPackages {
        id
        package_name
      }
      globalCategories {
        id
        category_name
        package_id
      }
      globalBranches {
        id
        branch_name
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
const EDIT_SECTIONCATEGORY = gql`
  mutation($params: EditSectionCategory) {
    editSectionCategory(params: $params)
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
const FETCH_SECTIONS = gql` 
query($institution_id: Int!) {
    getSections(institution_id: $institution_id){
        id
        section_name
        category_id
        branch_id
        package_id
    }
}

`;

class GroupSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow1: false,
      groupid: "",
      currentStep: 1,
      class: "",
      section: [],
      package: "",
      branch: [],
      group: "",
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
      sectionValid: true,
      groupValid: true,
      classValid: true,
      categoryValid: true,
      packageValid: true,
      branchValid: true,
      formValid: true,
      BranchesSection: {
        Title: "Groups",
        btnName: "Create Group"
      },
      tableHeaderData: {
        Title: "Groups"
      },
      modalShow: false,
      status: 1
    };
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
      }
      );
    }
    else {
      this.setState({
        branch: []
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
        section: []
      },
        () => {
          this.validateField("section", "");
        }
      );
    }
  };
  tableData(groups) {
    console.log("groups", groups);
    let group_data = [];

    groups.map((item) => {
      if (item != undefined) {
        let categoryname = this.props.globals.globals.globalCategories.find((a) => a.id == item.category_id);
        let catename = "";
        if (categoryname != undefined) {
          catename = categoryname.category_name;
        }
        console.log("item.branch_ids", item.branch_ids);
        let branchArray = item.branch_ids.split(",");
        let sectionArray = item.section_ids.split(",");
        group_data.push({
          id: item.id,
          section_category: item.section_category,
          branch_values: item.branch_id_values,
          class_values: item.class_id_values,
          section_values: item.section_id_values,
          package_value: item.package_name,
          category_value: catename,
          branch: branchArray,
          class: item.class_ids,
          package: item.package_id,
          category: item.category_id,
          section: sectionArray
        });
      }

    });

    return group_data;
  }
  // tableData(groups) {
  //   const group_data = Array();

  //   for (let i = 0; i < groups.length; i++) {
  //     const branchs = this.props.globals.globals.globalBranches.find(
  //       e => e.id == groups[i].branch_ids
  //     );
  //     let b_id = "";
  //     let branch1 = "";
  //     if (branchs != undefined) {
  //       branch1 = branchs.branch_name;
  //       b_id = branchs.id;
  //     }

  //     const classes = this.props.globals.globals.classes.find(
  //       e => e.id == groups[i].class_ids
  //     );
  //     let c_id = "";
  //     let class1 = "";
  //     if (classes != undefined) {
  //       class1 = classes.class;
  //       c_id = classes.id;
  //     }
  //     const packages = this.props.globals.globals.globalPackages.find(
  //       e => e.id == groups[i].package_id
  //     );
  //     let p_id = "";
  //     let package1 = "";
  //     if (packages != undefined) {
  //       package1 = packages.package_name;
  //       p_id = packages.id;
  //     }
  //     const categories = this.props.globals.globals.globalCategories.find(
  //       e => e.id == groups[i].category_id
  //     );
  //     let cc_id = "";
  //     let category1 = "";
  //     if (categories != undefined) {
  //       category1 = categories.category_name;
  //       cc_id = categories.id;
  //     }
  //     let section4 = "";
  //     let sec_id = "";
  //     let sections = Array();
  //     let sections1 = Array();
  //     let section1 = groups[i].section_ids.toString().split(",");
  //     for (let l = 0; l < section1.length; l++) {
  //       let section2 = section1[l];
  //       const section3 = this.props.globals.globals.globalSections.find(
  //         e => e.id == section2
  //       );
  //       if (section3 != undefined) {
  //         section4 = section3.section_name;
  //         sec_id = section3.id;
  //       }
  //       sections.push(section4);
  //       sections1.push(sec_id);
  //     }
  //     let sectiondata = sections.toString();
  //     console.log("groups[i].branch_ids", groups[i].branch_ids);
  //     if (groups[i].branch_ids != undefined) {
  //       var brancharr = groups[i].branch_ids.split(',');
  //     }

  //     group_data.push({
  //       id: groups[i].id,
  //       section_category: groups[i].section_category,
  //       branch_ids: branch1,
  //       class_ids: class1,
  //       package_id: package1,
  //       category_id: category1,
  //       section_ids: sectiondata,
  //       branch: brancharr,
  //       class: c_id,
  //       package: p_id,
  //       category: cc_id,
  //       section: sections1
  //     });
  //   }

  //   return group_data;
  // }

  getSectionDefaultValues(vals, prop) {
    let chars = vals;
    let sections = Array();
    if (chars != undefined) {
      for (let i = 0; i < chars.length; i++) {
        const sectionval = chars[i];
        let found = prop.globalSections.find(a => a.id == sectionval);
        if (found != undefined) {
          sections.push({
            label: found.section_name,
            value: found.section_name,
            id: found.id
          });
        }
      }
    }

    return sections;
  }

  getSectionValues(vals) {
    let sections = Array();
    for (let i = 0; i < vals.length; i++) {
      const sectionval = vals[i];
      sections.push({
        label: sectionval.section_name,
        value: sectionval.section,
        id: sectionval.id
      });
    }

    return sections;
  }
  handleSectionSelectInputChange = e => {
    let sections = Array();
    if (e != null) {
      for (let i = 0; i < e.length; i++) {
        const sectionval = e[i];
        sections.push(sectionval.id);
      }
      this.setState({
        section: sections
      });
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    if (this.state.formValid) {
      let editsectioncatobj = "";
      let sectionData = [];
      if (this.state.section.toString() != "0") {
        sectionData = this.state.section;
      }
      else {
        this.props.globals.globalSections.map((item) => {
          sectionData.push(item.id);
        });
      }
      editsectioncatobj = {
        id: this.state.groupid,
        section_category: this.state.group,
        package_id: parseInt(this.state.package),
        category_id: parseInt(this.state.category),
        class_ids: parseInt(this.state.class),
        section_ids: sectionData,
        username: Cookies.get("username")
      };
      this.editgroup(editsectioncatobj).catch(error => {
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
  editgroup = async params => {
    await this.props.editgroup({
      variables: {
        params
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_SECTIONSCATEGORY,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        const group = data1.getSectionCategories.findIndex(
          gp => gp.id == this.state.groupid
        );
        console.log("institutionidthis.props", this.props);
        let branchvalue = [];
        if (this.state.branch != "") {
          if (this.state.branch.toString() != "0") {
            this.state.branch.map((item) => {
              let findData = this.props.globals.globals.globalBranches.find((a) => a.id == item);
              if (findData != undefined) {
                const newObj = findData.branch_name;
                branchvalue.push(newObj);
              }

            })

          }
          else {
            this.props.globals.globals.globalBranches.map((item) => {
              //let findData = this.props.globals.globals.globalBranches.find((a) => a.id == item);
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
              let findData = this.props.globals.globals.globalSections.find((a) => a.id == item);
              if (findData != undefined) {
                const newObj = findData.section_name;
                sectionvalue.push(newObj);
              }

            })

          } else {
            this.props.globals.globals.globalSections.map((item) => {
              //let findData = this.props.globals.globals.globalSections.find((a) => a.id == item);
              if (item != undefined) {
                const newObj = item.section_name;
                sectionvalue.push(newObj);
              }

            })

          }

        }
        let packagename = "";
        if (this.state.package != "") {
          let findData = this.props.globals.globals.globalPackages.find((a) => a.id == this.state.package);
          if (findData != undefined) {
            packagename = findData.package_name;
          }


        }
        let class_id_values = "";
        if (this.state.class != "") {
          let findData = this.props.globals.globals.classes.find((a) => a.id == this.state.class);
          if (findData != undefined) {
            class_id_values = findData.class;
          }


        }

        data1.getSectionCategories[group].section_category = this.state.group;
        data1.getSectionCategories[group].branch_ids = this.state.branch.toString();
        data1.getSectionCategories[group].package_id = this.state.package;
        data1.getSectionCategories[group].category_id = this.state.category;
        data1.getSectionCategories[group].class_ids = this.state.class;
        data1.getSectionCategories[group].section_ids = this.state.section.toString();
        data1.getSectionCategories[group].branch_id_values = branchvalue.toString();
        data1.getSectionCategories[group].class_id_values = class_id_values;
        data1.getSectionCategories[group].section_id_values = sectionvalue.toString();
        data1.getSectionCategories[group].package_name = packagename;
        try {
          store.writeQuery({
            query: FETCH_SECTIONSCATEGORY,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }

        console.log("addSectionCategorydata", data);
        if (data.editSectionCategory) {
          this.setState({
            groupid: "",
            currentStep: 5,
            class: "",
            section: [],
            package: "",
            branch: [],
            group: "",
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
            sectionValid: true,
            groupValid: true,
            packageValid: true,
            categoryValid: true,
            classValid: true,
            branchValid: true,
            formValid: true
          });

          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      }
    });
  };
  SetpageLoad = () => {
    this.setState({
      currentStep: 1,
      modalShow1: false
    });
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

      case "branch":
        if (value.length == "") {
          branchValid = false;
          fieldValidationErrors.branch = "Branch Cannot Be Empty";
        } else {
          branchValid = true;
          fieldValidationErrors.branch = "";
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

      case "group":
        if (value.length == "") {
          groupValid = false;
          fieldValidationErrors.group = "Group Cannot Be Empty";
        } else {
          groupValid = true;
          fieldValidationErrors.group = "";
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

      case "category":
        if (value.length == "") {
          categoryValid = false;
          fieldValidationErrors.category = "Category Cannot Be Empty";
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

  handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
    console.log("columnid", rowIndex);

    this.setState({
      modalShow1: true,
      groupid: rowIndex.id,
      group: rowIndex.section_category,
      branch: rowIndex.branch,
      class: rowIndex.class,
      package: rowIndex.package,
      category: rowIndex.category,
      section: rowIndex.section
    });
  };
  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    await this.props.handleDelete({
      variables: {
        section_category_id: rowIndex.id
      },
      update: (store, { data }) => {
        console.log("data", data);
        const data1 = store.readQuery({
          query: FETCH_SECTIONSCATEGORY,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        console.log("data1s", data1.getSectionCategories);
        console.log("rowIndex.id", rowIndex.id);
        data1.getSectionCategories = data1.getSectionCategories.filter(
          x => x.id != rowIndex.id
        );
        console.log("data2s", data1.getSectionCategories);
        try {
          store.writeQuery({
            query: FETCH_SECTIONSCATEGORY,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }

        const data4 = store.readQuery({
          query: FETCH_SECTIONSCATEGORY,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });
        data1.getSections = data4;
        console.log("data4s", data4);
        if (data.deleteSectionCategory) {
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
      dataField: "section_category",
      text: "Group Name",
      sort: true
    },
    {
      dataField: "class_values",
      text: "Class",
      sort: true
    },
    {
      dataField: "branch_values",
      text: "Branches",
      sort: true
    },
    {
      dataField: "section_values",
      text: "Sections",
      sort: true
    },
    {
      dataField: "package_value",
      text: "Packages",
      sort: true
    },
    {
      dataField: "category_value",
      text: "Categories",
      sort: true
    },
    // {
    //   dataField: "actions",
    //   formatter: this.actionsFormatter,
    //   headerAlign: "center"
    // },
    {
      dataField: "actions",
      text: "Actions",
      sort: true,
      formatter: this.actionsFormatter1,
      headerAttrs: { width: 50 },
      attrs: { width: 50, className: "EditRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleEditFunction
      }
    },
    {
      dataField: "actions",
      formatter: this.actionsFormatter2,
      headerAttrs: { width: 50 },
      attrs: { width: 50, className: "EditRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleDelete
      }
    }
  ];
  render() {
    const defaultSorted = [
      {
        dataField: "section_category",
        order: "desc"
      }
    ];

    console.log("Section current", this.state);
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getSectionCategories = this.props.getSectionCategories;
    const loading2 = getSectionCategories.loading;
    const error2 = getSectionCategories.error;

    const getSections = this.props.getSections;
    const loading3 = getSections.loading;
    const error3 = getSections.error;
    if (error3 !== undefined) {
      alert("Server Error. " + error3.message);
      return null;
    }

    if (loading1 || loading2 || loading3) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }
    console.log("getSectionCategories", getSectionCategories);
    return (
      <section className="groups_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbsSection
              onClick={() => this.setState({ modalShow: true })}
              breadcrumbs={this.state.BranchesSection}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Group deleted successfully" : ""}
            </div>
            <DataTableWithOutSearch
              parentData={this.tableData(
                getSectionCategories.getSectionCategories
              )}
              particlecolumns={this.articlecolumns}
              tableHeading={this.state.tableHeaderData}
              defaultSorted={defaultSorted}
              //   branchData={getSectionCategories.getSectionCategories}
              name="Groups"
            />
          </Col>
          <GroupModal
            getSections={getSections.getSections}
            globals={globals.globals}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <GroupModalEdit
            getSections={getSections.getSections}
            handleFormSubmit={this.handleFormSubmit}
            parenthandleInputChange={this.handleInputChange}
            getSectionDefaultValues={this.getSectionDefaultValues}
            getSectionValues={this.getSectionValues}
            handleSectionSelectInputChange={this.handleSectionSelectInputChange}
            stateData={this.state}
            globals={globals.globals}
            show={this.state.modalShow1}
            onHide={() => this.setState({ modalShow1: false })}
            branchhandleMultipleSelectInputChange={this.branchhandleMultipleSelectInputChange}
            sectionhandleMultipleSelectInputChange={this.sectionhandleMultipleSelectInputChange}
          />
        </Row>
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
    graphql(FETCH_SECTIONSCATEGORY, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
      }),
      name: "getSectionCategories"
    }),
    graphql(DELETE_SECTIONCATEGORY, {
      name: "handleDelete"
    }),
    graphql(EDIT_SECTIONCATEGORY, {
      name: "editgroup"
    }),
    graphql(FETCH_SECTIONS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        }), name: "getSections"
      })
  )(GroupSection)
);
