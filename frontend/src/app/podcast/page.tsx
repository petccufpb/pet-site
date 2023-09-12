import { Metadata } from "next";
import { FaPlay, FaShare, FaShareNodes } from "react-icons/fa6";
import { Spotify } from "react-spotify-embed";

import { Episode, EpisodeInfo, Episodes, Playback, PodcastContainer } from "./styles";

export const metadata: Metadata = {
  title: "PET Computação - Podcast",
};

export default async function Podcast() {
  // fetch spotify for podcast data
  const body = {
    redirect_uri: "https://www.petccufpb.com.br/redirect",
    grant_type: "authorization_code",
  };

  const id = process.env.NEXT_SPOTIFY_ID;
  const secret = process.env.NEXT_SPOTIFY_SECRET;
  const podcastId = "7yyTumVntw0JcKO33uP5fX";

  const authOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  };

  const token = (await (await fetch("https://accounts.spotify.com/api/token", authOptions)).json())
    .access_token;
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  };

  const episodes = (
    await (
      await fetch(
        `https://api.spotify.com/v1/shows/7yyTumVntw0JcKO33uP5fX/episodes?offset=0&limit=50&market=BR`,
        options,
      )
    ).json()
  ).items;

  return (
    <PodcastContainer>
      <div>Além do Ponto e Vírgula</div>
      <h1>Descubra nossos episódios</h1>
      <Episodes>
        {episodes.map(e => {
          return (
            <Episode key={e.uri}>
              <img src={e.images[0].url} width="180" height="180" />
              <EpisodeInfo>
                <h2>{e.name}</h2>
                <div>{e.description}</div>
              </EpisodeInfo>
              <Playback>
                <FaShareNodes />
                <a href={e.external_urls.spotify} target="_blank">
                  <FaPlay />
                </a>
              </Playback>
            </Episode>
          );
        })}
        {/* 
        <Episode>
          <img src="/images/podcast/ep-03.png" width="15%" />
          <EpisodeInfo>
            <h2>3. A Jornada de Apostando Alto</h2>
            <div>
              Você já se perguntou como é conciliar estudos e trabalho? E enquanto estudar enquanto esttá
              gerindo uma Start-Up? Neste diálogo comm o entusiasta e desenvolvedor em Segurança da Informação
              e graduado em Ciência da Computação, Erlon Júnior nos conta sobre os altos e baixos vivenciados
              em sua vida de universitário e diretor executivo de sua start-up: Ejrgeek.
            </div>
          </EpisodeInfo>
          <Playback>
            <FaShareNodes />
            <FaPlay />
          </Playback>
        </Episode>
        <Episode>
          <img src="/images/podcast/ep-02.png" width="15%" />
          <EpisodeInfo>
            <h2>2. Setembro Amarelo: Saúde Mental e a Área de TI</h2>
            <div>
              Nesse episódio especial convidamos a psicóloga Luciângela Cunha, que também é professsora
              universitária e orientadora profissional e de carreira, para conversar sobre um assunto que
              precisa indispensavelmente ser tratado em todos os meses do ano: à prevenção e conscientização
              contra o suicídio. Discutimos sobre a saúde mental dando enfoque nas experiências vividas pelos
              estudantes da área de TI e destacamos a importância de sempre buscar ajuda profissional.
            </div>
          </EpisodeInfo>
          <Playback>
            <FaShareNodes />
            <FaPlay />
          </Playback>
        </Episode>
        <Episode>
          <img src="/images/podcast/ep-01.png" width="15%" />
          <EpisodeInfo>
            <h2>1. Engenheiro de Dados: O Novo Unicórnio</h2>
            <div>
              Para nosso episódio piloto convidamos Carlos Barbosa, sócio e tech lead da A3Data, para bater um
              papo sobre o engenheiro de dados, um profissional muito visado no mercado atualmente. Falamos
              sobre ferramentas, funções e Carlos ainda trouxxe um bônus: dicas de um recrutador para
              seleções.
            </div>
          </EpisodeInfo>
          <Playback>
            <FaShareNodes />
            <FaPlay />
          </Playback>
        </Episode> */}
      </Episodes>
    </PodcastContainer>
  );
}
