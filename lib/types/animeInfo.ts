// Character and Voice Actor types
export interface ICharacter {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface IVoiceActor {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface ICharacterVoiceActor {
  character: ICharacter;
  voiceActor: IVoiceActor;
}

// Anime Info types
export interface IAnimeStats {
  rating: string;
  quality: string;
  episodes: {
    sub: number;
    dub: number;
  };
  type: string;
  duration: string;
}

export interface IAnimeInfoData {
  id: string;
  anilistId: number;
  malId: number;
  name: string;
  poster: string;
  description: string;
  stats: IAnimeStats;
  promotionalVideos: string[];
  charactersVoiceActors: ICharacterVoiceActor[];
}

export interface IAnimeMoreInfo {
  japanese: string;
  synonyms: string;
  aired: string;
  premiered: string;
  duration: string;
  status: string;
  malscore: string;
  genres: string[];
  studios: string;
  producers: string[];
}

export interface IAnime {
  info: IAnimeInfoData;
  moreInfo: IAnimeMoreInfo;
}

// Season types
export interface ISeason {
  id: string;
  name: string;
  title: string;
  poster: string;
  isCurrent: boolean;
}

// Related and Recommended Anime types
export interface IRelatedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: {
    sub: number | null;
    dub: number | null;
  };
  type: string;
}

export interface IRecommendedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: {
    sub: number | null;
    dub: number | null;
  };
}

export interface IMostPopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: {
    sub: number;
    dub: number;
  };
  type: string;
}

// Main Response types
export interface IAnimeInfoResponse {
  status: number;
  data: {
    anime: IAnime;
    seasons: ISeason[];
    mostPopularAnimes: IMostPopularAnime[];
    relatedAnimes: IRelatedAnime[];
    recommendedAnimes: IRecommendedAnime[];
  };
}

// Episodes types
export interface IEpisode {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

export interface IEpisodesResponse {
  status: number;
  data: {
    totalEpisodes: number;
    episodes: IEpisode[];
  };
}
