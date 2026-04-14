import React, { Component } from 'react'
import { Modal, Image } from 'react-bootstrap';

import errorImage from '../../../images/error-512.png'

class Picerror extends Component {

    render() {
        console.log("picerror", this.props.picerror);
        return (

            <Modal {...this.props}
                size="sm" className="errorMsge"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-0 p-0" />
                <Modal.Body className="text-center">
                    <div className="success-content mb-4">
                        <Image src={errorImage} alt="img" width="50" className="mb-4" />
                        <h6 className="text-theme">{this.props.picerror}</h6>
                    </div>

                </Modal.Body>
            </Modal>
        )
    }
}

export default Picerror



