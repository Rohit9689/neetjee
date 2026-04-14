import React, { Component } from 'react'
import GroupCards from './GroupCards'
import '../_subjects.scss'

import { SubjectCardOne } from './SubjectData'

class SubjectSection extends Component {
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
            // <section className="subject_section pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
            <section className="subject_section">

                <GroupCards
                    chapters={this.props.getChapters}
                    CardsData={SubjectCardOne}
                    cardTitle={this.state.CardtitleOne} />
            </section>
        )
    }
}

export default SubjectSection
