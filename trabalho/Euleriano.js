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


function verificar_grafo_euleriano(grafo) {
    const tamanho = Object
        .keys(grafo)
        .length;

// Verifica se a soma dos vértices com grau par é igual ao número total de vértices
    return Object
        .values(grafo)
        .filter(vert => vert.length % 2 == 0)
        .length === tamanho
}

function verificar_grafo_semi_euleriano(grafo) {

// Verifica se a soma dos vértices com grau ímpar é igual a 2
    return Object
        .values(grafo)
        .filter(vert => vert.length % 2 != 0)
        .length === 2
}

function verificar_grafo_nao_euleriano(grafo) {
// Verifica se não for nem euleriano e nem semi-euleriano
    return !(verificar_grafo_euleriano(grafo) || verificar_grafo_semi_euleriano(grafo))
}

for (let i = 0; i < grafos.length; i++) {
    console.log(`Grafo ${i + 1})`);
    console.log(`grafo_euleriano: ${verificar_grafo_euleriano({...grafos[i]})}`)
    console.log(`grafo_semi_euleriano: ${verificar_grafo_semi_euleriano({...grafos[i]})}`)
    console.log(`grafo_nao_euleriano: ${verificar_grafo_nao_euleriano({...grafos[i]})}`)
}