import axios from 'axios';
import {
  adjustGitHubAPIURL,
  adjustGitHubURL,
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper.js';
import { updateGanttIssue } from '../Common/CommonHelper.js';

export const getGitHubIssuesFromAPI = async (gantt, git_url, selected_labels) => {
  let labels_url_str = "";
  if (selected_labels != null || selected_labels != []) {
    labels_url_str += "?labels="
    selected_labels.map((label) => {
      labels_url_str += label.name + ","
    });
  }
  const get_issue_list_url = adjustGitHubAPIURL(git_url) + '/issues' + labels_url_str;
  const get_single_issue_url = adjustGitHubAPIURL(git_url) + '/issues';

  axios.get(get_issue_list_url).then((res) => {
    res.data.map((issue_info) => {
      axios.get(get_single_issue_url + '/' + issue_info.number).then((res) => {
        let gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        updateGanttIssue(gantt_task, gantt);
      });
      return null;
    });
  });
};

export const setGitHubLabelListOfRepoFromAPI = async (_this, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/labels';
  axios.get(url).then((res) => {
    let label_list = [];
    res.data.map((lebel_info) => {
      label_list.push(lebel_info);
      return null;
    });
    _this.setState({ labels: label_list });
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