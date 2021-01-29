import axios from 'axios';
import moment from 'moment'
import {
  getStartDateFromBodyString,
  replaceStartDateInBodyString,
  getDueDateFromBodyString,
  replaceDueDateInBodyString,
  getProgressFromBodyString,
  replaceProgressInBodyString,
} from './Parser.js';
import {
  adjustGitHubAPIURL,
  adjustGitHubURL,
  updateGanttIssue,
} from './APIHelper.js';


export const getGitHubIssuesFromAPI = async (gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues';
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
          duration = due_date_moment.diff(start_date_moment, 'days') + 1;
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
        updateGanttIssue(issue, gantt);
      });
      return null;
    });
  });
};

export const updateGitHubIssueFromAPI = (id, item, token, gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues/' + item.id;
  let start_date = new Date(item.start_date);
  let start_date_str = start_date.toLocaleDateString("ja-JP");
  let due_date = moment(start_date).add(item.duration - 1, 'd').toDate();
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
      getGitHubIssuesFromAPI(gantt, git_url);
    });
  });
  return null;
};

export const openGitHubIssueAtBrowser = (id, git_url) => {
  window.open(adjustGitHubURL(git_url) + "/issues/" + id, "_blank");
};

export const openGitHubNewIssueAtBrowser = (id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(adjustGitHubURL(git_url) + "/issues/new?assignees=&labels=&title=&body=" + body, "_blank");
};