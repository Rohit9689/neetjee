import React, { Component } from 'react'
import { components } from 'react-select'
import { Container, Row, Col, Form, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';

class CustomRevisionMaterialHeader extends Component {
    constructor(props) {
        super(props);
        let bgclsname = "custom-revision-material-header";
        let chaptersearchArr = [];
        let subjectArr = [];
        let contentTypeArr = props.stateData.cTypeDropData;
        if (props.historyData.multiStateData.multichecked == true) {
            bgclsname = "custom-revision-material-header bg-dark";
            //start multi chapters
            props.historyData.multiStateData.multiDropdowns.map((item) => {
                if (item.multichapter.length > 0) {
                    item.multichapter.map((item2) => {
                        chaptersearchArr.push(item2);
                    });
                    subjectArr.push(item.id);
                }

            });
            //end multi chapters


        }
        this.state = {
            bgclsname: bgclsname,
            chaptersearchArr: chaptersearchArr,
            subjectArr: subjectArr,
            contentTypeArr: contentTypeArr
        }
    }
    contentFunction() {
        let contentArray = [];
        let neObj = {
            value: "0",
            label: "All Contents"
        }
        this.state.contentTypeArr.map((item) => {
            let neObj1 = {
                value: item.id,
                label: item.customcontent
            }
            contentArray.push(neObj1);
        });
        contentArray.unshift(neObj);
        return contentArray;
    }
    classFunction() {

        let classArray = [];
        let neObj = {
            value: "0",
            label: "All Classes"
        }
        this.props.studentGlobals.classes.map((item) => {
            let neObj1 = {
                value: item.id,
                label: item.class
            }
            classArray.push(neObj1);
        });
        classArray.unshift(neObj);
        return classArray;
    }
    subjectFunction(data) {

        let subjectArray = [];
        let neObj = {
            value: "0",
            label: "All Subjects"
        }
        console.log("this.state.subjectArr.length", this.state.subjectArr.length);
        if (this.state.subjectArr.length > 0) {
            data.subjects_counts.map((item) => {
                let filterData = this.state.subjectArr.filter((a) => a == item.id);
                console.log("filterData", filterData.length);
                if (filterData.length > 0) {
                    let neObj1 = {
                        value: item.id,
                        label: item.subject
                    }
                    subjectArray.push(neObj1);
                }

            });
        }
        else {
            data.subjects_counts.map((item) => {
                let neObj1 = {
                    value: item.id,
                    label: item.subject
                }
                subjectArray.push(neObj1);
            });
        }

        subjectArray.unshift(neObj);
        return subjectArray;
    }
    chapterFunction(data) {

        let chapterArray = [];
        let neObj = {
            value: "0",
            label: "All Chapters"
        }
        console.log("this.state.chaptersearchArr", this.state.chaptersearchArr);
        if (this.state.chaptersearchArr.length > 0) {
            console.log("sreedfdg");
            data.subjects_counts.map((item) => {
                if(this.props.stateData.subjectsearch==0){
                    
                    item.material_chapters.map((citem) => {
                        console.log("citem.content_counts.length", citem.content_counts.length);
                        let filterData = this.state.chaptersearchArr.filter((a) => a == citem.id);
                        if (filterData.length > 0) {
                        if (this.props.stateData.classsearch != 0) {
                            if (citem.class == this.props.stateData.classsearch) {
                                let array=[];
                                console.log("citem.content_counts",citem.content_counts);
                                citem.content_counts.map((item)=>{
                                    console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                    let filterContentData = this.props.stateData.contentType.split(",");
                                    console.log("filterContentData",filterContentData);
                                    let find=filterContentData.find((a) => a==item.id);
                                    if(find!=undefined){
                                        array.push(parseInt(item.count));
                                    }
                                });
                                console.log("array", array);
                                const sum = array.reduce((total, amount) => total + amount);
                                let label = citem.chapter + " - " + sum
                                if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                            }
                        }
                        else {
                            let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item.count));
                                }
                            });
                            console.log("array", array);
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                            let neObj1 = {
                                value: citem.id,
                                label: label
                            }
                            chapterArray.push(neObj1);
                        }
                        }
                    }


                    });

                

            }else{
                if (item.id == this.props.stateData.subjectsearch) {
                    item.material_chapters.map((citem) => {
                        let filterData = this.state.chaptersearchArr.filter((a) => a == citem.id);
                        if (filterData.length > 0) {
                            if (this.props.stateData.classsearch != 0) {
                                if (citem.class == this.props.stateData.classsearch) {
                                    
                                    let array=[];
                                    console.log("citem.content_counts",citem.content_counts);
                                    citem.content_counts.map((item)=>{
                                        console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                        let filterContentData = this.props.stateData.contentType.split(",");
                                        console.log("filterContentData",filterContentData);
                                        let find=filterContentData.find((a) => a==item.id);
                                        if(find!=undefined){
                                            array.push(parseInt(item.count));
                                        }
                                    });
                                    console.log("array1234", array);
                                    const sum = array.reduce((total, amount) => total + amount);
                                    let label = citem.chapter + " - " + sum
                                    if(sum>0){
                                    let neObj1 = {
                                        value: citem.id,
                                        label: label
                                    }
                                    chapterArray.push(neObj1);
                                }
                                }
                            }
                            else {
                                let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item.count));
                                }
                            });
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                                
                            }
                        }



                    });

                }

            }
                

            });
        } else {
            console.log("sreedfdg1234");
            data.subjects_counts.map((item) => {
                if(this.props.stateData.subjectsearch==0){
                    
                    item.material_chapters.map((citem) => {
                        console.log("s0", citem.content_counts.length);
                        if (this.props.stateData.classsearch != 0) {
                            if (citem.class == this.props.stateData.classsearch) {
                                let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item));
                                }
                            });
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                                
                            }
                        }
                        else {
                            let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item.count));
                                }
                            });
                            // console.log("array", array);
                            // let Data = array.filter((a) => a.count > 0);
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                            
                        }


                    });

                

            }
            else{
                if (item.id == this.props.stateData.subjectsearch) {
                    item.material_chapters.map((citem) => {
                        console.log("citem.content_counts.length", citem.content_counts.length);
                        if (this.props.stateData.classsearch != 0) {
                            if (citem.class == this.props.stateData.classsearch) {
                                let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item.count));
                                }
                            });
                            console.log("array", array);
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                                
                            }
                        }
                        else {
                            let array=[];
                            console.log("citem.content_counts",citem.content_counts);
                            citem.content_counts.map((item)=>{
                                console.log("this.props.stateData.contentType123",this.props.stateData.contentType);
                                let filterContentData = this.props.stateData.contentType.split(",");
                                console.log("filterContentData",filterContentData);
                                let find=filterContentData.find((a) => a==item.id);
                                if(find!=undefined){
                                    array.push(parseInt(item.count));
                                }
                            });
                            console.log("array", array);
                            const sum = array.reduce((total, amount) => total + amount);
                            let label = citem.chapter + " - " + sum
                            if(sum>0){
                                let neObj1 = {
                                    value: citem.id,
                                    label: label
                                }
                                chapterArray.push(neObj1);
                            }
                            
                        }


                    });

                }
            }
                

                
                

            });
        }

        chapterArray.unshift(neObj);
        console.log("chapterArraychapterArray",chapterArray);
        return chapterArray;
    }

    topicFunction(data) {

        let topicArray = [];
        let neObj = {
            value: "0",
            label: "All Topics"
        }
        data.subjects_counts.map((item) => {
            if (item.id == this.props.stateData.subjectsearch) {
                item.material_chapters.map((citem) => {
                    if (citem.id == this.props.stateData.chaptersearch) {
                        citem.topics.map((tmap) => {
                            let neObj1 = {
                                value: tmap.id,
                                label: tmap.topic
                            }
                            topicArray.push(neObj1);
                        });

                    }

                });

            }

        });
        topicArray.unshift(neObj);
        return topicArray;
    }

    render() {
        console.log("rvg", this.state);
        const imageData = this.props.getStudentMaterialCount.material_counts.find((a) => a.id == this.props.stateData.contentType);
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" className="css-6q0nyr-Svg rounded-circle" style={{ background: 'hsla(0, 0%, 100%, 0.42)' }}><path fill="#fff" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };

        return (
            <div className={this.state.bgclsname}>
                <Container>
                    <Row>
                        <Col xl={this.props.historyData.multiStateData.multichecked == true ? (12) : (8)} lg={this.props.historyData.multiStateData.multichecked == true ? (12) : (8)} md={12}>
                            <Form className="top_header">
                                <Row>
                                    <Col xl={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)}
                                        lg={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formClass">
                                            <SelectDropDown
                                                stateData={this.props.stateData.classsearchValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="classsearch"
                                                options={this.classFunction()}
                                                placeholderName={'Class'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} lg={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formSubject">
                                            <SelectDropDown
                                                stateData={this.props.stateData.subjectsearchValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="subjectsearch"
                                                options={this.subjectFunction(this.props.getStudentMaterialCount)}
                                                placeholderName={'Subject'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={this.props.historyData.multiStateData.multichecked == true ? (3) : (3)} lg={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formChapters">
                                            <SelectDropDown
                                                stateData={this.props.stateData.chaptersearchValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="chaptersearch"
                                                options={this.chapterFunction(this.props.getStudentMaterialCount)}
                                                placeholderName={'Chapter'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} lg={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} md={6} sm={6} xs={6}>
                                        <Form.Group controlId="formTopics">
                                            <SelectDropDown
                                                stateData={this.props.stateData.topicsearchValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="topicsearch"
                                                options={this.topicFunction(this.props.getStudentMaterialCount)}
                                                placeholderName={'Topic'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    {this.props.historyData.multiStateData.multichecked == true ? (
                                        <Col xl={this.props.historyData.multiStateData.multichecked == true ? (3) : (3)} lg={this.props.historyData.multiStateData.multichecked == true ? (2) : (3)} md={6} sm={6} xs={6}>
                                            <Form.Group controlId="formContent">
                                                <SelectDropDown
                                                    stateData={this.props.stateData.contentsearchValue}
                                                    handleChange={this.props.selecthandleInputChange}
                                                    name="contentsearch"
                                                    options={this.contentFunction()}
                                                    placeholderName={'Content Type'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </Form.Group>
                                        </Col>) : ("")}
                                </Row>
                            </Form>
                        </Col>
                        {this.props.historyData.multiStateData.multichecked == true ? ("") : (
                            <Col xl={4} lg={4} md={12}>
                                <div className="d-flex align-item-center justify-content-xl-end justify-content-lg-end">
                                    <div className="icon">
                                        <Image src={imageData.image} alt="material-img" width="30" />
                                    </div>
                                    <h4 className="ml-2 text-white">{imageData.customcontent}</h4>
                                </div>
                            </Col>
                        )}

                    </Row>
                </Container>
            </div>
        )
    }
}

export default CustomRevisionMaterialHeader
