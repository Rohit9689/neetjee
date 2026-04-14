import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import DataTableWithOutSearch from '../../../../neetjee_guru/components/datatables/DataTableWithOutSearch';
import { Data, Columns, defaultSorted } from './GetReadyExamHistoryTableData';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";
import ExamAlert from "../ExamAlert";
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from "lodash.flowright";


import './_history.scss'
const DELETE_EXAM = gql`
  mutation($exam_session_id: ID, $mobile: String) {
    deleteGetReadyForExam(exam_session_id: $exam_session_id, mobile: $mobile)
  }
`;

const FETCH_GETREADYEXAM = gql` 
query($mobile: String!,$page: Int) {
    getReadyForExamList(mobile: $mobile, page: $page){
        id
        sub_type
        exam_type
        class_id
        syllabus{
            subject_id
            subject_name
            chapters{
                id
                chapter
            }
        }
        exam_name
        exam_date
        save_exam_type
        is_completed
        timestamp
   }
}

`;
class GetReadyExamUpcomingHistorySection extends Component {
    constructor(props) {
        super(props)
        let chapter = [];
        let cumulative = [];
        let semigrand = [];
        let grand = [];
        for (let i = 0; i <= props.getReadyForExamList.length; i++) {
            let idata = props.getReadyForExamList[i];
            if (idata != undefined) {
                if (idata.is_completed == 0) {
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
            userRestionModalShow: false,
            status: 1,
            ExamAlertModalShow: false,
            rowIndex: ""
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
                    status = "Completed"
                }
                else if (idata.is_completed == 0) {
                    status = "Not Completed"
                }
                if (idata.is_completed == 0) {
                    const newObj = {
                        id: idata.id,
                        examname: idata.exam_name,
                        examtype: idata.sub_type,
                        schedule: moment.unix(idata.exam_date).format("DD-MM-YYYY"),
                        status: status,
                        is_completed: idata.is_completed,
                        save_exam_type: idata.save_exam_type,
                        syllabus: idata.syllabus,
                        getReadyForExamList: this.props.getReadyForExamList,
                        timestamp: idata.exam_date
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
        //console.log("handleExam", rowIndex);
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        const date = String(new Date());
        const nowdate = moment(date.substr(4, 11) + "00:00:00", "MMM DD YYYY hh:mm:ss").unix();

        if (rowIndex.is_completed != 1 && rowIndex.timestamp >= nowdate) {
            if (isuserValid.custom_cumulative == false) {
                this.setState({
                    userRestionModalShow: false
                });
                localStorage.setItem("sessionid", rowIndex.id);
                localStorage.setItem("type", "Custom Exam");
                localStorage.setItem("stype", "");
                localStorage.setItem("exam_paper_id", "0");
                localStorage.setItem("etype", rowIndex.examtype);

                window.open("/student/subject/exam", "_blank")
                this.props.history.push({
                    pathname: "/student/get-ready-for-exam"
                })

            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }


    }
    handleConformation = (e, cell, row, rowIndex, formatExtraData) => {
        console.log("handleConformation", e, cell, row, rowIndex, formatExtraData);
        this.setState({
            ExamAlertModalShow: true,
            rowIndex: rowIndex.id
        });
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

        const date = String(new Date());
        const nowdate = moment(date.substr(4, 11) + "00:00:00", "MMM DD YYYY hh:mm:ss").unix();

        return (
            <React.Fragment >
                {row.is_completed != 1 && row.timestamp >= nowdate ? (
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
    actionsFormatter3(cell, row, rowIndex, formatExtraData) {
        return (

            <div style={{ margin: 0, padding: 0 }} className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link text-danger"><i className="far fa-trash-alt" /></Button>
            </div>
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
            text: "Scheduled For",
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            sort: true
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: this.actionsFormatter,
            attrs: { className: "EditRow" },
            headerAlign: "center",
            events: {
                onClick: this.handleLearning,
            }
        },
        {
            dataField: "actions",
            //text: "Actions",
            formatter: this.actionsFormatter1,
            attrs: { className: "EditRow" },
            //headerAlign: "center",
            events: {
                onClick: this.handleExam,
            }

        },
        {
            dataField: "actions",
            formatter: this.actionsFormatter3,
            attrs: { className: "EditRow" },
            events: {
                onClick: this.handleConformation,
            }

        }
    ];

    defaultSorted = [
        {
            dataField: "title",
            order: "desc"
        }
    ];



    handleDelete = async (e) => {
        console.log("handleDelete", parseInt(this.state.rowIndex), Cookies.get("mobile"));

        await this.props.handleDelete({
            variables: {
                exam_session_id: parseInt(this.state.rowIndex),
                mobile: Cookies.get("mobile")
            },
            update: (store, { data }) => {
                console.log("data", data);
                const rawData = store.readQuery({
                    query: FETCH_GETREADYEXAM,
                    variables: {
                        mobile: Cookies.get("mobile"),
                        page: 0
                    }
                });
                // Deep-clone to avoid mutating the frozen Apollo cache object
                const data1 = JSON.parse(JSON.stringify(rawData));
                data1.getReadyForExamList = data1.getReadyForExamList.filter(x => x.id != this.state.rowIndex);

                try {
                    store.writeQuery({
                        query: FETCH_GETREADYEXAM,
                        variables: {
                            mobile: Cookies.get("mobile"),
                            page: 0
                        },
                        data: data1
                    });
                } catch (e) {
                    console.log("Exception", e);
                }

                console.log("data.deleteGetReadyForExam", data.deleteGetReadyForExam);
                if (data.deleteGetReadyForExam) {
                    this.setState({
                        status: 2
                    });

                }
                else {
                    this.setState({
                        status: 3
                    });
                }
                setTimeout(() => {
                    this.DeleteSetpageLoad();
                }, 1000);
            }
        });


    };
    DeleteSetpageLoad = () => {
        console.log("setTimeout");
        this.setState({
            status: 1,
            ExamAlertModalShow: false,
            rowIndex: ""
        });
    };

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
                            name="Upcoming Exams"
                        />
                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
                <ExamAlert
                    show={this.state.ExamAlertModalShow}
                    onHide={() => this.setState({ ExamAlertModalShow: false })}
                    handleDelete={this.handleDelete}
                    stateData={this.state}
                />
            </div>
        )
    }
}



export default withRouter(
    compose(
        graphql(DELETE_EXAM, {
            name: "handleDelete"
        })
    )(GetReadyExamUpcomingHistorySection)
);
