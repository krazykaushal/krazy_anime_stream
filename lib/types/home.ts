export interface IAnimeHomeInfo {
  genres: string[];
  spotlightAnimes: spotlightAnime[];
  trendingAnimes: trendingAnime[];
  latestEpisodeAnimes: latestEpisodeAnime[];
  topUpcomingAnimes: topUpcomingAnime[];
  top10Animes: top10Anime;
  topAiringAnimes: topAiringAnime[];
  mostPopularAnimes: mostPopularAnime[];
  mostFavoriteAnimes: mostFavoriteAnime[];
  latestCompletedAnimes: latestCompletedAnime[];
}

export type listAnimeType = 'spotlight'  | 'trending' | 'latestEpisode' | 'topUpcoming' | 'top10Today' | 'top10Week' | 'top10Month' | 'topAiring' | 'mostPopular' | 'mostFavorite' | 'latestCompleted'

export interface spotlightAnime {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  jname: string;
  episodes: { sub: number | null; dub: number | null };
  type: string;
  otherInfo: string[];
}

export interface trendingAnime {
  rank: number;
  id: string;
  name: string;
  jname: string;
  poster: string;
}

export interface latestEpisodeAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: { sub: number | null; dub: number | null };
}

export interface topUpcomingAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: { sub: number | null; dub: number | null };
}

export interface IgeneralAnimeInfo {
  id: string;
  rank: number;
  name: string;
  jname: string;
  poster: string;
  episodes: { sub: number | null; dub: number | null };
}

export interface top10Anime {
  today: IgeneralAnimeInfo[];
  week: IgeneralAnimeInfo[];
  month: IgeneralAnimeInfo[];
}

export interface topAiringAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: { sub: number | null; dub: number | null };
  type: string;
}

export interface mostPopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: { sub: number | null; dub: number | null };
  type: string;
}

export interface mostFavoriteAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: { sub: number | null; dub: number | null };
  type: string;
}

export interface latestCompletedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: { sub: number | null; dub: number | null };
  type: string;
}


export interface IEpisodeObj {
  totalEpisodes: number;
  episodes: {
    number: number;
    title: number;
    episodeId: string;
    isFiller: boolean;
  }[];
}

export interface IAnimeInfo {
  info: {
    id: string;
    anilistId: number;
    malId: number;
    name: string;
    poster: string;
    description: string;
    promotionalVideos: string[];
    charactersVoiceActors: string[];
    stats: {
      rating: string;
      quality: string;
      type: string;
      duration: string;
      episodes: {
        sub: number;
        dub: number;
      };
    };
  };
  moreInfo: {
    japanese: string;
    synonyms: string;
    aired: string;
    premiered: string;
    duration: string;
    status: string;
    studios: string;
    genres: string[];
    producers: string[];
  };
  seasons: ISeasonInfo[];
}

export interface ISeasonInfo {
  id: string;
  name: string;
  title: string;
  poster: string;
  isCurrent: boolean;
}
