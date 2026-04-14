import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Form, Container } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import CreateMultiSelect from '../../../../neetjee_guru/components/selectdropdown/CreateMultiSelect';

// Subjects
const Subjects = [
    { value: 1, label: 'Subjects-1' },
    { value: 2, label: 'Subjects-2' },
    { value: 3, label: 'Subjects-3' },
    { value: 4, label: 'Subjects-4' }
];
const Chapters = [
    { value: 1, label: 'Chapters-1' },
    { value: 2, label: 'Chapters-2' },
    { value: 3, label: 'Chapters-3' },
    { value: 4, label: 'Chapters-4' }
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

class BookmarkHeaderSection extends Component {
    render() {
        return (
            <div className="shadow-sm bookmark-header">
                <Container fluid={true}>
                    <Form className="top_header">
                        <Row>
                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formSubjects">
                                    <Form.Label column sm="2">
                                        Subjects
                                    </Form.Label>
                                    <Col sm="10">
                                        <SelectDropDown options={Subjects} placeholderName={'Subjects'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formChapters">
                                    <Form.Label column sm="2">
                                        Chapters
                                    </Form.Label>
                                    <Col sm="10">
                                        <SelectDropDown options={Chapters} placeholderName={'Chapters'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formTags">
                                    <Form.Label column sm="2">
                                        Tags
                                    </Form.Label>
                                    <Col sm="10">
                                        <CreateMultiSelect />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default BookmarkHeaderSection
