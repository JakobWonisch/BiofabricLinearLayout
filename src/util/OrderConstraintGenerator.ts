import type { Graph } from "../types/graph";
import type { ConstraintSolver } from "./ConstraintSolver";
import type { GraphHelper } from "./GraphHelper";


export function generateOrderConstraints(graph: Graph, constraintSolver: ConstraintSolver, graphHelper: GraphHelper) {
    for (let i = 0; i < graph.nodes.length; i++) {
        for (let j = 0; j < graph.nodes.length; j++) {
            if (j >= i + 1) {
                constraintSolver.generateOrderConstraint(
                    graph.nodes[i].id,
                    graph.nodes[j].id
                );
            }

            for (let k = 0; k < graph.nodes.length; k++) {
                if (i == j || i == k || j == k) {
                    continue;
                }

                constraintSolver.generateTransitivityConstraint(
                    graph.nodes[i].id,
                    graph.nodes[j].id,
                    graph.nodes[k].id,
                );
            }
        }
    }
}