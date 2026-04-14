import React, { Component } from 'react'
import { Row,Container,Col,Image,Media,Modal } from 'react-bootstrap';
import "./_helpsystem.scss";

class BookMarksModal extends Component {
    render() {
        return (
            <Modal {...this.props} className="modal_width"
                
                size="lg" fade="true" aria-labelledby="example-modal-sizes-title-lg" >
                
                <Modal.Body className="p-0 mb-4">
                    <Container>
                        <Row>
                            <Col className="colse_btn_zindex"><span className="close_btn" onClick={() => { this.props.onHide() }}>X</span></Col>
                        </Row>
                    </Container>
                    <section className="">
                        <div className="arrow_logo"></div>
                        <Container>
                            <Row>
                                <Col>
                                <Media>
                                    <img
                                        className="mr-3"
                                        src={require('../../../../images/helpSystemImages/bookmark_logo.png')}
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body>
                                        <h5 className="mt-3">BOOKMARK</h5>
                                        
                                    </Media.Body>
                                    </Media>
                                </Col>
                            </Row>
                            <Row>
                                
                                <Col>
                                    <div className="overflow_scroll">
                                        <Row>
                                            <Col sm={6} className="mt-4">
                                                <p >Bookmark lets you to tag and save short notes, refence material or questions for easy reference in the future.</p>
                                                <Image className="w-80 mt-3" src={require('../../../../images/helpSystemImages/bookmark1.png')}  alt="img" />
                                            </Col>
                                            <Col sm={6} className="mt-4">
                                                <Image className="w-100" src={require('../../../../images/helpSystemImages/bookmark_img.png')}  alt="img" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <p >Bookmarks can be tagged using the predefined tags or you can create your own tag.</p>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/bookmark2.png')} alt="img" />

                                                <Image className="w-80 img_center mt-2" src={require('../../../../images/helpSystemImages/bookmark3.png')} alt="img" />
                                               
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-4">
                                                <p >You can find all the bookmarks in the Bookmarks section.</p>
                                                <Image className="w-80 img_center mt-3" src={require('../../../../images/helpSystemImages/bookmark4.png')} alt="img" />
                                            </Col>
                                        </Row>
                                    </div>
                                
                                </Col>
                            </Row>
                            
                        </Container>
                    </section>    
                </Modal.Body>
            </Modal>
        )
    }
}

export default BookMarksModal
