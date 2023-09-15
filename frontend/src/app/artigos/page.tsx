"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

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

  const getPosts = useCallback(async (query = "") => {
    try {
      setIsLoading(true);
      const response = await api.get(`/search/issues?q=${query}%20repo:${username}/${repoName}`);
      setPosts(response.data.items);
    } finally {
      //caso a internet esteja processando muito rápido os pacotes de deploy, ficará inviável a vizu
      // do spinner, logo para vê à animação é só comentar a linha abaixo
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <ArticleContainer>
      <Profile />
      <SearchInput postsLenght={posts.length} getPosts={getPosts} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PostsListContainer>
            {posts.map(post => (
              <Post key={post.number} post={post} />
            ))}
          </PostsListContainer>
        </>
      )}
    </ArticleContainer>
  );
}
