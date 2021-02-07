import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import {
  getIssuesFromAPI,
} from '../../functions/Common/IssueAPI.js';

const Gantt = (props) => {
  const containerRef = useRef(null);
  useEffect(() => {
    setGanttConfig(gantt);
    attachEvent(gantt, props);
    gantt.init(containerRef.current);
    gantt.ext.zoom.setLevel(props.zoom);
  }, [])

  useEffect(() => {
    gantt.ext.zoom.setLevel(props.zoom);
  }, [props.zoom])

  useEffect(() => {
    gantt.clearAll();
    getIssuesFromAPI((data) => {
      gantt.parse(data);
      gantt.sort("start_date", false);
    }, props.git_url, props.token, props.selected_labels, props.selected_assignee);
  }, [props.git_url, props.token, props.selected_labels, props.selected_assignee, props.update])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
}

  var daysStyle = function(date){
    var today = new Date();
    var yearToStr = gantt.date.date_to_str("%y");
    var monthToStr = gantt.date.date_to_str("%m");    
    var dayToStr = gantt.date.date_to_str("%d");
    var dateToStr = gantt.date.date_to_str("%D");
  if (yearToStr(today) == yearToStr(date) && monthToStr(today) == monthToStr(date) && dayToStr(today) == dayToStr(date))
    return "todayline";
    else if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  
    return "updColor";
    return "";
};


const zoom_level = {
  levels: [
    {
      name: 'Days',
      scale_height: 60,
      min_column_width: 70,
      scales: [
        { unit: 'week', step: 1, format: '%M, %d week' },
        { unit: 'day', step: 1, format: '%d %M',css:daysStyle }
      ]
    },
    {
      name: 'Weeks',
      scale_height: 60,
      min_column_width: 70,
      scales: [
        { unit: "month", step: 1, format: '%Y %F' },
        { unit: 'week', step: 1, format: '%M, %d week' },
      ]
    }
  ]
};

const setGanttConfig = (gantt) => {
  gantt.config.xml_date = "%Y/%m/%d %H:%i";
  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;

  gantt.config.keep_grid_width = true;
  gantt.config.grid_resize = true;

  gantt.config.sort = true;

  gantt.config.columns = [
    { name: "id", label: "No.", align: "left", tree: true, width: '*' },
    { name: "start_date", label: "Start ", align: "center", width: "90" },
    { name: "due_date", label: "due ", align: "center", width: "90" },
    { name: "assignee", label: "Assignee", align: "center", width: '160' },
    { name: "add", label: "" }
  ];

  gantt.ext.zoom.init(zoom_level);
}

const attachEvent = (gantt, props) => {
  gantt.attachEvent("onTaskDblClick", (gantt_task_id, e) => {
    props.openIssueAtBrowser(gantt_task_id);
  });
  gantt.attachEvent("onTaskCreated", (gantt_task_id, e) => {
    props.openNewIssueAtBrowser(gantt_task_id);
  });
  gantt.attachEvent("onAfterTaskUpdate", (id, gantt_task) => {
    props.updateIssueByAPI(gantt_task, gantt);
  });
}

export default Gantt;