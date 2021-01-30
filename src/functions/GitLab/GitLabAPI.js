import axios from 'axios';
import {
  adjustGitLabAPIURL,
  adjustGitLabURL,
  generateGanttTaskFromGitLab,
  updateGitLabDescriptionStringFromGanttTask,
} from './GitLabHelper.js';
import { 
  calculateDueDate,
  updateGanttIssue,
 } from '../Common/CommonHelper.js';

export const getGitLabIssuesFromAPI = async (gantt, git_url, token) => {
  const url = adjustGitLabAPIURL(git_url) + '/issues?access_token=' + token;
  axios.get(url).then((res) => {
    res.data.map((issue_info) => {
      let gantt_task = generateGanttTaskFromGitLab(issue_info);
      updateGanttIssue(gantt_task, gantt);
      return null;
    });
  });
};

export const updateGitLabIssueFromGanttTask = (gantt_task, token, gantt, git_url) => {

  const get_url = adjustGitLabAPIURL(git_url) + '/issues?access_token=' + token;
  axios.get(get_url).then((res) => {
    res.data.map((issue_info) => {
      if (issue_info.iid === gantt_task.id) {
        const description = updateGitLabDescriptionStringFromGanttTask(issue_info.description, gantt_task);
        let start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
        const due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
        console.log(due_date_str)
        const put_url = adjustGitLabAPIURL(git_url) + '/issues/' + gantt_task.id
          + "?access_token=" + token
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
  window.open(adjustGitLabURL(git_url) + "/-/issues/" + id, "_blank");
};

export const openGitLabNewIssueAtBrowser = (id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%20%20%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(adjustGitLabURL(git_url) + "/issues/new?issue[description]=" + body, "_blank");
};