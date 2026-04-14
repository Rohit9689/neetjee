import React, { Component } from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { articledata, articlecolumns, defaultSorted } from './TableInformation';

import './_datatable.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

class AdvancedDataTable extends Component {
    render() {

        const { SearchBar } = Search;

        const customTotal = (from, to, size) => (
            <span className="ml-2 react-bootstrap-table-pagination-total">
                Showing {from} to {to} of {size} Results
            </span>
        );

        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Previous',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '25', value: 25
            },
            {
                text: '50', value: 50
            },
            {
                text: 'All', value: articledata.length
            }]  // A numeric array is also available. the purpose of above example is custom the text
        };

        const contentTable = ({ paginationTableProps }) => (

            <ToolkitProvider
                keyField="id"
                data={articledata}
                columns={articlecolumns}
                defaultSorted={defaultSorted}
                search
                bootstrap4>
                {
                    toolkitprops => (
                        <div>
                            <div className="d-flex align-items-center justify-content-end mb-3">
                                <label className="pr-2">Search:</label>
                                <SearchBar {...toolkitprops.searchProps} />
                            </div>
                            <BootstrapTable
                                bordered={false}
                                wrapperClasses="table-responsive"
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        );

        return (
            <PaginationProvider pagination={paginationFactory(options)}>
                {contentTable}
            </PaginationProvider>
        )
    }
}

export default AdvancedDataTable
