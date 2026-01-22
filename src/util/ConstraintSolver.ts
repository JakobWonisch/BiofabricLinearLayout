import GLPK, { type GLPK as GLPKObject, type LP, type Options, type Result } from 'glpk.js';
import type { NodeId } from '../types/gml';
import type { Graph } from '../types/graph';

const NOT_INITIALIZED_STRING = "glpk not initialized!";

export class ConstraintSolver {

    private constraints: LP["subjectTo"] = [];
    private binaries: string[] = [];
    private integers: string[] = [];
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
        const varA = `x_${nodeA}_${nodeB}`;
        const varB = `x_${nodeB}_${nodeA}`;

        this.constraints.push({
            name: `order ${nodeA}/${nodeB}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varB, coef: 1.0 }
            ],
            bnds: { type: this.glpk.GLP_FX, ub: 1.0, lb: 1.0 }
        });
        this.binaries.push(varA);
        this.binaries.push(varB);
    }

    generateReflexivityConstraint(nodeA: NodeId, nodeB: NodeId) {
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

        this.binaries = [...new Set(this.binaries)];
        this.integers = [...new Set(this.integers)];

        const lp = {
            name: 'LP',
            objective: {
                direction: this.glpk.GLP_MAX,
                name: 'obj',
                vars: [
                    { name: 'x1', coef: 0.6 },
                    { name: 'x2', coef: 0.5 }
                ]
            },
            subjectTo: this.constraints,
            binaries: this.binaries,
            generals: this.integers,
        };
        const result = await this.glpk.solve(lp, options);

        console.log(await this.glpk.write(lp));

        return result;
    }
}
