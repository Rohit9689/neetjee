import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, fullname: 'Swamy 1', username: 'swamy123', category: 'A', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 2, fullname: 'Swamy 2', username: 'swamy123', category: 'A', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 3, fullname: 'Swamy 3', username: 'swamy123', category: 'A', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 4, fullname: 'Swamy 4', username: 'swamy123', category: 'A', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 5, fullname: 'Swamy 5', username: 'swamy123', category: 'A', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 6, fullname: 'Swamy 6', username: 'swamy123', category: 'B', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 7, fullname: 'Swamy 7', username: 'swamy123', category: 'B', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 8, fullname: 'Swamy 8', username: 'swamy123', category: 'B', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 9, fullname: 'Swamy 9', username: 'swamy123', category: 'B', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 10, fullname: 'Swamy 10', username: 'swamy123', category: 'C', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 11, fullname: 'Swamy 11', username: 'swamy123', category: 'C', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 12, fullname: 'Swamy 12', username: 'swamy123', category: 'C', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 13, fullname: 'Swamy 13', username: 'swamy123', category: 'C', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 14, fullname: 'Swamy 14', username: 'swamy123', category: 'C', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 15, fullname: 'Swamy 15', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 16, fullname: 'Swamy 16', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 17, fullname: 'Swamy 17', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 18, fullname: 'Swamy 18', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 19, fullname: 'Swamy 19', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
    { id: 20, fullname: 'Swamy 20', username: 'swamy123', category: 'D', email: 'swami@entrolabs.com', password:'$wa46415', mobile: '9949123456', usertype: 'Student', class: 'XI, XII', subject: 'Biology', chapter: 'chapter-1'},
 ];

export const Columns = [
    {
        dataField: "fullname",
        text: "Full Name ",
        sort: true
    },
    {
        dataField: "username",
        text: "User Name",
        sort: true
    },
    {
        dataField: "category",
        text: "Category",
        sort: true
    },
    {
        dataField: "email",
        text: "Email Id",
        sort: true
    },
    {
        dataField: "password",
        text: "Password",
        sort: true
    },
    {
        dataField: "mobile",
        text: "Mobile",
        sort: true
    },
    {
        dataField: "usertype",
        text: "User Type",
        sort: true
    },
    {
        dataField: "class",
        text: "Class",
        sort: true
    },
    {
        dataField: "subject",
        text: "Subjects",
        sort: true
    },
    {
        dataField: "chapter",
        text: "Chapter",
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

