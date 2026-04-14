import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import BreadcrumbHeading from '../breadcrumbs/BreadcrumbHeading'
import SelectDropDown from '../selectdropdown/SelectDropDown'

class SettingSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breadcrumbsData: {
                Title: 'Settings'
            }
        }
    }

    render() {
        // Locations
        const Locations = [
            { value: 1, label: 'Telangana' },
            { value: 2, label: 'Andhra Pradesh' },
            { value: 3, label: 'Chennai' }
        ];

        // Regions
        const Regions = [
            { value: 1, label: 'Regions-1' },
            { value: 2, label: 'Regions-2' },
            { value: 3, label: 'Regions-3' },
            { value: 4, label: 'Regions-4' }
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


        return (
            <section className="settings">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Card as={Card.Body} className="border-0 shadow-sm">
                            <Form>
                                <Row>
                                    <Form.Group as={Col} lg={4} md={12} sm={12} controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Branch Name</Form.Label>
                                        <SelectDropDown options={Locations} placeholderName={'Locations'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={4} md={12} sm={12} controlId="SelectPrinciple">
                                        <Form.Label className="text-uppercase">Chairmen</Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={4} md={12} sm={12} controlId="SelectContact">
                                        <Form.Label className="text-uppercase">Contact No</Form.Label>
                                        <Form.Control type="phone" placeholder="Mobile No" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} lg={8} md={12} sm={12} controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Complete Address</Form.Label>
                                        <Form.Control type="text" placeholder="Address" />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={4} md={12} sm={12} controlId="SelectRegion">
                                        <Form.Label className="text-uppercase">Region</Form.Label>
                                        <SelectDropDown options={Regions} placeholderName={'Names'} dropdownIndicator={{ DropdownIndicator }} />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} className="text-right mt-5">
                        <Button className="btn btn-success text-uppercase px-5">Save</Button>
                    </Col>
                </Row>
            </section>
        )
    }
}

export default SettingSection
