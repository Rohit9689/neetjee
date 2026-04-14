import React, { Component } from 'react'
import { Container, Row, Col, Card, Tab, Nav, Form, Table, Image, Accordion, Button } from 'react-bootstrap'
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
import { withRouter } from "react-router-dom";
import ExpandRow from './ExpandRow';
import HeaderTabContent from './HeaderTabContent';
import ChapterWeightage from './ChapterWeightage';
import CustomModal from './CustomModal';

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

const FETCH_PREVIOUSDATA = gql` 
query($examType: Int,$subjects: String,$years: String,$mobile: String) {
    getPreviousPaperAnalysis(examType: $examType, subjects:$subjects, years:$years,mobile:$mobile){
        subjects_weightage{
            id
            subject
            chapters{
                id
                chapter
                qsCount
                year{
                    id
                    year
                    count
                }
                topic{
                    id
                    topic
                    qsCount
                    year{
                        id
                        year
                    count
                    }
                }
                linkage{
                    id
                    linkedChapters
                    qsCount
                    year{
                        id
                        count
                        year
                    }
                }
                questionTheory{
                    id
                    question_theory
                    qsCount
               }
                groupName
                difficultyLevel
                learningHours
            }
            complexity{
                id
                complexity
                qsCount
                year{
                    id
                    year
                    count
                }
            }
            questionTheroy{
                id
                question_theory
                qsCount
                year{
                    id
                    year
                    count
                }
            }
            questionType{
                id
                questiontype
                qsCount
                year{
                    id
                    year
                    count
                }
            }

        }
        complexityWeightage{
            id
            complexity
            qsCount
            year{
                id
                year
                count
            }
        }
        questionTypeComplexity{
            id
            questiontype
            subject{
                id
                subject
                qsCount
                year{
                    id
                    year
                    count
                }
            }
            qsCount
            year{
                id
                year
                count
            }
            
        }
        questionTheoryWise{
            id
            question_theory
            qsCount
            year{
                id
                year
                count
            }
            
        }
        isYearEmpty
     }
}

`;

class PreviousPaperAnalysisSection extends Component {
    constructor(props) {
        super(props);
        console.log("constructor123", props.stateData);
        this.state = {
            modalShow: false,
            pexamtype: props.stateData.pexamtype,
            psubject: props.stateData.psubject,
            defaulteventKey: props.stateData.defaulteventKey,
            //for getting data year is 1 as default
            pyeartype: "1",
            chapter: "0",
            topic: "0",
            complexity: "0",
            qtype: "0",
            qtheory: "0",
            linkage: false,
            diffoftheory: false,
            topdefaultActiveKey: "",
        }
    }
    topaccactiveFun = (type) => {
        if (type == this.state.topdefaultActiveKey) {
            this.setState({
                topdefaultActiveKey: ""
            });
        }
        else {
            this.setState({
                topdefaultActiveKey: type
            });
        }


    }
    singleactionsFormatter3(cell, column, row, rowIndex, formatExtraData) {
        return (
            <div className="text-link d-flex align-items-center">
                <div className="text-primary">{cell} %</div>
            </div>
        );
    }
    singlenormalactionsFormatter3(cell, column, row, rowIndex, formatExtraData) {
        return (
            <div className="text-link d-flex align-items-center">
                <div style={{ fontWeight: "bold", width: 40, cursor: "pointer" }} className="text-dark text-left">{cell} </div>
            </div>
        );
    }
    actionsFormatter3(cell, column, row, rowIndex, formatExtraData) {
        //console.log("actionsFormatter3", cell);

        return (
            <div className="text-link d-flex align-items-center">
                <div style={{ fontWeight: "bold", width: 40 }} className="text-dark text-left">{cell.split(" ")[0]} </div>
                <div className="text-primary" style={{ width: 45 }}>{cell.split(" ")[1]}  % </div>
            </div>
        );
    }
    difficultactionsFormatter(cell, column, row, rowIndex, formatExtraData) {

        if (cell == "Easy") {
            return (<div className="px-2">
                <div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 29.31 31.306"><g transform="translate(-496.526 -405.99)"><g transform="translate(494.998 408.417)"><g transform="translate(1.527 -2.427)"><path fill="#19cba0" d="M75.634,58.468c.272-.092.609-.19.931-.319,2.934-1.173,5.864-2.355,8.8-3.524a6.413,6.413,0,0,1,1.3-.405A2.323,2.323,0,0,1,89.286,55.4a2.087,2.087,0,0,1-1.06,2.547,16.222,16.222,0,0,1-1.957.87c-.9.374-1.8.732-2.779,1.129a2.271,2.271,0,0,1,.722,2.506c-.052.157.131.438.285.59a2.023,2.023,0,0,1,.465,2.836.908.908,0,0,0,.068.771,2.046,2.046,0,0,1-.977,3.242c-3.438,1.477-6.908,2.887-10.344,4.368-.533.23-.9.795-1.433,1.028-1.576.692-3.17,1.365-4.808,1.911a2.431,2.431,0,0,1-2.911-1.374c-1.456-3.136-2.873-6.29-4.221-9.468-.609-1.436.02-2.62,1.522-3.242,1.2-.5,2.4-1.006,3.633-1.446a2.765,2.765,0,0,1,1.519-.2,1.408,1.408,0,0,0,1.625-.627,10.631,10.631,0,0,0,2.241-4.966c.22-.963.3-1.955.516-2.92a4.445,4.445,0,0,1,.6-1.448,1.983,1.983,0,0,1,3.453-.127,5.418,5.418,0,0,1,.842,2.852A28.082,28.082,0,0,1,75.634,58.468Zm-1.78,1.748a5.24,5.24,0,0,1,.081-.827c.366-1.214.785-2.414,1.114-3.636a4.314,4.314,0,0,0-.206-3.341,1.711,1.711,0,0,0-1.148-.815c-.326-.015-.8.492-1,.865a4.615,4.615,0,0,0-.431,1.607c-.358,3.055-1.131,5.95-3.488,8.217L73.667,73.12l2.029-.848c2.585-1.083,5.181-2.141,7.739-3.277a1.679,1.679,0,0,0,.849-1.086c.049-.274-.424-.66-.718-.948a5.339,5.339,0,0,0-.812-.553,6.612,6.612,0,0,0,.766-.734c.267-.351.683-.779.631-1.12a1.515,1.515,0,0,0-.941-.9c-1.056-.354-1.057-.33-.332-1.212a1.218,1.218,0,0,0,.25-1.067c-.155-.319-.646-.51-1.017-.716a8.373,8.373,0,0,0-.938-.387c.268-.265.485-.635.814-.777,1.584-.683,3.2-1.3,4.8-1.95,1.244-.5,1.728-1.117,1.419-1.791-.295-.643-1.145-.741-2.365-.253q-5.4,2.161-10.8,4.33C74.718,59.963,74.379,60.049,73.854,60.216ZM66.517,76.457a11.964,11.964,0,0,0,1.222-.31c1.158-.444,2.308-.906,3.454-1.375,1.177-.481,1.466-1.109.971-2.213q-2.068-4.6-4.176-9.192c-.482-1.051-1.05-1.252-2.2-.806s-2.306.911-3.452,1.382-1.488,1.148-1.019,2.228c1.314,3.028,2.654,6.047,4.046,9.044A5.523,5.523,0,0,0,66.517,76.457Z" transform="translate(-60.106 -46.008)" /><path fill="#19cba0" d="M105.117,43.73c-.218.182-.425.492-.63.49-.26,0-.695-.209-.749-.41q-.565-2.084-.966-4.211c-.036-.194.3-.575.545-.667a.781.781,0,0,1,.7.321C104.415,40.7,104.744,42.169,105.117,43.73Z" transform="translate(-86.397 -38.908)" /><path fill="#19cba0" d="M122.4,51.395c-.64-.124-.871-.725-.458-1.137.974-.974,1.98-1.921,3.027-2.815a1.014,1.014,0,0,1,.939.037.885.885,0,0,1,.011.851c-.985,1.008-2.027,1.961-3.067,2.914A1.054,1.054,0,0,1,122.4,51.395Z" transform="translate(-98.083 -44.099)" /><path fill="#19cba0" d="M116.282,41.711a13.333,13.333,0,0,1-.334,1.931c-.086.274-.489.447-.748.666-.195-.258-.579-.537-.553-.771.15-1.365.363-2.725.639-4.07.048-.235.5-.386.767-.577.178.294.5.589.5.881A13.1,13.1,0,0,1,116.282,41.711Z" transform="translate(-93.716 -38.89)" /></g></g><path fill="#19cba0" d="M320.751,39.163l-1.556.24a3.352,3.352,0,0,1,1.263-4.039,3.749,3.749,0,0,1,4.5.022,3.46,3.46,0,0,1,1.112,4.161c-.251.672-.671,1.286-.879,1.967a16.537,16.537,0,0,0-.365,2.208l-1.413.427a5.957,5.957,0,0,1-.362-1.939c.151-.906.687-1.743.867-2.648a5.239,5.239,0,0,0-.012-2.449,1.694,1.694,0,0,0-1.537-.515,7.631,7.631,0,0,0-1.48,1.932A2.225,2.225,0,0,0,320.751,39.163Z" transform="translate(178.219 372.161)" /><path fill="#19cba0" d="M327.954,53.6l1.721-.52.641,2.123-1.692.616Z" transform="translate(174.094 363.684)" /></g></svg></div> <div>
                    {cell}
                </div>
            </div>);
        }
        else if (cell == "Moderate") {
            return (<div className="px-2">
                <div><svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 38.405 43.114"><g transform="translate(-687.45 -399.108)"><g transform="translate(688.65 401.509)"><path fill="#ffb507" stroke="#ffb507" d="M221.385,308.584a24.055,24.055,0,0,0,6.437-5.891c.723-.969,1.47-1.921,2.211-2.876a2.393,2.393,0,0,1,3.426-.7,2.369,2.369,0,0,1,.392,3.468c-.736,1.04-1.5,2.061-2.249,3.092-.19.262-.368.533-.7,1.02h1.653c1.046,0,2.093.024,3.138-.006a2.4,2.4,0,0,1,2.611,1.315,2.453,2.453,0,0,1-.707,3c1.4,2,1.226,3.106-.426,4.076a11.274,11.274,0,0,1,.065,2.677c-.207.951-1.111,1.293-2.132,1.424.068.161.124.289.175.418a1.968,1.968,0,0,1-1.856,2.863c-2.386.032-4.778.091-7.158-.037a11.632,11.632,0,0,1-2.974-.862c-.614-.209-1.188-.535-1.8-.762-.186-.069-.568-.064-.623.037-.516.946-1.4.686-2.183.7-3.036.051-2.876.091-2.863-2.9.014-3.073,0-6.147.005-9.22,0-1.221.284-1.5,1.5-1.509a11.376,11.376,0,0,1,1.86.019A18.443,18.443,0,0,1,221.385,308.584Zm12.55,2.837-.039-.539a9.538,9.538,0,0,1,1.128-.141c2.2-.021,2.821-.38,2.834-1.67.013-1.321-.65-1.715-2.882-1.715-1.111,0-2.225.038-3.333-.02-.411-.021-1.015-.161-1.159-.439s.088-.859.317-1.2c.843-1.243,1.775-2.425,2.631-3.66a1.692,1.692,0,0,0-2.69-2.053,9.538,9.538,0,0,0-.6.777,31.561,31.561,0,0,1-8.638,8.585,1.629,1.629,0,0,0-.576,1.188c-.052,2.516.045,5.036-.056,7.549-.051,1.278.084,2.214,1.583,2.356a.856.856,0,0,1,.356.158,8.825,8.825,0,0,0,5.437,1.261c1.4-.067,2.81-.011,4.216-.014a7.418,7.418,0,0,0,1.174-.033,1.336,1.336,0,0,0-.113-2.662c-.52-.036-1.048.02-1.567-.025a2.77,2.77,0,0,1-.754-.371c.3-.142.389-.215.475-.216.882-.019,1.763-.032,2.645-.035,1.7-.006,2.523-.551,2.5-1.657-.024-1.072-.823-1.587-2.465-1.588h-1.745l-.031-.438a4.22,4.22,0,0,1,.813-.188c.751-.026,1.5-.008,2.255-.009,1.483,0,2.207-.538,2.2-1.623s-.7-1.573-2.232-1.578C235.058,311.419,234.5,311.42,233.935,311.42Zm-13.72,3.3V311.3c0-2.8,0-2.771-2.767-2.763-.783,0-1.013.274-1,1.029.032,2.869.013,5.739.013,8.609,0,2.827,0,2.806,2.876,2.755.7-.012.9-.263.892-.923C220.2,318.242,220.214,316.48,220.215,314.72Z" transform="translate(-215.817 -298.663)" /><path fill="#ffb507" stroke="#ffb507" d="M290.1,389.928c-1.089,0-1.957,0-2.824,0-.883,0-1.767.027-2.648-.019a2.217,2.217,0,0,1-2.2-2.289,2.265,2.265,0,0,1,2.02-2.372,3.9,3.9,0,0,1,2.72.393,3.2,3.2,0,0,1-.731.244c-.587.032-1.178-.009-1.765.022a1.682,1.682,0,0,0,.027,3.358c1.569.035,3.139-.015,4.707.031.378.011.931.163,1.072.427a1.392,1.392,0,0,1-.255,1.122c-.805,1.19-1.686,2.329-2.524,3.5a1.771,1.771,0,0,0,.146,2.609c.845.642,1.815.418,2.613-.609,1.924-2.475,3.7-5.085,6.235-7.012.911-.691,1.877-1.313,2.756-2.04a1.667,1.667,0,0,0,.58-1.095c.047-2.942.015-5.885.036-8.827,0-.55-.165-.741-.719-.913-.958-.3-1.838-.835-2.778-1.2-.7-.271-1.443-.429-2.168-.638l.022-.311a2.346,2.346,0,0,1,.909-.085c.983.333,1.944.735,2.908,1.123.8.324,1.563.97,2.389-.07.2-.252.857-.187,1.3-.191,3.456-.026,3.213-.248,3.2,3.142-.007,2.975,0,5.95,0,8.926,0,1.282-.273,1.548-1.553,1.558a11.713,11.713,0,0,1-1.86-.019,5.188,5.188,0,0,1-1.786-.693,18.5,18.5,0,0,0-5.248,4.1c-1.3,1.511-2.5,3.106-3.729,4.674a2.429,2.429,0,0,1-3.5.7,2.388,2.388,0,0,1-.319-3.48C288.062,392.7,289.008,391.422,290.1,389.928Zm14.408-7.934c0-1.793-.02-3.587.01-5.38.012-.683-.242-.941-.919-.9a19.062,19.062,0,0,1-2.053,0c-.6-.029-.809.219-.806.8q.02,5.38,0,10.761c0,.577.208.837.8.812.684-.029,1.371-.035,2.054,0s.931-.231.92-.911C304.484,385.45,304.5,383.721,304.5,381.993Z" transform="translate(-269.353 -359.369)" /></g><g transform="translate(716.581 399.098) rotate(21)"><path fill="#ffb507" d="M2.26,4.63c-.21.175-.409.474-.606.472-.25,0-.669-.2-.721-.395Q.389,2.7,0,.654C-.032.468.294.1.527.012A.751.751,0,0,1,1.2.321C1.584,1.715,1.9,3.128,2.26,4.63Z" transform="translate(0 0.011)" /><path fill="#ffb507" d="M.64,3.9C.025,3.781-.2,3.2.2,2.806,1.137,1.868,2.106.956,3.114.1a.976.976,0,0,1,.9.035.851.851,0,0,1,.01.819c-.949.97-1.951,1.888-2.953,2.8A1.014,1.014,0,0,1,.64,3.9Z" transform="translate(7.005 3.122)" /><path fill="#ffb507" d="M1.575,2.715a12.834,12.834,0,0,1-.321,1.858c-.083.263-.471.431-.72.641C.346,4.967-.024,4.7,0,4.473.145,3.159.35,1.85.617.555.663.329,1.1.183,1.355,0c.171.283.486.567.484.849A12.61,12.61,0,0,1,1.575,2.715Z" transform="translate(4.387 0)" /></g><g transform="translate(688.489 430.2) rotate(16)"><path fill="#ffb507" d="M2.26,4.63c-.21.175-.409.474-.606.472-.25,0-.669-.2-.721-.395Q.389,2.7,0,.654C-.032.468.294.1.527.012A.751.751,0,0,1,1.2.321C1.584,1.715,1.9,3.128,2.26,4.63Z" transform="matrix(-0.966, -0.259, 0.259, -0.966, 9.948, 9.655)" /><path fill="#ffb507" d="M.64,3.9C.025,3.781-.2,3.2.2,2.806,1.137,1.868,2.106.956,3.114.1a.976.976,0,0,1,.9.035.851.851,0,0,1,.01.819c-.949.97-1.951,1.888-2.953,2.8A1.014,1.014,0,0,1,.64,3.9Z" transform="matrix(-0.966, -0.259, 0.259, -0.966, 3.986, 4.836)" /><path fill="#ffb507" d="M1.575,2.715a12.834,12.834,0,0,1-.321,1.858c-.083.263-.471.431-.72.641C.346,4.967-.024,4.7,0,4.473.145,3.159.35,1.85.617.555.663.329,1.1.183,1.355,0c.171.283.486.567.484.849A12.61,12.61,0,0,1,1.575,2.715Z" transform="matrix(-0.966, -0.259, 0.259, -0.966, 5.707, 8.529)" /></g></g></svg> </div><div>{cell}</div></div>);
        }
        else if (cell == "Difficult") {
            return (<div className="px-2">
                <div><svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 24.513 25.806"><g transform="translate(-894.434 -399.434)"><g transform="translate(894.434 399.434)"><path fill="#f05d70" d="M336.577,60.426a8.949,8.949,0,1,1-9.008,8.935A8.959,8.959,0,0,1,336.577,60.426ZM336.51,75.9a14.256,14.256,0,0,0,2.337-.884c.8-.472.755-1.267.027-1.843a4.5,4.5,0,0,0-4.656-.008c-.715.562-.764,1.393.012,1.853A14.405,14.405,0,0,0,336.51,75.9ZM335.13,66.3a2.168,2.168,0,1,0-4.335-.007,2.134,2.134,0,0,0,2.2,2.164A2.161,2.161,0,0,0,335.13,66.3Zm6.76.021a2.168,2.168,0,1,0-4.336-.049,2.168,2.168,0,0,0,4.336.049Z" transform="translate(-325.157 -52.518)" /><path fill="#f05d70" d="M319.9,36.979l-.808.125a1.74,1.74,0,0,1,.655-2.1,1.946,1.946,0,0,1,2.338.011,1.8,1.8,0,0,1,.577,2.16c-.13.349-.348.668-.456,1.021a8.582,8.582,0,0,0-.189,1.146l-.734.222a3.092,3.092,0,0,1-.188-1.007c.078-.47.356-.9.45-1.374a2.72,2.72,0,0,0-.006-1.271.879.879,0,0,0-.8-.267,3.96,3.96,0,0,0-.768,1A1.153,1.153,0,0,0,319.9,36.979Z" transform="translate(-318.972 -33.955)" /><path fill="#f05d70" d="M390.436,59.789l-1.078-.054c.4-.915.68-1.678,1.054-2.394.175-.335.543-.563.787-.869a1.15,1.15,0,0,0-.152-1.843c-.758-.526-1.416-.248-1.859.535-.112.2-.2.413-.314.669l-1.156-.166c.187-1.468.856-2.3,1.969-2.526a2.578,2.578,0,0,1,2.437,4.375C391.6,58.156,391.135,58.843,390.436,59.789Z" transform="translate(-368.429 -47.231)" /><path fill="#f05d70" d="M371.4,37.01l-.756-.3c.52-.529.916-.977,1.363-1.368a4.659,4.659,0,0,1,.773-.38c.53-.3.757-.775.4-1.3a.875.875,0,0,0-1.419-.14c-.13.107-.242.235-.392.383l-.73-.428a1.866,1.866,0,0,1,2-1.212,1.977,1.977,0,0,1,1.671,1.544,1.947,1.947,0,0,1-1.161,2.105C372.616,36.215,372.111,36.564,371.4,37.01Z" transform="translate(-356.144 -32.244)" /><path fill="#f05d70" d="M369.714,50.206l.835.328-.432,1.1-.835-.328Z" transform="translate(-355.165 -45.166)" /><path fill="#f05d70" d="M327.954,53.346l.893-.27.333,1.1-.878.32Z" transform="translate(-325.434 -47.231)" /><path fill="#f05d70" d="M395.965,80.936h-1.236V79.367l1.236-.079Z" transform="translate(-373.472 -66.088)" /></g></g></svg></div><div>{cell}</div> </div>);
        }
        else if (cell == "Highly Difficult") {
            return (<div className="px-2"><div><svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 31.958 27.369"><g transform="translate(-1097.509 -398.264)"><g transform="translate(1097.509 398.264)"><path fill="red" d="M476.337,62.072a9.163,9.163,0,1,1-9.223,9.149A9.174,9.174,0,0,1,476.337,62.072Zm-.068,15.849a14.594,14.594,0,0,0,2.393-.906c.82-.483.773-1.3.028-1.888a4.61,4.61,0,0,0-4.767-.007c-.732.575-.783,1.426.012,1.9A14.754,14.754,0,0,0,476.269,77.921Zm-1.414-9.837a2.22,2.22,0,1,0-4.439-.007,2.186,2.186,0,0,0,2.254,2.216A2.212,2.212,0,0,0,474.855,68.084Zm6.921.022a2.22,2.22,0,1,0-4.439-.05,2.22,2.22,0,0,0,4.439.05Z" transform="translate(-460.118 -53.029)" /><path fill="red" d="M450.853,51.643l.946.535-.1.275a6.378,6.378,0,0,0-1.037-.321,2.209,2.209,0,0,0-1.215.015c-1.428.758-2.839,1.56-4.186,2.453a1.564,1.564,0,0,0-.656,1.28c.11.345.8.666,1.266.707,1.136.1,2.287.033,3.512.033-.1.157-.148.283-.19.282a40.537,40.537,0,0,1-5.013-.167c-1.552-.227-1.881-1.378-.737-2.457a28.345,28.345,0,0,1,3.332-2.458,16.335,16.335,0,0,1,1.5-.823c-.648-.408-1.266-.735-1.811-1.157a13.152,13.152,0,0,1-1.981-1.751c-.784-.913-.553-1.835.614-2.088,1.53-.332,3.12-.387,4.872-.583l-.779,1.733a21.3,21.3,0,0,0-2.129.28c-1,.226-1.192.867-.455,1.581a15.5,15.5,0,0,0,1.971,1.487.715.715,0,0,0,.571.092c2.046-.8,4.081-1.619,6.342-2.523l-4.237-.736c.639-1.29,1-1.478,2.328-1.228a10.072,10.072,0,0,1,2.078.421c2.853,1.216,5.55-.015,8.3-.432.932-.141,1.865-.27,2.865-.415v1.574l-4.593.763-.023.189c.3.113.6.225.892.34,1.621.631,3.232,1.29,4.871,1.872a1.641,1.641,0,0,0,1.19-.085,7.445,7.445,0,0,0,1.626-1.21c.862-.831.675-1.453-.478-1.719-.484-.112-.982-.159-1.509-.242-.033-.236-.079-.466-.093-.7-.016-.258,0-.518,0-1.016a31.481,31.481,0,0,1,3.6.513c1.264.325,1.535,1.243.645,2.187a21.779,21.779,0,0,1-2.589,2.121,13.171,13.171,0,0,1-1.151.711c.66.366,1.26.648,1.8,1.012.953.64,1.907,1.289,2.793,2.016.539.443,1.2,1.1.785,1.8-.3.511-1.115.722-1.706,1.057-.064.036-.166,0-.317,0,.008-.144-.04-.333.031-.407.74-.773.32-1.419-.334-1.833-1.489-.943-3.036-1.8-4.59-2.633-.209-.112-.593.081-.889.156-.334.085-.662.2-.993.3l-.11-.259,1.246-.715c-2.8-.891-5.373-1.713-7.95-2.517a1.067,1.067,0,0,0-.6.031q-3.793,1.193-7.579,2.408Z" transform="translate(-442.762 -41.159)" /><path fill="red" d="M462.752,38.13l-.828-.117a1.782,1.782,0,0,1,1.263-1.86,1.992,1.992,0,0,1,2.288.7,1.839,1.839,0,0,1-.074,2.288c-.231.3-.539.551-.75.866a8.832,8.832,0,0,0-.525,1.067h-.785a3.176,3.176,0,0,1,.114-1.042c.216-.437.617-.781.848-1.214a2.791,2.791,0,0,0,.371-1.248c0-.179-.534-.558-.7-.5a4.054,4.054,0,0,0-1.05.755C462.858,37.881,462.834,37.981,462.752,38.13Z" transform="translate(-456.418 -34.471)" /><path fill="red" d="M533.973,80.644l-.81-.041c.3-.688.511-1.261.793-1.8.131-.252.408-.423.591-.653a.864.864,0,0,0-.114-1.385c-.57-.4-1.064-.187-1.4.4-.084.149-.147.31-.236.5l-.869-.125c.141-1.1.643-1.732,1.48-1.9a1.938,1.938,0,0,1,1.832,3.289C534.848,79.416,534.5,79.933,533.973,80.644Z" transform="translate(-506.312 -62.668)" /><path fill="red" d="M525.357,35.629h-.832c.3-.7.508-1.274.787-1.813.131-.252.411-.421.6-.651.391-.488.432-1.021-.1-1.389a.9.9,0,0,0-1.4.4c-.084.15-.143.314-.23.512l-.856-.135a1.911,1.911,0,0,1,1.45-1.9,2.025,2.025,0,0,1,2.17.847,1.994,1.994,0,0,1-.32,2.44C526.216,34.418,525.866,34.939,525.357,35.629Z" transform="translate(-500.17 -30.597)" /><path fill="red" d="M528.43,49.947h.918v1.211h-.918Z" transform="translate(-503.818 -44.388)" /><path fill="red" d="M467.068,55.527h.955v1.178l-.955.053Z" transform="translate(-460.085 -48.365)" /><path fill="red" d="M538.007,96.083h-.93V94.9l.93-.059Z" transform="translate(-509.98 -76.386)" /><path fill="red" d="M533.378,84.684h-2.106l.016-.3,2.106.1Z" transform="translate(-505.843 -68.934)" /></g></g></svg> </div><div>{cell}</div></div>);
        }

    }
    actionsFormatter2(cell, column, row, rowIndex, formatExtraData) {
        //  console.log("actionsFormatter2", cell);

        return (
            // <div className="text-link">
            //     <a
            //         style={{ fontWeight: "bold" }} className="text-dark">{cell.split(" ")[0]} &nbsp;&nbsp;&nbsp; <span className="text-primary">{cell.split(" ")[1]}  % </span></a>
            // </div>
            <div className="text-link d-flex align-items-center" style={{ cursor: "pointer" }}>
                <div style={{ fontWeight: "bold", width: 40 }} className="text-dark text-left">{cell.split(" ")[0]} </div>
                <div className="text-primary" style={{ width: 45 }}>{cell.split(" ")[1]}  % </div>
            </div>
        );
    }

    actionsFormatter2(cell, column, row, rowIndex, formatExtraData) {
        //  console.log("actionsFormatter2", cell);

        return (
            // <div className="text-link">
            //     <a
            //         style={{ fontWeight: "bold" }} className="text-dark">{cell.split(" ")[0]} &nbsp;&nbsp;&nbsp; <span className="text-primary">{cell.split(" ")[1]}  % </span></a>
            // </div>
            <div className="text-link d-flex align-items-center" style={{ cursor: "pointer" }}>
                <div style={{ fontWeight: "bold", width: 40 }} className="text-dark text-left">{cell.split(" ")[0]} </div>
                <div className="text-primary" style={{ width: 45 }}>{cell.split(" ")[1]}  % </div>
            </div>
        );
    }
    handleModalFunction = (e, column, columnIndex, row, rowIndex) => {

        console.log("handleModalFunction", column, row);
        let yearid = this.props.studentGlobals.previousSets.find((a) => a.qset === column.text.split(" - ")[0]);

        let qtheoryname = this.props.studentGlobals.questionTheory.find((a) => a.question_theory === column.text);

        let subid = "";
        if (row.subjectid == "0") {
            subid = this.props.stateData.psubject
        }
        else {
            subid = row.subjectid
        }
        if (row.type == "theory") {
            this.setState({
                modalShow: true,
                qtheory: qtheoryname.id,
                chapter: row.id,
                topic: "0",
                complexity: "0",
                qtype: "0",
                pyeartype: this.props.stateData.pyeartype.toString(),
                psubject: subid,
                setname: qtheoryname.question_theory,
                linkage: false,
                diffoftheory: true

            });
        }
        if (row.type == "questionTheroy") {
            this.setState({
                modalShow: true,
                qtheory: row.id,
                chapter: "0",
                topic: "0",
                complexity: "0",
                qtype: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: false

            });
        }
        else if (row.type == "complexity") {
            this.setState({
                modalShow: true,
                complexity: row.id,
                chapter: "0",
                topic: "0",
                qtype: "0",
                qtheory: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: false
            });
        }
        else if (row.type == "questionType") {
            this.setState({
                modalShow: true,
                qtype: row.id,
                chapter: "0",
                topic: "0",
                complexity: "0",
                qtheory: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: false
            });
        }
        else if (row.type == "chapter") {
            this.setState({
                modalShow: true,
                chapter: row.id,
                topic: "0",
                complexity: "0",
                qtype: "0",
                qtheory: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: false
            });
        }
        else if (row.type == "topic") {
            this.setState({
                modalShow: true,
                topic: row.id,
                chapter: "0",
                complexity: "0",
                qtype: "0",
                qtheory: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: false
            });
        }
        else if (row.type == "link") {
            this.setState({
                modalShow: true,
                topic: "0",
                chapter: row.id,
                complexity: "0",
                qtype: "0",
                qtheory: "0",
                pyeartype: yearid.id,
                psubject: subid,
                setname: yearid.qset,
                linkage: true
            });
        }

    }
    subjectQuestionTheoryColumns(data, type) {
        console.log("subjectQuestionTheoryColumns", data);
        let newArray = [];
        if (data.length > 0) {
            if (type == "questionTheroy") {

                const newObj = {
                    dataField: "question_theory",
                    text: "Question theory",
                    sort: true,
                    headerAlign: "left",
                    sortFunc: (a, b, order, dataField) => {


                        let aslice = a.split(' ');
                        let bslice = b.split(' ');

                        let finala = 0;
                        let finalb = 0;

                        if (aslice.length > 1)
                            finala = parseInt(aslice[0]);

                        if (bslice.length > 1)
                            finalb = parseInt(bslice[0]);

                        if (order === 'asc') {
                            return finalb - finala;
                        }

                        return finala - finalb; // desc
                    }



                    //footer: "Total"
                }
                newArray.push(newObj);
            }
            else if (type == "complexity") {
                const newObj = {
                    dataField: "complexity",
                    text: "Complexity",
                    sort: true,
                    headerAlign: "left",
                    sortFunc: (a, b, order, dataField) => {


                        let aslice = a.split(' ');
                        let bslice = b.split(' ');

                        let finala = 0;
                        let finalb = 0;

                        if (aslice.length > 1)
                            finala = parseInt(aslice[0]);

                        if (bslice.length > 1)
                            finalb = parseInt(bslice[0]);

                        if (order === 'asc') {
                            return finalb - finala;
                        }

                        return finala - finalb; // desc
                    }


                    //footer: "Total"
                }
                newArray.push(newObj);

            }
            else if (type == "questionType") {
                const newObj = {
                    dataField: "questiontype",
                    text: "Question Type",
                    sort: true,
                    headerAlign: "left",
                    sortFunc: (a, b, order, dataField) => {


                        let aslice = a.split(' ');
                        let bslice = b.split(' ');

                        let finala = 0;
                        let finalb = 0;

                        if (aslice.length > 1)
                            finala = parseInt(aslice[0]);

                        if (bslice.length > 1)
                            finalb = parseInt(bslice[0]);

                        if (order === 'asc') {
                            return finalb - finala;
                        }

                        return finala - finalb; // desc
                    }

                }
                newArray.push(newObj);
            }
            const qs = {
                dataField: "qsCount",
                text: "Questions",
                sort: true,
                headerAlign: "left",
                formatter: this.actionsFormatter3,
                sortFunc: (a, b, order, dataField) => {


                    let aslice = a.split(' ');
                    let bslice = b.split(' ');

                    let finala = 0;
                    let finalb = 0;

                    if (aslice.length > 1)
                        finala = parseInt(aslice[0]);

                    if (bslice.length > 1)
                        finalb = parseInt(bslice[0]);

                    if (order === 'asc') {
                        return finala - finalb;
                    }
                    return finalb - finala; // desc
                }



            }
            newArray.push(qs);


            data[0].year.map((item) => {
                if (item != undefined) {

                    let first_word = item.year.split("-")[0];
                    const newObj = {
                        dataField: item.year,
                        text: item.year,
                        sort: true,
                        headerAlign: "left",
                        formatter: this.actionsFormatter2,
                        events: {
                            onClick: this.handleModalFunction
                        },
                        sortFunc: (a, b, order, dataField) => {


                            let aslice = a.split(' ');
                            let bslice = b.split(' ');

                            let finala = 0;
                            let finalb = 0;

                            if (aslice.length > 1)
                                finala = parseInt(aslice[0]);

                            if (bslice.length > 1)
                                finalb = parseInt(bslice[0]);

                            if (order === 'asc') {
                                return finala - finalb;
                            }
                            return finalb - finala; // desc
                        }


                    }

                    newArray.push(newObj);
                }

            });

            console.log("newArray", newArray);

        }

        return newArray;

    }
    defaultSorted = [
        {
            dataField: "qsCount",
            order: "desc"
        }
    ];



    subjectQuestionTheoryData(data, type, subid) {
        let newArray = [];
        if (data.length > 0) {
            let qper = 0;
            data.map((map) => {
                qper = parseFloat(qper) + parseFloat(map.qsCount)
            });
            //console.log("fqper", qper);
            data.map((item) => {
                if (item != "") {
                    const ftotper = (parseInt(item.qsCount) / parseInt(qper) * 100);
                    let tperval = "";
                    if (isNaN(ftotper)) {
                        tperval = 0;
                    }
                    else {
                        tperval = ftotper.toFixed(1);
                    }
                    //console.log("fqper", qper);

                    let newObj = "";
                    if (type == "questionTheroy") {
                        newObj = {
                            id: item.id,
                            question_theory: item.question_theory,
                            qsCount: parseInt(item.qsCount) + " " + tperval,
                            type: "questionTheroy",
                            subjectid: subid,
                            sortdata: parseInt(item.qsCount)
                        }
                    }
                    else if (type == "complexity") {
                        newObj = {
                            id: item.id,
                            complexity: item.complexity,
                            qsCount: parseInt(item.qsCount) + " " + tperval,
                            type: "complexity",
                            subjectid: subid,
                            sortdata: parseInt(item.qsCount)

                        }
                    }
                    else if (type == "questionType") {
                        newObj = {
                            id: item.id,
                            questiontype: item.questiontype,
                            qsCount: parseInt(item.qsCount) + " " + tperval,
                            type: "questionType",
                            subjectid: subid,
                            sortdata: parseInt(item.qsCount)
                        }
                    }



                    item.year.map((item2) => {

                        //for total percentage
                        let mtotarry = [];

                        data.map((dmap) => {
                            let totarry = [];
                            //qsCount
                            //totarry.push(parseInt(dmap.qsCount));
                            dmap.year.map((a) => {
                                if (item2.year == a.year) {
                                    totarry.push(parseInt(a.count));
                                }


                            });
                            mtotarry.push(...totarry);
                        });

                        console.log("mtotarry", mtotarry);

                        var sum = mtotarry.reduce(function (a, b) {
                            return a + b;
                        }, 0);
                        console.log("mtotarrysumddd", item2.year);
                        //end total percentage

                        const field2 = item2.year;

                        const field2p = (parseInt(item2.count) / parseInt(sum) * 100);
                        let val = "";
                        if (isNaN(field2p)) {
                            val = 0;
                        }
                        else {
                            val = Math.round(field2p);
                        }
                        const newObj1 = {
                            ...newObj,
                            [`${field2}`]: (item2.count) + " " + val,

                        }
                        newObj = newObj1;
                    });
                    newArray.push(newObj);

                }

            });
        }
        console.log("subjectQuestionTheoryData", newArray);
        return newArray;

    }
    questionTheoryClassFun = (item) => {
        if (item == "Concept") {
            return ("single-complexity theory-type flex-row overflow-hidden");
        }
        else if (item == "Application") {
            return ("single-complexity application-type flex-row overflow-hidden");

        }

    }
    complexityClassFun = (item) => {
        if (item == "Easy") {
            return ("single-complexity easy");

        }
        else if (item == "Moderate") {
            return ("single-complexity moderate");

        }
        else if (item == "Difficult") {
            return ("single-complexity difficulty");

        }
        else if (item == "Highly Difficult") {
            return ("single-complexity vdifficulty");

        }
    }
    chapterwiseClassname = (item) => {
        if (item == "Botany") {
            return ("botany bg-light");

        }
        else if (item == "Physics") {
            return ("physics bg-light");

        }
        else if (item == "Chemistry") {
            return ("chemistry bg-light");

        }
        else if (item == "Zoology") {
            return ("zoology bg-light");

        }
        else if (item == "Mathematics") {
            return ("botany bg-light");

        }
    }

    subjectClassFun = (item) => {
        if (item == "Botany") {
            return ("single-subject botany");

        }
        else if (item == "Physics") {
            return ("single-subject physics");

        }
        else if (item == "Chemistry") {
            return ("single-subject chemistry");

        }
        else if (item == "Zoology") {
            return ("single-subject zoology");

        }
        else if (item == "Mathematics") {
            return ("single-subject botany");

        }
    }

    imageFunction(item) {
        console.log("imageFunction", item);
        if (item == "Botany") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="13.273" height="26.195" viewBox="0 0 13.273 36.195"> <path fill="#00b186" d="M20.168,128.355v1.8c-.495,0-.969-.007-1.441,0-.451.009-1.04-.091-1.033.588.007.632.568.533,1,.537.458,0,.916,0,1.441,0v2c-.831,0-1.673.006-2.514,0-.435,0-.913,0-.894.575s.506.555.932.553c.818,0,1.638,0,2.5,0v1.971c-.588,0-1.162,0-1.736,0-.416,0-.8.14-.707.593.044.221.436.484.7.524a12.179,12.179,0,0,0,1.725.025v1.967c-.86,0-1.7,0-2.543,0-.445,0-.9.053-.872.615.023.518.474.524.881.521.843-.006,1.687,0,2.52,0a5.046,5.046,0,0,1-5.292,5.138,5.1,5.1,0,0,1-4.9-5.081c-.026-3.86,0-7.722-.022-11.583,0-.5.193-.732.645-.733C13.732,128.351,16.909,128.355,20.168,128.355Z" transform="translate(-8.46 -109.571)" /> <path fill="#00b186" d="M6.067,14.1V11.26c-.386-.069-.762-.124-1.134-.2a6.2,6.2,0,0,1-4.9-6.227c.015-.578.269-.774.806-.762a6.544,6.544,0,0,1,4.8,2.1c.11.116.215.236.36.4a19.8,19.8,0,0,1,.32-2A6.187,6.187,0,0,1,12.227,0c.89,0,1,.114.973,1.021A6.12,6.12,0,0,1,7.869,7.01c-.215.031-.427.073-.669.116v6.865c.259.015.514.04.767.041,1.166.009,2.334-.032,3.5.026a1.864,1.864,0,0,1,1.809,1.913A1.841,1.841,0,0,1,11.4,17.8q-4.772.04-9.547,0A1.805,1.805,0,0,1,0,15.953,1.841,1.841,0,0,1,1.926,14.1C3.281,14.086,4.636,14.1,6.067,14.1Z" transform="translate(0 0.001)" /> </svg>
            );

        }
        else if (item == "Zoology") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="26.427" height="22.969" viewBox="0 0 36.427 32.969"><path fill="#8f4e02" d="M50.772,106.083h4.68c.094,0,.189,0,.282,0,.579.015.954.338.955.818,0,.5-.384.823-.993.811q-3.21-.063-6.42-.131-4.239-.09-8.478-.185a4.834,4.834,0,0,1-.685-.044.8.8,0,0,1-.414-1.372q1.066-1.239,2.167-2.45c.751-.826,1.549-1.611,2.274-2.459a7.431,7.431,0,0,0,1.935-4.1,23.883,23.883,0,0,0-.057-2.451,3.075,3.075,0,0,1,.125-1.054c.781-2.146,1.594-4.281,2.395-6.42.019-.049.026-.1.066-.27-.146.168-.229.256-.3.35q-1.054,1.355-2.1,2.711c-.343.441-.68.563-1.072.4s-.535-.494-.483-1.04c.166-1.741.371-3.48.466-5.225a5.175,5.175,0,0,0-2-4.385q-1.543-1.3-3.1-2.592a2.21,2.21,0,0,0-3.076-.008c-1.078.893-2.163,1.778-3.219,2.7a5.371,5.371,0,0,0-1.869,4.875c.16,1.552.3,3.106.444,4.66.052.579-.107.876-.5,1.03s-.727.015-1.093-.456c-.758-.977-1.515-1.955-2.331-2.906a2.709,2.709,0,0,0,.074.27c.805,2.152,1.623,4.3,2.406,6.46a2.049,2.049,0,0,1,.058,1.017c-.508,2.819.571,5.07,2.44,7.069,1.3,1.4,2.577,2.821,3.864,4.234a.833.833,0,0,1-.662,1.442q-5.451.114-10.9.234-2.2.047-4.4.1c-.571.012-.913-.23-.978-.686a.812.812,0,0,1,.887-.943q2.382-.051,4.764-.1a.411.411,0,0,0,.286-.083c-.728-.163-1.454-.328-2.182-.489-.617-.137-1.235-.267-1.852-.4a.832.832,0,0,1-.749-1c.1-.471.527-.709,1.11-.584,1.525.325,3.046.663,4.569.995l2.219.481c-.115-.155-.165-.237-.23-.307q-2.7-2.92-5.407-5.835a3.2,3.2,0,0,1-.55-3.868c.157-.312.316-.623.474-.936A3.575,3.575,0,0,1,28.264,92.2l.354.143c-.069-.21-.115-.371-.174-.528C27.357,88.905,26.263,86,25.185,83.09a.528.528,0,0,0-.574-.421c-.753.007-1.508-.019-2.261-.033-.588-.011-.936-.321-.932-.827s.354-.795.955-.8h1.173c-.237-.249-.415-.439-.6-.626-.206-.212-.426-.413-.623-.633a.8.8,0,0,1,.007-1.186.811.811,0,0,1,1.158.06c.4.394.771.811,1.156,1.218l.139-.072c0-.384-.006-.768,0-1.152.011-.593.322-.956.809-.954s.809.379.812.956c0,.889,0,1.777.01,2.665a.862.862,0,0,0,.135.482c1.219,1.592,2.451,3.174,3.681,4.758a2.173,2.173,0,0,0,.176.159c-.053-.605-.082-1.127-.146-1.645a7.006,7.006,0,0,1,2.146-6.353c1.191-1.107,2.46-2.136,3.743-3.137a3.769,3.769,0,0,1,4.714.049c1.22.974,2.436,1.958,3.587,3.011a6.847,6.847,0,0,1,2.255,6.034c-.066.654-.117,1.31-.176,1.965l.116.1a1.547,1.547,0,0,1,.136-.274c1.177-1.522,2.362-3.039,3.53-4.568a1.061,1.061,0,0,0,.2-.584c.023-.834.011-1.669.013-2.5a2.707,2.707,0,0,1,.015-.363.811.811,0,0,1,1.619.043c.023.436,0,.875,0,1.313l.138.079c.389-.419.768-.849,1.172-1.254a.813.813,0,0,1,1-.129.74.74,0,0,1,.359.866,1.211,1.211,0,0,1-.308.5c-.357.375-.737.729-1.2,1.176.509,0,.879,0,1.248,0,.592,0,.95.31.949.808s-.367.8-.951.815c-.781.015-1.562.017-2.341.057a.546.546,0,0,0-.408.263c-1.157,3.039-2.294,6.085-3.435,9.131a.979.979,0,0,0-.037.142,13.282,13.282,0,0,1,1.753-.282,3.323,3.323,0,0,1,3.105,1.815c.211.359.385.739.572,1.111a3.174,3.174,0,0,1-.524,3.87c-1.7,1.843-3.4,3.674-5.1,5.511a2.423,2.423,0,0,0-.458.63c.8-.171,1.594-.339,2.39-.513q2.107-.46,4.214-.923c.63-.138,1.061.051,1.189.516a.812.812,0,0,1-.678,1.044c-1.233.275-2.468.54-3.7.81-.115.025-.227.061-.342.092C50.772,105.965,50.772,106.023,50.772,106.083Zm-8.655-.4.041.152c.666,0,1.334.015,2-.011a.822.822,0,0,0,.51-.22c.565-.576,1.1-1.178,1.653-1.771q2.854-3.081,5.707-6.162a1.529,1.529,0,0,0,.3-2.081c-.168-.337-.337-.673-.515-1.005a1.866,1.866,0,0,0-2.5-.877c-.456.2-.888.448-1.341.651a.418.418,0,0,0-.282.526,7.535,7.535,0,0,1-.092,2.846,11.691,11.691,0,0,1-3.331,5.612C43.517,104.1,42.83,104.9,42.117,105.687Zm-7.344.15.053-.151c-.724-.792-1.422-1.611-2.179-2.37a11.729,11.729,0,0,1-3.264-5.425,7.69,7.69,0,0,1-.157-2.8c.027-.23.17-.511-.165-.672-.521-.248-1.026-.536-1.559-.757a1.864,1.864,0,0,0-2.3.805c-.232.409-.436.834-.647,1.254a1.515,1.515,0,0,0,.263,1.856q3.746,4.04,7.494,8.079a.492.492,0,0,0,.293.175C33.328,105.843,34.051,105.836,34.773,105.836Z" transform="translate(-20.263 -74.748)" /><path fill="#8f4e02" d="M256.745,131.2a10.473,10.473,0,0,1,.33-1.524,4.414,4.414,0,0,0-.867-4.483c-.049-.064-.113-.117-.161-.18-.158-.206-.2-.43.016-.609a.379.379,0,0,1,.6.1,14.659,14.659,0,0,1,1.157,1.923,4.284,4.284,0,0,1,.06,3.341,4.266,4.266,0,0,0-.142,2.5c.241,1.088.443,2.185.657,3.279.054.278.074.567-.29.64-.334.067-.438-.164-.493-.445-.252-1.292-.514-2.582-.762-3.874a5.139,5.139,0,0,1-.044-.643Z" transform="translate(-236.844 -120.286)" /><path fill="#8f4e02" d="M202.56,135.935c.177-.915.333-1.72.491-2.523.091-.461.179-.923.279-1.382a3.681,3.681,0,0,0-.162-2.1,5.168,5.168,0,0,1,1.047-5.233c.041-.053.087-.1.133-.151a.4.4,0,0,1,.6-.081c.222.184.167.395.009.6a9.572,9.572,0,0,0-.656.916,4.092,4.092,0,0,0-.374,3.708,4.242,4.242,0,0,1,.2,2.382q-.369,1.878-.736,3.757c-.049.247-.172.463-.452.4C202.79,136.193,202.665,136.019,202.56,135.935Z" transform="translate(-187.806 -120.342)" /><path fill="#8f4e02" d="M206.565,334.208c-.09.094-.2.312-.332.321a.559.559,0,0,1-.454-.261,7.811,7.811,0,0,1-.3-1.125c-.369-1.541-.732-3.084-1.1-4.624-.066-.275-.085-.531.238-.627s.464.113.531.4q.685,2.86,1.373,5.719C206.522,334.046,206.533,334.085,206.565,334.208Z" transform="translate(-189.434 -307.384)" /><path fill="#8f4e02" d="M268.829,328.564c-.106.437-.192.789-.277,1.141q-.569,2.37-1.137,4.739c-.063.265-.168.528-.494.465s-.374-.322-.3-.629c.374-1.526.738-3.054,1.106-4.582a9.244,9.244,0,0,1,.3-1.168.57.57,0,0,1,.448-.272C268.607,328.262,268.729,328.47,268.829,328.564Z" transform="translate(-246.655 -307.743)" /><path fill="#8f4e02" d="M293.634,163.368c-.132.589-.272,1.256-.435,1.916-.066.268-.23.482-.553.371s-.3-.367-.21-.631a5.011,5.011,0,0,0,.225-2.81c-.031-.137.151-.321.234-.483.17.091.447.15.489.282A10.476,10.476,0,0,1,293.634,163.368Z" transform="translate(-270.354 -154.69)" /><path fill="#8f4e02" d="M181.79,163.113c.086-.517.135-.889.212-1.254.053-.248.21-.422.487-.364s.347.278.287.529a4.777,4.777,0,0,0,.2,2.726,1.129,1.129,0,0,1,.043.155c.046.231.023.439-.236.524a.381.381,0,0,1-.524-.3C182.082,164.421,181.928,163.7,181.79,163.113Z" transform="translate(-168.717 -154.464)" /></svg>
            );

        }
        else if (item == "Physics") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="26.996" height="27.02" viewBox="0 0 26.996 27.02"><path fill="#ea9909" d="M23.09,6.474c.084-.345.162-.684.249-1.02a11.758,11.758,0,0,1,1.578-3.876A5.19,5.19,0,0,1,26.057.4a1.952,1.952,0,0,1,2.41.017,12.048,12.048,0,0,1,.97.864,2.28,2.28,0,0,1,2.2-.054,2.378,2.378,0,0,1,1.182,1.31,2.448,2.448,0,0,1-1.592,3.195l.175.751c.15-.04.282-.073.412-.11a13.7,13.7,0,0,1,4.348-.677A5.907,5.907,0,0,1,37.9,6.02a2.15,2.15,0,0,1,1.366,2.721,7.4,7.4,0,0,1-1.821,3.042c-.536.6-1.117,1.152-1.706,1.754.181.168.38.346.572.531a12.013,12.013,0,0,1,2.645,3.367,3.2,3.2,0,0,1,.388,1.739,2.3,2.3,0,0,1-1.868,1.985c-.039.009-.078.015-.128.024-.028.187-.046.374-.085.559a2.367,2.367,0,0,1-4.688-.511c.008-.318-.085-.442-.38-.492-.253-.042-.5-.127-.769-.2-.15.585-.278,1.149-.441,1.7a10.159,10.159,0,0,1-1.7,3.625,2.539,2.539,0,0,1-2.144,1.139,2.625,2.625,0,0,1-1.912-1.122,8.569,8.569,0,0,1-1.462-2.88c-.231-.724-.406-1.466-.607-2.2-.021-.076-.04-.152-.068-.262l-2.044.522a1.493,1.493,0,0,1-.4,1.133,1.465,1.465,0,0,1-2.491-.605c-.058-.215-.154-.277-.375-.324a6.629,6.629,0,0,1-1.539-.461,2.089,2.089,0,0,1-1-2.525,7.371,7.371,0,0,1,1.82-3.043c.536-.6,1.117-1.152,1.708-1.755-.187-.173-.393-.357-.592-.55a11.842,11.842,0,0,1-2.636-3.374,3.171,3.171,0,0,1-.366-1.8,2.076,2.076,0,0,1,1.317-1.7,5.508,5.508,0,0,1,2.657-.35,17.412,17.412,0,0,1,3.768.736A1.391,1.391,0,0,0,23.09,6.474Zm7.959,7.038h0c0-.682.008-1.365-.008-2.047a.418.418,0,0,0-.187-.3q-1.689-.951-3.4-1.871a.5.5,0,0,0-.411,0q-1.708.918-3.4,1.873a.444.444,0,0,0-.188.323q-.019,2.017,0,4.034a.411.411,0,0,0,.165.307q1.716.966,3.449,1.9a.437.437,0,0,0,.354,0q1.733-.935,3.449-1.9a.384.384,0,0,0,.165-.278C31.056,14.878,31.05,14.2,31.05,13.513Zm-7.021,6.76c.147.573.278,1.169.455,1.751a9.354,9.354,0,0,0,1.577,3.317c.025.031.051.062.077.092a1.309,1.309,0,0,0,2.221-.014,8.677,8.677,0,0,0,1-1.631,14.66,14.66,0,0,0,1.095-3.525c-1.056-.443-2.087-.877-3.121-1.3a.293.293,0,0,0-.2.019C26.121,19.4,25.106,19.823,24.028,20.273Zm-4.5-7.415c.806-.586,1.559-1.174,2.356-1.694a1.3,1.3,0,0,0,.723-1.144c.029-.847.182-1.69.286-2.568-.347-.1-.7-.2-1.057-.29a11.269,11.269,0,0,0-3.8-.452,4.418,4.418,0,0,0-1.268.325.944.944,0,0,0-.607,1.041,3.385,3.385,0,0,0,.243.981A12.155,12.155,0,0,0,19.527,12.858Zm15.458-.019a13.841,13.841,0,0,0,2.742-3.08,5.614,5.614,0,0,0,.58-1.311,1.147,1.147,0,0,0-.791-1.529,2.862,2.862,0,0,0-1.022-.209,22.666,22.666,0,0,0-2.632.194c-.766.112-1.513.348-2.24.522.117,1.086.224,2.111.342,3.135a.388.388,0,0,0,.147.239C33.056,11.478,34.007,12.147,34.985,12.839ZM19.463,14.15c-.69.748-1.419,1.493-2.1,2.283A5.17,5.17,0,0,0,16.2,18.544a1.167,1.167,0,0,0,.823,1.564,6.3,6.3,0,0,0,1.145.217.381.381,0,0,0,.276-.117,1.449,1.449,0,0,1,2.051-.188.35.35,0,0,0,.231.093c.729-.165,1.455-.344,2.157-.513-.115-1.085-.22-2.11-.338-3.134a.39.39,0,0,0-.149-.239C21.447,15.549,20.5,14.88,19.463,14.15Zm11-7.372c-.059-.254-.133-.5-.172-.759A.331.331,0,0,0,30,5.709a2.4,2.4,0,0,1-1.543-3.352c.21-.444.215-.449-.128-.8a2.852,2.852,0,0,0-.439-.364.99.99,0,0,0-1.209-.025,3.743,3.743,0,0,0-.83.812A11.422,11.422,0,0,0,24.238,5.9c-.077.3-.134.6-.2.879a21.639,21.639,0,0,1,2.236.908,1.9,1.9,0,0,0,1.977-.005A22.5,22.5,0,0,1,30.461,6.778Zm1.151,12.794c.389.107.781.225,1.178.318a.308.308,0,0,0,.242-.105,2.35,2.35,0,0,1,4,.281.313.313,0,0,0,.251.127,1.241,1.241,0,0,0,1.062-1.313,3.151,3.151,0,0,0-.291-1.03,12.6,12.6,0,0,0-3.093-3.7l-.254.188c-.694.512-1.366,1.059-2.09,1.524a1.3,1.3,0,0,0-.717,1.149C31.864,17.861,31.715,18.7,31.612,19.572Zm3.337,3.1a1.47,1.47,0,0,0,1.4-1.473,1.454,1.454,0,0,0-1.42-1.421,1.471,1.471,0,0,0-1.405,1.473A1.456,1.456,0,0,0,34.949,22.673ZM32.012,3.39a1.413,1.413,0,1,0-2.825-.066,1.413,1.413,0,0,0,2.825.066Zm.065,11.69,2.14-1.575-2.14-1.566Zm-9.651.009V11.94l-2.137,1.58Zm1.416-7.336c-.1.792-.194,1.519-.294,2.3L26.1,8.647Zm7.113,9.216L28.4,18.38l2.258.885C30.762,18.474,30.855,17.751,30.955,16.969ZM28.4,8.646l2.551,1.4c-.1-.793-.2-1.523-.3-2.293ZM23.843,19.267l2.251-.894-2.547-1.4C23.648,17.755,23.743,18.483,23.843,19.267Zm-4.269,2.439a.536.536,0,0,0,.5-.539.51.51,0,0,0-1.019.02A.539.539,0,0,0,19.575,21.706Z" transform="translate(-14.235 0.009)" /><path fill="#ea9909" d="M81.749,20.166A1.928,1.928,0,1,1,83.665,18.2,1.914,1.914,0,0,1,81.749,20.166Zm0-.963a.965.965,0,1,0-.975-.947A.988.988,0,0,0,81.749,19.2Z" transform="translate(-74.99 -15.324)" /><path fill="#ea9909" d="M2.89,201.433a1.431,1.431,0,0,1-1.484,1.437,1.446,1.446,0,0,1,.078-2.891A1.429,1.429,0,0,1,2.89,201.433Zm-.964-.008a.508.508,0,0,0-.481-.482.481.481,0,1,0,0,.962A.5.5,0,0,0,1.926,201.426Z" transform="translate(0 -187.903)" /><path fill="#ea9909" d="M400.662,202.88a1.445,1.445,0,1,1,1.447-1.473A1.429,1.429,0,0,1,400.662,202.88Zm.484-1.43a.51.51,0,0,0-.467-.5.5.5,0,0,0-.5.466.51.51,0,0,0,.467.5A.5.5,0,0,0,401.146,201.449Z" transform="translate(-375.113 -187.913)" /><path fill="#ea9909" d="M180.469,186.448a2.41,2.41,0,1,1-2.383-2.429A2.393,2.393,0,0,1,180.469,186.448Zm-.963-.016a1.447,1.447,0,1,0-1.473,1.443A1.473,1.473,0,0,0,179.506,186.433Z" transform="translate(-165.043 -172.907)" /></svg>
            );

        }
        else if (item == "Chemistry") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="19.112" height="23.193" viewBox="0 0 19.112 23.193"><path fill="#2a90e0" d="M9.559,23.18c-2.259,0-4.518-.009-6.776,0A2.524,2.524,0,0,1,.294,21.932,2.478,2.478,0,0,1,.6,19.176q2.884-4.279,5.712-8.6a1.939,1.939,0,0,0,.3-.984q.036-3.757,0-7.514c0-.263-.231-.518-.324-.788S6.039.722,6.114.507A.873.873,0,0,1,6.743.019q2.817-.057,5.635,0a.856.856,0,0,1,.617.494c.074.219-.086.528-.177.787s-.321.517-.324.776q-.038,3.757,0,7.514a1.919,1.919,0,0,0,.3.984q2.87,4.37,5.789,8.707a2.419,2.419,0,0,1,.269,2.587,2.378,2.378,0,0,1-2.315,1.31Q13.047,23.183,9.559,23.18ZM7.409.876c-.034.521-.089,1-.09,1.484C7.31,4.8,7.331,7.236,7.3,9.671a2.316,2.316,0,0,1-.359,1.171q-2.882,4.4-5.822,8.762a1.805,1.805,0,0,0-.244,2,1.832,1.832,0,0,0,1.815.9q6.875-.008,13.751,0a1.8,1.8,0,0,0,1.807-.909,1.856,1.856,0,0,0-.259-2.006q-2.937-4.364-5.824-8.761a2.155,2.155,0,0,1-.329-1.108c-.027-2.939-.016-5.88-.016-8.87l.448-.085c0-.024-.007-.049-.011-.073H6.833c0,.024-.007.049-.009.073Z" transform="translate(0 0.009)" /><path fill="#2a90e0" d="M19.658,113.337a1.235,1.235,0,0,1,.953-1.352,1.491,1.491,0,0,1,1.795.671l1.463-.75c.992,1.5,2,2.928,2.893,4.416a1.5,1.5,0,0,1-1.312,2.259q-6.677.03-13.353,0a1.509,1.509,0,0,1-1.281-2.284c1-1.612,2.083-3.17,3.168-4.8A26.011,26.011,0,0,0,16.4,112.5c1.074.333,2.183.548,3.277.815a1.218,1.218,0,0,0,.791,1.387,1.444,1.444,0,0,0,1.982-1.762C21.477,113.08,20.567,113.209,19.658,113.337Zm-2.523,2.982a.963.963,0,0,0,.961-.982.985.985,0,0,0-.966-.988.985.985,0,1,0,.005,1.97Z" transform="translate(-9.166 -96.445)" /><path fill="#2a90e0" d="M61.41,78.905c.308,1.075.008,1.812-.808,2.052a1.363,1.363,0,0,1-1.726-.967c-.228-.81.278-1.469,1.383-1.78-.022-.538.166-1.03.746-1.067a1.2,1.2,0,0,1,.918.475C62.271,78.185,61.9,78.615,61.41,78.905Z" transform="translate(-50.885 -66.732)" /><path fill="#2a90e0" d="M67.549,45.4c-.263.174-.555.514-.784.478a.928.928,0,0,1-.625-.664c0-.225.4-.6.649-.629.232-.027.509.318.765.5C67.553,45.186,67.55,45.292,67.549,45.4Z" transform="translate(-57.216 -38.563)" /><path fill="#2a90e0" d="M67.98,27.36c.237.3.507.5.476.625-.049.194-.306.337-.474.5-.15-.158-.4-.3-.42-.476S67.772,27.664,67.98,27.36Z" transform="translate(-58.446 -23.667)" /></svg>
            );

        }
        else if (item == "Mathematics") {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.112" height="23.193"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#333"
                        d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z"
                    />
                    <path
                        fill="#333"
                        d="m12 24c-.414 0-.75-.336-.75-.75v-22.5c0-.414.336-.75.75-.75s.75.336.75.75v22.5c0 .414-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m23.25 12.75h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m6 9c-.414 0-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75s.75.336.75.75v3.5c0 .414-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m7.75 7.25h-3.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m4.75 20c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.061l2.5-2.5c.293-.293.768-.293 1.061 0s.293.768 0 1.061l-2.5 2.5c-.147.147-.339.22-.531.22z"
                    />
                    <path
                        fill="#333"
                        d="m7.25 20c-.192 0-.384-.073-.53-.22l-2.5-2.5c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l2.5 2.5c.293.293.293.768 0 1.061-.147.147-.339.22-.531.22z"
                    />
                    <path
                        fill="#333"
                        d="m20.25 7h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m20.25 20h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    />
                    <path
                        fill="#333"
                        d="m20.25 17h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                    />
                </svg>
            );

        }

    }


    render() {
        console.log("Analysis", this.props.stateData);
        const getPreviousPaperAnalysis = this.props.getPreviousPaperAnalysis;
        const loading1 = getPreviousPaperAnalysis.loading;
        const error1 = getPreviousPaperAnalysis.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        console.log("previousSection",
            "examType:", this.props.stateData.pexamtype,
            "subjects:", this.props.stateData.psubject,
            "years:", this.props.stateData.pyeartype.toString(),
            "mobile:", Cookies.get("mobile"));
        console.log("getPreviousPaperAnalysis", getPreviousPaperAnalysis.getPreviousPaperAnalysis);

        if (loading1) {
            return (
                <div className="previous-paper-analysis">
                    <Container>
                        <Row className="my-4">
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Tab.Container id="previous-paper-analysis-tabs" defaultActiveKey={this.props.stateData.defaulteventKey}>
                                    <HeaderTabContent
                                        isTrialUser={this.props.isStudentUserValid}
                                        searchSubmit={this.props.searchSubmit}
                                        studentGlobals={this.props.studentGlobals}
                                        globalsubjects={this.props.globalsubjects} />
                                </Tab.Container>
                                <Tab.Content>
                                    <Card className="mt-4 chapter-wise">
                                        <Card as={Card.Body} className="justify-content-center flex-row">
                                            <div class="spinner-border text-primary text-center"></div>
                                        </Card>
                                    </Card>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Container>
                </div >)
        }
        else {
            if (getPreviousPaperAnalysis.getPreviousPaperAnalysis.isYearEmpty == true) {
                return (
                    <div className="previous-paper-analysis">
                        <Container>
                            <Row className="my-4">
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Tab.Container id="previous-paper-analysis-tabs" defaultActiveKey={this.props.stateData.defaulteventKey}>
                                        <HeaderTabContent
                                            isTrialUser={this.props.isStudentUserValid}
                                            searchSubmit={this.props.searchSubmit}
                                            studentGlobals={this.props.studentGlobals}
                                            globalsubjects={this.props.globalsubjects} />
                                    </Tab.Container>

                                </Col>
                            </Row>
                        </Container>
                    </div >)
            }
            else {
                return (
                    <div className="previous-paper-analysis">
                        <Container>
                            <Row className="my-4">
                                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <Tab.Container id="previous-paper-analysis-tabs" defaultActiveKey={this.props.stateData.defaulteventKey}>
                                        <HeaderTabContent
                                            isTrialUser={this.props.isStudentUserValid}
                                            searchSubmit={this.props.searchSubmit}
                                            studentGlobals={this.props.studentGlobals}
                                            globalsubjects={this.props.globalsubjects} />
                                        {/* <Card>
                                                Grouping Wise Weightage
                                            </Card> */}
                                        <Tab.Content>
                                            <Card className="mt-4">
                                                <Nav variant="pills" className="flex-row my-2">
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="first"
                                                        >Chapter Grouping</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            
                                                            eventKey="second"
                                                        >Chapter view</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="third"
                                                        
                                                        >Topic View</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="fourth"
                                                        
                                                        >Linkage View</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="fifth"
                                                        
                                                        >Question Theory View</Nav.Link>
                                                    </Nav.Item>

                                                </Nav>
                                            </Card>
                                            <Tab.Pane eventKey="first">
                                                <Accordion defaultActiveKey={this.state.topdefaultActiveKey}>
                                                    <ChapterWeightage
                                                        topdefaultActiveKey={this.state.topdefaultActiveKey}
                                                        topaccactiveFun={this.topaccactiveFun}
                                                        singlenormalactionsFormatter3={this.singlenormalactionsFormatter3}
                                                        singleactionsFormatter3={this.singleactionsFormatter3}
                                                        difficultactionsFormatter={this.difficultactionsFormatter}
                                                        actionsFormatter3={this.actionsFormatter3}
                                                        actionsFormatter2={this.actionsFormatter2}
                                                        handleModalFunction={this.handleModalFunction}
                                                        type="Grouping"
                                                        getPreviousPaperAnalysis={getPreviousPaperAnalysis.getPreviousPaperAnalysis} />
                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage.length > 0 ? (

                                                        <Card className="mt-4 complexity">
                                                            <Accordion.Header
                                                                as={Card.Header}
                                                                eventKey="1"
                                                                className="bg-white"
                                                                onClick={() => { this.topaccactiveFun("1") }}
                                                            >
                                                                <Card.Title className="h6 mb-0 px-2">
                                                                    {this.state.topdefaultActiveKey != "1" ? (
                                                                        <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    ) : (
                                                                            <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                        )}

                                                                      Complexity
                                                                </Card.Title>
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey="1">
                                                                <Card.Body>

                                                                    <Row>
                                                                        <Col><h6>Complexity Wise</h6></Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                            <CardLessDataTable
                                                                                articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity")}
                                                                                articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity", "0")}
                                                                                defaultSorted={this.defaultSorted}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-4 subject-wise">
                                                                        <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                            return (<Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card className={this.subjectClassFun(smap.subject)}>
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body
                                                                                        //style={{ height: 200 }}
                                                                                        //className="p-0 lock"
                                                                                        className="p-0"
                                                                                    >
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.complexity, "complexity")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.complexity, "complexity", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}
                                                                                        />
                                                                                        {/* <div className="lock-content d-block">
                                                                        <h5>Lock</h5>
                                                                    </div> */}
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>)
                                                                        })}
                                                                    </Row>
                                                                </Card.Body>
                                                            </Accordion.Body>
                                                        </Card>
                                                    ) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                        <Card className="mt-4 questiontype-wise">
                                                            <Accordion.Header as={Card.Header} eventKey="2" className="bg-white"
                                                                onClick={() => { this.topaccactiveFun("2") }}>
                                                                <Card.Title className="h6 mb-0 px-2">
                                                                    {this.state.topdefaultActiveKey != "2" ? (
                                                                        <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    ) : (
                                                                            <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                        )}

                                                                Question Type</Card.Title>
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey="2">
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12}>

                                                                            <Card>
                                                                                <Card.Header className="bg-white">
                                                                                    <h6 className="mb-0">Question Type Wise</h6>
                                                                                </Card.Header>
                                                                                <Card.Body style={{ height: 400, overflowY: 'Scroll' }}>
                                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType")}
                                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType", "0")}
                                                                                            defaultSorted={this.defaultSorted}
                                                                                        />
                                                                                    ) : ("")}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-4 subject-wise">
                                                                        <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                            return (
                                                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                                                    <Card
                                                                                        className={this.subjectClassFun(smap.subject)}
                                                                                    >
                                                                                        <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                            <Card.Title className="mb-0 h6 px-2">

                                                                                                <div className="d-flex">
                                                                                                    {this.imageFunction(smap.subject)}
                                                                                                    <span className="ml-2 title">{smap.subject}</span>
                                                                                                </div>
                                                                                            </Card.Title>
                                                                                        </Card.Header>
                                                                                        <Card.Body className="p-0" style={{ height: 200, overflowY: 'scroll' }}>
                                                                                            <CardLessDataTable
                                                                                                articlecolumns={this.subjectQuestionTheoryColumns(smap.questionType, "questionType")}
                                                                                                articledata={this.subjectQuestionTheoryData(smap.questionType, "questionType", smap.id)}
                                                                                                defaultSorted={this.defaultSorted}

                                                                                            />
                                                                                        </Card.Body>
                                                                                    </Card>
                                                                                </Col>
                                                                            );

                                                                        })}


                                                                    </Row>
                                                                </Card.Body>
                                                            </Accordion.Body>

                                                        </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                        <Card className="mt-4 question-theory">
                                                            <Accordion.Header as={Card.Header} eventKey="3" className="bg-white"
                                                                onClick={() => { this.topaccactiveFun("3") }}>
                                                                <Card.Title className="h6 mb-0 px-2">

                                                                    {this.state.topdefaultActiveKey != "3" ? (
                                                                        <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    ) : (
                                                                            <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                        )}
                                                                Question Theory</Card.Title>
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey="3">
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12}>
                                                                            <h6>Question Theory Wise</h6>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                            {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                                                <CardLessDataTable
                                                                                    articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy")}
                                                                                    articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy", "0")}
                                                                                    defaultSorted={this.defaultSorted}
                                                                                />
                                                                            ) : ("")}
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-4 subject-wise">
                                                                        <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                            return (
                                                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                                                    <Card
                                                                                        className={this.subjectClassFun(smap.subject)}
                                                                                    >
                                                                                        <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                            <Card.Title className="mb-0 h6 px-2">

                                                                                                <div className="d-flex">
                                                                                                    {this.imageFunction(smap.subject)}
                                                                                                    <span className="ml-2 title">{smap.subject}</span>
                                                                                                </div>
                                                                                                {/* <span className="ml-2 title">{smap.subject}</span> */}
                                                                                            </Card.Title>
                                                                                        </Card.Header>
                                                                                        <Card.Body className="p-0">
                                                                                            <CardLessDataTable
                                                                                                articlecolumns={this.subjectQuestionTheoryColumns(smap.questionTheroy, "questionTheroy")}
                                                                                                articledata={this.subjectQuestionTheoryData(smap.questionTheroy, "questionTheroy", smap.id)}
                                                                                                defaultSorted={this.defaultSorted}
                                                                                            />
                                                                                        </Card.Body>
                                                                                    </Card>
                                                                                </Col>
                                                                            );

                                                                        })}


                                                                    </Row>
                                                                </Card.Body>
                                                            </Accordion.Body>
                                                        </Card>
                                                    ) : ("")}
                                                </Accordion>

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Accordion defaultActiveKey={this.state.topdefaultActiveKey}>
                                                    <ChapterWeightage
                                                        topdefaultActiveKey={this.state.topdefaultActiveKey}
                                                        topaccactiveFun={this.topaccactiveFun}
                                                        singlenormalactionsFormatter3={this.singlenormalactionsFormatter3}
                                                        singleactionsFormatter3={this.singleactionsFormatter3}
                                                        difficultactionsFormatter={this.difficultactionsFormatter}
                                                        actionsFormatter3={this.actionsFormatter3}
                                                        actionsFormatter2={this.actionsFormatter2}
                                                        handleModalFunction={this.handleModalFunction}
                                                        type="Chapter"
                                                        pdefaulteventKey={this.props.stateData.defaulteventKey}
                                                        getPreviousPaperAnalysis={getPreviousPaperAnalysis.getPreviousPaperAnalysis} />

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage.length > 0 ? (<Card className="mt-4 complexity">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="1"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("1") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "1" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                Complexity</Card.Title>

                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="1">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col><h6>Complexity Wise</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        <CardLessDataTable
                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity")}
                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity", "0")}
                                                                            defaultSorted={this.defaultSorted}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (<Col xl={12} lg={12} md={12} sm={12}>
                                                                            <Card className={this.subjectClassFun(smap.subject)}>
                                                                                <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                    <Card.Title className="mb-0 h6 px-2">

                                                                                        <div className="d-flex">
                                                                                            {this.imageFunction(smap.subject)}
                                                                                            <span className="ml-2 title">{smap.subject}</span>
                                                                                        </div>
                                                                                    </Card.Title>
                                                                                </Card.Header>
                                                                                <Card.Body
                                                                                    //className="p-0 lock"
                                                                                    className="p-0"
                                                                                //style={{ height: 200 }}
                                                                                >
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(smap.complexity, "complexity")}
                                                                                        articledata={this.subjectQuestionTheoryData(smap.complexity, "complexity", smap.id)}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                    {/* <div className="lock-content d-block">
                                                                        <h5>Lock</h5>
                                                                    </div> */}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>)
                                                                    })}
                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}
                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                        <Card className="mt-4 questiontype-wise">
                                                            <Accordion.Header
                                                                as={Card.Header}
                                                                eventKey="2"
                                                                className="bg-white"
                                                                onClick={() => { this.topaccactiveFun("2") }}
                                                            >
                                                                <Card.Title className="h6 mb-0 px-2">
                                                                    {this.state.topdefaultActiveKey != "2" ? (
                                                                        <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    ) : (
                                                                            <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                        )}
                                                                        Question Type</Card.Title>
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey="2">
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12}>

                                                                            <Card>
                                                                                <Card.Header className="bg-white">
                                                                                    <h6 className="mb-0">Question Type Wise</h6>
                                                                                </Card.Header>
                                                                                <Card.Body className="p-0" style={{ height: 400, overflowY: 'Scroll' }}>
                                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType")}
                                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType", "0")}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    ) : ("")}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-4 subject-wise">
                                                                        <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                            return (
                                                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                                                    <Card
                                                                                        className={this.subjectClassFun(smap.subject)}
                                                                                    >
                                                                                        <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                            <Card.Title className="mb-0 h6 px-2">

                                                                                                <div className="d-flex">
                                                                                                    {this.imageFunction(smap.subject)}
                                                                                                    <span className="ml-2 title">{smap.subject}</span>
                                                                                                </div>
                                                                                            </Card.Title>
                                                                                        </Card.Header>
                                                                                        <Card.Body className="p-0" style={{ height: 200, overflowY: 'scroll' }}>
                                                                                            <CardLessDataTable
                                                                                                articlecolumns={this.subjectQuestionTheoryColumns(smap.questionType, "questionType")}
                                                                                                articledata={this.subjectQuestionTheoryData(smap.questionType, "questionType", smap.id)}
                                                                                                defaultSorted={this.defaultSorted}




                                                                                            />
                                                                                        </Card.Body>
                                                                                    </Card>
                                                                                </Col>
                                                                            );

                                                                        })}


                                                                    </Row>
                                                                </Card.Body>
                                                            </Accordion.Body>

                                                        </Card>
                                                    ) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (<Card className="mt-4 question-theory">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="3"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("3") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "3" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                Question Theory</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="3">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                                        <h6>Question Theory Wise</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                                            <CardLessDataTable
                                                                                articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy")}
                                                                                articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy", "0")}
                                                                                defaultSorted={this.defaultSorted}
                                                                            />
                                                                        ) : ("")}
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                            {/* <span className="ml-2 title">{smap.subject}</span> */}
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0">
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionTheroy, "questionTheroy")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionTheroy, "questionTheroy", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}


                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}
                                                </Accordion>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <Accordion defaultActiveKey={this.state.topdefaultActiveKey}>
                                                    <ChapterWeightage
                                                        topdefaultActiveKey={this.state.topdefaultActiveKey}
                                                        topaccactiveFun={this.topaccactiveFun}
                                                        singlenormalactionsFormatter3={this.singlenormalactionsFormatter3}
                                                        singleactionsFormatter3={this.singleactionsFormatter3}
                                                        difficultactionsFormatter={this.difficultactionsFormatter}
                                                        actionsFormatter3={this.actionsFormatter3}
                                                        actionsFormatter2={this.actionsFormatter2}
                                                        handleModalFunction={this.handleModalFunction}
                                                        type="Topic" getPreviousPaperAnalysis={getPreviousPaperAnalysis.getPreviousPaperAnalysis} />
                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage.length > 0 ? (<Card className="mt-4 complexity">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="1"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("1") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "1" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                Complexity</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="1">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col><h6>Complexity Wise</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        <CardLessDataTable
                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity")}
                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity", "0")}
                                                                            defaultSorted={this.defaultSorted}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (<Col xl={12} lg={12} md={12} sm={12}>
                                                                            <Card className={this.subjectClassFun(smap.subject)}>
                                                                                <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                    <Card.Title className="mb-0 h6 px-2">

                                                                                        <div className="d-flex">
                                                                                            {this.imageFunction(smap.subject)}
                                                                                            <span className="ml-2 title">{smap.subject}</span>
                                                                                        </div>
                                                                                    </Card.Title>
                                                                                </Card.Header>
                                                                                <Card.Body
                                                                                    //style={{ height: 200 }}
                                                                                    //className="p-0 lock"
                                                                                    className="p-0"
                                                                                >
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(smap.complexity, "complexity")}
                                                                                        articledata={this.subjectQuestionTheoryData(smap.complexity, "complexity", smap.id)}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                    {/* <div className="lock-content d-block">
                                                                        <h5>Lock</h5>
                                                                    </div> */}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>)
                                                                    })}
                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (<Card className="mt-4 questiontype-wise">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="2"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("2") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "2" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                Question Type</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="2">


                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>

                                                                        <Card>
                                                                            <Card.Header className="bg-white">
                                                                                <h6 className="mb-0">Question Type Wise</h6>
                                                                            </Card.Header>
                                                                            <Card.Body style={{ height: 400, overflowY: 'Scroll' }}>
                                                                                {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType")}
                                                                                        articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType", "0")}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                ) : ("")}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0" style={{ height: 200, overflowY: 'scroll' }}>
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionType, "questionType")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionType, "questionType", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>

                                                        </Accordion.Body>
                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                        <Card className="mt-4 question-theory">
                                                            <Accordion.Header
                                                                as={Card.Header}
                                                                eventKey="3"
                                                                className="bg-white"
                                                                onClick={() => { this.topaccactiveFun("3") }}
                                                            >
                                                                <Card.Title className="h6 mb-0 px-2">
                                                                    {this.state.topdefaultActiveKey != "3" ? (
                                                                        <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    ) : (
                                                                            <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                        )}Question Theory</Card.Title>
                                                            </Accordion.Header>
                                                            <Accordion.Body eventKey="3">
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12}>
                                                                            <h6>Question Theory Wise</h6>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                            {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                                                <CardLessDataTable
                                                                                    articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy")}
                                                                                    articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy", "0")}
                                                                                    defaultSorted={this.defaultSorted}
                                                                                />
                                                                            ) : ("")}
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-4 subject-wise">
                                                                        <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                            return (
                                                                                <Col xl={12} lg={12} md={12} sm={12}>
                                                                                    <Card
                                                                                        className={this.subjectClassFun(smap.subject)}
                                                                                    >
                                                                                        <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                            <Card.Title className="mb-0 h6 px-2">

                                                                                                <div className="d-flex">
                                                                                                    {this.imageFunction(smap.subject)}
                                                                                                    <span className="ml-2 title">{smap.subject}</span>
                                                                                                </div>
                                                                                                {/* <span className="ml-2 title">{smap.subject}</span> */}
                                                                                            </Card.Title>
                                                                                        </Card.Header>
                                                                                        <Card.Body className="p-0">
                                                                                            <CardLessDataTable
                                                                                                articlecolumns={this.subjectQuestionTheoryColumns(smap.questionTheroy, "questionTheroy")}
                                                                                                articledata={this.subjectQuestionTheoryData(smap.questionTheroy, "questionTheroy", smap.id)}
                                                                                                defaultSorted={this.defaultSorted}

                                                                                            />
                                                                                        </Card.Body>
                                                                                    </Card>
                                                                                </Col>
                                                                            );

                                                                        })}


                                                                    </Row>
                                                                </Card.Body>
                                                            </Accordion.Body>
                                                        </Card>
                                                    ) : ("")}
                                                </Accordion>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="fourth">
                                                <Accordion defaultActiveKey={this.state.topdefaultActiveKey}>
                                                    <ChapterWeightage
                                                        topdefaultActiveKey={this.state.topdefaultActiveKey}
                                                        topaccactiveFun={this.topaccactiveFun}
                                                        singlenormalactionsFormatter3={this.singlenormalactionsFormatter3}
                                                        singleactionsFormatter3={this.singleactionsFormatter3}
                                                        difficultactionsFormatter={this.difficultactionsFormatter}
                                                        actionsFormatter3={this.actionsFormatter3}
                                                        actionsFormatter2={this.actionsFormatter2}
                                                        handleModalFunction={this.handleModalFunction}
                                                        type="link"
                                                        getPreviousPaperAnalysis={getPreviousPaperAnalysis.getPreviousPaperAnalysis} />
                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage.length > 0 ? (<Card className="mt-4 complexity">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="1"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("1") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "1" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}Complexity</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="1">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col><h6>Complexity Wise</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        <CardLessDataTable
                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity")}
                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity", "0")}
                                                                            defaultSorted={this.defaultSorted}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (<Col xl={12} lg={12} md={12} sm={12}>
                                                                            <Card className={this.subjectClassFun(smap.subject)}>
                                                                                <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                    <Card.Title className="mb-0 h6 px-2">

                                                                                        <div className="d-flex">
                                                                                            {this.imageFunction(smap.subject)}
                                                                                            <span className="ml-2 title">{smap.subject}</span>
                                                                                        </div>
                                                                                    </Card.Title>
                                                                                </Card.Header>
                                                                                <Card.Body
                                                                                    //style={{ height: 200 }}
                                                                                    //className="p-0 lock"
                                                                                    className="p-0"
                                                                                >
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(smap.complexity, "complexity")}
                                                                                        articledata={this.subjectQuestionTheoryData(smap.complexity, "complexity", smap.id)}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                    {/* <div className="lock-content d-block">
                                                                        <h5>Lock</h5>
                                                                    </div> */}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>)
                                                                    })}
                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (<Card className="mt-4 questiontype-wise">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="2"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("2") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "2" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                        Question Type</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="2">

                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>

                                                                        <Card>
                                                                            <Card.Header className="bg-white">
                                                                                <h6 className="mb-0">Question Type Wise</h6>
                                                                            </Card.Header>
                                                                            <Card.Body style={{ height: 400, overflowY: 'Scroll' }}>
                                                                                {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType")}
                                                                                        articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType", "0")}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                ) : ("")}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0" style={{ height: 200, overflowY: 'scroll' }}>
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionType, "questionType")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionType, "questionType", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>


                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (<Card className="mt-4 question-theory">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="3"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("3") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "3" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                        Question Theory</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="3">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                                        <h6>Question Theory Wise</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                                            <CardLessDataTable
                                                                                articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy")}
                                                                                articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy", "0")}
                                                                                defaultSorted={this.defaultSorted}
                                                                            />
                                                                        ) : ("")}
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                            {/* <span className="ml-2 title">{smap.subject}</span> */}
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0">
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionTheroy, "questionTheroy")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionTheroy, "questionTheroy", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}
                                                </Accordion>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="fifth">
                                                <Accordion defaultActiveKey={this.state.topdefaultActiveKey}>
                                                    <ChapterWeightage
                                                        topdefaultActiveKey={this.state.topdefaultActiveKey}
                                                        topaccactiveFun={this.topaccactiveFun}
                                                        singlenormalactionsFormatter3={this.singlenormalactionsFormatter3}
                                                        singleactionsFormatter3={this.singleactionsFormatter3}
                                                        difficultactionsFormatter={this.difficultactionsFormatter}
                                                        actionsFormatter3={this.actionsFormatter3}
                                                        actionsFormatter2={this.actionsFormatter2}
                                                        handleModalFunction={this.handleModalFunction}
                                                        type="Theory"
                                                        getPreviousPaperAnalysis={getPreviousPaperAnalysis.getPreviousPaperAnalysis} />
                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage.length > 0 ? (<Card className="mt-4 complexity">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="1"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("1") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "1" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}
                                                                        Complexity</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="1">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col><h6>Complexity Wise</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        <CardLessDataTable
                                                                            articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity")}
                                                                            articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.complexityWeightage, "complexity", "0")}
                                                                            defaultSorted={this.defaultSorted}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (<Col xl={12} lg={12} md={12} sm={12}>
                                                                            <Card className={this.subjectClassFun(smap.subject)}>
                                                                                <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                    <Card.Title className="mb-0 h6 px-2">

                                                                                        <div className="d-flex">
                                                                                            {this.imageFunction(smap.subject)}
                                                                                            <span className="ml-2 title">{smap.subject}</span>
                                                                                        </div>
                                                                                    </Card.Title>
                                                                                </Card.Header>
                                                                                <Card.Body
                                                                                    //style={{ height: 200 }}
                                                                                    //className="p-0 lock"
                                                                                    className="p-0"
                                                                                >
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(smap.complexity, "complexity")}
                                                                                        articledata={this.subjectQuestionTheoryData(smap.complexity, "complexity", smap.id)}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                    {/* <div className="lock-content d-block">
                                                                        <h5>Lock</h5>
                                                                    </div> */}
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </Col>)
                                                                    })}
                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (<Card className="mt-4 questiontype-wise">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="2"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("2") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "2" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}Question Type</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="2">

                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>

                                                                        <Card>
                                                                            <Card.Header className="bg-white">
                                                                                <h6 className="mb-0">Question Type Wise</h6>
                                                                            </Card.Header>
                                                                            <Card.Body style={{ height: 400, overflowY: 'Scroll' }}>
                                                                                {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity.length > 0 ? (
                                                                                    <CardLessDataTable
                                                                                        articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType")}
                                                                                        articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTypeComplexity, "questionType", "0")}
                                                                                        defaultSorted={this.defaultSorted}
                                                                                    />
                                                                                ) : ("")}
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0" style={{ height: 200, overflowY: 'scroll' }}>
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionType, "questionType")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionType, "questionType", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>

                                                    </Card>) : ("")}

                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (<Card className="mt-4 question-theory">
                                                        <Accordion.Header
                                                            as={Card.Header}
                                                            eventKey="3"
                                                            className="bg-white"
                                                            onClick={() => { this.topaccactiveFun("3") }}
                                                        >
                                                            <Card.Title className="h6 mb-0 px-2">
                                                                {this.state.topdefaultActiveKey != "3" ? (
                                                                    <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                ) : (
                                                                        <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                                                                    )}Question Theory</Card.Title>
                                                        </Accordion.Header>
                                                        <Accordion.Body eventKey="3">
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12}>
                                                                        <h6>Question Theory Wise</h6>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12} lg={12} md={12} sm={12} className="previous_complexity_wise">
                                                                        {getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise.length > 0 ? (
                                                                            <CardLessDataTable
                                                                                articlecolumns={this.subjectQuestionTheoryColumns(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy")}
                                                                                articledata={this.subjectQuestionTheoryData(getPreviousPaperAnalysis.getPreviousPaperAnalysis.questionTheoryWise, "questionTheroy", "0")}
                                                                                defaultSorted={this.defaultSorted}
                                                                            />
                                                                        ) : ("")}
                                                                    </Col>
                                                                </Row>
                                                                <Row className="mt-4 subject-wise">
                                                                    <Col xl={12} lg={12} md={12} sm={12}><h6>Subject Wise</h6></Col>
                                                                    {getPreviousPaperAnalysis.getPreviousPaperAnalysis.subjects_weightage.map((smap) => {
                                                                        return (
                                                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                                                <Card
                                                                                    className={this.subjectClassFun(smap.subject)}
                                                                                >
                                                                                    <Card.Header className="bg-white mb-0 shadow-sm">
                                                                                        <Card.Title className="mb-0 h6 px-2">

                                                                                            <div className="d-flex">
                                                                                                {this.imageFunction(smap.subject)}
                                                                                                <span className="ml-2 title">{smap.subject}</span>
                                                                                            </div>
                                                                                            {/* <span className="ml-2 title">{smap.subject}</span> */}
                                                                                        </Card.Title>
                                                                                    </Card.Header>
                                                                                    <Card.Body className="p-0">
                                                                                        <CardLessDataTable
                                                                                            articlecolumns={this.subjectQuestionTheoryColumns(smap.questionTheroy, "questionTheroy")}
                                                                                            articledata={this.subjectQuestionTheoryData(smap.questionTheroy, "questionTheroy", smap.id)}
                                                                                            defaultSorted={this.defaultSorted}

                                                                                        />
                                                                                    </Card.Body>
                                                                                </Card>
                                                                            </Col>
                                                                        );

                                                                    })}


                                                                </Row>
                                                            </Card.Body>
                                                        </Accordion.Body>
                                                    </Card>) : ("")}
                                                </Accordion>
                                            </Tab.Pane>

                                        </Tab.Content>
                                    </Tab.Container>
                                </Col>
                            </Row>
                            <CustomModal
                                pexamtype={this.props.stateData.pexamtype}
                                stateData={this.state}
                                show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                        </Container>
                    </div >
                )
            }
        }

    }
}



export default withRouter(compose(
    graphql(FETCH_PREVIOUSDATA,
        {
            options: props => ({
                variables: {
                    examType: parseInt(props.stateData.pexamtype),
                    subjects: props.stateData.psubject,
                    //years:"2019",
                    years: props.stateData.pyeartype.toString(),
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getPreviousPaperAnalysis"
        })

)(PreviousPaperAnalysisSection));
