export interface ModuleConfig {
  number: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  link: string;
}

export const moduleConfigs: ModuleConfig[] = [
  {
    number: 1,
    title: 'The Robotic Nervous System (ROS 2)',
    description: 'Master ROS 2 middleware connecting AI to robotic embodiment',
    link: '/module-1/chapter-1-ros2-foundations'
  },
  {
    number: 2,
    title: 'Digital Twins & Simulation',
    description: 'Test and validate robots safely in Gazebo and Isaac Sim',
    link: '/module-2/chapter-1-digital-twins'
  },
  {
    number: 3,
    title: 'Isaac ROS & Nav2',
    description: 'Perception and autonomous navigation for humanoid robots',
    link: '/module-3/chapter-1-isaac-sim'
  },
  {
    number: 4,
    title: 'Vision-Language-Action (VLA)',
    description: 'Voice-controlled, LLM-powered autonomous execution',
    link: '/module-4/chapter-1-voice-to-action'
  }
];
