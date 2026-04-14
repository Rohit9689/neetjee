import React, { Component } from 'react'
import { Col, Button, Card, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap'
import '../exams/_resultmodel.scss'
import '../navbars/_navbars.scss'


class QuestionTypeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            QuestionTypeTableData: props.QuestionTypeTableData,
            direction: {
                question_type_name: "asc",
                accuracy: "asc",
                correct: "asc",
                wrong: "asc",
                not_answered: "asc",
                total_time: "asc",
                avg: "asc"

            }
        }
    }
    sortBy = (Key) => {
        console.log("sortBy", Key);
        let QuestionTypeTableData = this.state.QuestionTypeTableData
        if (Key == "question_type_name") {
             QuestionTypeTableData = this.state.QuestionTypeTableData.sort((a, b) => {
                if (this.state.direction[Key] === "asc") {
                    if (a[Key] > b[Key]) {
                        return -1;
                    }
                    if (a[Key] < b[Key]) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    if (a[Key] < b[Key]) {
                        return -1;
                    }
                    if (a[Key] > b[Key]) {
                        return 1;
                    }
                    return 0;
                }


            })
        }
        else{
             QuestionTypeTableData = this.state.QuestionTypeTableData.sort((a, b) => {
                if (this.state.direction[Key] === "asc") {
                    return parseFloat(a[Key])-parseFloat(b[Key])
                }
                else {
                    return parseFloat(b[Key])-parseFloat(a[Key])
                }


            })

        }
        this.setState({
            QuestionTypeTableData: QuestionTypeTableData,
            direction: {
                [Key]: this.state.direction[Key] === "asc" ?
                    "desc" :
                    "asc"
            }
        })
    }


    render() {
        return (
            <Col xl={12} lg={12} md={12} className="my-3">
                <Card className="h-100 questiontypeanalysis-table shadow">
                    <Card.Header className="bg-white mb-0">
                        <Card.Title className="mb-0">Question Type Analysis</Card.Title>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table className="mb-0 borderless" responsive>
                            <thead>
                                <tr>
                                    <th>Question <br />Type 
                                    <i class="fa fa-sort" 
                                    style={{ cursor: "pointer" }} 
                                    aria-hidden="true" 
                                    onClick={() => this.sortBy('question_type_name')} 
                                    />
                                    </th>
                                    <th><i className="fas fa-fw fa-badge-percent theme-info" /><div>Accuracy (%)</div> <i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('accuracy')} /></th>
                                    <th><i className="fas fa-fw fa-check-circle text-success" /><div>Correct</div> <i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('correct')} /></th>
                                    <th><i className="fas fa-times-circle text-danger" /><div>Wrong</div> <i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('wrong')} /></th>
                                    <th><i className="fas fa-fw fa-align-slash theme-purple" /><div>Not Ans</div><i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('not_answered')} /></th>
                                    <th>Total<br />Time(Min) <i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('total_time')} /></th>
                                    <th>AVG Time<br />(Sec/Q) <i class="fa fa-sort" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.sortBy('avg')} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.QuestionTypeTableData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.question_type_name}</td>
                                        <td className="theme-info">{item.accuracy}</td>
                                        <td className="text-success">{item.correct}</td>
                                        <td className="text-danger">{item.wrong}</td>
                                        <td className="theme-purple">{item.not_answered}</td>
                                        <td>{item.total_time}</td>
                                        <td>{item.avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>

        )
    }
}

export default
    (QuestionTypeTable);
