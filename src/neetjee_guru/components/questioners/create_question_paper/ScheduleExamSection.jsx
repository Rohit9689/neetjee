import React, { Component } from 'react'
import Select from 'react-select';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap'
import DateTime from 'react-datetime'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'
import '../../../../react-datetime.css'

// Branch
const Branch = [
    { value: 1, label: 'Branch-1' },
    { value: 2, label: 'Branch-2' },
    { value: 3, label: 'Branch-3' }
];

// SectionGroup
const SectionGroup = [
    { value: 1, label: 'Section-1' },
    { value: 2, label: 'Section-2' },
    { value: 3, label: 'Section-3' },
    { value: 4, label: 'Section-4' }
];

class ScheduleExamSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            BreadcrumbData: {
                Title: 'Schedule Exam'
            }
        }
    }

    render() {
        return (
            <div className="schedule_exam">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} className="mb-4">
                        <Card as={Card.Body} className="p-xl-5 p-lg-5 border-0 shadow-sm">
                            <Form>
                                <Row>
                                    <Form.Group as={Col} lg={5} md={12} sm={12} controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Branch</Form.Label>
                                        <Select maxMenuHeight={150}
                                            defaultValue={[Branch[0], Branch[1]]}
                                            isMulti
                                            name="colors"
                                            options={Branch}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={5} md={12} sm={12} controlId="SelectSectionGroup">
                                        <Form.Label className="text-uppercase">Section Group</Form.Label>
                                        <Select maxMenuHeight={150}
                                            defaultValue={[SectionGroup[0], SectionGroup[1]]}
                                            isMulti
                                            name="colors"
                                            options={SectionGroup}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} lg={5} md={12} sm={12} controlId="StartDate">
                                        <Form.Label className="text-uppercase">Start Date</Form.Label>
                                        <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'Start Date' }} />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={5} md={12} sm={12} controlId="EndDate">
                                        <Form.Label className="text-uppercase">End Date</Form.Label>
                                        <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'End Date' }} />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} className="text-right">
                        <Button variant="primary" className="px-5" onClick={() => this.setState({ modalShow: true })}>Submit</Button>
                    </Col>
                </Row>
                <Modal {...this.props}
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    size="lg" aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        <Row>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12} className="text-center mb-4">
                                <div className="icon my-4">
                                    <svg role="img" viewBox="0 0 512 512" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="green" d="M345.34 182.46a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34L226.54 289.94l-48.57-48.57a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34l-11.31 11.31c-3.12 3.12-3.12 8.19 0 11.31l65.54 65.54c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.65-2.34l124.45-124.45c3.12-3.12 3.12-8.19 0-11.31l-11.3-11.31zM512 256c0-35.5-19.4-68.2-49.6-85.5 9.1-33.6-.3-70.4-25.4-95.5s-61.9-34.5-95.5-25.4C324.2 19.4 291.5 0 256 0s-68.2 19.4-85.5 49.6c-33.6-9.1-70.4.3-95.5 25.4s-34.5 61.9-25.4 95.5C19.4 187.8 0 220.5 0 256s19.4 68.2 49.6 85.5c-9.1 33.6.3 70.4 25.4 95.5 26.5 26.5 63.4 34.1 95.5 25.4 17.4 30.2 50 49.6 85.5 49.6s68.1-19.4 85.5-49.6c32.7 8.9 69.4.7 95.5-25.4 25.1-25.1 34.5-61.9 25.4-95.5 30.2-17.3 49.6-50 49.6-85.5zm-91.1 68.3c5.3 11.8 29.5 54.1-6.5 90.1-28.9 28.9-57.5 21.3-90.1 6.5C319.7 433 307 480 256 480c-52.1 0-64.7-49.5-68.3-59.1-32.6 14.8-61.3 22.2-90.1-6.5-36.8-36.7-10.9-80.5-6.5-90.1C79 319.7 32 307 32 256c0-52.1 49.5-64.7 59.1-68.3-5.3-11.8-29.5-54.1 6.5-90.1 36.8-36.9 80.8-10.7 90.1-6.5C192.3 79 205 32 256 32c52.1 0 64.7 49.5 68.3 59.1 11.8-5.3 54.1-29.5 90.1 6.5 36.8 36.7 10.9 80.5 6.5 90.1C433 192.3 480 205 480 256c0 52.1-49.5 64.7-59.1 68.3z"></path>
                                    </svg>
                                </div>
                                <h5 className="text-uppercase">Exam Scheduled</h5>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ScheduleExamSection
