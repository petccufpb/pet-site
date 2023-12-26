import { IPost } from "@app/artigos/page";
import { useRouter } from "next/navigation";
import { FaCalendar, FaChevronLeft, FaComment, FaGithub } from "react-icons/fa6";

import { ExternalLink } from "../../../../components/ExternalLink";
import { Spinner } from "../../../../components/Spinner";
import { PostHeaderContainer } from "./styles";

interface PostHeaderProps {
  postData: IPost;
  isLoading: boolean;
}

export function PostHeader({ postData, isLoading }: PostHeaderProps) {
  const router = useRouter();
  function goBack() {
    router.back();
  }

  return (
    <PostHeaderContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <ExternalLink
              as="button"
              icon={<FaChevronLeft />}
              variant="iconLeft"
              text="Voltar"
              onClick={goBack}
            />
            <ExternalLink text="Ver no Github" href={postData.html_url} target="_blank" />
          </header>

          <h1>{postData.title}</h1>
          <ul>
            <li>
              <FaGithub />
              {postData.user.login}
            </li>
            <li>
              <FaCalendar />
              há {Math.ceil(Math.random() * 9)} dias
            </li>
            <li>
              <FaComment />
              {postData.comments} comentários
            </li>
          </ul>
        </>
      )}
    </PostHeaderContainer>
  );
}
