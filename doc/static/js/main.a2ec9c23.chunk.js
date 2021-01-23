(this["webpackJsonpreact-issue-ganttchart"]=this["webpackJsonpreact-issue-ganttchart"]||[]).push([[0],[,,,,,,,,,,function(t,e,a){t.exports=a(21)},,,,,function(t,e,a){},,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),r=a(8),s=a.n(r),c=(a(15),a(9)),i=a(1),u=a(2),l=a(4),m=a(3),h=a(5),d=a(6),p=(a(16),function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(l.a)(this,Object(m.a)(e).call(this,t))).dataProcessor=null,a.initZoom(),a}return Object(h.a)(e,t),Object(u.a)(e,[{key:"initZoom",value:function(){d.gantt.ext.zoom.init({levels:[{name:"Hours",scale_height:60,min_column_width:30,scales:[{unit:"day",step:1,format:"%d %M"},{unit:"hour",step:1,format:"%H"}]},{name:"Days",scale_height:60,min_column_width:70,scales:[{unit:"week",step:1,format:"Week #%W"},{unit:"day",step:1,format:"%d %M"}]},{name:"Months",scale_height:60,min_column_width:70,scales:[{unit:"month",step:1,format:"%F"},{unit:"week",step:1,format:"#%W"}]}]})}},{key:"setZoom",value:function(t){d.gantt.ext.zoom.setLevel(t)}},{key:"initGanttDataProcessor",value:function(){var t=this.props.onDataUpdated;this.dataProcessor=d.gantt.createDataProcessor((function(e,a,n,o){return new Promise((function(r,s){return t&&t(e,a,n,o),r()}))}))}},{key:"shouldComponentUpdate",value:function(t){return this.props.zoom!==t.zoom}},{key:"componentDidMount",value:function(){d.gantt.config.xml_date="%Y-%m-%d %H:%i";var t=this.props.tasks;d.gantt.init(this.ganttContainer),this.initGanttDataProcessor(),d.gantt.parse(t)}},{key:"componentWillUnmount",value:function(){this.dataProcessor&&(this.dataProcessor.destructor(),this.dataProcessor=null)}},{key:"render",value:function(){var t=this,e=this.props.zoom;return this.setZoom(e),o.a.createElement("div",{ref:function(e){t.ganttContainer=e},style:{width:"100%",height:"100%"}})}}]),e}(n.Component)),g=(a(17),p),f=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(o)))).handleZoomChange=function(t){a.props.onZoomChange&&a.props.onZoomChange(t.target.value)},a}return Object(h.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this,e=["Hours","Days","Months"].map((function(e){var a=t.props.zoom===e;return o.a.createElement("label",{key:e,className:"radio-label ".concat(a?"radio-label-active":"")},o.a.createElement("input",{type:"radio",checked:a,onChange:t.handleZoomChange,value:e}),e)}));return o.a.createElement("div",{className:"tool-bar"},o.a.createElement("b",null,"Zoom: "),e)}}]),e}(n.Component),v=(a(18),f),b=function(t){function e(){return Object(i.a)(this,e),Object(l.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this.props.messages.map((function(t){var e=t.message;return o.a.createElement("li",{key:Math.random()},e)}));return o.a.createElement("div",{className:"message-area"},o.a.createElement("h3",null,"Messages:"),o.a.createElement("ul",null,t))}}]),e}(n.Component);b.defaultProps={messages:[]};var y=b,k=(a(19),y),j=(a(20),{data:[{id:1,text:"Task #1",start_date:"2020-02-12",duration:3,progress:.6},{id:2,text:"Task #2",start_date:"2020-02-16",duration:3,progress:.4}],links:[{id:1,source:1,target:2,type:"0"}]}),O=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(t=Object(m.a)(e)).call.apply(t,[this].concat(o)))).state={currentZoom:"Days",messages:[]},a.logDataUpdate=function(t,e,n,o){var r=n&&n.text?" (".concat(n.text,")"):"",s="".concat(t," ").concat(e,": ").concat(o," ").concat(r);"link"===t&&"delete"!==e&&(s+=" ( source: ".concat(n.source,", target: ").concat(n.target," )")),a.addMessage(s)},a.handleZoomChange=function(t){a.setState({currentZoom:t})},a}return Object(h.a)(e,t),Object(u.a)(e,[{key:"addMessage",value:function(t){var e=[{message:t}].concat(Object(c.a)(this.state.messages));e.length>5&&(e.length=5),this.setState({messages:e})}},{key:"render",value:function(){var t=this.state,e=t.currentZoom,a=t.messages;return o.a.createElement("div",null,o.a.createElement("div",{className:"zoom-bar"},o.a.createElement(v,{zoom:e,onZoomChange:this.handleZoomChange})),o.a.createElement("div",{className:"gantt-container"},o.a.createElement(g,{tasks:j,zoom:e,onDataUpdated:this.logDataUpdate})),o.a.createElement(k,{messages:a}))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.a2ec9c23.chunk.js.map