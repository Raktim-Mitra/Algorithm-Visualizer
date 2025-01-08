"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const page = () => {
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("bfs");
    const [running, setRunning] = useState(false);

    // Sample graph represented as an adjacency list
    const graph = {
        0: [1, 2],
        1: [3, 4],
        2: [5, 6],
        3: [],
        4: [],
        5: [],
        6: [],
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const bfsVisualize = async (startNode) => {
        const visited = new Set();
        const queue = [startNode];
        const traversalOrder = [];

        while (queue.length > 0) {
            const node = queue.shift();

            if (!visited.has(node)) {
                visited.add(node);
                traversalOrder.push(node);

                setVisitedNodes([...traversalOrder]);
                await sleep(500);

                for (const neighbor of graph[node]) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
    };

    const dfsVisualize = async (
        node,
        visited = new Set(),
        traversalOrder = []
    ) => {
        if (visited.has(node)) return;

        visited.add(node);
        traversalOrder.push(node);

        setVisitedNodes([...traversalOrder]);
        await sleep(500);

        for (const neighbor of graph[node]) {
            await dfsVisualize(neighbor, visited, traversalOrder);
        }
    };

    const handleVisualize = async () => {
        setRunning(true);
        setVisitedNodes([]);

        switch (selectedAlgorithm) {
            case "bfs":
                await bfsVisualize(0); // Start BFS from node 0
                break;
            case "dfs":
                await dfsVisualize(0); // Start DFS from node 0
                break;
            default:
                break;
        }

        setRunning(false);
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">
                Graph Traversal Visualizer
            </h1>

            <div className="flex space-x-4 mb-6">
                <Select
                    value={selectedAlgorithm}
                    onValueChange={(value) => setSelectedAlgorithm(value)}
                    disabled={running}
                >
                    <SelectTrigger className="bg-white text-black px-4 py-2 rounded">
                        <SelectValue placeholder="Select a search" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        <SelectItem value="bfs">BFS</SelectItem>
                        <SelectItem value="dfs">DFS</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    onClick={handleVisualize}
                    disabled={running}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {running ? "Visualizing..." : "Visualize"}
                </Button>
            </div>

            <div className="flex flex-col items-center space-y-6">
                {Object.entries(graph).map(([node, edges]) => (
                    <div key={node} className="flex items-center space-x-4">
                        <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                                visitedNodes.includes(Number(node))
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                            }`}
                        >
                            {node}
                        </div>
                        {edges.map((edge) => (
                            <div
                                key={`${node}-${edge}`}
                                className="w-8 h-0.5 bg-white"
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
