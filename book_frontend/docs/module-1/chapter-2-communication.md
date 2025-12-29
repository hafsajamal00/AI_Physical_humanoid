---
sidebar_position: 2
title: Chapter 2 - ROS 2 Communication and Control
---

# Chapter 2: ROS 2 Communication and Control

## ROS 2 Nodes

A **node** is ROS 2's fundamental unit of computation—a self-contained process responsible for a specific task. Think of nodes as microservices in a distributed system: a camera driver node, an object detection node, a path planning node, a motor controller node. Each runs independently, potentially on different machines, yet coordinates seamlessly through ROS 2's communication layer.

Nodes follow a **single-responsibility principle**: the camera node only captures images, it doesn't process them. This modularity enables:

- **Parallel development**: Teams work on separate nodes without conflicts.
- **Fault isolation**: A crashed AI node doesn't bring down motor control.
- **Reusability**: Use the same camera node across robots with different AI pipelines.

When a node starts, it registers with the **ROS 2 discovery system** (built on DDS—Data Distribution Service). Other nodes automatically detect it without centralized coordination—no master server like ROS 1. This peer-to-peer architecture improves reliability: if one node fails, the rest continue operating.

Nodes communicate via **topics** (publish-subscribe) and **services** (request-response). A typical humanoid robot runs 20-50 nodes: sensor drivers, state estimators, AI inference engines, motion planners, motor controllers, logging services. Each a specialist, collectively orchestrating intelligence.

## Topics and Message Passing

**Topics** implement the **publish-subscribe pattern**—the workhorse of ROS 2 communication. A topic is a named data stream (e.g., `/camera/rgb/image`) carrying **messages** of a specific type (e.g., `sensor_msgs/Image`).

Here's how it works:

- **Publishers** produce data: a camera node publishes images to `/camera/rgb/image` at 30 Hz.
- **Subscribers** consume data: an AI node subscribes to `/camera/rgb/image`, receiving every frame via a callback function.
- **Many-to-many**: Multiple publishers can write to one topic; multiple subscribers can read from it. Data flows asynchronously—publishers don't wait for subscribers.

Topics excel for **continuous data streams**: sensor readings, state estimates, control commands. They're **fire-and-forget**—publishers don't know if anyone's listening, and don't care. This decoupling means you can launch an AI node later without reconfiguring the camera.

**Message types** are strongly typed, version-controlled structs. Common ones:

- `sensor_msgs/Image`: pixel data + encoding + timestamp
- `geometry_msgs/Twist`: linear/angular velocity commands
- `nav_msgs/Odometry`: robot position + orientation + velocities

Custom messages let you define domain-specific data (e.g., `BoundingBox[]` for detected objects). ROS 2 auto-generates serialization code, ensuring efficient, cross-language compatibility.

## Services and Request–Response

While topics handle streaming data, **services** implement **synchronous request-response** for **on-demand operations**. Think remote procedure calls (RPC): a client sends a request, blocks until the server replies.

Example use case: inverse kinematics. Your AI node detects "grasp target at (x, y, z)" and needs joint angles to reach it. Instead of continuously computing IK, you call an IK service:

1. **Client** (AI node) sends `ComputeIK` request with target pose.
2. **Server** (IK node) computes joint angles, returns response.
3. **Client** receives angles, publishes them to motor controllers via a topic.

Services fit **infrequent, transactional** interactions: configuration changes, calibration requests, trajectory planning. Unlike topics, they're **blocking** (caller waits for response) and **one-to-one** (only one server per service name).

**When to use what?**

- **Topics**: High-frequency, continuous (sensor streams, control loops)
- **Services**: Low-frequency, request-driven (planning queries, parameter updates)

Mixing them is common: a node subscribes to camera topics, processes frames, then calls a service to fetch a 3D map before publishing navigation commands.

## Bridging Python AI Agents with rclpy

Most AI engineers work in Python, leveraging PyTorch, TensorFlow, or scikit-learn. **rclpy** (ROS Client Library for Python) lets you integrate these models into ROS 2 seamlessly.

A minimal rclpy node:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image

class ObjectDetector(Node):
    def __init__(self):
        super().__init__('object_detector')
        # Subscribe to camera topic
        self.subscription = self.create_subscription(
            Image, '/camera/rgb/image', self.callback, 10)
        # Publisher for detections
        self.publisher = self.create_publisher(
            BoundingBoxArray, '/detections', 10)

    def callback(self, msg):
        # Convert ROS image to NumPy array
        frame = self.ros_to_numpy(msg)
        # Run YOLO inference
        boxes = self.yolo_model(frame)
        # Publish results
        self.publisher.publish(boxes)
```

Key patterns:

- **Callbacks**: Your function is invoked every time a message arrives—no polling loops.
- **ROS ↔ NumPy bridges**: `cv_bridge` converts ROS images to OpenCV/NumPy arrays for model input.
- **Threading**: rclpy uses executors to spin callbacks. For heavy inference, run models in separate threads to avoid blocking message handling.

**AI workflow**:

1. Train your model offline (PyTorch on GPUs).
2. Export to ONNX or TorchScript for efficient inference.
3. Load the model in your rclpy node's `__init__`.
4. In the callback, preprocess ROS messages (resize images, normalize), run inference, post-process outputs, publish results.

**Real-time tips**:

- Use **batching** if your sensor publishes faster than inference runs (queue N frames, infer together).
- Publish **metadata** (timestamps, confidence scores) alongside predictions for downstream filtering.
- Leverage **Quality of Service** (QoS) policies: "best-effort" for low-latency cameras, "reliable" for critical commands.

With rclpy, your cutting-edge AI research transitions from Jupyter notebooks to production robots without rewriting infrastructure. ROS 2 handles message passing, time sync, and distributed coordination—you focus on intelligence.

---

**Next**: [Chapter 3](/module-1/chapter-3-urdf) explores URDF, the XML-based format for modeling your robot's physical structure—how links, joints, and sensors are defined for simulation and control.
