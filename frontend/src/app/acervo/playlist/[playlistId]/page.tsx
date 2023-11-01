import { GoToPlaylistVideo, Styling } from "@app/acervo/styles";
import { youtube_v3 } from "@googleapis/youtube";
import { Link } from "@hyoretsu/react-components";
import Image from "next/image";
import { FaShare } from "react-icons/fa6";

import api from "@api";

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

export default async function Acervo({ params: { playlistId } }: PlaylistProps) {
  const {
    data: { items },
  } = await api.get<youtube_v3.Schema$PlaylistItemListResponse>(
    `/youtube?route=playlistItems&playlistId=${playlistId}`,
  );

  const videos = items?.map(({ snippet: item }) => ({
    date: item?.publishedAt,
    description: item?.description,
    id: item?.resourceId?.videoId,
    thumbnail: item?.thumbnails?.high?.url,
    title: item?.title,
  })) as Video[];

  return (
    <Styling>
      {videos.map(video => (
        <section key={video.id}>
          <Link href={`/acervo/video/${video.id}`}>
            <Image src={video.thumbnail} alt="" title="Thumbnail" width={360} height={270} />
          </Link>

          <div>
            <div>
              <h1>{video.title}</h1>

              <div>
                <p dangerouslySetInnerHTML={{ __html: video.description }} />
              </div>
            </div>

            <GoToPlaylistVideo href={`/acervo/video/${video.id}?playlistId=${playlistId}`}>
              <span>Ir para o vídeo</span>

              <FaShare size={20} />
            </GoToPlaylistVideo>
          </div>
        </section>
      ))}
    </Styling>
  );
}
