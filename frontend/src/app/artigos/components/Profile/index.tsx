import { api, username } from "@app/artigos/page";
import { useCallback, useEffect, useState } from "react";
import { FaBuilding, FaGithub, FaUserGroup } from "react-icons/fa6";

import { ExternalLink } from "../ExternalLink";
import { Spinner } from "../Spinner";
import { ProfileContainer, ProfileDetails, ProfilePicture } from "./styles";

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
          <ProfilePicture src="/images/logo.png" />
          <ProfileDetails>
            <header>
              <h1>PET Ciência da Computação</h1>
              <ExternalLink text="Github" href={profileData.html_url} target="_blank" />
            </header>
            <p>Programa de Educação Tutorial - Ciência da Computação UFPB</p>

            <ul>
              <li>
                <FaGithub />
                petccufpb
              </li>
              {profileData?.company && (
                <li>
                  <FaBuilding />
                  {profileData.company}
                </li>
              )}
              <li>
                <FaUserGroup />
                {profileData.followers} seguidores
              </li>
            </ul>
          </ProfileDetails>
        </>
      )}
    </ProfileContainer>
  );
}
