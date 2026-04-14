import React, { Component } from 'react'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import { Data, Columns, defaultSorted } from './QuestionPatternTableData';
import DataTableWithOutSearch from '../../datatables/DataTableWithOutSearch'

import './_questionpattern.scss';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

const DELETE_PATTERN = gql`
  mutation(
    $patternId: ID
    ) {
        deletePattern(
            patternId: $patternId
    )
  }
`;

class QuestionPatternSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 1,
            breadcrumbsData: {
                Title: "NJG question pattern"
            },
            tableHeaderData: {
                Title: 'Own question patterns'
            }
        }
    }
    handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
        await this.props.handleDelete({
            variables: {
                patternId: rowIndex.id
            },
            update: (store, { data }) => {
                if (data.deletePattern) {
                    this.setState({
                        status: 2
                    });
                    setTimeout(() => { this.DeleteSetpageLoad() }, 1000);
                }
            }
        });
    }
    DeleteSetpageLoad = () => {
        this.setState({ status: 1 });
        this.props.history.push("/questions/question-pattern");
    }
    handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
        let noofquestions = 0;
        let examsubjects = this.props.globals.globals.exams.find((a) => a.id == rowIndex.exam_type);
        let examData = examsubjects.exam_subjects;
        let subArray = [];
        var total = [];
        let TypeOfQuestionData = this.props.globals.globals.questionTypes;
        let tqArray = [];
        for (let t = 0; t < TypeOfQuestionData.length; t++) {
            const tqData = {
                id: TypeOfQuestionData[t].id,
                questionType: TypeOfQuestionData[t].questiontype,
                noofquestion: "",
                numberError: "",
                noofqerror: ""
            }
            tqArray.push(tqData);
        }

        for (let i = 0; i < examData.length; i++) {
            let idata = examData[i];
            let globalData = this.props.globals.globals.subjects.find((b) => b.id == idata.subject_id);
            const subname = {
                id: globalData.id,
                subject: globalData.subject,
                totnoofquestions: idata.no_of_questions,
                toq: tqArray,
                application: "",
                concept: ""
            };
            subArray.push(subname);
            total.push(parseInt(idata.no_of_questions));
        }
        for (let num of total) {
            noofquestions = noofquestions + num
        }
        this.props.history.push("/questions/question-pattern/create-question-pattern-edit",
            {
                pid: rowIndex.id,
                name: rowIndex.name,
                exam_type: rowIndex.exam_type,
                class_id: rowIndex.class_id,
                section_category_id: rowIndex.section_category_id,
                class_name: rowIndex.class_name,
                section_category: rowIndex.section_category,
                branches: rowIndex.branches,
                subjects: rowIndex.subjects,
                exam_name: rowIndex.exam_name,
                subArray: subArray,
                noofquestions: noofquestions

            });
    }
    actionsFormatter2(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="delete" className="text-danger"><i className="far fa-trash-alt" /></Button>
            </div>
        );
    }
    actionsFormatter1() {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">

                <Button variant="link" name="edit" className="text-theme"><i className="far fa-edit" /></Button>

            </div >
        );

    }

    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="view" className="text-theme"><i className="far fa-eye" /></Button>

            </div >

        );
    }
    articlecolumns = [
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "exam_name",
            text: "Exam Name",
            sort: true
        },
        {
            dataField: "class_name",
            text: "Class",
            sort: true
        },
        {
            dataField: "section_category",
            text: "Section Category",
            sort: true
        },
        {
            dataField: "subjects",
            text: "Subjects",
            sort: true
        },
        {
            dataField: "branches",
            text: "Branches",
            sort: true
        },

        {
            dataField: "actions",
            formatter: this.actionsFormatter,
            attrs: { className: "viewRow" },
            headerAlign: "center",
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
            // events: {
            //     onClick: this.handleDelete,
            // }
        }

    ];

    render() {
        const defaultSorted = [
            {
                dataField: "branch_name",
                order: "desc"
            }
        ];
        const getPattern = this.props.getPattern;
        const loading1 = getPattern.loading;
        const error1 = getPattern.error;

        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getPattern.getPattern", getPattern.getPattern);
        return (
            <section className="question_pattern">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={4} lg={4} md={12} sm={12}>
                        <a href="/questions/question-pattern/create-question-pattern">
                            <Card as={Card.Body} className="flex-row align-items-center shadow-sm border-0 mb-3">
                                <div className="icon_block">
                                    <Image src={require('../../../../images/question-marks-seamless-pattern.png')} alt="img" width="60" roundedCircle />
                                </div>
                                <div className="content_block ml-3">
                                    <h5 className="title text-dark">Create pattern </h5>
                                    <p className="sub_title text-dark mb-0">for Question paper</p>
                                </div>
                            </Card>
                        </a>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                            <h2 className="title h5 mb-0">Own question patterns</h2>
                            <i className="fas fa-filter" />
                        </div>
                        <div className="card-title mb-0 text-danger">{this.state.status == 2 ? ("Pattern deleted successfully") : ""}</div>
                        <DataTableWithOutSearch
                            parentData={getPattern.getPattern}
                            particlecolumns={this.articlecolumns}
                            defaultSorted={defaultSorted}
                            tableHeading={this.state.tableHeaderData}
                        />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default withRouter(compose(
    graphql(gql` 
    query($institution_id: Int!) {
        getPattern(institution_id: $institution_id){
            id
            name
            exam_type
            class_id
            section_category_id
            class_name
            section_category
            branches
            subjects
            exam_name
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                },
            }), name: "getPattern"
        }),
    graphql(gql` 
        query($institution_id: Int!) {
        globals(institution_id: $institution_id){
            exams{
                id
                exam
                exam_subjects{
                    subject_id
                    no_of_questions
                }
            }
            subjects{
                id
                subject
                chapters{
                    id
                    chapter
                    topics{
                        id
                        topic
                    }
                }
            }
    
            classes{
                id
                class
            }
            globalSectionCategory{
                id
                section_category
                class_ids
            }
            questionTypes{
                id
                questiontype
            }
            }
        }
        `,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                },
            }), name: "globals"
        }), graphql(DELETE_PATTERN, {
            name: "handleDelete"
        })
)(QuestionPatternSection));
