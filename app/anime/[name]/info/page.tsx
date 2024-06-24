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
interface IEpisodeObj {
  totalEpisodes: number;
  episodes: {
    number: number;
    title: number;
    episodeId: string;
    isFiller: boolean;
  }[];
}

interface IAnimeInfo {
  info: { 
    id: string; 
    anilistId: number; 
    malId: number; 
    name: string; 
    poster: string; 
    description: string; 
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
    aired: string; 
    premiered: string; 
    duration: string; 
    status: string; 
    studios: string; 
    genres: []; 
    producers: [];
  };
}

interface IAnimeResponse {
  anime: IAnimeInfo;
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
}

const animeInfo = ({ params }: { params: { name: string } }) => {
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
  } = useQuery(["animeEpisodes", params.name], () => getAnimeEpisodesData(params.name), {
    enabled: !!animeInfo
  });

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
      <div className="grid grid-rows-2 lg:grid-cols-3 md:grid-rows-1 gap-4 p-8 h-full w-[90%] mx-auto mt-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md  bg-opacity-10 ">
        <div className="flex justify-center">
          <Image
            width={300}
            height={400}
            alt="loading"
            src={animeInfo!.anime.info.poster}
            className="rounded-lg"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="flex gap-2">
            <Badge className="border-amber-300">{animeInfo?.anime.info.stats.type}</Badge>
            <Badge variant="outline" className="border-cyan-500">
              Episodes : {animeInfo?.anime.info.stats.episodes.sub}
            </Badge>
            {(animeInfo?.anime.info.stats.episodes.dub ?? 0) > 0 && (
              <Badge>{animeInfo?.anime.info.stats.episodes.dub ? "Dub" : ""}</Badge>
            )}
            {(animeInfo?.anime.info.stats.episodes.sub ?? 0) > 0 && (
              <Badge>{animeInfo?.anime.info.stats.episodes.sub ? "Sub" : ""}</Badge>)}
          </div>
          <h2 className="text-3xl font-semibold py-4">{animeInfo?.anime.info.name}</h2>
          <p className="text-gray-500">
            <span className="font-semibold text-white">Description:</span>{" "}
            {animeInfo?.anime.info.description}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 place-self-auto gap-4 w-[90%] mx-auto mt-10">
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

export default animeInfo;
