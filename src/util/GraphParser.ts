import { parse } from "../lib/gmlParser";
import type { GmlGraph, NodeId } from "../types/gml";
import type { Graph, Partition } from "../types/graph";

export function calculatePartitions(gmlGraph: GmlGraph): Partition[] {
    const partitionMap: { [key: number]: NodeId[] } = {};

    for (const node of gmlGraph.nodes) {
        const partitionId = node.partition ?? -1;
        const partitionNodes: NodeId[] = partitionMap[partitionId] ?? [];

        partitionNodes.push(node.id);

        partitionMap[partitionId] = partitionNodes;
    }

    const partitions = Object.entries(partitionMap).map((entry): Partition => ({
        id: Number(entry[0]),
        nodes: entry[1],
    }));

    return partitions;
}

export function parseGml(gml: string): Graph {
    const gmlGraph = parse(gml);

    const partitions = calculatePartitions(gmlGraph);

    const nodeToPartition: { [key: NodeId]: Partition | undefined } = {};

    for (const node of gmlGraph.nodes) {
        const partitionId = node.partition ?? -1

        nodeToPartition[node.id] = partitions.find(x => x.id == partitionId);
    }

    return {
        ...gmlGraph,
        partitions,
        nodeToPartition,
    }
}