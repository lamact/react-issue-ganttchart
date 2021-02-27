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
import { date2string, isValidVariable } from '../Common/CommonHelper.js';
import {
  removeFirstSharp,
  replacePropertyInDescriptionString,
} from '../Common/Parser.js';

export const getGitHubIssueFromAPI = async (git_url, issue_info) => {
  return axios
    .get(getGitHubAPIURLIssuebyNumber(git_url, issue_info.number))
    .then((res) => {
      const gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
      return gantt_task;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getGitHubIssuesFromAPI = async (
  git_url,
  selected_labels,
  selected_assignee
) => {
  return axios
    .get(
      getGitHubAPIURLIssueFilterd(git_url, selected_labels, selected_assignee)
    )
    .then((res) => {
      const promise_list = [];
      res.data.map((issue_info) => {
        promise_list.push(getGitHubIssueFromAPI(git_url, issue_info));
      });
      return Promise.all(promise_list);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const setGitHubLabelListOfRepoFromAPI = async (git_url, token) => {
  return axios.get(getGitHubAPIURLLabel(git_url)).then((res) => {
    let labels = [];
    res.data.map((info) => {
      labels.push({ id: info.id, name: info.name });
      return null;
    });
    return labels;
  });
};

export const setGitHubMemberListOfRepoFromAPI = async (git_url, token) => {
  if (
    isValidVariable(token) &&
    token !== 'Tokens that have not yet been entered'
  ) {
    return axios
      .get(getGitHubAPIURLCollaborators(git_url), {
        headers: { Authorization: `token ${token}` },
        data: {},
      })
      .then((res) => {
        let members = [];
        res.data.map((info) => {
          members.push({ id: info.id, name: info.login });
          return null;
        });
        return members;
      });
  } else {
    console.warn('token is not valid!');
  }
};

export const updateGitHubIssueFromGanttTask = (
  gantt_task,
  token,
  gantt,
  git_url
) => {
  const url = getGitHubAPIURLIssuebyNumber(
    git_url,
    removeFirstSharp(gantt_task.id)
  );
  axios
    .get(url)
    .then((res) => {
      axios
        .post(
          url,
          {
            body: updateGitHubDescriptionStringFromGanttTask(
              res.data.body,
              gantt_task
            ),
          },
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        )
        .then((res) => {
          gantt.message({ text: 'success update issue.  ' + gantt_task.id });
        })
        .catch((err) => {
          gantt.message({
            text: 'failed update GitHub issue. check your token.',
            type: 'error',
          });
          getGitHubIssuesFromAPI(gantt, git_url);
        });
    })
    .catch((err) => {
      gantt.message({
        text: 'failed get GitHub issue. check your url.',
        type: 'error',
      });
      getGitHubIssuesFromAPI(gantt, git_url);
    });
  return null;
};

export const openGitHubIssueAtBrowser = (gantt_task_id, git_url) => {
  window.open(
    getGitHubURLIssuebyNumber(git_url, removeFirstSharp(gantt_task_id)),
    '_blank'
  );
};

export const openGitHubNewIssueAtBrowser = (gantt_task, git_url) => {
  const start_date_str = date2string(new Date());
  const due_date_str = date2string(new Date());
  if(gantt_task.parent==null){
    gantt_task.parent = 0;
  }
  const task = {
    start_date: start_date_str,
    due_date: due_date_str,
    progress: 0.1,
    parent: parseInt(removeFirstSharp(gantt_task.parent)),
  };
  let body = replacePropertyInDescriptionString('', task);
  body = encodeURIComponent(body);
  window.open(getGitHubURLNewIssueWithTemplate(git_url) + body, '_blank');
};
