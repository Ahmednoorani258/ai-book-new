import React from 'react';
import styles from './CapstoneMilestone.module.css';

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

export default function CapstoneMilestone({milestoneId, title, description, objectives, deliverables, evaluationMetrics}) {
  return (
    <div className={styles.milestoneContainer} id={milestoneId}>
      <div className={styles.milestoneHeader}>
        <h3>Capstone Milestone: {title}</h3>
      </div>
      <div className={styles.milestoneBody}>
        <Section title="Description" items={description} isList={false} />
        <Section title="Objectives" items={objectives} />
        <Section title="Deliverables" items={deliverables} />
        <Section title="Evaluation Metrics" items={evaluationMetrics} isList={false} />
      </div>
    </div>
  );
}
