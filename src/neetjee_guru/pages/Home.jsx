import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import HomeSection from '../components/home/HomeSection';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import moment from "moment";

const GET_GLOBALS = gql`
 query($institution_id: Int!,$userName: String) {
          globals(institution_id: $institution_id,userName: $userName) {
            organisationDropdown{
              id
              group_name
            }
            cities{
              id
              city_name
            }
            regions{
              id
              region
            }
            globalBranches{
              id
              branch_name
              section_count
            }
            globalSections{
              id
              branch_id
              section_name
              exam_id
            }
            globalCategories{
              id
              category_name
            }
            classes{
              id
              class
            }
            exams{
              id
              exam
              exam_subjects{
                subject_id
              }
          }
            subjects{
              id
              subject
            }
            testNames{
     id
     exam_name
   }
   testTypes{
     id
     type
   }
          }
        }
`;
class Home extends Component {
  constructor(props) {
    super(props)
    // let start = moment(new Date())
    //   .subtract(5, "days");
   // console.log("Home", this.props);
    let start = moment(new Date()).subtract(1, "week");
    let end = moment(new Date());

    let sdate = String(start._d);
    var sres = sdate.substr(4, 11);

    let edate = String(end._d);
    var eres = edate.substr(4, 20);

    let startDate = sres +" 00:00:00";
    let endDate = eres;

    this.state = {
      etesttype: "",
      etesttypeValue: "",

      eclass: "",
      eclassValue: "",

      ecategory: "",
      ecategoryValue: "",

      eregion: "",
      eregionValue: "",

      ecluster: "",
      eclusterValue: "",

      elocation: "",
      elocationValue: "",

      ebranch: "",
      ebranchValue: "",
      esection: "0",
      esectionValue: "",
      etestname: "0",
      etestnameValue: "",
      eexamptype: "1",
      eexamptypeValue: { value: "1", label: "NEET" },
      dtypeValue: { value: "1", label: "Practice" },
      dtype: "1",
      branchValue: "",
      branch: "0",
      sectionValue: "",
      section: "0",
      examtype: "1",
      examtypeValue: { value: "1", label: "NEET" },
      class: "0",
      classValue: "",
      studentData: "",
      practise: "1",
      practiseValue: { value: "2", label: "Value" },

      BreadcrumbData: {
        Title: 'Monitoring Dashboard'
      },
      TableHeaderData: {
        Title: 'Students'
      },
      timeseries: 1,
      startDate: startDate,
      endDate: endDate,

    }
  }
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
  handleMultipleSelectInputChange = (e, name) => {
    console.log("handleMultipleSelectInputChange", e, name);
    if (name == "etesttype") {
      let etesttype = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const etesttypeval = e[i];
          etesttype.push(etesttypeval.value);
        }
        this.setState({
          etesttype: etesttype
        });
      }
    }
    else if (name == "etestname") {
      let etestname = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const etestnameval = e[i];
          etestname.push(etestnameval.value);
        }
        this.setState({
          etestname: etestname
        });
      }
    }
    else if (name == "eclass") {
      let eclass = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eclassval = e[i];
          eclass.push(eclassval.value);
        }
        this.setState({
          eclass: eclass
        });
      }
    }
    else if (name == "ecategory") {
      console.log("ecategory");
      let ecategory = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const ecategoryval = e[i];
          ecategory.push(ecategoryval.value);
        }
        this.setState({
          ecategory: ecategory
        });
      }
    }
    else if (name == "elocation") {
      let elocation = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const elocationval = e[i];
          elocation.push(elocationval.value);
        }
        this.setState({
          elocation: elocation
        });
      }
    }
    else if (name == "eregion") {
      let eregion = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eregionval = e[i];
          eregion.push(eregionval.value);
        }
        this.setState({
          eregion: eregion
        });
      }
    }
    else if (name == "ecluster") {
      let ecluster = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eclusterval = e[i];
          ecluster.push(eclusterval.value);
        }
        this.setState({
          ecluster: ecluster
        });
      }
    }
    else if (name == "ebranch") {
      let ebranch = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const ebranchval = e[i];
          ebranch.push(ebranchval.value);
        }
        this.setState({
          ebranch: ebranch
        });
      }
    }
    else if (name == "esection") {
      let esection = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const esectionval = e[i];
          esection.push(esectionval.value);
        }
        this.setState({
          esection: esection
        });
      }
    }

  };
  selecthandleInputChange = (ename, evalue) => {
    const name = ename;
    const value = evalue;
    if (name == "branch") {
      if (value != "0") {
        let branchData = this.props.globals.globals.globalBranches.find((a) => a.id == value);
        this.setState({
          branchValue: {
            value: branchData.id,
            label: branchData.branch_name
          },
          section: "0",
          sectionValue: ""
        });
      } else {
        this.setState({
          branchValue: {
            value: "0",
            label: "Select"
          },
          section: "0",
          sectionValue: ""
        });
      }

    }

    if (name == "ebranch") {
      if (value != "0") {
        let ebranchData = this.props.globals.globals.globalBranches.find((a) => a.id == value);
        this.setState({
          ebranchValue: {
            value: ebranchData.id,
            label: ebranchData.branch_name
          }
        });
      } else {
        this.setState({
          ebranchValue: {
            value: "0",
            label: "Select"
          }
        });
      }

    }
    if (name == "section") {
      if (value != "0") {
        let sectionData = this.props.globals.globals.globalSections.find((a) => a.id == value);
        this.setState({
          sectionValue: {
            value: sectionData.id,
            label: sectionData.section_name
          }
        });
      } else {
        this.setState({
          sectionValue: {
            value: "0",
            label: "Select"
          }
        });
      }

    }
    if (name == "esection") {
      if (value != "0") {
        let esectionData = this.props.globals.globals.globalSections.find((a) => a.id == value);
        this.setState({
          esectionValue: {
            value: esectionData.id,
            label: esectionData.section_name
          }
        });
      } else {
        this.setState({
          esectionValue: {
            value: "0",
            label: "Select"
          }
        });
      }

    }

    if (name == "etestname") {
      if (value != "0") {
        let etestnameData = this.props.globals.globals.testNames.find((a) => a.id == value);
        this.setState({
          etestnameValue: {
            value: etestnameData.id,
            label: etestnameData.exam_name
          }
        });
      } else {
        this.setState({
          etestnameValue: {
            value: "0",
            label: "Select"
          }
        });
      }

    }

    if (name == "etesttype") {
      if (value != "0") {
        let etesttypeData = this.props.globals.globals.testTypes.find((a) => a.id == value);
        this.setState({
          etesttypeValue: {
            value: etesttypeData.id,
            label: etesttypeData.type
          }
        });
      } else {
        this.setState({
          etesttypeValue: {
            value: "0",
            label: "Select"
          }
        });
      }

    }
    if (name == "eclass") {
      if (value != "0") {
        let eclassData = this.props.globals.globals.classes.find((a) => a.id == value);
        this.setState({
          eclassValue: {
            value: eclassData.id,
            label: eclassData.class
          }
        });
      }
      else {
        this.setState({
          eclassValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    if (name == "ecategory") {
      if (value != "0") {
        let ecategoryData = this.props.globals.globals.globalCategories.find((a) => a.id == value);
        this.setState({
          ecategoryValue: {
            value: ecategoryData.id,
            label: ecategoryData.category_name
          }
        });
      }
      else {
        this.setState({
          ecategoryValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    if (name == "elocation") {
      if (value != "0") {
        let elocationData = this.props.globals.globals.organisationDropdown.find((a) => a.id == value);
        this.setState({
          elocationValue: {
            value: elocationData.id,
            label: elocationData.group_name
          }
        });
      }
      else {
        this.setState({
          elocationValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    if (name == "eregion") {
      if (value != "0") {
        let eregionData = this.props.globals.globals.regions.find((a) => a.id == value);
        this.setState({
          eregionValue: {
            value: eregionData.id,
            label: eregionData.region
          }
        });
      }
      else {
        this.setState({
          eregionValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }
    if (name == "ecluster") {
      if (value != "0") {
        let eclusterData = this.props.globals.globals.cities.find((a) => a.id == value);
        this.setState({
          eclusterValue: {
            value: eclusterData.id,
            label: eclusterData.city_name
          }
        });
      }
      else {
        this.setState({
          eclusterValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }
    if (name == "class") {
      if (value != "0") {
        let classData = this.props.globals.globals.classes.find((a) => a.id == value);
        this.setState({
          classValue: {
            value: classData.id,
            label: classData.class
          }
        });
      }
      else {
        this.setState({
          classValue: {
            value: "0",
            label: "Select"
          }
        });
      }
    }

    if (name == "eexamptype") {
      let eexamptypeData = this.props.globals.globals.exams.find((a) => a.id == value);
      this.setState({
        eexamptypeValue: {
          value: eexamptypeData.id,
          label: eexamptypeData.exam
        }
      });
    }
    if (name == "examtype") {
      let examtypeData = this.props.globals.globals.exams.find((a) => a.id == value);
      this.setState({
        examtypeValue: {
          value: examtypeData.id,
          label: examtypeData.exam
        }
      });
    }
    if (name == "practise") {
      if (value == "1") {
        this.setState({
          practiseValue: {
            value: value,
            label: "Value"
          }
        });
      }
      else {
        this.setState({
          practiseValue: {
            value: value,
            label: "Percentage"
          }
        });
      }

    }

    if (name == "dtype") {
      if (value == "1") {
        this.setState({
          dtypeValue: {
            value: value,
            label: "Practice"
          }
        });
      }
      else {
       
        //this.props.history.push("/home-exam");
        this.props.history.push({
          pathname:"/home-exam", 
          state:{
            globals:this.props.globals.globals.testTypes

        }});
      }

    }
    this.setState({ [name]: value });
  }
  applyCallback = (startDate, endDate) => {
    console.log("applyCallback", startDate, endDate);
    let sdate = String(startDate._d);
    var sres = sdate.substr(4, 20);

    let edate = String(endDate._d);
    var eres = edate.substr(4, 20);
    this.setState({
      startDate: sres,
      endDate: eres
    });
  }
  componentDidMount=()=>{
    console.log("componentDidMount999",this.props.globals);
  }
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    //if (this.state.dtype != "1") this.props.history.push("/home-exam");
    
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;
    if (loading1) return <PreloaderTwo />;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
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
            <HomeSection
              //stateData={this.state}
              globals={globals.globals}
              //applyCallback={this.applyCallback}
              //selecthandleInputChange={this.selecthandleInputChange}
              //handleMultipleSelectInputChange={this.handleMultipleSelectInputChange} 
              />
          </div>
          <Footer />
        </div>
        </div>
    );
  }
}


export default withRouter(
  compose(
    graphql(
      GET_GLOBALS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
            userName:Cookies.get("username")
          },
          fetchPolicy: 'network-only'
        }),
        name: "globals"
      }
    )
  )(Home)
);
