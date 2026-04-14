import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (

      <footer className="student_footer mt-auto">
        <div className="footer-top py-3">
          <Container>
            <Row className="align-items-center">
              <Col xl={5} lg={5} md={5} sm={5} xs={12} className="my-2">
                <ul className="list-inline social-list m-0">
                  <li className="list-inline-item">
                    <a
                      // href="https://www.facebook.com/ELAPPofficial"
                      className="text-white"
                    >
                      <i className="fab fa-facebook-square fa-3x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      // href="https://twitter.com/ELAPPofficial"
                      className="text-white"
                    >
                      <i className="fab fa-twitter-square fa-3x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      // href="https://www.instagram.com/ELAPPofficial/"
                      className="text-white"
                    >
                      <i className="fab fa-instagram fa-3x fa-fw"></i>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col
                xl={{ span: 3, offset: 4 }}
                lg={{ span: 4, offset: 3 }}
                md={7}
                sm={7}
                xs={12}
                className="my-2"
              >
                <ul className="import-link list-inline m-0">
                  <li className="list-inline-item">
                    <a href="https://entrolabs.com/services/" className="text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://entrolabs.com/services/" className="text-white">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-middle py-4">
          <Container>
            <Row>
              <Col xl={5} lg={5} md={6} sm={5} xs={12} className="my-2">
                <ul className="import-link2 list-inline mb-5">
                  <li className="list-inline-item">
                    <a href="mailto:support@entrolabs.com" className="text-white">
                      support@entrolabs.com{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a to="tel:+91-4042016637" className="text-white">
                      +91-4042016637
                    </a>
                  </li>
                </ul>
                <p className="text-white my-5">
                  <strong>ELAPP</strong>: An assessment and learning platform
                  for students prepping for JEE &amp; NEET entrance exams.
                </p>
                <p className="text-white">&copy; Copyright 2020 by EntroLabs</p>
              </Col>
              <Col
                xl={{ span: 3, offset: 4 }}
                lg={{ span: 4, offset: 3 }}
                md={6}
                sm={7}
                xs={12}
                className="my-2"
              >
                <div className="logo-small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 70"
                    width="250"
                  >
                    <g fill="#ffffff">
                      {/* Letter E */}
                      <path d="M5 5 H45 V12 H15 V30 H40 V37 H15 V58 H45 V65 H5 Z" />

                      {/* Letter L */}
                      <path d="M60 5 H70 V58 H105 V65 H60 Z" />
                    </g>

                    {/* Accent shape (like your yellow triangle style) */}
                    <path
                      fill="#f9c52d"
                      d="M75 5 L115 5 L95 35 Z"
                    />
                  </svg>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom bg-warning text-center py-2">
          <Container>
            <p className="m-0">A Product of MyLearning Plus Pvt. Ltd.</p>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;

