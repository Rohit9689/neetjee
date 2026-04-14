import React from 'react'
import ExpandRow from './ExpandRow';

export const chapterwiseBotanyData = [
    { id: 1, chaptername: 'Human Anatomy and Physiology-I', qstn: '40' },
    { id: 2, chaptername: 'Digestion and absorption', qstn: '60' },
    { id: 3, chaptername: 'Breathing and Respiration', qstn: '40' },
    { id: 4, chaptername: 'Human Anatomy and Physiology-II', qstn: '40' }
];

export const chapterwiseBotanyColumns = [
    {
        dataField: "chaptername",
        text: "Chapter Name",
        sort: true,
        footer: "Total",

    },
    {
        dataField: "qstn",
        text: "Qstn",
        sort: true,
        footer: "180"
    },
    {
        dataField: "one",
        text: "2007",
        sort: true,
        formatter: oneFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "two",
        text: "2008",
        sort: true,
        formatter: twoFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "three",
        text: "2009",
        sort: true,
        formatter: threeFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "four",
        text: "2010",
        sort: true,
        formatter: fourFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "five",
        text: "2011",
        sort: true,
        formatter: fiveFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "six",
        text: "2012",
        sort: true,
        formatter: sixFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "seven",
        text: "2013",
        sort: true,
        formatter: sevenFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "eight",
        text: "2014",
        sort: true,
        formatter: eightFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "nine",
        text: "2015",
        sort: true,
        formatter: nineFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "ten",
        text: "2016",
        sort: true,
        formatter: tenFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "eleven",
        text: "2017",
        sort: true,
        formatter: elevenFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
    {
        dataField: "twelve",
        text: "2018",
        sort: true,
        formatter: twelveFormatter,
        attrs: { className: "cellClass" },
        footer: "45"
    },
];

export const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
        <ExpandRow />
    ),
    showExpandColumn: true
};

export const chapterwiseBotanydefaultSorted = [
    {
        dataField: "title",
        order: "desc"
    }
];

function oneFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function twoFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function threeFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function fourFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function fiveFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function sixFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function sevenFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function eightFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function nineFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}

function tenFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function elevenFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
function twelveFormatter(cell, row) {
    return (
        <div className="text">
            <div>10 <small>25%</small></div>
        </div>
    );
}
