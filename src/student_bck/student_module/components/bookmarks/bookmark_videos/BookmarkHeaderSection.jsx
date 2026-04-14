import React, { Component } from 'react'
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Form, Container } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};


class BookmarkHeaderSection extends Component {
    tagdefaultValueFun(data, getStudentTags) {
        let getData = getStudentTags.find((a) => (a.id == data));
        console.log("tagdefaultValueFun", getData);
        if (getData != undefined) {
            let label="";
                if(this.props.stateData.subjectId=="0"){
                    console.log("zero");
                     if(this.props.ctype=="short"){
                        label = getData.tag + " - " + getData.shortnotes_count;
                    }
                    else if(this.props.ctype=="practise"){
                        label = getData.tag + " - " + getData.practice_count;
                    }
                    else if(this.props.ctype=="exam"){
                        label = getData.tag + " - " + getData.exam_count;
                    }
                }
                else{
                    
                    let subData= getData.subject_tag_count.find((sub)=>sub.id==this.props.stateData.subjectId);
                    console.log("notzero", subData);
                    if(subData!=undefined){
                        if(this.props.ctype=="short"){
                            label = getData.tag + " - " + subData.shortnotes_count;
                        }
                        else if(this.props.ctype=="practise"){
                            label = getData.tag + " - " + subData.practice_count;
                        }
                        else if(this.props.ctype=="exam"){
                            label = getData.tag + " - " + subData.exam_count;
                        }
                    }
                 }
                 if(label.split("-")[1]!=0){
                    const newObj = {
                        value: getData.id,
                        label: label
                    }
                    return newObj;
                 }
                
                
            

        }
    }
    tagsFunction(getStudentTags) {
        console.log("tagsFunction",getStudentTags, this.props.stateData.subjectId);
        let sampleArray = [];
        for (let i = 0; i <=getStudentTags.length; i++) {
            let idata =getStudentTags[i];
            if (idata != undefined) {
                let label="";
                if(this.props.stateData.subjectId=="0"){
                    console.log("zero");
                     //label = idata.tag + " - " + idata.count;
                     if(this.props.ctype=="short"){
                        label = idata.tag + " - " + idata.shortnotes_count;
                    }
                    else if(this.props.ctype=="practise"){
                        label = idata.tag + " - " + idata.practice_count;
                    }
                    else if(this.props.ctype=="exam"){
                        label = idata.tag + " - " + idata.exam_count;
                    }
                }
                else{
                    
                    let subData= idata.subject_tag_count.find((sub)=>sub.id==this.props.stateData.subjectId);
                    console.log("notzero", subData);
                    if(subData!=undefined){
                        if(this.props.ctype=="short"){
                            label = idata.tag + " - " + subData.shortnotes_count;
                        }
                        else if(this.props.ctype=="practise"){
                            label = idata.tag + " - " + subData.practice_count;
                        }
                        else if(this.props.ctype=="exam"){
                            label = idata.tag + " - " + subData.exam_count;
                        }
                    }
                 }
                 if(label.split("-")[1]!=0){
                    const newObj = {
                        value: idata.id,
                        label: label
                    }
                    sampleArray.push(newObj);
                }
                    
                

            }
        }
        return sampleArray;
    }
    subjectsFunction(getStudentBookmarksCount) {


        console.log("subjectsFunction", getStudentBookmarksCount);
        let sampleArray = [];
        let allcount = 0;
        

           if(this.props.ctype=="short"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.short_notes_count);
            }
            else if(this.props.ctype=="practise"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.practice_questions_count);
            }
            else if(this.props.ctype=="exam"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.exam_questions_count);
           }

        
        const labela = "ALL Subjects" + " - " + allcount;
        const newObj1 = {
            value: 0,
            label: labela
        }
        if(this.props.type=="notes"){
            for (let i = 0; i <= getStudentBookmarksCount.notes_subjects_count.length; i++) {
                let idata = getStudentBookmarksCount.notes_subjects_count[i];
                if (idata != undefined) {
                    let label = "";
                    if(this.props.ctype=="short"){
                        label = idata.subject_name + " - " + idata.shortnotes_count;
                    }
                    else if(this.props.ctype=="practise"){
                        label = idata.subject_name + " - " + idata.practice_count;
                    }
                    else if(this.props.ctype=="exam"){
                        label = idata.subject_name + " - " + idata.exam_count;
                   }
                   if(label.split("-")[1]!=0){
                    const newObj = {
                        value: idata.id,
                        label: label
                    }
                    sampleArray.push(newObj);
                   }
                    
                }
            }
        }else{
            for (let i = 0; i <= getStudentBookmarksCount.bookmark_subjects_count.length; i++) {
                let idata = getStudentBookmarksCount.bookmark_subjects_count[i];
                if (idata != undefined) {
                    let label = "";
                    if(this.props.ctype=="short"){
                        label = idata.subject_name + " - " + idata.shortnotes_count;
                    }
                    else if(this.props.ctype=="practise"){
                        label = idata.subject_name + " - " + idata.practice_count;
                    }
                    else if(this.props.ctype=="exam"){
                        label = idata.subject_name + " - " + idata.exam_count;
                   }
                   if(label.split("-")[1]!=0){
                    const newObj = {
                        value: idata.id,
                        label: label
                    }
                    sampleArray.push(newObj);
                   }
                    
                }
            }
        }
        if(labela.split("-")[1]!=0){
            sampleArray.unshift(newObj1);
        }
        
        return sampleArray;
    }
    defaultValueFun(data, getStudentBookmarksCount) {
        console.log("defaultValueFun", data);
        if (data == "0") {
            let allcount = 0;
            if(this.props.ctype=="short"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.short_notes_count);
            }
            else if(this.props.ctype=="practise"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.practice_questions_count);
            }
            else if(this.props.ctype=="exam"){
                allcount =parseFloat(allcount)+parseFloat(getStudentBookmarksCount.exam_questions_count);
           }
            const labela = "ALL Subjects" + " - " + allcount;
            const newObj1 = {
                value: 0,
                label: labela
            }
            return newObj1;
        }
        else {
            if(this.props.type=="notes"){
                let getData = getStudentBookmarksCount.notes_subjects_count.find((a) => (a.id == data));
            if (getData != undefined) {
               
                let label = "";
                if(this.props.ctype=="short"){
                    label = getData.subject_name + " - " + getData.shortnotes_count;
                }
                else if(this.props.ctype=="practise"){
                    label = getData.subject_name + " - " + getData.practice_count;
                }
                else if(this.props.ctype=="exam"){
                    label = getData.subject_name + " - " + getData.exam_count;
               }
                const newObj = {
                    value: getData.id,
                    label: label
                }
                return newObj;
            }
            }
            else{
                let getData = getStudentBookmarksCount.bookmark_subjects_count.find((a) => (a.id == data));
                if (getData != undefined) {
                   
                    let label = "";
                    if(this.props.ctype=="short"){
                        label = getData.subject_name + " - " + getData.shortnotes_count;
                    }
                    else if(this.props.ctype=="practise"){
                        label = getData.subject_name + " - " + getData.practice_count;
                    }
                    else if(this.props.ctype=="exam"){
                        label = getData.subject_name + " - " + getData.exam_count;
                   }
                    const newObj = {
                        value: getData.id,
                        label: label
                    }
                    return newObj;
                }
            }
            
        }


    }
    chaptersFunction() {
        let sampleArray = [];
        console.log("this.props.stateData.subjectId", this.props.stateData.subjectId);
        if (this.props.stateData.subjectId != 0) {
            for (let i = 0; i <= this.props.getSubjects.length; i++) {
                let idata = this.props.getSubjects[i];
                console.log("idata", idata);
                if (idata != undefined) {
                    if (idata.id == this.props.stateData.subjectId) {
                        console.log();
                        if (idata.studentChapters != undefined) {
                            for (let c = 0; c < idata.studentChapters.length; c++) {
                                let cdata = idata.studentChapters[c]
                                if (cdata != undefined) {
                                    const newObj = {
                                        value: cdata.id,
                                        label: cdata.chapter
                                    }
                                    sampleArray.push(newObj);

                                }

                            }
                        }


                    }

                }
            }

        }
        return sampleArray;

    }
    render() {
        let getStudentBookmarksCount = "";
        let getStudentTags = "";
        if(this.props.type=="notes"){
            if (JSON.parse(localStorage.getItem("getStudentNotesCount")) != "") {
                getStudentBookmarksCount = JSON.parse(localStorage.getItem("getStudentNotesCount"));
            }
            else {
                this.props.history.push("/student/login");
            }
    
            
            if (JSON.parse(localStorage.getItem("ngetStudentTags")) != "") {
                getStudentTags = JSON.parse(localStorage.getItem("ngetStudentTags"));
            }
            else {
                this.props.history.push("/student/login");
            }
        }
        else if(this.props.type=="bookmark"){
            if (JSON.parse(localStorage.getItem("getStudentBookmarksCount")) != "") {
                getStudentBookmarksCount = JSON.parse(localStorage.getItem("getStudentBookmarksCount"));
            }
            else {
                this.props.history.push("/student/login");
            }
    
            
            if (JSON.parse(localStorage.getItem("getStudentTags")) != "") {
                getStudentTags = JSON.parse(localStorage.getItem("getStudentTags"));
            }
            else {
                this.props.history.push("/student/login");
            }
        }
        
        return (
            <div className="shadow-sm bookmark-header">
                <Container fluid={true}>
                    <Form className="top_header">
                        <Row>
                            <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formSubjects">
                                    <Form.Label column sm="3">
                                        Subjects
                                    </Form.Label>
                                    <Col sm="9">
                                        <SelectDropDown
                                            defaultValue={this.defaultValueFun(this.props.stateData.subjectId, getStudentBookmarksCount)}
                                            //defaultValue={this.subjectsFunctionDefault()}
                                            name="subjectId"
                                            handleChange={this.props.phandleSelectInputChange}
                                            options={this.subjectsFunction(getStudentBookmarksCount)}
                                            placeholderName={'Subjects'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            {/* <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formChapters">
                                    <Form.Label column sm="3">
                                        Chapters
                                    </Form.Label>
                                    <Col sm="9">
                                        <SelectDropDown
                                            name="chapterId"
                                            handleChange={this.props.phandleSelectInputChange}
                                            options={this.chaptersFunction()}
                                            placeholderName={'Chapters'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col> */}
                            <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                                <Form.Group as={Row} controlId="formTags">
                                    <Form.Label column sm="3">
                                        Tags
                                    </Form.Label>
                                    <Col sm="9">
                                        <Select maxMenuHeight={150}
                                            defaultValue={this.tagdefaultValueFun(this.props.stateData.tags, getStudentTags)}
                                            isMulti
                                            name="tagId"
                                            options={this.tagsFunction(getStudentTags)}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.props.pTaghandleSelectInputChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default withRouter(compose(


)(BookmarkHeaderSection));
