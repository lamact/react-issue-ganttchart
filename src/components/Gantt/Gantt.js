import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import {
  getIssuesFromAPI,
  updateIssueByAPI,
  openIssueAtBrowser,
  openNewIssueAtBrowser,
} from '../../functions/Common/IssueAPI.js';

export default class Gantt extends Component {

  constructor(props) {
    super(props);
    this.initZoom();
  }

  // instance of gantt.dataProcessor
  dataProcessor = null;

  initZoom() {
    gantt.ext.zoom.init({
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
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%Y %F' },
            { unit: 'week', step: 1, format: '%M, %d week' },
          ]
        }
      ]
    });
  }

  setZoom(value) {
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        // resolve({id: databaseId});
        return resolve();
      });
    });
  }

  updateGantt() {
    getIssuesFromAPI(gantt, this.props.git_url, this.props.token);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {
    gantt.config.xml_date = "%Y/%m/%d %H:%i";
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;

    gantt.config.keep_grid_width = true;
    gantt.config.grid_resize = true;

    gantt.config.show_unscheduled = true;
    gantt.config.sort = true;

    gantt.attachEvent("onTaskDblClick", (gantt_task, e) => {
      openIssueAtBrowser(gantt_task, this.props.git_url);
    });

    gantt.attachEvent("onTaskCreated", (gantt_task, e) => {
      openNewIssueAtBrowser(gantt_task, this.props.git_url);
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, gantt_task) => {
      console.log(gantt_task)
      updateIssueByAPI(gantt_task, this.props.token, gantt, this.props.git_url);
    });

    gantt.attachEvent("onScaleClick", (id, row) => {
      console.log(id)
    });

    gantt.attachEvent("onEmptyClick", (e) => {
      
    });
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    this.updateGantt();
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
