import React, { useReducer, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Toolbar from './components/Toolbar';
import Gantt from './components/Gantt';
import { read_cookie } from 'sfcookies';
import { withRouter } from 'react-router-dom';
import { initialState, reducerFunc } from './State/Reducer.js';
import {
  getIssuesFromAPI,
  setLabelListOfRepoFromAPI,
  setMemberListOfRepoFromAPI,
} from './functions/Common/IssueAPI.js';
import { gantt } from 'dhtmlx-gantt';

const App = (props) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { register, setValue } = useForm({ git_url: '', token: '' });

  useEffect(() => {
    setValue('token', read_cookie('git_token'));
    dispatch({ type: 'tokenChange', value: read_cookie('git_token') });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'setStateFromURLQueryString',
      value: { props: props, setValue: setValue },
    });
  }, [props.location]);

  useEffect(() => {
    setLabelListOfRepoFromAPI(state.git_url, state.token)
      .then((labels) => {
        dispatch({ type: 'labelChange', value: labels });
      })
      .catch((err) => {
        gantt.message({ text: err, type: 'error' });
      });
    setMemberListOfRepoFromAPI(state.git_url, state.token)
      .then((members) => {
        dispatch({ type: 'memberListChange', value: members });
      })
      .catch((err) => {
        gantt.message({ text: err, type: 'error' });
      });
  }, [state.git_url, state.token, state.selected_assignee]);

  useEffect(() => {
    //dispatch({ type: 'getIssueByAPI' });
    getIssuesFromAPI(
      state.git_url,
      state.token,
      state.selected_labels,
      state.selected_assignee
    )
      .then((issues) => {
        dispatch({ type: 'setIssue', value: issues });
      })
      .catch((err) => {
        console.log('error');
      });
  }, [
    state.git_url,
    state.token,
    state.selected_labels,
    state.selected_assignee,
    state.update,
  ]);

  return (
    <>
      <div className="zoom-bar">
        <Toolbar
          zoom={state.currentZoom}
          onZoomChange={(zoom) => dispatch({ type: 'zoomChange', value: zoom })}
          onGitURLChange={(git_url) =>
            dispatch({
              type: 'gitURLChange',
              value: { props: props, git_url: git_url },
            })
          }
          token={state.token}
          onTokenChange={(token) =>
            dispatch({ type: 'tokenChange', value: token })
          }
          onUpdateClick={() => dispatch({ type: 'updateClick' })}
          labels={state.labels}
          selected_labels={state.selected_labels}
          onSelectedLabelChange={(selected_labels) =>
            dispatch({
              type: 'selectedLabelsChange',
              value: { props: props, selected_labels: selected_labels },
            })
          }
          member_list={state.member_list}
          selected_assignee={state.selected_assignee}
          onSelectedAssigneeChange={(selected_assignee) =>
            dispatch({
              type: 'selectedAssigneeChange',
              value: { props: props, selected_assignee: selected_assignee },
            })
          }
          register={register}
        />
      </div>
      <div className="gantt-container">
        <Gantt
          zoom={state.currentZoom}
          git_url={state.git_url}
          token={state.token}
          selected_labels={state.selected_labels}
          selected_assignee={state.selected_assignee}
          issue={state.issue}
          update={state.update}
          openIssueAtBrowser={(gantt_task_id) =>
            dispatch({ type: 'openIssueAtBrowser', value: gantt_task_id })
          }
          openNewIssueAtBrowser={(gantt_task_id) =>
            dispatch({ type: 'openNewIssueAtBrowser', value: gantt_task_id })
          }
          updateIssueByAPI={(gantt_task, gantt) =>
            dispatch({
              type: 'updateIssueByAPI',
              value: { gantt_task: gantt_task, gantt: gantt },
            })
          }
        />
      </div>
    </>
  );
};

export default withRouter(App);
