const { version } = require('../package.json');
import { KitsuAnimeType, KitsuMangaType, MalAnimeList, MalAnimeListBody, MalMangaList, MalMangaListBody } from "./interfaces"
import request from 'request';
import cheerio from 'cheerio';
import fs from "fs";

const neko = request.defaults({
  baseUrl: 'https://nekos.life/api/v2/',
  headers: {
    'content-type': 'application/json'
  }
});

const profileMalReq = request.defaults({
  baseUrl: `https://myanimelist.net/profile/`,
});

const malAnimeListReq = request.defaults({
  baseUrl: `https://myanimelist.net/animelist/`,
  headers: {
    'content-type': 'application/json'
  }
});

const malMangaListReq = request.defaults({
  baseUrl: `https://myanimelist.net/mangalist/`,
  headers: {
    'content-type': 'application/json'
  }
});

const kitsu = request.defaults({
  baseUrl: `https://kitsu.io/api/edge/`,
  headers: {
    'User-Agent': `kitsu.js, a npm module for the kitsu.io API. v${version} (https://github.com/freezegr/anime.js)`,
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
});

export const animeSearch = (search: string, maxResults: number | string = "max"): Promise<KitsuAnimeType[]> => {
  return new Promise(async (resolve) => {
    let page: number = 0;
    const searchTearm: string = encodeURIComponent(search);
    kitsu.get("anime?filter[text]=" + searchTearm + "&page[offset]=" + page, (error, response, html) => {
      
      const res: KitsuAnimeType[] = JSON.parse(html).data;
      if(res.length == 0) return resolve([]);

      if(maxResults == "max") maxResults = res.length;
      let results: KitsuAnimeType[] = res.slice(0, +maxResults);

      resolve(results)
    });
  });
};

export const mangaSearch = (search: string, maxResults: number | string = "max"): Promise<KitsuMangaType[]> => {
  return new Promise(async (resolve) => {
    let page: number = 0;
    const searchTearm: string = encodeURIComponent(search);
    kitsu.get("manga?filter[text]=" + searchTearm + "&page[offset]=" + page, (error, response, html) => {
      
      const res: KitsuMangaType[] = JSON.parse(html).data;
      if(res.length == 0) return resolve([]);

      if(maxResults == "max") maxResults = res.length;
      let results: KitsuMangaType[] = res.slice(0, +maxResults);

      resolve(results)
    });
  });
};


export const nekoNsfw = (category: string): Promise<{ url: string } | undefined> => {
  if (!category) throw new Error('[Anime.js: no category]');
  return new Promise((resolve) => {
    const nsfw = require('./nsfw.json');

    if (!nsfw[category]) throw new Error(`[Anime.js: ${category} is invalid category]`);
    neko.get(nsfw[category], (error: any, response: any, html: string) => {
      if(error) return resolve(undefined)
      resolve(JSON.parse(html))
    });
  });
};

export const nekoSfw = (category: string): Promise<{ url: string } | undefined> => {
  if (!category) throw new Error('[Anime.js: no category]');
  return new Promise((resolve) => {
    const sfw = require('./sfw.json');

    if (!sfw[category]) throw new Error(`[Anime.js: ${category} is invalid category]`);
    neko.get(sfw[category], (error: any, response: any, html: string) => {
      if(error) return resolve(undefined)
      resolve(JSON.parse(html))
    });
  });
};

export const wallpaper = (): Promise<{ url: string } | undefined> => {
  return new Promise((resolve) => {
    neko.get('/img/wallpaper', (error: any, response: any, html: string) => {
      if(error) return resolve(undefined);
      resolve(JSON.parse(html));
    });
  });
};

export const getAnimeList = (username: string): Promise<MalAnimeList | undefined> => {
  if (!username) throw new Error('[Anime.js: no username]');
  return new Promise((resolve) => {
    let animes: MalAnimeList = { watching: [], completed: [], dropped: [], onhold: [], planToWatch: [] };
    const getAnimeListLoop = (offset: number = 0) => {
      malAnimeListReq.get(`${username}/load.json?offset=${offset}&status=7}`, (error, response, html: string) => {
        if (html == '{"errors":[{"message":"invalid request"}]}' || error) return resolve(undefined)
        const res: MalAnimeListBody[] = JSON.parse(html);
        animes.watching.push(...res.filter(x => x.status == 1));
        animes.completed.push(...res.filter(x => x.status == 2));
        animes.onhold.push(...res.filter(x => x.status == 3));
        animes.dropped.push(...res.filter(x => x.status == 4));
        animes.planToWatch.push(...res.filter(x => x.status == 6));
        if(res.length == 300){
          return getAnimeListLoop(offset + 300)
        } else {
          resolve(animes)
        }; 
      });
    };
    getAnimeListLoop();
  });
};

export const getMangaList = (username: string = "Aarana"): Promise<MalMangaList | undefined> => {
  if (!username) throw new Error('[Anime.js: no username]');
  return new Promise((resolve) => {
    let mangas: MalMangaList = { reading: [], completed: [], dropped: [], onhold: [], planToRead: [] };
    let res: MalMangaListBody[];
    const getMangaListLoop = (offset: number = 0) => {
      malMangaListReq.get(`${username}/load.json?offset=${offset}&status=7}`, (error, response, html: string) => {
        if (html == '{"errors":[{"message":"invalid request"}]}' || error) return resolve(undefined)
        const res: MalMangaListBody[] = JSON.parse(html);

        mangas.reading.push(...res.filter(x => x.status == 1));
        mangas.completed.push(...res.filter(x => x.status == 2));
        mangas.onhold.push(...res.filter(x => x.status == 3));
        mangas.dropped.push(...res.filter(x => x.status == 4));
        mangas.planToRead.push(...res.filter(x => x.status == 6));
        if(res.length == 300){
           getMangaListLoop(offset + 300);
        } else {
           resolve(mangas)
        }; 
      });
    };
    getMangaListLoop();
  });
};

