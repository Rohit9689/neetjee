import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import TeacherModal from "./TeacherModal";
import TeacherModalEdit from "./TeacherModalEdit";
import { Data, Columns, defaultSorted } from "./TeacherTableData";

import "./_teachers.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const DELETE_TEACHER = gql`
  mutation($teacherId: ID) {
    deleteTeacher(teacherId: $teacherId)
  }
`;
const EDIT_TEACHER = gql`
  mutation($params: TeacherInput1) {
    updateFaculity(params: $params)
  }
`;

const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
      subjects {
        id
        subject
        chapters {
          id
          chapter
          class
          topics {
            id
            topic
          }
        }
      }
      globalBranches {
        id
        branch_name
      }
      classes {
        id
        class
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

const FETCH_TEACHERS = gql`
  query($institution_id: Int!) {
    getFaculity(institution_id: $institution_id) {
      id
        name,
        mobile,
        subject,
        branch,
        class,
        section,
        email,
        userlevel,
        username
    }
  }
`;

class TeachersSection extends Component {
  constructor(props) {
    super(props);
    console.log("propsdatas", props.globals.globals);
    this.state = {
      currentStep: 1,
      teacher_name: "",
      contact_no: "",
      userlevel: "",
      userlevelvalue: "",
      subject: [],
      subjectvalue: [],
      branch: [],
      branchvalue: [],
      section: [],
      sectionvalue: [],
      email: "",
      class: "",
      classvalue: "",
      password: "",
      submitError: "",
      teacherid: "",
      formErrors: {
        teacher_name: "",
        contact_no: "",
        subject: "",
        branch: "",
        class: "",
        section: "",
        password: "",
        email: "",
        userlevel: ""
      },
      teacher_nameValid: false,
      contact_noValid: false,
      subjectValid: false,
      sectionValid: false,
      classValid: false,
      branchValid: false,
      passwordValid: false,
      emailValid: false,
      userlevelValid: false,
      formValid: false,
      BranchesSection: {
        Title: "Create New Faculty",
        btnName: "Add Faculty",
      },
      tableHeaderData: {
        Title: "Faculties",
      },
      modalShow: false,
      modalShow1: false,
      status: 1,
    };
  }

  tableData(teachers) {
    console.log("tableData", this.props.globals.globals);
    let newArray = [];
    if (teachers != null) {
      teachers.map((item) => {
        if (item != undefined) {
          let userval = "";
          if (item.userlevel == "1") {
            userval = "DEAN";
          }
          else if (item.userlevel == "2") {
            userval = "PRINCIPAL";
          }
          else if (item.userlevel == "3") {
            userval = "TEACHER";
          }

          let subjectobj = [];
          let subjectval = [];
          this.props.globals.globals.subjects.map((item1) => {
            if (item1 != undefined) {
              const array = item.subject.split(",");
              if (array.includes(item1.id.toString())) {
                subjectval.push(item1.subject);
                subjectobj.push({ value: item1.id, label: item1.subject });
              }
            }
          })

          let branchobj = [];
          let branchval = [];
          this.props.globals.globals.globalBranches.map((item2) => {
            if (item2 != undefined) {
              const array = item.branch.split(",");
              if (array.includes(item2.id.toString())) {
                branchval.push(item2.branch_name);
                branchobj.push({ value: item2.id, label: item2.branch_name });
              }
            }
          })

          let sectionobj = [];
          let sectionval = [];
          this.props.globals.globals.globalSections.map((item3) => {
            if (item3 != undefined) {
              const array = item.section.split(",");
              if (array.includes(item3.id.toString())) {
                sectionval.push(item3.section_name);
                sectionobj.push({ value: item3.id, label: item3.section_name });
              }
            }
          })

          let classval = [];

          this.props.globals.globals.classes.map((item4) => {
            if (item4 != undefined) {
              const array = item.class.split(",");
              if (array.includes(item4.id.toString())) {
                classval.push(item4.class);
              }
            }
          })
          newArray.push({
            id: item.id,
            name: item.name,
            mobile: item.mobile,
            email: item.email,
            subject: item.subject.split(","),
            branch: item.branch.split(","),
            section: item.section.split(","),
            subjectobj: subjectobj,
            branchobj: branchobj,
            sectionobj: sectionobj,
            subjectval: subjectval.toString(),
            branchval: branchval.toString(),
            sectionval: sectionval.toString(),
            classval: classval.toString(),
            class: item.class,
            userval: userval,
            userlevel: item.userlevel,
            username:item.username

          });

        }

      });
    }
    console.log("newArray", newArray);
    return newArray;
  }

  getDefaultValuesSection(vals, prop) {
    console.log("getDefaultValues", prop);
    let chars = vals;

    let sections = Array();
    if (chars != undefined) {
      console.log("chars.length", chars);
      for (let i = 0; i < chars.length; i++) {
        const sectionval = chars[i];
        let found = prop.globalSections.find((a) => a.id == sectionval);
        console.log("found", found);
        if (found != undefined) {
          sections.push({
            label: found.section_name,
            value: found.section_name,
            id: found.id,
          });
        }
      }
    }

    return sections;
  }

  getValues = (vals) => {
    // console.log("Sections",vals)
    let sections = Array();
    for (let i = 0; i < vals.length; i++) {
      if (this.state.branch == vals[i].branch_id) {
        const sectionval = vals[i];
        sections.push({
          label: sectionval.section_name,
          value: sectionval.section_name,
          id: sectionval.id,
        });
      }
    }
    return sections;
  }
  handleSelectInputChangeSection = (e) => {
    let sections = Array();
    if (e != undefined) {
      for (let i = 0; i < e.length; i++) {
        const sectionval = e[i];
        sections.push(sectionval.id);
      }
      this.setState({
        section: sections,
      });
    }
  };
  getDefaultValues(vals, prop) {
    let chars = vals;

    let classes = Array();
    if (chars != undefined) {
      // console.log("chars.length", chars);
      for (let i = 0; i < chars.length; i++) {
        const classval = chars[i];
        let found = prop.classes.find((a) => a.id == classval);
        console.log("found", found);
        if (found != undefined) {
          classes.push({
            label: found.class,
            value: found.class,
            id: found.id,
          });
        }
      }
    }

    return classes;
  }

  getClassValues(vals) {
    // console.log("Classes",vals);
    let classes = Array();
    for (let i = 0; i < vals.length; i++) {
      const classval = vals[i];
      classes.push({
        label: classval.class,
        value: classval.class,
        id: classval.id,
      });
    }

    return classes;
  }
  handleSelectInputChange = (e) => {
    let classes = Array();
    if (e != undefined) {
      for (let i = 0; i < e.length; i++) {
        const classval = e[i];
        classes.push(classval.id);
      }
      this.setState({
        class: classes,
      });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Cookies2", Cookies.get("username"));
    console.log("institutionid2", Cookies.get("institutionid"));
    console.log("Data456", this.state);

    if (this.state.formValid) {
      let classval = "";
      if (this.state.class == "0") {
        classval = "1,2";

      }
      else {
        classval = this.state.class.toString()
      }
      let updateFaculityobj="";
      if(this.state.password!=""){
         updateFaculityobj = {
          name: this.state.teacher_name,
          mobile: this.state.contact_no,
          subject: this.state.subject.toString(),
          branch: this.state.branch.toString(),
          class: classval.split(','),
          section: this.state.section,
          institution_id: parseInt(Cookies.get("institutionid")),
          username: this.state.teacherid,
          email: this.state.email,
          userlevel: parseInt(this.state.userlevel),
          password:this.state.password
        };
      }
      else{
         updateFaculityobj = {
          name: this.state.teacher_name,
          mobile: this.state.contact_no,
          subject: this.state.subject.toString(),
          branch: this.state.branch.toString(),
          class: classval.split(','),
          section: this.state.section,
          institution_id: parseInt(Cookies.get("institutionid")),
          username: this.state.teacherid,
          email: this.state.email,
          userlevel: parseInt(this.state.userlevel),
          
        };
      }
     
      console.log("updateFaculityobj", updateFaculityobj);
      this.updateFaculity(updateFaculityobj).catch((error) => {
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

  updateFaculity = async (params) => {
    await this.props.updateFaculity({
      variables: {
        params,
      },
      update: (store, { data }) => {
        let data1 = store.readQuery({
          query: FETCH_TEACHERS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });

        const teacher = data1.getFaculity.findIndex(
          (th) => th.username == this.state.teacherid
        );

        console.log("data1", data1, teacher);

        data1.getFaculity[teacher].name = this.state.teacher_name;
        data1.getFaculity[teacher].mobile = this.state.contact_no;
        data1.getFaculity[teacher].subject = this.state.subject.toString();
        data1.getFaculity[teacher].branch = this.state.branch.toString();
        data1.getFaculity[teacher].class = params.class.toString();
        data1.getFaculity[teacher].section = this.state.section.toString();
        data1.getFaculity[teacher].userlevel = parseInt(this.state.userlevel);
        data1.getFaculity[teacher].email = this.state.email;


        try {
          store.writeQuery({
            query: FETCH_TEACHERS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid")),
            },
            data: data1,
          });
        } catch (e) {
          console.log("Exception", e);
        }

        console.log("updateFaculity", data);

        if (data.updateFaculity) {
          this.setState({
            currentStep: 5,
            teacher_name: "",
            contact_no: "",
            userlevel: "",
            userlevelvalue: "",
            subject: [],
            subjectvalue: [],
            branch: [],
            branchvalue: [],
            section: [],
            sectionvalue: [],
            email: "",
            class: "",
            classvalue: "",
            password: "",
            submitError: "",
            formErrors: {
              teacher_name: "",
              contact_no: "",
              subject: "",
              branch: "",
              class: "",
              section: "",
              password: "",
              email: "",
              userlevel: ""
            },
            teacher_nameValid: true,
            contact_noValid: true,
            subjectValid: true,
            sectionValid: true,
            classValid: true,
            branchValid: true,
            passwordValid: true,
            emailValid: true,
            userlevelValid: true,
            formValid: true,
            BranchesSection: {
              Title: "Faculties",
              btnName: "Add Faculty",
            },
            tableHeaderData: {
              Title: "Faculties",
            },
            modalShow: false,
            modalShow1: false,
            status: 1,
          });
          setTimeout(() => {
            this.SetpageLoad();
          }, 5000);
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
  handleMultipleSelectInputChange = (e, name) => {
    console.log("handleMultipleSelectInputChange", e, name);
    if (name == "subject") {
      let subject = Array();
      let subjectvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const subjectval = e[i];
          const newObj = {
            label: subjectval.label,
            value: subjectval.value
          }
          subjectvalue.push(newObj);
          subject.push(subjectval.value);
        }
        this.setState({
          subjectvalue: subjectvalue,
          subject: subject
        }, () => { this.validateField(name, "1") });
      }
    }
    else if (name == "section") {
      let section = Array();
      let sectionvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const sectionval = e[i];
          const newObj = {
            label: sectionval.label,
            value: sectionval.value
          }
          sectionvalue.push(newObj);
          section.push(sectionval.value);
        }
        this.setState({
          sectionvalue: sectionvalue,
          section: section
        }, () => { this.validateField(name, "1") });
      }

    }
    else if (name == "branch") {
      let branch = Array();
      let branchvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const branchval = e[i];
          const newObj = {
            label: branchval.label,
            value: branchval.value
          }
          branchvalue.push(newObj);
          branch.push(branchval.value);
        }
        this.setState({
          section: [],
      sectionvalue: [],
          branch: branch,
          branchvalue: branchvalue
        }, () => { this.validateField(name, "1") });
      }
    }


  };
  handleInputChange = e => {
    console.log("e.target.name", e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };



  validateField(fieldName, value) {
    console.log("validateField", fieldName, value);
    let fieldValidationErrors = this.state.formErrors;
    let teacher_nameValid = this.state.teacher_nameValid;
    let contact_noValid = this.state.contact_noValid;
    let subjectValid = this.state.subjectValid;
    let sectionValid = this.state.sectionValid;
    let branchValid = this.state.branchValid;
    let classValid = this.state.classValid;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;
    let userlevelValid = this.state.userlevelValid;



    switch (fieldName) {
      case "teacher_name":
        if (value.length == "") {
          teacher_nameValid = false;
          fieldValidationErrors.teacher_name = "Teacher Name Cannot Be Empty";
        }
        else {
          teacher_nameValid = true;
          fieldValidationErrors.teacher_name = "";
        }

        break;

      case "password":
        if (value.length == "") {
          passwordValid = false;
          fieldValidationErrors.password = "Password cannot be Empty";
        } else {
          passwordValid = true;
          fieldValidationErrors.password = "";
        }

        break;
      case "email":
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (value.length < 4) {
          emailValid = false;
          fieldValidationErrors.email =
            "email cannot be less than 5 chars";
        } else if (!pattern.test(value)) {
          emailValid = false;
          fieldValidationErrors.email = "Invalid email";
        } else {
          emailValid = true;
          fieldValidationErrors.email = "";
        }

        break;
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
      case "userlevel":
        if (value.length == "") {
          userlevelValid = false;
          fieldValidationErrors.userlevel = "userlevel cannot be empty";
        }
        else {
          userlevelValid = true;
          fieldValidationErrors.userlevel = "";
        }

        break;

      case "subject":
        if (value.length == "") {
          subjectValid = false;
          fieldValidationErrors.subject = "Subject cannot be empty";
        }
        else {
          subjectValid = true;
          fieldValidationErrors.subject = "";
        }

        break;
      case "section":
        if (value.length == "") {
          sectionValid = false;
          fieldValidationErrors.section = "section cannot be empty";
        }
        else {
          sectionValid = true;
          fieldValidationErrors.section = "";
        }

        break;
      case "class":
        if (value.length == "") {
          classValid = false;
          fieldValidationErrors.class = "class cannot be empty";
        }
        else {
          classValid = true;
          fieldValidationErrors.class = "";
        }

        break;

      case "branch":
        if (value.length == "") {
          branchValid = false;
          fieldValidationErrors.branch = "Branch cannot be empty";
        }
        else {
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
        teacher_nameValid: teacher_nameValid,
        passwordValid: passwordValid,
        emailValid: emailValid,
        contact_noValid: contact_noValid,
        subjectValid: subjectValid,
        sectionValid: sectionValid,
        classValid: classValid,
        branchValid: branchValid,
        userlevelValid: userlevelValid
       
      },
      this.validateForm
    );
  }

  validateForm() {
    console.log("pvalidateForm",this.state);
    if (this.state.userlevel == "3") {
      this.setState({
        formValid: this.state.teacher_nameValid &&
          this.state.passwordValid &&
          this.state.emailValid &&
          this.state.contact_noValid &&
          this.state.subjectValid &&
          this.state.sectionValid &&
          this.state.classValid &&
          this.state.userlevelValid &&
          this.state.branchValid
      });
    }
    else {
      this.setState({
        formValid: this.state.teacher_nameValid &&
          this.state.passwordValid &&
          this.state.emailValid &&
          this.state.contact_noValid &&
          this.state.userlevelValid &&
          this.state.branchValid
      });
    }

    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
    console.log("rowIndex", rowIndex);
    let classv = "";
    let classvalue = "";
    let arraylen = rowIndex.class.split(",");
    if (rowIndex.class=="1,2") {
      classv = "0";
      classvalue = { value: "0", label: "ALL" }
    }
    else {
      classv = rowIndex.class;
      classvalue = { value: rowIndex.class, label: rowIndex.classval }
    }
    if(rowIndex.userlevel=="3"){
      this.setState({
        modalShow1: true,
        teacherid: rowIndex.username,
        teacher_name: rowIndex.name,
        contact_no: rowIndex.mobile,
        subject: rowIndex.subject,
        subjectvalue: rowIndex.subjectobj,
        branch: rowIndex.branch,
        branchvalue: rowIndex.branchobj,
        class: classv,
        classvalue: classvalue,
        section: rowIndex.section,
        sectionvalue: rowIndex.sectionobj,
        userlevel: rowIndex.userlevel,
        userlevelvalue: { value: rowIndex.userlevel, label: rowIndex.userval },
        email: rowIndex.email,
        teacher_nameValid: true,
        contact_noValid: true,
        subjectValid: true,
        sectionValid: true,
        classValid: true,
        branchValid: true,
        passwordValid: true,
        emailValid: true,
        userlevelValid: true,
        formValid: true,
      });
    }
    else{
      this.setState({
        modalShow1: true,
        teacherid: rowIndex.username,
        teacher_name: rowIndex.name,
        contact_no: rowIndex.mobile,
        subject: rowIndex.subject,
        subjectvalue: rowIndex.subjectobj,
        branch: rowIndex.branch,
        branchvalue: rowIndex.branchobj,
        class: classv,
        classvalue: classvalue,
        section: rowIndex.section,
        sectionvalue: rowIndex.sectionobj,
        userlevel: rowIndex.userlevel,
        userlevelvalue: { value: rowIndex.userlevel, label: rowIndex.userval },
        email: rowIndex.email,
        teacher_nameValid: true,
        contact_noValid: true,
        subjectValid: false,
        sectionValid: false,
        classValid: false,
        branchValid: true,
        passwordValid: true,
        emailValid: true,
        userlevelValid: true,
        formValid: true,
      });
    }
    
  };

  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    await this.props.handleDelete({
      variables: {
        teacherId: rowIndex.id,
      },
      update: (store, { data }) => {
        console.log("data", data);
        const data1 = store.readQuery({
          query: FETCH_TEACHERS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });
        console.log("data1s", data1.getFaculity);
        console.log("rowIndex.id", rowIndex.id);
        data1.getFaculity = data1.getFaculity.filter(
          (x) => x.id != rowIndex.id
        );
        console.log("data2s", data1.getFaculity);
        try {
          store.writeQuery({
            query: FETCH_TEACHERS,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid")),
            },
            data: data1,
          });
        } catch (e) {
          console.log("Exception", e);
        }

        const data4 = store.readQuery({
          query: FETCH_TEACHERS,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
          },
        });
        data1.getFaculity = data4;
        console.log("data4s", data4);
        if (data.deleteTeacher) {
          this.setState({
            status: 2,
          });
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
      dataField: "name",
      text: "Faculty",
      sort: true,
    },
    {
      dataField: "userval",
      text: "User Type",
      sort: true,
    },
    {
      dataField: "classval",
      text: "Class",
      sort: true,
    },
    {
      dataField: "subjectval",
      text: "Subject",
      sort: true,
    },
    {
      dataField: "branchval",
      text: "Branch",
      sort: true,
    },
    {
      dataField: "sectionval",
      text: "Section",
      sort: true,
    },

    {
      dataField: "mobile",
      text: "phone NO.",
      sort: true,
    },
    // {
    //   dataField: "actions",
    //   formatter: this.actionsFormatter,
    //   headerAlign: "center",
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
        onClick: this.handleEditFunction,
      },
    },
    // {
    //   dataField: "actions",
    //   formatter: this.actionsFormatter2,
    //   headerAttrs: { width: 50 },
    //   attrs: { width: 50, className: "EditRow" },
    //   headerAlign: "center",
    //   events: {
    //     onClick: this.handleDelete,
    //   },
    // }
  ];
  selecthandleInputChange = (ename, evalue) => {
    console.log("selecthandleInputChange", this.props, evalue);
    const name = ename;
    const value = evalue;
    if (name == "class") {
      if (value != "0") {
        let classData = this.props.globals.globals.classes.find((a) => a.id == value);
        this.setState({
          classvalue: {
            value: classData.id,
            label: classData.class
          }
        });
      }
      else {
        this.setState({
          classvalue: {
            value: "0",
            label: "ALL"
          }
        });
      }
    }
    if (name == "userlevel") {
      if (value != "0") {
        let labelval = "";
        if (value == "1") {
          labelval = "DEAN";
        }
        else if (value == "2") {
          labelval = "PRINCIPAL";
        }
        else if (value == "3") {
          labelval = "TEACHER";
        }
        this.setState({
          userlevelvalue: {
            value: value,
            label: labelval
          }
        });
      }

    }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  render() {
    console.log("teachercurrentstate", this.state,Cookies.get("institutionid"), Cookies.get("userlevel"));
    console.log("propsdatr", this.props);
    // console.log("Globalsssss",this.props.globals.globals)

    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getFaculity = this.props.getFaculity;
    const loading2 = getFaculity.loading;
    const error2 = getFaculity.error;

    if (loading1 || loading2) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }
    console.log("getFaculity.getFaculity", getFaculity.getFaculity);
    return (
      <section className="teachers_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbsSection
              onClick={() => this.setState({ modalShow: true })}
              breadcrumbs={this.state.BranchesSection}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Message deleted successfully" : ""}
            </div>
            <DataTableWithOutSearch
              parentData={this.tableData(getFaculity.getFaculity)}
              particlecolumns={this.articlecolumns}
              tableHeading={this.state.tableHeaderData}
              defaultSorted={defaultSorted}
              name="Faculties"
            />
          </Col>
          <TeacherModal
            globals={globals.globals}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <TeacherModalEdit
            handleMultipleSelectInputChange={this.handleMultipleSelectInputChange}
            selecthandleInputChange={this.selecthandleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            parenthandleInputChange={this.handleInputChange}
            stateData={this.state}
            globals={globals.globals}
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
    graphql(FETCH_TEACHERS, {
      options: (props) => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
          userlevel:parseInt(Cookies.get("userlevel"))
        },
        fetchPolicy: "cache-and-network",
      }),
      name: "getFaculity",
    }),
    graphql(DELETE_TEACHER, {
      name: "handleDelete",
    }),
    graphql(EDIT_TEACHER, {
      name: "updateFaculity",
    })
  )(TeachersSection)
);
