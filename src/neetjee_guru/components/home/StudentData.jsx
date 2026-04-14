import React, { Component, useState } from 'react'
import { Col, Card, ListGroup, Image, Tab, Form, Button } from 'react-bootstrap';
import DataTableWithOutSearch from '../datatables/DataTableWithOutSearch';
import CardLessDataTableWithOutSearch from '../datatables/CardLessDataTableWithOutSearch';

import './_home.scss'

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";

const GET_STUDENTTABLE = gql`
 query($params: StudentTableInput) {
    getStudentTable(params: $params) {
        id
        student_name
        contact_no
        exam_id
        branch_id
        class_id
        section_id
        attended
        branchName
        sectionName
        examName
        className
        marks
        accuracy
        exam_rank
        overall_rank
        profile_pic
        subjectMarks{
            subjectId
            subjectName
            subjectMarks
            subjectRank 
        }
        }
        }
`;
class StudentData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtertype: "true"
        }
    }

    filterFun = (type) => {
        // if(type=="download"){

        // }
        // else{
        this.setState({
            filtertype: type
        });
        // }


    }
    tablesectionData(data) {
        console.log("tablesectionData", data);
        let returnArray = [];
        data.map((item) => {

            let newObj = {
                totalData: data,
                student_name: item.student_name,
                exam: item.examName,
                class: item.className,
                section: item.sectionName,
                branch: item.branchName,
                attended: item.attended,
                marks: parseInt(item.marks),
                accuracy: parseInt(item.accuracy),
                examrank: parseInt(item.exam_rank),
                overallrank: parseInt(item.overall_rank),
                branch_id: item.branch_id,
                class_id: item.class_id,
                section_id: item.section_id
            }
            item.subjectMarks.map((item) => {
                const field2 = item.subjectName;
                const field3 = item.subjectName + "-" + "Rank";
                const newObj1 = {
                    ...newObj,
                    [`${field2}`]: parseInt(item.subjectMarks),
                    [`${field3}`]: parseInt(item.subjectRank)

                }

                newObj = newObj1;
            });
            returnArray.push(newObj);


        });
        console.log("returnArray", returnArray);
        return returnArray;
    }
    attendedStatus(cell, row, rowIndex, formatExtraData) {
        if (row.attended == true) {
            return (
                <div>
                    <i className="fal fa-check-circle success" style={{ color: "green" }} />
                </div>
            );
        } else {
            return (
                <div >
                    <i className="fal fa-times-circle" style={{ color: "red" }}></i>
                </div>
            );
        }

    }
    Columns(data) {
        let Columns = [
            {
                dataField: "student_name",
                text: "Student Name ",
                formatter: this.actionsFormatter2
            },

            {
                dataField: "class",
                text: "Class",
            },
            {
                dataField: "section",
                text: "Section",
            },
            {
                dataField: "branch",
                text: "Branch",
            },
            {
                dataField: "attended",
                text: "Attended",
                sort: true,
                formatter: this.attendedStatus
            },
            {
                dataField: "marks",
                text: "Marks",
                sort: true
            },
            {
                dataField: "accuracy",
                text: "Accuracy",
                sort: true
            },
            {
                dataField: "examrank",
                text: "Exam Rank",
                sort: true
            },
            {
                dataField: "overallrank",
                text: "Overall Rank",
                sort: true
            }
        ];
        //console.log(" 4546this.props", data);
        if (data.length > 0) {
            data[0].subjectMarks.map((item) => {

                const newObj =
                {
                    dataField: item.subjectName,
                    text: item.subjectName,
                    sort: true
                }
                const newObj1 =
                {
                    dataField: item.subjectName + "-" + "Rank",
                    text: item.subjectName + " " + "Rank",
                    sort: true
                }
                Columns.push(newObj);
                Columns.push(newObj1);
            });
        }


        return Columns;

    }


    defaultSorted = [
        {
            dataField: "marks",
            order: "desc"
        }
    ];
    exceldownloadFunction = () => {
        console.log("exceldownloadFunction", this.state);
        return (`http://admin.mylearningplus.in/scripts/institute_student_report.php?test_id=${parseInt(this.props.stateData.etestname)}&class_id=${this.props.stateData.eclass.toString()}&category_id=${this.props.stateData.ecategory.toString()}&branch_id=${this.props.stateData.ebranch.toString()}&section_id=${this.props.stateData.esection}&location_id=${this.props.stateData.elocation.toString()}`);

    }
    render() {
        const getStudentTable = this.props.getStudentTable;
        const loading2 = getStudentTable.loading;
        const error2 = getStudentTable.error;

        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        console.log("StudentData", getStudentTable.getStudentTable, " params:", {
            section_id: parseInt(this.props.stateData.esection),
            exam_paper_id: parseInt(this.props.stateData.etestname),
            username: Cookies.get("username")
        });
        if (getStudentTable.getStudentTable != undefined) {
            if (this.props.stateData.etestname != "0" && getStudentTable.getStudentTable.length > 0) {
                //student filter
                let tabledata = this.props.getStudentTable;
                if (this.state.filtertype != "") {
                    if (this.state.filtertype == "true") {
                        tabledata = getStudentTable.getStudentTable.filter((a) => a.attended == true);
                    }
                    else if (this.state.filtertype == "false") {
                        tabledata = getStudentTable.getStudentTable.filter((a) => a.attended == false);
                    }

                }
                //end student filter
                if (loading2) {
                    return (
                        <Col xl={12} lg={12} md={12} sm={12} className="studentTable">
                            <Card className="border-0 shadow-sm mb-4">
                                <Card as={Card.Body} className="justify-content-center flex-row">
                                    <div class="spinner-border text-primary text-center"></div>
                                </Card>
                            </Card>
                        </Col>
                    )


                }
                else {
                    return (
                        <Col xl={12} lg={12} md={12} sm={12} className="studentTable">
                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Header className="bg-white d-flex align-items-center justify-content-between">
                                    <Card.Title className="mb-0">{this.props.Title}</Card.Title>
                                    <div className="filter-block">
                                        <Button variant="outline-primary mx-1" className={this.state.filtertype == "true" ? ("active") : ("")} onClick={() => this.filterFun("true")}>Attendees</Button>
                                        <Button variant="outline-danger mx-1" className={this.state.filtertype == "false" ? ("active") : ("")} onClick={() => this.filterFun("false")}>Absentees</Button>
                                        <a className="mx-1 btn btn-outline-success" target="_blank" href={this.exceldownloadFunction()} ><i className="far fa-file-excel"></i></a>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <CardLessDataTableWithOutSearch
                                        parentData={this.tablesectionData(tabledata)}
                                        particlecolumns={this.Columns(tabledata)}
                                        defaultSorted={this.defaultSorted}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }

            }
            else {
                return null
            }
        }
        else {
            return null
        }

    }

}



export default withRouter(
    compose(
        graphql(
            GET_STUDENTTABLE,
            {
                options: props => ({
                    variables: {
                        params: {
                            section_id: parseInt(props.stateData.esection),
                            exam_paper_id: parseInt(props.stateData.etestname),
                            username: Cookies.get("username")
                        }
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "getStudentTable"
            }
        )
    )(StudentData)
);
