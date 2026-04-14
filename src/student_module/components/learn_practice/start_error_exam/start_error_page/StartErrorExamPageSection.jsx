import React, { Component } from 'react'
import { Row, Col, Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { components } from 'react-select'
import Select from 'react-select';
import SingleOption from './SingleOption';
import SelectDropDown from '../../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ScheduleData from './Questions';
import './_errorexam.scss'


class StartErrorExamPageSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            isSubmitted: false,
            questions: ScheduleData,
            currentIndex: 0,
        }
        this.onAttempt = this.onAttempt.bind(this);
    }

    onAttempt(index, value) {
        let questions = this.state.questions;
        questions[index].attempted = value;
        this.setState({ questions });
    }

    render() {
        const { questions, currentIndex } = this.state;

        const { id, question, option1, option2, option3, option4, attempted } = questions[currentIndex];

        // Reasons
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
            <div className="error_exam_block py-3">
                <Row>
                    <Col xl={2} lg={{ span: 2, order: 1 }} md={{ span: 6, order: 1 }} sm={{ span: 12, order: 1 }} xs={{ span: 12, order: 1 }}>
                        <div className="time-spent my-2">
                            <h6>Time spent in this question</h6>
                            <i className="fal fa-clock" /> <span className="countdown-time">00.45</span>
                        </div>
                    </Col>
                    <Col xl={{ span: 6, offset: 1, order: 2 }} lg={{ span: 6, offset: 1, order: 2 }} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                        <div className="question_area my-2">
                            <div className="q_Name">
                                <span className="q_No">{currentIndex + 1}</span>{question}
                            </div>
                            <div className="q_options mt-4">
                                <SingleOption option="A" status={attempted == 'A'} onClick={() => this.onAttempt(currentIndex, 'A')} optionText={option1} controlId="formBasicCheckboxOne" />
                                <SingleOption option="B" status={attempted == 'B'} onClick={() => this.onAttempt(currentIndex, 'B')} optionText={option2} controlId="formBasicCheckboxTwo" />
                                <SingleOption option="C" status={attempted == 'C'} onClick={() => this.onAttempt(currentIndex, 'C')} optionText={option3} controlId="formBasicCheckboxThree" />
                                <SingleOption option="D" status={attempted == 'D'} onClick={() => this.onAttempt(currentIndex, 'D')} optionText={option4} controlId="formBasicCheckboxFour" />
                            </div>
                        </div>
                    </Col>
                    <Col xl={{ span: 2, offset: 1, order: 3 }} lg={{ span: 2, offset: 1, order: 3 }} md={{ span: 6, order: 2 }} sm={{ span: 12, order: 2 }} xs={{ span: 12, order: 2 }}>
                        <div className="instruction my-2">
                            <ul className="helpTags list-inline m-0 p-0">
                                <li className="list-inline-item mx-2">
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} ref={r => (this.popoverHide = r)} rootClose>
                                        <i className="fal fa-info-circle" />
                                    </OverlayTrigger>
                                </li>
                                <li className="list-inline-item mx-2">
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} ref={r => (this.popoverHide2 = r)} rootClose>
                                        <i className="fal fa-notes-medical" />
                                    </OverlayTrigger>
                                </li>
                                <li className="list-inline-item mx-2">
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover3} ref={r => (this.popoverHide3 = r)} rootClose>
                                        <i className="fal fa-bookmark" />
                                    </OverlayTrigger>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>

                <Row className="text-center mt-3">
                    <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                        <Button variant="outline-secondary" className="px-5 m-2">Skip</Button>
                        <Button variant="outline-primary" className="px-5 m-2">Bookmark This Question</Button>
                        <Button variant="outline-success" className="px-5 m-2" onClick={() => this.setState({ currentIndex: currentIndex + 1 })} >Save &amp; Next Question</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default StartErrorExamPageSection


