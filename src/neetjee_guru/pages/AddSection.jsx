import React, { Component } from "react";
import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import AddSectionComponent from "../components/examinations/addsection/AddSectionComponent";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";

class AddSection extends Component {
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
    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          <NavbarOne onClick={() => this.menuToggler()} />
          <div className="overlay" onClick={() => this.menuToggler()} />
          <div className="main-content">
            <AddSectionComponent />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AddSection;
