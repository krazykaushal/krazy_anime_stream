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
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/home`
  );
  console.log(response);
  return response.data;
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
  } = useQuery("homeData", getHomeData);

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
