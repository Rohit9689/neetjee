import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";

import './_datatable.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        <div className="actions-buttons d-flex justify-content-center align-items-top">
            <Button variant="link" className="text-theme"><i className="far fa-eye" /></Button>
            <Button variant="link" className="text-theme"><i className="far fa-edit" /></Button>
            <Button variant="link" className="text-danger"><i className="far fa-trash-alt" /></Button>
        </div>
    );
}

const articledata = [
    { id: 1, title: 'Lorem ipsum dolor sit it.', category: 'Simply-01', status: 'Published', date: '20 - 07 - 2019', views: 530, likes: 25, dislikes: 30 },
    { id: 2, title: 'Lorem ipsum dolor sit.', category: 'Simply-02', status: 'Published', date: '20 - 07 - 2019', views: 25, likes: 20, dislikes: 25 },
    { id: 3, title: 'Lorem ipsum dolor sit.', category: 'Simply-03', status: 'Published', date: '20 - 07 - 2019', views: 50, likes: 25, dislikes: 45 },
    { id: 4, title: 'Lorem ipsum dolor sit.', category: 'Simply-04', status: 'Published', date: '20 - 07 - 2019', views: 25, likes: 60, dislikes: 12 },
    { id: 5, title: 'Lorem ipsum dolor sit.', category: 'Simply-05', status: 'Published', date: '20 - 07 - 2019', views: 60, likes: 25, dislikes: 60 }
];

const articlecolumns = [
    {
        dataField: "title",
        text: "Title",
        sort: true
    },
    {
        dataField: "category",
        text: "Category",
        sort: true
    },

    {
        dataField: "status",
        text: "Status",
        sort: true
    },
    {
        dataField: "date",
        text: "Date",
        sort: true
    },
    {
        dataField: "views",
        text: "Views",
        sort: true
    },
    {
        dataField: "likes",
        text: "Likes",
        sort: true
    },
    {
        dataField: "dislikes",
        text: "DisLikes",
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

const defaultSorted = [
    {
        dataField: "title",
        order: "desc"
    }
];

class DataTable extends Component {
    render() {
        return (
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white">
                    <Card.Title className="mb-0">Top 5 Articles</Card.Title>
                </Card.Header>
                <Card.Body>
                    <BootstrapTable
                        keyField="id"
                        data={articledata}
                        columns={articlecolumns}
                        defaultSorted={defaultSorted}
                        bordered={false}
                        wrapperClasses="table-responsive"
                        bootstrap4
                    />
                </Card.Body>
            </Card>
        )
    }
}

export default DataTable
