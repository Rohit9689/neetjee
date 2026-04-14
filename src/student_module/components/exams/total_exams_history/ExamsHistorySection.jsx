import React, { Component } from 'react'
import { components } from 'react-select'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown'
import { Row, Col, Nav, Card, CardGroup, Tab, Image, Button } from 'react-bootstrap'
import CardLessDataTableWithOutSearch from "../../../../neetjee_guru/components/datatables/CardLessDataTableWithOutSearch"
import error_logo from '../../../../images/error.png'
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

const subject = [{
    value: "1",
    label: "Botany"
},
{
    value: "2",
    label: "Pysics"
}, {
    value: "3",
    label: "Chemistry"
}, {
    value: "4",
    label: "Zoology"
}]

const examtype = [{
    value: "1",
    label: "Practise"
},
{
    value: "2",
    label: "Error"
}]

const examtype2 = [{
    value: "1",
    label: "Cumulative"
},
{
    value: "2",
    label: "Semi Grand"
},
{
    value: "3",
    label: "Grand"
}]


class ExamsHistorySection extends Component {
    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
          <div className="actions-buttons d-flex justify-content-end align-items-top">
            <Button variant="outline-primary" className="font-weight-bold"><i class="px-3 fas fa-chart-line table_chart_icon" /></Button>
          </div>
        );
      }
      actionsFormatter1(cell, row, rowIndex, formatExtraData) {
        return (
          <div className="actions-buttons d-flex justify-content-start align-items-top">
            <Button variant="outline-primary" className="font-weight-bold"><div className="table_viewQA px-3">Q &amp; A</div></Button>
          </div>
        );
      }
    practiceGetTable() {
        let newarr = [
            {
                Date: "2020/12/07",
                etype: "Cumulative",
                Time: "11:46:50",
                Score: "173/300",
                Accuracy: "64%",
                SkippedQuestions: "8",
                WrongQuestions: "19",

            },
            {
                Date: "2020/12/07",
                etype: "Cumulative",
                Time: "11:46:50",
                Score: "173/300",
                Accuracy: "64%",
                SkippedQuestions: "8",
                WrongQuestions: "19",

            },
            {
                Date: "2020/12/07",
                etype: "Cumulative",
                Time: "11:46:50",
                Score: "173/300",
                Accuracy: "64%",
                SkippedQuestions: "8",
                WrongQuestions: "19",

            },
            {
                Date: "2020/12/07",
                etype: "Cumulative",
                Time: "11:46:50",
                Score: "173/300",
                Accuracy: "64%",
                SkippedQuestions: "8",
                WrongQuestions: "19",

            },
            {
                Date: "2020/12/07",
                etype: "Cumulative",
                Time: "11:46:50",
                Score: "173/300",
                Accuracy: "64%",
                SkippedQuestions: "8",
                WrongQuestions: "19",

            }

        ];
        return newarr;

    }
    articlecolumns() {
        let articlecolumns = [];

        articlecolumns = [
            {
                dataField: "Date",
                text: "Date",
                sort: true
            },
            {
                dataField: "etype",
                text: "Exm Type",
                sort: true
            },
            {
                dataField: "Time",
                text: "Time Taken"
            },
            {
                dataField: "Score",
                text: "Score",
                sort: true
            },
            {
                dataField: "Accuracy",
                text: "Accuracy",
                sort: true
            },
            {
                dataField: "SkippedQuestions",
                text: "Skipped Questions",
                sort: true
            },
            {
                dataField: "WrongQuestions",
                text: "Wrong Questions",
                sort: true
            }
            ,
            {
                dataField: "Actions",
                text: "Actions",
                sort: true,
                formatter: this.actionsFormatter,
                headerAlign: 'right',
                align: 'right',
                
            }
            ,
            {
                dataField: "Actions",
                formatter: this.actionsFormatter1,
                headerAlign: 'left',
                align: 'left',
                
            }

        ];



        return articlecolumns;
    }
    render() {

        return (
            <div className="schedule_exams pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h5 className="title mb-3">Exams History</h5>
                    </Col>
                </Row>

                <Tab.Container id="schedule-exams-tabs" defaultActiveKey="first">
                    <Card className="border-0">
                        <Card.Header className="border-0 bg-white pb-0">
                            <div className="d-md-flex justify-content-between align-items-center">
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Practise -2</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Exams -3</Nav.Link>
                                    </Nav.Item>

                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className="split d-flex">
                                            <div className="first mr-2 mb-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="subject"
                                                    options={subject}
                                                    placeholderName={'Subject'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                            <div className="second mr-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="subject"
                                                    options={subject}
                                                    placeholderName={'Chapter'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                            <div className="third mr-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="examtype"
                                                    options={examtype}
                                                    placeholderName={'Exam Type'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div className="split d-flex">
                                            <div className="first mr-2 mb-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="subject"
                                                    options={subject}
                                                    placeholderName={'Subject'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                            <div className="second mr-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="subject"
                                                    options={subject}
                                                    placeholderName={'Chapter'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                            <div className="third mr-2" style={{ width: 150 }}>
                                                <SelectDropDown
                                                    name="examtype"
                                                    options={examtype2}
                                                    placeholderName={'Exam Type'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>

                            </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0">Practise History</h6>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><i className="fas fa-check-double color_green font_18 font-weight-bold"></i></div>
                                                                            <div className="color_green font_18 font-weight-bold">100%</div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Overall Accuracy</p>
                                                                        <p className="color_yash font_12 font-weight-bold">of Exam &amp; Practise</p>
                                                                    </Col>
                                                                </Row>
                                                                <a style={{ textDecoration: 'none' }}

                                                                >
                                                                    <div className="button_bg_green rounded p-2 m-0 d-flex justify-content-between align-items-center ">


                                                                        <p className="color_green font_14 font-weight-bold text-center mb-0">
                                                                            Start Learning</p><i className="fas fa-arrow-right color_green font-weight-bold"></i>

                                                                    </div>
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><i className="fas fa-alarm-clock fa-2x text-primary"></i></div>
                                                                            <div className="color_blue font_18 font-weight-bold">
                                                                                12:34:60
                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Time Analysis</p>
                                                                        <p className="color_yash font_12 font-weight-bold">Your Average Time Per Question</p>
                                                                    </Col>
                                                                </Row>
                                                                <a style={{ textDecoration: 'none' }}
                                                                >
                                                                    <div className="button_bg_blue rounded p-2 d-flex justify-content-between align-items-center">
                                                                        <p className="color_blue font_14 font-weight-bold text-center mb-0">Start Practise</p>
                                                                        <i className="fas fa-arrow-right color_blue font-weight-bold"></i>
                                                                    </div>
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><Image src={error_logo} alt="Image" /></div>
                                                                            <div className="color_red font_18 font-weight-bold">20</div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Pending</p>
                                                                        <p className="color_333 font_14 font-weight-bold">Error Questions</p>
                                                                    </Col>
                                                                </Row>

                                                                <a style={{ textDecoration: 'none' }}

                                                                >
                                                                    <div className="button_bg_red rounded p-2 d-flex justify-content-between align-items-center">
                                                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">Start Error Exam</p>
                                                                        <i className="fas fa-arrow-right color_dark_red font-weight-bold"></i>
                                                                    </div>
                                                                </a>


                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
                                                        <CardLessDataTableWithOutSearch
                                                            parentData={this.practiceGetTable(this.props.getStudentExamSessions)}
                                                            particlecolumns={this.articlecolumns()}
                                                            defaultSorted={{ dataField: "Accuracy", order: "desc" }}
                                                        // tableHeading={{Title:"Sample"}}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    <CardGroup>
                                        <Card>
                                            <Card.Header className="tab-title">
                                                <h6 className="mb-0">Exams History</h6>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><i className="fas fa-check-double color_green font_18 font-weight-bold"></i></div>
                                                                            <div className="color_green font_18 font-weight-bold">100%</div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Overall Accuracy</p>
                                                                        <p className="color_yash font_12 font-weight-bold">of Exam &amp; Practise</p>
                                                                    </Col>
                                                                </Row>
                                                                <a style={{ textDecoration: 'none' }}

                                                                >
                                                                    <div className="button_bg_green rounded p-2 m-0 d-flex justify-content-between align-items-center ">


                                                                        <p className="color_green font_14 font-weight-bold text-center mb-0">
                                                                            Start Learning</p><i className="fas fa-arrow-right color_green font-weight-bold"></i>

                                                                    </div>
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><i className="fas fa-alarm-clock fa-2x text-primary"></i></div>
                                                                            <div className="color_blue font_18 font-weight-bold">
                                                                                12:34:60
                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Time Analysis</p>
                                                                        <p className="color_yash font_12 font-weight-bold">Your Average Time Per Question</p>
                                                                    </Col>
                                                                </Row>
                                                                <a style={{ textDecoration: 'none' }}
                                                                >
                                                                    <div className="button_bg_blue rounded p-2 d-flex justify-content-between align-items-center">
                                                                        <p className="color_blue font_14 font-weight-bold text-center mb-0">Start Practise</p>
                                                                        <i className="fas fa-arrow-right color_blue font-weight-bold"></i>
                                                                    </div>
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-2">
                                                        <Card className="card_bg h-100">
                                                            <Card.Body className="p-2">
                                                                <Row>
                                                                    <Col className="ml-3">
                                                                        <div className="d-lg-flex justify-content-between align-items-center mt-1">
                                                                            <div><Image src={error_logo} alt="Image" /></div>
                                                                            <div className="color_red font_18 font-weight-bold">20</div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="ml-3" style={{ minHeight: 80 }}>
                                                                        <p className="color_333 font-weight-bold mb-0 mt-1 font_14">Pending</p>
                                                                        <p className="color_333 font_14 font-weight-bold">Error Questions</p>
                                                                    </Col>
                                                                </Row>

                                                                <a style={{ textDecoration: 'none' }}

                                                                >
                                                                    <div className="button_bg_red rounded p-2 d-flex justify-content-between align-items-center">
                                                                        <p className="color_dark_red font_14 font-weight-bold text-center mb-0">Start Error Exam</p>
                                                                        <i className="fas fa-arrow-right color_dark_red font-weight-bold"></i>
                                                                    </div>
                                                                </a>


                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-3">
                                                        <CardLessDataTableWithOutSearch
                                                            parentData={this.practiceGetTable(this.props.getStudentExamSessions)}
                                                            particlecolumns={this.articlecolumns()}
                                                            defaultSorted={{ dataField: "Accuracy", order: "desc" }}
                                                        // tableHeading={{Title:"Sample"}}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </Tab.Pane>

                            </Tab.Content>
                        </Card.Body>
                    </Card>
                </Tab.Container>
            </div>
        )
    }
}

export default ExamsHistorySection;
