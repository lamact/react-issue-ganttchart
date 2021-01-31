import axios from 'axios';
import {
  getGitHubAPIURLIssuebyNumber,
  getGitHubAPIURLIssueFilterdLabel,
  getGitHubAPIURLLabel,
  getGitHubURLIssuebyNumber,
  getGitHubURLNewIssueWithTemplate,
} from './GitHubURLHelper.js';
import {
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper.js';
import { updateGanttIssue } from '../Common/CommonHelper.js';

export const getGitHubIssuesFromAPI = async (gantt, git_url, selected_labels) => {
  axios.get(getGitHubAPIURLIssueFilterdLabel(git_url, selected_labels)).then((res) => {
    res.data.map((issue_info) => {
      axios.get(getGitHubAPIURLIssuebyNumber(git_url, issue_info.number)).then((res) => {
        const gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        updateGanttIssue(gantt_task, gantt);
      });
      return null;
    });
  });
};

export const setGitHubLabelListOfRepoFromAPI = async (_this, git_url) => {
  axios.get(getGitHubAPIURLLabel(git_url)).then((res) => {
    let label_list = [];
    res.data.map((lebel_info) => {
      label_list.push(lebel_info);
      return null;
    });
    _this.setState({ labels: label_list });
  });
};

export const updateGitHubIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {
  const url = getGitHubAPIURLIssuebyNumber(git_url, gantt_task.id);
  axios.get(url).then((res) => {
    axios.post(url, {
      body: updateGitHubDescriptionStringFromGanttTask(res.data.body, gantt_task),
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
  window.open(getGitHubURLIssuebyNumber(git_url,gantt_task_id), "_blank");
};

export const openGitHubNewIssueAtBrowser = (gantt_task_id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(getGitHubURLNewIssueWithTemplate(git_url)+body, "_blank");
};