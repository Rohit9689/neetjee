import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import HomeSectionExam from '../components/home/HomeSectionExam';
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
              region_id
            }
            regions{
              id
              region
            }
            globalBranches{
              id
              branch_name
              exam_id
              organisation_structure_id
            }
            globalSections{
              id
              section_name
              branch_id
              exam_id
              category_id
            }
            globalCategories{
              id
              category_name
              exam_id
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
     type
     exam_type
     is_completed
     start_time
     end_time
   }
   testTypes{
     id
     type
   }
          }
        }
`;
class HomeExam extends Component {
  constructor(props) {
    super(props)
    // let start = moment(new Date())
    //   .subtract(5, "days");
    let start = moment(new Date()).subtract(1, "week");
    let end = moment(new Date());

    let sdate = String(start._d);
    console.log("sdatesdate",sdate);
    var sres = sdate.substr(4, 11);
    console.log("sressres",sres);

    let edate = String(end._d);
    var eres = edate.substr(4, 20);

    let startDate = sres +" 00:00:00";
    let endDate = eres;
    console.log("lolglobals",props.history.location.state.examsglobals[0]);
   let etesttype= [];
   let etesttypevalue= [];
    props.history.location.state.globals.map((item) => {
      if (item != undefined) {
          const newObj = {
              value: item.id,
              label: item.type,
          }
          etesttypevalue.push(newObj);
          etesttype.push(item.id);
      }

  })

    this.state = {
      etesttype: etesttype,
      etesttypevalue: etesttypevalue,
      eclass: [],
      eclassvalue: [],

      ecategory: [],
      ecategoryvalue: [],

      eregion: [],
      eregionvalue: [],

      ecluster: [],
      eclustervalue: [],

      elocation: [],
      elocationvalue: [],

      ebranch: [],
      ebranchvalue: [],

      esection: "0",
      esectionValue: {value:"0",label:"Select All"},
      etestname: "0",
      etestnameValue: {value:"0",label:"Select All"},
      eexamptype: props.history.location.state.examsglobals[0].id,
      eexamptypeValue: { value: props.history.location.state.examsglobals[0].id, label: props.history.location.state.examsglobals[0].exam },
      dtypeValue: { value: "2", label: "Exam" },
      dtype: "2",
      studentData: "",
      BreadcrumbData: {
        Title: 'Monitoring Dashboard'
      },
      TableHeaderData: {
        Title: 'Students'
      },
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
      let etesttypevalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const etesttypeval = e[i];
          const newObj = {
            label: etesttypeval.label,
            value: etesttypeval.value
          }
          etesttypevalue.push(newObj);
          etesttype.push(etesttypeval.value);
        }
        this.setState({
          etesttypevalue: etesttypevalue,
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
      let eclassvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eclassval = e[i];
          const newObj = {
            label: eclassval.label,
            value: eclassval.value
          }
          eclassvalue.push(newObj);
          eclass.push(eclassval.value);
        }
        this.setState({
          eclass: eclass,
          eclassvalue: eclassvalue
        });
      }
    }
    else if (name == "ecategory") {
      console.log("ecategory");
      let ecategory = Array();
      let ecategoryvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const ecategoryval = e[i];
          const newObj = {
            label: ecategoryval.label,
            value: ecategoryval.value
          }
          ecategoryvalue.push(newObj);
          ecategory.push(ecategoryval.value);
        }
        this.setState({
          ecategory: ecategory,
          ecategoryvalue: ecategoryvalue
        });
      }
    }
    else if (name == "elocation") {
      let elocation = Array();
      let elocationvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const elocationval = e[i];

          const newObj = {
            label: elocationval.label,
            value: elocationval.value
          }
          elocationvalue.push(newObj);
          elocation.push(elocationval.value);
        }
        this.setState({
          elocation: elocation,
          elocationvalue: elocationvalue
        });
      }
    }
    else if (name == "eregion") {
      let eregion = Array();
      let eregionvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eregionval = e[i];

          const newObj = {
            label: eregionval.label,
            value: eregionval.value
          }
          eregionvalue.push(newObj);
          eregion.push(eregionval.value);
        }
        this.setState({
          eregion: eregion,
          eregionvalue: eregionvalue
        });
      }
    }
    else if (name == "ecluster") {
      let ecluster = Array();
      let eclustervalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const eclusterval = e[i];
          const newObj = {
            label: eclusterval.label,
            value: eclusterval.value
          }
          eclustervalue.push(newObj);
          ecluster.push(eclusterval.value);
        }
        this.setState({
          ecluster: ecluster,
          eclustervalue: eclustervalue
        });
      }
    }
    else if (name == "ebranch") {
      let ebranch = Array();
      let ebranchvalue = Array();
      if (e != null) {
        for (let i = 0; i < e.length; i++) {
          const ebranchval = e[i];
          const newObj = {
            label: ebranchval.label,
            value: ebranchval.value
          }
          ebranchvalue.push(newObj);
          ebranch.push(ebranchval.value);
        }
        this.setState({
          ebranch: ebranch,
          ebranchvalue: ebranchvalue
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
    console.log("selecthandleInputChange", ename, evalue);
    const name = ename;
    const value = evalue;
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
            label: "Select All"
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
            label: etestnameData.exam_name,
            start_time:etestnameData.start_time
          }
        });
      } else {
        this.setState({
          etestnameValue: {
            value: "0",
            label: "Select All"
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
    if (name == "eexamptype") {
      let eexamptypeData = this.props.globals.globals.exams.find((a) => a.id == value);
      console.log("eexamptypeData123",eexamptypeData);
//for default test
      let etesttype1= [];
      let etesttypevalue1= [];
      this.props.globals.globals.testTypes.map((item) => {
         if (item != undefined) {
             const newObj = {
                 value: item.id,
                 label: item.type,
             }
             etesttypevalue1.push(newObj);
             etesttype1.push(item.id);
         }
   
     })
// for end

      this.setState({
        eexamptypeValue: {
          value: eexamptypeData.id,
          label: eexamptypeData.exam
        },
        etesttype: etesttype1,
        etesttypevalue: etesttypevalue1,
        eclass: [],
        eclassvalue: [],
        ecategory: [],
        ecategoryvalue: [],

        eregion: [],
        eregionvalue: [],

        ecluster: [],
        eclustervalue: [],

        elocation: [],
        elocationvalue: [],

        ebranch: [],
        ebranchvalue: [],

        esection: "0",
        esectionValue: {value:"0",label:"Select All"},
        etestname: "0",
        etestnameValue: {value:"0",label:"Select All"}
      });
    }
    // if (name == "examtype") {
    //   let examtypeData = this.props.globals.globals.exams.find((a) => a.id == value);
    //   this.setState({
    //     examtypeValue: {
    //       value: examtypeData.id,
    //       label: examtypeData.exam
    //     }
    //   });
    // }
    // if (name == "practise") {
    //   if (value == "1") {
    //     this.setState({
    //       practiseValue: {
    //         value: value,
    //         label: "Value"
    //       }
    //     });
    //   }
    //   else {
    //     this.setState({
    //       practiseValue: {
    //         value: value,
    //         label: "Percentage"
    //       }
    //     });
    //   }

    // }

    if (name == "dtype") {
      if (value == "1") {
        // this.setState({
        //   dtypeValue: {
        //     value: value,
        //     label: "Practice"
        //   }
        // });
        this.props.history.push("/");
      }
    }
    // if (name == "esection" || name == "etestname") {
    //   if (value == "0") {
    //     this.setState({ [name]: "" });
    //   }
    //   else {
    //     this.setState({ [name]: value });
    //   }

    // }
    // else {
    this.setState({ [name]: value });
    //}

  }
  applyCallback = (startDate, endDate) => {
    console.log("applyCallback", startDate, endDate);
    let sdate = String(startDate._d);
    var sres = sdate.substr(4, 20);

    let edate = String(endDate._d);
    var eres = edate.substr(4, 20);
    this.setState({
      startDate: sres,
      endDate: eres,
      etestname: "0",
      etestnameValue: {value:"0",label:"Select All"},
      etesttype: [],
      etesttypevalue: []
    });
  }
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    //if (this.state.dtype != "2") this.props.history.push("/");
    console.log("currentstate", this.state);
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;
    if (loading1) return <PreloaderTwo />;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    console.log("institutionid", Cookies.get("institutionid"));
    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          <NavbarOne onClick={() => this.menuToggler()} />
          <div className="overlay" onClick={() => this.menuToggler()} />
          <div className="main-content">
            <HomeSectionExam
              stateData={this.state}
              globals={globals.globals}
              applyCallback={this.applyCallback}
              selecthandleInputChange={this.selecthandleInputChange}
              handleMultipleSelectInputChange={this.handleMultipleSelectInputChange} />

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
  )(HomeExam)
);
