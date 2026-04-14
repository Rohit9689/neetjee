import React, { Component } from 'react'
import { components } from 'react-select'

import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';

import '../_exam.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';
import UserRestrictionAlert from '../../home/UserRestrictionAlert';


const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentCustomExam  
    ) {
        studentCustomExam(
        params: $params
     )
  }
`;

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};



class CustomExamSection extends Component {
    constructor(props) {
        super(props)
        let sampleArray = [];

        const qtypes = props.studentGlobals.questionTypes.map(item => {
            return { ...item, checked: false, percentage: "", active: "", totperError: "" }
        });

        const comp = props.studentGlobals.complexity.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });

        const qteory = props.studentGlobals.questionTheory.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });

        const select = {
            id: "0",
            subject: "select ALL",
            questionTypes: qtypes,
            complexity: comp,
            questionTheory: qteory,
            classActive: "",
            classActive1: "",
            classActive2: "",
            classActive3: "",
            totpererr: ""


        }

        for (let i = 0; i < props.getSubjects.length; i++) {
            let someData = props.getSubjects[i];
            const newarr1 = {
                ...someData,
                classActive1: "",
                questionTypes: qtypes,
                classActive2: "",
                classActive3: "",
                complexity: comp,
                questionTheory: qteory,
                totpererr: ""
            }
            sampleArray.push(newarr1);

            someData.studentChapters.map((item) => {
                item.active = ""
                item.percentage = ""
                item.totperError = ""
            });
        }
        sampleArray.unshift(select);
        console.log("sampleArraycon", sampleArray);
        this.state = {
            userRestionModalShow: false,
            class: 0,
            classvalue: { value: "0", label: "ALL" },
            examtype: "1",
            subjectArray: sampleArray,
            formValid: true,
            submitError: "",
            advancedoption: false,
            sexamtype: "2",
            sexamtypevalue: {
                value: "2",
                label: "Cumulative Exam"
            },
            semiclass: "",
            semiclassvalue: "",
            loadbutton: 0
        }
    }

    handleFormSubmit = e => {
        console.log("handleFormSubmit");
        e.preventDefault();
        this.setState({ loadbutton: 1 });
        let examtype = "";
        if (Cookies.get("examid") == "2") {
            examtype = this.state.examtype;
        }
        else {
            examtype = "0";
        }
        let advance_options = 0;
        if (this.state.advancedoption == true) {
            advance_options = 1;
        }

        let syllabus_web = [];
        let question_types_subjectwise = [];
        let complexity_subjectwise = [];
        let question_theory_subjectwise = [];
        for (let i = 1; i < this.state.subjectArray.length; i++) {
            let idata = this.state.subjectArray[i];

            let chapterArray = [];
            let questiontypesArray = [];
            let complexityArray = [];
            let questiontheoryArray = [];
            //chapters
            let ichdata = idata.studentChapters;
            if (ichdata != undefined) {
                for (let c = 0; c <= ichdata.length; c++) {
                    let cidata = ichdata[c];
                    console.log("cidata.percentage", cidata);
                    if (cidata != undefined) {
                        console.log("cidata.id", cidata.id);
                        if (cidata.checked == "checked") {
                            chapterArray.push(cidata.id);
                        }
                        //if (cidata.percentage != undefined && cidata.percentage != "") {
                        // const newchapter = {
                        //     id: cidata.id,
                        //     percentage: cidata.percentage
                        // }

                        //}
                    }

                }
            }
            console.log("chapterArray", chapterArray);

            //questions
            let iqtydata = idata.questionTypes;
            if (iqtydata != undefined) {
                for (let c = 1; c <= iqtydata.length; c++) {
                    let qidata = iqtydata[c];
                    if (qidata != undefined) {
                        if (qidata.percentage != undefined && qidata.percentage != "") {
                            const newqtyp = {
                                question_type_id: parseInt(qidata.id),
                                percentage: parseInt(qidata.percentage)
                            }
                            questiontypesArray.push(newqtyp);
                        }
                    }
                }
            }


            //complexity
            let icomdata = idata.complexity;
            if (icomdata != undefined) {
                for (let c = 1; c <= icomdata.length; c++) {
                    let comidata = icomdata[c];
                    //console.log("comidata.percentage", comidata.percentage);
                    if (comidata != undefined) {
                        if (comidata.percentage != undefined && comidata.percentage != "") {
                            const newcomp = {
                                complexity_id: parseInt(comidata.id),
                                percentage: parseInt(comidata.percentage)
                            }
                            complexityArray.push(newcomp);
                        }
                    }
                }
            }


            //question theory
            let iqtheory = idata.questionTheory;
            console.log("iqtheory123", iqtheory);
            if (iqtheory != undefined) {
                let appper = 0;
                let con = 0;
                for (let t = 0; t <= iqtheory.length; t++) {
                    let idata = iqtheory[t];

                    console.log("questionTheoryidata", idata);
                    if (idata != undefined) {

                        if (idata.question_theory == "Application") {
                            appper = idata.percentage;
                        }



                        if (idata.question_theory == "Concept") {
                            con = idata.percentage;
                        }

                    }
                }
                const newqtheory = {
                    application: parseInt(appper),
                    concept: parseInt(con)
                }
                questiontheoryArray.push(newqtheory);
            }
            //syllabus
            console.log("idata.id", idata.id);
            const newsyllabusweb = {
                subject_id: parseInt(idata.id),
                chapters: chapterArray
            }
            syllabus_web.push(newsyllabusweb);

            //questions
            const newquestiontypessubjectwise = {
                subject_id: parseInt(idata.id),
                question_types: questiontypesArray
            }
            question_types_subjectwise.push(newquestiontypessubjectwise);

            //complexity
            const newcomplexitysubjectwise = {
                subject_id: parseInt(idata.id),
                complexity: complexityArray
            }
            complexity_subjectwise.push(newcomplexitysubjectwise);

            //question theory
            const newquestiontheorysubjectwise = {
                subject_id: parseInt(idata.id),
                question_theory: questiontheoryArray
            }
            question_theory_subjectwise.push(newquestiontheorysubjectwise);
        }
        let status = false;
        syllabus_web.map((data) => {
            if (data.chapters.length > 0) {
                status = true;
            }

        })
        if (this.state.sexamtype == "2") {
            if (this.state.formValid && status) {

                const params = {
                    mobile: Cookies.get("mobile"),
                    sub_type: "cumulative",
                    //in cumulative no need classid
                    class_id: 0,
                    syllabus: syllabus_web,
                    advance_options: advance_options,
                    question_types: [],
                    complexity: [],
                    question_theory: [],

                    syllabus_web: [],
                    question_types_subjectwise: question_types_subjectwise,
                    complexity_subjectwise: complexity_subjectwise,
                    question_theory_subjectwise: question_theory_subjectwise,
                    source: 0,
                    exam_type: parseInt(examtype),
                    exam_name: "",
                    exam_date: "",
                    save_exam_type: 0
                };
                console.log("params", params);
                this.customfunction(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } else {
                this.setState({ submitError: "Please select syllabus", loadbutton: 0 });
            }
        } else if (this.state.sexamtype == "1") {
            if (status) {

                const params = {
                    mobile: Cookies.get("mobile"),
                    sub_type: "chapter",
                    //in chapter no need classid
                    class_id: 0,
                    syllabus: syllabus_web,
                    advance_options: advance_options,
                    question_types: [],
                    complexity: [],
                    question_theory: [],

                    syllabus_web: [],
                    question_types_subjectwise: question_types_subjectwise,
                    complexity_subjectwise: complexity_subjectwise,
                    question_theory_subjectwise: question_theory_subjectwise,
                    source: 0,
                    exam_type: parseInt(examtype),
                    exam_name: "",
                    exam_date: "",
                    save_exam_type: 0
                };
                console.log("params", params);
                this.customfunction(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } else if (status != true) {
                this.setState({ submitError: "Please select one chapter at least one subject", loadbutton: 0 });
            }
            else {
                this.setState({ submitError: "Please fill all the values to proceed", loadbutton: 0 });
            }
        } else if (this.state.sexamtype == "3") {
            if (this.state.semiclass != "") {
                console.log("this.state.class", this.state.semiclass);
                const params = {
                    mobile: Cookies.get("mobile"),
                    sub_type: "semi-grand",
                    class_id: parseInt(this.state.semiclass),
                    syllabus: [],
                    advance_options: advance_options,
                    question_types: [],
                    complexity: [],
                    question_theory: [],

                    syllabus_web: [],
                    question_types_subjectwise: question_types_subjectwise,
                    complexity_subjectwise: complexity_subjectwise,
                    question_theory_subjectwise: question_theory_subjectwise,
                    source: 0,
                    exam_type: parseInt(examtype),
                    exam_name: "",
                    exam_date: "",
                    save_exam_type: 0
                };
                console.log("params", params);
                this.customfunction(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } else {
                this.setState({ submitError: "Please select Class", loadbutton: 0 });
            }
        } else if (this.state.sexamtype == "4") {
            if (this.state.formValid) {

                const params = {
                    mobile: Cookies.get("mobile"),
                    sub_type: "grand",
                    //in grand no need classid
                    class_id: 0,
                    syllabus: [],
                    advance_options: advance_options,
                    question_types: [],
                    complexity: [],
                    question_theory: [],

                    syllabus_web: [],
                    question_types_subjectwise: question_types_subjectwise,
                    complexity_subjectwise: complexity_subjectwise,
                    question_theory_subjectwise: question_theory_subjectwise,
                    source: 0,
                    exam_type: parseInt(examtype),
                    exam_name: "",
                    exam_date: "",
                    save_exam_type: 0
                };
                console.log("params", params);
                this.customfunction(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } else {
                this.setState({ submitError: "Please fill all the values to proceed", loadbutton: 0 });
            }
        }

    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                let sampleArray = [];

                const qtypes = this.props.studentGlobals.questionTypes.map(item => {
                    return { ...item, checked: false, percentage: "", active: "", totperError: "" }
                });

                const comp = this.props.studentGlobals.complexity.map(item => {
                    return { ...item, percentage: "", active: "", totperError: "" }
                });

                const qteory = this.props.studentGlobals.questionTheory.map(item => {
                    return { ...item, percentage: "", active: "", totperError: "" }
                });

                const select = {
                    id: "0",
                    subject: "select ALL",
                    questionTypes: qtypes,
                    complexity: comp,
                    questionTheory: qteory,
                    classActive: "",
                    classActive1: "",
                    classActive2: "",
                    classActive3: "",
                    totpererr: ""

                }

                for (let i = 0; i < this.props.getSubjects.length; i++) {
                    let someData = this.props.getSubjects[i];
                    const newarr1 = {
                        ...someData,
                        classActive1: "",
                        questionTypes: qtypes,
                        classActive2: "",
                        classActive3: "",
                        complexity: comp,
                        questionTheory: qteory,
                        totpererr: ""
                    }
                    sampleArray.push(newarr1);

                    someData.studentChapters.map((item) => {
                        item.active = ""
                        item.percentage = ""
                        item.totperError = ""
                    });
                }
                sampleArray.unshift(select);
                if (data.studentCustomExam) {
                    this.setState({
                        class: 0,
                        examtype: 0,
                        subjectArray: sampleArray,
                        formValid: true,
                        submitError: "",
                        advancedoption: false,
                        loadbutton: 0
                    });

                    localStorage.setItem("sessionid", data.studentCustomExam);
                    localStorage.setItem("type", "Custom Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "custom");

                    window.open("/student/subject/exam", "_blank")
                    //window.location.reload(true);
                }
            }
        });
    };
    classGetDataFunction(data, type) {
        if (type == "semi") {
            let sarray = [];

            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const obj = {
                    value: idata.id,
                    label: idata.class,
                }
                sarray.push(obj);
            }
            return sarray;
        }
        else {
            let sarray = [];
            const obj1 = {
                value: 0,
                label: "ALL",
            }
            for (let i = 0; i < data.length; i++) {
                let idata = data[i];
                const obj = {
                    value: idata.id,
                    label: idata.class,
                }
                sarray.push(obj);
            }
            sarray.unshift(obj1);
            return sarray;
        }

    }

    handleInputChange = (e) => {
        console.log("e.target.checked", e.target.checked);
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.name == "advancedoption") {
            if (e.target.checked == true) {
                this.setState({ advancedoption: true });
            }
            else {
                this.setState({ advancedoption: false });
            }

        }
        else {
            this.setState({ [name]: value }, () => {
                this.validateField(name, value);
            });
        }

    };
    handleSelectInputChange = (name, value) => {
        console.log("handleSelectInputChange", name, value);
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        if (name == "sexamtype") {
            //if (value == "1" || value == "2" || value == "3" || value == "4") {

            if (value == "1") {
                if (isuserValid.custom_chapter == true) {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
                else {
                    //empty the syllabus array
                    let sampleArray = [];

                    const qtypes = this.props.studentGlobals.questionTypes.map(item => {
                        return { ...item, checked: false, percentage: "", active: "", totperError: "" }
                    });

                    const comp = this.props.studentGlobals.complexity.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const qteory = this.props.studentGlobals.questionTheory.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const select = {
                        id: "0",
                        subject: "select ALL",
                        questionTypes: qtypes,
                        complexity: comp,
                        questionTheory: qteory,
                        classActive: "",
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        totpererr: "",



                    }

                    for (let i = 0; i < this.props.getSubjects.length; i++) {
                        let someData = this.props.getSubjects[i];
                        const newarr1 = {
                            ...someData,
                            classActive1: "",
                            questionTypes: qtypes,
                            classActive2: "",
                            classActive3: "",
                            complexity: comp,
                            questionTheory: qteory,
                            totpererr: "",

                        }
                        sampleArray.push(newarr1);

                        someData.studentChapters.map((item) => {
                            item.active = ""
                            item.percentage = ""
                            item.totperError = ""
                            item.checked = ""
                        });
                    }
                    sampleArray.unshift(select);
                    console.log("sampleArraysampleArray", sampleArray);
                    this.setState({ subjectArray: sampleArray });
                    //end
                    if (value == "1") {
                        this.setState({
                            sexamtypevalue: {
                                value: "1",
                                label: "Chapter Exam"
                            }
                        });
                    }
                    else if (value == "2") {
                        this.setState({
                            sexamtypevalue: {
                                value: "2",
                                label: "Cumulative Exam"
                            }
                        });
                    }
                    else if (value == "3") {
                        this.setState({
                            sexamtypevalue: {
                                value: "3",
                                label: "Semi Grand Exam"
                            }
                        });
                    }
                    else if (value == "4") {
                        this.setState({
                            sexamtypevalue: {
                                value: "4",
                                label: "Grand Exam"
                            }
                        });
                    }

                    this.setState({
                        [name]: value,
                        userRestionModalShow: false
                    });
                }
            }
            else if (value == "2") {
                if (isuserValid.custom_cumulative == true) {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
                else {
                    //empty the syllabus array
                    let sampleArray = [];

                    const qtypes = this.props.studentGlobals.questionTypes.map(item => {
                        return { ...item, checked: false, percentage: "", active: "", totperError: "" }
                    });

                    const comp = this.props.studentGlobals.complexity.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const qteory = this.props.studentGlobals.questionTheory.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const select = {
                        id: "0",
                        subject: "select ALL",
                        questionTypes: qtypes,
                        complexity: comp,
                        questionTheory: qteory,
                        classActive: "",
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        totpererr: "",



                    }

                    for (let i = 0; i < this.props.getSubjects.length; i++) {
                        let someData = this.props.getSubjects[i];
                        const newarr1 = {
                            ...someData,
                            classActive1: "",
                            questionTypes: qtypes,
                            classActive2: "",
                            classActive3: "",
                            complexity: comp,
                            questionTheory: qteory,
                            totpererr: "",

                        }
                        sampleArray.push(newarr1);

                        someData.studentChapters.map((item) => {
                            item.active = ""
                            item.percentage = ""
                            item.totperError = ""
                            item.checked = ""
                        });
                    }
                    sampleArray.unshift(select);
                    console.log("sampleArraysampleArray", sampleArray);
                    this.setState({ subjectArray: sampleArray });
                    //end
                    if (value == "1") {
                        this.setState({
                            sexamtypevalue: {
                                value: "1",
                                label: "Chapter Exam"
                            }
                        });
                    }
                    else if (value == "2") {
                        this.setState({
                            sexamtypevalue: {
                                value: "2",
                                label: "Cumulative Exam"
                            }
                        });
                    }
                    else if (value == "3") {
                        this.setState({
                            sexamtypevalue: {
                                value: "3",
                                label: "Semi Grand Exam"
                            }
                        });
                    }
                    else if (value == "4") {
                        this.setState({
                            sexamtypevalue: {
                                value: "4",
                                label: "Grand Exam"
                            }
                        });
                    }

                    this.setState({
                        [name]: value,
                        userRestionModalShow: false
                    });
                }
            }
            else if (value == "3") {
                if (isuserValid.custom_semi_grand == true) {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
                else {
                    //empty the syllabus array
                    let sampleArray = [];

                    const qtypes = this.props.studentGlobals.questionTypes.map(item => {
                        return { ...item, checked: false, percentage: "", active: "", totperError: "" }
                    });

                    const comp = this.props.studentGlobals.complexity.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const qteory = this.props.studentGlobals.questionTheory.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const select = {
                        id: "0",
                        subject: "select ALL",
                        questionTypes: qtypes,
                        complexity: comp,
                        questionTheory: qteory,
                        classActive: "",
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        totpererr: "",



                    }

                    for (let i = 0; i < this.props.getSubjects.length; i++) {
                        let someData = this.props.getSubjects[i];
                        const newarr1 = {
                            ...someData,
                            classActive1: "",
                            questionTypes: qtypes,
                            classActive2: "",
                            classActive3: "",
                            complexity: comp,
                            questionTheory: qteory,
                            totpererr: "",

                        }
                        sampleArray.push(newarr1);

                        someData.studentChapters.map((item) => {
                            item.active = ""
                            item.percentage = ""
                            item.totperError = ""
                            item.checked = ""
                        });
                    }
                    sampleArray.unshift(select);
                    console.log("sampleArraysampleArray", sampleArray);
                    this.setState({ subjectArray: sampleArray });
                    //end
                    if (value == "1") {
                        this.setState({
                            sexamtypevalue: {
                                value: "1",
                                label: "Chapter Exam"
                            }
                        });
                    }
                    else if (value == "2") {
                        this.setState({
                            sexamtypevalue: {
                                value: "2",
                                label: "Cumulative Exam"
                            }
                        });
                    }
                    else if (value == "3") {
                        this.setState({
                            sexamtypevalue: {
                                value: "3",
                                label: "Semi Grand Exam"
                            }
                        });
                    }
                    else if (value == "4") {
                        this.setState({
                            sexamtypevalue: {
                                value: "4",
                                label: "Grand Exam"
                            }
                        });
                    }

                    this.setState({
                        [name]: value,
                        userRestionModalShow: false
                    });
                }
            }
            else if (value == "4") {
                if (isuserValid.custom_grand == true) {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
                else {
                    //empty the syllabus array
                    let sampleArray = [];

                    const qtypes = this.props.studentGlobals.questionTypes.map(item => {
                        return { ...item, checked: false, percentage: "", active: "", totperError: "" }
                    });

                    const comp = this.props.studentGlobals.complexity.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const qteory = this.props.studentGlobals.questionTheory.map(item => {
                        return { ...item, percentage: "", active: "", totperError: "" }
                    });

                    const select = {
                        id: "0",
                        subject: "select ALL",
                        questionTypes: qtypes,
                        complexity: comp,
                        questionTheory: qteory,
                        classActive: "",
                        classActive1: "",
                        classActive2: "",
                        classActive3: "",
                        totpererr: "",



                    }

                    for (let i = 0; i < this.props.getSubjects.length; i++) {
                        let someData = this.props.getSubjects[i];
                        const newarr1 = {
                            ...someData,
                            classActive1: "",
                            questionTypes: qtypes,
                            classActive2: "",
                            classActive3: "",
                            complexity: comp,
                            questionTheory: qteory,
                            totpererr: "",

                        }
                        sampleArray.push(newarr1);

                        someData.studentChapters.map((item) => {
                            item.active = ""
                            item.percentage = ""
                            item.totperError = ""
                            item.checked = ""
                        });
                    }
                    sampleArray.unshift(select);
                    console.log("sampleArraysampleArray", sampleArray);
                    this.setState({ subjectArray: sampleArray });
                    //end
                    if (value == "1") {
                        this.setState({
                            sexamtypevalue: {
                                value: "1",
                                label: "Chapter Exam"
                            }
                        });
                    }
                    else if (value == "2") {
                        this.setState({
                            sexamtypevalue: {
                                value: "2",
                                label: "Cumulative Exam"
                            }
                        });
                    }
                    else if (value == "3") {
                        this.setState({
                            sexamtypevalue: {
                                value: "3",
                                label: "Semi Grand Exam"
                            }
                        });
                    }
                    else if (value == "4") {
                        this.setState({
                            sexamtypevalue: {
                                value: "4",
                                label: "Grand Exam"
                            }
                        });
                    }

                    this.setState({
                        [name]: value,
                        userRestionModalShow: false
                    });
                }
            }


        }
        else if (name == "semiclass") {
            let filterClass = this.props.studentGlobals.classes.find((a) => a.id == value);
            if (filterClass != undefined) {
                this.setState({ semiclassvalue: { value: filterClass.id, label: filterClass.class } });
            }
            this.setState({
                [name]: value
            });
        }
        else if (name == "class") {

            if (value == "0") {
                this.setState({ classvalue: { value: "0", label: "ALL" } });
            } else {
                let filterClass = this.props.studentGlobals.classes.find((a) => a.id == value);
                if (filterClass != undefined) {
                    this.setState({ classvalue: { value: filterClass.id, label: filterClass.class } });
                }

            }

            this.setState({
                [name]: value
            });

        }
        else {
            this.setState({
                [name]: value
            });
        }

    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fullnameValid = this.state.fullnameValid;
        switch (fieldName) {
            case "fullname":
                if (value.length < 4) {
                    fullnameValid = false;
                    fieldValidationErrors.fullname = "Name cannot be Less than 4 chars";
                } else if (value.length > 120) {
                    fullnameValid = false;
                    fieldValidationErrors.fullname = "Name cannot be More than 120 chars";
                } else {
                    fullnameValid = true;
                    fieldValidationErrors.fullname = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                fullnameValid: fullnameValid
            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState({
            formValid: true
        });

        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }
    subjectFunction = (id, index) => {

        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive = "";
        }
        arr[idindex].classActive = "active";
        this.setState({ subjectArray: arr });
        this.setState({
            submitError: ""
        });

    }

    subjectFunction1 = (id, index) => {

        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        console.log("subjectFunction1", foundData);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive1 == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive1 = "";
        }
        arr[idindex].classActive1 = "active";
        this.setState({ subjectArray: arr });


    }

    subjectFunction2 = (id, index) => {

        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive2 == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive2 = "";
        }
        arr[idindex].classActive2 = "active";
        this.setState({ subjectArray: arr });
        this.setState({
            submitError: ""
        });

    }

    subjectFunction3 = (id, index) => {

        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == id);
        let idindex = this.state.subjectArray.indexOf(foundData);
        let foundData2 = this.state.subjectArray.find((a) => a.classActive3 == "active");
        let idindex2 = this.state.subjectArray.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive3 = "";
        }
        arr[idindex].classActive3 = "active";
        this.setState({ subjectArray: arr });
        this.setState({
            submitError: ""
        });

    }
    chapterchaptersFunction = (e, subid, chpterid) => {
        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == subid);
        //console.log("chaptersFunction1", foundData);
        let holeCDta = foundData.studentChapters;
        let chapterdata = holeCDta.find((c) => c.id == chpterid);
        let idindex = holeCDta.indexOf(chapterdata);

        let findactive = holeCDta.find((a) => a.active == "active");
        if (findactive != undefined) {
            let findex = holeCDta.indexOf(findactive);
            holeCDta[findex].active = "";
            holeCDta[findex].checked = "";
        }


        holeCDta[idindex].active = "active";

        if (e.target.checked == true) {
            if (holeCDta[idindex] != undefined) {
                holeCDta[idindex].checked = "checked";
                holeCDta[idindex].percentage = "";

            }
        }
        else {
            holeCDta[idindex].checked = "";
            holeCDta[idindex].percentage = "";
        }
        this.setState({ subjectArray: arr });
    }
    chaptersFunction = (e, subid, chpterid) => {
        //console.log("chaptersFunction", e.target.checked);
        let arr = this.state.subjectArray;
        let foundData = this.state.subjectArray.find((a) => a.id == subid);
        //console.log("chaptersFunction1", foundData);
        let holeCDta = foundData.studentChapters;
        let chapterdata = holeCDta.find((c) => c.id == chpterid);
        let idindex = holeCDta.indexOf(chapterdata);

        let findactive = holeCDta.find((a) => a.active == "active");
        if (findactive != undefined) {
            let findex = holeCDta.indexOf(findactive);
            holeCDta[findex].active = "";
        }


        holeCDta[idindex].active = "active";

        if (e.target.checked == true) {
            if (holeCDta[idindex] != undefined) {
                holeCDta[idindex].checked = "checked";
                holeCDta[idindex].percentage = "";

            }
        }
        else {
            holeCDta[idindex].checked = "";
            holeCDta[idindex].percentage = "";
        }
        this.setState({ subjectArray: arr });
    }
    percentageFun = (e, subid, qtyid) => {

        let arr = this.state.subjectArray.map(item => {
            if (item.id == subid) {
                const qtype = item.studentChapters.map(qitem => {
                    if (qitem.id == qtyid) {
                        //var numbers = /^[0-9]+$/;
                        const re = /^[0-9\b]+$/;
                        console.log("e.target.value", e.target.value);
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
                return { ...item, studentChapters: qtype };
            } return item;

        }
        )
        this.setState({ subjectArray: arr });
        this.totalpercentagechapter(arr, subid, qtyid);
    }
    totalpercentagechapter = (arr, subid, qtyid) => {
        let count = 0;
        let newArray = [];
        for (let i = 0; i <= arr.length; i++) {
            let idata = arr[i];
            if (idata != undefined) {
                if (idata.id == subid) {
                    let stuChapters = idata.studentChapters;
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
            arr[indexid].totpererr = "Total percentage should be 100%";

            let chapterData = findData.studentChapters;
            let findchapter = chapterData.find((a) => a.id == qtyid);
            let chindexid = chapterData.indexOf(findchapter);
            chapterData[chindexid].percentage = "";
        }
        else {
            let findData = arr.find((a) => a.id == subid);
            let indexid = arr.indexOf(findData);
            arr[indexid].totpererr = "";
        }
        this.setState({ subjectArray: arr });
    }
    questionFunction = (e, subid, qtyid) => {
        console.log("chaptersFunction", subid, qtyid);
        let foundData = this.state.subjectArray.find((a) => a.id == subid);
        let overAllQuestion = foundData.questionTypes;

        let findactive = overAllQuestion.find((a) => a.active == "active");
        if (findactive != undefined) {
            let findex = overAllQuestion.indexOf(findactive);
            overAllQuestion[findex].active = "";
        }
        if (subid == "0") {
            let arr1 = this.state.subjectArray.map(item => {

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
            this.setState({ subjectArray: arr1 });

        }
        else {
            let arr = this.state.subjectArray.map(item => {
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
            this.setState({ subjectArray: arr });
        }
    }
    percentageFun1 = (e, subid, qtyid) => {
        console.log("e.target.value", e.target.value);
        if (subid == "0") {
            let arr = this.state.subjectArray.map(item => {

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
            this.setState({ subjectArray: arr });
            this.totalpercentagequestionTypes(arr, subid, qtyid);
        }
        else {
            let arr = this.state.subjectArray.map(item => {
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
            this.setState({ subjectArray: arr });
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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.questionTypes;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "Total percentage should be 100%";
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
                arr[indexid].totpererr = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "";
                    }

                }
            }
            this.setState({ subjectArray: arr });

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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.questionTypes;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr = "";
            }
            this.setState({ subjectArray: arr });

        }

    }

    percentageFun2 = (e, subid, qtyid) => {
        if (subid == "0") {
            let arr1 = this.state.subjectArray.map(item => {

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
            this.setState({ subjectArray: arr1 });
            this.totalpercentagecomplexity(arr1, subid, qtyid);
        }
        else {
            let arr = this.state.subjectArray.map(item => {
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
            this.setState({ subjectArray: arr });
            this.totalpercentagecomplexity(arr, subid, qtyid);
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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.complexity;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "Total percentage should be 100%";
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
                arr[indexid].totpererr = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "";
                    }

                }
            }
            this.setState({ subjectArray: arr });

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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.complexity;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr = "";
            }
            this.setState({ subjectArray: arr });

        }

    }
    percentageFun3 = (e, subid, qtyid) => {
        if (subid == "0") {
            let arr1 = this.state.subjectArray.map(item => {
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
            this.setState({ subjectArray: arr1 });
            this.totalpercentagequestionTheory(arr1, subid, qtyid);
        }
        else {
            let arr = this.state.subjectArray.map(item => {
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
            this.setState({ subjectArray: arr });
            this.totalpercentagequestionTheory(arr, subid, qtyid);

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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.questionTheory;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "Total percentage should be 100%";
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
                arr[indexid].totpererr = "";

                for (let t = 0; t <= arr.length; t++) {
                    let tdata = arr[t];
                    if (tdata != undefined) {
                        tdata.totpererr = "";
                    }

                }
            }
            this.setState({ subjectArray: arr });
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
                arr[indexid].totpererr = "Total percentage should be 100%";

                let chapterData = findData.questionTheory;
                let findchapter = chapterData.find((a) => a.id == qtyid);
                let chindexid = chapterData.indexOf(findchapter);
                chapterData[chindexid].percentage = "";
            }
            else {
                let findData = arr.find((a) => a.id == subid);
                let indexid = arr.indexOf(findData);
                arr[indexid].totpererr = "";
            }
            this.setState({ subjectArray: arr });

        }

    }
    sexamtypeFunction = (isuserValid) => {
        let newArray = [];
        console.log("isuserValid", isuserValid);
        if (isuserValid.custom_cumulative == false) {
            const newObj1 = {
                value: "2",
                label: "Cumulative Exam"
            }
            newArray.push(newObj1);
        }
        if (isuserValid.custom_cumulative == true) {
            const newObj1 = {
                value: "2",

                label: <p><Image src={require('../../../../images/locked.png')} width="13" alt="Lock" /> Cumulative Exam</p>
            }
            newArray.push(newObj1);
        }
        if (isuserValid.custom_chapter == false) {
            const newObj2 = {
                value: "1",
                label: "Chapter Exam"
            }
            newArray.push(newObj2);

        }
        if (isuserValid.custom_chapter == true) {
            const newObj2 = {
                value: "1",
                label: <p><Image src={require('../../../../images/locked.png')} width="13" alt="Lock" /> Chapter Exam</p>
            }
            newArray.push(newObj2);

        }
        if (isuserValid.custom_semi_grand == false) {
            const newObj3 = {
                value: "3",
                label: "Semi Grand Exam"
            }
            newArray.push(newObj3);
        }
        if (isuserValid.custom_semi_grand == true) {
            const newObj3 = {
                value: "3",
                label: <p><Image src={require('../../../../images/locked.png')} width="13" alt="Lock" /> Semi Grand Exam</p>
            }
            newArray.push(newObj3);
        }
        if (isuserValid.custom_grand == false) {
            const newObj4 = {
                value: "4",
                label: "Grand Exam"
            }
            newArray.push(newObj4);
        }
        if (isuserValid.custom_grand == true) {
            const newObj4 = {
                value: "4",

                label: <p><Image src={require('../../../../images/locked.png')} width="13" alt="Lock" /> Grand Exam</p>
            }
            newArray.push(newObj4);
        }
        // let newArray = [
        //     {
        //         value: "1",
        //         label: "Chapter Exam"
        //     },
        //     {
        //         value: "2",
        //         label: "Cumulative Exam"
        //     },
        //     {
        //         value: "3",
        //         label: "Semi Grand Exam"
        //     },
        //     {
        //         value: "4",
        //         label: "Grand Exam"
        //     }

        // ];
        return newArray;
    }

    render() {
        console.log("render", this.state);

        const renderThumb = ({ style, ...props }) => {
            const thumbStyle = {
                borderRadius: 6,
                width: '3px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            };
            return <div style={{ ...style, ...thumbStyle }} {...props} />;
        };
        let currentTime = moment().unix();
        let trailRestriction = this.props.getSubjects.find((a) => a.id == "2");
        let clength = trailRestriction.studentChapters.filter((a) => a.enabled == true);

        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        return (
            <div className="sudent_exam_block pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Form.Text className="form-text text-danger">
                    {this.state.submitError}
                </Form.Text>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-4 title">Custom Exam</h5>
                            <Link
                                to={{
                                    pathname: "/student/subject/exam-history",
                                    state: {
                                        examtype: "custom"
                                    }
                                }}
                                className="btn btn-outline-primary">Exam History
                        </Link>
                        </div>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <ul className="create_custom_timeline list-unstyled">
                            <li className="create_custom_single_timeline">
                                <h6 className="mb-3 heading text-uppercase">Exam - Type</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-2">
                                    <Form className="pt-2">
                                        <Row>
                                            {this.state.sexamtype != "4" && this.state.sexamtype != "3" ? (
                                                <Col xl={4} lg={4} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2 px-2">
                                                        <Form.Label className="mb-0">Class</Form.Label>
                                                        <div className="w-100 ml-2">
                                                            <SelectDropDown
                                                                stateData={this.state.classvalue}
                                                                handleChange={this.handleSelectInputChange}
                                                                name="class"
                                                                options={this.classGetDataFunction(this.props.studentGlobals.classes, "normal")}
                                                                placeholderName={'class'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : ("")}
                                            {this.state.sexamtype == "3" ? (
                                                <Col xl={4} lg={4} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2 px-2">
                                                        <Form.Label className="mb-0">Class</Form.Label>
                                                        <div className="w-100 ml-2">
                                                            <SelectDropDown
                                                                stateData={this.state.semiclassvalue}
                                                                handleChange={this.handleSelectInputChange}
                                                                name="semiclass"
                                                                options={this.classGetDataFunction(this.props.studentGlobals.classes, "semi")}
                                                                placeholderName={'class'}
                                                                dropdownIndicator={{ DropdownIndicator }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : ("")}

                                            <Col xl={4} lg={4} md={12} sm={12}>
                                                <div className="d-flex align-items-center mb-2 px-2">
                                                    <Form.Label className="mb-0 px-2" style={{ width: 150 }}>Exam Type</Form.Label>
                                                    <div className="w-100 ml-1">
                                                        <SelectDropDown
                                                            stateData={this.state.sexamtypevalue}
                                                            handleChange={this.handleSelectInputChange}
                                                            name="sexamtype"
                                                            options={this.sexamtypeFunction(isuserValid)}
                                                            placeholderName={'Exam Type'}
                                                            dropdownIndicator={{ DropdownIndicator }}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            {Cookies.get("examid") == "2" ? (<Col xl={4} lg={4} md={12} sm={12}>
                                                <div className="d-flex align-items-center mb-2 px-2">
                                                    <div className="w-100 ml-2">
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input

                                                                type="radio"
                                                                id="customRadioType1"
                                                                value="1"
                                                                name="examtype"
                                                                className="custom-control-input"
                                                                onChange={this.handleInputChange}
                                                                defaultChecked={true}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customRadioType1"
                                                            >
                                                                Main
              </label>
                                                        </div>
                                                        <div className="custom-control custom-radio custom-control-inline">
                                                            <input
                                                                type="radio"
                                                                id="customRadioType2"
                                                                value="2"
                                                                name="examtype"
                                                                className="custom-control-input"
                                                                onChange={this.handleInputChange}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customRadioType2"
                                                            >
                                                                Advance
              </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>) : ("")}
                                            <Col xl={4} lg={4} md={12} sm={12}>
                                                <div className="d-flex align-items-center mb-2 px-2">
                                                    {/* <Form.Label className="mb-0">Advanced Options</Form.Label> */}
                                                    <div className="w-100 ml-2">
                                                        <Form.Check type="checkbox" id="advancedcheckboxOne" custom>
                                                            <Form.Check.Input type="checkbox"
                                                                checked={this.state.advancedoption}
                                                                name="advancedoption"
                                                                onChange={this.handleInputChange}
                                                            />
                                                            <Form.Check.Label
                                                                htmlFor="advancedcheckboxOne"
                                                            >Advanced Options</Form.Check.Label>
                                                        </Form.Check>
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                    </Form>
                                </Card>
                            </li>
                            {this.state.sexamtype == "2" ? (
                                <li className="create_custom_single_timeline">
                                    <h6 className="mb-3 heading text-uppercase">Syllabus - Selection</h6>
                                    <Card className="border-0 shadow-sm p-0">
                                        <Card.Header className="bg-white">
                                            <Card.Title className="h6 mb-0">Custom exam - Syllabus</Card.Title>
                                            {(isuserValid.isTrialUser == true && clength.length < 20) || (currentTime > isuserValid.expiry_date && clength.length < 20) ? (
                                                <React.Fragment>
                                                    {
                                                        Cookies.get("student_userlevel") == "1" ? (
                                                            <small>
                                                                <span style={{ color: "#f81201" }}>*Note: Dear Student
                                                    Now you have limited Access </span>

                                                            </small>
                                                        ) : (
                                                                <small>
                                                                    <span style={{ color: "#f81201" }}>*Note: To access full syllabus </span>
                                                                    <span style={{ fontWeight: "bold" }}><Link style={{ color: '#007bff' }} to={"/student/package"}>upgrade to Paid Plan</Link></span>
                                                                </small>
                                                            )
                                                    }
                                                </React.Fragment>

                                            ) : ("")}
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <Row noGutters={true}>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    {this.state.subjectArray.map((getsub, index) => (
                                                                        <div>
                                                                            {index > 0 ? (<li
                                                                                className={getsub.classActive}
                                                                                onClick={() => this.subjectFunction(getsub.id, index)}
                                                                            >{getsub.subject} </li>) : ("")}
                                                                        </div>
                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Chapters</h6>
                                                        </Card.Header>
                                                        <Scrollbars className="p-3" style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="sections-list m-0 pl-1">


                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive == "active" ? (
                                                                                <div>
                                                                                    {chData.studentChapters.map((cData, index) => {
                                                                                        console.log("cData.enabled", cData.enabled);
                                                                                        if (cData.enabled == true) {
                                                                                            console.log("cData.enabled", cData.enabled);
                                                                                            return (
                                                                                                <div>{this.state.class != "" ? (
                                                                                                    <div>{this.state.class == cData.class ? (<li className={cData.active}>
                                                                                                        <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                            <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.chaptersFunction(e, chData.id, cData.id)} />
                                                                                                            <Form.Check.Label
                                                                                                                htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                            >{cData.chapter}</Form.Check.Label>
                                                                                                        </Form.Check>
                                                                                                    </li>) : ("")}</div>
                                                                                                ) : (<li className={cData.active}>
                                                                                                    <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                        <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.chaptersFunction(e, chData.id, cData.id)} />
                                                                                                        <Form.Check.Label
                                                                                                            htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                        >{cData.chapter}</Form.Check.Label>
                                                                                                    </Form.Check>
                                                                                                </li>)}</div>


                                                                                            )
                                                                                        }
                                                                                        else {
                                                                                            return (
                                                                                                <div>{this.state.class != "" ? (
                                                                                                    <div>{this.state.class == cData.class ? (<li onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                        <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                        {cData.chapter}
                                                                                                    </li>) : ("")}</div>
                                                                                                ) : (
                                                                                                        <li onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                            <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                            {cData.chapter}
                                                                                                        </li>
                                                                                                    )}</div>
                                                                                            )

                                                                                        }
                                                                                    })}

                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Chapters</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive == "active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr}
                                                                                    </Form.Text>
                                                                                    {chData.studentChapters.map((cData, index) => (
                                                                                        <div>
                                                                                            {cData.checked == "checked" ? (
                                                                                                <Form.Group as={Row} controlId="formChapter1">
                                                                                                    <Form.Label column sm="10"> {cData.chapter}  </Form.Label>
                                                                                                    {/* <Col sm="5">
                                                                                                    <Form.Control
                                                                                                        value={cData.percentage}
                                                                                                        type="text"
                                                                                                        name="percentage"
                                                                                                        placeholder=""
                                                                                                        autoComplete="off"
                                                                                                        onChange={(e) => this.percentageFun(e, chData.id, cData.id)}
                                                                                                    />
                                                                                                    <Form.Text className="form-text text-danger">
                                                                                                        {cData.totperError}
                                                                                                    </Form.Text>

                                                                                                </Col> */}
                                                                                                </Form.Group>) : ("")}
                                                                                        </div>

                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}

                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Body>

                                    </Card>
                                </li>
                            ) : this.state.sexamtype == "1" ? (
                                <li className="create_custom_single_timeline">
                                    <h6 className="mb-3 heading text-uppercase">Syllabus - Selection</h6>
                                    <Card className="border-0 shadow-sm p-0">
                                        <Card.Header className="bg-white">
                                            <Card.Title className="h6 mb-0">Chapter exam - Syllabus</Card.Title>
                                        </Card.Header>
                                        <Card.Body className="p-0">
                                            <Row noGutters={true}>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    {this.state.subjectArray.map((getsub, index) => (
                                                                        <div>
                                                                            {index > 0 ? (<li
                                                                                className={getsub.classActive}
                                                                                onClick={() => this.subjectFunction(getsub.id, index)}
                                                                            >{getsub.subject} </li>) : ("")}
                                                                        </div>
                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Chapters</h6>
                                                        </Card.Header>
                                                        <Scrollbars className="p-3" style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="sections-list m-0 pl-1">


                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive == "active" ? (
                                                                                <div>
                                                                                    {chData.studentChapters.map((cData, index) => {
                                                                                        if (cData.enabled == true) {
                                                                                            return (
                                                                                                <div>{this.state.class != "" ? (
                                                                                                    <div>{this.state.class == cData.class ? (<li className={cData.active}>
                                                                                                        <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                            <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.chapterchaptersFunction(e, chData.id, cData.id)} />
                                                                                                            <Form.Check.Label
                                                                                                                htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                            >{cData.chapter}</Form.Check.Label>
                                                                                                        </Form.Check>
                                                                                                    </li>) : ("")}</div>
                                                                                                ) : (<li className={cData.active}>
                                                                                                    <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                        <Form.Check.Input checked={cData.checked} type="checkbox" onClick={(e) => this.chapterchaptersFunction(e, chData.id, cData.id)} />
                                                                                                        <Form.Check.Label
                                                                                                            htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                        >{cData.chapter}</Form.Check.Label>
                                                                                                    </Form.Check>
                                                                                                </li>)}</div>


                                                                                            )
                                                                                        }
                                                                                        else {
                                                                                            return (
                                                                                                <div>{this.state.class != "" ? (
                                                                                                    <div>{this.state.class == cData.class ? (<li onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                        <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                        {cData.chapter}
                                                                                                    </li>) : ("")}</div>
                                                                                                ) : (
                                                                                                        <li onClick={() => this.setState({ userRestionModalShow: true })} className={cData.active}>
                                                                                                            <Image src={require('../../../../images/locked.png')} className="mr-2" width="13" alt="locked image" />
                                                                                                            {cData.chapter}
                                                                                                        </li>
                                                                                                    )}</div>
                                                                                            )

                                                                                        }
                                                                                    })}

                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Chapter</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive == "active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr}
                                                                                    </Form.Text>
                                                                                    {chData.studentChapters.map((cData, index) => (
                                                                                        <div>
                                                                                            {cData.checked == "checked" ? (
                                                                                                <Form.Group as={Row} controlId="formChapter1">
                                                                                                    <Form.Label column sm="10"> {cData.chapter}  </Form.Label>
                                                                                                </Form.Group>) : ("")}
                                                                                        </div>

                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}

                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card.Body>

                                    </Card>
                                </li>
                            ) : ("")}

                            {this.state.advancedoption == true ? (
                                <React.Fragment>
                                    <li className="create_custom_single_timeline">
                                        <h6 className="heading text-uppercase mb-3">Type of Question - Selection</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                            <Row noGutters={true}>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    {this.state.subjectArray.map((getsub, index) => (
                                                                        <li
                                                                            className={getsub.classActive1}
                                                                            onClick={() => this.subjectFunction1(getsub.id, index)}
                                                                        >{getsub.subject} </li>))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Type Of Questions</h6>
                                                        </Card.Header>
                                                        <Scrollbars className="p-3" style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="sections-list m-0 pl-1">
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive1 == "active" ? (
                                                                                <div>
                                                                                    {chData.questionTypes.map((cData, index) => (

                                                                                        <li className={cData.active}>
                                                                                            <Form.Check type="checkbox" id={"typeofcheckboxOne" + "_" + index + "_" + chData.id} custom>
                                                                                                <Form.Check.Input type="checkbox" checked={cData.checked}
                                                                                                    onClick={(e) => this.questionFunction(e, chData.id, cData.id)} />
                                                                                                <Form.Check.Label htmlFor={"typeofcheckboxOne" + "_" + index + "_" + chData.id}>{cData.questiontype}</Form.Check.Label>
                                                                                            </Form.Check>
                                                                                        </li>

                                                                                    ))}

                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Question Types</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive1 == "active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr}
                                                                                    </Form.Text>
                                                                                    {chData.questionTypes.map((cData, index) => (
                                                                                        <div>
                                                                                            {cData.checked == true ? (
                                                                                                <Form.Group as={Row} controlId="formChapter1">
                                                                                                    <Form.Label column sm="7"> {cData.questiontype} (%) </Form.Label>
                                                                                                    <Col sm="5">

                                                                                                        <Form.Control
                                                                                                            value={cData.percentage}
                                                                                                            type="text"
                                                                                                            name="percentage"
                                                                                                            placeholder="percentage"
                                                                                                            autoComplete="off"
                                                                                                            onChange={(e) => this.percentageFun1(e, chData.id, cData.id)}
                                                                                                        />
                                                                                                        <Form.Text className="form-text text-danger">
                                                                                                            {cData.totperError}
                                                                                                        </Form.Text>
                                                                                                    </Col>
                                                                                                </Form.Group>) : ("")}
                                                                                        </div>

                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                    <li className="create_custom_single_timeline">
                                        <h6 className="heading text-uppercase mb-3">Complexity</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                            <Row noGutters={true}>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>

                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    {/* <li className="active">Select All</li> */}
                                                                    {this.state.subjectArray.map((getsub, index) => (
                                                                        <li
                                                                            className={getsub.classActive2}
                                                                            onClick={() => this.subjectFunction2(getsub.id, index)}
                                                                        >{getsub.subject} </li>))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Complexity</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive2 == "active" ? (
                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr}
                                                                                    </Form.Text>
                                                                                    {chData.complexity.map((cData, index) => (


                                                                                        <Form.Group as={Row} controlId="formChapter1">
                                                                                            <Form.Label column sm="7"> {cData.complexity} (%) </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={cData.percentage}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder="percentage"
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.percentageFun2(e, chData.id, cData.id)}
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {cData.totperError}
                                                                                                </Form.Text>
                                                                                            </Col>
                                                                                        </Form.Group>


                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                    <li className="create_custom_single_timeline">
                                        <h6 className="heading text-uppercase mb-3">Question Theory</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                            <Row noGutters={true}>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Subjects</h6>
                                                        </Card.Header>

                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <ul className="subjects-list p-0 m-0">
                                                                    {/* <li className="active">Select All</li> */}
                                                                    {this.state.subjectArray.map((getsub, index) => (
                                                                        <li
                                                                            className={getsub.classActive3}
                                                                            onClick={() => this.subjectFunction3(getsub.id, index)}
                                                                        >{getsub.subject} </li>))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Selected Question Theory</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 242 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.subjectArray.map((chData) => (
                                                                        <div>
                                                                            {chData.classActive3 == "active" ? (

                                                                                <div>
                                                                                    <Form.Text className="form-text text-danger">
                                                                                        {chData.totpererr}
                                                                                    </Form.Text>
                                                                                    {chData.questionTheory.map((cData, index) => (


                                                                                        <Form.Group as={Row} controlId="formChapter1">
                                                                                            <Form.Label column sm="7"> {cData.question_theory} (%) </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={cData.percentage}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder="percentage"
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.percentageFun3(e, chData.id, cData.id)}
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {cData.totperError}
                                                                                                </Form.Text>
                                                                                            </Col>
                                                                                        </Form.Group>


                                                                                    ))}
                                                                                </div>
                                                                            ) : ("")}

                                                                        </div>

                                                                    ))}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                            </Row>

                                        </Card>
                                    </li>
                                </React.Fragment>
                            ) : ("")}

                        </ul>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-right">
                        {this.state.loadbutton == 0 ? (<Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-white">Start Exam</Button>)
                            : (

                                <Button className="mt-5 px-5 btn btn-green text-white"><span className="spinner-border spinner-border-sm"></span>loading..</Button>
                            )}


                    </Col>
                </Row>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </div >
        )
    }
}


export default withRouter(compose(graphql(COUSTOM_EXAM, {
    name: "customfunction"
})
)(CustomExamSection));


