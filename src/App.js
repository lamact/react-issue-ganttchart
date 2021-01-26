import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css';

class App extends Component {
  state = {
    currentZoom: 'Months',
    messages: [],
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

  componentDidMount() {
    this.setState({
      token: read_cookie('personal_access_token')
    });
  }

  render() {
    const { currentZoom, token } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
            token={token}
            onTokenChange={this.handleTokenChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            zoom={currentZoom}
            token={token}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;