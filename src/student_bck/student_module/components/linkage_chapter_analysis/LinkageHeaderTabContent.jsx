import React, { Component } from 'react'
import { Row, Col, Card, Tab, Nav, Form, Table, Image, Accordion, Button } from 'react-bootstrap'
import { components } from 'react-select'
import Select from 'react-select';
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown'
import './_previous-paper-analysis.scss'
import * as Cookies from "es-cookie";
import CardLessDataTable from '../../../neetjee_guru/components/datatables/CardLessDataTable';
import RowToggleDataTable from '../../../neetjee_guru/components/datatables/RowToggleDataTable';
import { SubjectBotanyColumns, SubjectBotanyData, defaultSorted } from './PreviousPaperAnalysisData';
import PreviousPaperDataTable from './PreviousPaperDataTable';
import { chapterwiseBotanyColumns, chapterwiseBotanyData, chapterwiseBotanydefaultSorted, expandRow } from './ChapterWiseBotanyData';
import { MultiSelect } from "react-multi-select-component";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter,Link } from "react-router-dom";
import ExpandRow from './ExpandRow';
import moment from 'moment';
import UserRestrictionAlert from '../home/UserRestrictionAlert';


// Exams
const SelectExam = [
    { value: 1, label: 'Mains' },
    { value: 2, label: 'Advance' }

];

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};



class HeaderTabContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: "0",
            subjectValue: "",
            chapter: [],
            chaptervalue: [],
            activeSubject: "",
            defaulteventKey: "first",
            userRestionModalShow:false
        }
    }
    searchSubmit = () => {
        this.props.searchSubmit(this.state);

    }
    //for single dropdown
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (name == "subject") {
            if (value != "0") {
                let subjectData = this.props.globalsubjects.find((a) => a.id == value);
                this.setState({
                    subjectValue: {
                        value: subjectData.id,
                        label: subjectData.subject
                    },
                    chapter: [],
            chaptervalue: [],
                });
            } 
            // else {
            //     this.setState({
            //         subjectValue: {
            //             value: "0",
            //             label: "Select All"
            //         }
            //     });
            // }

        }
        this.setState({ [name]: value });
    }
    //for multiple dropdown
    handleMultipleSelectInputChange = (e, name,data) => {
        console.log("handleMultipleSelectInputChange", e, name);
        if (name == "chapter") {
            let chapter = Array();
            let chaptervalue = Array();
            if (e != null) {
                for (let i = 0; i < e.length; i++) {
                    
                    const chapterval = e[i];
                    //console.log("chapterval",chapterval);
                    if(chapterval.checked == false) {
                        if(data.length!=e.length){
                            this.setState({
                                userRestionModalShow: true
                            })
                        }
                        
                    }
                    else{
                        const newObj = {
                            label: chapterval.label,
                            value: chapterval.value,
                        }
                        chaptervalue.push(newObj);
                        chapter.push(chapterval.value);
                    }
                    
                }
                this.setState({
                    chaptervalue: chaptervalue,
                    chapter: chapter
                });
            }
            else {
                this.setState({
                    chaptervalue: [],
                    chapter: []
                });

            }
        }
    };
    render() {
        console.log("HeaderTabContent", this.state);
        //start get subject data
        let subjectArray = [];
        let subjectfilter = [];
        console.log("Cookies.get", Cookies.get("examid"));
        if (Cookies.get("examid") == 5) {
            if (this.state.examtype == "0") {
                subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == "1");
            }
            else {
                subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == "2");
            }
        }
        else {
            subjectfilter = this.props.studentGlobals.exams.find((a) => a.id == Cookies.get("examid"));
        }
        console.log("subjectfilter", subjectfilter.exam_subjects);
        this.props.globalsubjects.map((smap) => {
            let data = subjectfilter.exam_subjects.filter((a) => a.subject_id == smap.id)
            //console.log("data",data, smap.id);
            if (data.length > 0) {
                const newObj = {
                    value: smap.id,
                    label: smap.subject
                }
                subjectArray.push(newObj);
            }

        });
        // if (subjectArray.length > 0) {
        //     const newObj1 = {
        //         value: "0",
        //         label: "Select All"
        //     }
        //     subjectArray.unshift(newObj1);

        // }
        //end get subject data



        //start get chapter data
        let chapterArray = [];
        this.props.globalsubjects.map((smap) => {
            if (this.state.subject != "0") {
                if (smap.id == this.state.subject) {
                    console.log("datasmap", smap);
                    smap.studentChapters.map((cmap) => {
                        if(cmap.enabled==true){
                            const newObj = {
                                value: cmap.id,
                                label: cmap.chapter,
                                checked:true
                            }
                            chapterArray.push(newObj);
                        }
                        else{
                            const newObj = {
                                value: cmap.id,
                                label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {cmap.chapter}</p>,
                                checked:false
                            }
                            chapterArray.push(newObj);
                        }
                        
                    });

                }
            }
            else {
                this.props.globalsubjects.map((smap) => {
                    console.log("subjectfilter", subjectfilter);
                    let data = subjectfilter.exam_subjects.filter((a) => a.subject_id == smap.id)

                    if (data.length > 0) {
                        console.log("datasmap1", smap);
                        smap.studentChapters.map((cmap) => {
                            if(cmap.enabled==true){
                                const newObj = {
                                    value: cmap.id,
                                    label: cmap.chapter,
                                    checked:true
                                }
                                chapterArray.push(newObj);
                            }
                            else{
                                const newObj = {
                                    value: cmap.id,
                                    label: <p><Image src={require('../../../images/locked.png')} width="13" alt="Lock" /> {cmap.chapter}</p>,
                                    checked:false
                                }
                                chapterArray.push(newObj);
                            }
                           
                        });

                    }

                });
            }
        });

        //console.log("ddata",ddata);

        console.log("Data123", chapterArray);
        let chapterselectall = true;
        let chapterlabelledBy = "Select";
        let chapterdisableSearch = false;
        if (chapterArray.length > 0) {
            chapterselectall = true;
            chapterdisableSearch = false;
        }
        else {
            chapterdisableSearch = true;
            chapterselectall = false;
            chapterlabelledBy = "No Options"
        }
        //end get chapter data
        let currentTime  = moment().unix();
        let trailRestriction=this.props.globalsubjects.find((a)=>a.id=="2");
        let clength=trailRestriction.studentChapters.filter((a)=>a.enabled==true);
        console.log("ghg", this.props.isTrialUser.isTrialUser,clength);
        return (
            <Card as={Card.Body}>
                <Form>
                    <Row>

                        <Form.Group as={Col} xl={3} lg={3} md={6} sm={12}>
                            <Form.Label>Select Subject</Form.Label>
                            <SelectDropDown
                                stateData={this.state.subjectValue}
                                handleChange={this.selecthandleInputChange}
                                name="subject"
                                options={subjectArray}
                                placeholderName={'Subject'}
                                dropdownIndicator={{ DropdownIndicator }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xl={3} lg={3} md={6} sm={12}>
                            <Form.Label>Select Chapter</Form.Label>
                            <MultiSelect
                                overrideStrings={{
                                    "allItemsAreSelected": "All Chapters are selected.",
                                    "selectSomeItems": chapterlabelledBy
                                }
                                }
                                disableSearch={chapterdisableSearch}
                                hasSelectAll={chapterselectall}
                                options={chapterArray}
                                value={this.state.chaptervalue}
                                onChange={(e) => this.handleMultipleSelectInputChange(e, "chapter",chapterArray)}
                                labelledBy={"Select"}
                            />
                        </Form.Group>
                        <Col xl={12} lg={12} md={12} sm={12} className="text-left">
                            <Button className="btn-blue my-2 px-5"
                                onClick={() => this.searchSubmit()}>Submit</Button>
                                {(this.props.isTrialUser.isTrialUser==true && clength.length<20)|| ( currentTime > this.props.isTrialUser.expiry_date && clength.length < 20)?(<div style={{color:"#f81201"}}><small>*Note: To access all Previous Papers <span style={{color:"#f81201", fontWeight:"bold"}}><Link to={"/student/package"}>upgrade to Paid Plan</Link></span> </small></div>):("")}
                        </Col>
                    </Row>
                </Form>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Card>


        )
    }
}



export default withRouter(HeaderTabContent);
