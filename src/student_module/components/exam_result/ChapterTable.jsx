import React, { Component } from 'react'
import { Col, Button, Card, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap'
import '../exams/_resultmodel.scss'
import '../navbars/_navbars.scss'


class ChapterTable extends Component {
    constructor(props) {
        super(props)
        //onsole.log("props.ChapterTableData",props.ChapterTableData);
        this.state = {
            ChapterTableData:[],
            direction: {
                chapter_name: "asc",
                subject_name: "asc",
                accuracy: "asc",
                correct: "asc",
                wrong: "asc",
                not_answered: "asc"
              }
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.ChapterTableData === prevState.ChapterTableData
          ? {}
          : {ChapterTableData: nextProps.ChapterTableData}
      }
    
    sortBy = (Key) => {
        console.log("sortBy", Key);
        let ChapterTableData = this.state.ChapterTableData
        if (Key == "chapter_name" || Key == "subject_name") {
            ChapterTableData = this.state.ChapterTableData.sort((a, b) => {
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
        else {
            ChapterTableData = this.state.ChapterTableData.sort((a, b) => {
                if (this.state.direction[Key] === "asc") {
                    return parseFloat(a[Key]) - parseFloat(b[Key])
                }
                else {
                    return parseFloat(b[Key]) - parseFloat(a[Key])
                }


            })

        }
        this.setState({
            ChapterTableData: ChapterTableData,
            direction: {
                [Key]: this.state.direction[Key] === "asc" ?
                    "desc" :
                    "asc"
            }
        })
    }


    render() {
        return (
            <React.Fragment>
                <Card.Body className="p-0">
                    <Table className="mb-0 borderless table-fixed" responsive>
                        <thead>
                            <tr>
                                <th className="col-2">Chapter <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('chapter_name')}
                                /></th>
                                <th className="col-2 text-danger">Subject <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('subject_name')}
                                /></th>
                                <th className="col-2"><i className="fas fa-fw fa-badge-percent theme-info" />Accuracy <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('accuracy')}
                                /></th>
                                <th className="col-2"><i className="fas fa-fw fa-check-circle text-success" /> Correct <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('correct')}
                                /></th>
                                <th className="col-2"><i className="fas fa-fw fa-times-circle text-danger" /> Error <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('wrong')}
                                /></th>
                                <th className="col-2"><i className="fas fa-fw fa-align-slash theme-purple" /> Not Answered <i class="fa fa-sort"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                    onClick={() => this.sortBy('not_answered')}
                                /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ChapterTableData.map((chmap) => {
                                return (
                                    <tr>
                                        <td className="col-2">{chmap.chapter_name} </td>
                                        <td className="col-2">{chmap.subject_name}</td>
                                        <td className="col-2">{chmap.accuracy}</td>
                                        <td className="col-2">{chmap.correct}</td>
                                        <td className="col-2">{chmap.wrong}</td>
                                        <td className="col-2">{chmap.not_answered}</td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </React.Fragment>

        )
    }
}

export default
    (ChapterTable);
