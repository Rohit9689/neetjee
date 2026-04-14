import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import DataTableWithOutSearch from '../../datatables/DataTableWithOutSearch';
import { Data, Columns, defaultSorted } from './UserCreationTableData';
import UserModal from "./UserModal";
import UserModalEdit from "./UserModalEdit";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import './_usercreation.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const ADDINSTITUTE_USER = gql`
  mutation(
    $params:InstituteUserInput  
    ) {
        addInstituteUser(
        params: $params
     )
  }
`;
const EDITINSTITUTE_USER = gql`
  mutation(
    $params:EditInstituteUserInput  
    ) {
        editInstituteUser(
        params: $params
     )
  }
`;
const DELETE_USER = gql`
  mutation(
    $id:ID  
    ) {
        deleteInstituteUser(
            id: $id
     )
  }
`;
const FETCH_GETINSTITUTEUSERS = gql` 
query($username:String!,$institution_id: Int!) {
    getInstituteUsers(username:$username, institution_id: $institution_id){
        id
        username
        password
        userlevel
        email
        mobile
        name
        class
        subject
        subject_name
        chapter_names
        chapter
        
    }
}

`;
class UserCreationSection extends Component {
    constructor(props) {
        super(props)
        console.log("UserCreationSection", this.props);
        this.state = {
            tableHeaderData: {
                Title: 'User Creation Table'
            },
            modalShow: false,
            modalShow1: false,
            //form field
            formValid: false,
            currentStep: "1",
            submitError: "",
            fullname: "",
            userid: "",
            username: "",
            email: "",
            password: "",
            mobile: "",
            usertype: "",
            usertypevalue: "",
            // subject: "",
            // subjectValue: "",
            subject: [],
            subjectvalue: [],
            class11: "1",
            class12: "",
            checked1: true,
            checked2: false,
            chapter: [],
            chaptervalue: [],
            formErrors: {
                fullname: "",
                username: "",
                email: "",
                password: "",
                mobile: "",
                usertype: "",
                subject: "",
                class11: "1",
                class12: "",
            },
            fullnameValid: false,
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            mobileValid: false,
            usertypeValid: false,
            subjectValid: true,
            class11Valid: true,
            class12Valid: false,
            status: 1,
        }
    }

    parentStateSet = () => {
        console.log("sreee");
        this.setState({
            tableHeaderData: {
                Title: 'User Creation Table'
            },
            modalShow: true,
            modalShow1: false,
            //form field
            formValid: false,
            currentStep: "1",
            submitError: "",
            fullname: "",
            userid: "",
            username: "",
            email: "",
            password: "",
            mobile: "",
            usertype: "",
            usertypevalue: "",
            // subject: "",
            // subjectValue: "",
            subject: [],
            subjectvalue: [],
            class11: "1",
            class12: "",
            checked1: true,
            checked2: false,
            chapter: [],
            chaptervalue: [],
            formErrors: {
                fullname: "",
                username: "",
                email: "",
                password: "",
                mobile: "",
                usertype: "",
                subject: "",
                class11: "1",
                class12: "",
            },
            fullnameValid: false,
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            mobileValid: false,
            usertypeValid: false,
            subjectValid: true,
            class11Valid: true,
            class12Valid: false,
            loading: false,
            status: 1,
        });
    };
    handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
        await this.props.handleDelete({
            variables: {
                id: rowIndex.id
            },
            update: (store, { data }) => {
                console.log("data", data);
                const data1 = store.readQuery({
                    query: FETCH_GETINSTITUTEUSERS,
                    variables: {
                        username: Cookies.get("username"),
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                });
                console.log("data1s", data1.getInstituteUsers);
                console.log("rowIndex.id", rowIndex.id);
                data1.getInstituteUsers = data1.getInstituteUsers.filter(x => x.id != rowIndex.id);
                console.log("data2s", data1.getInstituteUsers);
                try {
                    store.writeQuery({
                        query: FETCH_GETINSTITUTEUSERS,
                        variables: {
                            username: Cookies.get("username"),
                            institution_id: parseInt(Cookies.get("institutionid"))
                        },
                        data: data1
                    });
                } catch (e) {
                    console.log("Exception", e);
                }

                const data4 = store.readQuery({
                    query: FETCH_GETINSTITUTEUSERS,
                    variables: {
                        username: Cookies.get("username"),
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                });
                data1.getInstituteUsers = data4;
                console.log("data4s", data4);
                if (data.deleteInstituteUser) {
                    this.setState({
                        status: 2
                    });
                    setTimeout(() => {
                        this.DeleteSetpageLoad();
                    }, 1000);
                }
            }
        });
    };
    DeleteSetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ status: 1 });
    };
    edithandleFormSubmit = e => {
        this.setState({ loading: true });
        e.preventDefault();
        console.log("Form submitted");
        console.log("Cookies2", Cookies.get("username"));
        console.log("institutionid2", Cookies.get("institutionid"));

        if (this.state.formValid) {
            let classvalue = "";
            if (this.state.class11 == "1" && this.state.class12 == "2") {
                classvalue = "1,2";
            }
            else if (this.state.class11 == "1") {
                classvalue = "1";
            }
            else if (this.state.class12 == "2") {
                classvalue = "2";
            }
            //subject value start

            let subjectVal = "";
            if (this.state.subject.toString() == "0") {
                let subjectArray = [];
                this.props.globals.subjects.map((item) => {

                    const newObj = item.id
                    subjectArray.push(newObj);


                })
                subjectVal = subjectArray.toString();
            } else {
                subjectVal = this.state.subject.toString();
            }

            //subject value end
            //chapter value start
            let chapterVal = "";
            if (this.state.chapter.toString() == "0") {
                let chArray = [];
                this.props.globals.subjects.map((item) => {
                    if (item.subject == this.state.subject) {
                        item.chapters.map((item2) => {
                            const newObj = item2.id
                            chArray.push(newObj);
                        })

                    }

                })
                chapterVal = chArray.toString();
            } else {
                chapterVal = this.state.chapter.toString();
            }
            console.log("chapterVal", chapterVal);
            // chapter value end
            let edituserObj = "";
            edituserObj = {
                id: this.state.userid,
                username: this.state.username,
                password: this.state.password,
                userlevel: parseInt(this.state.usertype),
                email: this.state.email,
                mobile: this.state.mobile,
                name: this.state.fullname,
                class: parseInt(classvalue),
                subject: subjectVal,
                chapter: chapterVal,
                institution_id: parseInt(Cookies.get("institutionid"))
            };
            console.log("edituserObj", edituserObj);
            this.edituser(edituserObj).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message),
                    loading: false
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
    edituser = async params => {
        await this.props.edituser({
            variables: {
                params
            },
            update: (store, { data }) => {
                let data1 = store.readQuery({
                    query: FETCH_GETINSTITUTEUSERS,
                    variables: {
                        username: Cookies.get("username"),
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                });
                console.log("data1", data1, this.props);

                let classvalue = "";
                if (this.state.class11 == "1" && this.state.class12 == "2") {
                    classvalue = "0";
                }
                else if (this.state.class11 == "1") {
                    classvalue = "1";
                }
                else if (this.state.class12 == "2") {
                    classvalue = "2";
                }
                console.log("classvalue", classvalue);

                let chapterVal = "";
                let chapternameVal = "";
                if (this.state.chapter.toString() == "0") {
                    console.log("123");
                    let chArray = [];
                    let chArrayname = [];
                    this.props.globals.subjects.map((item) => {
                        this.state.subject.map((sitem) => {
                            if (item.id == sitem) {
                                item.chapters.map((item2) => {
                                    const newObj = item2.id
                                    const newObj2 = item2.chapter
                                    chArray.push(newObj);
                                    chArrayname.push(newObj2);
                                })

                            }
                        })


                    })
                    chapterVal = chArray.toString();
                    chapternameVal = chArrayname.toString();
                } else {
                    console.log("1234");
                    chapterVal = this.state.chapter.toString();
                    let chArrayname = [];
                    this.state.chapter.map((chitem) => {
                        console.log("chitem", chitem, this.props.globals.subjects);
                        this.props.globals.subjects.map((item) => {
                            console.log("item.id", item.id, this.state.subject);
                            this.state.subject.map((sitem) => {
                                if (item.id == sitem) {
                                    console.log("item.idtrue");
                                    item.chapters.map((item2) => {
                                        console.log("item.idtrueitem2.id", item2.id, chitem);
                                        if (item2.id == chitem) {
                                            const newObj2 = item2.chapter
                                            //chArray.push(newObj);
                                            chArrayname.push(newObj2);
                                        }

                                    })

                                }

                            });


                        })
                    })
                    chapternameVal = chArrayname.toString();

                }

                //start subject
                let subjectVal = "";
                let subjectnameVal = "";
                if (this.state.subject.toString() == "0") {
                    console.log("123");
                    let subArray = [];
                    let subArrayname = [];
                    this.props.globals.subjects.map((item) => {

                        const newObj = item.id
                        const newObj2 = item.subject
                        subArray.push(newObj);
                        subArrayname.push(newObj2);


                    })
                    subjectVal = subArray.toString();
                    subjectnameVal = subArrayname.toString();
                } else {

                    subjectVal = this.state.subject.toString();
                    let subArrayname = [];
                    this.state.subject.map((item) => {
                        let filterData = this.props.globals.subjects.find((a) => a.id == item);
                        const newObj2 = filterData.subject
                        subArrayname.push(newObj2);
                    })
                    subjectnameVal = subArrayname.toString();

                }
                //end subject


                // let subject_name = "";
                // this.props.globals.subjects.map((item) => {
                //     if (item.id == this.state.subject) {
                //         subject_name = item.subject;
                //     }

                // });
                let found = data1.getInstituteUsers.find(a => a.id === this.state.userid);
                let idindex = data1.getInstituteUsers.indexOf(found);
                console.log("data1", data1);
                const newUser = {
                    id: this.state.userid,
                    username: this.state.username,
                    password: this.state.password,
                    userlevel: this.state.usertype,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    name: this.state.fullname,
                    class: classvalue,
                    subject: subjectVal,
                    subject_name: subjectnameVal,
                    chapter_names: chapternameVal,
                    chapter: chapterVal,
                    __typename: "InstituteUsers"
                };
                data1.getInstituteUsers.splice(idindex, 1, newUser);
                try {
                    store.writeQuery({
                        query: FETCH_GETINSTITUTEUSERS,
                        variables: {
                            username: Cookies.get("username"),
                            institution_id: parseInt(Cookies.get("institutionid"))
                        },
                        data: data1
                    });
                } catch (e) {
                    console.log("Exception", e);
                }
                if (data.editInstituteUser) {
                    this.setState({
                        formValid: false,
                        currentStep: "5",
                        loading: false,
                        submitError: "",
                        userid: "",
                        fullname: "",
                        username: "",
                        email: "",
                        password: "",
                        mobile: "",
                        usertype: "",
                        usertypevalue: "",
                        subject: [],
                        subjectValue: [],
                        chapter: [],
                        chaptervalue: [],
                        class11: "",
                        class12: "",
                        checked1: true,
                        checked2: false,

                        formErrors: {
                            fullname: "",
                            username: "",
                            email: "",
                            password: "",
                            mobile: "",
                            usertype: "",
                            subject: ""
                        },
                        fullnameValid: false,
                        usernameValid: false,
                        emailValid: false,
                        passwordValid: false,
                        mobileValid: false,
                        usertypeValid: false,
                        subjectValid: false
                    });

                    this.SetpageLoad1();
                }
            }
        });
    };
    SetpageLoad1 = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1, modalShow1: false });
    };
    handleFormSubmit = e => {
        this.setState({ loading: true });
        e.preventDefault();

        console.log("Cookies2", this.state);


        if (this.state.formValid) {
            let classvalue = "";
            if (this.state.class11 == "1" && this.state.class12 == "2") {
                classvalue = "1,2";
            }
            else if (this.state.class11 == "1") {
                classvalue = "1";
            }
            else if (this.state.class12 == "2") {
                classvalue = "2";
            }
            //subject values start
            let subjectVal = "";
            if (this.state.subject.toString() == "0") {
                let subjectArray = [];
                this.props.globals.subjects.map((item) => {

                    const newObj = item.id
                    subjectArray.push(newObj);


                })
                subjectVal = subjectArray.toString();
            } else {
                subjectVal = this.state.subject.toString();
            }
            //subject values end

            //chapter values start
            let chapterVal = "";
            if (this.state.chapter.toString() == "0") {
                let chArray = [];
                this.props.globals.subjects.map((item) => {
                    if (item.subject == this.state.subject) {
                        item.chapters.map((item2) => {
                            const newObj = item2.id
                            chArray.push(newObj);
                        })

                    }

                })
                chapterVal = chArray.toString();
            } else {
                chapterVal = this.state.chapter.toString();
            }
            // chapter values end
            console.log("usertype", this.state.usertype);
            let adduserObj = "";
            adduserObj = {
                username: this.state.username,
                password: this.state.password,
                userlevel: parseInt(this.state.usertype),
                email: this.state.email,
                mobile: this.state.mobile,
                name: this.state.fullname,
                class: parseInt(classvalue),
                subject: subjectVal,
                chapter: chapterVal,
                institution_id: parseInt(Cookies.get("institutionid")),
                createdby: Cookies.get("username")
            };
            console.log("adduserObj", adduserObj);
            this.adduser(adduserObj).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message),
                    loading: false
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
    adduser = async params => {
        await this.props.adduser({
            variables: {
                params
            },
            update: (store, { data }) => {
                let data1 = store.readQuery({
                    query: FETCH_GETINSTITUTEUSERS,
                    variables: {
                        username: Cookies.get("username"),
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                });

                let classvalue = "";
                if (this.state.class11 == "1" && this.state.class12 == "2") {
                    classvalue = "0";
                }
                else if (this.state.class11 == "1") {
                    classvalue = "1";
                }
                else if (this.state.class12 == "2") {
                    classvalue = "2";
                }
                console.log("classvalue", classvalue);

                let chapterVal = "";
                let chapternameVal = "";
                if (this.state.chapter.toString() == "0") {
                    console.log("123");
                    let chArray = [];
                    let chArrayname = [];
                    this.props.globals.subjects.map((item) => {
                        //if (item.id == this.state.subject) {
                        this.state.subject.map((sitmem) => {
                            if (sitmem == item.id) {
                                item.chapters.map((item2) => {
                                    const newObj = item2.id
                                    const newObj2 = item2.chapter
                                    chArray.push(newObj);
                                    chArrayname.push(newObj2);
                                })
                            }

                        });


                        //}

                    })
                    chapterVal = chArray.toString();
                    chapternameVal = chArrayname.toString();
                } else {
                    console.log("1234");
                    chapterVal = this.state.chapter.toString();
                    let chArrayname = [];
                    this.state.chapter.map((chitem) => {
                        console.log("chitem", chitem, this.props.globals.subjects);
                        this.props.globals.subjects.map((item) => {
                            console.log("item.id", item.id, this.state.subject);
                            //if (item.id == this.state.subject) {
                            this.state.subject.map((sitem) => {
                                if (item.id == sitem) {
                                    console.log("item.idtrue");
                                    item.chapters.map((item2) => {
                                        console.log("item.idtrueitem2.id", item2.id, chitem);
                                        if (item2.id == chitem) {
                                            const newObj2 = item2.chapter
                                            //chArray.push(newObj);
                                            chArrayname.push(newObj2);
                                        }

                                    })
                                }

                            })


                            //}

                        })
                    })
                    chapternameVal = chArrayname.toString();

                }
                // let subject_name = "";
                // this.props.globals.subjects.map((item) => {
                //     if (item.id == this.state.subject) {
                //         subject_name = item.subject;
                //     }

                // });

                //start subject
                let subjectVal = "";
                let subjectnameVal = "";
                if (this.state.subject.toString() == "0") {
                    console.log("123");
                    let subArray = [];
                    let subArrayname = [];
                    this.props.globals.subjects.map((item) => {

                        const newObj = item.id
                        const newObj2 = item.subject
                        subArray.push(newObj);
                        subArrayname.push(newObj2);


                    })
                    subjectVal = subArray.toString();
                    subjectnameVal = subArrayname.toString();
                } else {

                    subjectVal = this.state.subject.toString();
                    let subArrayname = [];
                    this.state.subject.map((item) => {
                        let filterData = this.props.globals.subjects.find((a) => a.id == item);
                        const newObj2 = filterData.subject
                        subArrayname.push(newObj2);
                    })
                    subjectnameVal = subArrayname.toString();

                }
                //end subject
                const newUser = {
                    id: data.addInstituteUser,
                    username: this.state.username,
                    password: this.state.password,
                    userlevel: this.state.usertype,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    name: this.state.fullname,
                    class: classvalue,
                    subject: subjectVal,
                    subject_name: subjectnameVal,
                    chapter_names: chapternameVal,
                    chapter: chapterVal,
                    __typename: "InstituteUsers"
                };
                data1.getInstituteUsers.push(newUser);

                try {
                    store.writeQuery({
                        query: FETCH_GETINSTITUTEUSERS,
                        variables: {
                            username: Cookies.get("username"),
                            institution_id: parseInt(Cookies.get("institutionid"))
                        },
                        data: data1
                    });
                } catch (e) {
                    console.log("Exception", e);
                }
                if (data.addInstituteUser) {
                    this.setState({
                        formValid: false,
                        currentStep: "5",
                        loading: false,
                        submitError: "",
                        userid: "",
                        fullname: "",
                        username: "",
                        email: "",
                        password: "",
                        mobile: "",
                        usertype: "",
                        usertypevalue: "",
                        subject: [],
                        subjectvalue: [],
                        class11: "",
                        class12: "",
                        checked1: true,
                        checked2: false,
                        chapter: [],
                        chaptervalue: [],

                        formErrors: {
                            fullname: "",
                            username: "",
                            email: "",
                            password: "",
                            mobile: "",
                            usertype: "",
                            subject: ""
                        },
                        fullnameValid: false,
                        usernameValid: false,
                        emailValid: false,
                        passwordValid: false,
                        mobileValid: false,
                        usertypeValid: false,
                        subjectValid: false
                    });

                    this.SetpageLoad();
                }
            }
        });
    };
    SetpageLoad = () => {
        console.log("setTimeout");
        this.setState({ currentStep: 1, modalShow: false });
    };
    handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
        console.log("handleEditFunction", rowIndex);
        //start subject value
        let subjectvalue = [];
        let subArray = rowIndex.subject.split(",");
        subArray.map((submap) => {
            if (submap != undefined) {
                let filter = this.props.globals.subjects.find((a) => a.id == submap);
                if (filter != undefined) {
                    const newObj = {
                        label: filter.subject,
                        value: filter.id
                    }
                    subjectvalue.push(newObj);
                }
            }
        });
        console.log("subjectvaluela", subjectvalue);
        //end subject value
        //start chapter value
        let chaptervalue = [];
        this.props.globals.subjects.map((submap) => {
            //if (c == rowIndex.subject) {
            let subArray = rowIndex.subject.split(",");
            subArray.map((smap) => {
                if (smap == submap.id) {
                    let chArray = rowIndex.chapter.split(",");
                    chArray.map((chmap) => {
                        let chfindData = submap.chapters.find((ch) => ch.id == chmap);
                        if (chfindData != undefined) {
                            const newObj = {
                                label: chfindData.chapter,
                                value: chfindData.id
                            }
                            chaptervalue.push(newObj);
                        }

                    });
                }

            });

            //}
        });
        let usertyp = "";
        if (rowIndex.usertype == "2") {
            usertyp = { value: 2, label: 'Lecturer' }
        }
        else {
            usertyp = { value: 1, label: 'Operator' }
        }
        // let subjectValue = "";
        // console.log("rowIndex.subject", chaptervalue);
        // if (rowIndex.subject != "") {
        //     subjectValue = { value: rowIndex.subject, label: rowIndex.subject_name }
        // }
        let checked1 = "";
        let checked2 = "";
        let class11 = "";
        let class12 = "";
        console.log("rowIndex.class", rowIndex.class);
        if (rowIndex.class == "1") {
            checked1 = true;
            class11 = "1";
        }
        else if (rowIndex.class == "2") {
            checked2 = true;
            class12 = "2";
        }
        else {
            checked1 = true;
            checked2 = true;
            class11 = "1";
            class12 = "2";
        }
        this.setState({
            modalShow: false,
            modalShow1: true,
            //form field
            formValid: true,
            currentStep: "1",
            submitError: "",
            userid: rowIndex.id,
            fullname: rowIndex.name,
            username: rowIndex.username,
            email: rowIndex.email,
            password: rowIndex.password,
            mobile: rowIndex.mobile,
            usertype: rowIndex.usertype,
            usertypevalue: usertyp,
            subject: rowIndex.subject.split(","),
            subjectvalue: subjectvalue,
            class11: class11,
            class12: class12,
            checked1: checked1,
            checked2: checked2,
            chapter: rowIndex.chapter.split(","),
            chaptervalue: chaptervalue,
            formErrors: {
                fullname: "",
                username: "",
                email: "",
                password: "",
                mobile: "",
                usertype: "",
                subject: ""
            },
            fullnameValid: true,
            usernameValid: true,
            emailValid: true,
            passwordValid: true,
            mobileValid: true,
            usertypeValid: true,
            subjectValid: true
        });
    };
    handleMultipleSelectInputChange = (e, name) => {
        // let chapter = Array();
        // if (e != null) {
        //     for (let i = 0; i < e.length; i++) {
        //         const chapterval = e[i];
        //         chapter.push(chapterval.value);
        //     }
        //     this.setState({
        //         chapter: chapter
        //     });
        // }
        if (name == "subject") {
            let subject = Array();
            let subjectvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const subjectval = e[i];
                    const newObj = {
                        label: subjectval.label,
                        value: subjectval.value
                    }
                    subjectvalue.push(newObj);
                    subject.push(subjectval.value);
                }
                this.setState({
                    subjectvalue: subjectvalue,
                    subject: subject,
                    chapter: [],
                    chaptervalue: []
                });
            }
        }
        else {
            let chapter = Array();
            let chaptervalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const chapterval = e[i];
                    const newObj = {
                        label: chapterval.label,
                        value: chapterval.value
                    }
                    chaptervalue.push(newObj);
                    chapter.push(chapterval.value);
                }
                this.setState({
                    chaptervalue: chaptervalue,
                    chapter: chapter
                });
            }
        }


    };
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "class11") {
            if (e.target.checked == true) {
                this.setState({
                    class11: "1",
                    checked1: true,
                    chapter: [],
                    chaptervalue: []
                }, () => {
                    this.validateField(name, "1");
                });
            } else {
                this.setState({
                    class11: "",
                    checked1: false,
                    chapter: [],
                    chaptervalue: []
                }, () => {
                    this.validateField(name, "");
                });
            }
        }
        else if (name == "class12") {
            if (e.target.checked == true) {
                this.setState({
                    class12: "2",
                    checked2: true,
                    chapter: [],
                    chaptervalue: []
                }, () => {
                    this.validateField(name, "2");
                });
            } else {
                this.setState({
                    class12: "",
                    checked2: false,
                    chapter: [],
                    chaptervalue: []
                }, () => {
                    this.validateField(name, "");
                });
            }
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
        if (name == "usertype") {
            if (value == "2") {
                this.setState({
                    usertypevalue: {
                        value: value,
                        label: "Lecturer"
                    }
                });
            }
            else {
                this.setState({
                    usertypevalue: {
                        value: value,
                        label: "Operator"
                    }
                });
            }

        }
        if (name == "subject") {
            let subjectData = this.props.globals.subjects.find((a) => a.id == value);
            this.setState({
                subjectValue: {
                    value: subjectData.id,
                    label: subjectData.subject
                },
                chapter: [],
                chaptervalue: []
            });
        }
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fullnameValid = this.state.fullnameValid;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let mobileValid = this.state.mobileValid;
        let usertypeValid = this.state.usertypeValid;
        let subjectValid = this.state.subjectValid;
        let class11Valid = this.state.class11Valid;
        let class12Valid = this.state.class12Valid;


        switch (fieldName) {
            case "fullname":
                if (value.length == "") {
                    fullnameValid = false;
                    fieldValidationErrors.fullname = "fullname Cannot Be Empty";
                } else {
                    fullnameValid = true;
                    fieldValidationErrors.fullname = "";
                }

                break;
            case "username":
                if (value.length == "") {
                    usernameValid = false;
                    fieldValidationErrors.username = "username Cannot Be Empty";
                } else {
                    usernameValid = true;
                    fieldValidationErrors.username = "";
                }

                break;

            case "email":
                var pattern = new RegExp(
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );

                if (value.length < 4) {
                    emailValid = false;
                    fieldValidationErrors.email =
                        "email cannot be less than 5 chars";
                } else if (!pattern.test(value)) {
                    emailValid = false;
                    fieldValidationErrors.email = "Invalid email";
                } else {
                    emailValid = true;
                    fieldValidationErrors.email = "";
                }

                break;
            case "password":
                if (value.length == "") {
                    passwordValid = false;
                    fieldValidationErrors.password = "Password cannot be Empty";
                } else {
                    passwordValid = true;
                    fieldValidationErrors.password = "";
                }

                break;

            case "mobile":
                var pattern = new RegExp("^[6-9][0-9]{9}$");

                if (value.length == "") {
                    mobileValid = false;
                    fieldValidationErrors.mobile = "Mobile No. Cannot Be Empty";
                } else if (!pattern.test(value)) {
                    mobileValid = false;
                    fieldValidationErrors.mobile = "Invalid mobile";
                } else {
                    mobileValid = true;
                    fieldValidationErrors.mobile = "";
                }

                break;

            case "usertype":
                if (value.length == "") {
                    usertypeValid = false;
                    fieldValidationErrors.usertype = "usertype Cannot Be Empty";
                } else {
                    usertypeValid = true;
                    fieldValidationErrors.usertype = "";
                }

                break;
            case "subject":
                if (value.length == "") {
                    subjectValid = false;
                    fieldValidationErrors.subject = "subject Cannot Be Empty";
                } else {
                    subjectValid = true;
                    fieldValidationErrors.subject = "";
                }

                break;

            case "class11":
                if (value.length == "") {
                    class11Valid = false;
                    fieldValidationErrors.class11 = "class11 Cannot Be Empty";
                } else {
                    class11Valid = true;
                    fieldValidationErrors.class11 = "";
                }

                break;

            case "class12":
                if (value.length == "") {
                    class12Valid = false;
                    fieldValidationErrors.class12 = "class12 Cannot Be Empty";
                } else {
                    class12Valid = true;
                    fieldValidationErrors.class12 = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                fullnameValid: fullnameValid,
                usernameValid: usernameValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
                mobileValid: mobileValid,
                usertypeValid: usertypeValid,
                subjectValid: subjectValid,
                class12Valid: class12Valid,
                class11Valid: class11Valid

            },
            this.validateForm
        );
    }
    validateForm() {
        console.log("validateForm", this.state.class11Valid, this.state.class12Valid);
        this.setState({
            formValid:
                this.state.fullnameValid &&
                this.state.usernameValid &&
                this.state.emailValid &&
                this.state.passwordValid &&
                this.state.mobileValid &&
                this.state.usertypeValid &&
                this.state.subjectValid && (this.state.class11Valid || this.state.class12Valid)
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
    }
    actionsFormatter2(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="delete" className="text-danger">
                    <i className="far fa-trash-alt" />
                </Button>
            </div>
        );
    }
    actionsFormatter1() {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="edit" className="text-theme">
                    <i className="far fa-edit" />
                </Button>
            </div>
        );
    }

    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="actions-buttons d-flex justify-content-center align-items-top">
                <Button variant="link" name="view" className="text-theme">
                    <i className="far fa-eye" />
                </Button>
            </div>
        );
    }
    articlecolumns = [
        {
            dataField: "name",
            text: "Full Name ",
            sort: true
        },
        {
            dataField: "username",
            text: "User Name",
            sort: true,
        },

        {
            dataField: "email",
            text: "Email Id",
            sort: true
        },

        {
            dataField: "mobile",
            text: "Mobile",
            sort: true
        },
        {
            dataField: "userlevel",
            text: "User Type",
            sort: true
        },
        {
            dataField: "classname",
            text: "Class",
            sort: true
        },
        {
            dataField: "subject_name",
            text: "Subjects",
            sort: true
        },
        {
            dataField: "chapter_names",
            text: "Chapter",
            sort: true
        },
        // {
        //     dataField: "actions",
        //     formatter: this.actionsFormatter,
        //     headerAlign: "center"
        // },
        {
            dataField: "actions",
            text: "Actions",
            sort: true,
            formatter: this.actionsFormatter1,
            headerAttrs: { width: 50 },
            attrs: { width: 50, className: "EditRow" },
            headerAlign: "center",
            events: {
                onClick: this.handleEditFunction
            }
        },
        {
            dataField: "actions",
            formatter: this.actionsFormatter2,
            headerAttrs: { width: 50 },
            attrs: { width: 50, className: "EditRow" },
            headerAlign: "center",
            events: {
                onClick: this.handleDelete
            }
        }
    ];
    // defaultSorted = [
    //     {
    //         dataField: "name",
    //         order: "desc"
    //     }
    // ];
    tableUserData(user) {
        const newArray = [];
        user.map((usermapdata) => {
            console.log("usermapdata", usermapdata);
            let userlevel = "";
            if (usermapdata.userlevel == "2") {
                userlevel = "Lecturer"
            }
            else {
                userlevel = "Operator"
            }
            let classVal = "";
            if (usermapdata.class == "1") {
                classVal = "XI";
            }
            else if (usermapdata.class == "2") {
                classVal = "XII";
            }
            else {
                classVal = "XI,XII"
            }
            const newObj = {
                id: usermapdata.id,
                username: usermapdata.username,
                password: usermapdata.password,
                usertype: usermapdata.userlevel,
                userlevel: userlevel,
                email: usermapdata.email,
                mobile: usermapdata.mobile,
                name: usermapdata.name,
                class: usermapdata.class,
                classname: classVal,
                subject: usermapdata.subject,
                chapter: usermapdata.chapter,
                subject_name: usermapdata.subject_name,
                chapter_names: usermapdata.chapter_names
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

    render() {
        console.log("currentState", this.state);
        console.log("username:", Cookies.get("username"),
            "institution_id:", parseInt(Cookies.get("institutionid")));
        const getInstituteUsers = this.props.getInstituteUsers;
        const loading3 = getInstituteUsers.loading;
        const error3 = getInstituteUsers.error;

        if (loading3) return <PreloaderTwo />;
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        console.log("getInstituteUsers", getInstituteUsers.getInstituteUsers);

        return (
            <React.Fragment>
                <div className="user-creation">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="breadcrumb_section border-bottom border-theme pb-3 my-4 d-flex align-items-center justify-content-between">
                                <h2 className="title font-weight-normal h5 mb-0">User Creations</h2>
                                <Button className="btn btn-blue px-4" onClick={this.parentStateSet}>Add User</Button>
                            </div>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="card-title mb-0 text-danger">
                                {this.state.status == 2 ? "User deleted successfully" : ""}
                            </div>
                            <DataTableWithOutSearch
                                parentData={this.tableUserData(
                                    getInstituteUsers.getInstituteUsers
                                )}
                                particlecolumns={this.articlecolumns}
                                tableHeading={this.state.tableHeaderData}
                                defaultSorted={this.defaultSorted}
                            />
                        </Col>
                    </Row>
                </div>
                <UserModal
                    phandleMultipleSelectInputChange={this.handleMultipleSelectInputChange}
                    globals={this.props.globals}
                    parenthandleFormSubmit={this.handleFormSubmit}
                    parentselecthandleInputChange={this.selecthandleInputChange}
                    ParenthandleInputChange={this.handleInputChange}
                    show={this.state.modalShow}
                    onHide1={this.onHideFun}
                    stateData={this.state}
                    loading={this.state.loading}
                />
                <UserModalEdit
                    phandleMultipleSelectInputChange={this.handleMultipleSelectInputChange}
                    globals={this.props.globals}
                    parentedithandleFormSubmit={this.edithandleFormSubmit}
                    parentselecthandleInputChange={this.selecthandleInputChange}
                    ParenthandleInputChange={this.handleInputChange}
                    show={this.state.modalShow1}
                    onHide2={this.onHideFunEdit}
                    stateData={this.state}
                    loading={this.state.loading}
                /></React.Fragment>
        )
    }
}

export default compose(
    graphql(FETCH_GETINSTITUTEUSERS,
        {
            options: props => ({
                variables: {
                    username: Cookies.get("username").toString(),
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }), name: "getInstituteUsers"
        }),
    graphql(ADDINSTITUTE_USER, {
        name: "adduser"
    }),
    graphql(EDITINSTITUTE_USER, {
        name: "edituser"
    }),
    graphql(DELETE_USER, {
        name: "handleDelete"
    })
)
    (UserCreationSection);


