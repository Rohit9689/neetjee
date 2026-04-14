import React, { Component } from 'react'
import { Modal, Form, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class ChapterAndtopicModal extends Component {
    render() {
        console.log("this.props.Data", this.props.data);
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4" style={{ height: 522, overflowY: 'auto' }}>

                    <ul className="list-unstyled m-0 p-0">
                        {this.props.data.map((item) => (
                            <li className="mb-3">
                                <div className="d-flex">
                                    <div className="chapter text-primary">Chapter:</div>
                                    <div className="ml-2 chapter-text">
                                        <div>{item.chapter}</div>
                                        {this.props.name == "Chapters And Topics Data" ? (<div className="my-2">

                                            <div className="ml-2 topic-text d-flex">
                                                <div className="topic text-warning">Topic:</div>
                                                <div className="topic-text ml-3">
                                                    <div>{item.topic}</div>
                                                </div>
                                            </div>
                                        </div>) : ("")}

                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                    {/* <h5 className="text-danger">Chapters Data</h5> */}
                </Modal.Body>
            </Modal >
        )
    }
}

export default ChapterAndtopicModal
