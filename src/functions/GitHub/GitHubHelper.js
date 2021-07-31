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
    parent: '#' + getNumberFromDescriptionYaml(description, 'parent'),
    description: description,
    update: getGanttUpdateDate(issue_info.created_at, issue_info.updated_at),
  };
  return gantt_task;
};

export const generateLinkFromGitHub = (issue_info) => {
  const link = [];
  let dependon = [];
  dependon = getDependonFromDescriptionYaml(issue_info.body, 'dependon');
  if (dependon != null) {
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
  if ('parent' in gantt_task) {
    task.parent = parseInt(removeFirstSharp(gantt_task.parent));
  }
  if ('dependon' in gantt_task) {
    task.dependon = gantt_task.dependon;
  }
  description = replacePropertyInDescriptionString(description, task);
  return description;
};

export const Arrangegantt = (issue_info) => {
  let arrangelink = [];
  issue_info.links.map((list) => {
    let prearrangelink = [];
    prearrangelink.type = list.type;
    prearrangelink.target = list.target;
    prearrangelink.source = list.source
    arrangelink.push(prearrangelink);
  });

  const arrange = {
    id: issue_info.id,
    text: issue_info.text,
    start_date: adjustDateString(issue_info.start_date),
    due_date: issue_info.due_date,
    duration: issue_info.duration,
    progress: issue_info.progress,
    assignee: issue_info.assignee,
    description: issue_info.description,
    update: issue_info.update,
    links: arrangelink,
    parent: '#' + issue_info.parent,
  }

  return arrange;
};

export const contentcheck = (Arrange, generate, links) => {
  if (
    Arrange.id == generate.id &&
    Arrange.text == generate.text &&
    Arrange.start_date == generate.start_date &&
    Arrange.due_date == generate.due_date.toString() &&
    Arrange.duration == generate.duration &&
    Arrange.progress == generate.progress &&
    Arrange.assignee == generate.assignee &&
    // Arrange.description == generate.description &&
    Arrange.update == generate.update &&
    Arrange.parent == generate.parent &&
    Arrange.links.toString() == links.toString()
  ) {
    return true;
  } else {
    return false;
  }
};