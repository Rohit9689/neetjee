import React from 'react'
import { Button } from "react-bootstrap";

export const articlecolumns = [
    {
        dataField: "branch_name",
        text: "Branch Name",
        sort: true
    },
    {
        dataField: "section_categories",
        text: "Sections",
        sort: true
    },
    {
        dataField: "complete_address",
        text: "Address",
        sort: true
    },
    {
        dataField: "principal",
        text: "Principal",
        sort: true
    },
    {
        dataField: "contact_no",
        text: "Contact No.",
        sort: true
    },
    {
        dataField: "actions",
        text: "Actions",
        sort: true,
        formatter: actionsFormatter,
        headerAttrs: { width: 50 },
        attrs: { width: 50, className: "EditRow" }
    }
];

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        <div className="actions-buttons d-flex justify-content-center align-items-top">
            <Button variant="link" className="text-theme"><i className="far fa-eye" /></Button>
            <Button variant="link" className="text-theme"><i className="far fa-edit" /></Button>
            <Button variant="lzink" className="text-danger"><i className="far fa-trash-alt" /></Button>
        </div>
    );
}

export const defaultSorted = [
    {
        dataField: "branch_name",
        order: "desc"
    }
];