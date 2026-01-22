import type { Graph } from "../types/graph";
import type { ConstraintSolver } from "./ConstraintSolver";
import type { GraphHelper } from "./GraphHelper";

export function generateGroupingConstraints(graph: Graph, constraintSolver: ConstraintSolver, graphHelper: GraphHelper) {
    for (let a = 0; a < graph.nodes.length; a++) {
        for (let b = a + 1; b < graph.nodes.length; b++) {
            for (let c = 0; c < graph.nodes.length; c++) {
                const nodeI = graph.nodes[a].id;
                const nodeK = graph.nodes[b].id;
                const nodeJ = graph.nodes[c].id;

                if (a == c || b == c) {
                    continue;
                }

                if (graphHelper.getPartition(nodeI) != graphHelper.getPartition(nodeK)) {
                    continue;
                }

                if (graphHelper.getPartition(nodeI) == graphHelper.getPartition(nodeJ)) {
                    continue;
                }

                constraintSolver.generateGroupingConstraint(
                    nodeI,
                    nodeK,
                    nodeJ,
                );
            }
        }
    }
}