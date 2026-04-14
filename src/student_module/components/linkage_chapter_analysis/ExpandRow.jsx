import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import CardLessDataTable from '../../../neetjee_guru/components/datatables/CardLessDataTable'
const chapterwiseBotanydefaultSorted = [
    {
        dataField: "qsCount",
        order: "desc"
    }
];


class ExpandRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false
        }

    }
    handleEditFunction = () => {
        console.log("handleEditFunction");
        this.setState({
            modalShow: true
        });
    }

    topicwiseBotanyData(data,globalsubjects) {
        console.log("innertopic", data);
        let newArray = [];
        if (data.linkage.length > 0 || data.linkage.length !=null) {
            data.linkage.map((item) => {
                if (item != "") {
                    
                    let singlesub = globalsubjects.find((a) => a.id == data.subjectid);
                    let singlechapters = singlesub.studentChapters.find((a) => a.id == data.id);
                    let chapter = "";
                    if (singlechapters != undefined) {
                        chapter = singlechapters.chapter;
                    }
                    let linkchapter = "";
                    let singlelinkchapters = singlesub.studentChapters.find((a) => a.id == item.id);
                    if (singlelinkchapters != undefined) {
                        linkchapter = singlelinkchapters.chapter;
                    }
                   const newObj = {
                        id: item.id,
                        lchapter: linkchapter,
                        qsCount: parseInt(item.count),
                        type: "link",
                        subjectid: data.subjectid,
                        chapterid:data.id,
                        chapter:chapter

                    }
                    newArray.push(newObj);
                }

            });
        }
        console.log("subjectQuestionTheoryData", newArray);
        return newArray;

    }
    topicwiseBotanyColumns(data) {
        let newArray = [];
        console.log("topicwiseBotanyColumns", data);
        if (data.length > 0 || data.length !=null) {

            newArray = [
                {
                    dataField: "lchapter",
                    text: "Linkage Chapter",
                    sort: true,
                    //footer: "Total",

                },
                {
                    dataField: "qsCount",
                    text: "Qstn",
                    sort: true,
                    formatter: this.props.actionsFormatter2,
                    events: {
                        onClick: this.props.handleModalFunction
                    }
                }
            ]
        }
        return newArray;
    }
    defaultSorted = [
        {
            dataField: "qsCount",
            order: "desc"
        }
    ];
    render() {
        //for globalsubjects
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        //globalsubjects end
        return (
            <React.Fragment>
                {this.props.row.linkage!=null?( <Card as={Card.Body} className="p-0 border-0 overflow-hidden">
                    <CardLessDataTable
                        defaultSorted={this.defaultSorted} 
                        articlecolumns={this.topicwiseBotanyColumns(this.props.row.linkage)}
                        articledata={this.topicwiseBotanyData(this.props.row,globalsubjects)}
                    />
                </Card>):("")}
               

            </React.Fragment>
        )
    }
}




export default ExpandRow
