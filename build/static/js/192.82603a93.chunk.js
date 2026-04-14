"use strict";(globalThis.webpackChunkneetjee_guru=globalThis.webpackChunkneetjee_guru||[]).push([[192],{43192(e,t,r){r.r(t),r.d(t,{default:()=>d});var a=r(65043),i=(r(68759),r(56918)),p=r(70459),s=r(99564),n=r(4333),o=r(91688),c=r(70579);class h extends a.Component{complexityPrcatise(e){let t=this.props.getChapterDashboard.getChapterDashboard.find(e=>"practice"==e.type).complexity_report_web.find(t=>t.complexity_id==e),r=parseInt(t.correct)/(parseInt(t.correct)+parseInt(t.wrong))*100;return isNaN(r)?"0":Math.round(r)}complexityexam(e){let t="",r=this.props.getChapterDashboard.getChapterDashboard.find(e=>"exam"==e.type);if(void 0!=r){let a=r.complexity_report_web.find(t=>t.complexity_id==e);void 0!=a&&(t=parseInt(a.correct)/(parseInt(a.correct)+parseInt(a.wrong)+parseInt(a.not_answered))*100)}return isNaN(t)?"0":Math.round(t)}betterFun(e,t,r){if("skipped"==r||"wrong"==r||"error"==r||"over"==r||"intime"==r||"speed"==r||"less"==r){if("0"==parseInt(e)&&"0"==parseInt(t))return"Both";if("0"==parseInt(e)&&"0"!=parseInt(t))return"Exam";if("0"!=parseInt(e)&&"0"==parseInt(t))return"Practice";if(parseInt(e)<parseInt(t)){return"1"==parseInt(t)-parseInt(e)?"Both":"Exam"}if(parseInt(t)<parseInt(e)){return"1"==parseInt(e)-parseInt(t)?"Both":"Practice"}return"Both"}if("0"==parseInt(e)&&"0"==parseInt(t))return"Not Both";if("0"==parseInt(e)&&"0"!=parseInt(t))return"Practice";if("0"!=parseInt(e)&&"0"==parseInt(t))return"Exam";if(parseInt(e)>parseInt(t)){return"1"==parseInt(e)-parseInt(t)?"Both":"Exam"}if(parseInt(t)>parseInt(e)){return"1"==parseInt(t)-parseInt(e)?"Both":"Practice"}return"Both"}render(){return this.props.getChapterDashboard.loading?(0,c.jsx)("tbody",{children:(0,c.jsx)("tr",{className:"text-center",children:"Loading..."})}):(console.log("topic accuracy",this.props.getChapterDashboard.getChapterDashboard[0]),(0,c.jsx)("tbody",{children:this.props.getChapterDashboard.getChapterDashboard[0].complexity_report_web.map(e=>(0,c.jsxs)("tr",{children:[(0,c.jsxs)("td",{children:[(0,c.jsx)("i",{className:"fas fa-circle text-lightgrey mr-2"}),e.complexity_name]}),(0,c.jsxs)("td",{children:[this.complexityexam(e.complexity_id),"%"]}),(0,c.jsxs)("td",{children:[this.complexityPrcatise(e.complexity_id),"%"]}),(0,c.jsx)("td",{children:this.betterFun(this.complexityexam(e.complexity_id),this.complexityPrcatise(e.complexity_id))})]}))}))}}const d=(0,o.withRouter)(n((0,s.U)(p.J1` 
    query($mobile: String!,
        $chapter_id: Int,$topic_id:Int) {
            getChapterDashboard(mobile: $mobile,
        chapter_id: $chapter_id,topic_id:$topic_id){
            type
            complexity_report_web{
                complexity_id
                complexity_name
                correct
                wrong
                not_answered
            }
            
        }
    }
    `,{options:e=>({variables:{mobile:i.Jt("mobile"),chapter_id:parseInt(e.chapter_id),topic_id:parseInt(e.topic_id)},fetchPolicy:"cache-and-network"}),name:"getChapterDashboard"}))(h))}}]);
//# sourceMappingURL=192.82603a93.chunk.js.map