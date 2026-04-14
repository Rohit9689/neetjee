import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Container, Row, Col, Card, Form, Popover, Nav, Tab, OverlayTrigger, Button, } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { NotesShortNoteList } from './NotesShortnoteMaterialData';
import parse, { domToReact } from 'html-react-parser';

class NotesSingleShortNoteMaterialRevisionsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.getData.getData.id,
            title: props.getData.getData.title,
            desc: props.getData.getData.description,
            totAryLen: props.getData.funData.length,
            index: props.getData.index
        }
        this.popoverHide = React.createRef();
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    previousFunction = (indexid) => {
        let index = parseFloat(indexid) - 1;
        let array = this.props.getData.funData[index];
        if (array != undefined) {
            this.setState({
                title: array.title,
                desc: array.description,
                id: array.id,
                index: index
            });
        }
    }
    nextFunction = (indexid) => {
        let index = parseFloat(indexid) + 1;
        let array = this.props.getData.funData[index];
        if (array != undefined) {
            this.setState({
                title: array.title,
                desc: array.description,
                id: array.id,
                index: index
            });
        }
    }

    render() {
        console.log("this.props.getData", this.props.getData);
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

        const { id, title, description } = NotesShortNoteList[0];

        return (
            <div className="bookmark_shortNote_materials">
                <Container>
                    {/* <Row className="page-indication">
                        <Col xl={12} lg={12} md={12}>
                            <div className="title mt-3 mb-4">
                                <h5>Navbar</h5>
                            </div>
                            <Nav className="my-3">
                                <Nav.Item><Nav.Link className="active" as={Link} to="#">Link</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link2</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link3</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="#">Link4</Nav.Link></Nav.Item>
                            </Nav>
                        </Col>
                    </Row> */}
                    <div className="section-description mb-4">
                        <div className="breadcrumb-content d-md-flex justify-content-between align-items-center">
                            <h5 className="mb-0 pl-3 pt-3">Shortnotes</h5>
                            <Link
                                to={{
                                    pathname: "/student/notes/shortnotes-and-materials",
                                    state: {
                                        tagid: this.props.getData.tagid,
                                        subjectid: this.props.getData.subjectid

                                    }
                                }}
                                //to="/student/notes/shortnotes-and-materials" 
                                className="btn btn-link text-dark">
                                <i className="fal fa-long-arrow-alt-left" /> Back</Link>
                        </div>
                    </div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ul className="shortnote_cards list-unstyled">
                                    <li className="single_shortnote_list">
                                        <Card key={this.state.id} className="single_card fullView">
                                            <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                                <Card.Title className="h6 mb-0">{this.state.title}</Card.Title>
                                                <ul className="helpTags list-inline m-0 p-0">
                                                    <li className="list-inline-item"><i className="fal fa-star" /></li>
                                                    <li className="list-inline-item">
                                                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} ref={r => (this.popoverHide = r)} rootClose>
                                                            <i className="fal fa-info-circle" />
                                                        </OverlayTrigger>
                                                    </li>
                                                    <li className="list-inline-item">
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
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>{parse(this.decodefun(this.state.desc))}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="bg-white">
                                                {/* <Col xl={12} lg={12} md={12} className="bg-white pagination border-top py-3 px-3 d-flex justify-content-end fixed-bottom">
                                                    {this.state.index > 0 ? (<Button
                                                        variant="outline-primary mr-3"
                                                        style={{ width: 150 }}
                                                        onClick={(e) => this.previousFunction(this.state.index)}
                                                    >Previous</Button>) : ("")}
                                                    {this.state.index < parseFloat(this.state.totAryLen) - 1 ? (<Button
                                                        variant="outline-primary"
                                                        style={{ width: 150 }}
                                                        onClick={(e) => this.nextFunction(this.state.index)}
                                                    >Next</Button>) : ("")}
                                                </Col> */}
                                                <div className="pagination p-2 d-flex justify-content-between align-items-center">
                                                    {this.state.index > 0 ? (
                                                        <Button variant="outline-primary"
                                                            onClick={(e) => this.previousFunction(this.state.index)}>Previous</Button>
                                                    ) : ("")}
                                                    {this.state.index < parseFloat(this.state.totAryLen) - 1 ? (
                                                        <Button variant="outline-primary" onClick={(e) => this.nextFunction(this.state.index)}>Next</Button>
                                                    ) : ("")}
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </li>
                                </ul>
                                {/*  */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h6>Hello B</h6>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                </Container>
            </div>
        )
    }
}

export default NotesSingleShortNoteMaterialRevisionsSection
