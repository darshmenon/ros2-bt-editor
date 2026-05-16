# ROS 2 Behavior Tree Editor

A web-based drag-and-drop editor for building Nav2 Behavior Trees — no XML editing by hand.

## Why

Nav2 Behavior Trees are powerful but painful to write. This editor lets you:
- Build trees visually with drag-and-drop nodes
- Export valid Nav2 BehaviorTree XML instantly
- Import existing XML and edit it
- Save/load trees locally

## Stack

- **Frontend:** React + React Flow
- **XML generation:** Custom Nav2 BT schema

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

## Node Types Supported

| Category | Nodes |
|----------|-------|
| Control | Sequence, Fallback, Parallel, ReactiveSequence |
| Decorators | Inverter, ForceSuccess, Repeat, Retry |
| Nav2 Actions | NavigateToPose, NavigateThroughPoses, Spin, Wait, Backup |
| Nav2 Conditions | GoalReached, IsBatteryLow, IsStuck, TransformAvailable |

## Export Format

```xml
<root main_tree_to_execute="MainTree">
  <BehaviorTree ID="MainTree">
    <Sequence name="root_sequence">
      <ComputePathToPose goal="{goal}" path="{path}" planner_id="GridBased"/>
      <FollowPath path="{path}" controller_id="FollowPath"/>
    </Sequence>
  </BehaviorTree>
</root>
```

## Roadmap

- [ ] RViz2 panel integration
- [ ] Live tree execution status overlay
- [ ] Node parameter editor panel
- [ ] Subtree support
- [ ] Share trees via URL

## License

Apache 2.0
