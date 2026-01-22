import type { NodeId } from "../types/gml";
import type { Graph } from "../types/graph";

type Constraint = string;

export class ConstraintGenerator {

    private constraints: Constraint[] = [];
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    generateOrderConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateReflixivityConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateTransitivityConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateSequentialityConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateBetweennessConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateCrossingConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateGroupingConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    generateEdgeLengthConstraint(nodeA: NodeId, nodeB: NodeId) {
        // TODO: implement constraint
        this.constraints.push(`X_${nodeA} + X_${nodeB} >= 1`);
    }

    build(): string {
        return this.constraints.join('\n');
    }
}