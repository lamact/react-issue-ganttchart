const zoom_level = {
  levels: [
    {
      name: 'Days',
      scale_height: 30,
      min_column_width: 25,
      scales: [
        { unit: 'month', step: 1, format: '%n' },
        { unit: 'day', step: 1, format: '%d' },
      ],
    },
    {
      name: 'Weeks',
      scale_height: 30,
      min_column_width: 70,
      scales: [{ unit: 'week', step: 1, format: '%n/%d~' }],
    },
  ],
};

const shortenDate = (date) => {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return null;
  }
  const m = ('00' + (date.getMonth() + 1)).slice(-2);
  const d = ('00' + date.getDate()).slice(-2);
  const shorten_date = m + '/' + d;
  return shorten_date;
};

export const setGanttConfig = (gantt) => {
  gantt.config.xml_date = '%Y/%m/%d %H:%i';
  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;

  gantt.config.keep_grid_width = true;
  gantt.config.grid_resize = true;
  gantt.config.open_tree_initially = true;
  gantt.config.fit_tasks = true;
  gantt.config.show_grid = false;
  gantt.config.sort = true;

  gantt.config.columns = [
    {
      name: 'id',
      label: 'No.',
      align: 'left',
      tree: true,
      width: '120',
      template: (obj) => {
        var befweek = new Date();
        befweek.setDate(befweek.getDate() - 7);
        if (obj.update < befweek.toLocaleDateString()) {
          return (
            obj.id +
            "<a title='There is no update for a week.'><span class='overdue'>i</span></a>"
          );
        }
        return obj.id;
      },
    },
    {
      name: 'start_date',
      label: 'Start ',
      align: 'center',
      width: '60',
      template: (obj) => {
        return shortenDate(obj.start_date);
      },
    },
    {
      name: 'due_date',
      label: 'Due ',
      align: 'center',
      width: '60',
      template: (obj) => {
        return shortenDate(obj.due_date);
      },
    },
    { name: 'assignee', label: 'Assignee', align: 'center', width: '130' },
    { name: 'add', label: '', width: '30' },
  ];

  gantt.plugins({
    // quick_info: true,
    drag_timeline: true,
  });
  gantt.showDate(new Date());
  gantt.ext.zoom.init(zoom_level);
};
