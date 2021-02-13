import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import ReactMarkdown from 'react-markdown'
import ReactDOMServer from "react-dom/server";

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
    if (props.zoom === 'Days') {
      gantt.eachTask(function (task) {
        task.$open = true;
      });
    } else {
      gantt.eachTask(function (task) {
        task.$open = false;
      });
    }
    gantt.ext.zoom.setLevel(props.zoom);
  }, [props.zoom])

  useEffect(() => {
    gantt.clearAll();
    getIssuesFromAPI((data) => {
      gantt.parse(data);
      gantt.sort("start_date", false);
    }, gantt, props.git_url, props.token, props.selected_labels, props.selected_assignee);
  }, [props.git_url, props.token, props.selected_labels, props.selected_assignee, props.update])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
}

const zoom_level = {
  levels: [
    {
      name: 'Days',
      scale_height: 60,
      min_column_width: 70,
      scales: [
        { unit: 'day', step: 1, format: '%n/%d' }
      ]
    },
    {
      name: 'Weeks',
      scale_height: 60,
      min_column_width: 70,
      scales: [
        { unit: "month", step: 1, format: '%Y年 %n月' },
        { unit: 'week', step: 1, format: '%n/%d~' },
      ]
    }
  ]
};

const shortenDate = (date) => {
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  const shorten_date = m + "/" + d;
  return shorten_date;
}

const setGanttConfig = (gantt) => {
  gantt.config.xml_date = "%Y/%m/%d %H:%i";
  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;

  gantt.config.keep_grid_width = true;
  gantt.config.grid_resize = true;
  gantt.config.open_tree_initially = true;

  gantt.config.sort = true;

  gantt.config.columns = [
    { name: "wbs", label: "WBS", width: 40, template: gantt.getWBSCode },
    { name: "id", label: "No.", align: "left", tree: true, width: '*' },
    { name: "start_date", label: "Start ", align: "center", width: "100", template: (obj) => { return shortenDate(obj.start_date) } },
    { name: "due_date", label: "due ", align: "center", width: "100", template: (obj) => { return shortenDate(obj.due_date) } },
    { name: "assignee", label: "Assignee", align: "center", width: '150' },
    { name: "add", label: "" }
  ];

  gantt.templates.timeline_cell_class = function (item, date) {
    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
      return "today";
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return "weekend"
    }
  };

  gantt.templates.rightside_text = function(start, end, task){
    return task.text;
  };
  
  gantt.templates.task_text=function(start,end,task){
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + "% </span>";
  };

  
  gantt.plugins({
    quick_info: true,
    drag_timeline: true
  });
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
  gantt.attachEvent("onAfterTaskMove", (id, parent) => {
    let gantt_task = gantt.getTask(id)
    if ("parent" in gantt_task) {
      if (gantt_task.parent !== 0) {
        gantt_task.parent = parent;
        props.updateIssueByAPI(gantt_task, gantt);
      }
    }
  });
  gantt.attachEvent("onQuickInfo", (id) => {
    let gantt_task = gantt.getTask(id);
    gantt.locale.labels.detail_button = "DETAIL"
    gantt.$click.buttons.detail_button = (gantt_task_id) => {
      props.openIssueAtBrowser(gantt_task_id);
      return true;
    };

    gantt.ext.quickInfo.setContent({
      header: {
        title: "",
        date: ReactDOMServer.renderToStaticMarkup(
        ).toString(),
      },
      content: ReactDOMServer.renderToStaticMarkup(<div>
        <h3>{gantt_task.text}</h3>
        <ReactMarkdown>{gantt_task.description}</ReactMarkdown>
      </div>).toString(),
      buttons: ["detail_button"]
    });
  });

}
export default Gantt;