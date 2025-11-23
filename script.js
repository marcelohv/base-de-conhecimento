let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    // Ordena os dados pelo nome em ordem alfabética
    dados.sort((a, b) => a.nome.localeCompare(b.nome));
}

function iniciarBusca() {
    // Pega o valor do campo de busca e converte para minúsculas
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();

    // Filtra os dados com base no termo de busca
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca) ||
               dado.data_criacao.includes(termoBusca) ||
               dado.descricao.toLowerCase().includes(termoBusca) ||
               dado.tags.some(tag => tag.toLowerCase().includes(termoBusca));
    });
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    // Limpa os cards existentes antes de renderizar os novos
    cardContainer.innerHTML = '';

    if (dados.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado</p>';
    } else {
        for (let dado of dados) {
            let article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `
                <h2>${dado.nome}</h2>
                <p><strong>Ano de fundação:</strong> ${dado.data_criacao}</p>
                <p>${dado.descricao}</p>
                <div class="tags-container">
                    ${dado.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}
                </div>
                <p><a href="${dado.link}" target="_blank" class="card-link">Saiba mais</a></p>
            `
            cardContainer.appendChild(article);
        }
    }
}

// Carrega os dados e renderiza os cards ordenados quando a página é carregada
window.onload = async () => {
    await carregarDados();
    renderizarCards(dados);
};

// Adiciona um event listener para acionar a busca com a tecla Enter
document.getElementById('campo-busca').addEventListener('keyup', function(event) {
    // Verifica se a tecla pressionada foi a "Enter"
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});