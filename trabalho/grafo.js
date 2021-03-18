const grafo1 = {
	'1': [2, 5, 6, 7],
	'2': [1, 3, 4, 7],
	'3': [2, 4, 5, 7],
	'4': [2, 3, 5, 6],
	'5': [1, 3, 4, 6],
	'6': [1, 4, 5, 7],
	'7': [1, 2, 3, 6],
}

const grafo2 = {
	'1': [2, 5, 6, 7],
	'2': [1, 3, 4, 7],
	'3': [2, 4, 5, 7],
	'4': [2, 3, 5],
	'5': [1, 3, 4, 6],
	'6': [1, 5, 7],
	'7': [1, 2, 3, 6],
}

const grafo3 = {
	'1': [2, 6, 7],
	'2': [1, 3, 4, 7],
	'3': [2, 4],
	'4': [2, 3, 5],
	'5': [4, 6],
	'6': [1, 5, 7],
	'7': [1, 2, 6],
}

const grafo4 = {
	'1': [2, 7],
	'2': [1, 3, 4, 7],
	'3': [2, 4],
	'4': [2, 3, 5],
	'5': [4, 6],
	'6': [5, 7],
	'7': [1, 2, 6],
}

const grafos = [grafo1, grafo2, grafo3, grafo4]


// Dirac - Grafo com 3 ou mais vértices, ter cada vértice com grau maior ou igual a metade da quantia de vertice
function dirac(grafo) {
	const tamanho = Object.keys(grafo).length;
	if (tamanho < 3) return false;

	for (let vertice in grafo)
		if (grafo[vertice].length < tamanho / 2)
			return false;


	return true;
}


//Ore - Tendo tamanho(grafo) de 3 ou maior, ter a Soma dos graus de cada par não adjacente maior ou igual a 'n'

function ore(grafo) {
	const tamanho = Object.keys(grafo).length;
	if (tamanho < 3) return false;

	const graus = {};

	Object
		.keys(grafo)
		.forEach(chave => {
			graus[chave] = grafo[chave].length;
		});


	for (let vertice in grafo) {
		grafo[vertice] = Object
			.keys(grafo)
			.map(vert => +vert)
			.filter(vert => vert != +vertice && !grafo[vertice].includes(+vert));
		let somaTotal = 0;

		for (let v of grafo[vertice]) {
			somaTotal += graus[v] + graus[vertice];
		}

		if (somaTotal < tamanho) return false;//verificacao se soma maior q N
	}
	return true;
}


function bondy_chvatal(grafo, id) {
	const grafoDesenho = { ...grafo };
	const tamanho = Object.keys(grafo).length;

	const graus = {};

	// Grau original dos vértices
	for (let chave in grafo) {
		graus[chave] = grafo[chave].length;
	}

	let houveConexao = true;

	while (houveConexao) {
		houveConexao = false;

		// Percorrer todos os vértices do grafo e juntar se não forem adjacentes
		for (let verticeA in grafo) {
			for (let verticeB in grafo) {
				if (verticeA !== verticeB) {

					const soma = graus[verticeA] + graus[verticeB];

					if (soma >= tamanho) {
						if (!(grafo[verticeA].includes(+verticeB) || grafo[verticeB].includes(+verticeB))) { // <-- Verifica se é adjacente, se for, passa para a próxima iteração 

							// Criar pares
							grafo[verticeA].push(+verticeB);
							grafo[verticeB].push(+verticeA);

							graus[verticeA] += 1;
							graus[verticeB] += 1;

							houveConexao = true;
						}
					}
				}
			}
		}
	}

	const res = Object
		.values(graus)
		.filter(grau => grau === tamanho - 1)
		.length === tamanho;

	if (res) {
		console.log(`Grafo ${id} completo!`);
		desenhar_grafo(grafoDesenho, id);
	}

	// Verificar se o grafo é completo
	return res;
}

// const btn = document.getElementById('btn');

for (let i = 0; i < grafos.length; i++) {

	// Criar três cópias do mesmo grafo para cada uma, pode ser que uma função interfira no resultado da outra

	console.log(`Grafo ${i + 1})`);
	console.log(`Dirac: ${dirac({ ...grafos[i] })}`);
	console.log(`Ore: ${ore({ ...grafos[i] })}`);

	const bc = bondy_chvatal({ ...grafos[i] }, i + 1);
	console.log(`Bondy e Chvátal: ${bc}\n\n\n`);

}



function desenhar_grafo(grafo, id) {
	// create an array with nodes
	const nodes = new vis.DataSet(
		Object
			.keys(grafo)
			.map(vert => {
				return {
					id: +vert,
					label: vert
				}
			})
	)

	const edges = [];

	Object
		.keys(grafo)
		.forEach(vert => {
			grafo[vert].forEach(v => {
				edges.push(
					{
						from: +vert,
						to: v
					}
				)
			})
		});


	const container = document.getElementById(`mynetwork-${id}`);
	// create a network
	const data = {
		nodes: nodes,
		edges: edges,
	};
	const options = {};
	const network = new vis.Network(container, data, options);
}
