import React, { Component } from 'react'
import { Container, Row, Col, Image, Modal, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GetReadyForExamModal from '../home/help_system/GetReadyForExamModal'
import PreviousPaperAnalysisModal from '../home/help_system/PreviousPaperAnalysisModal'
import NotesModal from '../home/help_system/NotesModal';
import BookMarksModal from '../home/help_system/BookMarksModal';
import ExamModal from '../home/help_system/ExamModal';
import PdfModal from '../learn_practice/subjects/PdfModal';

// import PDFFILE from '../../../images/MOCKTEST RESULTS.pdf';

class HelpImg extends Component {
    constructor(props) {
        super(props)

        this.state = {
            helpShow: false,
            getReadyForExamModalShow: false,
            mockTestModalShow:false,
            previousPaperAnalysisModal:false,
            linkageChapterAnalysisModal:false,
            notesModalShow:false,
            bookMarksModalShow:false,
            examModalShow:false
        }
    }
    modalTypeFun=()=>{
        if(this.props.headerBottom.Title=="Previous Paper Analysis"){
            this.setState({
                previousPaperAnalysisModal: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Linkage Chapter Analysis"){
            this.setState({
                linkageChapterAnalysisModal: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Bookmarks"){
            this.setState({
                bookMarksModalShow: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Notes"){
            this.setState({
                notesModalShow: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Custom Exam"){
            this.setState({
                examModalShow: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Get Ready For Exam"){
            this.setState({
                getReadyForExamModalShow: true, 
                helpShow: false
            });
        }
        else if(this.props.headerBottom.Title=="Mock Test"){
            this.setState({
                mockTestModalShow: true, 
                helpShow: false
            });
        }
        else{

        }
        

    }
    render() {
        const { helpShow, getReadyForExamModalShow } = this.state;
        console.log("headerBottom", this.props.headerBottom);
        const PDFFILE='https://rizee.in/static/media/mocktest_results.pdf';
        return (
            <React.Fragment>
               <div className="header-bottom py-2">
                    <Container>
                        <Row className="align-items-end">
                            <Col xl={9} lg={7} md={7} sm={6} xs={6}>
                                <Image src={this.props.headerBottom.Img} alt="Image" width={this.props.headerBottom.width} />
                                <h5 className="mt-2 title">{this.props.headerBottom.Title}</h5>
                            </Col>
                            {this.props.headerBottom.Title=="Videos" || this.props.headerBottom.Title=="Linkage Chapter Analysis" || this.props.headerBottom.Title=="Category Videos" || this.props.headerBottom.Title=="Category Videos" || this.props.headerBottom.Title=="Recently Watched Videos"
                            || this.props.headerBottom.Title=="NEET" || 
                            this.props.headerBottom.Title=="JEE Mains" ||
                            this.props.headerBottom.Title=="JEE Advance"||
                            this.props.headerBottom.Title=="Mock Test Order Summary"?(""):( 
                            <Col xl={3} lg={5} md={5} sm={6} xs={6}>
                                {
                                    !helpShow && !getReadyForExamModalShow && !this.state.previousPaperAnalysisModal && !this.state.notesModalShow && !this.state.bookMarksModalShow && !this.state.examModalShow ?
                                        <Link to="#" 
                                        onClick={() => this.setState({ helpShow: true })} 
                                        className="text-muted">
                                            <Image src={this.props.headerBottom.helpImg} alt="help-img" fluid />
                                        </Link>
                                        :
                                        null
                                }
                            </Col>)}
                        </Row>
                    </Container>
                </div>
               

                <Modal {...this.props} className="help-modal"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.helpShow} onHide={() => this.setState({ helpShow: false })}>
                    <Modal.Header className="justify-content-end align-items-end p-0 border-0" />
                    <Modal.Body className="p-0 d-flex">
                        <Card as={Card.Body} className="border-0">
                            <Row className="d-flex">
                                <Col xl={8} lg={6} md={12} className="text-center">
                                    <div className="d-lg-flex align-item-center justify-content-center">
                                        <Link  onClick={()=>this.modalTypeFun()} className="mr-xl-5 mr-lg-5 text-decoration-none text-dark"><h5>Click here to view <br /> {this.props.headerBottom.Title} Help</h5></Link >
                                        <Link className="text-decoration-none text-dark" 
                                        onClick={()=>this.modalTypeFun()}
                                        >
                                            <i className="fal fa-hand-pointer" style={{ fontSize: 48 }} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col xl={4} lg={6} md={12} >
                                    <Image src={require('../../../images/Ask_me_for_Help.gif')} alt="help-img" />
                                </Col>
                            </Row>
                        </Card>
                    </Modal.Body>
                </Modal>
                <GetReadyForExamModal show={this.state.getReadyForExamModalShow} onHide={() => this.setState({ getReadyForExamModalShow: false })} />
                <PreviousPaperAnalysisModal show={this.state.previousPaperAnalysisModal} onHide={() => this.setState({ previousPaperAnalysisModal: false })} />
                <NotesModal show={this.state.notesModalShow} onHide={() => this.setState({ notesModalShow: false })} />
                <BookMarksModal show={this.state.bookMarksModalShow} onHide={() => this.setState({ bookMarksModalShow: false })} />
                <ExamModal show={this.state.examModalShow} onHide={() => this.setState({ examModalShow: false })} />
                <PdfModal
                    modaltitle="Mock Test"
                    pdf_file={PDFFILE}
                    show={this.state.mockTestModalShow} onHide={() => this.setState({ mockTestModalShow: false })} />

            </React.Fragment>
        )
    }
}

export default HelpImg
