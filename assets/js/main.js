const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;

// Função para carregar itens Pokémon
function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => `
        <li class="pokemon number-${pokemon.number} ${pokemon.type}">
          <span class="number">${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
      `)
      .join('');

    pokemonList.innerHTML += newHtml;

    // Adicione um evento de clique para mostrar o modal para todos os Pokémon
    // Neste momento, adicione o evento a todos os Pokémon na lista, incluindo os novos
    addClickEventToPokemons(pokemons);
  });
}

// Função para adicionar evento de clique aos Pokémon
function addClickEventToPokemons(pokemons) {
  pokemons.forEach((pokemon) => {
    const pokemonItem = document.querySelector(`.pokemon.number-${pokemon.number}`);
    if (pokemonItem) {
      pokemonItem.addEventListener("click", () => {
        openModal(pokemon);
      });
    }
  });
}

// Função para carregar os primeiros Pokémon
function loadInitialPokemon() {
  loadPokemonItems(offset, limit);
}

// Lidar com o clique no botão "Load More"
loadMoreButton.addEventListener('click', () => {
  offset += limit; // Incrementa o valor de offset
  loadPokemonItems(offset, limit);
});

// Chamar a função de carregamento inicial quando a página carregar
document.addEventListener("DOMContentLoaded", loadInitialPokemon);
