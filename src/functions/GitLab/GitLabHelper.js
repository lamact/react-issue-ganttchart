import {
  removeFirstSharp,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
  getDependonFromDescriptionYaml,
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
  var gantt_task = {
    id: '#' + issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date, issue_info.created_at),
    progress: getNumberFromDescriptionYaml(issue_info.description, 'progress'),
    assignee: getGitLabAssignee(issue_info),
    description: issue_info.description,
    update: getGanttUpdateDate(issue_info.created_at, issue_info.updated_at),
    _parent: '#' + getNumberFromDescriptionYaml(issue_info.description, 'parent'),
  };

  let links = [];
  const link = generateLinkFromGitLab(issue_info);
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

export const generateLinkFromGitLab = (issue_info) => {
  const link = [];
  let dependon = [];
  dependon = getDependonFromDescriptionYaml(issue_info.description, 'dependon');
  if (dependon != null) {
    //let data = [];
    for (let i = 0; i < dependon.length; i++) {
      let data = [];
      data.type = '0';
      data.target = '#' + issue_info.iid;
      data.source = '#' + dependon[i];
      link.push(data);
    }
    return link;
  }
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
  task.parent = parseInt(removeFirstSharp(gantt_task.parent));

  if ('dependon' in gantt_task) {
    task.dependon = gantt_task.dependon;
  }
  return replacePropertyInDescriptionString(description, task);
};
