import React from 'react'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const Data = [
    { id: 1, studentname: 'Swamy 1', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '1', overallrank: '10'},
    { id: 2, studentname: 'Swamy 2', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '2', overallrank: '20'},
    { id: 3, studentname: 'Swamy 3', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '3', overallrank: '15'},
    { id: 4, studentname: 'Swamy 4', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '4', overallrank: '5'},
    { id: 5, studentname: 'Swamy 5', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '5', overallrank: '20'},
    { id: 6, studentname: 'Swamy 6', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '6', overallrank: '10'},
    { id: 7, studentname: 'Swamy 7', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '7', overallrank: '4'},
    { id: 8, studentname: 'Swamy 8', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '8', overallrank: '15'},
    { id: 9, studentname: 'Swamy 9', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '9', overallrank: '18'},
    { id: 10, studentname: 'Swamy 10', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '10', overallrank: '6'},
    { id: 11, studentname: 'Swamy 11', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '11', overallrank: '12'},
    { id: 12, studentname: 'Swamy 12', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '12', overallrank: '8'},
    { id: 13, studentname: 'Swamy 13', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '13', overallrank: '22'},
    { id: 14, studentname: 'Swamy 14', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '14', overallrank: '30'},
    { id: 15, studentname: 'Swamy 15', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '15', overallrank: '24'},
    { id: 16, studentname: 'Swamy 16', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '16', overallrank: '2'},
    { id: 17, studentname: 'Swamy 17', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '17', overallrank: '29'},
    { id: 18, studentname: 'Swamy 18', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '18', overallrank: '4'},
    { id: 19, studentname: 'Swamy 19', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '19', overallrank: '5'},
    { id: 20, studentname: 'Swamy 20', exam: 'NEET', class: 'XII', section: 'Section 1A', branch: 'Branch-1', attended:'Yes', marks: '586', markspercentage: '68%', examrank: '20', overallrank: '30'},
 ];

export const Columns = [
    {
        dataField: "studentname",
        text: "Student Name ",
        formatter: actionsFormatter2
    },
    {
        dataField: "exam",
        text: "Exam",
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
    },
    {
        dataField: "marks",
        text: "marks",
    },
    {
        dataField: "markspercentage",
        text: "mark's",
    },
    {
        dataField: "examrank",
        text: "Exam Rank",
    },
    {
        dataField: "overallrank",
        text: "Overall Rank",
    },
    {
        dataField: "actions",
        text: "Actions",
        formatter: actionsFormatter,
        headerAttrs: { width: 50 },
        headerAlign: 'center',
        align: 'center',
        attrs: { width: 50, className: "EditRow" }
    }
];

export const defaultSorted = [
    {
        dataField: "title",
        order: "desc"
    }
];

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        <div className="actions-buttons d-flex justify-content-center align-items-top">
            <Button variant="link" className="text-theme"><i className="far fa-eye"/></Button>
            {/* <Button variant="link" className="text-theme"><i className="far fa-edit"/></Button>
            <Button variant="link" className="text-danger"><i className="far fa-trash-alt"/></Button> */}
        </div>
    );
}
function actionsFormatter2(cell, row, rowIndex, formatExtraData) {
    return (
        <div className="text-link">
            <Link className="text-dark" to="/home/student-profile">{row['studentname']}</Link>
        </div>
    );
}
