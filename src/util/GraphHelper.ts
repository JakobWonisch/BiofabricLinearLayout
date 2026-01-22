import type { NodeId } from "../types/gml";
import type { Graph, Partition } from "../types/graph";

export class GraphHelper {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    getPartition(node: NodeId): Partition | undefined {
        return this.graph.nodeToPartition[node];
    }
}