import React, { Component } from 'react'
import { Row, Col, Button, Alert, Card, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { components } from 'react-select'
import Select from 'react-select';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ScheduleData from './Questions';
import './_errorexam.scss'
import SingleOption from './SingleOption';


class PracticeExamSection extends Component {
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

        const { isSubmitted } = this.state;
        const { questions, currentIndex } = this.state;

        const { question, option1, option2, option3, option4, attempted } = questions[currentIndex];

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
                        <div className="q_block my-2">
                            <div className="q_Name">
                                <span className="q_No">01</span>{question}
                            </div>
                            {
                                isSubmitted ?
                                    (
                                        <div className="q_options mt-4">
                                            <SingleOption option="A" status={true} showMessage={true} optionText={option1} controlId="formBasicCheckboxOne" />
                                            <SingleOption option="B" status={null} showMessage={true} optionText={option2} controlId="formBasicCheckboxTwo" />
                                            <SingleOption option="C" status={false} showMessage={true} optionText={option3} controlId="formBasicCheckboxThree" />
                                            <SingleOption option="D" status={null} showMessage={true} optionText={option4} controlId="formBasicCheckboxFour" />

                                        </div>
                                    )
                                    :
                                    (
                                        <div className="q_options mt-4">
                                            <SingleOption option="A" status={attempted === 'A' ? true : null} onClick={() => this.onAttempt(currentIndex, 'A')} optionText={option1} controlId="formBasicCheckboxOne" />
                                            <SingleOption option="B" status={attempted === 'B' ? true : null} onClick={() => this.onAttempt(currentIndex, 'B')} optionText={option2} controlId="formBasicCheckboxTwo" />
                                            <SingleOption option="C" status={attempted === 'C' ? true : null} onClick={() => this.onAttempt(currentIndex, 'C')} optionText={option3} controlId="formBasicCheckboxThree" />
                                            <SingleOption option="D" status={attempted === 'D' ? true : null} onClick={() => this.onAttempt(currentIndex, 'D')} optionText={option4} controlId="formBasicCheckboxFour" />
                                        </div>
                                    )
                            }

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

                {
                    !isSubmitted ?
                        (
                            <Row className="text-center mt-3">
                                <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                    <Button variant="outline-secondary" onClick={() => this.setState({ currentIndex: currentIndex + 1 })} className="px-5 m-2">Skip</Button>
                                    <Button variant="outline-primary" className="px-5 m-2">Bookmark This Question</Button>
                                    <Button variant="outline-success" className="px-5 m-2" onClick={() => this.setState({ isSubmitted: true })} >Save &amp; Next Question</Button>
                                </Col>
                            </Row>
                        )

                        :

                        (
                            <React.Fragment>
                                <Row>
                                    <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                        <Alert variant="success" className="my-3 border-success">
                                            <h5>Solution</h5>
                                            <p>The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic view of plants and insects.</p>
                                        </Alert>
                                        <Alert variant="success" className="my-3 border-success">
                                            <h5>DEFINITION</h5>
                                            <h6>Contributors to the study of cell</h6>
                                            <p>The cell is the basic structural and functional unit of life. Anton Von Leeuwenhoek first saw and described a live cell. Robert Hooke first coined the term Cell after observing the compartments in the thin-sliced cork. Matthias Schleiden, a German botanist reported that all plants are composed of different kinds of cells which form the tissues of the plant. Theodore Schwann (1839), a British Zoologist proposed that; Cells have a thin layer (plasma membrane), Cell wall is unique to the plant cells and the bodies of animals and plants are composed of cells and products of cells. Schleiden and Schwann together formulated the cell theory but failed to explain as to how new cells were formed. Rudolf Virchow (1855) first explained that cells divide and new cells are formed from pre-existing cells (Omnis cellula-e cellula).</p>
                                        </Alert>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                                        <Row>
                                            <Col xl={7} lg={7} md={12} sm={12}>
                                                <Alert variant="info" className="mb-3 border-info">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5>Formula</h5>
                                                        <i className="fal fa-link" />
                                                    </div>
                                                    <p>Formula The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic. </p>
                                                    <p>The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                                                    <p> The cork cells seen by Robert Hooke were published in his book 'Micrographia'. It was published in January 1665. It was the first book which illustrate the microscopic.</p>
                                                </Alert>
                                            </Col>
                                            <Col xl={5} lg={5} md={12} sm={12}>
                                                <div className="d-flex">
                                                    <Card className="mx-1">
                                                        <Card.Header>
                                                            <p>Attempted</p>
                                                            <h6 className="mb-0">10,000</h6>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <div className="Correct mb-3">
                                                                <p>Correct Answered</p>
                                                                <h6>6,000</h6>
                                                            </div>
                                                            <div className="Wrong">
                                                                <p>Wrong Answered</p>
                                                                <h6>4,000</h6>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                    <Card className="mx-1">
                                                        <Card.Header>
                                                            <p>Not-attempted</p>
                                                            <h6 className="mb-0">General</h6>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <div className="Public mb-3">
                                                                <p>Public Exam</p>
                                                                <h6>2017 &amp; 2018</h6>
                                                            </div>
                                                            <div className="TypeofQuestions">
                                                                <p>Type of Questions</p>
                                                                <h6>General</h6>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col as={Card}>
                                                <Card.Body>
                                                    <Form>
                                                        <Row>
                                                            <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectReasons">
                                                                <Form.Label>Reason For Wrong Attempt</Form.Label>
                                                                <SelectDropDown options={Reasons} placeholderName={'Select Reasons'} dropdownIndicator={{ DropdownIndicator }} />
                                                            </Form.Group>
                                                            <Form.Group as={Col} lg={6} md={6} sm={12} controlId="SelectTextarea">
                                                                <Form.Label>Some Comments</Form.Label>
                                                                <Form.Control as="textarea" rows="3" />
                                                            </Form.Group>
                                                        </Row>
                                                    </Form>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="text-center mt-3">
                                    <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} className="paginations-btns">
                                        <Button variant="outline-success" className="px-5 m-2">Next Question</Button>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )
                }
            </div>
        )
    }
}

export default PracticeExamSection


