import React, { Component } from 'react'
// import { Link } from "react-router-dom";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class QuestionTypeDataTable extends Component {
    constructor(props) {
        super(props)
        console.log("ErrorSkippedTable", props.questiontypeData);
        let renderArray = [];
        if (props.questiontypeData != undefined) {
            renderArray = [
                {
                    row: '0',
                    rowSpan: '2',
                    colSpan: '',
                    dataField: 'names',
                    isKey: true,
                    width: "25%",
                    subject: "Name",
                    headerAlign: '',
                    dataSort: false
                }
            ];
            if (props.questiontypeData[0] != undefined) {
                props.questiontypeData[0].qtype_data.map((item, index) => {

                    if (item.questiontype != "") {
                        const newObj1 = {
                            row: '0',
                            rowSpan: '',
                            colSpan: '3',
                            dataField: '',
                            isKey: false,
                            width: "",
                            headerAlign: 'center',
                            subject: item.questiontype,
                            dataSort: false
                        }
                        renderArray.push(newObj1);

                        const newObj2 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'error_skipped' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "Error skipped"
                        }
                        renderArray.push(newObj2);
                        const newObj3 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'error' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "Error"
                        }
                        renderArray.push(newObj3);
                        const newObj4 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'skipped' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "Skipped"
                        }
                        renderArray.push(newObj4);

                    }



                });
            }


        }
        this.state = {
            renderArray: renderArray
        }
    }
    renderShowsTotal(start, to, total) {
        return (
            <p className="text-muted">
                Showing {start} to {to}, totals is {total}&nbsp;&nbsp; entries
            </p>
        );
    }

    tableData(data) {
        let newArray = [];
        if (data != undefined) {
            data.map((item) => {
                let newObj = {
                    id: item.id,
                    names: item.section_name,

                }
                for (let i = 0; i < item.qtype_data.length; i++) {
                    const field1 = 'error_skipped' + i;
                    const field2 = 'error' + i;
                    const field3 = 'skipped' + i;

                    const error_skippedp = (parseInt(item.qtype_data[i].error_skipped) / parseInt(item.qtype_data[i].total) * 100);
                    let esval = "";
                    if (isNaN(error_skippedp)) {
                        esval = 0;
                    }
                    else {
                        esval = Math.round(error_skippedp);
                    }

                    const errorp = (parseInt(item.qtype_data[i].error) / parseInt(item.qtype_data[i].total) * 100);
                    let erval = "";
                    if (isNaN(errorp)) {
                        erval = 0;
                    }
                    else {
                        erval = Math.round(errorp);
                    }

                    const skippedp = (parseInt(item.qtype_data[i].skipped) / parseInt(item.qtype_data[i].total) * 100);
                    let sval = "";
                    if (isNaN(skippedp)) {
                        sval = 0;
                    }
                    else {
                        sval = Math.round(skippedp);
                    }

                    let newObj1 = {
                        ...newObj,
                        [`${field1}`]: parseInt(item.qtype_data[i].error_skipped) + " " + esval + "%",
                        [`${field2}`]: parseInt(item.qtype_data[i].error) + " " + erval + "%",
                        [`${field3}`]: parseInt(item.qtype_data[i].skipped) + " " + sval + "%"
                    }
                    newObj = newObj1;
                }
                newArray.push(newObj);
            });
        }

        return newArray;

    }
    render() {
        console.log("this.props.questiontypeData.length", this.state.renderArray);

        const options = {
            page: 0,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.questiontypeData.length
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            hideSizePerPage: true // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };

        return (
            <BootstrapTable data={this.tableData(this.props.questiontypeData)} pagination={true} options={options}>
                {this.state.renderArray.map((item) => {
                    return (<TableHeaderColumn
                        row={item.row}
                        rowSpan={item.rowSpan}
                        colSpan={item.colSpan}
                        dataField={item.dataField}
                        isKey={item.isKey}
                        width={item.width}
                        headerAlign={item.headerAlign}
                        dataSort={item.dataSort}
                    >
                        {item.subject}</TableHeaderColumn>);
                })}
            </BootstrapTable>
        )
    }
}

export default QuestionTypeDataTable
