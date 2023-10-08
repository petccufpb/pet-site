"use client";
import { youtube_v3 } from "@googleapis/youtube";
import { Link } from "@hyoretsu/react-components";
import Image from "next/image";
import { useEffect, useState } from "react";

import api from "@api";

import { Styling } from "./styles";

interface Playlist {
  date?: string | null;
  description: string;
  id?: string | null;
  thumbnail: string;
  title?: string | null;
}

export default function Acervo() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const execute = async () => {
      const {
        data: { items },
      } = await api.get<youtube_v3.Schema$PlaylistListResponse>(
        "/youtube?route=playlists&channelId=UCiWvbXdPvthDcEVTKVpfqqQ",
      );

      setPlaylists(
        items?.map(({ id, snippet: item }) => ({
          date: item?.publishedAt,
          description: item?.description || "",
          id,
          thumbnail: item?.thumbnails?.high?.url || "",
          title: item?.title,
        })) || [],
      );
    };

    execute();
  }, []);

  return (
    <Styling>
      {playlists.map(playlist => (
        <div key={playlist.id}>
          <Link href={`/acervo/playlist/${playlist.id}`}>
            <Image src={playlist.thumbnail} alt="" title={playlist.description} width={480} height={360} />
          </Link>

          <h1>{playlist.title}</h1>
        </div>
      ))}
    </Styling>
  );
}
