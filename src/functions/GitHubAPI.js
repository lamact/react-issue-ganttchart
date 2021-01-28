import axios from 'axios';
import moment from 'moment'
import {
  getStartDateFromBodyString,
  getDueDateFromBodyString,
  replaceDueDateInBodyString,
  replaceStartDateInBodyString,
  getProgressFromBodyString,
  replaceProgressInBodyString,
} from './Parser.js';

export const getGitHubIssues = async (gantt) => {
    const url = 'https://api.github.com/repos/lamact/react-issue-ganttchart/issues';
    axios.get(url).then((res) => {
      res.data.map((info) => {
        axios.get(url + '/' + info.number).then((res) => {
          let start_date = getStartDateFromBodyString(res.data.body);
          let due_date = getDueDateFromBodyString(res.data.body);
          let start_date_str, duration, unscheduled = null;
          if (start_date != null && due_date != null) {
            let start_date_moment = moment(start_date);
            let due_date_moment = moment(due_date);
            start_date_str = start_date.toLocaleDateString("ja-JP");
            duration = due_date_moment.diff(start_date_moment, 'days')+1;
            unscheduled = false
          } else {
            start_date_str = new Date(info.created_at).toLocaleDateString("ja-JP");
            duration = 1;
            unscheduled = true
          }
          let progress = getProgressFromBodyString(res.data.body);
          if (progress == null) {
            progress = 0.1;
          } 
          let issue = {
            id: info.number,
            text: info.title,
            start_date: start_date_str,
            duration: duration,
            progress: progress,
            unscheduled: unscheduled,
          }
          let data = [];
          let links = [];
          data.push(issue);
          data = { data: data, links: links }
          gantt.parse(data);
          gantt.sort("start_date", false);
        });
        return null;
      });
    });
  };

  export const updateGitHubIssue = (id, item, token, gantt) => {
    const url = 'https://api.github.com/repos/lamact/react-issue-ganttchart/issues/' + item.id;
    let start_date = new Date(item.start_date);
    let start_date_str = start_date.toLocaleDateString("ja-JP");
    let due_date = moment(start_date).add(item.duration-1, 'd').toDate();
    let due_date_str = due_date.toLocaleDateString("ja-JP");

    axios.get(url).then((res) => {
      let body = res.data.body;
      body = replaceProgressInBodyString(body, item.progress);
      body = replaceDueDateInBodyString(body, due_date_str);
      body = replaceStartDateInBodyString(body, start_date_str);

      axios.post(url, {
        body: body,
      }, {
        headers: {
          'Authorization': `token ${token}`
        }
      }).then((res) => {
        console.log("success update issue")
      }).catch((err) => {
        alert('failed update issue')
        getGitHubIssues(gantt);
      });
    });
    return null;
  };

  export const linkGitHubIssue = (id, e) => {
    window.open("https://github.com/lamact/react-issue-ganttchart/issues/" + id, "_blank");
  };

  export const linkGitHubNewIssue = (id, e) => {
    let body = "";
    body += "start_date:%20"+new Date().toLocaleDateString("ja-JP")+"%0D%0A";
    body += "due_date:%20"+new Date().toLocaleDateString("ja-JP")+"%0D%0A";
    body += "progress:%200.1%0D%0A";
    window.open("https://github.com/lamact/react-issue-ganttchart/issues/new?assignees=&labels=&title=&body="+body, "_blank");
    console.log(e)
  };