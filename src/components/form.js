import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from './input';
import Button from './button';
import validate from '../utils/validation';

const defaultProps = {
  initialState: {},
  buttonLabel: 'Submit',
  disabled: false,
};

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  schema: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: PropTypes.object,
  //
  buttonLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

class Form extends Component {
  static defaultProps = defaultProps;
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    const { schema, initialState } = props;

    this.schema = schema;
    this.fieldNames = Object.keys(schema);

    this.state = this._loadStateFromProps(initialState);
  }

  inputs = {}

  // Load state from non empty props
  _loadStateFromProps = (obj) => {
    const { schema } = this;
    const initialState = Object.assign({}, schema);

    if (obj) {
      Object.keys(obj)
        .filter(key => obj[key])
        .forEach((key) => {
          initialState[key].value = obj[key];
          initialState[key].valid = validate(
            obj[key],
            schema[key].validationRules,
          );
          initialState[key].touched = true;
        });
    }

    return initialState;
  }

  _renderField = (key) => {
    const { schema, fieldNames } = this;
    const { value, valid, touched } = this.state[key];
    const { elementType, elementConfig } = schema[key];

    const lastKey = fieldNames[fieldNames.length - 1];
    const nextKey = fieldNames[fieldNames.indexOf(key) + 1];
    // Equivalent to onSubmitEditing of React Native
    const onKeyPress = (key !== lastKey) ?
      // Focus on next node if not last
      e => e.key === 'Enter' && this._focusTextInput(this.inputs[nextKey]) :
      // Trigger submit if last and valid
      e => e.key === 'Enter' && this._validate() && this._handleClick(e);

    return (
      <Input
        key={key}
        inputType={elementType}
        reffunc={c => this.inputs[key] = c} // eslint-disable-line no-return-assign
        value={value || ''}
        valid={valid}
        touched={touched}
        onChange={e => this._handleOnChange(e, key)}
        onKeyPress={e => onKeyPress(e)}
        {...elementConfig}
      />
    );
  }

  // Focus on the node
  _focusTextInput = (node) => {
    try {
      node.focus();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Couldn't focus on next text input: ${e.message}`);
    }
  };

  _handleOnChange = (e, key) => {
    const { value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value: value || '',
        valid: validate(
          value,
          prevState[key].validationRules,
        ),
        touched: true,
      },
    }));
  }

  _validate = () => this.fieldNames.map(key => this.state[key].valid)
    .every(v => v);

  // Returns an object with keys, values
  _loadData = () => (
    this.fieldNames.reduce((acc, key) => {
      acc[key] = this.state[key].value;
      return acc;
    }, {})
  );

  _handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(this._loadData());
  }

  render() {
    const { disabled, buttonLabel } = this.props;

    return (
      <form>
        {
          this.fieldNames.map(key => this._renderField(key))
        }
        <Button
          disabled={disabled || !this._validate()}
          onClick={this._handleClick}
        >
          {buttonLabel}
        </Button>
      </form>
    );
  }
}

export default Form;
