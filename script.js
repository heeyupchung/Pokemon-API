// buttons
const randomButton = document.getElementById('random');
const rerollButton = document.getElementById('reroll');

// team display
const cardTwo = document.getElementById('cardTwo');

// card items
const cards = document.getElementsByClassName('card');

// change contents of card items
function generateTeam(names, images) {
  for(let i = 0; i < 6; i++) {
    cards[i].innerHTML = `
    <img class="card-img-top" src="${images[i]}" alt="${names[i]}">
    <h5 class="card-title text-center pb-2">${names[i]}</h5>
  `;
  }
}

// initialize team members
let membersNames = [];
let membersImages = [];

// helper functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// fetch request from API
async function fetchData() {
  for(let i = 0; i < 6; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomInt(1, 493)}`)
      .then(response => response.json())
      .then(data => {
        membersNames.push(data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1));
        membersImages.push(data.sprites.front_default);
    })
  }
}
fetchData();

// event listeners 
randomButton.addEventListener("click", e => {
  fetchData();
  cardTwo.scrollIntoView({behavior: "smooth"})
  generateTeam(membersNames, membersImages);
  membersNames = [];
  membersImages = [];
});

rerollButton.addEventListener("click", e => {
  fetchData();
  generateTeam(membersNames, membersImages);
  membersNames = [];
  membersImages = [];
});