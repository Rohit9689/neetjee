import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader';
import OwnQuestionCustomSection from '../components/questioners/create_question_paper/own_question_paper/own_question_types/OwnQuestionCustomSection';
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

const GROUPCOUSTOMGENERAL_PAPER = gql`
  mutation(
    $params:GroupCustomPaper,
    $time_duration:Int,
    $question_count:[SubjectQuestionCount]  
    ) {
        createGroupCustomPaper(
        params: $params,
        time_duration: $time_duration,
        question_count: $question_count
     ){
         filename
        exam_paper_id
        exam_questions{
            id
            subject
            chapter
            question
            option1
            option2
            option3
            option4
            qtype
            compquestion
            list1type
            list2type
            mat_question
            answer
            inputquestion
            chapter_name
        }
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
            avg_question_time
        }
        globalBranches{
            id
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
        complexity{
            id
            complexity
            
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
class OwnQuestionCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            otherexam: "",
            otherexamvalue: "",
            exam_name: "",
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
            advancedsubjects: [],
            questionbankquestions: true,
            ownaddedquestions: false,
            searchsubject: "0",
            searchsubjectvalue: "",
            searchchapter: "0",
            searchchaptervalue: "",
            // questiontypes: "",
            // questiontypesvalue: "",
            questiontypes: [],
            questiontypesvalue: [],
            applicationtheory: "0",
            applicationtheoryvalue: { value: "0", label: "Select All" },
            complexity: "0",
            complexityvalue: { value: "0", label: "Select All" },

            qbsearchsubject: "0",
            qbsearchsubjectvalue: "",
            qbsearchchapter: "0",
            qbsearchchaptervalue: "",
            qbquestiontypes: [],
            qbquestiontypesvalue: [],
            qbapplicationtheory: "0",
            qbapplicationtheoryvalue: { value: "0", label: "Select All" },
            qbcomplexity: "0",
            qbcomplexityvalue: { value: "0", label: "Select All" },

            questionbankpercentage: "100",
            ownaddedpercentage: "0",
            timeduration: 80,
            formErrors: {
                examtype: "",
                branch: "",
                class: "",
                section: "",
                questionbankpercentage: "",
                ownaddedpercentage: "",
                exam_name: "",
                otherexam: "",
                timeduration: ""
            },
            timedurationValid: true,
            questionbankpercentageValid: true,
            ownaddedpercentageValid: false,
            examtypeValid: false,
            branchValid: false,
            classValid: false,
            sectionValid: false,
            exam_nameValid: false,
            otherexamValid: false,
            formValid1: false,
            submitError1: "",
            buttonstatus: "",
            filename: "",
            spinnerStatus: "",
            startdate: "",
            enddate: "",
            isonline: "0",
            modalShow: false,
            modalShowTwo: false,
            generatetype: "1",
            advancedoptions: false,
            // page:1,
            // qbpage:1

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
    componentDidMount() {
        console.log("componentDidMount", this.props.history.location.state);

        let examsData = this.props.history.location.state.getGroupData.globals.exams.find((a) => a.id == this.props.history.location.state.getGroupData.categoryfindData.exams_covered);
        let examsubjectData = examsData.exam_subjects;
        let subjects = [];
        let advancedsubjects = [];
        // newcode
        const qtypes = this.props.history.location.state.getGroupData.globals.questionTypes.map(item => {
            return { ...item, checked: false, percentage: "", active: "", totperError: "" }
        });

        const comp = this.props.history.location.state.getGroupData.globals.complexity.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });

        const qteory = this.props.history.location.state.getGroupData.globals.questionTheory.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });

        const select = {
            id: "0",
            subject: "Select ALL",
            questionTypes: qtypes,
            complexity: comp,
            questionTheory: qteory,
            classActive1: "",
            classActive2: "",
            classActive3: "",
            totpererr1: "",
            totpererr2: "",
            totpererr3: ""

        }
        advancedsubjects.push(select);
        // newcodeend
        if (this.props.history.location.state.getGroupData.categoryfindData.exams_covered != "5") {
            for (let i = 0; i <= examsubjectData.length; i++) {
                let idata = examsubjectData[i];
                //console.log("idata", idata);
                if (idata != undefined) {
                    let subjectData = this.props.history.location.state.getGroupData.globals.subjects.find((a) => a.id == idata.subject_id);
                    // console.log("subjectData", subjectData);
                    let chapters = subjectData.chapters.map((item) => {
                        const topic = item.topics.map((topicData) => {
                            return { ...topicData, checked: false }
                        })
                        return { ...item, topics: topic, chapteractive: "d-flex justify-content-between align-items-center", checked: false, checkedall: false, ownedarray: [], questionbarray: [] }
                    })
                    const advnewObject = {
                        id: subjectData.id,
                        subject: subjectData.subject,
                        subjectactive1: "d-flex justify-content-between align-items-center",
                        subjectactive2: "d-flex justify-content-between align-items-center",
                        subjectactive3: "d-flex justify-content-between align-items-center",
                        questionTypes: qtypes,
                        complexity: comp,
                        questionTheory: qteory,
                        totpererr: ""
                    }
                    advancedsubjects.push(advnewObject);

                    const newObject = {
                        id: subjectData.id,
                        subject: subjectData.subject,
                        chapters: chapters,
                        checked: false,
                        subjectactive: "d-flex justify-content-between align-items-center",
                        qcount: idata.no_of_questions,
                        totError: ""

                    }
                    subjects.push(newObject);

                    // if (examsData.id == "3" || examsData.id == "6") {
                    //     if (subjectData.subject == "Mathematics") {
                    //         const newObject = {
                    //             id: subjectData.id,
                    //             subject: subjectData.subject,
                    //             chapters: chapters,
                    //             checked: false,
                    //             subjectactive: "d-flex justify-content-between align-items-center",
                    //             qcount: 80,
                    //             totError: ""

                    //         }
                    //         subjects.push(newObject);
                    //     }
                    //     else {
                    //         const newObject = {
                    //             id: subjectData.id,
                    //             subject: subjectData.subject,
                    //             chapters: chapters,
                    //             checked: false,
                    //             subjectactive: "d-flex justify-content-between align-items-center",
                    //             qcount: 40,
                    //             totError: ""

                    //         }
                    //         subjects.push(newObject);
                    //     }



                    // }
                    // else if (examsData.id == "7" || examsData.id == "8") {
                    //     const newObject = {
                    //         id: subjectData.id,
                    //         subject: subjectData.subject,
                    //         chapters: chapters,
                    //         checked: false,
                    //         subjectactive: "d-flex justify-content-between align-items-center",
                    //         qcount: 40,
                    //         totError: ""

                    //     }
                    //     subjects.push(newObject);
                    // }
                    // else {
                    //     const newObject = {
                    //         id: subjectData.id,
                    //         subject: subjectData.subject,
                    //         chapters: chapters,
                    //         checked: false,
                    //         subjectactive: "d-flex justify-content-between align-items-center"
                    //     }
                    //     subjects.push(newObject);
                    // }

                }

            }
        }


        this.setState({
            subjects: subjects,
            advancedsubjects: advancedsubjects,
            //examtype: value, 
            examtypevalue: {
                value: examsData.id,
                label: examsData.exam
            },
            examtype: examsData.id,
        });
    }

    squestioncount = (e, subid) => {

        let arr = this.state.subjects.map(item => {
            console.log(e.target.value, "subjects");
            if (item.id == subid) {
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value)) {
                    return { ...item, qcount: parseInt(e.target.value), totError: "" };
                } else {
                    return { ...item, qcount: "", totError: "Invalid Input" }
                }
                // const qtype = item.questionTheory.map(qitem => {
                //     if (qitem.id == qtyid) {
                //         const re = /^[0-9\b]+$/;
                //         if (re.test(e.target.value)) {
                //             if (e.target.value > 100) {
                //                 return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                //             }
                //             else {
                //                 return { ...qitem, percentage: e.target.value, totperError: "" }
                //             }
                //         } else {
                //             return { ...qitem, percentage: "", totperError: "Invalid Input" }
                //         }

                //     }
                //     return qitem;
                // })

            }
            return item;
        }

        )
        this.setState({ subjects: arr });
        //this.totalpercentagequestionTheory(arr, subid, qtyid);


    }
    generateQuestionPaper = (e) => {
        // let status = false;
        // for (const item of this.state.subjects) {
        //     let filterchData = item.chapters.filter((a) => a.checked == true);

        //     let totalCount = 0;
        //     for (const item1 of filterchData) {
        //         let count = item1.topics.filter((a) => a.checked == true).length;
        //         totalCount += parseInt(count);
        //     }
        //     if (totalCount == 0) {
        //         status = false;
        //         break;
        //     }
        //     else {
        //         status = true;
        //     }
        // }

        const persum =
            parseInt(this.state.questionbankpercentage) +
            parseInt(this.state.ownaddedpercentage);
        console.log("this.state.formValid1 && parseInt(persum)", this.state.formValid1, parseInt(persum));
        if (this.state.formValid1 && parseInt(persum) == 100
            //&& status
        ) {
            this.setState({ modalShow: true, submitError1: "" })
        }
        else if (parseInt(persum) != 100 && parseInt(persum) != 0) {
            this.setState({
                submitError1: "Please enter the summation for percentages is 100", spinnerStatus: ""
            });
        }
        // else if (!status) {
        //     this.setState({
        //         submitError1: "Please select at least one chapter and one topic in each subject", spinnerStatus: ""
        //     });
        // }
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
    };
    sectionhandleMultipleSelectInputChange = e => {
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
    };
    handleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        this.setState({
            spinnerStatus: "1"
        });
        let stateSyllabus = this.state.subjects;
        let syllabusArray = [];
        let ownedQuestion = [];
        let qbankQuestion = [];

        for (let i = 0; i < stateSyllabus.length; i++) {

            let idata = stateSyllabus[i];
            console.log("idata", idata);
            let totalchapters = idata.chapters;
            let topicArray = [];
            for (let x = 0; x < totalchapters.length; x++) {
                let tdata = totalchapters[x];
                if (tdata.ownedarray.length > 0) {
                    tdata.ownedarray.map((ownedarraymapData) => {
                        const newquestionId = ownedarraymapData;
                        ownedQuestion.push(parseInt(newquestionId.id));
                    })

                }
                if (tdata.questionbarray.length > 0) {
                    tdata.questionbarray.map((questionbarraymapData) => {
                        const newquestionId = questionbarraymapData;
                        qbankQuestion.push(parseInt(newquestionId.id));
                    })

                }

                let totaltopics = tdata.topics;

                for (let y = 0; y < totaltopics.length; y++) {
                    let ttdata = totaltopics[y];
                    console.log("ttdata", ttdata);
                    if (ttdata.checked == true) {
                        let newtopic = ttdata.id;
                        console.log("newtopic", newtopic);
                        topicArray.push(newtopic);

                    }
                }


            }
            console.log("topicArray", topicArray);
            const newSyllabus = {
                subject_id: parseInt(idata.id),
                chapters: [],
                topics: topicArray
            }
            syllabusArray.push(newSyllabus);
        }
        console.log("syllabusArray", syllabusArray);

        let newArray = syllabusArray.filter(item =>
            item.topics.length > 0
        )

        console.log('newArray', newArray);
        let startdate = "";
        if (this.state.startdate == "") {

            startdate = moment().format("DD-MM-YYYY HH:mm:ss");
            //moment().format("DD-MM-YYYY @ HH:mm:ss");
        }
        else {
            startdate = this.state.startdate;
        }

        let enddate = "";
        if (this.state.enddate == "") {
            enddate = moment().format("DD-MM-YYYY HH:mm:ss");
        }
        else {
            enddate = this.state.enddate;
        }
        let examtypema = "";
        if (this.state.examtype == "2" || this.state.otherexam == "2") {
            examtypema = this.state.examtypema;
        } else {
            examtypema = "0";
        }

        let exam_type = "";
        if (this.state.examtype == "5") {
            exam_type = this.state.otherexam;
        } else {
            exam_type = this.state.examtype;
        }

        let autogenerate = true
        if (this.state.generatetype == "2") {
            autogenerate = false
        }
        let advanced_options = [];
        this.state.advancedsubjects.map((adsmap) => {
            if (adsmap.id != 0) {


                let concept = "", application = "", easy = "", moderate = "", difficult = "", highdifficult = "";

                adsmap.questionTheory.map((cpmap) => {
                    if (cpmap.id == "1") {
                        if (cpmap.percentage != "") {
                            concept = parseInt(cpmap.percentage);
                        }
                        else {
                            concept = 0;
                        }


                    }
                    if (cpmap.id == "2") {
                        if (cpmap.percentage != "") {
                            application = parseInt(cpmap.percentage);
                        }
                        else {
                            application = 0;
                        }


                    }

                });

                adsmap.complexity.map((cpmap1) => {
                    if (cpmap1.id == "1") {
                        if (cpmap1.percentage != "") {
                            easy = parseInt(cpmap1.percentage);
                        }
                        else {
                            easy = 0;
                        }


                    }
                    if (cpmap1.id == "2") {
                        if (cpmap1.percentage != "") {
                            moderate = parseInt(cpmap1.percentage);
                        }
                        else {
                            moderate = 0;
                        }


                    }
                    if (cpmap1.id == "3") {
                        if (cpmap1.percentage != "") {
                            difficult = parseInt(cpmap1.percentage);
                        }
                        else {
                            difficult = 0;
                        }


                    }
                    if (cpmap1.id == "5") {
                        if (cpmap1.percentage != "") {
                            highdifficult = parseInt(cpmap1.percentage);
                        }
                        else {
                            highdifficult = 0;
                        }

                    }

                });
                let question_types = [];
                adsmap.questionTypes.map((map) => {
                    if (map.percentage != "") {
                        const newObj = {
                            id: parseInt(map.id),
                            percentage: parseInt(map.percentage)
                        }
                        question_types.push(newObj);

                    }



                });
                const newadOb = {
                    subject_id: parseInt(adsmap.id),
                    concept: concept,
                    application: application,
                    easy: easy,
                    moderate: moderate,
                    difficult: difficult,
                    highdifficult: highdifficult,
                    question_types: question_types,
                }
                advanced_options.push(newadOb);
            }
        });
        let creategeneralpaper = "";
        creategeneralpaper = {
            syllabus: newArray,
            exam_name: this.state.exam_name,
            exam_type: parseInt(exam_type),
            class_id: parseInt(this.state.class),
            branch: this.props.history.location.state.getGroupData.groupsData.branch_ids,
            section: this.props.history.location.state.getGroupData.groupsData.section_ids,
            group_id: parseInt(this.props.history.location.state.getGroupData.groupsData.id),
            sub_exam_type: parseInt(examtypema),
            questionbank_percentage: parseInt(this.state.questionbankpercentage),
            institution_percentage: parseInt(this.state.ownaddedpercentage),
            no_of_sets: parseInt(this.state.noofsets),
            start_time: startdate,
            end_time: enddate,
            institution_questions: ownedQuestion.toString(),
            institution_id: parseInt(Cookies.get("institutionid")),
            username: Cookies.get("username"),
            autogenerate: autogenerate,
            questionbank_questions: qbankQuestion.toString(),
            advanced: this.state.advancedoptions,
            advanced_options: advanced_options,


        }
        const question_count = this.state.subjects.map((a) => {
            return {
                subject_id: parseInt(a.id),
                question_count: parseInt(a.qcount)
            }
        });
        console.log('creategeneralpaper', creategeneralpaper,
            parseInt(this.state.timeduration),
            question_count);

        this.creategroupgeneralpaperfun(
            creategeneralpaper,
            parseInt(this.state.timeduration),
            question_count
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError1: error.graphQLErrors.map(x => x.message), spinnerStatus: ""
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
    };
    creategroupgeneralpaperfun = async (
        params,
        time_duration,
        question_count
    ) => {
        await this.props.creategroupgeneralpaperfun({
            variables: {
                params,
                time_duration,
                question_count
            },
            update: (store, { data }) => {
                console.log("createGeneralPaperdata", data);
                if (data.createGroupCustomPaper) {
                    let tcq = 0;
                    let totalExamCount3 = "";

                    if (this.state.examtype == "3" || this.state.examtype == "6" || this.state.examtype == "7" || this.state.examtype == "8") {

                        this.state.subjects.map((item) => {
                            tcq = tcq + item.qcount
                        });

                        let eduration = this.props.globals.globals.exams.find((a) => a.id == this.state.examtype);
                        console.log("eduration", eduration);

                        if (eduration != undefined) {
                            totalExamCount3 = parseFloat(eduration.avg_question_time) * parseFloat(tcq);
                        }
                    }
                    console.log("tcqtotalExamCount3", tcq, totalExamCount3);
                    this.setState({
                        currentStep: 5,
                        // exam_name: "",
                        // examtypevalue: "",
                        // examtype: "",
                        // branch: "",
                        // class: "",
                        // classvalue: "",
                        // section: "",
                        // examtypema: "1",
                        // examtypemavalue: { value: "1", label: "mains" },
                        // noofsets: "1",
                        // subjects: [],
                        // questionbankquestions: false,
                        // ownaddedquestions: false,
                        // searchsubject: "0",
                        // searchsubjectvalue: "",
                        // searchchapter: "0",
                        // searchchaptervalue: "",
                        // questionbankpercentage: "0",
                        // ownaddedpercentage: "0",
                        // questiontypes: "",
                        // questiontypesvalue: "",
                        // applicationtheory: "",
                        // applicationtheoryvalue: "",
                        // formErrors: {
                        //     examtype: "",
                        //     branch: "",
                        //     class: "",
                        //     section: "",
                        //     questionbankpercentage: "",
                        //     ownaddedpercentage: "",

                        // },
                        // questionbankpercentageValid: false,
                        // ownaddedpercentageValid: false,
                        // examtypeValid: false,
                        // branchValid: false,
                        // classValid: false,
                        // sectionValid: false,
                        // formValid1: false,
                        submitError1: "",
                        // buttonstatus: "",
                        // filename: "",
                        // spinnerStatus: "",
                        // startdate: "",
                        // enddate: "",
                        // isonline: "0",
                        // modalShow: false,
                        // modalShowTwo: false,

                        filename: data.createGroupCustomPaper.filename,
                    });
                    //if (this.state.buttonstatus == "shedule") {
                    this.props.history.push({
                        pathname: "/questions/create-question-paper/own-question-paper/questionsPreview",
                        state: {
                            subjects: this.state.subjects,
                            examtypema: this.state.examtypema,
                            examtypemavalue: this.state.examtypemavalue,
                            class: this.state.class,
                            classvalue: this.state.classvalue,
                            examtype: this.state.examtype,
                            examtypevalue: this.state.examtypevalue,
                            exam_paper_id: data.createGroupCustomPaper.exam_paper_id,
                            exam_questions: data.createGroupCustomPaper.exam_questions,
                            breadCrumbsData: this.props.history.location.state,
                            type: "normal",
                            tcq: tcq,
                            totalExamCount3: totalExamCount3

                        }
                    });
                    // }
                    // else {
                    //     console.log("this.state.buttonstatus1");
                    //     this.setState({ currentStep: 1, modalShow: false, modalShowTwo: true });
                    // }
                    //setTimeout(() => { this.SetpageLoad1(data) }, 1000);
                }
            }
        });
    };
    SetpageLoad1 = (data) => {
        console.log("this.state.buttonstatus");
        if (this.state.buttonstatus == "shedule") {
            //this.setState({ currentStep: 1, modalShow: false });
            this.props.history.push({
                pathname: "/questions/create-question-paper/own-question-paper/questionsPreview",
                state: {
                    subjects: this.state.subjects,
                    examtypema: this.state.examtypema,
                    examtypemavalue: this.state.examtypemavalue,
                    class: this.state.class,
                    classvalue: this.state.classvalue,
                    examtype: this.state.examtype,
                    examtypevalue: this.state.examtypevalue,
                    exam_paper_id: data.createGroupCustomPaper.exam_paper_id,
                    exam_questions: data.createGroupCustomPaper.exam_questions,
                    breadCrumbsData: this.props.history.location.state
                }
            });
        }
        else {
            this.setState({ currentStep: 1, modalShow: false, modalShowTwo: true });
        }
    }
    QuestionFunction = (e, questionsdata, type) => {
        console.log("mQuestionFunction", e, questionsdata, type, this.state.subjects);
        let subjectArray = [];
        if (type == "qbank") {
            subjectArray = this.state.subjects.map((subjectData) => {
                if (subjectData.id == this.state.qbsearchsubject) {
                    const chData = subjectData.chapters.map((chmapData) => {
                        if (chmapData.id == this.state.qbsearchchapter) {
                            if (e.target.checked == true) {
                                let array = chmapData.questionbarray;
                                array.push({ ...questionsdata });
                                return { ...chmapData, questionbarray: array }
                            }
                            else {
                                const questionbarray = chmapData.questionbarray.filter((a) => a.id != questionsdata.id);
                                //questionbarray.push(questionsdata);
                                return { ...chmapData, questionbarray: questionbarray }
                            }
                        }
                        return { ...chmapData }

                    })
                    return { ...subjectData, chapters: chData }
                }
                return { ...subjectData }
            })
        }
        if (type == "wbank") {
            subjectArray = this.state.subjects.map((subjectData) => {
                if (subjectData.id == this.state.searchsubject) {
                    const chData = subjectData.chapters.map((chmapData) => {
                        if (chmapData.id == this.state.searchchapter) {
                            if (e.target.checked == true) {
                                let array1 = chmapData.ownedarray;
                                array1.push({ ...questionsdata });
                                return { ...chmapData, ownedarray: array1 }
                            }
                            else {
                                const ownedarray = chmapData.ownedarray.filter((a) => a.id != questionsdata.id);
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
        }

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
    handleMultipleSelectInputChange = (e, name) => {
        console.log("handleMultipleSelectInputChange", e, name);
        if (name == "qbquestiontypes") {
            let qbquestiontypes = Array();
            let qbquestiontypesvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const qbquestiontypesval = e[i];
                    const newObj = {
                        label: qbquestiontypesval.label,
                        value: qbquestiontypesval.value
                    }
                    qbquestiontypesvalue.push(newObj);
                    qbquestiontypes.push(qbquestiontypesval.value);
                }
                this.setState({
                    qbquestiontypesvalue: qbquestiontypesvalue,
                    qbquestiontypes: qbquestiontypes
                });
            }
        }
        if (name == "questiontypes") {
            let questiontypes = Array();
            let questiontypesvalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    const questiontypesval = e[i];
                    const newObj = {
                        label: questiontypesval.label,
                        value: questiontypesval.value
                    }
                    questiontypesvalue.push(newObj);
                    questiontypes.push(questiontypesval.value);
                }
                this.setState({
                    questiontypesvalue: questiontypesvalue,
                    questiontypes: questiontypes
                });
            }
        }
    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (ename == "otherexam") {
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
                        return { ...item, topics: topic, chapteractive: "d-flex justify-content-between align-items-center", checked: false, checkedall: false, ownedarray: [], questionbarray: [] }
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
                //otherexam: value, 
                otherexamvalue: {
                    value: examsData.id,
                    label: examsData.exam
                }
            });
        }
        //else {
        // if (name == "otherexam") {
        //     let otherexamData = this.props.globals.globals.exams.find((a) => a.id == value);
        //     this.setState({
        //         otherexamvalue: {
        //             value: otherexamData.id,
        //             label: otherexamData.exam
        //         }
        //     });
        // }
        if (name == "searchsubject") {
            let subjectData = this.props.globals.globals.subjects.find((a) => a.id == value);
            this.setState({
                searchsubjectvalue: {
                    value: subjectData.id,
                    label: subjectData.subject
                },
                searchchapter: "",
                searchchaptervalue: "",
                questiontypes: [],
                questiontypesvalue: [],
                applicationtheory: "0",
                applicationtheoryvalue: { value: "0", label: "Select All" },
                complexity: "0",
                complexityvalue: { value: "0", label: "Select All" }

            });
        }
        if (name == "qbsearchsubject") {
            let subjectData = this.props.globals.globals.subjects.find((a) => a.id == value);
            this.setState({
                qbsearchsubjectvalue: {
                    value: subjectData.id,
                    label: subjectData.subject
                },
                qbsearchchapter: "",
                qbsearchchaptervalue: "",
                qbquestiontypes: [],
                qbquestiontypesvalue: [],
                qbapplicationtheory: "0",
                qbapplicationtheoryvalue: { value: "0", label: "Select All" },
                qbcomplexity: "0",
                qbcomplexityvalue: { value: "0", label: "Select All" }
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
        if (name == "qbsearchchapter") {
            let subjectData = this.props.globals.globals.subjects.find((a) => a.id == this.state.qbsearchsubject);
            let chData = subjectData.chapters.find((a) => a.id == value);
            this.setState({
                qbsearchchaptervalue: {
                    value: chData.id,
                    label: chData.chapter
                }
            });
        }
        if (name == "complexity") {
            if (value != "0") {
                let complexityData = this.props.globals.globals.complexity.find((a) => a.id == value);
                this.setState({
                    complexityvalue: {
                        value: complexityData.id,
                        label: complexityData.complexity
                    }
                });
            }
            else {
                this.setState({
                    complexityvalue: { value: "0", label: "Select All" }
                });

            }

        }
        if (name == "qbcomplexity") {
            if (value != "0") {
                let complexityData = this.props.globals.globals.complexity.find((a) => a.id == value);
                this.setState({
                    qbcomplexityvalue: {
                        value: complexityData.id,
                        label: complexityData.complexity
                    }
                });
            }
            else {
                this.setState({
                    qbcomplexityvalue: { value: "0", label: "Select All" }
                });

            }

        }

        // if (name == "questiontypes") {
        //     let questionData = this.props.globals.globals.questionTypes.find((a) => a.id == value);
        //     this.setState({
        //         questiontypesvalue: {
        //             value: questionData.id,
        //             label: questionData.questiontype
        //         }
        //     });
        // }
        // if (name == "qbquestiontypes") {
        //     let questionData = this.props.globals.globals.questionTypes.find((a) => a.id == value);
        //     this.setState({
        //         qbquestiontypesvalue: {
        //             value: questionData.id,
        //             label: questionData.questiontype
        //         }
        //     });
        // }
        if (name == "applicationtheory") {
            if (value != "0") {
                let theoryData = this.props.globals.globals.questionTheory.find((a) => a.id == value);
                this.setState({
                    applicationtheoryvalue: {
                        value: theoryData.id,
                        label: theoryData.question_theory
                    }
                });

            }
            else {
                this.setState({
                    applicationtheoryvalue: { value: "0", label: "Select All" }
                });
            }

        }
        if (name == "qbapplicationtheory") {
            if (value != "0") {
                let theoryData = this.props.globals.globals.questionTheory.find((a) => a.id == value);
                this.setState({
                    qbapplicationtheoryvalue: {
                        value: theoryData.id,
                        label: theoryData.question_theory
                    }
                });
            } else {
                this.setState({
                    qbapplicationtheoryvalue: { value: "0", label: "Select All" }
                });

            }

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
    }
    handleInputChange = (e) => {
        console.log("handleInputChange", e.target.name, e.target.checked)
        if (e.target.name == "generatetype") {
            const subjects = this.state.subjects.map((smap) => {
                const chapters = smap.chapters.map((cmap) => {
                    const topic = cmap.topics.map((topicData) => {
                        return { ...topicData, checked: false }
                    })
                    return {
                        ...cmap, chapteractive: "d-flex justify-content-between align-items-center", topics: topic, checked: false, checkedall: false, ownedarray: [], questionbarray: []
                    }

                })
                return {
                    ...smap,
                    chapters: chapters,
                    checked: false,
                    subjectactive: "d-flex justify-content-between align-items-center",
                    totError: ""
                }

            });
            this.setState({
                subjects: subjects,
                searchsubject: "0",
                searchsubjectvalue: "",
                searchchapter: "0",
                searchchaptervalue: "",
                questiontypes: [],
                questiontypesvalue: [],
                applicationtheory: "0",
                applicationtheoryvalue: { value: "0", label: "Select All" },
                complexity: "0",
                complexityvalue: { value: "0", label: "Select All" },

                qbsearchsubject: "0",
                qbsearchsubjectvalue: "",
                qbsearchchapter: "0",
                qbsearchchaptervalue: "",
                qbquestiontypes: [],
                qbquestiontypesvalue: [],
                qbapplicationtheory: "0",
                qbapplicationtheoryvalue: { value: "0", label: "Select All" },
                qbcomplexity: "0",
                qbcomplexityvalue: { value: "0", label: "Select All" },
            });

        }
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
        else if (e.target.name == "advancedoptions") {
            if (e.target.checked == true) {
                this.setState({ advancedoptions: true });
            }
            else {
                this.setState({ advancedoptions: false });
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
        let exam_nameValid = this.state.exam_nameValid;
        let submitError1 = this.state.submitError1;
        let classValid = this.state.classValid;
        let questionbankpercentageValid = this.state.questionbankpercentageValid;
        let ownaddedpercentageValid = this.state.ownaddedpercentageValid;
        let otherexamValid = this.state.otherexamValid;
        let timedurationValid = this.state.timedurationValid;

        let summation = parseInt(this.state.questionbankpercentage) + parseInt(this.state.ownaddedpercentage);
        console.log("summation", parseInt(this.state.questionbankpercentage) + parseInt(this.state.ownaddedpercentage));
        switch (fieldName) {
            case "questionbankpercentage":
                if (summation > 100
                    || summation < 100 ||
                    isNaN(summation)
                ) {
                    questionbankpercentageValid = false;
                    fieldValidationErrors.questionbankpercentage = "Please enter the summation for percentages is 100";
                }
                else {
                    questionbankpercentageValid = true;
                    fieldValidationErrors.questionbankpercentage = "";

                    ownaddedpercentageValid = true;
                    fieldValidationErrors.ownaddedpercentage = "";
                }

                break;

            case "ownaddedpercentage":
                if (summation > 100
                    || summation < 100 ||
                    isNaN(summation)) {
                    ownaddedpercentageValid = false;
                    fieldValidationErrors.ownaddedpercentage = "Please enter the summation for percentages is 100";
                }
                else {
                    ownaddedpercentageValid = true;
                    fieldValidationErrors.ownaddedpercentage = "";

                    questionbankpercentageValid = true;
                    fieldValidationErrors.questionbankpercentage = "";
                }

                break;

            case "exam_name":
                if (value.length == "") {
                    exam_nameValid = false;
                    fieldValidationErrors.exam_name = "Exam Name Cannot Be Empty";
                } else {
                    exam_nameValid = true;
                    fieldValidationErrors.exam_name = "";
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

            case "otherexam":
                if (value.length == "") {
                    otherexamValid = false;
                    fieldValidationErrors.otherexam = "Exam Cannot Be Empty";
                } else {
                    otherexamValid = true;
                    fieldValidationErrors.otherexam = "";
                }

                break;

            case "timeduration":


                //var pattern = new RegExp(/^[0-9\b]+$/);
                var pattern = new RegExp("^[-+]?[0-9]*$");

                if (!pattern.test(value)) {
                    timedurationValid = false;
                    fieldValidationErrors.timeduration = "Invalid Input";
                } else {
                    timedurationValid = true;
                    fieldValidationErrors.timeduration = "";
                }

                break;

            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                exam_nameValid: exam_nameValid,
                questionbankpercentageValid: questionbankpercentageValid,
                ownaddedpercentageValid: ownaddedpercentageValid,
                submitError1: submitError1,
                classValid: classValid,
                otherexamValid: otherexamValid,
                timedurationValid: timedurationValid

            },
            this.validateForm
        );
    }
    validateForm() {
        if (this.state.examtype == "5") {
            this.setState({

                formValid1:
                    this.state.exam_nameValid
                    && this.state.classValid
                    && this.state.otherexamValid
                    && (this.state.questionbankpercentageValid || this.state.ownaddedpercentageValid)
            });
        }
        else {
            this.setState({

                formValid1:
                    this.state.exam_nameValid
                    && this.state.classValid
                    && (this.state.questionbankpercentageValid || this.state.ownaddedpercentageValid)
            });
        }

        if (this.state.formValid1) {
            this.setState({ submitError1: "" });
        }
    }
    sheduleFunction = (e) => {
        this.setState({ isonline: "1" });
        this.setState({
            submitError: "",
            buttonstatus: "shedule"
        });
    }
    datefunction = (moment, name) => {
        console.log("datefunction", moment._d, name);
        let date = String(moment._d);
        var res = date.substr(4, 20);
        console.log("res", res);
        this.setState({ startdate: res });

        this.setState({
            submitError1: ""
        });
    }
    datefunctionend = (moment, name) => {
        console.log("datefunction", moment._d, name);
        let date = String(moment._d);
        var res = date.substr(4, 20);
        console.log("res", res);
        this.setState({ enddate: res });

        this.setState({
            submitError1: ""
        });
    }
    pdfhidefunction = () => {
        this.setState({ modalShowTwo: false });
        this.props.history.push("/questions/create-question-paper");
    }
    //new functions start
    subjectFunction1 = (id, type) => {
        let advancedsubjects = [];
        if (type == "qtype") {
            advancedsubjects = this.state.advancedsubjects.map((admap) => {
                if (admap.id == id) {
                    return {
                        ...admap, subjectactive1: "d-flex justify-content-between align-items-center active"
                    }

                }
                else {
                    return {
                        ...admap, subjectactive1: "d-flex justify-content-between align-items-center"
                    }
                }

            });
        }
        else if (type == "comp") {
            advancedsubjects = this.state.advancedsubjects.map((admap) => {
                if (admap.id == id) {
                    return {
                        ...admap, subjectactive2: "d-flex justify-content-between align-items-center active"
                    }

                }
                else {
                    return {
                        ...admap, subjectactive2: "d-flex justify-content-between align-items-center"
                    }
                }

            });
        }
        else if (type == "theory") {
            advancedsubjects = this.state.advancedsubjects.map((admap) => {
                if (admap.id == id) {
                    return {
                        ...admap, subjectactive3: "d-flex justify-content-between align-items-center active"
                    }

                }
                else {
                    return {
                        ...admap, subjectactive3: "d-flex justify-content-between align-items-center"
                    }
                }

            });
        }

        this.setState({ advancedsubjects: advancedsubjects })
    }
    questiontypeFunction = (e, subid, qtyid) => {
        // console.log("chaptersFunction", subid, qtyid);
        // let foundData = this.state.advancedsubjects.find((a) => a.id == subid);
        // let overAllQuestion = foundData.questionTypes;

        // let findactive = overAllQuestion.find((a) => a.active == "active");
        // if (findactive != undefined) {
        //     let findex = overAllQuestion.indexOf(findactive);
        //     overAllQuestion[findex].active = "";
        // }
        if (subid == "0") {
            let arr1 = this.state.advancedsubjects.map(item => {

                const qtype = item.questionTypes.map(qitem => {
                    if (qitem.id == qtyid) {

                        if (qitem.checked == false) {
                            return { ...qitem, checked: true, active: "active" }
                        } else {
                            return { ...qitem, checked: false, active: "active" }
                        }
                    }
                    return qitem;
                })
                return { ...item, questionTypes: qtype };

            }

            )
            this.setState({ advancedsubjects: arr1 });

        }
        else {
            let arr = this.state.advancedsubjects.map(item => {
                if (item.id == subid) {
                    const qtype = item.questionTypes.map(qitem => {
                        if (qitem.id == qtyid) {

                            if (qitem.checked == false) {
                                return { ...qitem, checked: true, active: "active" }
                            } else {
                                return { ...qitem, checked: false, active: "active" }
                            }
                        }
                        return qitem;
                    })
                    return { ...item, questionTypes: qtype };
                }
                return item;
            }

            )
            this.setState({ advancedsubjects: arr });
        }
    }
    percentageFun1 = (e, subid, qtyid) => {
        console.log("e.target.value", e.target.value);
        if (subid == "0") {
            let arr = this.state.advancedsubjects.map(item => {

                const qtype = item.questionTypes.map(qitem => {
                    if (qitem.id == qtyid) {
                        const re = /^[0-9\b]+$/;
                        if (re.test(e.target.value)) {
                            if (e.target.value > 100) {
                                return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                            }
                            else {
                                return { ...qitem, percentage: e.target.value, totperError: "" }
                            }
                        }
                        else {
                            return { ...qitem, percentage: "", totperError: "Invalid Input" }
                        }

                    }
                    return qitem;
                })
                return { ...item, questionTypes: qtype };

            }

            )
            this.setState({ advancedsubjects: arr });
            this.totalpercentagequestionTypes(arr, subid, qtyid);
        }
        else {
            let arr = this.state.advancedsubjects.map(item => {
                if (item.id == subid) {
                    const qtype = item.questionTypes.map(qitem => {
                        if (qitem.id == qtyid) {
                            const re = /^[0-9\b]+$/;
                            if (re.test(e.target.value)) {
                                if (e.target.value > 100) {
                                    return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                                }
                                else {
                                    return { ...qitem, percentage: e.target.value, totperError: "" }
                                }
                            }
                            else {
                                return { ...qitem, percentage: "", totperError: "Invalid Input" }
                            }


                        }
                        return qitem;
                    })
                    return { ...item, questionTypes: qtype };
                }
                return item;
            }

            )
            this.setState({ advancedsubjects: arr });
            this.totalpercentagequestionTypes(arr, subid, qtyid);
        }
    }
    totalpercentagequestionTypes = (arr, subid, qtyid) => {
        if (subid == 0) {
            let count1 = 0;
            let newArray1 = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.questionTypes;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray1.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray1) {
                count1 = count1 + num
            }
            if (count1 > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr1 = "Total percentage should be 100%";

                let chapterData = findData.questionTypes;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr1 = "Total percentage should be 100%";
                        if (tdata != undefined) {
                            let tquestions = tdata.questionTypes;
                            let findqtData = tquestions.find((a) => a.id == qtyid);
                            let qutid = tquestions.indexOf(findqtData);
                            tquestions[qutid].percentage = "";
                        }
                    }

                }

            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr1 = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr1 = "";
                    }

                }
            }
            this.setState({ advancedsubjects: arr });

        }
        else {
            let count = 0;
            let newArray = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.questionTypes;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray) {
                count = count + num
            }
            if (count > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr1 = "Total percentage should be 100%";

                let chapterData = findData.questionTypes;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr1 = "";
            }
            this.setState({ advancedsubjects: arr });

        }

    }
    totalpercentagecomplexity = (arr, subid, qtyid) => {
        if (subid == 0) {
            let count1 = 0;
            let newArray1 = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.complexity;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray1.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray1) {
                count1 = count1 + num
            }
            if (count1 > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr2 = "Total percentage should be 100%";

                let chapterData = findData.complexity;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr2 = "Total percentage should be 100%";
                        if (tdata != undefined) {
                            let tquestions = tdata.complexity;
                            let findqtData = tquestions.find((a) => a.id == qtyid);
                            let qutid = tquestions.indexOf(findqtData);
                            tquestions[qutid].percentage = "";
                        }
                    }

                }

            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr2 = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr2 = "";
                    }

                }
            }
            this.setState({ advancedsubjects: arr });

        }
        else {
            let count = 0;
            let newArray = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.complexity;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray) {
                count = count + num
            }
            if (count > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr2 = "Total percentage should be 100%";

                let chapterData = findData.complexity;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr2 = "";
            }
            this.setState({ advancedsubjects: arr });

        }

    }
    totalpercentagequestionTheory = (arr, subid, qtyid) => {
        if (subid == 0) {
            let count1 = 0;
            let newArray1 = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.questionTheory;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray1.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray1) {
                count1 = count1 + num
            }
            if (count1 > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr3 = "Total percentage should be 100%";

                let chapterData = findData.questionTheory;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr3 = "Total percentage should be 100%";
                        if (tdata != undefined) {
                            let tquestions = tdata.questionTheory;
                            let findqtData = tquestions.find((a) => a.id == qtyid);
                            let qutid = tquestions.indexOf(findqtData);
                            tquestions[qutid].percentage = "";
                        }
                    }

                }

            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr3 = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr3 = "";
                    }

                }
            }
            this.setState({ advancedsubjects: arr });
        }
        else {
            let count = 0;
            let newArray = [];
            for (let i = 0; i <= arr.length; i++) {
                let idata = arr[i];
                if (idata != undefined) {
                    if (idata.id == subid) {
                        let stuChapters = idata.questionTheory;
                        for (let s = 0; s <= stuChapters.length; s++) {
                            let sdata = stuChapters[s];
                            if (sdata != undefined) {
                                if (sdata.percentage != "") {
                                    const newData = sdata.percentage;
                                    newArray.push(parseInt(newData));
                                }

                            }

                        }
                    }
                }

            }
            for (let num of newArray) {
                count = count + num
            }
            if (count > 100) {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr3 = "Total percentage should be 100%";

                let chapterData = findData.questionTheory;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr3 = "";
            }
            this.setState({ advancedsubjects: arr });

        }

    }

    percentageFun2 = (e, subid, qtyid) => {
        if (subid == "0") {
            let arr1 = this.state.advancedsubjects.map(item => {

                const qtype = item.complexity.map(qitem => {
                    if (qitem.id == qtyid) {
                        const re = /^[0-9\b]+$/;
                        if (re.test(e.target.value)) {
                            if (e.target.value > 100) {
                                return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                            }
                            else {
                                return { ...qitem, percentage: e.target.value, totperError: "" }
                            }
                        } else {
                            return { ...qitem, percentage: "", totperError: "Invalid Input" }

                        }

                    }

                    return qitem;
                })
                return { ...item, complexity: qtype };

            }

            )
            this.setState({ advancedsubjects: arr1 });
            this.totalpercentagecomplexity(arr1, subid, qtyid);
        }
        else {
            let arr = this.state.advancedsubjects.map(item => {
                if (item.id == subid) {
                    const qtype = item.complexity.map(qitem => {
                        if (qitem.id == qtyid) {
                            const re = /^[0-9\b]+$/;
                            if (re.test(e.target.value)) {
                                if (e.target.value > 100) {
                                    return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                                }
                                else {
                                    return { ...qitem, percentage: e.target.value, totperError: "" }
                                }
                            }
                            else {
                                return { ...qitem, percentage: "", totperError: "Invalid Input" }
                            }

                        }
                        return qitem;
                    })
                    return { ...item, complexity: qtype };
                }
                return item;
            }

            )
            this.setState({ advancedsubjects: arr });
            this.totalpercentagecomplexity(arr, subid, qtyid);
        }
    }
    percentageFun3 = (e, subid, qtyid) => {
        if (subid == "0") {
            let arr1 = this.state.advancedsubjects.map(item => {
                const qtype = item.questionTheory.map(qitem => {
                    if (qitem.id == qtyid) {
                        const re = /^[0-9\b]+$/;
                        if (re.test(e.target.value)) {
                            if (e.target.value > 100) {
                                return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                            }
                            else {
                                return { ...qitem, percentage: e.target.value, totperError: "" }
                            }
                        }
                        else {
                            return { ...qitem, percentage: "", totperError: "Invalid Input" }
                        }

                    }
                    return qitem;
                })
                return { ...item, questionTheory: qtype };

            }

            )
            this.setState({ advancedsubjects: arr1 });
            this.totalpercentagequestionTheory(arr1, subid, qtyid);
        }
        else {
            let arr = this.state.advancedsubjects.map(item => {
                if (item.id == subid) {
                    const qtype = item.questionTheory.map(qitem => {
                        if (qitem.id == qtyid) {
                            const re = /^[0-9\b]+$/;
                            if (re.test(e.target.value)) {
                                if (e.target.value > 100) {
                                    return { ...qitem, percentage: "", totperError: "Total percentage should be 100%" }
                                }
                                else {
                                    return { ...qitem, percentage: e.target.value, totperError: "" }
                                }
                            } else {
                                return { ...qitem, percentage: "", totperError: "Invalid Input" }
                            }

                        }
                        return qitem;
                    })
                    return { ...item, questionTheory: qtype };
                }
                return item;
            }

            )
            this.setState({ advancedsubjects: arr });
            this.totalpercentagequestionTheory(arr, subid, qtyid);

        }
    }
    //new functions end
    render() {
        console.log("this.props.history.location.state", this.props.history.location.state);
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
                    {(loading3 == true) && (loading1 == true) && (<PreloaderTwo />)}
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    {
                        !loading1 && !loading3 && (
                            <React.Fragment>
                                <div className="main-content">

                                    <OwnQuestionCustomSection
                                        breadCrumbsData={this.props.history.location.state}
                                        sectionhandleMultipleSelectInputChange={this.sectionhandleMultipleSelectInputChange}
                                        branchhandleMultipleSelectInputChange={this.branchhandleMultipleSelectInputChange}
                                        pselecthandleInputChange={this.selecthandleInputChange}
                                        globals={globals.globals}
                                        stateData={this.state}
                                        psubjectFunction={this.subjectFunction}

                                        squestioncount={this.squestioncount}
                                        pchapterFunction={this.chapterFunction}
                                        ptopicFunction={this.topicFunction}
                                        ptopiccheckallFunction={this.topiccheckallFunction}
                                        phandleInputChange={this.handleInputChange}
                                        pQuestionFunction={this.QuestionFunction}
                                        ParentgenerateQuestionPaper={this.generateQuestionPaper}
                                        getSections={getSections.getSections}

                                        subjectFunction1={this.subjectFunction1}
                                        questiontypeFunction={this.questiontypeFunction}
                                        percentageFun1={this.percentageFun1}
                                        percentageFun2={this.percentageFun2}
                                        percentageFun3={this.percentageFun3}
                                        handleMultipleSelectInputChange={this.handleMultipleSelectInputChange}
                                    />
                                </div>
                                <Footer />
                                <QuestionModal
                                    stateData={this.state}
                                    parentpdatefunction={this.datefunction}
                                    parentpdatefunctionend={this.datefunctionend}
                                    ParentsheduleFunction={this.sheduleFunction}
                                    ParenthandleFormSubmit={this.handleFormSubmit}
                                    show={this.state.modalShow}
                                    showothermodal={() => this.setState({ modalShowTwo: true })}
                                    onHide={() => this.setState({ modalShow: false, submitError1: "" })}
                                />
                                <DownloadQuestionPaperModal
                                    type="coustom"
                                    filename={this.state.filename}
                                    show={this.state.modalShowTwo}
                                    pdfhidefunction={this.pdfhidefunction}
                                    onHide={() => this.setState({ modalShowTwo: false })} />
                            </React.Fragment>
                        )
                    }
                    <Footer />
                </div>
            </div>
        )
    }
}

export default withRouter(
    compose(
        graphql(GROUPCOUSTOMGENERAL_PAPER, {
            name: "creategroupgeneralpaperfun"
        }),

        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                }), name: "globals"
            }),
        graphql(FETCH_SECTIONS,
            {
                options: props => ({
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    }
                }), name: "getSections"
            })

    )
        (OwnQuestionCustom));