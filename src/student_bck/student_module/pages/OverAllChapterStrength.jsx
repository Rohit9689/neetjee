import React, { Component } from 'react'
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import InnerOverAllChapterStrength from "./InnerOverAllChapterStrength";


class OverAllChapterStrength extends Component {
    
    render() {
        console.log("cook",Cookies.get("studenttoken"));
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        
        return (
            <InnerOverAllChapterStrength
            getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}/>
        )
    }
}



export default withRouter(OverAllChapterStrength);
