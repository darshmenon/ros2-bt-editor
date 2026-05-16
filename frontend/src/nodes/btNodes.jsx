import React from 'react'
import { Handle, Position } from 'reactflow'

const NodeBox = ({ data, color }) => (
  <div style={{ padding: '8px 14px', borderRadius: 6, background: color,
    border: '1px solid #555', minWidth: 120, textAlign: 'center', fontSize: 12 }}>
    <Handle type="target" position={Position.Top} />
    <strong>{data.label}</strong>
    <Handle type="source" position={Position.Bottom} />
  </div>
)

const SequenceNode  = ({ data }) => <NodeBox data={data} color="#1a4a6e" />
const FallbackNode  = ({ data }) => <NodeBox data={data} color="#6e1a1a" />
const ParallelNode  = ({ data }) => <NodeBox data={data} color="#3a1a6e" />
const ActionNode    = ({ data }) => <NodeBox data={data} color="#1a5a2e" />
const ConditionNode = ({ data }) => <NodeBox data={data} color="#5a4a1a" />
const DecoratorNode = ({ data }) => <NodeBox data={data} color="#4a1a5a" />

export const NODE_TYPES = {
  sequence: SequenceNode, fallback: FallbackNode, parallel: ParallelNode,
  action: ActionNode, condition: ConditionNode, decorator: DecoratorNode,
}

export const BT_NODES = {
  sequence:  { label: 'Sequence',         category: 'control' },
  fallback:  { label: 'Fallback',         category: 'control' },
  parallel:  { label: 'Parallel',         category: 'control' },
  decorator: { label: 'Inverter',         category: 'decorator' },
  action:    { label: 'NavigateToPose',   category: 'nav2' },
  condition: { label: 'GoalReached',      category: 'nav2' },
}
