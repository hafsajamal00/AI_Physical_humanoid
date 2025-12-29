# Chapter 2 Content Contract: ROS 2 Communication Primitives

**Chapter ID**: `chapter-2`
**File**: `docs/module-1/chapter-2-communication.md`
**Estimated Length**: 12-15 pages
**Estimated Time**: 60 minutes

---

## Learning Objectives

By the end of this chapter, readers will be able to:

1. Identify the correct ROS 2 communication pattern (topic vs. service) for different robotics use cases
2. Explain message-passing flow with timing diagrams showing asynchronous (topic) vs. synchronous (service) patterns
3. Outline the rclpy workflow for integrating a Python AI model with ROS 2 in pseudocode
4. Analyze robot control architectures to identify communication paths and potential bottlenecks

---

## Key Concepts

### 1. ROS 2 Nodes
**Definition**: Modular computation units performing specific tasks (e.g., sensor driver, AI inference, motor control)

**Coverage**:
- Node as independent process or component
- Node responsibilities: single-purpose modules (Unix philosophy)
- Lifecycle: creation, execution, shutdown
- Discovery: Nodes find each other automatically via DDS (Data Distribution Service)

**Learning Element**:
- Diagram: Multiple nodes in a robotic system (sensor nodes, control nodes, actuator nodes)
- Example: Camera driver node publishes images, object detection node subscribes

---

### 2. ROS 2 Topics (Publish-Subscribe)
**Definition**: Named channels for asynchronous, many-to-many communication

**Coverage**:
- Publish-subscribe pattern (decoupled senders/receivers)
- Topic names (e.g., `/camera/image`, `/cmd_vel`)
- Message types (typed data structures: sensor_msgs/Image, geometry_msgs/Twist)
- Many publishers, many subscribers (1-to-N, N-to-M)
- No blocking: Publishers don't wait for subscribers

**Use Cases**:
- High-frequency sensor data (camera 30 Hz, lidar 10 Hz)
- Robot state broadcasting (joint positions, odometry)
- Continuous data streams

**Learning Element**:
- Diagram (Mermaid): Sequence diagram showing topic message flow
- Pseudocode: rclpy publisher and subscriber setup

---

### 3. ROS 2 Services (Request-Response)
**Definition**: Synchronous, request-response communication for intermittent operations

**Coverage**:
- Client-server pattern (1-to-1 communication)
- Blocking behavior: Client waits for server response
- Service names (e.g., `/reset_robot`, `/get_plan`)
- Request/response types (paired message definitions)

**Use Cases**:
- Calibration triggers
- One-time queries (get current state, compute plan)
- Mode switches (start/stop recording)

**Learning Element**:
- Diagram (Mermaid): Service call sequence with timing
- Comparison table: Topics vs. Services (when to use each)

---

### 4. Real-time Considerations and QoS
**Definition**: Quality of Service (QoS) policies to tune reliability, latency, and throughput

**Coverage**:
- Reliability: Best-effort (fast, lossy) vs. Reliable (guaranteed delivery, slower)
- History: Keep-last (buffer size) vs. Keep-all
- Durability: Volatile (current session) vs. Transient-local (late-joiner access)
- Latency vs. throughput trade-offs
- Real-time constraints: 30 Hz camera needs low-latency QoS

**Use Cases**:
- Best-effort for sensor data (old data irrelevant)
- Reliable for command messages (can't miss stop command)

**Learning Element**:
- Diagram: QoS settings impact on message delivery
- Example: Camera data (best-effort, keep-last 1) vs. safety commands (reliable, keep-all)

---

### 5. Using rclpy for Python AI Integration
**Definition**: Python client library (rclpy) to interface Python AI code with ROS 2

**Coverage**:
- rclpy basics: Initialize node, create publishers/subscribers, spin (event loop)
- Workflow: Python AI model → ROS topic publisher → robot actuators
- Callbacks: Handle incoming messages asynchronously
- Integration pattern: AI inference in callback, publish results to control topic

**Learning Element**:
- Pseudocode workflow (5-step process):
  1. Initialize rclpy and create node
  2. Create subscriber to sensor topic (e.g., `/camera/image`)
  3. In callback: Run AI inference (object detection)
  4. Create publisher to command topic (e.g., `/cmd_vel`)
  5. Publish control commands based on AI output

- Example Scenario: Python YOLO model subscribes to camera, publishes bounding boxes to `/detected_objects` topic

---

## Content Structure

### Section 2.1: ROS 2 Nodes
- What are nodes? (Explain)
- Node architecture diagram (Show)
- Example: Sensor + AI + Control nodes (Apply)

### Section 2.2: ROS 2 Topics
- Publish-subscribe pattern (Explain)
- Topic message flow (Show: Mermaid sequence diagram)
- Use case: Sensor data streaming (Apply)

### Section 2.3: ROS 2 Services
- Request-response pattern (Explain)
- Service call timing (Show: Mermaid diagram)
- Use case: Calibration trigger (Apply)

### Section 2.4: Topics vs. Services Decision Guide
- Comparison table (Show)
- Decision flowchart (Show: Mermaid)
- Key Takeaways: When to use each (Apply)

### Section 2.5: Real-time Considerations and QoS
- QoS policies (Explain)
- Impact on message delivery (Show: diagram)
- Tuning for robot scenarios (Apply: camera vs. commands)

### Section 2.6: Using rclpy for Python AI Integration
- rclpy workflow (Explain: 5 steps)
- Pseudocode example (Show: publisher + subscriber)
- Integration scenario (Apply: AI model → ROS topic)

---

## Required Diagrams

1. **ROS 2 Nodes in a System** (Mermaid graph: nodes and their connections)
2. **Topic Message Flow** (Mermaid sequence diagram: publisher → topic → subscribers)
3. **Service Call Flow** (Mermaid sequence diagram: client request → server → response)
4. **Topics vs. Services Decision Flowchart** (Mermaid flowchart: "Is it continuous data? → Yes: Topic, No: Is it one-time? → Yes: Service")
5. **QoS Impact on Delivery** (Mermaid or static diagram: best-effort vs. reliable)

---

## Code Examples

**Pseudocode (Python-style, rclpy)**:

### Example 1: Topic Publisher
```python
import rclpy
from sensor_msgs.msg import Image

# Initialize ROS 2
rclpy.init()
node = rclpy.create_node('camera_publisher')

# Create publisher
publisher = node.create_publisher(Image, '/camera/image', qos_profile=10)

# Publish loop
while rclpy.ok():
    image_msg = capture_image()  # Pseudocode: get image from camera
    publisher.publish(image_msg)
    time.sleep(1/30)  # 30 Hz
```

### Example 2: Topic Subscriber with AI Inference
```python
import rclpy
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist

def image_callback(msg):
    # AI inference (pseudocode)
    detections = yolo_model.detect(msg.data)

    # Compute control command based on detections
    cmd = compute_motion_command(detections)

    # Publish control command
    cmd_publisher.publish(cmd)

# Initialize
rclpy.init()
node = rclpy.create_node('ai_controller')

# Subscribe to camera
subscriber = node.create_subscription(Image, '/camera/image', image_callback, 10)

# Publisher for commands
cmd_publisher = node.create_publisher(Twist, '/cmd_vel', 10)

# Spin (event loop)
rclpy.spin(node)
```

### Example 3: Service Client
```python
import rclpy
from std_srvs.srv import Trigger

# Initialize
rclpy.init()
node = rclpy.create_node('calibration_client')

# Create service client
client = node.create_client(Trigger, '/reset_robot')

# Wait for service
client.wait_for_service()

# Call service
request = Trigger.Request()
future = client.call_async(request)
rclpy.spin_until_future_complete(node, future)

if future.result().success:
    print("Robot reset successful")
```

---

## External References

- [ROS 2 Humble Topics Tutorial](https://docs.ros.org/en/humble/Tutorials/Topics.html)
- [ROS 2 Services Tutorial](https://docs.ros.org/en/humble/Tutorials/Services.html)
- [rclpy API Documentation](https://docs.ros2.org/latest/api/rclpy/)
- [DDS QoS Policies](https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html)

---

## Acceptance Criteria

- [ ] All learning objectives testable via use-case analysis
- [ ] 5 diagrams included (Mermaid + static if needed)
- [ ] 3 pseudocode examples with inline comments
- [ ] External references cited (4+ citations)
- [ ] Topics vs. Services comparison table clear
- [ ] QoS explanation includes real-world trade-offs
- [ ] rclpy workflow explained step-by-step
- [ ] Estimated reading time validated (60 min for 12-15 pages)
- [ ] Smooth transition to Chapter 3 (bridge to URDF and controllers)
