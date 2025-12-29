import Layout from '@theme/Layout';
import ModuleCard from '../components/ModuleCard';
import ModuleCardGrid from '../components/ModuleCardGrid';
import { moduleConfigs } from '../utils/moduleConfig';
import { Network, Cuboid, Eye, Zap } from 'lucide-react';

// Map module numbers to their corresponding Lucide icons
const moduleIcons = {
  1: <Network size={48} />,
  2: <Cuboid size={48} />,
  3: <Eye size={48} />,
  4: <Zap size={48} />
};

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Physical AI & Humanoid Robotics
        </h1>
        <p className="hero__subtitle">
          From ROS 2 Foundations to Autonomous Intelligence
        </p>
        <a href="#modules" className="hero__cta">
          Start Learning
        </a>
      </div>
      <div className="hero__image">
        <img src="img\hero.png" alt="Humanoid Robot Illustration" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Master autonomous robotics from ROS 2 to AI-powered systems">
      <HeroSection />
      <ModuleCardGrid >
        {moduleConfigs.map((module) => (
          <ModuleCard
            key={module.number}
            number={module.number}
            title={module.title}
            description={module.description}
            icon={moduleIcons[module.number]}
            link={module.link}
          />
        ))}
      </ModuleCardGrid>
    </Layout>
  );
}
