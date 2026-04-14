import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import DataTableWithOutSearch from '../../datatables/DataTableWithOutSearch'
import { Data, Columns, defaultSorted } from './ManageQuestionPaperData';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from 'moment';
class ManageQuestionPaperSection extends Component {
    constructor(props) {
        super(props)

        this.state = {

            breadcrumbsData: {
                Title: "Manage Exam Papers"
            },
            tableHeaderData: {
                Title: 'Own Exam Papers'
            },

        }
    }





    actionsFormatter2(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="delete" className="text-danger"><i className="far fa-trash-alt" /></Button>
            </div>
        );
    }
    actionsFormatter1(cell, row, rowIndex, formatExtraData) {
        return (
            <React.Fragment >
                {moment().unix() >= row.start_time ? ("") : (<div className="actions-buttons d-flex justify-content-center align-items-top">

                    <Button variant="link" name="edit" className="text-theme"><i className="far fa-edit" /></Button>

                </div >)}


            </React.Fragment>

        );

    }

    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (

            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="view" className="text-theme"><i className="far fa-eye" /></Button>
            </div>
        );
    }
    actionsFormatter12(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="text-link">
                <Link className="text-dark" to={{}}>{row['exam_name']}</Link>
            </div>
        );
    }

    actionsFormatter13(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="text-link">
                <a className="text-dark" href="/questions/manage-question-paper/question-paper-result">{row['branches']}</a>
            </div>
        );
    }
    handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
        console.log("columnid", rowIndex);

        this.props.history.push("/questions/manage-question-paper/question-paper-result",
            {
                exam_id: rowIndex.id,
                is_completed: rowIndex.is_completed,
            });
    }
    getTableExams = (val) => {
        let someArray = val;
        let someArray1 = [];
        for (let i = 0; i < someArray.length; i++) {
            let idata = someArray[i];
            console.log("idata.is_completed", idata);
            let status = "";
            if (idata.is_completed == 0) {
                status = "Not completed";
            }
            else if (idata.is_completed == 1) {
                status = "completed";
            }
            else if (idata.is_completed == 2) {
                status = "On going";
            }
            const newObject = {
                id: idata.id,
                exam_name: idata.exam_name,
                exam_type: idata.exam_type,
                name: idata.name,
                branch: idata.branch,
                class: idata.class,
                class_id: idata.class_id,
                sub_exam_type: idata.sub_exam_type,
                section: idata.section,
                start_time: idata.start_time,
                end_time: idata.end_time,
                is_completed: status,
                filename: idata.filename,
                conducted_on: moment.unix(idata.start_time).format("YYYY/MM/DD"),
                time: moment.unix(idata.start_time).format("LT"),
                //conducted_on: moment.unix(idata.start_time).format("DD-MM-YYYY @ LT"),
                student_results: idata.student_results,
                result_graph: idata.result_graph,
                //exam_questions: idata.exam_questions
            }
            someArray1.push(newObject);


        }
        return someArray1;
    }
    articlecolumns = [
        {
            dataField: "exam_name",
            text: "Exam Type",
            sort: true,
            formatter: this.actionsFormatter12,
            events: {
                onClick: this.handleEditFunction,
            }
        },
        {
            dataField: "name",
            text: "Exam",
            sort: true,

        },
        {
            dataField: "branch",
            text: "Branch",
            sort: true,
            // formatter: this.actionsFormatter13,
            // events: {
            //     onClick: this.handleEditFunction,
            // }
        },
        {
            dataField: "class",
            text: "class",
            sort: true
        },
        {
            dataField: "section",
            text: "Section",
            sort: true
        },

        {
            dataField: "conducted_on",
            text: "Conducted On",
            sort: true,
            //sort: 'desc'
        },
        {
            dataField: "time",
            text: "time",
            //sort: true
        },

        // {
        //     dataField: "result",
        //     text: "Result",
        //     sort: true
        // },
        {
            dataField: "is_completed",
            text: "Status",
            // sort: true
        },
        {
            dataField: "actions",
            formatter: this.actionsFormatter,
            attrs: { className: "viewRow" },
            headerAlign: "center",
            events: {
                onClick: this.handleEditFunction,
            }
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: this.actionsFormatter1,
            attrs: { className: "EditRow" },
            headerAlign: "center",
            events: {
                onClick: this.handleEditFunction,
            }

        },
        {
            dataField: "actions",
            formatter: this.actionsFormatter2,
            attrs: { className: "DeleteRow" },
            headerAlign: "center",
            events: {
                onClick: this.props.handleDelete,
            }
        }

    ];

    render() {
        console.log("this.state", this.state);
        // const defaultSorted = [
        //     {
        //         dataField: "name",
        //         order: "desc"
        //     }
        // ];


        //console.log("getExams", getExams.manageQuestions);
        return (
            <section className="manage_question_papers">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Card as={Card.Body} className="border-0 shadow-sm mb-3">
                            <p className="title mb-2">Total Exams</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="counts font-weight-bold">{this.props.globals.manageQuestionData.total}</h3>
                                <div className="icon-img">
                                    <svg role="img" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="#9f9f9f" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-48-244v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Card as={Card.Body} className="border-0 shadow-sm mb-3">
                            <p className="title mb-2">Ongoing Exams</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="counts font-weight-bold">{this.props.globals.manageQuestionData.ongoing}</h3>
                                <div className="icon-img">
                                    <svg role="img" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#9f9f9f" d="M492 8h-10c-6.627 0-12 5.373-12 12v110.627C426.929 57.261 347.224 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h10.016c6.353 0 11.646-4.949 11.977-11.293C48.157 132.216 141.097 42 256 42c82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12zm-.301 248h-10.015c-6.352 0-11.647 4.949-11.977 11.293C463.841 380.158 370.546 470 256 470c-82.608 0-154.672-46.952-190.299-116H180c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H20c-6.627 0-12 5.373-12 12v160c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V381.373C85.071 454.739 164.777 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Card as={Card.Body} className="border-0 shadow-sm mb-3">
                            <p className="title mb-2">Completed Exams</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="counts font-weight-bold">{this.props.globals.manageQuestionData.completed}</h3>
                                <div className="icon-img">
                                    <svg role="img" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#9f9f9f" d="M201.728 62.049l-43.385 69.459c-3.511 5.622-10.916 7.332-16.537 3.819l-6.781-4.237c-5.619-3.511-7.329-10.912-3.819-16.533l43.387-69.48c37.575-60.12 125.263-60.084 162.816 0l46.217 74.015 12.037-52.14c1.491-6.458 7.934-10.484 14.392-8.993l7.794 1.799c6.458 1.491 10.484 7.934 8.993 14.392l-21.633 93.702c-1.491 6.458-7.934 10.484-14.392 8.993l-93.702-21.633c-6.458-1.491-10.484-7.934-8.993-14.392l1.799-7.794c1.491-6.458 7.934-10.484 14.392-8.993l52.202 12.052-46.251-74.047c-25.002-40.006-83.467-40.099-108.536.011zm295.56 239.071l-52.939-84.78c-3.511-5.623-10.916-7.334-16.538-3.821l-6.767 4.228c-5.62 3.512-7.329 10.913-3.819 16.534l52.966 84.798c26.605 42.568-4.054 97.92-54.272 97.92H310.627l37.858-37.858c4.686-4.686 4.686-12.284 0-16.97l-5.656-5.656c-4.686-4.686-12.284-4.686-16.97 0l-68 68c-4.686 4.686-4.686 12.284 0 16.971l68 68c4.686 4.686 12.284 4.686 16.97 0l5.656-5.657c4.686-4.686 4.686-12.284 0-16.971L310.627 448H415.88c75.274 0 121.335-82.997 81.408-146.88zM41.813 318.069l55.803-89.339 12.044 52.166c1.491 6.458 7.934 10.484 14.392 8.993l7.794-1.799c6.458-1.491 10.484-7.934 8.993-14.392l-21.633-93.702c-1.491-6.458-7.934-10.484-14.392-8.993l-93.702 21.633c-6.458 1.491-10.484 7.934-8.993 14.392l1.799 7.794c1.491 6.458 7.934 10.484 14.392 8.993l52.193-12.05-55.796 89.355C-25.188 364.952 20.781 448 96.115 448H196c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H96.078c-50.199 0-80.887-55.335-54.265-97.931z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Card as={Card.Body} className="border-0 shadow-sm mb-3">
                            <p className="title mb-2">Future Schedule Exams</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="counts font-weight-bold">{this.props.globals.manageQuestionData.future}</h3>
                                <div className="icon-img">
                                    <svg role="img" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="#9f9f9f" d="M20 24h10c6.627 0 12 5.373 12 12v94.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H164c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V36c0-6.627 5.373-12 12-12zm321.647 315.235l4.706-6.47c3.898-5.36 2.713-12.865-2.647-16.763L272 263.853V116c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v164.147l84.884 61.734c5.36 3.899 12.865 2.714 16.763-2.646z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="card-title mb-0 text-danger">{this.props.stateData.status == 2 ? ("Exam deleted successfully") : ""}</div>
                        <DataTableWithOutSearch
                            parentData={this.getTableExams(this.props.manageQuestions)}
                            particlecolumns={this.articlecolumns}
                            //defaultSorted={defaultSorted}
                            tableHeading={this.state.tableHeaderData}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default withRouter(compose(

    // graphql(FETCH_EXAMS,

    //     {
    //         options: props => ({
    //             variables: {
    //                 institution_id: parseInt(Cookies.get("institutionid"))
    //             },
    //         }), name: "getExams"
    //     }), graphql(DELETE_EXAM, {
    //         name: "handleDelete"
    //     })
)(ManageQuestionPaperSection));
