import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import {
  getIssuesFromAPI,
  updateIssueByAPI,
  openIssueAtBrowser,
  openNewIssueAtBrowser,
} from '../../functions/Common/IssueAPI.js';

const Gantt = (props) => {
  const containerRef = useRef(null);
  useEffect(() => {
    setGanttConfig(gantt);
    attachEvent(gantt,props);
    gantt.init(containerRef.current);
    gantt.ext.zoom.setLevel(props.zoom);
    gantt.clearAll();
    getIssuesFromAPI((data) => {
      gantt.parse(data);
      gantt.sort("start_date", false);
    }, props.git_url, props.token, props.selected_labels);
  })

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
        { unit: 'week', step: 1, format: '%M, %d week' },
        { unit: 'day', step: 1, format: '%d %M' }
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

  gantt.config.show_unscheduled = true;
  gantt.config.sort = true;

  gantt.ext.zoom.init(zoom_level);
}

const attachEvent = (gantt,props) => {
  gantt.attachEvent("onTaskDblClick", (gantt_task_id, e) => {
    openIssueAtBrowser(gantt_task_id, props.git_url);
  });
  gantt.attachEvent("onTaskCreated", (gantt_task_id, e) => {
    openNewIssueAtBrowser(gantt_task_id, props.git_url);
  });
  gantt.attachEvent("onAfterTaskUpdate", (id, gantt_task) => {
    updateIssueByAPI(gantt_task, props.token, gantt, props.git_url);
  });
}

export default Gantt;