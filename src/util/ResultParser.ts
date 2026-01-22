import type { Result } from "glpk.js";
import type { Graph } from "../types/graph";
import type { ConstraintSolver } from "./ConstraintSolver";
import type { GraphHelper } from "./GraphHelper";



export function getOrderFromResult(graph: Graph, result: Result) {
    let vars = result.result.vars
    let ordering: Map<number, number> = new Map();
    for (let i = 0; i < graph.nodes.length; i++ ) {
        ordering.set(i, 0)
        for (let j = 0; j < graph.nodes.length; j++) {
            let current_var = `x_${i}_${j}`;
            ordering.set(i, (ordering.get(i) || 0) + vars[current_var]);
        }
    }
    let in_order = Array.from({ length: graph.nodes.length }, (_, i) => i);
    in_order.sort((a,b) => (ordering.get(a) || 0) - (ordering.get(b) || 0))
    in_order.reverse()
    return in_order
}