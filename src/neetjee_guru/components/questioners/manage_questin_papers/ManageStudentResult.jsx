import React, { Component } from "react";
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import { components } from 'react-select'
import { Card } from 'react-bootstrap';
import TableSearchwithStudentResult from "../manage_questin_papers/TableSearchwithStudentResult";
import { Button } from 'react-bootstrap'
const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
      </components.DropdownIndicator>
    )
  );
};

class ManageStudentResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      branchValue: "",
      branch: "",
      sectionValue: "",
      section: "",
      student_results: props.student_results
    }
  }
  selecthandleInputChange = (ename, evalue) => {
    const name = ename;
    const value = evalue;
    if (name == "branch") {
      let branchData = this.props.globals.globalBranches.find((a) => a.id == value);
      this.setState({
        branchValue: {
          value: branchData.id,
          label: branchData.branch_name
        }
      });
    }
    if (name == "section") {
      let sectionData = this.props.globals.globalSections.find((a) => a.id == value);
      this.setState({
        sectionValue: {
          value: sectionData.id,
          label: sectionData.section_name
        }
      });
    }
    this.setState({ [name]: value });
  }
  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-end align-items-top">
        <Button variant="outline-primary" className="font-weight-bold"><i class="px-3 fas fa-chart-line table_chart_icon" /></Button>
      </div>
    );
  }
  handleSessionFunction = (e, cell, row, rowIndex, formatExtraData) => {
    // localStorage.removeItem('mobile');
    // localStorage.removeItem('examtype');
    // localStorage.removeItem('sessionid');
    // localStorage.setItem("mobile", rowIndex.mobile);
    // localStorage.setItem("examtype", "schedule_exam");
    // localStorage.setItem("sessionid", rowIndex.id);
    //this.props.history.push("http://student.rizee.in/student/subject/single-exam-result");

    window.open(`http://student.rizee.in/student/subject/college-single-exam-result/:${rowIndex.session_id}/:${rowIndex.mobile}/:schedule_exam`, "_blank") 
  }
  articlecolumns = [
    {
      dataField: "student_name",
      text: "Student Name",
      sort: true,
    },
    {
      dataField: "branch_value",
      text: "Branch",
      sort: true
    },

    {
      dataField: "class_value",
      text: "Class",
      sort: true
    },
    {
      dataField: "section_value",
      text: "Section",
      sort: true
    }
    ,
    {
      dataField: "total_attempted",
      text: "Attempted",
      sort: true
    }
    ,
    {
      dataField: "correct",
      text: "Correct",
      sort: true
    }
    ,
    {
      dataField: "wrong",
      text: "Wrong",
      sort: true
    }
    ,

    {
      dataField: "total_score",
      text: "Total Score",
      sort: true
    }
    ,
    {
      dataField: "speed",
      text: "Speed",
      sort: true
    },
    {
      dataField: "accuracy",
      text: "Accuracy",
      sort: true
    },
    {
      dataField: "Actions",
      text: "Actions",
      sort: true,
      formatter: this.actionsFormatter,
      headerAlign: 'right',
      align: 'right',
      events: {
        onClick: this.handleSessionFunction
      }
    }
  ];
  getTableresults = (val) => {
    //console.log("getTableresults", this.props);
    let newArray = [];
    let getData = val;
    getData.map((item) => {
      if (item != undefined) {
        //console.log("item.branch_id", item.branch_id);
        let brachData = this.props.globals.globalBranches.find((a) => a.id == item.branch_id);
        let branch_value = "";
        if (brachData != undefined) {
          branch_value = brachData.branch_name;
        }
        let sectionData = this.props.globals.globalSections.find((a) => a.id == item.section_id);
        let section_value = "";
        if (sectionData != undefined) {
          section_value = sectionData.section_name
        }
        let classData = this.props.globals.classes.find((a) => a.id == item.class_id);
        let class_value = "";
        if (classData != undefined) {
          class_value = classData.class
        }
        let totalAttempted = parseInt(item.correct) + parseInt(item.wrong);
        let totalScore = parseInt(item.correct_marks) - parseInt(item.negative_marks);
        let speed = item.speed + " " + "Time/sec";
        let accuracy = item.accuracy + " " + "%";
        const newObj = {
          session_id:item.session_id,
          student_name: item.student_name,
          branch_value: branch_value,
          class_value: class_value,
          section_value: section_value,
          total_attempted: totalAttempted,
          correct: item.correct,
          wrong: item.wrong,
          total_score: totalScore,
          speed: speed,
          accuracy: accuracy,
          mobile:item.mobile

        }
        newArray.push(newObj);

      }


    });

    return newArray;
  }
  getSections() {
    //console.log("getSections", this.props.globals.globalSections);
    let newArray = [];
    this.props.globals.globalSections.map((item) => {
      if (item != undefined) {
        const newObj = {
          value: item.id,
          label: item.section_name
        }
        newArray.push(newObj);

      }

    })
    return newArray;

  }
  getBranches() {
    //console.log("getSections", this.props.globals.globals.globalBranches);
    let newArray = [];
    this.props.globals.globalBranches.map((item) => {
      if (item != undefined) {
        const newObj = {
          value: item.id,
          label: item.branch_name
        }
        newArray.push(newObj);

      }

    })
    return newArray;

  }

  render() {
    console.log("student_results",this.state.student_results);
    const defaultSorted = [
      {
        dataField: "exam_name",
        order: "desc"
      }
    ];
    const filterData = this.state.student_results.filter((a) => a.attempted_exam == true);
    let stateFilterData = [];
    if (this.state.branch != "" && this.state.section != "") {
      stateFilterData = filterData.filter((a) => a.branch_id == this.state.branch && a.section_id == this.state.section);
    }
    else if (this.state.branch != "" || this.state.section != "") {
      stateFilterData = filterData.filter((a) => a.branch_id == this.state.branch || a.section_id == this.state.section)
    }
    else {
      stateFilterData = filterData;
    }
    if (filterData.length > 0) {
      return (
        <React.Fragment>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white  d-md-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Student Results</Card.Title>
              <div className="split d-flex">
                <div className="first mr-2" style={{ width: 150 }}>
                  <SelectDropDown
                    stateData={this.state.branchValue}
                    handleChange={this.selecthandleInputChange}
                    name="branch"
                    options={this.getBranches()}
                    placeholderName={'Branches'}
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                </div>
                <div className="second" style={{ width: 150 }}>
                  <SelectDropDown
                    stateData={this.state.sectionValue}
                    handleChange={this.selecthandleInputChange}
                    name="section"
                    options={this.getSections()}
                    placeholderName={'Sections'}
                    dropdownIndicator={{ DropdownIndicator }}
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <TableSearchwithStudentResult
                parentData={this.getTableresults(stateFilterData)}
                particlecolumns={this.articlecolumns}
                defaultSorted={defaultSorted}
                tableHeading={this.state.tableHeaderData}
                name="Student Results" />
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    } return null;

  }
}

export default ManageStudentResult;
