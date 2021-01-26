import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import axios from 'axios';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import moment from 'moment'

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
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
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

  getStartDateFromBodyString(body) {
    let date_str = body.match(/start_date: \d{4}\-\d{1,2}\-\d{1,2}/)
    if (date_str == null) {
      return null;
    }
    date_str = date_str[0].match(/\d{4}\-\d{1,2}\-\d{1,2}/)[0];
    return new Date(date_str);
  }

  getDueDateFromBodyString(body) {
    let date_str = body.match(/due_date: \d{4}\-\d{1,2}\-\d{1,2}/);
    if (date_str == null) {
      return null;
    }
    date_str = date_str[0].match(/\d{4}\-\d{1,2}\-\d{1,2}/)[0];
    return new Date(date_str);
  }

  getGitHubIssues = async () => {
    const url = 'https://api.github.com/repos/lamact/react-issue-ganttchart/issues';
    axios.get(url).then((res) => {
      res.data.map((info) => {
        axios.get(url + '/' + info.number).then((res) => {
          let start_date = this.getStartDateFromBodyString(res.data.body);
          let due_date = this.getDueDateFromBodyString(res.data.body);
          let start_date_str, duration = null;
          if (start_date != null && due_date != null) {
            let start_date_moment = moment(start_date);
            let due_date_moment = moment(due_date);
            start_date_str = start_date.toLocaleDateString("ja-JP");
            duration = due_date_moment.diff(start_date_moment, 'days');
          } else {
            start_date_str = new Date(info.created_at).toLocaleDateString("ja-JP");
            console.log(start_date_str)
            duration = 1;
          }
          let issue = {
            id: info.id,
            text: info.title,
            start_date: start_date_str,
            duration: duration,
            progress: 0.1,
          }
          let data = [];
          let links = [];
          data.push(issue);
          data = { data: data, links: links }
          gantt.parse(data);
        });
      });
    });
  };

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {
    gantt.config.xml_date = "%Y/%m/%d %H:%i";
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;

    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    this.getGitHubIssues();
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
