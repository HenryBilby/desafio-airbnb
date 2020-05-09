const cardsContainer = document.querySelector("#cards");
var data = []
var countDays = 0;


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
            <p class="card-text">
            Total: R$ ${card.price*countDays},00
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

async function challengeAirbnb() {
    data = await fetchCards();
    if(data) {
        renderCards(data);
    }
}

function daysBetween(firstDate, lastDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    return parseInt((lastDate - firstDate) / oneDay);
}

function validateForm() {
    let form = document.getElementById("form-search");
    form.classList.add("was-validated");

    const invalidGroup = form.querySelectorAll(":invalid");

    if (invalidGroup.length) {
      return false;
    }

    let checkin = document.getElementById("checkin");
    let checkout = document.getElementById("checkout");

    let actualDate = new Date();
    let checkinDate = new Date(checkin.value);
    let checkoutDate = new Date(checkout.value);

    if (checkoutDate <= checkinDate) {
      let invalidFeedback = document.querySelectorAll(".date-fields");
      checkout.classList.add("is-invalid");

      invalidFeedback.forEach((div) => {
        return (div.textContent = "Data de Checkout não pode ser menor ou igual a Data de Checkin");
      });
      return false;
    }

    countDays = daysBetween(checkinDate, checkoutDate);


    return true;
  }

  function handleClickSearch() {
    if (validateForm()) {
        let clean_error_msg = document.querySelectorAll(".date-fields");
        clean_error_msg.textContent = "";
        challengeAirbnb();
    }
  }