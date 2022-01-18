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
    averageRating: string
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
