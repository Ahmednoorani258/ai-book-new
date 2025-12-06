import React from 'react';
import Admonition from '@theme/Admonition';

const typeMapping = {
  'Safety': 'danger',
  'Important': 'caution',
  'Note': 'note',
};

export default function WarningBlock({type, children}) {
  const admonitionType = typeMapping[type] || 'note';
  return (
    <Admonition type={admonitionType} title={type}>
      {children}
    </Admonition>
  );
}
