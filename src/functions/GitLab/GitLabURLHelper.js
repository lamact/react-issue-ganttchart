import { adjustURL } from '../Common/Parser.js';
import { isValidVariable, isValidIDName } from '../Common/CommonHelper.js';
import { isGitHubURL } from '../GitHub/GitHubURLHelper.js';

export const isGitLabURL = (git_url) => {
  return /gitlab\.com/.test(git_url);
}

export const getSelfHostingGitLabDomain = (git_url) => {
  if (isGitHubURL) {
    return null;
  }
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 3) {
    return split_git_url[2];
  }
  return null;
}

const switchGitLabDomain = (git_url) => {
  let gitlab_domain = null;
  const self_hosting_gitlab_domain = getSelfHostingGitLabDomain(git_url);
  if (self_hosting_gitlab_domain !== null) {
    gitlab_domain = "https://" + self_hosting_gitlab_domain + "/";
  }
  if (isGitLabURL(git_url)) {
    gitlab_domain = "https://gitlab.com/";
  }
  return gitlab_domain;
}

const getGitLabURL = (git_url) => {
  return switchGitLabDomain(git_url);
}

const getGitLabAPIURL = (git_url) => {
  return switchGitLabDomain(git_url) + "api/v4/projects/";
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
  if (isValidVariable(token) && token !== "Tokens that have not yet been entered") {
    post_fix_str += "?access_token=" + token + "&";
  } else {
    post_fix_str += "?";
  }
  return post_fix_str;
}

export const getGitLabAPIURLIssueFilterd = (git_url, token, labels, assignee) => {
  let post_fix_str = postFixToken(token);
  if (isValidVariable(labels)) {
    post_fix_str += "labels=";
    labels.map((label) => {
      if (isValidIDName(label)) {
        post_fix_str += label.name + ","
      }
      return null;
    });
  }
  if (isValidIDName(assignee)) {
    if (assignee.name !== "") {
      post_fix_str += "&assignee_id=" + assignee.id;
    }
  }
  const url = adjustURL(git_url);
  return getGitLabAPIURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues' + post_fix_str;
}

export const getGitLabAPIURLIssue = (git_url, token, labels) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return getGitLabAPIURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues' + post_fix_str;
}

export const getGitabAPIURLIssuebyNumber = (git_url, token, number) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return getGitLabAPIURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/issues/' + number + post_fix_str;
}

export const getGitLabAPIURLLabel = (git_url, token) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return getGitLabAPIURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/labels' + post_fix_str;
}

export const getGitLabAPIURLMember = (git_url, token) => {
  const post_fix_str = postFixToken(token);
  const url = adjustURL(git_url);
  return getGitLabAPIURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url) + '/members/all' + post_fix_str;
}

export const getGitLabURLIssuebyNumber = (git_url, number) => {
  const url = adjustURL(git_url);
  return getGitLabURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url) + "/-/issues/" + number;
}

export const getGitLabURLNewIssueWithTemplate = (git_url) => {
  const url = adjustURL(git_url);
  return getGitLabURL(git_url) + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url)
    + "/issues/new?issue[description]=";
}