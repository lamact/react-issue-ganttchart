import {
  removeFirstSharp,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
  parseYamlFromDescription,
} from '../Common/Parser.js';
import {
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
  orgRound,
  adjustDateString,
  isValidVariable,
  getGanttUpdateDate,
} from '../Common/CommonHelper.js';

const getGitLabAssignee = (issue_info) => {
  if (isValidVariable(issue_info) && 'assignee' in issue_info) {
    if (isValidVariable(issue_info.assignee) && 'name' in issue_info.assignee) {
      return issue_info.assignee.name;
    }
  }
  return '';
};

export const generateGanttTaskFromGitLab = (issue_info) => {
  const start_date = getDateFromDescriptionYaml(
    issue_info.description,
    'start_date'
  );
  const due_date = adjustDateString(issue_info.due_date);
  const gantt_task = {
    id: '#' + issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getNumberFromDescriptionYaml(issue_info.description, 'progress'),
    assignee: getGitLabAssignee(issue_info),
    description: issue_info.description,
    update: getGanttUpdateDate(issue_info.created_at, issue_info.updated_at),
  };
  if (getNumberFromDescriptionYaml(issue_info.description, 'parent')) {
    gantt_task.parent = '#' + getNumberFromDescriptionYaml(issue_info.description, 'parent');
  }

  const yaml_struct = parseYamlFromDescription(issue_info.description);
  if (yaml_struct) {
    for (let [key, value] of Object.entries(yaml_struct)) {
      if (!(key in gantt_task)) {
        gantt_task[key] = value;
      }
    }
  }
  return gantt_task;
};

export const updateGitLabDescriptionStringFromGanttTask = (
  description,
  gantt_task
) => {
  const start_date_str = adjustDateString(gantt_task.start_date).replace(
    /\-/g,
    '/'
  );
  const task = {
    start_date: start_date_str,
    progress: orgRound(gantt_task.progress, 0.01),
  };
  if ('parent' in gantt_task) {
    task.parent = parseInt(removeFirstSharp(gantt_task.parent));
  }
  return replacePropertyInDescriptionString(description, task);
};
