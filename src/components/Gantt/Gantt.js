import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { attachEvent } from './GanttAttachEvent.js';
import { setGanttTemplates } from './GanttTemplates.js';
import { setGanttConfig } from './GanttConfig.js';
import { isValidVariable } from '../../functions/Common/CommonHelper.js';

const Gantt = (props) => {
  const containerRef = useRef(null);
  useEffect(() => {
    setGanttConfig(gantt);
    setGanttTemplates(gantt);
    attachEvent(gantt, props);
    gantt.init(containerRef.current);
    gantt.ext.zoom.setLevel(props.zoom);
  }, []);

  useEffect(() => {
    if (props.zoom === 'Days') {
      gantt.eachTask(function (task) {
        task.$open = true;
      });
    } else {
      gantt.eachTask(function (task) {
        task.$open = false;
      });
    }
    gantt.ext.zoom.setLevel(props.zoom);
  }, [props.zoom]);

  useEffect(() => {
    try {
      if (isValidVariable(props.issue) && props.issue.length != 0) {
        gantt.clearAll();
        // props.issue.map((issue) => {
        //   gantt.addTask(issue);
        // });
        props.issue.map((issue) => {
          gantt.addTask(issue);
          if ('links' in issue) {
            issue.links.map((link) => {
              console.log(link);
              gantt.addLink(link);
              return null;
            });
          }
        });


        gantt.sort('due_date', false);
        // gantt.render();
      }
    } catch (err) {
      gantt.message({ text: err, type: 'error' });
    }
  }, [
    props.issue,
  ]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
  );
};

export default Gantt;
