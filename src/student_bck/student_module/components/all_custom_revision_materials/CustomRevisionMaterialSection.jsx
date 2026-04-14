import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Popover, OverlayTrigger, Button, Container, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import ConceptsData from './ConceptData';
import './_custom_revision_materials.scss';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import InnerRevisionMaterialSection from "./InnerRevisionMaterialSection";
import PreloaderTwo from '../preloader/PreloaderTwo';
const FETCH_CUSTOM_DATA = gql` 
query($params: RevisionMaterialInput) {
    getStudentRevisionMaterial(params: $params){
                        id
                        subject
                        title
                        description
                        content_type
                        video_link
                        file
                        topic
                        chapter
                        chapter_name
                        topic_name
                        bookmarked
                        stared
                        star_count
                        bookmark_count
                        total_views
                        your_views
                        content_image
                        notes{
                            tags
                            comments
                        }
                    
                }
        
     }


`;
class CustomRevisionMaterialSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log("rrrrrr", "mobile:", Cookies.get("mobile"),
            "content_type:", this.props.stateData.contentType,
            "subject_id:", parseInt(this.props.stateData.subjectsearch),
            "chapter_ids:", this.props.stateData.chaptersearch.toString(),
            "topic_id:", parseInt(this.props.stateData.topicsearch),
            "class_id:", parseInt(this.props.stateData.classsearch),
            "page:", parseInt(this.props.stateData.page));
        const getStudentRevisionMaterial = this.props.getStudentRevisionMaterial;
        const loading5 = getStudentRevisionMaterial.loading;
        const error5 = getStudentRevisionMaterial.error;
        if (loading5) return <PreloaderTwo />
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        console.log("getStudentRevisionMaterial.getStudentRevisionMaterial",getStudentRevisionMaterial.getStudentRevisionMaterial);

        return (

            <InnerRevisionMaterialSection
                stateData={this.props.stateData}
                getStudentRevisionMaterial={getStudentRevisionMaterial.getStudentRevisionMaterial} />

        )
    }
}

export default withRouter(compose(

    graphql(FETCH_CUSTOM_DATA,
        {
            options: props => ({
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        content_type: props.stateData.contentType,
                        subject_id: parseInt(props.stateData.subjectsearch),
                        chapter_ids: props.stateData.chaptersearch.toString(),
                        topic_id: parseInt(props.stateData.topicsearch),
                        class_id: parseInt(props.stateData.classsearch),
                        page: parseInt(props.stateData.page)
                    }

                }
                ,
                fetchPolicy: "cache-and-network"
            }), name: "getStudentRevisionMaterial"
        })
)(CustomRevisionMaterialSection));