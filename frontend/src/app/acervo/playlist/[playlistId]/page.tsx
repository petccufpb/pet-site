"use client";
import { youtube_v3 } from "@googleapis/youtube";
import { Link } from "@hyoretsu/react-components";
import Image from "next/image";
import { useEffect, useState } from "react";

import api from "@api";

import { Styling } from "../../styles";

export interface Video {
  date?: string | null;
  description: string;
  id?: string | null;
  thumbnail: string;
  title?: string | null;
}

interface PlaylistProps {
  params: {
    playlistId: string;
  };
}

// @ts-ignore
export const getVideosFromPlaylist = async (playlistId: string, func: (arr: Video[]) => void) => {
  const {
    data: { items },
  } = await api.get<youtube_v3.Schema$PlaylistItemListResponse>(
    `/youtube?route=playlistItems&playlistId=${playlistId}`,
  );

  func(
    items?.map(({ snippet: item }) => ({
      date: item?.publishedAt,
      description: item?.description || "",
      id: item?.resourceId?.videoId,
      thumbnail: item?.thumbnails?.high?.url || "",
      title: item?.title,
    })) || [],
  );
};

export default function Acervo({ params: { playlistId } }: PlaylistProps) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getVideosFromPlaylist(playlistId, setVideos);
  }, [playlistId, setVideos]);

  return (
    <Styling>
      {videos.map(video => (
        <div key={video.id}>
          <Link
            href={`/acervo/video/${video.id}?playlistId=${playlistId}&description=${encodeURI(
              video.description,
            )}`}
          >
            <Image src={video.thumbnail} alt="" width={480} height={360} />
          </Link>

          <h1>{video.title}</h1>
        </div>
      ))}
    </Styling>
  );
}
