import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  label {
    color: #e5e7eb;
    font-weight: 600;
    font-size: 0.95rem;
  }
`;

export const Preview = styled.div<{ hasPreview: boolean }>`
  width: 100%;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ hasPreview }) => (hasPreview ? "#111827" : "#1f2937")};
  border: 1px dashed rgba(255, 255, 255, 0.28);
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }
`;

export const Placeholder = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.95rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const baseButton = `
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const UploadButton = styled.button`
  ${baseButton}
  background: #2563eb;
  color: white;
`;

export const RemoveButton = styled.button`
  ${baseButton}
  background: #374151;
  color: white;
`;
