import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CachedIcon from '@material-ui/icons/Cached';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Multiselect } from 'multiselect-react-dropdown';

const Toolbar = (props) => {
  const { classes } = props;
  return (
    <form noValidate >
      <TextField
        className={classes.root}
        required
        placeholder="https://github.com/lamact/react-issue-ganttchart"
        defaultValue="https://github.com/lamact/react-issue-ganttchart"
        label="Git Repository URL"
        style={{ width: "25%", verticalAlign: "middle" }}
        onChange={(e) => { props.onGitURLChange(e.target.value) }}
      />
      <TextField
        className={classes.root}
        type="password"
        placeholder="Access Token"
        defaultValue="Access Token"
        label="Access Token"
        style={{ width: "10%", verticalAlign: "middle" }}
        onChange={(e) => { props.onTokenChange(e.target.value) }}
      />
      <Multiselect
        className={classes.root}
        options={props.labels}
        selectedValues={props.selectedValue}
        onSelect={(options) => { props.onLabelChange(options) }}
        onRemove={(options) => { props.onLabelChange(options) }}
        displayValue="name"
        style={selector_style}
        placeholder="filter by labels"
        hidePlaceholder="false"
        emptyRecordMsg="No Labels"
        closeIcon="cancel"
      />
      <ButtonGroup size="small" style={{ height: "34px" }} >
        <Button onClick={(e) => { props.onZoomChange("Weeks") }}>Weeks</Button>
        <Button onClick={(e) => { props.onZoomChange("Days") }}>Days</Button>
      </ButtonGroup>
      <IconButton color="primary" style={{ verticalAlign: "middle" }}>
        <CachedIcon onClick={(e) => { props.onUpdateClick() }} />
      </IconButton>
    </form>
  );
}

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      fontSize: "15px",
    },
  },
});


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
export default withStyles(styles)(Toolbar);