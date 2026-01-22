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

    generateTransitivityConstraint(nodeI: NodeId, nodeJ: NodeId, nodeK: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        const varA = `x_${nodeI}_${nodeJ}`;
        const varB = `x_${nodeJ}_${nodeK}`;
        const varC = `x_${nodeI}_${nodeK}`;

        this.constraints.push({
            name: `transitivity up ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varB, coef: 1.0 },
                { name: varC, coef: -1.0 }
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 1.0, lb: 0.0 }
        });

        this.constraints.push({
            name: `transitivity lo ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varB, coef: 1.0 },
                { name: varC, coef: -1.0 }
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: 0.0 }
        });
    }

    generateSequentialityConstraint(nodeI: NodeId, nodeJ: NodeId, nodeK: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        const varA = `a_${nodeI}_${nodeJ}_${nodeK}`;
        const varB = `x_${nodeI}_${nodeJ}`;
        const varC = `x_${nodeJ}_${nodeK}`;

        this.constraints.push({
            name: `sequentiality 1 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varB, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 0.0, lb: 0.0 }
        });
        this.constraints.push({
            name: `sequentiality 2 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varC, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 0.0, lb: 0.0 }
        });
        this.constraints.push({
            name: `sequentiality 3 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varA, coef: 1.0 },
                { name: varB, coef: -1.0 },
                { name: varC, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: -1.0 }
        });

        this.binaries.push(varA);
    }

    generateBetweennessConstraint(nodeI: NodeId, nodeJ: NodeId, nodeK: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        const varA = `a_${nodeI}_${nodeK}_${nodeJ}`;
        const varB = `a_${nodeJ}_${nodeK}_${nodeI}`;
        const varC = `b_${nodeI}_${nodeJ}_${nodeK}`;

        this.constraints.push({
            name: `betweenness 1 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varC, coef: 1.0 },
                { name: varA, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: 0.0 }
        });

        this.constraints.push({
            name: `betweenness 2 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varC, coef: 1.0 },
                { name: varB, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: 0.0 }
        });

        this.constraints.push({
            name: `betweenness 3 ${nodeI}/${nodeJ}/${nodeK}`,
            vars: [
                { name: varC, coef: 1.0 },
                { name: varB, coef: -1.0 },
                { name: varA, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 0.0, lb: 0.0 }
        });

        this.binaries.push(varC);
    }

    generateCrossingConstraint(nodeI: NodeId, nodeJ: NodeId, nodeK: NodeId, nodeL: NodeId) {
        if (this.glpk == null) {
            throw new Error(NOT_INITIALIZED_STRING);
        }

        const varCrossing = `c_${nodeI}_${nodeJ}_${nodeK}_${nodeL}`;
        const varBetweenIJL = `b_${nodeI}_${nodeJ}_${nodeL}`;
        const varBetweenIJK = `b_${nodeI}_${nodeJ}_${nodeK}`;

        this.constraints.push({
            name: `crossing 1 ${nodeI}/${nodeJ}/${nodeK}/${nodeL}`,
            vars: [
                { name: varCrossing, coef: 1.0 },
                { name: varBetweenIJK, coef: -1.0 },
                { name: varBetweenIJL, coef: 1.0 },
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: 0.0 }
        });
        this.constraints.push({
            name: `crossing 2 ${nodeI}/${nodeJ}/${nodeK}/${nodeL}`,
            vars: [
                { name: varCrossing, coef: 1.0 },
                { name: varBetweenIJL, coef: -1.0 },
                { name: varBetweenIJK, coef: 1.0 },
            ],
            bnds: { type: this.glpk.GLP_LO, ub: 0.0, lb: 0.0 }
        });
        this.constraints.push({
            name: `crossing 3 ${nodeI}/${nodeJ}/${nodeK}/${nodeL}`,
            vars: [
                { name: varCrossing, coef: 1.0 },
                { name: varBetweenIJK, coef: -1.0 },
                { name: varBetweenIJL, coef: -1.0 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 0.0, lb: 0.0 }
        });
        this.constraints.push({
            name: `crossing 4 ${nodeI}/${nodeJ}/${nodeK}/${nodeL}`,
            vars: [
                { name: varCrossing, coef: 1.0 },
                { name: varBetweenIJK, coef: 1.0 },
                { name: varBetweenIJL, coef: 1.0 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 2.0, lb: 0.0 }
        });

        this.binaries.push(varCrossing);
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

        const vars = this.binaries.filter(x => x[0] == "c").map(x => {
            return ({
                name: x, coef: 1.0
            });
        });

        const lp = {
            name: 'LP',
            objective: {
                direction: this.glpk.GLP_MIN,
                name: 'objective',
                vars
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
