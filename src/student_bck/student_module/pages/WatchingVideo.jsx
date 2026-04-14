import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import { withRouter } from "react-router-dom";
import { Container } from 'react-bootstrap'
import ChepterHeaderSection from '../components/learn_practice/top_header/ChepterHeaderSection'


import * as Cookies from "es-cookie";
import RevisionMaterialVideos from '../components/learn_practice/revision_materials/RevisionMaterialVideos';
class WatchingVideo extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        let ComponentParams = "";
        let pagetype = "";
        if (this.props.history.location.state.type != "iv") {
            if (this.props.history.location.state.ocid != "0") {
                ComponentParams = {
                    subject: "0",
                    chapter: this.props.history.location.state.ocid,
                    pagetype: "topiclistpath"

                }

            }
            else {
                ComponentParams = {
                    subject: this.props.history.location.state.subjectid,
                    chapter: "0",
                    pagetype: "chlistpath"
                }

            }
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper pt-0">
                        <ChepterHeaderSection
                            type="video"
                            getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                        />
                        <Container>
                            <RevisionMaterialVideos
                                pagetype={pagetype}
                                getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                defaultActiveKey=""
                                ComponentParams={ComponentParams}

                            />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(WatchingVideo);
