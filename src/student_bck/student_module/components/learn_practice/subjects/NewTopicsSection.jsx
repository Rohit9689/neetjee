import React, { Component } from 'react'
import NewTopicsGroupCards from './NewTopicsGroupCards'
import '../_subjects.scss'

import { SubjectCardOne } from './SubjectData'

class NewTopicsSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            CardtitleOne: {
                title: 'Unit-I Diversity in the living world'
            }
        }
    }

    render() {
        return (
            <section className="subject_section">

                <NewTopicsGroupCards
                getChapters={this.props.getChapters}
                getTopics={this.props.getTopics}
                    CardsData={SubjectCardOne}
                    cardTitle={this.state.CardtitleOne} />
            </section>
        )
    }
}

export default NewTopicsSection
