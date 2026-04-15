import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import StudentModal from "./StudentModal";
import StudentModalEdit from "./StudentModalEdit";
import { Data, Columns, defaultSorted } from "./StudentTableData";
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown'
import { components } from 'react-select'
import "./_students.scss";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import TableSearchwithStudentResult from "../../questioners/manage_questin_papers/TableSearchwithStudentResult";
const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
      </components.DropdownIndicator>
    )
  );
};
const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
      globalPackages {
        id
        package_name
      }
      globalCategories {
        id
        category_name
        package_id
      }
      classes {
        id
        class
      }
      globalBranches {
        id
        branch_name
      }
      globalSections {
        id
        section_name
        branch_id
        category_id
        package_id
      }
    }
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
const EDIT_STUDENT = gql`
  mutation($params: EditStudentInput) {
    editStudent(params: $params)
  }
`;
const DELETE_STUDENT = gql`
  mutation($studentId: ID) {
    deleteStudent(studentId: $studentId)
  }
`;

class StudentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      studentid: "",
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
        package: "",
      },
      branchValid: true,
      sectionValid: true,
      classValid: true,
      student_nameValid: true,
      contact_noValid: true,
      packageValid: true,
      categoryValid: true,
      formValid: true,
      BranchesSection: {
        Title: "Students",
        btnName: "Add Student",
      },
      tableHeaderData: {
        Title: "Students",
      },
      modalShow: false,
      modalShow1: false,
      status: 0,
      editRow: {},

      //fields for search
      studentnameSearch: "0",
      studentnameSearchval: "",
      packageSearch: "0",
      packageSearchval: "",
      classSearch: "0",
      classSearchval: "",
      sectionSearch: "0",
      sectionSearchval: "",
      branchSearch: "0",
      branchSearchval: "",
      categorySearch: "0",
      categorySearchval: ""


    };
  }

  tableData(students) {
    const student_data = Array();

    for (let i = 0; i < students.length; i++) {
      const branchs = this.props.globals.globals.globalBranches.find(
        (e) => e.id == students[i].branch_id
      );
      let b_id = "";
      let branch1 = "";
      if (branchs != undefined) {
        branch1 = branchs.branch_name;
        b_id = branchs.id;
      }

      const classes = this.props.globals.globals.classes.find(
        (e) => e.id == students[i].class_id
      );
      let c_id = "";
      let class1 = "";
      if (classes != undefined) {
        class1 = classes.class;
        c_id = classes.id;
      }
      const packages = this.props.globals.globals.globalPackages.find(
        (e) => e.id == students[i].package_id
      );
      let p_id = "";
      let package1 = "";
      if (packages != undefined) {
        package1 = packages.package_name;
        p_id = packages.id;
      }
      const categories = this.props.globals.globals.globalCategories.find(
        (e) => e.id == students[i].category_id
      );
      let cc_id = "";
      let category1 = "";
      if (categories != undefined) {
        category1 = categories.category_name;
        cc_id = categories.id;
      }
      const sections = this.props.globals.globals.globalSections.find(
        (e) => e.id == students[i].section_id
      );
      let s_id = "";
      let section1 = "";
      if (sections != undefined) {
        section1 = sections.section_name;
        s_id = sections.id;
      }

      student_data.push({
        id: students[i].id,
        student_name: students[i].student_name,
        contact_no: students[i].contact_no,
        branch_id: branch1,
        class_id: class1,
        package_id: package1,
        category_id: category1,
        section_id: section1,
        branch: b_id,
        class: c_id,
        package: p_id,
        category: cc_id,
        section: s_id,
      });
    }

    return student_data;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (this.state.formValid) {
      let editStudent = {
        id: this.state.studentid,
        section_id: parseInt(this.state.section),
        class_id: parseInt(this.state.class),
        package_id: parseInt(this.state.package),
        category_id: parseInt(this.state.category),
        branch_id: parseInt(this.state.branch),
        student_name: this.state.student_name,
        contact_no: this.state.contact_no,
        username: Cookies.get("username"),
      };

      this.editStudent(editStudent).catch((error) => {
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

  editStudent = async (params) => {
    await this.props.editStudent({
      variables: {
        params,
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_STUDENTS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });

        const student = data1.getStudents.findIndex(
          (th) => th.id == this.state.studentid
        );

        console.log("data1", data1, student);

        data1.getStudents[student].student_name = this.state.student_name;
        data1.getStudents[student].contact_no = this.state.contact_no;
        data1.getStudents[student].branch_id = this.state.branch;
        data1.getStudents[student].class_id = this.state.class;
        data1.getStudents[student].package_id = this.state.package;
        data1.getStudents[student].category_id = this.state.category;
        data1.getStudents[student].section_id = this.state.section;

        try {
          store.writeQuery({
            query: FETCH_STUDENTS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid")),
            },
            data: data1,
          });
        } catch (e) {
          console.log("Exception", e);
        }

        console.log("editstudent", data);

        if (data.editStudent) {
          this.setState({
            currentStep: 5,
            student_name: "",
            contact_no: "",
            branch: "",
            package: "",
            category: "",
            section: "",
            class: "",
            studentid: "",
            submitError: "",
            formErrors: {
              student_name: "",
              contact_no: "",
              package: "",
              branch: "",
              class: "",
              category: "",
              section: "",
            },
            student_nameValid: true,
            contact_noValid: true,
            packageValid: true,
            categoryValid: true,
            classValid: true,
            branchValid: true,
            sectionValid: true,
            formValid: true,
          });
          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      },
    });
  };

  SetpageLoad = () => {
    //console.log("setTimeout");
    this.setState({
      currentStep: 1,
      modalShow1: false,
    });
    //this.props.onHide()
  };

  handleInputChange = (e) => {
    console.log("e.target.name", e.target.name);
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
    let contact_noValid = this.state.concat_noValid;
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
        categoryValid: categoryValid,
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
        this.state.categoryValid,
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

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

  handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
    console.log("rowIndex", rowIndex);
    this.setState({
      modalShow1: true,
      studentid: rowIndex.id,
      student_name: rowIndex.student_name,
      contact_no: rowIndex.contact_no,
      package: rowIndex.package,
      branch: rowIndex.branch,
      class: rowIndex.class,
      category: rowIndex.category,
      section: rowIndex.section,
    });
  };

 handleDelete = async (e, cell, row, rowIndex) => {
  await this.props.handleDelete({
    variables: {
      studentId: rowIndex.id,
    },
    update: (store, { data }) => {

      // ✅ Step 1: read cache
      const existingData = store.readQuery({
        query: FETCH_STUDENTS,
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
        },
      });

      // ✅ Step 2: create new array (NO mutation)
      const updatedStudents = existingData.getStudents.filter(
        (student) => student.id !== rowIndex.id
      );

      // ✅ Step 3: write back
      store.writeQuery({
        query: FETCH_STUDENTS,
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
        },
        data: {
          ...existingData,
          getStudents: updatedStudents,
        },
      });

      // ✅ Step 4: UI update
      if (data.deleteStudent) {
        this.setState({ status: 2 });

        setTimeout(() => {
          this.DeleteSetpageLoad();
        }, 1000);
      }
    },
  });
};
  DeleteSetpageLoad = () => {
    console.log("setTimeout");
    this.setState({ status: 1 });
  };
  articlecolumns = [
    {
      dataField: "student_name",
      text: "Student Name",
      sort: true,
    },
    {
      dataField: "package_id",
      text: "Package",
      sort: true,
    },
    {
      dataField: "class_id",
      text: "Class",
      sort: true,
    },
    {
      dataField: "section_id",
      text: "Section",
      sort: true,
    },
    {
      dataField: "branch_id",
      text: "Branch",
      sort: true,
    },
    {
      dataField: "category_id",
      text: "Category",
      sort: true,
    },
    {
      dataField: "contact_no",
      text: "Contact No",
      sort: true,
    },
    {
      dataField: "actions",
      formatter: this.actionsFormatter,
      headerAlign: "center",
    },
    {
      dataField: "actions",
      text: "Actions",
      sort: true,
      formatter: this.actionsFormatter1,
      headerAttrs: { width: 50 },
      attrs: { width: 50, className: "EditRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleEditFunction,
      },
    },
    {
      dataField: "actions",
      formatter: this.actionsFormatter2,
      headerAttrs: { width: 50 },
      attrs: { width: 50, className: "EditRow" },
      headerAlign: "center",
      events: {
        onClick: this.handleDelete,
      },
    },
  ];
  dropDownGetValues(fieldname) {
    let getArray = [];
    const newObj1 = {
      value: "0",
      label: "Select"
    }
    getArray.push(newObj1);
    if (fieldname == "studentnameSearch") {
      this.props.getStudents.getStudents.map((stumap) => {
        const newObj = {
          value: stumap.id,
          label: stumap.student_name
        }
        getArray.push(newObj);
      });
    }
    else if (fieldname == "packageSearch") {
      this.props.globals.globals.globalPackages.map((stumap) => {
        const newObj = {
          value: stumap.id,
          label: stumap.package_name
        }
        getArray.push(newObj);
      });
    }
    else if (fieldname == "classSearch") {
      this.props.globals.globals.classes.map((stumap) => {
        const newObj = {
          value: stumap.id,
          label: stumap.class
        }
        getArray.push(newObj);
      });
    }
    else if (fieldname == "sectionSearch") {
      this.props.globals.globals.globalSections.map((stumap) => {
        if (stumap.branch_id == this.state.branchSearch
          || stumap.category_id == this.state.categorySearch ||
          stumap.package_id == this.state.packageSearch
        ) {
          const newObj = {
            value: stumap.id,
            label: stumap.section_name
          }
          getArray.push(newObj);
        }

      });
    }
    else if (fieldname == "branchSearch") {
      this.props.globals.globals.globalBranches.map((stumap) => {
        const newObj = {
          value: stumap.id,
          label: stumap.branch_name
        }
        getArray.push(newObj);
      });
    }
    else if (fieldname == "categorySearch") {
      this.props.globals.globals.globalCategories.map((stumap) => {
        if (stumap.package_id == this.state.packageSearch) {
          const newObj = {
            value: stumap.id,
            label: stumap.category_name
          }
          getArray.push(newObj);
        }

      });
    }
    return getArray;
  }
  selecthandleInputChange = (ename, evalue) => {
    const name = ename;
    const value = evalue;
    //student name
    if (name == "studentnameSearch") {
      if (value != "0") {
        let studentnameSearchData = this.props.getStudents.getStudents.find((a) => a.id == value);
        this.setState({
          studentnameSearchval: {
            value: studentnameSearchData.id,
            label: studentnameSearchData.student_name
          }
        });
      } else {
        this.setState({
          studentnameSearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }
    //package
    if (name == "packageSearch") {
      if (value != "0") {
        let packageSearchData = this.props.globals.globals.globalPackages.find((a) => a.id == value);
        this.setState({
          packageSearchval: {
            value: packageSearchData.id,
            label: packageSearchData.package_name
          }
        });
      } else {
        this.setState({
          packageSearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }
    //class
    if (name == "classSearch") {
      if (value != "0") {
        let classSearchData = this.props.globals.globals.classes.find((a) => a.id == value);
        this.setState({
          classSearchval: {
            value: classSearchData.id,
            label: classSearchData.class
          }
        });
      } else {
        this.setState({
          classSearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }
    //section
    if (name == "sectionSearch") {
      if (value != "0") {
        let sectionSearchData = this.props.globals.globals.globalSections.find((a) => a.id == value);
        this.setState({
          sectionSearchval: {
            value: sectionSearchData.id,
            label: sectionSearchData.section_name
          }
        });
      } else {
        this.setState({
          sectionSearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    //branch
    if (name == "branchSearch") {
      if (value != "0") {
        let branchSearchData = this.props.globals.globals.globalBranches.find((a) => a.id == value);
        this.setState({
          branchSearchval: {
            value: branchSearchData.id,
            label: branchSearchData.branch_name
          }
        });
      } else {
        this.setState({
          branchSearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    //category
    if (name == "categorySearch") {
      if (value != "0") {
        let categorySearchData = this.props.globals.globals.globalCategories.find((a) => a.id == value);
        this.setState({
          categorySearchval: {
            value: categorySearchData.id,
            label: categorySearchData.branch_name
          }
        });
      } else {
        this.setState({
          categorySearchval: {
            value: "0",
            label: "Select"
          }
        });
      }
    }



    this.setState({ [name]: value });
  }
  render() {
    console.log("students props", this.props);

    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getStudents = this.props.getStudents;
    const loading2 = getStudents.loading;
    const error2 = getStudents.error;

    if (loading1 || loading2) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }

    let StudentsFilterData = [];
    if (
      (this.state.studentnameSearch != "0" ||
        this.state.packageSearch != "0" ||
        this.state.classSearch != "0" ||
        this.state.sectionSearch != "0" ||
        this.state.branchSearch != "0" ||
        this.state.categorySearch != "0")
    ) {
      StudentsFilterData = getStudents.getStudents;
      if (this.state.studentnameSearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.id == this.state.studentnameSearch);
      }
      if (this.state.packageSearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.package_id == this.state.packageSearch);
      }
      if (this.state.classSearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.class_id == this.state.classSearch);
      }
      if (this.state.sectionSearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.section_id == this.state.sectionSearch);
      }
      if (this.state.branchSearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.branch_id == this.state.branchSearch);
      }
      if (this.state.categorySearch != "0") {
        StudentsFilterData = StudentsFilterData.filter((a) => a.category_id == this.state.categorySearch);
      }

    }
    else {
      StudentsFilterData = getStudents.getStudents;
    }

    return (
      <section className="students_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbsSection
            type="student"
              onClick={() => this.setState({ modalShow: true })}
              breadcrumbs={this.state.BranchesSection}
            />
          </Col>

          {/* 
          <Col xl={12} lg={12} md={12} sm={12}>
            <Card as={Card.Body} className="students_status border-0">
              <Row>
                <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                  <Card
                    as={Card.Body}
                    className="students_total_status border-0 shadow-sm p-2"
                  >
                    <div className="mb-2 border-dashed">
                      <p className="mb-0 title">Total Students</p>
                      <h2 className="counts">24000</h2>
                    </div>
                    <Card className="border-0">
                      <p className="mb-0 title">A Section Students</p>
                      <h2 className="counts mb-0">15000</h2>
                    </Card>
                    <Card className="border-0">
                      <p className="mb-0 title">B Section Students</p>
                      <h2 className="counts mb-0">5000</h2>
                    </Card>
                    <Card className="border-0">
                      <p className="mb-0 title">C &amp; All Section Students</p>
                      <h2 className="counts mb-0">4000</h2>
                    </Card>
                  </Card>
                </Col>
                <Col xl={9} lg={9} md={12} sm={12} xs={12}>
                  <Row className="students_wise_status">
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <Card className="single_students border-0 p-3 shadow-sm">
                        <p className="title">Telangana</p>
                        <h2 className="counts">6000</h2>
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-1</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-2</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-3</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <Card className="single_students border-0 p-3 shadow-sm">
                        <p className="title">Andhra Pradesh</p>
                        <h2 className="counts">6000</h2>
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-1</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-2</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-3</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <Card className="single_students border-0 p-3 shadow-sm">
                        <p className="title">Chennai</p>
                        <h2 className="counts">6000</h2>
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-1</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-2</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-3</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                      <Card className="single_students border-0 p-3 shadow-sm">
                        <p className="title">Delhi</p>
                        <h2 className="counts">6000</h2>
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-1</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-2</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                      <Card className="border-0 p-3 shadow-sm flex-row align-items-center">
                        <p className="title">Branch-3</p>
                        <h2 className="counts ml-3">2000</h2>
                        <i className="fas fa-info-circle" />
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col> */}
          <Col xl={12} lg={12} md={12} sm={12} className="studentTable">

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white  d-md-flex justify-content-between align-items-center">
                {/* <Card.Title className="mb-0">Students</Card.Title> */}
                <div className="split d-flex">
                  <div className="first mr-2" style={{ width: 180 }}>
                    <SelectDropDown
                      stateData={this.state.studentnameSearchval}
                      handleChange={this.selecthandleInputChange}
                      name="studentnameSearch"
                      options={this.dropDownGetValues("studentnameSearch")}
                      placeholderName={'Student Name'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="second mr-2" style={{ width: 170 }}>
                    <SelectDropDown
                      stateData={this.state.packageSearchval}
                      handleChange={this.selecthandleInputChange}
                      name="packageSearch"
                      options={this.dropDownGetValues("packageSearch")}
                      placeholderName={'Package'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="third mr-2" style={{ width: 130 }}>
                    <SelectDropDown
                      stateData={this.state.classSearchval}
                      handleChange={this.selecthandleInputChange}
                      name="classSearch"
                      options={this.dropDownGetValues("classSearch")}
                      placeholderName={'Class'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="fourth mr-2" style={{ width: 170 }}>
                    <SelectDropDown
                      stateData={this.state.sectionSearchval}
                      handleChange={this.selecthandleInputChange}
                      name="sectionSearch"
                      options={this.dropDownGetValues("sectionSearch")}
                      placeholderName={'Section'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="fifth mr-2" style={{ width: 170 }}>
                    <SelectDropDown
                      stateData={this.state.branchSearchval}
                      handleChange={this.selecthandleInputChange}
                      name="branchSearch"
                      options={this.dropDownGetValues("branchSearch")}
                      placeholderName={'Branch'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="sixth" style={{ width: 170 }}>
                    <SelectDropDown
                      stateData={this.state.categorySearchval}
                      handleChange={this.selecthandleInputChange}
                      name="categorySearch"
                      options={this.dropDownGetValues("categorySearch")}
                      placeholderName={'Category'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <TableSearchwithStudentResult
                  parentData={this.tableData(StudentsFilterData)}
                  particlecolumns={this.articlecolumns}
                  tableHeading={this.state.tableHeaderData}
                  defaultSorted={defaultSorted}
                />
              </Card.Body>
            </Card>
          </Col>
          {/* <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Package deleted successfully" : ""}
            </div> 
             <DataTableWithOutSearch
              parentData={this.tableData(getStudents.getStudents)}
              particlecolumns={this.articlecolumns}
              tableHeading={this.state.tableHeaderData}
              defaultSorted={defaultSorted}
              //branchData={this.props.getStudents.getStudents}
              name="Students"
            />
            

          </Col> */}
          <StudentModal
            globals={globals.globals}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <StudentModalEdit
            handleFormSubmit={this.handleFormSubmit}
            parenthandleInputChange={this.handleInputChange}
            globals={globals.globals}
            stateData={this.state}
            show={this.state.modalShow1}
            onHide={() => this.setState({ modalShow1: false })}
          />
        </Row>
      </section>
    );
  }
}

export default withRouter(
  compose(
    graphql(FETCH_GLOBALS, {
      options: (props) => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
        },
      }),
      name: "globals",
    }),
    graphql(FETCH_STUDENTS, {
      options: (props) => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
        },
        fetchPolicy: "cache-and-network",
      }),
      name: "getStudents",
    }),

    graphql(DELETE_STUDENT, {
      name: "handleDelete",
    }),
    graphql(EDIT_STUDENT, {
      name: "editStudent",
    })
  )(StudentsSection)
);
