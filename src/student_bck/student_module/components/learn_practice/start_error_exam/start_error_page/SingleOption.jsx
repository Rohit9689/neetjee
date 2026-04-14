import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'

class SingleOption extends Component {
    render() {
        console.log("SingleOption", this.props);
        // const { question, option, optionText, controlId, status = null, onClick } = this.props;
        const { question, option, optionText, status = null, onClick = null, showMessage = false } = this.props;
        console.log("SingleOption", this.props);
        const className = `${status === true && 'active'} ${status === false && 'incorrect'} single_card flex-row justify-content-between align-items-center my-3 py-3`

        let message = '';
        message = (status === true) ? 'Correct' : (status === false) ? 'Wrong' : '';
        return (
            <Card as={Card.Body} className={className} onClick={(e) => this.props.ParenthandleInputChange(option, question)} disabled={true}>
                <div className="option_name">
                    <span className="option_No">{option}</span> {optionText}
                </div>
                <div className="option_selected">
                    {/* <i className="fal fa-circle" /> */}
                    <span className="mr-2">{showMessage === true ? message : ''}</span><i className="fal fa-circle" />
                </div>
            </Card>
        )
    }
}

export default SingleOption
