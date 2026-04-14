import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import './_student-package.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
import moment from "moment";
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
        coupon_display
    }
}

`;
class StudentPackageSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            packageCoupons: false
        }
    }
    paymentFun = (data) => {

        //data= {...data, exam_name:this.props.exam_name}
        this.props.history.push({
            pathname: "/student/subscribe-plans-order-summary",
            state: {
                data: data

            }
        })

    }

    render() {
        console.log("type", this.props.type);
        const StudentPackage = [
            {
                id: 1,
                planNo: 1,
                planDays: 'week',
                ELAPPPlan: 'Micro',
                planName: 'one-week',
                innerList: [
                    {
                        id: 1,
                        planList: 'Ut enim ad minim veniam'
                    },
                    {
                        id: 2,
                        planList: 'Quis nostrud exercitation ullamco laboris'
                    },
                    {
                        id: 3,
                        planList: 'Nisiut aliquip ex ea commodo consequat quis nostrud laboris'
                    },
                    {
                        id: 4,
                        planList: 'Excepteur sint occaecat cupidatat non proident'
                    }
                ],
                planPrice: '99',
                planUpdate: 'Current Plan',
                packageCoupons: false
            },
            {
                id: 2,
                planNo: 3,
                planDays: 'Months',
                ELAPPPlan: 'Mini',
                planName: 'three-months',
                innerList: [
                    {
                        id: 1,
                        planList: 'Ut enim ad minim veniam'
                    },
                    {
                        id: 2,
                        planList: 'Quis nostrud exercitation ullamco laboris'
                    },
                    {
                        id: 3,
                        planList: 'Nisiut aliquip ex ea commodo consequat quis nostrud laboris'
                    },
                    {
                        id: 4,
                        planList: 'Excepteur sint occaecat cupidatat non proident'
                    }
                ],
                planPrice: '1999',
                planUpdate: 'Upgrade Plan',
                packageCoupons: false
            },
            {
                id: 3,
                planNo: 6,
                planDays: 'Months',
                ELAPPPlan: 'Max',
                planName: 'six-months',
                innerList: [
                    {
                        id: 1,
                        planList: 'Ut enim ad minim veniam'
                    },
                    {
                        id: 2,
                        planList: 'Quis nostrud exercitation ullamco laboris'
                    },
                    {
                        id: 3,
                        planList: 'Nisiut aliquip ex ea commodo consequat quis nostrud laboris'
                    },
                    {
                        id: 4,
                        planList: 'Excepteur sint occaecat cupidatat non proident'
                    }
                ],
                planPrice: '3499',
                planUpdate: 'Upgrade Plan',
                packageCoupons: true
            },
            {
                id: 4,
                planNo: 1,
                planDays: 'Year',
                ELAPPPlan: 'Extra Max',
                planName: 'one-year',
                innerList: [
                    {
                        id: 1,
                        planList: 'Ut enim ad minim veniam'
                    },
                    {
                        id: 2,
                        planList: 'Quis nostrud exercitation ullamco laboris'
                    },
                    {
                        id: 3,
                        planList: 'Nisiut aliquip ex ea commodo consequat quis nostrud laboris'
                    },
                    {
                        id: 4,
                        planList: 'Excepteur sint occaecat cupidatat non proident'
                    }
                ],
                planPrice: '4999',
                planUpdate: 'Upgrade Plan',
                packageCoupons: true
            }
        ]

        const getStudentPlans = this.props.getStudentPlans;
        const loading1 = getStudentPlans.loading;
        const error1 = getStudentPlans.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (<PreloaderTwo />);
        }
        else {
            const getPlansdata = getStudentPlans.getStudentPlans.map((item) => {
                console.log("getPlansdata", localStorage.getItem("packageplan"));
                if (localStorage.getItem("packageplan") == "home" || localStorage.getItem("packageplan") == "mocktest" || localStorage.getItem("packageplan") == "null" || localStorage.getItem("packageplan") == "") {
                    console.log("getPlansdatai", localStorage.getItem("packageplan"));
                    if (item.plan_name == "12 MONTHS") {
                        return { ...item, active: "active" }
                    }
                    else {
                        return { ...item, active: "" }
                    }
                }
                else {
                    console.log("getPlansdatae", localStorage.getItem("packageplan"));

                    if (item.id == localStorage.getItem("packageplan")) {
                        return { ...item, active: "active" }
                    }
                    else {
                        return { ...item, active: "" }
                    }
                }


            });



            let expirydays = this.props.isStudentUserValid.expiry_date;
            let currentime = moment().unix();
            const days = Math.round(parseInt(expirydays - currentime) / (24 * 60 * 60));
            return (
                <section className="student-package">
                    <div className="breadcrumb-content pt-4 pb-2">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={6} lg={6} md={8} sm={12} className="mx-auto">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Image src={require('../../../images/subscribe_img.png')} className="mx-2" alt="img" fluid />
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <h5 className="text-white">Subscription Plans</h5>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="student-package-content pt-5">
                        <Container>
                            {this.props.isStudentUserValid.current_plan_id != 5 ? (
                                <Row>

                                    {
                                        getPlansdata.map((item, index) => {
                                            // const { planNo, planDays, ELAPPPlan, planName, innerList, planPrice, planUpdate, packageCoupons } = item;
                                            let colorname = "";
                                            if (item.plan_name == "3 MONTHS") {
                                                colorname = "three-months";
                                            }
                                            else if (item.plan_name == "6 MONTHS") {
                                                colorname = "six-months";
                                            }
                                            else if (item.plan_name == "1 WEEK") {
                                                colorname = "one-week";
                                            }
                                            else if (item.plan_name == "1 YEAR") {
                                                colorname = "one-year";
                                            }
                                            else if (item.plan_name == "FREE TRIAL") {
                                                colorname = "free-trail";
                                            }
                                            else if (item.plan_name == "12 MONTHS") {
                                                colorname = "one-year";
                                            }
                                            else {
                                                colorname = "one-week";
                                            }
                                            let features = item.plan_features.split("#");

                                            let pname = item.plan_name.split(" ");
                                            console.log("features.length", features, item);

                                            if (item.id != "5") {
                                                return (
                                                    <Col xl={3} lg={6} md={6} sm={12} key={index} className="mb-5">
                                                        <Card className={`single-plan border-0 p-1 h-100 ${colorname} ${item.active}`}>
                                                            <Card.Body className="bg-white">
                                                                <div className="planTitle text-uppercase text-center text-white rounded px-3 py-2">{item.plan_title}</div>
                                                                <div className="plan-subtitles text-center mt-3">
                                                                    <h2 className="mb-0 font-weight-bold">{pname[0]}</h2>
                                                                    <h5>{pname[1]}</h5>
                                                                </div>
                                                                {item.plan_features != "" ? (
                                                                    <ul className="list-unstyled mb-3">
                                                                        {
                                                                            features.map((item1, index) => {
                                                                                return (
                                                                                    <li key={index} className="d-flex align-items-start">
                                                                                        <i className="pt-1 far fa-check text-success"></i>
                                                                                        <div className="ml-2">{item1}</div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                ) : ("")}

                                                                <div className="text-center">
                                                                    <h3 className="sub-title">Rs. {item.amount}</h3>
                                                                    {this.props.isStudentUserValid.current_plan_id == item.id ? (
                                                                        <React.Fragment>
                                                                            {currentime > this.props.isStudentUserValid.expiry_date ? (
                                                                                <Button onClick={() => this.paymentFun(item)} >Subscribe Now</Button>
                                                                            ) : (
                                                                                <Button onClick={() => this.paymentFun(item)} >Current Plan</Button>
                                                                            )}
                                                                            {Math.sign(days) ==
                                                                                1 ? (
                                                                                <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expires in {days} Days</p>
                                                                            )
                                                                                : Math.sign(days) == -1 ? (
                                                                                    <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expired</p>
                                                                                )
                                                                                    : (


                                                                                        <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expired</p>
                                                                                    )}
                                                                        </React.Fragment>

                                                                    )
                                                                        : (<Button onClick={() => this.paymentFun(item)}>Subscribe Now</Button>)}




                                                                </div>

                                                                <div className="coupons mt-2 text-center">
                                                                    {item.referral_text != "" ? (<p>Use Coupons Code <strong>{item.referral_text}</strong></p>) : ("")}
                                                                    {item.referral_subtext != "" ? (<h5 className="text-danger">{item.referral_subtext}</h5>) : ("")}

                                                                </div>

                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )

                                            }

                                        })
                                    }
                                </Row>
                            ) : (
                                <Row>

                                    {
                                        getPlansdata.map((item, index) => {
                                            // const { planNo, planDays, ELAPPPlan, planName, innerList, planPrice, planUpdate, packageCoupons } = item;
                                            let colorname = "";
                                            if (item.plan_name == "3 MONTHS") {
                                                colorname = "three-months";
                                            }
                                            else if (item.plan_name == "6 MONTHS") {
                                                colorname = "six-months";
                                            }
                                            else if (item.plan_name == "1 WEEK") {
                                                colorname = "one-week";
                                            }
                                            else if (item.plan_name == "1 YEAR") {
                                                colorname = "one-year";
                                            }
                                            else if (item.plan_name == "FREE TRIAL") {
                                                colorname = "free-trail";
                                            }
                                            else if (item.plan_name == "12 MONTHS") {
                                                colorname = "one-year";
                                            }
                                            else {
                                                colorname = "one-week";
                                            }
                                            let features = item.plan_features.split("#");

                                            let pname = item.plan_name.split(" ");


                                            return (
                                                <Col xl={3} lg={6} md={6} sm={12} key={index} className="mb-5">
                                                    <Card className={`single-plan border-0 p-1 h-100 ${colorname} ${item.active}`}>
                                                        <Card.Body className="bg-white">
                                                            <div className="planTitle text-uppercase text-center text-white rounded px-3 py-2">{item.plan_title}</div>
                                                            <div className="plan-subtitles text-center mt-3">
                                                                <h2 className="mb-0 font-weight-bold">{pname[0]}</h2>
                                                                <h5>{pname[1]}</h5>
                                                            </div>
                                                            {item.plan_features != "" ? (
                                                                <ul className="list-unstyled mb-3">
                                                                    {
                                                                        features.map((item1, index) => {
                                                                            return (
                                                                                <li key={index} className="d-flex align-items-start">
                                                                                    <i className="pt-1 far fa-check text-success"></i>
                                                                                    <div className="ml-2">{item1}</div>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            ) : ("")}

                                                            <div className="text-center">

                                                                {item.id != "5" ? (<h3 className="sub-title">Rs. {item.amount}</h3>) : ("")}

                                                                {item.id == "5" ? (
                                                                    <React.Fragment>
                                                                        {/* {currentime > this.props.isStudentUserValid.expiry_date ? (
                                                                                <Button >Subscribe Now</Button>
                                                                            ) : (
                                                                                    <Button>Current Plan</Button>
                                                                                )} */}
                                                                        <Button>Current Plan</Button>
                                                                        {Math.sign(days) ==
                                                                            1 ? (
                                                                            <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expires in {days} Days</p>
                                                                        )
                                                                            : Math.sign(days) == -1 ? (
                                                                                <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expired</p>
                                                                            )
                                                                                : (


                                                                                    <p className="mt-1" style={{ color: "#ff5200", fontWeight: "bold", fontSize: 13 }}>This Package expired</p>
                                                                                )}
                                                                    </React.Fragment>

                                                                ) : (<Button onClick={() => this.paymentFun(item)} >Upgrade Now</Button>)}
                                                            </div>

                                                            <div className="coupons mt-2 text-center">
                                                                {item.referral_text != "" ? (<p>Use Coupons Code <strong>{item.referral_text}</strong></p>) : ("")}
                                                                {item.referral_subtext != "" ? (<h5 className="text-danger">{item.referral_subtext}</h5>) : ("")}

                                                            </div>

                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )



                                        })
                                    }
                                </Row>
                            )}

                        </Container>
                    </div>
                </section>
            )
        }

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
)(StudentPackageSection));