"use client";

import { IPost, api, repoName, username } from "@app/artigos/page";
import { useCallback, useEffect, useState } from "react";

import { PostContent } from "./components/PostContent";
import { PostHeader } from "./components/PostHeader";

export default function Post({ params }: { params: { id: number } }) {
  const [postData, setPostData] = useState<IPost>({} as IPost);
  const [isLoading, setIsLoading] = useState(true);

  console.log(params.id);

  const getPostDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/repos/${username}/${repoName}/issues/${params.id}`);
      setPostData(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getPostDetails();
  }, [getPostDetails]);

  return (
    <>
      <PostHeader isLoading={isLoading} postData={postData} />
      {!isLoading && <PostContent content={postData.body} />}
    </>
  );
}
