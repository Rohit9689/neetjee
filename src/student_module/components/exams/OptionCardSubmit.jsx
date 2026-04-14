import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'

class OptionCardSubmit extends Component {
    render() {
        const { option, optionText, status = null } = this.props;
        const className = `${status === true && 'active'} ${status === false && 'incorrect'} single_card flex-row justify-content-between align-items-center my-3 py-3`
        return (
            <Card as={Card.Body} className={className}>
                <div className="option_name">
                    <span className="option_No">{option}</span> {optionText}
                </div>
                <div className="d-flex">
                    {status === true && (<span className="correct mr-2">Correct answer</span>)}
                    {status === false && (<span className="incorrect mr-2">Your answer</span>)}

                    <Form.Group className="mb-0" controlId={"controlId"}>
                        {
                            (status === null) && <Form.Check type="checkbox" label="" custom disable />
                        }
                        {
                            (status === true) && <Form.Check type="checkbox" label="" custom defaultChecked />
                        }
                        {
                            (status === false) && (<Form.Check type="checkbox" label="" custom defaultChecked />)
                        }

                    </Form.Group>
                </div>
            </Card>
        )
    }
}

export default OptionCardSubmit
