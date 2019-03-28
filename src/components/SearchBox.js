import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    color: "white"
  },
  root: {
    color: "white"
  },
  input: {
    color: "white",
    boxyhadow: "0 4px 2px -2px gray"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleQueryStringChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSearch = e => {
    e.preventDefault();
    console.log("Fetch weather data for:", this.state.query);
    this.props.onSearchSubmit(this.state.query);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Enter a city"
                  className={classes.root}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{
                    style: {
                      color: "white"
                    }
                  }}
                  value={this.state.query}
                  onChange={this.handleQueryStringChange}
                />
              </Grid>
              <Grid item>
                <i
                  class="fas fa-search"
                  style={{ cursor: "pointer" }}
                  onClick={this.handleSearch}
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBox);
