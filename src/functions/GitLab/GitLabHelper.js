import {
  removeFirstSharp,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
} from '../Common/Parser.js';
import {
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
  orgRound,
} from '../Common/CommonHelper.js';

const getGitLabAssignee = (issue_info) => {
  if (issue_info.assignee !== null) {
    return issue_info.assignee.name;
  }
  return '';
};

export const generateGanttTaskFromGitLab = (issue_info) => {
  const start_date = getDateFromDescriptionYaml(
    issue_info.description,
    'start_date'
  );
  const due_date = new Date(issue_info.due_date).toLocaleDateString('ja-JP');
  const gantt_task = {
    id: '#' + issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getNumberFromDescriptionYaml(issue_info.description, 'progress'),
    assignee: getGitLabAssignee(issue_info),
    parent: getNumberFromDescriptionYaml(issue_info.description, 'parent'),
    description: issue_info.description,
  };
  return gantt_task;
};

export const updateGitLabDescriptionStringFromGanttTask = (
  description,
  gantt_task
) => {
  const start_date_str = new Date(gantt_task.start_date).toLocaleDateString(
    'ja-JP'
  ); 
  const task = {
    start_date: start_date_str,
    progress: orgRound(gantt_task.progress, 0.01),
  };
  if ('parent' in gantt_task) {
    task.parent = gantt_task.parent;
  }
  description = replacePropertyInDescriptionString(description, task);
  return encodeURIComponent(description);
};
