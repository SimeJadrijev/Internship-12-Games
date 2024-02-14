import { 
    getTopRatedGames
} from "./api.js";

//  console.log(getTopRatedGames());

const cardsContainer1 = document.querySelector("#task-1 .cards-container");

function CreateCard(game) {
    return `
    <h2 class="card-title">${game.name}</h2>
    <img src="${game.background_image}" alt="" class="card-image">
    <p class="card-text">
        Release date: 
        <span>
            ${game.released}
         </span>
     </p>
     <p class="card-text">
        Metacriting rating: 
        <span>
            ${game.metacritic}                
        </span>
     </p>
    `
}

function AddCards(games, container) {
    for (const game of games)
    {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = CreateCard(game);
        container.appendChild(card);
    }
}

getTopRatedGames().then((games) => {
    AddCards(games, cardsContainer1)
});