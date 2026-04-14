import React, { Component, Suspense } from 'react'
import { Row, Col, Nav, Card, CardGroup, ListGroup, Image, Tab, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { components } from 'react-select'
import SelectDropDown from '../selectdropdown/SelectDropDown'

import ExamDataTable from './ExamDataTable';
import ErrorSkippedTable from './ErrorSkippedTable';
import QuestionTypeDataTable from './QuestionTypeDataTable';
import TimeManagementDataTable from './TimeManagementDataTable';
import TheoryDataTable from './TheoryDataTable';
import StudentData from './StudentData';
import ErrorSkippedModalSection from "./ErrorSkippedModalSection";
import './_home.scss'
import DateBlock from './DateBlock';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter, Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
const StudentScoreRangeChart = React.lazy(() => import('./StudentScoreRangeChart'));
const GET_DASHBOARDDATA = gql`
 query($params: DashboardInput) {
    getDashboardData(params: $params) {
        avg_score_top
        avg_score_bottom
        skipped_questions
        error_questions
        most_error_questions
        subject_avg_scores{
            id
            subject
            top
            bottom
        }
        exam{
            id
            section_name
            no_of_student
            total_students
            exam_table_data{
                subject
                avg_score_cnt
                below_score_cnt
                above_score_cnt
                accuracy
            }
        }
        error_skipped{
            id
            section_name
            exam_skipped_data{
                subject
                error_skipped
                error
                skipped
                total
            }
        }
        question_type{
            id
            section_name
            qtype_data{
                questiontype
                error_skipped
                error
                skipped
                total
            }
        }
        question_type_values{
            questiontype
            accuracy
        }
        time{
            id
            section_name
            time_data{
                complexity
                less_time
                in_time
                over_time
                total
            }
        }
        time_values{
            less_time
            in_time
            over_time
        }
        question_theory{
            id
            section_name
            qtheory_data{
                question_theory
                error_skipped
                error
                skipped
                total
            }
        }
        question_theory_values{
            question_theory
            error
            skipped
        }
           
          }
        }
`;
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};



class HomeSectionExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            filtertype: ""
        }
    }
    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" className="text-theme"><i className="far fa-eye" /></Button>
                {/* <Button variant="link" className="text-theme"><i className="far fa-edit"/></Button>
                <Button variant="link" className="text-danger"><i className="far fa-trash-alt"/></Button> */}
            </div>
        );
    }
    actionsFormatter2(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="text-link">
                <Link
                    className="text-dark" to={{
                        pathname: "/home/student-profile",
                        state: {
                            row: row,
                            rowIndex: rowIndex,

                        }
                    }}>{row['student_name']}</Link>
            </div>
        );
    }



    getSections() {
        let newArray = [];
        let sections = [];
        if (this.props.stateData.eexamptype != 0 || this.props.stateData.ebranch.length > 0 || this.props.stateData.ecategory.length > 0) {


            sections = this.props.globals.globalSections;
            if (this.props.stateData.eexamptype != "0") {
                sections = sections.filter((item) => item.exam_id == this.props.stateData.eexamptype || item.exam_id == "5");
            }
            if (this.props.stateData.ebranch.length > 0) {
                let find = sections.find((item) => this.props.stateData.ebranch.includes(item.branch_id.toString()));
                //if (find != undefined) {
                sections = sections.filter((item) => this.props.stateData.ebranch.includes(item.branch_id.toString()));
                //}
            }
            if (this.props.stateData.ecategory.length > 0) {
                let find = sections.find((item) => this.props.stateData.ecategory.includes(item.category_id.toString()));
                //if (find != undefined) {
                sections = sections.filter((item) => this.props.stateData.ecategory.includes(item.category_id.toString()));
                // }
            }
        }
        console.log("sectionssections", sections);
        sections.map((secmap) => {
            if (secmap != undefined) {
                if (this.props.stateData.esection != secmap.id) {
                    const newObj = {
                        value: secmap.id,
                        label: secmap.section_name
                    }
                    newArray.push(newObj);
                }


            }
        })
        if (newArray.length > 0) {
            if (this.props.stateData.esection != "0") {
                const newObj1 = {
                    value: "0",
                    label: "Select"
                }
                newArray.unshift(newObj1);
            }

        }

        return newArray;

    }

    getetestname() {
        let newArray = [];
        console.log("propstestNames", this.props.globals.testNames, this.props.stateData.startDate, this.props.stateData.endDate);
        let stimestamp = moment(this.props.stateData.startDate, "MMM DD YYYY hh:mm:ss").unix();
        let etimestamp = moment(this.props.stateData.endDate, "MMM DD YYYY hh:mm:ss").unix();
        //console.log("stimestamp", stimestamp, moment.unix(stimestamp).format("MMM DD YYYY hh:mm:ss"));
        if (this.props.stateData.etesttype.length > 0 && this.props.stateData.eexamptype != 0) {
            if (this.props.stateData.etestname != 0) {
                const newObj1 = {
                    value: "0",
                    label: "Select All"
                }
                newArray.push(newObj1);
            }

            this.props.globals.testNames.map((item) => {
                if (this.props.stateData.etestname != item.id) {
                    this.props.stateData.etesttype.map((item2) => {
                        if (item2 == item.type
                            && item.exam_type == this.props.stateData.eexamptype
                            || item.exam_type == "5"
                        ) {
                            if (item != undefined) {
                                if (item.start_time <= etimestamp && item.end_time >= stimestamp) {
                                    let ename = "";
                                    if (item.is_completed == true) {
                                        ename = item.exam_name + " " + "(completed)";
                                    }
                                    else {
                                        ename = item.exam_name + " " + "(ongoing)";
                                    }

                                    const newObj = {
                                        value: item.id,
                                        label: ename,
                                        start_time: item.start_time
                                    }
                                    newArray.push(newObj);
                                }

                            }
                        }
                    })
                }



            })
        }
        newArray = newArray.sort((a, b) => {
            let nameA = a.start_time
            let nameB = b.start_time
            console.log("sort", nameA, nameB);
            if (nameB < nameA) {
                return -1;
            }
            if (nameB > nameA) {
                return 1;
            } // names must be equal
            return 0;
        })
        console.log("getetestname", newArray);
        return newArray;
    }
    getexamtypes() {
        let newArray = [];
        this.props.globals.exams.map((item) => {
            if (item != undefined) {
                if (item.id != "5" && this.props.stateData.eexamptype != item.id) {
                    const newObj = {
                        value: item.id,
                        label: item.exam
                    }
                    newArray.push(newObj);
                }

            }

        })

        return newArray;
    }
    getRegion() {
        let newArray = [];
        this.props.globals.regions.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.region
                }
                newArray.push(newObj);
            }

        })

        return newArray;
    }
    getCluster() {
        let newArray = [];
        console.log("this.props.stateData.eregion", this.props.stateData.eregion);
        if (this.props.stateData.eregion.length > 0) {
            const newObj1 = {
                value: "0",
                label: "Select"
            }
            newArray.push(newObj1);
            this.props.globals.cities.map((item) => {
                this.props.stateData.eregion.map((item2) => {
                    if (item2 == item.region_id) {
                        if (item != undefined) {
                            const newObj = {
                                value: item.id,
                                label: item.city_name
                            }
                            newArray.push(newObj);
                        }
                    }
                })


            })
        }
        return newArray;
    }
    getDtype() {
        let newArray = [];
        if (this.props.stateData.dtype == "2") {
            newArray = [{
                value: "1",
                label: "Practice"
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
    filterFun = (type) => {
        this.setState({
            filtertype: type
        });
    }
    render() {
        const getDashboardData = this.props.getDashboardData;
        const loading1 = getDashboardData.loading;
        const error1 = getDashboardData.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        const dashBoardData = getDashboardData.getDashboardData;

        //start get test data
        let testnewArray = [];
        this.props.globals.testTypes.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.type,
                }
                testnewArray.push(newObj);
            }

        })
        let testselectall = true;
        let testlabelledBy = "Select";
        let testdisableSearch = false;
        if (testnewArray.length > 0) {
            testselectall = true;
            testdisableSearch = false;
        }
        else {
            testdisableSearch = true;
            testselectall = false;
            testlabelledBy = "No Options"
        }
        //end get test data

        //start get class data
        let classnewArray = [];
        this.props.globals.classes.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.class
                }
                classnewArray.push(newObj);

            }

        })

        let classselectall = true;
        let classlabelledBy = "Select";
        let classdisableSearch = false;
        if (classnewArray.length > 0) {
            classselectall = true;
            classdisableSearch = false;
        }
        else {
            classdisableSearch = true;
            classselectall = false;
            classlabelledBy = "No Options"
        }
        //end get class data

        //start get category data
        let categorynewArray = [];
        if (this.props.stateData.eexamptype != 0) {
            this.props.globals.globalCategories.map((item) => {
                if (item.exam_id == this.props.stateData.eexamptype || item.exam_id == "5") {
                    const newObj = {
                        value: item.id,
                        label: item.category_name
                    }
                    categorynewArray.push(newObj);
                }

            })
        }
        let categoryselectall = true;
        let categorylabelledBy = "Select";
        let categorydisableSearch = false;
        if (categorynewArray.length > 0) {
            categoryselectall = true;
            categorydisableSearch = false;
        }
        else {
            categorydisableSearch = true;
            categoryselectall = false;
            categorylabelledBy = "No Options"
        }
        //end get category data

        //strat get location data

        let locationnewArray = [];
        this.props.globals.organisationDropdown.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.group_name
                }
                locationnewArray.push(newObj);
            }

        })

        let locationselectall = true;
        let locationlabelledBy = "Select";
        let locationdisableSearch = false;
        if (locationnewArray.length > 0) {
            locationselectall = true;
            locationdisableSearch = false;
        }
        else {
            locationselectall = false;
            locationlabelledBy = "No Options";
            locationdisableSearch = true;
        }
        //end get location data

        //start get braches data

        let branchnewArray = [];
        this.props.globals.globalBranches.map((item) => {
            let exam_idf = item.exam_id.split(",");
            console.log("exam_idf", exam_idf, item.branch_name, this.props.stateData.eexamptype);
            if (exam_idf.length > 0) {

                exam_idf.map((fmap) => {
                    if (fmap == this.props.stateData.eexamptype) {
                        if (this.props.stateData.elocation.length > 0) {

                            this.props.stateData.elocation.map((lmap) => {
                                if (lmap == item.organisation_structure_id) {
                                    const newObj = {
                                        value: item.id,
                                        label: item.branch_name
                                    }
                                    branchnewArray.push(newObj);
                                }
                            })
                        }
                        else {
                            if (item != undefined) {
                                const newObj = {
                                    value: item.id,
                                    label: item.branch_name
                                }
                                branchnewArray.push(newObj);

                            }
                        }

                    }
                    else if (fmap == 5) {
                        if (this.props.stateData.elocation.length > 0) {

                            this.props.stateData.elocation.map((lmap) => {
                                if (lmap == item.organisation_structure_id) {
                                    const newObj = {
                                        value: item.id,
                                        label: item.branch_name
                                    }
                                    branchnewArray.push(newObj);
                                }
                            })
                        }
                        else {
                            if (item != undefined) {
                                const newObj = {
                                    value: item.id,
                                    label: item.branch_name
                                }
                                branchnewArray.push(newObj);

                            }
                        }

                    }

                });





            }


        })

        let branchselectall = true;
        let branchlabelledBy = "Select";
        let branchdisableSearch = false;
        if (branchnewArray.length > 0) {
            branchselectall = true;
            branchdisableSearch = false;
        }
        else {
            branchselectall = false;
            branchlabelledBy = "No Options";
            branchdisableSearch = true;
        }

        //end get braches data
        if (loading1) {
            return (
                <div className="home_section">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex align-items-center justify-content-between">
                                <h2 className="title h5 mb-0">Monitoring Dashboard</h2>
                                <div className="filter-block d-flex align-items-center">
                                    <Form.Group className="customDate mb-0 mr-2" controlId="StartDate" style={{ width: 180 }}>

                                        <SelectDropDown
                                            stateData={this.props.stateData.dtypeValue}
                                            handleChange={this.props.selecthandleInputChange}
                                            name="dtype"
                                            options={this.getDtype()}
                                            placeholderName={'Sections'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />

                                    </Form.Group>
                                    <DateBlock applyCallback={this.props.applyCallback}
                                        stateData={this.props.stateData}
                                    />
                                </div>
                            </div>
                            <Card className="filter my-3">
                                <Card.Header className="bg-white">
                                    <h6 className="mb-0">Filter</h6>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Exam</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.eexamptypeValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="eexamptype"
                                                    options={this.getexamtypes()}
                                                    placeholderName={'Exam Type'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Test</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Tests are selected.",
                                                        "selectSomeItems": testlabelledBy
                                                    }
                                                    }
                                                    disableSearch={testdisableSearch}
                                                    hasSelectAll={testselectall}
                                                    options={testnewArray}
                                                    value={this.props.stateData.etesttypevalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "etesttype")}
                                                    labelledBy={"Select"}
                                                />

                                            </Form.Group>
                                            {this.props.stateData.etesttype.length > 0 ? (<Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Test Name</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.etestnameValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="etestname"
                                                    options={this.getetestname()}
                                                    placeholderName={'Test Name'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>) : ("")}

                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Class</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All classes are selected.",
                                                        "selectSomeItems": classlabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={classselectall}
                                                    options={classnewArray}
                                                    disableSearch={classdisableSearch}
                                                    value={this.props.stateData.eclassvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "eclass")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Category</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Categories are selected.",
                                                        "selectSomeItems": categorylabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={categoryselectall}
                                                    options={categorynewArray}
                                                    disableSearch={categorydisableSearch}
                                                    value={this.props.stateData.ecategoryvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ecategory")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Location Level</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Locations are selected.",
                                                        "selectSomeItems": locationlabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={locationselectall}
                                                    options={locationnewArray}
                                                    disableSearch={locationdisableSearch}
                                                    value={this.props.stateData.elocationvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "elocation")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            {/* <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Region</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Regions are selected."
                                                    }
                                                    }
                                                    options={this.getRegion()}
                                                    value={this.props.stateData.eregionvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "eregion")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            {this.props.stateData.eregion.length > 0 ? (<Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Cluster</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Clusters are selected."
                                                    }
                                                    }
                                                    options={this.getCluster()}
                                                    value={this.props.stateData.eclustervalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ecluster")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>) : ("")} */}

                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Branch</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Branches are selected.",
                                                        "selectSomeItems": branchlabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={branchselectall}
                                                    options={branchnewArray}
                                                    disableSearch={branchdisableSearch}
                                                    value={this.props.stateData.ebranchvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ebranch")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Sections</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.esectionValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="esection"
                                                    options={this.getSections()}
                                                    placeholderName={'Section'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card as={Card.Body} className="justify-content-center flex-row">
                                <div class="spinner-border text-primary text-center"></div>
                            </Card>
                        </Col>
                    </Row>

                </div>
            )
        }
        else {
            return (
                <div className="home_section">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex align-items-center justify-content-between">
                                <h2 className="title h5 mb-0">Monitoring Dashboard</h2>
                                <div className="filter-block d-flex align-items-center">
                                    <Form.Group className="customDate mb-0 mr-2" controlId="StartDate" style={{ width: 180 }}>

                                        <SelectDropDown
                                            stateData={this.props.stateData.dtypeValue}
                                            handleChange={this.props.selecthandleInputChange}
                                            name="dtype"
                                            options={this.getDtype()}
                                            placeholderName={'Sections'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />

                                    </Form.Group>
                                    <DateBlock applyCallback={this.props.applyCallback}
                                        stateData={this.props.stateData}
                                    />
                                </div>
                            </div>
                            <Card className="filter my-3">
                                <Card.Header className="bg-white">
                                    <h6 className="mb-0">Filter</h6>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Exam</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.eexamptypeValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="eexamptype"
                                                    options={this.getexamtypes()}
                                                    placeholderName={'Exam Type'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Test</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Tests are selected.",
                                                        "selectSomeItems": testlabelledBy
                                                    }
                                                    }
                                                    disableSearch={testdisableSearch}
                                                    hasSelectAll={testselectall}
                                                    options={testnewArray}
                                                    value={this.props.stateData.etesttypevalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "etesttype")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            {this.props.stateData.etesttype.length > 0 ? (<Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Test Name</Form.Label>

                                                <SelectDropDown
                                                    stateData={this.props.stateData.etestnameValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="etestname"
                                                    options={this.getetestname()}
                                                    placeholderName={'Test Name'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>) : ("")}

                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Class</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All classes are selected.",
                                                        "selectSomeItems": classlabelledBy
                                                    }
                                                    }
                                                    disableSearch={classdisableSearch}
                                                    hasSelectAll={classselectall}
                                                    options={classnewArray}
                                                    value={this.props.stateData.eclassvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "eclass")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Category</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Categories are selected.",
                                                        "selectSomeItems": categorylabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={categoryselectall}
                                                    options={categorynewArray}
                                                    disableSearch={categorydisableSearch}
                                                    value={this.props.stateData.ecategoryvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ecategory")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Location Level</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Locations are selected.",
                                                        "selectSomeItems": locationlabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={locationselectall}
                                                    options={locationnewArray}
                                                    disableSearch={locationdisableSearch}
                                                    value={this.props.stateData.elocationvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "elocation")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            {/* <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Region</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Regions are selected."
                                                    }
                                                    }
                                                    options={this.getRegion()}
                                                    value={this.props.stateData.eregionvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "eregion")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            {this.props.stateData.eregion.length > 0 ? (<Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Cluster</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Clusters are selected."
                                                    }
                                                    }
                                                    options={this.getCluster()}
                                                    value={this.props.stateData.eclustervalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ecluster")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>) : ("")} */}

                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Branch</Form.Label>
                                                <MultiSelect
                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Branches are selected.",
                                                        "selectSomeItems": branchlabelledBy
                                                    }
                                                    }
                                                    hasSelectAll={branchselectall}
                                                    options={branchnewArray}
                                                    disableSearch={branchdisableSearch}
                                                    value={this.props.stateData.ebranchvalue}
                                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "ebranch")}
                                                    labelledBy={"Select"}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={3} lg={3} md={6} sm={6} xs={12} controlId="SelectExam">
                                                <Form.Label>Sections</Form.Label>
                                                <SelectDropDown
                                                    stateData={this.props.stateData.esectionValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="esection"
                                                    options={this.getSections()}
                                                    placeholderName={'Section'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className="students-appeared-range my-3">
                                <Card.Header className="bg-white">
                                    <Row className="align-items-center">
                                        <Col xl={9} lg={9} md={7} sm={7} xs={7}>
                                            <h6 className="mb-0">No of Students appeared vs score range</h6>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="p-1">
                                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                                        <StudentScoreRangeChart stateData={this.props.stateData} />
                                    </Suspense>

                                </Card.Body>
                            </Card>

                            <Card className="score-status my-3">
                                <Card.Body className="p-2">
                                    <Row className="align-items-center">
                                        <Col xl={3} lg={12} md={12} sm={12} xs={12}>
                                            <div className="my-2 single d-flex justify-content-between algin-items-center">
                                                <div className="d-flex">
                                                    <Image src={require('../../../images/positive.png')} width="20" height="20" alt="img" />
                                                    <h6 className="subjectName ml-2">Avg. Score</h6>
                                                </div>
                                                <h6 className="status-counts mr-2">
                                                    <span className="nor">{dashBoardData.avg_score_top}</span>/{dashBoardData.avg_score_bottom}
                                                    <small className="ml-2">{Math.round(parseInt(dashBoardData.avg_score_top / dashBoardData.avg_score_bottom * 100))}%</small></h6>
                                            </div>
                                        </Col>
                                        <Col xl={9} lg={12} md={12} sm={12} xs={12}>
                                            <Row className="status-block">
                                                {dashBoardData.subject_avg_scores.map((item) => (
                                                    <Col xl={3} lg={6} md={6} sm={6} xs={12}>
                                                        <div className="my-2 single d-flex justify-content-between algin-items-center">
                                                            <h6 className="subjectName">{item.subject}</h6>
                                                            <h6 className="status-counts"><span className="nor">{item.top}</span>/{item.bottom}<small className="ml-2">{Math.round(parseInt(item.top / item.bottom * 100))}%</small></h6>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <ErrorSkippedModalSection
                                stateData={this.props.stateData}
                                eexamptype={this.props.stateData.eexamptype}
                                dashBoardData={dashBoardData} />

                        </Col>

                        <Col xl={12} lg={12} md={12} sm={12} className="studentExamtable my-3">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Card className="tab-card">
                                    <Card.Header className="bg-white py-0">
                                        <Nav variant="pills nav-fill bg-white" className="flex-row">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Exam</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Error - Skipped</Nav.Link>
                                            </Nav.Item>
                                            {/* <Nav.Item>
                                                    <Nav.Link eventKey="third">Most Error &amp; Skipped</Nav.Link>
                                                </Nav.Item> */}
                                            <Nav.Item>
                                                <Nav.Link eventKey="four">Type Of Questions</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="five">Time Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="six">Question Theory</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body className="bg-white px-0 pb-0 pt-2 border-top">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first" >
                                                {dashBoardData.exam != undefined ? (<ExamDataTable
                                                    examdata={dashBoardData.exam} />) : ("")}

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                {dashBoardData.error_skipped != undefined ? (<ErrorSkippedTable
                                                    errorskippeddata={dashBoardData.error_skipped} />) : ("")}

                                            </Tab.Pane>
                                            {/* <Tab.Pane eventKey="third">
                                                    <ExamDataTable
                                                        examdata={dashBoardData.exam} />
                                                </Tab.Pane> */}
                                            <Tab.Pane eventKey="four" className="customlargetable">
                                                <CardGroup className="m-4">
                                                    <Card>
                                                        <Card.Header className="bg-white d-flex justify-content-between align-items-center mb-0">
                                                            <p>Types</p>
                                                            <p className="font-weight-bold">Accuracy</p>
                                                        </Card.Header>
                                                        <Card.Body className="p-0">
                                                            <ListGroup variant="flush">
                                                                {dashBoardData.question_type_values.map((item, index) => {
                                                                    if (index < 5) {
                                                                        return (
                                                                            <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center">
                                                                                <p>{item.questiontype}</p>
                                                                                <p className="font-weight-bold">{item.accuracy}%</p>
                                                                            </ListGroup.Item>
                                                                        );
                                                                    }
                                                                })}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header className="bg-white d-flex justify-content-between align-items-center mb-0">
                                                            <p>Types</p>
                                                            <p className="font-weight-bold">Accuracy</p>
                                                        </Card.Header>
                                                        <Card.Body className="p-0">
                                                            <ListGroup variant="flush">
                                                                {dashBoardData.question_type_values.map((item, index) => {
                                                                    if (index >= 5 && index < 10) {
                                                                        return (
                                                                            <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center">
                                                                                <p>{item.questiontype}</p>
                                                                                <p className="font-weight-bold">{item.accuracy}%</p>
                                                                            </ListGroup.Item>
                                                                        );
                                                                    }
                                                                })}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header className="bg-white d-flex justify-content-between align-items-center mb-0">
                                                            <p>Types</p>
                                                            <p className="font-weight-bold">Accuracy</p>
                                                        </Card.Header>
                                                        <Card.Body className="p-0">
                                                            <ListGroup variant="flush">
                                                                {dashBoardData.question_type_values.map((item, index) => {
                                                                    if (index >= 10 && index < 15) {
                                                                        return (
                                                                            <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center">
                                                                                <p>{item.questiontype}</p>
                                                                                <p className="font-weight-bold">{item.accuracy}%</p>
                                                                            </ListGroup.Item>
                                                                        );
                                                                    }
                                                                })}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card>
                                                        <Card.Header className="bg-white d-flex justify-content-between align-items-center mb-0">
                                                            <p>Types</p>
                                                            <p className="font-weight-bold">Accuracy</p>
                                                        </Card.Header>
                                                        <Card.Body className="p-0">
                                                            <ListGroup variant="flush">
                                                                {dashBoardData.question_type_values.map((item, index) => {
                                                                    if (index >= 15 && index < 20) {
                                                                        return (
                                                                            <ListGroup.Item className="border-0 d-flex justify-content-between align-items-center">
                                                                                <p>{item.questiontype}</p>
                                                                                <p className="font-weight-bold">{item.accuracy}%</p>
                                                                            </ListGroup.Item>
                                                                        );
                                                                    }
                                                                })}
                                                            </ListGroup>
                                                        </Card.Body>
                                                    </Card>
                                                </CardGroup>
                                                {dashBoardData.question_type != undefined ? (<QuestionTypeDataTable
                                                    questiontypeData={dashBoardData.question_type} />) : ("")}

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="five">
                                                <Row className="mx-4 my-2 time-quentity">
                                                    <Col xl={4} lg={4} md={12}>
                                                        <Card as={Card.Body} className="my-3">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="far fa-stopwatch text-success" />
                                                                    <p className="mb-0 ml-2">Less Time</p>
                                                                </div>
                                                                <p className="font-weight-bold">{dashBoardData.time_values.less_time}%</p>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12}>
                                                        <Card as={Card.Body} className="my-3">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="far fa-clock text-success" />
                                                                    <p className="mb-0 ml-2">In Time</p>
                                                                </div>
                                                                <p className="font-weight-bold">{dashBoardData.time_values.in_time}%</p>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12}>
                                                        <Card as={Card.Body} className="my-3">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="far fa-history text-success" />
                                                                    <p className="mb-0 ml-2">Over Time</p>
                                                                </div>
                                                                <p className="font-weight-bold">{dashBoardData.time_values.over_time}%</p>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                {dashBoardData.time != undefined ? (<TimeManagementDataTable timeData={dashBoardData.time} />) : ("")}

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="six" className="customsmalltable">
                                                <Row className="mx-4 my-2 question-theory-status">
                                                    {dashBoardData.question_theory_values.map((item) => (
                                                        <Col xl={6} lg={6} md={12}>
                                                            <Card as={Card.Body} className="my-3">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="text-muted">{item.question_theory}</p>
                                                                    <div className="error">
                                                                        <p className="text-muted">Error</p>
                                                                        <p className="font-weight-bold">{item.error}%</p>
                                                                    </div>
                                                                    <div className="skipped">
                                                                        <p className="text-muted">Skipped</p>
                                                                        <p className="font-weight-bold">{item.skipped}%</p>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>

                                                {dashBoardData.question_theory != undefined ? (<TheoryDataTable theoryData={dashBoardData.question_theory} />) : ("")}
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Card>
                            </Tab.Container>
                        </Col>
                        <StudentData
                            stateData={this.props.stateData}
                            Title={this.props.stateData.TableHeaderData.Title}
                        />
                    </Row>

                </div>
            )
        }




    }
}

export default withRouter(
    compose(
        graphql(
            GET_DASHBOARDDATA,
            {
                options: props => ({
                    variables: {
                        params: {
                            exam_id: parseInt(props.stateData.eexamptype),
                            test: props.stateData.etesttype.toString(),
                            test_names: props.stateData.etestname,
                            class_ids: props.stateData.eclass.toString(),
                            category_ids: props.stateData.ecategory.toString(),
                            location_levels: props.stateData.elocation.toString(),
                            region_ids: props.stateData.eregion.toString(),
                            clusters: props.stateData.ecluster.toString(),
                            branch_ids: props.stateData.ebranch.toString(),
                            section_ids: props.stateData.esection,
                            start_time: props.stateData.startDate,
                            end_time: props.stateData.endDate,
                            institution_id: parseInt(Cookies.get("institutionid")),
                            username: Cookies.get("username")
                        }
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "getDashboardData"
            }
        )
    )(HomeSectionExam)
);
