"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { any } from "zod";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import CustomPagination from "@/components/custom/CustomPagination";
import { useSearchParams } from "next/navigation";

interface IAnimeList {
  duration: string;
  episodes: {sub: number, dub: number};
  id: string;
  name: string;
  poster: string;
  japaneseTitle: string;
  rating: string;
  title: string;
  type: string;
  url: string;
}

interface IAnimeSearchResult {
  currentPage: number;
  hasNextPage: boolean;
  animes: IAnimeList[];
  totalPages: number;
}

const getAnimeData = async (
  name: string,
  page: number = 1
): Promise<IAnimeSearchResult> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/search?q=${name}&page=${page}`
  );
  return response.data;
};

const AnimePage = ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page: number };
}) => {
  const {
    data: animeCards,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["searchAnime", params.name, searchParams],
    queryFn: () => getAnimeData(params.name, searchParams.page),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex gap-4 flex-wrap justify-center mt-8">
        {Array.from(Array(9).keys()).map((index) => (
          <div className="flex flex-col space-y-3 w-96" key={index}>
            <Skeleton className="h-96 w-96 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div> Locha hua hai, sudharo usko thoda </div>;
  }
  console.log(animeCards);
  return (
    <div className="max-w-500">
      <h3 className="text-center text-4xl font-semibold mt-4">
        Anime Result for Search Query : {params.name.replaceAll("%20", " ")}
      </h3>

      <div className="flex gap-4 flex-wrap justify-center mt-4">
        {animeCards?.animes?.map((item: IAnimeList, index: number) => (
          <Card className="w-96 hover:shadow-white duration-300" key={index}>
            <CardHeader className="relative">
              <span className="absolute mt-3 ml-2">
                {item.rating && (
                  <Badge variant="destructive" className="bg-red-500 text-sm">
                    {item.rating}
                  </Badge>
                )}
              </span>
              <Image
                src={item.poster}
                width="0"
                height="0"
                alt={item.id}
                sizes="100vw"
                style={{ width: "auto", height: "500px" }}
              />
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge variant="outline" className="border-purple-700">
                {item.type}
              </Badge>
              {/* {item.episodes > 0 && (
                <Badge variant="secondary">Episodes : {item.episodes}</Badge>
              )} */}
              {item.episodes.dub > 0 && (
                <Badge variant="outline" className="border-cyan-500">
                  Dub : {item.episodes.dub}
                </Badge>
              )}
              {item.episodes.sub > 0 && (
                <Badge variant="outline" className="border-green-600">
                  Sub : {item.episodes.sub}
                </Badge>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              {/* <Link href={item.url} target="blank">
                <Button>HiAnimeLink</Button>
              </Link> */}
              <Link href={{ pathname: `${item.id}/info` }}>
                <Button>Info</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {animeCards!.totalPages > 1 && (
        <CustomPagination
          totalPages={animeCards!.totalPages}
          pageNumber={searchParams.page || 1}
        />
      )}
    </div>
  );
};

export default AnimePage;
