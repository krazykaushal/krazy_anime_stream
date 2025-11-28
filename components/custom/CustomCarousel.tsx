import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  IAnimeHomeInfo,
  IgeneralAnimeInfo,
  latestEpisodeAnime,
  latestCompletedAnime,
  listAnimeType,
  mostFavoriteAnime,
  mostPopularAnime,
  spotlightAnime,
  topAiringAnime,
  topUpcomingAnime,
  trendingAnime,
} from "@/lib/types/home";
import Image from "next/image";
import { ReactElement } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CustomCarousel = (props: {
  animesInfo: IAnimeHomeInfo;
  animeListType: listAnimeType;
}) => {
  const { animesInfo, animeListType } = props;
  return (
    <div className="flex justify-center w-full">
      <Carousel className="w-[70%] md:w-[90%]">
        <CarouselContent>
          {animeListType == "spotlight" &&
            spotlightContent(animesInfo.spotlightAnimes)}
          {animeListType == "trending" &&
            trendingContent(animesInfo.trendingAnimes)}
          {animeListType == "latestEpisode" &&
            latestEpisodeContent(animesInfo.latestEpisodeAnimes)}
          {animeListType == "topUpcoming" &&
            topUpcomingContent(animesInfo.topUpcomingAnimes)}
          {animeListType == "top10Today" &&
            top10Content(animesInfo.top10Animes.today)}
          {animeListType == "top10Week" &&
            top10Content(animesInfo.top10Animes.week)}
          {animeListType == "top10Month" &&
            top10Content(animesInfo.top10Animes.month)}
          {animeListType == "topAiring" &&
            topAiringContent(animesInfo.topAiringAnimes)}
          {animeListType == "mostPopular" &&
            mostPopularContent(animesInfo.mostPopularAnimes)}
          {animeListType == "mostFavorite" &&
            mostFavoriteContent(animesInfo.mostFavoriteAnimes)}
          {animeListType == "latestCompleted" &&
            latestCompletedContent(animesInfo.latestCompletedAnimes)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const spotlightContent = (spotlightData: spotlightAnime[]) => {
  return (
    <>
      {spotlightData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            {/* <span className="fixed text-[#ffdd95] z-10 rounded-full border px-3 bg-slate-900 ml-2 mt-2 border-lime-100 text-2xl">
              {item.rank}
            </span> */}
            <Badge
              variant="secondary"
              className="border-amber-300  text-amber-300 z-10 text-xl px-3 absolute top-0 left-0 m-2"
            >
              {item.rank}
            </Badge>
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "200px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const trendingContent = (trendingData: trendingAnime[]) => {
  return (
    <>
      {trendingData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <span className="fixed text-[#ffdd95] z-10 rounded-full border px-3 bg-slate-900 ml-2 mt-2 border-lime-100 text-2xl">
              {item.rank}
            </span>
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const latestEpisodeContent = (latestEpisodeData: latestEpisodeAnime[]) => {
  return (
    <>
      {latestEpisodeData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const topUpcomingContent = (topUpcomingData: topUpcomingAnime[]) => {
  return (
    <>
      {topUpcomingData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.rating && (
                <Badge variant="outline" className="border-red-500 mr-1">
                  {item.rating}
                </Badge>
              )}
              {item.type && (
                <Badge variant="outline" className="border-blue-500">
                  {item.type}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const top10Content = (top10Data: IgeneralAnimeInfo[]) => {
  return (
    <>
      {top10Data.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Badge
              variant="secondary"
              className="border-amber-300 text-amber-300 z-10 text-xl px-3 absolute top-0 left-0 m-2"
            >
              {item.rank}
            </Badge>
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const topAiringContent = (topAiringData: topAiringAnime[]) => {
  return (
    <>
      {topAiringData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.type && (
                <Badge variant="outline" className="border-green-500 mr-1">
                  {item.type}
                </Badge>
              )}
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500 ml-1">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const mostPopularContent = (mostPopularData: mostPopularAnime[]) => {
  return (
    <>
      {mostPopularData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.type && (
                <Badge variant="outline" className="border-pink-500 mr-1">
                  {item.type}
                </Badge>
              )}
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500 ml-1">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const mostFavoriteContent = (mostFavoriteData: mostFavoriteAnime[]) => {
  return (
    <>
      {mostFavoriteData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.type && (
                <Badge variant="outline" className="border-yellow-500 mr-1">
                  {item.type}
                </Badge>
              )}
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500 ml-1">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

const latestCompletedContent = (latestCompletedData: latestCompletedAnime[]) => {
  return (
    <>
      {latestCompletedData.map((item, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
          <Link href={`anime/${item.id}/info`} className="group relative">
            <Card
              className="hover:shadow-white duration-300 hover:blur-sm relative"
              key={index}
            >
              <CardHeader>
                <Image
                  src={item.poster}
                  width="0"
                  height="0"
                  alt={item.id}
                  sizes="100vh"
                  style={{ width: "auto", height: "400px" }}
                />
              </CardHeader>
            </Card>
            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center opacity-0 group-hover:opacity-100">
              {item.name}
              <br />
              {item.type && (
                <Badge variant="outline" className="border-teal-500 mr-1">
                  {item.type}
                </Badge>
              )}
              {item.episodes.sub && (
                <Badge variant="outline" className="border-purple-700">
                  {item.episodes.sub > 0 && `Sub : ${item.episodes.sub}`}
                </Badge>
              )}
              {item.episodes.dub && (
                <Badge variant="outline" className="border-cyan-500 ml-1">
                  {item.episodes.dub > 0 && `Dub : ${item.episodes.dub}`}
                </Badge>
              )}
            </span>
          </Link>
        </CarouselItem>
      ))}
    </>
  );
};

export default CustomCarousel;
