import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ModuleCard.module.css';

export interface ModuleCardProps {
  /** Module number (1-4) */
  number: 1 | 2 | 3 | 4;
  /** Module title (max 60 chars) */
  title: string;
  /** Brief description (max 200 chars) */
  description: string;
  /** Lucide React icon component */
  icon: React.ReactNode;
  /** Navigation link to module content */
  link: string;
}

export default function ModuleCard({
  number,
  title,
  description,
  icon,
  link
}: ModuleCardProps): JSX.Element {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <span className={styles.number}>Module {number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link to={link} className={styles.link}>
        Start Learning →
      </Link>
    </article>
  );
}
