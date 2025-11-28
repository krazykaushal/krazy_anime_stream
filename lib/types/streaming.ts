// Server types
export interface IServer {
  serverName: string;
  serverId: number;
}

export interface IEpisodeServers {
  sub: IServer[];
  dub: IServer[];
  raw: IServer[];
  episodeId: string;
  episodeNo: number;
}

export interface IEpisodeServersResponse {
  status: number;
  data: IEpisodeServers;
}

// Source types
export interface ITrack {
  url: string;
  lang: string;
}

export interface IIntroOutro {
  start: number;
  end: number;
}

export interface ISource {
  url: string;
  isM3U8: boolean;
  type: string;
}

export interface IHeaders {
  Referer: string;
}

export interface IEpisodeSources {
  headers: IHeaders;
  tracks: ITrack[];
  intro: IIntroOutro;
  outro: IIntroOutro;
  sources: ISource[];
  anilistID: number;
  malID: number;
}

export interface IEpisodeSourcesResponse {
  status: number;
  data: IEpisodeSources;
}

// Category type for episode sources
export type CategoryType = "sub" | "dub" | "raw";
