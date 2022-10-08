import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';
import {
  calculateStartDate,
  calculateDueDate,
} from '../../functions/Common/CommonHelper';

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

  gantt.attachEvent('onBeforeTaskUpdate', (id, mode, gantt_task) => {
  });

  gantt.attachEvent('onAfterTaskMove', (id, parent) => {
    let gantt_task = gantt.getTask(id);
    // gantt_task._parent = parent;
    props.updateIssueByAPI(gantt_task, gantt);
  });

  gantt.attachEvent("onAfterLinkAdd", function (id, item) {
    let afterlinkId = [];
    let afterlink = [];
    let addobj = item.target;
    let taskObj = gantt.getTask(addobj);
    let target = taskObj.$target;
    target.forEach(function (linkId) {
      let link = gantt.getLink(linkId);
      let linkid = link.target;
      let linkIds = link.source;
      afterlink.push({ type: '0', target: linkid, source: linkIds });
      let relinkIds = linkIds.slice(1);
      if (relinkIds != '') {
        afterlinkId.push(relinkIds);
      }
    });
    // let linkids = afterlinkId.join(',');
    // gantt.getTask(addobj).dependon = linkids; //changes task's data
    // gantt.updateTask(addobj); //renders the updated task
    gantt.getTask(addobj).dependon = afterlinkId;
    gantt.getTask(addobj).links = afterlink;
    gantt.updateTask(addobj);
  });

  gantt.attachEvent("onAfterLinkDelete", function (id, item) {
    let afterlinkId = [];
    let afterlink = [];
    let addobj = item.target;
    let taskObj = gantt.getTask(addobj);
    let target = taskObj.$target;
    target.forEach(function (linkId) {
      let link = gantt.getLink(linkId);
      let linkid = link.target;
      let linkIds = link.source;
      afterlink.push({ type: '0', target: linkid, source: linkIds });
      let relinkIds = linkIds.slice(1);
      if (relinkIds != '') {
        afterlinkId.push(relinkIds);
      }
    });
    // let linkids = afterlinkId.join(',');
    // gantt.getTask(addobj).dependon = linkids; //changes task's data
    // gantt.updateTask(addobj); //renders the updated task
    gantt.getTask(addobj).dependon = afterlinkId;
    gantt.getTask(addobj).links = afterlink;
    gantt.updateTask(addobj);
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
        title: '<h3>Description</h3>',
        // date: ReactDOMServeSr.renderToStaticMarkup().toString(),
      },
      content: ReactDOMServer.renderToStaticMarkup(
        <div>
          <h3>{gantt_task.text}</h3>
          <ReactMarkdown children={gantt_task.description} />
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
