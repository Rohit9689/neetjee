"use strict";(globalThis.webpackChunkneetjee_guru=globalThis.webpackChunkneetjee_guru||[]).push([[582],{80582(t,e,s){s.r(e),s.d(e,{default:()=>g});var a=s(65043),l=s(14282),i=s(38628),n=s(61489),c=s(32223),r=(s(80639),s(33309),s(94545),s(70459)),h=s(99564),o=s(4333),d=s(91688),m=s(46637),p=s(94225),u=s(70579);const j=r.J1` 
query($mobile: String!,$exam_type: String!,$class_id: String!) {
    getSubjectAnalysisData(mobile: $mobile,exam_type: $exam_type,class_id: $class_id){
        class_id
        syllabus_analysis{
            id
            subject
            chapters_strength{
                strength
                total
                chapter_list{
                    id
                    chapter
                }
            }
            topics_strength{
                strength
                total
                topic_list{
                    id
                    topic
                    chapter
                    chapter_id
                }
            }
            last_attempted_chapter
            last_attempted_chapter_name
            last_timestamp
            last_accuracy
        }
        
        
        
    }
}
`;class x extends a.Component{constructor(t){super(t),this.handleInput=t=>{"topic"==t&&this.setState({topic:"1",chapter:""}),"chapter"==t&&this.setState({chapter:"1",topic:""})},this.modalFun=(t,e)=>{console.log("modalFun"),this.setState({modalShow:!0,modaldata:t,name:e})},this.topiccount=t=>{let e=[];return t.map(t=>{e.push(t.total)}),e.reduce(function(t,e){return t+e},0)},this.state={chapter:"1",topic:"",modalShow:!1,modaldata:[],name:"",subject:"all"}}chaaptercount(t){let e=[];return t.map(t=>{e.push(t.total)}),e.reduce(function(t,e){return t+e},0)}render(){const t=this.props.getSubjectAnalysisData,e=t.loading,s=t.error;if(e)return(0,u.jsx)(m.A,{});if(void 0!==s)return alert("Server Error. "+s.message),null;let r="";return r="1,2"==this.props.class_id?t.getSubjectAnalysisData.find(t=>"0"==t.class_id):t.getSubjectAnalysisData.find(t=>t.class_id==this.props.class_id),(0,u.jsxs)(a.Fragment,{children:[(0,u.jsxs)(i.A,{className:"syllabus-status my-3",children:[(0,u.jsxs)(i.A.Header,{className:"bg-white d-flex justify-content-between align-items-center",children:[(0,u.jsx)("h6",{className:"card-title mb-0",children:"Syllabus analysis"}),(0,u.jsxs)("ul",{className:"filter",children:[(0,u.jsx)("li",{children:(0,u.jsx)("a",{className:"1"==this.state.chapter?"active":"",onClick:t=>this.handleInput("chapter"),children:"Chapters"})}),(0,u.jsx)("li",{children:(0,u.jsx)("a",{className:"1"==this.state.topic?"active":"",onClick:t=>this.handleInput("topic"),children:"Topics"})})]})]}),"1"==this.state.chapter?(0,u.jsx)(i.A.Body,{className:"p-0",children:(0,u.jsx)(n.A,{children:r.syllabus_analysis.map(t=>(0,u.jsxs)(i.A,{children:[(0,u.jsx)(i.A.Header,{className:"bg-white",children:t.subject}),(0,u.jsx)(i.A.Body,{className:"p-2",children:(0,u.jsxs)(c.A,{variant:"flush",children:[(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsx)("h6",{className:"font-weight-normal",children:"Total Chapters"}),(0,u.jsx)(l.A,{variant:"dark",children:this.chaaptercount(t.chapters_strength)})]}),(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsx)("p",{className:"font-weight-bold",children:"Strength"}),(0,u.jsx)("p",{className:"font-weight-bold",children:"Chapters"})]}),t.chapters_strength.map(t=>(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsxs)("p",{children:[t.strength,"%"]}),(0,u.jsxs)("a",{onClick:e=>this.modalFun(t.chapter_list,"Chapters Data"),children:[t.total,(0,u.jsx)("i",{className:"ml-3 fal fa-angle-right"})]})]}))]})})]}))})}):"","1"==this.state.topic?(0,u.jsx)(i.A.Body,{className:"p-0",children:(0,u.jsx)(n.A,{children:r.syllabus_analysis.map(t=>(0,u.jsxs)(i.A,{children:[(0,u.jsx)(i.A.Header,{className:"bg-white",children:t.subject}),(0,u.jsx)(i.A.Body,{className:"p-2",children:(0,u.jsxs)(c.A,{variant:"flush",children:[(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsx)("h6",{className:"font-weight-normal",children:"Total Topics"}),(0,u.jsx)(l.A,{variant:"dark",children:this.topiccount(t.topics_strength)})]}),(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsx)("p",{className:"font-weight-bold",children:"Strength"}),(0,u.jsx)("p",{className:"font-weight-bold",children:"Topics"})]}),t.topics_strength.map(t=>(0,u.jsxs)(c.A.Item,{className:"d-flex justify-content-between align-items-center",children:[(0,u.jsxs)("p",{children:[t.strength,"%"]}),(0,u.jsxs)("a",{onClick:e=>this.modalFun(t.topic_list,"Chapters And Topics Data"),children:[t.total,(0,u.jsx)("i",{className:"ml-3 fal fa-angle-right"})]})]}))]})})]}))})}):""]}),(0,u.jsx)(p.A,{name:this.state.name,data:this.state.modaldata,show:this.state.modalShow,onHide:()=>this.setState({modalShow:!1})})]})}}const g=(0,d.withRouter)(o((0,h.U)(j,{options:t=>({variables:{mobile:t.mobile,exam_type:t.exam_type,class_id:t.class_id},fetchPolicy:"network-only"}),name:"getSubjectAnalysisData"}))(x))}}]);
//# sourceMappingURL=582.d4ded077.chunk.js.map