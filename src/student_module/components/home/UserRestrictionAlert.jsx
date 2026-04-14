import React, { Component } from 'react'
import { Modal, Card, Button } from "react-bootstrap";
import "./_subscribe-plans.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";

const FETCH_PLANS = gql` 
query($exam_id: String) {
    getStudentPlans(exam_id: $exam_id){
        id
        plan_name
        plan_title
        amount
        original_amount
        image
        additional_text
        plan_features
        referral_text
        referral_subtext
    }
}

`;
class UserRestrictionAlert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subscribeTrending: false,
        }
    }
    paymentFun = (data) => {

        //data= {...data, exam_name:this.props.exam_name}
        // this.props.history.push({
        //     pathname: "/student/subscribe-plans-order-summary",
        //     state: {
        //         data: data

        //     }
        // })

        this.props.history.push({
            pathname: "/student/package",
            state: {
                type: "subscribe",
                oneweekplan:this.props.oneweekplan

            }
        })

    }
    render() {
        const getStudentPlans = this.props.getStudentPlans;
        const loading1 = getStudentPlans.loading;
        const error1 = getStudentPlans.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

       const getPlansdata = getStudentPlans.getStudentPlans;

        return (
            <Modal {...this.props}
                size="md" aria-labelledby="example-modal-sizes-title-lg" className="scribePlan-modal">
                <Button variant="link p-0 close" onClick={() => { this.props.onHide() }}> <i className="fas fa-times" /> </Button>

                <Modal.Body>
                    <div className="text-center mb-4">
                        <h4 className="text-uppercase text-blue font-weight-normal mb-1">Subscribe</h4>
                        <h6 className="text-uppercase text-blue font-weight-normal">Unlock &amp; Get Ready for exam</h6>
                    </div>
                    {loading1 ? (
                        <Card>
                            <div className="d-flex justify-content-center">
                                <div class="spinner-border text-primary"></div>
                            </div>
                        </Card>
                    ) : (<React.Fragment>
                        {
                            getPlansdata.map((item, index) => {
                                let colorname = "";
                                if (item.plan_name == "3 MONTHS") {
                                    colorname = "three-months";
                                }
                                else if (item.plan_name == "6 MONTHS") {
                                    colorname = "six-months";
                                }
                                else if (item.plan_name == "1 YEAR") {
                                    colorname = "one-year";
                                }
                                else if (item.plan_name == "12 MONTHS") {
                                    colorname = "one-year";
                                }
                                else if (item.plan_name == "1 WEEK") {
                                    colorname = "one-week";
                                }
                                else {
                                    colorname = "one-week";
                                }
                                let features = item.plan_features.split("#");

                                if(this.props.oneweekplan==false){
                                    if(item.plan_name != "FREE TRIAL" && item.plan_name != "1 WEEK"){
                                        return (
                                            <Card style={{ cursor: "pointer" }} onClick={() => this.paymentFun(item)} key={index} as={Card.Body} className={`subscribe-plans pl-4 py-2 ${colorname}`}>
                                                {item.plan_name == "3 MONTHS"?(<div className="subscribe-lable text-uppercase">Trending</div>):("")}
                                                
                                                <div className="subscribe-content d-flex justify-content-between align-items-start">
                                                    <div className="content-left">
                                                        <p className="text-muted text-capitalize">{item.plan_title}</p>
                                                        <h6 className="text-dark text-capitalize mb-0">{item.plan_name}</h6>
                                                        <small className="text-muted plan-price">{item.amount} only</small>
                                                        {item.plan_features != "" ? (
                                                            <React.Fragment>
                                                                {features.map((imap, index) => {
                                                                    if (index == 0) {
                                                                        return (<p className="text-uppercase plan-description"><i className="fas fa-circle" /> {imap}</p>)
                                                                    }
        
                                                                })}
                                                            </React.Fragment>
        
                                                        ) : ("")}
        
                                                    </div>
                                                    <div className="content-right">
                                                        <div className="price-block shadow-sm p-2">
                                                            <h6 className="mb-0"><i className="fas fa-rupee-sign text-white"></i> </h6>
                                                            <div className="text-right">
                                                                <div className="plan-price text-white">{item.amount}</div>
                                                                <small className="text-white-50">only</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    }
                                }
                                else{
                                    if(item.plan_name != "FREE TRIAL"){
                                        return (
                                            <Card style={{ cursor: "pointer" }} onClick={() => this.paymentFun(item)} key={index} as={Card.Body} className={`subscribe-plans pl-4 py-2 ${colorname}`}>
                                                {item.plan_name == "3 MONTHS"?(<div className="subscribe-lable text-uppercase">Trending</div>):("")}
                                                
                                                <div className="subscribe-content d-flex justify-content-between align-items-start">
                                                    <div className="content-left">
                                                        <p className="text-muted text-capitalize">{item.plan_title}</p>
                                                        <h6 className="text-dark text-capitalize mb-0">{item.plan_name}</h6>
                                                        <small className="text-muted plan-price">{item.amount} only</small>
                                                        {item.plan_features != "" ? (
                                                            <React.Fragment>
                                                                {features.map((imap, index) => {
                                                                    if (index == 0) {
                                                                        return (<p className="text-uppercase plan-description"><i className="fas fa-circle" /> {imap}</p>)
                                                                    }
        
                                                                })}
                                                            </React.Fragment>
        
                                                        ) : ("")}
        
                                                    </div>
                                                    <div className="content-right">
                                                        <div className="price-block shadow-sm p-2">
                                                            <h6 className="mb-0"><i className="fas fa-rupee-sign text-white"></i> </h6>
                                                            <div className="text-right">
                                                                <div className="plan-price text-white">{item.amount}</div>
                                                                <small className="text-white-50">only</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    }
                                }

                                
                                
                            })
                        }
                    </React.Fragment>)}
                </Modal.Body>
            </Modal>
        )
    }
}
export default withRouter(compose(
    graphql(FETCH_PLANS,
        {
            options: props => ({
                variables: {
                    exam_id: Cookies.get("examid")
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "getStudentPlans"
        })
)(UserRestrictionAlert));
