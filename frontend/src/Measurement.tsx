import React from 'react';

import { useSubscription } from 'mqtt-react-hooks';

export default function Measurement() {
  /* Message structure:
   *  topic: string
   *  message: string
   */
  const { message } = useSubscription([
    'temperatuer/',
    'humidity/',
  ]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{`topic:${message!.topic} - message: ${message!.message}`}</span>
      </div>
    </>
  );
}