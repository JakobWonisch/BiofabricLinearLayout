import GLPK, { type GLPK as GLPKObject, type LP, type Options, type Result } from 'glpk.js';
import type { NodeId } from '../types/gml';
import type { Graph } from '../types/graph';

const NOT_INITIALIZED_STRING = "glpk not initialized!";

export class ConstraintSolver {

    private constraints: LP["subjectTo"] = [];
    private graph: Graph;
    private glpk?: GLPKObject;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    async start() {
        this.glpk = await GLPK();
    }

    generateOrderConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateReflixivityConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateTransitivityConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateSequentialityConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateBetweennessConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateCrossingConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateGroupingConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    generateEdgeLengthConstraint(nodeA: NodeId, nodeB: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        // TODO: implement constraint
        this.constraints.push({
            name: `Order constraint ${nodeA}-${nodeB}`,
            vars: [
                { name: 'x1', coef: 1.0 },
                { name: 'x2', coef: 2.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });
    }

    async solve(): Promise<Result> {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        const options: Options = {
            msglev: this.glpk.GLP_MSG_ALL,
            presol: true
        };

        return await this.glpk.solve({
            name: 'LP',
            objective: {
                direction: this.glpk.GLP_MAX,
                name: 'obj',
                vars: [
                    { name: 'x1', coef: 0.6 },
                    { name: 'x2', coef: 0.5 }
                ]
            },
            subjectTo: this.constraints
        }, options);
    }
}
