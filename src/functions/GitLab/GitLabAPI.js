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

export const getGitLabIssuesFromAPI = async (gantt_parse, git_url, token, selected_labels, assignee) => {
  axios.get(getGitLabAPIURLIssueFilterd(git_url, token, selected_labels, assignee)).then((res) => {
    res.data.map((issue_info) => {
      const gantt_task = generateGanttTaskFromGitLab(issue_info);
      updateGanttIssue(gantt_task, gantt_parse);
      return null;
    });
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
      if (issue_info.iid === gantt_task.id) {
        const description = updateGitLabDescriptionStringFromGanttTask(issue_info.description, gantt_task);
        const start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
        const due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
        const put_url = getGitabAPIURLIssuebyNumber(git_url, token, gantt_task.id)
          + "&description=" + description
          + "&due_date=" + due_date_str;
        axios.put(put_url).then((res) => {
          console.log("success update issue")
        }).catch((err) => {
          alert('failed update GitLab issue. check your token.')
          getGitLabIssuesFromAPI(gantt, git_url);
        });
      }
      return null;
    });
  });
};

export const openGitLabIssueAtBrowser = (id, git_url) => {
  window.open(getGitLabURLIssuebyNumber(git_url, id), "_blank");
};

export const openGitLabNewIssueAtBrowser = (id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%20%20%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(getGitLabURLNewIssueWithTemplate(git_url) + body, "_blank");
};