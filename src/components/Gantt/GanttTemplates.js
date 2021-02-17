import {
  calculateDuration,
  calculateDueDate,
} from '../../functions/Common/CommonHelper.js';

export const setGanttTemplates = (gantt) => {
  gantt.templates.timeline_cell_class = function (item, date) {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return 'weekend';
    }
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date < yesterday) {
      return 'past_days';
    }
  };

  gantt.templates.rightside_text = function (start, end, task) {
    return task.text;
  };

  gantt.templates.task_text = function (start, end, task) {
    return (
      "<span style='text-align:left;'>" +
      Math.round(task.progress * 100) +
      '% </span>'
    );
  };

  gantt.templates.task_class = function (start, end, task) {
    if (
      new Date(
        calculateDueDate(
          start,
          (calculateDuration(start, end) + 1) * task.progress
        )
      ) < new Date()
    ) {
      return 'behind';
    }
  };
};
