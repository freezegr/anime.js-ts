const { getAnimeList } =  require("../dist/index");
getAnimeList("freezegr").then(res => console.log(res))