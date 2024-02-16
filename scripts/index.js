import { 
    GetTopRatedGames, GetGamesBySearch, GetGameRating
} from "./api.js";


const cardsContainer1 = document.querySelector("#task-1 .cards-container");
const cardsContainer2 = document.querySelector("#task-2 .cards-container");
const cardsContainer3 = document.querySelector("#task-3 .cards-container");
const cardsContainer4 = document.querySelector("#task-4 .cards-container")

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
    const userInputElement = document.querySelector("#task-2 .user-search");
    userInputElement.classList.add("card-text");
    const userInput = prompt("Which game do you want to search?");
    userInputElement.textContent = `You searched for: ${userInput}`;

    GetGamesBySearch(userInput).then((games) => {
        AddCards(games, cardsContainer2)
    })
}

//3rd task
//skipped for now

//4th task

const fourthTaskButton = document.querySelector("#task-4 button");
fourthTaskButton.addEventListener("click", async => ActivateFourthTask());

function ActivateFourthTask() {

    const gameID = prompt("Enter a game ID to get its details");
    GetGameRating(gameID).then((game) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = CreateCard(game);
        CreateStars(game.metacritic, card);
        cardsContainer4.appendChild(card);
        
    })

    
}

function CreateStars(rating, card) {
    
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");
    
    rating = Math.round(rating);
    let counter = 1;

    while (counter <= rating) {
        const star = document.createElement("img");
        star.src = "./assets/star-regular.svg";
        ratingContainer.appendChild(star);

        counter++;
    }   

    card.appendChild(ratingContainer);
}






