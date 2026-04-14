import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, teachername: 'Swamy Rajan.', subject: 'Maths', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-1', contactno: '+91 9966554466' },
    { id: 2, teachername: 'Ramu', subject: 'Physics', class: 'XI', section: 'A1, B2, C3, A2', branch: 'Branch-2', contactno: '+91 9966554466' },
    { id: 3, teachername: 'Srinu.', subject: 'Biology', class: 'XI', section: 'A1, B2, C3, A2', branch: 'Branch-3', contactno: '+91 9966554466' },
    { id: 4, teachername: 'Swamy', subject: 'Chemistry', class: 'XI', section: 'A1, B2, C3, A2', branch: 'Branch-4', contactno: '+91 9966554466' },
    { id: 5, teachername: 'Sravnthi', subject: 'Maths', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-5', contactno: '+91 9966554466' },
    { id: 6, teachername: 'Deepika', subject: 'Biology', class: 'VI', section: 'A1, B2, C3, A2', branch: 'Branch-6', contactno: '+91 9966554466' },
    { id: 7, teachername: 'Suresh.', subject: 'Chemistry', class: 'VI', section: 'A1, B2, C3, A2', branch: 'Branch-7', contactno: '+91 9966554466' },
    { id: 8, teachername: 'Ravi.', subject: 'Maths', class: 'VI', section: 'A1, B2, C3, A2', branch: 'Branch-8', contactno: '+91 9966554466' },
    { id: 9, teachername: 'Srikanth.', subject: 'Biology', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-9', contactno: '+91 9966554466' },
    { id: 10, teachername: 'Naveen', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-10', contactno: '+91 9966554466' },
    { id: 11, teachername: 'Swathweek Kumar', subject: 'Maths', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-11', contactno: '+91 9966554466' },
    { id: 12, teachername: 'Pram Kumar', subject: 'Biology', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-12', contactno: '+91 9966554466' },
    { id: 13, teachername: 'Ranjith', subject: 'Physics', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-13', contactno: '+91 9966554466' },
    { id: 14, teachername: 'Saidi Reddy', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-14', contactno: '+91 9966554466' },
    { id: 15, teachername: 'Rakesh', subject: 'Physics', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-15', contactno: '+91 9966554466' },
    { id: 16, teachername: 'Krishnam Raja', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-16', contactno: '+91 9966554466' },
    { id: 17, teachername: 'Sagar', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-17', contactno: '+91 9966554466' },
    { id: 18, teachername: 'Kiran', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-18', contactno: '+91 9966554466' },
    { id: 19, teachername: 'Rajeev', subject: 'Biology', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-19', contactno: '+91 9966554466' },
    { id: 20, teachername: 'Sanjeey', subject: 'Biology', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-20', contactno: '+91 9966554466' },
    { id: 21, teachername: 'Eshwar', subject: 'Biology', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-21', contactno: '+91 9966554466' },
    { id: 22, teachername: 'Lavanya', subject: 'Maths', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-22', contactno: '+91 9966554466' },
    { id: 23, teachername: 'Vanaja', subject: 'Chemistry', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-23', contactno: '+91 9966554466' },
    { id: 24, teachername: 'Supriya', subject: 'Simply-24', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-24', contactno: '+91 9966554466' },
    { id: 25, teachername: 'Madhavi', subject: 'Simply-25', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-25', contactno: '+91 9966554466' },
    { id: 26, teachername: 'Sudha', subject: 'Simply-26', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-26', contactno: '+91 9966554466' },
    { id: 27, teachername: 'Sri Laxmi', subject: 'Simply-27', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-27', contactno: '+91 9966554466' },
    { id: 28, teachername: 'Venkatesh', subject: 'Simply-28', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-28', contactno: '+91 9966554466' },
    { id: 29, teachername: 'Bhaskar', subject: 'Simply-29', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-29', contactno: '+91 9966554466' },
    { id: 30, teachername: 'Vinod', subject: 'Simply-30', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-30', contactno: '+91 9966554466' },
    { id: 31, teachername: 'Varun Krishana', subject: 'Simply-31', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-31', contactno: '+91 9966554466' },
    { id: 32, teachername: 'Shiva Kumar', subject: 'Simply-32', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-32', contactno: '+91 9966554466' },
    { id: 33, teachername: 'Madhu latha', subject: 'Simply-33', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-33', contactno: '+91 9966554466' },
    { id: 34, teachername: 'Sathish', subject: 'Simply-34', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-34', contactno: '+91 9966554466' },
    { id: 35, teachername: 'Gangadhar', subject: 'Simply-35', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-35', contactno: '+91 9966554466' },
    { id: 36, teachername: 'Jeevan', subject: 'Simply-36', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-36', contactno: '+91 9966554466' },
    { id: 37, teachername: 'Srinavas', subject: 'Simply-37', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-37', contactno: '+91 9966554466' },
    { id: 38, teachername: 'Mallesh', subject: 'Simply-38', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-38', contactno: '+91 9966554466' },
    { id: 39, teachername: 'Kumar', subject: 'Simply-39', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-39', contactno: '+91 9966554466' },
    { id: 40, teachername: 'Raju Reddy', subject: 'Simply-40', class: 'X', section: 'A1, B2, C3, A2', branch: 'Branch-40', contactno: '+91 9966554466' },
 ];

export const Columns = [
    {
        dataField: "teachername",
        text: "Teacher Name",
        sort: true
    },
    {
        dataField: "subject",
        text: "Subject",
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

