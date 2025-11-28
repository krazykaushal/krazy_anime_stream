"use client";
import React, { useState } from "react";
import CustomCarousel from "@/components/custom/CustomCarousel";
import { IAnimeHomeInfo } from "@/lib/types/home";
import { Button } from "@/components/ui/button";

const HomeCarousels = (props: { homeData: IAnimeHomeInfo }) => {
  const { homeData } = props;
  const [top10Tab, setTop10Tab] = useState<"today" | "week" | "month">("today");

  return (
    <>
      {/* Spotlight Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Spotlight Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="spotlight" />
      </div>

      {/* Trending Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Trending Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="trending" />
      </div>

      {/* Latest Episodes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Latest Episodes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="latestEpisode" />
      </div>

      {/* Top Upcoming Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Top Upcoming Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="topUpcoming" />
      </div>

      {/* Top 10 Animes with Tabs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mt-4 ml-5 p-3">
          <h2 className="text-4xl font-semibold text-amber-400">
            Top 10 Animes
          </h2>
          <div className="flex gap-2 mr-8">
            <Button
              variant={top10Tab === "today" ? "default" : "outline"}
              onClick={() => setTop10Tab("today")}
              className={top10Tab === "today" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              Today
            </Button>
            <Button
              variant={top10Tab === "week" ? "default" : "outline"}
              onClick={() => setTop10Tab("week")}
              className={top10Tab === "week" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              This Week
            </Button>
            <Button
              variant={top10Tab === "month" ? "default" : "outline"}
              onClick={() => setTop10Tab("month")}
              className={top10Tab === "month" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              This Month
            </Button>
          </div>
        </div>
        {top10Tab === "today" && (
          <CustomCarousel animesInfo={homeData} animeListType="top10Today" />
        )}
        {top10Tab === "week" && (
          <CustomCarousel animesInfo={homeData} animeListType="top10Week" />
        )}
        {top10Tab === "month" && (
          <CustomCarousel animesInfo={homeData} animeListType="top10Month" />
        )}
      </div>

      {/* Top Airing Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Top Airing Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="topAiring" />
      </div>

      {/* Most Popular Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Most Popular Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="mostPopular" />
      </div>

      {/* Most Favorite Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Most Favorite Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="mostFavorite" />
      </div>

      {/* Latest Completed Animes */}
      <div className="mb-10">
        <h2 className="text-4xl font-semibold text-left mt-4 ml-5 p-3 text-amber-400">
          Latest Completed Animes
        </h2>
        <CustomCarousel animesInfo={homeData} animeListType="latestCompleted" />
      </div>
    </>
  );
};

export default HomeCarousels;
