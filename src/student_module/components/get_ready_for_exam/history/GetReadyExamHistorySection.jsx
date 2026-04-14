import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import DataTableWithOutSearch from '../../../../neetjee_guru/components/datatables/DataTableWithOutSearch';
import { Data, Columns, defaultSorted } from './GetReadyExamHistoryTableData';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

import './_history.scss'
class GetReadyExamHistorySection extends Component {
    constructor(props) {
        super(props)
        let chapter = [];
        let cumulative = [];
        let semigrand = [];
        let grand = [];
        for (let i = 0; i <= props.getReadyForExamList.length; i++) {
            let idata = props.getReadyForExamList[i];
            if (idata != undefined) {
                if (idata.is_completed == 1) {
                    if (idata.sub_type == "chapter") {
                        if (idata != undefined) {
                            const id = idata.id
                            chapter.push(parseInt(id));
                        }
                    }
                    else if (idata.sub_type == "cumulative") {
                        if (idata != undefined) {
                            const id = idata.id
                            cumulative.push(parseInt(id));
                        }
                    }
                    else if (idata.sub_type == "semi-grand") {
                        if (idata != undefined) {
                            const id = idata.id
                            semigrand.push(parseInt(id));
                        }
                    }
                    else if (idata.sub_type == "grand") {
                        if (idata != undefined) {
                            const id = idata.id
                            grand.push(parseInt(id));
                        }
                    }
                }
            }
        }
        const ExamHistoryData = [
            {
                id: 1,
                examName: 'Chapter Exam',
                counts: chapter.length
            },
            {
                id: 2,
                examName: 'Cumulative Exam',
                counts: cumulative.length
            },
            {
                id: 3,
                examName: 'Semi grand Exam',
                counts: semigrand.length
            },
            {
                id: 4,
                examName: 'Grand Exam',
                counts: grand.length
            }
        ];

        this.state = {
            countsData: ExamHistoryData,
            tableHeaderData: {
                Title: 'Get Ready For Exams'
            },
            userRestionModalShow: false
        }
    }
    getTableData(data) {
        console.log("datadata", data);
        let arr = [];
        for (let i = 0; i <= data.length; i++) {
            let idata = data[i];
            if (idata != undefined) {
                //if (idata.is_completed == 0) {
                let status = "";
                if (idata.is_completed == 1) {
                    status = "completed"
                }
                else if (idata.is_completed == 0) {
                    status = "pending"
                }
                if (idata.is_completed == 1) {
                    const newObj = {
                        id: idata.id,
                        examname: idata.exam_name,
                        examtype: idata.sub_type,
                        schedule: moment.unix(idata.timestamp).format("DD-MM-YYYY"),
                        status: status,
                        is_completed: idata.is_completed,
                        save_exam_type: idata.save_exam_type,
                        syllabus: idata.syllabus,
                        getReadyForExamList: this.props.getReadyForExamList
                    }
                    arr.push(newObj);
                }

                //}

            }
        }
        //console.log("arrarr", arr);
        return arr;

    }
    handleLearning = (e, cell, row, rowIndex, formatExtraData) => {
        console.log("handleLearning", rowIndex.syllabus);
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        if (isuserValid.custom_cumulative == false) {
            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/get-ready-for-exam/get-ready-shortnotes-and-materials",
                state: {
                    syllabus: rowIndex.syllabus,
                    studentGlobals: this.props.studentGlobals
                }
            });
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }

    }
    handleExam = (e, cell, row, rowIndex, formatExtraData) => {
        console.log("handleExam", rowIndex);
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        if (isuserValid.custom_cumulative == false) {
            this.setState({
                userRestionModalShow: false
            });
            this.props.history.push({
                pathname: "/student/subject/custom-instructions",
                state: {
                    sessionid: rowIndex.id,
                    type: "Custom Exam",
                    etype: "customtable",
                    getReadyForExamList: rowIndex.getReadyForExamList
                }
            }
            );
        }
        else {
            this.setState({
                userRestionModalShow: true
            });
        }

    }
    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        //console.log("rowIndex", row);
        return (
            <React.Fragment>
                {row.is_completed != 1 ? (
                    <React.Fragment>
                        {row.save_exam_type == 1 ? (
                            <div style={{ margin: 0, padding: 0 }} className="actions-buttons d-flex justify-content-center align-items-top">
                                <Button variant="link text-success"><i className="fal fa-book-reader" /></Button>
                            </div>) : (
                                <div style={{ margin: 0, padding: 0 }} className="actions-buttons d-flex justify-content-center align-items-top">
                                    <Button variant="link text-success"><i className="fal fa-book-reader" /></Button>
                                </div>)}
                    </React.Fragment>) : ("")}
            </React.Fragment>
        );
    }

    actionsFormatter1(cell, row, rowIndex, formatExtraData) {
        //console.log("rowIndex", row);
        return (
            <React.Fragment >
                {row.is_completed != 1 ? (
                    <React.Fragment>
                        {row.save_exam_type != 1 ? (
                            <div style={{ margin: 0, padding: 0 }} className="actions-buttons d-flex justify-content-center align-items-top">
                                <Button variant="link text-primary"><i className="fal fa-clipboard" /></Button>
                            </div>) : (""
                            )}
                    </React.Fragment>) : ("")}
            </React.Fragment>
        );
    }
    Columns = [
        {
            dataField: "examname",
            text: "Exam Name",
            sort: true
        },
        {
            dataField: "examtype",
            text: "Exam Type",
            sort: true
        },
        {
            dataField: "schedule",
            text: "Schedule On",
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            sort: true
        },
        // {
        //     dataField: "actions",
        //     text: "Actions",
        //     formatter: this.actionsFormatter,
        //     attrs: { className: "EditRow" },
        //     headerAlign: "right",
        //     events: {
        //         onClick: this.handleLearning,
        //     }
        // },
        // {
        //     dataField: "actions",
        //     formatter: this.actionsFormatter1,
        //     attrs: { className: "EditRow" },
        //     headerAlign: "center",
        //     events: {
        //         onClick: this.handleExam,
        //     }

        // }
    ];

    defaultSorted = [
        {
            dataField: "title",
            order: "desc"
        }
    ];
    render() {
        //console.log("countsData", this.state.countsData);
        return (
            <div className="getready_exam_history px-xl-4 px-lg-4">
                <Row className="getready_exam_cards">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Row>
                            {
                                this.state.countsData.map((item) => {
                                    const { id, examName, counts } = item;
                                    return (
                                        <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                                            <Card key={id} as={Card.Body} className="border-0 shadow-sm">
                                                <p className="getready_exam_name mb-3">{examName}</p>
                                                <h4 className="counts font-weight-bold">{counts}</h4>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <DataTableWithOutSearch
                            // ColumnInformation={Data} 
                            // TableHeaderData={Columns} 
                            // defaultSorted={defaultSorted} 
                            // tableHeading={this.state.tableHeaderData} 

                            parentData={this.getTableData(this.props.getReadyForExamList)}
                            particlecolumns={this.Columns}
                            tableHeading={this.state.tableHeaderData}
                            defaultSorted={this.defaultSorted}
                            name="Exams History"
                        />
                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </div>
        )
    }
}

export default withRouter(GetReadyExamHistorySection);
