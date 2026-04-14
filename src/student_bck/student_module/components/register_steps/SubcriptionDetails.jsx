import React, { Component } from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';

class SubcriptionDetails extends Component {
    render() {
        if (this.props.currentStep !== 3) {
            return null;
        }

        return (
            <React.Fragment>
                <li className="d-flex align-items-center justify-content-between">
                    <p className="text-muted"> Subscription</p>
                    <p className="text-muted">₹{this.props.stateData.planData.amount}/-</p>
                </li>
                {/* <li className="d-flex align-items-center justify-content-between">
                                <p className="text-muted"> CGST + SGST ( 5% + 5%)</p>
                                <p className="text-muted">₹1000/-</p>
                            </li> */}
                {/* <li className="d-flex align-items-center justify-content-between">
                                <p className="text-dark"> Bill Total</p>
                                <p className="text-dark">₹{validateReferralCodeData.}/-</p>
                            </li> */}
                <li className="d-flex align-items-center justify-content-between">
                    <p className="text-warning">Coupon</p>
                    <p className="text-warning">₹{validateReferralCodeData.applied_amount}/-</p>
                </li>
                <li className="d-flex align-items-center justify-content-between">
                    <p className="text-dark">Grand Total</p>
                    <p className="text-dark">₹{parseInt(this.props.stateData.planData.amount) - parseInt(validateReferralCodeData.applied_amount)}/-</p>
                </li>
            </React.Fragment>
        )
    }
}
export default SubcriptionDetails


