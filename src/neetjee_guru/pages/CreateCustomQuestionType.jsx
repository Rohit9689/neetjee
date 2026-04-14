import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader';
import CreateCustomQuestionTypeSection from '../components/questioners/create_question_paper/create_custom_questions/CreateCustomQuestionTypeSection';
import Footer from '../components/footer/Footer'

class CreateCustomQuestionType extends Component {
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
        return (
            <div className={Cookies.get("toggle")}>
                <div className="left-side-menu">
                    <SideNavbar onClick={() => this.menuToggler()} />
                </div>
                <div className="content-page">
                    <Preloader />
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    <div className="main-content">
                        <CreateCustomQuestionTypeSection />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default CreateCustomQuestionType
