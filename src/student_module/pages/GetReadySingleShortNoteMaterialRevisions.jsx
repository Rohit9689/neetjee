import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import GetReadySingleShortNoteMaterialRevisionsSection from '../components/get_ready_for_exam/GetReadySingleShortNoteMaterialRevisionsSection'
import * as Cookies from "es-cookie";

class GetReadySingleShortNoteMaterialRevisions extends Component {
    constructor(props){
        super(props);
        this.state={
            views:"",
            toggled: "wrapper sidebar-enable"
        }
    }
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
    componentDidMount() {
        window.addEventListener('contextmenu',
            event => event.preventDefault());


        // window.addEventListener("mousedown", e => {
        //     e.preventDefault();
        //     e.returnValue = "false";

        // });
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {

        window.removeEventListener('contextmenu', () => { });
        //window.removeEventListener("mousedown", () => { });
        window.removeEventListener("selectstart", () => { });

    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                <AsideNavbar onClick={() => this.menuToggler()}/>
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            <GetReadySingleShortNoteMaterialRevisionsSection
                            stateData={this.state}
                                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default GetReadySingleShortNoteMaterialRevisions
