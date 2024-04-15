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

export default function Home() {
  const [search, setSearch] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSearch(value);
  };
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(search)
    router.push(`/anime/${search}`);
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-96">
        <form onSubmit={handleSubmit} className="w-[60%] md:w-[40%] ">
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
      <div className="grid grid-cols-1 place-content-stretch ">
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
    </>
  );
}
