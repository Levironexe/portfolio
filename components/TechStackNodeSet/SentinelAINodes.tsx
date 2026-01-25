import {
  Background,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  Position,
  Controls,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import techStackData from './data/techStackData.json';

type TechItem = {
  label: string;
  img: string;
};

type NodeData = {
  label?: string;
  items?: TechItem[];
};

// Generic Tech Node Component
function TechNode({ data }: { data: NodeData }) {
  const items = data.items || [];

  return (
    <div className="px-4 py-3 bg-white rounded-lg border border-neutral-500 shadow-sm min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-neutral-500" />
      <div className="font-semibold text-sm mb-2 text-neutral-700">{data?.label || 'Tech Stack'}</div>
      <ul className="space-y-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
            <img src={item.img} alt={item.label} className="w-4 h-4" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-neutral-500" />
    </div>
  );
}

// Define node types - all using the same TechNode component
const nodeTypes = {
  frontend: TechNode,
  backend: TechNode,
  external: TechNode,
  ai: TechNode,
  datainfra: TechNode,
};

// Transform JSON data into ReactFlow format
const initialNodes = techStackData.writeflow.map((node) => ({
  id: node.id,
  type: node.type,
  position: node.position,
  data: {
    label: node.label,
    items: node.items,
  },
}));

const initialEdges = techStackData.edges;

export default function SentinelAINodes() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: 'auto', height: '80vh' }} className=''>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        zoomOnScroll={false}
      >
        <Controls />
        {/* <MiniMap />         */}
        <Background gap={12} size={1} className='rounded-xl border border-neutral-300 p-1'/>
      </ReactFlow>
    </div>
  );
}
