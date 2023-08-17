import { randomInt } from "crypto";

import { IPost } from "../../page";
import { PostContainer } from "./styles";

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const formattedDate = post.created_at;

  return (
    <PostContainer href={`/artigos/post/${post.number}`}>
      <div>
        <strong>{post.title}</strong>
        <span>há {Math.ceil(Math.random() * 9)} dias</span>
      </div>
      <p>{post.body}</p>
    </PostContainer>
  );
}
