import { useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAtom } from "jotai";
import { userDataAtom } from "../../../state/Atoms";
import { FrequencyProps, AggregatedData, QueryData } from "../../../../types";

const FlowDiagram = ({ selectedWebsite, selectedPage }: FrequencyProps) => {
  const [userData] = useAtom(userDataAtom);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const pageWidth = 1980;
  const pageHeight = 1080;

  useEffect(() => {
    if (!selectedWebsite || !selectedPage) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const filteredData = userData.filter(
      (interaction: QueryData) =>
        interaction.dataset_id !== null &&
        interaction.website_name === selectedWebsite &&
        interaction.page_url === selectedPage
    );
    const aggregatedData: AggregatedData = {};

    filteredData.forEach((interaction: QueryData) => {
      const key = interaction.dataset_id;

      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          dataset_id: interaction.dataset_id,
          x_coord: interaction.x_coord,
          y_coord: interaction.y_coord,
          count: 0,
        };
      }
      aggregatedData[key].count += 1;
    });

    const pageNode: Node = {
      id: "page",
      data: {
        label: selectedPage,
      },
      position: { x: 0, y: 0 },
      style: {
        width: `${pageWidth}px`,
        height: `${pageHeight}px`,
        backgroundColor: "#ffffff",
        border: "2px solid #000",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        zIndex: -1,
      },
    };

    const initialNodes: Node[] = Object.keys(aggregatedData).map(
      (dataset_id) => {
        const { x_coord, y_coord, count } = aggregatedData[dataset_id];
      console.log(x_coord)
        const pixelX = x_coord * pageWidth;
        const pixelY = y_coord * pageHeight;

        return {
          id: dataset_id,
          data: {
            label: `Button (${count} presses)`,
          },
          position: {
            x: pixelX,
            y: pixelY,
          },
          style: {
            backgroundColor: `rgba(255, 0, 0, ${Math.min(count / 10, 1)})`,
            borderRadius: "8px",
            padding: "10px 20px",
            color: "#fff",
            border: "2px solid #ccc",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          },
        };
      }
    );

    setNodes([pageNode, ...initialNodes]);
    setEdges([]);
  }, [userData, selectedWebsite, selectedPage, setNodes, setEdges]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.5, maxZoom: 0.8 }}
      >
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
