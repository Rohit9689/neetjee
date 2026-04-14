import React, { Component } from 'react'
import { components } from 'react-select'
import { Container, Row, Col, Form, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';

class MultiCustomRevisionMaterialHeader extends Component {
    contentTypeFunction(data) {

        let subjectArray = [];
        let neObj = {
            value: "0",
            label: "Select"
        }
        data.subjects_counts.map((item) => {
            let neObj1 = {
                value: item.id,
                label: item.subject
            }
            subjectArray.push(neObj1);
        });
        subjectArray.unshift(neObj);
        return subjectArray;
    }
    render() {
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" className="css-6q0nyr-Svg rounded-circle" style={{ background: 'hsla(0, 0%, 100%, 0.42)' }}><path fill="#fff" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };

        return (
            <div className="custom-revision-material-header">
                <Container>
                    <Row>
                        <Col xl={8} lg={8} md={12}>
                            <Form className="top_header">
                                <Row>
                                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formContent">
                                            <SelectDropDown
                                                stateData={this.props.stateData.contentValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="contentsearch"
                                                options={this.contentTypeFunction()}
                                                placeholderName={'Class'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        {/* <Col xl={4} lg={4} md={12}>
                            <div className="d-flex align-item-center justify-content-xl-end justify-content-lg-end">
                                <div className="icon">
                                    <Image src={imageData.image} alt="material-img" width="30" />
                                </div>
                                <h4 className="ml-2 text-white">{imageData.customcontent}</h4>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MultiCustomRevisionMaterialHeader
