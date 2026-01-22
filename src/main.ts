import { DATA_SIMPLE_GRAPH } from './data/simple.ts';
import './style.css';
import { parseGml } from './util/GraphParser.ts';

const graph = parseGml(DATA_SIMPLE_GRAPH);

console.log(graph);