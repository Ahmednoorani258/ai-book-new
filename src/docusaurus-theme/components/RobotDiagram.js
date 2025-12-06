import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function RobotDiagram({diagramId, altText, filePath, caption}) {
  const imageUrl = useBaseUrl(filePath);
  return (
    <figure id={diagramId}>
      <img src={imageUrl} alt={altText} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
