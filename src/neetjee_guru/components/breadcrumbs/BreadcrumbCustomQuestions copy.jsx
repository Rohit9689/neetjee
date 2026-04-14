import React, { Component } from 'react'

class BreadcrumbCustomQuestions extends Component {
    render() {
        console.log("categoryData", this.props.categoryData);
        return (
            <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4">
                <h2 className="title h5 mb-0">{this.props.categoryData.location.state.section_category}</h2>
                <div className="d-md-flex mt-2">
                    <div className="ClassSectionTotalStudents mr-3">
                        Class -{this.props.categoryData.location.state.class_id_values},
                        Section - {this.props.categoryData.location.state.section_id_values}</div>
                    <div className="complexity mr-3"><strong>Complexity:</strong> Difficulty {this.props.categoryData.location.state.difficult}%, Moderate   {this.props.categoryData.location.state.moderate}%, Easy{this.props.categoryData.location.state.easy}%</div>
                </div>
            </div>
        )
    }
}

export default BreadcrumbCustomQuestions
