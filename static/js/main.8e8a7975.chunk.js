(this["webpackJsonpreact-issue-ganttchart"]=this["webpackJsonpreact-issue-ganttchart"]||[]).push([[0],{134:function(e,t,n){},141:function(e,t,n){},218:function(e,t,n){},219:function(e,t,n){},240:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(14),u=n.n(a),i=n(77),s=n(17),o=(n(134),n(21)),l=n(118),c=n(22),d=n(5),f=n(272),p=n(279),g=n(241),h=n(278),b=n(109),m=n(280),v=n(112),_=n.n(v),j=n(10),k=n(110),y=n.n(k),O=n(33),w=n(7),x={multiselectContainer:{width:"27%",display:"inline-block",verticalAlign:"middle",padding:"4px",alignItems:"flex-end"},chips:{background:"light blue",fontSize:"15px"},searchBox:{border:"none"}},D=Object(d.a)((function(e){return{root:{"& > *":{fontSize:"13px",marginRight:"4px"}}}}))((function(e){var t=e.classes;return Object(w.jsxs)("form",{noValidate:!0,children:[Object(w.jsx)(f.a,{color:"primary",style:{verticalAlign:"middle"},children:Object(w.jsx)(y.a,{onClick:function(e){j.gantt.config.show_grid=!j.gantt.config.show_grid,Object(O.bake_cookie)("menu_opened",j.gantt.config.show_grid),j.gantt.render()}})}),Object(w.jsx)(p.a,{className:t.root,required:!0,placeholder:"https://github.com/lamact/react-issue-ganttchart",label:"Git Repository URL",style:{width:"20%",verticalAlign:"middle"},onChange:function(t){e.onGitURLChange(t.target.value)},inputRef:e.register,name:"git_url"}),Object(w.jsx)(p.a,{className:t.root,type:"password",placeholder:"Access Token",label:"Access Token",style:{width:"10%",verticalAlign:"middle"},onChange:function(t){e.onTokenChange(t.target.value)},inputRef:e.register,name:"token"}),Object(w.jsx)(b.Multiselect,{className:t.root,options:e.labels,selectedValues:e.selected_labels,onSelect:function(t){e.onSelectedLabelChange(t)},onRemove:function(t){e.onSelectedLabelChange(t)},displayValue:"name",style:x,placeholder:"filter by labels",hidePlaceholder:"false",emptyRecordMsg:"No Labels",closeIcon:"cancel"}),Object(w.jsx)(m.a,{className:t.root,size:"small",options:e.member_list,getOptionLabel:function(e){return e.name},value:e.selected_assignee,noOptionsText:"Requires a valid token",onChange:function(t,n){e.onSelectedAssigneeChange(n)},style:{width:"15%",verticalAlign:"middle",display:"inline-block",marginRight:"15px"},renderInput:function(e){return Object(w.jsx)(p.a,Object(c.a)(Object(c.a)({},e),{},{className:t.root,label:"Assignee",variant:"standard"}))}}),Object(w.jsxs)(h.a,{size:"small",style:{height:"34px"},children:[Object(w.jsx)(g.a,{onClick:function(t){e.onZoomChange("Years")},children:"Years"}),Object(w.jsx)(g.a,{onClick:function(t){e.onZoomChange("Weeks")},children:"Weeks"}),Object(w.jsx)(g.a,{onClick:function(t){e.onZoomChange("Days")},children:"Days"})]}),Object(w.jsx)(f.a,{color:"primary",style:{verticalAlign:"middle"},children:Object(w.jsx)(_.a,{onClick:function(){return window.open("https://github.com/lamact/react-issue-ganttchart")}})})]})})),A=(n(141),D),C=(n(142),n(113)),I=n.n(C),L=n(114),S=n.n(L),T=n(52),z=n.n(T),B=function(e){return null!==e&&e!==[]&&void 0!==e&&""!==e||!!Array.isArray(e)&&e.length>0},R=function(e){return B(e)&&"id"in e&&"name"in e},N=function(e){return!!B(e)&&/https?:\/\//.test(e)},P=function(e,t){return Math.round(e/t)*t},E=function(e,t){var n=z()(e,"YYYY/MM/DD");return z()(t,"YYYY/MM/DD").diff(n,"days")+1},Y=function(e,t){var n=new Date(e),r=z()(n,"YYYY/MM/DD").add(t-1,"d").toDate();return M(r)},M=function(e){if("[object Date]"!==Object.prototype.toString.call(e))return null;if(isNaN(e.getFullYear()))return null;var t=e.toLocaleDateString("ja-JP");/\d{4}\/\d{1,2}\/\d{1,2}/.test(t)||(t=e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate());return t},U=function(e){return M(new Date(e))},F=function(e,t,n){var r=null;return B(e)?r=M(e):B(n)&&(r=U(n)),r},G=function(e,t,n){var r=null;return B(t)?r=new Date(t):B(n)&&(r=new Date(n)),r},Z=function(e,t){return U(null!=t?t:e)},$=function(e,t,n){return B(t)?(B(e)||(e=n),null!=e&&null!=t?E(e,t):1):null},V=function(e){var t,n=[];return e.links.map((function(e){n.push({type:e.type,target:e.target,source:e.source})})),t=0==e.parent?"#0":e.parent,{id:e.id,text:e.text,start_date:U(e.start_date),due_date:e.due_date,duration:e.duration,progress:e.progress,assignee:e.assignee,description:e.description,update:e.update,links:n,_parent:t}},W=function(e,t){return e.id==t.id&&e.text==t.text&&e.start_date==t.start_date&&e.due_date==t.due_date.toString()&&e.duration==t.duration&&e.progress==t.progress&&e.assignee==t.assignee&&e.update==t.update&&e._parent==t._parent&&JSON.stringify(e.links)==JSON.stringify(t.links)},q=function(e){return"[object Date]"!==Object.prototype.toString.call(e)?null:("00"+(e.getMonth()+1)).slice(-2)+"/"+("00"+e.getDate()).slice(-2)},J=function(e){var t=Object(r.useRef)(null);return Object(r.useEffect)((function(){var n;(n=j.gantt).config.xml_date="%Y/%m/%d %H:%i",n.config.order_branch=!0,n.config.order_branch_free=!0,n.config.keep_grid_width=!0,n.config.grid_resize=!0,n.config.open_tree_initially=!0,n.config.fit_tasks=!0,n.config.show_grid=!1,n.config.sort=!0,n.config.columns=[{name:"id",label:"No.",align:"left",tree:!0,width:"120",template:function(e){var t=new Date;return t.setDate(t.getDate()-7),e.update<t.toLocaleDateString()?e.id+"<a title='There is no update for a week.'><span class='overdue'>i</span></a>":e.id}},{name:"start_date",label:"Start ",align:"center",width:"60",template:function(e){return q(e.start_date)}},{name:"due_date",label:"Due ",align:"center",width:"60",template:function(e){return q(e.due_date)}},{name:"assignee",label:"Assignee",align:"center",width:"130"},{name:"add",label:"",width:"30"}],n.plugins({quick_info:!0,drag_timeline:!0}),n.showDate(new Date),n.ext.zoom.init({levels:[{name:"Days",scale_height:30,min_column_width:30,scales:[{unit:"month",step:1,format:"%n"},{unit:"day",step:1,format:"%d"}]},{name:"Weeks",scale_height:30,min_column_width:20,scales:[{unit:"week",step:1,format:"%n/%d~"}]},{name:"Years",scale_height:30,column_width:50,scales:[{unit:"year",step:1,format:"%Y"},{unit:"month",step:1,format:"%n"}]}],useKey:"ctrlKey",trigger:"wheel",element:function(){return n.$root.querySelector(".gantt_task")}}),function(e){e.templates.timeline_cell_class=function(e,t){if("[object Date]"!==Object.prototype.toString.call(t))return null;var n=new Date;if(t.getDate()===n.getDate()&&t.getMonth()===n.getMonth())return"today";if(0===t.getDay()||6===t.getDay())return"weekend";var r=new Date;return r.setDate(r.getDate()-1),t<r?"past_days":void 0},e.templates.task_text=function(e,t,n){return n.text},e.templates.task_class=function(e,t,n){if(1==n.progress)return"";if(n.progress<.01){if(e<=new Date)return"behind"}else if(new Date(Y(e,(E(e,t)+1)*n.progress))<new Date)return"behind"}}(j.gantt),function(e,t){e.attachEvent("onTaskDblClick",(function(e,n){t.openIssueAtBrowser(e)})),e.attachEvent("onTaskCreated",(function(e,n){t.openNewIssueAtBrowser(e)})),e.attachEvent("onAfterTaskUpdate",(function(n,r){t.updateIssueByAPI(r,e)})),e.attachEvent("onBeforeTaskUpdate",(function(e,t,n){})),e.attachEvent("onAfterTaskMove",(function(n,r){var a=e.getTask(n);t.updateIssueByAPI(a,e)})),e.attachEvent("onAfterLinkAdd",(function(t,n){var r=[],a=[],u=n.target;e.getTask(u).$target.forEach((function(t){var n=e.getLink(t),u=n.target,i=n.source;a.push({type:"0",target:u,source:i});var s=i.slice(1);""!=s&&r.push(s)})),e.getTask(u).dependon=r,e.getTask(u).links=a,e.updateTask(u)})),e.attachEvent("onAfterLinkDelete",(function(t,n){var r=[],a=[],u=n.target;e.getTask(u).$target.forEach((function(t){var n=e.getLink(t),u=n.target,i=n.source;a.push({type:"0",target:u,source:i});var s=i.slice(1);""!=s&&r.push(s)})),e.getTask(u).dependon=r,e.getTask(u).links=a,e.updateTask(u)})),e.attachEvent("onQuickInfo",(function(n){var r=e.getTask(n);e.locale.labels.detail_button="DETAIL",e.$click.buttons.detail_button=function(e){return t.openIssueAtBrowser(e),!0},e.ext.quickInfo.setContent({header:{title:"<h3>Description</h3>"},content:S.a.renderToStaticMarkup(Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:r.text}),Object(w.jsx)(I.a,{children:r.description})]})).toString(),buttons:["detail_button"]})})),e.attachEvent("onTaskDrag",(function(t,n,r,a){var u,i=e.getState(),s=i.min_date,o=i.max_date,l=e.date.add(new Date,i.scale_step,i.scale_unit)-new Date,c=!1;"resize"!=n&&"move"!=n||(Math.abs(r.start_date-s)<l?(u=r.start_date,c=!0):Math.abs(r.end_date-o)<l&&(u=r.end_date,c=!0),c&&(e.render(),e.showDate(u)))}))}(j.gantt,e),j.gantt.init(t.current),j.gantt.ext.zoom.setLevel(e.zoom)}),[]),Object(r.useEffect)((function(){j.gantt.ext.zoom.setLevel(e.zoom)}),[e.zoom]),Object(r.useEffect)((function(){try{j.gantt.clearAll(),B(e.issue)&&0!=e.issue.length&&(e.issue.map((function(e){j.gantt.addTask(e),"links"in e&&e.links.map((function(e){return j.gantt.addLink(e),null}))})),e.issue.map((function(e){"#0"!==e._parent&&j.gantt.setParent(j.gantt.getTask(e.id),e._parent)})),j.gantt.sort("due_date",!1))}catch(t){j.gantt.message({text:t,type:"error"})}}),[e.issue]),Object(w.jsx)("div",{ref:t,style:{width:"100%",height:"100%"}})},H=(n(218),J),Q=n(115),K=function(e){return Object(w.jsx)("div",{className:"application",children:Object(w.jsxs)(Q.a,{children:[Object(w.jsx)("meta",{charSet:"utf-8"}),Object(w.jsx)("title",{children:e.title})]})})},X=(n(219),K),ee=n(78),te=function(e){return B(e)?(e.length>1&&/^#/.test(e)&&(e=e.substring(1)),e):null},ne=function(e){return B(e)?(e.length>1&&/\/$/.test(e)&&(e=e.slice(0,-1)),e):null},re=function(e){return B(e)?(e.length>1&&/ +$/.test(e)&&(e=e.slice(0,-1)),e):null},ae=function(e){if(null===e)return null;var t=function(e){if(null===e)return null;if("string"!==typeof e)return null;var t=e.split(/^```yaml/);return null===t||t.length<2||null===(t=t[1].split(/```/))||t.length<2?null:t[0]}(e);if(null===t)return null;var n=null;try{n=ee.a.load(t)}catch(r){j.gantt.message({text:"failed load yaml"+t,type:"error"})}return n},ue=function(e,t){if(null===e)return null;var n=ae(e);if(null===n||!(t in n))return null;var r=n[t];return"number"!==typeof r?null:r},ie=function(e,t){if(null===e)return null;var n=function(e,t){if(null===e)return null;var n=ae(e);if(null===n||!(t in n))return null;var r=n[t];return"string"!==typeof r?null:re(re(r))}(e,t);return/\d{4}\/\d{1,2}\/\d{1,2}/.test(n)?new Date(n):null},se=function(e,t){if(null===e||null===t)return null;var n=ee.a.dump(t);n="```yaml\n"+n+"```";var r=e.split(/^```yaml/);if(null===r||r.length<2)return/```/.test(e)?null:n+"\n"+e;var a=r[0];if(null===(r=r[1].split(/```/))||r.length<2)return null;var u=r[1];return null==a||null==u?null:a+n+u},oe=function(e){var t="";return B(e)?(e.map((function(e){return R(e)&&B(e.id)&&(t+=e.id+":"+e.name+","),null})),t):null},le=function(e){var t=[];if(B(e)){var n=e.split(",");n.forEach((function(e,r,a){if(r<n.length-1){var u=e.split(":");if(!isNaN(parseInt(u[0]))){var i={id:parseInt(u[0]),name:u[1]};t.push(i)}}}))}else t=[{id:0,name:""}];return t},ce=function(e,t){if(null===e)return null;var n=ae(e);return null!==n&&t in n?n[t]:null},de=n(8),fe=n(16),pe="https://api.github.com/repos/",ge="https://github.com/",he=function(e){return!!N(e)&&(!(e.split("/").length<5)&&/github\.com/.test(e))},be=function(e){if(!he(e))return null;var t=e.split("/");return t.length>=5?t[3]:null},me=function(e){if(!he(e))return null;var t=e.split("/");return t.length>=5?t[4]:null},ve=function(e,t){return he(e)&&B(t)?pe+be(e)+"/"+me(e)+"/issues/"+t:null},_e=function(e,t,n){if(!he(e)||!B(t)||!B(n))return null;var r="?";return r+="labels=",t.map((function(e){R(e)&&(r+=e.name+",")})),R(n)&&""!==n.name&&(r+="&assignee="+n.name),pe+be(e)+"/"+me(e)+"/issues"+r},je=function(e){return he(e)?pe+be(e)+"/"+me(e)+"/labels":null},ke=function(e){return he(e)?pe+be(e)+"/"+me(e)+"/collaborators":null},ye=function(e,t){return he(e)&&B(t)?("number"===typeof(n=t)&&Number.isFinite(n)||(t=te(t)),t<=0?null:ge+be(e)+"/"+me(e)+"/issues/"+t):null;var n},Oe=function(e){return!!N(e)&&(!(e.split("/").length<5)&&/gitlab\.com/.test(e))},we=function(e){if(he(e))return null;if(!N(e))return null;var t=e.split("/");return t.length>=5?t[2]:null},xe=function(e){if(!N(e))return null;var t=null,n=we(e);return null!==n&&(t=e.substr(0,e.indexOf(":"))+"://"+n+"/"),t},De=function(e){return N(e)?xe(e):null},Ae=function(e){return N(e)?xe(e)+"api/v4/":null},Ce=function(e){if(!N(e))return null;var t=(e=ne(re(e))).split("/");return 5==t.length?t[3]:t.length>=5?t.slice(3,t.length-1).join("%2F"):null},Ie=function(e){if(!N(e))return null;var t=(e=ne(re(e))).split("/");return 5==t.length?t[3]:t.length>=5?t.slice(3,t.length-1).join("/"):null},Le=function(e){if(!N(e))return null;var t=(e=ne(re(e))).split("/");return 5==t.length?t[4]:t.length>=5?t[t.length-1]:null},Se=function(e){var t="?";return B(e)&&"Tokens that have not yet been entered"!==e&&(t+="access_token="+e),t},Te=function(e,t,n,r){if(!N(e))return null;if(!B(t))return null;if(!B(n))return null;if(!R(r))return null;var a=Se(t);return B(n)&&(a+="&labels=",n.map((function(e){return R(e)&&(a+=e.name+","),null}))),R(r)&&""!==r.name&&(a+="&assignee_id="+r.id),a+="&per_page=100&state=opened",Ae(e)+"projects/"+Ce(e)+"%2F"+Le(e)+"/issues"+a},ze=function(e,t,n){if(!N(e))return null;if(!B(t))return null;if(!B(n))return null;var r=Se(t);return Ae(e)+"projects/"+Ce(e)+"%2F"+Le(e)+"/issues/"+n+r},Be=function(e,t){if(!N(e))return null;var n=Se(t);return n+="&per_page=100",Ae(e)+"projects/"+Ce(e)+"%2F"+Le(e)+"/labels"+n},Re=function(e,t){if(!N(e))return null;var n=Se(t);return Ae(e)+"projects/"+Ce(e)+"%2F"+Le(e)+"/members/all"+n+"&per_page=200"},Ne=n(28),Pe=n.n(Ne),Ee=function(e){return null!==e.assignee?e.assignee.login:""},Ye=function(e,t){var n=ie(e,"start_date"),r=ie(e,"due_date"),a={id:"#"+t.number,text:t.title,start_date:F(n,0,t.created_at),due_date:G(0,r,t.created_at),duration:$(n,r,t.created_at),progress:ue(e,"progress"),assignee:Ee(t),parent:"#"+ue(e,"parent"),_parent:"#"+ue(e,"parent"),description:e,update:Z(t.created_at,t.updated_at)},u=[],i=Me(e,t);if("undefined"!=typeof i)for(var s=0;s<i.length;s++){var o={type:i[s].type,target:i[s].target,source:i[s].source};u.push(o)}return a.links=u,a},Me=function(e,t){var n,r=[];if(n=ce(e,"dependon"),B(n)){for(var a=0;a<n.length;a++){var u=[];u.type="0",u.target="#"+t.number,u.source="#"+n[a],r.push(u)}return r}},Ue=function(e,t){var n=U(t.start_date).replace(/\-/g,"/"),r={start_date:n,due_date:Y(n,t.duration).replace(/\-/g,"/"),progress:P(t.progress,.01)};return r.parent=parseInt(te(t.parent)),"dependon"in t&&(r.dependon=t.dependon),e=se(e,r)},Fe=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n,r){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(ve(t,r.number),{headers:{Authorization:"Bearer ".concat(n)},data:{}}).then((function(e){return Ye(e.data.body,r)})).catch((function(e){return Promise.reject(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),Ge=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n,r,a){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(_e(t,r,a),{headers:{Authorization:"Bearer ".concat(n)},data:{}}).then((function(e){var r=[];return e.data.map((function(e){r.push(Fe(t,n,e))})),Promise.all(r)})).catch((function(e){return Promise.reject(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),Ze=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(je(t),{headers:{Authorization:"Bearer ".concat(n)},data:{}}).then((function(e){var t=[];return e.data.map((function(e){return t.push({id:e.id,name:e.name}),null})),t})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),$e=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!B(n)||"Tokens that have not yet been entered"===n){e.next=4;break}return e.abrupt("return",Pe.a.get(ke(t),{headers:{Authorization:"Bearer ".concat(n)},data:{}}).then((function(e){var t=[];return e.data.map((function(e){return t.push({id:e.id,name:e.login}),null})),t})));case 4:console.warn("token is not valid!");case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ve=function(e,t){var n=M(new Date),r=M(new Date);null==e.parent&&(e.parent=0);var a={start_date:n,due_date:r,progress:.1,parent:parseInt(te(e.parent))},u=se("",a);u=encodeURIComponent(u),window.open(function(e){return he(e)?ge+be(e)+"/"+me(e)+"/issues/new?assignees=&labels=&title=&body=":null}(t)+u,"_blank")},We=function(e){return B(e)&&"assignee"in e&&B(e.assignee)&&"name"in e.assignee?e.assignee.name:""},qe=function(e){var t=ie(e.description,"start_date"),n=U(e.due_date),r=ue(e.description,"parent");null!==r&&(r="#"+r);var a={id:"#"+e.iid,text:e.title,start_date:F(t,0,e.created_at),due_date:G(0,n,e.created_at),duration:$(t,n,e.created_at),progress:ue(e.description,"progress"),assignee:We(e),description:e.description,update:Z(e.created_at,e.updated_at),parent:r,_parent:r},u=[],i=Je(e);if("undefined"!=typeof i)for(var s=0;s<i.length;s++){var o={type:i[s].type,target:i[s].target,source:i[s].source};u.push(o)}return a.links=u,a},Je=function(e){var t,n=[];if(null!=(t=ce(e.description,"dependon"))){for(var r=0;r<t.length;r++){var a=[];a.type="0",a.target="#"+e.iid,a.source="#"+t[r],n.push(a)}return n}},He=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n,r,a){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(Te(t,n,r,a)).then((function(e){var t=[];return e.data.map((function(e){t.push(qe(e))})),t})).catch((function(e){return console.error(e),Promise.reject(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),Qe=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(Be(t,n)).then((function(e){var t=[];return e.data.map((function(e){return t.push(e),null})),t})).catch((function(e){return console.error(e),Promise.reject(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ke=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Pe.a.get(Re(t,n)).then((function(e){var t=[];return e.data.map((function(e){return t.push({id:e.id,name:e.name}),null})),t})).catch((function(e){return console.error(e),Promise.reject(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Xe=function(e,t,n,r){return Pe.a.get(ze(r,t,te(e.id))).then((function(a){var u=a.data;if(!W(V(e),qe(u))&&parseInt(u.iid)===parseInt(te(e.id))){var i=function(e,t){var n={start_date:U(t.start_date).replace(/\-/g,"/"),progress:P(t.progress,.01)};return"parent"in t&&null!=t.parent&&(n.parent=parseInt(te(t.parent))),"dependon"in t&&(n.dependon=t.dependon),se(e,n)}(u.description,e);if(null!=i){i=encodeURIComponent(i);var s=U(e.start_date),o=Y(s,e.duration),l=ze(r,t,te(e.id))+"&description="+i+"&due_date="+o;return Pe.a.put(l).then((function(t){n.message({text:"success update issue.  "+e.id})})).catch((function(e){return console.error(e),Promise.reject(e)}))}n.message({text:"failed update issue. "+e.text,type:"error"})}})).catch((function(e){n.message({text:"failed get GitLab issue. check your token.",type:"error"})}))},et=function(e,t){window.open(function(e,t){return N(e)?De(e)+Ie(e)+"/"+Le(e)+"/-/issues/"+t:null}(t,te(e)),"_blank")},tt=function(e,t){var n=M(new Date);null==e.parent&&(e.parent=0);var r={start_date:n,progress:.1,parent:parseInt(te(e.parent))},a=se("",r);a=encodeURIComponent(a),window.open(function(e){return N(e)?De(e)+Ie(e)+"/"+Le(e)+"/issues/new?issue[description]=":null}(t)+a,"_blank")},nt=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n,r,a){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N(t)){e.next=4;break}return e.abrupt("return",Promise.resolve());case 4:if(!he(t)){e.next=8;break}return e.abrupt("return",Ge(t,n,r,a));case 8:if(!Oe(t)&&null===we(t)){e.next=10;break}return e.abrupt("return",He(t,n,r,a));case 10:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),rt=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N(t)){e.next=4;break}return e.abrupt("return",Promise.resolve());case 4:if(!he(t)){e.next=8;break}return e.abrupt("return",Ze(t,n));case 8:if(!Oe(t)&&null===we(t)){e.next=10;break}return e.abrupt("return",Qe(t,n));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),at=function(){var e=Object(fe.a)(Object(de.a)().mark((function e(t,n){return Object(de.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N(t)){e.next=4;break}return e.abrupt("return",Promise.resolve());case 4:if(!he(t)){e.next=8;break}return e.abrupt("return",$e(t,n));case 8:if(!Oe(t)&&null===we(t)){e.next=10;break}return e.abrupt("return",Ke(t,n));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ut=function(e,t,n,r){return N(r)?he(r)?function(e,t,n,r){var a=ve(r,te(e.id));return Pe.a.get(a,{headers:{Authorization:"Bearer ".concat(t)},data:{}}).then((function(r){var u=r.data;null==Ue(u.body,e)?n.message({text:"failed update issue. "+e.text,type:"error"}):W(V(e),Ye(u.body,u))||Pe.a.post(a,{body:Ue(u.body,e)},{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){n.message({text:"success update issue.  "+e.id})})).catch((function(e){n.message({text:"failed update GitHub issue. check your token."+e,type:"error"})}))})).catch((function(e){n.message({text:"failed get GitHub issue. check your url."+e,type:"error"}),Ge(n,t,r)})),null}(e,t,n,r):Oe(r)||null!==we(r)?Xe(e,t,n,r):void 0:Promise.resolve()},it=function(e,t){if(!N(t))return Promise.resolve();he(t)?function(e,t){window.open(ye(t,te(e)),"_blank")}(e,t):(Oe(t)||null!==we(t))&&et(e,t)},st={currentZoom:"Days",git_url:"",token:"Tokens that have not yet been entered",labels:[],selected_labels:[],member_list:[],selected_assignee:{},issue:[],issue_columns:[],title:""},ot=function(e,t){switch(t.type){case"zoomChange":return Object(c.a)(Object(c.a)({},e),{},{currentZoom:lt(t.value)});case"gitURLChange":return pt(e,t);case"tokenChange":return Object(c.a)(Object(c.a)({},e),{},{token:gt(t.value)});case"labelChange":return Object(c.a)(Object(c.a)({},e),{},{labels:t.value});case"selectedLabelsChange":return Object(c.a)(Object(c.a)({},e),{},{selected_labels:ht(t.value.props,e.git_url,t.value.selected_labels,e.selected_assignee)});case"memberListChange":return Object(c.a)(Object(c.a)({},e),{},{member_list:bt(t.value)});case"selectedAssigneeChange":return Object(c.a)(Object(c.a)({},e),{},{selected_assignee:mt(t.value.props,e.git_url,e.selected_labels,t.value.selected_assignee)});case"openIssueAtBrowser":return ct(e,t);case"openNewIssueAtBrowser":return dt(e,t);case"updateIssueByAPI":return ft(e,t);case"setIssue":return Object(c.a)(Object(c.a)({},e),{},{issue:t.value});case"setStateFromURLQueryString":return _t(e,t.value.props,t.value.setValue);default:return e}},lt=function(e){return Object(O.bake_cookie)("zoom",e),e},ct=function(e,t){return it(t.value,e.git_url),e},dt=function(e,t){return function(e,t){if(!N(t))return null;he(t)?Ve(e,t):(Oe(t)||null!==we(t))&&tt(e,t)}(t.value,e.git_url),e},ft=function(e,t){return ut(t.value.gantt_task,e.token,t.value.gantt,e.git_url),e},pt=function(e,t){var n=ne(re(t.value.git_url));if(he(n))j.gantt.message({text:"Access GitHub.com"}),e.title=me(n);else if(Oe(n))j.gantt.message({text:"Access GitLab.com"}),e.title=Le(n);else if(null!==we(n))j.gantt.message({text:"Access Maybe GitLab.self-host"}),e.title=Le(n);else if(""!==n)return j.gantt.message({text:"Not a valid URL.",type:"error"}),null;return vt(t.value.props,n,e.selected_labels,t.value.selected_assignee),e.git_url=n,e},gt=function(e){return Object(O.bake_cookie)("git_token",e),e},ht=function(e,t,n,r){return vt(e,t,n,r),n},bt=function(e){return B(e)?e:[]},mt=function(e,t,n,r){return vt(e,t,n,r),r},vt=function(e,t,n,r){var a=new URLSearchParams(e.location.search);return a.set("giturl",t),a.set("labels",oe(n)),a.set("assignee",oe([r])),e.history.push({search:a.toString()}),null},_t=function(e,t,n){var r=new URLSearchParams(t.location.search);e.git_url=r.get("giturl");var a=ne(re(r.get("giturl")));he(a)?e.title=me(a):(Oe(a)||null!==we(a))&&(e.title=Le(a)),e.git_url=a;var u=le(r.get("labels"));B(u[0])&&"name"in u[0]&&""!==u[0].name&&(e.selected_labels=u);var i=le(r.get("assignee"));return B(i)&&(e.selected_assignee=i[0]),n("git_url",e.git_url),e},jt=Object(s.e)((function(e){var t=Object(r.useReducer)(ot,st),n=Object(o.a)(t,2),a=n[0],u=n[1],i=Object(l.a)({git_url:"",token:""}),s=i.register,c=i.setValue;return Object(r.useEffect)((function(){c("token",Object(O.read_cookie)("git_token")),u({type:"tokenChange",value:Object(O.read_cookie)("git_token")});var e=Object(O.read_cookie)("zoom");"Days"!=e&&"Weeks"!=e&&"Years"!=e||j.gantt.ext.zoom.setLevel(e),j.gantt.config.show_grid=Object(O.read_cookie)("menu_opened"),j.gantt.render()}),[]),Object(r.useEffect)((function(){u({type:"setStateFromURLQueryString",value:{props:e,setValue:c}})}),[e.location]),Object(r.useEffect)((function(){rt(a.git_url,a.token).then((function(e){u({type:"labelChange",value:e})})).catch((function(e){j.gantt.message({text:e,type:"error"})})),at(a.git_url,a.token).then((function(e){u({type:"memberListChange",value:e})})).catch((function(e){j.gantt.message({text:e,type:"error"})}))}),[a.git_url,a.token,a.selected_assignee]),Object(r.useEffect)((function(){nt(a.git_url,a.token,a.selected_labels,a.selected_assignee).then((function(e){u({type:"setIssue",value:e})})).catch((function(e){console.log("error")}))}),[a.git_url,a.token,a.selected_labels,a.selected_assignee]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(X,{title:a.title}),Object(w.jsx)("div",{className:"zoom-bar",children:Object(w.jsx)(A,{zoom:a.currentZoom,onZoomChange:function(e){return u({type:"zoomChange",value:e})},onGitURLChange:function(t){return u({type:"gitURLChange",value:{props:e,git_url:t}})},token:a.token,onTokenChange:function(e){return u({type:"tokenChange",value:e})},labels:a.labels,selected_labels:a.selected_labels,onSelectedLabelChange:function(t){return u({type:"selectedLabelsChange",value:{props:e,selected_labels:t}})},member_list:a.member_list,selected_assignee:a.selected_assignee,onSelectedAssigneeChange:function(t){return u({type:"selectedAssigneeChange",value:{props:e,selected_assignee:t}})},register:s})}),Object(w.jsx)("div",{className:"gantt-container",children:Object(w.jsx)(H,{zoom:a.currentZoom,git_url:a.git_url,token:a.token,selected_labels:a.selected_labels,selected_assignee:a.selected_assignee,issue:a.issue,openIssueAtBrowser:function(e){return u({type:"openIssueAtBrowser",value:e})},openNewIssueAtBrowser:function(e){return u({type:"openNewIssueAtBrowser",value:e})},updateIssueByAPI:function(e,t){return u({type:"updateIssueByAPI",value:{gantt_task:e,gantt:t}})}})})]})}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(Object(w.jsx)(i.a,{children:Object(w.jsx)(s.a,{render:function(e){return Object(w.jsx)(jt,{})}})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[240,1,2]]]);
//# sourceMappingURL=main.8e8a7975.chunk.js.map