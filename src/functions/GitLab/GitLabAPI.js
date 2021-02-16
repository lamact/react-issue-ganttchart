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
  updateGitLabDescriptionStringFromGanttTask,
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
  gantt_parse,
  gantt,
  git_url,
  token,
  selected_labels,
  assignee
) => {
  axios
    .get(getGitLabAPIURLIssueFilterd(git_url, token, selected_labels, assignee))
    .then((res) => {
      let data = [];
      let links = [];
      res.data.map((issue_info) => {
        const gantt_task = generateGanttTaskFromGitLab(issue_info);
        data.push(gantt_task);
        return null;
      });
      gantt_parse({ data: data, links: links });
    })
    .catch((err) => {
      // gantt.message({
      //   text: 'failed get GitLab issue. check your url or token.'+ err,
      //   type: 'error',
      // });
      console.error(err)
    });
};

export const setGitLabLabelListOfRepoFromAPI = async (
  setLabels,
  git_url,
  token
) => {
  axios.get(getGitLabAPIURLLabel(git_url, token)).then((res) => {
    let list = [];
    res.data.map((lebel_info) => {
      list.push(lebel_info);
      return null;
    });
    setLabels(list);
  });
};

export const setGitLabMemberListOfRepoFromAPI = async (
  setLabels,
  git_url,
  token
) => {
  axios.get(getGitLabAPIURLMember(git_url, token)).then((res) => {
    let list = [];
    res.data.map((info) => {
      list.push({ id: info.id, name: info.name });
      return null;
    });
    setLabels(list);
  });
};

export const updateGitLabIssueFromGanttTask = (
  gantt_task,
  token,
  gantt,
  git_url
) => {
  axios
    .get(
      getGitabAPIURLIssuebyNumber(
        git_url,
        token,
        removeFirstSharp(gantt_task.id)
      )
    )
    .then((res) => {
      const issue_info = res.data;
      if (
        parseInt(issue_info.iid) === parseInt(removeFirstSharp(gantt_task.id))
      ) {
        let description = updateGitLabDescriptionStringFromGanttTask(
          issue_info.description,
          gantt_task
        );
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
        axios
          .put(put_url)
          .then((res) => {
            gantt.message({ text: 'success update issue.  ' + gantt_task.id });
          })
          .catch((err) => {
            gantt.message({
              text: 'failed update GitLab issue. check your token.',
              type: 'error',
            });
            getGitLabIssuesFromAPI(gantt, git_url);
          });
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
  const task = {
    start_date: start_date_str,
    progress: 0.1,
    parent: parseInt(removeFirstSharp(gantt_task.parent)),
  };
  let body = replacePropertyInDescriptionString('', task);
  body = encodeURIComponent(body);
  window.open(getGitLabURLNewIssueWithTemplate(git_url) + body, '_blank');
};
