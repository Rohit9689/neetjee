import React, { Component } from 'react'
import { Container, Row, Col, Card, CardGroup, Nav, Button, Alert, Form, Popover, OverlayTrigger, Badge } from 'react-bootstrap'
import { components } from 'react-select'
import { Scrollbars } from 'react-custom-scrollbars'
import Select from 'react-select';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { Link } from 'react-router-dom';
import practiceQuestionListData from './QuestionListData'
import NotesPracticeQuestionsSectionSeperation from "./NotesPracticeQuestionsSectionSeperation";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../../preloader/PreloaderTwo';
import { withRouter } from "react-router-dom";

const FETCH_NOTESHORTNOTES = gql`
  query(
          $mobile: String!, $subject_id: Int, $tag_id: String, $contentType: Int) {
            getStudentNotes(mobile: $mobile, subject_id: $subject_id, tag_id:$tag_id, contentType:$contentType ){
              id
              customcontent
              content{
                  id
                  subject
                  title
                  chapter
                  description
                  video_link
                  tags
                  comments
                  file
                  question
                  option1
                  option2
                  option3
                  option4
                  explanation
                  answer
                  bookmarked
              }
              shortnotes_count
              practice_questions_count
              exam_questions_count
          }
      }
`;

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
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class NotesPracticeQuestionsSection extends Component {
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }

    render() {
        console.log("nnr", this.props.stateData);
        const getStudentNotes = this.props.getStudentNotes;
        const loading1 = getStudentNotes.loading;
        const error1 = getStudentNotes.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) return <PreloaderTwo />;
        let questionData = "";
        if (this.props.stateData.chapterId != "") {
            questionData =
                getStudentNotes.getStudentNotes[0].content.filter((a) => a.chapter == this.props.stateData.chapterId);
        }
        else {
            questionData = getStudentNotes.getStudentNotes[0].content;
        }
console.log("questionDatanote", questionData);
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
            <NotesPracticeQuestionsSectionSeperation
            getStudentNotes={getStudentNotes.getStudentNotes}
                studentGlobals={this.props.studentGlobals}
                questionData={questionData}
                getData={this.props.getData}
                contentType={this.props.contentType}
            />
        )
    }
}
export default
withRouter(compose(graphql(FETCH_NOTESHORTNOTES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    subject_id: parseInt(props.stateData.subjectId),
                    tag_id: props.stateData.tags,
                    contentType: parseInt(props.contentType)
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentNotes"
        })
    )(NotesPracticeQuestionsSection));
