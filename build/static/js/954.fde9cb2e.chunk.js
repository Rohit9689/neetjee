"use strict";(globalThis.webpackChunkneetjee_guru=globalThis.webpackChunkneetjee_guru||[]).push([[954],{41954(t,e,a){a.r(e),a.d(e,{default:()=>m});var s=a(65043),r=a(45299),i=(a(86178),a(70459)),o=a(99564),n=a(4333),l=a(91688),c=a(56918),h=a(38628),g=a(70579);const d=i.J1`
 query($params: DashboardInput) {
    getDashboardData(params: $params) {
        exam_graph{
            id
            subject
            timeseries{
                timestamp
                value
                practice_percentage
            }
        }
         
          }
        }
`;class p extends s.Component{constructor(t){super(t),this.state={options:{chart:{id:"basic-bar",toolbar:{show:!1}},grid:{show:!1},stroke:{width:[2,2,2,2,2]},xaxis:{categories:["0","1-100","101-200","201-300","301-400","401-500","501-600","601-700","701-800","801-900","901-100"],labels:{show:!0,style:{fontSize:"12px",fontWeight:400}}},colors:["#1B2430","#A2B969","#F4A00B","#F36F13","#0D95BC"]},series:[{name:"Over All",data:[40,25,50,49,21,90,51,30,45,15,20]},{name:"Botany",data:[12,54,61,32,56,81,19,25,30,25,15]},{name:"Zoology",data:[12,45,55,76,41,23,43,35,40,60,20]},{name:"Physics",data:[10,30,40,25,60,81,19,22,15,20,3]},{name:"Chemistry",data:[5,20,30,40,60,25,15,30,40,20,2]}]}}getOptions(t){let e={chart:{id:"basic-bar",toolbar:{show:!1}},grid:{show:!1},stroke:{width:[2,2,2]},xaxis:{categories:[],labels:{show:!0,style:{fontSize:"12px",fontWeight:400}}},colors:["#1B2430","#A2B969","#F4A00B","#F36F13","#0D95BC"]},a=e.xaxis.categories;if(t.length>0)for(let s=0;s<t[0].timeseries.length;s++)a.push(t[0].timeseries[s].timestamp);return e.xaxis.categories=a,e}getSeries(t){let e=Array();for(let a=0;a<t.length;a++){let s=Array();for(let e=0;e<t[a].timeseries.length;e++){let r=t[a].timeseries[e].practice_percentage;s.push(r)}e.push({name:t[a].subject,data:s})}return e}render(){const t=this.props.getDashboardData,e=t.loading,a=t.error;return void 0!==a?(alert("Server Error. "+a.message),null):e?(0,g.jsx)(s.Fragment,{children:(0,g.jsx)(h.A,{as:h.A.Body,className:"justify-content-center flex-row",children:(0,g.jsx)("div",{class:"spinner-border text-primary text-center"})})}):(0,g.jsx)(r.A,{options:this.getOptions(t.getDashboardData.exam_graph),series:this.getSeries(t.getDashboardData.exam_graph),type:"line",width:"100%",height:"200"})}}const m=(0,l.withRouter)(n((0,o.U)(d,{options:t=>({variables:{params:{exam_id:parseInt(t.stateData.eexamptype),test:t.stateData.etesttype.toString(),test_names:t.stateData.etestname,class_ids:t.stateData.eclass.toString(),category_ids:t.stateData.ecategory.toString(),location_levels:t.stateData.elocation.toString(),region_ids:t.stateData.eregion.toString(),clusters:t.stateData.ecluster.toString(),branch_ids:t.stateData.ebranch.toString(),section_ids:t.stateData.esection,start_time:t.stateData.startDate,end_time:t.stateData.endDate,institution_id:parseInt(c.Jt("institutionid")),username:c.Jt("username")}},fetchPolicy:"network-only"}),name:"getDashboardData"}))(p))}}]);
//# sourceMappingURL=954.fde9cb2e.chunk.js.map