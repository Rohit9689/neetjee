import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Card, Image, Button } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import logo from '../../../images/logo.svg'

import './_navbars.scss'
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class ExamHistoryAsideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    classNameFunction(data) {
        console.log("classNameFunction", data);
        let cname = "list-inline-item";

        if (data.status == 2) {
            cname = "list-inline-item attempted";
        }
        else if (data.status == 1) {
            cname = "list-inline-item views";
        }
        else if (data.status == 0) {
            cname = "list-inline-item bookmark";
        }




        //console.log("cname", cname);
        return cname;

    }


    render() {
        const lqlength = this.props.stateData.questions.length - 1;
        return (
            <div id="examAsidebar" className="exam-asidebar">
                <div className="sidebar-header px-3 py-2">
                    <Link to="/student/home">
                        {/* <Image className="logo" src={logo} width="100" alt="Image" /> */}
                        <img loading='lazy' width="150" height="43" className='mt-2' src='https://entrolabs.com/assets/logo/logo-black.png' alt='logo '/>

                    </Link>
                </div>
                <Scrollbars style={{ height: '90vh' }}
                    renderThumbVertical={renderThumb}
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}>
                    <div className="questionnor_block m-3">
                        <div className="d-flex justify-content-between mb-2 text-dark">
                            <h6>Questions</h6>
                            <h6>{this.props.stateData.questions.length}</h6>
                        </div>
                        <Scrollbars style={{ height: 400 }}
                            renderThumbVertical={renderThumb}
                            autoHide
                            autoHideTimeout={500}
                            autoHideDuration={200}>
                            <ul className="questionNos list-inline">
                                {this.props.stateData.questions.map((Data, index) => (
                                    <li className={this.classNameFunction(Data)} onClick={(e) => this.props.psideQFun(index)}>{this.idFunction(index)}</li>
                                ))}
                            </ul>
                        </Scrollbars>
                        <div className="mark_status mt-4 d-flex justify-content-between align-items-center">
                            <Card onClick={()=>this.props.separationCounts("wrong")}
                            as={Card.Body} className={`single_mark special-indicate align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center ${this.props.stateData.wrong}`}>
                                <span className="icon_status views" />
                                <div className="status_name">Wrong</div>
                                <div className="status_count">{this.props.getData.wrong}</div>
                            </Card>
                            <Card as={Card.Body} 
                            onClick={()=>this.props.separationCounts("skip")}
                            className={`single_mark special-indicate align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center ${this.props.stateData.skip}`}>
                                <span className="icon_status bookmark" />
                                <div className="status_name">Skip</div>
                                <div className="status_count">{this.props.getData.not_answered}</div>
                            </Card>
                            <Card as={Card.Body} 
                            onClick={()=>this.props.separationCounts("correct")}
                            className={`single_mark special-indicate align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center ${this.props.stateData.correct}`}>
                                <span className="icon_status attempted" />
                                <div className="status_name">Correct</div>
                                <div className="status_count">{this.props.getData.correct}</div>
                            </Card>
                            <Card as={Card.Body} 
                            onClick={()=>this.props.separationCounts("all")}
                            className={`single_mark special-indicate align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center ${this.props.stateData.all}`}>
                                <span className="icon_status" />
                                <div className="status_name">All Q's</div>
                                <div className="status_count">{this.props.stateData.questions.length}</div>
                            </Card>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        )
    }
}

export default withRouter(ExamHistoryAsideBar)
