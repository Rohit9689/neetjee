import React from 'react'
import { Button } from "react-bootstrap";

export const Data = [
    { id: 1, examname: 'Branch-1', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 2, examname: 'Branch-2', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 3, examname: 'Branch-3', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 4, examname: 'Branch-4', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 5, examname: 'Branch-5', examtype: 'Cumulative Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 6, examname: 'Branch-6', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 7, examname: 'Branch-7', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 8, examname: 'Branch-8', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 9, examname: 'Branch-9', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 10, examname: 'Branch-10', examtype: 'Cumulative Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 11, examname: 'Branch-11', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 12, examname: 'Branch-12', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 13, examname: 'Branch-13', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 14, examname: 'Branch-14', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 15, examname: 'Branch-15', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 16, examname: 'Branch-16', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 17, examname: 'Branch-17', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 18, examname: 'Branch-18', examtype: 'Cumulative Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 19, examname: 'Branch-19', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 20, examname: 'Branch-20', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 21, examname: 'Branch-21', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 22, examname: 'Branch-22', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 23, examname: 'Branch-23', examtype: 'Cumulative Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 24, examname: 'Branch-24', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 25, examname: 'Branch-25', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 26, examname: 'Branch-26', examtype: 'Semi Grand Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 27, examname: 'Branch-27', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 28, examname: 'Branch-28', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 29, examname: 'Branch-29', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 30, examname: 'Branch-30', examtype: 'Semi Grand Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 31, examname: 'Branch-31', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 32, examname: 'Branch-32', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 33, examname: 'Branch-33', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 34, examname: 'Branch-34', examtype: 'Semi Grand Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 35, examname: 'Branch-35', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 36, examname: 'Branch-36', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 37, examname: 'Branch-37', examtype: 'Grand Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 38, examname: 'Branch-38', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 39, examname: 'Branch-39', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
    { id: 40, examname: 'Branch-40', examtype: 'Chapter Exam', schedule: '12-05-2020', status: 'Up Coming' },
];

export const Columns = [
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
    {
        dataField: "actions",
        text: "Actions",
        sort: true,
        formatter: actionsFormatter,
        headerAttrs: { width: 100 },
        headerAlign: 'center',
        align: 'center',
        attrs: { width: 100, className: "EditRow" }
    }
];

export const defaultSorted = [
    {
        dataField: "title",
        order: "desc"
    }
];

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    //console.log("rowIndex", rowIndex);
    return (
        <div className="actions-buttons d-flex justify-content-center align-items-top">
            <Button variant="btn btn-link" className="text-success"><i classNam="fal fa-book-reader" /></Button>
            <Button variant="btn btn-link" className="text-primary"><i classNam="fal fa-clipboard" /></Button>
        </div>
    );
}

