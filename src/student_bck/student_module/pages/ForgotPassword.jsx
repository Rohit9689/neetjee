import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgotPasswordSection from "../components/forgotpassword_steps/ForgotPasswordSection";
import * as Cookies from "es-cookie";
import NavbarTop from '../components/login_register/NavbarTop';
import Footer from '../components/login_register/Footer';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var dd = today.getDate();
    var mmm = today.getMonth();
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var yyyy = today.getFullYear();

    var date = new Date();
    var hh = date.getHours();
    var mm = date.getMinutes();
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    let curr_time = hh + ":" + mm;
    today = dd + " " + month[mmm] + " " + yyyy + " " + curr_time;

    this.state = {
      date: today,
      stepStatus: 0,
    };
  }
  stepStatusFun = (data) => {
    console.log("stepStatusFun", data);
    this.setState({ stepStatus: data });
  };

  render() {
    // if (Cookies.get("studenttoken") == undefined)
    //     this.props.history.push("/student/login");
    return (
      <section className="student_login">
        <div className="student_block">
          <NavbarTop />
          <main role="main">
            <Container>
              <Row>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={12} sm={12} xs={12}>
                  <h4 className="heading text-white">Welcome to<br /> Neet Jee Guru.</h4>
                  <p className="sub-title text-white">The Best competitive exam preparation<br /> portal in the world.</p>
                </Col>
                <ForgotPasswordSection PstepStatusFun={this.stepStatusFun} />
              </Row>
            </Container>
          </main>
          <Footer />
        </div>
      </section>
    )
  }
}

export default ForgotPassword;
