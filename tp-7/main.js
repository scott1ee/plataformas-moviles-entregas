const url = "https://pokeapi.co/api/v2/pokemon";
const container = document.querySelector(".row");
const antes = document.querySelector("#antes");
const siguiente = document.querySelector("#siguiente");

let limite = 8;
let distancia = 1;

antes.addEventListener("click", () => {
  if (distancia != 1) {
    distancia -= 9;
    removeChildNodes(container);
    fetchPokemons(distancia, limite);
  }
});

siguiente.addEventListener("click", () => {
  distancia += 9;
  removeChildNodes(container);
  fetchPokemons(distancia, limite);
});

//Conexion API
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      dibujarTarjeta(data);
      document.querySelector(".spinner").classList.add("d-none");
    });
}

// dibuja los primeros 9 y si se presiona los botones siguiente imprime los siguientes
function fetchPokemons(distancia, limite) {
  document.querySelector(".spinner").classList.remove("d-none")
  for (let i = distancia; i <= distancia + limite; i++) {
    fetchPokemon(i);
  }
}

document.querySelector(".row").classList.add("d-none")

//funcion para dibujar las tarjetas
const dibujarTarjeta = (pokemon) => {

  const tarjetaGiratoria = document.createElement("div");
  tarjetaGiratoria.classList.add("tarjetaGiratoria");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  tarjetaGiratoria.appendChild(cardContainer);

  // loader
  document.querySelector(".container-fluid").classList.remove("d-none")
  document.querySelector(".row").classList.remove("d-none")
  document.querySelector(".pagination").classList.remove("d-none")

  const col = document.createElement("div");
  col.classList.add("col-12");
  col.classList.add("col-md-6");
  col.classList.add("col-lg-4");


  col.appendChild(tarjetaGiratoria);

  //parte delantera de la card
  
  const card = document.createElement("div");
  card.classList.add("card");

  const imagenPokemon = document.createElement("div");
  imagenPokemon.classList.add("img-container");

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.front_default;

  imagenPokemon.appendChild(imagen);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
  number.classList.add("id");

  card.appendChild(imagenPokemon);
  card.appendChild(number);

  //parte de atras de la tarjeta

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  const altura = document.createElement("p");
  altura.textContent = `Altura: ${pokemon.height.toString()}cm`;

  const peso = document.createElement("p");
  peso.textContent = `Peso: ${pokemon.weight.toString()}lb`;

  cardBack.appendChild(altura);
  cardBack.appendChild(peso);
  
  //muestra de las cards
  cardContainer.appendChild(card);
  container.appendChild(col);
  cardContainer.appendChild(cardBack);

}

//borra las anteriores card
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(distancia, limite);