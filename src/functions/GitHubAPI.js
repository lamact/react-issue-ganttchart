import axios from 'axios';
import moment from 'moment'
import {
  getStartDateFromBodyString,
  getDueDateFromBodyString,
  replaceDueDateInBodyString,
  replaceStartDateInBodyString,
  getProgressFromBodyString,
  replaceProgressInBodyString,
} from './Parser.js';

const adjustGitHubURL = (git_url) => {
  let url = git_url;
  if (git_url.length > 1 && /\/$/.test(git_url)) {
    url = git_url.slice(0, -1);
  }
  return url;
}

const adjustGitHubAPIURL = (git_url) => {
  let url = adjustGitHubURL(git_url);
  let git_api_url = url;
  // insert api.
  if (url.length > 1 && !/api.github.com/.test(git_url)) {
    let index_of_github = url.indexOf('github');
    let https = url.slice(0, index_of_github);
    let github_com = url.slice(index_of_github);
    url = https + "api." + github_com;
  }
  // insert repos
  if (url.length > 1 && !/\/repos\//.test(git_url)) {
    let index_of_github_com = url.indexOf('github.com');
    let https_api_github_com_slash = url.slice(0, index_of_github_com+11);
    let rest_url = url.slice(index_of_github_com+11);
    git_api_url = https_api_github_com_slash + "repos/" + rest_url;
  }
  console.log(git_api_url)
  return git_api_url;
}

export const getGitHubIssuesFromAPI = async (gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues';
  axios.get(url).then((res) => {
    res.data.map((info) => {
      axios.get(url + '/' + info.number).then((res) => {
        let start_date = getStartDateFromBodyString(res.data.body);
        let due_date = getDueDateFromBodyString(res.data.body);
        let start_date_str, duration, unscheduled = null;
        if (start_date != null && due_date != null) {
          let start_date_moment = moment(start_date);
          let due_date_moment = moment(due_date);
          start_date_str = start_date.toLocaleDateString("ja-JP");
          duration = due_date_moment.diff(start_date_moment, 'days') + 1;
          unscheduled = false
        } else {
          start_date_str = new Date(info.created_at).toLocaleDateString("ja-JP");
          duration = 1;
          unscheduled = true
        }
        let progress = getProgressFromBodyString(res.data.body);
        if (progress == null) {
          progress = 0.1;
        }
        let issue = {
          id: info.number,
          text: info.title,
          start_date: start_date_str,
          duration: duration,
          progress: progress,
          unscheduled: unscheduled,
        }
        let data = [];
        let links = [];
        data.push(issue);
        data = { data: data, links: links }
        gantt.parse(data);
        gantt.sort("start_date", false);
      });
      return null;
    });
  });
};

export const updateGitHubIssueFromAPI = (id, item, token, gantt, git_url) => {
  const url = adjustGitHubAPIURL(git_url) + '/issues/' + item.id;
  let start_date = new Date(item.start_date);
  let start_date_str = start_date.toLocaleDateString("ja-JP");
  let due_date = moment(start_date).add(item.duration - 1, 'd').toDate();
  let due_date_str = due_date.toLocaleDateString("ja-JP");

  axios.get(url).then((res) => {
    let body = res.data.body;
    body = replaceProgressInBodyString(body, item.progress);
    body = replaceDueDateInBodyString(body, due_date_str);
    body = replaceStartDateInBodyString(body, start_date_str);

    axios.post(url, {
      body: body,
    }, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
      console.log("success update issue")
    }).catch((err) => {
      alert('failed update issue')
      getGitHubIssuesFromAPI(gantt, git_url);
    });
  });
  return null;
};

export const openGitHubIssueAtBrowser = (id, git_url) => {
  window.open(adjustGitHubURL(git_url) + "/issues/" + id, "_blank");
};

export const openGitHubNewIssueAtBrowser = (id, git_url) => {
  let body = "";
  body += "start_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "due_date:%20" + new Date().toLocaleDateString("ja-JP") + "%0D%0A";
  body += "progress:%200.1%0D%0A";
  window.open(adjustGitHubURL(git_url) + "/issues/new?assignees=&labels=&title=&body=" + body, "_blank");
};