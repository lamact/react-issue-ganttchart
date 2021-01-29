
const removeLastSlash = (git_url) => {
  let url = git_url;
  if (git_url.length > 1 && /\/$/.test(git_url)) {
    url = git_url.slice(0, -1);
  }
  return url;
}

const getGitLabNameSpaceFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitLabProjectFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

export const adjustGitLabAPIURL = (git_url) => {
  let url = removeLastSlash(git_url);
  return "https://gitlab.com/api/v4/projects/" + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url);
}

export const adjustGitLabURL = (git_url) => {
  let url = removeLastSlash(git_url);
  return "https://gitlab.com/" + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url);
}

const getGitHubNameSpaceFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitHubProjectFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

export const adjustGitHubAPIURL = (git_url) => {
  let url = removeLastSlash(git_url);
  return "https://api.github.com/repos/" + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url);
}

export const adjustGitHubURL = (git_url) => {
  let url = removeLastSlash(git_url);
  return "https://github.com/" + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url);
}

export const updateGanttIssue = (issue, gantt) => {
  let data = [];
  let links = [];
  data.push(issue);
  data = { data: data, links: links }
  gantt.parse(data);
  gantt.sort("start_date", false);
}