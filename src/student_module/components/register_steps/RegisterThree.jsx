import React, { Component } from 'react'
import { components } from 'react-select'
import { Form } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown'

// class
const Class = [
    { value: 1, label: 'Telangana' },
    { value: 2, label: 'Andhra Pradesh' },
    { value: 3, label: 'Chennai' }
];
// Exam
const Exam = [
    { value: 1, label: 'NEET' },
    { value: 2, label: 'JEE' }
];
// targetYear
const targetYear = [
    { value: 1, label: '2020' },
    { value: 2, label: '2021' },
    { value: 3, label: '2022' },
    { value: 4, label: '2023' },
    { value: 5, label: '2024' },
    { value: 6, label: '2025' }
];

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <i className="fal fa-chevron-down" />
            </components.DropdownIndicator>
        )
    );
};

class RegisterOne extends Component {
    render() {
        if (this.props.currentStep !== 3) {
            return null
        }
        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3">Academic <small className="text-muted">information</small></h5>
                <Form>
                    <Form.Group controlId="formBasicMobile">
                        <SelectDropDown options={Class} placeholderName={'Class'} dropdownIndicator={{ DropdownIndicator }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicMobile">
                        <SelectDropDown options={Exam} placeholderName={'Exam'} dropdownIndicator={{ DropdownIndicator }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicMobile">
                        <SelectDropDown options={targetYear} placeholderName={'Target Year'} dropdownIndicator={{ DropdownIndicator }} />
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}

export default RegisterOne
