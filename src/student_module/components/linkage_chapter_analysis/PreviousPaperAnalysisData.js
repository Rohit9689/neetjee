import React from 'react'

export const SubjectBotanyData = [
    { id: 1, complexity: 'Easy', qstn: '40' },
    { id: 2, complexity: 'Moderate', qstn: '60' },
    { id: 3, complexity: 'Difficulty', qstn: '40' },
    { id: 4, complexity: 'Very Difficult', qstn: '40' }
];

export const SubjectBotanyColumns = [
    {
        dataField: "complexity",
        text: "Complexity",
        sort: true,
        footer: "Total"
    },
    {
        dataField: "qstn",
        text: "Qstn",
        sort: true,
        footer: "180"
    },
    {
        dataField: "2015",
        text: "2015",
        sort: true,
        formatter: actionsFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "2016",
        text: "2016",
        sort: true,
        formatter: actionsFormatter2,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "2017",
        text: "2017",
        sort: true,
        formatter: actionsFormatter3,
        attrs: { className: "cellClass" },
        footer: "45"
        // headerAttrs: { width: 50 },
        // headerAlign: 'center',
        // align: 'center',
        // attrs: { width: 50, className: "EditRow" }
    },
    {
        dataField: "2018",
        text: "2018",
        sort: true,
        formatter: actionsFormatter4,
        attrs: { className: "cellClass" },
        footer: "45"
    },
];

export const defaultSorted = [
    {
        dataField: "title",
        order: "desc"
    }
];

function actionsFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function actionsFormatter2(cell, row) {
    return (
        <div className="text">
            <div>20 <small>25%</small></div>
        </div>
    );
}
function actionsFormatter3(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function actionsFormatter4(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

