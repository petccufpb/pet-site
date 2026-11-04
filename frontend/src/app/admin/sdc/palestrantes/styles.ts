import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const TitleArea = styled.div`
  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
    max-width: 720px;
  }
`;

export const LayoutGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const Card = styled.div`
  background: rgba(24, 34, 64, 0.45);
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 18, 0.35);

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  h2 {
    margin-bottom: 0;
  }
`;

export const SearchInput = styled.input`
  background: rgba(0, 0, 18, 0.4);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  width: 100%;
  max-width: 300px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["fifth-blue"]};
    box-shadow: 0 0 0 2px rgba(0, 114, 237, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors["base-grey"]};
  }
`;

export const SpeakerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
`;

export const SpeakerCard = styled.div`
  background: rgba(0, 0, 18, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(115, 229, 226, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  }
`;

export const AvatarBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  background: #1a1e2d;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    text-align: center;
    padding: 0.2rem;
  }
`;

export const SpeakerMeta = styled.div`
  min-width: 0;
  flex: 1;

  h3 {
    font-size: 1.05rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors["second-white"]};

  p {
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors["third-blue"]};
`;

