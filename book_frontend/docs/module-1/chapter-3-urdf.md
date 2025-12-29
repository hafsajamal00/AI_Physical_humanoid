---
sidebar_position: 3
title: Chapter 3 - Humanoid Modeling with URDF
---

# Chapter 3: Humanoid Modeling with URDF

## What is URDF and Why It Matters

**URDF (Unified Robot Description Format)** is an XML-based standard for describing a robot's physical structure—its body parts (links), joints, sensors, and actuators. Think of it as a **blueprint** or **CAD file** for robots, but machine-readable by simulators, visualizers, and control systems.

Why does this matter for AI engineers?

1. **Simulation-first development**: Before risking expensive hardware, you test AI algorithms in physics simulators (Gazebo, Isaac Sim) that load your URDF. The simulator renders the robot, applies gravity, computes collisions, and streams sensor data—all from your XML description.

2. **Portability**: Write your motion planning algorithm once. Load different URDFs (wheeled robot, quadruped, humanoid), and the same code adapts because the URDF defines joint names, limits, and coordinate frames.

3. **Visualization**: RViz (ROS Visualization) renders your robot's current state from URDF + joint angles. Debug inverse kinematics or collision avoidance visually without hardware.

4. **Controller configuration**: ROS 2 control frameworks (`ros2_control`) read URDF to configure PID gains, joint limits, and actuator interfaces. Change your robot's arm length in URDF, and controllers automatically adjust.

For humanoids—robots with 20+ degrees of freedom spanning legs, torso, arms, and hands—URDF becomes essential. It's the single source of truth for **kinematics** (how joints connect), **dynamics** (mass, inertia), and **sensing** (camera poses, IMU locations).

## Links and Joints in Humanoid Robots

A robot is modeled as a **kinematic tree**: rigid **links** connected by **joints**.

### Links

A **link** represents a rigid body part: a forearm, thigh, or torso. Each link has three properties:

- **Visual**: The 3D mesh for rendering (STL or COLLADA file). What the robot looks like.
- **Collision**: A simplified geometry (box, cylinder, sphere) for physics simulation. Faster collision checks than high-res meshes.
- **Inertial**: Mass, center of mass, and inertia tensor. Required for accurate dynamics (forces, torques, balance).

Example: A humanoid's forearm link might use a detailed STL mesh for visuals but a simple cylinder for collision, with 0.5 kg mass and inertia calculated from density.

### Joints

A **joint** connects two links (parent and child) and defines **how they move relative to each other**. Key joint types:

- **Revolute**: Rotational hinge (e.g., elbow: 0° to 150°). Has position limits, velocity limits, and effort (torque) limits.
- **Prismatic**: Linear sliding (e.g., telescope, gripper fingers). Rare in humanoids.
- **Fixed**: No motion (e.g., sensor mounts). Used to attach cameras to the head without introducing degrees of freedom.

A humanoid's URDF typically includes:

- **7 DOF per arm**: shoulder (3), elbow (1), wrist (3)
- **6 DOF per leg**: hip (3), knee (1), ankle (2)
- **3 DOF torso**: roll, pitch, yaw
- **2+ DOF head**: pan/tilt for cameras

Each joint defines an **axis of rotation** (which direction it spins), **limits** (min/max angles), and **origin** (where the child link attaches relative to the parent). This tree structure lets forward kinematics compute the end-effector pose (hand position) from joint angles.

## Sensors and Actuators in URDF

### Sensors

Sensors are declared as links attached via fixed joints, then configured with **Gazebo plugins** (for simulation) or **driver nodes** (for real hardware).

Common sensors:

- **Cameras**: RGB, depth, or RGB-D (like RealSense). URDF specifies mount position (e.g., "head_link") and orientation (which direction it points). Gazebo plugins generate synthetic images and publish to ROS topics.
- **Lidar**: For 3D mapping. URDF defines the sensor's origin; plugins publish point clouds.
- **IMU (Inertial Measurement Unit)**: Accelerometer + gyroscope on the torso. Reports orientation for balance control.
- **Force-torque sensors**: In feet or hands to measure contact forces.

Example: A camera on a humanoid's head is a link named `camera_optical_frame` attached to `head_link` via a fixed joint. A Gazebo plugin listens to this link, renders the simulated world from its viewpoint, and publishes `sensor_msgs/Image` to `/camera/rgb/image`.

### Actuators

Actuators (motors, servos) **aren't directly in URDF**—they're implied by joints. A revolute joint with effort limits signals "this joint is actuated." The **transmission** element maps actuators to joints (e.g., gear ratios if one motor drives multiple joints).

ROS 2 controllers read URDF joint definitions to:

- Respect position/velocity/effort limits.
- Compute inverse dynamics (torques needed to achieve desired accelerations).
- Interface with motor drivers (send commands to hardware or simulation).

## URDF in Simulation and Deployment

### Simulation Workflow

1. **Load URDF into Gazebo**: The simulator parses your XML, spawns the robot, applies physics (gravity, friction, collisions).
2. **Sensor plugins activate**: Cameras render, lidars ray-cast, IMUs report simulated orientation.
3. **Your AI nodes** subscribe to sensor topics, run inference, publish motor commands.
4. **Gazebo executes commands**: Joint controllers apply torques, physics updates positions, loop repeats at 1000 Hz.

Simulation lets you test **balance control** before your humanoid faceplants, or **grasp planning** before crushing objects. The sim-to-real gap still exists (friction models aren't perfect), but URDF-based simulation drastically reduces iteration time.

### Deployment

When transitioning to hardware:

- **Same URDF**: Minor tweaks for real sensor specs (e.g., actual camera resolution), but the structure stays identical.
- **Driver nodes replace plugins**: Real camera drivers publish to the same `/camera/rgb/image` topic. Your AI code **doesn't change**.
- **Hardware controllers**: `ros2_control` loads the URDF, configures real motor drivers (EtherCAT, CAN bus), and exposes the same ROS 2 interfaces.

This **write-once, deploy-anywhere** philosophy—enabled by URDF as a shared abstraction—is ROS 2's killer feature. Train policies in simulation (millions of iterations), then deploy to hardware with minimal code changes.

---

**Module 1 Complete**: You now understand ROS 2's role (Chapter 1), its communication primitives (Chapter 2), and how robots are modeled (Chapter 3). Next modules will cover hands-on setup, sensor integration, and building your first AI-controlled humanoid. Welcome to physical AI! 🤖
