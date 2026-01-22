export const DATA_SIMPLE_INTRA_CLUSTER_GRAPH = `graph [
	directed 0
	weighted 0
	node [
		id 0
		label "i"
        partition 1
	]
	node [
		id 4
		label "a"
        partition 1
	]
	node [
		id 5
		label "b"
        partition 1
	]
	node [
		id 1
		label "j"
        partition 2
	]
	node [
		id 2
		label "k"
        partition 3
	]
	node [
		id 3
		label "l"
        partition 4
	]
	edge [
		source 0
		target 5
	]
	edge [
		source 0
		target 4
	]
	edge [
		source 0
		target 2
	]
	edge [
		source 1
		target 3
	]
]
`;