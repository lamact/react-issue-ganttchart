import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';

export const attachEvent = (gantt, props) => {
  gantt.attachEvent('onTaskDblClick', (gantt_task_id, e) => {
    props.openIssueAtBrowser(gantt_task_id);
  });

  gantt.attachEvent('onTaskCreated', (gantt_task_id, e) => {
    props.openNewIssueAtBrowser(gantt_task_id);
  });

  gantt.attachEvent('onAfterTaskUpdate', (id, gantt_task) => {
    props.updateIssueByAPI(gantt_task, gantt);
  });

  gantt.attachEvent('onAfterTaskMove', (id, parent) => {
    let gantt_task = gantt.getTask(id);
    if ('parent' in gantt_task) {
      if (gantt_task.parent !== 0) {
        gantt_task.parent = parent;
        props.updateIssueByAPI(gantt_task, gantt);
      }
    }
  });

  // Custom QuickInfo
  // https://docs.dhtmlx.com/gantt/desktop__quick_info.html
  gantt.attachEvent('onQuickInfo', (id) => {
    let gantt_task = gantt.getTask(id);
    gantt.locale.labels.detail_button = 'DETAIL';
    gantt.$click.buttons.detail_button = (gantt_task_id) => {
      props.openIssueAtBrowser(gantt_task_id);
      return true;
    };

    gantt.ext.quickInfo.setContent({
      header: {
        title: '',
        date: ReactDOMServer.renderToStaticMarkup().toString(),
      },
      content: ReactDOMServer.renderToStaticMarkup(
        <div>
          <h3>{gantt_task.text}</h3>
          <ReactMarkdown>{gantt_task.description}</ReactMarkdown>
        </div>
      ).toString(),
      buttons: ['detail_button'],
    });
  });

  // Changing the displayed range dynamically
  // https://docs.dhtmlx.com/gantt/desktop__configuring_time_scale.html#range
  gantt.attachEvent('onTaskDrag', function (id, mode, task, original) {
    var state = gantt.getState();
    var minDate = state.min_date,
      maxDate = state.max_date;

    var scaleStep =
      gantt.date.add(new Date(), state.scale_step, state.scale_unit) -
      new Date();

    var showDate,
      repaint = false;
    if (mode == 'resize' || mode == 'move') {
      if (Math.abs(task.start_date - minDate) < scaleStep) {
        showDate = task.start_date;
        repaint = true;
      } else if (Math.abs(task.end_date - maxDate) < scaleStep) {
        showDate = task.end_date;
        repaint = true;
      }

      if (repaint) {
        gantt.render();
        gantt.showDate(showDate);
      }
    }
  });
};
