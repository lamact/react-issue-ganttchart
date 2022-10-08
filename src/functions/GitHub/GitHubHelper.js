import {
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  removeFirstSharp,
  replacePropertyInDescriptionString,
  getDependonFromDescriptionYaml,
} from '../Common/Parser.js';
import {
  calculateDueDate,
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
  orgRound,
  adjustDateString,
  getGanttUpdateDate,
  isValidVariable,
} from '../Common/CommonHelper.js';

const getGitHubAssignee = (issue_info) => {
  if (issue_info.assignee !== null) {
    return issue_info.assignee.login;
  }
  return '';
};

export const generateGanttTaskFromGitHub = (description, issue_info) => {
  const start_date = getDateFromDescriptionYaml(description, 'start_date');
  const due_date = getDateFromDescriptionYaml(description, 'due_date');

  const gantt_task = {
    id: '#' + issue_info.number,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date, issue_info.created_at),
    progress: getNumberFromDescriptionYaml(description, 'progress'),
    assignee: getGitHubAssignee(issue_info),
    _parent: '#' + getNumberFromDescriptionYaml(description, 'parent'),
    description: description,
    update: getGanttUpdateDate(issue_info.created_at, issue_info.updated_at),
  };

  let links = [];
  const link = generateLinkFromGitHub(description, issue_info);
  if (typeof link != "undefined") {
    for (let i = 0; i < link.length; i++) {
      let prelink = {
        type: link[i].type,
        target: link[i].target,
        source: link[i].source,
      }
      links.push(prelink);
    }
  }
  gantt_task.links = links;

  return gantt_task;
};

export const generateLinkFromGitHub = (description, issue_info) => {
  const link = [];
  let dependon = [];
  dependon = getDependonFromDescriptionYaml(description, 'dependon');
  if (isValidVariable(dependon)) {
    //let data = [];
    for (let i = 0; i < dependon.length; i++) {
      let data = [];
      data.type = '0';
      data.target = '#' + issue_info.number;
      data.source = '#' + dependon[i];
      link.push(data);
    }
    return link;
  }
};

export const updateGitHubDescriptionStringFromGanttTask = (
  description,
  gantt_task
) => {
  const start_date_str = adjustDateString(gantt_task.start_date)
    .replace(/\-/g, '/');
  const due_date_str = calculateDueDate(
    start_date_str,
    gantt_task.duration
  ).replace(/\-/g, '/');
  const task = {
    start_date: start_date_str,
    due_date: due_date_str,
    progress: orgRound(gantt_task.progress, 0.01),
  };
  task.parent = parseInt(removeFirstSharp(gantt_task.parent));
  if ('dependon' in gantt_task) {
    task.dependon = gantt_task.dependon;
  }
  description = replacePropertyInDescriptionString(description, task);
  return description;
};
