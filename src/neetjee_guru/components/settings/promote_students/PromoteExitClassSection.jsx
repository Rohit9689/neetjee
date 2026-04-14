import React, { Component } from 'react'
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, CardGroup, Card, Form, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading';
import PromoteModal from './PromoteModal';
import PromoteModalSuccess from './PromoteModalSuccess';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

// Student
const StudentData = [
    { value: '012501', label: '012501' },
    { value: '012502', label: '012502' },
    { value: '012503', label: '012503' },
    { value: '012504', label: '012504' },
    { value: '012505', label: '012505' },
    { value: '012506', label: '012506' },
    { value: '012507', label: '012507' },
    { value: '012508', label: '012508' },
    { value: '012509', label: '012509' },
    { value: '0125010', label: '0125010' },
    { value: '0125011', label: '0125011' },
    { value: '0125012', label: '0125012' },
    { value: '0125013', label: '0125013' },
    { value: '0125014', label: '0125014' },
    { value: '0125015', label: '0125015' }
];

class PromoteExitClassSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breadcrumbsData: {
                Title: 'Promote Students'
            },
            toggleShow: true,
            modalShow: false,
            modalShow2: false
        }
    }

    render() {
        const { toggleShow } = this.state;
        return (
            <div className="promote_student">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} className="Custom_Exam_Syllabus">
                        <Card as={Card.Body} className="border-0 shadow-sm p-0">
                            <CardGroup className="border-0">
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Subjects</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <Scrollbars style={{ height: 150 }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled branch-list m-0">
                                                <li className="d-flex justify-content-between align-items-center">Select All </li>
                                                <li className="active d-flex justify-content-between align-items-center">
                                                    <div className="branches">Branch - 1</div>
                                                    <div className="sections text-muted">A1,A2,A4,A5</div>
                                                </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 2 </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 3 </li>
                                                <li className="d-flex justify-content-between align-items-center">
                                                    <div className="branches">Branch - 4</div>
                                                    <div className="sections text-muted">A1,A6</div> </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 5 </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 6 </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 7 </li>
                                                <li className="d-flex justify-content-between align-items-center">Branch - 8 </li>
                                            </ul>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                                <Card className="border-top-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="mb-0 h6">Biology Chapters</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-2">
                                        <Scrollbars style={{ height: 150 }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled sections-list m-0">
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxAll" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxOne" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxOne">Sections - 1</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxTwo">Sections - 2</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxThree" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxThree">Sections - 3</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxFour" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxFour">Sections - 4</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                                <li>
                                                    <Form.Check type="checkbox" id="checkboxFive" custom>
                                                        <Form.Check.Input type="checkbox" />
                                                        <Form.Check.Label htmlFor="checkboxFive">Sections - 5</Form.Check.Label>
                                                    </Form.Check>
                                                </li>
                                            </ul>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                                <Card className="border-top-0 p-2">
                                    <Card className="bg-light border-0">
                                        <Card.Header className="border-0">
                                            <Card.Title className="mb-0 h6">Branches &amp; Sections</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-2">
                                            <Scrollbars style={{ height: 150 }}
                                                {...this.props}
                                                renderThumbVertical={renderThumb}
                                                autoHide
                                                autoHideTimeout={500}
                                                autoHideDuration={200}>
                                                <Row>
                                                    <Col xl={4} lg={4} md={6} sm={12}>
                                                        <h6>Banch - 1</h6>
                                                        <ul className="list-unstyled group-list m-0">
                                                            <li>Section - 1 </li>
                                                            <li>Section - 2 </li>
                                                            <li>Section - 3 </li>
                                                            <li>Section - 4 </li>
                                                            <li>Section - 5 </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={12}>
                                                        <h6>Banch - 4</h6>
                                                        <ul className="list-unstyled group-list m-0">
                                                            <li>Section - 1 </li>
                                                            <li>Section - 2 </li>
                                                            <li>Section - 3 </li>
                                                            <li>Section - 4 </li>
                                                            <li>Section - 5 </li>
                                                            <li>Section - 6 </li>
                                                        </ul>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={6} sm={12}>
                                                        <h6>Banch - 3</h6>
                                                        <ul className="list-unstyled group-list m-0">
                                                            <li>Section - 1 </li>
                                                            <li>Section - 2 </li>
                                                            <li>Section - 3 </li>
                                                            <li>Section - 4 </li>
                                                            <li>Section - 5 </li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Scrollbars>
                                        </Card.Body>
                                    </Card>
                                </Card>
                            </CardGroup>
                            <Card.Footer className="text-right bg-white border-0">
                                <Button variant="success" className="px-5" onClick={() => this.setState({ toggleShow: !toggleShow })}>
                                    {this.state.toggleShow ? 'Next' : 'Edit'}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className="mt-4" xl={12} lg={12} md={12} sm={12} style={{ display: (toggleShow ? 'none' : 'block') }}>
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center justify-content-between bg-white">
                                <Card.Title className="h6 mb-0">Exclusion List (15 Student Selected)</Card.Title>
                                <Button variant="outline-success" onClick={() => this.setState({ modalShow: true })}>Add Student</Button>
                            </Card.Header>
                            <Card.Body>
                                <Select maxMenuHeight={150}
                                    defaultValue={[StudentData[0], StudentData[1], StudentData[2], StudentData[3], StudentData[4], StudentData[5], StudentData[6], StudentData[7], StudentData[8], StudentData[9], StudentData[10], StudentData[11], StudentData[12], StudentData[13], StudentData[14], StudentData[15]]}
                                    isMulti
                                    name="colors"
                                    options={StudentData}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Card.Body>
                            <Card.Footer className="text-right bg-white">
                                <Button variant="success" className="px-5" onClick={() => this.setState({ modalShow2: true })}>Submit</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <PromoteModal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                <PromoteModalSuccess show={this.state.modalShow2} onHide={() => this.setState({ modalShow2: false })} />
            </div>
        )
    }
}

export default PromoteExitClassSection
