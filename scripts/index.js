import { 
    GetTopRatedGames, GetGamesBySearch, GetGameRating, GetDevelopers,
    GetGamesByDeveloper, GetGamesByDateRange, GetGameyByRatingRange,
    GetGamesByPlatform, GetPlatforms
} from "./api.js";


const cardsContainer1 = document.querySelector("#task-1 .cards-container");
const cardsContainer2 = document.querySelector("#task-2 .cards-container");
const cardsContainer3 = document.querySelector("#task-3 .cards-container");
const cardsContainer4 = document.querySelector("#task-4 .cards-container")
const cardsContainer5 = document.querySelector("#task-5 .cards-container");
const cardsContainer6 = document.querySelector("#task-6 .cards-container");
const cardsContainer7 = document.querySelector("#task-7 .cards-container");
const cardsContainer8 = document.querySelector("#task-8 .cards-container");


// universal functions
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

function CreateStars(rating, card) {
    
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");
    
    rating = Math.round( rating / 20 );
    let counter = 1;

    while (counter <= rating) {
        const coloredStar = document.createElement("img");
        coloredStar.src = "./assets/star-solid.svg";
        ratingContainer.appendChild(coloredStar);

        counter++;
    }  
    
    while (counter < 6) {
        const normalStar = document.createElement("img");
        normalStar.src = "./assets/star-regular.svg";
        ratingContainer.appendChild(normalStar);
        counter++;
    }

    card.appendChild(ratingContainer);
}

function CreateStoreCard(store) {
    return `
    <h2 class="card-title">${store.store.name}</h2>
    <img src="${store.store.image_background}" alt="" class="card-image">
     <p class="card-text">
        Number of games: 
        <span>
            ${store.store.games_count}                
        </span>
     </p>
    `
}

const InputSeparatedByCommas = (message) => {
    const userInput = prompt(`${message}`);
    const userInputArray = userInput.split(",");
    const result = userInputArray.map(el => el.trim());
    return result;
}

const ConvertToSlugFormat = (name) => {
    if (name.includes(" "))
    {
        const separatedWords = name.split(" ");
        const slug = separatedWords.join("-");
        return slug.toLowerCase();
    }
    return name.toLowerCase();
}

function InputDate(message) {
    
    while (true) {
        let date = prompt(`${message}`);

        if (date.length !== 10)
            continue;
        
        const parts = date.split("-");
        if (parts.length !== 3)
            continue;

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        if (isNaN(year) || isNaN(month) || isNaN(day))
            continue;
        if (year > 2024 || month < 1 || month > 12 || day < 1 || day > 31)
            continue;

        return date;
    }  
}

function InputRating (message) {
   
    while (true) {
        let rating = +prompt(`${message}`);

        if (!isNaN(rating) && rating <= 100 && rating >=0)
            return rating;
    }
}

function GetPlatformIDs(platformNames, selectedPlatforms) {
    
    const platformIDs = selectedPlatforms.map ( (platform) => {
        return platformNames.find( (platformName) => 
                                platformName.name === platform).id;
    });
    return platformIDs.join(",");
}

//1st task
GetTopRatedGames().then((games) => {
    AddCards(games, cardsContainer1)
});


//2nd task

const secondTaskButton = document.querySelector("#task-2 button");
secondTaskButton.addEventListener("click", () => ActivateSecondTask());

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

const thirdTaskButton = document.querySelector("#task-3 button");
thirdTaskButton.addEventListener("click", () => ActivateThirdTask());

async function ActivateThirdTask() {
    const platforms = await GetPlatforms();
    const platformNames = platforms.map((platform) => {return {id: platform.id, name: platform.name}});

    const message =
    `top 10 platforms: \n
    ${platformNames
        .map((platform) => platform.name)
        .join(", ")} \n
    Choose platforms (separated by commas)`;

    const selectedPlatformNames = InputSeparatedByCommas(message);
    const platformIDs = GetPlatformIDs(platformNames, selectedPlatformNames);

    const gamesByPlatform = await GetGamesByPlatform(platformIDs);
    AddCards(gamesByPlatform, cardsContainer3);
}


//4th task

const fourthTaskButton = document.querySelector("#task-4 button");
fourthTaskButton.addEventListener("click", () => ActivateFourthTask());

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



//5th task

const fifthTaskButton = document.querySelector("#task-5 button");
fifthTaskButton.addEventListener("click", () => ActivateFifthTask());

function ActivateFifthTask() {
    
    const gameID = prompt("Enter a game ID to get its stores");
    GetGameRating(gameID).then((game) => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = CreateCard(game);

        const gameSearch = document.querySelector("#task-5 .user-search");
        const storesNotice = document.querySelector("#task-5 .notice");
        gameSearch.classList.add("card-text");
        storesNotice.classList.add("card-text");

        gameSearch.textContent = `You searched for: ${game.name}`;
        storesNotice.textContent = "Stores:";


        const stores = game.stores;
        const storesContainer = document.querySelector("#task-5 .stores-container")
        for (const store of stores)
        {
            console.log(store)
            const storeCard = document.createElement("div");
            storeCard.classList.add("card");
            storeCard.innerHTML = CreateStoreCard(store);
            storesContainer.appendChild(storeCard);
        }

        cardsContainer5.appendChild(card);
    })
}

//6th task

const sixthTaskButton = document.querySelector("#task-6 button");
sixthTaskButton.addEventListener("click", () => ActivateSixthTask());


async function ActivateSixthTask() {
    
    const developers = await GetDevelopers();
    const developerSlugs = developers.map((developer) => developer.slug);
    const developerNames = developers.map((developer) => developer.name);

    const message = 
    `top 10 developers: \n
    ${developerNames.join(", ")} \n
    Choose developers (separated by commas)`;

    const selectedDevelopers = InputSeparatedByCommas(message);
    const selectedSlugs = selectedDevelopers.map(dev => ConvertToSlugFormat(dev));

    const listOfGamesByEachDev = [];

    for (const dev of selectedSlugs){
        const gamesByDev = await GetGamesByDeveloper(dev);
        listOfGamesByEachDev.push( {name: dev, games: gamesByDev} );
    }

    for (const dev of listOfGamesByEachDev){
        const devGamesContainer = document.createElement("div");
        devGamesContainer.classList.add("dev-heading");
        devGamesContainer.innerHTML = `<h2>${dev.name}</h2>`;

        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("cards-container");

        AddCards(dev.games, cardsContainer);
        devGamesContainer.append(cardsContainer);
        cardsContainer6.append(devGamesContainer);
    }
}

//7th task

const seventhTaskButton = document.querySelector("#task-7 button");
seventhTaskButton.addEventListener("click", () => ActivateSeventhTask());

async function ActivateSeventhTask (){

    const startDate = InputDate("Enter the starting date (format: yyyy-mm-dd)");
    let endDate;
    while (true) {
        endDate = InputDate("Enter the ending date (format: yyyy-mm-dd)");

        if (Date.parse(endDate) > Date.parse(startDate))
            break;

        alert(`Invalid input! (The ending date has to be after the starting date (${startDate})!`);
    }

    const gamesByDate = await GetGamesByDateRange(startDate, endDate);
    AddCards(gamesByDate, cardsContainer7);
}


//8th task

const eighthTaskButton = document.querySelector("#task-8 button");
eighthTaskButton.addEventListener("click", () => ActivateEighthTask());


async function ActivateEighthTask () {
    const firstRating = InputRating("Unesite prvi rating (0-100)");
    let secondRating;
    while (true) {
        secondRating = InputRating(`Unesite drugi rating (${firstRating}-100)`);
        
        if (secondRating >= firstRating)
            break;
        alert(`Invalid input! (The second rating has to be equal or greater than ${firstRating}`);
    }

    const gamesByRatingRange = await GetGameyByRatingRange(firstRating, secondRating);
    AddCards(gamesByRatingRange, cardsContainer8);
}

