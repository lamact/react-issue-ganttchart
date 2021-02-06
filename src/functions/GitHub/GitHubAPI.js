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

export const getGitHubIssuesFromAPI = async (gantt_parse, git_url, selected_labels, selected_assignee) => {
  axios.get(getGitHubAPIURLIssueFilterd(git_url, selected_labels, selected_assignee)).then((res) => {
    res.data.map((issue_info) => {
      axios.get(getGitHubAPIURLIssuebyNumber(git_url, issue_info.number)).then((res) => {
        const gantt_task = generateGanttTaskFromGitHub(res.data.body, issue_info);
        updateGanttIssue(gantt_task, gantt_parse);
      });
      return null;
    });
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
  console.log(getGitHubURLIssuebyNumber(git_url, gantt_task_id))
  window.open(getGitHubURLIssuebyNumber(git_url, gantt_task_id), "_blank");
};

export const openGitHubNewIssueAtBrowser = (gantt_task_id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(getGitHubURLNewIssueWithTemplate(git_url) + body, "_blank");
};