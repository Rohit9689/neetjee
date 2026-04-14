import React, { Component } from 'react'
import BootstrapTable from "react-bootstrap-table-next";

import './_datatable.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class RowToggleDataTable extends Component {
    render() {
        
        return (
            <BootstrapTable
                keyField="id"
                data={this.props.articledata}
                columns={this.props.articlecolumns}
                defaultSorted={this.props.defaultSorted}
                // bordered={false}
                classes="table-borderless"
                wrapperClasses="table-responsive"
                expandRow={ this.props.expandRow }
                bootstrap4
            />
        )
    }
}

export default RowToggleDataTable
