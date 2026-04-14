import React, { Component } from "react";
import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import OwnQuestionPaperSection from "../components/questioners/create_question_paper/own_question_paper/OwnQuestionPaperSection";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";
class OwnQuestionPaper extends Component {
  menuToggler = () => {
    const toggled = Cookies.get("toggle");
     if (toggled === "wrapper") {
         this.setState({toggled:"wrapper sidebar-enable"});
         Cookies.set("toggle", "wrapper sidebar-enable");
     } else {
         this.setState({toggled:"wrapper"});
         Cookies.set("toggle", "wrapper");
     }
 };
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    console.log("OwnQuestionPaper", this.props.history.location.state);
    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          <NavbarOne onClick={() => this.menuToggler()} />
          <div className="overlay" onClick={() => this.menuToggler()} />
          <div className="main-content">
            <OwnQuestionPaperSection
              locationData={this.props}
              getGroupData={this.props.history.location.state}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default (OwnQuestionPaper);
