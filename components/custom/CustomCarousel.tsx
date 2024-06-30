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
  latestEpisodeAnime,
  listAnimeType,
  spotlightAnime,
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

export default CustomCarousel;
