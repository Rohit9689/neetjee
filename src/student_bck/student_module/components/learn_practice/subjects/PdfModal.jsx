import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button } from 'react-bootstrap'
import { MultiSelect } from "react-multi-select-component";


import { withRouter } from 'react-router-dom';
import PdfViewerSection from '../videos/PdfViewerSection';

class PdfModal extends Component {


  render() {


    return (
      <Modal {...this.props} className="subjectvideo_modal chapter_modal border-white"
        size="xl" aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className="py-3 border-0 bg-light">
          <div className="d-flex align-items-center">
            <Modal.Title>
              <h5>{this.props.modaltitle}
              </h5>
            </Modal.Title>
            <div className="position-absolute" onClick={() => { this.props.onHide() }} style={{ cursor: "pointer", right: 10, top: 10 }}>
              <i class="fas fa-times" aria-hidden="true"></i>
            </div>

          </div>


        </Modal.Header>
        <Modal.Body className="p-0">
          <PdfViewerSection  pdf_file={this.props.pdf_file}/>
        </Modal.Body>
      </Modal>
    )
  }
}


export default withRouter(PdfModal);