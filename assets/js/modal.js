// Variável para controlar o modal ativo
let activeModal = null;

// Função para abrir o modal
function openModal(pokemon) {
  // Fecha o modal ativo, se houver
  closeModal();

  const modalContainer = document.getElementById("modals");
  const modal = document.createElement("div");
  modal.className = `modal ${pokemon.type} show`;

  // Capitalize a primeira letra do nome do Pokémon
  const capitalizedPokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Extrai os nomes e os base_stat dos stats
  const statsInfo = pokemon.stats.map((stat) => {
    const { name, base_stat } = stat;
    return `${name}: ${base_stat}`;
  });

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <img src="${pokemon.photo}" alt="${capitalizedPokemonName}">
      <div class="info">
        <h2 class="centered">${capitalizedPokemonName}</h2>
        <p><strong>Type:</strong> ${pokemon.type}</p>
        <p><strong>Id:</strong> ${pokemon.number}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Stats:</strong> ${statsInfo.join(', ')}</p>
        <br><br>
      </div>
    </div>
  `;
  modalContainer.appendChild(modal);

  // Abre o fundo escuro
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  document.body.appendChild(modalOverlay);

  // Atualiza a variável de modal ativo
  activeModal = modal;

  // Fecha o modal quando o ícone de fechar é clicado
  const closeModalButton = modal.querySelector("#closeModal");
  closeModalButton.addEventListener("click", closeModal);

  // Fecha o modal quando o fundo escuro é clicado
  modalOverlay.addEventListener("click", closeModal);
}

// Função para fechar o modal
function closeModal() {
  if (activeModal) {
    const modalContainer = document.getElementById("modals");
    const modalOverlay = document.querySelector(".modal-overlay");

    // Remove o modal e o fundo escuro
    modalContainer.removeChild(activeModal);
    document.body.removeChild(modalOverlay);

    // Remove a classe "page-fade" do elemento da página
    document.body.classList.remove("page-fade");

    // Limpa a variável de modal ativo
    activeModal = null;
  }
}
