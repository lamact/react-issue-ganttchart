import axios from 'axios';
import moment from 'moment'
import {
  getStartDateFromBodyString,
  replaceStartDateInBodyString,
  getDueDateFromBodyString,
  replaceDueDateInBodyString,
  getProgressFromBodyString,
  replaceProgressInBodyString,
} from './Parser.js';
import {
  adjustGitLabAPIURL,
  updateGanttIssue,
} from './APIHelper.js';


export const getGitLabIssuesFromAPI = async (gantt, git_url, token) => {
  const url = adjustGitLabAPIURL(git_url) + '/issues?access_token=' + token;
  axios.get(url).then((res) => {
    res.data.map((info) => {
      console.log(info)


      let issue = {
        id: info.iid,
        text: info.title,
        start_date: new Date().toLocaleDateString("ja-JP"),
        duration: 1,
        progress: 0.1,
        unscheduled: true,
      }
      updateGanttIssue(issue,gantt);
      return null;
    });
  });
};