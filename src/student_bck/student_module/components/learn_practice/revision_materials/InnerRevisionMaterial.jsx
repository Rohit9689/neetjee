import React, { Component } from 'react'

import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import RevisionMaterialSection from "./RevisionMaterialSection";
const FETCH_CUSTOMCONTENT = gql`
  query($topicId: Int, $chapterId: Int, $mobile: String!, $page:Int) {
    getCustomContent(
      topicId: $topicId
      chapterId: $chapterId
      mobile: $mobile
      page:$page
    ) {
      id
      customcontent
      content {
        id
        subject
        title
        description
        video_link
        file
        topic
        chapter
        bookmarked
        stared
        notes{
          tags
          comments
        }
        total_views
        your_views
        star_count
        bookmark_count
      }
      image
      total_count
    }
  }
`;


class InnerRevisionMaterial extends Component {
    // constructor(props) {
    //     super(props)
    //     let defaultActiveKey = "first";
    //     console.log("props.getChapterId.defaultActiveKey", props.getChapterId.defaultActiveKey);
    //     if (props.getChapterId.defaultActiveKey != undefined) {
    //         defaultActiveKey = props.getChapterId.defaultActiveKey;
    //     }
    //     this.state = {
    //         defaultActiveKey: defaultActiveKey,
    //         page: 1
    //     }
    // }
    render() {
        const getCustomContent = this.props.getCustomContent;
    const loading1 = getCustomContent.loading;
    const error1 = getCustomContent.error;
    if (loading1) return <PreloaderTwo />;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    console.log("getCustomContent.getCustomContent", "topicId:", parseInt(this.props.getChapterId.otid),
    "chapterId:", parseInt(this.props.getChapterId.ocid),
    "mobile:", Cookies.get("mobile"),
    "page:",this.props.stateData.page, getCustomContent.getCustomContent);
        return (
            <RevisionMaterialSection
                stateData={this.props.stateData}
                getChapterId={this.props.getChapterId}
                getCustomContent={getCustomContent.getCustomContent} />
            

        )
    }
}

export default compose(
    graphql(FETCH_CUSTOMCONTENT, {
      options: (props) => ({
        variables: {
          topicId: parseInt(props.getChapterId.otid),
          chapterId: parseInt(props.getChapterId.ocid),
          mobile: Cookies.get("mobile"),
          page:props.stateData.page
        },
        fetchPolicy: 'no-cache'
      }),
      name: "getCustomContent",
    })) (InnerRevisionMaterial);
