import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, Container, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import './_custom_revision_materials.scss';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import parse, { domToReact } from "html-react-parser";
import { withApollo } from "@apollo/client/react/hoc";
//import BottomScrollListener from 'react-bottom-scroll-listener';
import InfiniteScroll from 'react-infinite-scroll-component';

class InnerRevisionMaterialSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getStudentRevisionMaterial: props.getStudentRevisionMaterial,
            page: props.stateData.page,
            loader: 0,
            hasMore: true
        }
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        decdata = decdata.replace(/font-family/g, "ff");

        return decdata;
    }
    onScrollgetStudentRevisionMaterial = async (e) => {
        console.log("this.state.getStudentRevisionMaterial.length", this.state.getStudentRevisionMaterial.length);
        if (this.state.getStudentRevisionMaterial.length < 9) {
            this.setState({ hasMore: false });
        }
        else {
            let page = parseInt(this.state.page) + 1;
            const result = await this.props.client.query({
                query: gql` 
            query(
                $params: RevisionMaterialInput, 
                
                ) {
                    getStudentRevisionMaterial(
                    params: $params
                    )
                    {
                        id
                        subject
                        title
                        description
                        content_type
                        video_link
                        file
                        topic
                        chapter
                        chapter_name
                        topic_name
                        bookmarked
                        stared
                        notes{
                            tags
                            comments
                        }

                        star_count
                        bookmark_count
                        total_views
                        your_views
                        content_image
                    
                }
            }
        `,
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        content_type: this.props.stateData.contentType,
                        subject_id: parseInt(this.props.stateData.subjectsearch),
                        chapter_ids: this.props.stateData.chaptersearch.toString(),
                        topic_id: parseInt(this.props.stateData.topicsearch),
                        class_id: parseInt(this.props.stateData.classsearch),
                        page: parseInt(page)
                    }
                },
            })
            // console.log("senddata", "mobile:", Cookies.get("mobile"),
            //     "content_type:", this.props.stateData.contentType,
            //     "subject_id:", parseInt(this.props.stateData.subjectsearch),
            //     "chapter_ids:", this.props.stateData.chaptersearch.toString(),
            //     "topic_id:", parseInt(this.props.stateData.topicsearch),
            //     "class_id:", parseInt(this.props.stateData.classsearch),
            //     "page:", parseInt(page));
            //console.log("newstyledata", this.state.getStudentRevisionMaterial.concat(result.data.getStudentRevisionMaterial));
            //console.log("newstyledata1234", result.data.getStudentRevisionMaterial);

            if (result.data.getStudentRevisionMaterial.length == 0) {
                this.setState({ hasMore: false, page: page });
                return;
            }
            else {
                setTimeout(() => {
                    this.setState({
                        page: page,
                        getStudentRevisionMaterial: this.state.getStudentRevisionMaterial.concat(result.data.getStudentRevisionMaterial)
                    });
                }, 500);
            }
        }
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

        return (
            <React.Fragment>
                {this.state.getStudentRevisionMaterial.length > 9 ? (
                    <InfiniteScroll
                        dataLength={this.state.getStudentRevisionMaterial.length}
                        next={this.onScrollgetStudentRevisionMaterial}
                        hasMore={this.state.hasMore}
                        loader={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Loading...</b>
                            </p>}
                        endMessage={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >

                        <section className="custom-revision-materials" >
                            <Row className="concept_cards">
                                {
                                    this.state.getStudentRevisionMaterial.map((item, index) => {
                                        //const { id, title, description } = item;
                                        return (
                                            <Col key={item.id} xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} >
                                                <Link
                                                    to={{
                                                        pathname: "/student/revision-material-groups/custom-single-revision-material",
                                                        state: {
                                                            page: this.state.page,
                                                            index: index,
                                                            stateData: this.props.stateData,
                                                            getStudentRevisionMaterial: this.state.getStudentRevisionMaterial
                                                        }
                                                    }}

                                                    className="text-dark text-decoration-none" >
                                                    <Card className="single_concept mb-4">
                                                        <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 px-3 bg-white">
                                                            <div className="d-flex align-items-center">
                                                                <div className="icon_area">
                                                                    <Image src={item.content_image} alt="material-img" width="25" />
                                                                </div>
                                                                <Card.Title className="h6 mb-0 ml-3">{item.title}</Card.Title>
                                                            </div>
                                                            <ul className="helpTags list-inline m-0 p-0">
                                                                {/* <li className="list-inline-item"><i className="fal fa-star" /></li>
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
                                                            </ul> */}
                                                                {item.stared == true ? (
                                                                    <li className="list-inline-item">
                                                                        <i
                                                                            title="star"
                                                                            className="fas fa-star text-warning"
                                                                        />
                                                                    </li>
                                                                ) : (
                                                                        <li className="list-inline-item">
                                                                            <i title="star" className="fal fa-star" />
                                                                        </li>
                                                                    )}
                                                                {item.bookmarked == true ? (
                                                                    <li className="list-inline-item">
                                                                        <i className="fas fa-bookmark text-success" />
                                                                    </li>
                                                                ) : (
                                                                        <li className="list-inline-item">
                                                                            <i className="fal fa-bookmark" />
                                                                        </li>
                                                                    )}
                                                            </ul>
                                                        </Card.Header>
                                                        <Card.Body className="pt-2">
                                                            <Card.Text>{parse(this.decodefun(item.description))}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </section>
                    </InfiniteScroll>
                ) : (


                        <section className="custom-revision-materials" >
                            <Row className="concept_cards">
                                {
                                    this.state.getStudentRevisionMaterial.map((item, index) => {
                                        //const { id, title, description } = item;
                                        return (
                                            <Col key={item.id} xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} >
                                                <Link
                                                    to={{
                                                        pathname: "/student/revision-material-groups/custom-single-revision-material",
                                                        state: {
                                                            page: this.state.page,
                                                            index: index,
                                                            stateData: this.props.stateData,
                                                            getStudentRevisionMaterial: this.state.getStudentRevisionMaterial
                                                        }
                                                    }}

                                                    className="text-dark text-decoration-none" >
                                                    <Card className="single_concept mb-4">
                                                        <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 px-3 bg-white">
                                                            <div className="d-flex">
                                                                <div className="icon_area">
                                                                    <Image src={item.content_image} alt="material-img" width="25" />
                                                                </div>
                                                                <Card.Title className="h6 mb-0 ml-3">{item.title}</Card.Title>
                                                            </div>

                                                            <ul className="helpTags list-inline m-0 p-0">
                                                                {/* <li className="list-inline-item"><i className="fal fa-star" /></li>
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
                                                            </ul> */}
                                                                {item.stared == true ? (
                                                                    <li className="list-inline-item">
                                                                        <i
                                                                            title="star"
                                                                            className="fas fa-star text-warning"
                                                                        />
                                                                    </li>
                                                                ) : (
                                                                        <li className="list-inline-item">
                                                                            <i title="star" className="fal fa-star" />
                                                                        </li>
                                                                    )}
                                                                {item.bookmarked == true ? (
                                                                    <li className="list-inline-item">
                                                                        <i className="fas fa-bookmark text-success" />
                                                                    </li>
                                                                ) : (
                                                                        <li className="list-inline-item">
                                                                            <i className="fal fa-bookmark" />
                                                                        </li>
                                                                    )}
                                                            </ul>
                                                        </Card.Header>
                                                        <Card.Body className="pt-2">
                                                            <Card.Text>{parse(this.decodefun(item.description))}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            {this.state.getStudentRevisionMaterial.length == 0 ? (<p style={{ textAlign: "center" }}>
                                <b>No data available </b>
                            </p>) : (<p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>)}

                        </section>

                    )}
            </React.Fragment>



        )
    }
}

export default withApollo(InnerRevisionMaterialSection);