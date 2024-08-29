import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Node,
  useNodesState,
  useEdgesState,
  OnConnect,
  Edge,
  MiniMap,
  Background,
  Controls,
  Panel,
  ColorMode,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { userDataAtom } from "../../state/Atoms";
import BarGraph from "../ChartPages/Charts/BarGraph-clicks";
const labelStyle = { color: "black", fontSize: "14px" };
import { useAtom } from "jotai";
import Navbar from "../Navbar/Navbar";
import TimeFrameDropdown from "../ChartPages/TimeFrameDropdown";
const NestedFlow = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  const [userData] = useAtom(userDataAtom);
  const allDataResponse = userData.map((query: any) => {
    return {
      element: query.element,
      dataset_id: query.dataset_id,
      x_coord: query.x_coord,
      y_coord: query.y_coord,
      time: query.created_at,
      user_browser: query.browser,
      website: query.website_name,
      user_os: query.os,
      page_url: query.page_url,
    };
  });
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: <span style={labelStyle}>Bargraph</span> },
      position: { x: 100, y: 100 },
      className: "light",
      sourcePosition: "right",
    },
    {
      id: "2",
      type: "default",
      data: { label: <span style={labelStyle}>"Specific website name"</span> },
      position: { x: 300, y: 100 },
      className: "light",
      sourcePosition: "right",
      targetPosition: "left",
    },
    {
      id: "3",
      type: "default",
      data: { label: <span style={labelStyle}>Page url</span> },
      position: { x: 500, y: 100 },
      className: "light",
      sourcePosition: "right",
      targetPosition: "left",
    },
    {
      id: "4",
      type: "output",
      data: {
        label: (
          
          <span style={labelStyle}>
          <div> 
          </div>
            <BarGraph data={allDataResponse} keyword={"website"} />
            
          </span>
        ),
      },
      position: { x: 700, y: 100 },
      className: "light",
      targetPosition: "left",
      style: { width: 600, height: 400 },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      animated: true,
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "smoothstep",
      animated: true,
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
      animated: true,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <TimeFrameDropdown />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="react-flow-subflows-example"
        fitView
      >  
      <Background />  
      </ReactFlow>
    </div>
  );
};

export default NestedFlow;
