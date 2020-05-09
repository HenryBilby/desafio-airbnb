const cardsContainer = document.querySelector("#cards");
var data = []

function renderCard(card) {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
    <div id= "main-card" class="card" style="width: 20rem; margin: 2rem">
        <img src="${card.photo}" class="card-img-top" alt="${card.name}"/>
        <div class="card-body">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">
                Tipo: ${card.property_type}
            </p>
            <p class="card-text">
                Preço: R$ ${card.price},00
            </p>
        </div>
    </div>`;
    cardsContainer.appendChild(div);
}

function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.map(renderCard);
}

async function fetchCards() {
    const response = await fetch(
        "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72");
    return await response.json();
}

async function handleClickSearch() {
    data = await fetchCards();
    if(data) {
        renderCards(data);
    }
}