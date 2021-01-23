import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
  };

  componentDidMount() {
    this.getGitlabIssues();
  }

  getParsedDate(infoDate){
    var date = new Date(infoDate);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
  }

  getGitlabIssues = async () => {
    const url = 'https://api.github.com/repos/lamact/react-issue-ganttchart/issues';
    let res = await axios.get(url).then((res) => {
        let data=[];
        let links=[];
        res.data.map((info) => {
        let issue = {
          id:info.id,
          text:info.title,
          start_date:this.getParsedDate(info.created_at),
          duration:3,
          progress:0.1,
        }
        data.push(issue);
      });
      data={data:data,links:links}
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
        {this.state.data　&&
        <div className="gantt-container">
          <Gantt
            tasks={this.state.data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        }
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;

