import { adjustURL } from '../Common/Parser.js';
import { isValidVariable, isValidIDName } from '../Common/CommonHelper.js';

const GitHubAPIURL = "https://api.github.com/repos/";
const GitHubURL = "https://github.com/";

export const isGitHubURL = (git_url) => {
  return /github\.com/.test(git_url);
}

const getGitHubNameSpaceFromGitURL = (git_url) => {
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitHubProjectFromGitURL = (git_url) => {
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

export const getGitHubAPIURLIssue = (git_url) => {
  const url = adjustURL(git_url);
  return GitHubAPIURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + '/issues';
}

export const getGitHubAPIURLIssuebyNumber = (git_url, number) => {
  const url = adjustURL(git_url);
  return GitHubAPIURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + '/issues/' + number;
}

export const getGitHubAPIURLIssueFilterd = (git_url, labels, assignee) => {
  let url_query_str = "";
  if (isValidVariable(labels)) {
    url_query_str += "?labels="
    labels.map((label) => {
      if (isValidIDName(label)) {
        url_query_str += label.name + ",";
      }
      return null;
    });
  }
  if (isValidIDName(assignee)) {
    if (assignee.name !== "") {
      url_query_str += "&assignee=" + assignee.name;
    }
  }
  const url = adjustURL(git_url);
  return GitHubAPIURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + '/issues' + url_query_str;
}

export const getGitHubAPIURLLabel = (git_url) => {
  const url = adjustURL(git_url);
  return GitHubAPIURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + '/labels';
}

export const getGitHubAPIURLCollaborators = (git_url) => {
  const url = adjustURL(git_url);
  return GitHubAPIURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + '/collaborators';
}

export const getGitHubURLIssuebyNumber = (git_url, number) => {
  const url = adjustURL(git_url);
  return GitHubURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url) + "/issues/" + number;
}

export const getGitHubURLNewIssueWithTemplate = (git_url) => {
  const url = adjustURL(git_url);
  return GitHubURL + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url)
    + "/issues/new?assignees=&labels=&title=&body=";
}