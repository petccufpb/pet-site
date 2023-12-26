"use client";

import { BackgroundContainer, GlowEllipse, SVGBackground } from "@app/components/Background/styles";
import { Button, Flex } from "@app/styles";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

import { Post } from "./components/Post";
import { Profile } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";
import { Spinner } from "./components/Spinner";
import { ArticleContainer, PostsListContainer } from "./styles";

export const username = "ufpbpetcc";
export const repoName = "articles";

export interface IPost {
  title: string;
  body: string;
  created_at: string;
  number: number;
  html_url: string;
  comments: number;
  user: {
    login: string;
  };
}

export const api = axios.create({
  baseURL: "https://api.github.com",
});

export default function Artigos() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = useCallback(async (query = "") => {
    try {
      setIsLoading(true);
      const response = await api.get(`/search/issues?q=${query}%20repo:${username}/${repoName}`);
      setPosts(response.data.items);
    } finally {
      // caso a internet esteja processando muito rápido os pacotes de deploy, ficará inviável a vizu
      // do spinner, logo para vê à animação é só comentar a linha abaixo
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <BackgroundContainer>
        <SVGBackground xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gradient">
              <stop offset="0%" stopColor="#0072ed" />
              <stop offset="90%" stopColor="#0072ed20" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
          </defs>
          <g fill="url(#gradient)">
            <GlowEllipse fill="url(#gradient)" cx="0" cy="0" rx="650" ry="650" />
            <GlowEllipse opacity="0.9" fill="url(#gradient)" cx="95%" cy="600px" rx="650" ry="650" />
            <GlowEllipse fill="url(#gradient)" cx="60%" cy="100%" rx="900" ry="700" />
          </g>
        </SVGBackground>
      </BackgroundContainer>
      <ArticleContainer>
        <Profile />
        <SearchInput postsLenght={posts.length} getPosts={getPosts} />
        {isLoading ? (
          <PostsListContainer>
            {/* empty 9 posts */}
            {[...Array(9)].map((_, index) => (
              <Post key={index} />
            ))}
          </PostsListContainer>
        ) : (
          <>
            <PostsListContainer>
              {posts.slice((currentPage - 1) * 9, currentPage * 9).map(post => (
                <Post key={post.number} post={post} />
              ))}
            </PostsListContainer>
            <Flex justify="space-between">
              {currentPage > 1 && (
                <Button
                  flex
                  alt
                  maxw="300px"
                  gapanim
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <RiArrowLeftLine /> Artigos Anteriores
                </Button>
              )}
              {currentPage < Math.ceil(posts.length / 9) && (
                <Button
                  flex
                  alt
                  maxw="300px"
                  ml="auto"
                  gapanim
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    if (currentPage >= Math.ceil(posts.length / 9)) {
                      setCurrentPage(1);
                    }
                  }}
                >
                  Próximos Artigos
                  <RiArrowRightLine />
                </Button>
              )}
            </Flex>
          </>
        )}
      </ArticleContainer>
    </>
  );
}
