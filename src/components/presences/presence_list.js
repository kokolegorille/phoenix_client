import React, { Component } from 'react';

import PresenceItem from './presence_item';

class PresenceList extends Component {
  render() {
    const { presences } = this.props;

    if (!presences) { return <p>empty</p>; }
    return (
      <ul>
        {
          presences.map(presence =>
            <PresenceItem key={presence.phx_ref} presence={presence} />)
        }
      </ul>
    );
  }
}

export default PresenceList;
