
export const correctComplexitydata = [
    { id: 1, correct: 'Easy', intime: 0, lesstime: 5, overtime: 0 },
    { id: 2, correct: 'Moderate', intime: 0, lesstime: 10, overtime: 2 },
    { id: 3, correct: 'Difficult', intime: 0, lesstime: 8, overtime: 1 },
    { id: 4, correct: 'Highly Difficult', intime: 0, lesstime: 1, overtime: 0 },
];

export const correctComplexitycolumns = [
    {
        dataField: "correct",
        text: "Correct Answered",
        sort: true
    },
    {
        dataField: "intime",
        text: "In Time",
        sort: true
    },

    {
        dataField: "lesstime",
        text: "Less Time",
        sort: true
    },
    {
        dataField: "overtime",
        text: "Over Time",
        sort: true
    }
];

export const correctComplexitydefaultSorted = [
    {
        dataField: "correct",
        order: "desc"
    }
];



export const wrongComplexitydata = [
    { id: 1, correct: 'Easy', intime: 0, lesstime: 7, overtime: 3 },
    { id: 2, correct: 'Moderate', intime: 0, lesstime: 7, overtime: 1 },
    { id: 3, correct: 'Difficult', intime: 0, lesstime: 3, overtime: 1 },
    { id: 4, correct: 'Highly Difficult', intime: 0, lesstime: 0, overtime: 0 },
];

export const wrongComplexitycolumns = [
    {
        dataField: "correct",
        text: "Correct Answered",
        sort: true
    },
    {
        dataField: "intime",
        text: "In Time",
        sort: true
    },

    {
        dataField: "lesstime",
        text: "Less Time",
        sort: true
    },
    {
        dataField: "overtime",
        text: "Over Time",
        sort: true
    }
];

export const wrongComplexitydefaultSorted = [
    {
        dataField: "correct",
        order: "desc"
    }
];



export const questionTypetabledata = [
    { id: 1, type: 'Numerical', correct: 0, wrong: 7, skipped: 3, notanswered: 7, answered: 3 },
    { id: 2, type: 'Formula', correct: 0, wrong: 7, skipped: 1, notanswered: 7, answered: 1 }
];

export const questionTypetablecolumns = [
    {
        dataField: "type",
        text: "Q Type",
        sort: true
    },
    {
        dataField: "correct",
        text: "Correct",
        sort: true
    },

    {
        dataField: "wrong",
        text: "Wrong",
        sort: true
    },
    {
        dataField: "skipped",
        text: "Skipped",
        sort: true
    },
    {
        dataField: "notanswered",
        text: "Not Answered",
        sort: true
    },
    {
        dataField: "answered",
        text: "Answered",
        sort: true
    }
];

export const questionTypetabledefaultSorted = [
    {
        dataField: "type",
        order: "desc"
    }
];