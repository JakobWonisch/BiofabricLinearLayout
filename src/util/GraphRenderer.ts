import { create } from "d3";
import { render_biofabric, type BiofabricParameters } from "../lib/biofabric_rendering";
import * as Biofabric from "../types/biofabric";
import type { NodeId } from "../types/gml";
import type { Graph } from "../types/graph";
import { GraphHelper } from "./GraphHelper";
import { calculatePartitions } from "./GraphParser";


export function drawBiofabrics(graph: Graph, order: number[], baseParams?: BiofabricParameters) {
    const graphHelper = new GraphHelper(graph);
    const paramList: BiofabricParameters[] = [];

    const targetIndices: { [key: number]: number } = {};

    graph.nodes.forEach((v, i) => {
        targetIndices[v.id] = order[i];
    });

    graph.nodes = graph.nodes.sort((a, b) => {
        return targetIndices[a.id] - targetIndices[b.id];
    });
    // partition order is not guaranteed. sort by index of representative node.
    graph.partitions = calculatePartitions(graph).sort((a, b) => {
        const representativeNodeA = a.nodes[0];
        const representativeNodeB = b.nodes[0];

        if (representativeNodeA == null) {
            console.warn("representative node is null");
            return -1;
        }

        return targetIndices[representativeNodeA] - targetIndices[representativeNodeB];
    });

    for (const partition of graph.partitions) {
        const intraGroupEdges = graph.edges.filter(x => partition.nodes.includes(x.source) && partition.nodes.includes(x.target));
        const biofabricGraph: Biofabric.Graph = {
            nodes: partition.nodes,
            links: intraGroupEdges.map((x, i): Biofabric.Edge => ({
                id: i,
                source: x.source,
                target: x.target
            }))
        };

        let nodeordering = biofabricGraph.nodes.map(n => n)
        let edgeordering = biofabricGraph.links.map(e => e.id)

        paramList.push({
            ...baseParams,
            graph: biofabricGraph,
            ordernodes: nodeordering,
            orderedges: edgeordering,
            result: undefined,
            nodetitle: `Partition ${partition.id}`,
            edgetitle: undefined,
            print_title: true,
        })
    }

    const padding = 50;
    let svgwidth = paramList.map(x => x.svgwidth ?? 500).reduce((acc, curr) => Math.max(acc, curr));
    let svgheight = paramList.map(x => x.svgheight ?? 500).reduce((acc, curr) => acc + curr + padding);
    const svg = create('svg');

    const connectingCoordinates: {
        [key: NodeId]: {
            partitionId: number,
            yCoordinate: number,
        }
    } = [];

    let yCoordinate = 0;
    const partitionCoordinates: { [key: number]: number } = {};

    for (let i = 0; i < paramList.length; i++) {
        const group = svg.append("g");
        const params = paramList[i];

        // TODO: get this from partition order
        const partitionId = i;
        partitionCoordinates[partitionId] = yCoordinate;
        group.attr("transform", `translate(0, ${yCoordinate})`);
        yCoordinate += padding + (params.svgheight ?? 500);

        // draw box
        group.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", params.svgwidth ?? 500)
            .attr("height", params.svgwidth ?? 500)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5");

        const result = render_biofabric(group, params);

        // insert coordinates with partition ids
        for (const node in result.nodeToConnectingPoint) {
            const nodeId = Number(node);

            connectingCoordinates[nodeId] = {
                partitionId,
                yCoordinate: result.nodeToConnectingPoint[nodeId],
            }
        }
    }

    const interGroupEdges = graph.edges.filter(x => graphHelper.getPartition(x.source) != graphHelper.getPartition(x.target));
    const getY = (nodeId: NodeId): number => {
        const coord = connectingCoordinates[nodeId];
        if (coord == null) {
            return 0;
        }

        return (partitionCoordinates[coord.partitionId] ?? 0) + coord.yCoordinate;
    }

    let externalEdgesMargin = 50;

    svg.selectAll("path.inter-link")
        .data(interGroupEdges)
        .enter()
        .append("path")
        .attr("d", d => {
            const x = svgwidth - 20;
            let start = getY(d.source);
            let end = getY(d.target);
            if (start > end) {
                const temp = end;
                end = start;
                start = temp;
            }
            const radiusDistance = Math.abs(start - end) / 2;
            const radiusBendDistance = radiusDistance * 0.2;

            if (externalEdgesMargin < radiusBendDistance) {
                externalEdgesMargin = radiusBendDistance;
            }

            return `M ${x} ${start} A ${radiusBendDistance} ${radiusDistance} 0 0 1 ${x} ${end}`;
        })
        .attr("fill", "none")
        .attr("stroke", "#eee")
        .attr("stroke-width", 3)
        .style("stroke-linecap", "round");


    svg.attr("viewBox", [0, 0, svgwidth + externalEdgesMargin + 50, svgheight])
        .style("width", "500px")
        .style("height", "auto");

    return svg.node();
}