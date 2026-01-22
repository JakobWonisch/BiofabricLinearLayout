export const DATA_SIMPLE_CLIQUE_GRAPH = `graph [
	directed 0
	weighted 0
	node [
		id 0
		label "i"
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
		target 1
	]
	edge [
		source 0
		target 2
	]
	edge [
		source 0
		target 3
	]
	edge [
		source 1
		target 2
	]
	edge [
		source 1
		target 3
	]
	edge [
		source 2
		target 3
	]
]
`;