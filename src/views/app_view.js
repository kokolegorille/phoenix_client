import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appBootup } from '../actions/application_actions';

const propTypes = {
  appBootup: PropTypes.func.isRequired,
};

class App extends Component {
  static propTypes = propTypes;
  
  componentDidMount() {
    // Application is starting...
    this.props.appBootup(Date.now());
  }
  
  render() {
    const { application } = this.props;
    const { bootupTime } = application;
    
    return (
      <div>
        <h1>Hello world from React</h1>
        { bootupTime }
      </div>
    );
  }
};

const mapStateToProps = ({
  application
}) => ({
  application,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    appBootup,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);