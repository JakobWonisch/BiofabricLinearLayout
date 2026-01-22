import { DATA_SIMPLE_GRAPH } from './data/simple.ts';
import { render_biofabric } from './lib/biofabric_rendering.ts';
import './style.css';
import type { Edge, Graph } from './types/biofabric.ts';
import { ConstraintSolver } from './util/ConstraintSolver.ts';
import { GraphHelper } from './util/GraphHelper.ts';
import { parseGml } from './util/GraphParser.ts';

const graph = parseGml(DATA_SIMPLE_GRAPH);

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

const biofabricGraph: Graph = {
  nodes: graph.nodes.map(x => x.id),
  links: graph.edges.map((x, i): Edge => ({
    id: i,
    source: x.source,
    target: x.target
  }))
};

let nodeordering = biofabricGraph.nodes.map(n => n)
let edgeordering = biofabricGraph.links.map(e => e.id)

const renderedGraph = render_biofabric(biofabricGraph, nodeordering, edgeordering, undefined, "Simple", "Test", false);

if (renderedGraph == null) {
  console.warn("could not draw graph");
} else {
  graphDiv.append(renderedGraph);
}