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
    constructor(props) {
        super(props)
        this.state = {
            
            numPages: null,
            pageNumber: 1

        }
    }

    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
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
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
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
            </div>
        )
    }
}

export default PdfViewer
