import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { getIssuesFromAPI } from '../../functions/Common/IssueAPI.js';
import { attachEvent } from './GanttAttachEvent.js';
import { setGanttTemplates } from './GanttTemplates.js';
import { setGanttConfig } from './GanttConfig.js';
import Table from '../Table';

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
    gantt.clearAll();
    getIssuesFromAPI(
      (data) => {
        gantt.parse(data);
        gantt.sort('start_date', false);
      },
      gantt,
      props.git_url,
      props.token,
      props.selected_labels,
      props.selected_assignee
    );
  }, [
    props.git_url,
    props.token,
    props.selected_labels,
    props.selected_assignee,
    props.update,
  ]);

  return (
    <div style={{ width: '100%', height: '80%', padding: '20px' }}>
      
      <div ref={containerRef} style={{ width: '100%', height: '50%' }}></div>
      
      {props.screen === 'Table' ? ( //ガントチャートとインシデント棚卸し画面の切替フラグはここで制御する
        <div style={{ width: '100%', height: '50%' }}>
          <Table
            data={gantt.getTaskByTime()}
          />
        </div>
        
      ) : (
        <div></div>
          
         )}
      </div>
  );
};

export default Gantt;
