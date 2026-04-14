import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Image, Nav, Accordion } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import logo from "../../../images/logo.svg";
import small_logo from "../../../images/small-logo.png";
import * as Cookies from "es-cookie";
import ContentLoader from 'react-content-loader';


import "./_navbars.scss";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    width: "3px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class AsideNavbarDummy extends Component {
  logout = () => {
    if (Cookies.get("studenttoken") !== undefined) {
      Cookies.remove("studenttoken");
      Cookies.remove("studentusername");
      Cookies.remove("studentrefreshtoken");
      Cookies.remove("studentemail");
      Cookies.remove("mobile");
      Cookies.remove("classid");
      Cookies.remove("examid");
      Cookies.remove("mobileverified");
      Cookies.remove("targetyear");
      Cookies.remove("role");
      this.props.history.push("/student/login");
    }
  };
  getAccordianActive = () => {
    switch (this.props.history.location.pathname) {
      // Analysis
      case "/student/result-analysis":
        return 1;
      case "/student/practice-exam-analysis":
        return 1;
      case "/student/strength-analysis":
        return 1;
      case "/student/time-analysis":
        return 1;
      case "/student/complexity-analysis":
        return 1;
      case "/student/error-analysis":
        return 1;
      case "/student/questiontype-analysis":
        return 1;

      default:
        return 0;
    }
  };

  getActiveClassTwo = (link) => {
    if (link === this.props.history.location.pathname)
      return "collapse-item active";
    else return "collapse-item";
  };

  getActiveClass = (link) => {
    if (link === this.props.history.location.pathname) return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/subjects" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/subject/topics" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/pre-exam-test" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/subject/chapter" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/chapter-status" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/practice-exam-history" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/start-watching" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/start-learning" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/subject/short-notes" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/start-error-exam" &&
      link === "/student/learn-practice"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/subject/start-error-exam/error-exam" &&
      link === "/student/learn-practic"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/exams/schedule-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/exams/adaptive-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/exams/custom-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/exams/error-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/exams/previous-paper-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/exams/custom-previous-paper-exam" &&
      link === "/student/exams"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/chapter-exam" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/cumulative-exam" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/semigrand-exam" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/grand-exam" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/get-ready-shortnotes-and-materials" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/get-ready-shortnotes/single-shortnote" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/get-ready-for-exam/history" &&
      link === "/student/get-ready-for-exam"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/bookmark/videos" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/bookmark/videos/watch-video" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/bookmark/shortnotes-and-materials" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/bookmark/shortnotes-and-material/single-shortnote" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/bookmark/practice-questions" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/bookmark/exam-questions" &&
      link === "/student/bookmark"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname === "/student/notes/videos" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/videos/watch-video" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/shortnotes-and-materials" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/shortnotes-and-material/single-shortnote" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/shortnotes-and-material/single-revisions-material" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/practice-questions" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/notes/exam-questions" &&
      link === "/student/notes"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/revision-material-groups/custom-revision-materials" &&
      link === "/student/revision-material-groups"
    )
      return "nav-link active";
    else if (
      this.props.history.location.pathname ===
      "/student/revision-material-groups/custom-single-revision-material" &&
      link === "/student/revision-material-groups"
    )
      return "nav-link active";
    else return "nav-link";
  };

  render() {
    return (
      <div id="sidebar" className="sidebar-menu">
        <div className="sidebar-header mt-2 px-3 py-2 text-center">
          <Link
            //to="/student/home" 
            className={this.getActiveClassTwo("/student/home")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="159.501" height="37.139" className="logo"
              viewBox="0 0 159.501 37.139">
              <g transform="translate(-384.741 -406.553)">
                <g transform="translate(445.845 406.553)">
                  <path fill="#ffffff"
                    d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z"
                    transform="translate(-825.498 -406.553)" />
                  <path fill="#ffffff"
                    d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z"
                    transform="translate(-983.902 -406.553)" />
                  <path fill="#ffffff"
                    d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z"
                    transform="translate(-1047.488 -442.954)" />
                  <path fill="#ffffff"
                    d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z"
                    transform="translate(-1167.251 -441.157)" />
                  <path fill="#ffffff"
                    d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z"
                    transform="translate(-1309.031 -441.157)" />
                </g>
                <g transform="translate(445.797 439.343)">
                  <path fill="#ffffff"
                    d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                    transform="translate(-825.153 -643.45)" />
                  <path fill="#ffffff"
                    d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z"
                    transform="translate(-864.261 -643.45)" />
                  <path fill="#ffffff"
                    d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                    transform="translate(-907.798 -643.45)" />
                  <path fill="#ffffff"
                    d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z"
                    transform="translate(-969.577 -643.45)" />
                  <path fill="#ffffff"
                    d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                    transform="translate(-1009.586 -643.45)" />
                  <path fill="#ffffff"
                    d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z"
                    transform="translate(-1047.869 -643.45)" />
                  <path fill="#ffffff"
                    d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z"
                    transform="translate(-1088.442 -643.45)" />
                  <path fill="#ffffff"
                    d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                    transform="translate(-1125.485 -643.45)" />
                  <path fill="#ffffff"
                    d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z"
                    transform="translate(-1161.778 -643.074)" />
                  <path fill="#ffffff" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                    transform="translate(-1200.4 -643.45)" />
                  <path fill="#ffffff"
                    d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z"
                    transform="translate(-1261.126 -643.074)" />
                  <path fill="#ffffff"
                    d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z"
                    transform="translate(-1304.889 -643.45)" />
                  <path fill="#ffffff" d="M1431.991,643.51h.785v4.228h-.785Z"
                    transform="translate(-1347.863 -643.45)" />
                  <path fill="#ffffff"
                    d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z"
                    transform="translate(-1372.971 -643.45)" />
                  <path fill="#ffffff"
                    d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                    transform="translate(-1417.109 -643.45)" />
                </g>
                <g transform="translate(384.741 406.948)">
                  <path fill="#ffffff"
                    d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z"
                    transform="translate(-384.741 -409.399)" />
                  <path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z"
                    transform="translate(-571.865 -409.399)" />
                </g>
              </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 69" width="40" className="small_logo" style={{ marginLeft: -6 }}>
              <g id="Layer">
                <path fill="#ffffff" d="M0.29 68.12L29.73 17.51L17.03 17.51L27.42 0L51.48 0L88.82 68.13L69.19 68.13L44.55 26.37L20.69 68.13L0.29 68.12Z" />
                <path fill="#f9c52d" d="M56.22 0L96.83 0L76.53 35.5L56.22 0Z" />
              </g>
            </svg>
          </Link>
        </div>
        <Scrollbars style={{ height: '90vh' }}
          renderThumbVertical={renderThumb}
          autoHide
          autoHideTimeout={500}
          autoHideDuration={200}>
          <Nav className="navbar-nav menu">
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <hr className="sidebar-divider" />
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <hr className="sidebar-divider" />
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <hr className="sidebar-divider" />
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <Nav.Item>

              <div className="showcase-component">
                <ContentLoader
                  speed={2}
                  width={400}
                  height={50}
                  viewBox="0 0 420 50"
                  backgroundColor="#2f4463"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="40" cy="20" r="10" />
                  <rect x="60" y="15" rx="5" ry="5" width="320" height="15" />
                </ContentLoader>
              </div>
            </Nav.Item>
            <hr className="sidebar-divider" />
          </Nav>
        </Scrollbars>
      </div>

    );
  }
}

export default withRouter(AsideNavbarDummy);
