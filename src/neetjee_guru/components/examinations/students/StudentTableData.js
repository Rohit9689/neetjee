import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, studentname: 'Swamy Rajan.', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-1', contactno: '+91 9966554466' },
    { id: 2, studentname: 'Ramu', exam: 'NEET', class: 'XI', section: 'Section - 1A', branch: 'Branch-2', contactno: '+91 9966554466' },
    { id: 3, studentname: 'Srinu.', exam: 'NEET', class: 'XI', section: 'Section - 1A', branch: 'Branch-3', contactno: '+91 9966554466' },
    { id: 4, studentname: 'Swamy', exam: 'NEET', class: 'XI', section: 'Section - 1A', branch: 'Branch-4', contactno: '+91 9966554466' },
    { id: 5, studentname: 'Sravnthi', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-5', contactno: '+91 9966554466' },
    { id: 6, studentname: 'Deepika', exam: 'NEET', class: 'VI', section: 'Section - 1A', branch: 'Branch-6', contactno: '+91 9966554466' },
    { id: 7, studentname: 'Suresh.', exam: 'NEET', class: 'VI', section: 'Section - 1A', branch: 'Branch-7', contactno: '+91 9966554466' },
    { id: 8, studentname: 'Ravi.', exam: 'NEET', class: 'VI', section: 'Section - 1A', branch: 'Branch-8', contactno: '+91 9966554466' },
    { id: 9, studentname: 'Srikanth.', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-9', contactno: '+91 9966554466' },
    { id: 10, studentname: 'Naveen', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-10', contactno: '+91 9966554466' },
    { id: 11, studentname: 'Swathweek Kumar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-11', contactno: '+91 9966554466' },
    { id: 12, studentname: 'Pram Kumar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-12', contactno: '+91 9966554466' },
    { id: 13, studentname: 'Ranjith', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-13', contactno: '+91 9966554466' },
    { id: 14, studentname: 'Saidi Reddy', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-14', contactno: '+91 9966554466' },
    { id: 15, studentname: 'Rakesh', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-15', contactno: '+91 9966554466' },
    { id: 16, studentname: 'Krishnam Raja', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-16', contactno: '+91 9966554466' },
    { id: 17, studentname: 'Sagar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-17', contactno: '+91 9966554466' },
    { id: 18, studentname: 'Kiran', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-18', contactno: '+91 9966554466' },
    { id: 19, studentname: 'Rajeev', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-19', contactno: '+91 9966554466' },
    { id: 20, studentname: 'Sanjeey', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-20', contactno: '+91 9966554466' },
    { id: 21, studentname: 'Eshwar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-21', contactno: '+91 9966554466' },
    { id: 22, studentname: 'Lavanya', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-22', contactno: '+91 9966554466' },
    { id: 23, studentname: 'Vanaja', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-23', contactno: '+91 9966554466' },
    { id: 24, studentname: 'Supriya', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-24', contactno: '+91 9966554466' },
    { id: 25, studentname: 'Madhavi', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-25', contactno: '+91 9966554466' },
    { id: 26, studentname: 'Sudha', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-26', contactno: '+91 9966554466' },
    { id: 27, studentname: 'Sri Laxmi', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-27', contactno: '+91 9966554466' },
    { id: 28, studentname: 'Venkatesh', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-28', contactno: '+91 9966554466' },
    { id: 29, studentname: 'Bhaskar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-29', contactno: '+91 9966554466' },
    { id: 30, studentname: 'Vinod', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-30', contactno: '+91 9966554466' },
    { id: 31, studentname: 'Varun Krishana', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-31', contactno: '+91 9966554466' },
    { id: 32, studentname: 'Shiva Kumar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-32', contactno: '+91 9966554466' },
    { id: 33, studentname: 'Madhu latha', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-33', contactno: '+91 9966554466' },
    { id: 34, studentname: 'Sathish', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-34', contactno: '+91 9966554466' },
    { id: 35, studentname: 'Gangadhar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-35', contactno: '+91 9966554466' },
    { id: 36, studentname: 'Jeevan', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-36', contactno: '+91 9966554466' },
    { id: 37, studentname: 'Srinavas', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-37', contactno: '+91 9966554466' },
    { id: 38, studentname: 'Mallesh', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-38', contactno: '+91 9966554466' },
    { id: 39, studentname: 'Kumar', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-39', contactno: '+91 9966554466' },
    { id: 40, studentname: 'Raju Reddy', exam: 'NEET', class: 'X', section: 'Section - 1A', branch: 'Branch-40', contactno: '+91 9966554466' },
 ];

export const Columns = [
    {
        dataField: "studentname",
        text: "Student Name",
        sort: true
    },
    {
        dataField: "exam",
        text: "Exam",
        sort: true
    },

    {
        dataField: "class",
        text: "Class",
        sort: true
    },
    {
        dataField: "section",
        text: "Section",
        sort: true
    },
    {
        dataField: "branch",
        text: "Branch",
        sort: true
    },
    {
        dataField: "contactno",
        text: "Contact No",
        sort: true
    },
    {
        dataField: "actions",
        text: "Actions",
        sort: true,
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
            <Button variant="link" className="text-theme"><i className="far fa-edit"/></Button>
            <Button variant="link" className="text-danger"><i className="far fa-trash-alt"/></Button>
        </div>
    );
}

