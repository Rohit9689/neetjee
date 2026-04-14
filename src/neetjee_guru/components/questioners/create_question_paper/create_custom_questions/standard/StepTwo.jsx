import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'


const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};


class StepTwo extends Component {
    render() {
        if (this.props.currentstep !== 2) {
            return null;
        }
        return (
            <Row className="stepTwo mt-5">
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Card as={Card.Body} className="border-0 shadow-sm">
                        <ul className="list-unstyled">
                            <li>
                                <h6 className="mb-3 title text-uppercase">Type Of Question - Selection</h6>
                                <Card className="custom_setup border-0">
                                    <Card.Body className="p-0">
                                        <Row className="g-0">
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Subjects </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled subject-list m-0">
                                                            <li>Botnay</li>
                                                            <li>Zoology</li>
                                                            <li>Physics</li>
                                                            <li>Chemistry</li>
                                                            <li>Maths</li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Type of Questions </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled chap-topic-list m-0 pl-1">
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxAll" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxAll">Select All</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxOne" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxOne">Chapter Name - 1</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxTwo" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxTwo">Chapter Name - 2</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxThree" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxThree">Chapter Name - 3</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxFour" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxFour">Chapter Name - 4</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxFive" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxFive">Chapter Name - 5</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                            <li>
                                                                <Form.Check type="checkbox" id="checkboxSix" custom>
                                                                    <Form.Check.Input type="checkbox" />
                                                                    <Form.Check.Label htmlFor="checkboxSix">Chapter Name - 6</Form.Check.Label>
                                                                </Form.Check>
                                                            </li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={4} lg={4} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Selected</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext1">
                                                        <Form.Label column sm="6">
                                                            Chapter Name-1
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="60%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext2">
                                                        <Form.Label column sm="6">
                                                            Chapter Name-3
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="30%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext3">
                                                        <Form.Label column sm="6">
                                                            Chapter Name-4
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="40%" />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card as={Card.Body} className="text-right bg-white" style={{ marginTop: -2 }}>
                                    <div className="">
                                        <Button variant="success" className="px-4 text-uppercase">Edit</Button>
                                    </div>
                                </Card>
                            </li>
                            <li>
                                <h6 className="mb-3 title text-uppercase">Complexity</h6>
                                <Card className="custom_setup border-0">
                                    <Card.Body className="p-0">
                                        <Row className="g-0">
                                            <Card as={Col} xl={6} lg={6} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Subjects </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled subject-list m-0">
                                                            <li>Botnay</li>
                                                            <li>Zoology</li>
                                                            <li>Physics</li>
                                                            <li>Chemistry</li>
                                                            <li>Maths</li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={6} lg={6} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Complexity</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext1">
                                                        <Form.Label column sm="6">
                                                            Difficulty
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="40%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext2">
                                                        <Form.Label column sm="6">
                                                            Moderate
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="40%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext3">
                                                        <Form.Label column sm="6">
                                                            Easy
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="20%" />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card as={Card.Body} className="text-right bg-white" style={{ marginTop: -2 }}>
                                    <div className="">
                                        <Button variant="success" className="px-4 text-uppercase">Edit</Button>
                                    </div>
                                </Card>
                            </li>
                            <li>
                                <h6 className="mb-3 title text-uppercase">Questin Theory</h6>
                                <Card className="custom_setup border-0">
                                    <Card.Body className="p-0">
                                        <Row className="g-0">
                                            <Card as={Col} xl={6} lg={6} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Subjects </Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Scrollbars style={{ height: 160 }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        <ul className="list-unstyled subject-list m-0">
                                                            <li>Botnay</li>
                                                            <li>Zoology</li>
                                                            <li>Physics</li>
                                                            <li>Chemistry</li>
                                                            <li>Maths</li>
                                                        </ul>
                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                            <Card as={Col} xl={6} lg={6} md={12}>
                                                <Card.Header className="bg-white">
                                                    <Card.Title className="mb-0 h6">Questin Theory</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-2">
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext1">
                                                        <Form.Label column sm="6">
                                                            Applicatin
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="40%" />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-1" controlId="formtext2">
                                                        <Form.Label column sm="6">
                                                            Concept
                                                        </Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control type="text" placeholder="60%" />
                                                        </Col>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Card as={Card.Body} className="text-right bg-white" style={{ marginTop: -2 }}>
                                    <div className="">
                                        <Button variant="success" className="px-4 text-uppercase">Save</Button>
                                    </div>
                                </Card>
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default StepTwo
