import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appBootup } from '../actions/application_actions';
import {
  signinUser,
  clearSigninError,
  signupUser,
  clearSignupError,
  signoutUser,
} from '../actions/authentication_actions';
import {
  joinChannel,
  leaveChannel,
} from '../actions/channel_actions';
import {
  formatTimestamp,
  truncate,
} from '../utils/formatter';

import LoadingDots from '../components/loading_dots';
import Properties from '../components/properties';
import SigninForm from '../components/signin_form';
import SignupForm from '../components/signup_form';
import PresenceList from '../components/presences/presence_list';

const propTypes = {
  appBootup: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  clearSigninError: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  clearSignupError: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
  joinChannel: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
  //
  application: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired,
  presences: PropTypes.object.isRequired,
};

class App extends Component {
  static propTypes = propTypes;
  
  state = {
    signMode: 'Sign In',
  }
  
  componentDidMount() {
    // Application is starting...
    this.props.appBootup(Date.now());
  }
  
  _toggleSignMode = () => {
    const { signMode } = this.state;
    const newSignMode = signMode === 'Sign In' ? 'Sign Up' : 'Sign In';
    this.setState({signMode: newSignMode});
  }
  
  _signoutUser = () => {
    const { authentication, signoutUser } = this.props;
    const { currentUser } = authentication;
    signoutUser(currentUser.id);
  }
  
  _isChannelConnected = (topic) => {
    const { channels } = this.props;
    const { connections } = channels;
    return connections.hasOwnProperty(topic);
  }
  
  _renderPresences = () => {
    const { presences } = this.props;
    const presenceKeys = Object.keys(presences);
    if (!presences || presenceKeys.length < 1) { return; };
    return (
      <div>
        <h2>Presences</h2>
        <ul>
          {presenceKeys.map(key => (
            <li key={`presences:${key}`}>
              {key}
              <PresenceList presences={presences[key]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  render() {
    const { 
      application,
      authentication,
      channels,
      signinError, 
      signupError,
      //
      signinUser,
      clearSigninError,
      signupUser,
      clearSignupError,
      joinChannel,
      leaveChannel,
    } = this.props;
    const { isFetching } = application;
    const { isAuthenticated } = authentication;
    
    const { signMode } = this.state;
    
    // Sanitize properties for display
    const displayApplication = Object.assign(
      {}, application, 
      {bootupTime: formatTimestamp(application.bootupTime)}
    );
    const displayProperties = Object.assign(
      {}, authentication, 
      {token: truncate(authentication.token)}
    );
    
    return (
      <main>
        <div className="header">
          <h1>Phoenix Client w/ React</h1>
          { isFetching && <LoadingDots interval={100} dots={20} /> }
        </div>
        <div className="content-wrapper">
          <div className='flex-container'>
            <div className='large panel'>
              <div className='flex-container column'>
                <div>
                  <h2>Application</h2>
                  <Properties object={displayApplication} />
                </div>
                <div>
                  <h2>Authentication</h2>
                  <Properties object={displayProperties} />
                </div>
                <div>
                  <h2>Channels</h2>
                  <Properties object={channels.connections} />
                </div>
                { this._renderPresences() }
              </div>
            </div>
            <div className='panel'>
              {
                ! isAuthenticated && signMode === 'Sign In' &&
                <SigninForm
                  signinUser={signinUser}
                  clearSigninError={clearSigninError}
                  errorMessage={signinError}
                />
              }
              {
                ! isAuthenticated && signMode === 'Sign Up' &&
                <SignupForm
                  signupUser={signupUser}
                  clearSignupError={clearSignupError}
                  errorMessage={signupError}
                />
              }
              {
                ! isAuthenticated && 
                <button className='button' onClick={this._toggleSignMode}>
                  Toggle sign mode
                </button>
              }
              {
                isAuthenticated &&
                <button className='button' onClick={this._signoutUser}>
                  Sign out
                </button>
              }
              {
                isAuthenticated && (
                  this._isChannelConnected('lobby') ?
                    <button 
                      className='button' 
                      onClick={leaveChannel.bind(null, 'lobby')}
                    >
                      Leave Lobby
                    </button> :
                    <button 
                      className='button' 
                      onClick={joinChannel.bind(null, 'lobby')}
                    >
                      Join Lobby
                    </button>
                )
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
};

const mapStateToProps = ({
  application,
  authentication,
  channels,
  presences,
}) => ({
  application,
  authentication,
  channels,
  presences,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    appBootup,
    signinUser,
    clearSigninError,
    signupUser,
    clearSignupError,
    signoutUser,
    joinChannel,
    leaveChannel,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);