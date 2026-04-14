import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { components } from 'react-select'
import { Row, Col, Card, Table, Form } from 'react-bootstrap'
import SelectDropDown from '../../../../neetjee_guru/components/selectdropdown/SelectDropDown'

import { Link } from 'react-router-dom';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import "./_customprevious.scss";

const STUDENR_PREVIOUS_EXAM = gql`
  mutation(
    $params:StudentPreviousPaperExam  
    ) {
        studentPreviousPaperExam(
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

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};


// filter
const filter = [
    { value: 1, label: 'Main' },
    { value: 2, label: 'Advance' }
];

export class CustomPreviousPaperSection extends Component {
    constructor(props) {
        super(props)
        const pyears1 = [...new Set(props.getData.globals.previousSets.map(item => {
            return { ...item, checked: false, active: "p-2 mb-3 flex-row justify-content-between align-items-center" }
        }))];
        const key = 'year';
        let pyears = [...new Map(pyears1.map(item =>
            [item[key], item])).values()];
        console.log("pyears",pyears);

        pyears= pyears.sort((a, b) => {
            let nameA = a.year
            let nameB = b.year
            console.log("sort",nameA,nameB);
            if (nameB < nameA) {
               return -1;
            }
            if (nameB > nameA) {
               return 1;
            } // names must be equal
            return 0;
         })

       

        const tqstions = props.getData.globals.questionTypes.map(item => {
            return { ...item, percentage: "", inerror: "" }
        });

        const comple = props.getData.globals.complexity.map(item => {
            return { ...item, percentage: "", inerror: "" }
        });

        const qtheory = props.getData.globals.questionTheory.map(item => {
            return { ...item, percentage: "", inerror: "" }
        });
        this.state = {
            previousYears: pyears,
            typeofQuestions: tqstions,
            complexity: comple,
            questionTheory: qtheory,
            examtype: 0,
            error1: "",
            error2: "",
            error3: "",
            submitError: "",
            class: "0",
            loadbutton: 0
            //value: { label: "ALL", value: 0 }
        }
    }

    handleFormSubmit = e => {
        console.log("handleFormSubmit", this.props.getData.globals.classes);
        e.preventDefault();
        this.setState({ loadbutton: 1 });
        let selected_classes = [];
        if (this.state.class == "0") {
            let classArray = this.props.getData.globals.classes;

            for (let c = 0; c <= classArray.length; c++) {
                let cdata = classArray[c];
                if (cdata != undefined) {
                    const newData = cdata.id.toString();
                    selected_classes.push(newData);
                }
            }
        }
        else {
            selected_classes.push(this.state.class);
        }


        let selected_years = [];
        let question_types = [];
        let complexity = [];
        let question_theory = [];
        let sub_type = "custom";
        let exam_type = this.state.examtype;
        let array = this.state.previousYears;
        for (let y = 0; y <= array.length; y++) {
            let ydata = array[y];
            if (ydata != undefined) {
                if (ydata.checked == true) {
                    const newData = ydata.year;
                    selected_years.push(newData);
                }
            }

        }

        let array1 = this.state.typeofQuestions;
        for (let t = 0; t <= array1.length; t++) {
            let tdata = array1[t];
            if (tdata != undefined) {

                const newData = {
                    question_type_id: parseInt(tdata.id),
                    percentage: parseInt(tdata.percentage)
                };
                question_types.push(newData);

            }

        }

        let array2 = this.state.complexity;
        for (let c = 0; c <= array2.length; c++) {
            let cdata = array2[c];
            if (cdata != undefined) {

                const newData = {
                    complexity_id: parseInt(cdata.id),
                    percentage: parseInt(cdata.percentage)
                };
                complexity.push(newData);

            }

        }

        let array3 = this.state.questionTheory;
        let findapplication = array3.find((a) => a.id == 1);
        let findconcept = array3.find((a) => a.id == 2);
        const newData1 = {
            application: parseInt(findapplication.percentage),
            concept: parseInt(findconcept.percentage)
        };
        question_theory.push(newData1);
        const params = {
            mobile: Cookies.get("mobile"),
            sub_type: sub_type,
            exam_type: exam_type,
            source: 0,
            set_id: 0,
            selected_years: selected_years,
            selected_classes: selected_classes,
            question_types: question_types,
            complexity: complexity,
            question_theory: question_theory,

        };
        console.log("params", params);
        this.customfunction(
            params
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message),loadbutton: 0
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

    };
    customfunction = async (
        params) => {
        await this.props.customfunction({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("updatedata", data);
                if (data.studentPreviousPaperExam) {
                    console.log("updatedatadataID", data.studentPreviousPaperExam)
                    this.setState({loadbutton: 0,submitError:""});
                    localStorage.setItem("sessionid", data.studentPreviousPaperExam);
                    localStorage.setItem("type", "Previous Paper Exam");
                    localStorage.setItem("stype", "");
                    localStorage.setItem("exam_paper_id", "0");
                    localStorage.setItem("etype", "previous");

                    window.open("/student/subject/exam", "_blank")
                }
            }
        });
    };
    handleSelectInputChange = (name, value) => {
        this.setState({
            examtype: value
        });
    }
    yearFunction = (year) => {
        console.log("yearFunction", year);
        let arr = this.state.previousYears.map(item => {
            if (item.year == year) {
                if (item.checked == false) {
                    return { ...item, checked: true, active: "active p-2 mb-3 flex-row justify-content-between align-items-center" }
                } else {
                    return { ...item, checked: false, active: "p-2 mb-3 flex-row justify-content-between align-items-center" }
                }
            }
            return item;
        }

        )
        this.setState({ previousYears: arr });
    }
    totalpercentage = (arr, tqid, type) => {
        console.log("totalpercentage", type);
        let array = [];
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            let idata = arr[i];
            if (idata.percentage != "") {
                const per = idata.percentage;
                array.push(parseInt(per));
            }
        }
        for (let num of array) {
            count = count + num
        }
        if (count > 100) {
            let findData = arr.find((a) => a.id == tqid);
            let indexid = arr.indexOf(findData);
            arr[indexid].percentage = "";
            if (type == "toq") {
                this.setState({ error1: "Total Percentage should be 100%" });
            }
            else if (type == "com") {
                this.setState({ error2: "Total Percentage should be 100%" });

            } else if (type == "qte") {
                this.setState({ error3: "Total Percentage should be 100%" });

            }

        }
        else {
            if (type == "toq") {
                this.setState({ error1: "" });
            }
            else if (type == "com") {
                this.setState({ error2: "" });

            } else if (type == "qte") {
                this.setState({ error3: "" });

            }


        }

    }
    typeOfQuestion = (e, tqid) => {
        let arr = this.state.typeofQuestions.map(item => {

            if (item.id == tqid) {
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value)) {
                    if (e.target.value <= 100) {
                        return { ...item, percentage: e.target.value, inerror: "" }
                    }
                    else {
                        return { ...item, percentage: "", inerror: "Total Percentage should be 100%" }
                    }
                }
                else {
                    return { ...item, percentage: "", inerror: "Invalid Input" }
                }

            }
            return item;
        }
        )
        this.setState({ typeofQuestions: arr });
        this.totalpercentage(arr, tqid, "toq");
    }

    complexityFun = (e, tqid) => {
        let arr = this.state.complexity.map(item => {

            if (item.id == tqid) {
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value)) {
                    if (e.target.value <= 100) {
                        return { ...item, percentage: e.target.value, inerror: "" }
                    }
                    else {
                        return { ...item, percentage: "", inerror: "Total Percentage should be 100%" }
                    }
                }
                else {
                    return { ...item, percentage: "", inerror: "Invalid Input" }
                }

            }
            return item;
        }
        )
        this.setState({ complexity: arr });
        this.totalpercentage(arr, tqid, "com");
    }
    questionTheoryFun = (e, tqid) => {
        let arr = this.state.questionTheory.map(item => {

            if (item.id == tqid) {
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value)) {
                    if (e.target.value <= 100) {
                        return { ...item, percentage: e.target.value, inerror: "" }
                    }
                    else {
                        return { ...item, percentage: "", inerror: "Total Percentage should be 100%" }
                    }
                }
                else {
                    return { ...item, percentage: "", inerror: "Invalid Input" }
                }

            }
            return item;
        }
        )
        this.setState({ questionTheory: arr });
        this.totalpercentage(arr, tqid, "qte");
    }
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
    defaultValue() {
        let sarray = [];
        const obj1 = {
            value: 0,
            label: "ALL"
        }
        sarray.push(obj1);
        return sarray;
    }
    handleSelectInputChange1 = (name, value) => {
        this.setState({
            class: value.toString()
        });
    }
    selectAllFunction = (e) => {
        let arr = this.state.previousYears.map(item => {
            if (e.target.checked == true) {
                return { ...item, checked: true, active: "active p-2 mb-3 flex-row justify-content-between align-items-center" }
            }
            else {
                return { ...item, checked: false, active: "p-2 mb-3 flex-row justify-content-between align-items-center" }
            }

        }
        )
        this.setState({ previousYears: arr });
    }
    widthFunction() {
        let width = "";
        if (Cookies.get("examid") == "2") {
            width = "widthclass1"

        }
        else {
            width = "widthclass"
        }
        return width;
    }

    render() {
        console.log("currentstate", this.state);
        const examname = this.props.getData.globals.exams.find((a) => a.id == Cookies.get("examid"));
        return (
            <div className="previous_paper pt-xl-4 pt-lg-4 px-xl-4 px-lg-4">
                <Form.Text className="form-text text-danger">
                    {this.state.submitError}
                </Form.Text>
                <Row>
                    <Col xl={9} lg={9} md={12} sm={12}>
                        <h5 className="title mb-3">Previous Papers</h5>
                        <Card>
                            <Card.Header className="bg-white py-2">
                                <Row className="align-items-center">
                                    <Col xl={6} lg={6} md={6} sm={12} xs={12}><h6 className="mb-0">Old Papers</h6></Col>
                                    <Col xl={6} lg={6} md={6} sm={12} xs={12} className="d-flex align-items-center">
                                        <Form.Check type="checkbox" id="chapcheckboxOne" custom style={{ width: 150 }}>
                                            <Form.Check.Input
                                                //checked={false}
                                                type="checkbox"
                                                onClick={(e) => this.selectAllFunction(e)}
                                            />
                                            <Form.Check.Label
                                                htmlFor="chapcheckboxOne"
                                            >SELECT ALL</Form.Check.Label>
                                        </Form.Check>
                                        {Cookies.get("examid") == "2" ? (
                                            <div style={{ width: 140 }} className="mx-3">
                                                <SelectDropDown
                                                    handleChange={this.handleSelectInputChange}
                                                    name="examtype"
                                                    options={filter}
                                                    placeholderName={'Select All'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                        ) : ("")}
                                        <div className={this.widthFunction()}>
                                            <SelectDropDown
                                                handleChange={this.handleSelectInputChange1}
                                                name="class"
                                                options={this.classGetDataFunction(this.props.getData.globals.classes)}
                                                //placeholderName={'class'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                                defaultValue={{ label: "ALL", value: 0 }}
                                            /></div>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row className="oldpaper_list">
                                    {this.state.previousYears.map((getData) => (
                                        <Col xl={2} lg={2} md={2} sm={3} xs={3}>
                                            <Card
                                                as={Card.Body}
                                                className={getData.active}
                                                onClick={(e) => this.yearFunction(getData.year)}
                                            >
                                                <div className="year">{getData.year}</div>
                                                <i className="fal fa-check" />
                                            </Card>
                                        </Col>))}


                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="mt-4 border-0 shadow-sm p-0">
                            <Card.Header className="bg-white">
                                <Card.Title className="h6 mb-0">Setup</Card.Title>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Row noGutters={true}>
                                    <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                        <Card className="border-0 shadow-sm h-100">
                                            <Card.Body className="p-3">
                                                <h6 className="mb-4">Type of Question:</h6>
                                                <Form.Text className="form-text text-danger">
                                                    {this.state.error1}
                                                </Form.Text>
                                                <Form className="px-3">
                                                    {this.state.typeofQuestions.map((getData1) => (<Form.Group as={Row} controlId="formChapter1">
                                                        <Form.Label column sm="7"> {getData1.questiontype}</Form.Label>
                                                        <Col sm="5">
                                                            <Form.Control
                                                                type="text"
                                                                name="percentage1"
                                                                value={getData1.percentage}
                                                                placeholder=""
                                                                onChange={(e) => this.typeOfQuestion(e, getData1.id)}

                                                            />
                                                            <Form.Text className="form-text text-danger">
                                                                {getData1.inerror}
                                                            </Form.Text>


                                                        </Col>
                                                    </Form.Group>))}


                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                        <Card className="border-0 shadow-sm h-100">
                                            <Card.Body className="p-3">
                                                <h6 className="mb-4">Complexity</h6>
                                                <Form.Text className="form-text text-danger">
                                                    {this.state.error2}
                                                </Form.Text>
                                                <Form className="px-3">
                                                    {this.state.complexity.map((getData2) => (
                                                        <Form.Group as={Row} controlId="formChapter01">
                                                            <Form.Label column sm="7"> {getData2.complexity}  </Form.Label>
                                                            <Col sm="5">
                                                                <Form.Control
                                                                    value={getData2.percentage}
                                                                    type="text"
                                                                    name="percentage2"
                                                                    placeholder=""
                                                                    onChange={(e) => this.complexityFun(e, getData2.id)} />
                                                                <Form.Text className="form-text text-danger">
                                                                    {getData2.inerror}
                                                                </Form.Text>
                                                            </Col>
                                                        </Form.Group>))}
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                        <Card className="border-0 shadow-sm h-100">
                                            <Card.Body>
                                                <h6 className="mb-4">Question Theory</h6>
                                                <Form.Text className="form-text text-danger">
                                                    {this.state.error3}
                                                </Form.Text>
                                                <Form className="px-3">
                                                    {this.state.questionTheory.map((getData3) => (
                                                        <Form.Group as={Row} controlId="formChapter001">
                                                            <Form.Label column sm="7"> {getData3.question_theory}   </Form.Label>
                                                            <Col sm="5">
                                                                <Form.Control
                                                                    value={getData3.percentage}
                                                                    type="text"
                                                                    name="percentage3"
                                                                    placeholder=""
                                                                    onChange={(e) => this.questionTheoryFun(e, getData3.id)} />
                                                                <Form.Text className="form-text text-danger">
                                                                    {getData3.inerror}
                                                                </Form.Text>
                                                            </Col>
                                                        </Form.Group>))}
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} lg={3} md={12} sm={12}>
                        <Card className="aside border-0 shadow-sm">
                            <Card.Header className="border-0">
                                <Table className="table-borderless">
                                    <tbody>
                                        {/* <tr>
                                            <th>Class </th>
                                            <th>: XI</th>
                                        </tr> */}
                                        <tr>
                                            <th>Exam </th>
                                            <th>: {examname.exam} </th>
                                        </tr>
                                        {Cookies.get("examid") == "1" ? (
                                                <React.Fragment>
                                                    <tr>
                                                        <th> Duration </th>
                                                        <th>: 180min </th>
                                                    </tr>
                                                    <tr>
                                                        <th>No Of Questions </th>
                                                        <th>: 180</th>
                                                    </tr>
                                                </React.Fragment>
                                            ) : (
                                                    <React.Fragment>
                                                        {this.state.examtype == "1" ? (
                                                            <React.Fragment>
                                                                <tr>
                                                                    <th> Duration </th>
                                                                    <th>: 180min </th>
                                                                </tr>
                                                                <tr>
                                                                    <th>No Of Questions </th>
                                                                    <th>: 75</th>
                                                                </tr>
                                                            </React.Fragment>) : (
                                                                <React.Fragment>
                                                                    <tr>
                                                                        <th> Duration </th>
                                                                        <th>: 180min </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>No Of Questions </th>
                                                                        <th>: 75</th>
                                                                    </tr>
                                                                </React.Fragment>)}

                                                    </React.Fragment>
                                                )}
                                    </tbody>
                                </Table>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <Card className="border-0 bg-light">
                                    <Card.Header className="bg-secondary">
                                        <Card.Title className="h6 mb-0 text-white">Old Papers</Card.Title>
                                    </Card.Header>
                                    <Card.Body className="p-3 m-1 bg-white">
                                        <Scrollbars style={{ height: "350px" }}
                                            {...this.props}
                                            renderThumbVertical={renderThumb}
                                            autoHide
                                            autoHideTimeout={500}
                                            autoHideDuration={200}>
                                            <ul className="list-unstyled topic-list">
                                                {this.state.previousYears.map((data) => (
                                                    <div>{data.checked == true ? (<li>{data.year}</li>) : ("")}</div>

                                                ))}
                                            </ul>
                                        </Scrollbars>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                            <Card.Footer className="border-0 bg-white text-center">
                            {this.state.loadbutton == 0 ? ( <Link onClick={this.handleFormSubmit} className="px-4 px-5 btn btn-green text-white">Start Exam</Link>)
                            :( <Link className="px-4 px-5 btn btn-green text-white"><span className="spinner-border spinner-border-sm"></span>loading..</Link>)}
                               
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(compose(graphql(STUDENR_PREVIOUS_EXAM, {
    name: "customfunction"
})
)(CustomPreviousPaperSection));
