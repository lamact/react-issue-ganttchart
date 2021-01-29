import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import { bake_cookie, read_cookie } from 'sfcookies';
import './App.css';

class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
    token: '',
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

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
    const { currentZoom, messages, token } = this.state;
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
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;