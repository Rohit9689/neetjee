import { Row, Col, Card, Modal, Image,Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PractiseModal from '../home/help_system/PractiseModal'
import ShortNotesModal from '../home/help_system/ShortNotesModal'
import RevisionMaterialModal from '../home/help_system/RevisionMaterialModal'

class StickyHelp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            helpShow: false,
            practiseModalShow: false,
            shortNotesModalShow: false,
            revisionMaterialShow: false,
            helpToggle: true
        }
    }
    modalTypeFun = () => {
        if (this.props.headerBottom.helpImgAlt == "practise-help-img") {
            this.setState({
                practiseModalShow: true,
                helpShow: false
            });
        }
        else if (this.props.headerBottom.helpImgAlt == "shortNotes-help-img") {
            this.setState({
                shortNotesModalShow: true,
                helpShow: false
            });
        }
        else if (this.props.headerBottom.helpImgAlt == "revisionmaterial-help-img") {
            this.setState({
                revisionMaterialShow: true,
                helpShow: false
            });
        }
        else {

        }
    }
    render() {
        const helpDesk = {
            position: 'fixed',
            bottom: 5,
            right: -40,
            transition: '0.15s ease-in-out',
            zIndex: 2
        }
        const helpToggle = {
            position: 'fixed',
            bottom: 105,
            right: -14,
            zIndex: 3
        }

        return (
            <React.Fragment>
                <Button variant="link" style={helpToggle} onClick={() => { this.setState({ helpToggle: !this.state.helpToggle }) }}>
                    {this.state.helpToggle ? <i className="fa-3x fas fa-caret-right" /> : <i className="fa-3x fas fa-caret-left" />}
                </Button>
                {
                    this.state.helpToggle ?
                        <React.Fragment>
                            {
                                !this.state.helpShow && !this.state.practiseModalShow && !this.state.shortNotesModalShow && !this.state.revisionMaterialShow ?
                                    <Link to="#"
                                        onClick={() => this.setState({ helpShow: true })}
                                        className="text-muted" style={helpDesk}>
                                        <Image width="250" src={require('../../../images/Ask_me_for_Help.gif')} alt={this.props.headerBottom.helpImgAlt} />
                                    </Link>
                                    :
                                    null
                            }
                        </React.Fragment>
                        : null
                }



                <Modal {...this.props} className="help-modal"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.helpShow} onHide={() => this.setState({ helpShow: false })}>
                    <Modal.Header className="justify-content-end align-items-end p-0 border-0" />
                    <Modal.Body className="p-0 d-flex">
                        <Card as={Card.Body} className="border-0">
                            <Row className="d-flex">
                                <Col xl={8} lg={6} md={12} className="text-center">
                                    <div className="d-lg-flex align-item-center justify-content-center">
                                        <a onClick={() => this.modalTypeFun()} className="mr-xl-5 mr-lg-5 text-decoration-none text-dark"><h5>Click here to view <br /> {this.props.headerBottom.title} Help</h5></a>
                                        {/* <Link to="#" className="text-decoration-none text-dark" onClick={() => this.setState({ practiseModalModalShow: true, helpShow: false })}> */}
                                        <a className="text-decoration-none text-dark" onClick={() => this.modalTypeFun()}>
                                            <i className="fal fa-hand-pointer" style={{ fontSize: 48 }} />
                                        </a>
                                    </div>
                                </Col>
                                <Col xl={4} lg={6} md={12} >
                                    <Image src={require('../../../images/Ask_me_for_Help.gif')} alt="help-img" />
                                </Col>
                            </Row>
                        </Card>
                    </Modal.Body>
                </Modal>

                <PractiseModal show={this.state.practiseModalShow} onHide={() => this.setState({ practiseModalShow: false })} />
                <ShortNotesModal show={this.state.shortNotesModalShow} onHide={() => this.setState({ shortNotesModalShow: false })} />
                <RevisionMaterialModal show={this.state.revisionMaterialShow} onHide={() => this.setState({ revisionMaterialShow: false })} />
            </React.Fragment>
        )
    }
}

export default withRouter(StickyHelp);
