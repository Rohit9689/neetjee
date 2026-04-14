import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import Footer from "../components/footer/Footer";
import Preloader from "../components/preloader/Preloader";
import * as Cookies from "es-cookie";

class PageNotFound extends Component {
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    return (
      <React.Fragment>
        <div className="left-side-menu">
          <SideNavbar />
        </div>
        <div className="content-page d-flex justify-content-center align-items-center">
          <Preloader />
          <NavbarOne onClick={() => this.props.changeToggle()} />
          <div className="overlay" onClick={() => this.props.changeToggle()} />
          <div className="main-content">
            <Row className="page_not_found text-center">
              <Col xl={12} lg={12} md={12} sm="12" xs={12}>
                <Image
                  className="mb-3"
                  width="350"
                  src={require("../../images/page-not-found.png")}
                  alt="page not found"
                />
                <h1>Oops!</h1>
                <h6>The page you requested could not be found</h6>
              </Col>
            </Row>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default PageNotFound;
