import { useEffect, useState, useRef } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Panel,
  Position,
  Node,
  Edge,
} from "@xyflow/react";
import { useAtom } from "jotai";
import { userDataAtom, websitesAtom } from "../../../state/Atoms";
import "@xyflow/react/dist/style.css";
import Button from "@mui/material/Button";
import Layout from "./Layout";
import * as htmlToImage from "html-to-image";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FlowDiagram = () => {
  const diagramRef = useRef(null);
  const [userData] = useAtom(userDataAtom);
  const [websiteList] = useAtom(websitesAtom);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [layoutDirection, setLayoutDirection] = useState("TB");
  const proOptions = { hideAttribution: true };
  const [colorMode, setColorMode] = useState<"dark" | "light" | "system">(
    "light"
  );

  useEffect(() => {
    const nodeData: Node[] = [];
    const edgeData: Edge[] = [];

    const overallNode = {
      id: "overall",
      data: { label: "Overall Data" },
      position: { x: 0, y: 0 },
      type: "input",
      sourcePosition:
        layoutDirection === "TB" ? Position.Bottom : Position.Right,
      targetPostion: layoutDirection === "TB" ? Position.Left : Position.Left,
      style: {
        backgroundColor: "#6c5ce7",
        borderRadius: "8px",
        padding: "10px",
        color: "#fff",
        border: "2px solid #ccc",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      },
    };
    nodeData.push(overallNode);

    websiteList.forEach((website, websiteIndex) => {
      const websiteNodeId = `website-${websiteIndex}`;
      const websiteNode = {
        id: websiteNodeId,
        data: { label: website },
        position: { x: 0, y: 0 },
        sourcePosition:
          layoutDirection === "TB" ? Position.Bottom : Position.Right,
        targetPosition: layoutDirection === "TB" ? Position.Top : Position.Left,
        style: {
          backgroundColor: "#0984e3",
          borderRadius: "8px",
          padding: "10px",
          color: "#fff",
          border: "2px solid #ccc",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        },
      };
      nodeData.push(websiteNode);
      edgeData.push({
        id: `e-overall-${websiteNodeId}`,
        source: "overall",
        target: websiteNodeId,
      });

      const filteredUserData = userData.filter(
        (item) => item.website_name === website
      );
      const pageUrls = filteredUserData.map((item) => item.page_url);
      const uniquePageUrlsSet = new Set(pageUrls);
      const pages = Array.from(uniquePageUrlsSet);

      pages.forEach((page, pageIndex) => {
        const pageNodeId = `website-${websiteIndex}-page-${pageIndex}`;
        const pageNode = {
          id: pageNodeId,
          data: { label: page },
          position: { x: 0, y: 0 },
          sourcePosition:
            layoutDirection === "TB" ? Position.Bottom : Position.Right,
          targetPosition:
            layoutDirection === "TB" ? Position.Top : Position.Left,
          style: {
            backgroundColor: "#00cec9",
            borderRadius: "8px",
            padding: "10px",
            color: "#fff",
            border: "2px solid #ccc",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          },
        };
        nodeData.push(pageNode);
        edgeData.push({
          id: `e-${websiteNodeId}-${pageNodeId}`,
          source: websiteNodeId,
          target: pageNodeId,
        });

        const buttonCount = userData.filter(
          (item) =>
            item.website_name === website &&
            item.page_url === page &&
            item.element === "button"
        ).length;

        const buttonNodeId = `website-${websiteIndex}-page-${pageIndex}-button`;
        const buttonNode = {
          id: buttonNodeId,
          type: "output",
          data: { label: `Buttons: ${buttonCount}` },
          position: { x: 0, y: 0 },
          sourcePosition:
            layoutDirection === "TB" ? Position.Bottom : Position.Right,
          targetPosition:
            layoutDirection === "TB" ? Position.Top : Position.Left,
          style: {
            backgroundColor: "#fdcb6e",
            borderRadius: "8px",
            padding: "10px",
            color: "#000",
            border: "2px solid #ccc",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          },
        };
        nodeData.push(buttonNode);
        edgeData.push({
          id: `e-${pageNodeId}-${buttonNodeId}`,
          source: pageNodeId,
          target: buttonNodeId,
        });
      });
    });

    const layoutedElements = Layout(nodeData, edgeData, layoutDirection);

    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
  }, [userData, setNodes, setEdges, layoutDirection]);

  const toggleLayout = () => {
    setLayoutDirection((prevDirection) =>
      prevDirection === "TB" ? "LR" : "TB"
    );
  };

  const handleExport = () => {
    if (diagramRef.current) {
      const diagramElement = diagramRef.current as HTMLElement;
      const panelElement = diagramElement.querySelector(
        ".react-flow__panel"
      ) as HTMLElement;
      if (panelElement) {
        panelElement.style.display = "none";
      }
      htmlToImage.toPng(diagramElement).then((dataUrl) => {
        if (panelElement) {
          panelElement.style.display = "block";
        }
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "flow-diagram.png";
        link.click();
      });
    }
  };

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as "dark" | "light" | "system");
  };
  onChange;

  return (
    <div
      ref={diagramRef}
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
        colorMode={colorMode}
        proOptions={proOptions}
      >
        <Background color="#aaa" gap={16} />
        <Panel
          position="top-left"
          style={{ marginTop: "90px", marginLeft: "220px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleLayout}
            sx={{
              width: "150px",
              height: "50px",
              minWidth: "150px",
              minHeight: "50px",
              maxWidth: "150px",
              maxHeight: "50px",
            }}
          >
            {layoutDirection === "TB" ? "Horizontal" : "Vertical"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExport}
            sx={{
              width: "150px",
              height: "50px",
              minWidth: "150px",
              minHeight: "50px",
              maxWidth: "150px",
              maxHeight: "50px",
              marginLeft: "10px",
            }}
          >
            Export to Image
          </Button>

          <FormControl
            variant="outlined"
            sx={{ minWidth: 150, marginLeft: "10px" }}
          >
            <InputLabel
              sx={{
                color: colorMode === "dark" ? "#fff" : "#000", 
              }}
            >
              Color Mode
            </InputLabel>
            <Select
              label="Color Mode"
              value={colorMode}
              onChange={(evt) =>
                setColorMode(evt.target.value as "dark" | "light" | "system")
              }
              sx={{
                color: colorMode === "dark" ? "#fff" : "#000",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: colorMode === "dark" ? "#fff" : "#000", 
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorMode === "dark" ? "#fff" : "#000",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colorMode === "dark" ? "#fff" : "#000",
                },
              }}
            >
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </Select>
          </FormControl>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
