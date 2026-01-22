import { parse } from "../gmlParser";
import type { NodeId } from "../types/gml";
import type { Graph, Partition } from "../types/graph";

export function parseGml(gml: string): Graph {
    const gmlGraph = parse(gml);

    // collect partitions
    const partitions: { [key: number]: NodeId[] } = {};

    for (const node of gmlGraph.nodes) {
        const partitionId = node.partition ?? -1;
        const partitionNodes: NodeId[] = partitions[partitionId] ?? [];

        partitionNodes.push(node.id);

        partitions[partitionId] = partitionNodes;
    }

    return {
        ...gmlGraph,
        partitions: Object.entries(partitions).map((entry): Partition => ({
            id: Number(entry[0]),
            nodes: entry[1],
        })),
    }
}