import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import BreadcrumbHeading from '../../../../breadcrumbs/BreadcrumbHeading';

import './_stepwizard.scss'

const styles = {
    width: '120px',
};

class CreateCustomQuestionStandardSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumbsData: {
                Title: "Standard Exam question papers"
            },
            currentstep: 1,
            modalShowOne: false,
            modalShowTwo: false
        }
    }
    _next = () => {
        let currentstep = this.state.currentstep
        currentstep = currentstep >= 3 ? 3 : currentstep + 1
        this.setState({
            currentstep: currentstep
        })
    }

    _prev = () => {
        let currentstep = this.state.currentstep
        currentstep = currentstep <= 1 ? 1 : currentstep - 1
        this.setState({
            currentstep: currentstep
        })
    }

    /*
    * the functions for our button
    */
    previousButton() {
        let currentstep = this.state.currentstep;
        if (currentstep !== 1 && currentstep !== 3) {
            return (
                <Button style={styles} variant="dark" onClick={this._prev}> Back </Button>
            )
        }
        return null;
    }

    nextButton() {
        let currentstep = this.state.currentstep;
        if (currentstep === 3) {
            return (
                <a href="../../../../../../images/dummy.pdf" className="btn btn-success text-white float-right" download> Download Question Paper </a>
            )
        }
        if (currentstep < 3) {
            return (
                <Button style={styles} variant="success" className="float-right" onClick={this._next}> Next </Button>
            )
        }

        return null;
    }
    render() {
        return (
            <section className="create_question_pattern">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="create-question-step-wizard">
                            <ul className="step-indicator border-bottom pb-4">
                                <li className={this.state.currentstep === 1 ? "active" : "complete"}>
                                    <div className="step"><i className="fal fa-books"></i></div>
                                    <div className="caption">Syllabus</div>
                                </li>
                                <li className={this.state.currentstep === 2 ? "active" :
                                    this.state.currentstep > 2 ? "complete" : ""
                                }>
                                    <div className="step"><i className="fal fa-sliders-h"></i></div>
                                    <div className="caption">Attributes</div>
                                </li>
                                <li className={this.state.currentstep === 3 ? "active" :
                                    this.state.currentstep > 3 ? "done" : ""
                                }>
                                    <div className="step"><i className="fal fa-download"></i></div>
                                    <div className="caption">Assign &amp; Downloads</div>
                                </li>
                            </ul>
                            <StepOne currentstep={this.state.currentstep} />
                            <StepTwo currentstep={this.state.currentstep} />
                            <StepThree currentstep={this.state.currentstep} />
                            <div className="mt-4">
                                {this.previousButton()}
                                {this.nextButton()}
                            </div>
                        </div>
                        {/* <SuccessMessage
                            show={this.state.modalShowOne}
                            onHide={() => this.setState({ modalShowOne: false })}
                        /> */}
                    </Col>
                </Row>
            </section>
        )
    }
}

export default CreateCustomQuestionStandardSection
