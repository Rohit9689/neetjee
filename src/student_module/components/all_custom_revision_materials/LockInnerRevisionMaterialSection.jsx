import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, Container, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import './_custom_revision_materials.scss';

import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import parse, { domToReact } from "html-react-parser";
import { withApollo } from "@apollo/client/react/hoc";
//import BottomScrollListener from 'react-bottom-scroll-listener';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import UserRestrictionAlert from '../home/UserRestrictionAlert';
class LockInnerRevisionMaterialSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            userRestionModalShow: false,
        }
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        decdata = decdata.replace(/font-family/g, "ff");

        return decdata;
    }
    modalFunction=()=>{
        if(this.props.type!="default"){
            this.setState({ userRestionModalShow: true })
        }
        
    }
    render() {
        return (

            <Col key={this.props.item.id} xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={12} sm={12} xs={12} >
                <a

                    onClick={() =>this.modalFunction()}
                    className="text-dark text-decoration-none" >
                    {/* <Card className="single_concept mb-4"> */}
                    <Card className={`single_concept mb-4 lock`}>
                        {/* <i className="lock-icon fad fa-lock-alt"/> */}
                        {this.props.type=="default"?(""):(
                            <Image src={require('../../../images/locked.png')} className="lock-icon" width="30" alt="locked image" />
                        )}

                        
                        <Card.Header className="d-flex justify-content-between align-this.props.items-center border-0 py-2 px-3 bg-white">
                            <div className="d-flex align-this.props.items-center">
                                <div className="icon_area">
                                    <Image src={this.props.item.content_image} alt="material-img" width="25" />
                                </div>
                                <Card.Title className="h6 mb-0 ml-3">{this.props.item.title}</Card.Title>
                            </div>
                            <ul className="helpTags list-inline m-0 p-0">
                                
                                {this.props.item.stared == true ? (
                                    <li className="list-inline-this.props.item">
                                        <i
                                            title="star"
                                            className="fas fa-star text-warning"
                                        />
                                    </li>
                                ) : (
                                        <li className="list-inline-this.props.item">
                                            <i title="star" className="fal fa-star" />
                                        </li>
                                    )}
                                {this.props.item.bookmarked == true ? (
                                    <li className="list-inline-this.props.item">
                                        <i className="fas fa-bookmark text-success" />
                                    </li>
                                ) : (
                                        <li className="list-inline-this.props.item">
                                            <i className="fal fa-bookmark" />
                                        </li>
                                    )}
                            </ul>
                        </Card.Header>
                        <Card.Body className="pt-2">
                            <Card.Text>{parse(this.decodefun(this.props.item.description))}</Card.Text>
                        </Card.Body>
                    </Card>
                </a>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Col>




        )
    }
}

export default withRouter(LockInnerRevisionMaterialSection);