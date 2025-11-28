"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { IAnimeHomeInfo } from "@/lib/types/home";
import CustomCarousel from "@/components/custom/CustomCarousel";
import { Suspense } from "react";
import HomeCarousels from "./homeCarousel";

const getHomeData = async (): Promise<IAnimeHomeInfo> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/home`,
      {
        timeout: 10000, // 10 second timeout
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        throw new Error(
          `Server error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response
        throw new Error(
          "Unable to reach anime server. Please check your internet connection."
        );
      }
    }
    // Unknown error
    throw new Error("Failed to fetch anime data. Please try again later.");
  }
};

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearch(value);
  };
  const {
    data: homeData,
    isLoading,
    error,
    refetch,
  } = useQuery("homeData", getHomeData, {
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="max-w-lg w-full space-y-6 text-center">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Failed to Load Anime Data</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error
              ? error.message
              : "We're having trouble loading the content. Please try again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => refetch()} className="w-full sm:w-auto">
              Retry
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(search)
    router.push(`/anime/${search}`);
  };
  return (
    <>
      <div className="flex justify-around flex-col md:flex-row p-4">
        <div className="flex justify-center items-center min-h-96 md:w-[40%] m-4 ">
          <form onSubmit={handleSubmit} className="w-full">
            <Label htmlFor="searchAnime">Search Anime</Label>
            <Input
              onChange={handleChange}
              type="text"
              placeholder="e.g. Haikyuu"
              id="searchAnime"
              name="search"
              className=""
            />
            <div className="flex justify-center">
              <Button className="my-3 w-[40%] md:w-[30%]">Search</Button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 place-content-stretch md:p-4">
          <div className="flex grow justify-center">
            <Image
              src="/images/three-removebg.png"
              width={500}
              height={500}
              alt="Tanjiro"
              className="rounded-lg"
            ></Image>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeCarousels homeData={homeData!} />
      </Suspense>
    </>
  );
}
