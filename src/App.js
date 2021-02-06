import React, { useReducer, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Toolbar from './components/Toolbar';
import Gantt from './components/Gantt';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { withRouter } from 'react-router-dom';
import { setLabelListOfRepoFromAPI } from './functions/Common/IssueAPI.js';
import { convertLabelsListToString, convertLabelsStringToList } from './functions/Common/Parser.js';
import {
  updateIssueByAPI,
  openIssueAtBrowser,
  openNewIssueAtBrowser,
} from './functions/Common/IssueAPI.js';

const initialState = {
  currentZoom: 'Weeks',
  update: 0,
  git_url: '',
  token: 'Tokens that have not yet been entered',
  labels: [],
  selected_labels: [],
}

const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'zoomChange':
      return { ...state, currentZoom: action.value }
    case 'gitURLChange':
      return { ...state, git_url: handleGitURLChange(action.value.props, action.value.git_url, state.selected_labels) }
    case 'tokenChange':
      return { ...state, token: handleTokenChange(action.value) }
    case 'labelChange':
      return { ...state, labels: action.value }
    case 'selectedLabelsChange':
      return { ...state, selected_labels: handleSelectedLabelsChange(action.value.props, state.git_url, action.value.selected_labels) }
    case 'updateClick':
      return { ...state, update: state.update + 1 }
    case 'setStateFromURLQueryString':
      return setStateFromURLQueryString(state, action.value.props, action.value.setValue)
    case 'openIssueAtBrowser':
      return { ...state,gantt_task_id:openIssueAtBrowser(action.value, state.git_url)}
    default:
      return state
  }
}

const handleGitURLChange = (props, git_url, selected_labels) => {
  const params = new URLSearchParams(props.location.search);
  params.set('giturl', git_url);
  params.set('labels', convertLabelsListToString(selected_labels));
  props.history.push({
    search: params.toString(),
  });
  return git_url;
}

const handleTokenChange = (token) => {
  bake_cookie('git_token', token);
  return token;
}

const filterOnlyOneAssignee = (selected_labels) => {
  const asigneies_selected_labels = selected_labels.filter((v) => v.type === "assignee");
  if (asigneies_selected_labels.length > 1) {
    selected_labels = selected_labels.filter((v) =>
      v.id !== asigneies_selected_labels[0].id
    );
  }
  return selected_labels;
}

const handleSelectedLabelsChange = (props, git_url, selected_labels) => {
  selected_labels = filterOnlyOneAssignee(selected_labels);
  const params = new URLSearchParams(props.location.search);
  params.set('giturl', git_url);
  params.set('labels', convertLabelsListToString(selected_labels));
  props.history.push({
    search: params.toString(),
  });
  return selected_labels;
}

const setStateFromURLQueryString = (state, props, setValue) => {
  const params = new URLSearchParams(props.location.search);
  state.git_url = params.get('giturl');
  state.selected_labels = convertLabelsStringToList(params.get('labels'));
  setValue("git_url", state.git_url)
  return state;
}

const App = (props) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { register, setValue } = useForm({ git_url: "", token: "" });

  useEffect(() => {
    setValue("token", read_cookie('git_token'));
    dispatch({ type: 'tokenChange', value: read_cookie('git_token') })
    // setLabelListOfRepoFromAPI((labels) => { dispatch({ type: 'labelChange', value: labels }) }, state.git_url, state.labels, read_cookie('git_token'));
  }, []);

  useEffect(() => {
    dispatch({ type: 'setStateFromURLQueryString', value: { props: props, setValue: setValue } });
  }, [props.location]);

  useEffect(() => {
    console.log("setLabelListOfRepoFromAPI")
    setLabelListOfRepoFromAPI((labels) => { dispatch({ type: 'labelChange', value: labels }); console.log(labels) }, state.git_url, state.labels, state.token);
  }, [state.git_url, state.token]);


  return (
    <>
      <div className="zoom-bar">
        <Toolbar
          zoom={state.currentZoom}
          onZoomChange={(zoom) => dispatch({ type: 'zoomChange', value: zoom })}
          onGitURLChange={(git_url) => dispatch({ type: 'gitURLChange', value: { props: props, git_url: git_url } })}
          token={state.token}
          onTokenChange={(token) => dispatch({ type: 'tokenChange', value: token })}
          onUpdateClick={() => dispatch({ type: 'updateClick' })}
          labels={state.labels}
          selected_labels={state.selected_labels}
          onSelectedLabelChange={(selected_labels) => dispatch({ type: 'selectedLabelsChange', value: { props: props, selected_labels: selected_labels } })}
          register={register}
        />
      </div>
      <div className="gantt-container">
        <Gantt
          zoom={state.currentZoom}
          git_url={state.git_url}
          token={state.token}
          selected_labels={state.selected_labels}
          update={state.update}
          openIssueAtBrowser={(gantt_task_id) => dispatch({ type: 'openIssueAtBrowser', value: gantt_task_id })}
          openNewIssueAtBrowser={(gantt_task_id) => openNewIssueAtBrowser(gantt_task_id, state.git_url)}
          updateIssueByAPI={(gantt_task, gantt) => updateIssueByAPI(gantt_task, state.token, gantt, state.git_url)}
        />
      </div>
    </>
  )
}

export default withRouter(App);
