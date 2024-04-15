"use client";

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
interface IEpisodeObj {
  id: string;
  number: number;
  title: string;
  isFiller: boolean;
  url: string;
}
interface IAnimeInfo {
  id: string;
  malID: number;
  alId: number;
  title: string;
  image: string;
  description: string;
  type: string;
  url: string;
  subOrDub: string;
  totalEpisodes: number;
  episodes: IEpisodeObj[];
  hasDub: boolean;
  hasSub: boolean;
}

const getAnimeData = async (id: string): Promise<IAnimeInfo> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/zoro/info?id=${id}`
  );
  console.log(response);
  return response.data;
};

const animeInfo = ({ params }: { params: { name: string } }) => {
  const {
    data: animeInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["animeInfo", params.name],
    queryFn: () => getAnimeData(params.name),
  });
  if (isLoading) {
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
            src={animeInfo!.image}
            className="rounded-lg"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="flex gap-2">
            <Badge className="border-amber-300">{animeInfo?.type}</Badge>
            <Badge variant="outline" className="border-cyan-500">
              Episodes : {animeInfo?.totalEpisodes}
            </Badge>
            {animeInfo?.hasDub && (
              <Badge>{animeInfo?.hasDub ? "Dub" : ""}</Badge>
            )}
            {animeInfo?.hasSub && (
              <Badge>{animeInfo?.hasSub ? "Sub" : ""}</Badge>
            )}
          </div>
          <h2 className="text-3xl font-semibold py-4">{animeInfo?.title}</h2>
          <p className="text-gray-500">
            <span className="font-semibold text-white">Description:</span>{" "}
            {animeInfo?.description}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 place-self-auto gap-4 w-[90%] mx-auto mt-10">
        {animeInfo?.episodes.map((item, index) => (
          <Link
            key={index}
            href={{ pathname: `/watch/${item.id}` }}
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
