import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import GetReadyShortNotesSection from '../components/get_ready_for_exam/GetReadyShortNotesSection'

class GetReadyShortNotes extends Component {


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
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            <GetReadyShortNotesSection />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default GetReadyShortNotes
