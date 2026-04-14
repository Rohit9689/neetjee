import React, { Component } from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap'
import { Link, withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
class UnBookmarkAlert extends Component {
    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="text-center">
                       <p className="text-dark mt-3">Dear Student <br />
                            Do you want to Un Bookmark.</p>
                            

                    </div>
                </Modal.Body>
               <Modal.Footer className="d-flex justify-content-between align-items-center">
                <Button
                        as={Link}
                        onClick={(e) => this.props.removebookhandleFormSubmit(this.props.removecontypId,this.props.id)}
                        variant="link text-decoration-none text-dark font-weight-bold">Yes</Button>
                        <div className="border-right" style={{ height: 48 }}>&nbsp;</div>
                    <Button variant="link text-decoration-none text-dark" onClick={() => this.props.onHide()}>No</Button>
                    </Modal.Footer>
             </Modal >
        )
    }
}

export default withRouter(UnBookmarkAlert);
