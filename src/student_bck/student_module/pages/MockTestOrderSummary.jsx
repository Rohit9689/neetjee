import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar';
import Navbars from '../components/navbars/Navbars';
import PackageOrderSummary from '../components/register_steps/PackageOrderSummary';
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import * as Cookies from "es-cookie";
import { withRouter } from 'react-router-dom';
const COUPN_VALIDATION = gql`
  mutation($mobile: String,
$plan_id: Int,
$referral_code: String,
$type: String) {
    validateReferralCode(mobile: $mobile, plan_id: $plan_id, referral_code: $referral_code,type: $type){
        referral_id
        applied_amount
        status
        desc
        type
        value
    } 
  }
`;
class MockTestOrderSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            couponob: "",
            submitError4: "",
            headerBottomImg: {
                Img: require('../../images/mocktext-img.png'),
                Title: "Mock Test Order Summary",
                width: 150,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    coupnValidation = (e, data) => {
        e.preventDefault();
        if (data != "") {

            this.coupnval(
                Cookies.get("mobile"),
                parseInt(this.props.history.location.state.data.id),
                data,
                "mock_test"
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError4: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });

        } else {
            this.setState({ submitError4: "Please fill COUPON ID" });
        }


    }
    coupnval = async (mobile,
        plan_id,
        referral_code,
        type) => {
        await this.props.coupnval({
            variables: {
                mobile,
                plan_id,
                referral_code,
                type
            },
            update: (store, { data }) => {
                //console.log("coupnvaldata", data);
                if (data.validateReferralCode) {
                    //Cookies.set("coupnvalmob", data.validateReferralCode);
                    this.setState({
                        couponob: data.validateReferralCode,
                        submitError4: ""
                    });

                }
            }
        });
    };
    render() {
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">

                    <AsideNavbar />
                    <div className="content-wrapper">

                        <section className="student-package">
                            <Container>

                                <PackageOrderSummary
                                    type="mocktest"
                                    coupnValidation={this.coupnValidation}
                                    stateData={this.state}
                                    locgetData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                />


                            </Container>
                        </section>


                    </div>
                </div>
            </React.Fragment>

            // <div className="student main-wrapper">
            //     <div className="student header-area mock-tests-eries-topnavbar">
            //         <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.props.changeToggle()} />
            //     </div>
            //     <AsideNavbar />
            //     <div className="content-wrapper">
            //         <PackageOrderSummary
            //             type="mocktest"
            //             coupnValidation={this.coupnValidation}
            //             stateData={this.state}
            //             locgetData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
            //         />
            //     </div>
            // </div>

        )
    }
}

export default withRouter(
    graphql(COUPN_VALIDATION, {
        name: "coupnval"
    })(MockTestOrderSummary)); 
