import { youtube_v3 } from "@googleapis/youtube";
import { Link } from "@hyoretsu/react-components";
import Image from "next/image";
import { FaShare } from "react-icons/fa";

import api from "@api";

import { GoToPlaylistVideo, Styling } from "./styles";

interface Playlist {
  date?: string | null;
  description: string;
  id?: string | null;
  thumbnail: string;
  title?: string | null;
}

export default async function Acervo() {
  const {
    data: { items },
  } = await api.get<youtube_v3.Schema$PlaylistListResponse>(
    "/youtube?route=playlists&channelId=UCiWvbXdPvthDcEVTKVpfqqQ",
  );

  const playlists = items?.map(({ id, snippet: item }) => ({
    date: item?.publishedAt,
    description: item?.description,
    id,
    thumbnail: item?.thumbnails?.high?.url,
    title: item?.title,
  })) as Playlist[];

  return (
    <Styling>
      {playlists.map(playlist => (
        <section key={playlist.id}>
          <Link href={`/acervo/playlist/${playlist.id}`}>
            <Image src={playlist.thumbnail} alt="" title="Thumbnail" width={360} height={270} />
          </Link>

          <div>
            <div>
              <h1>{playlist.title}</h1>

              <div>
                <p dangerouslySetInnerHTML={{ __html: playlist.description }} />
              </div>
            </div>

            <GoToPlaylistVideo href={`/acervo/playlist/${playlist.id}`}>
              <span>Ir para a playlist</span>

              <FaShare size={20} />
            </GoToPlaylistVideo>
          </div>
        </section>
      ))}
    </Styling>
  );
}
