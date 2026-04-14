import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

class TabpaneFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      userRestionModalShow: false
    };
  }
  errorcountModal = () => {
    console.log("this.props.enabled", this.props.enabled);
    if (this.props.enabled == true) {
      if (this.props.isuserValid == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/start-error-exam",
          state: {
            ocid: this.props.ocid,
            otid: this.props.otid,
            subjectid: this.props.subjectid,

          }
        });
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


  }
  render() {
    console.log("TabpaneFour", this.props);
    const getErrorDetails = this.props.getErrorDetails;
    const loading1 = getErrorDetails.loading;
    const error1 = getErrorDetails.error;

    if (loading1) return (<div className="shadow border-0 mb-4 justify-content-center d-flex align-items-center" style={{ height: 90 }}>
      <div class="spinner-border text-center" style={{ color: "#633FD2" }}></div>
    </div>);
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    console.log("getErrorDetails.getErrorDetails", getErrorDetails.getErrorDetails);
    return (
      <React.Fragment>
        <div className="content p-2">
          <h6 className="mb-0">{this.props.tabTitleFour}</h6>
          <Card as={Card.Body} className="border_pad p-2 text-center">
            <div className="d-flex justify-content-center mb-2">
              <p className="text-danger mx-3">
                Not Answered:{" "}
                {getErrorDetails.getErrorDetails.overall.not_answered}
              </p>
              <p className="text-danger mx-3">
                Wrong Answered:{" "}
                {parseInt(getErrorDetails.getErrorDetails.overall.wrong_answered) + parseInt(getErrorDetails.getErrorDetails.overall.correct_answered)}
              </p>
            </div>


            <div className="right-answer mb-2">
              Error corrected:{" "}
              {getErrorDetails.getErrorDetails.overall.correct_answered}
            </div>
            <div className="wrong-answer">
              Pending Error questions:{" "}
              {parseInt(getErrorDetails.getErrorDetails.overall.not_answered) + parseInt(getErrorDetails.getErrorDetails.overall.wrong_answered)}
            </div>
          </Card>
        </div>

        {this.props.enabled == true ? (<React.Fragment>
          {getErrorDetails.getErrorDetails.overall.not_answered > 0 ||
            getErrorDetails.getErrorDetails.overall.wrong_answered > 0 ? (
              <div className="card-bottom error">
                <a
                  title="Start Error Exam"
                  onClick={() => this.errorcountModal()}
                >
                  Start Error Exam
            </a>

              </div>
            ) : (
              ""
            )}
        </React.Fragment>) : (<div className="card-bottom error">
          <a
            style={{ opacity: "0.1" }}
            //onClick={e => e.preventDefault()}
            onClick={() => this.errorcountModal()}
            title="Start Error Exam"

          >
            Start Error Exam
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

export default withRouter(
  compose(
    graphql(
      gql`
        query($mobile: String!, $topic_id: Int, $chapter_id: Int) {
          getErrorDetails(
            mobile: $mobile
            topic_id: $topic_id
            chapter_id: $chapter_id
          ) {
            overall {
              not_answered
              correct_answered
              wrong_answered
            }
          }
        }
      `,
      {
        options: (props) => ({
          variables: {
            mobile: Cookies.get("mobile"),
            topic_id: parseInt(props.otid),
            chapter_id: parseInt(props.ocid),
          },
        }),
        name: "getErrorDetails",
      }
    )
  )(TabpaneFour)
);
