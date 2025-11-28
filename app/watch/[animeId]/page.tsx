"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";
import {
  IEpisodeServersResponse,
  IEpisodeSourcesResponse,
  CategoryType,
  IServer,
} from "@/lib/types/streaming";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IAnimeInfoResponse, IEpisodesResponse } from "@/lib/types/animeInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getEpisodeServers = async (
  episodeId: string
): Promise<IEpisodeServersResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/episode/servers?animeEpisodeId=${episodeId}`
  );
  console.log("Servers:", response);
  return response.data;
};

const getEpisodeSources = async (
  episodeId: string,
  server: string,
  category: CategoryType
): Promise<IEpisodeSourcesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=${server}&category=${category}`
  );
  console.log("Sources:", response);
  return response.data;
};

const getAnimeInfo = async (animeId: string): Promise<IAnimeInfoResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/anime/${animeId}`
  );
  return response.data;
};

const getAnimeEpisodes = async (animeId: string): Promise<IEpisodesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/anime/${animeId}/episodes`
  );
  return response.data;
};

const WatchAnime = ({ params }: { params: { animeId: string } }) => {
  const router = useRouter();

  // Extract anime ID from episodeId (format: "anime-name-123?ep=456")
  const animeId = params.animeId.split("?")[0];

  // State for selected category and server
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("sub");
  const [selectedServer, setSelectedServer] = useState<string>("hd-1");

  // Fetch anime info
  const {
    data: animeInfoData,
    isLoading: animeInfoLoading,
  } = useQuery({
    queryKey: ["animeInfo", animeId],
    queryFn: () => getAnimeInfo(animeId),
    refetchOnWindowFocus: false,
  });

  // Fetch episodes list
  const {
    data: episodesData,
    isLoading: episodesLoading,
  } = useQuery({
    queryKey: ["animeEpisodes", animeId],
    queryFn: () => getAnimeEpisodes(animeId),
    refetchOnWindowFocus: false,
  });

  // Fetch available servers
  const {
    data: serversData,
    isLoading: serversLoading,
    error: serversError,
  } = useQuery({
    queryKey: ["episodeServers", params.animeId],
    queryFn: () => getEpisodeServers(params.animeId),
    refetchOnWindowFocus: false,
  });

  // Fetch episode sources based on selected server and category
  const {
    data: sourcesData,
    isLoading: sourcesLoading,
    error: sourcesError,
  } = useQuery({
    queryKey: ["episodeSources", params.animeId, selectedServer, selectedCategory],
    queryFn: () => getEpisodeSources(params.animeId, selectedServer, selectedCategory),
    enabled: !!serversData,
    refetchOnWindowFocus: false,
  });

  // Extract data
  const anime = animeInfoData?.data.anime;
  const episodes = episodesData?.data.episodes || [];
  const currentEpisodeNo = serversData?.data.episodeNo;

  // Find current episode index and navigation
  const currentEpisodeIndex = episodes.findIndex(ep => ep.number === currentEpisodeNo);
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex < episodes.length - 1;

  // Episode navigation handlers
  const goToPreviousEpisode = () => {
    if (hasPrevious) {
      const prevEpisode = episodes[currentEpisodeIndex - 1];
      router.push(`/watch/${prevEpisode.episodeId}`);
    }
  };

  const goToNextEpisode = () => {
    if (hasNext) {
      const nextEpisode = episodes[currentEpisodeIndex + 1];
      router.push(`/watch/${nextEpisode.episodeId}`);
    }
  };

  const goToEpisode = (episodeId: string) => {
    router.push(`/watch/${episodeId}`);
  };

  if (serversLoading || sourcesLoading || animeInfoLoading || episodesLoading) {
    return (
      <div className="flex flex-col space-y-3 mt-10">
        <Skeleton className="h-96 w-[90%] mx-auto rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[85%] mx-auto" />
          <Skeleton className="h-4 w-[75%] mx-auto" />
        </div>
      </div>
    );
  }

  if (serversError || sourcesError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-2xl font-semibold">
          An error occurred while loading the video. Please try again.
        </div>
      </div>
    );
  }

  const servers = serversData?.data;
  const sources = sourcesData?.data;

  return (
    <div className="w-full">
      {/* Anime Info Header */}
      {anime && (
        <div className="w-[90%] mx-auto mt-6 mb-4 p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
          <div className="flex gap-4 items-start">
            <Link href={`/anime/${animeId}/info`}>
              <Image
                src={anime.info.poster}
                width={120}
                height={160}
                alt={anime.info.name}
                className="rounded-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </Link>
            <div className="flex-1">
              <Link href={`/anime/${animeId}/info`}>
                <h1 className="text-2xl font-bold hover:text-amber-400 cursor-pointer">
                  {anime.info.name}
                </h1>
              </Link>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {anime.info.description.replace(/<[^>]*>/g, '')}
              </p>
              <div className="flex gap-2 flex-wrap mt-3">
                {anime.info.stats.rating && (
                  <Badge variant="outline" className="border-amber-400">
                    {anime.info.stats.rating}
                  </Badge>
                )}
                {anime.info.stats.quality && (
                  <Badge variant="outline" className="border-green-500">
                    {anime.info.stats.quality}
                  </Badge>
                )}
                {anime.info.stats.type && (
                  <Badge variant="outline" className="border-purple-500">
                    {anime.info.stats.type}
                  </Badge>
                )}
                {anime.info.stats.duration && (
                  <Badge variant="outline" className="border-cyan-500">
                    {anime.info.stats.duration}
                  </Badge>
                )}
                {anime.moreInfo.malscore && (
                  <Badge variant="outline" className="border-yellow-500">
                    MAL Score: {anime.moreInfo.malscore}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Episode Navigation */}
      {episodes.length > 0 && (
        <div className="w-[90%] mx-auto mb-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={goToPreviousEpisode}
              disabled={!hasPrevious}
              variant="outline"
              className="border-amber-400"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Episode
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-amber-400 text-lg px-3 py-1">
                Episode {currentEpisodeNo} / {episodes.length}
              </Badge>
            </div>

            <Button
              onClick={goToNextEpisode}
              disabled={!hasNext}
              variant="outline"
              className="border-amber-400"
            >
              Next Episode
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="flex flex-col gap-4 w-[90%] mx-auto mb-4">
        {/* Episode Info with IDs */}
        <div className="flex items-center gap-2">
          {sources?.anilistID && (
            <Badge variant="outline" className="border-blue-500">
              AniList ID: {sources.anilistID}
            </Badge>
          )}
          {sources?.malID && (
            <Badge variant="outline" className="border-green-500">
              MAL ID: {sources.malID}
            </Badge>
          )}
        </div>

        {/* Category Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-400">Select Category:</span>
          <div className="flex gap-2 flex-wrap">
            {servers?.sub && servers.sub.length > 0 && (
              <Button
                variant={selectedCategory === "sub" ? "default" : "outline"}
                onClick={() => setSelectedCategory("sub")}
                className={selectedCategory === "sub" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-400"}
              >
                Sub ({servers.sub.length} servers)
              </Button>
            )}
            {servers?.dub && servers.dub.length > 0 && (
              <Button
                variant={selectedCategory === "dub" ? "default" : "outline"}
                onClick={() => setSelectedCategory("dub")}
                className={selectedCategory === "dub" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-400"}
              >
                Dub ({servers.dub.length} servers)
              </Button>
            )}
            {servers?.raw && servers.raw.length > 0 && (
              <Button
                variant={selectedCategory === "raw" ? "default" : "outline"}
                onClick={() => setSelectedCategory("raw")}
                className={selectedCategory === "raw" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-400"}
              >
                Raw ({servers.raw.length} servers)
              </Button>
            )}
          </div>
        </div>

        {/* Server Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-400">Select Server:</span>
          <div className="flex gap-2 flex-wrap">
            {servers?.[selectedCategory]?.map((server: IServer) => (
              <Button
                key={server.serverId}
                variant={selectedServer === server.serverName ? "default" : "outline"}
                onClick={() => setSelectedServer(server.serverName)}
                className={
                  selectedServer === server.serverName
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-400"
                }
              >
                {server.serverName}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex justify-center mt-4">
        {sources?.sources && sources.sources.length > 0 ? (
          <ReactPlayer
            url={sources.sources[0].url}
            controls
            width="90%"
            height="auto"
            playing={false}
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
              },
            }}
          />
        ) : (
          <div className="text-center text-xl text-gray-400 mt-8">
            No video source available for this selection.
          </div>
        )}
      </div>

      {/* Intro/Outro Information */}
      {sources?.intro && sources?.outro && (
        <div className="flex gap-4 justify-center mt-6 mb-4">
          <Badge variant="outline" className="border-cyan-500">
            Intro: {sources.intro.start}s - {sources.intro.end}s
          </Badge>
          <Badge variant="outline" className="border-orange-500">
            Outro: {sources.outro.start}s - {sources.outro.end}s
          </Badge>
        </div>
      )}

      {/* Episode Selector Grid */}
      {episodes.length > 0 && (
        <div className="w-[90%] mx-auto mt-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-4">
            All Episodes ({episodes.length})
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2">
            {episodes.map((episode) => (
              <Button
                key={episode.episodeId}
                onClick={() => goToEpisode(episode.episodeId)}
                variant={episode.number === currentEpisodeNo ? "default" : "outline"}
                className={`${
                  episode.number === currentEpisodeNo
                    ? "bg-amber-500 hover:bg-amber-600"
                    : episode.isFiller
                    ? "border-orange-400 text-orange-400"
                    : "border-gray-500"
                }`}
                title={episode.title}
              >
                {episode.number}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="border-orange-400 text-orange-400">
              Filler Episodes
            </Badge>
            <Badge variant="outline" className="border-amber-500">
              Current Episode
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchAnime;
