import React, { Component } from 'react'
import TopicsGroupCard from './TopicsGroupCard'
import '../_subjects.scss'

class TopicsSection extends Component {
    render() {
        console.log("TopicsSection", this.props.getTopics);
        return (
            <section className="subject_section">
                <div className="title my-3 pb-3">
                    <h5>{this.props.getTopics.chapter} - Topics</h5>
                    <p>Select Topics to start learning and practice</p>
                </div>
                <TopicsGroupCard
                    getTopics={this.props.getTopics} />
            </section>
        )
    }
}

export default TopicsSection
