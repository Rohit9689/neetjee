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
            views:""
        }
    }
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
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            <GetReadySingleShortNoteMaterialRevisionsSection
                            stateData={this.state}
                                getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default GetReadySingleShortNoteMaterialRevisions
