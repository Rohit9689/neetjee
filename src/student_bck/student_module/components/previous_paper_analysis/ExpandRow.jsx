import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import CardLessDataTable from '../../../neetjee_guru/components/datatables/CardLessDataTable'






class ExpandRow extends Component {
    constructor(props) {
        super(props)

    }
    defaultSorted = [
        {
            dataField: "qsCount",
            order: "desc"
        }
    ];
    topicwiseBotanyData(data) {

        let newArray = [];
        if (data.type == "Grouping") {
            if (data.groupchArr.length > 0) {
                let fdata = data.groupchArr;
                let qper = 0;
                fdata.map((map) => {
                    qper = parseFloat(qper) + parseFloat(map.qsCount)
                });
                data.groupchArr.map((cmap) => {

                    const cfieldqper = (parseInt(cmap.qsCount) / parseInt(qper) * 100);
                    let cqperval = "";
                    if (isNaN(cfieldqper)) {
                        cqperval = 0;
                    }
                    else {
                        cqperval = cfieldqper.toFixed(1);
                    }

                    let newObj = {
                        id: cmap.id,
                        chapter: cmap.chapter,
                        qsCount: parseInt(cmap.qsCount) + " " + cqperval,
                        difficultyLevel: cmap.difficultyLevel,
                        learningHours: parseInt(cmap.learningHours),
                        type: "chapter",
                        subjectid: data.subjectid

                    }
                    cmap.year.map((item2) => {

                        //for total percentage
                        let mtotarry = [];
                        fdata.map((dmap) => {
                            let totarry = [];
                            dmap.year.map((a) => {
                                if (item2.year == a.year) {
                                    totarry.push(parseInt(a.count));
                                }


                            });
                            mtotarry.push(...totarry);
                        });

                        var sum = mtotarry.reduce(function (a, b) {
                            return a + b;
                        }, 0);
                        //end total percentage
                        const field2 = item2.year;
                        const field2p = (parseInt(item2.count) / parseInt(sum) * 100);
                        let val = "";
                        if (isNaN(field2p)) {
                            val = 0;
                        }
                        else {
                            //val = Math.round(field2p);
                            val = field2p.toFixed(1);
                        }
                        const newObj1 = {
                            ...newObj,
                            //qsum:sum,
                            [`${field2}`]: parseInt(item2.count) + " " + val,

                        }
                        newObj = newObj1;
                    });
                    newArray.push(newObj);
                })

            }

        }
        else {
            if (data.topics.length > 0) {
                let qper = 0;
                data.topics.map((map) => {
                    qper = parseFloat(qper) + parseFloat(map.qsCount)
                });
                data.topics.map((item) => {
                    if (item != "") {
                        let newObj = "";
                        const lfieldqper = (parseInt(item.qsCount) / parseInt(qper) * 100);
                        let qperval = "";
                        if (isNaN(lfieldqper)) {
                            qperval = 0;
                        }
                        else {
                            qperval = lfieldqper.toFixed(1);
                        }
                        newObj = {
                            id: item.id,
                            topic: item.topic,
                            qsCount: parseInt(item.qsCount) + " " + qperval,
                            topics: item.topic,
                            type: "topic",
                            subjectid: data.subjectid

                        }
                        item.year.map((item2) => {
                            //for total percentage
                            let mtotarry = [];
                            data.topics.map((dmap) => {
                                let totarry = [];
                                dmap.year.map((a) => {
                                    if (item2.year == a.year) {
                                        totarry.push(parseInt(a.count));
                                    }


                                });
                                mtotarry.push(...totarry);
                            });

                            var sum = mtotarry.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            //end total percentage
                            const field2 = item2.year;
                            const field2p = (parseInt(item2.count) / parseInt(sum) * 100);
                            let val = "";
                            if (isNaN(field2p)) {
                                val = 0;
                            }
                            else {
                                //val = Math.round(field2p);
                                val = field2p.toFixed(1);
                            }
                            const newObj1 = {
                                ...newObj,
                                [`${field2}`]: parseInt(item2.count) + " " + val,

                            }
                            newObj = newObj1;
                        });
                        newArray.push(newObj);

                    }

                });
            }
        }

        
        return newArray;

    }
    topicwiseBotanyColumns(data, type) {
        let newArray = [];
        if (data.length > 0) {
            
                if(type == "Grouping"){
                    newArray = [
                        {
                            dataField: "chapter",
                            text: "chapter Name",
                            sort: true,
                        },
                        {
                            dataField: "difficultyLevel",
                            text: "Difficulty Level",
                            sort: true,
                            formatter: this.props.difficultactionsFormatter
                        }, 
                        {
                            dataField: "learningHours",
                            text: "learning Hours",
                            sort: true,
                        },
                        {
                            dataField: "qsCount",
                            text: "Questions",
                            sort: true,
                            formatter: this.props.actionsFormatter3,
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
                    ]
                }
                else{
                    newArray = [
                        {
                            dataField: "topic",
                            text: "Topic Name",
                            sort: true,
                            //footer: "Total",
    
                        },
                        {
                            dataField: "qsCount",
                            text: "Questions",
                            sort: true,
                            formatter: this.props.actionsFormatter3,
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
                    ]
                }
                

                data[0].year.map((item) => {
                    if (item != undefined) {
                        let first_word = item.year.split("-")[0];
                        const newObj = {
                            dataField: item.year,
                            text: item.year,
                            sort: true,
                            formatter: this.props.actionsFormatter2,
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
                            },
                            events: {
                                onClick: this.props.handleModalFunction
                            }
                        }

                        newArray.push(newObj);
                    }

                });
            
        }


        return newArray;
    }



    render() {
       
        return (
            <React.Fragment>
                <Card as={Card.Body} className="p-0 border-0 overflow-hidden">
                    {this.props.row.type == "Grouping" ? (
                        <CardLessDataTable
                            defaultSorted={this.defaultSorted}
                            articlecolumns={this.topicwiseBotanyColumns(this.props.row.groupchArr, "Grouping")}
                            articledata={this.topicwiseBotanyData(this.props.row)}
                        />
                    ) : (
                            <CardLessDataTable
                                defaultSorted={this.defaultSorted}
                                articlecolumns={this.topicwiseBotanyColumns(this.props.row.topics, "topic")}
                                articledata={this.topicwiseBotanyData(this.props.row)}
                            />
                        )}

                </Card>

            </React.Fragment>
        )
    }
}




export default ExpandRow
