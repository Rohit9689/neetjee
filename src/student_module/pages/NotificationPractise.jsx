import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class NotificationPractise extends Component {

    render() {
        localStorage.setItem("subjectid", this.props.match.params.subjectid.split(":")[1]);
        localStorage.setItem("type", "practice");
        localStorage.setItem("ocid", this.props.match.params.chapterid.split(":")[1]);
        localStorage.setItem("otid", this.props.match.params.topicid.split(":")[1]);
        window.open("/student/subject/practice-test", "_blank") //to open new page
        this.props.history.push("/student/home")
        //window.close();
        return (
            null

        )


    }
}

export default withRouter(NotificationPractise);
