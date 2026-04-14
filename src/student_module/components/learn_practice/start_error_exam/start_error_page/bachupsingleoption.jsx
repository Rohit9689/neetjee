import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

class SingleOption extends Component {
    render() {
        const { option, optionText, status = null, onClick = null, showMessage = false } = this.props;
        const className = `${status === true && 'active'} ${status === false && 'incorrect'} single_card flex-row justify-content-between align-items-center my-3 py-3`
        let message = '';

        // if (status === true) {
        //     message = 'Correct';
        // } else if (status == false) {
        //     message = 'Wrong';
        // } else {
        //     message = '';
        // }

        message = (status === true) ? 'Correct' : (status === false) ? 'Wrong' : '';

        return (
            <Card as={Card.Body} className={className} onClick={onClick} disabled={true}>
                <div className="option_name">
                    <span className="option_No">{option}</span> {optionText}
                </div>
                <div className="option_selected">
                    <span className="mr-2">{showMessage === true ? message : ''}</span><i className="fal fa-circle" />
                </div>
            </Card>
        )
    }
}

export default SingleOption
