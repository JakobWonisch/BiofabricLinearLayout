import type { GmlGraph, NodeId } from "./gml";

export type Partition = {
    id: number;
    nodes: NodeId[];
};

export type Graph = GmlGraph & {
    partitions: Partition[];
};