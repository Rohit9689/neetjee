import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 2, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 3, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 4, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 5, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 6, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 7, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 8, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 9, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 10, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 11, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 12, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 13, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 14, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 15, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 16, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 17, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 18, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 19, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 20, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 21, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 22, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 23, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 24, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 25, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 26, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 27, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 28, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 29, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 30, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 31, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'IPL', exam: 'JEE(Mains+Advanced)',  created: '20-02-2020' },
    { id: 32, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'China1', exam: 'NEET', created: '20-02-2020' },
    { id: 33, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 34, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 35, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 36, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' },
    { id: 37, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NEON.', exam: 'JEE Mains And 10+2 board', created: '20-02-2020' },
    { id: 38, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'ICON', exam: 'JEE and IPE', created: '20-02-2020' },
    { id: 39, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'LEO', exam: 'JEE', created: '20-02-2020' },
    { id: 40, category:'A', difficulty:'60%', moderate: '30%', easy: '10%', package: 'NPL', exam: 'EAMCET', created: '20-02-2020' }
 ];

export const Columns = [
    {
        dataField: "category",
        text: "Category",
        sort: true
    },
    {
        dataField: "difficulty",
        text: "Difficulty",
        sort: true,
        headerAlign: 'left',
        align: 'left',
    },
    {
        dataField: "moderate",
        text: "Moderate",
        sort: true,
        headerAlign: 'left',
        align: 'left',
    },
    {
        dataField: "easy",
        text: "Easy",
        sort: true,
        headerAlign: 'left',
        align: 'left',
    },
    {
        dataField: "package",
        text: "Package Name",
        sort: true,
        headerAlign: 'left',
        align: 'left',
    },
    {
        dataField: "exam",
        text: "Exam",
        sort: true,
        headerAlign: 'left',
        align: 'left',
    },   
    {
        dataField: "created",
        text: "Created On",
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
            <Button variant="link" className="text-theme"><i className="far fa-edit"/></Button>
            <Button variant="link" className="text-danger"><i className="far fa-trash-alt"/></Button>
        </div>
    );
}

