import styled, { css } from "styled-components";

export const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
  background: rgba(24, 34, 64, 0.25);
  backdrop-filter: blur(8px);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TabsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const FilterTab = styled.button<{ $active: boolean }>`
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ $active, theme }) =>
    $active
      ? css`
          background: rgba(115, 229, 226, 0.15);
          color: #73e5e2;
          border-color: rgba(115, 229, 226, 0.35);
        `
      : css`
          background: transparent;
          color: ${theme.colors["second-white"]};

          &:hover {
            color: white;
            background: rgba(255, 255, 255, 0.05);
          }
        `}
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  min-width: 260px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors["third-blue"]};
    box-shadow: 0 0 0 2px rgba(115, 229, 226, 0.15);
    background: rgba(255, 255, 255, 0.07);
  }

  svg {
    color: ${({ theme }) => theme.colors["second-white"]};
    flex-shrink: 0;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors["base-white"]};
    font-size: 0.85rem;
    font-family: ${({ theme }) => theme.fonts.alt};
    width: 100%;

    &::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  width: 100%;
`;

export const WeekdayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const WeekdayLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  svg {
    color: #73e5e2;
  }
`;

export const WeekdayChips = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const WeekdayChip = styled.button<{ $active: boolean; $hasEvents?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ $active, $hasEvents, theme }) => {
    if ($active) {
      return css`
        background: rgba(115, 229, 226, 0.15);
        color: #73e5e2;
        border-color: rgba(115, 229, 226, 0.35);
        box-shadow: 0 0 10px rgba(115, 229, 226, 0.1);
      `;
    }

    if ($hasEvents) {
      return css`
        background: rgba(255, 255, 255, 0.04);
        color: white;
        border-color: rgba(255, 255, 255, 0.08);

        &:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(115, 229, 226, 0.2);
        }
      `;
    }

    return css`
      background: transparent;
      color: rgba(255, 255, 255, 0.4);

      &:hover {
        color: white;
        background: rgba(255, 255, 255, 0.04);
      }
    `;
  }}

  span.counter {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    background: ${({ $active }) =>
      $active ? "rgba(115, 229, 226, 0.25)" : "rgba(255, 255, 255, 0.08)"};
    color: ${({ $active }) => ($active ? "#73e5e2" : "rgba(255, 255, 255, 0.7)")};
  }
`;
