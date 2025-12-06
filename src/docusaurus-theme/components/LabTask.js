import React from 'react';
import styles from './LabTask.module.css';

function Section({title, items, isList = true}) {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.section}>
      <h4>{title}</h4>
      {isList ? (
        <ul>
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      ) : (
        <p>{items}</p>
      )}
    </div>
  );
}

export default function LabTask({labId, title, objective, prerequisites, equipment, steps, deliverables, assessmentCriteria}) {
  return (
    <div className={styles.labContainer} id={labId}>
      <div className={styles.labHeader}>
        <h3>Lab Task: {title}</h3>
      </div>
      <div className={styles.labBody}>
        <Section title="Objective" items={objective} isList={false} />
        <Section title="Prerequisites" items={prerequisites} />
        <Section title="Equipment" items={equipment} />
        <Section title="Steps" items={steps} />
        <Section title="Deliverables" items={deliverables} />
        <Section title="Assessment Criteria" items={assessmentCriteria} isList={false} />
      </div>
    </div>
  );
}
