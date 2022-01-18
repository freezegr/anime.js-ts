const { version } = require('../package.json');
import request from 'request';
import cheerio from 'cheerio';
import { AnimeType, MangaType } from "./interfaces"

const neko = request.defaults({
  baseUrl: 'https://nekos.life/api/v2/',
});

const mal = request.defaults({
  baseUrl: `https://myanimelist.net/profile/`,
});

const malAnimeList = request.defaults({
  baseUrl: `https://myanimelist.net/animelist/`,
});

const malMangaList = request.defaults({
  baseUrl: `https://myanimelist.net/mangalist/`,
});

const kitsu = request.defaults({
  baseUrl: `https://kitsu.io/api/edge/`,
  headers: {
    'User-Agent': `kitsu.js, a npm module for the kitsu.io API. v${version} (https://github.com/freezegr/anime.js)`,
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
});

export const animeSearch = (search: string, maxResults: number | string = "max") => {
  return new Promise(async (resolve) => {
    let page: number = 0;
    const searchTearm: string = encodeURIComponent(search);
    kitsu.get("anime?filter[text]=" + searchTearm + "&page[offset]=" + page, (error, response, html) => {
      
      const res: AnimeType[] = JSON.parse(html).data;
      if(res.length == 0) return resolve([]);

      if(maxResults == "max") maxResults = res.length;
      let results: AnimeType[] = res.slice(0, +maxResults);

      resolve(results)
    });
  });
};

export const mangaSearch = (search: string, maxResults: number | string = "max") => {
  return new Promise(async (resolve) => {
    let page: number = 0;
    const searchTearm: string = encodeURIComponent(search);
    kitsu.get("manga?filter[text]=" + searchTearm + "&page[offset]=" + page, (error, response, html) => {
      
      const res: MangaType[] = JSON.parse(html).data;
      if(res.length == 0) return resolve([]);

      if(maxResults == "max") maxResults = res.length;
      let results: MangaType[] = res.slice(0, +maxResults);

      resolve(results)
    });
  });
};