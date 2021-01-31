import React, { Component } from 'react';
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
    this.GanttRef = React.createRef();
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

  updateGantt = async (selected_labels) => {
    this.GanttRef.current.updateGantt(selected_labels);
    setLabelListOfRepoFromAPI(this, this.state.git_url, this.state.token);
  }

  handleUpdateClick = () => {
    bake_cookie('access_token', this.state.token);
    bake_cookie('url', this.state.git_url);
    this.updateGantt(this.state.selected_labels);
  }

  handleLabelChange = (selected_labels) => {
    this.updateGantt(selected_labels);
    this.setState({ selected_labels });
  }

  componentDidMount() {
    this.setState({
      token: read_cookie('access_token')
    });
    this.setState({
      git_url: read_cookie('url')
    });
    if (read_cookie('currentZoom') === 'Weeks' || read_cookie('currentZoom') === 'Days')
      this.setState({
        currentZoom: read_cookie('currentZoom')
      });
  }

  render() {
    const { currentZoom, git_url, token, labels } = this.state;
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
            onLabelChange={this.handleLabelChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            ref={this.GanttRef}
            zoom={currentZoom}
            git_url={git_url}
            token={token}
          />
        </div>
      </div>
    );
  }
}

export default App;