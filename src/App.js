import React, { Component } from 'react';
import axios from 'axios';

import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';


class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
    data: {
      data: [
        { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
      ],
      // links: [
      //   { id: 1, source: 1, target: 2, type: '0' }
      // ]
    }
  };

  async componentDidMount() {
    this.getGitlabIssues("yXxbNTKZNCVzdsUALpqJ");
  }

  getGitlabIssues = async (private_token) => {
    const url = 'https://gitlab.com/api/v4/issues?private_token=' + private_token;
    let res = await axios.get(url).then((res) => {
      console.log(res)
      let data = {
        data: [
        ],
      };
      res.data.map((info) => {
        let issue = { id: 1, text: info.title, start_date: '2020-02-12', duration: 3, progress: 0.6 }
        data.data.push(issue);
      });
      console.log(data)
      this.setState({ data });
    });
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

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={this.state.data}
            zoom={currentZoom}
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

