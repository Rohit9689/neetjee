import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { components } from 'react-select'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';

class AnalysisFilter extends Component {

    render() {
        console.log("AnalysisFilter", this.props.stateData.exam_typevalue);
        // Exams
        const Exams = [
            { value: "2", label: 'ALL' },
            { value: "0", label: 'Practise' },
            { value: "1", label: 'Exam' }
        ];
        // classes
        const classes = [
            { value: "0", label: 'ALL' },
            { value: "1", label: 'Class-XI' },
            { value: "2", label: 'Class-XII' }
        ];

        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <i className="fal fa-angle-down" />
                    </components.DropdownIndicator>
                )
            );
        };
        return (
            <Row className="filter">
                <Col xl={4} lg={2} md={2} sm={12}>
                    <Button
                        onClick={this.props.defaultActiveKeyFun}
                        className="btn btn-white text-capitalize shadow-sm"><i className="mr-2 fal fa-long-arrow-left" /> Back</Button>
                </Col>
                <Col xl={8} lg={10} md={10} sm={12}>
                    <Form className="d-flex justify-content-end" as={Row}>
                        <Col xl={4} lg={4} md={4} sm={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Exam</Form.Label>
                                <Col sm="10">
                                    <SelectDropDown
                                        stateData={this.props.stateData.exam_typevalue}
                                        handleChange={this.props.selecthandleInputChange}
                                        name="exam_type"
                                        options={Exams}
                                        placeholderName={'Exams'}
                                        dropdownIndicator={{ DropdownIndicator }}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Class</Form.Label>
                                <Col sm="10">
                                    <SelectDropDown
                                        stateData={this.props.stateData.class_idvalue}
                                        handleChange={this.props.selecthandleInputChange}
                                        name="class_id"
                                        options={classes}
                                        placeholderName={'All Class'}
                                        dropdownIndicator={{ DropdownIndicator }} />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default AnalysisFilter
