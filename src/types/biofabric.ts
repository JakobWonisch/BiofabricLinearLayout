
export type Node = number;

export type Edge = {
    id: number;
    source: number;
    target: number;
}

export type Graph = {
    nodes: Node[];
    links: Edge[];
}