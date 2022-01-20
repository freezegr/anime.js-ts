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

export interface AnimeType extends AnimeBody {
  id: string;
  type: 'anime';
  link: {
    self: string | null;
  };
  attributes: AnimeBody;
}

export interface MangaType extends MangaBody {
  id: string;
  type: 'manga';
  link: {
    self: string | null;
  };
  attributes: AnimeBody;
}

export interface AnimeListBody {
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
    id: number,
    name: string
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

export interface AnimeList {
  watching: AnimeListBody[];
  completed: AnimeListBody[];
  dropped: AnimeListBody[];
  onhold: AnimeListBody[];
  planToWatch: AnimeListBody[];
}