import React, { Component } from "react";

import { Card } from "react-bootstrap";
import { gql } from "@apollo/client";

import { withRouter } from "react-router-dom";

import UserRestrictionAlert from "../../home/UserRestrictionAlert";


class TabpaneThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      userRestionModalShow: false
    };
  }
  practiceModal = (isuserValid) => {

    if (this.props.enabled == true) {
      if (isuserValid == false) {
        this.setState({
          userRestionModalShow: false
        });
        localStorage.setItem("subjectid", this.props.subjectid);
        localStorage.setItem("type", "practice");
        localStorage.setItem("ocid", this.props.ocid);
        localStorage.setItem("otid", "0");
        window.open("/student/subject/practice-test", "_blank") //to open new page
      } else {
        this.setState({
          userRestionModalShow: true
        });
      }
    }
    else {
      this.setState({
        userRestionModalShow: true
      });
    }

  };
  render() {

    //console.log("ohdsv",this.props.subjectsData);
    return (
      <React.Fragment>
        <div className="content p-2">
          {this.props.subjectsData.total_questions > 0 ? (
            <Card as={Card.Body} className="border_pad p-2 mt-2 text-center">
              <p className="text-danger mb-1">
                Attempted Questions:{" "}
                {this.props.subjectsData.attempted_questions}
              </p>
              <p className="text-danger mb-1">
                Wrong Answered:{" "}
                {this.props.subjectsData.practice_wrong_answered}
              </p>
              <div className="mt-2 right-answer">
                Correct Answered:{" "}
                {parseInt(this.props.subjectsData.attempted_questions - this.props.subjectsData.practice_wrong_answered)}
              </div>
            </Card>
          ) : ("")}

        </div>
        {this.props.enabled == true ? (
          <div className="card-bottom practice">
            {this.props.subjectsData.total_questions > 0 ? (
              <a
                title="Start Practice"
                onClick={(e) => this.practiceModal(this.props.isuserValid)}
              >
                Start Practice
              </a>
            ) : (
                "NO QUESTIONS AVAILABLE"
              )}
          </div>
        ) : (<div className="card-bottom practice">

          <a
            style={{ opacity: "0.1" }}
            onClick={(e) => this.practiceModal(this.props.isuserValid)}
            title="Start Practice"

          >
            Start Practice
                      </a>

        </div>)}
        <UserRestrictionAlert
          show={this.state.userRestionModalShow}
          onHide={() => this.setState({ userRestionModalShow: false })}
        />
      </React.Fragment>


    );
  }
}

export default withRouter((TabpaneThree));
