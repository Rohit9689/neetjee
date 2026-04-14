import React, { Component } from "react";
import SelectDropDown from "../../selectdropdown/SelectDropDown";
import { components } from "react-select";
import { Card } from "react-bootstrap";
import TableSearchwithStudentResult from "../manage_questin_papers/TableSearchwithStudentResult";
import { Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const GET_STUDENTS = gql`
  query($institution_id: Int!, $start_time: String, $end_time: String, $username: String) {
    getStudents(
      institution_id: $institution_id
      start_time: $start_time
      end_time: $end_time
      username: $username
    ) {
      id
      student_name
      contact_no
      branch_id
      class_id
      section_id
      exam_id
      profile_pic
      practice {
        subject
        subject_id
        practice
        accuracy
        value
      }
    }
  }
`;

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
          <path
            fill="currentColor"
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
          ></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class ManageStudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newArray: [],
      status: ""
    };
  }
  // handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
  //   console.log("actionsFormatter", this.props);
  //   this.props.history.push(
  //     {
  //       pathname: "/home/student-profile",
  //       state: {
  //         globals: this.props.globals,
  //         getStudents: this.props.getStudents.getStudents,
  //         row: rowIndex,
  //         rowIndex: row,
  //       }
  //     });

  // }
  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    //console.log("actionsFormatter", data);
    return (
      <div className="text-link d-flex flex-column">
        <Link
          className="text-dark"
          to={{
            pathname: "/home/student-profile",
            state: {
              //globals: this.props.globals,
              row: row,
              rowIndex: rowIndex,

            }
          }}
        >
          {row["student_name"]}
        </Link>
        <small style={{ fontSize: "9px", "white-space": "nowrap" }} nowrap>
          {row["branch_value"]}-{row["class_value"]}-{row["section_value"]}
        </small>
      </div>
    );
  }
  sortingFunction = (a, b, order, dataField) => {
    console.log("order", order);
    if (order === "asc") {
      return b - a;
    }
    return a - b; // desc
  };
  particlecolumnsFun() {
    let Subarray = [];
    const newObj1 = {
      dataField: "student_name",
      text: "Name",
      sort: true,
      formatter: this.actionsFormatter
    }
    Subarray.push(newObj1);

    const newObj2 = {
      dataField: "overallpractise",
      text: "Practise(%)",
      sort: true,
    }
    Subarray.push(newObj2);

    const newObj3 = {
      dataField: "overallaccuracy",
      text: "Accuracy(%)",
      sort: true
    }
    Subarray.push(newObj3);
    this.props.globals.exams.map((item) => {
      if (item.id == this.props.stateData.examtype) {
        item.exam_subjects.map((examsub) => {
          console.log("examsub.subject_id", examsub.subject_id);
          let filterData = this.props.globals.subjects.find((a) => a.id == examsub.subject_id);
          if (filterData != undefined) {
            const newObj = {
              dataField: filterData.subject + "val",
              text: filterData.subject + "-P",
              sort: true
            }
            Subarray.push(newObj);

            const newObj2 = {
              dataField: filterData.subject + "accuracyval",
              text: filterData.subject + "-A",
              sort: true
            }
            Subarray.push(newObj2);
          }



        });

      }

    });
    console.log("Subarray", Subarray);
    return Subarray;
  }
  articlecolumnsneet = [
    {
      dataField: "student_name",
      text: "Name",
      sort: true,
      formatter: this.actionsFormatter,
      // events: {
      //   onClick: this.handleEditFunction
      // }
    },
    {
      dataField: "overallpractise",
      text: "Practise(%)",
      sort: true,
      //order: 'desc',
      //sort: true,

      sortFunc: this.sortingFunction,
    },
    {
      dataField: "overallaccuracy",
      text: "Accuracy(%)",
      sort: true,
    },
    {
      dataField: "botanyval",
      text: "Botany-P",
      sort: true,
    },
    {
      dataField: "botanyaccuracyval",
      text: "Botany-A",
      sort: true,
    },
    {
      dataField: "physicsval",
      text: "Physics-P",
      sort: true,
    },
    {
      dataField: "physicsaccuracyval",
      text: "Physics-A",
      sort: true,
    },
    {
      dataField: "chemistryval",
      text: "Chemistry-P",
      sort: true,
    },
    {
      dataField: "chemistryaccuracyval",
      text: "Chemistry-A",
      sort: true,
    },
    {
      dataField: "zoologyval",
      text: "Zoology-P",
      sort: true,
    },
    {
      dataField: "zoologyaccuracyval",
      text: "Zoology-A",
      sort: true,
    },
  ];

  articlecolumnsjee = [
    {
      dataField: "student_name",
      text: "Name",
      sort: true,
      formatter: this.actionsFormatter,
    },
    {
      dataField: "overallpractise",
      text: "Practise(%)",
      sort: true,
      order: "desc",
    },
    {
      dataField: "overallaccuracy",
      text: "Accuracy(%)",
      sort: true,
    },
    {
      dataField: "physicsval",
      text: "Physics-P",
      sort: true,
    },
    {
      dataField: "physicsaccuracyval",
      text: "Physics-A",
      sort: true,
    },
    {
      dataField: "chemistryval",
      text: "Chemistry-P",
      sort: true,
    },
    {
      dataField: "chemistryaccuracyval",
      text: "Chemistry-A",
      sort: true,
    },
    {
      dataField: "mathematicsval",
      text: "Mathematics-P",
      sort: true,
    },
    {
      dataField: "mathematicsaccuracyval",
      text: "Mathematics-A",
      sort: true,
    },
  ];
  defaultSorted = [
    {
      dataField: "overallpractise",
      order: "desc",
    }
  ];

  getTableresults = (data) => {
    console.log("getTableresults", data);
    let newArray = [];
    data.map((item) => {
      let getbranch = this.props.globals.globalBranches.find(
        (a) => a.id == item.branch_id
      );
      let branchval = "";
      if (getbranch != undefined) {
        branchval = getbranch.branch_name;
      }

      let getclass = this.props.globals.classes.find(
        (a) => a.id == item.class_id
      );
      let classval = "";
      if (getclass != undefined) {
        classval = getclass.class;
      }

      let getsection = this.props.globals.globalSections.find(
        (a) => a.id == item.section_id
      );
      let sectionval = "";
      if (getsection != undefined) {
        sectionval = getsection.section_name;
      }

      let getexam_type = this.props.globals.exams.find(
        (a) => a.id == item.exam_id
      );
      let exam_typeval = "";
      if (getexam_type != undefined) {
        exam_typeval = getexam_type.exam;
      }
      let botanyval = "";
      let physicsval = "";
      let chemistryval = "";
      let zoologyval = "";
      let mathematicsval = "";

      let botanyaval = "";
      let physicsaval = "";
      let chemistryaval = "";
      let zoologyaval = "";
      let mathematicsaval = "";

      let overallpractise = [];
      let overallaccuracy = [];
      console.log("item.practice", item.practice);
      let loveralp="";
      let loverala="";

      item.practice.map((pmapData) => {
        if (pmapData.subject_id == "0") {
          if (this.props.stateData.practise == "1") {
            loveralp = parseInt(pmapData.value);
            loverala=parseInt(pmapData.accuracy);
          } else {
            loveralp = parseInt(pmapData.practice);
            loverala=parseInt(pmapData.accuracy);
          }
        }
        if (pmapData.subject_id == "2") {
          if (this.props.stateData.practise == "1") {
            physicsval = parseInt(pmapData.value);
          } else {
            //physicsval = pmapData.practice + "%";
            physicsval = parseInt(pmapData.practice);
          }

          physicsaval = pmapData.accuracy + "%";
        }
        if (pmapData.subject_id == "3") {
          if (this.props.stateData.practise == "1") {
            chemistryval = parseInt(pmapData.value);
          } else {
            //chemistryval = pmapData.practice + "%";
            chemistryval = parseInt(pmapData.practice);
          }

          chemistryaval = pmapData.accuracy + "%";
        }
        if (pmapData.subject_id == "4") {
          if (this.props.stateData.practise == "1") {
            mathematicsval = parseInt(pmapData.value);
          } else {
            //mathematicsval = pmapData.practice + "%";
            mathematicsval = parseInt(pmapData.practice);
          }

          mathematicsaval = pmapData.accuracy + "%";
        }
        if (pmapData.subject_id == "1") {
          if (this.props.stateData.practise == "1") {
            botanyval = parseInt(pmapData.value);
          } else {
            //botanyval = pmapData.practice + "%";
            botanyval = parseInt(pmapData.practice);
          }

          botanyaval = pmapData.accuracy + "%";
        }
        if (pmapData.subject_id == "5") {
          if (this.props.stateData.practise == "1") {
            zoologyval = parseInt(pmapData.value);
          } else {
            //zoologyval = pmapData.practice + "%"
            zoologyval = parseInt(pmapData.practice);
          }

          zoologyaval = pmapData.accuracy + "%";
        }
        if (this.props.stateData.practise == "1") {
          overallpractise.push(parseInt(pmapData.value));
        } else {
          overallpractise.push(parseInt(pmapData.practice));
        }

        overallaccuracy.push(parseInt(pmapData.accuracy));
      });

      var sumpractise = overallpractise.reduce(function (a, b) {
        return a + b;
      }, 0);
      // console.log("overallpractise", overallpractise);
      // let sData = "";
      // if (this.props.stateData.practise == "1") {
      //   sData = parseInt(sumpractise);
      // } else {
      //   sData = parseInt(sumpractise / item.practice.length);
      // }

      var sumaccuracy = overallaccuracy.reduce(function (a, b) {
        return a + b;
      }, 0);
      let filterlength = overallaccuracy.filter((a) => a != 0);
      let overaladata = Math.round(sumaccuracy / filterlength.length);
      // let rodata = "";
      // if (isNaN(overaladata)) {
      //   rodata = 0;
      // }
      // else {
      //   rodata = overaladata;
      // }
      const newObj = {
        totalData: data,
        profile_pic: item.profile_pic,
        student_name: item.student_name,
        exam_type: exam_typeval,
        exam_id: item.exam_id,
        branch_value: branchval,
        class_value: classval,
        section_value: sectionval,
        branch_id: item.branch_id,
        class_id: item.class_id,
        section_id: item.section_id,
        contact_no: item.contact_no,
        Botanyval: botanyval,
        Physicsval: physicsval,
        Chemistryval: chemistryval,
        Mathematicsval: mathematicsval,
        Zoologyval: zoologyval,

        Botanyaccuracyval: botanyaval,
        Physicsaccuracyval: physicsaval,
        Chemistryaccuracyval: chemistryaval,
        Mathematicsaccuracyval: mathematicsaval,
        Zoologyaccuracyval: zoologyaval,

        overallpractise: loveralp,
        overallaccuracy: loverala + "%",
      };
      newArray.push(newObj);
    });

    return newArray;
  };
  componentDidMount() {
    console.log("componentDidMount", this.props);
  }
  render() {
    
    const getStudents = this.props.getStudents;
    const loading2 = getStudents.loading;
    const error2 = getStudents.error;
    if (loading2) {
      return (
        <div className="justify-content-center d-flex align-items-center">
          <div class="spinner-border text-primary text-center my-4"></div>
        </div>
      );
    };
    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }
    console.log("institution_id:", getStudents.getStudents,parseInt(Cookies.get("institutionid")),
    "start_time:", this.props.stateData.startDate,
    "end_time:" ,this.props.stateData.endDate, "username:",Cookies.get("username"));
    console.log("studentname:", getStudents.getStudents.filter((a)=>a.student_name=="SHRAVANI"));

    let stateFilterData = [];
    if (
      this.props.stateData.branch != "0" ||
      this.props.stateData.class != "0" ||
      this.props.stateData.examtype != "0" ||
      this.props.stateData.section != "0"
    ) {
      stateFilterData = getStudents.getStudents;

      if (this.props.stateData.branch != "0") {
        stateFilterData = stateFilterData.filter(
          (item) => item.branch_id == this.props.stateData.branch
        );
      }
      if (this.props.stateData.class != "0") {
        stateFilterData = stateFilterData.filter(
          (item) => item.class_id == this.props.stateData.class
        );
      }
      if (this.props.stateData.examtype != "") {
        stateFilterData = stateFilterData.filter(
          (item) => item.exam_id == this.props.stateData.examtype
        );
      }
      if (this.props.stateData.section != "0") {
        stateFilterData = stateFilterData.filter(
          (item) => item.section_id == this.props.stateData.section
        );
      }
    }
    console.log("stateFilterData", stateFilterData);
    return (
      <Card.Body>
        <TableSearchwithStudentResult
          parentData={this.getTableresults(stateFilterData)}
          // particlecolumns={
          //   this.props.stateData.examtype == "1"
          //     ? this.articlecolumnsneet
          //     : this.articlecolumnsjee
          // }
          particlecolumns={this.particlecolumnsFun()}
          defaultSorted={this.defaultSorted}
          tableHeading={this.state.tableHeaderData}
          name="Student Results"

        />
      </Card.Body>
    );
    // } return null;
  }
}
export default withRouter(
  compose(
    graphql(GET_STUDENTS, {
      options: (props) => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
          start_time: props.stateData.startDate,
          end_time: props.stateData.endDate,
          username:Cookies.get("username")
        },
        fetchPolicy: "cache-and-network",
      }),
      name: "getStudents",
    })
  )(ManageStudentResult)
);
