"use client";
import MemberPhoto from "@app/time/components/MemberElement/components/MemberPhoto";
import { Link } from "@hyoretsu/react-components";
import { Member } from "backend";
import Image from "next/image";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

import defaultTheme from "@styles/theme/default";

import Title from "./components/Title";
import { Comment, Comments, Content, Makers, VideoComments, Window } from "./styles";

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

export default function Acervo() {
  const [comment, setComment] = useState("");

  // List only our account's own videos, way more sustainable
  //   const {
  //     data: { items },
  //   } = await yt.search.list({
  //     auth: gauth,
  //     channelId: "UCiWvbXdPvthDcEVTKVpfqqQ",
  //     order: "date",
  //     part: ["snippet"],
  //     type: ["video"],
  //   });
  //   const videos = items!.map(video => ({
  //     id: video.id?.videoId,
  //     description: video.snippet?.description,
  //     thumbnail: video.snippet?.thumbnails?.default,
  //     title: video.snippet?.title,
  //   }));
  const commentsData = {
    items: [
      {
        kind: "youtube#commentThread",
        etag: "-_hGBSNqXk8rhu1rXzG_ife4T8k",
        id: "Ugz2r7LvR6J3vMiq8dF4AaABAg",
        snippet: {
          channelId: "UCiWvbXdPvthDcEVTKVpfqqQ",
          videoId: "cRwHsz0eKjA",
          topLevelComment: {
            kind: "youtube#comment",
            etag: "nL13CJYIO0xfy-lW0qPTZ-G_WIQ",
            id: "Ugz2r7LvR6J3vMiq8dF4AaABAg",
            snippet: {
              channelId: "UCiWvbXdPvthDcEVTKVpfqqQ",
              videoId: "cRwHsz0eKjA",
              textDisplay: "👏👏",
              textOriginal: "👏👏",
              authorDisplayName: "Caio Rafael Oliveira",
              authorProfileImageUrl:
                "https://yt3.ggpht.com/ytc/APkrFKYs7Qdo6DoX1tX1zECVZJDKtZThU1Oyv44EsSXcy2A=s48-c-k-c0x00ffffff-no-rj",
              authorChannelUrl: "http://www.youtube.com/channel/UClndJHKbG5cjZz2qxbfzrGw",
              authorChannelId: {
                value: "UClndJHKbG5cjZz2qxbfzrGw",
              },
              canRate: true,
              viewerRating: "none",
              likeCount: 0,
              publishedAt: "2023-09-17T05:13:37Z",
              updatedAt: "2023-09-17T05:13:37Z",
            },
          },
          canReply: true,
          totalReplyCount: 0,
          isPublic: true,
        },
      },
    ],
  };
  const comments = commentsData.items.map(
    ({
      id,
      snippet: {
        topLevelComment: { snippet },
      },
    }) => ({
      id,
      date: snippet.publishedAt,
      photo: snippet.authorProfileImageUrl,
      text: snippet.textDisplay,
      user: snippet.authorDisplayName,
      userUrl: snippet.authorChannelUrl,
    }),
  );

  return (
    <div style={{ margin: "4vh 0" }}>
      <Title />
      <Content>
        <VideoComments>
          <div>
            <Window>
              <iframe
                src="https://www.youtube.com/embed/cRwHsz0eKjA"
                // src={`https://www.youtube.com/embed/${videos[0].id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Window>

            <h2>Aula 0 - Introdução à Estrutura de Dados</h2>
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
                  <div>
                    <input
                      placeholder="Digite seu comentário"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <button>
                      <IoSend />
                    </button>
                  </div>

                  <main>
                    {comments.map(comment => {
                      let differenceInDays = 0,
                        differenceInHours = 0,
                        differenceInMinutes = 0;

                      differenceInDays =
                        (new Date().getTime() - new Date(comment.date).getTime()) / (1 * 24 * 60 * 60 * 1000);

                      if (differenceInDays < 1) {
                        differenceInHours = differenceInDays * 24;

                        if (differenceInHours < 1) {
                          differenceInMinutes = differenceInHours * 60;
                        }
                      }

                      return (
                        <>
                          <Comment key={comment.id}>
                            <Link href={comment.userUrl}>
                              {/* @ts-ignore */}
                              <Image
                                src={comment.photo || "/no-profile-picture.svg"}
                                title={comment.user}
                                width={30}
                                height={30}
                              />
                            </Link>

                            <p>
                              adpojqwoeipqwjkepoaskdopawkdopwqkopeoqwpkdepasdoqwjepoqwdnpiasodnpqwenpqwoenqw
                            </p>

                            <span>
                              {Math.trunc(differenceInDays) ||
                                Math.trunc(differenceInHours) ||
                                Math.trunc(differenceInMinutes)}
                              {differenceInDays >= 1 ? "d" : differenceInHours >= 1 ? "h" : "m"}
                            </span>
                          </Comment>
                          <Comment key={comment.id}>
                            <Link href={comment.userUrl}>
                              {/* @ts-ignore */}
                              <Image
                                src={comment.photo || "/no-profile-picture.svg"}
                                title={comment.user}
                                width={30}
                                height={30}
                              />
                            </Link>

                            <p>
                              adpojqwoeipqwjkepoaskdopawkdopwqkopeoqwpkdepasdoqwjepoqwdnpiasodnpqwenpqwoenqw
                            </p>

                            <span>
                              {Math.trunc(differenceInDays) ||
                                Math.trunc(differenceInHours) ||
                                Math.trunc(differenceInMinutes)}
                              {differenceInDays >= 1 ? "d" : differenceInHours >= 1 ? "h" : "m"}
                            </span>
                          </Comment>
                        </>
                      );
                    })}
                  </main>
                </div>
              </Window>
            </Comments>
          </aside>
        </VideoComments>
        <div>
          <h5>Descrição:</h5>

          <Window
            dangerouslySetInnerHTML={{
              // __html: videos[0].description.replaceAll("\n", "<br />")
              __html:
                "Instalação GO:<br /><br />*Linux: https://www.youtube.com/watch?v=nQPdj4Z25Js<br /><br />*Windows: https://www.youtube.com/watch?v=kxD8p-aPYzM<br /><br />*Mac: https://www.youtube.com/watch?v=fPjcp48dpPM<br /><br />Usar GO no VS Code:<br /><br />https://www.youtube.com/watch?v=pvfESSAbbts&t=4s<br /><br />Introdução ao Replit:<br /><br />https://www.youtube.com/watch?v=D4f7_lPwXtE<br /><br />00:00  Introdução<br />00:43 Estrutura do curso<br />2:30 Módulo 0<br />3:52 Módulo 1<br />4:51 Módulo 2<br />6:23 Referências<br />6:56 Instalação do GO<br />7:33 IDE",
            }}
            style={{ padding: "2vh 1vw" }}
          />
        </div>
      </Content>
    </div>
  );
}
