import React, { Component } from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import * as Cookies from "es-cookie";
class UserRestrictionAlert extends Component {
    render() {
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="text-center">
                        <Image src={require('../../../images/locked.png')} width="40" alt="locked image" />
                        {Cookies.get("student_userlevel") == "1" ? (<p className="text-dark mt-3">Dear Student <br />
                        Now you have limited Access.</p>) : (
                                <p className="text-dark mt-3">Dear Student <br />
                            Now you have limited access, to get full access subscribe now.</p>
                            )}

                    </div>
                </Modal.Body>
               
                {Cookies.get("student_userlevel") == "1" ? ( <Modal.Footer className="row justify-content-between align-self-center m-0 p-0">
                    <div 
                    //className="d-flex justify-content-center align-self-center"
                    >
                    <Button variant="link text-decoration-none text-dark px-5 m-0" onClick={() => this.props.onHide()}>Cancel</Button>
                    </div>
                   </Modal.Footer> ):(<Modal.Footer className="d-flex justify-content-between align-items-center m-0 p-0">
                <Button
                        as={Link}
                        to={{ pathname: "/student/package" }}
                        variant="link text-decoration-none text-dark font-weight-bold m-0">Purchase Now</Button>
                        <div className="border-right" style={{ height: 48 }}>&nbsp;</div>
                    <Button variant="link text-decoration-none text-dark px-5 m-0" onClick={() => this.props.onHide()}>Cancel</Button>
                    </Modal.Footer>
                    )}
                    
                    
                
            </Modal >
        )
    }
}

export default UserRestrictionAlert
