import React, { Component } from 'react'
import { Row, Col, Card, Image, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

class StepTwo extends Component {
    constructor(props) {
        super(props)
        let getStudentPlansData = [];
        console.log("props.locationData1", props.locationData);
        if (props.locationData != "") {
            if (props.locationData.type == "paymentverify") {
                getStudentPlansData = props.getStudentPlans.map((item) => {
                    if (item.id == props.locationData.planid) {
                        return { ...item, active: "active" }
                    }
                    else {
                        return { ...item, active: "" }
                    }

                });
            }
            else {
                getStudentPlansData = props.getStudentPlans.map((item) => {
                    console.log("dev5", item.id);
                    if (item.id == "5") {
                        return { ...item, active: "active" }
                    }
                    else {
                        return { ...item, active: "" }
                    }

                });
            }


        }
        else {
            console.log("dev5");
            getStudentPlansData = props.getStudentPlans.map((item) => {
                console.log("dev5", item.id);
                if (item.id == "5") {
                    return { ...item, active: "active" }
                }
                else {
                    return { ...item, active: "" }
                }

            });
        }


        console.log("getStudentPlansData", getStudentPlansData);
        this.state = {
            getStudentPlansData: getStudentPlansData,
            submitError: "",
            freetrailStatus: "0"
        }
    }
    plansFun = (item) => {
        console.log("plansFun");
        const getStudentPlansData = this.state.getStudentPlansData.map((data) => {
            if (data.id == item.id) {
                console.log("data.id == item.id", data.id, item.id);
                return { ...data, active: "active" }
            }
            return { ...data, active: "" }

        });
        this.setState({
            getStudentPlansData: getStudentPlansData
        });
        this.props.studentPlansFun(item);

        // if (item.id == "3") {

        //     this.freetrail(
        //         this.props.stateData.mobile,
        //         item.id,
        //         "0"
        //     ).catch(error => {
        //         console.log("catch if error");
        //         console.log(error);
        //         this.setState({
        //             submitError: error.graphQLErrors.map(x => x.message)
        //         });
        //         console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        //     });
        // }


    }
    // freetrail = async (mobile, plan_id, referral_id) => {
    //     await this.props.freetrail({
    //         variables: {
    //             mobile, plan_id, referral_id
    //         },
    //         update: (store, { data }) => {
    //             if (data.setFreeTrailPackage) {
    //                 this.setState({
    //                     freetrailStatus: "1"
    //                 });
    //                 this.props.history.push("http://34.74.241.2:3004/student/login");
    //             }


    //             setTimeout(() => { this.SetpageLoad() }, 1500);
    //         }
    //     });
    // };
    render() {
        console.log("renderstate", this.state);
        if (this.props.currentStep !== 2) {
            return null;
        }
        const activeDta = this.state.getStudentPlansData.filter((a) => a.active == "active");
        let active = "";
        if (activeDta.length > 0) {
            active = "active"
        }

        return (

            <Row className="stepTwo">
                <Col xl={8} lg={8} md={12} sm={12} className="mt-2">
                    <Card as={Card.Body} className="stepFormOne border-0 px-4">
                        <div className="title border-bottom pb-3 mb-5">
                            <h5>Select Plan</h5>
                            {/* <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                            <div className="form-text text-danger">
                                {this.state.freetrailStatus == "1" ? ("Now you can login ELAPP") : (this.state.submitError)}
                            </div>
                        </div>
                        <Row>
                            {
                                this.state.getStudentPlansData.map((item) => {
                                    // const { id, itemStatus, plan, planPackage, packageCost, iconName } = item;
                                    return (
                                        <Col key={item.id} xl={6} lg={6} md={6} sm={6} xs={12} className="single-card">
                                            <Card className={`shadow-none h-100 text-decoration-none text-dark ${item.active}`} as={Link}
                                                to="#"
                                                onClick={() => this.plansFun(item)}
                                            >
                                                <Card.Body>
                                                    <i className="fas fa-check-circle" />
                                                    <div className="plan-details">
                                                        <p className="text-muted mb-3">{item.plan_title}</p>
                                                        <h6 className="mb-3">{item.plan_name}</h6>
                                                        <h4>Rs {item.amount}/-</h4>
                                                        {item.amount != item.original_amount ? (<h5 className="mt-2 text-danger"><del>₹{item.original_amount}/-</del></h5>) : ("")}
                                                    </div>
                                                    <div className="form-text" style={{ "font-size": 12, color: "#ff5200" }}>
                                                        {item.additional_text}
                                                    </div>
                                                    {/* <div className="icon">
                                                        <Image src={`${item.image}`} width="50" alt="icon-img" />
                                                    </div> */}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Card>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} className="my-2">
                    <Nav className="flex-column aside-status">
                        <Nav.Item>
                            <Nav.Link className={active} to="#"><i className="mr-3 fas fa-check-circle" />Select Plan</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        )
    }
}


export default StepTwo;
