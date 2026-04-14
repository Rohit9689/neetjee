import React, { Component } from 'react'
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../../preloader/PreloaderTwo';
import ScrollInstituteVideosSection from './ScrollInstituteVideosSection';


const FETCH_VIDEOS = gql`
  query($params: VideosInput) {
    getVideos(
      params: $params
    ) {
      videoDetails{
        totalVideos
        videosList{
          id
          paid_video
          title
          subject
          class
          chapter
          description
          video_url
          vimeo_url
          subjectName
          ChapterName
          topicName
          likes
          dislikes
          views
          is_purchased
          thumbnail
          video_id
          created_timestamp
          pdf_file
        }
      }
      }
  }
`;

export class InstituteVideosSection extends Component {
  render() {
    const getInsVideos = this.props.getInsVideos;
    const loading1 = getInsVideos.loading;
    const error1 = getInsVideos.error;
    if (loading1) return <PreloaderTwo />;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    // console.log("getInsVideos.getInsVideos", getInsVideos.getVideos, "params:", {
    //   mobile: Cookies.get("mobile"),
    //   exam: parseInt(Cookies.get("examid")),
    //   class1: 0,
    //   subject: parseInt(this.props.ComponentParams.subject),
    //   chapter: parseInt(this.props.ComponentParams.chapter),
    //   institute_id: parseInt(Cookies.get("institute_id")),
    //   page: 1
    // });
    let globalsubjects = "";
    if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
      globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
    }
    else {
      this.props.history.push("/student/login");
    }
    return (
      <ScrollInstituteVideosSection
      ComponentParams={this.props.ComponentParams}
      stateData={this.props.stateData}
        globalsubjects={globalsubjects}
        defaultActiveKey={this.props.defaultActiveKey}
        getVideos={getInsVideos.getVideos}
        getChapterId={this.props.getChapterId}
        page="1" />
    )
  }
}



export default compose(

  graphql(FETCH_VIDEOS, {
    options: (props) => ({
      variables: {
        params: {
          mobile: Cookies.get("mobile"),
          exam: parseInt(Cookies.get("examid")),
          class1: 0,
          subject: parseInt(props.ComponentParams.subject),
          chapter: props.ComponentParams.chapter,
          institute_id: parseInt(Cookies.get("institution_id")),
          page: 1
        }


      },
      fetchPolicy: 'no-cache'
    }),
    name: "getInsVideos",
  }))(InstituteVideosSection);
