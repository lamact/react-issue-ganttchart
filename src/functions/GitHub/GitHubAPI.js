import axios from 'axios';
import {
  getGitHubAPIURLIssuebyNumber,
  getGitHubAPIURLIssueFilterdLabel,
  getGitHubAPIURLLabel,
  getGitHubURLIssuebyNumber,
  getGitHubURLNewIssueWithTemplate,
  getGitHubAPIURLCollaborators,
} from './GitHubURLHelper.js';
import {
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper.js';
import {
  updateGanttIssue,
  isValidVariable,
} from '../Common/CommonHelper.js';

export const getGitHubIssuesFromAPI = async (gantt_parse, git_url, selected_labels) => {
  axios.get(getGitHubAPIURLIssueFilterdLabel(git_url, selected_labels)).then((res) => {
    res.data.map((issue_info) => {
      axios.get(getGitHubAPIURLIssuebyNumber(git_url, issue_info.number)).then((res) => {
        const gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        updateGanttIssue(gantt_task, gantt_parse);
      });
      return null;
    });
  });
};

export const setGitHubLabelListOfRepoFromAPI = async (setLabels, git_url, labels, token) => {
  setLabels([]);
    console.log("get " + token)
  if (isValidVariable(token) && token !== "Access Token") {
    console.log("get asignee")
    axios.get(getGitHubAPIURLCollaborators(git_url),
      { headers: { 'Authorization': `token ${token}` }, data: {} }
    ).then((res) => {
      let list = [];
      console.log(res.data)
      res.data.map((info) => {
        list.push({ id: info.id, name: info.login });
        return null;
      });
      setLabels(labels.concat(list));
    });
  } else {
    token = "";
  }
  axios.get(getGitHubAPIURLLabel(git_url)).then((res) => {
    let list = [];
    console.log(res.data)
    res.data.map((info) => {
      list.push(info);
      return null;
    });
    setLabels(labels.concat(list));
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
  window.open(getGitHubURLIssuebyNumber(git_url, gantt_task_id), "_blank");
};

export const openGitHubNewIssueAtBrowser = (gantt_task_id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(getGitHubURLNewIssueWithTemplate(git_url) + body, "_blank");
};