import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 2, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 3, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 4, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 5, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '70%', moderate: '20%',easy: '10%'},
    { id: 6, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 7, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 8, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '70%', moderate: '10%',easy: '20%'},
    { id: 9, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 10, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 11, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 12, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 13, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 14, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 15, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 16, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 17, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 18, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 19, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 20, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 21, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 22, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 23, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 24, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 25, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 26, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 27, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 28, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 29, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 30, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 31, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 32, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 33, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 34, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 35, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 36, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 37, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 38, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 39, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
    { id: 40, question: 'It is a long established fact that a reader will be distracted by the readable', exam: 'NEET Exam', class: 'XI', subjects: 'Biology', difficult: '60%', moderate: '30%',easy: '10%'},
 ];

export const Columns = [
    {
        dataField: "question",
        text: "question Name",
        sort: true,
        formatter: actionsFormatter2,
        attrs: { className: "QuestionRow" }
    },
    {
        dataField: "exam",
        text: "Exam Name",
        sort: true
    },
    {
        dataField: "class",
        text: "Class",
        sort: true
    },
    {
        dataField: "subjects",
        text: "Subjects",
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

function actionsFormatter2(cell, row, rowIndex, formatExtraData) {
    return (
        <div className="text-link">
            <a className="text-dark" href="/#">{row['question']}</a>
        </div>
    );
}

