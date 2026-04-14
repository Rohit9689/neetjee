import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Image, Modal } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import "./_studenthome.scss";

const FETCH_EXPLORE = gql`
  query($mobile: String!) {
    getUserExplored(mobile: $mobile) {
      title
      name
      status
    }
  }
`;
class ExploreMore extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  exploreTags(data) {
    let getData = data[this.props.stateData.mainindex];
    let classname = "";
    if (getData.subject == "Botany") {
      classname = "exploreTags my-4 border-0 botany";
    } else if (getData.subject == "Physics") {
      classname = "exploreTags my-4 border-0 physics";
    } else if (getData.subject == "Chemistry") {
      classname = "exploreTags my-4 border-0";
    } else if (getData.subject == "Zoology") {
      classname = "exploreTags my-4 border-0 zoology";
    } else if (getData.subject == "Mathematics") {
      classname = "exploreTags my-4 border-0 maths";
    }
    return classname;
  }
  exploreActiveFun(data) {
    let active = "";
    if (data == false) {
      active = "active";
    }
    return active;
  }
  render() {
    const getUserExplored = this.props.getUserExplored;
    const loading4 = getUserExplored.loading;
    const error4 = getUserExplored.error;

    if (error4 !== undefined) {
      alert("Server Error. " + error4.message);
      return null;
    }
    if (loading4) {
      return (
        <Col xl={12} lg={12} md={12}>
          <Card className={this.exploreTags(this.props.getSubjects)}>
            <Card.Header className="bg-white border-0 d-flex align-items-center px-4 pt-4">
              <i className="mr-2 fa-2x fad fa-history icon" />{" "}
              <h6 className="mb-0">Explore more</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center">
                <div class="spinner-border text-primary"></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return (
      <Col xl={12} lg={12} md={12}>
        <Card className={this.exploreTags(this.props.getSubjects)}>
          <Card.Header className="bg-white border-0 d-flex align-items-center px-4 pt-4">
            <i className="mr-2 fa-2x fad fa-history icon" />{" "}
            <h6 className="mb-0">Explore more</h6>
          </Card.Header>
          <Card.Body>
            <ul className="tags-list list-inline">
              {getUserExplored.getUserExplored.map((item) => {
                return (
                  <li
                    key={item.name}
                    className={`list-inline-item ${this.exploreActiveFun(
                      item.status
                    )}`}
                  >
                    {/* onClick={() => this.setState({ modalShow: true })} - Disabled OnClick for Explore more.*/}
                    <Link to="#" className="text-muted">
                      <i className="mr-2 fad fa-check-circle" /> {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </Card>
        <Modal
          {...this.props}
          className="tags-video"
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            className="justify-content-center align-items-center p-0 border-0"
          />
          <Modal.Body className="p-0">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                allowfullscreen
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default withRouter(
  compose(
    graphql(FETCH_EXPLORE, {
      options: (props) => ({
        variables: {
          mobile: Cookies.get("mobile"),
        },
        fetchPolicy: "cache-and-network",
      }),
      name: "getUserExplored",
    })
  )(ExploreMore)
);
