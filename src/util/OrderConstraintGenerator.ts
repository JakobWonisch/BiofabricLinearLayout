import type { Graph } from "../types/graph";
import type { ConstraintSolver } from "./ConstraintSolver";
import type { GraphHelper } from "./GraphHelper";


export function generateOrderConstraints(graph: Graph, constraintSolver: ConstraintSolver, graphHelper: GraphHelper) {
    for (let i = 0; i < graph.nodes.length; i++) {
        for (let j = i + 1; j < graph.nodes.length; j++) {
            constraintSolver.generateOrderConstraint(
                graph.nodes[i].id,
                graph.nodes[j].id
            );
        }
    }
}