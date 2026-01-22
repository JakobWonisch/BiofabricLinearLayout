
export type NodeId = number;

export type Node = {
    id: NodeId;
    label: string;
    partition: number;
};

export type Edge = {
    source: NodeId;
    target: NodeId;
    label?: string;
    value?: number;
};

export type GmlGraph = {
    directed: number;
    weighted: number;
    edges: Edge[];
    nodes: Node[];
    [key: string]: any;
};