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
    if (props.ganttsetupflag) {
      setGanttConfig(gantt);
      setGanttTemplates(gantt);
      attachEvent(gantt, props);
      gantt.ext.zoom.setLevel('Days');
      props.ganttSetupFlagFalse();
    }
    gantt.init(containerRef.current);
  }, []);

  useEffect(() => {
      try {
        gantt.clearAll();
        if (isValidVariable(props.issue)) {
          props.issue.map((issue) => {
            gantt.addTask(issue);
            if ('links' in issue) {
              issue.links.map((link) => {
                gantt.addLink(link);
                return null;
              });
            }
          });
          gantt.sort('due_date', false);
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
