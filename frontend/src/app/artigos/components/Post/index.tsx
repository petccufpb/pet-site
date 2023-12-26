import { randomInt } from "crypto";

import { IPost } from "../../page";
import { PostContainer, PostHider } from "./styles";

interface PostProps {
  post?: IPost;
}

const imageRegex = /\!\[image\]\(.*?\)/g;

function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length; // Count words accurately, handling extra spaces
  const readingTimeMinutes = Math.ceil(words / 250); // Round up to the nearest minute
  return `${readingTimeMinutes} minutos`;
}

export function Post({ post }: PostProps) {
  return post ? (
    <PostContainer href={`/artigos/post/${post.number}`}>
      <div>
        <strong>{post.title}</strong>
        <span>{calculateReadingTime(post.body)}</span>
      </div>
      <p>
        <PostHider />
        {post.body.replace(imageRegex, "")}
      </p>
    </PostContainer>
  ) : (
    <PostContainer />
  );
}
