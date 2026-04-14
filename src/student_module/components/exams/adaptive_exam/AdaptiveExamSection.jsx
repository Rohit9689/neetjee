import React, { Component } from 'react'
import { components } from 'react-select'
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';

import '../_exam.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";


const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentAdaptiveExam  
    ) {
        studentAdaptiveExam(
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



class AdaptiveExamSection extends Component {
    constructor(props) {
        super(props)
        //console.log("AdaptiveExamSection", props);
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
        this.state = {
            class: 0,
            examtype: 0,
            subjectArray: sampleArray,
            formValid: true,
            submitError: ""
        }
    }

    handleFormSubmit = e => {
        console.log("handleFormSubmit");
        e.preventDefault();

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
                    //console.log("cidata.percentage", cidata.percentage);
                    if (cidata != undefined) {
                        if (cidata.percentage != undefined && cidata.percentage != "") {
                            const newchapter = {
                                id: parseInt(cidata.id),
                                percentage: cidata.percentage
                            }
                            chapterArray.push(newchapter);
                        }
                    }

                }
            }


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
            if (iqtheory != undefined) {
                for (let t = 1; t <= iqtheory.length; t++) {
                    let idata = iqtheory[i];
                    let appper = 0;
                    let con = 0;
                    if (idata != undefined) {

                        if (idata.question_theory == "application") {
                            appper = idata.percentage;
                        }


                        if (idata.question_theory == "concept") {
                            con = "";
                        }
                    }

                    const newqtheory = {
                        application: parseInt(appper),
                        concept: parseInt(con)
                    }
                    questiontheoryArray.push(newqtheory);

                }
            }
            //syllabus
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
        console.log("syllabus_web", syllabus_web);
        if (this.state.formValid && status) {

            const params = {
                mobile: Cookies.get("mobile"),
                sub_type: "cumulative",
                class_id: 0,
                syllabus: [],
                advance_options: 0,
                question_types: [],
                complexity: [],
                question_theory: [],

                syllabus_web: syllabus_web,
                question_types_subjectwise: question_types_subjectwise,
                complexity_subjectwise: complexity_subjectwise,
                question_theory_subjectwise: question_theory_subjectwise,
                source: 0,
                exam_type: parseInt(this.state.examtype)
            };
            console.log("params", params);
            this.customfunction(
                params
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                //console.log("updatedata", data);
                if (data.studentAdaptiveExam) {
                    //console.log("updatedatadataID", data.ID)
                    this.props.history.push({
                        pathname: "/student/subject/custom-instructions",
                        state: {
                            sessionid: data.studentAdaptiveExam,
                            type: "Adaptive Exam",
                            etype: "adaptive"
                        }
                    }
                    );
                }
            }
        });
    };
    classGetDataFunction(data) {
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

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    handleSelectInputChange = (name, value) => {
        this.setState({
            class: value
        });
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
                        } else {
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
                            } else {
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
                        }
                        else {
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
                        } else {
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
                            }
                            else {
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
        return (
            <div className="sudent_exam_block pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Form.Text className="form-text text-danger">
                    {this.state.submitError}
                </Form.Text>
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <h5 className="mb-4 title">Adaptive Exam</h5>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <ul className="create_custom_timeline list-unstyled">
                            <li className="create_custom_single_timeline">
                                <h6 className="mb-3 heading text-uppercase">Exam - Type</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-2">
                                    <Form className="pt-2">
                                        <Row>
                                            <Col xl={4} lg={4} md={12} sm={12}>
                                                <div className="d-flex align-items-center mb-2 px-2">
                                                    <Form.Label className="mb-0">Class</Form.Label>
                                                    <div className="w-100 ml-2">
                                                        <SelectDropDown
                                                            handleChange={this.handleSelectInputChange}
                                                            name="class"
                                                            options={this.classGetDataFunction(this.props.studentGlobals.classes)}
                                                            placeholderName={'class'}
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
                                        </Row>
                                    </Form>
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="mb-3 heading text-uppercase">Syllabus - Selection</h6>
                                <Card className="border-0 shadow-sm p-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="h6 mb-0">Adaptive exam - Syllabus</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Row className="g-0">
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
                                                                                {chData.studentChapters.map((cData, index) => (
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
                                                                                                <Form.Label column sm="7"> {cData.chapter}  </Form.Label>
                                                                                                <Col sm="5">
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
                                    </Card.Body>
                                    {/* <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="outline-success" className="px-5 text-uppercase">Edit</Button>
                                    </Card.Footer> */}
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Type of Question - Selection</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
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
                                                    <h6 className="mb-0 text-uppercase">Selected Questions</h6>
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
                                                                                            <Form.Label column sm="7"> {cData.questiontype}  </Form.Label>
                                                                                            <Col sm="5">

                                                                                                <Form.Control
                                                                                                    value={cData.percentage}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder=""
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
                                    {/* <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="outline-success" className="px-5 text-uppercase">Edit</Button>
                                    </Card.Footer> */}
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Complexity</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
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
                                                                                    <Form.Label column sm="7"> {cData.complexity}  </Form.Label>
                                                                                    <Col sm="5">

                                                                                        <Form.Control
                                                                                            value={cData.percentage}
                                                                                            type="text"
                                                                                            name="percentage"
                                                                                            placeholder=""
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
                                    {/* <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Edit</Button>
                                    </Card.Footer> */}
                                </Card>
                            </li>
                            <li className="create_custom_single_timeline">
                                <h6 className="heading text-uppercase mb-3">Question Theory</h6>
                                <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                    <Row className="g-0">
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
                                                                                    <Form.Label column sm="7"> {cData.question_theory}  </Form.Label>
                                                                                    <Col sm="5">

                                                                                        <Form.Control
                                                                                            value={cData.percentage}
                                                                                            type="text"
                                                                                            name="percentage"
                                                                                            placeholder=""
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
                                    {/* <Card.Footer className="bg-white py-3 text-right">
                                        <Button variant="success" className="px-5 text-uppercase">Save</Button>
                                    </Card.Footer> */}
                                </Card>
                            </li>
                        </ul>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={12} xs={12} className="text-right">

                        <Button onClick={this.handleFormSubmit} className="mt-5 px-5 btn btn-green text-whites">Start Exam</Button>
                        {/* <Link to="/student/subject/practice-instructions" className="mt-5 px-5 btn btn-success text-white text-uppercase">Start Exam</Link> */}
                    </Col>
                </Row>
            </div >
        )
    }
}


export default withRouter(compose(graphql(COUSTOM_EXAM, {
    name: "customfunction"
})
)(AdaptiveExamSection));


