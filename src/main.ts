import { DATA_SIMPLE_INTRA_CLUSTER_GRAPH } from './data/simple_with_intra_cluster_edges.ts';
import './style.css';
import { ConstraintSolver } from './util/ConstraintSolver.ts';
import { GraphHelper } from './util/GraphHelper.ts';
import { parseGml } from './util/GraphParser.ts';
import { drawBiofabrics } from './util/GraphRenderer.ts';

const graph = parseGml(DATA_SIMPLE_INTRA_CLUSTER_GRAPH);

console.log(graph);

const graphHelper = new GraphHelper(graph);
const constraintSolver = new ConstraintSolver(graph);

await constraintSolver.start();

// generate constraints
// constraintGenerator.generateOrderConstraint(0, 1);
// constraintGenerator.generateBetweennessConstraint(0, 1);
// ...

const result = await constraintSolver.solve();


let graphDiv = document.createElement("div");
document.body.appendChild(graphDiv);

const renderedGraph = drawBiofabrics(graph);

if (renderedGraph == null) {
  console.warn("could not draw graph");
} else {
  graphDiv.append(renderedGraph);
}