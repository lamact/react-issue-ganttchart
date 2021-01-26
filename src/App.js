import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css';

class App extends Component {
  state = {
    currentZoom: 'Months',
    messages: [],
    git_url: '',
    token: '',
  };

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  handleTokenChange = (token) => {
    this.setState({ token });
    bake_cookie('personal_access_token', token);
  }

  handleGitURLChange = (git_url) => {
    this.setState({ git_url });
    bake_cookie('git_url', git_url);
  }

  componentDidMount() {
    this.setState({
      token: read_cookie('personal_access_token')
    });
  }

  render() {
    const { currentZoom, git_url, token } = this.state;
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
          />
        </div>
        <div className="gantt-container">
          <Gantt
            zoom={currentZoom}
            git_url={git_url}
            token={token}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;