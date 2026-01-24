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

async function processGraph(data: string) {
  const graph = parseGml(data);

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
  const order = getOrderFromResult(graph, result);

  console.log("Result: ", result);
  console.log("vars: ", result.result.vars);
  console.log("nodes: ", graph.nodes.map(x => x.id));
  console.log("order: ", order);



  let graphDiv = document.getElementById("app");

  if (graphDiv == null) {
    graphDiv = document.createElement("div");
    graphDiv.id = "app";
    document.body.appendChild(graphDiv);
  }

  graphDiv.innerHTML = "";
  const renderedGraph = drawBiofabrics(graph, order);

  if (renderedGraph == null) {
    console.warn("could not draw graph");
  } else {
    graphDiv.append(renderedGraph);
  }
}

const defaultData = DATA_SIMPLE_INTRA_CLUSTER_GRAPH;
processGraph(defaultData);

const graphInput = document.getElementById("graph-input") as HTMLTextAreaElement | null;
const graphSubmitButton = document.getElementById("submit");

if (graphInput == null || graphSubmitButton == null) {
  alert("could not find input fields");
} else {
  graphInput.placeholder = defaultData;

  graphSubmitButton.addEventListener("click", () => {
    processGraph(graphInput.value);
    graphInput.value = "";
  })
}