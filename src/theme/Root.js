import React from 'react';
import {MDXProvider} from '@mdx-js/react';

// Import your custom components
import RobotDiagram from '@site/src/docusaurus-theme/components/RobotDiagram';
import WarningBlock from '@site/src/docusaurus-theme/components/WarningBlock';
import CodeExample from '@site/src/docusaurus-theme/components/CodeExample';
import GlossaryTerm from '@site/src/docusaurus-theme/components/GlossaryTerm';
import Exercise from '@site/src/docusaurus-theme/components/Exercise';
import LabTask from '@site/src/docusaurus-theme/components/LabTask';
import CapstoneMilestone from '@site/src/docusaurus-theme/components/CapstoneMilestone';

const components = {
  RobotDiagram,
  WarningBlock,
  CodeExample,
  GlossaryTerm,
  Exercise,
  LabTask,
  CapstoneMilestone,
};

export default function Root({children}) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
}
