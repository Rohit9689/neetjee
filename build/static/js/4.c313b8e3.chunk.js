"use strict";(globalThis.webpackChunkneetjee_guru=globalThis.webpackChunkneetjee_guru||[]).push([[4],{98004(t,e,r){r.r(e),r.d(e,{default:()=>d});var a=r(65043),s=(r(68759),r(56918)),i=r(70459),n=r(99564),o=r(4333),p=r(91688),c=r(70579);class h extends a.Component{topicexam(t){let e=this.props.getChapterDashboard.getChapterDashboard.find(t=>"exam"==t.type).topics_report.find(e=>e.topic_name==t),r="";return void 0!=e&&(r=parseInt(e.correct)/parseInt(e.total_questions)*100),isNaN(r)?"0":Math.round(r)}topicpractic(t,e){let r=parseInt(t)/parseInt(e)*100;return isNaN(r)?"0":Math.round(r)}betterFun(t,e,r){if("skipped"==r||"wrong"==r||"error"==r||"over"==r||"intime"==r||"speed"==r||"less"==r){if("0"==parseInt(t)&&"0"==parseInt(e))return"Both";if("0"==parseInt(t)&&"0"!=parseInt(e))return"Exam";if("0"!=parseInt(t)&&"0"==parseInt(e))return"Practice";if(parseInt(t)<parseInt(e)){return"1"==parseInt(e)-parseInt(t)?"Both":"Exam"}if(parseInt(e)<parseInt(t)){return"1"==parseInt(t)-parseInt(e)?"Both":"Practice"}return"Both"}if("0"==parseInt(t)&&"0"==parseInt(e))return"Not Both";if("0"==parseInt(t)&&"0"!=parseInt(e))return"Practice";if("0"!=parseInt(t)&&"0"==parseInt(e))return"Exam";if(parseInt(t)>parseInt(e)){return"1"==parseInt(t)-parseInt(e)?"Both":"Exam"}if(parseInt(e)>parseInt(t)){return"1"==parseInt(e)-parseInt(t)?"Both":"Practice"}return"Both"}render(){return this.props.getChapterDashboard.loading?(0,c.jsx)("tbody",{children:(0,c.jsx)("tr",{className:"text-center",children:"Loading..."})}):(console.log("topic accuracy",this.props.getChapterDashboard.getChapterDashboard),(0,c.jsx)("tbody",{children:this.props.getChapterDashboard.getChapterDashboard[0].topics_report.map(t=>(0,c.jsxs)("tr",{children:[(0,c.jsxs)("td",{children:[(0,c.jsx)("i",{className:"fas fa-lightbulb-exclamation color_dark_red mr-2 font_18"}),t.topic_name,(0,c.jsx)("br",{}),(0,c.jsx)("span",{style:{fontWeight:"normal",fontSize:""},children:t.total_questions>0?`topic completed practice- ${t.topic_practice_percentage} % , total questions- ${t.total_questions}`:"Practice Not yet started."})]}),(0,c.jsxs)("td",{children:[this.topicexam(t.topic_name),"%"]}),(0,c.jsxs)("td",{children:[this.topicpractic(t.correct,t.total_questions),"%"]}),(0,c.jsx)("td",{children:this.betterFun(this.topicexam(t.topic_name),this.topicpractic(t.correct,t.total_questions))})]}))}))}}const d=(0,p.withRouter)(o((0,n.U)(i.J1` 
    query($mobile: String!,
        $chapter_id: Int,$topic_id:Int) {
            getChapterDashboard(mobile: $mobile,
        chapter_id: $chapter_id,topic_id:$topic_id){
            type
            topics_report{
                topic_name
                total_questions
                correct
                topic_practice_percentage
            }
            
        }
    }
    `,{options:t=>({variables:{mobile:s.Jt("mobile"),chapter_id:parseInt(t.chapter_id),topic_id:parseInt(t.topic_id)},fetchPolicy:"cache-and-network"}),name:"getChapterDashboard"}))(h))}}]);
//# sourceMappingURL=4.c313b8e3.chunk.js.map