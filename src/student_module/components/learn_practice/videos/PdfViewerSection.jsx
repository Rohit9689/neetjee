import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";




import "../revision_materials/_pdf.scss"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfViewerSection extends Component {
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
        console.log("this.props.pdf_file",this.props.pdf_file);
        const options = {
            cMapUrl: 'cmaps/',
            cMapPacked: true,
        };

      const urlpdffile=this.props.pdf_file;


        const { pageNumber, numPages } = this.state;
        return (
                <div className="content-wrapper">
                        <Container className="Example">
                            <div className="Example__container__document">
                                <Document renderMode="svg"
                                    file={urlpdffile}
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
                                        <span className="text-dark">
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
         )
    }
}

export default PdfViewerSection
