import { DATA_SIMPLE_GRAPH } from './data/simple.ts';
import './style.css';
import { ConstraintGenerator } from './util/ConstraintGenerator.ts';
import { GraphHelper } from './util/GraphHelper.ts';
import { parseGml } from './util/GraphParser.ts';

const graph = parseGml(DATA_SIMPLE_GRAPH);

console.log(graph);

const graphHelper = new GraphHelper(graph);
const constraintGenerator = new ConstraintGenerator(graph);