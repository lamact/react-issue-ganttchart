import axios from 'axios';
import {
  getGitHubAPIURLIssuebyNumber,
  getGitHubAPIURLIssueFilterd,
  getGitHubAPIURLLabel,
  getGitHubAPIURLCollaborators,
  getGitHubURLIssuebyNumber,
  getGitHubURLNewIssueWithTemplate,
} from './GitHubURLHelper.js';
import {
  generateGanttTaskFromGitHub,
  updateGitHubDescriptionStringFromGanttTask,
} from './GitHubHelper.js';
import {
  updateGanttIssue,
  isValidVariable,
} from '../Common/CommonHelper.js';
import { removeFirstSharp } from '../Common/Parser.js';

export const getGitHubIssuesFromAPI = async (gantt_parse, gantt, git_url, selected_labels, selected_assignee) => {
  axios.get(getGitHubAPIURLIssueFilterd(git_url, selected_labels, selected_assignee)).then((res) => {
    let data = [];
    let links = [];
    res.data.map((issue_info) => {
      axios.get(getGitHubAPIURLIssuebyNumber(git_url, issue_info.number)).then((res) => {
        const gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        data.push(gantt_task);
      });
      return null;
    });
    gantt_parse({ data: data, links: links });
  }).catch((err) => {
    gantt.message({ text: 'failed get GitHub issue. check your url or token.', type: 'error' })
  });
};

export const setGitHubLabelListOfRepoFromAPI = async (setLabels, git_url, token) => {
  axios.get(getGitHubAPIURLLabel(git_url)).then((res) => {
    let list = [];
    res.data.map((info) => {
      list.push({ id: info.id, name: info.name });
      return null;
    });
    setLabels(list);
  });
};

export const setGitHubMemberListOfRepoFromAPI = async (setLabels, git_url, token) => {
  if (isValidVariable(token) && token !== "Tokens that have not yet been entered") {
    axios.get(getGitHubAPIURLCollaborators(git_url),
      { headers: { 'Authorization': `token ${token}` }, data: {} }
    ).then((res) => {
      let list = [];
      res.data.map((info) => {
        list.push({ id: info.id, name: info.login });
        return null;
      });
      setLabels(list);
    });
  } else {
    console.warn("token is not valid!")
  };
}

export const updateGitHubIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {
  const url = getGitHubAPIURLIssuebyNumber(git_url, removeFirstSharp(gantt_task.id));
  axios.get(url).then((res) => {
    axios.post(url, {
      body: updateGitHubDescriptionStringFromGanttTask(res.data.body, gantt_task),
    }, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
      gantt.message({ text: 'success update issue.  ' + gantt_task.id });
    }).catch((err) => {
      gantt.message({ text: 'failed update GitHub issue. check your token.', type: 'error' });
      getGitHubIssuesFromAPI(gantt, git_url);
    });
  }).catch((err) => {
    gantt.message({ text: 'failed get GitHub issue. check your url.', type: 'error' });
    getGitHubIssuesFromAPI(gantt, git_url);
  });;
  return null;
};

export const openGitHubIssueAtBrowser = (gantt_task_id, git_url) => {
  window.open(getGitHubURLIssuebyNumber(git_url, removeFirstSharp(gantt_task_id)), "_blank");
};

export const openGitHubNewIssueAtBrowser = (gantt_task, git_url) => {
  let body = "";
  body += "start_date: " + new Date().toLocaleDateString("ja-JP") + "  \n";
  body += "due_date: " + new Date().toLocaleDateString("ja-JP") + "  \n";
  body += "progress: 0.1  \n";
  if ("parent" in gantt_task) {
    body += "parent: " + gantt_task.parent + "  \n";
  } else {
    body += "parent: #0  \n";
  }
  body = encodeURIComponent(body);
  window.open(getGitHubURLNewIssueWithTemplate(git_url) + body, "_blank");
};