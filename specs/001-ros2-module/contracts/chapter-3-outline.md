# Chapter 3 Content Contract: Humanoid Robot Modeling with URDF

**Chapter ID**: `chapter-3`
**File**: `docs/module-1/chapter-3-urdf.md`
**Estimated Length**: 10-12 pages
**Estimated Time**: 45 minutes

---

## Learning Objectives

By the end of this chapter, readers will be able to:

1. Identify all necessary links (body parts) and joints (connections) to represent a humanoid robot's arm (shoulder, elbow, wrist) in URDF structure
2. Determine sensor types (camera, lidar, IMU), their coordinate frames, and how they publish to ROS topics from a URDF snippet
3. Explain how URDF enables testing control algorithms in simulation before hardware deployment
4. Describe how URDF joint definitions map to ROS 2 controller parameters and actuation commands

---

## Key Concepts

### 1. Purpose of URDF in Humanoid Robotics
**Definition**: Unified Robot Description Format (URDF) is XML-based format defining robot's physical structure, sensors, and actuators

**Coverage**:
- Why URDF is needed: Standardized robot model for simulation, visualization, control
- URDF as "blueprint" for robot (like CAD for mechanical design)
- Used by: Gazebo/Isaac Sim (simulation), RViz (visualization), ros2_control (actuation)
- Separation of concerns: Physical structure (URDF) vs. control logic (ROS nodes)

**Learning Element**:
- Diagram: URDF as input to multiple tools (simulator, visualizer, controller)

---

### 2. Links: Rigid Body Components
**Definition**: Link represents a rigid body part of the robot (torso, upper arm, thigh, etc.)

**Coverage**:
- Link properties:
  - **Visual**: 3D mesh for rendering (STL/DAE files)
  - **Collision**: Simplified geometry for physics simulation
  - **Inertial**: Mass, center of mass, inertia tensor (for dynamics)
- Link naming conventions (e.g., `base_link`, `torso`, `left_upper_arm`)
- Coordinate frames: Each link has origin (0,0,0) in its local frame

**Learning Element**:
- Diagram: Humanoid figure with highlighted link (e.g., forearm) showing visual, collision, and inertial properties
- XML Snippet: Minimal link definition with comments

---

### 3. Joints: Connections and Degrees of Freedom
**Definition**: Joint connects two links and defines motion constraints

**Coverage**:
- Joint types:
  - **Revolute**: Rotational (hinge) with limits (e.g., elbow: 0° to 150°)
  - **Prismatic**: Linear sliding (e.g., gripper fingers)
  - **Fixed**: No motion (e.g., sensor mount)
  - **Continuous**: Unlimited rotation (e.g., wheel)
- Joint properties:
  - Parent/child links
  - Axis of rotation/translation
  - Limits (position, velocity, effort)
  - Damping and friction (physics parameters)
- Coordinate transforms: Joint defines how child link is positioned relative to parent

**Learning Element**:
- Diagram: Elbow joint showing rotation axis, angle limits, parent (upper arm) and child (forearm) links
- XML Snippet: Revolute joint definition with inline comments

---

### 4. Sensors in URDF
**Definition**: Sensors are attached to links and defined in URDF for simulation and data publishing

**Coverage**:
- Sensor types:
  - **Camera**: Visual data (RGB, depth)
  - **Lidar**: Point cloud data (3D environment)
  - **IMU**: Inertial measurement (acceleration, angular velocity)
  - **Force-Torque**: Contact forces (e.g., foot pressure)
- Sensor properties:
  - Parent link (where sensor is mounted)
  - Pose (position and orientation relative to link)
  - ROS topic (where sensor data is published)
- Gazebo/Isaac Sim plugins: Map URDF sensor to simulated data stream

**Learning Element**:
- Diagram: Humanoid head with camera sensor, showing mount point and field of view
- Example: Camera URDF snippet with Gazebo plugin configuration

---

### 5. Actuators in URDF
**Definition**: Actuators (motors, servos) control joint motion based on commands from ROS 2 controllers

**Coverage**:
- Actuator-joint relationship: Each actuated joint has motor (torque/position control)
- Transmission: Maps actuator input to joint motion (gear ratios, belt drives)
- Effort limits: Maximum torque/force an actuator can apply
- Controller interface: ROS 2 controller reads URDF joint limits and sends commands to actuators

**Learning Element**:
- Diagram: Joint with motor, showing command flow (ROS topic → controller → actuator → joint motion)

---

### 6. URDF for Simulation
**Definition**: URDF enables physics-based simulation in Gazebo or NVIDIA Isaac Sim before hardware testing

**Coverage**:
- Simulation workflow:
  1. Load URDF into simulator
  2. Physics engine applies gravity, collisions, joint dynamics
  3. Sensors generate synthetic data (simulated camera images, lidar scans)
  4. Controllers send actuator commands
  5. Observe robot behavior in virtual environment
- Sim-to-real transfer: Test algorithms safely, then deploy to hardware
- Benefits: Rapid iteration, no hardware damage, parallel testing

**Learning Element**:
- Diagram (Flowchart): URDF → Simulator → Sensors → ROS Topics → Controller → Actuators → Physics → Repeat
- Example Scenario: Balance controller tested in Gazebo before deploying to physical humanoid

---

### 7. URDF and ROS 2 Controllers
**Definition**: ROS 2 controllers use URDF joint definitions to configure control loops (PID, trajectory, effort control)

**Coverage**:
- Controller types:
  - **Position controller**: Move joint to target angle
  - **Velocity controller**: Control joint angular/linear velocity
  - **Effort controller**: Apply torque/force directly
- Controller configuration: Reads URDF for joint names, limits, actuator properties
- Control loop: Controller subscribes to sensor data, publishes actuator commands based on URDF joint constraints

**Learning Element**:
- Diagram: URDF joint definition → Controller config → Control loop (sensor feedback → compute → actuator command)

---

## Content Structure

### Section 3.1: Purpose of URDF
- What is URDF? (Explain)
- URDF as input to tools (Show: diagram)
- Why standardized format matters (Apply)

### Section 3.2: Links - Rigid Body Components
- Link properties (Explain: visual, collision, inertial)
- Link example (Show: diagram + XML snippet)
- Humanoid arm links (Apply: shoulder to wrist)

### Section 3.3: Joints - Connections and Degrees of Freedom
- Joint types (Explain: revolute, prismatic, fixed, continuous)
- Joint example (Show: elbow diagram + XML snippet)
- Humanoid arm joints (Apply: shoulder, elbow, wrist DOFs)

### Section 3.4: Sensors in URDF
- Sensor types and properties (Explain)
- Camera sensor example (Show: diagram + XML snippet with Gazebo plugin)
- Sensor data flow (Apply: camera → ROS topic `/camera/image`)

### Section 3.5: Actuators in URDF
- Actuator-joint relationship (Explain)
- Motor and transmission (Show: diagram)
- Control command flow (Apply: ROS topic → controller → actuator)

### Section 3.6: URDF for Simulation
- Simulation workflow (Explain: URDF → Gazebo → physics)
- Sim-to-real benefits (Show: flowchart)
- Example: Balance control in simulation (Apply)

### Section 3.7: URDF and ROS 2 Controllers
- Controller types (Explain: position, velocity, effort)
- Controller configuration from URDF (Show: diagram)
- Control loop (Apply: sensor → controller → actuator)

---

## Required Diagrams

1. **URDF Ecosystem** (Mermaid: URDF → [Gazebo, RViz, ros2_control])
2. **Link Properties** (Static diagram: humanoid link with visual/collision/inertial labels)
3. **Joint Structure** (Static diagram: elbow joint with axis, limits, parent/child links)
4. **URDF Kinematic Tree** (Mermaid tree: base_link → torso → limbs → joints)
5. **Sensor Mount and Data Flow** (Mermaid: sensor → plugin → ROS topic)
6. **Simulation Workflow** (Mermaid flowchart: URDF → simulator → control loop)
7. **Controller Integration** (Mermaid: URDF → controller config → control loop)

---

## Code Examples

**XML Snippets (URDF, heavily commented for clarity)**:

### Example 1: Simple Link
```xml
<link name="forearm">
  <!-- Visual: What the link looks like (for rendering) -->
  <visual>
    <geometry>
      <cylinder length="0.3" radius="0.03"/>  <!-- 30cm long, 3cm radius -->
    </geometry>
    <material name="metal_grey"/>
  </visual>

  <!-- Collision: Simplified shape for physics (can be same as visual) -->
  <collision>
    <geometry>
      <cylinder length="0.3" radius="0.03"/>
    </geometry>
  </collision>

  <!-- Inertial: Mass and inertia (simplified for clarity) -->
  <inertial>
    <mass value="0.5"/>  <!-- 0.5 kg -->
    <inertia ixx="0.001" iyy="0.001" izz="0.0001" ixy="0" ixz="0" iyz="0"/>
  </inertial>
</link>
```

### Example 2: Revolute Joint (Elbow)
```xml
<joint name="elbow_joint" type="revolute">
  <parent link="upper_arm"/>
  <child link="forearm"/>

  <!-- Axis of rotation (z-axis in this example) -->
  <axis xyz="0 0 1"/>

  <!-- Joint origin (position and orientation relative to parent link) -->
  <origin xyz="0 0 0.3" rpy="0 0 0"/>  <!-- 30cm from parent origin -->

  <!-- Joint limits -->
  <limit lower="0" upper="2.617" effort="50" velocity="3.14"/>
  <!-- lower/upper: 0 to 150 degrees (in radians) -->
  <!-- effort: max torque 50 Nm -->
  <!-- velocity: max angular velocity π rad/s -->
</joint>
```

### Example 3: Camera Sensor (Gazebo Plugin)
```xml
<link name="head">
  <!-- ... link definition ... -->
</link>

<!-- Camera sensor attached to head link -->
<gazebo reference="head">
  <sensor name="camera" type="camera">
    <camera>
      <horizontal_fov>1.047</horizontal_fov>  <!-- 60 degrees -->
      <image>
        <width>640</width>
        <height>480</height>
      </image>
    </camera>

    <!-- Publish to ROS topic -->
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <ros>
        <namespace>/robot</namespace>
        <argument>camera/image:=camera/image_raw</argument>
      </ros>
    </plugin>
  </sensor>
</gazebo>
```

---

## External References

- [URDF Tutorials (ROS Wiki)](http://wiki.ros.org/urdf/Tutorials)
- [URDF XML Specification](http://wiki.ros.org/urdf/XML)
- [Gazebo URDF Integration](https://classic.gazebosim.org/tutorials?tut=ros_urdf)
- [ros2_control Documentation](https://control.ros.org/master/index.html)
- Example URDF: [Universal Robots UR5](https://github.com/ros-industrial/universal_robot/tree/melodic-devel/ur_description/urdf) (reference, not included in book)

---

## Acceptance Criteria

- [ ] All learning objectives testable via URDF snippet analysis
- [ ] 7 diagrams included (mix of Mermaid and static)
- [ ] 3 XML code snippets with detailed inline comments
- [ ] External references cited (5+ citations)
- [ ] URDF kinematic tree example for humanoid arm (shoulder → elbow → wrist)
- [ ] Simulation workflow explained step-by-step
- [ ] Controller integration clearly linked to URDF joint definitions
- [ ] Estimated reading time validated (45 min for 10-12 pages)
- [ ] Module conclusion: Summary of ROS 2 concepts and next steps (hands-on modules)
