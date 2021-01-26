import React, { Component } from 'react';
export default class Toolbar extends Component {
  handleZoomChange = (e) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(e.target.value)
    }
  }

  handleTokenChange = (e) => {
    if (this.props.onTokenChange) {
      this.props.onTokenChange(e.target.value)
    }
  }

  render() {
    const zoomRadios = ['Days', 'Months'].map((value) => {
      const isActive = this.props.zoom === value;
      return (
        <label key={value} className={`radio-label ${isActive ? 'radio-label-active' : ''}`}>
          <input type='radio'
            checked={isActive}
            onChange={this.handleZoomChange}
            value={value} />
          {value}
        </label>
      );
    });

    return (
      <div className="tool-bar">
        <b>Token: </b>
        <input type="password"
          value={this.props.token}
          onChange={this.handleTokenChange}
          className='token-input-label' />
        <b>Zoom: </b>
        {zoomRadios}
      </div>
    );
  }
}
