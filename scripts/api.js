const baseURL = "https://api.rawg.io/api";
const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

async function FetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

async function FetchSingleData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function GetTopRatedGames() {
    const key = new URLSearchParams (`key=${apiKey}`);
    key.append("ordering", "-metacritic");

    const games = await FetchData(`${baseURL}/games?${key}`);
    return games;
}

async function GetGamesBySearch(search) {
    const key = new URLSearchParams (`key=${apiKey}`);
    key.append("search", search);
    key.append("page_size", "10");
    key.append("ordering", "released");

    const games = await FetchData(`${baseURL}/games?${key}`);
    return games;
}

//3rd task skipped for now

async function GetGameRating(gameID){
    const key = new URLSearchParams (`key=${apiKey}`);
    const game = await FetchSingleData(`${baseURL}/games/${gameID}?${key}`);
    return game;
}

async function GetDevelopers() {
    const key = new URLSearchParams (`key=${apiKey}`);
    key.append("page_size", "10");

    const developers = await FetchData(`${baseURL}/developers?${key}`);
    return developers;
}

async function GetGamesByDeveloper(developer) {
    const key = new URLSearchParams (`key=${apiKey}`);
    key.append("developers", developer);
    key.append("page_size", "10");
    key.append("ordering", "-metacritic");

    const games = await FetchData(`${baseURL}/games?${key}`);
    return games;
}

export {
    GetTopRatedGames, GetGamesBySearch, GetGameRating, GetDevelopers,
    GetGamesByDeveloper
};

