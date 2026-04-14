import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class NotificationLearn extends Component {

    render() {
        this.props.history.push({
            pathname: "/student/subject/start-learning",
            state: {
                subjectid: this.props.match.params.subjectid.split(":")[1],
                ocid: this.props.match.params.chapterid.split(":")[1],
                otid: this.props.match.params.topicid.split(":")[1],
                type:"notifyaction"
            }
        }
        )
        return (
            null

        )


    }
}

export default withRouter(NotificationLearn);
