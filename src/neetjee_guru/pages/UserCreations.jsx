import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader';
import UserCreationSection from '../components/settings/user_creations/UserCreationSection';
import Footer from '../components/footer/Footer';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        subjects{
            id
            subject
            chapters{
                id
                chapter
                topics{
                    id
                    topic
                    
                }
                class
            }
        }
        questionTypes{
            id
            questiontype
        }
        questionTheory{
            id
            question_theory
        }
    }
}

`;

class UserCreations extends Component {
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
        if (Cookies.get("token") == undefined) this.props.history.push("/login");
        console.log("currentState", this.state);
        const globals = this.props.globals;
        const loading3 = globals.loading;
        const error3 = globals.error;

        if (loading3) return <PreloaderTwo />;
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="left-side-menu">
                    <SideNavbar onClick={() => this.menuToggler()} />
                </div>
                <div className="content-page">
                    
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    <div className="main-content">
                        <UserCreationSection globals={globals.globals} />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}


export default compose(
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }), name: "globals"
        }))
    (UserCreations);
