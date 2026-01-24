import type { Result } from "glpk.js";
import type { Graph } from "../types/graph";



export function getOrderFromResult(graph: Graph, result: Result) {
    let vars = result.result.vars
    let ordering: number[] = [];

    for (const i of graph.nodes.map(x => x.id)) {
        let orderNumber = 0;

        for (const j of graph.nodes.map(x => x.id)) {
            let current_var = `x_${i}_${j}`;

            orderNumber += vars[current_var] ?? 0;
        }

        ordering.push(graph.nodes.length - 1 - orderNumber);
    }

    return ordering;
}