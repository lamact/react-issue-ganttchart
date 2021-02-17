import React, { useReducer, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Toolbar from './components/Toolbar';
import Gantt from './components/Gantt';
import { read_cookie } from 'sfcookies';
import { withRouter } from 'react-router-dom';
import { initialState, reducerFunc } from './functions/State/Reducer.js';
import {
  setLabelListOfRepoFromAPI,
  setMemberListOfRepoFromAPI,
} from './functions/Common/IssueAPI.js';

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
    setLabelListOfRepoFromAPI(
      (labels) => {
        dispatch({ type: 'labelChange', value: labels });
      },
      state.git_url,
      state.token
    );
    setMemberListOfRepoFromAPI(
      (setMemberList) => {
        dispatch({ type: 'memberListChange', value: setMemberList });
      },
      state.git_url,
      state.token
    );
  }, [state.git_url, state.token, state.selected_assignee]);

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
