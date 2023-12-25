import { api, username } from "@app/artigos/page";
import { Text } from "@app/styles";
import { useCallback, useEffect, useState } from "react";
import { FaBuilding, FaGithub, FaUserGroup } from "react-icons/fa6";

import PetStamp from "@assets/images/pet-stamp.old.svg?svgr";

import { ExternalLink } from "../ExternalLink";
import { Spinner } from "../Spinner";
import { ProfileContainer, ProfileDetails } from "./styles";

interface ProfileData {
  login: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  followers: number;
}

export function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({} as ProfileData);
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users/${username}`);
      setProfileData(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <ProfileContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PetStamp width="175" height="175" style={{ margin: "-15px" }} />
          <ProfileDetails>
            <header>
              <Text weight="700" size="1.25rem" alt color="white">
                PET Ciência da Computação
              </Text>
              <ExternalLink text="Github" href={profileData.html_url} target="_blank" />
            </header>
            <Text color="#ffffff99" loose>
              Os artigos são uma atividade interna de criação de artigos que representa um importante pilar em
              nosso programa, incentivando os petianos a explorarem questões atuais e relevantes no campo da
              computação e afins. Neste processo, os integrantes são desafiados a aprimorar suas habilidades
              de pesquisa, análise e síntese.
            </Text>
            <ul>
              <li>
                <FaGithub />
                <Text size="0.875rem" inter color="#e1e1e6">
                  petccufpb
                </Text>
              </li>
              <li>
                <FaBuilding />
                <Text size="0.875rem" inter color="#e1e1e6">
                  UFPB
                </Text>
              </li>
              <li>
                <FaUserGroup />
                <Text size="0.875rem" inter color="#e1e1e6">
                  {profileData.followers} seguidores
                </Text>
              </li>
            </ul>
          </ProfileDetails>
        </>
      )}
    </ProfileContainer>
  );
}
