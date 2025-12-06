import React from 'react';
import styles from './Exercise.module.css';

export default function Exercise({exerciseNumber, difficulty, learningObjectiveRef, children, solution}) {
  return (
    <div className={styles.exerciseContainer}>
      <div className={styles.exerciseHeader}>
        <strong>Exercise {exerciseNumber}</strong>
        <span className={`${styles.difficulty} ${styles[difficulty?.toLowerCase()]}`}>
          {difficulty}
        </span>
      </div>
      <div className={styles.exerciseBody}>
        {children}
        <p className={styles.learningObjective}>
          <em>Learning Objective: {learningObjectiveRef}</em>
        </p>
      </div>
      {solution && (
        <details className={styles.solutionContainer}>
          <summary>Solution</summary>
          <div className={styles.solutionBody}>
            {solution}
          </div>
        </details>
      )}
    </div>
  );
}
