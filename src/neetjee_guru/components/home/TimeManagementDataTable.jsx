import React, { Component } from 'react'
// import { Link } from "react-router-dom";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TimeManagementDataTable extends Component {
    constructor(props) {
        super(props)
        console.log("QuestionTypeDataTable", props.timeData);
        let renderArray = [];
        if (props.timeData != undefined) {
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
            if (props.timeData[0] != undefined) {
                props.timeData[0].time_data.map((item, index) => {
                    if (item.complexity != "") {
                        const newObj1 = {
                            row: '0',
                            rowSpan: '',
                            colSpan: '3',
                            dataField: '',
                            isKey: false,
                            width: "",
                            headerAlign: 'center',
                            subject: item.complexity,
                            dataSort: false
                        }
                        renderArray.push(newObj1);

                        const newObj2 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'less_time' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "Less time Error"
                        }
                        renderArray.push(newObj2);
                        const newObj3 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'in_time' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "In time Error"
                        }
                        renderArray.push(newObj3);
                        const newObj4 = {
                            row: '1',
                            rowSpan: '',
                            colSpan: '',
                            dataField: 'over_time' + index,
                            dataSort: true,
                            isKey: false,
                            width: '25%',
                            headerAlign: '',
                            subject: "Over time Error"
                        }
                        renderArray.push(newObj4);

                    }

                });
            }

        }
        console.log("renderArray", renderArray);
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
                for (let i = 0; i < item.time_data.length; i++) {
                    const field1 = 'less_time' + i;
                    const field2 = 'in_time' + i;
                    const field3 = 'over_time' + i;

                    const less_timep = (parseInt(item.time_data[i].less_time) / parseInt(item.time_data[i].total) * 100);
                    let esval = "";
                    if (isNaN(less_timep)) {
                        esval = 0;
                    }
                    else {
                        esval = Math.round(less_timep);
                    }

                    const in_timep = (parseInt(item.time_data[i].in_time) / parseInt(item.time_data[i].total) * 100);
                    let erval = "";
                    if (isNaN(in_timep)) {
                        erval = 0;
                    }
                    else {
                        erval = Math.round(in_timep);
                    }

                    const over_timep = (parseInt(item.time_data[i].over_time) / parseInt(item.time_data[i].total) * 100);
                    let sval = "";
                    if (isNaN(over_timep)) {
                        sval = 0;
                    }
                    else {
                        sval = Math.round(over_timep);
                    }

                    let newObj1 = {
                        ...newObj,
                        [`${field1}`]: parseInt(item.time_data[i].less_time) + " " + esval + "%",
                        [`${field2}`]: parseInt(item.time_data[i].in_time) + " " + erval + "%",
                        [`${field3}`]: parseInt(item.time_data[i].over_time) + " " + sval + "%"
                    }
                    newObj = newObj1;
                }
                newArray.push(newObj);
            });
        }

        return newArray;

    }
    render() {


        const options = {
            page: 0,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.timeData.length
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
            <BootstrapTable data={this.tableData(this.props.timeData)} pagination={true} options={options}>
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

export default TimeManagementDataTable
