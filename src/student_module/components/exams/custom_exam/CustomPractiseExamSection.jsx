import React, { Component } from 'react'
import { components } from 'react-select'

import { Scrollbars } from 'react-custom-scrollbars'
import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';

import '../_exam.scss';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter, Link } from "react-router-dom";
import * as Cookies from "es-cookie";
import moment from 'moment';


const COUSTOM_EXAM = gql`
  mutation(
    $params:StudentCustomPractice  
    ) {
        studentCustomPractice(
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



class CustomPractiseExamSection extends Component {
    constructor(props) {
        super(props)
        let sampleArray = [];

        const qnewobj={
            id:"0",
            questiontype:"Select All",
            count:"",
            checked: false, 
            percentage: "", 
            active: "", 
            totperError: ""

        }

        let qtypes = props.studentGlobals.questionTypes.map(item => {
            return { ...item, checked: false, percentage: "", active: "", totperError: "" }
        });
        qtypes.unshift(qnewobj);

        const cnewobj={
            id:"0",
            complexity:"Select All",
            count:"",
            checked: false, 
            percentage: "", 
            active: "", 
            totperError: ""

        }
        let comp = props.studentGlobals.complexity.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });
        comp.unshift(cnewobj);

        const qtnewobj={
            id:"0",
            question_theory:"Select All",
            count:"",
            checked: false, 
            percentage: "", 
            active: "", 
            totperError: ""

        }
        let qteory = props.studentGlobals.questionTheory.map(item => {
            return { ...item, percentage: "", active: "", totperError: "" }
        });
        qteory.unshift(qtnewobj);
        

        for (let i = 0; i < props.getSubjects.length; i++) {
            let someData = props.getSubjects[i];
            console.log("someData", someData);
             let newarr1="";
            if(i==0){
                 newarr1 = {
                    ...someData,
                    classActive: "active",
                    total_questions:0,totError: ""
                }
            }
            else{
                 newarr1 = {
                    ...someData,
                    classActive: "",
                    total_questions:0,totError: ""
                }
            }
           
            sampleArray.push(newarr1);

            someData.studentChapters.map((item,index) => {
                if(index==0){
                    item.active = "active"
                }
                else{
                    item.active = ""
                }
                
                const newall={
                    id:"0",
                    topic:"Select All",
                    checked:"checked"
                }
                item.topics.map((titem) => {
                    titem.checked = "checked"
                    // titem.checked = ""

                })
                item.topics.unshift(newall);
            });
        }
        //sampleArray.unshift(select);
        console.log("sampleArraycon", sampleArray);
        this.state = {
            oquestionscount:0,
            class: 0,
            classvalue: { value: "0", label: "ALL" },
            examtype: "1",
            subjectArray: sampleArray,
            questionTypes: qtypes,
            complexity: comp,
            questionTheory: qteory,
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
            loadbutton: 0,
            counttype: "ocount"
        }
    }
    squestioncount = (e, subid) => {

        let arr = this.state.subjectArray.map(item => {
            console.log(e.target.value, "subjects");
            if (item.id == subid) {
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value)) {
                    return { ...item, total_questions: parseInt(e.target.value), totError: "" };
                } else {
                    return { ...item, total_questions: "", totError: "Invalid Input" }
                }

            }
            return item;
        }

        )
        this.setState({ subjectArray: arr });
    }
    handleFormSubmit = e => {
        //console.log("handleFormSubmit",this.state);
        e.preventDefault();
        this.setState({ loadbutton: 1 });
        
        let advance_options = 0;
        if (this.state.advancedoption == true) {
            advance_options = 1;
        }
        let syllabus=[];
       this.state.subjectArray.map((smap)=>{
           let chapters=[];
           let topics=[];
            smap.studentChapters.map((cmap)=>{
                let filter=cmap.topics.filter((a)=>a.checked =="checked");
                if(filter.length>0){
                    chapters.push(cmap.id);
                    
                    cmap.topics.map((tmap)=>{
                        if(tmap.id!="0"){
                            if(tmap.checked =="checked"){
                                topics.push(tmap.id);
                            }
                        }
                        

                    })
                    
                }
                

            })
            
            const subnewObj={
                subject_id:parseInt(smap.id),
                chapters:chapters.toString(),
                topics:topics.toString(),
                count:parseInt(smap.total_questions)
            }
            syllabus.push(subnewObj);
       })
       let status=false;
       syllabus.map((ssmap)=>{
           if(ssmap.chapters.length>0){
            status=true;
           }

       })
       let question_types=[];
        this.state.questionTypes.map((a)=>{
            if(a.id!=0){
                if(a.percentage!=""){
                    const newObj={
                        question_type_id:parseInt(a.id),
                        percentage:parseInt(a.percentage)
                    }
                    question_types.push(newObj);
                }
            }
            

        })

        let complexity=[];
        this.state.complexity.map((b)=>{
            if(b.id!=0){
            if(b.percentage!=""){
                const newObj={
                    complexity_id:parseInt(b.id),
                    percentage:parseInt(b.percentage)
                }
                complexity.push(newObj);
            }
        }

        })

        let question_theory=[{
            application:0,
            concept:0
        }];
        this.state.questionTheory.map((c)=>{
            if(c.id!=0){
            if(c.percentage!=""){
                if(c.id=="1"){
                    question_theory[0].concept=parseInt(c.percentage);
                }
                else{
                    question_theory[0].application=parseInt(c.percentage);
                }
                
            }
        }

        })
        let cstatus=false;
        if(this.state.counttype=="ocount"){
            if(this.state.oquestionscount!=0 && this.state.oquestionscount<=100){
                cstatus=true;
            }
        }
        else{
            let tcount=0;
            syllabus.map((smap)=>{
                tcount=tcount+parseInt(smap.count);

            })
            if(tcount!=0 && tcount<=150){
                cstatus=true;
            }

        }

        if (this.state.formValid && status && cstatus) {

                const params = {
                    mobile: Cookies.get("mobile"),
                    syllabus: syllabus,
                    advance_selected:advance_options,
                    overall_count:parseInt(this.state.oquestionscount),
                    advance_option_details: {
                        question_types: question_types,
                        complexity: complexity,
                        question_theory: question_theory},
                  };
                console.log("params", params);
                this.studentCustomPractice(
                    params
                ).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message), loadbutton: 0
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } 
            else if(!cstatus){
                this.setState({ submitError: "Please enter valid Question count", loadbutton: 0 });
            }
            else {
                this.setState({ submitError: "Please select syllabus", loadbutton: 0 });
            }
        

    };
    studentCustomPractice = async (
        params) => {
        await this.props.studentCustomPractice({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("data.studentCustomPractice",data.studentCustomPractice);
                if (data.studentCustomPractice!="") {
                    this.setState({
                        loadbutton: 0
                    });
                    localStorage.setItem("session_id", data.studentCustomPractice);
                    window.open("/student/subject/custompractice-test", "_blank")
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
        if(name=="counttype"){
            let sData=[];
            if(value!="ocount"){
                 sData=this.state.subjectArray.map((Data)=>{
                     return{...Data,total_questions:50,totError: "" }
        
                });
                this.setState({
                    oquestionscount:0,
                    subjectArray: sData
                });
                
            }
            else{
                 sData=this.state.subjectArray.map((Data)=>{
                    return{...Data,total_questions:0,totError: "" }
       
               });
               this.setState({
                subjectArray: sData
            });
            }
            

        }
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
        if (name == "sexamtype") {

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



        }
        else if (name == "semiclass") {
            let filterClass = this.props.studentGlobals.classes.find((a) => a.id == value);
            if (filterClass != undefined) {
                this.setState({ semiclassvalue: { value: filterClass.id, label: filterClass.class } });
            }
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

        }
        this.setState({
            [name]: value
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
    subjectFunction = (id) => {
        const sarr = this.state.subjectArray.map((smap) => {
            if (smap.id == id) {
                return { ...smap, classActive: "active" }

            }
            else {
                return { ...smap, classActive: "" }
            }

        })
        this.setState({ subjectArray: sarr });
        this.setState({
            submitError: ""
        });

    }
    chaptersFunction = (e, subid, chpterid) => {
        const arr = this.state.subjectArray.map((smap) => {
            if (smap.id == subid) {
                const ch = smap.studentChapters.map((cmap) => {
                    if (cmap.id == chpterid) {
                        return { ...cmap, active: "active" }
                    }
                    else {
                        return { ...cmap, active: "" }
                    }

                })
                return { ...smap, studentChapters: ch }

            }
            else {
                const ch = smap.studentChapters.map((cmap) => {
                    return { ...cmap, active: "" }
                })
                return { ...smap, studentChapters: ch }

            }


        });
        this.setState({ subjectArray: arr });
    }
    topicsFunction = (e, subid, chpterid, tid) => {
        let arr=[];
        if(tid=="0"){
             arr = this.state.subjectArray.map((smap) => {
                if (smap.id == subid) {
                    const ch = smap.studentChapters.map((cmap) => {
                        if (cmap.id == chpterid) {
                            const tp = cmap.topics.map((tmap) => {
                                    if (e.target.checked == true) {
                                        return { ...tmap, checked: "checked" }
                                    }
                                    else {
                                        return { ...tmap, checked: "" }
                                    }
                            })
                            return { ...cmap, topics: tp }
                        }
                        return { ...cmap }
    
                    })
                    return { ...smap, studentChapters: ch }
    
                }
                return { ...smap }
    
            });
        }
        else{
             arr = this.state.subjectArray.map((smap) => {
            if (smap.id == subid) {
                const ch = smap.studentChapters.map((cmap) => {
                    if (cmap.id == chpterid) {
                        const tp = cmap.topics.map((tmap) => {
                            if (tmap.id == tid) {
                                if (e.target.checked == true) {
                                    return { ...tmap, checked: "checked" }
                                }
                                else {
                                    return { ...tmap, checked: "" }
                                }

                            }
                            else {
                                return { ...tmap }
                            }

                        })
                        return { ...cmap, topics: tp }
                    }
                    return { ...cmap }

                })
                return { ...smap, studentChapters: ch }

            }
            return { ...smap }

        });
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
    questionFunction = (e, qtyid) => {
        let arr=[];
        if(qtyid=="0"){
             arr = this.state.questionTypes.map(qitem => {
                if (qitem.checked == false) {
                        return { ...qitem, percentage: "",checked: true, active: "active" }
                    } else {
                        return { ...qitem, percentage: "",checked: false, active: "",totperError:"" }
                    }
                return qitem;
            }
        )
        }
        else{
             arr = this.state.questionTypes.map(qitem => {
                if (qitem.id == qtyid) {
                    if (qitem.checked == false) {
                        return { ...qitem,percentage: "", checked: true, active: "active" }
                    } else {
                        return { ...qitem,percentage: "", checked: false, active: "",totperError:"" }
                    }
                }
                return qitem;
            }
    
            )
        }
        
        this.setState({ questionTypes: arr });

    }
    percentageFun1 = (e, qtyid) => {
        console.log("e.target.value", e.target.value);
        if (qtyid == "0") {
                let arr = this.state.questionTypes.map(qitem => {
                    
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
                })
            this.setState({ questionTypes: arr });
            this.totalpercentagequestionTypes(arr, qtyid);
        }
        else {
            let arr = this.state.questionTypes.map(qitem => {
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
                    
                
            this.setState({ questionTypes: arr });
            this.totalpercentagequestionTypes(arr, qtyid);
        }
    }
    totalpercentagequestionTypes = (arr, qtyid) => {
        let count=0;
        let samplearr=arr;
        arr.map((qmap,index)=>{
            if(index!=0){
                if(qmap.percentage!=""){
                    count=count+parseInt(qmap.percentage);
                }
                
            }

        });
       
        if(count > 100){
            
            if(qtyid=="0"){
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        console.log("totalpercentagequestionTypes",count,qtyid);
                       return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap,totperError:"",percentage:""}
                    }
        
                });
                console.log("totalpercentagequestionTypesarr",arr);
            }
            else{
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
           
        }
        else{
            if(qtyid=="0"){
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                       return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap,totperError:""}
                    }
        
                });
            }
            else{
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
            
        }
        
        this.setState({ questionTypes: samplearr });
}

percentageFun2 = (e, qtyid) => {
    console.log("e.target.value", e.target.value);
    if (qtyid == "0") {
            let arr = this.state.complexity.map(qitem => {
                
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
    
            })
        this.setState({ complexity: arr });
        this.totalpercentagecomplexity(arr, qtyid);
    }
    else {
        let arr = this.state.complexity.map(qitem => {
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
                
            
        this.setState({ complexity: arr });
        this.totalpercentagecomplexity(arr, qtyid);
    }
}
    totalpercentagecomplexity = (arr, qtyid) => {
        let count=0;
        let samplearr=arr;
        arr.map((qmap,index)=>{
            if(index!=0){
                if(qmap.percentage!=""){
                    count=count+parseInt(qmap.percentage);
                }
                
            }

        });
       
        if(count > 100){
            
            if(qtyid=="0"){
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        console.log("totalpercentagequestionTypes",count,qtyid);
                       return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap,totperError:"",percentage:""}
                    }
        
                });
                console.log("totalpercentagequestionTypesarr",arr);
            }
            else{
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
           
        }
        else{
            if(qtyid=="0"){
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                       return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap,totperError:""}
                    }
        
                });
            }
            else{
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
            
        }
        
        this.setState({ complexity: samplearr });

    }
    percentageFun3 = (e, qtyid) => {
        console.log("e.target.value", e.target.value);
        if (qtyid == "0") {
                let arr = this.state.questionTheory.map(qitem => {
                    
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
        
                })
            this.setState({ questionTheory: arr });
            this.totalpercentagequestionTheory(arr, qtyid);
        }
        else {
            let arr = this.state.questionTheory.map(qitem => {
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
                    
                
            this.setState({ questionTheory: arr });
            this.totalpercentagequestionTheory(arr, qtyid);
        }
    }
    
    totalpercentagequestionTheory = (arr, qtyid) => {
        let count=0;
        let samplearr=arr;
        arr.map((qmap,index)=>{
            if(index!=0){
                if(qmap.percentage!=""){
                    count=count+parseInt(qmap.percentage);
                }
                
            }

        });
       
        if(count > 100){
            
            if(qtyid=="0"){
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        console.log("totalpercentagequestionTypes",count,qtyid);
                       return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap,totperError:"",percentage:""}
                    }
        
                });
                console.log("totalpercentagequestionTypesarr",arr);
            }
            else{
                samplearr=arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:"Total percentage should be 100%",percentage:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
           
        }
        else{
            if(qtyid=="0"){
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                       return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap,totperError:""}
                    }
        
                });
            }
            else{
                samplearr= arr.map((qmap)=>{
                    if(qmap.id==qtyid){
                        return{...qmap,totperError:""}
                    }
                    else{
                        return{...qmap}
                    }
        
                });
            }
            
        }
        
        this.setState({ questionTheory: samplearr });

    }
    render() {
        console.log("currentstate", this.state);

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
            <div className="sudent_exam_block">
                <Form.Text className="form-text text-danger">
                    {this.state.submitError}
                </Form.Text>
                <Row className="g-0">

                    <Col xl={9} lg={9} md={12} sm={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-4 title">Custom Practise</h5>
                            {/* <Link
                                to={{
                                    pathname: "/student/subject/exam-history",
                                    state: {
                                        examtype: "custompractise"
                                    }
                                }}
                                className="btn btn-outline-primary">Custom Practise History
                        </Link> */}
                        </div>
                        <ul className="create_custom_timeline list-unstyled">
                            <li className="create_custom_single_timeline">
                                <h6 className="mb-3 heading text-uppercase">Syllabus - Selection</h6>
                                <Card className="border-0 shadow-sm p-0">
                                    <Card.Header className="bg-white">
                                        <Card.Title className="h6 mb-0">Custom practise - Syllabus</Card.Title>
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

                                        <Form className="pt-2">
                                            <Row>
                                                <Col xl={6} lg={6} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2">
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
                                                <Col xl={6} lg={6} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2">
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
                                            <Row>
                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div className="w-100 ml-2">
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input

                                                                    type="radio"
                                                                    id="customRadioTypecount1"
                                                                    value="ocount"
                                                                    name="counttype"
                                                                    className="custom-control-input"
                                                                    onChange={this.handleInputChange}
                                                                    defaultChecked={true}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customRadioTypecount1"
                                                                >
                                                                    Overall count
                                                                    
                                                                </label>
                                                                {this.state.counttype == "ocount" ? (
                                                                        <Col xl={6} lg={6} md={12} sm={12}>
                                                                            <div className="d-flex align-items-center mb-2">
                                                                                {/* <Form.Label className="mb-0">Questions Count</Form.Label> */}
                                                                                <div className="ml-2">
                                                                                    <Form.Control
                                                                                        value={this.state.oquestionscount}
                                                                                        type="text"
                                                                                        name="oquestionscount"
                                                                                        placeholder="Overall count"
                                                                                        autoComplete="off"
                                                                                        maxLength="3"
                                                                                        onChange={this.handleInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    ) : ("")}
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="customRadioTypecount2"
                                                                    value="scount"
                                                                    name="counttype"
                                                                    className="custom-control-input"
                                                                    onChange={this.handleInputChange}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="customRadioTypecount2"
                                                                >
                                                                    Subject wise count
              </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>


                                            </Row>
                                        </Form>
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
                                                                        <li
                                                                            className={getsub.classActive}
                                                                            onClick={() => this.subjectFunction(getsub.id, index)}
                                                                        >
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="mr-2">{getsub.subject}</div>
                                                                                {getsub.classActive == "active" ? (
                                                                                    <React.Fragment>
                                                                                        {this.state.counttype != "ocount" ? (
                                                                                            <div style={{ width: 80 }}>
                                                                                                <Form.Control
                                                                                                    value={getsub.total_questions}
                                                                                                    type="text"
                                                                                                    name="percentage"
                                                                                                    placeholder="%"
                                                                                                    autoComplete="off"
                                                                                                    onChange={(e) => this.squestioncount(e, getsub.id)}
                                                                                                    maxLength="2"
                                                                                                />
                                                                                                <Form.Text className="form-text text-danger">
                                                                                                    {getsub.totError}
                                                                                                </Form.Text>
                                                                                            </div>
                                                                                        ) : ("")}
                                                                                    </React.Fragment>
                                                                                ) : ("")}
                                                                            </div>
                                                                        </li>
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
                                                                                                <div>{this.state.class == cData.class ? (
                                                                                                    <li className={cData.active} onClick={(e) => this.chaptersFunction(e, chData.id, cData.id)}>
                                                                                                        {cData.chapter}
                                                                                                    </li>) : ("")}</div>
                                                                                            ) : (<li className={cData.active} onClick={(e) => this.chaptersFunction(e, chData.id, cData.id)}>
                                                                                                {cData.chapter}
                                                                                            </li>)}</div>
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
                                                        <h6 className="mb-0 text-uppercase">Topics</h6>
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
                                                                    <React.Fragment>
                                                                        {chData.classActive == "active" ? (
                                                                            <React.Fragment>
                                                                                {chData.studentChapters.map((cData) => (
                                                                                    <React.Fragment>
                                                                                        {cData.active == "active" ? (
                                                                                            <React.Fragment>
                                                                                                {cData.topics.map((tmap, index) => (
                                                                                                    <li>
                                                                                                        <Form.Check type="checkbox" id={"chapcheckboxOne" + "_" + index} custom>
                                                                                                            <Form.Check.Input checked={tmap.checked} type="checkbox"
                                                                                                                onClick={(e) => this.topicsFunction(e, chData.id, cData.id, tmap.id)}
                                                                                                            />
                                                                                                            <Form.Check.Label
                                                                                                                htmlFor={"chapcheckboxOne" + "_" + index}
                                                                                                            >{tmap.topic}</Form.Check.Label>
                                                                                                        </Form.Check>
                                                                                                    </li>
                                                                                                ))}

                                                                                            </React.Fragment>
                                                                                        ) : ("")}
                                                                                    </React.Fragment>
                                                                                ))}

                                                                            </React.Fragment>
                                                                        ) : ("")}
                                                                    </React.Fragment>
                                                                ))}

                                                            </ul>
                                                        </Card.Body>
                                                    </Scrollbars>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Card.Body>

                                </Card>
                            </li>


                            {this.state.advancedoption == true ? (
                                <React.Fragment>
                                    <li className="create_custom_single_timeline">
                                        <h6 className="heading text-uppercase mb-3">Type of Question - Selection</h6>
                                        <Card as={Card.Body} className="border-0 shadow-sm p-0">
                                            <Row className="g-0">
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
                                                                    {this.state.questionTypes.map((cData, index) => (
                                                                        <li className={cData.active}>
                                                                            <div className="d-flex align-items-center">
                                                                                <Form.Check className="mr-2" type="checkbox" id={"typeofcheckboxOne" + "_" + index + "_" + cData.id} custom>
                                                                                    <Form.Check.Input type="checkbox" checked={cData.checked}
                                                                                        onClick={(e) => this.questionFunction(e, cData.id)} />
                                                                                    <Form.Check.Label htmlFor={"typeofcheckboxOne" + "_" + index + "_" + cData.id}>{cData.questiontype}</Form.Check.Label>
                                                                                </Form.Check>

                                                                                {cData.checked == true ? (
                                                                                    <div style={{ width: 80 }}>
                                                                                        <Form.Control
                                                                                            value={cData.percentage}
                                                                                            type="text"
                                                                                            name="percentage"
                                                                                            placeholder="(%)"
                                                                                            autoComplete="off"
                                                                                            onChange={(e) => this.percentageFun1(e, cData.id)}
                                                                                        />
                                                                                        <Form.Text className="form-text text-danger">
                                                                                            {cData.totperError}
                                                                                        </Form.Text>
                                                                                    </div>) : ("")}
                                                                            </div>


                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">COMPLEXITY</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.complexity.map((cData, index) =>{
                                                                        if(cData.id!=0){
                                                                            return(
                                                                                <Form.Group as={Row} controlId="formChapter1">
                                                                                    <Form.Label column sm="7"> {cData.complexity}</Form.Label>
                                                                                    <Col sm="5">
                                                                                        <Form.Control
                                                                                            value={cData.percentage}
                                                                                            type="text"
                                                                                            name="percentage"
                                                                                            placeholder="(%)"
                                                                                            autoComplete="off"
                                                                                            onChange={(e) => this.percentageFun2(e, cData.id)}
                                                                                        />
                                                                                        <Form.Text className="form-text text-danger">
                                                                                            {cData.totperError}
                                                                                        </Form.Text>
                                                                                    </Col>
                                                                                </Form.Group>
                                                                            )
                                                                        }
                                                                    }
                                                                    )}
                                                                </Form>
                                                            </Card.Body>
                                                        </Scrollbars>
                                                    </Card>
                                                </Col>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Card className="border-0 shadow-sm">
                                                        <Card.Header className="bg-white">
                                                            <h6 className="mb-0 text-uppercase">Question Theory</h6>
                                                        </Card.Header>
                                                        <Scrollbars style={{ height: 238 }}
                                                            {...this.props}
                                                            renderThumbVertical={renderThumb}
                                                            autoHide
                                                            autoHideTimeout={500}
                                                            autoHideDuration={200}>
                                                            <Card.Body className="p-3">
                                                                <Form>
                                                                    {this.state.questionTheory.map((cData, index) => {
                                                                        if(cData.id!=0){
                                                                        return(


                                                                        <Form.Group as={Row} controlId="formChapter1">
                                                                            <Form.Label column sm="7"> {cData.question_theory}</Form.Label>
                                                                            <Col sm="5">

                                                                                <Form.Control
                                                                                    value={cData.percentage}
                                                                                    type="text"
                                                                                    name="percentage"
                                                                                    placeholder="(%)"
                                                                                    autoComplete="off"
                                                                                    onChange={(e) => this.percentageFun3(e, cData.id)}
                                                                                />
                                                                                <Form.Text className="form-text text-danger">
                                                                                    {cData.totperError}
                                                                                </Form.Text>
                                                                            </Col>
                                                                        </Form.Group>


                                                                    )}})}
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
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Body className="p-1">
                                <Scrollbars style={{ height: "78vh" }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}>
                                    {this.state.subjectArray.map((smap) => {
                                        return (
                                            <Card className="border-0 bg-light">
                                                <Card.Header className="bg-secondary">
                                                    <Card.Title className="mb-0 text-white">{smap.subject}</Card.Title>
                                                </Card.Header>
                                                <Card.Body className="p-3">
                                                    <Scrollbars style={{ height: "250px" }}
                                                        {...this.props}
                                                        renderThumbVertical={renderThumb}
                                                        autoHide
                                                        autoHideTimeout={500}
                                                        autoHideDuration={200}>
                                                        {smap.studentChapters.map((chmap) => {
                                                            
                                                            let tfilterData=chmap.topics.filter((a)=>a.checked=="checked");
                                                            if(tfilterData.length>0){
                                                                return (
                                                                    <Card className="single-list-card border-0 p-2">
                                                                        <Card.Title className="h6">{chmap.chapter}</Card.Title>
                                                                        <ul className="list-unstyled topic-list bg-light m-0">
                                                                            {chmap.topics.map((tmap) => (
                                                                                
                                                                                <React.Fragment>
                                                                                    {tmap.id!=0?(<React.Fragment>
                                                                                        {tmap.checked == "checked" ? (<li>{tmap.topic}</li>) : ("")}
                                                                                    </React.Fragment>):("")}
                                                                                    
                                                                                </React.Fragment>
                                                                            ))}
    
                                                                        </ul>
                                                                    </Card>
                                                                )
                                                            }
                                                        
                                                           
                                                        })}



                                                    </Scrollbars>
                                                </Card.Body>
                                            </Card>
                                        )


                                    })}

                                </Scrollbars>
                            </Card.Body>
                            <Card.Footer className="border-0">
                            {this.state.loadbutton == 0 ? (<Button variant="primary" className="px-4 text-uppercase" className="w-100"
                                onClick={this.handleFormSubmit}
                                >Start Exam</Button>)
                            : (

                                <Button variant="primary" className="px-4 text-uppercase" className="w-100" disabled><span className="spinner-border spinner-border-sm"></span>loading..</Button>
                            )}
                                
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}


export default withRouter(compose(graphql(COUSTOM_EXAM, {
    name: "studentCustomPractice"
})
)(CustomPractiseExamSection));


