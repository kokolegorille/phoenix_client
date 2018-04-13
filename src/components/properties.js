import React from 'react';
import PropTypes from 'prop-types';

const Properties = ({object, recursive, exclude}) => {
  let collector = [];
  
  // format property by typeof
  const formatValue = value => {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false"
        break;
      case "object":
        return (recursive) ?
          <Properties object={value} /> :
          JSON.stringify(value);
      default:
        return value;
    }
  }
  
  // Push dt, dd into an array before render
  // to aggregate components witouht a main root
  Object.keys(object)
    .forEach(
      (key) => {
        if (!exclude.includes(key)) {
          collector.push(<dt key={key}>{key}</dt>);
          collector.push(
            <dd key={`${key}-${object[key]}`}>{formatValue(object[key])}</dd>
          );
        }
      }
    );
  
  const className = recursive ?
    '' :
    'dl-horizontal'
  
  return (
    <dl className={className}>
      {collector}
    </dl>
  );
}

Properties.defaultProps = {
  recursive: false,
  exclude: [],
}


Properties.propTypes = {
  object: PropTypes.object.isRequired,
  recursive: PropTypes.bool,
  exclude: PropTypes.array,
}

export default Properties;