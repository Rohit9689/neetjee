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
                      href="https://www.facebook.com/ELAPPofficial"
                      className="text-white"
                    >
                      <i className="fab fa-facebook-square fa-3x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://twitter.com/ELAPPofficial"
                      className="text-white"
                    >
                      <i className="fab fa-twitter-square fa-3x fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.instagram.com/ELAPPofficial/"
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
                    <a href="https://rizee.in/privacy/" className="text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://rizee.in/terms/" className="text-white">
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
                    <a href="mailto:info@rizee.in" className="text-white">
                      info@rizee.in{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a to="tel:+91 080-68 82 66 00" className="text-white">
                      +91 080-68 82 66 00
                    </a>
                  </li>
                </ul>
                <p className="text-white my-5">
                  <strong>ELAPP</strong>: An assessment and learning platform
                  for students prepping for JEE &amp; NEET entrance exams.
                </p>
                <p className="text-white">&copy; Copyright 2020 by ELAPP</p>
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
                    viewBox="0 0 97 69"
                    width="250"
                  >
                    <g id="Layer">
                      <path
                        fill="#ffffff"
                        d="M0.29 68.12L29.73 17.51L17.03 17.51L27.42 0L51.48 0L88.82 68.13L69.19 68.13L44.55 26.37L20.69 68.13L0.29 68.12Z"
                      />
                      <path
                        fill="#f9c52d"
                        d="M56.22 0L96.83 0L76.53 35.5L56.22 0Z"
                      />
                    </g>
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

