import React from 'react';

export interface ModuleCardGridProps {
  children: React.ReactNode;
}

export default function ModuleCardGrid({ children }: ModuleCardGridProps): JSX.Element {
  return (
    <section id="modules" className="module-cards-grid">
      {children}
    </section>
  );
}
