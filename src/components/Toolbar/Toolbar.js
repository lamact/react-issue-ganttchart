import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import TextField from '@material-ui/core/TextField';
import { Multiselect } from 'multiselect-react-dropdown';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      fontSize: "15px",
    },
  },
});

class Toolbar extends Component {
  handleGitURLChange = (e) => {
    if (this.props.onGitURLChange) {
      this.props.onGitURLChange(e.target.value)
    }
  }

  handleTokenChange = (e) => {
    if (this.props.onTokenChange) {
      this.props.onTokenChange(e.target.value)
    }
  }

  handleUpdateClick = (e) => {
    if (this.props.onUpdateClick) {
      this.props.onUpdateClick()
    }
  }

  handleClickWeeks = (e) => {
    this.handleZoomChange("Weeks")
  }

  handleClickDays = (e) => {
    this.handleZoomChange("Days")
  }

  handleZoomChange = (value) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(value)
    }
  }

  handleChange = (event) => {
    this.setState({ personName: event.target.value })
  };

  onSelect = (selected_labels) => {
    if (this.props.onLabelChange) {
      this.props.onLabelChange(selected_labels)
    }
  };

  onRemove = (selected_labels) => {
    if (this.props.onLabelChange) {
      this.props.onLabelChange(selected_labels)
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form noValidate >
        <TextField
          className={classes.root}
          required
          placeholder="https://github.com/lamact/react-issue-ganttchart"
          defaultValue="https://github.com/lamact/react-issue-ganttchart"
          label="Git Repository URL"
          style={{ width: "25%", verticalAlign: "middle" }}
          onChange={this.handleGitURLChange}
        />
        <TextField
          className={classes.root}
          type="password"
          placeholder="Access Token"
          defaultValue="Access Token"
          label="Access Token"
          style={{ width: "10%", verticalAlign: "middle" }}
          onChange={this.handleTokenChange}
        />

        <Multiselect
          className={classes.root}
          options={this.props.labels}
          selectedValues={this.props.selectedValue}
          onSelect={this.onSelect}
          onRemove={this.onRemove}
          displayValue="name"
          style={selector_style}
          placeholder="filter by labels"
          hidePlaceholder="false"
          emptyRecordMsg="No Labels"
          closeIcon="cancel"
        />
        <ButtonGroup size="small" style={{ height: "34px" }} >
          <Button onClick={this.handleClickWeeks}>Weeks</Button>
          <Button onClick={this.handleClickDays}>Days</Button>
        </ButtonGroup>
        <IconButton color="primary" style={{ verticalAlign: "middle" }}>
          <CachedIcon onClick={this.handleUpdateClick} />
        </IconButton>
      </form>
    );
  }
}

const selector_style = {
  multiselectContainer: {
    width: "50%",
    display: "inline-block",
    verticalAlign: "middle",
    padding: "4px",
    alignItems: "flex-end",
  },
  chips: {
    background: "light blue",
    fontSize: "15px",
  },
  searchBox: {
    border: "none",
  },

}

export default withStyles(styles)(Toolbar)
