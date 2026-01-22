import { create, partition } from "d3";
import { render_biofabric, type BiofabricParameters } from "../lib/biofabric_rendering";
import type { Graph } from "../types/graph";
import * as Biofabric from "../types/biofabric";
import type { NodeId } from "../types/gml";


export function drawBiofabrics(graph: Graph, baseParams?: BiofabricParameters) {
    const paramList: BiofabricParameters[] = [];

    // TODO: get partition order from solver
    for (const partition of graph.partitions) {
        const biofabricGraph: Biofabric.Graph = {
            nodes: partition.nodes,
            links: graph.edges.filter(x => partition.nodes.includes(x.source) && partition.nodes.includes(x.target)).map((x, i): Biofabric.Edge => ({
                id: i,
                source: x.source,
                target: x.target
            }))
        };

        // TODO: get this from solver
        let nodeordering = biofabricGraph.nodes.map(n => n)
        let edgeordering = biofabricGraph.links.map(e => e.id)

        paramList.push({
            ...baseParams,
            graph: biofabricGraph,
            ordernodes: nodeordering,
            orderedges: edgeordering,
            result: undefined,
            nodetitle: "",
            edgetitle: "",
            print_title: false,
        })
    }

    let svgwidth = paramList.map(x => x.svgwidth ?? 500).reduce((acc, curr) => Math.max(acc, curr));
    let svgheight = paramList.map(x => x.svgheight ?? 500).reduce((acc, curr) => acc + curr);

    const svg = create('svg')
        .attr("viewBox", [0, 0, svgwidth, svgheight])

    const connectingCoordinates: {
        [key: NodeId]: {
            partitionId: number,
            yCoordinate: number,
        }
    } = [];

    let yCoordinate = 0;

    for (let i = 0; i < paramList.length; i++) {
        const params = paramList[i];
        // TODO: get this from partition order
        const partitionId = i;
        const group = svg.append("g");

        group.attr("transform", `translate(0, ${yCoordinate})`);
        yCoordinate += params.svgheight ?? 500;

        const result = render_biofabric(group, params);

        // insert coordinates with partition ids
        for (const node in result) {
            const nodeId = Number(node);

            connectingCoordinates[nodeId] = {
                partitionId,
                yCoordinate: result.nodeToConnectingPoint[nodeId],
            }
        }
    }

    // TODO: draw inter-partition edges

    return svg.node();
}