import React, { useReducer, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Toolbar from './components/Toolbar';
import Gantt from './components/Gantt';
import Table from './components/Table';
import { read_cookie } from 'sfcookies';
import { withRouter } from 'react-router-dom';
import { initialState, reducerFunc, setStateFromURLQueryString } from './State/Reducer.js';
import {
  getIssuesFromAPI,
  setLabelListOfRepoFromAPI,
  setMemberListOfRepoFromAPI,
} from './functions/Common/IssueAPI.js';
import { gantt } from 'dhtmlx-gantt';

const App = (props) => {
  const { register, setValue } = useForm({ git_url: '', token: '' });
  const [state, dispatch] = useReducer(reducerFunc, setStateFromURLQueryString(initialState, props, setValue));
  setValue('token', read_cookie('git_token'));
  
  useEffect(() => {
    if (state.initflag) {
      dispatch({
        type: 'setStateFromURLQueryString',
        value: { props: props, setValue: setValue },
      });
    } else {
      dispatch({ type: 'initFlagTrue' })
    }
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
    console.log("update"+state.update)
    getIssuesFromAPI(
      state.git_url,
      state.token,
      state.selected_labels,
      state.selected_assignee
    )
      .then((issues) => {
        dispatch({ type: 'handleGetIssueByAPI', value: issues });
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [
    state.token,
    state.git_url,
    state.selected_labels,
    state.selected_assignee,
    state.screen,
    state.update
  ]);

  return (
    <>
      <div>
        <Toolbar
          onScreenChange={(screen) => dispatch({ type: 'screenChange', value: screen })}
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
        <div>
          {state.screen === 'Gantt' ? ( //ガントチャートとインシデント棚卸し画面の切替フラグはここで制御する
            <div className="gantt-container">
              <Gantt
                git_url={state.git_url}
                token={state.token}
                selected_labels={state.selected_labels}
                selected_assignee={state.selected_assignee}
                issue={state.issue}
              update={state.update}
              ganttsetupflag={state.ganttsetupflag}
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
                ganttSetupFlagFalse={() =>
                  dispatch({type: 'ganttSetupFlagFalse'})
                }
              
            />
            </div>
          ) : (
            <div className="gantt-container">
              <Table
                issue={state.issue}
                issue_columns={state.issue_columns}
              />
            </div>
          )} 
        </div>
    </>
  );
};

export default withRouter(App);
