import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import RegisterSection from '../components/register_steps/RegisterSection';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import moment from 'moment';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import NavbarTop from '../components/login_register/NavbarTop';
import Footer from '../components/login_register/Footer';
import "../components/login_register/_studentregister.scss"


class StudentRegister extends Component {
    constructor(props) {
        super(props);
        let name = "";
        if (props.history.location.state != undefined) {
            name = props.history.location.state.fullname;
        }
        this.state = {
            name: name
        }
    }
    handleInputChange = (name) => {
        this.setState({
            name: name
        });
    }
    render() {
        const getStudentPlans = this.props.getStudentPlans;
        const loading1 = getStudentPlans.loading;
        const error1 = getStudentPlans.error;

        //if (loading1) return <PreloaderTwo />;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        
        return (
            <div className="student_register">
                <section className="student_block">
                    <NavbarTop />
                </section>
                {(loading1 == true) && (<PreloaderTwo />)}
                <div className="register-form bg-light">
                    {
                        !loading1 && (
                            <RegisterSection
                                handleInputChange={this.handleInputChange}
                                getStudentPlans={getStudentPlans.getStudentPlans}
                                locationData={this.props.history.location.state != undefined ? (this.props.history.location.state) : ("")}
                            />
                        )}

                </div>
                <Footer />
            </div>
        )
    }
}


export default withRouter(compose(

    graphql(gql` 
        query{
            getStudentPlans{
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
        `,
        {
            options: props => ({

                fetchPolicy: 'cache-and-network'
            }), name: "getStudentPlans"
        }))(StudentRegister));
