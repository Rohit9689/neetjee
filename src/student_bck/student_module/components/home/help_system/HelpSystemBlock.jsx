import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlanModal from './PlanModal';
import ExecuteModal from './ExecuteModal';
import MeasureModal from './MeasureModal';
import WarmUpModal from './WarmUpModal';
import PreviousPapersExamsModal from './PreviousPapersExamsModal';
import RevisionMaterialModal from './RevisionMaterialModal';
import ShortNotesModal from './ShortNotesModal';
import PreviousPaperAnalysisModal from './PreviousPaperAnalysisModal';
import PractiseModal from './PractiseModal';
import GetReadyForExamModal from './GetReadyForExamModal';
import ExamModal from './ExamModal';
import ResultAndAnalysisModal from './ResultAndAnalysisModal';
import GetReadyForExamToolModal from './GetReadyForExamToolModal';
import NotesModal from './NotesModal';
import BookMarksModal from './BookMarksModal';

class HelpSystemBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planModalShow: false,
            executeModalShow: false,
            measureModalShow: false,
            warmUPModalShow: false,
            prevPaperExamUPModalShow: false,
            revisionMaterialModalShow: false,
            shortNotesModalShow: false,
            prevPaperAnaModalShow: false,
            practiseModalShow: false,
            getReadyForExamModalShow: false,
            examModalShow: false,
            resultAndAnalysisModalShow: false,
            getReadyForExamToolModalShow: false,
            notesModalShow: false,
            bookMarksModalShow: false
        };
    }


    render() {
        return (
            <React.Fragment>
                <Card className=" my-3 border-0">
                    <Card.Header className="bg-white border-0 d-flex align-items-center px-4">
                        <i className="mr-2 fa-2x fad fa-history icon" /> <h6 className="mb-0">Help system block</h6>
                    </Card.Header>
                    <Card.Body>
                        <ul className="tags-list list-inline">
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ planModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Plan
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ executeModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Execute
                            </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ measureModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Measure
                            </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ warmUPModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Warm Up
                            </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ prevPaperExamUPModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Previous Paper Exam
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ revisionMaterialModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Revision Material
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ shortNotesModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Short Notes
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ prevPaperAnaModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Previous Paper Analysis
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ practiseModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Practise
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ getReadyForExamModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Get Ready For Exam
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ examModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Exam
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ resultAndAnalysisModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Result & Analysis
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ getReadyForExamToolModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Get Ready For Exam_Tool
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ notesModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />Notes
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={() => this.setState({ bookMarksModalShow: true })} className="text-muted">
                                    <i className="mr-2 fad fa-check-circle" />BookMarks
                                </Link>
                            </li>
                        </ul>
                    </Card.Body>
                </Card>

                <PlanModal show={this.state.planModalShow} onHide={() => this.setState({ planModalShow: false })} />
                <ExecuteModal show={this.state.executeModalShow} onHide={() => this.setState({ executeModalShow: false })} />
                <MeasureModal show={this.state.measureModalShow} onHide={() => this.setState({ measureModalShow: false })} />
                <WarmUpModal show={this.state.warmUPModalShow} onHide={() => this.setState({ warmUPModalShow: false })} />
                <PreviousPapersExamsModal show={this.state.prevPaperExamUPModalShow} onHide={() => this.setState({ prevPaperExamUPModalShow: false })} />
                <RevisionMaterialModal show={this.state.revisionMaterialModalShow} onHide={() => this.setState({ revisionMaterialModalShow: false })} />
                <ShortNotesModal show={this.state.shortNotesModalShow} onHide={() => this.setState({ shortNotesModalShow: false })} />
                <PreviousPaperAnalysisModal show={this.state.prevPaperAnaModalShow} onHide={() => this.setState({ prevPaperAnaModalShow: false })} />
                <PractiseModal show={this.state.practiseModalShow} onHide={() => this.setState({ practiseModalShow: false })} />
                <GetReadyForExamModal show={this.state.getReadyForExamModalShow} onHide={() => this.setState({ getReadyForExamModalShow: false })} />
                <ExamModal show={this.state.examModalShow} onHide={() => this.setState({ examModalShow: false })} />
                <ResultAndAnalysisModal show={this.state.resultAndAnalysisModalShow} onHide={() => this.setState({ resultAndAnalysisModalShow: false })} />
                <GetReadyForExamToolModal show={this.state.getReadyForExamToolModalShow} onHide={() => this.setState({ getReadyForExamToolModalShow: false })} />
                <NotesModal show={this.state.notesModalShow} onHide={() => this.setState({ notesModalShow: false })} />
                <BookMarksModal show={this.state.bookMarksModalShow} onHide={() => this.setState({ bookMarksModalShow: false })} />
            </React.Fragment>
        )
    }

}

export default HelpSystemBlock
