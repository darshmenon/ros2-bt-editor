import React, { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge, MiniMap, Controls, Background,
  useNodesState, useEdgesState
} from 'reactflow'
import 'reactflow/dist/style.css'
import { exportToXML } from './utils/xmlExport'
import { NODE_TYPES, BT_NODES } from './nodes/btNodes'

const initialNodes = [
  { id: '1', type: 'sequence', position: { x: 300, y: 100 }, data: { label: 'Sequence' } },
]

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [xml, setXml] = useState('')

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const handleExport = () => setXml(exportToXML(nodes, edges))

  const addNode = (type) => {
    const id = String(Date.now())
    setNodes((ns) => [...ns, {
      id, type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: BT_NODES[type]?.label || type }
    }])
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 200, background: 'var(--panel)', padding: 12, overflowY: 'auto' }}>
        <h3 style={{ marginBottom: 12, color: '#e94560' }}>Nodes</h3>
        {Object.entries(BT_NODES).map(([type, meta]) => (
          <button key={type} onClick={() => addNode(type)}
            style={{ display: 'block', width: '100%', marginBottom: 6, padding: '6px 8px',
              background: 'var(--accent)', color: '#eee', border: 'none', borderRadius: 4,
              cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
            {meta.label}
          </button>
        ))}
        <hr style={{ margin: '12px 0', borderColor: '#333' }} />
        <button onClick={handleExport}
          style={{ width: '100%', padding: '8px', background: '#e94560',
            color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Export XML
        </button>
      </aside>

      <div style={{ flex: 1 }}>
        <ReactFlow nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          onConnect={onConnect} nodeTypes={NODE_TYPES} fitView>
          <MiniMap /><Controls /><Background />
        </ReactFlow>
      </div>

      {xml && (
        <aside style={{ width: 320, background: 'var(--panel)', padding: 12, overflowY: 'auto' }}>
          <h3 style={{ marginBottom: 8, color: '#e94560' }}>Nav2 XML</h3>
          <pre style={{ fontSize: 11, whiteSpace: 'pre-wrap', color: '#aef' }}>{xml}</pre>
        </aside>
      )}
    </div>
  )
}
