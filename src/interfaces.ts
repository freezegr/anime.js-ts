interface Attributes {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  titles: {
    en: string;
    en_jp: string;
    ja_jp: string;
  };
  canonicalTitle: string;
  abbreviatedTitles: string[];
  averageRating: string;
  userCount: number;
  favoritesCount: number;
  startDate: string;
  endDate: string;
  nextRelease: string | null;
  popularityRank: number;
  ratingRank: number;
  ageRating: string;
  subtype: string;
  status: string;
  posterImage: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  };
  coverImage: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  };
}

interface AnimeBody extends Attributes {
  episodeCount: number | null;
  episodeLength: number | null;
  youtubeVideoId: string | null;
  showType: 'TV' | 'Special' | 'ONA' | 'OVA' | 'Movie' | 'Music';
  nsfw: boolean;
}

interface MangaBody extends Attributes {
  chapterCount: number;
  volumeCount: number;
  serialization: string;
  mangaType: string;
}

//for search ktisu
export interface KitsuAnimeType extends AnimeBody {
  id: string;
  type: 'anime';
  link: {
    self: string | null;
  };
  attributes: AnimeBody;
}

//for search
export interface KitsuMangaType extends MangaBody {
  id: string;
  type: 'manga';
  link: {
    self: string | null;
  };
  attributes: MangaBody;
}

//mal
export interface MalAnimeListBody {
  status: number;
  score: number;
  is_rewatching: number;
  num_watched_episodes: number;
  anime_title: string;
  anime_title_eng: string;
  anime_num_episodes: number;
  anime_id: number;
  anime_studios: string | null;
  anime_licensors: string | null | string[];
  anime_season: string;
  has_video: boolean;
  video_url: string;
  genres: {
    id: number;
    name: string;
  }[];
  demographics: {
    id: number;
    name: string;
  }[];
  anime_url: string;
  anime_image_path: string;
  anime_media_type_string: 'TV' | 'Special' | 'ONA' | 'OVA' | 'Movie' | 'Music';
  anime_mpaa_rating_string: string;
  anime_start_date_string: string;
  anime_end_date_string: string;
  days_string: string | null;
}

export interface MalAnimeList {
  watching: MalAnimeListBody[];
  completed: MalAnimeListBody[];
  dropped: MalAnimeListBody[];
  onhold: MalAnimeListBody[];
  planToWatch: MalAnimeListBody[];
}

export interface MalMangaListBody {
  id: number;
  status: number;
  score: number;
  tags: string;
  is_rereading: number;
  num_read_chapters: number;
  num_read_volumes: number;
  manga_title: string;
  manga_english: string;
  manga_num_chapters: number;
  manga_num_volumes: number;
  manga_publishing_status: number;
  manga_id: number;
  manga_magazines: null;
  genres: {
    id: number;
    name: string;
  }[];
  demographics: {
    id: number;
    name: string;
  }[];
  title_localized: null;
  manga_url: string;
  manga_image_path: string;
  is_added_to_list: boolean;
  manga_media_type_string: string;
  start_date_string: null;
  finish_date_string: null;
  manga_start_date_string: string;
  manga_end_date_string: null;
  days_string: null;
  retail_string: null;
  priority_string: string;
};

export interface MalMangaList {
  reading: Array<MalMangaListBody>;
  completed: MalMangaListBody[];
  dropped: MalMangaListBody[];
  onhold: MalMangaListBody[];
  planToRead: MalMangaListBody[];
}
