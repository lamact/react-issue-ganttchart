import axios from 'axios';
import {
  getGitLabAPIURLIssueFilterd,
  getGitLabAPIURLIssue,
  getGitLabAPIURLLabel,
  getGitLabAPIURLMember,
  getGitabAPIURLIssuebyNumber,
  getGitLabURLIssuebyNumber,
  getGitLabURLNewIssueWithTemplate,
} from './GitLabURLHelper.js';
import {
  generateGanttTaskFromGitLab,
  updateGitLabDescriptionStringFromGanttTask,
} from './GitLabHelper.js';
import {
  calculateDueDate,
  updateGanttIssue,
} from '../Common/CommonHelper.js';
import { removeFirstSharp } from '../Common/Parser.js';

export const getGitLabIssuesFromAPI = async (gantt_parse, gantt, git_url, token, selected_labels, assignee) => {
  axios.get(getGitLabAPIURLIssueFilterd(git_url, token, selected_labels, assignee)).then((res) => {
    let data = [];
    let links = [];
    res.data.map((issue_info) => {
      const gantt_task = generateGanttTaskFromGitLab(issue_info);
      data.push(gantt_task);
      return null;
    });
    gantt_parse({ data: data, links: links });
  }).catch((err) => {
    gantt.message({ text: 'failed get GitLab issue. check your url or token.', type: 'error' })
  });
};

export const setGitLabLabelListOfRepoFromAPI = async (setLabels, git_url, token) => {
  axios.get(getGitLabAPIURLLabel(git_url, token)).then((res) => {
    let list = [];
    res.data.map((lebel_info) => {
      list.push(lebel_info);
      return null;
    });
    setLabels(list);
  });
};

export const setGitLabMemberListOfRepoFromAPI = async (setLabels, git_url, token) => {
  axios.get(getGitLabAPIURLMember(git_url, token)).then((res) => {
    let list = [];
    res.data.map((info) => {
      list.push({ id: info.id, name: info.name });
      return null;
    });
    setLabels(list);
  });
}

export const updateGitLabIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {
  axios.get(getGitLabAPIURLIssue(git_url, token)).then((res) => {
    res.data.map((issue_info) => {
      if (parseInt(issue_info.iid) === parseInt(removeFirstSharp(gantt_task.id))) {
        const description = updateGitLabDescriptionStringFromGanttTask(issue_info.description, gantt_task);
        const start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
        const due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
        const put_url = getGitabAPIURLIssuebyNumber(git_url, token, removeFirstSharp(gantt_task.id))
          + "&description=" + description
          + "&due_date=" + due_date_str;
        axios.put(put_url).then((res) => {
          gantt.message({ text: 'success update issue.  ' + gantt_task.id });
        }).catch((err) => {
          gantt.message({ text: 'failed update GitLab issue. check your token.', type: 'error' });
          getGitLabIssuesFromAPI(gantt, git_url);
        });
      }
      return null;
    });
  }).catch((err) => {
    gantt.message({ text: 'failed get GitLab issue. check your token.', type: 'error' });
    getGitLabIssuesFromAPI(gantt, git_url);
  });
  ;
};

export const openGitLabIssueAtBrowser = (id, git_url) => {
  window.open(getGitLabURLIssuebyNumber(git_url, removeFirstSharp(id)), "_blank");
};

export const openGitLabNewIssueAtBrowser = (gantt_task, git_url) => {
  let body = "";
  body += "start_date: " + new Date().toLocaleDateString("ja-JP") + "  \n";
  body += "progress: 0.1  \n";
  if ("parent" in gantt_task) {
    body += "parent: " + gantt_task.parent + "  \n";
  } else {
    body += "parent: #0  \n";
  }
  body = encodeURIComponent(body);
  window.open(getGitLabURLNewIssueWithTemplate(git_url) + body, "_blank");
};