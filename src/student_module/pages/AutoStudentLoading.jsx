import React, { Component } from "react";
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import AutoStudentLoadingSection from "./AutoStudentLoadingSection";

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
            exam_name
            current_plan_id
            mobile_verified
            target_year
            videos
            branch_name
            profile_pic
            userlevel
            forum
            institution_id
            
         }
    }
  }
`;
class AutoStudentLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      time: "1",
      submitError: ""
    }
  }
  
  componentDidMount = () => {
    if (this.state.time == "1") {
      setTimeout(() => {
        this.handleFormSubmit();
      }, 100);
    }

  }
  handleFormSubmit = e => {
    //e.preventDefault();
    console.log("sree", this.props.match.params.username.split(":")[1], this.props.match.params.token.split(":")[1], this.props.match.params.token.split(":")[1]);

    this.login(this.props.match.params.username.split(":")[1].toString(), this.props.match.params.token.split(":")[1].toString()).catch(error => {
      console.log("catch if error");
      console.log(error);
      this.setState({
        submitError: error.graphQLErrors.map(x => x.message)
      });
      console.error("ERR =>", error.graphQLErrors.map(x => x.message));
    });

  };
  login = async (username, token) => {
    await this.props.login({
      variables: {
        username,
        token
      },
      update: (store, { data }) => {

        if (data.studentLogin) {

          console.log("data.studentLogin.user.branch_name", data.studentLogin);
          //localStorage.clear();
          Cookies.set("studenttoken", data.studentLogin.token);
          Cookies.set("studentrefreshtoken", data.studentLogin.refreshToken);
          Cookies.set("studentusername", data.studentLogin.user.name);
          Cookies.set("studentemail", data.studentLogin.user.email);

          Cookies.set("mobile", data.studentLogin.user.mobile);
          Cookies.set("classid", data.studentLogin.user.class_id);
          Cookies.set("examid", data.studentLogin.user.exam_id);
          Cookies.set("exam_name", data.studentLogin.user.exam_name);
          Cookies.set("mobileverified", data.studentLogin.user.mobile_verified);
          Cookies.set("targetyear", data.studentLogin.user.target_year);
          Cookies.set("videos", data.studentLogin.user.videos);
          Cookies.set("branch_name", data.studentLogin.user.branch_name);
          Cookies.set("role", "student");
          Cookies.set("profile_pic", data.studentLogin.user.profile_pic);
          Cookies.set("student_userlevel", data.studentLogin.user.userlevel);
          Cookies.set("stulogintype", "normal");
          Cookies.set("forumlink", data.studentLogin.user.forum);
          Cookies.set("institution_id", data.studentLogin.user.institution_id);
          localStorage.removeItem('profile_pic');
          localStorage.setItem("profile_pic", data.studentLogin.user.profile_pic);

          localStorage.removeItem('packageplan');
          if (this.props.match.params.type.split(":")[1] == "mocktest" || this.props.match.params.type.split(":")[1] == "home") {
            localStorage.setItem("packageplan", this.props.match.params.type.split(":")[1]);
          }
          else {
            localStorage.setItem("packageplan", this.props.match.params.type.split(":")[1].split("-")[1]);
          }

          this.setState({
            time: "2",
            submitError: ""
          })

        }
      }
    });
  };
  render() {

    if (this.state.submitError != "") {
      this.props.history.push("/student/login");
    }

    if (this.state.time == "2") {
      return (
        
          <AutoStudentLoadingSection
            type={this.props.match.params.type.split(":")[1]}
          />
        

      );
    }
    else {
      return null;
    }



  }
}

export default withRouter(
  compose(
    graphql(LOGIN_USER, {
      name: "login"
    })
  )(AutoStudentLoading)
);
