import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Multiselect } from 'multiselect-react-dropdown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GitHubIcon from '@material-ui/icons/GitHub';
import { gantt } from 'dhtmlx-gantt';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const Toolbar = (props) => {
  const { classes } = props;
  return (
    <form noValidate>
      <IconButton color="primary" style={{ verticalAlign: 'middle' }}>
        <MenuOpenIcon
          onClick={(e) => {
            gantt.config.show_grid = !gantt.config.show_grid;
            gantt.render();
          }} />
      </IconButton>
      <TextField
        className={classes.root}
        required
        placeholder="https://github.com/lamact/react-issue-ganttchart"
        label="Git Repository URL"
        style={{ width: '20%', verticalAlign: 'middle' }}
        onChange={(e) => {
          props.onGitURLChange(e.target.value);
        }}
        inputRef={props.register}
        name="git_url"
      />
      <TextField
        className={classes.root}
        type="password"
        placeholder="Access Token"
        label="Access Token"
        style={{ width: '10%', verticalAlign: 'middle' }}
        onChange={(e) => {
          props.onTokenChange(e.target.value);
        }}
        inputRef={props.register}
        name="token"
      />
      <Multiselect
        className={classes.root}
        options={props.labels}
        selectedValues={props.selected_labels}
        onSelect={(options) => {
          props.onSelectedLabelChange(options);
        }}
        onRemove={(options) => {
          props.onSelectedLabelChange(options);
        }}
        displayValue="name"
        style={selector_style}
        placeholder="filter by labels"
        hidePlaceholder="false"
        emptyRecordMsg="No Labels"
        closeIcon="cancel"
      />
      <Autocomplete
        className={classes.root}
        size="small"
        options={props.member_list}
        getOptionLabel={(option) => option.name}
        value={props.selected_assignee}
        noOptionsText="Requires a valid token"
        onChange={(e, assignee) => {
          props.onSelectedAssigneeChange(assignee);
        }}
        style={{
          width: '15%',
          verticalAlign: 'middle',
          display: 'inline-block',
          marginRight: '15px',
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.root}
            label="Assignee"
            variant="standard"
          />
        )}
      />
      <ButtonGroup size="small" style={{ height: '34px' }}>
        <Button
          onClick={(e) => {
            props.onZoomChange('Weeks');
          }}
        >
          Weeks
        </Button>
        <Button
          onClick={(e) => {
            props.onZoomChange('Days');
          }}
        >
          Days
        </Button>
      </ButtonGroup>
      <IconButton color="primary" style={{ verticalAlign: 'middle' }}>
        <CachedIcon
          onClick={(e) => {
            props.onUpdateClick();
          }}
        />
      </IconButton>
      <IconButton color="primary" style={{ verticalAlign: 'middle' }}>
        <GitHubIcon onClick={() => window.open('https://github.com/lamact/react-issue-ganttchart')} />
      </IconButton>
    </form>
  );
};

const styles = (theme) => ({
  root: {
    '& > *': {
      fontSize: '13px',
      marginRight: '4px',
    },
  },
});

const selector_style = {
  multiselectContainer: {
    width: '27%',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '4px',
    alignItems: 'flex-end',
  },
  chips: {
    background: 'light blue',
    fontSize: '15px',
  },
  searchBox: {
    border: 'none',
  },
};

export default withStyles(styles)(Toolbar);
