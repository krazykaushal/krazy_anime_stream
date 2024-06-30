"use client";

import React from "react";
import { useQuery, useQueries } from "react-query";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import { IAnimeInfo,ISeasonInfo,IEpisodeObj } from "@/lib/types/home";

interface IAnimeResponse {
  anime: IAnimeInfo;
  seasons: ISeasonInfo[];
}

const getAnimeData = async (id: string): Promise<IAnimeResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/info?id=${id}`
  );
  console.log(response);
  return response.data;
};

const getAnimeEpisodesData = async (id: string): Promise<IEpisodeObj> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/episodes/${id}`
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
  return (
    <div>
      <div className="grid grid-rows-2 lg:grid-cols-7 md:grid-rows-1 gap-4 p-8 h-full w-[90%] mx-auto mt-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md  bg-opacity-10 ">
        <div className="flex justify-center lg:col-span-2">
          <Image
            width={300}
            height={400}
            alt="loading"
            src={animeInfo!.anime.info.poster}
            className="rounded-lg"
          />
        </div>
        <div className="lg:col-span-3">
          <div className="flex gap-2">
            {animeInfo?.anime.info.stats.rating && (
              <Badge variant={"outline"} className="border-amber-300">
                {animeInfo?.anime.info.stats.rating}
              </Badge>
            )}
            {animeInfo?.anime.info.stats.type && (
              <Badge variant={"outline"} className="border-slate-400">
                {animeInfo?.anime.info.stats.type}
              </Badge>
            )}
            {(animeInfo?.anime.info.stats.episodes.sub ?? 0) > 0 && (
              <Badge variant={"outline"} className="border-purple-700">
                {animeInfo?.anime.info.stats.episodes.sub
                  ? `Sub: ${animeInfo.anime.info.stats.episodes.sub}`
                  : ""}
              </Badge>
            )}
            {(animeInfo?.anime.info.stats.episodes.dub ?? 0) > 0 && (
              <Badge variant={"outline"} className="border-cyan-500">
                {animeInfo?.anime.info.stats.episodes.dub
                  ? `Dub: ${animeInfo.anime.info.stats.episodes.dub}`
                  : ""}
              </Badge>
            )}
            {animeInfo?.anime.info.stats.duration && (
              <Badge variant={"outline"} className="border-green-500">
                {animeInfo?.anime.info.stats.duration}
              </Badge>
            )}
          </div>
          <h2 className="text-3xl font-semibold py-4">
            {animeInfo?.anime.info.name}
          </h2>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-white">Description:</span>{" "}
            {animeInfo?.anime.info.description}
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="grid row-cols-1 md:grid-cols-3 lg:flex lg:flex-col gap-2">
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                More Info
              </h3>
              {animeInfo?.anime.moreInfo.japanese && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Japanese:</span>{" "}
                  {animeInfo?.anime.moreInfo.japanese}
                </p>
              )}
              {animeInfo?.anime.moreInfo.synonyms && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Synonyms:</span>{" "}
                  {animeInfo?.anime.moreInfo.synonyms}
                </p>
              )}
              {animeInfo?.anime.moreInfo.aired && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Aired:</span>{" "}
                  {animeInfo?.anime.moreInfo.aired}
                </p>
              )}
              {animeInfo?.anime.moreInfo.premiered && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Premiered:</span>{" "}
                  {animeInfo?.anime.moreInfo.premiered}
                </p>
              )}
              {animeInfo?.anime.moreInfo.duration && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Duration:</span>{" "}
                  {animeInfo?.anime.moreInfo.duration}
                </p>
              )}
              {animeInfo?.anime.moreInfo.status && (
                <p className="text-sm">
                  <span className="font-semibold text-white">Status:</span>{" "}
                  {animeInfo?.anime.moreInfo.status}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                Genre
              </h3>
              {animeInfo?.anime.moreInfo.genres &&
                animeInfo?.anime.moreInfo.genres.map((genre, index) => (
                  <Badge
                    key={index}
                    variant={"outline"}
                    className="border-teal-500"
                  >
                    {genre}
                  </Badge>
                ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-1">
                Producers & Studios
              </h3>
              <p className="my-2">
                <span className="font-semibold text-white">Producers: </span>
                {animeInfo?.anime.moreInfo.producers &&
                  animeInfo?.anime.moreInfo.producers.map((producer, index) => (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="border-yellow-500"
                    >
                      {producer}
                    </Badge>
                  ))}
              </p>
              {animeInfo?.anime.moreInfo.studios && (
                <p className="text-sm mt-1">
                  <span className="font-semibold text-white">Studios:</span>{" "}
                  {animeInfo?.anime.moreInfo.studios}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {(animeInfo?.seasons.length ?? 0) > 0 && (
          <>
            <h2 className="text-3xl font-semibold text-amber-400 mt-5 p-3">
              More Seasons
            </h2>
            <div className="grid lg:grid-cols-6 sm:grid-cols-3 place-self-auto gap-4 w-[90%] mx-auto mt-5">
              {animeInfo?.seasons.map((item, index) => (
                <Link
                  key={index}
                  href={{ pathname: `/anime/${item.id}/info` }}
                  className={`${
                    item.isCurrent ? "border border-amber-500 rounded-md" : ""
                  }`}
                >
                  <Card className="p-2 flex gap-2 items-center justify-center hover:shadow-white hover:cursor-pointer relative">
                    <Image
                      src={item.poster}
                      width="0"
                      height="0"
                      alt={item.id}
                      sizes="100vw"
                      style={{ width: "100vw", height: "100px" }}
                      className="blur-md object-cover"
                    />
                    <CardTitle className="absolute text-center ">
                      {item.title}
                    </CardTitle>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <h2 className="text-3xl font-semibold text-amber-400 mt-5 p-3">
        Episodes
      </h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 place-self-auto gap-4 w-[90%] mx-auto mt-5">
        {animeEpisodes?.episodes.map((item, index) => (
          <Link
            key={index}
            href={{ pathname: `/watch/${item.episodeId}` }}
            className="self-stretch "
          >
            <Card className="p-2 flex gap-2 items-center w-full h-full hover:shadow-white hover:cursor-pointer">
              <Badge className="text-lg">{item.number}</Badge>
              <CardTitle className="grow">{item.title}</CardTitle>
              <Badge className="bg-gray-400 ">
                <ArrowBigRight />
              </Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeInfo;
