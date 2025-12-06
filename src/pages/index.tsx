import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures'; // Removed
import Heading from '@theme/Heading';

import styles from './index.module.css';
import '../css/landing-page.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          **{siteConfig.tagline}**: Building intelligent robots that perceive, reason, and act in the physical world.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin-right--md"
            to="/docs">
            Start Reading the Textbook 📖
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/modules/ros2">
            Explore Modules ✨
          </Link>
        </div>
      </div>
    </header>
  );
}

// HomepageCTA Component (placeholder for now)
function HomepageCTA() {
  return (
    <section className={styles.ctaSection} >
      <div className="container text--center">
        <Heading as="h2" className="hero__title">
          Ready to Build the Future of AI?
        </Heading>
        <p className="hero__subtitle">
          Join our community and start your journey into Physical AI and Humanoid Robotics today.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

// HomepageRoadmap Component
function HomepageRoadmap() {
  return (
    <section className={styles.roadmapSection}>
      <div className="container text--center">
        <Heading as="h2" className="hero__title">
          Course Roadmap
        </Heading>
        <p className="hero__subtitle">
          Follow a structured learning path to master Physical AI and Humanoid Robotics.
        </p>
        <div className={styles.roadmapVisual}>
          {/* Placeholder for actual roadmap visual */}
          <img src={useBaseUrl('/img/roadmap_placeholder.svg')} alt="Course Roadmap Placeholder" />
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            View All Modules
          </Link>
        </div>
      </div>
    </section>
  );
}

// HomepageAbout Component
function HomepageAbout() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h2" className="hero__title">
              What is Physical AI?
            </Heading>
            <p>
              **Physical AI** focuses on developing intelligent systems that are embodied in physical forms (robots) and can learn, adapt, and operate in the real world through direct physical experience. It emphasizes the role of the body and real-world interaction in intelligence.
            </p>
            <p>
              Unlike purely cognitive AI, which might operate solely in software or data, Physical AI addresses the complexities of real-world physics, uncertainty, and dynamics. It integrates advanced concepts from robotics, machine learning, computer vision, and natural language processing to create truly autonomous and interactive machines.
            </p>
            <Link
              className="button button--secondary button--md"
              to="/docs/modules/intro-physical-ai/embodiment">
              Learn More
            </Link>
          </div>
          <div className="col col--6">
            <img src={useBaseUrl('/img/physical_ai_concept.svg')} alt="Physical AI Concept" className={styles.aboutImage} />
          </div>
        </div>
      </div>
    </section>
  );
}

// HomepageModules Component
function HomepageModules() {
  return (
    <section className={clsx('hero hero--primary', styles.modulesSection)}>
      <div className="container text--center">
        <Heading as="h2" className="hero__title">
          Explore Our Modules
        </Heading>
        <p className="hero__subtitle">
          A structured journey through the core aspects of Physical AI and Humanoid Robotics.
        </p>
        <div className="row">
          {/* Module 0 */}
          <div className="col col--4">
            <div className={clsx('card', styles.moduleCard)}>
              <div className="card__header">
                <h3>Module 0: Foundational AI Principles</h3>
              </div>
              <div className="card__body">
                <p>Introduction to Physical AI, embodiment, kinematics, design, and perception.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/modules/intro-physical-ai/embodiment">View Module</Link>
              </div>
            </div>
          </div>
          {/* Module 1 */}
          <div className="col col--4">
            <div className={clsx('card', styles.moduleCard)}>
              <div className="card__header">
                <h3>Module 1: The Robotic Nervous System (ROS 2)</h3>
              </div>
              <div className="card__body">
                <p>Master ROS 2 concepts, URDF modeling, and build the communication backbone of robots.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/modules/ros2">View Module</Link>
              </div>
            </div>
          </div>
          {/* Module 2 */}
          <div className="col col--4">
            <div className={clsx('card', styles.moduleCard)}>
              <div className="card__header">
                <h3>Module 2: The Digital Twin (Gazebo & Unity)</h3>
              </div>
              <div className="card__body">
                <p>Dive into simulation with Gazebo for physics and Unity for human-robot interaction.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/modules/digital-twin">View Module</Link>
              </div>
            </div>
          </div>
          {/* Module 3 */}
          <div className="col col--4">
            <div className={clsx('card', styles.moduleCard)}>
              <div className="card__header">
                <h3>Module 3: The AI Robot Brain (NVIDIA Isaac)</h3>
              </div>
              <div className="card__body">
                <p>Accelerate AI robotics with Isaac Sim for synthetic data and Isaac ROS for navigation.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/modules/isaac">View Module</Link>
              </div>
            </div>
          </div>
          {/* Module 4 */}
          <div className="col col--4">
            <div className={clsx('card', styles.moduleCard)}>
              <div className="card__header">
                <h3>Module 4: Vision–Language–Action (VLA)</h3>
              </div>
              <div className="card__body">
                <p>Explore VLA systems, LLM planning, and build autonomous humanoid pipelines.</p>
              </div>
              <div className="card__footer">
                <Link className="button button--secondary" to="/docs/modules/vla">View Module</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="The Embodied Intelligence Textbook - Physical AI & Humanoid Robotics">
      <HomepageHeader />
      <main>
        <HomepageCTA />
        <HomepageRoadmap />
        <HomepageAbout />
        <HomepageModules />
      </main>
    </Layout>
  );
}
