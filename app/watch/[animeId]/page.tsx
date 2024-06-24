"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import ReactPlayer from "react-player";

interface ISourceStream {
  url: string;
  type: string;
}
interface ISubtitleArray {
  file: string;
  label: string;
  kind: string;
  default: boolean;
}

interface IStream {
  anilistID: number;
  malID: number;
  sources: ISourceStream[];
  tracks: ISubtitleArray[];
  intro: { start: number; end: number };
  outro: { start: number; end: number };
}

const getStreamingInfo = async (id: string): Promise<IStream> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_ANIME_API}/anime/episode-srcs?id=${id}`
  );
  console.log(response);
  return response.data;
};

const watchAnime = ({ params }: { params: { animeId: string } }) => {
  const {
    data: streamData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["watchAnime", params.animeId],
    queryFn: () => getStreamingInfo(params.animeId),
    refetchOnWindowFocus: false,
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
    <>
      <div className="flex justify-center mt-10">
        <ReactPlayer
          url={streamData!.sources[0].url}
          controls
          width="80%"
          height="auto"
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
              tracks: streamData?.tracks
                .filter((sub) => sub.kind === "captions")
                .map((sub, index) => ({
                  kind: "subtitles",
                  label: sub.label,
                  src: sub.file,
                  srcLang: sub.label,
                  default: sub.default,
                })),
            },
          }}
        />
      </div>
    </>
  );
};

export default watchAnime;
