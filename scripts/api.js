const baseURL = "https://api.rawg.io/api";
const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

async function FetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.results;
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

export {
    GetTopRatedGames, GetGamesBySearch,
};

