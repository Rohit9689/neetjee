import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import DataTableWithOutSearch from '../../datatables/DataTableWithOutSearch';
import { Data, Columns, defaultSorted } from './NotifyStudentTableData';
import NotifyStudentModal from "./NotifyStudentModal";
import NotifyStudentModalEdit from "./NotifyStudentModalEdit";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import './_notifystudent.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

const ADDNOTIFYSTUDENT = gql`
  mutation(
    $params:SendInstituteNotification  
    ) {
        sendInstituteNotification(
        params: $params
     )
  }
`;
const FETCH_NOTIFYSTUDENTS = gql` 
query($institution_id: Int!) {
    getInstituteNotificaton(institution_id: $institution_id){
        title
        description
        class_ids
        category_ids
        branch_ids
        section_ids
        timestamp
        
    }
}

`;
const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        classes{
            id
            class
        }
        globalBranches{
            id
            branch_name
        }
        globalSections{
            id
            section_name
            branch_id
            category_id
        }
        globalCategories{
            id
            category_name
        }
        
    }
}

`;
class UserCreationSection extends Component {
    constructor(props) {
        super(props)
        console.log("UserCreationSection", this.props);
        this.state = {
            tableHeaderData: {
                Title: 'Notification Table'
            },
            modalShow: false,
            modalShow1: false,
            //form field
            image: "",
            image_filename: "Choose File",
            formValid: false,
            currentStep: "1",
            submitError: "",
            classname: "",
            classnamevalue: "",
            branchvalue: [],
            branch: [],
            category: "",
            categoryvalue: "",
            sectionvalue: [],
            section: [],
            title: "",
            message: "",
            ldescription: "",
            formErrors: {
                classname: "",
                branch: "",
                category: "",
                section: "",
                title: "",
                message: "",
                ldescription: ""
            },
            classnameValid: true,
            branchValid: true,
            categoryValid: false,
            sectionValid: true,
            titleValid: false,
            messageValid: false,
            ldescriptionValid: false,



        }
    }

    parentStateSet = () => {
        this.setState({
            tableHeaderData: {
                Title: 'Notification Table'
            },
            modalShow: true,
            modalShow1: false,
            //form field
            formValid: false,
            currentStep: "1",
            submitError: "",
            classname: "",
            classnamevalue: "",
            branchvalue: [],
            branch: [],
            category: [],
            categoryvalue: [],
            // category: "",
            // categoryvalue: "",
            sectionvalue: [],
            section: [],
            title: "",
            message: "",
            ldescription: "",
            formErrors: {
                classname: "",
                branch: "",
                category: "",
                section: "",
                title: "",
                message: "",
                ldescription: ""
            },
            fullnameValid: false,
            classnameValid: false,
            branchValid: false,
            categoryValid: false,
            sectionValid: false,
            titleValid: false,
            messageValid: false,
            ldescriptionValid: false,
        });
    };
    handleMultipleSelectInputChange = (e, name) => {
        if (name == "branch") {
            let branch = Array();
            let branchvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const branchval = e[i];
                    const newObj = {
                        label: branchval.label,
                        value: branchval.value
                    }
                    branchvalue.push(newObj);
                    branch.push(branchval.value);
                }
                this.setState({
                    branch: branch,
                    branchvalue: branchvalue
                }, () => {
                    this.validateField(name, "1");
                });
            }
        }
        if (name == "category") {
            let category = Array();
            let categoryvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const categoryval = e[i];
                    const newObj = {
                        label: categoryval.label,
                        value: categoryval.value
                    }
                    categoryvalue.push(newObj);
                    category.push(categoryval.value);
                }
                this.setState({
                    category: category,
                    categoryvalue: categoryvalue
                }, () => {
                    this.validateField(name, "1");
                });
            }
        }
        if (name == "section") {
            let section = Array();
            let sectionvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const sectionval = e[i];
                    const newObj = {
                        label: sectionval.label,
                        value: sectionval.value
                    }
                    sectionvalue.push(newObj);
                    section.push(sectionval.value);
                }
                this.setState({
                    section: section,
                    sectionvalue: sectionvalue

                }, () => {
                    this.validateField(name, "1");
                });
            }
        }
    };

    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Cookies2", Cookies.get("username"));
        console.log("institutionid2", Cookies.get("institutionid"));

        if (this.state.formValid) {
            let notifystudentObj = "";
            let classn = [];
            if (this.state.classname == "0") {
                this.props.globals.globals.classes.map((item) => {
                    if (item != undefined) {
                        classn.push(item.id);
                    }
                });
            }
            else {
                classn = this.state.classname
            }
            notifystudentObj = {
                title: this.state.title,
                description: this.state.message,

                long_description: this.state.ldescription,
                image: "http://admin.rizee.in:81/files/" + this.state.image,
                class_ids: classn.toString(),
                category_ids: this.state.category.toString(),
                branch_ids: this.state.branch.toString(),
                section_ids: this.state.section.toString(),
                institution_id: parseInt(Cookies.get("institutionid"))

            };
            console.log("notifystudentObj", notifystudentObj);
            this.notifystudent(notifystudentObj).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error(
                    "ERR =>",
                    error.graphQLErrors.map(x => x.message)
                );
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    notifystudent = async params => {
        await this.props.notifystudent({
            variables: {
                params
            },
            update: (store, { data }) => {
                let data1 = store.readQuery({
                    query: FETCH_NOTIFYSTUDENTS,
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                });
                const newUser = {
                    //id: data.SendInstituteNotification,
                    branch_ids: this.state.branch.toString(),
                    category_ids: this.state.category.toString(),
                    class_ids: params.class_ids.toString(),
                    description: this.state.message,
                    section_ids: this.state.section.toString(),
                    title: this.state.title,
                    timestamp: moment().unix(),
                    __typename: "InstituteNotifications"


                };
                data1.getInstituteNotificaton.unshift(newUser);

                try {
                    store.writeQuery({
                        query: FETCH_NOTIFYSTUDENTS,
                        variables: {
                            institution_id: parseInt(Cookies.get("institutionid"))
                        },
                        data: data1
                    });
                } catch (e) {
                    console.log("Exception", e);
                }
                if (data.SendInstituteNotification != "") {
                    this.setState({
                        tableHeaderData: {
                            Title: 'Notification Table'
                        },
                        modalShow1: false,
                        //form field
                        formValid: false,
                        currentStep: "5",
                        submitError: "",
                        classname: "",
                        classnamevalue: "",
                        branchvalue: [],
                        branch: [],
                        category: "",
                        categoryvalue: "",
                        sectionvalue: [],
                        section: [],
                        title: "",
                        message: "",
                        ldescription: "",
                        formErrors: {
                            classname: "",
                            branch: "",
                            category: "",
                            section: "",
                            title: "",
                            message: "",
                            ldescription: ""
                        },
                        classnameValid: false,
                        branchValid: false,
                        categoryValid: false,
                        sectionValid: false,
                        titleValid: false,
                        messageValid: false,
                        ldescriptionValid: false
                    });

                    setTimeout(() => {
                        this.SetpageLoad();
                    }, 1500);
                }
            }
        });
    };
    SetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1, modalShow: false });
    };
    fileUpload(file, stream) {
        console.log("fileupload", file);

        const url = "http://admin.mylearningplus.in/mobile.php?uploadImage=true";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("stream", stream);
        const config = {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        };

        return axios.post(url, formData, config);
    }
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "image") {
            var file = e.target.files[0];
            let fileread = new FileReader();
            this.setState({
                image_filename: "Uploading...",
            });

            fileread.readAsDataURL(file);
            fileread.onload = async (e) => {
                console.log("Target", e.target);

                let fobj = {
                    stream: e.target.result,
                    filename: file.name,
                    mimetype: file.type,
                };

                const upload = await this.fileUpload(file, fobj.stream);
                console.log("file uploaded", upload);

                if (upload.data.result == "success") {
                    this.setState({ image: upload.data.filename });

                    this.setState({
                        image_filename: file.name,
                    });
                }
            };
        }
        else {
            this.setState({ [name]: value }, () => {
                this.validateField(name, value);
            });
        }




    };
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", this.props);
        const name = ename;
        const value = evalue;

        if (name == "classname") {
            if (value != "0") {
                let classnameData = this.props.globals.globals.classes.find((a) => a.id == value);
                this.setState({
                    classnamevalue: {
                        value: classnameData.id,
                        label: classnameData.class
                    }
                });
            }
            else {
                this.setState({
                    classnamevalue: {
                        value: "0",
                        label: "Select All"
                    }
                });
            }
        }
        if (name == "category") {
            if (value != "0") {
                let categoryData = this.props.globals.globals.globalCategories.find((a) => a.id == value);
                this.setState({
                    categoryvalue: {
                        value: categoryData.id,
                        label: categoryData.category_name
                    }
                });
            }
            else {
                this.setState({
                    categoryvalue: {
                        value: "0",
                        label: "Select"
                    }
                });
            }
        }
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let classnameValid = this.state.classnameValid;
        let branchValid = this.state.branchValid;
        let categoryValid = this.state.categoryValid;
        let sectionValid = this.state.sectionValid;
        let titleValid = this.state.titleValid;
        let messageValid = this.state.messageValid;
        let ldescriptionValid = this.state.ldescriptionValid;



        switch (fieldName) {
            case "classname":
                if (value.length == "") {
                    classnameValid = false;
                    fieldValidationErrors.classname = "class Cannot Be Empty";
                } else {
                    classnameValid = true;
                    fieldValidationErrors.classname = "";
                }

                break;

            case "branch":
                if (value.length == "") {
                    branchValid = false;
                    fieldValidationErrors.branch = "branch Cannot Be Empty";
                } else {
                    branchValid = true;
                    fieldValidationErrors.branch = "";
                }

                break;

            case "category":
                if (value.length == "") {
                    categoryValid = false;
                    fieldValidationErrors.category = "category Cannot Be Empty";
                } else {
                    categoryValid = true;
                    fieldValidationErrors.category = "";
                }

                break;

            case "section":
                if (value.length == "") {
                    sectionValid = false;
                    fieldValidationErrors.section = "section Cannot Be Empty";
                } else {
                    sectionValid = true;
                    fieldValidationErrors.section = "";
                }

                break;

            case "title":
                if (value.length == "") {
                    titleValid = false;
                    fieldValidationErrors.title = "Title Cannot Be Empty";
                } else {
                    titleValid = true;
                    fieldValidationErrors.title = "";
                }

                break;

            case "message":
                if (value.length == "") {
                    messageValid = false;
                    fieldValidationErrors.message = "Message Cannot Be Empty";
                } else {
                    messageValid = true;
                    fieldValidationErrors.message = "";
                }

                break;

            case "ldescription":
                if (value.length == "") {
                    ldescriptionValid = false;
                    fieldValidationErrors.ldescription = "long description Cannot Be Empty";
                } else {
                    ldescriptionValid = true;
                    fieldValidationErrors.ldescription = "";
                }

                break;

            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                classnameValid: classnameValid,
                branchValid: branchValid,
                categoryValid: categoryValid,
                sectionValid: sectionValid,
                titleValid: titleValid,
                messageValid: messageValid,
                ldescriptionValid: ldescriptionValid


            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid:
                // this.state.classnameValid
                // && this.state.branchValid
                this.state.categoryValid
                //&& this.state.sectionValid
                && this.state.titleValid
                && this.state.messageValid
                && this.state.ldescriptionValid

        });
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }

    articlecolumns = [
        {
            dataField: "title",
            text: "Title",
            sort: true
        }
        ,
        {
            dataField: "date",
            text: "Date",
            sort: true
        },
        {
            dataField: "time",
            text: "Time",
            sort: true
        },
        {
            dataField: "description",
            text: "Description",
            sort: true,
        },

        {
            dataField: "class",
            text: "Class",
            sort: true
        },

        {
            dataField: "branch",
            text: "Branch",
            sort: true
        },
        {
            dataField: "section",
            text: "Section",
            sort: true
        },
        {
            dataField: "category",
            text: "Category",
            sort: true
        }


    ];
    defaultSorted = [
        {
            dataField: "date",
            order: "desc"
        }
    ];
    tableUserData(notifystudent) {
        console.log("notifystudent", this.props);
        const newArray = [];
        //let classname="";

        notifystudent.map((mapdata) => {
            // let classnamefind = this.props.globals.globals.classes.find((item) => item.id == mapdata.class_ids);
            // let classname = "";
            // if (classnamefind != undefined) {
            //     classname = classnamefind.class
            // }
            // let categorynamefind = this.props.globals.globals.globalCategories.find((item) => item.id == mapdata.category_ids);
            // let categoryname = "";
            // if (categorynamefind != undefined) {
            //     categoryname = categorynamefind.category_name
            // }

            let getDataclass_ids = [];
            if (mapdata.category_ids != "") {

                let carray = mapdata.class_ids.split(",");
                carray.map((item) => {
                    let findclass = this.props.globals.globals.classes.find((a) => a.id == item);
                    if (findclass != undefined) {
                        getDataclass_ids.push(findclass.class);
                    }

                })

            }

            console.log("getDataclass_ids", getDataclass_ids);

            let getDatacategory_ids = [];
            if (mapdata.category_ids != "") {

                let carray = mapdata.category_ids.split(",");
                carray.map((item) => {
                    let findcategory = this.props.globals.globals.globalCategories.find((a) => a.id == item);
                    if (findcategory != undefined) {
                        getDatacategory_ids.push(findcategory.category_name);
                    }

                })

            }


            let getData = [];
            if (mapdata.branch_ids != "") {

                let barray = mapdata.branch_ids.split(",");
                barray.map((item) => {
                    let findbranch = this.props.globals.globals.globalBranches.find((a) => a.id == item);
                    if (findbranch != undefined) {
                        getData.push(findbranch.branch_name);
                    }

                })

            }

            let getDatasection = [];
            if (mapdata.section_ids != "") {

                let carray = mapdata.section_ids.split(",");
                carray.map((item) => {
                    let findsection = this.props.globals.globals.globalSections.find((a) => a.id == item);
                    if (findsection != undefined) {
                        getDatasection.push(findsection.section_name);
                    }

                })

            }
            const newObj = {
                branch_ids: mapdata.branch_ids,
                category_ids: mapdata.category_ids,
                class_ids: mapdata.class_ids,
                section_ids: mapdata.section_ids,
                branch: getData.toString(),
                category: getDatacategory_ids.toString(),
                class: getDataclass_ids.toString(),
                section: getDatasection.toString(),
                description: mapdata.description,
                title: mapdata.title,
                date: moment.unix(mapdata.timestamp).format("YYYY/MM/DD"),
                time: moment.unix(mapdata.timestamp).format("LT")
            }
            newArray.push(newObj);

        })
        return newArray;


    }
    onHideFun = (e) => {
        //console.log("m1");
        this.setState({ modalShow: false });
    }
    onHideFunEdit = (e) => {
        //console.log("m2");
        this.setState({ modalShow1: false });
    }
    handleEditorChange = (e) => {
        console.log("handleEditorChange", e.target.getContent());
        this.setState({
            ldescription: e.target.getContent()
        }, () => {
            this.validateField("ldescription", "1");
        });

    }
    render() {
        console.log("currentstate", this.state);
        const getInstituteNotificaton = this.props.getInstituteNotificaton;
        const loading3 = getInstituteNotificaton.loading;
        const error3 = getInstituteNotificaton.error;

        const globals = this.props.globals;
        const loading1 = globals.loading;
        const error1 = globals.error;

        if (loading3 || loading1) return <PreloaderTwo />;
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("getInstituteNotificaton", getInstituteNotificaton.getInstituteNotificaton);

        return (
            <React.Fragment>
                <div className="user-creation">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex align-items-center justify-content-between">
                                <h2 className="title font-weight-normal h5 mb-0">Notify Students</h2>
                                {this.state.modalShow == false ? (<Button className="btn btn-blue px-4" onClick={this.parentStateSet}>Send Notification</Button>) : ("")}
                            </div>
                            {this.state.modalShow == true ? (
                                <div className="mb-5">
                                <NotifyStudentModal
                                    handleEditorChange={this.handleEditorChange}
                                    handleMultipleSelectInputChange={this.handleMultipleSelectInputChange}
                                    globals={globals.globals}
                                    parenthandleFormSubmit={this.handleFormSubmit}
                                    parentselecthandleInputChange={this.selecthandleInputChange}
                                    ParenthandleInputChange={this.handleInputChange}
                                    show={this.state.modalShow}
                                    onHide1={this.onHideFun}
                                    stateData={this.state}
                                />
                                </div>
                            ) : ("")

                            }
                        </Col>

                        <Col xl={12} lg={12} md={12} sm={12} >
                            <div className="card-title mb-0 text-danger">
                                {this.state.status == 2 ? "User deleted successfully" : ""}
                            </div>
                            <DataTableWithOutSearch
                                parentData={this.tableUserData(
                                    getInstituteNotificaton.getInstituteNotificaton
                                )}
                                particlecolumns={this.articlecolumns}
                                tableHeading={this.state.tableHeaderData}
                                defaultSorted={this.defaultSorted}
                                name={this.state.tableHeaderData.Title}
                            />
                        </Col>
                    </Row>
                </div>


            </React.Fragment>
        )
    }
}

export default compose(
    graphql(FETCH_NOTIFYSTUDENTS,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }), name: "getInstituteNotificaton"
        }),
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }), name: "globals"
        }),
    graphql(ADDNOTIFYSTUDENT, {
        name: "notifystudent"
    }))
    (UserCreationSection);


