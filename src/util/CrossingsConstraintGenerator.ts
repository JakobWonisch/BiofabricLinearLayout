import type { Graph } from "../types/graph";
import type { ConstraintSolver } from "./ConstraintSolver";
import type { GraphHelper } from "./GraphHelper";

export function generateCrossingConstraints(graph: Graph, constraintSolver: ConstraintSolver, graphHelper: GraphHelper) {
    for (let a = 0; a < graph.edges.length; a++) {
        for (let b = a + 1; b < graph.edges.length; b++) {
            const e1 = graph.edges[a];
            const e2 = graph.edges[b];

            const e1Internal = graphHelper.getPartition(e1.source) == graphHelper.getPartition(e1.target);
            const e2Internal = graphHelper.getPartition(e2.source) == graphHelper.getPartition(e2.target);

            if (e1Internal || e2Internal) {
                continue;
            }

            const numberUniqueOfEndpoints = new Set([e1.source, e1.target, e2.source, e2.target]).size;

            if (numberUniqueOfEndpoints < 4) {
                continue;
            }

            constraintSolver.generateCrossingConstraint(
                e1.source,
                e1.target,
                e2.source,
                e2.target,
            );
        }
    }
}