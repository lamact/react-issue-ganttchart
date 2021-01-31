import { adjustURL } from '../Common/Parser.js';

const GitLabAPIURL = "https://gitlab.com/api/v4/projects/";
const GitLabURL = "https://gitlab.com/";

export const isGitLabURL = (git_url) => {
  return /gitlab\.com/.test(git_url);
}

const getGitLabNameSpaceFromGitURL = (git_url) => {
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitLabProjectFromGitURL = (git_url) => {
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

const postFixToken = (token) => {
  let post_fix_str = "";
  if (token !== null && token !== "") {
    post_fix_str += "?access_token=" + token + "&";
  } else {
    post_fix_str += "?";
  }
  return post_fix_str;
}

export const getGitLabAPIURLIssueFilterdLabel = (git_url, token, labels) => {
  let post_fix_str = postFixToken(token);
  if (labels !== null || labels !== []) {
    post_fix_str += "labels=";
    labels.map((label) => {
      post_fix_str += label.name + ","
      return null;
    });
  }
  const url = adjustURL(git_url);
  return GitLabAPIURL + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues' + post_fix_str;
}

export const getGitLabAPIURLIssue = (git_url, token, labels) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return GitLabAPIURL + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues' + post_fix_str;
}

export const getGitabAPIURLIssuebyNumber = (git_url, token, number) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return GitLabAPIURL + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues/' + number + post_fix_str;
}

export const getGitLabAPIURLLabel = (git_url, token) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return GitLabAPIURL + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/labels' + post_fix_str;
}

export const getGitLabURLIssuebyNumber = (git_url, number) => {
  const url = adjustURL(git_url);
  return GitLabURL + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url)+ "/-/issues/" + number;
}

export const getGitLabURLNewIssueWithTemplate = (git_url) => {
  const url = adjustURL(git_url);
  return GitLabURL + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url)
         + "/issues/new?issue[description]=";
}