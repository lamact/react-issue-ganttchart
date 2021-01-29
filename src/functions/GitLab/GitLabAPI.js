import axios from 'axios';
import {
  adjustGitLabAPIURL,
  adjustGitLabURL,
  generateGanttTaskFromGitLab,
} from './GitLabHelper.js';
import { updateGanttIssue } from '../Common/CommonHelper.js';
import { updateBodyStringFromGanttTask } from '../Common/Parser.js';

export const getGitLabIssuesFromAPI = async (gantt, git_url, token) => {
  const url = adjustGitLabAPIURL(git_url) + '/issues?access_token=' + token;
  axios.get(url).then((res) => {
    res.data.map((issue_info) => {
      console.log(issue_info)
      let gantt_task = generateGanttTaskFromGitLab(issue_info);
      updateGanttIssue(gantt_task, gantt);
      return null;
    });
  });
};

export const updateGitLabIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {
  const url = adjustGitLabAPIURL(git_url) + '/issues/' + gantt_task.id;
  axios.get(url).then((res) => {
    let body = updateBodyStringFromGanttTask(res.data.body, gantt_task);
    axios.post(url, {
      body: body,
    }, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
      console.log("success update issue")
    }).catch((err) => {
      alert('failed update GitLab issue. check your token.')
      getGitLabIssuesFromAPI(gantt, git_url);
    });
  });
  return null;
};

export const openGitLabIssueAtBrowser = (id, git_url) => {
  window.open(adjustGitLabURL(git_url) + "/-/issues/" + id, "_blank");
};

export const openGitLabNewIssueAtBrowser = (id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(adjustGitLabURL(git_url) + "/issues/new?issue[description]=" + body, "_blank");
};