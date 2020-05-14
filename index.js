const cardsContainer = document.querySelector("#cards");
var data = []
var countDays = 0;


function renderCard(card) {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
    <div id= "main-card" class="card" style="width: 20rem; margin: 2rem">
        <img id="img-card" src="${card.photo}" class="card-img-top" alt="${card.name}"/>
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
            // <button type="button" class="button-submit" data-toggle="modal" data-target="#exampleModal">
            //     Mapa
            // </button>
            // <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //     <div class="modal-dialog" role="document">
            //     <div class="modal-content">
            //         <div class="modal-header">
            //         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            //             <span aria-hidden="true">&times;</span>
            //         </button>
            //         </div>
            //         <div class="modal-body">
            //         ...
            //         </div>
            //         <div class="modal-footer">
            //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            //         <button type="button" class="btn btn-primary">Save changes</button>
            //         </div>
            //     </div>
            //     </div>
            // </div>
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
        challengeAirbnb();
    }
  }

  function initMap() {

    const locations = [
        ['Avenida Paulista', -23.563311, -46.654275, 5],
        ['Gama Academy', -23.567427, -46.684607, 4],
        ['Marco Zero', -23.550460, -46.633934, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-23.550460, -46.633934),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;



    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}