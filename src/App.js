import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoom: 'Months',
      messages: [],
      git_url: '',
      token: '',
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

  handleUpdateClick = () => {
    this.GanttRef.current.updateGantt();
    bake_cookie('token', this.state.token);
    bake_cookie('git_url', this.state.git_url);
  }

  componentDidMount() {
    this.setState({
      token: read_cookie('token')
    });
    this.setState({
      git_url: read_cookie('git_url')
    });
    if (read_cookie('currentZoom') === 'Days' || read_cookie('currentZoom') === 'Months')
      this.setState({
        currentZoom: read_cookie('currentZoom')
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
            onUpdateClick={this.handleUpdateClick}
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