import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Image, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";

import "./_navbar.scss";
// const FETCH_NOTIFYSTUDENTS = gql` 
// query($institution_id: Int!) {
//     getInstituteNotificaton(institution_id: $institution_id){
//         title
//         description
//         class_ids
//         category_ids
//         branch_ids
//         section_ids

//     }
// }

// `;

class NavbarOne extends Component {
  logout = () => {
    console.log(
      "Navbarone",
      Cookies.get("institutionid"),
      Cookies.get("token")
    );
    if (Cookies.get("token") !== undefined) {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("refreshtoken");
      Cookies.remove("email");
      Cookies.remove("id");
      Cookies.remove("institutionid");
      //Cookies.remove("fullname");
      Cookies.remove("userlevel");
      Cookies.remove("name");
    }
    this.props.history.push("/");
  };
  render() {
    console.log(
      "Navbarone",
      this.props
    );
    const getOrganisationProfile = this.props.getOrganisationProfile;
    const loading3 = getOrganisationProfile.loading;
    const error3 = getOrganisationProfile.error;

    // const getInstituteNotificaton = this.props.getInstituteNotificaton;
    // const loading2 = getInstituteNotificaton.loading;
    // const error2 = getInstituteNotificaton.error;

    if (error3 !== undefined) {
      alert("Server Error. " + error3.message);
      return null;
    }
    // if (error2 !== undefined) {
    //   alert("Server Error. " + error2.message);
    //   return null;
    // }
    if (loading3) return null;

    let orgname = "INSTITUTION NAME";
    let logo = "";

    if (this.props.getOrganisationProfile.getOrganisationProfile != null) {
      orgname = getOrganisationProfile.getOrganisationProfile.organisation_name;
      logo = getOrganisationProfile.getOrganisationProfile.logo;
    }

    // if (
    //   Cookies.get("token") == undefined ||
    //   Cookies.get("institutionid") == undefined
    // ) {
    //   this.props.history.push("/");
    //   //this.logout();
    // }
    //const notification = getInstituteNotificaton.getInstituteNotificaton;

    return (
      <Navbar bg="white" className="top-header">
        <Button
          variant="light"
          className="btn-circle d-block d-xl-none d-lg-none d-md-none mr-2"
          onClick={() => this.props.onClick()}
        >
          <i className="fas fa-ellipsis-v" />
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="mr-auto d-flex align-items-center">
            <h4 className="text-primary mr-2">{orgname}</h4>
            {logo != "" ? (
              // <Link
              //   to={"/questions/manage-question-paper"}>
              <Image src={`https://admin.rizee.in/files/${logo}`} height="40" style={{ width: 'auto', minWidth: 60 }} />
              // </Link>

            ) : ("")}

          </div>
          {/* <Form inline className="search mr-auto">
            <i className="fas fa-search fa-sm"></i>
            <Form.Control
              className="search-bar border-0"
              type="text"
              placeholder="Search here..."
              aria-describedby="inputGroupPrepend"
              required
            />
          </Form> */}
          {/* <Nav className="ml-auto">
            <Nav.Link href="#link">
              <svg
                role="img"
                viewBox="0 0 512 512"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M345.34 182.46a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34L226.54 289.94l-48.57-48.57a7.98 7.98 0 0 0-5.66-2.34c-2.05 0-4.1.78-5.66 2.34l-11.31 11.31c-3.12 3.12-3.12 8.19 0 11.31l65.54 65.54c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.65-2.34l124.45-124.45c3.12-3.12 3.12-8.19 0-11.31l-11.3-11.31zM512 256c0-35.5-19.4-68.2-49.6-85.5 9.1-33.6-.3-70.4-25.4-95.5s-61.9-34.5-95.5-25.4C324.2 19.4 291.5 0 256 0s-68.2 19.4-85.5 49.6c-33.6-9.1-70.4.3-95.5 25.4s-34.5 61.9-25.4 95.5C19.4 187.8 0 220.5 0 256s19.4 68.2 49.6 85.5c-9.1 33.6.3 70.4 25.4 95.5 26.5 26.5 63.4 34.1 95.5 25.4 17.4 30.2 50 49.6 85.5 49.6s68.1-19.4 85.5-49.6c32.7 8.9 69.4.7 95.5-25.4 25.1-25.1 34.5-61.9 25.4-95.5 30.2-17.3 49.6-50 49.6-85.5zm-91.1 68.3c5.3 11.8 29.5 54.1-6.5 90.1-28.9 28.9-57.5 21.3-90.1 6.5C319.7 433 307 480 256 480c-52.1 0-64.7-49.5-68.3-59.1-32.6 14.8-61.3 22.2-90.1-6.5-36.8-36.7-10.9-80.5-6.5-90.1C79 319.7 32 307 32 256c0-52.1 49.5-64.7 59.1-68.3-5.3-11.8-29.5-54.1 6.5-90.1 36.8-36.9 80.8-10.7 90.1-6.5C192.3 79 205 32 256 32c52.1 0 64.7 49.5 68.3 59.1 11.8-5.3 54.1-29.5 90.1 6.5 36.8 36.7 10.9 80.5 6.5 90.1C433 192.3 480 205 480 256c0 52.1-49.5 64.7-59.1 68.3z"
                ></path>
              </svg>
            </Nav.Link>
            <NavDropdown
              id="basic-nav-dropdown1"
              className="notifications no-arrow"
              alignRight
              title={
                <span>
                  <svg
                    role="img"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M224 480c-17.66 0-32-14.38-32-32.03h-32c0 35.31 28.72 64.03 64 64.03s64-28.72 64-64.03h-32c0 17.65-14.34 32.03-32 32.03zm209.38-145.19c-27.96-26.62-49.34-54.48-49.34-148.91 0-79.59-63.39-144.5-144.04-152.35V16c0-8.84-7.16-16-16-16s-16 7.16-16 16v17.56C127.35 41.41 63.96 106.31 63.96 185.9c0 94.42-21.39 122.29-49.35 148.91-13.97 13.3-18.38 33.41-11.25 51.23C10.64 404.24 28.16 416 48 416h352c19.84 0 37.36-11.77 44.64-29.97 7.13-17.82 2.71-37.92-11.26-51.22zM400 384H48c-14.23 0-21.34-16.47-11.32-26.01 34.86-33.19 59.28-70.34 59.28-172.08C95.96 118.53 153.23 64 224 64c70.76 0 128.04 54.52 128.04 121.9 0 101.35 24.21 138.7 59.28 172.08C421.38 367.57 414.17 384 400 384z"
                    ></path>
                  </svg>
                </span>
              }
            >
              <NavDropdown.Item href="#action/3.1" className="d-flex">
                <Image
                  src={require("../../../images/businessman.png")}
                  alt="avatar-img"
                  width="50"
                  height="50"
                  roundedCircle
                />
                <div className="notification-content">
                  <h6>Lorem ipsum</h6>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="d-flex">
                <Image
                  src={require("../../../images/businessman.png")}
                  alt="avatar-img"
                  width="50"
                  height="50"
                  roundedCircle
                />
                <div className="notification-content">
                  <h6>Lorem ipsum</h6>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="d-flex">
                <Image
                  src={require("../../../images/businessman.png")}
                  alt="avatar-img"
                  width="50"
                  height="50"
                  roundedCircle
                />
                <div className="notification-content">
                  <h6>Lorem ipsum</h6>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" className="d-flex">
                <Image
                  src={require("../../../images/businessman.png")}
                  alt="avatar-img"
                  width="50"
                  height="50"
                  roundedCircle
                />
                <div className="notification-content">
                  <h6>Lorem ipsum</h6>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5" className="d-flex">
                <Image
                  src={require("../../../images/businessman.png")}
                  alt="avatar-img"
                  width="50"
                  height="50"
                  roundedCircle
                />
                <div className="notification-content">
                  <h6>Lorem ipsum</h6>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              id="basic-nav-dropdown2"
              className="no-arrow"
              alignRight
              title={
                <span>
                  <svg
                    role="img"
                    viewBox="0 0 496 512"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
                    ></path>
                  </svg>
                </span>
              }
            >
              <NavDropdown.Item className="font-weight-bold">
                {Cookies.get("name")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#/">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#/">Status</NavDropdown.Item>
              <NavDropdown.Item href="#/">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="#/">Feedback</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e) => this.logout(e)}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}

          <Nav className="ml-auto">
            <NavDropdown id="basic-nav-dropdown1" className="notification no-arrow" alignRight title={
              <span><i className="fal fa-bell" /></span>
            }>
              <ul>
                <li>
                  <div className="drop-title">Your Notifications</div>
                </li>
                <li>
                  <div className="notification-center">
                    {/* {notification.map((notify) => (
                      <a href="/settings/notify-students" className="d-flex align-items-center">
                        <Image src={require('../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                        <div className="notification-contnet">
                          <h5>{notify.title}</h5>
                          <p className="mail-desc">{notify.description}</p>
                          <span className="time">9:30 AM</span>
                        </div>
                      </a>
                    ))} */}

                    {/* <a href="/#" className="d-flex align-items-center">
                      <Image src={require('../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                      <div className="notification-contnet">
                        <h5>Lorem ipsum dolor sit amet</h5>
                        <p className="mail-desc">Just a reminder that you have event</p>
                        <span className="time">9:10 AM</span>
                      </div>
                    </a>
                    <a href="/#" className="d-flex align-items-center">
                      <Image src={require('../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                      <div className="notification-contnet">
                        <h5>Lorem ipsum dolor sit</h5>
                        <p className="mail-desc">You can customize this template as you want</p>
                        <span className="time">9:08 AM</span>
                      </div>
                    </a>
                    <a href="/#" className="d-flex align-items-center">
                      <Image src={require('../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                      <div className="notification-contnet">
                        <h5>Lorem ipsum dolor sit amet admin</h5>
                        <p className="mail-desc">Just see the my admin!</p>
                        <span className="time">9:02 AM</span>
                      </div>
                    </a> */}
                  </div>
                </li>
                <li>
                  <a className="pt-2 nav-link text-center" href="/#"> All
                    notifications</a>
                </li>
              </ul>
            </NavDropdown>
            <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
              <div className="profile-img d-flex align-items-center">

                <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                <div className="text mx-2 mt-2">
                  <div className="profile-name">{Cookies.get("name")}</div>
                  {/* <small>IP, MPC, Class - XII</small> */}
                </div>
              </div>
            }>
              <NavDropdown.Item className="font-weight-bold">{Cookies.get("email")}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/settings/organization-profile"><i className="far fa-user mr-2" /> My Profile</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="#"><i className="far fa-user-chart mr-2" /> Status</NavDropdown.Item>
              <NavDropdown.Item ><i className="far fa-key mr-2" /> Change Password</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#"><i className="far fa-comment-alt-lines mr-2" /> Feedback</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.logout}><i className="far fa-sign-out mr-2" /> Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default withRouter(compose(
  graphql(gql` 
  query($institution_id: Int!) {
      getOrganisationProfile(institution_id: $institution_id){
          id
          organisation_name
          
          logo
          
      }
  }
  `,
    {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        },

      }), name: "getOrganisationProfile"
    }
  ),
  // graphql(FETCH_NOTIFYSTUDENTS,
  //   {
  //     options: props => ({
  //       variables: {
  //         institution_id: parseInt(Cookies.get("institutionid"))
  //       }
  //     }), name: "getInstituteNotificaton"
  //   })
)(NavbarOne));
