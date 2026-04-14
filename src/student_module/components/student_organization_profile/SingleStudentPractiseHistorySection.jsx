import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import { withRouter } from "react-router-dom";
import { components } from 'react-select';
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import SingleStudentPractiseHistorySectionTable from "./SingleStudentPractiseHistorySectionTable";
import DateBlock from '../../../neetjee_guru/components/home/DateBlock';
import moment from 'moment';
const ExamType = [
  { value: "1", label: "Practise" },
  { value: "2", label: "Error" }

];
const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
      </components.DropdownIndicator>
    )
  );
};

class SingleStudentPractiseHistorySection extends Component {
  constructor(props) {
    super(props)
    let start = moment(new Date()).subtract(1, "month");
    let end = moment(new Date());

    let sdate = String(start._d);
    console.log("sdatesdate", sdate);
    var sres = sdate.substr(4, 11);
    console.log("sressres", sres);

    let edate = String(end._d);
    var eres = edate.substr(4, 11);

    let startDate = sres + " 00:00:00";
    let endDate = eres + " 23:59:59";

    const stimestamp = moment(startDate, "MMM DD YYYY hh:mm:ss").unix();
    const etimestamp = moment(endDate, "MMM DD YYYY hh:mm:ss").unix();
    this.state = {
      examtype: "0",
      examtypeValue: { value: "0", label: "Test Type", labelvalue: "" },
      subject: "0",
      subjectValue: { value: "0", label: "Subject" },
      chapter: "0",
      chapterValue: { value: "0", label: "Chapter" },
      startDate: startDate,
      endDate: endDate,
      stimestamp: stimestamp,
      etimestamp: etimestamp

    }
  }

  selecthandleInputChange = (ename, evalue) => {
    const name = ename;
    const value = evalue;
    if (name == "examtype") {
      if (value != "0") {
        const examtypeData = ExamType.find((a) => a.value == value);
        this.setState({
          examtypeValue: {
            value: examtypeData.value,
            label: examtypeData.label,
            labelvalue: examtypeData.labelvalue
          }

        });
      } else {
        this.setState({
          examtypeValue: {
            value: "0",
            label: "Exam Type",
            labelvalue: ""
          }
        });
      }

    }

    if (name == "subject") {
      if (value != "0") {
        const subjectData = this.props.subjects.find((a) => a.id == value);
        this.setState({
          subjectValue: {
            value: subjectData.id,
            label: subjectData.subject
          },
          chapter: "0",
          chapterValue: { value: "0", label: "Chapter" }
        });
      } else {
        this.setState({
          subjectValue: {
            value: "0",
            label: "Subject"
          },
          chapter: "0",
          chapterValue: { value: "0", label: "Chapter" }
        });
      }

    }

    if (name == "chapter") {
      if (value != "0") {
        const subjectData = this.props.subjects.find((a) => a.id == this.state.subject);
        const chapterData = subjectData.studentChapters.find((a) => a.id == value);
        this.setState({
          chapterValue: {
            value: chapterData.id,
            label: chapterData.chapter
          }
        });
      } else {
        this.setState({
          chapterValue: {
            value: "0",
            label: "Chapter"
          }
        });
      }

    }
    this.setState({ [name]: value });
  }

  getSubjects() {
    let getArray = [];

    this.props.subjects.map((smap) => {
      const newObj = {
        value: smap.id,
        label: smap.subject
      }
      getArray.push(newObj);
    })
    if (getArray.length > 0 && this.state.subject != 0) {
      const newObj1 = {
        value: "0",
        label: "Select"
      }
      getArray.push(newObj1);
    }
    return getArray;
  }

  getChapters() {
    let getArray = [];

    this.props.subjects.map((smap) => {
      if (smap.id == this.state.subject) {
        smap.studentChapters.map((cmap) => {
          const newObj = {
            value: cmap.id,
            label: cmap.chapter
          }
          getArray.push(newObj);
        })

      }

    })
    if (getArray.length > 0 && this.state.chapter != 0) {
      const newObj1 = {
        value: "0",
        label: "Select"
      }
      getArray.push(newObj1);
    }
    return getArray;
  }

  applyCallback = (startDate, endDate) => {
    console.log("applyCallback", startDate, endDate);
    let sdate = String(startDate._d);
    var sres = sdate.substr(4, 20);

    let edate = String(endDate._d);
    var eres = edate.substr(4, 20);

    const stimestamp = moment(sres, "MMM DD YYYY hh:mm:ss").unix();
    const etimestamp = moment(eres, "MMM DD YYYY hh:mm:ss").unix();

    this.setState({
      startDate: sres,
      endDate: eres,
      stimestamp: stimestamp,
      etimestamp: etimestamp

    });
  }
  render() {
    console.log("subjects", this.props.subjects);
    return (
      <div className="home_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} className="studentTable">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white  d-md-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">Student Practise Exams</Card.Title>
                <div className="split d-flex">
                  <div className="first mr-2" style={{ width: 250 }}>
                    <DateBlock applyCallback={this.applyCallback}
                      stateData={this.props.state}
                      type="student"
                    />
                  </div>
                  <div className="second mr-2" style={{ width: 150 }}>
                    <SelectDropDown
                      stateData={this.state.examtypeValue}
                      handleChange={this.selecthandleInputChange}
                      name="examtype"
                      options={ExamType}
                      placeholderName={'Test Type'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="third mr-2" style={{ width: 150 }}>
                    <SelectDropDown
                      stateData={this.state.subjectValue}
                      handleChange={this.selecthandleInputChange}
                      name="subject"
                      options={this.getSubjects()}
                      placeholderName={'Subject'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                  <div className="fourth mr-2" style={{ width: 150 }}>
                    <SelectDropDown
                      stateData={this.state.chapterValue}
                      handleChange={this.selecthandleInputChange}
                      name="chapter"
                      options={this.getChapters()}
                      placeholderName={'Chapter'}
                      dropdownIndicator={{ DropdownIndicator }}
                    />
                  </div>
                </div>
              </Card.Header>
              <SingleStudentPractiseHistorySectionTable
                stateData={this.state}
                mobile={this.props.mobile}
                subjects={this.props.subjects} />
            </Card>
          </Col>

        </Row>

      </div>
    )
  }
}


export default withRouter(SingleStudentPractiseHistorySection);
