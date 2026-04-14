import React, { Component } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import BreadcrumbsSectionTwo from '../../breadcrumbs/BreadcrumbsSectionTwo'
import DataTableWithOutSearch from '../../datatables/DataTableWithOutSearch'
import { Data, Columns, defaultSorted } from './OurQuestionTableData';

import './_ourquestions.scss'

class OurQuestionSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BreadcrumbData: {
                Title: 'Our Questions',
                btnName: 'Add Questions',
                Link: '/questions/our-questions/manage-our-question-paper'
            },
            tableHeaderData: {
                Title: 'Own question Papers'
            }
        }
    }

    render() {
        return (
            <section className="our_questions">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbsSectionTwo breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="table-responsive">
                            <Table className="questions_table bg-white shadow-sm" bordered>
                                <tbody className="body-bordered-table">
                                    <tr className="row-table">
                                        <td>
                                            <h6>NEET</h6>
                                            <h4>8,120 </h4>
                                        </td>
                                        <td width="60px" rowSpan="2" className="bg-gray">
                                            <h4 className="rotate-90">Class XI</h4>
                                        </td>
                                        <td>
                                            <h6>Biology</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>physics</h6>
                                            <h4>5,075</h4>
                                        </td>
                                        <td>
                                            Empty
                                        </td>
                                        <td>
                                            <h6>Zoology</h6>
                                            <h4>5,075</h4>
                                        </td>
                                        <td width="60px" rowSpan="2" className="bg-gray">
                                            <h4 className="rotate-90">Class XII</h4>
                                        </td>
                                        <td>
                                            <h6>Biology</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>physics</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>Chemistry</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>Zoology</h6>
                                            <h4>5,075</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h6>JEE (Adv &amp; Mains)</h6>
                                            <h4>12,180</h4>
                                        </td>
                                        <td>
                                            <h6>Mathematics</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>physics</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>Chemistry</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>Chemistry</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>Mathematics</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            <h6>physics</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                        <td>
                                            Empty
                                        </td>
                                        <td>
                                            <h6>Chemistry</h6>
                                            <h4>5,075 </h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <DataTableWithOutSearch
                            parentData={Data}
                            particlecolumns={Columns}
                            defaultSorted={defaultSorted}
                            tableHeading={this.state.tableHeaderData} />
                    </Col>
                </Row>
            </section>
        )
    }
}

export default OurQuestionSection
