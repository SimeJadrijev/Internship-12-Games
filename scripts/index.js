import { 
    GetTopRatedGames, GetGamesBySearch
} from "./api.js";


const cardsContainer1 = document.querySelector("#task-1 .cards-container");
const cardsContainer2 = document.querySelector("#task-2 .cards-container");

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

//1st task
GetTopRatedGames().then((games) => {
    AddCards(games, cardsContainer1)
});


//2nd task

const secondTaskButton = document.querySelector("#task-2 button");
secondTaskButton.addEventListener("click", async() => ActivateSecondTask());

function ActivateSecondTask() {
    const userInputElement = document.querySelector(".user-search");
    userInputElement.classList.add("card-text");
    const userInput = prompt("Which game do you want to search?");
    userInputElement.textContent = `You searched for: ${userInput}`;

    GetGamesBySearch(userInput).then((games) => {
        AddCards(games, cardsContainer2)
    })
}


