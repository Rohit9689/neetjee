import React, { Component } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { components } from 'react-select'
import SelectDropDown from '../selectdropdown/SelectDropDown'
import MainLineChartForHome from './MainLineChartForHome';
import moment from "moment";
import './_home.scss';
import DateBlock from './DateBlock';
import { withRouter } from "react-router-dom";
import HomeStudentResult from "../../components/questioners/manage_questin_papers/HomeStudentResult";

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};



class HomeSection extends Component {
    constructor(props) {
        super(props)
        // let start = moment(new Date())
        //   .subtract(5, "days");
        console.log("Home", this.props.globals);
        let start = moment(new Date()).subtract(1, "week");
        let end = moment(new Date());
    
        let sdate = String(start._d);
        var sres = sdate.substr(4, 11);
    
        let edate = String(end._d);
        var eres = edate.substr(4, 20);
    
        let startDate = sres +" 00:00:00";
        let endDate = eres;
    
        this.state = {
          etesttype: "",
          etesttypeValue: "",
    
          eclass: "",
          eclassValue: "",
    
          ecategory: "",
          ecategoryValue: "",
    
          eregion: "",
          eregionValue: "",
    
          ecluster: "",
          eclusterValue: "",
    
          elocation: "",
          elocationValue: "",
    
          ebranch: "",
          ebranchValue: "",
          esection: "0",
          esectionValue: "",
          etestname: "0",
          etestnameValue: "",
          eexamptype: props.globals.exams[0].id,
          eexamptypeValue: { value: props.globals.exams[0].id, label: this.props.globals.exams[0].exam },
          dtypeValue: { value: "1", label: "Practice" },
          dtype: "1",
          branchValue: "",
          branch: "0",
          sectionValue: "",
          section: "0",
          examtype: props.globals.exams[0].id,
          examtypeValue: { value: props.globals.exams[0].id, label: this.props.globals.exams[0].exam },
          class: "0",
          classValue: "",
          studentData: "",
          practise: "1",
          practiseValue: { value: "2", label: "Value" },
    
          BreadcrumbData: {
            Title: 'Monitoring Dashboard'
          },
          TableHeaderData: {
            Title: 'Students'
          },
          timeseries: 1,
          startDate: startDate,
          endDate: endDate,
    
        }
      }
    //parent functions
    handleMultipleSelectInputChange = (e, name) => {
        console.log("handleMultipleSelectInputChange", e, name);
        if (name == "etesttype") {
          let etesttype = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const etesttypeval = e[i];
              etesttype.push(etesttypeval.value);
            }
            this.setState({
              etesttype: etesttype
            });
          }
        }
        else if (name == "etestname") {
          let etestname = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const etestnameval = e[i];
              etestname.push(etestnameval.value);
            }
            this.setState({
              etestname: etestname
            });
          }
        }
        else if (name == "eclass") {
          let eclass = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const eclassval = e[i];
              eclass.push(eclassval.value);
            }
            this.setState({
              eclass: eclass
            });
          }
        }
        else if (name == "ecategory") {
          console.log("ecategory");
          let ecategory = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const ecategoryval = e[i];
              ecategory.push(ecategoryval.value);
            }
            this.setState({
              ecategory: ecategory
            });
          }
        }
        else if (name == "elocation") {
          let elocation = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const elocationval = e[i];
              elocation.push(elocationval.value);
            }
            this.setState({
              elocation: elocation
            });
          }
        }
        else if (name == "eregion") {
          let eregion = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const eregionval = e[i];
              eregion.push(eregionval.value);
            }
            this.setState({
              eregion: eregion
            });
          }
        }
        else if (name == "ecluster") {
          let ecluster = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const eclusterval = e[i];
              ecluster.push(eclusterval.value);
            }
            this.setState({
              ecluster: ecluster
            });
          }
        }
        else if (name == "ebranch") {
          let ebranch = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const ebranchval = e[i];
              ebranch.push(ebranchval.value);
            }
            this.setState({
              ebranch: ebranch
            });
          }
        }
        else if (name == "esection") {
          let esection = Array();
          if (e != null) {
            for (let i = 0; i < e.length; i++) {
              const esectionval = e[i];
              esection.push(esectionval.value);
            }
            this.setState({
              esection: esection
            });
          }
        }
    
      };
      selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        if (name == "branch") {
          if (value != "0") {
            let branchData = this.props.globals.globalBranches.find((a) => a.id == value);
            this.setState({
              branchValue: {
                value: branchData.id,
                label: branchData.branch_name
              },
              section: "0",
              sectionValue: ""
            });
          } else {
            this.setState({
              branchValue: {
                value: "0",
                label: "Select"
              },
              section: "0",
              sectionValue: ""
            });
          }
    
        }
    
        if (name == "ebranch") {
          if (value != "0") {
            let ebranchData = this.props.globals.globalBranches.find((a) => a.id == value);
            this.setState({
              ebranchValue: {
                value: ebranchData.id,
                label: ebranchData.branch_name
              }
            });
          } else {
            this.setState({
              ebranchValue: {
                value: "0",
                label: "Select"
              }
            });
          }
    
        }
        if (name == "section") {
          if (value != "0") {
            let sectionData = this.props.globals.globalSections.find((a) => a.id == value);
            this.setState({
              sectionValue: {
                value: sectionData.id,
                label: sectionData.section_name
              }
            });
          } else {
            this.setState({
              sectionValue: {
                value: "0",
                label: "Select"
              }
            });
          }
    
        }
        if (name == "esection") {
          if (value != "0") {
            let esectionData = this.props.globals.globalSections.find((a) => a.id == value);
            this.setState({
              esectionValue: {
                value: esectionData.id,
                label: esectionData.section_name
              }
            });
          } else {
            this.setState({
              esectionValue: {
                value: "0",
                label: "Select"
              }
            });
          }
    
        }
    
        if (name == "etestname") {
          if (value != "0") {
            let etestnameData = this.props.globals.testNames.find((a) => a.id == value);
            this.setState({
              etestnameValue: {
                value: etestnameData.id,
                label: etestnameData.exam_name
              }
            });
          } else {
            this.setState({
              etestnameValue: {
                value: "0",
                label: "Select"
              }
            });
          }
    
        }
    
        if (name == "etesttype") {
          if (value != "0") {
            let etesttypeData = this.props.globals.testTypes.find((a) => a.id == value);
            this.setState({
              etesttypeValue: {
                value: etesttypeData.id,
                label: etesttypeData.type
              }
            });
          } else {
            this.setState({
              etesttypeValue: {
                value: "0",
                label: "Select"
              }
            });
          }
    
        }
        if (name == "eclass") {
          if (value != "0") {
            let eclassData = this.props.globals.classes.find((a) => a.id == value);
            this.setState({
              eclassValue: {
                value: eclassData.id,
                label: eclassData.class
              }
            });
          }
          else {
            this.setState({
              eclassValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
    
        if (name == "ecategory") {
          if (value != "0") {
            let ecategoryData = this.props.globals.globalCategories.find((a) => a.id == value);
            this.setState({
              ecategoryValue: {
                value: ecategoryData.id,
                label: ecategoryData.category_name
              }
            });
          }
          else {
            this.setState({
              ecategoryValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
    
        if (name == "elocation") {
          if (value != "0") {
            let elocationData = this.props.globals.organisationDropdown.find((a) => a.id == value);
            this.setState({
              elocationValue: {
                value: elocationData.id,
                label: elocationData.group_name
              }
            });
          }
          else {
            this.setState({
              elocationValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
    
        if (name == "eregion") {
          if (value != "0") {
            let eregionData = this.props.globals.regions.find((a) => a.id == value);
            this.setState({
              eregionValue: {
                value: eregionData.id,
                label: eregionData.region
              }
            });
          }
          else {
            this.setState({
              eregionValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
        if (name == "ecluster") {
          if (value != "0") {
            let eclusterData = this.props.globals.cities.find((a) => a.id == value);
            this.setState({
              eclusterValue: {
                value: eclusterData.id,
                label: eclusterData.city_name
              }
            });
          }
          else {
            this.setState({
              eclusterValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
        if (name == "class") {
          if (value != "0") {
            let classData = this.props.globals.classes.find((a) => a.id == value);
            this.setState({
              classValue: {
                value: classData.id,
                label: classData.class
              }
            });
          }
          else {
            this.setState({
              classValue: {
                value: "0",
                label: "Select"
              }
            });
          }
        }
    
        if (name == "eexamptype") {
          let eexamptypeData = this.props.globals.exams.find((a) => a.id == value);
          this.setState({
            eexamptypeValue: {
              value: eexamptypeData.id,
              label: eexamptypeData.exam
            }
          });
        }
        if (name == "examtype") {
          let examtypeData = this.props.globals.exams.find((a) => a.id == value);
          this.setState({
            examtypeValue: {
              value: examtypeData.id,
              label: examtypeData.exam
            }
          });
        }
        if (name == "practise") {
          if (value == "1") {
            this.setState({
              practiseValue: {
                value: value,
                label: "Value"
              }
            });
          }
          else {
            this.setState({
              practiseValue: {
                value: value,
                label: "Percentage"
              }
            });
          }
    
        }
    
        if (name == "dtype") {
          if (value == "1") {
            this.setState({
              dtypeValue: {
                value: value,
                label: "Practice"
              }
            });
          }
          else {
           
            //this.props.history.push("/home-exam");
            this.props.history.push({
              pathname:"/home-exam", 
              state:{
                globals:this.props.globals.testTypes,
                examsglobals:this.props.globals.exams
    
            }});
          }
    
        }
        this.setState({ [name]: value });
      }
      applyCallback = (startDate, endDate) => {
        console.log("applyCallback", startDate, endDate);
        let sdate = String(startDate._d);
        var sres = sdate.substr(4, 20);
    
        let edate = String(endDate._d);
        var eres = edate.substr(4, 20);
        this.setState({
          startDate: sres,
          endDate: eres
        });
      }
    //end parent functons
    getSections() {
        let newArray = [];
        if (this.state.branch != "0") {

            const newObj1 = {
                value: "0",
                label: "Select"
            }
            newArray.push(newObj1);
            //console.log("this.state.branch", item.branch_id, this.state.branch);
            this.props.globals.globalSections.map((item) => {
                console.log("this.state.branch", item.branch_id, this.state.branch);
                if (item != undefined) {
                    if (item.branch_id == this.state.branch
                        && item.exam_id == this.state.examtype) {
                        const newObj = {
                            value: item.id,
                            label: item.section_name
                        }
                        newArray.push(newObj);
                    }



                }

            })
        }

        return newArray;

    }
    getBranches() {
        let newArray = [];
        let branchArray = [];
        const newObj1 = {
            value: "0",
            label: "Select"
        }
        newArray.push(newObj1);

        this.props.globals.globalSections.map((item) => {
            if (item != undefined) {
                if (item.exam_id == this.state.examtype) {
                    branchArray.push(item.branch_id);
                }
            }

        })
        // this.props.globals.globalBranches.map((item) => {
        //     if (item.section_count != 0) {
        //         const newObj = {
        //             value: item.id,
        //             label: item.branch_name
        //         }
        //         newArray.push(newObj);

        //     }

        // })
        console.log("branchArraycount", branchArray);
        let uniq = [...new Set(branchArray)];
        console.log("uniq", uniq);
        uniq.map((bitem) => {
            let find = this.props.globals.globalBranches.find((a) => a.id == bitem);
            if (find != undefined) {
                const newObj = {
                    value: find.id,
                    label: find.branch_name
                }
                newArray.push(newObj);
            }

        });
        console.log("newArray1234", newArray);
        return newArray;

    }
    getClasses() {
        let newArray = [];
        const newObj1 = {
            value: "0",
            label: "Select"
        }
        newArray.push(newObj1);
        this.props.globals.classes.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.class
                }
                newArray.push(newObj);

            }

        })
        return newArray;
    }


    getexamtypes() {
        let newArray = [];
        console.log("getexamtypesgetexamtypes", this.props.globals.exams);
        this.props.globals.exams.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.exam
                }
                newArray.push(newObj);
            }

        })

        return newArray;
    }

    getDtype() {
        // let newArray = [{
        //     value: "1",
        //     label: "Practice"
        // }, {
        //     value: "2",
        //     label: "Exam"
        // }];
        let newArray = [];
        if (this.state.dtype == "1") {
            newArray = [{
                value: "2",
                label: "Exam"
            }];
        }
        return newArray;
    }
    getPractise() {
        let newArray = [{
            value: "1",
            label: "Value"
        }, {
            value: "2",
            label: "Percentge"
        }];

        return newArray;

    }
    render() {

        return (<div className="home_section">
            <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex align-items-center justify-content-between">
                        <h2 className="title h5 mb-0">Monitoring Dashboard</h2>
                        <div className="filter-block d-flex align-items-cente">
                            <Form.Group className="customDate mb-0 mr-2" controlId="StartDate" style={{ width: 180 }}>

                                <SelectDropDown
                                    stateData={this.state.dtypeValue}
                                    handleChange={this.selecthandleInputChange}
                                    name="dtype"
                                    options={this.getDtype()}
                                    placeholderName={'Sections'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />

                            </Form.Group>
                            <DateBlock applyCallback={this.applyCallback}
                                stateData={this.state}
                            />
                        </div>
                    </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Card className="students-appeared-range my-3">
                        <Card.Header className="bg-white">
                            <Row className="align-items-center">
                                <Col xl={9} lg={9} md={7} sm={7} xs={7}>
                                    <h6 className="mb-0">No of Students appeared vs score range</h6>
                                </Col>
                            </Row>
                        </Card.Header>

                        <MainLineChartForHome
                            stateData={this.state}
                        />

                    </Card>
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} className="studentTable">

                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-white  d-md-flex justify-content-between align-items-center">
                            <Card.Title className="mb-0">Practise(%) Of Students</Card.Title>
                            <div className="split d-flex">
                                <div className="first mr-2" style={{ width: 150 }}>
                                    <SelectDropDown
                                        stateData={this.state.examtypeValue}
                                        handleChange={this.selecthandleInputChange}
                                        name="examtype"
                                        options={this.getexamtypes()}
                                        placeholderName={'Exam Type'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </div>
                                <div className="second mr-2" style={{ width: 150 }}>
                                    <SelectDropDown
                                        stateData={this.state.branchValue}
                                        handleChange={this.selecthandleInputChange}
                                        name="branch"
                                        options={this.getBranches()}
                                        placeholderName={'Branches'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </div>
                                <div className="fourth mr-2" style={{ width: 150 }}>
                                    <SelectDropDown
                                        stateData={this.state.sectionValue}
                                        handleChange={this.selecthandleInputChange}
                                        name="section"
                                        options={this.getSections()}
                                        placeholderName={'Sections'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </div>
                                <div className="third mr-2" style={{ width: 150 }}>
                                    <SelectDropDown
                                        stateData={this.state.classValue}
                                        handleChange={this.selecthandleInputChange}
                                        name="class"
                                        options={this.getClasses()}
                                        placeholderName={'Class'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </div>
                               
                                <div className="fifth" style={{ width: 170 }}>
                                    <SelectDropDown
                                        stateData={this.state.practiseValue}
                                        handleChange={this.selecthandleInputChange}
                                        name="practise"
                                        options={this.getPractise()}
                                        placeholderName={'Sections'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </div>
                            </div>
                        </Card.Header>
                        <HomeStudentResult
                            globals={this.props.globals}
                            stateData={this.state}
                        />
                    </Card>
                </Col>

            </Row>

        </div>
        );



    }
}

export default withRouter((HomeSection));
