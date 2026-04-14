import { Row, Col, Modal, Image, Card, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import './_starting-modal.scss'
import { Link,withRouter } from 'react-router-dom'
import PlanModal from '../help_system/PlanModal';
import WarmUpModal from '../help_system/WarmUpModal';
import ExecuteModal from '../help_system/ExecuteModal';
import MeasureModal from '../help_system/MeasureModal';
class StartingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            planModalShow: false,
            executeModalShow: false,
            measureModalShow: false,
            warmUPModalShow: false,
        }
    }
    linkFunction=(path)=>{
        localStorage.setItem("homemodal", "false");
        this.props.history.push(path);
    }
    render() {
        const PreparationLifecircle = [
            {
                id: 1,
                cardTitle: 'Learn & Practice',
                cardContent: 'Over 1.2 lakh+ practice questions & solutions',
                linkDirection: '/student/learn-practice'
            },
            {
                id: 2,
                cardTitle: 'Performance Analysis',
                cardContent: 'Most detailed exam reports & analysis',
                linkDirection: '/student/result-analysis'
            },
            {
                id: 3,
                cardTitle: 'Revision Materials & Short Notes',
                cardContent: '4600+ Revision Materials & 800+ Short notes based on NCERT Syllabus',
                linkDirection: '/student/revision-material-groups'
            },
            {
                id: 4,
                cardTitle: 'Previous Paper Analysis',
                cardContent: 'Analyse & prioritise from 50+ previous papers',
                linkDirection: '/student/previous-paper-analysis'
            },
            {
                id: 5,
                cardTitle: 'Mock Tests',
                cardContent: 'One stop destination for all your mock tests',
                linkDirection: '/student/exams/test-series'
            },
            {
                id: 6,
                cardTitle: 'Linkage Analysis',
                cardContent: 'Exclusive analysis on multi-concept questions',
                linkDirection: '/student/linkage-chapter-analysis'
            }
        ]
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg" className="preparation-lifecircle-modal">
                <Button variant="link p-0 close-modal-btn " onClick={() => { this.props.onHide() }}> <i className="fas fa-times" /> </Button>
                <Modal.Body>
                    <Image className="lines-img" src={require('../../../../images/lifecircle-top-line2.png')} alt="lines-img" />
                    <div className="plm-content pb-2">
                        <div className="header text-center">
                            <div className="logo">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="60" viewBox="0 0 182.815 159.833"><g transform="translate(-474.743 -421.721)"><g transform="translate(474.743 512.585)"><g transform="translate(0.089 0)"><path fill="#2a346c" d="M855.45,453.563l-9.066-13.1H836.377v13.1H825.5v-47.01h20.348a26.128,26.128,0,0,1,10.846,2.082,16.124,16.124,0,0,1,7.085,5.91,16.289,16.289,0,0,1,2.485,9.066,15.314,15.314,0,0,1-9.671,14.842l10.544,15.11ZM852.7,417.533q-2.553-2.115-7.454-2.115h-8.865V431.8h8.865q4.9,0,7.454-2.149a8.474,8.474,0,0,0,0-12.122Z" transform="translate(-825.498 -406.553)"></path><path fill="#2a346c" d="M1011.21,416.559a5.688,5.688,0,0,1,0-8.327,6.649,6.649,0,0,1,4.7-1.679,6.812,6.812,0,0,1,4.7,1.612,5.168,5.168,0,0,1,1.813,4.03,5.7,5.7,0,0,1-1.813,4.332,6.569,6.569,0,0,1-4.7,1.712A6.643,6.643,0,0,1,1011.21,416.559Zm-.537,5.661h10.476v31.342h-10.476Z" transform="translate(-962.053 -406.553)"></path><path fill="#2a346c" d="M1115.451,476.884v8.059h-32.235V478.63l18.4-21.758h-17.931v-8.059h31.16v6.312l-18.4,21.759Z" transform="translate(-1016.867 -437.933)"></path><path fill="#2a346c" d="M1260.131,468.283H1232.8a8.5,8.5,0,0,0,3.493,5.3,11.559,11.559,0,0,0,6.85,1.948,13.852,13.852,0,0,0,5-.839,12.123,12.123,0,0,0,4.063-2.652l5.574,6.044q-5.1,5.842-14.909,5.843a23.572,23.572,0,0,1-10.812-2.384,17.467,17.467,0,0,1-7.253-6.615,18.216,18.216,0,0,1-2.552-9.6,18.465,18.465,0,0,1,2.518-9.57,17.642,17.642,0,0,1,6.917-6.649,21.417,21.417,0,0,1,19.442-.1,16.682,16.682,0,0,1,6.749,6.548,19.533,19.533,0,0,1,2.451,9.905Q1260.333,465.664,1260.131,468.283Zm-24.512-11.618a8.575,8.575,0,0,0-2.955,5.507h17.8a8.666,8.666,0,0,0-2.954-5.473,8.836,8.836,0,0,0-5.91-2.048A9.021,9.021,0,0,0,1235.619,456.665Z" transform="translate(-1120.111 -436.384)"></path><path fill="#2a346c" d="M1424.73,468.283H1397.4a8.506,8.506,0,0,0,3.492,5.3,11.56,11.56,0,0,0,6.85,1.948,13.851,13.851,0,0,0,5-.839,12.125,12.125,0,0,0,4.063-2.652l5.574,6.044q-5.1,5.842-14.909,5.843a23.571,23.571,0,0,1-10.812-2.384,17.466,17.466,0,0,1-7.253-6.615,18.216,18.216,0,0,1-2.552-9.6,18.465,18.465,0,0,1,2.518-9.57,17.641,17.641,0,0,1,6.917-6.649,21.417,21.417,0,0,1,19.442-.1,16.68,16.68,0,0,1,6.749,6.548,19.532,19.532,0,0,1,2.451,9.905Q1424.932,465.664,1424.73,468.283Zm-24.512-11.618a8.575,8.575,0,0,0-2.955,5.507h17.8a8.666,8.666,0,0,0-2.954-5.473,8.837,8.837,0,0,0-5.91-2.048A9.021,9.021,0,0,0,1400.218,456.665Z" transform="translate(-1242.335 -436.384)"></path></g><g transform="translate(0 60.892)"><path fill="#2a346c" d="M827.756,644.744h-2.6V643.51h6.664v1.234h-2.6v6.618h-1.458Z" transform="translate(-825.153 -643.398)"></path><path fill="#2a346c" d="M877.533,643.51v7.852h-1.458V648h-4.061v3.365h-1.458V643.51h1.458v3.242h4.061V643.51Z" transform="translate(-858.866 -643.398)"></path><path fill="#2a346c" d="M926.99,650.14v1.223H921.1V643.51h5.732v1.223h-4.274v2.041h3.792v1.2h-3.792v2.165Z" transform="translate(-896.399 -643.398)"></path><path fill="#2a346c" d="M997.83,643.846a2.588,2.588,0,0,1,1.161.965,2.947,2.947,0,0,1,0,2.978,2.575,2.575,0,0,1-1.161.97,4.344,4.344,0,0,1-1.778.337h-1.773v2.266h-1.458V643.51h3.231A4.352,4.352,0,0,1,997.83,643.846Zm-.4,3.613a1.6,1.6,0,0,0,0-2.311,2.239,2.239,0,0,0-1.447-.4h-1.705v3.118h1.705A2.243,2.243,0,0,0,997.432,647.459Z" transform="translate(-949.655 -643.398)"></path><path fill="#2a346c" d="M1045.16,650.14v1.223h-5.89V643.51H1045v1.223h-4.274v2.041h3.792v1.2h-3.792v2.165Z" transform="translate(-984.146 -643.398)"></path><path fill="#2a346c" d="M1088.852,651.362l-1.6-2.3a3.016,3.016,0,0,1-.3.011h-1.773v2.289h-1.458V643.51h3.231a4.355,4.355,0,0,1,1.778.336,2.587,2.587,0,0,1,1.161.965,2.7,2.7,0,0,1,.4,1.492,2.664,2.664,0,0,1-.432,1.526,2.573,2.573,0,0,1-1.24.953l1.806,2.58Zm-.527-6.215a2.24,2.24,0,0,0-1.447-.4h-1.705v3.13h1.705a2.219,2.219,0,0,0,1.447-.41,1.424,1.424,0,0,0,.493-1.161A1.408,1.408,0,0,0,1088.325,645.148Z" transform="translate(-1017.148 -643.398)"></path><path fill="#2a346c" d="M1132.275,644.733v2.389h3.792v1.234h-3.792v3.006h-1.458V643.51h5.732v1.223Z" transform="translate(-1052.125 -643.398)"></path><path fill="#2a346c" d="M1179.712,650.14v1.223h-5.89V643.51h5.732v1.223h-4.274v2.041h3.792v1.2h-3.792v2.165Z" transform="translate(-1084.058 -643.398)"></path><path fill="#2a346c" d="M1218,650.629a3.847,3.847,0,0,1-1.5-1.441,4.209,4.209,0,0,1,.006-4.151,3.884,3.884,0,0,1,1.509-1.441,4.421,4.421,0,0,1,2.148-.522,4.491,4.491,0,0,1,1.761.336,3.6,3.6,0,0,1,1.346.976l-.942.886a2.75,2.75,0,0,0-2.1-.92,2.942,2.942,0,0,0-1.447.353,2.546,2.546,0,0,0-1,.981,3.008,3.008,0,0,0,0,2.85,2.546,2.546,0,0,0,1,.981,2.943,2.943,0,0,0,1.447.353,2.734,2.734,0,0,0,2.1-.931l.942.9a3.582,3.582,0,0,1-1.352.976,4.516,4.516,0,0,1-1.766.337A4.424,4.424,0,0,1,1218,650.629Z" transform="translate(-1115.346 -643.074)"></path><path fill="#2a346c" d="M1263.4,644.744h-2.6V643.51h6.663v1.234h-2.6v6.618H1263.4Z" transform="translate(-1148.64 -643.398)"></path><path fill="#2a346c" d="M1337.217,647.023h1.38v3.129a4.386,4.386,0,0,1-1.413.741,5.436,5.436,0,0,1-1.661.258,4.479,4.479,0,0,1-2.165-.522,3.872,3.872,0,0,1-1.514-1.441,4.191,4.191,0,0,1,0-4.151,3.862,3.862,0,0,1,1.52-1.441,4.532,4.532,0,0,1,2.182-.522,4.767,4.767,0,0,1,1.795.325,3.522,3.522,0,0,1,1.358.954l-.92.9a2.95,2.95,0,0,0-2.165-.9,3.056,3.056,0,0,0-1.475.348,2.53,2.53,0,0,0-1.009.976,2.8,2.8,0,0,0-.365,1.435,2.761,2.761,0,0,0,.365,1.414,2.607,2.607,0,0,0,1.009.987,2.96,2.96,0,0,0,1.464.359,3.156,3.156,0,0,0,1.615-.4Z" transform="translate(-1200.99 -643.074)"></path><path fill="#2a346c" d="M1383.009,650.56a3.557,3.557,0,0,1-.908-2.62V643.51h1.458v4.375q0,2.312,2,2.311t1.986-2.311V643.51h1.436v4.431a3.57,3.57,0,0,1-.9,2.62,3.964,3.964,0,0,1-5.065,0Z" transform="translate(-1238.716 -643.398)"></path><path fill="#2a346c" d="M1431.991,643.51h1.458v7.852h-1.458Z" transform="translate(-1275.762 -643.398)"></path><path fill="#2a346c" d="M1461.141,643.51h3.432a4.925,4.925,0,0,1,2.233.488,3.612,3.612,0,0,1,1.515,1.38,4.206,4.206,0,0,1,0,4.117,3.611,3.611,0,0,1-1.515,1.38,4.924,4.924,0,0,1-2.233.488h-3.432Zm3.365,6.618a3.335,3.335,0,0,0,1.52-.331,2.37,2.37,0,0,0,1.01-.943,3.026,3.026,0,0,0,0-2.838,2.372,2.372,0,0,0-1.01-.943,3.332,3.332,0,0,0-1.52-.331H1462.6v5.385Z" transform="translate(-1297.408 -643.398)"></path><path fill="#2a346c" d="M1518.271,650.14v1.223h-5.89V643.51h5.732v1.223h-4.274v2.041h3.792v1.2h-3.792v2.165Z" transform="translate(-1335.457 -643.398)"></path></g></g><g transform="translate(518.031 421.721)"><path fill="#2a346c" d="M384.741,477.522l29.446-50.61h-12.7L411.878,409.4h24.057l37.336,68.124H453.64l-24.634-41.757-23.864,41.757Z" transform="translate(-384.741 -409.399)"></path><path fill="#f9c52d" d="M601.982,409.4H642.6l-20.309,35.5Z" transform="translate(-546.054 -409.399)"></path></g></g></svg> */}
                                <img loading='lazy' width="150" height="43" className='mt-2' src='https://entrolabs.com/assets/logo/logo-black.png' alt='logo '/>
                            </div>
                            <h5 className="text-white">Student Preparation Lifecycle</h5>
                        </div>
                        <Row>
                            <Col lg={{ span: 8, offset: 2 }} md={12} xs={12} className="text-center">
                                <Row className="plm-nav my-4 g-0">
                                    <Col xs={3}>
                                        <Link onClick={() => this.setState({ planModalShow: true })} className="direction-btn">Plan</Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Link onClick={() => this.setState({ executeModalShow: true })} className="direction-btn">Execute</Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Link onClick={() => this.setState({ measureModalShow: true })} className="direction-btn">Measure</Link>
                                    </Col>
                                    <Col xs={3}>
                                        <Link onClick={() => this.setState({ warmUPModalShow: true })} className="direction-btn">Warm Up</Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className="text-center">
                                <h6 className="text-uppercase text-white mb-3">Let's Go Through App Features</h6>
                            </Col>
                            {
                                PreparationLifecircle.map((item, index) => {
                                    const { cardTitle, cardContent, linkDirection } = item;
                                    return (
                                        <Col key={index} lg={4} md={6} sm={6} xs={6} className="my-2">
                                            <Card className="single-modal-card border-0 shadow-sm h-100">
                                                <Card.Body>
                                                    <Card.Title className="lifecircle-modal-title">{cardTitle}</Card.Title>
                                                    <Card.Text className="lifecircle-modal-text">{cardContent}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer className="justify-content-center border-0 py-2">
                                                    <Link 
                                                    onClick={()=>this.linkFunction(linkDirection)}
                                                    className="p-0 btn btn-link btn-block text-decoration-none text-white">
                                                        Go To <i className="fas fa-long-arrow-alt-right" />
                                                    </Link>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <div className="text-center">
                        <Image className="bottom-dotts-img" src={require('../../../../images/startmodal-bg.png')} alt="bottom-dotts-img" width="200" />
                    </div>
                </Modal.Body>
                <PlanModal show={this.state.planModalShow} onHide={() => this.setState({ planModalShow: false })} />
                <ExecuteModal show={this.state.executeModalShow} onHide={() => this.setState({ executeModalShow: false })} />
                <MeasureModal show={this.state.measureModalShow} onHide={() => this.setState({ measureModalShow: false })} />
                <WarmUpModal show={this.state.warmUPModalShow} onHide={() => this.setState({ warmUPModalShow: false })} />
            </Modal>
        )
    }
}

export default withRouter(StartingModal) ;
