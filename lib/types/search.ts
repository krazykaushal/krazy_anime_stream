export interface IAnimeSearchItem {
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

export interface IAnimeSearchResult {
  status: number;
  data: {
    animes: IAnimeSearchItem[];
    mostPopularAnimes: IAnimeSearchItem[];
    searchQuery: string;
    searchFilters: Record<string, any>;
    totalPages: number;
    hasNextPage: boolean;
    currentPage: number;
  };
}
