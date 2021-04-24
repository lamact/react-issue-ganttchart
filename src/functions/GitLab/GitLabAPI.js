import axios from 'axios';
import {
  getGitLabAPIURLIssueFilterd,
  getGitLabAPIURLLabel,
  getGitLabAPIURLMember,
  getGitabAPIURLIssuebyNumber,
  getGitLabURLIssuebyNumber,
  getGitLabURLNewIssueWithTemplate,
} from './GitLabURLHelper.js';
import {
  generateGanttTaskFromGitLab,
  generateLinkFromGitLab,
  updateGitLabDescriptionStringFromGanttTask,
  Arrangegantt,
  contentcheck,
} from './GitLabHelper.js';
import {
  adjustDateString,
  calculateDueDate,
  date2string,
} from '../Common/CommonHelper.js';
import {
  removeFirstSharp,
  replacePropertyInDescriptionString,
} from '../Common/Parser.js';

export const getGitLabIssuesFromAPI = async (
  git_url,
  token,
  selected_labels,
  assignee
) => {
  return axios
    .get(getGitLabAPIURLIssueFilterd(git_url, token, selected_labels, assignee))
    .then((res) => {
      let data = [];
      res.data.map((issue_info) => {
        const gantt_task = generateGanttTaskFromGitLab(issue_info);

        data.push(gantt_task);
      });
      return data;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const setGitLabLabelListOfRepoFromAPI = async (git_url, token) => {
  return axios
    .get(getGitLabAPIURLLabel(git_url, token))
    .then((res) => {
      let labels = [];
      res.data.map((lebel_info) => {
        labels.push(lebel_info);
        return null;
      });
      return labels;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const setGitLabMemberListOfRepoFromAPI = async (git_url, token) => {
  return axios
    .get(getGitLabAPIURLMember(git_url, token))
    .then((res) => {
      let members = [];
      res.data.map((info) => {
        members.push({ id: info.id, name: info.name });
        return null;
      });
      return members;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const updateGitLabIssueFromGanttTask = (
  gantt_task,
  token,
  gantt,
  git_url
) => {
  return axios
    .get(
      getGitabAPIURLIssuebyNumber(
        git_url,
        token,
        removeFirstSharp(gantt_task.id)
      )
    )
    .then((res) => {
      const issue_info = res.data;
      if (contentcheck(Arrangegantt(gantt_task),generateGanttTaskFromGitLab(issue_info))!=true) {
        if (
          parseInt(issue_info.iid) === parseInt(removeFirstSharp(gantt_task.id))
        ) {
          let description = updateGitLabDescriptionStringFromGanttTask(
            issue_info.description,
            gantt_task
          );
          if (description == null) {
            gantt.message({
              text: 'failed update issue. ' + gantt_task.text,
              type: 'error',
            });
          } else {
            description = encodeURIComponent(description);
            const start_date_str = adjustDateString(gantt_task.start_date);
            const due_date_str = calculateDueDate(
              start_date_str,
              gantt_task.duration
            );
            const put_url =
              getGitabAPIURLIssuebyNumber(
                git_url,
                token,
                removeFirstSharp(gantt_task.id)
              ) +
              '&description=' +
              description +
              '&due_date=' +
              due_date_str;
            return axios
              .put(put_url)
              .then((res) => {
                gantt.message({
                  text: 'success update issue.  ' + gantt_task.id,
                });
              })
              .catch((err) => {
                console.error(err);
                return Promise.reject(err);
              });
          }
        }
      }
    })
    .catch((err) => {
      gantt.message({
        text: 'failed get GitLab issue. check your token.',
        type: 'error',
      });
    });
};

export const openGitLabIssueAtBrowser = (id, git_url) => {
  window.open(
    getGitLabURLIssuebyNumber(git_url, removeFirstSharp(id)),
    '_blank'
  );
};

export const openGitLabNewIssueAtBrowser = (gantt_task, git_url) => {
  const start_date_str = date2string(new Date());
  if (gantt_task.parent == null) {
    gantt_task.parent = 0;
  }
  const task = {
    start_date: start_date_str,
    progress: 0.1,
    parent: parseInt(removeFirstSharp(gantt_task.parent)),
  };
  let body = replacePropertyInDescriptionString('', task);
  body = encodeURIComponent(body);
  window.open(getGitLabURLNewIssueWithTemplate(git_url) + body, '_blank');
};
