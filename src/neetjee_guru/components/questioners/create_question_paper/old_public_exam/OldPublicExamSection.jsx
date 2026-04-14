import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import DateTime from 'react-datetime'
import SelectDropDown from '../../../selectdropdown/SelectDropDown'
import BreadcrumbHeading from '../../../breadcrumbs/BreadcrumbHeading';
import DownloadQuestionPaperModal from '../../../download_question_paper/DownloadQuestionPaperModal';

import '../../../../../react-datetime.css'
import '../_createquestionpaper.scss'


const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};


class OldPublicExamSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbData: {
                Title: 'Old Public exam - Question Paper'
            },
            modalShow: false,
            modalShowTwo: false,
            search: []
        }
    }
    render() {

        // ExamDurations
        const ExamDurations = [
            { value: 1, label: '60 Min' },
            { value: 2, label: '120 Min' },
            { value: 3, label: '180 Min' }
        ];

        // NoofQuestions
        const NoofQuestions = [
            { value: 1, label: '180' },
            { value: 2, label: '120' },
            { value: 3, label: '90' },
            { value: 4, label: '60' }
        ];
        // NoOfSets
        const NoOfSets = [
            { value: 1, label: '2' },
            { value: 2, label: '4' },
            { value: 3, label: '6' },
            { value: 4, label: '8' }
        ];

        // Paper
        const PaperData = [
            { value: 'JEE-2014', label: 'JEE-2014' },
            { value: 'JEE-2013', label: 'JEE-2013' },
            { value: 'JEE-2012', label: 'JEE-2012' },
            { value: 'JEE-2011', label: 'JEE-2011' },
            { value: 'JEE-2010', label: 'JEE-2010' },
            { value: 'JEE-2009', label: 'JEE-2009' },
            { value: 'JEE-2008', label: 'JEE-2008' },
            { value: 'JEE-2007', label: 'JEE-2007' },
            { value: 'JEE-2006', label: 'JEE-2006' },
            { value: 'JEE-2005', label: 'JEE-2005' }
        ];
        // Branch
        const BranchData = [
            { value: 'Branch-1', label: 'Branch-1' },
            { value: 'Branch-2', label: 'Branch-2' },
            { value: 'Branch-3', label: 'Branch-3' },
            { value: 'Branch-4', label: 'Branch-4' },
            { value: 'Branch-5', label: 'Branch-5' },
            { value: 'Branch-6', label: 'Branch-6' },
            { value: 'Branch-7', label: 'Branch-7' },
            { value: 'Branch-8', label: 'Branch-8' },
            { value: 'Branch-9', label: 'Branch-9' },
            { value: 'Branch-10', label: 'Branch-10' }
        ];
        // Section
        const SectionData = [
            { value: 'Section-1', label: 'Section-1', isFixed: true },
            { value: 'Section-2', label: 'Section-2', isFixed: true },
            { value: 'Section-3', label: 'Section-3' },
            { value: 'Section-4', label: 'Section-4' },
            { value: 'Section-5', label: 'Section-5' },
            { value: 'Section-6', label: 'Section-6' },
            { value: 'Section-7', label: 'Section-7' },
            { value: 'Section-8', label: 'Section-8' },
            { value: 'Section-9', label: 'Section-9', isFixed: true },
            { value: 'Section-10', label: 'Section-10' }
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

        const courses = [
            'JEE - 2001',
            'JEE - 2002',
            'JEE - 2003',
            'JEE - 2004',
            'JEE - 2005',
            'JEE - 2006',
            'JEE - 2007',
            'JEE - 2008',
            'JEE - 2009',
            'JEE - 2010',
            'JEE - 2011',
            'JEE - 2012'
        ];

        let options;
        if (this.state.search.length) {
            const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
            options = courses.filter(option =>
                option.match(searchPattern)
            );
        } else {
            options = courses;
        }

        return (
            <section className="old_public_exam">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                        <div className="custom_setup">
                            <h6 className="text-uppercase">Exam - Setup</h6>
                            <Form>
                                <Card className="border-0 shadow-sm">
                                    <Card.Header className="bg-white">
                                        <Row>
                                            <Form.Group as={Col} xl={8} lg={8} md={10} sm={12} className="mb-0" controlId="SelectPaper">
                                                <Form.Label className="text-uppercase">Paper</Form.Label>
                                                <Select maxMenuHeight={150}
                                                    defaultValue={[PaperData[0], PaperData[1], PaperData[2], PaperData[3]]}
                                                    isMulti
                                                    name="colors"
                                                    options={PaperData}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="g-0 mb-4">
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white d-flex align-items-center py-1 justify-content-between">
                                                    <Card.Title className="mb-0 h6">Papers: </Card.Title>
                                                    <Form.Control style={{ width: 100 }} type="text" placeholder="search" onChange={(e) => this.setState({ search: e.target.value.split(' ') })} />
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled chapter-list m-0">
                                                            {options.map((option, i) =>
                                                                <li key={option + i}>{option}</li>
                                                            )}
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={8} lg={8} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 pt-1 h6">&nbsp;</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext1">
                                                        <Form.Label column sm="2">
                                                            Botnay
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext2">
                                                        <Form.Label column sm="2">
                                                            Zoology
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext3">
                                                        <Form.Label column sm="2">
                                                            Physics
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formPlaintext4">
                                                        <Form.Label column sm="2">
                                                            Chemistry
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <Form.Control type="text" placeholder="5%" />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="NoOfSets">
                                                <Form.Label className="text-uppercase">No Of Sets</Form.Label>
                                                <SelectDropDown options={NoOfSets} placeholderName={'6'} dropdownIndicator={{ DropdownIndicator }} />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="SelectExamDurations">
                                                <Form.Label className="text-uppercase">Exam Durations</Form.Label>
                                                <SelectDropDown options={ExamDurations} placeholderName={'180 Min'} dropdownIndicator={{ DropdownIndicator }} />
                                            </Form.Group>
                                            <Form.Group as={Col} xl={4} lg={4} md={6} sm={12} controlId="NoofQuestions">
                                                <Form.Label className="text-uppercase">No Of Questions</Form.Label>
                                                <SelectDropDown options={NoofQuestions} placeholderName={'180'} dropdownIndicator={{ DropdownIndicator }} />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="text-right bg-white">
                                        <Button variant="success" className="px-4 text-uppercase" onClick={() => this.setState({ modalShowTwo: true })}>Download question papers</Button>
                                    </Card.Footer>
                                </Card>
                            </Form>
                        </div>
                        <div className="schedule_exam_block mt-4">
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                    <h6 className="card-title font-weight-normal mb-0 text-muted">Schedule online question paper</h6>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Toggle"
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} lg={4} md={6} sm={12} controlId="StartDate">
                                                <Form.Label className="text-uppercase">Branch</Form.Label>
                                                <Select maxMenuHeight={150}
                                                    defaultValue={[BranchData[0], BranchData[1]]}
                                                    isMulti
                                                    name="colors"
                                                    options={BranchData}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} lg={4} md={6} sm={12} controlId="EndDate">
                                                <Form.Label className="text-uppercase">Section</Form.Label>
                                                <Select maxMenuHeight={150}
                                                    defaultValue={[SectionData[0], SectionData[1]]}
                                                    isMulti
                                                    name="colors"
                                                    options={SectionData}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} lg={4} md={5} sm={12} controlId="StartDate">
                                                <Form.Label className="text-uppercase">Start Date</Form.Label>
                                                <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'Start Date' }} />
                                            </Form.Group>
                                            <Form.Group as={Col} lg={4} md={6} sm={12} controlId="EndDate">
                                                <Form.Label className="text-uppercase">End Date</Form.Label>
                                                <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'End Date' }} />
                                            </Form.Group>
                                            <Form.Group as={Col} lg={4} md={6} sm={12}>
                                                <Button variant="primary" className="px-4 text-uppercase" onClick={() => this.setState({ modalShow: true })}>Schedule Online<br /> question papers</Button>
                                            </Form.Group>
                                        </Row>
                                    </Form>

                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal {...this.props}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <Row>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12} className="text-center">
                                <div className="icon my-4">
                                    <svg role="img" viewBox="0 0 512 512" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="green" d="M345.34 182.46a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34L226.54 289.94l-48.57-48.57a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34l-11.31 11.31c-3.12 3.12-3.12 8.19 0 11.31l65.54 65.54c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.65-2.34l124.45-124.45c3.12-3.12 3.12-8.19 0-11.31l-11.3-11.31zM512 256c0-35.5-19.4-68.2-49.6-85.5 9.1-33.6-.3-70.4-25.4-95.5s-61.9-34.5-95.5-25.4C324.2 19.4 291.5 0 256 0s-68.2 19.4-85.5 49.6c-33.6-9.1-70.4.3-95.5 25.4s-34.5 61.9-25.4 95.5C19.4 187.8 0 220.5 0 256s19.4 68.2 49.6 85.5c-9.1 33.6.3 70.4 25.4 95.5 26.5 26.5 63.4 34.1 95.5 25.4 17.4 30.2 50 49.6 85.5 49.6s68.1-19.4 85.5-49.6c32.7 8.9 69.4.7 95.5-25.4 25.1-25.1 34.5-61.9 25.4-95.5 30.2-17.3 49.6-50 49.6-85.5zm-91.1 68.3c5.3 11.8 29.5 54.1-6.5 90.1-28.9 28.9-57.5 21.3-90.1 6.5C319.7 433 307 480 256 480c-52.1 0-64.7-49.5-68.3-59.1-32.6 14.8-61.3 22.2-90.1-6.5-36.8-36.7-10.9-80.5-6.5-90.1C79 319.7 32 307 32 256c0-52.1 49.5-64.7 59.1-68.3-5.3-11.8-29.5-54.1 6.5-90.1 36.8-36.9 80.8-10.7 90.1-6.5C192.3 79 205 32 256 32c52.1 0 64.7 49.5 68.3 59.1 11.8-5.3 54.1-29.5 90.1 6.5 36.8 36.7 10.9 80.5 6.5 90.1C433 192.3 480 205 480 256c0 52.1-49.5 64.7-59.1 68.3z"></path>
                                    </svg>
                                </div>
                                <h5 className="text-uppercase">Question paper <br />Generated successfully</h5>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <DownloadQuestionPaperModal show={this.state.modalShowTwo} onHide={() => this.setState({ modalShowTwo: false })} />
            </section>
        )
    }
}

export default OldPublicExamSection
