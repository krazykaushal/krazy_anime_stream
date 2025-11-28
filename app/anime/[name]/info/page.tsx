"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IAnimeInfoResponse, IEpisodesResponse } from "@/lib/types/animeInfo";

const getAnimeData = async (id: string): Promise<IAnimeInfoResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/anime/${id}`
  );
  console.log(response);
  return response.data;
};

const getAnimeEpisodesData = async (id: string): Promise<IEpisodesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/anime/${id}/episodes`
  );
  console.log(response);
  return response.data;
};

const AnimeInfo = ({ params }: { params: { name: string } }) => {
  const {
    data: animeInfo,
    error: animeInfoError,
    isLoading: animeInfoLoading,
  } = useQuery({
    queryKey: ["animeInfo", params.name],
    queryFn: () => getAnimeData(params.name),
  });

  const {
    data: animeEpisodes,
    error: episodesError,
    isLoading: episodesLoading,
  } = useQuery(
    ["animeEpisodes", params.name],
    () => getAnimeEpisodesData(params.name),
    {
      enabled: !!animeInfo,
    }
  );

  // Episode pagination state - MUST be called before any conditional returns
  const [currentEpisodePage, setCurrentEpisodePage] = useState(1);
  const episodesPerPage = 100;

  // Extract data early for hooks
  const anime = animeInfo?.data.anime;
  const seasons = animeInfo?.data.seasons || [];
  const mostPopularAnimes = animeInfo?.data.mostPopularAnimes || [];
  const relatedAnimes = animeInfo?.data.relatedAnimes || [];
  const recommendedAnimes = animeInfo?.data.recommendedAnimes || [];
  const episodes = useMemo(
    () => animeEpisodes?.data.episodes ?? [],
    [animeEpisodes?.data?.episodes]
  );

  // Calculate pagination - MUST be called before any conditional returns
  const totalEpisodePages = Math.ceil(episodes.length / episodesPerPage);
  const paginatedEpisodes = useMemo(() => {
    const startIndex = (currentEpisodePage - 1) * episodesPerPage;
    const endIndex = startIndex + episodesPerPage;
    return episodes.slice(startIndex, endIndex);
  }, [episodes, currentEpisodePage]);

  if (animeInfoLoading || episodesLoading) {
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

  // Handlers for pagination
  const goToNextPage = () => {
    if (currentEpisodePage < totalEpisodePages) {
      setCurrentEpisodePage(currentEpisodePage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentEpisodePage > 1) {
      setCurrentEpisodePage(currentEpisodePage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    setCurrentEpisodePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Main Anime Info Section */}
      <div className="grid grid-rows-2 lg:grid-cols-7 md:grid-rows-1 gap-4 p-8 h-full w-[90%] mx-auto mt-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="flex justify-center lg:col-span-2">
          <Image
            width={300}
            height={400}
            alt={anime?.info.name || "Anime poster"}
            src={anime?.info.poster || ""}
            className="rounded-lg"
          />
        </div>
        <div className="lg:col-span-3">
          <div className="flex gap-2 flex-wrap">
            {anime?.info.stats.rating && (
              <Badge variant={"outline"} className="border-amber-300">
                {anime.info.stats.rating}
              </Badge>
            )}
            {anime?.info.stats.quality && (
              <Badge variant={"outline"} className="border-blue-400">
                {anime.info.stats.quality}
              </Badge>
            )}
            {anime?.info.stats.type && (
              <Badge variant={"outline"} className="border-slate-400">
                {anime.info.stats.type}
              </Badge>
            )}
            {anime?.info.stats.episodes.sub && anime.info.stats.episodes.sub > 0 && (
              <Badge variant={"outline"} className="border-purple-700">
                Sub: {anime.info.stats.episodes.sub}
              </Badge>
            )}
            {anime?.info.stats.episodes.dub && anime.info.stats.episodes.dub > 0 && (
              <Badge variant={"outline"} className="border-cyan-500">
                Dub: {anime.info.stats.episodes.dub}
              </Badge>
            )}
            {anime?.info.stats.duration && (
              <Badge variant={"outline"} className="border-green-500">
                {anime.info.stats.duration}
              </Badge>
            )}
          </div>
          <h2 className="text-3xl font-semibold py-4">{anime?.info.name}</h2>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-white">Description:</span>{" "}
            {anime?.info.description}
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="grid row-cols-1 md:grid-cols-3 lg:flex lg:flex-col gap-2">
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                More Info
              </h3>
              {anime?.moreInfo.japanese && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Japanese:</span>{" "}
                  {anime.moreInfo.japanese}
                </p>
              )}
              {anime?.moreInfo.synonyms && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Synonyms:</span>{" "}
                  {anime.moreInfo.synonyms}
                </p>
              )}
              {anime?.moreInfo.aired && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Aired:</span>{" "}
                  {anime.moreInfo.aired}
                </p>
              )}
              {anime?.moreInfo.premiered && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Premiered:</span>{" "}
                  {anime.moreInfo.premiered}
                </p>
              )}
              {anime?.moreInfo.duration && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Duration:</span>{" "}
                  {anime.moreInfo.duration}
                </p>
              )}
              {anime?.moreInfo.status && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Status:</span>{" "}
                  {anime.moreInfo.status}
                </p>
              )}
              {anime?.moreInfo.malscore && anime.moreInfo.malscore !== "?" && (
                <p className="text-sm">
                  <span className="font-semibold text-white">MAL Score:</span>{" "}
                  {anime.moreInfo.malscore}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                Genres
              </h3>
              <div className="flex flex-wrap gap-1">
                {anime?.moreInfo.genres &&
                  anime.moreInfo.genres.map((genre: string, index: number) => (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="border-teal-500"
                    >
                      {genre}
                    </Badge>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                Producers & Studios
              </h3>
              <div className="flex flex-wrap gap-1 my-2">
                <span className="font-semibold text-white text-sm">Producers: </span>
                {anime?.moreInfo.producers &&
                  anime.moreInfo.producers.map((producer: string, index: number) => (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="border-yellow-500"
                    >
                      {producer}
                    </Badge>
                  ))}
              </div>
              {anime?.moreInfo.studios && (
                <p className="text-sm mt-1">
                  <span className="font-semibold text-white">Studios:</span>{" "}
                  {anime.moreInfo.studios}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Characters and Voice Actors Section */}
      {anime?.info.charactersVoiceActors && anime.info.charactersVoiceActors.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            Characters & Voice Actors
          </h2>
          <div className="grid lg:grid-cols-2 gap-4 w-[90%] mx-auto mt-5">
            {anime.info.charactersVoiceActors.map((item, index) => (
              <Card key={index} className="p-4 hover:shadow-white">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Image
                      src={item.character.poster}
                      width={60}
                      height={60}
                      alt={item.character.name}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{item.character.name}</p>
                      <Badge variant="outline" className="border-purple-500 text-xs">
                        {item.character.cast}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-end text-right">
                    <div>
                      <p className="font-semibold">{item.voiceActor.name}</p>
                      <Badge variant="outline" className="border-cyan-500 text-xs">
                        {item.voiceActor.cast}
                      </Badge>
                    </div>
                    <Image
                      src={item.voiceActor.poster}
                      width={60}
                      height={60}
                      alt={item.voiceActor.name}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Seasons Section */}
      {seasons.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            More Seasons
          </h2>
          <div className="grid lg:grid-cols-6 sm:grid-cols-3 place-self-auto gap-4 w-[90%] mx-auto mt-5">
            {seasons.map((item, index) => (
              <Link
                key={index}
                href={{ pathname: `/anime/${item.id}/info` }}
                className={`${
                  item.isCurrent ? "border-2 border-amber-500 rounded-md" : ""
                }`}
              >
                <Card className="p-2 flex gap-2 items-center justify-center hover:shadow-white hover:cursor-pointer relative h-32">
                  <Image
                    src={item.poster}
                    width="0"
                    height="0"
                    alt={item.id}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                    className="blur-md object-cover rounded"
                  />
                  <CardTitle className="absolute text-center text-sm">
                    {item.title}
                  </CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Episodes Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between w-[90%] mx-auto">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            Episodes {animeEpisodes?.data.totalEpisodes && `(${animeEpisodes.data.totalEpisodes})`}
          </h2>
          {totalEpisodePages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                Page {currentEpisodePage} of {totalEpisodePages}
              </span>
            </div>
          )}
        </div>

        {/* Episode Pagination Controls - Top */}
        {totalEpisodePages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 mb-6">
            <Button
              onClick={goToPreviousPage}
              disabled={currentEpisodePage === 1}
              variant="outline"
              size="sm"
              className="border-amber-400"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalEpisodePages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalEpisodePages ||
                  (page >= currentEpisodePage - 1 && page <= currentEpisodePage + 1);

                const showEllipsisBefore =
                  page === currentEpisodePage - 2 && currentEpisodePage > 3;
                const showEllipsisAfter =
                  page === currentEpisodePage + 2 && currentEpisodePage < totalEpisodePages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <span key={page} className="px-2 py-1 text-gray-400">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={page}
                    onClick={() => goToPage(page)}
                    variant={currentEpisodePage === page ? "default" : "outline"}
                    size="sm"
                    className={
                      currentEpisodePage === page
                        ? "bg-amber-500 hover:bg-amber-600"
                        : "border-amber-400"
                    }
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={goToNextPage}
              disabled={currentEpisodePage === totalEpisodePages}
              variant="outline"
              size="sm"
              className="border-amber-400"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Episodes Grid */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 place-self-auto gap-4 w-[90%] mx-auto mt-5">
          {paginatedEpisodes.map((item, index) => (
            <Link
              key={index}
              href={{ pathname: `/watch/${item.episodeId}` }}
              className="self-stretch"
            >
              <Card className="p-2 flex gap-2 items-center w-full h-full hover:shadow-white hover:cursor-pointer">
                <Badge className="text-lg">{item.number}</Badge>
                <div className="grow">
                  <CardTitle className="text-sm">{item.title}</CardTitle>
                  {item.isFiller && (
                    <Badge variant="outline" className="border-red-500 text-xs mt-1">
                      Filler
                    </Badge>
                  )}
                </div>
                <Badge className="bg-gray-400">
                  <ArrowBigRight />
                </Badge>
              </Card>
            </Link>
          ))}
        </div>

        {/* Episode Pagination Controls - Bottom */}
        {totalEpisodePages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 mb-4">
            <Button
              onClick={goToPreviousPage}
              disabled={currentEpisodePage === 1}
              variant="outline"
              size="sm"
              className="border-amber-400"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <span className="text-sm text-gray-400 px-4">
              Page {currentEpisodePage} of {totalEpisodePages}
            </span>

            <Button
              onClick={goToNextPage}
              disabled={currentEpisodePage === totalEpisodePages}
              variant="outline"
              size="sm"
              className="border-amber-400"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Related Animes Section */}
      {relatedAnimes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            Related Animes
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 w-[90%] mx-auto mt-5">
            {relatedAnimes.map((item, index) => (
              <Link key={index} href={`/anime/${item.id}/info`}>
                <Card className="hover:shadow-white duration-300">
                  <CardHeader className="p-0">
                    <Image
                      src={item.poster}
                      width="0"
                      height="0"
                      alt={item.name}
                      sizes="100vw"
                      style={{ width: "100%", height: "350px" }}
                      className="rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm line-clamp-2">{item.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{item.jname}</CardDescription>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Badge variant="outline" className="border-green-500 text-xs">
                        {item.type}
                      </Badge>
                      {item.episodes.sub && item.episodes.sub > 0 && (
                        <Badge variant="outline" className="border-purple-500 text-xs">
                          Sub: {item.episodes.sub}
                        </Badge>
                      )}
                      {item.episodes.dub && item.episodes.dub > 0 && (
                        <Badge variant="outline" className="border-cyan-500 text-xs">
                          Dub: {item.episodes.dub}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Animes Section */}
      {recommendedAnimes.length > 0 && (
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            Recommended Animes
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 w-[90%] mx-auto mt-5">
            {recommendedAnimes.slice(0, 10).map((item, index) => (
              <Link key={index} href={`/anime/${item.id}/info`}>
                <Card className="hover:shadow-white duration-300">
                  <CardHeader className="p-0 relative">
                    {item.rating && (
                      <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                        {item.rating}
                      </Badge>
                    )}
                    <Image
                      src={item.poster}
                      width="0"
                      height="0"
                      alt={item.name}
                      sizes="100vw"
                      style={{ width: "100%", height: "350px" }}
                      className="rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm line-clamp-2">{item.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{item.jname}</CardDescription>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Badge variant="outline" className="border-pink-500 text-xs">
                        {item.type}
                      </Badge>
                      {item.duration && (
                        <Badge variant="outline" className="border-orange-500 text-xs">
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Most Popular Animes Section */}
      {mostPopularAnimes.length > 0 && (
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-semibold text-amber-400 p-3">
            Most Popular Animes
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 w-[90%] mx-auto mt-5">
            {mostPopularAnimes.map((item, index) => (
              <Link key={index} href={`/anime/${item.id}/info`}>
                <Card className="hover:shadow-white duration-300">
                  <CardHeader className="p-0">
                    <Image
                      src={item.poster}
                      width="0"
                      height="0"
                      alt={item.name}
                      sizes="100vw"
                      style={{ width: "100%", height: "350px" }}
                      className="rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm line-clamp-2">{item.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{item.jname}</CardDescription>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Badge variant="outline" className="border-yellow-500 text-xs">
                        {item.type}
                      </Badge>
                      {item.episodes.sub > 0 && (
                        <Badge variant="outline" className="border-purple-500 text-xs">
                          Sub: {item.episodes.sub}
                        </Badge>
                      )}
                      {item.episodes.dub > 0 && (
                        <Badge variant="outline" className="border-cyan-500 text-xs">
                          Dub: {item.episodes.dub}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeInfo;
