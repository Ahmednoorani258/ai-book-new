import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';

export default function CodeExample({language, children, explanation, expectedOutput, hardwareWarnings}) {
  return (
    <div>
      <CodeBlock
        language={language}
        title="Code Example">
        {children}
      </CodeBlock>
      {explanation && <p>{explanation}</p>}
      {expectedOutput && (
        <CodeBlock
          language="text"
          title="Expected Output">
          {expectedOutput}
        </CodeBlock>
      )}
      {hardwareWarnings && (
        <Admonition type="danger" title="Hardware Warning">
          <p>This code interacts with physical hardware. Ensure all safety precautions are taken before running.</p>
        </Admonition>
      )}
    </div>
  );
}
