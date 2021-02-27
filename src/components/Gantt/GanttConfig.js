const zoom_level = {
  levels: [
    {
      name: 'Days',
      scale_height: 60,
      min_column_width: 70,
      scales: [{ unit: 'day', step: 1, format: '%n/%d' }],
    },
    {
      name: 'Weeks',
      scale_height: 60,
      min_column_width: 70,
      scales: [
        { unit: 'month', step: 1, format: '%Y年 %n月' },
        { unit: 'week', step: 1, format: '%n/%d~' },
      ],
    },
  ],
};

const shortenDate = (date) => {
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

  gantt.config.sort = true;

  gantt.config.columns = [
       { name: 'wbs', 
      label: 'WBS', 
      width: 80, 
     template:(obj) => {
	    var befweek=new Date();
        befweek.setDate(befweek.getDate() - 7);
        var wbscode = gantt.getWBSCode(gantt.getTask(obj.id));
        console.log(obj.update+" < "+befweek.toLocaleDateString())
        if (obj.update < befweek.toLocaleDateString()) {
        var mark="<a title='There is no update for a week.'><span class='overdue'>i</span></a>";
        return wbscode+mark;
    }
        return wbscode;
      },
      
    },
    { name: 'id', label: 'No.', align: 'left', tree: true, width: '*' },
    {
      name: 'start_date',
      label: 'Start ',
      align: 'center',
      width: '100',
      template: (obj) => {
        return shortenDate(obj.start_date);
      },
    },
    {
      name: 'due_date',
      label: 'due ',
      align: 'center',
      width: '100',
      template: (obj) => {
        return shortenDate(obj.due_date);
      },
    },
    { name: 'assignee', label: 'Assignee', align: 'center', width: '150' },
    { name: 'add', label: '' },
  ];

  gantt.plugins({
    quick_info: true,
    drag_timeline: true,
  });

  gantt.ext.zoom.init(zoom_level);
};
