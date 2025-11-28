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
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import CustomPagination from "@/components/custom/CustomPagination";
import { IAnimeSearchResult, IAnimeSearchItem } from "@/lib/types/search";

const getAnimeData = async (
  name: string,
  page: number = 1
): Promise<IAnimeSearchResult> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/search?q=${name}&page=${page}`
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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-2xl font-semibold">
          An error occurred while searching. Please try again.
        </div>
      </div>
    );
  }

  console.log(animeCards);

  return (
    <div className="max-w-500">
      <h3 className="text-center text-4xl font-semibold mt-4">
        Anime Result for Search Query : {params.name.replaceAll("%20", " ")}
      </h3>

      <div className="flex gap-4 flex-wrap justify-center mt-4">
        {animeCards?.data?.animes?.length === 0 && (
          <div className="text-center text-2xl font-semibold mt-4">
            No Anime Found. Check the spelling or try another search query.
          </div>
        )}
        {animeCards?.data?.animes?.map((item: IAnimeSearchItem, index: number) => (
          <Card className="w-96 hover:shadow-white duration-300" key={index}>
            <CardHeader className="relative">
              <span className="absolute mt-3 ml-2 z-10">
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
              <CardDescription className="text-xs text-gray-400">
                {item.jname}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="border-purple-700">
                {item.type}
              </Badge>
              {item.duration && (
                <Badge variant="outline" className="border-orange-500">
                  {item.duration}
                </Badge>
              )}
              {item.episodes.sub && item.episodes.sub > 0 && (
                <Badge variant="outline" className="border-green-600">
                  Sub: {item.episodes.sub}
                </Badge>
              )}
              {item.episodes.dub && item.episodes.dub > 0 && (
                <Badge variant="outline" className="border-cyan-500">
                  Dub: {item.episodes.dub}
                </Badge>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Link href={{ pathname: `${item.id}/info` }}>
                <Button>View Info</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {animeCards?.data?.mostPopularAnimes && animeCards.data.mostPopularAnimes.length > 0 && (
        <div className="mt-12 mb-8">
          <h3 className="text-3xl font-semibold text-left ml-5 p-3 text-amber-400">
            Most Popular Animes
          </h3>
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            {animeCards.data.mostPopularAnimes.map((item: IAnimeSearchItem, index: number) => (
              <Card className="w-96 hover:shadow-white duration-300" key={index}>
                <CardHeader className="relative">
                  <span className="absolute mt-3 ml-2 z-10">
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
                  <CardDescription className="text-xs text-gray-400">
                    {item.jname}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="border-pink-500">
                    {item.type}
                  </Badge>
                  {item.episodes.sub && item.episodes.sub > 0 && (
                    <Badge variant="outline" className="border-green-600">
                      Sub: {item.episodes.sub}
                    </Badge>
                  )}
                  {item.episodes.dub && item.episodes.dub > 0 && (
                    <Badge variant="outline" className="border-cyan-500">
                      Dub: {item.episodes.dub}
                    </Badge>
                  )}
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Link href={{ pathname: `/anime/${item.id}/info` }}>
                    <Button>View Info</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {animeCards?.data?.totalPages && animeCards.data.totalPages > 1 && (
        <CustomPagination
          totalPages={animeCards.data.totalPages}
          pageNumber={searchParams.page || 1}
        />
      )}
    </div>
  );
};

export default AnimePage;
