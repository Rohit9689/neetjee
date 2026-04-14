import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'

class OptionCard extends Component {
    render() {
        console.log("this.props", this.props);
        const { option, optionText, controlId, status = null } = this.props;
        const className = `${status === true && 'active'} ${status === false && 'incorrect'} single_card flex-row justify-content-between align-items-center my-3 py-3`
        return (
            <Card as={Card.Body} className={className}>

                <div className="option_name">
                    <span className="option_No">{option}</span>{optionText}
                </div>
                <div className="d-flex">
                    <Form.Group className="mb-0" controlId={controlId}>
                        <Form.Check
                            disable
                            type="radio"
                            name="formChechboxs"
                            label=""
                            custom
                            onClick={(e) => this.props.ParenthandleInputChange(option, this.props.question)} />
                    </Form.Group>
                </div>
            </Card>
        )
    }
}

export default OptionCard
