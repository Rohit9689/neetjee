import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Nav,
  Image,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import * as Cookies from "es-cookie";
import PackageOrderSummary from "../register_steps/PackageOrderSummary";
import PreloaderTwo from "../preloader/PreloaderTwo";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from "lodash.flowright";

const COUPN_VALIDATION = gql`
  mutation($mobile: String, $plan_id: Int, $referral_code: String) {
    validateReferralCode(
      mobile: $mobile
      plan_id: $plan_id
      referral_code: $referral_code
    ) {
      referral_id
      applied_amount
      status
      desc
      type
      value
    }
  }
`;

const FETCH_STUDENTPLAN = gql`
  query {
    getStudentPlans {
      id
      plan_name
      plan_title
      amount
      original_amount
      image
      additional_text
    }
  }
`;
class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upgradecomponent: 0,
      planObj: "",
      submitError4: "",
      couponob: "",
    };
  }
  upgradeFun = (planid) => {
    //let planfilterData = this.props.getStudentPlans.getStudentPlans.filter((a) => a.id == planid);
    this.setState({
      upgradecomponent: 1,
      planObj: planid,
    });
    console.log("upgradeFun", this.props);
  };
  coupnValidation = (e, data) => {
    e.preventDefault();
    if (data != "") {
      this.coupnval(
        Cookies.get("mobile"),
        parseInt(this.state.planObj.id),
        data
      ).catch((error) => {
        console.log("catch if error");
        console.log(error);
        this.setState({
          submitError4: error.graphQLErrors.map((x) => x.message),
        });
        console.error(
          "ERR =>",
          error.graphQLErrors.map((x) => x.message)
        );
      });
    } else {
      this.setState({ submitError4: "Please fill COUPON ID" });
    }
  };
  coupnval = async (mobile, plan_id, referral_code) => {
    await this.props.coupnval({
      variables: {
        mobile,
        plan_id,
        referral_code,
      },
      update: (store, { data }) => {
        console.log("coupnvaldata", data);
        if (data.validateReferralCode) {
          Cookies.set("coupnvalmob", data.validateReferralCode);
          this.setState({
            couponob: data.validateReferralCode,
            submitError4: "",
          });
        }
      },
    });
  };

  render() {
    const getStudentPlans = this.props.getStudentPlans;
    const loading6 = getStudentPlans.loading;
    const error6 = getStudentPlans.error;
    if (error6 !== undefined) {
      alert("Server Error. " + error6.message);
      return null;
    }
    if (loading6) return <PreloaderTwo />;
    console.log(
      "getStudentPlans.getStudentPlans",
      getStudentPlans.getStudentPlans,
      this.props.isStudentUserValid
    );
    let getStudentPlansData = [];
    let currentPlan = "";
    let validData = "";
    if (
      getStudentPlansData != undefined &&
      this.props.isStudentUserValid != undefined
    ) {
      console.log(
        "this.props.isStudentUserValid",
        this.props.isStudentUserValid
      );
      getStudentPlansData = getStudentPlans.getStudentPlans;
     let currentPlanobj = getStudentPlansData.find(
        (a) => a.id == this.props.isStudentUserValid.current_plan_id
      );
      if(currentPlanobj!=undefined){
        currentPlan=currentPlanobj;
      }
      validData = this.props.isStudentUserValid;
    }

    //const currentPlan = getStudentPlansData.find((a) => a.id == this.props.isStudentUserValid.current_plan_id);
    // if (getStudentPlansData != undefined) {
    //     const currentPlan = getStudentPlansData.find((a) => a.id == this.props.isStudentUserValid.current_plan_id);
    // }

    console.log("getStudentPlansData", getStudentPlansData);
    console.log("currentPlan", currentPlan);
    console.log("validData", validData.expiry_date, moment().unix());
    let expirydays = validData.expiry_date;
    let currentime = moment().unix();
    const days = Math.round(parseInt(expirydays - currentime) / (24 * 60 * 60));
    //const days = -1
    console.log("days", days);
    return (
      <React.Fragment>
        {this.state.upgradecomponent == 0 ? (
          <React.Fragment>
            <Card as={Card.Body} className="border-0 shadow-sm" style={{ background: ' #213046' }}>
              <Card.Text className="mb-2 text-white">
                CURRENT PLAN
                          </Card.Text>
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} className="py-2">
                  <div className="d-flex align-items-center mb-3">
                    <div className="text text-right">
                      <h5 className="mb-0  text-white">{currentPlan.plan_title}</h5>
                      <small className="mb-0 text-white">{currentPlan.plan_name}</small>
                    </div>
                    {currentPlan.amount > 0 ? (
                      <React.Fragment>
                        <div className="d-flex align-items-center rounded text2 bg-light py-2 px-3 ml-2">
                          {/* <h4 className="mb-0">₹{currentPlan.amount}/-</h4>
                          {currentPlan.amount != currentPlan.original_amount ? (
                            <h5 className="mt-2 text-danger">
                              <del>₹{currentPlan.original_amount}/-</del>
                            </h5>
                          ) : (
                              ""
                            )} */}
                            <div className="pre-amount">
                              {currentPlan.amount != currentPlan.original_amount ? (

                                <del className="text-danger" style={{ fontSize: 20 }}>₹{currentPlan.original_amount}/-</del>

                              ) : (
                                  ""
                                )}
                            </div>
                            <div>
                              <h3 className="card-title font-weight-normal mb-0">
                                ₹{currentPlan.amount}/-
                              </h3>
                            </div>
                        </div>
                        <div
                          className="form-text"
                          style={{ "font-size": 12, color: "#ff5200" }}
                        >
                          {currentPlan.additional_text}
                        </div>
                      </React.Fragment>
                    ) : ("")}

                  </div>


                  {Math.sign(days) ==
                    1 ? (
                      <p style={{ color: "#ff5200" }}>This Package expires in {days} Days</p>
                    )
                    : Math.sign(days) == -1 ? (
                      <p style={{ color: "#ff5200" }}>This Package expired</p>
                    )
                      : (


                        <p style={{ color: "#ff5200" }}>This Package expired</p>
                      )}



                  {currentPlan.amount == 0 ? (
                    ""
                  ) : (
                      <Button
                        onClick={() => this.upgradeFun(currentPlan)}
                        variant="success w-50 mt-3"
                      >
                        Renew
                      </Button>

                      // <React.Fragment>
                      //   {Math.sign(days) == -1 ? (<Button
                      //     onClick={() => this.upgradeFun(currentPlan)}
                      //     variant="success w-50 mt-3"
                      //   >
                      //     Renew
                      //   </Button>) : Math.sign(days) == 1 ? ("") : (<Button
                      //     onClick={() => this.upgradeFun(currentPlan)}
                      //     variant="success w-50 mt-3"
                      //   >
                      //     Renew
                      //   </Button>)}
                      // </React.Fragment>

                    )}
                </Col>
              </Row>
            </Card>
            <Card as={Card.Body} className="mt-4 border-0 shadow-sm">
              <Row>
                {getStudentPlansData.map((item) => {
                  if (item.id != validData.current_plan_id && item.amount > 0) {
                    //if (item.amount > 0) {
                    return (
                      <Col xl={4} lg={4} md={6} sm={6} xs={12} className="my-2">
                        <Card
                          as={Card.Body}
                          className="align-items-center h-100"

                        >
                          <Card.Text className="mb-3">
                            {item.plan_title}
                          </Card.Text>

                          <div className="d-flex align-items-center">
                            <div className="pre-amount">
                              {item.amount != item.original_amount ? (

                                <del className="text-danger" style={{ fontSize: 20 }}>₹{item.original_amount}/-</del>

                              ) : (
                                  ""
                                )}
                            </div>
                            <div>
                              <h3 className="card-title font-weight-normal mb-0">
                                ₹{item.amount}/-
                              </h3>
                            </div>
                          </div>
                         <div className="icon mt-3 mb-2">
                            <i className="fa-4x fad fa-backpack text-primary" />
                          </div>
                          <div className="list text-left px-xl-4 mx-4">
                            <ul className="list-unstyled mt-3 mb-4">
                              <li>{item.plan_name}</li>
                              <div
                                className="form-text"
                                style={{ "font-size": 12, color: "#ff5200" }}
                              >
                                {item.additional_text}
                              </div>
                              {/* <li><span className="font-weight-bold">One</span> Year Plan</li>
                                                                            <li><span className="font-weight-bold">XI &amp; XII</span> Class Access</li> */}
                            </ul>
                          </div>
                          {currentPlan.amount > 0 ? (
                            <React.Fragment>
                              <Button
                                onClick={() => this.upgradeFun(item)}
                                variant="primary text-uppercase stretched-link w-75"
                              >
                                Buy now
                                  </Button>
                            </React.Fragment>

                          ) : (
                              <Button
                                onClick={() => this.upgradeFun(item)}
                                variant="primary text-uppercase stretched-link w-75"
                              >
                                upgrade
                              </Button>
                            )}

                        </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Card>
          </React.Fragment>
        ) : (
            <PackageOrderSummary
              stateData={this.state}
              coupnValidation={this.coupnValidation}
            />
          )}
      </React.Fragment>
    );
  }
}

export default withRouter(
  compose(
    graphql(FETCH_STUDENTPLAN, {
      options: (props) => ({
        fetchPolicy: "cache-and-network",
      }),
      name: "getStudentPlans",
    }),
    graphql(COUPN_VALIDATION, {
      name: "coupnval",
    })
  )(Package)
);
