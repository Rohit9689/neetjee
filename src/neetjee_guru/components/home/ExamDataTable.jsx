import React, { Component } from 'react'
// import { Link } from "react-router-dom";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ExamDataTable extends Component {
    constructor(props) {
        super(props)
        console.log("ExamDataTable", props.examdata);
        let renderArray = [
            {
                row: '0',
                rowSpan: '2',
                colSpan: '',
                dataField: 'names',
                isKey: true,
                width: "25%",
                subject: "Name",
                headerAlign: '',
                dataSort: false,
                format: this.sectionnameFun
            },
            {
                row: '0',
                rowSpan: '2',
                colSpan: '',
                dataField: 'noofstudents',
                isKey: false,
                width: "25%",
                subject: "Appeared/Total No Of students",
                headerAlign: '',
                dataSort: false,
                format: ""
            }
        ];
        if (props.examdata[0] != undefined) {
            props.examdata[0].exam_table_data.map((item, index) => {
                if (item.subject != "") {
                    const newObj1 = {
                        row: '0',
                        rowSpan: '',
                        colSpan: '3',
                        dataField: 'names',
                        isKey: false,
                        width: "",
                        headerAlign: 'center',
                        subject: item.subject,
                        dataSort: false,
                        format: ""
                    }
                    renderArray.push(newObj1);

                    const newObj2 = {
                        row: '1',
                        rowSpan: '',
                        colSpan: '',
                        dataField: 'avgscore' + index,
                        dataSort: true,
                        isKey: false,
                        width: '25%',
                        headerAlign: '',
                        subject: "Avg Score",
                        format: ""
                    }
                    renderArray.push(newObj2);
                    const newObj3 = {
                        row: '1',
                        rowSpan: '',
                        colSpan: '',
                        dataField: 'belowavgscore' + index,
                        dataSort: true,
                        isKey: false,
                        width: '25%',
                        headerAlign: '',
                        subject: "Below Avg Score",
                        format: ""
                    }
                    renderArray.push(newObj3);
                    const newObj4 = {
                        row: '1',
                        rowSpan: '',
                        colSpan: '',
                        dataField: 'aboveavgscore' + index,
                        dataSort: true,
                        isKey: false,
                        width: '25%',
                        headerAlign: '',
                        subject: "Above Avg Score",
                        format: ""
                    }
                    renderArray.push(newObj4);

                }

            });
        }


        this.state = {
            renderArray: renderArray
        }
    }
    sectionnameFun(row) {
        console.log("sectionnameFun", row);
        //e.stopPropagation();
        //return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
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
        data.map((item) => {
            if (item.total_students != 0) {
                let newObj = {
                    id: item.id,
                    names: item.section_name,
                    //names: this.sectionnameFun,
                    noofstudents: item.no_of_student + "/" + item.total_students,
                }
                for (let i = 0; i < item.exam_table_data.length; i++) {
                    const field1 = 'avgscore' + i;
                    const field2 = 'belowavgscore' + i;
                    const field3 = 'aboveavgscore' + i;

                    const avgscorep = (parseInt(item.exam_table_data[i].avg_score_cnt) / parseInt(item.no_of_student) * 100);
                    let avgscoreval = "";
                    avgscoreval = item.exam_table_data[i].accuracy;
                    // if (field1 == "avgscore0") {

                    //     avgscoreval = item.exam_table_data[i].accuracy;

                    // }
                    // else {
                    //     if (isNaN(avgscorep)) {
                    //         avgscoreval = 0;
                    //     }
                    //     else {
                    //         avgscoreval = Math.round(avgscorep);
                    //     }
                    // }


                    const belowavgscorep = (parseInt(item.exam_table_data[i].below_score_cnt) / parseInt(item.no_of_student) * 100);
                    let belowavgscoreval = "";
                    if (isNaN(belowavgscorep)) {
                        belowavgscoreval = 0;
                    }
                    else {
                        belowavgscoreval = Math.round(belowavgscorep);
                    }

                    const aboveavgscorep = (parseInt(item.exam_table_data[i].above_score_cnt) / parseInt(item.no_of_student) * 100);
                    let aboveavgscoreval = "";
                    if (isNaN(aboveavgscorep)) {
                        aboveavgscoreval = 0;
                    }
                    else {
                        aboveavgscoreval = Math.round(aboveavgscorep);
                    }
                    let newObj1 = {
                        ...newObj,
                        [`${field1}`]: parseInt(item.exam_table_data[i].avg_score_cnt) + " " + avgscoreval + "%",
                        [`${field2}`]: parseInt(item.exam_table_data[i].below_score_cnt) + " " + belowavgscoreval + "%",
                        [`${field3}`]: parseInt(item.exam_table_data[i].above_score_cnt) + " " + aboveavgscoreval + "%"
                    }
                    newObj = newObj1;
                }
                newArray.push(newObj);
            }

        });
        return newArray;

    }


    render() {
        console.log("this.props.examdata", this.props.examdata);
        const options = {
            page: 0,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.examdata.length
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
            hideSizePerPage: true, // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            //onRowClick: this.sectionnameFun
        };

        return (
            <BootstrapTable data={this.tableData(this.props.examdata)} pagination={true} options={options}>
                {this.state.renderArray.map((item) => {
                    return (<TableHeaderColumn
                        //dataFormat={item.sectionnameFun}
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
                }

                )}
            </BootstrapTable >
        )
    }
}

export default ExamDataTable
