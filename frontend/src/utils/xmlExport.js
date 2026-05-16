export function exportToXML(nodes, edges) {
  const childMap = {}
  edges.forEach(e => {
    if (!childMap[e.source]) childMap[e.source] = []
    childMap[e.source].push(e.target)
  })
  const nodeMap = {}
  nodes.forEach(n => nodeMap[n.id] = n)
  const roots = nodes.filter(n => !edges.find(e => e.target === n.id))

  function renderNode(id, indent = 4) {
    const node = nodeMap[id]
    if (!node) return ''
    const tag = toTag(node.type, node.data.label)
    const children = (childMap[id] || []).map(cid => renderNode(cid, indent + 2)).join('\n')
    const pad = ' '.repeat(indent)
    return children
      ? `${pad}<${tag} name="${node.data.label}">\n${children}\n${pad}</${tag}>`
      : `${pad}<${tag} name="${node.data.label}"/>`
  }

  function toTag(type, label) {
    return { sequence: 'Sequence', fallback: 'Fallback', parallel: 'Parallel',
             decorator: 'Inverter', action: label, condition: label }[type] || label
  }

  const tree = roots.map(r => renderNode(r.id)).join('\n')
  return `<root main_tree_to_execute="MainTree">\n  <BehaviorTree ID="MainTree">\n${tree}\n  </BehaviorTree>\n</root>`
}
