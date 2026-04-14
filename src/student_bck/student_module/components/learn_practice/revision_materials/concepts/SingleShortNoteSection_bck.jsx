import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, } from 'react-bootstrap'
import SelectDropDown from '../../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import parse, { domToReact } from 'html-react-parser';

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

class SingleShortNoteSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.getData.id,
            title: props.getData.title,
            desc: props.getData.description,
            totAryLen: props.getData.getData.length,
            index: props.getData.index,
            stared: props.getData.stared,

        }
        this.popoverHide2 = React.createRef();
        this.cancelFun2 = this.cancelFun2.bind(this);

        this.popoverHide = React.createRef();
        this.cancelFun1 = this.cancelFun1.bind(this);

        this.popoverHide3 = React.createRef();
        this.cancelFun3 = this.cancelFun3.bind(this);
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    previousFunction = (indexid) => {
        let index = parseFloat(indexid) - 1;
        let array = this.props.getData.getData[index];
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
        let array = this.props.getData.getData[index];
        if (array != undefined) {
            this.setState({
                title: array.title,
                desc: array.description,
                id: array.id,
                index: index
            });
        }
    }
    cancelFun2() {
        this.popoverHide2.handleHide();
    }
    cancelFun1() {
        this.popoverHide.handleHide();
    }
    cancelFun3() {
        this.popoverHide3.handleHide();
    }
    reasonsFun() {
        let data = this.props.studentGlobals.reports;
        let sarray = [];
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const obj = {
                    value: idata.id,
                    label: idata.report,
                }
                sarray.push(obj);
            }
        }
        return sarray;
    }
    notesTags(typ) {
        let data = this.props.studentGlobals.tags;
        let sarray = [];
        console.log("notesTags", data);
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                //bookmark
                if (idata.type == "notes") {
                    const obj = {
                        value: idata.id,
                        label: idata.tag,
                    }
                    sarray.push(obj);
                }

            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        }
        else {
            somvar = sarray;
        }
        return somvar;
    }
    bookmarkFun(typ) {
        let data = this.props.studentGlobals.tags;
        let sarray = [];
        console.log("notesTags", data);
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                if (idata.type == "bookmark") {
                    const obj = {
                        value: idata.id,
                        label: idata.tag,
                    }
                    sarray.push(obj);
                }

            }
        }
        let somvar = "";
        if (typ == "def") {
            somvar = sarray[0];
        }
        else {
            somvar = sarray;
        }
        return somvar;
    }
    popoverFunction = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Report</h6>
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Report saved successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError1}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group controlId="SelectPrinciple">
                            <SelectDropDown
                                name="reportreson"
                                handleChange={this.props.parentselecthandleInputChange}
                                options={this.reasonsFun()}
                                placeholderName={'Select Reasons'}
                                dropdownIndicator={{ DropdownIndicator }}
                            />
                        </Form.Group>
                        <Form.Group controlId="CommentsTextarea1">
                            <Form.Control
                                value={this.props.stateData.reportcomment}
                                name="reportcomment"
                                onChange={this.props.parenthandleInputChange}
                                as="textarea"
                                rows="3"
                                placeholder="Some Comments"
                            />
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.formErrors.reportcomment}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun1()} size="sm" variant="link" className="py-2">
                            Cancel
            </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button onClick={(e) => this.props.parenthandleFormSubmit(this.props.type, custonid)} size="sm" variant="link" className="py-2">
                            Submit
            </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }

    popoverFunction2 = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Notes</h6>
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Note saved successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError2}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group controlId="SelectPrinciple">
                            <Select maxMenuHeight={150}
                                //defaultValue={this.notesTags("def")}
                                isMulti
                                name="ntags"
                                options={this.notesTags()}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.props.phandleMutipleInputChange("ntags")}
                            />

                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag2">
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Enter New Tag"
                                name="nnewtag"
                                value={this.props.stateData.newtag}
                                onChange={this.props.parenthandleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="CommentsTextarea2">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Some Comments"
                                name="ncomments"
                                value={this.props.stateData.ncomments}
                                onChange={this.props.parenthandleInputChange} />
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun2()} size="sm" variant="link" className="py-2">
                            Cancel
                    </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button
                            onClick={(e) => this.props.parentnoteshandleFormSubmit(this.props.type, custonid)}
                            //onClick={() => this.popoverHide2.handleHide()} 
                            size="sm" variant="link" className="py-2">
                            Submit
                    </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }

    popoverFunction3 = (custonid) => {
        return (<Popover {...this.props} id="filter-popover" className="custom-popover shadow border-0" style={{ width: '250px' }}>
            <Popover.Content>
                <div className="content-block p-3">
                    <h6>Bookmarks</h6>
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Bookmark saved successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError3}

                            </Form.Text>

                        )}
                    <Form>
                        <Form.Group
                            //controlId="SelectBookmark"
                            controlId="SelectPrinciple">
                            <Select maxMenuHeight={150}
                                //defaultValue={this.bookmarkFun("def")}
                                isMulti
                                name="btags"
                                options={this.bookmarkFun()}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.props.phandleMutipleInputChange("btags")}
                            />
                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag3">
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Enter New Tag"
                                name="bnewtag"
                                value={this.props.stateData.bnewtag}
                                onChange={this.props.parenthandleInputChange} />
                        </Form.Group>
                    </Form>
                </div>
                <Row className="text-center border-top">
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">
                        <Button onClick={() => this.cancelFun3()} size="sm" variant="link" className="py-2">
                            Cancel
                    </Button>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <Button
                            //onClick={() => this.popoverHide3.handleHide()} 
                            onClick={(e) => this.props.parentbookhandleFormSubmit(this.props.type, custonid)}
                            size="sm" variant="link" className="py-2">
                            Submit
                    </Button>
                    </Col>
                </Row>
            </Popover.Content>
        </Popover>);
    }
    render() {
        const { id, title, description } = ConceptsData[0];
        return (
            <React.Fragment>
                <Row className="concept_cards singleshortNote mt-4">
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Link
                            to={{
                                pathname: "/student/subject/start-learning",
                                state: {
                                    hname: this.props.getData.getChapterId.hname,
                                    chapterid: this.props.getData.getChapterId.chapterid,
                                    chapter: this.props.getData.getChapterId.chapter,
                                    ocid: this.props.getData.getChapterId.ocid,
                                    otid: "0",
                                    last_attempted_chapter: this.props.getData.getChapterId.last_attempted_chapter,
                                    last_attempted_chaptername: this.props.getData.getChapterId.last_attempted_chaptername,
                                    last_timestamp: this.props.getData.getChapterId.last_timestamp
                                }
                            }}
                            className="btn btn-outline-secondary px-4 mb-4" style={{ borderRadius: 25 }}><i className="fal fa-long-arrow-alt-left" /> Back</Link>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card key={this.state.id} className="single_concept mb-4">
                            <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 bg-white">
                                <Card.Title className="h6 mb-0">{this.state.title}</Card.Title>
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
                                    </li> */}
                                    {this.props.stateData.stared == true ? (
                                        <li className="list-inline-item">
                                            <i title="star" className="fas fa-star text-warning" onClick={(e) => this.props.parentremovestarhandleFormSubmit(this.props.type, this.state.id)}
                                            /></li>) : (
                                            <li className="list-inline-item">
                                                <i title="star" className="fal fa-star" onClick={(e) => this.props.parentstarhandleFormsubmit(this.props.type, this.state.id)} />
                                            </li>)}

                                    <li className="list-inline-item">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction(this.state.id)} ref={r => (this.popoverHide = r)} rootClose>
                                            <i className="fal fa-info-circle" title="report" />
                                        </OverlayTrigger>
                                    </li>
                                    <li className="list-inline-item">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction2(this.state.id)} ref={r => (this.popoverHide2 = r)} rootClose>
                                            <i className="fal fa-notes-medical" title="notes" />
                                        </OverlayTrigger>
                                    </li>
                                    {this.props.stateData.bookmarked == true ? (
                                        <li className="list-inline-item">
                                            <i className="fas fa-bookmark text-success" title="bookmark" onClick={(e) => this.props.parentremovebookhandleFormSubmit(this.props.type, this.state.id)} />
                                        </li>
                                    ) : (<li className="list-inline-item">
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction3(this.state.id)} ref={r => (this.popoverHide3 = r)} rootClose>
                                            <i className="fal fa-bookmark" title="bookmark" />
                                        </OverlayTrigger>
                                    </li>)}
                                </ul>
                            </Card.Header>
                            <Card.Body className="pt-2">
                                <Card.Text>{parse(this.decodefun(this.state.desc))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <div as={Col} xl={12} lg={12} md={12} className="bg-white pagination border-top py-3 px-3 d-flex justify-content-end fixed-bottom">
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
                    </div>
                </Row>

            </React.Fragment>
        )
    }
}

export default SingleShortNoteSection
