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
class ActionRevisionMaterialGroups extends Component {
    
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
     };
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;
        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }

        const getStudentMaterialCount = this.props.getStudentMaterialCount;
        const loading6 = getStudentMaterialCount.loading;
        const error6 = getStudentMaterialCount.error;
        if (error6 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        let newobj = ""
        if (getStudentMaterialCount.getStudentMaterialCount != undefined) {
            const Data = getStudentMaterialCount.getStudentMaterialCount.subjects_counts.map((item) => {
                if (item != undefined) {
                    const singleSubject = globalsubjects.find((a) => a.id == item.id);

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
            //console.log("DataData",newobj);
            //console.log("getStudentMaterialCount12345", getStudentMaterialCount.getStudentMaterialCount);
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

        }


        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper bg-white">
                    {(loading5 == true || loading6 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper px-xl-3 px-lg-3">
                        {
                            !loading5 && !loading6 && (
                                <RevisionMaterialGroupSection
                                    globalsubjects={globalsubjects}
                                    isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                    getStudentMaterialCount={newobj} />
                            )}

                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(compose(

    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: "cache-and-network"
            }), name: "isStudentUserValid"
        }),
    graphql(FETCH_REVISIONMATERIAL_GROUP,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getStudentMaterialCount"
        })
)(ActionRevisionMaterialGroups));
