import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import RevisionMaterialGroupSection from '../components/all_custom_revision_materials/RevisionMaterialGroupSection';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const FETCH_GET_SUBJECTS = gql`
  query($mobile: String) {
    getSubjects(mobile: $mobile) {
      id
      subject
      
      studentChapters {
        id
        chapter
        topics {
          id
          topic
         }
        class
        enabled
      }
    }
  }
`;

const FETCH_REVISIONMATERIAL_GROUP = gql` 
query($mobile: String) {
    getStudentMaterialCount(mobile: $mobile){
        subjects_counts{
            id
            count
            material_chapters{
                id
                topics{
                    id
                }
                content_counts{
                     id
                    count
                }
                class
            }
        }
        material_counts{
            id
            customcontent
            count
            image
        }
     }
}

`;
const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        user_access_restictions
        isTrialUser
        module_restrictions
        chapter_ids
     }
}

`;

class DefaultRevisionMaterialGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "default"
        }
    }
    componentDidMount() {
       window.addEventListener('contextmenu',
            event => event.preventDefault());
        // window.addEventListener("mousedown", e => {
        //     e.preventDefault();
        //     e.returnValue = "false";

        // });
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {
         window.removeEventListener('contextmenu', () => { });
        // window.removeEventListener("mousedown", () => { });
        window.removeEventListener("selectstart", () => { });

    }

    render() {

        const getSubjects = this.props.getSubjects;
        const loading1 = getSubjects.loading;
        const error1 = getSubjects.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        const getStudentMaterialCount = this.props.getStudentMaterialCount;
        const loading6 = getStudentMaterialCount.loading;
        const error6 = getStudentMaterialCount.error;


        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        if (error6 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        //console.log("getSubjects.getSubjects",this.props.getSubjects);

        let newobj = ""
        if (getStudentMaterialCount.getStudentMaterialCount != undefined && getSubjects.getSubjects != undefined) {
            const Data = getStudentMaterialCount.getStudentMaterialCount.subjects_counts.map((item) => {
                if (item != undefined) {
                    const singleSubject = getSubjects.getSubjects.find((a) => a.id == item.id);

                    const materialchapters = item.material_chapters.map((mitem) => {
                        if (mitem != undefined) {
                            const singleChapter = singleSubject.studentChapters.find((a) => a.id == mitem.id);
                            const topics = mitem.topics.map((tmap) => {
                                if (tmap != undefined) {
                                    const singleTopic = singleChapter.topics.find((a) => a.id == tmap.id);

                                    return { ...tmap, topic: singleTopic.topic }

                                }

                            })
                            return { ...mitem, chapter: singleChapter.chapter, topics: topics }
                        }

                    })
                    return { ...item, subject: singleSubject.subject, short_name: singleSubject.subject, material_chapters: materialchapters }

                }

            })
            newobj = { ...getStudentMaterialCount.getStudentMaterialCount, subjects_counts: Data }

            localStorage.setItem(
                "getStudentMaterialCount",
                JSON.stringify(newobj)
            );


        }
        if (isStudentUserValid.isStudentUserValid != undefined) {
            if (isStudentUserValid.isStudentUserValid.estatus == 0) {
                Cookies.remove("token");
                Cookies.remove("username");
                Cookies.remove("refreshtoken");
                Cookies.remove("email");
                Cookies.remove("id");
                Cookies.remove("institutionid");
                Cookies.remove("userlevel");
                Cookies.remove("name");
                this.props.history.push("/student/login");
            }
            localStorage.removeItem('isStudentUserValid');
            localStorage.setItem(
                "isStudentUserValid",
                JSON.stringify(isStudentUserValid.isStudentUserValid)
            );

            // Cookies.remove("examid");
            // Cookies.set("examid", "5");

            localStorage.removeItem('globalsubjects');
            Cookies.remove("mobile");
            Cookies.set("mobile", "9866667788");



        }
        if (getSubjects.getSubjects != undefined) {
            localStorage.setItem(
                "globalsubjects",
                JSON.stringify(getSubjects.getSubjects)
            );
        }


        return (

            <div className="main-wrapper bg-white">
                {(loading1 == true || loading5 == true || loading6 == true) && (<PreloaderTwo />)}

                <div className="content-wrapper px-xl-3 px-lg-3">
                    {
                        !loading1 && !loading5 && !loading6 && (
                            <RevisionMaterialGroupSection
                                type="default"
                                stateData={this.state}
                                globalsubjects={getSubjects.getSubjects}
                                isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                getStudentMaterialCount={newobj} />


                        )}

                </div>
            </div>

        )
    }
}



export default withRouter(compose(
    graphql(FETCH_GET_SUBJECTS, {
        options: (props) => ({
            variables: {
                mobile: "9866667788",
            }
            ,
            fetchPolicy: "no-cache"
        }),
        name: "getSubjects",
    }),

    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: "9866667788"
                }
                ,
                fetchPolicy: "cache-and-network"
            }), name: "isStudentUserValid"
        }),
    graphql(FETCH_REVISIONMATERIAL_GROUP,
        {
            options: props => ({
                variables: {
                    mobile: "9866667788"
                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getStudentMaterialCount"
        })
)(DefaultRevisionMaterialGroups));
