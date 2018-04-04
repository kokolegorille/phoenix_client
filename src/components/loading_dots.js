import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number,
};

class LoadingDots extends Component {
  static propTypes = propTypes;
  static defaultProps = { interval: 300, dots: 3 };

  state = { frame: 1 }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ frame: this.state.frame + 1 }),
      this.props.interval,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const dots = this.state.frame % (this.props.dots + 1);
    const text = '.'.repeat(dots);

    return <span>{text}</span>;
  }
}

export default LoadingDots;
