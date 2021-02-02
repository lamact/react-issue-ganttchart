import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import { bake_cookie, read_cookie } from 'sfcookies';
import { setLabelListOfRepoFromAPI } from './functions/Common/IssueAPI.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Weeks',
      messages: [],
      git_url: '',
      token: '',
      labels: [],
      selected_labels: [],
    };
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
    bake_cookie('currentZoom', zoom);
  }

  handleTokenChange = (token) => {
    this.setState({ token });
  }

  handleGitURLChange = (git_url) => {
    this.setState({ git_url });
  }

  updateGantt = async () => {
    setLabelListOfRepoFromAPI(this, this.state.git_url, this.state.token);
    console.log(this.state.selected_labels)
  }

  handleUpdateClick = () => {
    bake_cookie('access_token', this.state.token);
    this.changeQueryStringFromState();
    this.updateGantt();
  }

  handleLabelChange = (selected_labels) => {
    this.setState({ selected_labels });
    this.updateGantt();
  }

  changeQueryStringFromState = () => {
    const params = new URLSearchParams(this.props.location.search);
    params.set('giturl', this.state.git_url);
    params.set('labels', this.state.selected_labels);
    this.props.history.push({
      search: params.toString(),
    });
  }

  setStateFromQueryString = () => {
    const params = new URLSearchParams(this.props.location.search);
    this.setState({ git_url: params.get('giturl') });
  }

  componentWillMount = () => {
    this.setStateFromQueryString();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.location !== this.props.location) {
      this.setStateFromQueryString();
    }
  };

  componentDidMount() {
    this.setState({
      token: read_cookie('access_token')
    });
    if (read_cookie('currentZoom') === 'Weeks' || read_cookie('currentZoom') === 'Days')
      this.setState({
        currentZoom: read_cookie('currentZoom')
      });
    this.updateGantt();
  }

  render() {
    const { currentZoom, git_url, token, labels, selected_labels } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
            git_url={git_url}
            onGitURLChange={this.handleGitURLChange}
            token={token}
            onTokenChange={this.handleTokenChange}
            onUpdateClick={this.handleUpdateClick}
            labels={labels}
            selected_labels={selected_labels}
            onLabelChange={this.handleLabelChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            zoom={currentZoom}
            git_url={git_url}
            token={token}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);