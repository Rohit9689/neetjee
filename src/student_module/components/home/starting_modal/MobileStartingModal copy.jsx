import { Modal, Image, Card, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import './_starting-modal.scss'
import { Link } from 'react-router-dom'

export class MobileStartingModal extends Component {

    render() {
        return (
            <Modal {...this.props}
                centered
                size="md" aria-labelledby="example-modal-sizes-title-lg" className="mobile-start-modal">
                <Button variant="link p-0 close-modal-btn" onClick={() => { this.props.onHide() }}> <i className="fas fa-times" /> </Button>
                <Modal.Body>
                    <a style={{ textDecoration: "none" }} href="https://play.google.com/store/apps/details?id=in.ELAPP.mylearningplus" target="_blank">
                        <div className="gift-box">
                            <Image src={require('../../../../images/modal-gift-box.png')} width="150" alt="gift-box" />
                        </div>
                        <div className="content text-center">

                            <h1 className="h4 title mb-4">For Better Expereince<br />Download The App</h1>
                            <Card as={Card.Body} className="custom-card border-0">
                                <a href="https://play.google.com/store/apps/details?id=in.ELAPP.mylearningplus" target="_blank"><Image src={require('../../../../images/google-play-store.png')} width="150" alt="google-play-store" /></a>
                            </Card>
                            <div className="waves">
                                <Image className="img-1" src={require('../../../../images/Path2.png')} width="300" alt="path 2" />
                                <Image className="img-2" src={require('../../../../images/Path3.png')} width="300" alt="path 3" />
                                <Image className="img-3" src={require('../../../../images/Path1.png')} width="300" alt="path 1" />
                            </div>
                        </div>
                    </a>
                </Modal.Body>
            </Modal>
        )
    }
}

export default MobileStartingModal
