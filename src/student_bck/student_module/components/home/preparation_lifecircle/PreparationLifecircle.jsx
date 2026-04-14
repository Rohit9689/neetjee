import React, { Component } from 'react'
import { Card, CardGroup, Image, Button } from 'react-bootstrap'
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';

import BookMarksModal from '../help_system/BookMarksModal';
import ExamModal from '../help_system/ExamModal';
import ExecuteModal from '../help_system/ExecuteModal';
import GetReadyForExamModal from '../help_system/GetReadyForExamModal';
import GetReadyForExamToolModal from '../help_system/GetReadyForExamToolModal';
import MeasureModal from '../help_system/MeasureModal';
import NotesModal from '../help_system/NotesModal';
import PlanModal from '../help_system/PlanModal';
import PractiseModal from '../help_system/PractiseModal';
import PreviousPaperAnalysisModal from '../help_system/PreviousPaperAnalysisModal';
import PreviousPapersExamsModal from '../help_system/PreviousPapersExamsModal';
import ResultAndAnalysisModal from '../help_system/ResultAndAnalysisModal';
import RevisionMaterialModal from '../help_system/RevisionMaterialModal';
import ShortNotesModal from '../help_system/ShortNotesModal';
import WarmUpModal from '../help_system/WarmUpModal';

export class PreparationLifecircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
        this.preLoader = this.preLoader.bind(this);
    }

    componentDidMount() {
        setTimeout(this.preLoader, 1000);
    }

    preLoader() {
        this.setState({ isLoading: false })
    }

    render() {
        return (
            this.state.isLoading ?
                <Card className="preparation-lifecircle my-3 border-0">
                    <div className="showcase-component">
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={270}
                            viewBox="0 0 420 270"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="8" y="4" rx="2" ry="2" width="400" height="270" />
                        </ContentLoader>
                    </div>
                </Card>
                :
                <Card as={Card.Body} className="preparation-lifecircle p-0 h-100">
                    <Card.Title className="text-uppercase text-center my-4">STUDENT PREPARATION LIFE CYCLE</Card.Title>
                    <CardGroup className="p-0">
                        <Card className="p-2">
                            <div className="life-circle-heading">
                                <Link to="#" className="btnBg btnOne" onClick={() => this.setState({ planModalShow: true })}><span>Plan</span></Link>
                            </div>
                            <ul className="list-unstyled mt-4 mx-auto">
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ prevPaperAnaModalShow: true })}>Previous Paper Analysis</Button></li>
                            </ul>
                        </Card>
                        <Card className="p-2">
                            <div className="life-circle-heading">
                                <Link to="#" className="btnBg btnTwo" onClick={() => this.setState({ executeModalShow: true })}><span>Execute</span></Link>
                            </div>
                            <ul className="list-unstyled mt-4 mx-auto">
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ practiseModalShow: true })}>Practice</Button></li>
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ getReadyForExamModalShow: true })}>Get Ready For Exam</Button></li>
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ examModalShow: true })}>Custom Exams</Button></li>
                                {/* <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ shortNotesModalShow: true })}>Short Notes</Button></li> */}
                            </ul>
                        </Card>
                        <Card className="p-2">
                            <div className="life-circle-heading">
                                <Link to="#" className="btnBg btnThree" onClick={() => this.setState({ measureModalShow: true })}><span>Measure</span></Link>
                            </div>
                            <ul className="list-unstyled mt-4 mx-auto">
                                <li><Button className="btn btn-light rounded-pill" 
                                //onClick={() => this.setState({ resultAndAnalysisModalShow: true })}
                                >Performance &amp; Analysis</Button></li>
                            </ul>
                        </Card>
                        <Card className="p-2">
                            <div className="life-circle-heading">
                                <Link to="#" className="btnBg btnFour" onClick={() => this.setState({ warmUPModalShow: true })}><span>Warm Up</span></Link>
                            </div>
                            <ul className="list-unstyled mt-4 mx-auto">
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ shortNotesModalShow: true })}>Short Notes</Button></li>
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ revisionMaterialModalShow: true })}>Revisional Material</Button></li>
                                <li><Button className="btn btn-light rounded-pill" onClick={() => this.setState({ prevPaperExamUPModalShow: true })}>Previous Paper Exams</Button></li>
                            </ul>
                        </Card>
                    </CardGroup>

                    <div className="preparation-lifecircle-footer d-flex flex-column justify-content-center align-items-center">
                        <Link to="#" className="btnBg text-dark text-decoration-none" onClick={() => this.setState({ getReadyForExamToolModalShow: true })}><span>Tools</span></Link>
                        <ul className="list-inline my-3">
                            <li className="list-inline-item"><Button onClick={() => this.setState({ bookMarksModalShow: true })}>Bookmark</Button></li>
                            <li className="list-inline-item"><Button onClick={() => this.setState({ notesModalShow: true })}>Notes</Button></li>
                            <li className="list-inline-item"><Button onClick={() => this.setState({ getReadyForExamModalShow: true })}>Get Ready For Exam</Button></li>
                        </ul>
                        <Image src={require('../../../../images/preparationLifecircle/bottom_sahpe.svg')} alt="img" />
                    </div>

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
                </Card>
        )
    }
}

export default PreparationLifecircle
