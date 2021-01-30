import axios from 'axios';
import {
  adjustGitHubAPIURL,
  adjustGitHubURL,
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper.js';
import { updateGanttIssue } from '../Common/CommonHelper.js';

export const getGitHubIssuesFromAPI = async (gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues';
  axios.get(url).then((res) => {
    res.data.map((issue_info) => {
      axios.get(url + '/' + issue_info.number).then((res) => {
        let gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        updateGanttIssue(gantt_task, gantt);
      });
      return null;
    });
  });
};

export const updateGitHubIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues/' + gantt_task.id;
  axios.get(url).then((res) => {
    let body = updateGitHubDescriptionStringFromGanttTask(res.data.body, gantt_task);
    axios.post(url, {
      body: body,
    }, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
      console.log("success update issue");
    }).catch((err) => {
      alert('failed update GitHub issue. check your token.');
      getGitHubIssuesFromAPI(gantt, git_url);
    });
  });
  return null;
};

export const openGitHubIssueAtBrowser = (gantt_task_id, git_url) => {
  window.open(adjustGitHubURL(git_url) + "/issues/" + gantt_task_id, "_blank");
};

export const openGitHubNewIssueAtBrowser = (gantt_task_id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(adjustGitHubURL(git_url) + "/issues/new?assignees=&labels=&title=&body=" + body, "_blank");
};