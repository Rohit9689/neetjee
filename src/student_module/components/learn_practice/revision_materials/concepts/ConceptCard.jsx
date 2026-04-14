import React, { Component } from 'react'
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
class ConceptCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            custonid: ""
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
                                onChange={(e) => this.props.phandleMutipleInputChange(e, "ntags")}
                            />

                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag2">
                            <Form.Control
                                type="text"
                                placeholder="Enter New Tag"
                                name="nnewtag"
                                value={this.props.stateData.newtag}
                                onChange={this.props.parenthandleInputChange}
                                autoComplete="off" />
                        </Form.Group>
                        <Form.Group controlId="CommentsTextarea2">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Some Comments"
                                name="ncomments"
                                value={this.props.stateData.ncomments}
                                onChange={this.props.parenthandleInputChange} />
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.formErrors.ncomments}
                            </Form.Text>
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
                                onChange={(e) => this.props.phandleMutipleInputChange(e, "btags")}
                            />
                        </Form.Group>
                        <div className="mb-2 text-center">
                            <span>or</span>
                        </div>
                        <Form.Group controlId="NewTag3">
                            <Form.Control
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
        console.log("ConceptCard", this.props.getData);
        return (
            <Row className="concept_cards">
                <React.Fragment>
                    {this.props.getData != "" ? (
                        <React.Fragment>{this.props.getData.map((data, index) => (

                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card key={data.id} className="single_concept mb-4">
                                    <Card.Header className="d-flex justify-content-between align-items-center border-0 py-2 px-3 bg-white">
                                        <Card.Title className="h6 mb-0">{data.title}</Card.Title>
                                        <ul className="helpTags list-inline m-0 p-0">

                                            {data.stared == true ? (
                                                <li className="list-inline-item">
                                                    <i className="fas fa-star text-warning" title="star" onClick={(e) => this.props.parentremovestarhandleFormSubmit(this.props.type, data.id)}
                                                    /></li>) : (
                                                    <li className="list-inline-item">
                                                        <i className="fal fa-star" title="star" onClick={(e) => this.props.parentstarhandleFormsubmit(this.props.type, data.id)} />
                                                    </li>)}

                                            <li className="list-inline-item">
                                                <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction(data.id)} ref={r => (this.popoverHide = r)} rootClose>
                                                    <i className="fal fa-info-circle" title="report" />
                                                </OverlayTrigger>
                                            </li>
                                            <li className="list-inline-item">
                                                <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction2(data.id)} ref={r => (this.popoverHide2 = r)} rootClose>
                                                    <i className="fal fa-notes-medical" title="notes" />
                                                </OverlayTrigger>
                                            </li>
                                            {data.bookmarked == true ? (
                                                <li className="list-inline-item">
                                                    <i className="fas fa-bookmark text-success" title="bookmark" onClick={(e) => this.props.parentremovebookhandleFormSubmit(this.props.type, data.id)} />
                                                </li>
                                            ) : (<li className="list-inline-item">
                                                <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverFunction3(data.id)} ref={r => (this.popoverHide3 = r)} rootClose>
                                                    <i className="fal fa-bookmark" title="bookmark" />
                                                </OverlayTrigger>
                                            </li>)}

                                        </ul>
                                    </Card.Header>
                                    <Card.Body className="pt-2">
                                        <Card.Text>{parse(this.decodefun(data.description))}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        ))}</React.Fragment>
                    ) : (<React.Fragment>
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
                    </React.Fragment>)}</React.Fragment>

            </Row>
        )
    }
}

export default ConceptCard
