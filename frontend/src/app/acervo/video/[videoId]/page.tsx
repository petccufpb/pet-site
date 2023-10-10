"use client";
import Window from "@app/acervo/components/Window";
import MemberPhoto from "@app/time/components/MemberElement/components/MemberPhoto";
import { youtube_v3 } from "@googleapis/youtube";
import { Link } from "@hyoretsu/react-components";
import { Member } from "backend";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";

import api from "@api";

import defaultTheme from "@styles/theme/default";

import Title from "../../components/Title";
import { Video, getVideosFromPlaylist } from "../../playlist/[playlistId]/page";
import { Comment, Comments, Content, Description, Makers, VideoComments, Videos } from "./styles";

const makers: Member[] = [
  {
    id: "711b683e-e4af-4d8d-b277-12973ec280a1",
    name: "Aran Leite de Gusmão",
    about: null,
    photoUrl:
      "https://lh3.googleusercontent.com/drive-viewer/AITFw-zR8e8F-xjnHo2cZ8fK3SrnbuHLJSIIa4t3uBe4v6SAvVl6FormLHSPREh1R3AuJPGhePEDWY5cdkAq6luxS1AbQkiJyA=s2560",
    type: null,
    isActive: true,
    createdAt: new Date("2023-04-07T23:41:47.876Z"),
    updatedAt: new Date("2023-04-07T23:41:47.876Z"),
    contactInfo: [
      {
        id: "39d709f7-ebbb-46d3-954a-d75e9325ca0e",
        name: "Email",
        snsId: "hyoretsu@gmail.com",
        memberId: "711b683e-e4af-4d8d-b277-12973ec280a1",
        createdAt: new Date("2023-04-08T02:41:47.876Z"),
        updatedAt: new Date("2023-04-08T02:41:47.876Z"),
      },
      {
        id: "52d9c23c-d061-431a-8665-aa80d46bfa79",
        name: "GitHub",
        snsId: "hyoretsu",
        memberId: "711b683e-e4af-4d8d-b277-12973ec280a1",
        createdAt: new Date("2023-04-08T02:41:47.876Z"),
        updatedAt: new Date("2023-04-08T02:41:47.876Z"),
      },
      {
        id: "907706f7-b26a-46ef-ad00-6efb2cab2fd7",
        name: "Instagram",
        snsId: "hyoretsu",
        memberId: "711b683e-e4af-4d8d-b277-12973ec280a1",
        createdAt: new Date("2023-04-08T02:41:47.876Z"),
        updatedAt: new Date("2023-04-08T02:41:47.876Z"),
      },
    ],
  },
  {
    id: "c73daaea-6d19-4595-94ff-7ad687832942",
    name: "Vitória Cristhyna dos Santos Camelo",
    about: null,
    photoUrl:
      "https://lh3.googleusercontent.com/drive-viewer/AITFw-x1Wiv1HnOqnWY00Ctj-CPyHzW6_VqzxkAye0X1KWwTRlWZQAJoaEBNEVwFK4o5SrRnDjBH-XRaB5r-KcrGIW9KRhimFg=s1600",
    type: null,
    isActive: true,
    createdAt: new Date("2023-09-12T20:19:39.856Z"),
    updatedAt: new Date("2023-09-12T20:19:39.856Z"),
    contactInfo: [],
  },
  {
    id: "fe8862ab-ebbc-4c8b-a2ef-d18d45abf5fb",
    name: "Breno Henrique de Souza Lima",
    about: null,
    photoUrl:
      "https://lh3.googleusercontent.com/drive-viewer/AITFw-xVW77tpdRgacI_baUEE8Yf_9JVlu8hTCRzOXmYqQs2FyCpF5eORGKQOewrHvVOvM61jwFmO8Jd8n4wXJemO56bRBqT=s1600",
    type: null,
    isActive: true,
    createdAt: new Date("2023-04-08T02:41:47.876Z"),
    updatedAt: new Date("2023-04-08T02:41:47.876Z"),
    contactInfo: [
      {
        id: "f6cd86aa-7862-473b-ad6f-17da75a73ff6",
        name: "Instagram",
        snsId: "breno083_",
        memberId: "fe8862ab-ebbc-4c8b-a2ef-d18d45abf5fb",
        createdAt: new Date("2023-04-08T02:41:47.876Z"),
        updatedAt: new Date("2023-04-08T02:41:47.876Z"),
      },
    ],
  },
  {
    id: "6c2fc27d-61a0-4f5a-b0b1-6441195c0658",
    name: "Samantha Dantas Medeiros",
    about: null,
    photoUrl:
      "https://lh3.googleusercontent.com/drive-viewer/AITFw-yFL0oxDtXLbdiYFETydAMe0gv39gP__G0RuDAbl1y8IQdQUlD0dBcBMNlqyKSnoZ8uC_k37biHe81aIvUoyH5nflXZ=s1600",
    type: null,
    isActive: true,
    createdAt: new Date("2023-09-12T20:18:47.018Z"),
    updatedAt: new Date("2023-09-12T20:18:47.018Z"),
    contactInfo: [],
  },
];

interface Comment {
  id: string;
  date: Date;
  photo: string;
  text: string;
  user: string;
  userUrl: string;
}

interface VideoProps {
  params: {
    videoId: string;
  };
  searchParams: {
    playlistId: string;
  };
}

export default function Acervo({ params: { videoId }, searchParams: { playlistId } }: VideoProps) {
  const [video, setVideo] = useState<Video>();
  const [videos, setVideos] = useState<Video[]>([]);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const videoIndex = videos.indexOf(videos.find(video => video.id === videoId) as Video);

  useEffect(() => {
    const execute = async () => {
      const {
        data: { items },
      } = await api.get<youtube_v3.Schema$CommentThreadListResponse>(
        `/youtube?route=commentThreads&videoId=${videoId}`,
      );

      setComments(
        items
          ?.filter(({ snippet }) => snippet && snippet.topLevelComment)
          .map(
            ({
              snippet: {
                // @ts-ignore
                topLevelComment: { id, ...snippet },
              },
            }) => {
              return {
                id,
                date: new Date(snippet.publishedAt),
                photo: snippet.authorProfileImageUrl,
                text: snippet.textDisplay,
                user: snippet.authorDisplayName,
                userUrl: snippet.authorChannelUrl,
              } as Comment;
            },
          ) || [],
      );

      await getVideosFromPlaylist(playlistId, setVideos);
    };

    execute();
  }, [playlistId, videoId]);

  useEffect(() => {
    setVideo(videos.find(video => video.id === videoId));
  }, [videoId, videos]);

  return (
    <div style={{ margin: "4vh 0" }}>
      <Title />
      <Content>
        <VideoComments>
          <div>
            <Window>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Window>

            <h2>{video?.title}</h2>
          </div>
          <aside>
            <Makers>
              <p>Participantes</p>
              <Window>
                {makers.map(maker => (
                  <MemberPhoto
                    key={maker.id}
                    colorTheme={
                      maker.isActive
                        ? {
                            color: defaultTheme.colors["base-green"],
                            gradient: defaultTheme.colors["gradient-green"],
                          }
                        : {
                            color: defaultTheme.colors["second-red"],
                            gradient: defaultTheme.colors["gradient-red"],
                          }
                    }
                    size={50}
                    name={maker.name}
                    src={maker.photoUrl as string}
                  />
                ))}
              </Window>
            </Makers>
            <Comments>
              <p>Comentários</p>
              <Window>
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();

                      // @ts-ignore
                      const { value } = e.target.firstElementChild;

                      setComments(old => [
                        {
                          date: new Date(),
                          id: value as string,
                          photo: "",
                          text: value,
                          user: "Você",
                          userUrl: "",
                        },
                        ...old,
                      ]);
                      setComment("");
                    }}
                  >
                    <input
                      placeholder="Digite seu comentário"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <button>
                      <IoSend />
                    </button>
                  </form>

                  <main>
                    {comments.map(comment => {
                      let differenceInDays = 0,
                        differenceInHours = 0,
                        differenceInMinutes = 0;

                      differenceInDays =
                        (new Date().getTime() - comment.date.getTime()) / (1 * 24 * 60 * 60 * 1000);

                      if (differenceInDays < 1) {
                        differenceInHours = differenceInDays * 24;

                        if (differenceInHours < 1) {
                          differenceInMinutes = differenceInHours * 60;
                        }
                      }

                      return (
                        <Comment key={comment.id}>
                          <Link href={comment.userUrl}>
                            {/* @ts-ignore */}
                            <Image
                              src={comment.photo || "/images/no-profile-picture.svg"}
                              title={comment.user}
                              width={30}
                              height={30}
                            />
                          </Link>

                          <p>{comment.text}</p>

                          <span>
                            {Math.trunc(differenceInDays) ||
                              Math.trunc(differenceInHours) ||
                              Math.trunc(differenceInMinutes)}
                            {differenceInDays >= 1 ? "d" : differenceInHours >= 1 ? "h" : "m"}
                          </span>
                        </Comment>
                      );
                    })}
                  </main>
                </div>
              </Window>
            </Comments>
          </aside>
        </VideoComments>

        <Description>
          <h5>Descrição:</h5>

          <Window>
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: video?.description.replaceAll("\n", "<br/>") || "",
                }}
              />
            </div>
          </Window>
        </Description>

        <Videos>
          {videos.slice(videoIndex + 1, videoIndex + 6).map(video => (
            <div key={video.id}>
              <Link href={`/acervo/video/${video.id}?playlistId=${playlistId}`}>
                <Image src={video.thumbnail} alt="" width={480} height={360} />
              </Link>

              <h5>{video.title}</h5>
            </div>
          ))}
        </Videos>
      </Content>
    </div>
  );
}
