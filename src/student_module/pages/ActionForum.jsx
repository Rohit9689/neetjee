import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import * as Cookies from "es-cookie";
class ActionForum extends Component {

    render() {
        window.open(Cookies.get("forumlink"), "_blank")
        this.props.history.push("/student/home")
        return (
            null

        )


    }
}

export default withRouter(ActionForum);
