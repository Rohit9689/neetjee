import React, { Component } from 'react'
import { components } from 'react-select'
import { Container, Row, Col, Card, Form, Popover, Nav, Tab, OverlayTrigger, Button } from 'react-bootstrap'
import VideoNavbar from '../components/learn_practice/videos/singlevideo/VideoNavbar'
import '../components/learn_practice/videos/singlevideo/_singlevideo.scss'
import BuySingleVideoModal from '../components/learn_practice/videos/singlevideo/BuySingleVideoModal'
import SelectDropDown from '../../neetjee_guru/components/selectdropdown/SelectDropDown'
import Select from 'react-select';

class SingleVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true,
            modalShow: false,
        }
        this.popoverHide = React.createRef();
    }

    myclickFun = () => {
        this.setState({ show: false });
    };

    render() {
        const data = this.props.history.location.state.videoObj;
        const Reasons = [
            { value: 1, label: 'Reasons-1' },
            { value: 2, label: 'Reasons-2' },
            { value: 3, label: 'Reasons-3' }
        ];
        const SectionData = [
            { value: 'NEET 2020', label: 'NEET 2020', color: '#00B8D9', isFixed: true },
            { value: 'JEE 2020', label: 'JEE 2020', color: '#0052CC', isFixed: true },
            { value: 'EAMCET 2020', label: 'EAMCET 2020', color: '#5243AA' },
        ];
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };
        const popover = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Report</h6>
                        <Form>
                            <Form.Group controlId="SelectPrinciple">
                                <SelectDropDown options={Reasons} placeholderName={'Select Reasons'} dropdownIndicator={{ DropdownIndicator }} />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea1">
                                <Form.Control as="textarea" rows="3" placeholder="Some Comments" />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                            </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        const popover2 = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Notes</h6>
                        <Form>
                            <Form.Group controlId="SelectPrinciple">
                                <Select maxMenuHeight={150}
                                    defaultValue={[SectionData[0]]}
                                    isMulti
                                    name="colors"
                                    options={SectionData}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Form.Group>
                            <div className="mb-2 text-center">
                                <span>or</span>
                            </div>
                            <Form.Group controlId="NewTag2">
                                <Form.Control type="text" placeholder="Enter New Tag" />
                            </Form.Group>
                            <Form.Group controlId="CommentsTextarea2">
                                <Form.Control as="textarea" rows="3" placeholder="Some Comments" />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                    </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                    </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        const popover3 = (
            <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
                <Popover.Content>
                    <div className="content-block p-3">
                        <h6>Bookmarks</h6>
                        <Form>
                            <Form.Group controlId="SelectBookmark">
                                <Select maxMenuHeight={150}
                                    defaultValue={[SectionData[0]]}
                                    isMulti
                                    name="colors"
                                    options={SectionData}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Form.Group>
                            <div className="mb-2 text-center">
                                <span>or</span>
                            </div>
                            <Form.Group controlId="NewTag3">
                                <Form.Control type="text" placeholder="Enter New Tag" />
                            </Form.Group>
                        </Form>
                    </div>
                    <Row className="text-center border-top">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                            <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
                                Cancel
                    </Button>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
                                Submit
                    </Button>
                        </Col>
                    </Row>
                </Popover.Content>
            </Popover>
        );
        return (
            <section className="single_video">
                <VideoNavbar getChapterId={this.props.history.location.state.getChapterId}/>
                <div className="single_video_section lock-content pb-5">
                    <Container>
                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} sm={12} xs={12}>
                                <div className="embed-responsive embed-responsive-16by9 my-3">
                                    <iframe className="embed-responsive-item" src="https://player.vimeo.com/video/382010779" title='video' allowFullScreen></iframe>
                                    <div className="video-mask">
                                        <div className="mask-content d-flex flex-column justify-content-center">
                                            <div className="views mb-3">
                                                <i className="fal fa-eye fa-2x text-warning"></i>
                                                <div className="view-text mt-1 text-warning">13.5k Views</div>
                                            </div>
                                            <div className="likes mb-3">
                                                <i className="fal fa-thumbs-up fa-2x text-white"></i>
                                                <div className="like-text mt-1 text-white">12.5k Likes</div>
                                            </div>
                                            <div className="purches mb-2">
                                                <i className="fal fa-shopping-basket fa-2x text-success"></i>
                                                <div className="purches-text mt-1 text-success">8.5k Students Purches</div>
                                            </div>
                                            <Button variant="btn btn-darkblue px-4" onClick={() => this.setState({ modalShow: true })}>Buy Video @ ₹199 /-</Button>
                                            <BuySingleVideoModal show={this.state.modalShow} />
                                        </div>
                                    </div>
                                </div>
                                <div className="content-block text-white">
                                    <i className="fas fa-lock"></i>
                                    <div className="content">
                                        <Row className="align-items-end header mb-3" style={{ borderBottom: '1px solid #777373' }}>
                                            <Col xl={12} lg={12} md={12}>
                                                <div className="header-content">
                                                <h5 className="title">{data.title}</h5>
                                                    <h6>{data.subjectName} - {data.ChapterName}</h6>
                                                </div>
                                            </Col>
                                            <Col xl={8} lg={8} md={12}>
                                                <div className="subheader-content">
                                                    <p className="text-white-50 mb-2">378,318 Views . 6 Sep 2020</p>
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={12}>
                                                <div className="header-content d-flex align-items-end">
                                                    <ul className="helpTags list-inline m-0 p-0  border-bottom">
                                                        <li className="list-inline-item">
                                                            <Button variant="link text-decoration-none text-white">
                                                                <i className="fas fa-thumbs-up"></i> 2.5k
                                                            </Button>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <Button variant="link text-decoration-none text-white">
                                                                <i className="fas fa-thumbs-down"></i> 1.5k
                                                            </Button>
                                                        </li>
                                                    </ul>
                                                    <ul className="helpTags list-inline ml-3 m-0 pb-2">
                                                        <li className="list-inline-item mr-4">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} ref={r => (this.popoverHide = r)} rootClose>
                                                                <i className="fal fa-info-circle" />
                                                            </OverlayTrigger>
                                                        </li>
                                                        <li className="list-inline-item mr-4">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} ref={r => (this.popoverHide2 = r)} rootClose>
                                                                <i className="fal fa-notes-medical" />
                                                            </OverlayTrigger>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover3} ref={r => (this.popoverHide3 = r)} rootClose>
                                                                <i className="fal fa-bookmark" />
                                                            </OverlayTrigger>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="description mb-4">
                                        <p>{data.description}</p>
                                        </div>
                                        {/* <Row className="text-center mt-4">
                                                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                                        <Button variant="light" className="mx-1">Skip</Button>
                                                        <Button variant="light" className="mx-1">Download Notes</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Practice This Topic</Button>
                                                        <Button variant="light border-success text-success" className="mx-1">Revision Material</Button>
                                                    </Col>
                                                </Row> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="fixed-bottom">
                    <Container>
                        <Row className="text-center my-3">
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                {/* <Button variant="light" className="mx-1">Skip</Button>
                                <Button variant="light" className="mx-1">Download Notes</Button> */}
                                <Button variant="light border-success text-success" className="mx-1">Practise</Button>
                                <Button variant="light border-success text-success" className="mx-1">Revision Material</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        )
    }
}

export default SingleVideo
