import {
  removeFirstSharp,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
  parseYamlFromDescription,
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
  if ('parent' in gantt_task) {
    task.parent = parseInt(removeFirstSharp(gantt_task.parent));
  }
  if ('dependon' in gantt_task) {
    task.dependon = gantt_task.dependon;
  }
  return replacePropertyInDescriptionString(description, task);
};

export const Arrangegantt = (issue_info) => {
  let arrangelink = [];
  issue_info.links.map((list) => {
    arrangelink.push({ type: list.type, target: list.target, source: list.source });
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
  }

  return arrange;
};

export const contentcheck = (Arrange, generate) => {
  if (
    Arrange.id == generate.id &&
    Arrange.text == generate.text &&
    Arrange.start_date == generate.start_date &&
    Arrange.due_date == generate.due_date.toString() &&
    Arrange.duration == generate.duration &&
    Arrange.progress == generate.progress &&
    Arrange.assignee == generate.assignee &&
    Arrange.description == generate.description &&
    Arrange.update == generate.update &&
    Arrange.parent == generate.parent &&
    JSON.stringify(Arrange.links) == JSON.stringify(generate.links)
  ) {
    console.log(JSON.stringify(Arrange.links));
    console.log(JSON.stringify(generate.links));
    return true;
  } else {
    return false;
  }
};
