import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader';
import OwnQuestionCollegeExamSection from '../components/questioners/create_question_paper/own_question_paper/own_question_types/OwnQuestionCollegeExamSection';
import Footer from '../components/footer/Footer';
import moment from 'moment';

import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import QuestionModal from '../components/questioners/create_question_paper/QuestionModal';
import DownloadQuestionPaperModal from '../components/download_question_paper/DownloadQuestionPaperModal';


const COLLEGE_PAPER = gql`
  mutation(
    $params:GenerateInstituteExamInput  
    ) {
        createInstituteExamPaper(
        params: $params
     ){
         id
         filename
     }
  }
`;

const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        exams{
            id
            exam
            exam_subjects{
                subject_id
            }
        }
        globalBranches{
            id
            exam_id
            branch_name
        }
        classes{
            id
            class
        }
        globalSections{
            id
            section_name
        }
        subjects{
            id
            subject
            chapters{
                id
                chapter
                topics{
                    id
                    topic
                    # practice_percentage
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
#         previousSets{
#      id
#      year
#      qset
#      exam
#      pexamtype
#    }
   instituteExamPapers{
     id
     exampaper
     exam_type
     pexamtype
   }
    }
}

`;

const FETCH_SECTIONS = gql` 
query($institution_id: Int!) {
    getSections(institution_id: $institution_id){
        id
        section_name
        branch_id
    }
}

`;


class OwnQuestionCollegeExam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            exam_name: "",
            oldpapers: "",
            oldpapersvalue: "",
            examtypevalue: "",
            examtype: "",
            branch: "",
            class: "",
            classvalue: "",
            section: "",
            examtypema: "1",
            examtypemavalue: { value: "1", label: "MAINS" },
            noofsets: "1",
            subjects: [],
            searchsubject: "0",
            searchsubjectvalue: "",
            searchchapter: "0",
            searchchaptervalue: "",
            questionbankpercentage: "0",
            ownaddedpercentage: "0",
            questiontypes: [],
            questiontypesvalue: [],
            applicationtheory: "",
            applicationtheoryvalue: "",
            formErrors: {
                examtype: "",
                branch: "",
                class: "",
                section: "",
                startdate: "",
                enddate: "",
                oldpapers: "",
                exam_name: ""

            },
            exam_nameValid: false,
            oldpapersValid: false,

            examtypeValid: false,
            branchValid: false,
            classValid: false,
            sectionValid: false,
            formValid1: false,
            startdateValid: false,
            enddateValid: false,
            submitError1: "",
            buttonstatus: "",
            filename: "",
            spinnerStatus: "",
            startdate: "",
            enddate: "",
            isonline: "0",
            modalShow: false,
            modalShowTwo: false,
            mains_2021: false
        }
    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
        if (toggled === "wrapper") {
            this.setState({ toggled: "wrapper sidebar-enable" });
            Cookies.set("toggle", "wrapper sidebar-enable");
        } else {
            this.setState({ toggled: "wrapper" });
            Cookies.set("toggle", "wrapper");
        }
    };
    generateQuestionPaper = (e) => {
        let status = false;
        for (const item of this.state.subjects) {
            let filterchData = item.chapters.filter((a) => a.checked == true);

            let totalCount = 0;
            for (const item1 of filterchData) {
                let count = item1.topics.filter((a) => a.checked == true).length;
                totalCount += parseInt(count);
            }
            if (totalCount == 0) {
                status = false;
                break;
            }
            else {
                status = true;
            }
        }

        const persum =
            parseInt(this.state.questionbankpercentage) +
            parseInt(this.state.ownaddedpercentage);
        if (this.state.formValid1 && parseInt(persum) == 100 && status) {
            this.setState({ modalShow: true, submitError1: "" })
        }
        else if (parseInt(persum) != 100 && parseInt(persum) != 0) {
            this.setState({
                submitError1: "Please enter the summation for percentages is 100", spinnerStatus: ""
            });
        }
        else if (!status) {
            this.setState({
                submitError1: "Please select at least one chapter and one topic in each subject", spinnerStatus: ""
            });
        }
        else {
            this.setState({ submitError1: "Please fill all the values to proceed", spinnerStatus: "" });
        }
    }

    branchhandleMultipleSelectInputChange = e => {
        let branch = Array();
        if (e != null) {
            for (let i = 0; i < e.length; i++) {
                const branchval = e[i];
                branch.push(branchval.value);
            }
            this.setState({
                branch: branch
            }, () => {
                this.validateField("branch", "1");
            });
        }
        else {
            this.setState({
                branch: ""
            }, () => {
                this.validateField("branch", "");
            });
        }
    };
    sectionhandleMultipleSelectInputChange = e => {
        console.log("sectionhandleMultipleSelectInputChange", e);
        let section = Array();
        if (e != null) {
            for (let i = 0; i < e.length; i++) {
                const sectionval = e[i];
                section.push(sectionval.value);
            }
            this.setState({
                section: section
            }, () => {
                this.validateField("section", "1");
            });
        }
        else {
            this.setState({
                section: ""
            }, () => {
                this.validateField("section", "");
            });
        }
    };
    spinnerStatus = (e) => {
        if (this.state.formValid1) {
            this.setState(
                {
                    spinnerStatus: "1"
                }
            );
            this.handleFormSubmit(e);
        } else {
            this.setState({ submitError1: "Please fill all the values to proceed" });
        }
    }
    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted", this.props);


        let branchval = "";
        let branchArray = [];
        if (this.state.branch.toString() == "0") {
            console.log("toString", this.state.branch.toString());
            for (let i = 0; i <= this.props.globals.globals.globalBranches.length; i++) {
                let idata = this.props.globals.globals.globalBranches[i];
                if (idata != undefined) {
                    console.log("idata", idata);
                    const newObj = idata.id;

                    console.log("newObj", newObj);
                    branchArray.push(newObj);

                }

            }
            console.log("branchArray", branchArray);
            branchval = branchArray.toString();

        }
        else {
            branchval = this.state.branch.toString();
        }

        let sectionval = "";
        if (this.state.section.toString() == "0") {
            let sectionArray = [];
            for (let i = 0; i <= this.props.getSections.getSections.length; i++) {
                let idata = this.props.getSections.getSections[i];
                if (idata != undefined) {
                    console.log("branchArray", branchArray);
                    if (branchArray.length > 0) {
                        branchArray.map((branchmapData) => {
                            if (branchmapData == idata.branch_id) {
                                const newObj =
                                    idata.id

                                sectionArray.push(newObj);
                            }

                        })
                    }
                    else {
                        let brancharr = this.state.branch;
                        brancharr.map((branchmapData) => {
                            if (branchmapData == idata.branch_id) {
                                const newObj =
                                    idata.id

                                sectionArray.push(newObj);
                            }

                        })

                    }

                }

            }
            sectionval = sectionArray.toString();
        }
        else {
            sectionval = this.state.section.toString();
        }

        let examtypema = "";
        if (this.state.examtype == "2") {
            examtypema = this.state.examtypema;
        } else {
            examtypema = "0";
        }
        let creategeneralpaper = "";
        creategeneralpaper = {
            exam_name: this.state.exam_name,
            previous_set_id: parseInt(this.state.oldpapers),
            exam_type: parseInt(this.state.examtype),
            class_id: parseInt(this.state.class),
            branch: branchval,
            section: sectionval,
            sub_exam_type: parseInt(examtypema),
            no_of_sets: 1,
            start_time: this.state.startdate,
            end_time: this.state.enddate,
            institution_id: parseInt(Cookies.get("institutionid")),
            username: Cookies.get("username"),
            mains_2021: this.state.mains_2021

        }
        console.log('creategeneralpaper', creategeneralpaper);
        this.creategeneralpaperfun(
            creategeneralpaper
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError1: error.graphQLErrors.map(x => x.message), spinnerStatus: ""
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    creategeneralpaperfun = async (
        params) => {
        await this.props.creategeneralpaperfun({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("createGeneralPaperdata", data);
                if (data.createInstituteExamPaper) {
                    this.setState({
                        currentStep: 5,
                        exam_name: "",
                        oldpapers: "",
                        oldpapersvalue: "",
                        examtypevalue: "",
                        examtype: "",
                        branch: "",
                        class: "",
                        classvalue: "",
                        section: "",
                        examtypema: "1",
                        examtypemavalue: { value: "1", label: "MAINS" },
                        noofsets: "1",
                        subjects: [],
                        searchsubject: "0",
                        searchsubjectvalue: "",
                        searchchapter: "0",
                        searchchaptervalue: "",
                        questionbankpercentage: "0",
                        ownaddedpercentage: "0",
                        questiontypes: [],
                        questiontypesvalue: [],
                        applicationtheory: "",
                        applicationtheoryvalue: "",
                        formErrors: {
                            examtype: "",
                            branch: "",
                            class: "",
                            section: "",
                            startdate: "",
                            enddate: "",
                            oldpapers: "",
                            exam_name: ""

                        },
                        exam_nameValid: false,
                        oldpapersValid: false,

                        examtypeValid: false,
                        branchValid: false,
                        classValid: false,
                        sectionValid: false,
                        formValid1: false,
                        startdateValid: false,
                        enddateValid: false,
                        submitError1: "",
                        buttonstatus: "",
                        filename: "",
                        spinnerStatus: "",
                        startdate: "",
                        enddate: "",
                        isonline: "0",
                        modalShow: false,
                        modalShowTwo: false,
                        mains_2021: false,
                        filename: data.createInstituteExamPaper.filename,



                    });
                    setTimeout(() => { this.SetpageLoad1() }, 1000);
                }
            }
        });
    };
    SetpageLoad1 = () => {
        console.log("this.state.buttonstatus");

        this.setState({ currentStep: 1 });
        this.props.history.push("/questions/manage-question-paper");

    }
    QuestionFunction = (e, questionsdata) => {
        let subjectArray = this.state.subjects.map((subjectData) => {
            if (subjectData.id == this.state.searchsubject) {
                const chData = subjectData.chapters.map((chmapData) => {
                    if (chmapData.id == this.state.searchchapter) {
                        if (e.target.checked == true) {
                            let array = chmapData.ownedarray;
                            array.push({ ...questionsdata });
                            return { ...chmapData, ownedarray: array }
                        }
                        else {
                            let ownedarray = chmapData.ownedarray.filter((a) => a.id != questionsdata.id);
                            //ownedarray.push(questionsdata);
                            return { ...chmapData, ownedarray: ownedarray }
                        }
                    }
                    return { ...chmapData }

                })
                return { ...subjectData, chapters: chData }
            }
            return { ...subjectData }
        })
        this.setState({ subjects: subjectArray });

    }
    subjectFunction = (subjectid) => {
        console.log("subjectFunction", subjectid);
        let subjectarray = this.state.subjects.map((submapData) => {
            if (submapData.id == subjectid) {
                return { ...submapData, subjectactive: "d-flex justify-content-between align-items-center active" }
            }
            return { ...submapData, subjectactive: "d-flex justify-content-between align-items-center" }
        })
        this.setState({ subjects: subjectarray });

    }
    chapterFunction = (subjectid, chapterid) => {
        let subjectarray = this.state.subjects.map((submapData) => {
            if (submapData.id == subjectid) {
                const chapData = submapData.chapters.map((chaptermapData) => {
                    if (chaptermapData.id == chapterid) {
                        return { ...chaptermapData, chapteractive: "d-flex justify-content-between align-items-center active" }
                    }
                    return { ...chaptermapData, chapteractive: "d-flex justify-content-between align-items-center" }
                })
                return { ...submapData, chapters: chapData }
            }
            return { ...submapData }
        })
        this.setState({ subjects: subjectarray });
    }
    topicFunction = (e, subjectid, chapterid, topicid) => {
        console.log("topicFunction", e.target.checked, subjectid, chapterid, topicid);
        let subjectarray = this.state.subjects.map((submapData) => {
            if (submapData.id == subjectid) {
                if (e.target.checked == true) {
                    const chapData = submapData.chapters.map((chaptermapData) => {
                        if (chaptermapData.id == chapterid) {

                            const topicData = chaptermapData.topics.map((topicmapData) => {
                                if (topicmapData.id == topicid) {
                                    return { ...topicmapData, checked: true }
                                }
                                return { ...topicmapData }
                            })
                            return { ...chaptermapData, checked: true, topics: topicData }

                        }
                        return { ...chaptermapData }
                    })
                    return { ...submapData, chapters: chapData, checked: true }
                }
                else {
                    const chapData = submapData.chapters.map((chaptermapData) => {
                        if (chaptermapData.id == chapterid) {
                            const topicData = chaptermapData.topics.map((topicmapData) => {
                                if (topicmapData.id == topicid) {
                                    return { ...topicmapData, checked: false }
                                }
                                return { ...topicmapData }
                            })
                            let tData = topicData.filter((a) => a.checked == true)
                            if (tData.length > 0) {
                                return { ...chaptermapData, checked: true, topics: topicData }
                            }
                            else {
                                return { ...chaptermapData, checked: false, topics: topicData }
                            }

                        }
                        return { ...chaptermapData }
                    })
                    let cData = chapData.filter((a) => a.checked == true)
                    if (cData.length > 0) {
                        return { ...submapData, chapters: chapData, checked: true }
                    }
                    else {
                        return { ...submapData, chapters: chapData, checked: false }
                    }

                }
            }
            return { ...submapData }

        })
        this.setState({ subjects: subjectarray });

    }
    topiccheckallFunction = (e, subjectid, chapterid) => {
        let subjectarray = this.state.subjects.map((submapData) => {
            if (submapData.id == subjectid) {
                if (e.target.checked == true) {
                    const chapData = submapData.chapters.map((chaptermapData) => {
                        if (chaptermapData.id == chapterid) {
                            const topicData = chaptermapData.topics.map((topicsmapData) => {
                                return { ...topicsmapData, checked: true }
                            })
                            return { ...chaptermapData, checked: true, topics: topicData, checkedall: true }
                        }
                        return { ...chaptermapData }
                    })

                    return { ...submapData, checked: true, chapters: chapData }
                }
                else {
                    const chapData = submapData.chapters.map((chaptermapData) => {
                        if (chaptermapData.id == chapterid) {
                            const topicData = chaptermapData.topics.map((topicsmapData) => {
                                return { ...topicsmapData, checked: false }
                            })
                            return { ...chaptermapData, checked: false, topics: topicData, checkedall: false }
                        }
                        return { ...chaptermapData }
                    })
                    return { ...submapData, checked: false, chapters: chapData }
                }
            }
            return { ...submapData }
        })
        this.setState({ subjects: subjectarray });
    }
    parenthandleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (ename == "examtype") {
            //console.log("this.props", this.props.globals.globals.subjects);
            let examsData = this.props.globals.globals.exams.find((a) => a.id == evalue);
            let examsubjectData = examsData.exam_subjects;
            let subjects = [];
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let subjectData = this.props.globals.globals.subjects.find((a) => a.id == idata.subject_id);
                    // console.log("subjectData", subjectData);
                    let chapters = subjectData.chapters.map((item) => {
                        const topic = item.topics.map((topicData) => {
                            return { ...topicData, checked: false }
                        })
                        return { ...item, topics: topic, chapteractive: "d-flex justify-content-between align-items-center", checked: false, checkedall: false, ownedarray: [] }
                    })
                    let newObject = {
                        id: subjectData.id,
                        subject: subjectData.subject,
                        chapters: chapters,
                        checked: false,
                        subjectactive: "d-flex justify-content-between align-items-center"
                    }
                    subjects.push(newObject);
                }

            }

            this.setState({
                subjects: subjects,
                //examtype: value, 
                examtypevalue: {
                    value: examsData.id,
                    label: examsData.exam
                },
                mains_2021: false
            });
        }
        //else {
        if (name == "searchsubject") {
            let subjectData = this.props.globals.globals.subjects.find((a) => a.id == value);
            this.setState({
                searchsubjectvalue: {
                    value: subjectData.id,
                    label: subjectData.subject
                }
            });
        }
        if (name == "searchchapter") {
            let subjectData = this.props.globals.globals.subjects.find((a) => a.id == this.state.searchsubject);
            let chData = subjectData.chapters.find((a) => a.id == value);
            this.setState({
                searchchaptervalue: {
                    value: chData.id,
                    label: chData.chapter
                }
            });
        }
        if (name == "questiontypes") {
            let questionData = this.props.globals.globals.questionTypes.find((a) => a.id == value);
            this.setState({
                questiontypesvalue: {
                    value: questionData.id,
                    label: questionData.questiontype
                }
            });
        }
        if (name == "applicationtheory") {
            let theoryData = this.props.globals.globals.questionTheory.find((a) => a.id == value);
            this.setState({
                applicationtheoryvalue: {
                    value: theoryData.id,
                    label: theoryData.question_theory
                }
            });
        }
        if (name == "class") {
            let classData = this.props.globals.globals.classes.find((a) => a.id == value);
            this.setState({
                classvalue: {
                    value: classData.id,
                    label: classData.class
                }
            });
        }
        else if (name == "oldpapers") {
            let oldpapersData = this.props.globals.globals.instituteExamPapers.find((a) => a.id == value);

            this.setState({
                oldpapersvalue: {
                    value: oldpapersData.id,
                    label: oldpapersData.exampaper
                }
            });
        }
        if (name == "examtypema") {
            if (value == "1") {
                this.setState({
                    examtypemavalue: {
                        value: value,
                        label: "MAINS"
                    }
                });
            }
            else {
                this.setState({
                    examtypemavalue: {
                        value: value,
                        label: "ADVANCE"
                    }
                });
            }

        }



        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
        //}

    }
    handleInputChange = (e) => {
        console.log("handleInputChange", e.target.name, e.target.checked)
        if (e.target.name == "questionbankquestions") {
            if (e.target.checked == true) {
                this.setState({ questionbankquestions: true });
            }
            else {
                this.setState({ questionbankquestions: false, questionbankpercentage: "0" });
            }

        }
        else if (e.target.name == "ownaddedquestions") {
            if (e.target.checked == true) {
                this.setState({ ownaddedquestions: true });
            }
            else {
                this.setState({ ownaddedquestions: false, ownaddedpercentage: "0" });
            }
        }
        else if (e.target.name == "mains_2021") {

            if (e.target.checked == true) {
                this.setState({
                    mains_2021: true
                });
            }
            else {
                this.setState({
                    mains_2021: false
                });
            }

        }
        else {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({ [name]: value }, () => {
                this.validateField(name, value);
            });
        }

    }
    validateField(fieldName, value) {
        console.log("fieldName", fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let examtypeValid = this.state.examtypeValid;
        let branchValid = this.state.branchValid;
        let classValid = this.state.classValid;
        let sectionValid = this.state.sectionValid;
        let submitError1 = this.state.submitError1;
        let oldpapersValid = this.state.oldpapersValid;
        let startdateValid = this.state.startdateValid;
        let enddateValid = this.state.enddateValid;
        let exam_nameValid = this.state.exam_nameValid;


        switch (fieldName) {
            case "exam_name":
                if (value.length == "") {
                    exam_nameValid = false;
                    fieldValidationErrors.exam_name = "Exam Name Cannot Be Empty";
                } else {
                    exam_nameValid = true;
                    fieldValidationErrors.exam_name = "";
                }

                break;

            case "startdate":
                if (value.length == "") {
                    startdateValid = false;
                    fieldValidationErrors.startdate = "start date Cannot Be Empty";
                } else {
                    startdateValid = true;
                    fieldValidationErrors.startdate = "";
                }

                break;

            case "enddate":
                if (value.length == "") {
                    enddateValid = false;
                    fieldValidationErrors.enddate = "end date Cannot Be Empty";
                } else {
                    enddateValid = true;
                    fieldValidationErrors.enddate = "";
                }

                break;
            case "oldpapers":
                if (value.length == "") {
                    oldpapersValid = false;
                    fieldValidationErrors.oldpapers = "old papers Cannot Be Empty";
                } else {
                    oldpapersValid = true;
                    fieldValidationErrors.oldpapers = "";
                }

                break;

            case "examtype":
                if (value.length == "") {
                    examtypeValid = false;
                    fieldValidationErrors.examtype = "exam type Cannot Be Empty";
                } else {
                    examtypeValid = true;
                    fieldValidationErrors.examtype = "";
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

            case "class":
                if (value.length == "") {
                    classValid = false;
                    fieldValidationErrors.class = "class Cannot Be Empty";
                } else {
                    classValid = true;
                    fieldValidationErrors.class = "";
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

            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                examtypeValid: examtypeValid,
                branchValid: branchValid,
                classValid: classValid,
                sectionValid: sectionValid,
                oldpapersValid: oldpapersValid,
                submitError1: submitError1,
                startdateValid: startdateValid,
                enddateValid: enddateValid,
                exam_nameValid: exam_nameValid




            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid1: this.state.examtypeValid
                && this.state.branchValid
                && this.state.classValid
                && this.state.sectionValid
                && this.state.oldpapersValid
                && this.state.startdateValid
                && this.state.enddateValid
                && this.state.exam_nameValid
        });
        if (this.state.formValid1) {
            this.setState({ submitError1: "" });
        }
    }
    datefunction = (moment, name) => {
        console.log("datefunction", moment._d, name);
        let date = String(moment._d);
        var res = date.substr(4, 20);
        console.log("res", res);
        this.setState({ startdate: res }, () => {
            this.validateField("startdate", "1");
        });
    }
    datefunctionend = (moment, name) => {
        let date = String(moment._d);
        var res = date.substr(4, 20);
        this.setState({ enddate: res }, () => {
            this.validateField("enddate", "1");
        });


    }
    pdfhidefunction = () => {
        this.setState({ modalShowTwo: false });
        this.props.history.push("/questions/create-question-paper");
    }
    render() {
        //console.log("currentstate", this.state);
        if (Cookies.get("token") == undefined) this.props.history.push("/login");
        const globals = this.props.globals;
        const loading3 = globals.loading;
        const error3 = globals.error;

        const getSections = this.props.getSections;
        const loading1 = getSections.loading;
        const error1 = getSections.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
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
                    {(loading3 == true || loading1 == true) && (<PreloaderTwo />)}
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    {
                        !loading1 && !loading3 && (
                            <React.Fragment>
                                <div className="main-content">

                                    <OwnQuestionCollegeExamSection
                                        sectionhandleMultipleSelectInputChange={this.sectionhandleMultipleSelectInputChange}
                                        branchhandleMultipleSelectInputChange={this.branchhandleMultipleSelectInputChange}
                                        pselecthandleInputChange={this.selecthandleInputChange}
                                        globals={globals.globals}
                                        stateData={this.state}
                                        psubjectFunction={this.subjectFunction}
                                        pchapterFunction={this.chapterFunction}
                                        ptopicFunction={this.topicFunction}
                                        ptopiccheckallFunction={this.topiccheckallFunction}
                                        phandleInputChange={this.handleInputChange}
                                        pQuestionFunction={this.QuestionFunction}
                                        ParentgenerateQuestionPaper={this.generateQuestionPaper}
                                        getSections={getSections.getSections}

                                        parentpdatefunction={this.datefunction}
                                        parentpdatefunctionend={this.datefunctionend}
                                        ParenthandleFormSubmit={this.handleFormSubmit}
                                        spinnerStatus={this.spinnerStatus}
                                        parenthandleInputChange={this.handleInputChange}
                                    />
                                </div>
                                <Footer />
                            </React.Fragment>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(
    compose(
        graphql(COLLEGE_PAPER, {
            name: "creategeneralpaperfun"
        }),

        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    },
                    fetchPolicy: 'cache-and-network'
                }), name: "globals"
            }),
        graphql(FETCH_SECTIONS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    },
                    fetchPolicy: 'cache-and-network'
                }), name: "getSections"
            })

    )
        (OwnQuestionCollegeExam));


