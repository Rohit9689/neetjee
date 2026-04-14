import React, { Component } from 'react'
import { Row, Col, Card, Image } from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
const FREETRAIL_PLAN = gql`
  mutation($mobile: String,$plan_id: String,$referral_id: String) {
    setFreeTrailPackage(mobile: $mobile,plan_id: $plan_id,referral_id: $referral_id) 
  }
`;
const LOGIN_USER = gql`
  mutation($username: String!, $token: String) {
    studentLogin(username: $username, token: $token) {
        token
        refreshToken
        user{
            name
            email
            mobile
            valid
            class_id
            exam_id
            current_plan_id
            mobile_verified
            target_year
            videos
            branch_name
            profile_pic
            userlevel
            subjects{
                id
                subject
                practice_percentage
                studentChapters{
                id
                chapter
                topics{
                    id
                    topic
                    practice_percentage
                    total_questions
                }
                class
                weightage
                total_questions
                attempted_questions
                error_questions
                enabled
                practice_unanswered
                practice_wrong_answered
                exam_unanswered
                exam_wrong_answered

            }
                last_attempted_chapter
                last_timestamp
                accuracy
            }
            studentGlobals{
                exams{
                    id
                    exam
                }
                classes {
                    id
                    class
                }
                questionTypes{
                    id
                    questiontype
                }
                complexity{
                    id
                    complexity
                }
                questionTheory{
                    id
                    question_theory
                }
                previousSets{
                    id
                    year
                    qset
                    exam
                    pexamtype
                    enabled
                }
                previousYears{
                    year
                }
                exam_time
            }
        }
    }
  }
`;
class StepFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: 0
        }
    }
    handleFormSubmit = e => {
        //e.preventDefault();

        console.log("sreeform", this.props.stateData.mobile, Cookies.get("successtoken"), Cookies.get("studenttoken"));
        // console.log(this.state);
        let token = "";
        if (Cookies.get("successtoken") != "") {
            console.log("sss");
            token = Cookies.get("successtoken");
        }
        else if (Cookies.get("studenttoken") != "") {
            console.log("ttt");
            token = Cookies.get("studenttoken");
        }
        console.log("token", this.props.stateData.mobile, token);
        if (this.props.stateData.mobile && token) {
            this.login(this.props.stateData.mobile, token).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message), loader: 0
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed", loader: 0 });
        }
    };
    login = async (username, token) => {
        await this.props.login({
            variables: {
                username,
                token
            },
            update: (store, { data }) => {
                console.log("data.studentLogin.user.branch_name", data.studentLogin.user);
                Cookies.set("studenttoken", data.studentLogin.token);
                Cookies.set("studentrefreshtoken", data.studentLogin.refreshToken);
                Cookies.set("studentusername", data.studentLogin.user.name);
                Cookies.set("studentemail", data.studentLogin.user.email);

                Cookies.set("mobile", data.studentLogin.user.mobile);
                Cookies.set("classid", data.studentLogin.user.class_id);
                Cookies.set("examid", data.studentLogin.user.exam_id);
                Cookies.set("mobileverified", data.studentLogin.user.mobile_verified);
                Cookies.set("targetyear", data.studentLogin.user.target_year);
                Cookies.set("videos", data.studentLogin.user.videos);
                Cookies.set("branch_name", data.studentLogin.user.branch_name);
                Cookies.set("role", "student");
                Cookies.set("profile_pic", data.studentLogin.user.profile_pic);
                Cookies.set("student_userlevel", data.studentLogin.user.userlevel);

                localStorage.setItem("profile_pic", data.studentLogin.user.profile_pic);
                localStorage.setItem("studentglobals", JSON.stringify(data.studentLogin.user.studentGlobals));
                localStorage.setItem("globalsubjects", JSON.stringify(data.studentLogin.user.subjects));

                if (data.studentLogin) {

                    Cookies.remove("successtoken");
                    this.props.history.push("/student/home");

                }
            }
        });
    };
    freeTrailhandleFun = (e) => {
        e.preventDefault();
        this.setState({
            loader: 1
        });
        console.log("freeTrailhandleFun", this.props.stateData.mobile,
            this.props.stateData.planData);
        this.freetrail(
            this.props.stateData.mobile,
            //"7288877946",
            this.props.stateData.planData.id,
            "0"
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });



    }
    freetrail = async (mobile, plan_id, referral_id) => {
        await this.props.freetrail({
            variables: {
                mobile, plan_id, referral_id
            },
            update: (store, { data }) => {
                console.log("data.setFreeTrailPackage", data.setFreeTrailPackage);
                if (data.setFreeTrailPackage) {

                    this.setState(() => {
                        this.handleFormSubmit();
                    });

                    //this.props.history.push("/login");

                }
            }
        });
    };
    render() {
        if (this.props.currentStep !== 4) {
            return null;
        }
        if (this.props.stateData.loader == "1") {
            return (<Row className="stepFour mt-5">
                <Col xl={12} lg={12} md={12} sm={12}>
                    <Card as={Card.Body} className="border-0 text-center p-5">
                        <div className="mb-5">

                            <h2 className="text-success mb-4">You have registered successfully</h2>
                            <div className="d-flex justify-content-center align-items-center">
                                <div class="spinner-border text-info"></div>
                            </div>
                            <h1 className="text-success">Logging into ELAPP</h1>
                        </div>

                    </Card>
                </Col>
            </Row>);
        }
        return (
            ""
            // <Row className="stepFour mt-5">
            //     <Col xl={12} lg={12} md={12} sm={12}>
            //         <Card as={Card.Body} className="border-0 text-center p-5">
            //             <div className="d-md-flex align-items-center justify-content-center mb-5">
            //                 <Image src={require('../../../images/register-succes.png')} className="my-2" alt="img" width="200" />
            //                 <div className="content my-2 ml-5">
            //                     {this.props.stateData.planData.id == "5" ? (
            //                         <React.Fragment>
            //                             <h2 className="text-success mb-4">You have registered successfully</h2>

            //                             {/* <Link
            //                                 onClick={(e) => this.freeTrailhandleFun(e)}
            //                                 variant="link text-primary">&nbsp;Login to ELAPP</Link> */}

            //                         </React.Fragment>

            //                     ) : (
            //                             <React.Fragment>
            //                                 <h2 className="text-success mb-4">Successful Payment</h2>
            //                                 <p className="text-muted">Order Number: 4674454516744464</p>
            //                             </React.Fragment>
            //                         )}

            //                 </div>
            //             </div>
            //             <h1>Thank You</h1>
            //         </Card>
            //     </Col>
            // </Row>
        )
    }
}



export default withRouter(compose(
    graphql(LOGIN_USER, {
        name: "login"
    }),
    graphql(FREETRAIL_PLAN, {
        name: "freetrail"
    })
)(StepFour)
);
