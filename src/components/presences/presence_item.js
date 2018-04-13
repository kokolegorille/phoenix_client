import React from 'react';

import { formatTimestamp } from '../../utils/formatter';

const PresenceItem = ({ presence }) => {
  if (!presence) { return; }

  // Allowed fields : username, phx_ref, online_at, id, count
  const { username, online_at, count } = presence;

  return (
    <li>
      <span>{formatTimestamp(online_at)}&nbsp;</span>
      <span>({count})&nbsp;</span>
      <span>{username}</span>
    </li>
  );
};

export default PresenceItem;
