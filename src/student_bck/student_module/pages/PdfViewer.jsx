import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';
import { Document, Page, pdfjs } from "react-pdf";
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import filePdf from '../../images/Waveoptics_Interferences_Advanced_Writting.pdf'

import "../../student_module/components/learn_practice/revision_materials/_pdf.scss"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfViewer extends Component {
    state = {
        numPages: null,
        pageNumber: 1
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));


    render() {
        const options = {
            cMapUrl: 'cmaps/',
            cMapPacked: true,
        };

        const { pageNumber, numPages } = this.state;
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container className="Example">
                            <div className="Example__container__document">
                                <Document renderMode="svg"
                                    file={filePdf}
                                    options={options}
                                    onLoadSuccess={this.onDocumentLoadSuccess}

                                >
                                    <Page pageNumber={pageNumber} width={800} />

                                    <div className="page-controls">
                                        <Button variant="link"
                                            disabled={pageNumber <= 1}
                                            onClick={this.goToPrevPage}
                                            type="button"
                                        >
                                            <i className="fal fa-angle-left" />
                                        </Button>
                                        <span>
                                            {`${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}
                                        </span>
                                        <Button variant="link"
                                            disabled={pageNumber >= numPages}
                                            onClick={this.goToNextPage}
                                            type="button"
                                        >
                                            <i className="fal fa-angle-right" />
                                        </Button>
                                    </div>
                                </Document>
                            </div>
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PdfViewer
