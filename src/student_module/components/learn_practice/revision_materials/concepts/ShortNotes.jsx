import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, } from 'react-bootstrap'
import SelectDropDown from '../../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import parse, { domToReact } from 'html-react-parser';

class ShortNotes extends Component {

    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }

    render() {
        console.log("ShortNotes", this.props);
        // Reasons
        // const Reasons = [
        //     { value: 1, label: 'Reasons-1' },
        //     { value: 2, label: 'Reasons-2' },
        //     { value: 3, label: 'Reasons-3' }
        // ];
        // const SectionData = [
        //     { value: 'NEET 2020', label: 'NEET 2020', color: '#00B8D9', isFixed: true },
        //     { value: 'JEE 2020', label: 'JEE 2020', color: '#0052CC', isFixed: true },
        //     { value: 'EAMCET 2020', label: 'EAMCET 2020', color: '#5243AA' },
        // ];
        // const DropdownIndicator = props => {
        //     return (
        //         components.DropdownIndicator && (
        //             <components.DropdownIndicator {...props}>
        //                 <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
        //             </components.DropdownIndicator>
        //         )
        //     );
        // };
        // const popover = (
        //     <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
        //         <Popover.Content>
        //             <div className="content-block p-3">
        //                 <h6>Report</h6>
        //                 <Form>
        //                     <Form.Group controlId="SelectPrinciple">
        //                         <SelectDropDown options={Reasons} placeholderName={'Select Reasons'} dropdownIndicator={{ DropdownIndicator }} />
        //                     </Form.Group>
        //                     <Form.Group controlId="CommentsTextarea1">
        //                         <Form.Control as="textarea" rows="3" placeholder="Some Comments" />
        //                     </Form.Group>
        //                 </Form>
        //             </div>
        //             <Row className="text-center border-top">
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
        //                     <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
        //                         Cancel
        //                     </Button>
        //                 </Col>
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6}>
        //                     <Button onClick={() => this.popoverHide.handleHide()} size="sm" variant="link" className="py-2">
        //                         Submit
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Popover.Content>
        //     </Popover>
        // );
        // const popover2 = (
        //     <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
        //         <Popover.Content>
        //             <div className="content-block p-3">
        //                 <h6>Notes</h6>
        //                 <Form>
        //                     <Form.Group controlId="SelectPrinciple">
        //                         <Select maxMenuHeight={150}
        //                             defaultValue={[SectionData[0]]}
        //                             isMulti
        //                             name="colors"
        //                             options={SectionData}
        //                             className="basic-multi-select"
        //                             classNamePrefix="select"
        //                         />
        //                     </Form.Group>
        //                     <div className="mb-2 text-center">
        //                         <span>or</span>
        //                     </div>
        //                     <Form.Group controlId="NewTag2">
        //                         <Form.Control type="text" placeholder="Enter New Tag" />
        //                     </Form.Group>
        //                     <Form.Group controlId="CommentsTextarea2">
        //                         <Form.Control as="textarea" rows="3" placeholder="Some Comments" />
        //                     </Form.Group>
        //                 </Form>
        //             </div>
        //             <Row className="text-center border-top">
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
        //                     <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
        //                         Cancel
        //                     </Button>
        //                 </Col>
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6}>
        //                     <Button onClick={() => this.popoverHide2.handleHide()} size="sm" variant="link" className="py-2">
        //                         Submit
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Popover.Content>
        //     </Popover>
        // );
        // const popover3 = (
        //     <Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
        //         <Popover.Content>
        //             <div className="content-block p-3">
        //                 <h6>Bookmarks</h6>
        //                 <Form>
        //                     <Form.Group controlId="SelectBookmark">
        //                         <Select maxMenuHeight={150}
        //                             defaultValue={[SectionData[0]]}
        //                             isMulti
        //                             name="colors"
        //                             options={SectionData}
        //                             className="basic-multi-select"
        //                             classNamePrefix="select"
        //                         />
        //                     </Form.Group>
        //                     <div className="mb-2 text-center">
        //                         <span>or</span>
        //                     </div>
        //                     <Form.Group controlId="NewTag3">
        //                         <Form.Control type="text" placeholder="Enter New Tag" />
        //                     </Form.Group>
        //                 </Form>
        //             </div>
        //             <Row className="text-center border-top">
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
        //                     <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
        //                         Cancel
        //                     </Button>
        //                 </Col>
        //                 <Col xl={6} lg={6} md={6} sm={6} xs={6}>
        //                     <Button onClick={() => this.popoverHide3.handleHide()} size="sm" variant="link" className="py-2">
        //                         Submit
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Popover.Content>
        //     </Popover>
        // );
        return (
            <Row className="concept_cards">
                <React.Fragment>
                    {this.props.getData != "" ? (
                        <React.Fragment>{this.props.getData.map((data, index) => (
                            <Col as={Link}
                                to={{
                                    pathname: "/student/subject/short-notes",
                                    state: {
                                        getChapterId: this.props.getChapterId,
                                        getData: this.props.getData,
                                        title: data.title,
                                        description: data.description,
                                        id: data.id,
                                        index: index,
                                        bookmarked: data.bookmarked,
                                        stared: data.stared,
                                        last_attempted_chapter: this.props.getData.last_attempted_chapter,
                                        last_attempted_chaptername: this.props.getData.last_attempted_chaptername,
                                        last_timestamp: this.props.getData.last_timestamp
                                    }
                                }}
                                xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card key={data.id} className="single_concept mb-4">
                                    <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 px-3 bg-white">
                                        <Card.Title className="h6 mb-0">{data.title}</Card.Title>
                                        <ul className="helpTags list-inline m-0 p-0">
                                            {data.stared == true ? (
                                                <li className="list-inline-item">
                                                    <i className="fas fa-star text-warning"
                                                        title="star"
                                                    /></li>) : (
                                                    <li className="list-inline-item">
                                                        <i className="fal fa-star"
                                                            title="star" />
                                                    </li>)}
                                            {data.bookmarked == true ? (
                                                <li className="list-inline-item">
                                                    <i className="fas fa-bookmark text-success"
                                                        title="bookmark" />
                                                </li>
                                            ) : (<li className="list-inline-item">

                                                <i className="fal fa-bookmark"
                                                    title="bookmark" />

                                            </li>)}
                                        </ul>
                                    </Card.Header>
                                    <Card.Body className="pt-2">
                                        <Card.Text>{parse(this.decodefun(data.description))}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        ))} </React.Fragment>) : (<React.Fragment>
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card key="" className="single_concept mb-4">
                                    <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                        <Card.Title className="h6 mb-0"></Card.Title>
                                    </Card.Header>
                                    <Card.Body className="pt-2">
                                        <Card.Text className="text-danger">NO DATA AVAILABLE</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </React.Fragment>)}

                </React.Fragment>



            </Row>
        )
    }
}

export default ShortNotes
