import { DATA_SIMPLE_CLIQUE_GRAPH } from './data/simple_multi_edges.ts';
import { DATA_SIMPLE_INTRA_CLUSTER_GRAPH } from './data/simple_with_intra_cluster_edges.ts';
import './style.css';
import { generateBetweennessConstraints } from './util/BetweennessConstraintGenerator.ts';
import { ConstraintSolver } from './util/ConstraintSolver.ts';
import { generateCrossingConstraints } from './util/CrossingsConstraintGenerator.ts';
import { GraphHelper } from './util/GraphHelper.ts';
import { parseGml } from './util/GraphParser.ts';
import { drawBiofabrics } from './util/GraphRenderer.ts';
import { generateGroupingConstraints } from './util/GroupingConstraintGenerator.ts';
import { generateOrderConstraints } from './util/OrderConstraintGenerator.ts';
import { getOrderFromResult } from './util/ResultParser.ts';

const graph = parseGml(DATA_SIMPLE_INTRA_CLUSTER_GRAPH);

console.log(graph);

const graphHelper = new GraphHelper(graph);
const constraintSolver = new ConstraintSolver(graph);

await constraintSolver.start();

// generate constraints
generateOrderConstraints(graph, constraintSolver, graphHelper);
generateBetweennessConstraints(graph, constraintSolver, graphHelper);
generateCrossingConstraints(graph, constraintSolver, graphHelper);
generateGroupingConstraints(graph, constraintSolver, graphHelper);

const result = await constraintSolver.solve();

console.log("Result: ", result);
console.log(getOrderFromResult(graph, result));



let graphDiv = document.createElement("div");
document.body.appendChild(graphDiv);

const renderedGraph = drawBiofabrics(graph, getOrderFromResult(graph, result));

if (renderedGraph == null) {
  console.warn("could not draw graph");
} else {
  graphDiv.append(renderedGraph);
}