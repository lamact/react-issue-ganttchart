import {
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  removeFirstSharp,
  replacePropertyInDescriptionString,
} from '../Common/Parser.js';
import {
  calculateDueDate,
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
  orgRound,
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
    duration: getGanttDuration(start_date, due_date),
    progress: getNumberFromDescriptionYaml(description, 'progress'),
    assignee: getGitHubAssignee(issue_info),
    parent: '#' + getNumberFromDescriptionYaml(description, 'parent'),
    description: description,
  };
  return gantt_task;
};

export const updateGitHubDescriptionStringFromGanttTask = (
  description,
  gantt_task
) => {
  const start_date_str = new Date(gantt_task.start_date)
    .toLocaleDateString('ja-JP')
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
  description = replacePropertyInDescriptionString(description, task);
  return description;
};
