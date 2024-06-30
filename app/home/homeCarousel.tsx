import React from "react";
import CustomCarousel from "@/components/custom/CustomCarousel";
import { IAnimeHomeInfo } from "@/lib/types/home";

const HomeCarousels = (props: { homeData: IAnimeHomeInfo }) => {
    const { homeData } = props;
  return (
    <>
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Spotlight Animes
        </h2>
        <CustomCarousel animesInfo={homeData!} animeListType="spotlight" />
      </div>
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Trending Animes
        </h2>
        <CustomCarousel animesInfo={homeData!} animeListType="trending" />
      </div>
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Latest Episodes Animes
        </h2>
        <CustomCarousel animesInfo={homeData!} animeListType="latestEpisode" />
      </div>
    </>
  );
};

export default HomeCarousels;
